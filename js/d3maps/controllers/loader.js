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
], function(require,
        declare,
        lang,
        arrayUtils,
        Deferred,
        on,
        dom,
        domConstruct,
        _WidgetBase) {
    
    function arrange(arr) {
        var mapwidget;
        var pane = [];
        arrayUtils.forEach(arr, function (item) {
            if (item.type === 'map') {
                mapwidget = item;
            } else if (item.type === 'pane') {
                pane.push(item);
            }
        });
        return {
            mapwidget: mapwidget,
            pane: pane
        };
    }
    function domNode(opt) {
        return domConstruct.create('div', {
            id: opt.node
        });
    }
    function target(opt) {
        return opt.target || document.body;
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
            console.log(filtered);
            this.pane = filtered.pane;

            this._requireWidget(filtered.mapwidget)
                    .then(lang.hitch(this, this._mapPaneLoaded));
        },
        _mapPaneLoaded: function (mapWidget) {
            
            this.own(on.once(mapWidget, 'ready', lang.hitch(this, '_mapReady')));
        },
        _mapReady: function (params) {            
            if (this.pane.length > 0) {
                arrayUtils.forEach(this.pane, function (widget) {
                    lang.mixin(widget.options, params);
                    this._requireWidget(widget);
                }, this);
            }
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