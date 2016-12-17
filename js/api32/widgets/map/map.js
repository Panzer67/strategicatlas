define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Evented',
    'dojo/dom',
    'dojo/on',
    'dojo/dom-construct',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'esri/arcgis/utils',
    'esri/map',
    'esri/Color',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/renderers/SimpleRenderer',
    'esri/layers/FeatureLayer',
    'esri/layers/WMSLayer',
    'esri/layers/WMSLayerInfo',
    'esri/layers/WFSLayer',
    'esri/layers/CSVLayer',
    'esri/layers/KMLLayer',
    'esri/InfoTemplate',
    'esri/geometry/Extent'
], function (declare, lang, Evented, dom, on, domConstruct, _WidgetBase, _TemplatedMixin, arcgisUtils, Map, Color, SimpleMarkerSymbol, SimpleLineSymbol, SimpleRenderer, FeatureLayer, WMSLayer, WMSLayerInfo, WFSLayer, CSVLayer, KMLLayer, InfoTemplate, Extent) {
    return declare([_WidgetBase, _TemplatedMixin, Evented], {
        id: 'map-div',
        templateString: '<div></div>',
        constructor: function (options) {
            this.options = options;
            if (this.options.id) {
                this.id = this.options.id;
            }

        },
        postCreate: function () {
            this.inherited(arguments);
            var elem;
            if (this.options.target) {
                elem = dom.byId(this.options.target);
            } else {
                elem = document.body;
            }
            domConstruct.place(this.domNode, elem);
        },
        startup: function () {
            if (this.options.hasOwnProperty("noBasemap")) {
                console.log("nobasemap");
                var bounds = new Extent(this.options.noBasemap.extent);
                this.options.mapOptions.extent = bounds;
                this.map = new Map(this.options.id, this.options.mapOptions);
                this.map.setExtent(bounds).then(function() {
                    console.log("extented");
                    lang.hitch(this, '_addLayers');
                });
                
            } else {
                this.map = new Map(this.options.id, this.options.mapOptions);
            }
            
            if(this.options.hasOwnProperty("layers")) {
                on.once(this.map, 'load', lang.hitch(this, '_addLayers'));
                on.once(this.map, 'layers-add-result', lang.hitch(this, '_mapCreated'));
            }
            else {
                on.once(this.map, 'load', lang.hitch(this, '_mapCreated')); 
            }
           
        },
        _addLayers: function (response) {
            
            var layers = [];

            for (var i = 0; i < this.options.layers.length; i++) {
                var fl = this._createLayer(this.options.layers[i]);
                layers.push(fl);
            }
            this.map.addLayers(layers);

        },
        _mapCreated: function (response) {

            //this.map = response.map;
            var params = {map: this.map};
            this.emit('map-ready', params);
        },
        _createLayer: function (layer) {

            switch (layer.type) {
                case "featureLayer":
                    var fLayer = new FeatureLayer(layer.url, layer.props);
                    if (layer.hasOwnProperty("infoTemp")) {
                        var template = new InfoTemplate(layer.infoTemp.title, layer.infoTemp.content);
                        fLayer.setInfoTemplate(template);
                    }
                    return fLayer;
                case "kmlLayer": 
                    var kmlLayer = new KMLLayer(layer.url, layer.props);
                    
                    return kmlLayer;                    
                case "wfsLayer":

                    return new WFSLayer(layer.props);
                case "csvLayer":
                    var csv = new CSVLayer(layer.url, layer.props);
                    var orangeRed = new Color([238, 69, 0, 0.5]); // hex is #ff4500
                    var outline = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([238, 69, 0, 0.5]), 1);
                    var marker = new SimpleMarkerSymbol("solid", 15, outline, orangeRed);
                    var renderer = new SimpleRenderer(marker);
                    csv.setRenderer(renderer);
                    if (layer.hasOwnProperty("infoTemp")) {
                        var template = new InfoTemplate(layer.infoTemp.title, layer.infoTemp.content);
                        csv.setInfoTemplate(template);
                    }
                    return csv;
                case "wmsLayer":

                    
                    var fl = new WMSLayer(layer.url, layer.props);
                    return fl;
            }
        }
    });


});