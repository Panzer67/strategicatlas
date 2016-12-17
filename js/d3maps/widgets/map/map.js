define([
    'd3/d3.v3.min',
    'd3/queue',
    'dojo/dom',
    'dojo/dom-construct',
    'dojo/_base/declare',
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
    Evented,
    _WidgetBase,
    _TemplatedMixin
    ) {


    var napoleon = {};

    napoleon.cities =
            [{"lon": 24.0, "lat": 55.0, "name": "Kowno"},
                {"lon": 25.3, "lat": 54.7, "name": "Wilna"},
                //{"lon": 26.4, "lat": 54.4, "name": "Smorgoni", dir: -1},
                //{"lon": 26.8, "lat": 54.3, "name": "Molodexno", dir: -1},
                //{"lon": 27.7, "lat": 55.2, "name": "Gloubokoe"},
                //{"lon": 27.6, "lat": 53.9, "name": "Minsk", dir: -1},
                //{"lon": 28.5, "lat": 54.3, "name": "Studienska", dir: -1},
                {"lon": 28.7, "lat": 55.5, "name": "Polotsk"},
                {"lon": 29.19, "lat": 54.3, "name": "Berezina river", dir: -1},
                {"lon": 30.2, "lat": 55.3, "name": "Witebsk"},
                //{"lon": 30.4, "lat": 54.5, "name": "Orscha", dir: -1},
                //{"lon": 30.4, "lat": 53.9, "name": "Mohilow", dir: -1},
                {"lon": 32.0, "lat": 54.8, "name": "Smolensk"},
                //{"lon": 33.2, "lat": 54.9, "name": "Dorogobouge"},
                //{"lon": 34.3, "lat": 55.2, "name": "Wixma", dir: -1},
                //{"lon": 34.4, "lat": 55.5, "name": "Chjat"},
                {"lon": 35.55, "lat": 55.39, "name": "Borodino"},
                {"lon": 37.6, "lat": 55.8, "name": "Moscow"}
                //{"lon": 36.6, "lat": 55.3, "name": "Tarantino", dir: -1},
                //{"lon": 36.5, "lat": 55.0, "name": "Malo-jarosewli", dir: -1}
            ];
            
    napoleon.army = [
    /* Group 1 */
                {lon1: 24.0, lat1: 54.9, lon2: 24.5, lat2: 55.0, size: 340000, dir: 1, group: 1},
                {lon1: 24.5, lat1: 55.0, lon2: 25.5, lat2: 54.6, size: 340000, dir: 1, group: 1},
                {lon1: 25.5, lat1: 54.6, lon2: 26.0, lat2: 54.7, size: 340000, dir: 1, group: 1},
                {lon1: 26.0, lat1: 54.7, lon2: 27.0, lat2: 54.8, size: 320000, dir: 1, group: 1},
                {lon1: 27.0, lat1: 54.8, lon2: 28.0, lat2: 54.9, size: 300000, dir: 1, group: 1},
                {lon1: 28.0, lat1: 54.9, lon2: 28.5, lat2: 55.0, size: 280000, dir: 1, group: 1},
                {lon1: 28.5, lat1: 55.0, lon2: 29.0, lat2: 55.1, size: 240000, dir: 1, group: 1},
                {lon1: 29.0, lat1: 55.1, lon2: 30.0, lat2: 55.2, size: 210000, dir: 1, group: 1},
                {lon1: 30.0, lat1: 55.2, lon2: 30.3, lat2: 55.3, size: 180000, dir: 1, group: 1},
                {lon1: 30.3, lat1: 55.3, lon2: 32.0, lat2: 54.8, size: 175000, dir: 1, group: 1},
                {lon1: 32.0, lat1: 54.8, lon2: 33.2, lat2: 54.9, size: 145000, dir: 1, group: 1},
                {lon1: 33.2, lat1: 54.9, lon2: 34.4, lat2: 55.5, size: 140000, dir: 1, group: 1},
                {lon1: 34.4, lat1: 55.5, lon2: 35.5, lat2: 55.4, size: 127100, dir: 1, group: 1},
                {lon1: 35.5, lat1: 55.4, lon2: 36.0, lat2: 55.5, size: 100000, dir: 1, group: 1},
                {lon1: 36.0, lat1: 55.5, lon2: 37.6, lat2: 55.8, size: 100000, dir: 1, group: 1},
                {lon1: 37.6, lat1: 55.8, lon2: 37.65, lat2: 55.65, size: 100000, dir: 1, group: 1},
                {lon1: 37.65, lat1: 55.65, lon2: 37.45, lat2: 55.62, size: 100000, dir: -1, group: 1},
                {lon1: 37.45, lat1: 55.62, lon2: 37.0, lat2: 55.0, size: 98000, dir: -1, group: 1},
                {lon1: 37.0, lat1: 55.0, lon2: 36.8, lat2: 55.0, size: 97000, dir: -1, group: 1},
                {lon1: 36.8, lat1: 55.0, lon2: 35.4, lat2: 55.3, size: 96000, dir: -1, group: 1},
                {lon1: 35.4, lat1: 55.3, lon2: 34.3, lat2: 55.2, size: 87000, dir: -1, group: 1},
                {lon1: 34.3, lat1: 55.2, lon2: 33.3, lat2: 54.8, size: 55000, dir: -1, group: 1},
                {lon1: 33.3, lat1: 54.8, lon2: 32.0, lat2: 54.6, size: 37000, dir: -1, group: 1},
                {lon1: 32.0, lat1: 54.6, lon2: 30.4, lat2: 54.4, size: 24000, dir: -1, group: 1},
                {lon1: 30.4, lat1: 54.4, lon2: 29.2, lat2: 54.3, size: 20000, dir: -1, group: 1},
                {lon1: 29.2, lat1: 54.3, lon2: 29.13, lat2: 54.29, size: 20000, dir: -1, group: 1},
                {lon1: 29.13, lat1: 54.29, lon2: 28.5, lat2: 54.2, size: 50000, dir: -1, group: 1}, /* joined by group 2 */
                {lon1: 28.5, lat1: 54.2, lon2: 28.3, lat2: 54.3, size: 50000, dir: -1, group: 1},
                {lon1: 28.3, lat1: 54.3, lon2: 26.8, lat2: 54.3, size: 48000, dir: -1, group: 1},
                {lon1: 26.8, lat1: 54.3, lon2: 26.8, lat2: 54.4, size: 12000, dir: -1, group: 1},
                {lon1: 26.8, lat1: 54.4, lon2: 25.0, lat2: 54.4, size: 14000, dir: -1, group: 1},
                {lon1: 25.0, lat1: 54.4, lon2: 24.4, lat2: 54.4, size: 8000, dir: -1, group: 1},
                {lon1: 24.4, lat1: 54.4, lon2: 24.2, lat2: 54.4, size: 4000, dir: -1, group: 1},
                {lon1: 24.2, lat1: 54.4, lon2: 24.1, lat2: 54.4, size: 4000, dir: -1, group: 1},
                {lon1: 24.1, lat1: 54.4, lon2: 24.1, lat2: 54.4, size: 4000, dir: -1, group: 1},//
                /* Group 2 */
                {lon1: 24.0, lat1: 55.1, lon2: 24.5, lat2: 55.2, size: 60000, dir: 1, group: 2},
                {lon1: 24.5, lat1: 55.2, lon2: 25.5, lat2: 54.7, size: 60000, dir: 1, group: 2},
                {lon1: 25.5, lat1: 54.7, lon2: 26.6, lat2: 55.7, size: 60000, dir: 1, group: 2},
                {lon1: 26.6, lat1: 55.7, lon2: 27.4, lat2: 55.6, size: 40000, dir: 1, group: 2},
                {lon1: 27.4, lat1: 55.6, lon2: 28.7, lat2: 55.5, size: 33000, dir: 1, group: 2},
                {lon1: 28.7, lat1: 55.5, lon2: 28.7, lat2: 55.5, size: 33000, dir: 1, group: 2},
                {lon1: 28.7, lat1: 55.5, lon2: 29.2, lat2: 54.29, size: 33000, dir: -1, group: 2},
                {lon1: 29.2, lat1: 54.29, lon2: 29.2, lat2: 54.29, size: 30000, dir: -1, group: 2},
                /* Group 3 */
                {lon1: 24.0, lat1: 55.2, lon2: 24.5, lat2: 55.3, size: 22000, dir: 1, group: 3},
                {lon1: 24.5, lat1: 55.3, lon2: 24.6, lat2: 55.8, size: 22000, dir: 1, group: 3},
                {lon1: 24.6, lat1: 55.8, lon2: 24.6, lat2: 55.8, size: 6000, dir: 1, group: 3},
                {lon1: 24.6, lat1: 55.8, lon2: 24.2, lat2: 54.4, size: 6000, dir: -1, group: 3},
                {lon1: 24.2, lat1: 54.4, lon2: 24.1, lat2: 54.4, size: 6000, dir: -1, group: 3},
                {lon1: 24.1, lat1: 54.4, lon2: 24.1, lat2: 54.4, size: 6000, dir: -1, group: 3}
                
                
            ];
            
    napoleon.temp = [
                {lon1: 37.75, lon2: 36.0, temp1: 0, temp2: 0, date: "18 Oct 1812"},
                {lon1: 36.0, lon2: 33.2, temp1: 0, temp2: -9,  date: "24 Oct 1812"},
                {lon1: 33.2, lon2: 32.0, temp1: -9, temp2: -21, date: "09 Nov 1812"},
                {lon1: 32.0, lon2: 29.2, temp1: -21, temp2: -11, date: "14 Nov 1812"},
                {lon1: 29.2, lon2: 28.5, temp1: -11, temp2: -20, date: "24 Nov 1812"},
                {lon1: 28.5, lon2: 27.2, temp1: -20, temp2: -24, date: "28 Nov 1812"},
                {lon1: 27.2, lon2: 26.7, temp1: -24, temp2: -30, date: "01 Dec 1812"},
                {lon1: 26.7, lon2: 25.3, temp1: -30, temp2: -26, date: "06 Dec 1812"},
                {lon1: 25.3, lon2: 25.3, temp1: -26, temp2: -26, date: "07 Dec 1812"}
            ];
            
    napoleon.temp = napoleon.temp.map(function (d) {
        d.dir = -1;
        d.temp = d.temp * 1.25;
        return d;
    });
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
            this._createMap();
            this._mapReady();
        },
        _createSvg: function() {    
            div = d3.select("#mapd3").append("div").attr("class", "tooltip").style("opacity", 0);
            svg = d3.select("#mapd3")
                .append("svg")
                .attr("preserveAspectRatio","xMidYMid meet")
                .attr("viewBox", "0 0 1600 700")
                .classed("svg-content", true);
                
        },
        _mapReady: function () {
            
            this.emit('ready', {});
        },
        _createMap: function(countries) {            
            queue().defer(d3.json, "geojson/world.geojson").defer(d3.csv, "csv/cities.csv").await(function (error, file1, file2) {
                var projection = d3.geo.mercator().center([31, 54]).scale(4420).translate([width / 2, height / 2]);
                var geoPath = d3.geo.path().projection(projection);
                napoleon.cities = napoleon.cities.map(function (d) {
                    var point = projection([d.lon, d.lat]);                    
                    d.x = point[0];
                    d.y = point[1];
                    return d;
                });
                
                
                var widthScale = d3.scale.linear().domain([0, 340000]).range([1, 50]);
                                
                // marching directions on map
                var marchingDirections = d3.select("svg").selectAll("line").data(napoleon.army);
               
                marchingDirections.enter().append("line")
                    .attr("x1", function(d) {
                        return projection([d.lon1, d.lat1])[0];
                    })
                    .attr("y1", function(d) {
                        return projection([d.lon1, d.lat1])[1];
                    })
                    .attr("x2", function(d) {
                        return projection([d.lon2, d.lat2])[0];
                    })
                    .attr("y2", function(d) {
                        return projection([d.lon2, d.lat2])[1];
                    })
                    .style("stroke-width", function(d) {
                        return widthScale(d.size);
                    })                    
                    .style("stroke", function(d) {
                        if(d.group === 1) {
                            return (d.dir === 1) ? "blue" : "black";                            
                        }
                        else if(d.group === 2) {
                            return "green";
                        }
                        else if(d.group === 3){
                            return "orange";
                        } 
                    })                   
                    .style("opacity", 1)                    
                    .style("stroke-linecap", "round");
                    
                //cities on map    
                
                var cities = d3.select("svg").selectAll("g").data(napoleon.cities);
                cities = cities.enter().append("g")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
                //div = d3.select("#mapd3").append("div").attr("class", "tooltip hidden").style("opacity", 1);
                var offsetL = document.getElementById('mapd3').offsetLeft;
                var offsetT = document.getElementById('mapd3').offsetTop;
                cities.append("circle").attr('r', 6).attr("class","cities").attr("id",function(d) {
                    return d.name;
                }).style("fill", "#F45310")
                .on("mouseover", function(d) {		
                    var mouse = d3.mouse(svg.node()).map( function(d) { return parseInt(d); } );
                    div.transition()		
                        .duration(200)		
                        .style("opacity", 1);		
                    div.html("<p>" + d.name + "</p>")
                        .attr("style", "left:"+(mouse[0]+offsetL)+"px;top:"+(mouse[1]+offsetT)+"px");
                        
                    })					
                .on("mouseout", function(d) {		
                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                });
               
                
                var header = d3.select("svg").append("g").attr("transform", "translate(0,0)");
                header.append("text").attr("transform", "translate(" + projection([28, 55])[0] + "," + projection([28, 56.4])[1] + ")" ).attr("class", "headerd3")
                        
                        .style("font-size","38px")
                        .text("Napoleon's March to Moscow");
                
                var temps = d3.select("svg").append("g").attr("transform", "translate(0,0)");
                
                //temps.append("g").attr("transform", "translate(400,0)");
                
                var tempScale = d3.scale.linear().domain([1, -41]).range([0, 200]);
                var distanceScale = d3.scale.linear().domain([1, 960]).range([0, 1060]);

                var yaxis = d3.svg.axis().orient("right").scale(tempScale);
                var xaxis = d3.svg.axis().scale(distanceScale);
                
                temps.append("g")
                    .attr("transform", "translate(" + projection([37.7, 55])[0] + "," + projection([37.75,54.55])[1] + ")" ).attr("class", "y axis").style("opacity", 1)
                    .call(yaxis);
                
                var celciusText = temps.append("g").attr("transform", "translate(0,0)");
                celciusText.append("text").attr("transform", "translate(" + projection([38.2, 53.76])[0] + "," + projection([38.2, 53.76])[1] + ")" ).text("(℃)");
                
                temps.append("g")
                    .attr("transform", "translate(" + projection([24.0, 53])[0] + "," + projection([24.0, 53])[1] + ")" ).attr("class", "y axis").style("opacity", 1)
                    .call(xaxis);    
                    
                var kilometerText = temps.append("g").attr("transform", "translate(0,0)");    
                kilometerText.append("text").attr("transform", "translate(" + projection([31, 52.7])[0] + "," + projection([31, 52.7])[1] + ")" ).text("(Km)");
                
                var temp = [
                    {lon1: 37.75, lat1: 55.65,lon2: 37.75, lat2: 53, date: ""},
                    {lon1: 24.0, lat1: 53, lon2: 37.75, lat2: 53, date: ""},
                    {lon1: 36.0, lat1: 55.2, lon2: 36.0, lat2: 54.52, date: "24 Oct 1812"},
                    {lon1: 33.2, lat1: 54.8, lon2: 33.2, lat2: 54.19, date: "09 Nov 1812" },
                    {lon1: 32.0, lat1: 54.6, lon2: 32.0, lat2: 53.76, date: "14 Nov 1812"},
                    {lon1: 29.2, lat1: 54.25, lon2: 29.2, lat2: 54.12, date: "24 Nov 1812"},
                    {lon1: 28.5, lat1: 54.2, lon2: 28.5, lat2: 53.8, date: "28 Nov 1812"},
                    {lon1: 27.2, lat1: 54.3, lon2: 27.2, lat2: 53.65, date: "01 Dec 1812"},
                    {lon1: 26.7, lat1: 54.4, lon2: 26.7, lat2: 53.43, date: "06 Dec 1812"},
                    {lon1: 25.3, lat1: 54.4, lon2: 25.3, lat2: 53.57, date: "07 Dec 1812"}
                ];
                //lon1: 37.73, lat1: 55.65,lon2: 37.73, lat2: 53
                var XandYlinesForTemperature = temps.append("g").attr("transform", "translate(0,0)");
                XandYlinesForTemperature.selectAll("line").data(temp).enter().append("line")
                    .attr("x1", function(d) {
                        return projection([d.lon1, d.lat1])[0];
                    })
                    .attr("y1", function(d) {
                        return projection([d.lon1, d.lat1])[1];
                    })
                    .attr("x2", function(d) {
                        return projection([d.lon2, d.lat2])[0];
                    })
                    .attr("y2", function(d) {
                        return projection([d.lon2, d.lat2])[1];
                    })
                    .style("stroke-width", 1)                    
                    .style("stroke", "black")                   
                    .style("opacity", 1)                    
                    .style("stroke-linecap", "round");
                
               
                //cities on map   
                /*
                var cities = d3.select("svg").selectAll("g").data(napoleon.cities);
                cities = cities.enter().append("g")
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });

                var city = cities.append("circle").attr('r', 3).attr("class","cities").style("fill", "black");
                
                cities.on("mouseover", function(d,i) {
                    city.classed("hiddenCities", true).classed("cities", false);
                    console.log(d);
                })
                .on("mouseout",  function(d,i) {
                    city.classed("hiddenCities", false).classed("cities", true);
                }); */
                  
                var temperatureLine = temps.append("g").attr("transform", "translate(0," + projection([37.75,54.55])[1] + ")");          
                 
                temperatureLine.selectAll("line").data(napoleon.temp).enter().append("line")
                    .attr("x1", function(d) {
                        return projection([d.lon1])[0];
                    })
                    .attr("y1", function(d) {
                        return tempScale(d.temp1);
                    })
                    .attr("x2", function(d) {
                        return projection([d.lon2])[0];
                    })
                    .attr("y2", function(d) {
                        return tempScale(d.temp2);
                    })
                    .style("stroke-width", 1)                    
                    .style("stroke", "red")                   
                    .style("opacity", 1)                    
                    .style("stroke-linecap", "round");
                
                var dateText = temps.append("g").attr("transform", "translate(0,0)");
                dateText.selectAll("text").data(temp).enter().append("text")
                    .attr("x", function(d) {
                        return projection([d.lon2, d.lat2])[0];        
                    })
                    .attr("y", function(d) {
                        return projection([d.lon2, d.lat2])[1];      
                    })
                    .attr("transform", "translate(0,17)")
                    .text(function(d) {
                        return d.date;
                    });
                
            });

        }
    });
});