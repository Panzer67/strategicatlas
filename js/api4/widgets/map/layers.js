define([
    "dojo/_base/declare",
    "esri/request",
    "esri/Graphic",
    "esri/geometry/Point",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    'esri/layers/CSVLayer',
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/PointSymbol3D",
    "esri/symbols/ObjectSymbol3DLayer"
], function (declare, esriRequest, Graphic, Point, GraphicsLayer, FeatureLayer, CSVLayer, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
        PointSymbol3D, ObjectSymbol3DLayer) {
    return  {
        getGraphicsLayer: function (properties) {
            var graphicsLayer = new GraphicsLayer();
            var graphics = [];

            esriRequest(properties.url, {responseType: "json"}).then(function (response) {
                console.log(response);
                var data = response.data;
                if (data.type === "FeatureCollection") {
                    var features = data.features;
                    for (var i = 0; i < features.length; i++) {
                        var geometry = features[i].geometry;
                        if (geometry.type === "Point") {
                            var coordinates = geometry.coordinates;
                            var point = new Point({
                                x: coordinates[0],
                                y: coordinates[1]
                            });

                            var markerSymbol = new SimpleMarkerSymbol({
                                color: [226, 119, 40],
                                outline: {// autocasts as new SimpleLineSymbol()
                                    color: [255, 255, 255],
                                    width: 2
                                }
                            });
                            var pointGraphic = new Graphic({
                                geometry: point,
                                symbol: markerSymbol
                            });
                            graphics.push(pointGraphic);
                        }
                    }
                    graphicsLayer.addMany(graphics);
                }
            }, function (error) {
                console.log(error);
            });

            return graphicsLayer;

        },
        getGeojsonPointLayer: function (properties) {
            var self = this;
            var graphicsLayer = new GraphicsLayer();
            var graphics = [];

            esriRequest(properties.url, {responseType: "json"}).then(function (response) {
                console.log(response);
                var data = response.data;
                if (data.type === "FeatureCollection") {
                    var features = data.features;
                    for (var i = 0; i < features.length; i++) {
                        var geometry = features[i].geometry;
                        var properties = features[i].properties;
                        if (geometry.type === "Point") {
                            var coordinates = geometry.coordinates;
                            var point = new Point({
                                x: coordinates[0],
                                y: coordinates[1]
                            });

                            var objectSymbol = self.get3DSymbol(properties.symbol);
                            var pointGraphic = new Graphic({
                                geometry: point,
                                symbol: objectSymbol
                            });
                            graphics.push(pointGraphic);
                        }
                    }
                    graphicsLayer.addMany(graphics);
                }
            }, function (error) {
                console.log(error);
            });

            return graphicsLayer;

        },
        getCSVLayer: function () {
            return new CSVLayer();
        },
        getFeatureLayer: function () {
            return new FearuteLayer();
        },
        get3DSymbol: function (symbol) {
            return new PointSymbol3D({
                symbolLayers: [new ObjectSymbol3DLayer(symbol)]
            });
        }
    };
});

