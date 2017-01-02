define([
    "widgets/general/generalFunctions",
    "constants/constants",    
    "dojo/_base/declare",
    "dojo/Evented",
    "esri/graphic",
    "esri/layers/GraphicsLayer",
    "esri/InfoTemplate",       
    "esri/renderers/SimpleRenderer",
    "esri/SpatialReference",    
    "esri/request",    
    "esri/geometry/Point",    
    "dojo/_base/lang"
], function (
        generalFunctions, constants, declare, Evented, Graphic, GraphicsLayer, InfoTemplate,
         SimpleRenderer, SpatialReference, esriRequest, Point, lang
        ) {
    return declare([GraphicsLayer, Evented], {
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
                var renderer = new SimpleRenderer(generalFunctions.getPictureMarkerSymbol(this.options.symbol));
                this.renderer = renderer;
            }
            this._getGeoJsonXhr(this.options.path);
            

        },
        postCreate: function () {

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
                    if (feature.geometry.type === "Point") {
                        var point = new Point(feature.geometry.coordinates);
                        var pointGraphic = new Graphic(point, generalFunctions.getPictureMarkerSymbol(this.options.symbol));

                        if (this.options.infoTemplateTitle) {
                            if(feature.properties.weapons) {
                                var description = generalFunctions.getInfo(feature.properties);
                                pointGraphic.setInfoTemplate(new InfoTemplate(this.options.infoTemplateTitle, description));    
                            } else {
                                pointGraphic.setInfoTemplate(this.createInfoTemplate(this.options.infoTemplateTitle, feature.properties));
                            } 
                        }
                        pointGraphic.setAttributes(feature.properties);
                        this.add(pointGraphic);
                        
                        this.setVisibility(this.options.visible);
                    }
                }                
            }
            this.emit("layer-ready", this);
        },
        _errorGetJsonXhr: function (e) {
            console.error("StrategicPointLayer Error: Couldn't load JSON. Check url. File must be on the same domain or server must be CORS enabled.\n\n" + e);
        }, 
        createInfoTemplate: function(templateTitle, attributes) {
            //console.log(attributes);
            var template = "";
            
            if(attributes.hasOwnProperty("weapons")) {
                template = attributes.template;
                var weapons = attributes.weapons;
                
                template += "<table border=1>";
                template += "<tr><th></th><th><div class=tdTemplate>Weapon</div></th><th><div class=tdTemplate>Range</div></th></tr>";
                for(var i = 0; i < weapons.length; i++) {                    
                    template += "<tr><td >"+ generalFunctions.symbolRenderer(weapons[i].weaponType) +"</td>";
                    template += "<td><div class=tdTemplate>" + weapons[i].missile + "</div></td>";
                    template += "<td><div class=tdTemplate>" + weapons[i].range + " km</div></td></tr>";
                }
                template += "</table>";
            }
            else {
                template = attributes.template;
            }            
            return new InfoTemplate(templateTitle, template);
        }  
    });
});