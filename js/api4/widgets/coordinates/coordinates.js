define([
    'dojo/_base/declare',
    'dojo/dom',
    'esri/geometry',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!widgets/coordinates/coordinates.html'
], function(declare, dom, geometry, _WidgetBase, _TemplatedMixin, templateString) {
    
    return declare([ _WidgetBase, _TemplatedMixin], {
        templateString: templateString,
        constructor: function(options) {
            this.options = options;
        },
        postCreate: function () {
            var self = this;
            
            this.map.on("mouse-move", this.showCoordinates);
            this.map.on("mouse-drag", this.showCoordinates);
            
        },
        showCoordinates: function(evt) {
            var mp = geometry.webMercatorUtils.webMercatorToGeographic(evt.mapPoint);
            dom.byId("info").innerHTML = mp.x.toFixed(6) + " " + mp.y.toFixed(6);
        }
    
    });
});
