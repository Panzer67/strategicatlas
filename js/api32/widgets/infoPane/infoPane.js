define([
    'dojo/dom',
    'dojo/on',
    'dojo/fx',     
    'dojo/_base/declare',    
    'dojo/_base/lang',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!widgets/infoPane/infoPane.html'
], function(dom, on, fx, declare, lang, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, template) {
    var toggler;
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function(options) {
            this.options = options;
        },
        postCreate: function() {
            this.inherited(arguments);
            
        },
        wipeHeaderInOut: function() {
            var layerlist = dom.byId("infoPaneContent");
            var triangle = dom.byId("infoPaneHeader").childNodes[1];

            if (layerlist.style.display === "none") {
                setTimeout(function () {
                    triangle.innerHTML = "<path d='M0 0 L16 0 L8 16 Z'></path>";
                }, 100);
                fx.wipeIn({node: "infoPaneContent", duration: 500}).play();
            }
            else {
                setTimeout(function () {
                    triangle.innerHTML = "<path d='M8 0 L0 16 L16 16 Z'></path>";
                }, 100);
                fx.wipeOut({node: "infoPaneContent", duration: 500}).play();
            }
        }
    });
});