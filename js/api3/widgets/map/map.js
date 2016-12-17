define([
    'widgets/general/generalFunctions',
    './geojsonlayer',
    './geojsonPointLayer',
    './geojsonPolygonLayer',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Evented',
    'dojo/dom',
    'dojo/on',
    'dojo/dom-construct',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/Menu',
    'dijit/MenuItem',
    'esri/graphic',
    'esri/geometry/geometryEngine',
    'esri/arcgis/utils',
    'esri/map',
    'esri/basemaps',
    'esri/Color',
    'esri/units',
    'esri/renderers/SimpleRenderer',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/renderers/SimpleRenderer',
    'esri/layers/GraphicsLayer',
    'esri/layers/FeatureLayer',
    'esri/layers/WMSLayer',
    'esri/layers/WMSLayerInfo',
    'esri/layers/WFSLayer',
    'esri/layers/CSVLayer',
    'esri/layers/KMLLayer',
    'esri/InfoTemplate',
    'esri/geometry/Extent',
    'esri/geometry',
    'esri/geometry/Circle',
    'esri/toolbars/edit'
], function (generalFunctions, GeoJsonLayer, GeojsonPointLayer, GeojsonPolygonLayer, declare, lang, Evented, dom, on, domConstruct, _WidgetBase, _TemplatedMixin, Menu, MenuItem,
        Graphic, geometryEngine, arcgisUtils, Map, basemaps, Color, Units, SimpleRenderer, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, SimpleRenderer,
        GraphicsLayer, FeatureLayer, WMSLayer, WMSLayerInfo, WFSLayer, CSVLayer, KMLLayer, InfoTemplate, Extent, geometry, Circle, Edit) {

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
            domConstruct.create("div", {id: "coordinates"}, elem);


        },
        startup: function () {
            var self = this;
            if (this.options.hasOwnProperty("basemaps")) {
                console.log("nobasemap");
                basemaps.delorme = this.options.basemaps;
                this.map = new Map(this.options.id, this.options.mapOptions);

            } else {

                this.map = new Map(this.options.id, this.options.mapOptions);
            }

            if (this.options.hasOwnProperty("layers")) {
                on.once(this.map, 'load', lang.hitch(this, '_addLayers'));
                on.once(this.map, 'layers-add-result', lang.hitch(this, '_mapCreated'));
            } else {
                on.once(this.map, 'load', lang.hitch(this, '_mapCreated'));
            }

            this.map.on("load", function () {
                self.map.on("mouse-move", self.showCoordinates);
                self.map.on("mouse-drag", self.showCoordinates);
            });


        },
        _addLayers: function (response) {

            var glBufferPoints = new GraphicsLayer({id: 'rangeBufferLayer'});
            lang.mixin(this, {glBufferPoints: glBufferPoints});
            this.map.addLayer(this.glBufferPoints, 0);

            var layers = [];

            for (var i = 0; i < this.options.layers.length; i++) {
                var fl = this._createLayer(this.options.layers[i]);
                layers.push(fl);

                //this.map.addLayer(fl);

            }
            console.log(layers);
            this.map.addLayers(layers);



        },
        _mapCreated: function (response) {
            var self = this;
            console.log(this.map);
            //this.map = response.map;
            var editActive = false;
            lang.mixin(this, {editActive: editActive});

            var edit = new Edit(this.map);
            lang.mixin(this, {edit: edit});

            this.edit.on("activate", function (e) {
                self.editActive = true;
            });
            this.edit.on("deactivate", function (e) {
                self.editActive = false;
            });

            this.map.on("click", function () {
                self.edit.deactivate();
            });


            var params = {map: this.map};
            this.emit('map-ready', params);
        },
        _createLayer: function (layer) {
            var self = this;

            switch (layer.type) {
                case "geojsonPolygonLayer":
                    var geojsonPolygonLayer = new GeojsonPolygonLayer(layer.properties);
                    return geojsonPolygonLayer;
                case "geojsonPointLayer":
                    var geojsonPointLayer = new GeojsonPointLayer(layer.properties);
                    if (layer.properties.hasOwnProperty("rangeVisible") && layer.properties.rangeVisible) {
                        this.createMenuForPoint(geojsonPointLayer);

                    }
                    return geojsonPointLayer;

                case "geojsonLayer":
                    var rend = new SimpleRenderer(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([238, 69, 0, 1]), 2));
                    layer.properties.renderer = rend;
                    var geoJsonLayer = new GeoJsonLayer(layer.properties);

                    return geoJsonLayer;

                case "featureLayer":
                    var fLayer = new FeatureLayer(layer.url, layer.properties);
                    if (layer.hasOwnProperty("infoTemp")) {
                        var template = new InfoTemplate(layer.infoTemp.title, layer.infoTemp.content);
                        fLayer.setInfoTemplate(template);
                    }
                    return fLayer;
                case "kmlLayer":
                    var kmlLayer = new KMLLayer(layer.url, layer.properties);

                    return kmlLayer;
                case "wfsLayer":

                    return new WFSLayer(layer.properties);
                case "csvLayer":
                    var csv = new CSVLayer(layer.url, layer.properties);
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


                    var fl = new WMSLayer(layer.url, layer.properties);
                    return fl;
            }
        },
        showCoordinates: function (e) {
            var mp = geometry.webMercatorUtils.webMercatorToGeographic(e.mapPoint);
            dom.byId("coordinates").innerHTML = mp.x.toFixed(6) + " " + mp.y.toFixed(6);
        },
        createMenuForPoint: function (layer) {
            var self = this;
            var selectedGraphic;
            var menu = new Menu({});
            menu.addChild(new MenuItem({
                label: "Range",
                onClick: function (e) {
                    var attributes = selectedGraphic.attributes;
                    if (!selectedGraphic.rangeVisible && !self.editActive) {

                        var point = selectedGraphic.geometry;
                        var parentCoordinates = generalFunctions.getCoordinates(selectedGraphic.geometry);

                        for (var i = 0; i < attributes.weapons.length; i++) {

                            var bufferedGeometry = geometryEngine.geodesicBuffer(point, [attributes.weapons[i].range], 9036, false);
                            var buffer = new Graphic(bufferedGeometry, generalFunctions.getFillSymbol(attributes.faction, attributes.weapons[i].weaponType));
                            buffer.setAttributes({parentCoordinates: parentCoordinates});
                            self.glBufferPoints.add(buffer);
                        }
                        selectedGraphic.rangeVisible = true;

                    } else {
                        for (var i = 0; i < attributes.weapons.length; i++) {
                            var graphic = generalFunctions.selectGraphicFromBufferPointsLayer(self.glBufferPoints, selectedGraphic.geometry);
                            self.glBufferPoints.remove(graphic);
                        }
                        selectedGraphic.rangeVisible = false;
                    }
                }
            }));
            if (layer.options.movable) {
                menu.addChild(new MenuItem({
                    label: "Move",
                    onClick: function () {
                        if (selectedGraphic.rangeVisible) {
                            var attributes = selectedGraphic.attributes;
                            for (var i = 0; i < attributes.weapons.length; i++) {
                                var graphic = generalFunctions.selectGraphicFromBufferPointsLayer(self.glBufferPoints, selectedGraphic.geometry);
                                self.glBufferPoints.remove(graphic);
                            }
                            selectedGraphic.rangeVisible = false;
                        }
                        self.edit.activate(Edit.MOVE, selectedGraphic);
                    }
                }));
            }
            menu.startup();

            layer.on("mouse-over", function (e) {
                selectedGraphic = e.target.e_graphic;
                menu.bindDomNode(e.graphic.getDojoShape().getNode());
            });
            layer.on("mouse-out", function (e) {
                menu.unBindDomNode(e.graphic.getDojoShape().getNode());
            });
        }
        
    });


});