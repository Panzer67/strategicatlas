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
                case "surfaceToSurfaceCruiseMissile":
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

            template += selectedSystem.type + "</br>";
            template += "<table border=0>";
            template += "<tr><th colspan=2 style=text-align:center;>Weapon(s)</th></tr>";

            for (var i = 0; i < selectedSystem.weapons.length; i++) {
                var weapon = selectedSystem.weapons[i];
                weapon = this.reorderObject(weapon, "weaponType");
                
                for (var j = 0; j < weapon.length; j++) {
                    template += "<tr>";
                    if (weapon[j].key !== "weaponType") {

                        template += "<td>" + this.capitalize(weapon[j].key) + ": </td>";
                        template += "<td>" + this.formalizer(weapon[j]) + "</td>";
                    }
                    if (weapon[j].key === "weaponType") {
                        template += "<td colspan=2>" + this.getWeaponTypeName(weapon[j].value) + "</td></tr>";                        
                        template += "<td>Color: </td>";
                        template += "<td>" + this.symbolRenderer(weapon[j].value) + "</td>";
                    }
                    template += "</tr>";
                }
            }
            template += "</table>";

            return template;
        },
        getWeaponTypeName: function(weaponType) {
            switch (weaponType) {
                case "surfaceToAirMissile":
                    return "Surface-to-air missile";
                case "radar":
                    return "Radar";
                case "surfaceToSurfaceBallisticMissile":
                    return "Ballistic missile";
                case "surfaceToSurfaceCruiseMissile":
                    return "Cruise missile";
                case "rocket":
                    return "Rocket";
                case "howitzer":
                    return "Howitzer";
                case "antiShipCruiseMissile":
                    return "Anti-ship cruise missile";
            }
        },  
        formalizer: function(obj) {
            var value = "";
            switch(obj.key) {
                case "range":
                    value = obj.value + "km";
                    break;
                case "altitude":
                    value = obj.value + "km";
                    break;
                default:
                    value = obj.value;
            }
            
            return value;
        },
        capitalize: function (s) {
            if(s === "rateOfFire") {
                s = "Rate of fire";
            }
            
            return s[0].toUpperCase() + s.slice(1);
        },
        reorderObject: function (obj, keyName) {
            var arr = [];

            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    arr.push({
                        'key': prop,
                        'value': obj[prop]
                    });
                }
            }
            function isThisOrThat(element) {                
                return element.key === keyName;                
            }
            
            var index = arr.findIndex(isThisOrThat);
            arr = this.arraymove(arr, index, 0);

            return arr; 
        },
        arraymove: function (arr, fromIndex, toIndex) {
            var element = arr[fromIndex];
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, element);
            return arr;
        }
    };
});