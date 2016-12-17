define([
    'dojo/dom',
    'dijit/form/Select',
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!widgets/scale/scale.html'
], function (dom, Select, declare, _WidgetBase, _TemplateMixin, template) {
    return declare([_WidgetBase, _TemplateMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;

        },
        postCreate: function () {
            var self = this;
            var element = dom.byId("scaleSelect");
            element.value = "50000";
            //console.log(this.map.getScale());
            this.map.on("zoom-end", function () {
                //console.log(self.map.getScale());
            });
        },
        setMapScale: function (e) {
            var self = this;

            console.log(e);
            var scale = e.target.value;
            this.map.setScale(scale);
            this.map.on("zoom-end", function () {
                console.log(self.map.getScale());
            });
        }
    });
});