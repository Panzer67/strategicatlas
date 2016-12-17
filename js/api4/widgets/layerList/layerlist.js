define([
    'dojo/dom',
    'dojo/on',
    'dojo/fx',
    'dojo/query',
    'dojo/_base/declare',
    'dojo/parser',
    'dojo/_base/lang',
    'dijit/_WidgetBase',
    'dijit/_OnDijitClickMixin',
    'dijit/_TemplatedMixin',
    'dojo/text!widgets/layerList/layerlist.html'
], function (dom, on, fx, query, declare, parser, lang, _WidgetBase, _OnDijitClickMixin, _TemplatedMixin, template) {
    
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
        },
        postCreate: function () {
            this.inherited(arguments);
            var self = this;
            var arrayLayers = [];
            var arrayGraphicsLayerIds = this.map.graphicsLayerIds;
            

            for (var i = 0; i < arrayGraphicsLayerIds.length; i++) {
                var layer = this.map._layers[arrayGraphicsLayerIds[i]];
                arrayLayers.push(layer);
            }

            this.layerList.innerHTML = this.layerTemplate(arrayLayers, this.options);

            // bind events
            for (var i = 0; i < arrayLayers.length; i++) {
                this.domNode = dom.byId(arrayLayers[i].id);
                console.log(this.domNode.id);
                this.own(on(this.domNode, "click", function (e) {
                    var layerObj = self.map._layers[e.target.id];

                    layerObj.setVisibility(((layerObj.visible) ? false : true));
                }));
            }
            query(".layerTitle").on("click", function (e) {
                var layerObj = self.map._layers[e.target.id];
                if (!layerObj.visibleAtMapScale) {
                    self.map.setScale(layerObj.minScale);
                }
            });
            this.map.on("zoom-end", function () {
                for (var i = 0; i < arrayLayers.length; i++) {
                    var layerObj = arrayLayers[i];
                    dom.byId(layerObj.id).disabled = (layerObj.visibleAtMapScale) ? false : true;
                }
            });

        },
        startup: function () {

        },
        layerTemplate: function (arrayLayers, options) {

            var layerTemplate = "<h3 id=hh>" + this.options.titleLayers + "</h3>";
            for (var i = 0; i < arrayLayers.length; i++) {
                layerTemplate += "<div>";
                layerTemplate += "<input type=checkbox class=layerCheckboxes id=" + arrayLayers[i].id + " ";
                layerTemplate += (arrayLayers[i].visible) ? "checked" : "";
                layerTemplate += (arrayLayers[i].visibleAtMapScale) ? "" : " disabled";
                layerTemplate += ">" + this.symbolRenderer(arrayLayers[i].renderer.getSymbol());
                layerTemplate += "<span class=layerTitle id=" + arrayLayers[i].id + ">" + arrayLayers[i].arcgisProps.title + "</span>";
                layerTemplate += "</div>";
            }
            return layerTemplate;
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
        increment: function () {
            console.log("hallo");
        },
        wipeHeaderInOut: function () {
            var layerlist = dom.byId("layerlist");
            var triangle = dom.byId("layerheader").childNodes[1];            

            if (layerlist.style.display === "none") {
                setTimeout(function () {
                    triangle.innerHTML = "<path d='M0 0 L16 0 L8 16 Z'></path>";
                }, 500);
                fx.wipeIn({node: "layerlist", duration: 500}).play();
            }
            else {
                setTimeout(function () {
                    triangle.innerHTML = "<path d='M8 0 L0 16 L16 16 Z'></path>";
                }, 500);
                fx.wipeOut({node: "layerlist", duration: 500}).play();
            }
        }
    });


});

