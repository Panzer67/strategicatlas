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
        },
        postCreate: function () {
            var self = this;
            this.inherited(arguments);
            var legendNode = dom.byId(this.options.nodeId);
            lang.mixin(this, {legendNode: legendNode});
            domStyle.set(this.legendNode, {
                display: this.options.display
            });
            var layers;
            if (this.options.hasOwnProperty("layers")) {
                layers = this.getLayerArrays(this.options.layers);
            }
            this.legenda.innerHTML = this.layerTemplate(layers, this.options);
            
            for(var i = 0; i < this.options.basemapSwitcher.length; i++) {
                this.domNode = dom.byId(this.options.basemapSwitcher[i].basemap);
                this.own(on(this.domNode, "click", function(e) {
                    self.map.basemap = e.target.id;                      
                }));
            }

        },
        layerTemplate: function (layers, options) {
            var layerTemplate = "<table border=0>";
            layerTemplate += "<tr><th colspan=3><h3 id=hh>" + this.options.titleLegend + "</h3></th></tr>";
            layerTemplate += this.basemapSwitcherTemplate(this.options.basemapSwitcher);
            layerTemplate += "</table>";
            

            return layerTemplate;
        },
        basemapSwitcherTemplate: function(arr) {
           
            template = "<tr><th colspan=3><h3 id=hh>Basemaps</h3></th></tr>";
            for(var i = 0; i < arr.length; i++) {
                template += "<tr><td valign=top><input type=radio name=basemapSwitcher id=" + arr[i].basemap + " " + ((i === 0) ? " checked" : "") + "></td><td colspan=2>" + arr[i].name + "</td></tr>";            
            }
            return template;
        }
        
    });
});