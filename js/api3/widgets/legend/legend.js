define([
    'dojo/dom',
    'dojo/on',
    'dojo/fx',
    'dojo/dom-style',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!widgets/legend/legend.html'
], function (dom, on, fx, domStyle, declare, lang, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, template) {
    var legendNode;
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
            this.bufferGraphicsBucket = [];
        },
        postCreate: function () {
            var self = this;
            this.inherited(arguments);
            legendNode = dom.byId(this.options.nodeId);
            domStyle.set(legendNode, {
                display: this.options.display
            });

            if (this.options.hasOwnProperty("layers")) {
                var layers = this.getLayerArrays(this.options.layers);
                lang.mixin(this, {layers: layers});
            }
            this.legenda.innerHTML = this.layerTemplate(this.layers, this.options);

            var featureLayers = this.layers.featureLayers;
            var wmsLayers = this.layers.wmsLayers;
            var csvLayers = this.layers.csvLayers;
            var geojsonLayers = this.layers.geojsonLayers;
            var geojsonPointLayers = this.layers.geojsonPointLayers;
            var geojsonPolygonLayers = this.layers.geojsonPolygonLayers;

            // bind events
            for (var i = 0; i < featureLayers.length; i++) {
                this.domNode = dom.byId(featureLayers[i].id);
                this.own(on(this.domNode, "click", function (e) {
                    var layerObj = self.map.getLayer(e.target.id);
                    layerObj.setVisibility(((layerObj.visible) ? false : true));
                }));
            }
            for (var i = 0; i < csvLayers.length; i++) {
                this.domNode = dom.byId(csvLayers[i].id);
                this.own(on(this.domNode, "click", function (e) {
                    var layerObj = self.map.getLayer(e.target.id);
                    layerObj.setVisibility(((layerObj.visible) ? false : true));
                }));
            }
            for (var i = 0; i < wmsLayers.length; i++) {
                this.domNode = dom.byId(wmsLayers[i].id);
                this.own(on(this.domNode, "click", function (e) {
                    var layerObj = self.map.getLayer(e.target.id);
                    layerObj.setVisibility(((layerObj.visible) ? false : true));
                }));
            }
            for (var i = 0; i < geojsonLayers.length; i++) {
                this.domNode = dom.byId(geojsonLayers[i].id);
                this.own(on(this.domNode, "click", function (e) {
                    var layerObj = self.map.getLayer(e.target.id);
                    layerObj.setVisibility(((layerObj.visible) ? false : true));
                }));
            }
            for (var i = 0; i < geojsonPointLayers.length; i++) {
                this.domNode = dom.byId(geojsonPointLayers[i].id);
                this.own(on(this.domNode, "click", function (e) {
                    var layerObj = self.map.getLayer(e.target.id);
                    self.checkRangeBufferLayer(self.map.getLayer("rangeBufferLayer"), layerObj);
                    layerObj.setVisibility(((layerObj.visible) ? false : true));
                }));
            }
            for (var i = 0; i < geojsonPolygonLayers.length; i++) {
                this.domNode = dom.byId(geojsonPolygonLayers[i].id);
                this.own(on(this.domNode, "click", function (e) {
                    var layerObj = self.map.getLayer(e.target.id);
                    layerObj.setVisibility(((layerObj.visible) ? false : true));
                }));
            }

            for (var i = 0; i < this.options.basemapSwitcher.length; i++) {
                this.domNode = dom.byId(this.options.basemapSwitcher[i].basemap);
                this.own(on(this.domNode, "click", function (e) {
                    self.map.setBasemap(e.target.id);

                }));
            }
        },
        checkRangeBufferLayer: function (rangeBufferLayer, layer) {

            var graphics = layer.graphics;
            var layerId = layer.id;
            //var bufferGraphics = rangeBufferLayer.graphics;

            for (var i = 0; i < graphics.length; i++) {
                var graphic = graphics[i];
                var geometry = graphic.geometry;
                
                if (graphic.rangeVisible) {  
                    if (layer.visible) {
                        var bufferGraphics = rangeBufferLayer.graphics;
                        for (var j = 0; j < bufferGraphics.length; j++) {
                            var parentCoordinates = bufferGraphics[j].attributes.parentCoordinates;
                            var bufferGraphic = bufferGraphics[j];

                            if (parentCoordinates.x === geometry.x && parentCoordinates.y === geometry.y) {
                                if (bufferGraphic.visible) {
                                    rangeBufferLayer.remove(bufferGraphic);
                                    this.bufferGraphicsBucket.push({
                                        id: layerId,
                                        bufferGraphic: bufferGraphic
                                    }); 
                                    j--;
                                }
                            }
                        }
                    } else {                        
                        for (var j = 0; j < this.bufferGraphicsBucket.length; j++) {
                            var buffer = this.bufferGraphicsBucket[j];
                            if (buffer.id === layerId) {
                                var bufferGraphic = buffer.bufferGraphic;
                                //if (bufferGraphic.attributes.parentCoordinates.x === geometry.x && bufferGraphic.attributes.parentCoordinates.y === geometry.y) {
                                rangeBufferLayer.add(bufferGraphic);
                                //graphic.rangeVisible = true;  
                                //}
                            }
                        }
                        this.removeFromArray(this.bufferGraphicsBucket, layerId);                        
                    }
                }
            }

        },
        removeFromArray: function (arr, item) {
            for (var i = arr.length; i--; ) {
                if (arr[i].id === item) {
                    arr.splice(i, 1);
                }
            }
        },
        getWmsInfoLayers: function (wmsLayers) {
            var wmsInfoLayers = [];
            for (var x = 0; x < wmsLayers.length; x++) {
                var layer = {};
                var visibleLayers = [];
                var layerNames = [];
                var layerInfos = [];
                var infos = wmsLayers[x].layerInfos;
                layer.id = wmsLayers[x].id;
                layer.visibleLayers = wmsLayers[x].visibleLayers;
                layer.visible = wmsLayers[x].visible;
                visibleLayers = wmsLayers[x].visibleLayers;
                for (var y = 0; y < visibleLayers.length; y++) {
                    var str = visibleLayers[y];
                    var p = str.indexOf(":");
                    layerNames.push(str.substring(p + 1, str.length));
                }
                layer.layerNames = layerNames;
                for (var a = 0; a < layerNames.length; a++) {
                    var name = layerNames[a];
                    for (var b = 0; b < infos.length; b++) {
                        if (infos[b].name === name) {
                            layerInfos.push(infos[b]);
                        }
                    }
                }
                layer.layerInfos = layerInfos;

                wmsInfoLayers.push(layer);
            }

            return wmsInfoLayers;
        },
        getLayerArrays: function (layers) {
            var featureLayers = [];
            var wmsLayers = [];
            var csvLayers = [];
            var geojsonLayers = [];
            var kmlLayers = [];
            var geojsonPointLayers = [];
            var geojsonPolygonLayers = [];
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
            if (layers.hasOwnProperty("geojsonPolygonLayers")) {
                for (var i = 0; i < this.options.layers.geojsonPolygonLayers.length; i++) {
                    var layer = this.map.getLayer(this.options.layers.geojsonPolygonLayers[i]);
                    geojsonPolygonLayers.push(layer);
                }
            }
            return {
                featureLayers: featureLayers,
                csvLayers: csvLayers,
                wmsLayers: wmsLayers,
                geojsonLayers: geojsonLayers,
                kmlLayers: kmlLayers,
                geojsonPointLayers: geojsonPointLayers,
                geojsonPolygonLayers: geojsonPolygonLayers
            };
        },
        layerTemplate: function (layers, options) {
            var template = [];
            if (layers.hasOwnProperty("wmsLayers")) {
                var wmsLayers = layers.wmsLayers;
                var wmsInfoLayers = this.getWmsInfoLayers(wmsLayers);
                for (var x = 0; x < wmsInfoLayers.length; x++) {
                    var obj = {};
                    var keyName = wmsInfoLayers[x].id;
                    var templateStr = "";
                    templateStr += "<tr>";
                    templateStr += "<td valign=top rowspan=" + wmsInfoLayers[x].layerInfos.length + "><input type=checkbox class=layerCheckboxes id=" + wmsInfoLayers[x].id + " ";
                    templateStr += (wmsInfoLayers[x].visible) ? "checked" : "";
                    templateStr += "></td>";
                    var layerInfos = wmsInfoLayers[x].layerInfos;
                    for (var y = 0; y < layerInfos.length; y++) {
                        templateStr += (y > 0) ? "<tr>" : "";
                        templateStr += "<td><img heigth=13 width=13 src=" + layerInfos[y].legendURL + "></td>";
                        templateStr += "<td valign=top><span class=layerTitle id=" + layerInfos[y].name + ">" + layerInfos[y].title + "</span></td></tr>";
                    }
                    templateStr += "";
                    obj[keyName] = templateStr;
                    template.push(obj);
                }
            }
            if (layers.hasOwnProperty("geojsonLayers")) {
                var geojsonLayers = layers.geojsonLayers;
                for (var x = 0; x < geojsonLayers.length; x++) {
                    var obj = {};
                    var keyName = geojsonLayers[x].id;
                    var templateStr = "";
                    templateStr += "<tr>";
                    templateStr += "<td valign=top rowspan=1><input type=checkbox class=layerCheckboxes id=" + geojsonLayers[x].id + " ";
                    templateStr += (geojsonLayers[x].visible) ? "checked" : "";
                    templateStr += "></td>";
                    templateStr += "<td>" + this.symbolRenderer(geojsonLayers[x].renderer.getSymbol()) + "</td>";
                    templateStr += "<td valign=top><span class=layerTitle >" + geojsonLayers[x].className + "</span></td></tr>";
                    obj[keyName] = templateStr;
                    template.push(obj);
                }
            }
            if (layers.hasOwnProperty("geojsonPointLayers")) {
                var geojsonPointLayers = layers.geojsonPointLayers;
                for (var x = 0; x < geojsonPointLayers.length; x++) {
                    var obj = {};
                    var keyName = geojsonPointLayers[x].id;
                    var templateStr = "";
                    templateStr += "<tr>";
                    templateStr += "<td valign=top rowspan=1><input type=checkbox class=layerCheckboxes id=" + geojsonPointLayers[x].id + " ";
                    templateStr += (geojsonPointLayers[x].visible) ? "checked" : "";
                    templateStr += "></td>";
                    templateStr += "<td class=sp>" + this.symbolRenderer(geojsonPointLayers[x].renderer.getSymbol()) + "</td>";
                    templateStr += "<td valign=top><span class=layerTitle >" + geojsonPointLayers[x].className + "</span></td></tr>";
                    obj[keyName] = templateStr;
                    template.push(obj);
                }
            }
            if (layers.hasOwnProperty("geojsonPolygonLayers")) {
                var geojsonPolygonLayers = layers.geojsonPolygonLayers;
                for (var x = 0; x < geojsonPolygonLayers.length; x++) {
                    var obj = {};
                    var keyName = geojsonPolygonLayers[x].id;
                    var templateStr = "";
                    templateStr += "<tr>";
                    templateStr += "<td valign=top rowspan=1><input type=checkbox class=layerCheckboxes id=" + geojsonPolygonLayers[x].id + " ";
                    templateStr += (geojsonPolygonLayers[x].visible) ? "checked" : "";
                    templateStr += "></td>";
                    templateStr += "<td class=sp>" + this.symbolRenderer(geojsonPolygonLayers[x].renderer.getSymbol()) + "</td>";
                    templateStr += "<td valign=top><span class=layerTitle >" + geojsonPolygonLayers[x].className + "</span></td></tr>";
                    obj[keyName] = templateStr;
                    template.push(obj);
                }
            }
            if (layers.hasOwnProperty("featureLayers")) {
                var featureLayers = layers.featureLayers;
                for (var x = 0; x < featureLayers.length; x++) {
                    var obj = {};
                    var keyName = featureLayers[x].id;
                    var templateStr = "";
                    templateStr += "<tr>";
                    templateStr += "<td valign=top rowspan=1><input type=checkbox class=layerCheckboxes id=" + featureLayers[x].id + " ";
                    templateStr += (featureLayers[x].visible) ? "checked" : "";
                    templateStr += "></td>";
                    templateStr += "<td>" + this.symbolRenderer(featureLayers[x].renderer.getSymbol()) + "</td>";
                    templateStr += "<td valign=top><span class=layerTitle >" + featureLayers[x].name + "</span></td></tr>";
                    obj[keyName] = templateStr;
                    template.push(obj);
                }
            }
            if (layers.hasOwnProperty("csvLayers")) {
                var csvLayers = layers.csvLayers;
                for (var x = 0; x < csvLayers.length; x++) {
                    var obj = {};
                    var keyName = csvLayers[x].id;
                    var templateStr = "";
                    templateStr += "<tr>";
                    templateStr += "<td valign=top rowspan=1><input type=checkbox class=layerCheckboxes id=" + csvLayers[x].id + " ";
                    templateStr += (csvLayers[x].visible) ? "checked" : "";
                    templateStr += "></td>";
                    templateStr += "<td>" + this.symbolRenderer(csvLayers[x].renderer.getSymbol()) + "</td>";
                    templateStr += "<td valign=top><span class=layerTitle >" + csvLayers[x].className + "</span></td></tr>";
                    obj[keyName] = templateStr;
                    template.push(obj);
                }
            }
            template = this.sortTemplateArrayToTitleOrder(options, template);


            var layerTemplate = "<table border=0>";
            layerTemplate += "<tr><th colspan=3><h3 id=hh>" + this.options.titleLegend + "</h3></th></tr>";

            for (var i = 0; i < template.length; i++) {
                var obj = template[i];
                for (var key in obj) {
                    layerTemplate += obj[key];
                }
            }
            layerTemplate += this.basemapSwitcherTemplate(this.options.basemapSwitcher);
            layerTemplate += "</table>";


            return layerTemplate;
        },
        basemapSwitcherTemplate: function (arr) {

            template = "<tr><th colspan=3><h3 id=hh>Basemaps</h3></th></tr>";
            for (var i = 0; i < arr.length; i++) {
                template += "<tr><td valign=top><input type=radio name=basemapSwitcher id=" + arr[i].basemap + " " + ((i === 0) ? " checked" : "") + "></td><td colspan=2>" + arr[i].name + "</td></tr>";
            }
            return template;
        },
        sortTemplateArrayToTitleOrder: function (options, template) {
            var arr = [];
            for (var x = 0; x < options.layerOrder.length; x++) {
                var layerTitle = options.layerOrder[x];
                for (var y = 0; y < template.length; y++) {
                    if (layerTitle === Object.keys(template[y])[0]) {
                        arr.push(template[y]);
                    }
                }
            }
            return arr;
        },
        symbolRenderer: function (layerSymbol) {

            switch (layerSymbol.type) {
                case "picturemarkersymbol":
                    return "<img heigth=30 width=32 src=" + layerSymbol.url + ">";
                case "simplelinesymbol":
                    return "<svg height=13 width=13><line x1=0 y1=7 x2=13 y2=7 style=stroke:" + this.RGBcolorCode(layerSymbol.color) + ";stroke-width:3 /></svg>";
                case "simplemarkersymbol":
                    return "<svg height=13 width=13><circle cx=6 cy=6 r=5 style=fill:" + this.RGBcolorCode(layerSymbol.color) + ";stroke-width:1;stroke:" + this.RGBcolorCode(layerSymbol.outline.color) + " /></svg>";
                case "simplefillsymbol":
                    return "<svg width=13 height=13><rect width=13 height=13 style=fill:" + this.RGBcolorCode(layerSymbol.color) + ";stroke-width:3;stroke:" + this.RGBcolorCode(layerSymbol.outline.color) + "></svg>";
                default:
                    return "<svg height=13 width=13><circle cx=6 cy=6 r=5 style=fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0) /></svg>";

            }

        },
        enableDisableLayer: function () {

        },
        RGBcolorCode: function (colorObj) {
            return "rgb(" + colorObj.r + "," + colorObj.g + "," + colorObj.b + ")";
        },
        setUnsetVisibility: function (e) {
            var layerObj = this.map._layers[e.target.id];
            layerObj.setVisibility(((layerObj.visible) ? false : true));
        }
    });
});