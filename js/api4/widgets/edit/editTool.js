define([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-class',
    // Dijit stuff
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'esri/graphic',
    'esri/SpatialReference',
    'esri/geometry/Point',
    'esri/geometry',
    'dojo/text!widgets/edit/editTool.html'
], function (declare, lang, on, domClass, _WidgetBase, _TemplatedMixin, Graphic, SpatialReference, Point, geometry, templateString) {

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: templateString,
        options: {},
        editing: false,
        handler: null,
        constructor: function (options) {
            this.options = options;
            this.map = this.options.map;
            this.requestLayer = this.map.getLayer('punten');
            console.log(this.map);
            //var sr = new SpatialReference(4326);
        },
        postCreate: function () {
            this.handler = on.pausable(
                    this.map, 'click', lang.hitch(this, '_addPoint')
                    );
            this.handler.pause();
            this.own(
                    this.handler, on(this.editNode, 'click', lang.hitch(this, '_addRequest'))
                    );
        },
        _addRequest: function () {
            
            this._toggleEditButton();
        },
        _addPoint: function(e) {
            console.log(e);
            var mp = geometry.webMercatorUtils.webMercatorToGeographic(e.mapPoint);
            console.log(mp.x);
            console.log(mp.y);
            var mapPt = e.mapPoint;
            //var punt = new Point();
            var point = new Point([-122.65,45.53],new SpatialReference({ wkid:4326 }));
            //console.log(mapPt);
            var attributes = {};
            var graphic;
            //attributes.id = 2;
            attributes.name = 'punt';
            graphic = new Graphic(mapPt, null, attributes);
            console.log(graphic);
            this.requestLayer.applyEdits([graphic]).then(lang.hitch(this, function(e) {
                this._toggleEditButton();
                console.log(e);
                //alert('Requset submitted');
            }));
            
        },
        _toggleEditButton: function () {
            this.editing = !this.editing;
            if (this.editing) {
                this.editNode.innerHTML = 'Adding Punt';
                this.handler.resume();
            }
            else {
                this.editNode.innerHTML = 'Add Punt';
                this.handler.pause();
            }
            domClass.toggle(this.editNode, 'btn-primary btn-success');
        }
    });
});

