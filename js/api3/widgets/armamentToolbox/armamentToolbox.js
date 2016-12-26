
define([
    'constants/constants',    
    'widgets/general/generalFunctions',
    './nukeCalculator',
    './helperFunctions',
    './weaponsystems',
    'esri/request', 
    'esri/layers/GraphicsLayer',
    'esri/geometry/Circle',
    'esri/geometry/Point',
    'esri/geometry/geometryEngine',
    'esri/units',
    'esri/graphic',
    'esri/graphicsUtils',
    'esri/tasks/Geoprocessor',
    'esri/tasks/FeatureSet',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/PictureMarkerSymbol',
    'esri/InfoTemplate',
    'esri/Color',
    'esri/toolbars/edit',
    'dojo/_base/declare',
    'dojo/dom',
    'dojo/dom-attr',
    'dojo/dom-style',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/fx/Toggler',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/query',
    'dojo/string',
    'dojo/number',
    'dojo/Deferred',
    'dijit/Menu',
    'dijit/MenuItem',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!widgets/armamentToolbox/armamentToolbox.html'
], function (constants, generalFunctions, NukeCalculator, helperFunctions, weaponSystems, esriRequest, GraphicsLayer, Circle, Point, geometryEngine, Units, Graphic,
        graphicsUtils, Geoprocessor, FeatureSet, SimpleFillSymbol, SimpleMarkerSymbol, SimpleLineSymbol, PictureMarkerSymbol,
        InfoTemplate, Color, Edit, declare, dom, domAttr, domStyle, domConstruct, domClass, Toggler, lang, on, query, string, number,
        Deferred, Menu, MenuItem, _WidgetBase, _TemplatedMixin, template) {


    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
            this.typeOfFaction = "red";
            this.editToolbarActive = false;
            this.weaponSystems = weaponSystems.getWeaponSystems();
        },
        postCreate: function () {
            var self = this;
            var armToolboxNode = dom.byId(this.options.nodeId);
            lang.mixin(this, {armToolboxNode: armToolboxNode});
            domStyle.set(this.armToolboxNode, {
                display: this.options.display
            });

            var typeOfExplosion = "groundburst";
            lang.mixin(this, {typeOfExplosion: typeOfExplosion});

            var glWeaponRangeToolbx = new GraphicsLayer({id: 'weaponRange'});
            lang.mixin(this, {glWeaponRangeToolbx: glWeaponRangeToolbx});

            this.map.addLayer(this.glWeaponRangeToolbx, 0);

            var glNuclear = new GraphicsLayer({id: 'nuclear'});
            lang.mixin(this, {glNuclear: glNuclear});

            this.map.addLayer(this.glNuclear);

            var glConventional = new GraphicsLayer({id: 'conventional'});
            lang.mixin(this, {glConventional: glConventional});

            this.map.addLayer(this.glConventional);

            this.map.disableDoubleClickZoom();

            domStyle.set(dom.byId("conventional"), {
                display: 'block'
            });
            domStyle.set(dom.byId("nuclear"), {
                display: 'none'
            });

            var editToolbar = new Edit(this.map);
            lang.mixin(this, {editToolbar: editToolbar});

            var togglerAirPressures = new Toggler({
                node: "airPressures"
            });
            lang.mixin(this, {togglerAirPressures: togglerAirPressures});
            this.togglerAirPressures.hide();
            dom.byId("selector").innerHTML = this.selectTemplate(this.options.bombs);  
                        
            this.setSelectors(this.weaponSystems);            

            this.own(on(query(".buttonWeaponsSwitcher"), "click", function (e) {
                query(".weaponsPanel").style("display", "none");
                if (e.target.id === 'buttonNuclear') {
                    domClass.add(dom.byId("buttonNuclear"), "active");
                    domClass.remove(dom.byId("buttonConventional"), "active");
                    query("#nuclear").style("display", "block");
                } else if (e.target.id === 'buttonConventional') {
                    domClass.add(dom.byId("buttonConventional"), "active");
                    domClass.remove(dom.byId("buttonNuclear"), "active");
                    query("#conventional").style("display", "block");
                }
            }));

            this.own(on(query(".typeOfWeaponSwitcher"), "click", function (e) {
                if (e.target.value === "missiles") {
                    domAttr.remove("selectorMissiles", "disabled");
                    domAttr.set("selectorAntiship", "disabled", "disabled");
                    domAttr.set("selectorArtillery", "disabled", "disabled");
                    domAttr.set("selectorAirdefense", "disabled", "disabled");
                    domAttr.set("selectorNaval", "disabled", "disabled");
                } 
                else if (e.target.value === "antiship") {
                    domAttr.remove("selectorAntiship", "disabled");
                    domAttr.set("selectorMissiles", "disabled", "disabled");
                    domAttr.set("selectorArtillery", "disabled", "disabled");
                    domAttr.set("selectorAirdefense", "disabled", "disabled");
                    domAttr.set("selectorNaval", "disabled", "disabled");
                }                
                else if (e.target.value === "artillery") {
                    domAttr.remove("selectorArtillery", "disabled");
                    domAttr.set("selectorMissiles", "disabled", "disabled");
                    domAttr.set("selectorAntiship", "disabled", "disabled");
                    domAttr.set("selectorAirdefense", "disabled", "disabled");
                    domAttr.set("selectorNaval", "disabled", "disabled");
                } 
                else if (e.target.value === "airdefense") {
                    domAttr.remove("selectorAirdefense", "disabled");
                    domAttr.set("selectorMissiles", "disabled", "disabled");
                    domAttr.set("selectorAntiship", "disabled", "disabled");
                    domAttr.set("selectorArtillery", "disabled", "disabled");
                    domAttr.set("selectorNaval", "disabled", "disabled");
                } 
                else if (e.target.value === "naval") {
                    domAttr.remove("selectorNaval", "disabled");
                    domAttr.set("selectorMissiles", "disabled", "disabled");
                    domAttr.set("selectorAntiship", "disabled", "disabled");
                    domAttr.set("selectorArtillery", "disabled", "disabled");
                    domAttr.set("selectorAirdefense", "disabled", "disabled");
                }
            }));

            this.own(on(query(".factionButtons"), "click", function (e) {
                self.typeOfFaction = e.target.value;                
                self.setClassFactionButtons(self.typeOfFaction);
            }));

            this.createMenuForWeapon();

            domAttr.set("selectorAntiship", "disabled", "disabled");
            domAttr.set("selectorArtillery", "disabled", "disabled");
            domAttr.set("selectorAirdefense", "disabled", "disabled");
            domAttr.set("selectorNaval", "disabled", "disabled");
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
            this.editToolbar.on("activate", function (e) {
                self.editToolbarActive = true;
            });
            this.editToolbar.on("deactivate", function (e) {
                self.editToolbarActive = false;
            });

            this.map.on("dbl-click", lang.hitch(this, 'kaBoom'));
            this.map.on("click", function () {
                self.editToolbar.deactivate();
            });

        },        
        placeNuke: function (e) {
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
                    //this.options.map.add(graphic);

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

                //self.extentToGroundZero(features);
            }
        },
        placeWeapon: function (e) {

            var weaponsCategory = query('input[type=radio][name=typeOfweaponSystem]:checked')[0].value;

            var selectedSystemId = helperFunctions.getSelectedWeaponId(weaponsCategory);
            var selectedSystem = helperFunctions.getWeapon(this.weaponSystems, weaponsCategory, selectedSystemId);

            var point = new Point(e.mapPoint);

            var weaponPoint = new Graphic(point, helperFunctions.getPictureMarkerSymbol(this.typeOfFaction, weaponsCategory, selectedSystem));

            weaponPoint.setAttributes(selectedSystem);

            var rangeVisible = false;
            lang.mixin(weaponPoint, {rangeVisible: rangeVisible});

            var description = generalFunctions.getInfo(selectedSystem);
            var infoTemplate = new InfoTemplate(helperFunctions.capitalize(weaponsCategory), description);

            weaponPoint.setInfoTemplate(infoTemplate);

            this.glConventional.add(weaponPoint);

        },
        kaBoom: function (e) {

            if (domStyle.get(this.armToolboxNode, "display") === "block" && domStyle.get(dom.byId("nuclear"), "display") === "block") {
                this.placeNuke(e);
            } else if (domStyle.get(this.armToolboxNode, "display") === "block" && domStyle.get(dom.byId("conventional"), "display") === "block") {
                this.placeWeapon(e);
            }

        },
        extentToGroundZero: function (featureSet) {
            var featuresExtent = graphicsUtils.graphicsExtent(featureSet);
            this.map.setExtent(featuresExtent, true);
        },
        removeConventional: function () {
            if (this.glConventional) {
                this.glConventional.clear();
                this.glWeaponRangeToolbx.clear();
                this.map.infoWindow.hide();
            }
        },
        removeBomb: function () {
            if (this.glNuclear) {
                this.glNuclear.clear();
                this.map.infoWindow.hide();
                dom.byId("totalCasualties").innerHTML = "";
            }
        },
        setSelectors: function (weaponSystems) {            
            
            domStyle.set(dom.byId("missilesDiv"), {
                    display: 'block'
                });
            dom.byId("selectorMissiles").innerHTML = this.selectTemplate(weaponSystems.missiles);
            
            domStyle.set(dom.byId("antishipDiv"), {
                    display: 'block'
                });
            dom.byId("selectorAntiship").innerHTML = this.selectTemplate(weaponSystems.antiship);
            
            domStyle.set(dom.byId("artilleryDiv"), {
                    display: 'block'
                });
            dom.byId("selectorArtillery").innerHTML = this.selectTemplate(weaponSystems.artillery);
            
            domStyle.set(dom.byId("airdefenseDiv"), {
                    display: 'block'
                });
            dom.byId("selectorAirdefense").innerHTML = this.selectTemplate(weaponSystems.airdefense);  
            domStyle.set(dom.byId("navalDiv"), {
                    display: 'block'
                });
            dom.byId("selectorNaval").innerHTML = this.selectTemplate(weaponSystems.naval);            
        },
        selectTemplate: function (arr) {
            var selectOptions = "";
            for (var i = 0; i < arr.length; i++) {
                selectOptions += "<option id=" + arr[i].id + " value=" + ((arr[i].hasOwnProperty("yield")) ? arr[i].yield : "") + ">";
                selectOptions += arr[i].type + " (" + arr[i].countryOrigin + ")</option>";
            }

            return selectOptions;
        },
        setClassFactionButtons: function (typeOfFaction) {
            if (typeOfFaction === "red") {
                domClass.add(dom.byId("buttonRedFaction"), "btn-danger");
                domClass.remove(dom.byId("buttonRedFaction"), "btn-default");
                domClass.remove(dom.byId("buttonBlueFaction"), "btn-primary");
                domClass.add(dom.byId("buttonBlueFaction"), "btn-default");
                domClass.remove(dom.byId("buttonNeutralFaction"), "btn-success");
                domClass.add(dom.byId("buttonNeutralFaction"), "btn-default");
            }
            if (typeOfFaction === "blue") {
                domClass.add(dom.byId("buttonBlueFaction"), "btn-primary");
                domClass.remove(dom.byId("buttonBlueFaction"), "btn-default");
                domClass.remove(dom.byId("buttonRedFaction"), "btn-danger");
                domClass.add(dom.byId("buttonRedFaction"), "btn-default");
                domClass.remove(dom.byId("buttonNeutralFaction"), "btn-success");
                domClass.add(dom.byId("buttonNeutralFaction"), "btn-default");
            }
            if (typeOfFaction === "neutral") {
                domClass.add(dom.byId("buttonNeutralFaction"), "btn-success");
                domClass.remove(dom.byId("buttonNeutralFaction"), "btn-default");
                domClass.remove(dom.byId("buttonRedFaction"), "btn-danger");
                domClass.add(dom.byId("buttonRedFaction"), "btn-default");
                domClass.remove(dom.byId("buttonBlueFaction"), "btn-primary");
                domClass.add(dom.byId("buttonBlueFaction"), "btn-default");
            }
        },        
        createMenuForWeapon: function () {
            var self = this;

            var selectedGraphic;
            var menu = new Menu({});
            menu.addChild(new MenuItem({
                label: "Range",
                onClick: function () {
                    var attributes = selectedGraphic.attributes;
                    if (!selectedGraphic.rangeVisible && !self.editToolbarActive) {
                        var point = selectedGraphic.geometry;
                        var parentCoordinates = generalFunctions.getCoordinates(selectedGraphic.geometry);

                        for (var i = 0; i < attributes.weapons.length; i++) {

                            var bufferedGeometry = geometryEngine.geodesicBuffer(point, [attributes.weapons[i].range], 9036, false);
                            var weaponBuffer = new Graphic(bufferedGeometry, generalFunctions.getFillSymbol(self.typeOfFaction, attributes.weapons[i].weaponType));
                            weaponBuffer.setAttributes({parentCoordinates: parentCoordinates});
                            self.glWeaponRangeToolbx.add(weaponBuffer);
                        }
                        selectedGraphic.rangeVisible = true;
                    } else {
                        for (var i = 0; i < attributes.weapons.length; i++) {
                            var graphic = generalFunctions.selectGraphicFromBufferPointsLayer(self.glWeaponRangeToolbx, selectedGraphic.geometry);
                            self.glWeaponRangeToolbx.remove(graphic);
                        }
                        selectedGraphic.rangeVisible = false;
                    }
                }
            }));
            menu.addChild(new MenuItem({
                label: "Move",
                onClick: function () {
                    if (selectedGraphic.rangeVisible) {
                        var attributes = selectedGraphic.attributes;
                        for (var i = 0; i < attributes.weapons.length; i++) {
                            var graphic = generalFunctions.selectGraphicFromBufferPointsLayer(self.glWeaponRangeToolbx, selectedGraphic.geometry);
                            self.glWeaponRangeToolbx.remove(graphic);
                        }
                        selectedGraphic.rangeVisible = false;
                    }
                    self.editToolbar.activate(Edit.MOVE, selectedGraphic);
                }
            }));
            menu.addChild(new MenuItem({
                label: "Delete",
                onClick: function () {
                    if (selectedGraphic.rangeVisible) {
                        var attributes = selectedGraphic.attributes;
                        for (var i = 0; i < attributes.weapons.length; i++) {
                            var graphic = generalFunctions.selectGraphicFromBufferPointsLayer(self.glWeaponRangeToolbx, selectedGraphic.geometry);
                            self.glWeaponRangeToolbx.remove(graphic);
                        }
                        selectedGraphic.rangeVisible = false;
                    }
                    self.glConventional.remove(selectedGraphic);
                    self.map.infoWindow.hide();
                }
            }));
            menu.startup();

            this.glConventional.on("mouse-over", function (e) {
                selectedGraphic = e.target.e_graphic;
                menu.bindDomNode(e.graphic.getDojoShape().getNode());
            });
            this.glConventional.on("mouse-out", function (e) {
                menu.unBindDomNode(e.graphic.getDojoShape().getNode());
            });
        }

    });
});

