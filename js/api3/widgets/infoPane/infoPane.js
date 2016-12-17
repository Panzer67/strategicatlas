define([
    'constants/constants',        
    'dojo/dom',
    'dojo/on',
    'dojo/dom-style',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/query',    
    'dojo/request',    
    'dojo/_base/declare',    
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_OnDijitClickMixin',
    'dojo/text!widgets/infoPane/contentPane.html',
    'dojo/text!widgets/infoPane/infoPane.html'
], function (constants, dom, on, domStyle, domConstruct, domClass, query, request, declare, _WidgetBase, _TemplatedMixin, _OnDijitClickMixin, contentPaneTemplate, infoPaneTemplate) {

    return declare([_WidgetBase, _TemplatedMixin, _OnDijitClickMixin], {
        templateString: infoPaneTemplate,
        constructor: function (options) {
            this.options = options;
        },
        postCreate: function () {
            var self = this;
            this.inherited(arguments);
            var infoPaneNode = dom.byId(this.options.nodeId);
            domStyle.set(infoPaneNode, {
                display: this.options.display
            });

            domConstruct.place(contentPaneTemplate, document.body);
            var contentPaneNode = dom.byId("contentPaneNode");

            var windowWidth = window.innerWidth;
            var widthPane = windowWidth - 454;
            domStyle.set(contentPaneNode, {
                width: widthPane + "px"
            });

            this.own(on(window, 'resize', function () {
                var windowWidth = window.innerWidth;
                windowWidth = windowWidth - 454;
                domStyle.set(contentPaneNode, {
                    width: windowWidth + "px"
                });
            }));
            
            var urlRequestAllTitles = constants.URL + this.options.resourcePathAllTitles;
            request(urlRequestAllTitles).then(function (data) {
                
                var result = JSON.parse(data);
                this.allTitles.innerHTML = self._createTitleElements(result);
                
                var id = result[0].id;    
                
                var urlRequestInfo = constants.URL + self.options.resourcePath;               
                request.post(urlRequestInfo, {
                    data: { data: id}
                }).then(function(data) {
                    var result = JSON.parse(data);
                    //this.infoPaneHeader.innerHTML = result.titel;
                    this.infoPaneContent.innerHTML = result.text;   
                    domClass.add(dom.byId("titleId_" + id), "activeTitleDiv");
                }, function(err) {
                    console.log(err);
                });
                
                self.own(on(query(".titleDivs"), "click", function (e) {
                    var node = query(".activeTitleDiv");
                    if (typeof node[0] !== 'undefined' && node[0] !== null) {
                        domClass.remove(dom.byId(node[0].id), "activeTitleDiv");
                    }
                    domClass.add(dom.byId(e.target.id), "activeTitleDiv");
                    var str = e.target.id;
                    var id = str.slice(-1);
                    request.post(urlRequestInfo, {
                        data: { data:id } 
                    }).then(function (data) {
                        var result = JSON.parse(data);
                        //this.infoPaneHeader.innerHTML = result.titel;
                        this.infoPaneContent.innerHTML = result.text;
                    }, function (err) {
                        console.log(err);
                    });                   
                }));
            }, function (err) {
                console.log(err);
            });
            
            

        },
        _createTitleElements: function (titles) {
            var titleDivs = "";

            for (var i = 0; i < titles.length; i++) {
                titleDivs += "<div class=titleDivs id=titleId_" + titles[i].id + " >" + titles[i].titel + "</div>";
            }
            return titleDivs;
        }

    });
});