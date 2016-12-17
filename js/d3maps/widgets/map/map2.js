define([
    'd3/d3.v3.min',
    'd3/queue',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/Evented',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin'
],
function (
    d3,
    queue,
    dom,
    domConstruct,
    declare,
    lang,
    Evented,
    _WidgetBase,
    _TemplatedMixin
    ) {   
            
    
    var div;
    var svg;        
    var width;
    var height;
    return declare([_WidgetBase, _TemplatedMixin, Evented], {
        id: 'mapd3',
        templateString: '<div></div>',
        constructor: function (options) {
            this.options = options;
            
            if (this.options.id) {
                this.id = this.options.id;
            }
            width = this.options.width;
            height = this.options.height;
            
        },
        postCreate: function () {
           this.inherited(arguments);
           var elem;
           if (this.options.target) {
               elem = dom.byId(this.options.target);
           } else {
               elem = document.body;
           }
           
           domConstruct.place(this.domNode, elem);
           this._createSvg();
        },
        startup: function() {
            //lang.hitch(this, '_createkaBoom')
            this._map();
            //this._mapReady();
        },
        _createSvg: function() {    
            div = d3.select("#mapd3").append("div").attr("class", "tooltip").style("opacity", 0);
            svg = d3.select("#mapd3")
                .append("svg")
                .attr("preserveAspectRatio","xMidYMid meet")
                .attr("viewBox", "0 0 1600 800")
                .classed("svg-content", true);
                
        },
        _mapReady: function () {
            
            this.emit('ready', {});
        },
        _map: function(countries) {   
            var self = this;
            queue().defer(d3.json, "geojson/world.geojson").defer(d3.csv, "csv/cities.csv").await(function(error, file1, file2) {
                self._createMap(file1, file2);
                
            });

        },
        _createMap: function(countries, cities) {
            var projection = d3.geo.mercator().scale(140).translate([width/2,height/2]).center([0,0]);
            var geoPath = d3.geo.path().projection(projection);
                console.log(countries);
            var featureSize = d3.extent(countries.features, function(d) {
                return geoPath.area(d);
            });    
            var countryColor = d3.scale.quantize().domain(featureSize).range(["#fee5d9","#fcbba1","#fc9272","#fb6a4a","#ef3b2c","#cb181d","#99000d"]);
            var graticule = d3.geo.graticule();
            
            
            d3.select("svg").append("path")
                    .datum(graticule)
                    .attr("class", "graticule line")
                    .attr("d", geoPath)
                    .style("fill", "none")
                    .style("stroke", "lightgray")
                    .style("stroke-width", "1px");
            
            d3.select("svg").append("path")
                    .datum(graticule.outline)
                    .attr("class", "graticule outline")
                    .attr("d", geoPath)
                    .style("fill", "none")
                    .style("stroke", "black")
                    .style("stroke-width", "1px");
            
            
            d3.select("svg").selectAll("path.countries").data(countries.features)
                .enter()
                .append("path")
                .attr("d", geoPath)
                .attr("class", "countries")
                .style("fill", function(d) {
                    return countryColor(geoPath.area(d));
                })
                .on("mouseover", centerBounds)
                .on("mouseout", clearCenterBounds);           
            
            
            d3.select("svg").selectAll("circle").data(cities)
                .enter()
                .append("circle")
                .style("fill", "red")
                .attr("class", "cities")
                .attr("r", 3)
                .attr("cx", function(d) {
                    return projection([d.y,d.x])[0];
                })
                .attr("cy", function(d) {
                    return projection([d.y,d.x])[1]; 
                });
                
            function centerBounds(d,i) {
                var thisBounds = geoPath.bounds(d);
                var thisCenter = geoPath.centroid(d);
                d3.select("svg")
                .append("rect")
                .attr("class", "bbox")
                .attr("x", thisBounds[0][0])
                .attr("y", thisBounds[0][1])
                .attr("width", thisBounds[1][0] - thisBounds[0][0])
                .attr("height", thisBounds[1][1] - thisBounds[0][1])
                .style("fill", "none")
                .style("stroke-dasharray", "5 5")
                .style("stroke", "black")
                .style("stroke-width", 2)
                .style("pointer-events", "none");
      
                d3.select("svg")
                .append("circle")
                .attr("class", "centroid")
                .attr("r", 5)
                .attr("cx", thisCenter[0]).attr("cy", thisCenter[1])
                .style("pointer-events", "none");
            } 
            function clearCenterBounds() {
                d3.selectAll("circle.centroid").remove();
                d3.selectAll("rect.bbox").remove();
            }
        }
    });
});