import $ from "jquery";
import "../semantic/semantic";
import "../semantic/semantic.css";
import mapboxgl from "mapbox-gl";

import "./mapLayers.css";

import sources from "../assets/data/sources";

import styles from "../assets/data/styles";
import images from "../assets/data/images";

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

	addEventToLayers(map, "mouseleave", ["aparcaments-point"], popup, function(e, popup) {
        removePointer(map);
        popup.remove();
    });

	map.on("mouseenter", "camins-geojson-LineString", function () {
		addPointer(map);
	});

	map.on("mouseleave", "camins-geojson-LineString", function () {
		removePointer(map);
	});

	map.on("click", function(e) {
		
		// set bbox as [tolerance]px reactangle area around clicked point
		const tolerance = 3;
		var bbox = [[e.point.x - tolerance, e.point.y - tolerance], [e.point.x + tolerance, e.point.y + tolerance]];

		var features = map.queryRenderedFeatures(bbox, { layers: ['camins-geojson-LineString'] });
		var features2 = map.queryRenderedFeatures(e.point, { layers: ["regulacio-geojson-polygon", "boixar-point2"] });
		
		// if the features have no info, return nothing
		if (features2.length) {
			
			var feature2 = features2[0];

			$('.ui.modal').find("img.image").attr("src", feature2.properties['image']);
			$('.ui.modal').modal('show');
			
			/*
			// Populate the popup and set its coordinates
			// based on the feature found
			new mapboxgl.Popup()
			.setLngLat(e.lngLat)
			.setHTML(`<img src="${feature2.properties['image']}" style="max-width:500px;"></img>
					<p>${feature2.properties['Regulacio']}</p>
					<b>Plànol del sector: </b>  
					<br><b><a href="${feature2.properties['file']}" target="_blank">${feature2.properties['Nom']}</a> (PDF) </b> 
					`)
			.addTo(map);
			*/
		
		} else if (features.length) {
			
			var p = features[0].properties;
			if (p.url === "none") {
				return false;
			}
	
			new mapboxgl.Popup()
				.setLngLat(e.lngLat)
				.setHTML(`<p>Itinerari: <a href="${p.url}" target="_blank">${p.Nom}</a></p>`)
				.addTo(map);
		
		} else {
			
			return;
		
		}

	});

	map.on("mouseenter", "regulacio-geojson-polygon", function () {
		map.getCanvas().style.cursor = "pointer";
	});

	map.on("mouseleave", "regulacio-geojson-polygon", function () {
		map.getCanvas().style.cursor = "";
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