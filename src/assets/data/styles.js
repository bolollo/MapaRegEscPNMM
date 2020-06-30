export default [
    {
        id: "picnic",
        type: "symbol",
        source: "picnic",
        layout: {
            "symbol-placement": "point",
            "icon-image": "picnic",
            "icon-size": 0.7,
            "icon-allow-overlap": false,
            visibility: "visible"
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "areesdescans-point",
        type: "symbol",
        source: "areesdescans-point",
        layout: {
            "text-font": ["Open Sans Regular"],
            "text-field": "Àrea d'aturada" + "  " + "{Nom}",
            "symbol-placement": "point",
            "text-size": 12,
            "text-offset": [0, 2],
            "icon-image": "park_bench",
            "icon-size": 0.7,
            "icon-allow-overlap": false,
            visibility: "visible"
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "regulacio-geojson-polygon",
        type: "fill",
        source: "regulacio-json",
        layout: { visibility: "visible" },
        paint: {
            "fill-color": [
                "match",
                ["get", "atr"],
                ["A"],
                "hsla(0, 100%, 44%, 0.5)",
                ["B"],
                "hsla(120, 100%, 27%, 0.5)",
                ["C"],
                "hsla(206, 100%, 48%, 0.5)",
                ["D"],
                "hsla(54, 100%, 74%, 0.5)",
                ["G"],
                "hsla(240, 100%, 27%, 0.5)",
                ["E"],
                "hsla(323, 70%, 48%, 0.5)",
                "#000000"
            ],
            "fill-opacity": ["interpolate", ["linear"], ["zoom"], 9, 0, 13.2, 1]
        },
        filter: ["==", "$type", "Polygon"]
    },
    {
        id: "regulacio-point-point",
        type: "symbol",
        source: "regulacio-point",
        layout: {
            visibility: "visible",
            "text-font": ["Open Sans Bold"],
            "text-field": [
                "step",
                ["zoom"],
                ["to-string", ["concat", ["get", "Codi"], " - ", ["get", "Nom"]]],
                22,
                ""
            ],
            "symbol-placement": "point",
            "text-size": 14,
            "text-letter-spacing": ["interpolate", ["linear"], ["zoom"], 0, 0, 22, 0],
            "text-line-height": 1.2,
            "text-max-width": 10,
            "text-allow-overlap": true,
            "text-justify": "center",
            "text-anchor": "center",
            visibility: "visible"
        },
        paint: {
            "text-opacity": ["interpolate", ["linear"], ["zoom"], 9, 0, 13.2, 1],
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "agulles-point",
        type: "symbol",
        source: "agulles-point",
        layout: {
            "text-font": ["Open Sans Regular"],
            "text-field": ["to-string", ["get", "nom"]],
            "symbol-placement": "point",
            "text-size": 12,
            "icon-image": "mountain",
            "icon-size": 0.25,
            "text-justify": "center",
            "text-anchor": ["step", ["zoom"], "center", 14, "top"],
            "text-offset": [0, 0.3],
            visibility: "visible"
        },
        paint: {
            "text-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 15, 1],
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5,
            "icon-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                1,
                0,
                14,
                0,
                14.04,
                1
            ]
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "vies_escalada_cluster",
        type: "circle",
        source: "vies_escalada_cluster",
        filter: ["has", "point_count"],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40
            ]
        },
        layout: {
            visibility: "none"
        }
    },
    {
        id: 'vies_escalada_cluster_count',
        type: 'symbol',
        source: 'vies_escalada_cluster',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ["Open Sans Regular"],
            'text-size': 12,
            visibility: "none"
        }
    },
    {
        id: "vies_escalada_agulles",
        type: "symbol",
        source: "vies_escalada_agulles",
        minzoom: 16,
        layout: {
            "text-font": ["Open Sans Regular"],
            "text-field": ["to-string", ["get", "nomAgulla"]],
            "symbol-placement": "point",
            "text-size": 12,
            "icon-image": "climbing",
            "icon-size": 0.55,
            "text-justify": "center",
            "text-anchor": ["step", ["zoom"], "center", 14, "top"],
            "text-offset": [0, 0.3],
            visibility: "none"
        },
        paint: {
            "text-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 15, 1],
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5,
            "icon-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                1,
                0,
                14,
                0,
                14.04,
                1
            ]
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "camins-geojson-LineString",
        type: "line",
        source: "camins-json",
        layout: { visibility: "none", "line-join": "round", "line-cap": "round" },
        paint: {
            "line-width": [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                6,
                3
            ],
            "line-color": [
                "match",
                ["get", "Municipi"], // get the property
                "Altres",
                "#223b53",
                "Bruc",
                "#b16618",
                "Collbató",
                "#7685bc",
                "Marganell",
                "#207969",
                "Montserrat",
                "#a90230",
                "Monistrol",
                "#0063ac",
                "#223b53"
            ] //else
        },
        filter: ["==", "$type", "LineString"]
    },
    {
        id: "GR_PR_PNMM",
        type: "line",
        source: "GR_PR_PNMM",
        layout: { visibility: "none", "line-join": "round", "line-cap": "round" },
        paint: {
            "line-width": [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                6,
                3
            ],
            "line-color": [
                "match",
                ["get", "Municipi"], // get the property
                "GR",
                "#FF0000",
                "PR",
                "#FFC900",
                "#223b53"
            ] //else
        },
        filter: ["==", "$type", "LineString"]
    },
    {
        id: "regions-polygon",
        type: "line",
        source: "regions-json",
        layout: { visibility: "none", "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#a90230", "line-width": 2 },
        filter: ["==", "$type", "Polygon"]
    },
    {
        id: "regions-point",
        type: "symbol",
        source: "regions-point",
        layout: {
            visibility: "none",
            "text-font": ["Open Sans Regular"],
            "text-field": "{nom_regio}",
            "text-allow-overlap": true,
            "symbol-placement": "point",
            "text-size": 14
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "seccions-polygon",
        type: "line",
        source: "seccions-json",
        layout: { visibility: "none", "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#a90230", "line-width": 2 },
        filter: ["==", "$type", "Polygon"]
    },
    {
        id: "seccions-point",
        type: "symbol",
        source: "seccions-point",
        layout: {
            visibility: "none",
            "text-font": ["Open Sans Regular"],
            "text-field": "{nom_secc}",
            "text-allow-overlap": true,
            "symbol-placement": "point",
            "text-size": 14
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },

    {
        id: "limits-geojson-polygon",
        type: "fill",
        source: "limits-json",
        layout: { visibility: "none" },
        paint: {
            "fill-color": [
                "match",
                ["get", "CODI"],
                ["zpnat"],
                "rgba(200, 153, 72, 0.5)",
                ["rnp"],
                "rgba(46, 128, 113, 0.5)",
                ["pnat"],
                "rgba(191, 68, 85, 0.5)",
                "#000000"
            ],
            "fill-opacity": ["interpolate", ["linear"], ["zoom"], 10, 0, 13.8, 1]
        },
        filter: ["==", "$type", "Polygon"]
    },
    {
        id: "limits-point",
        type: "symbol",
        source: "limits-point",
        layout: {
            "text-font": ["Open Sans Bold"],
            "text-field": ["to-string", ["get", "NOM"]],
            "symbol-placement": "point",
            "text-size": 18,
            "text-letter-spacing": ["interpolate", ["linear"], ["zoom"], 0, 0, 22, 0],
            "text-line-height": 1.2,
            "text-max-width": 15,
            "text-justify": "center",
            "text-anchor": "center",
            "text-allow-overlap": true,
            visibility: "none"
        },
        paint: {
            "text-opacity": ["interpolate", ["linear"], ["zoom"], 10, 0, 13.8, 1],
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "foer-point",
        type: "symbol",
        source: "foer-point",
        layout: {
            "text-font": ["Open Sans Regular"],
            "text-field": "{CODI}",
            "text-size": 12,
            "text-offset": [0, 1.5],
            "text-allow-overlap": false,
            visibility: "none"
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "foer-point2",
        type: "circle",
        source: "foer-point",
        layout: { visibility: "none" },
        paint: {
            "circle-stroke-width": 3,
            "circle-stroke-color": "white",
            "circle-opacity": 0.7,
            "circle-radius": 8,
            "circle-color": "#eb073b"
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "112-point",
        type: "symbol",
        source: "112-point",
        layout: {
            "text-font": ["Open Sans Regular"],
            "text-field": "{MATRICULA}",
            "text-size": 12,
            "text-offset": [0, 1.5],
            "text-allow-overlap": false,
            visibility: "none"
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "112-point2",
        type: "circle",
        source: "112-point",
        layout: { visibility: "none" },
        paint: {
            "circle-stroke-width": 3,
            "circle-stroke-color": "white",
            "circle-opacity": 0.7,
            "circle-radius": 8,
            "circle-color": "#2c2f43"
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "aparcaments-polygon",
        type: "fill",
        source: "aparcaments-json",
        layout: {
            visibility: "visible"
        },
        paint: {
            "fill-opacity": 0.8,
            "fill-color": "#1fa0d3"
        },
        filter: ["==", "$type", "Polygon"]
    },
    {
        id: "tanques_vehicle-point",
        type: "symbol",
        source: "tanques_vehicle-point",
        layout: {
            "icon-image": "no_entry",
            "icon-size": 0.8,
            "icon-allow-overlap": false,
            visibility: "visible"
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "aparcaments-point",
        type: "symbol",
        source: "aparcaments-point",
        layout: {
            "icon-image": "parking",
            "icon-size": 0.7,
            "icon-allow-overlap": false,
            visibility: "visible"
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "dea",
        type: "symbol",
        source: "dea",
        layout: {
            "symbol-placement": "point",
            "icon-image": "DEA",
            "icon-size": 0.7,
            "icon-allow-overlap": false,
            visibility: "none"
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "refugis",
        type: "symbol",
        source: "refugis",
        layout: {
            "symbol-placement": "point",
            "icon-image": "Refugi",
            "icon-size": 0.7,
            "icon-allow-overlap": false,
            visibility: "none"
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },
    {
        id: "ZonaAcampada",
        type: "symbol",
        source: "ZonaAcampada",
        layout: {
            "symbol-placement": "point",
            "icon-image": "Tenda",
            "icon-size": 0.7,
            "icon-allow-overlap": false,
            visibility: "none"
        },
        paint: {
            "text-color": "#000000",
            "text-halo-color": "#fff",
            "text-halo-width": 1.5
        },
        filter: ["==", "$type", "Point"]
    },

];
