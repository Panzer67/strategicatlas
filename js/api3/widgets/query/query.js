define([
    'esri/layers/GraphicsLayer',
    'dojo/dom',
    'dojo/on',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/query',
    'dojo/fx',
    'dojo/request',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!widgets/query/query.html'
], function (GraphicsLayer, dom, on, domStyle, domClass, query, fx, request, declare, lang, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, template) {

    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
        },
        postCreate: function () {
            this.inherited(arguments);
            var queryNode = dom.byId(this.options.nodeId);
            domStyle.set(queryNode, {
                display: this.options.display
            });

            var queryLayer = new GraphicsLayer({id: "queryLayer"});
            lang.mixin(this, {queryLayer: queryLayer});

            this.map.addLayer(this.queryLayer, 0);

            var layers;
            lang.mixin(this, {layers: layers});
            if (this.options.hasOwnProperty("layers")) {
                //this.layers = this.getLayerArrays(this.options.layers);
                this.layers = this.getLayersForQuery(this.options.layers);
            }
            dom.byId("querySelector").innerHTML = this.getQueryLayerOptions(this.layers);

            var queryLayerId = dom.byId("querySelector").value;
            lang.mixin(this, {queryLayerId: queryLayerId});

        },
        startup: function () {

        },
        getQueryLayerOptions: function (arr) {
            var selectOptions = "";
            for (var i = 0; i < arr.length; i++) {
                selectOptions += "<option id=" + arr[i].id + " value=" + arr[i].id + ">";
                selectOptions += arr[i].className + "</option>";
            }
            return selectOptions;
        },
        queryOnLayer: function (e) {
            var self = this;
            this.queryLayerId = dom.byId("querySelector").value;
            var count = 0;
            var graphics = [];
            console.log(this.layers);
            for (var i = 0; i < this.layers.length; i++) {
                if (this.layers[i].id === this.queryLayerId) {
                    if (this.layers[i].visible) {
                        graphics = this.layers[i].graphics;
                        for (var j = 0; j < graphics.length; j++) {
                            lang.mixin(graphics[j], {id: "queryResult" + count});
                            count++;
                        }
                    }
                }
            }

            dom.byId("queryContent").innerHTML = this.getQueryTemplates(graphics);

            on(query(".queryResults"), "click", function (e) {

                for (var i = 0; i < graphics.length; i++) {
                    if (e.target.id === graphics[i].id) {
                        var node = query(".activeQueryDiv");
                        if (node.length !== 0) {
                            domClass.remove(dom.byId(node[0].id), "activeQueryDiv");
                        }
                        domClass.add(dom.byId(e.target.id), "activeQueryDiv");
                        self.map.centerAndZoom(graphics[i].geometry, 9);
                    }
                }
            });

        },
        getQueryTemplates: function (graphics) {
            var count = 0;

            var queryDivs = "";
            for (var i = 0; i < graphics.length; i++) {
                queryDivs += "<div id=" + graphics[i].id + " class=queryResults>" + graphics[i].attributes.type + "</div>";
                count++;
            }
            return queryDivs;
        },
        getLayersForQuery: function (layers) {
            var queryLayers = [];
            if (layers.hasOwnProperty("geojsonPointLayers")) {
                var arr = layers["geojsonPointLayers"];
                for (var i = 0; i < arr.length; i++) {
                    var layer = this.map.getLayer(arr[i]);
                    queryLayers.push(layer);
                }

            }
            return queryLayers;
        },
        getLayerArrays: function (layers) {
            var featureLayers = [];
            var wmsLayers = [];
            var csvLayers = [];
            var geojsonLayers = [];
            var kmlLayers = [];
            var geojsonPointLayers = [];
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
            if (layers.hasOwnProperty("geojsonPointLayers")) {
                for (var i = 0; i < this.options.layers.geojsonPointLayers.length; i++) {
                    var layer = this.map.getLayer(this.options.layers.geojsonPointLayers[i]);
                    geojsonPointLayers.push(layer);
                }
            }
            return {
                featureLayers: featureLayers,
                csvLayers: csvLayers,
                wmsLayers: wmsLayers,
                geojsonLayers: geojsonLayers,
                kmlLayers: kmlLayers,
                geojsonPointLayers: geojsonPointLayers
            };
        }

    });
});