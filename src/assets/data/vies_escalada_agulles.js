import vies_escalada from "./vies_escalada";

export default function getViesEscaladaAgulles() {

    const vies_escalada_agulles = {
        "type": "FeatureCollection",
        "name": "ViesEscalada_PNMM",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": []
    }
    
    const agulles = {};
    
    vies_escalada.features.forEach(item => {
    
        const idAgulla = item.properties["Nº Ag."];
        const nomAgulla = item.properties["Nom de l'agulla o roca"];
        const sectorAgulla = item.properties["Sector"];
        const regioAgulla = item.properties["Regió"];
        const x = item.properties["X"];
        const y = item.properties["Y"];
        const idVia = item.properties["Nº Via"];
        const nomVia = item.properties["field_2"];
        const aperturaAny = item.properties["Any 1ª"];
        const aperturaNom = item.properties["Escaladors 1º ascensió"];
    
        const nomComplert = `${nomVia} - ${nomAgulla} - ${sectorAgulla} - ${regioAgulla}`;
    
        /*
        if (idAgulla === 94) {
            console.log(nomVia);
            console.log(nomAgulla);
            if(agulles[idAgulla]){
                console.log(agulles[idAgulla].properties.vies);
            }
        }
        */      
        
        if (agulles[idAgulla]) {
    
            agulles[idAgulla].properties.vies.push({
                idVia,
                nomVia,
                aperturaAny,
                aperturaNom,
                nomComplert
            });
        } else {
            const feature = {...item, properties: {}};
        
            feature.properties = {
                idAgulla,
                nomAgulla,
                sectorAgulla,
                regioAgulla,
                x,
                y,
                vies: [{
                    idVia,
                    nomVia,
                    aperturaAny,
                    aperturaNom,
                    nomComplert
                }]
            };
    
            agulles[idAgulla] = feature;
        }
        
    });
    
    Object.entries(agulles).forEach(([key, value]) => {
        vies_escalada_agulles.features.push(value);    
    });

    return vies_escalada_agulles;

}