define([
    'dojo/dom',
    'esri/InfoTemplate',
    'esri/symbols/SimpleFillSymbol',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/PictureMarkerSymbol',
    'esri/Color'
], function (dom, InfoTemplate, SimpleFillSymbol, SimpleMarkerSymbol, SimpleLineSymbol, PictureMarkerSymbol, Color) {
    return {
        getSelector: function (typeOfWeapon) {
            switch (typeOfWeapon) {
                case "missiles":
                    return "selectorMissiles";
                case "antiship":
                    return "selectorAntiship";
                case "artillery":
                    return "selectorArtillery";
                case "airdefense":
                    return "selectorAirdefense";
                case "naval":
                    return "selectorNaval";
            }
        },
        getSelectedValue: function (typeOfWeapon) {
            var id = this.getSelector(typeOfWeapon);
            return dom.byId(id).value;
        },
        getSelectedWeaponId: function (typeOfWeapon) {
            var id = this.getSelector(typeOfWeapon);

            var list = dom.byId(id);
            var selIndex = list.selectedIndex;
            return list.options[selIndex].id;
        },
        getPictureMarkerSymbol: function (typeOfFaction, weaponsCategory, selectedSystem) {
            //var attributes = this.getAttributes(options, typeOfFaction, typeOfWeapon, selectedWeapon);
            var weaponTypeUrlString = this.getTypeOfWeaponString(weaponsCategory, selectedSystem.systemType);
            return new PictureMarkerSymbol({
                url: "pictures/" + typeOfFaction + "/" + typeOfFaction + weaponTypeUrlString,
                width: this.getSize(typeOfFaction, weaponsCategory, selectedSystem.systemType, "width"),
                height: this.getSize(typeOfFaction, weaponsCategory, selectedSystem.systemType, "height")
            });
        },
        getSize: function (typeOfFaction, weaponsCategory, systemType, widthHeight) {
            if (typeOfFaction === "blue") {
                if (weaponsCategory === "naval") {
                    if (widthHeight === "width") {
                        return 30;
                    } else {
                        return 30;
                    }
                } else {
                    if (widthHeight === "width") {
                        return 30;
                    } else {
                        return 22;
                    }
                }
            }
            if (typeOfFaction === "red") {
                if (weaponsCategory === "naval") {
                    if (systemType === "submarine") {
                        if (widthHeight === "width") {
                            return 22;
                        } else {
                            return 30;
                        }
                    } else {
                        if (widthHeight === "width") {
                            return 30;
                        } else {
                            return 30;
                        }
                    }
                } else {
                    if (widthHeight === "width") {
                        return 30;
                    } else {
                        return 30;
                    }
                }
            }
            if (typeOfFaction === "neutral") {
                if (widthHeight === "width") {
                    return 28;
                } else {
                    return 28;
                }
            }
        },
        getTypeOfWeaponString: function (weaponsCategory, systemType) {
            switch (weaponsCategory) {
                case "missiles":
                    if (systemType === "surfaceToSurfaceMissile") {
                        return "_surface_to_surface_missile.png";
                    }
                case "antiship":
                    if (systemType === "surfaceToSurfaceMissile") {
                        return "_surface_to_surface_missile.png";
                    }
                case "artillery":
                    if (systemType === "mechArtillery") {
                        return "_mechanized_artillery.png";
                    }
                    if (systemType === "rockArtillery") {
                        return "_rocket_artillery.png";
                    }
                case "airdefense":
                    if (systemType === "airdefenseMissile") {
                        return "_airdefense_missile.png";
                    }
                case "naval":
                    if (systemType === "battlecruiser") {
                        return "_battleship.png";
                    }
                    if (systemType === "cruiser") {
                        return "_cruiser.png";
                    }
                    if (systemType === "destroyer") {
                        return "_destroyer.png";
                    }
                    if (systemType === "frigate") {
                        return "_frigate.png";
                    }
                    if (systemType === "submarine") {
                        return "_submarine.png";
                    }

            }
        },
        getWeapon: function (weaponSystems, weaponsCategory, selectedSystemId) {
            var system = {};
            var arr = weaponSystems[weaponsCategory];

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === selectedSystemId) {
                    system = arr[i];
                }
            }

            return system;
        },
        getInfo: function (selectedSystem) {
            var template = "";
            console.log(selectedSystem);
            template += selectedSystem.type + "</br>";
            template += "<table border=1>";
            template += "<tr><th colspan=3>Weapon(s)</th></tr>";

            for (var i = 0; i < selectedSystem.weapons.length; i++) {
                var weapon = selectedSystem.weapons[i];
                var keys = Object.keys(weapon);
                var values = Object.values(weapon);
                for (var j = 0; j < keys.length; j++) {
                    template += "<tr>";
                    if (keys[j] !== "weaponType") {

                        template += "<td>" + keys[j] + ": </td>";
                        template += "<td>" + values[j] + "</td>";
                    }
                    if (keys[j] === "weaponType") {
                        template += "<td>Color: " + "</td>";
                        template += "<tr>" + values[j] + "</td>";
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