define([
    'dojo/dom',
    'dojo/on',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/query',
    'dojo/fx',
    'dojo/request',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'esri/dijit/Measurement',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!widgets/measurement/measurement.html'
], function (dom, on, domStyle, domClass, query, fx, request, declare, lang, Measurement, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, template) {

    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
        },
        postCreate: function () {
            this.inherited(arguments);
            var measurementNode = dom.byId(this.options.nodeId);
            domStyle.set(measurementNode, {
                display: this.options.display
            });

            var measurement = new Measurement({
                map: this.map
            }, dom.byId("measurementDiv"));
            measurement.startup();


        },
        startup: function () {

        }


    });
});