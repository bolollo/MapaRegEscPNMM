
import createHeader from "./components/header";
import createRoot from "./components/root";
import createFooter from "./components/footer";
import createMap from "./components/map";
import createSidebar from "./components/sidebar";
import createMapLayers from "./components/mapLayers";
import createCercador from "./components/cercador";
import "./css/app.css";

export default () => {

  console.log("Init app...");

  document.getElementById("header").innerHTML = createHeader();

  document.getElementById("root").innerHTML = createRoot();

  document.getElementById("footer").innerHTML = createFooter();

  const map = createMap();

  createSidebar(document.getElementById("root"));

  createMapLayers({parent: document.querySelector("#sidebar > #panel > .accordion > .capes"), map: map});

  createCercador({parent: document.querySelector("#sidebar > #panel > .accordion > .cerca"), map: map});

}