import $ from "jquery";
import "../semantic/semantic";
import "../semantic/semantic.css";
import mapboxgl from "mapbox-gl";

import "./mapLayers.css";

import sources from "../assets/data/sources";

import styles from "../assets/data/styles";
import images from "../assets/data/images";

const featuresId = [];
let featuresSelected = [];

function addSources(map) {
    if (map.isStyleLoaded()) {
        Object.keys(sources).forEach((key) => {
            if (!map.getSource(key)) {
                map.addSource(key, sources[key]);
            }
        });
        loadImages(map);
        addLayers(map);
        addMapLayersEvent(map);
    }else {
        setTimeout(() => {
            addSources(map);
        }, 300);
    }
}

function addLayers(map) {
    styles.forEach((style) => {
        if(!map.getLayer(style.id)){
            map.addLayer(style);
        }
    });
}

function loadImages(map){
    Object.keys(images).forEach((key) => {
        if(!map.hasImage(key)){
            map.loadImage(images[key], function (error, image) {if (error) throw error;addImage2Map(image, key, map);});
        }
    });
}

function addImage2Map(image, id, map) {
    if (!map.hasImage(id)){
        map.addImage(id, image);
    }
}

function toggleLayer(item, map, toggleableLayers) {
    const id = parseInt($(item).attr("class").split(/\s+/).find(cls => cls.includes("lay_")).replace("lay_",""));
    toggleableLayers[id].layers.forEach(function(layer){
        var visibility = map.getLayoutProperty(layer, "visibility");
        if (visibility === "visible") {
            $(item).addClass("active");
            map.setLayoutProperty(layer, "visibility", "none");
            setStyleLayerVisibility(layer, "none");
            toggleableLayers[id].visibility = false;
        } else {
            $(item).removeClass("active");
            map.setLayoutProperty(layer, "visibility", "visible");
            setStyleLayerVisibility(layer, "visible");
            toggleableLayers[id].visibility = true;
        }  
    });
}

function setStyleLayerVisibility(id, visibility){
    styles.forEach((style) => {
        if(style.id === id) {
            style.layout.visibility = visibility;
        }
    });
} 

function waiting(map) {
    if (!map.isStyleLoaded()) {
        setTimeout(() => {waiting(map);}, 300);
    } else {
        addSources(map);
    }
}

function getEventCoords(e) {
    var coordinates = e.features[0].geometry.coordinates.slice();

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    return coordinates;
}

function addPointer(map) {
    map.getCanvas().style.cursor = "pointer";
}

function removePointer(map){
    map.getCanvas().style.cursor = "";
}

function addEventToLayers(map, event, layers, popup, fn){

    layers.forEach((layer) => {
        map.on(event, layer, function(e) {
            fn(e, popup);
        });
    });

}

function addMapLayersEvent(map) {

    // Popup on Hoover
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    addEventToLayers(map, "mouseenter", ["aparcaments-point"], popup, function(e, popup) {
        addPointer(map);
        var description = e.features[0].properties.Nom;
        var coordinates = getEventCoords(e);
        popup.setLngLat(coordinates)
            .setHTML(`<p align= "center">${description}</p>`)
            .addTo(map);
    });

    addEventToLayers(map, "mouseleave", ["aparcaments-point", "dea", "refugis", "ZonaAcampada"], popup, function(e, popup) {
        removePointer(map);
        popup.remove();
    });

    addEventToLayers(map, "mouseenter", ["regulacio-geojson-polygon"], popup, function(e, popup) {
        addPointer(map);
    });

    addEventToLayers(map, "mouseleave", ["regulacio-geojson-polygon"], popup, function(e, popup) {
        removePointer(map);
    });

    addEventToLayers(map, "mouseenter", ["dea", "refugis", "ZonaAcampada"], popup, function(e, popup) {
        addPointer(map);
        var description = e.features[0].properties;
        var coordinates = getEventCoords(e);
        var html = "";
        if (description.Nom && description.Observ){
            html = `<h5>${description.Nom}</h5>${description.Observ}`;
        } else {
            html = `<h5>${description.Nom}</h5>`;
        }
        popup.setLngLat(coordinates)
            .setHTML(html)
            .addTo(map);
    });

    addEventToLayers(map, "mouseenter", ["camins-geojson-LineString", "GR_PR_PNMM"], popup, function(e, popup) {
        addPointer(map);
        var html = [];
        e.features.forEach((feature) => {
            const hasSelected = featuresSelected.some((element) => {
                return (element.id === feature.id && element.source === feature.source);
            });
            if (!hasSelected){
                featuresSelected.push(feature);
            }
        });
        featuresSelected.forEach((feature) => {
            if(feature.properties.Longitud){
                html.push(`<p>${feature.properties.Nom}<br/><small>Distància: ${feature.properties.Longitud}</small></p>`);
            }else{
                html.push(`<p>${feature.properties.Nom}</p>`);
            }
        });

        popup.setLngLat(e.lngLat)
            .setHTML(html.join(""))
            .addTo(map);
    });

    addEventToLayers(map, "mouseleave", ["camins-geojson-LineString", "GR_PR_PNMM"], popup, function(e, popup) {
        removePointer(map);
        featuresSelected = [];
        popup.remove();
    });

    addEventToLayers(map, "mouseenter", ["camins-geojson-LineString", "GR_PR_PNMM"], popup, function(e, popup) {
        e.features.forEach((feature) => {
            featuresId.push(feature);
            map.setFeatureState(
                { source: feature.source, id: feature.id },
                { hover: true }
            );
        });
    });

    addEventToLayers(map, "mouseleave", ["camins-geojson-LineString", "GR_PR_PNMM"], popup, function(e, popup) {
        featuresId.forEach((feature) => {
            map.setFeatureState(
                { source: feature.source, id: feature.id },
                { hover: false }
            );
        });
    });

    map.on("click", function(e) {

        // set bbox as [tolerance]px reactangle area around clicked point
        const tolerance = 3;
        var bbox = [[e.point.x - tolerance, e.point.y - tolerance], [e.point.x + tolerance, e.point.y + tolerance]];

        var features = map.queryRenderedFeatures(bbox, { layers: ['camins-geojson-LineString',"GR_PR_PNMM"] });
        var features2 = map.queryRenderedFeatures(e.point, { layers: ["regulacio-geojson-polygon"] });
        var features3 = map.queryRenderedFeatures(e.point, { layers: ["vies_escalada_agulles"] });
        var features4 = map.queryRenderedFeatures(e.point, { layers: ["vies_escalada_cluster"] });

        // if the features have no info, return nothing
        if (features2.length) {

            popup.remove();
            var feature2 = features2[0];

            $('.ui.modal').find("img.image").attr("src", feature2.properties['image']);
            $('.ui.modal').modal('show');

        } else if (features.length) {

            var html = [];
            features.forEach((feature) => {
                if(feature.properties.url !== "none"){
                    html.push(`<p>Itinerari: <a href="${feature.properties.url}" target="_blank">${feature.properties.Nom}</a></p>`);
                }

            });
            if (html.length === 0) {
                return;
            }

            popup.remove();

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html.join(""))
                .addTo(map);

        } else if (features3.length) {

            popup.remove();
            var feature3 = features3[0];
            feature3.properties.vies = JSON.parse(feature3.properties.vies);
            var properties = feature3.properties;
            var html = [];

            html.push(`<p>Sector: ${properties.sectorAgulla}</p>`);

            properties.vies.forEach((via) => {
                var any =  via.aperturaAny ? `(${via.aperturaAny})` : "";
                var escaladors  = via.aperturaNom ? `- ${via.aperturaNom}` : "";

                html.push(`<p>${via.nomVia} ${any} ${escaladors}</p>`);
            });

            if (html.length === 0) {
                return;
            }

            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html.join(""))
                .addTo(map);

        } else if (features4.length) {

            var clusterId = features4[0].properties.cluster_id;
            map.getSource("vies_escalada_cluster").getClusterExpansionZoom(
                clusterId,
                function(err, zoom) {
                    if (err) return;
                    
                    map.easeTo({
                        center: features4[0].geometry.coordinates,
                        zoom: zoom
                    });
                }
            );

        } else {

            return;

        }

    });

}

export default function createMapLayers(options) {

    const container = options.parent;
    const map = options.map;
    const toggleableLayers = options.toggleableLayers;

    // Càrrega LAYERS, IMAGES
    map.on('load', function () {
        waiting(map);
    });

    const listItems = toggleableLayers.map((item, index) => {
        return `<a class="item lay_${index} ${(item.visibility) ? "" : "active"}" >${item.label}</a>`
    });

    const html = `<div class="ui link list">${listItems.join(" ")}</div>`;

    const template = document.createElement("template");
    template.innerHTML = html;

    $(container).append(template.content.cloneNode(true));

    $(container).find("a").click(function() {
        toggleLayer(this, map, toggleableLayers);
    });

}
