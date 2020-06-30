import $ from "jquery";
import "../semantic/semantic";
import "../semantic/semantic.css";
import mapboxgl from "mapbox-gl";

import "./cercador.css";
import sources from "../assets/data/sources";

function waiting(map, container) {
	if (!map.isStyleLoaded()) {
		setTimeout(() => {waiting(map, container);}, 300);
	} else {
		addItems(map, container);
	}
}

function addItems(map, container) {
	const features = sources["agulles-point"].data.features;
	const filtered = features.reduce((acc, d) => {
		const found = acc.find(a => a.properties.id_agulla === d.properties.id_agulla);
		if (!found) {
		  acc.push(d); // not found, so need to add data property
		}
		return acc;
	}, []);

	const listItems = filtered.map((item, index) => {
		return `<div class="item" data-value="${item.geometry.coordinates[0]},${item.geometry.coordinates[1]}">${item.properties.nom}</div>`;
	});

	const html = `<div class="ui fluid search selection dropdown">
		<input type="hidden" name="country">	
		<i class="search icon"></i>
		<div class="default text">Cerca agulles...</div>
		<div class="menu">
			${listItems.join(" ")}
		</div>
	</div>`;
	  
	const template = document.createElement("template");
	template.innerHTML = html;

	$(container).html(template.content.cloneNode(true));

	$(container).find('.ui.selection.dropdown').dropdown({
		clearable: true,
		fullTextSearch: true,
		onChange: function (val, text, choice) {
			const [lon,lat] = val.split(",");
			map.flyTo({
				center: [lon, lat],
				zoom: 18
			});
		}
  	});
}


export default function createCercador(options) {

	const container = options.parent;
	const map = options.map;

	// Càrrega LAYERS, IMAGES
	map.on('load', function () {
		waiting(map, container);
	});

}
