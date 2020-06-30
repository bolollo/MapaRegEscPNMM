import mapboxgl from "mapbox-gl";
import StylesControl from "mapbox-gl-controls/lib/styles";
import CompassControl from 'mapbox-gl-controls/lib/compass';
import ZoomControl from 'mapbox-gl-controls/lib/zoom';
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-controls/theme.css";

export default function createMap() {
	const map = new mapboxgl.Map({
		container: "map",
		minZoom: 2,
		maxZoom: 18,
		hash: true,
		style: "https://geoserveis.icgc.cat/contextmaps/icgc.json",
		center: [1.80881, 41.58995],
		zoom: 12.59,
		attributionControl: false,
		preserveDrawingBuffer: true
	});
	
	//map.addControl(new mapboxgl.NavigationControl());

	map.addControl(new ZoomControl(), 'top-right');
	map.addControl(new CompassControl(), 'top-right');

	map.addControl(new mapboxgl.AttributionControl({
		compact: true
	}));

	// Butons de d'escala
	map.addControl(new mapboxgl.ScaleControl({
		maxWidth: 100,
		unit: 'metric'}));

	map.addControl(new mapboxgl.GeolocateControl({
		positionOptions: {
			enableHighAccuracy: true,
			watchPosition: true}}));

	map.addControl(new StylesControl({
		styles: [
		  {
			label: 'Satellite',
			styleName: 'Mapbox Streets',
			styleUrl: 'https://tilemaps.icgc.cat/tileserver/styles/hibrid.json',
		  }, {
			label: 'Mapa',
			styleName: 'totpo',
			styleUrl: 'https://tilemaps.icgc.cat/tileserver/styles/icgc.json',
		  },
		],
		onChange: (style) => {
			setTimeout(function(){map.fire('load');}, 300);
		},
	}), 'top-right');

	return map;
}
