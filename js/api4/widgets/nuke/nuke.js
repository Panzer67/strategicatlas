
define([
    './nukeCalculator',
    'esri/layers/GraphicsLayer',
    'esri/geometry/Circle',
    'esri/units',
    'esri/graphic',
    'esri/graphicsUtils',
    'esri/tasks/Geoprocessor',
    "esri/tasks/FeatureSet",
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/fx/Toggler',
    'dojo/on',
    'dojo/string',
    'dojo/number',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!widgets/nuke/nuke.html'
], function (NukeCalculator, GraphicsLayer, Circle, Units, Graphic,
        graphicsUtils, Geoprocessor, FeatureSet, declare, dom, domConstruct, Toggler, on, string, number, _WidgetBase, _TemplatedMixin, template) {
    var gl;
    var toggler; 
    var typeOfExplosion = "groundburst";
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
            
        },
        postCreate: function () {
            
            gl = new GraphicsLayer({id: 'nuke'});
            this.map.addLayer(gl);
            this.map.disableDoubleClickZoom();
            toggler = new Toggler({
                node: "airPressures"
            });
            toggler.hide();
            dom.byId("selector").innerHTML = this.selectTemplate(this.options.bombs);
        },
        startup: function () {
            on(dom.byId('radioAirburst'), "click", function (e) {
                toggler.show();
                typeOfExplosion = NukeCalculator.getTypeOfExplosion("radioAirburst");
            });
            on(dom.byId('radioGroundburst'), "click", function (e) {
                toggler.hide();
                typeOfExplosion = NukeCalculator.getTypeOfExplosion("radioGroundburst");
            });
            this.map.on("dbl-click", this.kaBoom);
        },
        kaBoom: function (evt) {            
            var features = [];
            var circle = [];
            var yield = NukeCalculator.getYield("selector");
            var bombName = NukeCalculator.getBombName("selector");
            var maxOverpressure = (typeOfExplosion === "airburst") ? NukeCalculator.getMaxOverpressure(".maxOverpressure:checked") : null;
            var bomb = NukeCalculator.getBurstInfo(bombName, yield, typeOfExplosion, maxOverpressure);
            console.log(bomb);
            var graphic = null;
            var infoTemplate = NukeCalculator.getIntoTemplateContent(bomb);
            if (gl.graphics.length !== 60) {
                //gl.clear();
                for (var i = 0; i < bomb.radii.length; i++) {
                    circle[i] = new Circle({
                        center: evt.mapPoint,
                        radius: bomb.radii[i].radius,
                        radiusUnit: Units.METERS,
                        geodesic: true
                    });
                    if (i === 0) {
                        graphic = new Graphic(circle[i], NukeCalculator.getThermalSymbol());
                        features.push(graphic);
                    }
                    else if (i === 1) {
                        graphic = (bomb.radii[i].radius === 0) ? new Graphic() : new Graphic(circle[i], NukeCalculator.getAirpressure5Symbol());
                    }
                    else if (i === 2) {
                        graphic = (bomb.radii[i].radius === 0) ? new Graphic() : new Graphic(circle[i], NukeCalculator.getAirpressure10Symbol());
                    }
                    else if (i === 3) {
                        graphic = (bomb.radii[i].radius === 0) ? new Graphic() : new Graphic(circle[i], NukeCalculator.getAirpressure20Symbol());
                    }
                    else {
                        graphic = new Graphic(circle[i], NukeCalculator.getFireballSymbol());
                        graphic.setInfoTemplate(infoTemplate);
                    }
                    //gl.setInfoTemplate(infoTemplate);
                    gl.add(graphic);                    

                }
                var featureSet = new FeatureSet();
                featureSet.features = features;
                

                var params = {"inputPoly": featureSet};
                var gp = new Geoprocessor("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/GPServer/PopulationSummary");
                gp.setOutputSpatialReference({wkid: 102100}); // 102100 WGS_1984_Web_Mercator_Auxiliary_Sphere
                gp.on("execute-complete", function (e) {
                    var result = Math.round(e.results[0].value.features[0].attributes.SUM);   
                    var total = number.parse(dom.byId("totalCasualties").innerHTML);
                    if(!isNaN(total)) {
                       result += total;
                    }
                    var content = string.substitute("${number:dojo.number.format}", {number: result});
                    dom.byId("totalCasualties").innerHTML = "" + content;
                });
                gp.execute(params);

                //self.extentToGroundZero(features);
            }

        },
        
        extentToGroundZero: function (featureSet) {
            var featuresExtent = graphicsUtils.graphicsExtent(featureSet);
            this.map.setExtent(featuresExtent, true);
        },
        removeBomb: function () {
            if (gl) {
                gl.clear();
                this.map.infoWindow.hide();
                dom.byId("totalCasualties").innerHTML = "";
            }
        },
        selectTemplate: function(arrayBombs) {
            var selectOptions = "";
            for(var i = 0; i < arrayBombs.length; i++) {
                selectOptions += "<option value=" + arrayBombs[i].yield + ">";
                selectOptions += arrayBombs[i].name + "</option>";
            }
            
            return selectOptions;
        }
    });
});

