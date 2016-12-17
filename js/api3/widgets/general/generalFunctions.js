define([
    'esri/InfoTemplate',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/PictureMarkerSymbol',
    'esri/Color'
], function (InfoTemplate, SimpleFillSymbol, SimpleMarkerSymbol, SimpleLineSymbol, PictureMarkerSymbol, Color) {
    return {
        getWeaponColor: function (weaponType) {
            switch (weaponType) {
                case "surfaceToAirMissile":
                    return [82, 230, 91, 0.25];
                case "radar":
                    return [138, 138, 135, 0.25];
                case "surfaceToSurfaceBallisticMissile":
                    return [157, 59, 202, 0.25];
                case "rocket":
                    return [157, 59, 202, 0.25];
                case "howitzer":
                    return [157, 59, 202, 0.25];
                case "antiShipCruiseMissile":
                    return [255, 0, 0, 0.25];
            }
        },
        RBGColorGenerator: function (colorArr) {
            return "rgb(" + colorArr[0] + "," + colorArr[1] + "," + colorArr[2] + ")";
        },
        symbolRenderer: function (weaponType) {
            return "<svg width=13 height=13><rect width=13 height=13 style=fill:" + this.RBGColorGenerator(this.getWeaponColor(weaponType)) + ";stroke-width:3;stroke:" + this.RBGColorGenerator(this.getWeaponColor(weaponType)) + "></svg>";
        },
        getPictureMarkerSymbol: function (symbol) {
            return new PictureMarkerSymbol(symbol);
        },
        getCoordinates: function (geometry) {
            var x = geometry.x;
            var y = geometry.y;
            return {
                x: x,
                y: y
            };
        },
        selectGraphicFromBufferPointsLayer: function (graphicsLayer, geometry) {
            var graphics = graphicsLayer.graphics;
            var graphic;
            for (var i = 0; i < graphics.length; i++) {
                var parentCoordinates = graphics[i].attributes.parentCoordinates;
                if (parentCoordinates.x === geometry.x && parentCoordinates.y === geometry.y) {
                    graphic = graphics[i];
                }
            }
            return graphic;
        },
        getFillSymbol: function (typeOfFaction, classType) {
            var dashdotColor;
            if (typeOfFaction === "blue") {
                dashdotColor = [0, 0, 255];
            } else if (typeOfFaction === "red") {
                dashdotColor = [255, 0, 0];
            } else if (typeOfFaction === "neutral") {
                dashdotColor = [15, 144, 0];
            }

            var fillColor = this.getWeaponColor(classType);


            return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color(dashdotColor), 2), new Color(fillColor));
        },
        getInfo: function (selectedSystem) {
            var template = "";
            console.log(selectedSystem);
            template += selectedSystem.type + "</br>";
            template += "<table border=0>";
            template += "<tr><th colspan=3>Weapon(s)</th></tr>";
            
            for (var i = 0; i < selectedSystem.weapons.length; i++) {
                var weapon = selectedSystem.weapons[i];
                var keys = Object.keys(weapon);
                var values = Object.values(weapon);
                for (var j = 0; j < keys.length; j++) {
                    template += "<tr>";
                    if (keys[j] !== "weaponType") {
                        
                        template += "<td>" + this.capitalize(keys[j]) + ": </td>";
                        template += "<td>"+ values[j] + "</td>";
                    }
                    if(keys[j] === "weaponType") {
                        template += "<td>Color: " + "</td>";
                        template += "<td>" + this.symbolRenderer(values[j]) + "</td>";
                    }
                    template += "</tr>";
                }
            }
            template += "</table>";
            
            return template;
        },
        capitalize: function (s) {
            return s[0].toUpperCase() + s.slice(1);
        }
    };
});