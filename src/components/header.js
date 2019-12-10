import logoIcgc from "../assets/logo_generalitat_blanc.png";
import "./header.css";

export default function createHeader() {
	return `<div class="ui grid">
    <div id="headerPanel" class="row">
        <div class="three wide column">
            <div id="headerLogo">
                <a title="Generalitat de Catalunya" href="https://web.gencat.cat/" target="_top">
                    <img src="${logoIcgc}" class="ui image logo">
                </a>
            </div>
        </div>
        <div class="ten wide column">
            <h2 id="headerTitle" class="ui center aligned block header">
                <div class="content">
                Mapa de regulació de l'escalada
                </div>
            </h2>
        </div>
        <div class="right floated two wide column">
            <div id="headerInfo">
                <a title="Informació" href="http://betaportal.icgc.cat" target="_blank">
                    <i class="large info circle link white icon"></i>
                </a>
            </div>
        </div>
    </div>
</div>`;
}
