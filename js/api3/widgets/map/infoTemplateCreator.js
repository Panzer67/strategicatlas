define([
    "d3/d3.v3.min",
    "esri/InfoTemplate"
], function (d3, InfoTemplate) {
    return {
        getNewInfoTemplate: function () {
            
            
            return new InfoTemplate("title", "content");
        }
    };
});