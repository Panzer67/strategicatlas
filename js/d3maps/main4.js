require([
    'd3/d3.v3.min',
    'dojo/on',
    'dojo/dom',
    'dojo/domReady!'
], function (d3, on, dom) {
    var napoleon = {};

    napoleon.cities =
            [{"lon": 24.0, "lat": 55.0, "name": "Kowno"},
                {"lon": 25.3, "lat": 54.7, "name": "Wilna"},
                {"lon": 26.4, "lat": 54.4, "name": "Smorgoni", dir: -1},
                {"lon": 26.8, "lat": 54.3, "name": "Molodexno", dir: -1},
                {"lon": 27.7, "lat": 55.2, "name": "Gloubokoe"},
                {"lon": 27.6, "lat": 53.9, "name": "Minsk", dir: -1},
                {"lon": 28.5, "lat": 54.3, "name": "Studienska", dir: -1},
                {"lon": 28.7, "lat": 55.5, "name": "Polotzk"},
                {"lon": 29.2, "lat": 54.4, "name": "Bobr", dir: -1},
                {"lon": 30.2, "lat": 55.3, "name": "Witebsk"},
                {"lon": 30.4, "lat": 54.5, "name": "Orscha", dir: -1},
                {"lon": 30.4, "lat": 53.9, "name": "Mohilow", dir: -1},
                {"lon": 32.0, "lat": 54.8, "name": "Smolensk"},
                {"lon": 33.2, "lat": 54.9, "name": "Dorogobouge"},
                {"lon": 34.3, "lat": 55.2, "name": "Wixma", dir: -1},
                {"lon": 34.4, "lat": 55.5, "name": "Chjat"},
                {"lon": 36.0, "lat": 55.5, "name": "Mojaisk"},
                {"lon": 37.6, "lat": 55.8, "name": "Moscou"},
                {"lon": 36.6, "lat": 55.3, "name": "Tarantino", dir: -1},
                {"lon": 36.5, "lat": 55.0, "name": "Malo-jarosewli", dir: -1}
            ]

    var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

    var projection = d3.geo.mercator().center([21, 55]).scale(3000);
    //.scale((width - 3) / (2 * Math.PI))
    //.translate([width / 2, height / 2]);

    var path = d3.geo.path()
            .projection(projection);

    //var graticule = d3.geoGraticule();

    /*svg.append("defs").append("path")
            .datum({type: "Sphere"})
            .attr("id", "sphere")
            .attr("d", path);*/

    /*svg.append("use")
            .attr("class", "stroke")
            .attr("xlink:href", "#sphere");*/

    /*svg.append("use")
            .attr("class", "fill")
            .attr("xlink:href", "#sphere");*/

    //svg.append("path")
    //        .datum(graticule)
    //       .attr("class", "graticule")
    //       .attr("d", path);

    d3.json("http://localhost/strategicatlas/geojson/world-110m.json", function (error, world) {
        if (error)
            throw error;

        svg.insert("path", ".graticule")
                .datum(topojson.feature(world, world.objects.land))
                .attr("class", "land")
                .attr("d", path);

        napoleon.cities = napoleon.cities.map(function (d) {
            var point = projection([d.lon, d.lat]);
            console.log(point);
            d.x = point[0];
            d.y = point[1];
            return d;
        });

        var cities = svg.selectAll("g").data(napoleon.cities);

        cities = cities.enter().append("g")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

        var circles = cities.append("circle").attr('r', 3).style("fill", "black");

        var labels = cities.append("text").text(function (d) {
            return d.name;
        }).style("fill", "black").attr("transform", "translate(5,5)");
    });


});


