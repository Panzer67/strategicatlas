define(['dojo/dom'], function (dom) {

    return {
        getWeaponSystems: function () {
            var weaponSystems = {
                "missiles": [
                    {
                        "id": "iskander",
                        "type": "9K720 Iskander-M (SS-26 Stone)",
                        "weapons": [
                            {
                                "weaponType": "surfaceToSurfaceBallisticMissile",
                                "missile": "9M723K1",
                                "range": 500,
                                "speed": "Mach 6.2",
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
                        "id": "scarabC",
                        "type": "OTR-21 Tochka-U (SS-21 Scarab C)",
                        "weapons": [
                            {
                                "missile": "Scarab C",
                                "range": 185,
                                "speed": "Mach 5.3",
                                "precision": "CEP 70m",
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
                        "id": "kustrobotbatteri90",
                        "type": "Kusttobotbatteri 90",
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
                ]
            };
            return weaponSystems;
        }


    };

});