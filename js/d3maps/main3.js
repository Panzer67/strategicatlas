require([
    'd3/d3.v3.min',
    'dojo/on',
    'dojo/dom',
    'dojo/domReady!'
], function (d3, on, dom) {


    var width = 900;
    var height = 600;

    var projection = d3.geo.mercator();

    var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
    var path = d3.geo.path()
            .projection(projection);
    var g = svg.append("g");
    d3.json("http://localhost/strategicatlas/geojson/world-110m.json", function (error, topology) {
        console.log(topology);
        g.selectAll("path")
                .data(topojson.feature(topology, topology.objects.land)
                        .geometries)
                .enter()
                .append("path")
                .attr("d", path);
    });

});


