export default [
    {id:1,label:"Regions",layers:["regions-polygon","regions-point"],visibility:false},
    {id:2,label:"Seccions",layers:["seccions-polygon","seccions-point"],visibility:false},
    {id:3,label:"Zones aparcaments",layers:["picnic","aparcaments-polygon","aparcaments-point","tanques_vehicle-point","areesdescans-point"],visibility:true},
    {id:4,label:"Camins del Parc",layers:["camins-geojson-LineString",],visibility:false},
    {id:5,label:"Camins GR i PR",layers:["GR_PR_PNMM",],visibility:false},    
    {id:6,label:"Refugis i Acampada",layers:["refugis", "ZonaAcampada"],visibility:false},
    {id:7,label:"Límits del Parc",layers:["limits-geojson-polygon","limits-point"],visibility:false},
    {id:8,label:"Vies escalada",layers:["vies_escalada_cluster", "vies_escalada_cluster_count" ,"vies_escalada_agulles"],visibility:false}, 
]
