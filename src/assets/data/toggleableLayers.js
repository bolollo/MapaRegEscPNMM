export default [
	{id:1,label:"Regions",layers:["regions-polygon","regions-point",],visibility:false}, 
	{id:2,label:"Seccions",layers:["seccions-polygon","seccions-point",],visibility:false},
	{id:3,label:"Zones aparcaments",layers:["aparcaments-polygon","aparcaments-point","tanques_vehicle-point","areesdescans-point",],visibility:true},
	{id:4,label:"Camins del Parc",layers:["camins-geojson-LineString",],visibility:false},
	{id:5,label:"Seguretat",layers:["foer-point","foer-point2","112-point","112-point2",],visibility:false}, 
	{id:6,label:"> Senyal Bombers",layers:["foer-point","foer-point2",],visibility:false}, 
	{id:7,label:"> Senyal 112",layers:["112-point","112-point2",],visibility:false}, 
	{id:8,label:"Límits del Parc",layers:["limits-geojson-polygon","limits-point"],visibility:false}, 
]
