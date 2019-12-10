import agulles from "./agulles";
import regulacio from "./regulacio";
import regulacio_point from "./regulacio_point";
import limitsparc from "./limitsparc";
import limitsparc_point from "./limitsparc_point";
import seccions from "./seccions";
import seccions_point from "./seccions_point";
import caminsPNMM from "./caminsPNMM";
import regions from "./regions";
import regions_point from "./regions_point";
import fitxes_foer from "./fitxes_foer";
import senyal_112 from "./senyal_112";
import boixar from "./boixar";
import tanques_vehicle from "./tanques_vehicle";
import aparcaments_point from "./aparcaments_point";
import aparcaments from "./aparcaments";
import areesdescans from "./areesdescans";

export default {
	"agulles-point": {"type": "geojson","data": agulles},
	"regulacio-json": {"type": "geojson","data": regulacio},
	"regulacio-point": {"type": "geojson","data": regulacio_point},
	"limits-json": {"type": "geojson","data": limitsparc},
	"limits-point": {"type": "geojson","data": limitsparc_point},
	"seccions-json": {"type": "geojson","data": seccions},
	"seccions-point": {"type": "geojson","data": seccions_point},
	"camins-json": {"type": "geojson","data": caminsPNMM},
	"regions-json": {"type": "geojson","data": regions},
	"regions-point": {"type": "geojson","data": regions_point},
	"foer-point": {"type": "geojson","data": fitxes_foer},
	"112-point": {"type": "geojson","data": senyal_112},
	"boixar-point": {"type": "geojson","data": boixar},
	"tanques_vehicle-point": {"type": "geojson","data": tanques_vehicle},
	"aparcaments-point": {"type": "geojson","data": aparcaments_point},
	"areesdescans-point": {"type": "geojson","data": areesdescans},
	"aparcaments-json": {"type": "geojson","data": aparcaments}
}
