define([
    'dojo/dom',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/on',
    'dojo/fx',
    'dojo/Deferred',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!widgets/sidePane/sidePane.html'
], function (dom, domStyle, domClass, domConstruct, query, on, fx, Deferred, declare, lang, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, template) {



    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: template,
        constructor: function (options) {
            this.options = options;
            console.log(this.options);
            console.log("hh");
        },
        postCreate: function () {
            var self = this;
            this.inherited(arguments);
            
            var listWidgets = this.options.widgets;
            //this._createWidgetsNodes(listWidgets);
            
            this.own(on(query(".footerButtons"), "click", function (e) {
                //var node = dom.byId(e.target.id + "Pane");
                var nodeButton = dom.byId(e.target.id);
                query(".footerButtons").style("color", "black");
                query(nodeButton).style("color", "#D84204");


                var id = e.target.id.split("Button")[0];
                var node = dom.byId(id);


                var header = dom.byId("sidePaneHeader");
                header.innerHTML = self._getHeaderTitle(id, listWidgets);

                query(".innerPanes").style("display", "none");
                query(node).style("display", "block");

            }));
            
            var height = window.innerHeight;
            var marginPercentage = (height / 100);
            height = height - marginPercentage;
            height = height - 156;
            console.log(marginPercentage);
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
        _getHeaderTitle: function (id, listWidgets) {
            var headerTitle;
            for (var i = 0; i < listWidgets.length; i++) {
                if (listWidgets[i].options.nodeId === id) {
                    headerTitle = listWidgets[i].options.title;
                }
            }
            return headerTitle;
        },
        _createWidgetsNodes: function (listWidgets) {

            var header = dom.byId("sidePaneHeader");
            header.innerHTML = listWidgets[0].options.title;

            for (var i = 0; i < listWidgets.length; i++) {
                var node = "<span id='" + listWidgets[i].options.nodeId + "Button' class='footerButtons glyphicon " + listWidgets[i].options.buttonIcon + "'></span>";
                domConstruct.place(node, "sidePaneFooter");
            }
            query(dom.byId(listWidgets[0].options.nodeId + "Button")).style("color", "#D84204");
        }




    });
});