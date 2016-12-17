/*global define */
/*jshint laxcomma:true*/
define([
    'require',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/Deferred',
    'dojo/on',
    'dojo/dom',
    'dojo/dom-construct',
    'dijit/_WidgetBase'
], function (
        require,
        declare, lang, arrayUtils,
        Deferred,
        on, dom, domConstruct,
        _WidgetBase
        ) {

    function arrange(arr) {
        var mapwidget;
        var pane;
        arrayUtils.forEach(arr, function (item) {
            if (item.type === 'map') {
                mapwidget = item;
            } else if (item.type === 'pane') {
                pane = item;
            }
        });
        return {
            mapwidget: mapwidget,
            pane: pane
        };
    }

    function target(opt) {
        var target = opt.target || document.body;
        return target;
    }

    function domNode(opt) {
        return domConstruct.create('div', {
            id: opt.node
        });
    }

    function targetElem(domTarget) {
        if (domTarget === document.body) {
            return domTarget;
        } else {
            return dom.byId(domTarget);
        }
    }

    return declare([_WidgetBase], {
        constructor: function (options) {
            this.options = options;

        },
        startup: function () {
            var filtered = arrange(this.options.app);
            this.pane = filtered.pane;

            this._requireWidget(filtered.mapwidget)
                    .then(lang.hitch(this, '_mapPaneLoaded'));
        },
        _mapPaneLoaded: function (mapWidget) {
            this.own(on.once(mapWidget, 'map-ready', lang.hitch(this, '_mapReady')));
            
        },
        _mapReady: function (params) {
            var self = this;
            lang.mixin(this.pane.options, params);
            this._requireWidget(this.pane).then(function () {                
                if (self.pane.options.widgets.length > 0) {
                    arrayUtils.forEach(self.pane.options.widgets, function (widget) {
                        lang.mixin(widget.options, params);
                        self._requireWidget(widget);
                    }, self);
                }
            });

        },
        _requireWidget: function (widget) {
            var deferred = new Deferred();
            require([widget.path], function (Widget) {
                var node;
                var w;
                if (widget.node) {
                    node = domNode(widget);
                    domConstruct.place(node, targetElem(target(widget)));
                }
                w = new Widget(widget.options, node);
                deferred.resolve(w);
                w.startup();

            });
            
            return deferred.promise;
        }
    });

});
