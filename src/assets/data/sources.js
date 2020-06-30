import agulles from "./agulles";
import regulacio from "./regulacio";
import regulacio_point from "./regulacio_point";
import limitsparc from "./limitsparc";
import limitsparc_point from "./limitsparc_point";
import caminsPNMM from "./caminsPNMM";
import fitxes_foer from "./fitxes_foer";
import senyal_112 from "./senyal_112";
import boixar from "./boixar";
import tanques_vehicle from "./tanques_vehicle";
import picnic from "./picnic";
import aparcaments_point from "./aparcaments_point";
import aparcaments from "./aparcaments";
import areesdescans from "./areesdescans";
import dea from "./dea";
import refugis from "./refugis";
import ZonaAcampada from "./ZonaAcampada";
import GR_PR_PNMM from "./GR_PR_PNMM";
import seccions from "./seccions";
import seccions_point from "./seccions_point";
import regions from "./regions";
import regions_point from "./regions_point";
import vies_escalada from "./vies_escalada";
import vies_escalada_agulles from "./vies_escalada_agulles";


export default {
    "agulles-point": {"type": "geojson","data": agulles, "generateId": true},
    "regulacio-json": {"type": "geojson","data": regulacio, "generateId": true},
    "regulacio-point": {"type": "geojson","data": regulacio_point, "generateId": true},
    "limits-json": {"type": "geojson","data": limitsparc, "generateId": true},
    "limits-point": {"type": "geojson","data": limitsparc_point, "generateId": true},
    "camins-json": {"type": "geojson","data": caminsPNMM, "generateId": true},
    "foer-point": {"type": "geojson","data": fitxes_foer, "generateId": true},
    "112-point": {"type": "geojson","data": senyal_112, "generateId": true},
    "boixar-point": {"type": "geojson","data": boixar, "generateId": true},
    "tanques_vehicle-point": {"type": "geojson","data": tanques_vehicle, "generateId": true},
    "picnic": {"type": "geojson","data": picnic, "generateId": true},
    "aparcaments-point": {"type": "geojson","data": aparcaments_point, "generateId": true},
    "areesdescans-point": {"type": "geojson","data": areesdescans, "generateId": true},
    "aparcaments-json": {"type": "geojson","data": aparcaments, "generateId": true},
    "dea": {"type": "geojson","data": dea, "generateId": true},
    "refugis": {"type": "geojson","data": refugis, "generateId": true},
    "ZonaAcampada": {"type": "geojson","data": ZonaAcampada, "generateId": true},
    "GR_PR_PNMM": {"type": "geojson","data": GR_PR_PNMM, "generateId": true},
    "seccions-json": {"type": "geojson","data": seccions, "generateId": true},
    "seccions-point": {"type": "geojson","data": seccions_point, "generateId": true},
    "regions-json": {"type": "geojson","data": regions, "generateId": true},
    "regions-point": {"type": "geojson","data": regions_point, "generateId": true},
    "vies_escalada": {"type": "geojson","data": vies_escalada, "generateId": true},
    "vies_escalada_agulles": {"type": "geojson","data": vies_escalada_agulles, "generateId": true},
    "vies_escalada_cluster": {"type": "geojson","data": vies_escalada, "cluster": true, "clusterMaxZoom": 15},
}
