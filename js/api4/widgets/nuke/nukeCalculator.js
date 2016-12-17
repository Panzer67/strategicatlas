define([
    'dojo/dom',
    'dojo/query',
    'esri/symbols/SimpleLineSymbol',
    'esri/symbols/SimpleFillSymbol',
    'esri/Color',
    'esri/InfoTemplate'
], function (dom, query, SimpleLineSymbol, SimpleFillSymbol, Color, InfoTemplate) {
    return {
        getBurstInfo: function (bombName, yield, typeOfExplosion, overpressure) {
            if (typeOfExplosion === "groundburst") {
                return this.getGroundBurst(bombName, yield, typeOfExplosion, overpressure);
            }
            else if (typeOfExplosion === "airburst") {
                return this.getAirBurst(bombName, yield, typeOfExplosion, overpressure);
            }
        },
        getGroundBurst: function (bombName, yield, typeOfExplosion, overpressure) {  

            var fireball = Math.pow(yield, 0.4) * 79.5; // fireball
            var air5psi = Math.pow(yield, 0.33) * 452.225664; // 5psi
            var air10psi = Math.pow(yield, 0.33) * 304.8; // 10psi
            var air20psi = Math.pow(yield, 0.33) * 213.36; // 20psi
            var thermal = (Math.pow(yield, 0.41) * 670) * 0.9; // thermal radiation 3rd degree burns

            var fireSurface = this.surfaceCalc(fireball);
            var air5psiSurface = this.surfaceCalc(air5psi);
            var air10psiSurface = this.surfaceCalc(air10psi);
            var air20psiSurface = this.surfaceCalc(air20psi);
            var thermalSurface = this.surfaceCalc(thermal);

            /// crater dimensions Glasstone(1962) page 276-277.
            var craterDiameter = Math.pow(yield, 0.33) * 39.624;
            var craterDepth = Math.pow(yield, 0.33) * 9.144;
            var radii = this.getRadiiArray(fireball, fireSurface, air5psi, air5psiSurface,
                    air10psi, air10psiSurface, air20psi, air20psiSurface, thermal, thermalSurface);

            return this.getBomb(bombName, typeOfExplosion, overpressure, null, craterDiameter, craterDepth, radii);
        },
        getAirBurst: function (bombName, yield, typeOfExplosion, overpressure) {
            /**
             * scale range   Glasstone(1962)
             * scale range for optimized 5psi, 10psi or 20psi effect order: fireball, radiation 5psi, 10psi, 20psi, thermal(3rd degree)         
             **/
            var scaleRange = {
                "5psi": [60.4, 700, 701.04, 228.6, 283.464, 670],
                "10psi": [60.4, 700, 640.08, 445.008, 173.726, 670],
                "20psi": [60.4, 700, 609.6, 432.816, 289.56, 670]
            };

            /**
             * scale height   Glasstone(1962)
             * makes use of burst heights at which the overpressure has the maximum range from ground zero at the ground in meters.
             **/
            var scaleHeight = {
                "5psi": [320.04],
                "10psi": [225.552],
                "20psi": [188.976]
            };

            var fireball = Math.pow(yield, 0.4) * scaleRange[overpressure][0];
            //var radiation = Math.pow(yield, 0.19) * scaleRange[overpressure][1];
            var air5psi = Math.pow(yield, 0.33) * scaleRange[overpressure][2];
            var air10psi = Math.pow(yield, 0.33) * scaleRange[overpressure][3];
            var air20psi = Math.pow(yield, 0.33) * scaleRange[overpressure][4];
            var thermal = (Math.pow(yield, 0.41)) * scaleRange[overpressure][5];

            // calculate optimalheight
            var optimalHeight = Math.pow(yield, 0.33) * scaleHeight[overpressure][0];
            // check if blast 20psi has any ground effect use of Pythagorean theorem.
            air20psi = Math.pow(air20psi, 2) - Math.pow(optimalHeight, 2);
            air20psi = ((air20psi < 1) ? 0 : Math.sqrt(air20psi));
            // radiation calculation for air burst use of Pythagorean theorem.
            //radiation = Math.pow(radiation, 2) - Math.pow(optimalHeight, 2);
            //radiation = ((radiation < 1) ? 0 : Math.sqrt(radiation));

            // calculate surface in m^2
            var fireSurface = this.surfaceCalc(fireball);
            //var radiationSurface = this.surfaceCalc(radiation);
            var air5psiSurface = this.surfaceCalc(air5psi);
            var air10psiSurface = this.surfaceCalc(air10psi);
            var air20psiSurface = this.surfaceCalc(air20psi);
            var thermalSurface = this.surfaceCalc(thermal);

            var radii = this.getRadiiArray(fireball, fireSurface, air5psi, air5psiSurface,
                    air10psi, air10psiSurface, air20psi, air20psiSurface, thermal, thermalSurface);

            return this.getBomb(bombName, typeOfExplosion, overpressure, optimalHeight, null, null, radii);
        },
        getBomb: function (bombName, typeOfExplosion, overpressure, heightExplosion, craterDiameter, craterDepth, radii) {
            var bomb = {
                name: bombName,
                typeOfExplosion: typeOfExplosion,
                maximizedOverpressure: overpressure,
                heightExplosion: heightExplosion,
                craterDiameter: craterDiameter,
                craterDepth: craterDepth,
                radii: radii
            };
            return bomb;
        },
        getRadiiArray: function (fireball, fireSurface, air5psi, air5psiSurface,
                air10psi, air10psiSurface, air20psi, air20psiSurface, thermal, thermalSurface) {
            var radii = [];
            radii[0] = {type: "Thermal(3rd degree burns): ", radius: thermal, surface: thermalSurface, color: '#FFE119'};
            radii[1] = {type: "Air Blast(5psi, 34.5kpa): ", radius: air5psi, surface: air5psiSurface, color: '#999999'};
            radii[2] = {type: "Air Blast(10psi, 69kpa): ", radius: air10psi, surface: air10psiSurface, color: '#848484'};
            radii[3] = {type: "Air blast(20psi, 138kpa): ", radius: air20psi, surface: air20psiSurface, color: '#575757'};
            radii[4] = {type: "Fireball: ", radius: fireball, surface: fireSurface, color: '#C13301'};
            radii = this.sortingRadii(radii);
            return radii;
        },
        getOppervlakte: function (radius) {
            return (Math.pow(radius, 2) * Math.PI);
        },
        getYield: function (inputId) {
            return dom.byId(inputId).value;
        },
        getBombName: function (inputId) {
            var list = dom.byId(inputId);
            var selIndex = list.selectedIndex;
            return list.options[selIndex].text;
        },
        getTypeOfExplosion: function (inputId) {
            var typeOfExplosion = dom.byId(inputId).value;
            return typeOfExplosion;
        },
        getMaxOverpressure: function (inputClass) {
            var psi = query(inputClass);
            return psi[0].value;
        },
        sortingRadii: function (arr) {
            return arr = arr.sort(function (a, b) {
                return b > a;
            });
        },
        surfaceCalc: function (radius) {
            var oppervlakte = Math.pow(radius, 2) * Math.PI;
            if (oppervlakte > 1000000) {
                oppervlakte = oppervlakte / 1000000;
                oppervlakte = oppervlakte.toFixed(1) + "km";
            }
            else {
                oppervlakte = Math.round(oppervlakte) + "m";
            }

            var surfaceString = "(" + oppervlakte + "<sup>2</sup>)";
            return surfaceString;
        },
        afrondingOppr: function (getal) {
            var opprString;
            if (getal > 1000000) {
                getal = getal / 1000000;
                opprString = getal.toFixed(1) + "km";
            }
            else {
                opprString = Math.round(getal) + "m";
            }
            return opprString;
        },
        afronding: function (getal) {
            var radiusString;
            if (getal > 1000) {
                getal = getal / 1000;
                radiusString = getal.toFixed(1) + "km";
            }
            else {
                radiusString = Math.round(getal) + "m";
            }
            return radiusString;
        },
        getIntoTemplateContent: function (bomb) {
            var blastStrings = {
                "5psi": "5psi(34.5kpa)",
                "10psi": "10psi(69kpa)",
                "20psi": "20psi(138kpa)"
            };
            var title = bomb.name;
            var description = "<div id=bombinfo>Type of explosion: " + bomb.typeOfExplosion + "<br>";
            if (bomb.typeOfExplosion === "airburst") {
                description += "Height of explosion: " + this.afronding(bomb.heightExplosion) + ".</br>";
                description += "At this height the blast effect of " + blastStrings[bomb.maximizedOverpressure] + " is maximized.";
            }
            else {
                description += "Crater in dry soil: ";
                description += this.afronding(bomb.craterDepth) + "(depth) ";
                description += this.afronding(bomb.craterDiameter) + "(diameter)";
            }
            description += "<table border=0>";
            for (var x = bomb.radii.length - 1; x >= 0; x--) {
                description += "<tr><td valign=top><div id=radiicolor style=background-color:" + bomb.radii[x].color + ";></div></td>";
                //description += "<td>" + radii[x].type + ((radii[x].radius === 0) ? "effect not tipping the ground at this height of explosion" : helperFactory.afronding(radii[x].radius) + radii[x].surface) + ".</td></tr>";
                description += "<td><div id=radiusinfo>" + bomb.radii[x].type + "<br>";
                description += ((bomb.radii[x].radius === 0) ? "effect not tipping the ground" : this.afronding(bomb.radii[x].radius) + " radius" + bomb.radii[x].surface) + ".</div></td></tr>";
            }
            description += "</table>";            
            description += "</div>";
            var infoTemplate = new InfoTemplate(title, description);
            
            return infoTemplate;     
        },
        getFireballSymbol: function () {
            return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([193, 51, 1, 0.65]), 3), new Color([193, 51, 1, 0.35]));
        },
        getAirpressure5Symbol: function () {
            return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([153, 153, 153, 0.65]), 3), new Color([153, 153, 153, 0.35]));
        },
        getAirpressure10Symbol: function () {
            return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([132, 132, 132, 0.65]), 3), new Color([132, 132, 132, 0.35]));
        },
        getAirpressure20Symbol: function () {
            return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([87, 87, 87, 0.65]), 3), new Color([87, 87, 87, 0.35]));
        },
        getThermalSymbol: function () {
            return new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 255, 25, 0.65]), 3), new Color([255, 255, 25, 0.35]));
        }
    };
});




