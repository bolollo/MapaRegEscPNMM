import logoGencat from "../assets/logo_generalitat_gris.png";
import "./footer.css";

export default function createFooter() {
	return `<div class="avis_legal">
		<div id="peuImatge">
			<a accesskey="5" target="_self" title="www.gencat.cat" href="http://www.gencat.cat">
			<img src="${logoGencat}" width="101" height="27" alt="www.gencat.cat" class="adaptImage"></a>
		</div>
		<div id="peuAvis">
			<p><a title="Avis legal" href="https://web.gencat.cat/ca/menu-ajuda/ajuda/avis_legal/" target="_self">Avís legal</a>: La ©Generalitat de Catalunya permet la reutilització dels continguts i de les dades sempre que se'n citi la font i la data d'actualització, que no es desnaturalitzi la informació i que no es contradigui amb una llicència específica.</p>
		</div>
	</div>`;
}