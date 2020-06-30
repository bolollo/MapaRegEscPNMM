import $ from "jquery";
import "../semantic/semantic";
import "../semantic/semantic.css";

import "./cercador.css";

function waiting(map, container, data, placeholder, field, filter) {
	if (!map.isStyleLoaded()) {
		setTimeout(() => {waiting(map, container, data, placeholder, field, filter);}, 300);
	} else {
		addItems(map, container, data, placeholder, field, filter);
	}
}

function addItems(map, container, data, placeholder, field, filter) {
	const features = data;
	const filtered = features.reduce((acc, d) => {
		const found = acc.find(a => a.properties[filter] === d.properties[filter]);
		if (!found) {
		  acc.push(d); // not found, so need to add data property
		}
		return acc;
	}, []);

	const listItems = filtered.map((item, index) => {
		let cercaText = "";
		if (field.length > 1) {
			const texts = field.map(element => {
				return item.properties[element];
			});
			cercaText = texts.join(" - ");
		} else {
			cercaText = item.properties[field];
		}

		return `<div class="item" data-value="${item.geometry.coordinates[0]},${item.geometry.coordinates[1]}">${cercaText}</div>`;
	});

	const html = `<div class="ui fluid search selection dropdown">
		<input type="hidden" name="country">	
		<i class="search icon"></i>
		<div class="default text">${placeholder}</div>
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
	const data = options.data;
	const placeholder = options.placeholder || "Cerca ...";
	const field = options.field;
	const filter = options.filter;

	// Càrrega LAYERS, IMAGES
	map.on('load', function () {
		waiting(map, container, data, placeholder, field, filter);
	});

}
