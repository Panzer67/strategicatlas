define([
    'd3/d3.v3.min',
    'dojo/dom',
    'dojo/on',
    'dojo/fx',
    'dojo/dom-style',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!widgets/legend2/legend2.html'
], function (d3, dom, on, fx, domStyle, declare, lang, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, template) {

    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
        },
        postCreate: function () {
            var self = this;
            this.inherited(arguments);
            var legendNode = dom.byId(this.options.nodeId);
            domStyle.set(legendNode, {
                display: this.options.display
            });
            var theData = [1, 2, 3];
            var circleRadii = [50, 20, 10];
            var spaceCircles = [30, 70, 110];

            var lineData = [{"x": 1, "y": 5}, {"x": 20, "y": 20},
                {"x": 40, "y": 10}, {"x": 60, "y": 40},
                {"x": 80, "y": 5}, {"x": 100, "y": 60}];

            //This is the accessor function we talked about above
            var lineFunction = d3.svg.line()
                    .x(function (d) {
                        return d.x;
                    })
                    .y(function (d) {
                        return d.y;
                    })
                    .interpolate("basis");

//The SVG Container
            var svgContainer = d3.select("#legenda2").append("svg")
                    .attr("width", 200)
                    .attr("height", 200);

//The line SVG Path we draw
            var lineGraph = svgContainer.append("path")
                    .attr("d", lineFunction(lineData))
                    .attr("stroke", "blue")
                    .attr("stroke-width", 2)
                    .attr("fill", "none");

            if (this.options.hasOwnProperty("layers")) {
                var layers = this.getLayerArrays(this.options.layers);
            }

            //this.legenda2.innerHTML = this.layerTemplate(layers, this.options);
        },
        layerTemplate: function (layers, options) {
            if (layers.hasOwnProperty("csvLayers")) {
                var csvLayers = layers.csvLayers;
                //console.log(this.symbolRenderer(csvLayers[0].renderer.getSymbol()));
            }
            if (layers.hasOwnProperty("geojsonLayers")) {
                var geojsonLayers = layers.geojsonLayers;
                //console.log(geojsonLayers[0]._getEsriSymbol("polyline"));
            }
            if (layers.hasOwnProperty("kmlLayers")) {
                var kmlLayers = layers.kmlLayers;
                console.log(kmlLayers[0]);
            }
        },
        symbolRenderer: function (layerSymbol) {

            switch (layerSymbol.type) {
                case "picturemarkersymbol":
                    return "<img heigth=13 width=13 src=" + layerSymbol.url + ">";
                case "simplelinesymbol":
                    return "<svg height=13 width=13><line x1=0 y1=7 x2=13 y2=7 style=stroke:" + this.RGBcolorCode(layerSymbol.color) + ";stroke-width:3 /></svg>";
                case "simplemarkersymbol":
                    return "<svg height=13 width=13><circle cx=6 cy=6 r=5 style=fill:" + this.RGBcolorCode(layerSymbol.color) + ";stroke-width:1;stroke:" + this.RGBcolorCode(layerSymbol.outline.color) + " /></svg>";
                case "simplefillsymbol":
                    return "<svg width=13 height=13><rect width=13 height=13 style=fill:" + this.RGBcolorCode(layerSymbol.color) + ";stroke-width:3;stroke:" + this.RGBcolorCode(layerSymbol.outline.color) + "></svg>";
                default:
                    return "<svg height=13 width=13><circle cx=6 cy=6 r=5 style=fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0) /></svg>";

            }

        },
        getLayerArrays: function (layers) {
            var featureLayers = [];
            var wmsLayers = [];
            var csvLayers = [];
            var geojsonLayers = [];
            var kmlLayers = [];
            if (layers.hasOwnProperty("featureLayers")) {
                for (var i = 0; i < this.options.layers.featureLayers.length; i++) {
                    var layer = this.map.getLayer(this.options.layers.featureLayers[i]);
                    featureLayers.push(layer);
                }
            }
            if (layers.hasOwnProperty("csvLayers")) {
                for (var i = 0; i < this.options.layers.csvLayers.length; i++) {
                    var layer = this.map.getLayer(this.options.layers.csvLayers[i]);
                    csvLayers.push(layer);
                }
            }
            if (layers.hasOwnProperty("wmsLayers")) {
                for (var i = 0; i < this.options.layers.wmsLayers.length; i++) {
                    var layer = this.map.getLayer(this.options.layers.wmsLayers[i]);
                    wmsLayers.push(layer);
                }
            }
            if (layers.hasOwnProperty("geojsonLayers")) {
                for (var i = 0; i < this.options.layers.geojsonLayers.length; i++) {
                    var layer = this.map.getLayer(this.options.layers.geojsonLayers[i]);
                    geojsonLayers.push(layer);
                }
            }
            if (layers.hasOwnProperty("kmlLayers")) {
                for (var i = 0; i < this.options.layers.kmlLayers.length; i++) {
                    var layer = this.map.getLayer(this.options.layers.kmlLayers[i]);
                    kmlLayers.push(layer);
                }
            }
            return {
                featureLayers: featureLayers,
                csvLayers: csvLayers,
                wmsLayers: wmsLayers,
                geojsonLayers: geojsonLayers,
                kmlLayers: kmlLayers
            };
        },
        RGBcolorCode: function (colorObj) {
            return "rgb(" + colorObj.r + "," + colorObj.g + "," + colorObj.b + ")";
        }
    });


});
