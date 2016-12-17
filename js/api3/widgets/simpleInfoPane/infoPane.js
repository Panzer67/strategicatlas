define([
    'dojo/dom',
    'dojo/on',
    'dojo/dom-style',
    'dojo/fx',     
    'dojo/request',
    'dojo/_base/declare',    
    'dojo/_base/lang',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!widgets/simpleInfoPane/infoPane.html'
], function(dom, on, domStyle, fx, request, declare, lang, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, template) {
    
    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function(options) {
            this.options = options;
        },
        postCreate: function() {
            this.inherited(arguments);
            var infoPaneNode = dom.byId(this.options.nodeId);
            domStyle.set(infoPaneNode, {
                display: this.options.display  
            });
            
            request(this.options.resourceUrl).then(function(data) {
                var result = JSON.parse(data);
                this.infoPaneHeader.innerHTML = result.titel;
                this.infoPaneContent.innerHTML = result.text;
            }, function(err) {
                console.log(err);
            });
        }
        
    });
});