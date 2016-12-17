define([
    'widgets/armamentToolbox/nukeCalculator',
    'esri/layers/GraphicsLayer',
    'esri/units',
    'esri/geometry/Circle',
    'esri/graphic',
    'esri/tasks/Geoprocessor',
    'esri/tasks/FeatureSet',
    'dojo/fx/Toggler',
    'dojo/string',
    'dojo/number',
    'dojo/on',
    'dojo/dom',
    'dojo/_base/lang',
    'dojo/dom-style',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!widgets/nuke/nuke.html'
], function(NukeCalculator, GraphicsLayer, Units, Circle, Graphic, Geoprocessor, FeatureSet, Toggler, string, number, on, dom, lang, domStyle, declare, _WidgetBase, _TemplatedMixin, template) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
            this.typeOfExplosion = "groundburst";            
        },
        postCreate: function () {
            var self = this;
            var nukeNode = dom.byId(this.options.nodeId);
            lang.mixin(this, {nukeNode: nukeNode});
            domStyle.set(this.nukeNode, {
                display: this.options.display
            });
            
            this.map.disableDoubleClickZoom();         
                        
            var glNuclear = new GraphicsLayer({id: 'nuclear'});
            lang.mixin(this, {glNuclear: glNuclear});
            this.map.addLayer(this.glNuclear);
            
            var togglerAirPressures = new Toggler({
                node: "airPressures"
            });
            lang.mixin(this, {togglerAirPressures: togglerAirPressures});
            this.togglerAirPressures.hide();            
            this.selector.innerHTML = this.selectTemplate(this.options.bombs);            
            
            this.basemapList.innerHTML = this.basemapSwitcherTemplate(this.options.basemaps);
            
            for(var i = 0; i < this.options.basemaps.length; i++) {
                this.domNode = dom.byId(this.options.basemaps[i].basemap);
                this.own(on(this.domNode, "click", function(e) {
                    self.map.setBasemap(e.target.id);                      
                }));
            }
        },
        startup: function () {
            var self = this;
            on(dom.byId('radioAirburst'), "click", function (e) {
                self.togglerAirPressures.show();
                self.typeOfExplosion = NukeCalculator.getTypeOfExplosion("radioAirburst");
            });
            on(dom.byId('radioGroundburst'), "click", function (e) {
                self.togglerAirPressures.hide();
                self.typeOfExplosion = NukeCalculator.getTypeOfExplosion("radioGroundburst");
            });
            
            this.map.on("dbl-click", lang.hitch(this, 'kaBoom'));
        },
        kaBoom: function (e) {   
            if (domStyle.get(this.nukeNode, "display") === "block") {
                this.placeNuke(e);
            }
        },
        placeNuke: function (e) {
            console.log(e);
            var features = [];
            var circle = [];
            var yield = NukeCalculator.getYield("selector");
            var bombName = NukeCalculator.getBombName("selector");
            var maxOverpressure = (this.typeOfExplosion === "airburst") ? NukeCalculator.getMaxOverpressure(".maxOverpressure:checked") : null;
            var bomb = NukeCalculator.getBurstInfo(bombName, yield, this.typeOfExplosion, maxOverpressure);            
            var graphic = null;
            var infoTemplate = NukeCalculator.getIntoTemplateContent(bomb);
            if (this.glNuclear.graphics.length !== 60) {
                //gl.clear();
                for (var i = 0; i < bomb.radii.length; i++) {
                    circle[i] = new Circle({
                        center: e.mapPoint,
                        radius: bomb.radii[i].radius,
                        radiusUnit: Units.METERS,
                        geodesic: true
                    });
                    if (i === 0) {
                        graphic = new Graphic(circle[i], NukeCalculator.getThermalSymbol());
                        features.push(graphic);
                    } else if (i === 1) {
                        graphic = (bomb.radii[i].radius === 0) ? new Graphic() : new Graphic(circle[i], NukeCalculator.getAirpressure5Symbol());
                    } else if (i === 2) {
                        graphic = (bomb.radii[i].radius === 0) ? new Graphic() : new Graphic(circle[i], NukeCalculator.getAirpressure10Symbol());
                    } else if (i === 3) {
                        graphic = (bomb.radii[i].radius === 0) ? new Graphic() : new Graphic(circle[i], NukeCalculator.getAirpressure20Symbol());
                    } else {
                        graphic = new Graphic(circle[i], NukeCalculator.getFireballSymbol());
                        graphic.setInfoTemplate(infoTemplate);
                    }
                    //gl.setInfoTemplate(infoTemplate);
                    this.glNuclear.add(graphic);
                    
                }
                var featureSet = new FeatureSet();
                featureSet.features = features;

                var params = {"inputPoly": featureSet};
                var gp = new Geoprocessor("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/GPServer/PopulationSummary");
                gp.setOutputSpatialReference({wkid: 102100}); // 102100 WGS_1984_Web_Mercator_Auxiliary_Sphere
                gp.on("execute-complete", function (e) {
                    var result = Math.round(e.results[0].value.features[0].attributes.SUM);
                    var total = number.parse(dom.byId("totalCasualties").innerHTML);
                    if (!isNaN(total)) {
                        result += total;
                    }
                    var content = string.substitute("${number:dojo.number.format}", {number: result});
                    dom.byId("totalCasualties").innerHTML = "" + content;
                });
                gp.execute(params);                
            }            
        },
        selectTemplate: function (arr) {
            var selectOptions = "";
            for (var i = 0; i < arr.length; i++) {
                selectOptions += "<option id=" + arr[i].id + " value=" + ((arr[i].hasOwnProperty("yield")) ? arr[i].yield : arr[i].range) + " class=" + ((arr[i].hasOwnProperty("class")) ? arr[i].class : "") + ">";
                selectOptions += arr[i].text + "</option>";
            }

            return selectOptions;
        },
        removeBomb: function () {
            if (this.glNuclear) {
                this.glNuclear.clear();
                this.map.infoWindow.hide();
                dom.byId("totalCasualties").innerHTML = "";
            }
        },
        basemapSwitcherTemplate: function(arr) {
            
            var template = "<table id=tableBasemapsList border=0>";           
            
            template += "<tr><th colspan=3><h3 id=hh>Basemaps</h3></th></tr>";
            for(var i = 0; i < arr.length; i++) {
                template += "<tr class=basemaplistclass><td valign=top><input type=radio name=basemapSwitcher id=" + arr[i].basemap + " " + ((i === 0) ? " checked" : "") + "></td><td colspan=2>" + arr[i].name + "</td></tr>";            
            }
            template += "</table>";
            return template;
        }
        
        
    });
});

