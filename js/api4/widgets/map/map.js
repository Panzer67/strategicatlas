define([
    './layers',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-style',
    'dojo/Evented',
    'dojo/dom',
    'dojo/on',
    'dojo/dom-construct',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/Map',
    'esri/views/SceneView',
    'esri/views/MapView',
    'esri/layers/FeatureLayer',
    'esri/layers/GraphicsLayer',
    'esri/layers/CSVLayer',
    'esri/PopupTemplate'
], function (Layers, declare, lang, domStyle, Evented, dom, on, domConstruct, _WidgetBase, _TemplatedMixin, SimpleRenderer, SimpleMarkerSymbol, Map,
        SceneView, MapView, FeatureLayer, GraphicsLayer, CSVLayer, PopupTemplate) {
    return declare([_WidgetBase, _TemplatedMixin, Evented], {
        id: 'map-div',
        templateString: '<div></div>',
        map: null,
        view: null,
        constructor: function (options) {
            this.options = options;
            if (this.options.id) {
                this.id = this.options.id;
            }
        },
        postCreate: function () {
            var mapElement;
            if (this.options.target) {
                mapElement = dom.byId(this.options.target);
            } else {
                mapElement = document.body;
            }
            domConstruct.place(this.domNode, mapElement);

            var width = window.innerWidth;
            width = width - 400;
            domStyle.set(dom.byId("map-div"), {
                width: width + "px"
            });
            this.own(on(window, 'resize', function () {
                var width = window.innerWidth;
                width = width - 400;

                domStyle.set(dom.byId("map-div"), {
                    width: width + "px"
                });
            }));
        },
        startup: function () {

            this.map = new Map(this.options.mapType);
            this.options.viewProps.map = this.map;
            if (this.options.typeView === "mapView") {
                this.view = new MapView(this.options.viewProps);
            } else if (this.options.typeView === "sceneView") {
                this.view = new SceneView(this.options.viewProps);
            }
            
            
            this.view.then(lang.hitch(this, '_addLayers'));

        },
        _addLayers: function (response) {

            for (var i = 0; i < this.options.layers.length; i++) {
                var fl = this._createLayer(this.options.layers[i]);                
                this.map.add(fl);
            }

            var params = {
                map: this.map,
                view: this.view
            };
            this.emit('map-ready', params);
        },
        _createLayer: function (layer) {


            if (layer.hasOwnProperty("popup")) {
                var template = new PopupTemplate(layer.popup);
                layer.options.popupTemplate = template;
            }
            switch (layer.type) {
                case "featureLayer":
                    return new FeatureLayer(layer.properties);
                case "csvLayer":
                    var csvLayer = new CSVLayer(layer.properties);
                    csvLayer.renderer = new SimpleRenderer({
                        symbol: new SimpleMarkerSymbol({
                            size: "23px",
                            color: [238, 69, 0, 0.5],
                            outline: {
                                width: 0.5,
                                color: "white"
                            }
                        })
                    });
                    return csvLayer;
                case "graphicsLayer":
                        return Layers.getGraphicsLayer(layer.properties);
                case "geojsonPointLayer":
                    return Layers.getGeojsonPointLayer(layer.properties);

            }

        }
    });
});