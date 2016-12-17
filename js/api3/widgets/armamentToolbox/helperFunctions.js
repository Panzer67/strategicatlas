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

                case "artillery":
                    return "selectorArtillery";

                case "airdefense":
                    return "selectorAirdefense";
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
                width: ((typeOfFaction === "blue") ? 30 : 30),
                height: ((typeOfFaction === "blue") ? 22 : 30)
            });
        },
        getTypeOfWeaponString: function (weaponsCategory, systemType) {
            switch (weaponsCategory) {
                case "missiles":
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
            }
        },
        getWeapon: function (options, typeOfFaction, weaponsCategory, selectedSystemId) {
            var system = {};
            var arr = options[typeOfFaction][weaponsCategory];

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
                        
                        template += "<td>" +keys[j] + ": </td>";
                        template += "<td>"+ values[j] + "</td>";
                    }
                    if(keys[j] === "weaponType") {
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