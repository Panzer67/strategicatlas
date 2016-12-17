define([
    'dojo/dom',
    'dojo/dom-style',    
    'dojo/on',    
    'dojo/request',
    'dojo/_base/declare',    
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!widgets/sidePane/sidePane.html'
], function (dom, domStyle, on, request, declare, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, template) {

    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;   
        },
        postCreate: function () {            
            this.inherited(arguments);   
            
            this._getContent();
            
            
            var height = window.innerHeight;
            var marginPercentage = (height / 100);
            height = height - marginPercentage;
            height = height - 130;            
            var paneContentDiv = dom.byId("sidePaneContent");
            domStyle.set(paneContentDiv, {
                height: height + "px"
            });
            this.own(on(window, 'resize', function () {                
                height = window.innerHeight;
                marginPercentage = (height / 100);
                height = height - marginPercentage;
                height = height - 130;
                domStyle.set(paneContentDiv, {
                    height: height + "px"
                });
            }));

        },
        startup: function () {

        },
        _getContent: function() {
            request("http://localhost/strategicatlas/mapd3/requestInfo").then(function(data) {
                var result = JSON.parse(data);
                //this.infoPaneHeader.innerHTML = result.titel;
                this.sidePaneContent.innerHTML = result.text;
            }, function(err) {
                console.log(err);
            });
        }
    });
});