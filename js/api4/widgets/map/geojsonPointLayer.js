define([
    "dojo/_base/declare",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    'esri/layers/CSVLayer',
    'dijit/_WidgetBase'
], function(declare, Graphic, GraphicsLayer, FeatureLayer, CSVLayer, _WidgetBase) {
    return  {
        getLayer: function() {
            
            return new GraphicsLayer();
        }
    };
});