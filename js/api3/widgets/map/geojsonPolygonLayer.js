define([
    "constants/constants",
    "dojo/_base/declare",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/InfoTemplate",
    "esri/graphicsUtils",
    "esri/Color",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/renderers/SimpleRenderer",
    "esri/SpatialReference",
    "esri/geometry/webMercatorUtils",
    "esri/request",
    "esri/config",
    "esri/geometry/Polygon",
    "esri/geometry/geometryEngine",
    "esri/units",
    "dojo/_base/url",
    "dojo/_base/lang"
], function (
        constants, declare, Graphic, GraphicsLayer, InfoTemplate, graphicsUtils, Color, SimpleMarkerSymbol,
        SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, SimpleRenderer, SpatialReference, webMercatorUtils, esriRequest, esriConfig, Polygon, geometryEngine, Units, Url, lang
        ) {
    return declare([GraphicsLayer], {
        constructor: function (options) {

            this.options = options;
            this.id = options.id;
            this._validState = true;
            this._url = options.url;
            this._data = options.data;
            this._inSpatialReference = new SpatialReference({wkid: 4326});  // Data must be in Geographic Coordinates
            // GeoJSON transformation (optional)
            this._outSpatialReference = null;


            // Renderer
            if (this.options.symbol) {
                var renderer = new SimpleRenderer(this.getPolygonSymbol(this.options.symbol.fillColor, this.options.symbol.lineColor));
                this.renderer = renderer;
            }
            this._getGeoJsonXhr(this.options.path);


        },
        _getGeoJsonXhr: function (path) {
            // xhr request to get data
            var url = constants.URL + path;
            var requestHandle = esriRequest({
                url: url,
                handleAs: "json"
            });
            requestHandle.then(lang.hitch(this, this._addGraphics), lang.hitch(this, this._errorGetGeoJsonXhr));
        },
        _addGraphics: function (json) {

            if (json.type === "FeatureCollection") {
                var features = json.features;
               
                for (var i = 0; i < features.length; i++) {

                    var feature = features[i];

                    if (feature.geometry.type === "Polygon") {
                        var polygon = new Polygon(feature.geometry.coordinates);


                        var polyGraphic = new Graphic(polygon, this.renderer.symbol);
                        if (this.options.infoTemplate) {
                            polyGraphic.setInfoTemplate(new InfoTemplate(feature.properties.title, feature.properties.infoTemplate));
                        }
                        this.add(polyGraphic);
                    }
                    this.setVisibility(this.options.visible);
                    /*if(feature.geometry.type === "Point") {
                     var point = new Point(feature.geometry.coordinates);
                     var pointGraphic = new Graphic(point, this.getPictureMarkerSymbol(this.options.symbol));
                     
                     if(this.options.infoTemplateTitle) {
                     pointGraphic.setInfoTemplate(new InfoTemplate(this.options.infoTemplateTitle, feature.properties.template));
                     }
                     pointGraphic.setAttributes(feature.properties);
                     this.add(pointGraphic);
                     if(this.options.buffer) {
                     var bufferedGeometry = geometryEngine.geodesicBuffer(point, [feature.properties.range], 9036, false);
                     pointGraphic = new Graphic(bufferedGeometry, this.getFillSymbol());
                     if(this.options.infoTemplateTitle) {
                     pointGraphic.setInfoTemplate(new InfoTemplate(this.options.infoTemplateTitle, feature.properties.template));
                     }
                     this.add(pointGraphic);
                     }                        
                     } */
                }
            }
        },
        _errorGetJsonXhr: function (e) {
            console.error("StrategicPointLayer Error: Couldn't load JSON. Check url. File must be on the same domain or server must be CORS enabled.\n\n" + e);
        },
        getPolygonSymbol: function (fillColor, lineColor) {
            var polygonSymbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(
                            SimpleLineSymbol.STYLE_SOLID,
                            new Color(lineColor),
                            1
                            ),
                    new Color(fillColor)
                    );
            return polygonSymbol;
        },
        getSymbol: function () {
            return new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL, new SimpleLineSymbol("solid",
                    new Color([87, 87, 87, 0.65]), 3), new Color([87, 87, 87, 0.35]));
        },
        getSymbol2: function () {
            return new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CROSS, 10, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([87, 87, 87, 0.65]), 3), new Color([87, 87, 87, 0.35]));
        },
        getFillSymbol: function () {
            return new SimpleFillSymbol(SimpleFillSymbol.STYLE_NONE,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]));
        },
        getPictureMarkerSymbol: function (symbol) {
            return new PictureMarkerSymbol(symbol);
        }



    });
});