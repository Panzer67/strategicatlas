define(['dojo/dom'], function (dom) {

    return {
        getWeaponSystems: function () {
            var weaponSystems = {
                "missiles": [
                    {
                        "id": "topol",
                        "type": "RT-2PM Topol (SS-25 Sickle)",
                        "weapons": [
                            {
                                "weaponType": "surfaceToSurfaceBallisticMissile",
                                "missile": "RT-2PM",
                                "range": 10000,
                                "speed": "Mach 21",
                                "guidance": "inertial/GLONASS",
                                "warhead": "800kt",
                                "precision": "CEP 200m"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Russia",
                        "description": ""
                    },
                    {
                        "id": "topol-m",
                        "type": "RT-2PM2 Topol-m (SS-27 Sickle B)",
                        "weapons": [
                            {
                                "weaponType": "surfaceToSurfaceBallisticMissile",
                                "missile": "RT-2PM2",
                                "range": 11000,
                                "speed": "Mach 22",
                                "guidance": "inertial/GLONASS",
                                "warhead": "800kt",
                                "precision": "CEP 200m"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Russia",
                        "description": ""
                    },
                    {
                        "id": "RS-24",
                        "type": "RS-24 Yars (SS-29)",
                        "weapons": [
                            {
                                "weaponType": "surfaceToSurfaceBallisticMissile",
                                "missile": "RS-24",
                                "range": 11000,
                                "speed": "Mach 20",
                                "guidance": "inertial/GLONASS",
                                "warhead": "4x 250kt",
                                "precision": "CEP 150-250m"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Russia",
                        "description": ""
                    },                    
                    {
                        "id": "iskander",
                        "type": "9K720 Iskander-M (SS-26 Stone)",
                        "weapons": [
                            {
                                "weaponType": "surfaceToSurfaceBallisticMissile",
                                "missile": "9M723K1",
                                "range": 500,
                                "speed": "Mach 6.2",
                                "warhead": "700kg",
                                "precision": "CEP 5-7m"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Russia",
                        "description": ""
                    },
                    {
                        "id": "scarabA",
                        "type": "OTR-21 Tochka-U (SS-21 Scarab A)",
                        "weapons": [
                            {
                                "weaponType": "surfaceToSurfaceBallisticMissile",
                                "missile": "Scarab A",
                                "range": 70,
                                "speed": "Mach 5.3",
                                "precision": "CEP 150m"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Soviet/Russia",
                        "description": ""
                    },
                    {
                        "id": "scarabB",
                        "type": "OTR-21 Tochka-U (SS-21 Scarab B)",
                        "weapons": [
                            {
                                "missile": "Scarab B",
                                "range": 120,
                                "speed": "Mach 5.3",
                                "precision": "CEP 95m",
                                "weaponType": "surfaceToSurfaceBallisticMissile"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Soviet/Russia",
                        "description": ""
                    },
                    {
                        "id": "scudA",
                        "type": "R-11 Zemlya (SS-1B Scud-A)",
                        "weapons": [
                            {
                                "missile": "R-11 Zemlya",
                                "range": 180,
                                "payload": "950kg",
                                "precision": "CEP 3km",
                                "weaponType": "surfaceToSurfaceBallisticMissile"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Soviet/Russia",
                        "description": ""
                    },
                    {
                        "id": "scudB",
                        "type": "R-17 Elbrus (SS-1C Scud-B)",
                        "weapons": [
                            {
                                "missile": "R-17 Elbrus",
                                "range": 300,
                                "payload": "985kg",
                                "precision": "CEP 450m",
                                "weaponType": "surfaceToSurfaceBallisticMissile"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Soviet/Russia",
                        "description": ""
                    },
                    {
                        "id": "scudC",
                        "type": "R-17 (SS-1d Scud-C)",
                        "weapons": [
                            {
                                "missile": "R-17",
                                "range": 600,
                                "payload": "600kg",
                                "precision": "CEP 700m",
                                "weaponType": "surfaceToSurfaceBallisticMissile"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Soviet/Russia",
                        "description": ""
                    },
                    {
                        "id": "scudD",
                        "type": "R-17 (SS-1e Scud-D)",
                        "weapons": [
                            {
                                "missile": "R-17",
                                "range": 700,
                                "payload": "985kg",
                                "precision": "CEP 50m",
                                "weaponType": "surfaceToSurfaceBallisticMissile"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Soviet/Russia",
                        "description": ""
                    }
                    
                ],
                "antiship": [
                    {
                        "id": "k-300p",
                        "type": "K-300P Bastion-P (SS-C-5 Stooge)",
                        "weapons": [
                            {
                                "missile": "P-800 Oniks/Yakhont",
                                "range": 300,
                                "speed": "Mach 2.5",
                                "warhead": "250kg",
                                "weaponType": "antiShipCruiseMissile"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Russia",
                        "description": ""
                    },
                    {
                        "id": "bal-e",
                        "type": "Bal-E (SS-C-6 Sennight)",
                        "weapons": [
                            {
                                "missile": "Kh-35",
                                "range": 260,
                                "speed": "Mach 0.8",
                                "warhead": "650kg",
                                "guidance": "inertial,satellite",
                                "weaponType": "antiShipCruiseMissile"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Russia",
                        "description": ""
                    },
                    {
                        "id": "kustrobotbatteri90",
                        "type": "Kustrobotbatteri 90",
                        "weapons": [
                            {
                                "missile": "RBS-15",
                                "range": 250,
                                "speed": "subsonic",
                                "warhead": "200kg",
                                "weaponType": "antiShipCruiseMissile"
                            }
                        ],
                        "systemType": "surfaceToSurfaceMissile",
                        "countryOrigin": "Sweden",
                        "description": ""
                    }
                ],
                "artillery": [
                    {
                        "id": "2s19",
                        "type": "2S19 Msta",
                        "weapons": [
                            {
                                "rateOfFire": "6-8 rounds/min",
                                "caliber": "152mm",
                                "range": 36,
                                "weaponType": "howitzer"
                            }
                        ],
                        "systemType": "mechArtillery",
                        "countryOrigin": "Soviet/Russia",
                        "description": ""
                    },
                    {
                        "id": "bm-21",
                        "type": "BM-21 GRAD",
                        "weapons": [
                            {
                                "rocket": "9M519",
                                "caliber": "122mm",
                                "range": 40,
                                "weaponType": "rocket"
                            }
                        ],
                        "systemType": "rockArtillery",
                        "countryOrigin": "Soviet/Russia",
                        "description": "BM-21 122 mm multiple rocket launcher (MRL) system."
                    },
                    {
                        "id": "bm-30",
                        "type": "BM-30 Smerch",
                        "weapons": [
                            {
                                "rocket": "9M528",
                                "caliber": "300mm",
                                "range": 90,
                                "weaponType": "rocket"
                            }
                        ],
                        "systemType": "rockArtillery",
                        "countryOrigin": "Soviet/Russia",
                        "description": "BM-30 Smerch is a heavy multiple rocket launcher"
                    },
                    {
                        "id": "panzerhaubitze",
                        "type": "Panzerhaubitze 2000",
                        "weapons": [
                            {
                                "rateOfFire": "10 rounds/min",
                                "caliber": "155mm",
                                "range": 40,
                                "weaponType": "howitzer"
                            }
                        ],
                        "systemType": "mechArtillery",
                        "countryOrigin": "Germany",
                        "description": ""
                    },
                    {
                        "id": "m10946",
                        "type": "M109A6 Paladin",
                        "weapons": [
                            {
                                "rateOfFire": "9-10 rounds/min",
                                "caliber": "155mm",
                                "range": 30,
                                "weaponType": "howitzer"
                            }
                        ],
                        "systemType": "mechArtillery",
                        "countryOrigin": "USA",
                        "description": ""
                    },
                    {
                        "id": "m270",
                        "type": "M270 MLRS",
                        "weapons": [
                            {
                                "weaponType": "surfaceToSurfaceBallisticMissile",
                                "missile": "MGM-168",
                                "range": 300,
                                "speed": "Mach 3",
                                "precision": "CEP 10m"
                            },
                            {
                                "weaponType": "surfaceToSurfaceBallisticMissile",
                                "missile": "MGM-140",
                                "range": 160,
                                "speed": "Mach 3",
                                "precision": "CEP 10m"
                            },
                            {
                                "weaponType": "rocket",
                                "rocket": "M30/M31",
                                "range": 84,
                                "guidance": "gps"
                            },
                            {
                                "weaponType": "rocket",
                                "rocket": "M26A1/A2",
                                "range": 45
                            }
                        ],
                        "systemType": "rockArtillery",
                        "countryOrigin": "USA",
                        "description": ""
                    }
                ],
                "airdefense": [
                    {
                        "id": "s-300p",
                        "type": "S-300P (SA-10 Grumble)",
                        "weapons": [
                            {
                                "missile": "5V55R",
                                "range": 90,
                                "warhead": "133kg",
                                "guidance": "SARH",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],
                        "systemType": "airdefenseMissile",
                        "countryOrigin": "Soviet/Russia",
                        "description": ""
                    },
                    {
                        "id": "s-400",
                        "type": "S-400 (SA-21 Growler)",
                        "weapons": [
                            {
                                "missile": "40N6",
                                "range": 400,
                                "altitude": 185,
                                "weaponType": "surfaceToAirMissile"
                            },
                            {
                                "missile": "48N6E2",
                                "range": 200,
                                "altitude": 20,
                                "warhead": "180kg",
                                "guidance": "SARH",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],
                        "systemType": "airdefenseMissile",
                        "countryOrigin": "Russia",
                        "description": "S-400 airdefense system. "
                    },
                    {
                        "id": "buk-m1",
                        "type": "BUK-M1 (SA-11 Gadfly)",
                        "weapons": [
                            {
                                "missile": "9M38",
                                "range": 30,
                                "altitude": 16,
                                "warhead": "70kg",
                                "guidance": "SARH",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],
                        "systemType": "airdefenseMissile",
                        "countryOrigin": "Soviet/Russia",
                        "description": "BUK-M1 airdefense system. "
                    },
                    {
                        "id": "buk-m1-2",
                        "type": "BUK-M1-2 (SA-17 Grizzly)",
                        "weapons": [
                            {
                                "missile": "9M317",
                                "range": 50,
                                "altitude": 25,
                                "warhead": "70kg",
                                "guidance": "SARH",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],
                        "systemType": "airdefenseMissile",
                        "countryOrigin": "Soviet/Russia",
                        "description": "BUK-M1 airdefense system. "
                    },
                    {
                        "id": "mim-104b",
                        "type": "MIM-104B Patriot (PAC-1)",
                        "weapons": [
                            {
                                "missile": "PAC-1",
                                "range": 70,
                                "warhead": "90kg",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],
                        "systemType": "airdefenseMissile",
                        "countryOrigin": "USA",
                        "description": ""
                    },
                    {
                        "id": "mim-104c",
                        "type": "MIM-104C Patriot (PAC-2)",
                        "weapons": [
                            {
                                "missile": "PAC-2",
                                "range": 160,
                                "warhead": "90kg",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],
                        "systemType": "airdefenseMissile",
                        "countryOrigin": "USA",
                        "description": ""
                    },
                    {
                        "id": "mim-104f",
                        "type": "MIM-104F Patriot (PAC-3)",
                        "weapons": [
                            {
                                "missile": "PAC-3",
                                "range": 20,
                                "warhead": "90kg",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],
                        "systemType": "airdefenseMissile",
                        "countryOrigin": "USA",
                        "description": "Mainly designed to be used against ballistic missiles."
                    }
                ],
                "naval": [
                    {
                        "id": "kirov",
                        "type": "Kirov class battlecruiser",
                        "weapons": [
                            {
                                "missile": "P-700 Granit (20x)",
                                "range": 625,
                                "speed": "Mach 2.5",
                                "warhead": "500kt or 750kg",
                                "weaponType": "antiShipCruiseMissile"                                
                            },
                            {
                                "missile": "S-300FM (96x)",
                                "range": 150,
                                "altitude": 27,
                                "warhead": "150kg",
                                "guidance": "TVM",
                                "weaponType": "surfaceToAirMissile"
                            },                            
                            {
                                "gun": "twin AK-130",
                                "rateOfFire": "10-40 rounds/min",
                                "caliber": "130mm",
                                "range": 23,
                                "weaponType": "howitzer"
                            },
                            {
                                "missile": "OSA-M (40x)",
                                "range": 15,
                                "altitude": 5,
                                "warhead": "40kg",
                                "guidance": "RF CLOS",
                                "weaponType": "surfaceToAirMissile"
                            },
                            {
                                "missile": "9K95 Tor (128x)",
                                "range": 12,
                                "altitude": 6,
                                "warhead": "15kg",
                                "guidance": "radio",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],                      
                        "systemType": "battlecruiser",
                        "countryOrigin": "Soviet/Russia",                        
                        "description": "Displacement: 24.300ton<br>Length: 252m<br>Propulsion: nuclear<br>Speed: 32 knots (59km/h)"
                    },
                    {
                        "id": "slava",
                        "type": "Slava class cruiser",
                        "weapons": [
                            {
                                "missile": "P-500 Bazalt (16x)",
                                "range": 500,
                                "speed": "Mach 2.5",
                                "warhead": "350kt or 950kg",
                                "weaponType": "antiShipCruiseMissile"                                
                            },
                            {
                                "missile": "S-300F (64x)",
                                "range": 90,
                                "altitude": 25,
                                "warhead": "133kg",
                                "guidance": "SARH",
                                "weaponType": "surfaceToAirMissile"
                            },
                            {
                                "gun": "twin AK-130",
                                "rateOfFire": "10-40 rounds/min",
                                "caliber": "130mm",
                                "range": 23,
                                "weaponType": "howitzer"
                            },
                            {
                                "missile": "OSA-M (40x)",
                                "range": 15,
                                "altitude": 5,
                                "warhead": "40kg",
                                "guidance": "RF CLOS",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],                      
                        "systemType": "cruiser",
                        "countryOrigin": "Soviet/Russia",
                        "description": "Displacement: 11.200ton<br>Length: 186m<br>Propulsion: gas turbine<br>Speed: 32 knots (59km/h)"
                    },
                    {
                        "id": "sovremennyy",
                        "type": "Sovremennyy class destroyer",
                        "weapons": [
                            {
                                "missile": "Moskit (SS-N-22) (8x)",
                                "range": 250,
                                "speed": "Mach 3",
                                "warhead": "320kg",
                                "weaponType": "antiShipCruiseMissile"
                            },
                            {
                                "missile": "3S90M Shtil-1 (BUK 9M317) (48x)",
                                "range": 50,
                                "altitude": 25,
                                "warhead": "70kg",
                                "guidance": "SARH",
                                "weaponType": "surfaceToAirMissile"                            
                            },
                            {
                                "gun": "twin AK-130",
                                "rateOfFire": "10-40 rounds/min",
                                "caliber": "130mm",
                                "range": 23,
                                "weaponType": "howitzer"
                            }
                        ],                      
                        "systemType": "destroyer",
                        "countryOrigin": "Soviet/Russia",
                        "description": ""
                    },
                    {
                        "id": "buyan",
                        "type": "Buyan-m class corvette",
                        "weapons": [
                            {
                                "missile": "P-800 Oniks/Yakhont (8x)",
                                "range": 300,
                                "speed": "Mach 2.5",
                                "warhead": "250kg",
                                "weaponType": "antiShipCruiseMissile"
                            },
                            {
                                "missile": "9K38 Igla (8x)",
                                "range": 5.2,
                                "altitude": 3.5,
                                "warhead": "1.17kg",
                                "guidance": "infra-red",
                                "weaponType": "surfaceToAirMissile"
                            }
                        ],                      
                        "systemType": "frigate",
                        "countryOrigin": "Russia",
                        "description": ""
                    },
                    {
                        "id": "grigorovich",
                        "type": "Admiral Grigorovich class frigate",
                        "weapons": [
                            {
                                "missile": "P-800 Oniks/Yakhont",
                                "range": 300,
                                "speed": "Mach 2.5",
                                "warhead": "250kg",
                                "weaponType": "antiShipCruiseMissile"
                            },
                            {
                                "missile": "Kalibr 3M-14T",
                                "range": 2500,
                                "warhead": "450kg", 
                                "speed": "Mach 0.8-2.9",
                                "guidance": "inertial/satellite/radar",
                                "weaponType": "surfaceToSurfaceCruiseMissile"
                            },
                            {
                                "missile": "3S90M Shtil-1 (BUK 9M317) (24x)",
                                "range": 50,
                                "altitude": 25,
                                "warhead": "70kg",
                                "guidance": "SARH",
                                "weaponType": "surfaceToAirMissile"                            
                            }
                        ],                      
                        "systemType": "frigate",
                        "countryOrigin": "Russia",
                        "description": ""
                    }
                ]
            };
            return weaponSystems;
        }


    };

});