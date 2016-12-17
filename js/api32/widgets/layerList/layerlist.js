define([
    'dojo/dom',
    'dojo/on',
    'dojo/fx',    
    'dojo/_base/declare',    
    'dojo/_base/lang',
    'dijit/_WidgetBase',
    'dijit/_OnDijitClickMixin',
    'dijit/_TemplatedMixin',
    'dojo/text!widgets/layerList/layerlist.html'
], function (dom, on, fx, declare, lang, _WidgetBase, _OnDijitClickMixin, _TemplatedMixin, template) {

    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
        },
        postCreate: function () {
            this.inherited(arguments);
            var self = this;      
            

            var layers = this.getLayerArrays(this.options.layers);            
            var featureLayers = layers.featureLayers;
            var wmsLayers = layers.wmsLayers;
            var csvLayers = layers.csvLayers;

            this.layerList.innerHTML = this.layerTemplate(layers, this.options);

            //var wmsLayers = layers.wmsLayers;
            //var wmsInfoLayers = this.getWmsInfoLayers(wmsLayers);

            //console.log(wmsInfoLayers);


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

            /*
             query(".layerTitle").on("click", function (e) {
             var layerObj = self.map._layers[e.target.id];
             if (!layerObj.visibleAtMapScale) {
             self.map.setScale(layerObj.minScale);
             }
             });
             this.map.on("zoom-end", function () {
             for (var i = 0; i < featureLayers.length; i++) {
             var layerObj = featureLayers[i];
             dom.byId(layerObj.id).disabled = (layerObj.visibleAtMapScale) ? false : true;
             }
             });
             */
        },
        startup: function () {

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
            return {
                featureLayers: featureLayers,
                csvLayers: csvLayers,
                wmsLayers: wmsLayers
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
                    templateStr += "<td valign=top><span class=layerTitle >" + csvLayers[x].name + "</span></td></tr>";
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
            layerTemplate += "</table>";


            return layerTemplate;
        },
        setLegend: function () {

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
                    return "<img heigth=13 width=13 src=" + layerSymbol.url + ">";
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
        },
        wipeHeaderInOut: function () {
            var layerlist = dom.byId("layerlist");
            var triangle = dom.byId("layerheader").childNodes[1];

            if (layerlist.style.display === "none") {
                setTimeout(function () {
                    triangle.innerHTML = "<path d='M0 0 L16 0 L8 16 Z'></path>";
                }, 100);
                fx.wipeIn({node: "layerlist", duration: 500}).play();
            }
            else {
                setTimeout(function () {
                    triangle.innerHTML = "<path d='M8 0 L0 16 L16 16 Z'></path>";
                }, 100);
                fx.wipeOut({node: "layerlist", duration: 500}).play();
            }
        }
    });


});

