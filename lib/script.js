/* PHASE 0 INITIALISATION DES GLOBALES VARIABLES */


var Data_Europa = []
var map = "";
var Zoom = [];
var legend = "";
var valeurStyle = ""
var table = {}
var data = {}
var chart = {}
var filtre = false
var Choix = "";
var Annee = "";
var Indic = "";
var Choix2 = "";
var PopulationChoix = "";
var PIBChoix = "";
var Choix3 = "reset"
var str = {
    selection: ""
}
var CPays = "";
var T = 0


// Lancement du script à l'execution de la page
traitementDonnee()

/* ------------------------------------------------------------------------------------------------------------------------------*/

/* PHASE 1 TRAITEMENT DES DONNEES */
function traitementDonnee() {

    // Fonction de lancement 
    CreateDataEuropa()
    setTimeout(function() {
        traitementPIB('data/pib.tsv');
        traitementPopulation('data/population.tsv');
        traitementDechet('data/dechet.tsv');
        traitementElectricite('data/electricite.tsv');
        AffectationGroupe(Data_Europa);
        TraitementEurope("Population_An2013");

    }, 500)
};

// Traitement du fichier sur le PIB
function traitementPIB(fichier1) {
    d3.tsv(fichier1, function(data) {
        var Pib = [];
        var Pib_Data = [];
        Pib = data;
        Pib.forEach(function(c) {
            var pib_Objet = {};
            if (c[Object.getOwnPropertyNames(c)[0]].length <= 21) {
                pib_Objet['Code_Pays'] = c[Object.getOwnPropertyNames(c)[0]].slice(19, 21).trim();
                pib_Objet['An2011'] = +c[Object.getOwnPropertyNames(c)[17]].slice(0, 5).trim();
                pib_Objet['An2012'] = +c[Object.getOwnPropertyNames(c)[18]].slice(0, 5).trim();
                pib_Objet['An2013'] = +c[Object.getOwnPropertyNames(c)[19]].slice(0, 5).trim();
                Pib_Data.push(pib_Objet);
            }
        });
        Data_Europa.forEach(function(Data_Europa) {
            var result = Pib_Data.filter(function(Pib_Data) {
                return Pib_Data.Code_Pays === Data_Europa.Code_Pays;
            });
            Data_Europa.Pib_An2011 = (result[0] !== undefined) ? result[0].An2011 : null;
            Data_Europa.Pib_An2012 = (result[0] !== undefined) ? result[0].An2012 : null;
            Data_Europa.Pib_An2013 = (result[0] !== undefined) ? result[0].An2013 : null;
        })
    });
}

// Traitement du fichier sur la population

function traitementPopulation(fichier2) {
    d3.tsv(fichier2, function(data) {
        var Pop = [];
        var Pop_Data = [];
        Pop = data;
        Pop.forEach(function(c) {
            var pop_Objet = {}
            if (c[Object.getOwnPropertyNames(c)[0]].length <= 21) {
                pop_Objet['Code_Pays'] = c[Object.getOwnPropertyNames(c)[0]].slice(4, 6).trim();
                pop_Objet['An2011_p'] = +c[Object.getOwnPropertyNames(c)[9]].trim().slice(0, 8);
                pop_Objet['An2012_p'] = +c[Object.getOwnPropertyNames(c)[10]].trim().slice(0, 8);
                pop_Objet['An2013_p'] = +c[Object.getOwnPropertyNames(c)[11]].trim().slice(0, 8);
                Pop_Data.push(pop_Objet);
            }
        })
        Data_Europa.forEach(function(Data_Europa) {
            var result = Pop_Data.filter(function(Pop_Data) {
                return Pop_Data.Code_Pays === Data_Europa.Code_Pays;
            });
            Data_Europa.Population_An2011 = (result[0] !== undefined) ? result[0].An2011_p : null;
            Data_Europa.Population_An2012 = (result[0] !== undefined) ? result[0].An2012_p : null;
            Data_Europa.Population_An2013 = (result[0] !== undefined) ? result[0].An2013_p : null;
        })
    })
}

// Traitement du fichier sur les déchets

function traitementDechet(fichier3) {
    d3.tsv(fichier3, function(data) {
        var Dechet = [];
        var Dechet_Data = [];
        Dechet = data;
        Dechet.forEach(function(c) {
            var dechet_Objet = {}
            if (c[Object.getOwnPropertyNames(c)[0]].length <= 21) {
                dechet_Objet['Code_Pays'] = c[Object.getOwnPropertyNames(c)[0]].slice(10, 12).trim();
                dechet_Objet['An2011_d'] = +c[Object.getOwnPropertyNames(c)[17]].trim().slice(0, 4);
                dechet_Objet['An2012_d'] = +c[Object.getOwnPropertyNames(c)[18]].trim().slice(0, 4);
                dechet_Objet['An2013_d'] = +c[Object.getOwnPropertyNames(c)[19]].trim().slice(0, 4);
                Dechet_Data.push(dechet_Objet);
            }
        })
        Data_Europa.forEach(function(Data_Europa) {
            var result = Dechet_Data.filter(function(Dechet_Data) {
                return Dechet_Data.Code_Pays === Data_Europa.Code_Pays;
            });
            Data_Europa.Dechet_An2011 = (result[0] !== undefined) ? result[0].An2011_d : null;
            Data_Europa.Dechet_An2012 = (result[0] !== undefined) ? result[0].An2012_d : null;
            Data_Europa.Dechet_An2013 = (result[0] !== undefined) ? result[0].An2013_d : null;

        })
    })
}

// Traitement du fichier sur l'eletricité

function traitementElectricite(fichier4) {
    d3.tsv(fichier4, function(data) {
        var Electricity = [];
        var Electricity_Data = [];
        Electricity = data;
        Electricity.forEach(function(c) {
            var electricity_Objet = {}
            if (c[Object.getOwnPropertyNames(c)[0]].length <= 21) {
                electricity_Objet['Code_Pays'] = c[Object.getOwnPropertyNames(c)[0]].slice(10, 12).trim();
                electricity_Objet['An2011_e'] = +c[Object.getOwnPropertyNames(c)[9]].trim();
                electricity_Objet['An2012_e'] = +c[Object.getOwnPropertyNames(c)[10]].trim();
                electricity_Objet['An2013_e'] = +c[Object.getOwnPropertyNames(c)[11]].trim();
                Electricity_Data.push(electricity_Objet);
            }
        })
        Data_Europa.forEach(function(Data_Europa) {
            var result = Electricity_Data.filter(function(Electricity_Data) {
                return Electricity_Data.Code_Pays === Data_Europa.Code_Pays;
            });
            Data_Europa.ElectricitePropre_An2011 = (result[0] !== undefined) ? result[0].An2011_e : null;
            Data_Europa.ElectricitePropre_An2012 = (result[0] !== undefined) ? result[0].An2012_e : null;
            Data_Europa.ElectricitePropre_An2013 = (result[0] !== undefined) ? result[0].An2013_e : null;
        })
    })
}

// Affectation d'un groupe européen selon le pays

function AffectationGroupe(array1) {
    array1.forEach(function(d) {
        if ($.inArray(d.Code_Pays, UeGrp6) > -1) {
            d.GroupeEurope = "GRP6";
        } else if ($.inArray(d.Code_Pays, UeGrp15) > -1) {
            d.GroupeEurope = "GRP15";
        } else {
            d.GroupeEurope = "GRP28"
        }
    })
}

// Création de la variable Data_Europa + importation du premier fichier sur les taxes

function CreateDataEuropa() {
    d3.tsv("data/taxe.tsv", function(data) {
        Taxe = data;
        string_a = "ENV,MIO_EUR,";
        UeGrp6 = ["DE", "FR", "BE", "IT", "LU", "NL"];
        UeGrp15 = ["AT", "DK", "EL", "ES", "FI", "IE", "PT", "SE", "UK"];
        NotUE = ["ENV,MIO_EUR,CH", "ENV,MIO_EUR,EA19", "ENV,MIO_EUR,EU28", "ENV,MIO_EUR,LI", "ENV,MIO_EUR,NO", "ENV,MIO_EUR,RS", "ENV,MIO_EUR,TR"];

        Taxe.forEach(function(c) {
            var Data_Europa_Objet = {}
            string_t = c[Object.getOwnPropertyNames(c)[0]].trim()
            if (string_t.indexOf(string_a) > -1) {
                if ($.inArray(string_t, NotUE) > -1) {} else {
                    Data_Europa_Objet['Code_Pays'] = string_t.slice(12, 14);
                    Data_Europa_Objet['Taxe_An2011'] = +c[Object.getOwnPropertyNames(c)[3]].slice(0, 5).trim();
                    Data_Europa_Objet['Taxe_An2012'] = +c[Object.getOwnPropertyNames(c)[2]].slice(0, 5).trim();
                    Data_Europa_Objet['Taxe_An2013'] = +c[Object.getOwnPropertyNames(c)[1]].slice(0, 5).trim();
                    Data_Europa.push(Data_Europa_Objet);
                }
            } else {}
        });
    })
}


/* ------------------------------------------------------------------------------------------------------------------------------*/

/* PHASE 2 CREATION ET GESTION DE LA CARTOGRAPHIE */

function TraitementEurope(k) {

    // Création de la carte
    map = L.map('map').setView([48.06217, 6.95827], 3);
    map.dragging.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmtyc2giLCJhIjoiY2lsdzduaTU2MDA5ZXZtbTV4YmV4ZnhtYSJ9.TJWAdBBuNcbdMO_9Hf-2vQ', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.light'
    }).addTo(map);

    // Importation des données géographiques

    $.getJSON("data/countries.geojson", function(data) {
        dataToDisplay = {}
        dataToDisplay.type = "FeatureCollection"
        dataToDisplay.features = []
        data.features.forEach(function(d) {
            for (i = 0; i < Data_Europa.length; i++) {
                if (d.properties.iso_a2 === Data_Europa[i].Code_Pays || d.properties.iso_a2 === "GR" && Data_Europa[i].Code_Pays == "EL" ||
                    d.properties.iso_a2 === "GB" && Data_Europa[i].Code_Pays === "UK") {
                    Data_Europa[i].Nom_Pays = d.properties.name;
                    dataToDisplay.features[i] = d;
                    d.properties = {};
                    d.properties.Code_Pays = Data_Europa[i].Code_Pays;
                    d.properties.Nom_Pays = Data_Europa[i].Nom_Pays;
                    d.properties.Taxe_An2011 = Data_Europa[i].Taxe_An2011;
                    d.properties.Taxe_An2012 = Data_Europa[i].Taxe_An2012;
                    d.properties.Taxe_An2013 = Data_Europa[i].Taxe_An2013;
                    d.properties.Pib_An2011 = Data_Europa[i].Pib_An2011;
                    d.properties.Pib_An2012 = Data_Europa[i].Pib_An2012;
                    d.properties.Pib_An2013 = Data_Europa[i].Pib_An2013;
                    d.properties.Population_An2011 = Data_Europa[i].Population_An2011;
                    d.properties.Population_An2012 = Data_Europa[i].Population_An2012;
                    d.properties.Population_An2013 = Data_Europa[i].Population_An2013;
                    d.properties.Dechet_An2011 = Data_Europa[i].Dechet_An2011;
                    d.properties.Dechet_An2012 = Data_Europa[i].Dechet_An2012;
                    d.properties.Dechet_An2013 = Data_Europa[i].Dechet_An2013;
                    d.properties.ElectricitePropre_An2011 = Data_Europa[i].ElectricitePropre_An2011;
                    d.properties.ElectricitePropre_An2012 = Data_Europa[i].ElectricitePropre_An2012;
                    d.properties.ElectricitePropre_An2013 = Data_Europa[i].ElectricitePropre_An2013;
                } else {
                    delete(d)
                }
            }
        })

        // Création de la borne de valeur en fonction du choix
        valeurStyle = MinMax(k)

        function onEachFeature(feature, layer) {
            var int = {};
            int.cp = feature.properties.Code_Pays;
            int.coord = layer.getBounds();
            Zoom.push(int)
            layer.on({
                mouseover: Viewinfo,
                mouseout: function(e) {
                    geojson.setStyle({
                        fillOpacity: 0.6,
                        weight: 1
                    });
                }
            });
        }

        geojson = L.geoJson(dataToDisplay, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    })
    setTimeout(function() {
        CreateLegend()
    }, 500);

}

// Fonction pour avoir un tableau de valeurs (max, min , valeur intermédiaire) pour la gestion des couleurs et de la légende

function MinMax(str) {
    Val = [];
    Val[0] = Data_Europa.reduce(function(o, n) {
        if (n[str] < o[str]) return n;
        return o;
    })[str];
    Val[1] = Data_Europa.reduce(function(o, n) {
        if (n[str] > o[str]) return n;
        return o;
    })[str];
    Val[2] = str;
    Ecart = Val[1] - Val[0];
    EchelleV = Math.trunc(((Ecart % 6) + Ecart) / 6);
    for (i = 1; i < 7; i++) {
        Val[i + 2] = EchelleV * i
    }
    return Val
}

// Fonction de style initial

function style(feature) {
    return {
        fillColor: "#003399",
        fillOpacity: 0.9,
        weight: 1,
        color: "#FFCA00",
        opacity: 1,
    };
}

// Mise à jour du style

function UpdateStyle(Indicator) {
    valeurStyle = MinMax(Indicator);
    geojson.setStyle(function(feature) {
        return {
            fillColor: getColor(feature.properties[valeurStyle[2]]),
            fillOpacity: 0.6,
            weight: 1,
            color: "#000",
            opacity: 1,
        }
    })
    UpdateLegend();
}

function InterGoogleLeaflet(coord) {
    map.fitBounds(coord);
}

// Fonction apppelée lorsque l'utilisateur passe sur la carte avec sa souris

function Viewinfo(e) {
    var layer = e.target;
    layer.setStyle({
        fillOpacity: 0.8,
        weight: 2
    });
    var prop = e.target.feature.properties;
    var flag = "";
    Test = Choix;
    Choix2011 = Choix.slice(0, Choix.length - 4) + "2011";
    Choix2012 = Choix.slice(0, Choix.length - 4) + "2012";
    Choix2013 = Choix.slice(0, Choix.length - 4) + "2013";
    if (Choix.slice(0, 1) === 'E') {
        strchoix = "Energie propre";
        unite = "%"
    } else if (Choix.slice(0, 1) === 'D') {
        strchoix = Choix.slice(0, Choix.length - 7);
        unite = "%"
    } else {
        strchoix = Choix.slice(0, Choix.length - 7);
        unite = "millions d'euros"
    }
    map.setView([48.06217, 11.95827], 4);
    if (Test === "") {} else {
        $('#help').css('display', 'none');
        $('#infobox').css({
            'display': 'block'
        })
        $('#listepays').css({
            'margin-top': 5,
            'display': 'block'
        })
        if (prop.Code_Pays === "UK") {
            flag = "GB"
        } else if (prop.Code_Pays === "EL") {
            flag = "GR"
        } else {
            flag = prop.Code_Pays
        }
        document.getElementById("NOM").innerHTML = prop.Nom_Pays;
        document.getElementById("CODE").innerHTML = prop.Code_Pays;
        CPays = prop.Code_Pays;
        document.getElementById("flagg").innerHTML = "<img id='flag' src='http://www.geognos.com/api/en/countries/flag/" + flag + ".png'/>"
        document.getElementById("C2011").innerHTML = strchoix + " 2011: " + prop[Choix2011] + " " + unite
        document.getElementById("C2012").innerHTML = strchoix + " 2012: " + prop[Choix2012] + " " + unite
        document.getElementById("C2013").innerHTML = strchoix + " 2013: " + prop[Choix2013] + " " + unite
        str.selection = prop.Code_Pays
        drawTable(2);
        drawTable(3);
    }
}


// Gestion des couleurs


function getColor(d) {
    Test = Choix
    switch (Test.slice(0, 1)) {
        case "D":
            return d > valeurStyle[8] ? '#800026' :
                d > valeurStyle[7] ? '#BD0026' :
                d > valeurStyle[6] ? '#FC4E2A' :
                d > valeurStyle[5] ? '#FD8D3C' :
                d > valeurStyle[4] ? '#FEB24C' :
                d > valeurStyle[3] ? '#FED976' :
                '#FFEDA0';
            break;
        case "E":
            return d > valeurStyle[8] ? '#005a32' :
                d > valeurStyle[7] ? '#238443' :
                d > valeurStyle[6] ? '#41ab5d' :
                d > valeurStyle[5] ? '#78c679' :
                d > valeurStyle[4] ? '#addd8e' :
                d > valeurStyle[3] ? '#d9f0a3' :
                '#ffffcc';
            break;
        case "T":
            return d > valeurStyle[8] ? '#0c2c84' :
                d > valeurStyle[7] ? '#225ea8' :
                d > valeurStyle[6] ? '#1d91c0' :
                d > valeurStyle[5] ? '#41b6c4' :
                d > valeurStyle[4] ? '#7fcdbb' :
                d > valeurStyle[3] ? '#c7e9b4' :
                '#ffffcc';
            break;
    }
}

// MIse à jour de la légende

function UpdateLegend() {
    legend.removeFrom(map)
    legend = L.control({
        position: 'bottomright'
    });
    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [valeurStyle[8], valeurStyle[7], valeurStyle[6], valeurStyle[5], valeurStyle[4], valeurStyle[3]],
            labels = ["<i>Légende</i>", LegendTitle()],
            from, to;
        for (var i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];
            labels.push(
                '<i style="background:' + getColor(from + 1) + '"></i> ' +
                from + (to ? '&ndash;' + to : '-'));
        }
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(map);
}

// Création de la légende

function CreateLegend() {
    legend = L.control({
        position: 'bottomright'
    });
    legend.onAdd = function(map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [valeurStyle[8], valeurStyle[7], valeurStyle[6], valeurStyle[5], valeurStyle[4], valeurStyle[3]],
            labels = ["<i>Légende</i>"],
            from, to;
        labels.push(
            '<i style="background:#003399"></i> Pays U.E');
        div.innerHTML = labels.join('<br>');
        return div;
    };
    legend.addTo(map);
}

// Titre de la légende

function LegendTitle() {
    Test = valeurStyle[2]
    titleL = ""
    switch (Test.slice(0, 1)) {
        case "D":
            return titleL = "Dechet " + Annee.replace("An", "")
            break;
        case "E":
            return titleL = "Energie propre" + Annee.replace("An", " ")
            break;
        case "T":
            return titleL = "Taxe" + Annee.replace("An", " ")
            break;
    }
}

/* ------------------------------------------------------------------------------------------------------------------------------*/

/* PHASE 3 CREATION ET GESTION DU TABLEAU DE BORD */

setTimeout(function() {
    google.charts.load('current', {
        'packages': ['table', 'corechart']
    });
    google.charts.setOnLoadCallback(drawTable);

}, 500)




function drawTable(a) {

    var cssClassNames = {
        headerRow: 'headerRow',
        tableRow: 'tableRow',
        oddTableRow: 'oddTableRow',
        selectedTableRow: 'selectedTableRow',
        hoverTableRow: 'hoverTableRow',
        headerCell: 'headerCell',
        tableCell: 'tableCell',
        rowNumberCell: 'rowNumberCell'
    }

    setTimeout(function() {
        data = createData(Data_Europa, false, 17)
    }, 500)

    switch (a) {
        // GRAPHIQUE EVOLUTION DE LA POPULATION
        case 2:
            chart = new google.visualization.ColumnChart(document.getElementById('EvolutionPopulation'));
            chart.draw(createView("B1", data, 17), {
                title: "Evolution de la population de 2011 à 2013",
                fontSize: 12,
                colors: ['#a4ffd3', '#64d6ab', '#389874'],
                vAxis: {
                    title: 'Population'
                },
                bar: {
                    groupWidth: "100%"
                },
                chartArea: {
                    width: '50%',
                    height: '80%'
                },
                legend: {
                    textStyle: {
                        fontSize: 12
                    }
                }
            });
            // GRAPHIQUE EVOLUTION DU PIB   
        case 3:
            chart = new google.visualization.ColumnChart(document.getElementById('EvolutionPIB'));
            chart.draw(createView("B2", data, 17), {
                title: "Evolution du PIB par habitant de 2011 à 2013",
                fontSize: 12,
                colors: ['#4e00ff', '#3c00c6', '#25007b'],
                vAxis: {
                    title: 'PIB(Produit Intérieur Brut) par habitant'
                },
                bar: {
                    groupWidth: "100%"
                },
                chartArea: {
                    width: '50%',
                    height: '80%'
                },
                legend: {
                    textStyle: {
                        fontSize: 12
                    }
                }
            });
            break;
            // DASHBOARD START
        case 4:
            // CREATION DU BAR CHART
            BarChart = new google.visualization.BarChart(document.getElementById('BarChart'));
            optionBarChart = {
                title: ChartText(2),
                colors: ['#b0120a'],
                hAxis: {
                    title: ChartText(4),
                },
                titlePosition: 'out',
                vAxis: {
                    title: 'Pays'
                },
                size: 40,
                width: 600,
                height: 500,
                chartArea: {
                    width: '45%',
                    height: '85%',
                    top: 40
                },
                legend: {
                    position: 'none'
                },
                colors: [ChartColor(1, false, true), ChartColor(2, false, true), ChartColor(3, false, true)]
            }
            BarData = createView("B", data, 17, data.getColumnIndex(Choix2))
            BarChart.draw(BarData, optionBarChart);

            // CREATION DU BUUBLE CHART
            var BubbleChart = new google.visualization.BubbleChart(document.getElementById('BubbleChart'));
            var optionBubbleChart = {
                title: ChartText(3),
                hAxis: {
                    title: 'Population',
                    viewWindow: {
                        min: 0
                    }
                },
                vAxis: {
                    title: 'PIB(Produit intérieur brut par habitant (euro))',
                },
                sizeAxis: {
                    minSize: 10,
                    maxSize: 30
                },
                bubble: {
                    textStyle: {
                        fontSize: 11,
                        auraColor: 'none',
                    },
                    sortBubblesBySize: true,
                },
                width: 1400,
                height: 400,
                chartArea: {
                    width: '80%',
                    height: '75%',
                    top: 50,
                },
                colors: [ChartColor(1, true, false), ChartColor(2, true, false), ChartColor(3, true, false)]
            }
            BubbleData = createView("BU", data, data.getColumnIndex("Code Pays"), data.getColumnIndex(PopulationChoix), data.getColumnIndex(PIBChoix), data.getColumnIndex("GroupeEurope"), data.getColumnIndex(Choix2))
            BubbleChart.draw(BubbleData, optionBubbleChart);

            // CREATION DU PIE CHART
            grouped_data = google.visualization.data.group(createView("P", data, 4, data.getColumnIndex(Choix2)), [0], [{
                'column': 1,
                'aggregation': google.visualization.data.avg,
                'type': 'number'
            }]);
            var optionsPiechart = {
                legend: 'none',
                pieSliceText: 'label',
                title: ChartText(1),
                width: 500,
                height: 500,
                pieHole: 0.4,
                chartArea: {
                    width: '90%',
                    height: '70%',
                    backgroundColor: {
                        stroke: '#fff',
                        strokeWidth: 1,
                    }
                },
                colors: [ChartColorPie(2, false, false), ChartColorPie(3, false, false), ChartColorPie(1), false, false]
            };

            var PieChart = new google.visualization.PieChart(document.getElementById('PieChart'));
            PieChart.draw(grouped_data, optionsPiechart);
            break;
        case 5:
            table = new google.visualization.Table(document.getElementById('tableChart'));
            table.draw(createView("T1", data, 17), {
                width: '100%',
                height: '100px',
                sortAscending: true,
                allowHtml: true,
                cssClassNames: cssClassNames
            });
            google.visualization.events.addListener(table, 'select', selectHandler);
            break;
    }
}

// Création de la datatable googlechart
function createData(array1, sort, col) {
    namecol = Object.keys(array1[0]);
    data = [];
    data = new google.visualization.DataTable();
    numbercol = 0
    for (i = 0; i < namecol.length; i++) {
        res = namecol[i].replace("_An", " ")
        res = res.replace("_", " ")
        data.addColumn(typeof(array1[0][namecol[i]]), res);
    }
    array1.forEach(function(d) {
        data.addRows([
            [d[namecol[0]], {
                    v: d[namecol[1]],
                    f: d[namecol[1]] + " millions euros"
                }, {
                    v: d[namecol[2]],
                    f: d[namecol[2]] + " millions euros"
                }, {
                    v: d[namecol[3]],
                    f: d[namecol[3]] + " millions euros"
                }, {
                    v: d[namecol[4]],
                    f: d[namecol[4]].replace("GRP", "Groupe ")
                }, {
                    v: d[namecol[5]],
                    f: d[namecol[5]] + " euros/hab"
                }, {
                    v: d[namecol[6]],
                    f: d[namecol[6]] + " euros/hab"
                }, {
                    v: d[namecol[7]],
                    f: d[namecol[7]] + " euros/hab"
                }, {
                    v: d[namecol[8]],
                    f: d[namecol[8]] + " habitants"
                }, {
                    v: d[namecol[9]],
                    f: d[namecol[9]] + " habitants"
                }, {
                    v: d[namecol[10]],
                    f: d[namecol[10]] + " habitants"
                }, {
                    v: d[namecol[11]],
                    f: d[namecol[11]] + " %"
                }, {
                    v: d[namecol[12]],
                    f: d[namecol[12]] + " %"
                }, {
                    v: d[namecol[13]],
                    f: d[namecol[13]] + " %"
                }, {
                    v: d[namecol[14]],
                    f: d[namecol[14]] + " %"
                }, {
                    v: d[namecol[15]],
                    f: d[namecol[15]] + " %"
                }, {
                    v: d[namecol[16]],
                    f: d[namecol[16]] + " %"
                },
                d[namecol[17]],
            ]
        ]);
    });
    data.sort([{
        column: col,
        desc: sort
    }]);
    return data;
}

// Création des vues utilisées pour les graphiques
function createView(type, d, i, i2, i3, i4, i5) {
    var view = new google.visualization.DataView(d);
    switch (type) {
        case "T1":
            view.setColumns([i]);
            data.sort([{
                column: i,
                desc: false,
            }])
            return view;
            break;
        case "B2": //GRAPHIQUE POPULATION 
            view.setColumns([i, 5, 6, 7]);
            view.setRows(data.getFilteredRows([{
                column: 0,
                value: str.selection
            }]))
            return view;
            break;
        case "B1":
            view.setColumns([i, 8, 9, 10]);
            view.setRows(data.getFilteredRows([{
                column: 0,
                value: str.selection
            }]))
            return view;
            break;
        case "B":
            view.setColumns([i, i2]);
            data.sort([{
                column: i2,
                desc: true
            }]);
            if (Choix3 === "reset") {} else {
                view.setRows(data.getFilteredRows([{
                    column: 4,
                    value: Choix3
                }]))
            }
            return view;
            break;
        case "P":
            view.setColumns([i, i2]);
            return view;
            break;
        case "BU":
            view.setColumns([i, i2, i3, i4, i5]);
            if (Choix3 === "reset") {} else {
                view.setRows(data.getFilteredRows([{
                    column: 4,
                    value: Choix3
                }]))
            }
            return view;
            break;
    }
}

// Fonction pour la gestion de l'intéractivité entre la carte et les graphiques de l'onglet cartographie
function selectHandler() {
    var selection = table.getSelection();
    for (var i = 0; i < selection.length; i++) {
        var item = selection[i];
        if (item.row != null) {
            var tr = data.getFormattedValue(item.row, 0);
        }
    }
    tmp1 = Indic.slice(0, -1) + " 2011";
    tmp2 = Indic.slice(0, -1) + " 2012";
    tmp3 = Indic.slice(0, -1) + " 2013";
    Zoom.forEach(function(d) {
        if (tr === d.cp) {
            InterGoogleLeaflet(d.coord)
            str.selection = tr
            if (Test === "") {} else {
                $('#help').css('display', 'none')
                $('#infobox').css({
                    'display': 'block'
                })
                $('#tableChart').css({
                    'margin-top': 1
                })
                $('#listepays').css({
                    'margin-top': 5,
                    'display': 'block'
                })
            }
            drawTable(2);
            drawTable(3);
            document.getElementById("NOM").innerHTML = data.getFormattedValue(item.row, 17);
            document.getElementById("CODE").innerHTML = data.getFormattedValue(item.row, 0);
            CPays = data.getFormattedValue(item.row, 0);
            label = ""
            if (Choix.slice(0, 1) === 'E') {
                label = "Energie propre"
            } else {
                label = Choix.slice(0, -7)
            }
            document.getElementById("C2011").innerHTML = label + " 2011: " + data.getFormattedValue(item.row, data.getColumnIndex(tmp1));
            document.getElementById("C2012").innerHTML = label + " 2012: " + data.getFormattedValue(item.row, data.getColumnIndex(tmp2));
            document.getElementById("C2013").innerHTML = label + " 2013: " + data.getFormattedValue(item.row, data.getColumnIndex(tmp3));
            if (data.getFormattedValue(item.row, 0) === "UK") {
                flag = "GB"
            } else if (data.getFormattedValue(item.row, 0) === "EL") {
                flag = "GR"
            } else {
                flag = data.getFormattedValue(item.row, 0)
            }
            document.getElementById("flagg").innerHTML = "<img id='flag' src='http://www.geognos.com/api/en/countries/flag/" + flag + ".png'/>"
        }
    })
}
// Fonction pour la création de titre ou légende dynamique pour les graphiques
function ChartText(Nb) {
    Test = Choix
    Text = ""
    switch (Test.slice(0, 1)) {
        case "D": //DECHET
            if (Nb === 1) {
                return Text = "Part des déchets ménagers recyclés en moyenne par groupe européen"
            } else if (Nb === 2) {
                return Text = "Part des déchets ménagers recyclés par pays"
            } else if (Nb === 3) {
                return Text = "Taux des déchets ménagers recyclés en fonction du PIB et de la population par pays"
            } else {
                return Text = "Part des déchets ménagers recyclés(%)"
            }
            break;
        case "E": //ENERGIE PROPRE
            if (Nb === 1) {
                return Text = "Part de la production moyenne d'énergie propre par groupe européen"
            } else if (Nb === 2) {
                return Text = "Part des énergies propres produites par pays"
            } else if (Nb === 3) {
                return Text = "Taux des énergies propres produites en fonction du PIB et de la population par pays"
            } else {
                return Text = "Part des énergies propres(%)"
            }
            break;
        case "T": // TAXE
            if (Nb === 1) {
                return Text = "Montant des taxes liées à l'environnement en moyenne par groupe européen"
            } else if (Nb === 2) {
                return Text = "Montant des taxes liées à l'environnement perçues par pays"
            } else if (Nb === 3) {
                return Text = "Montant des taxes liées à l'environnement en fonction du PIB et de la population par pays"
            } else {
                return Text = "Revenus perçus (en millions d'euros)"
            }
            break;
    }
}
// Fonction pour la gestion des couleurs des graphiques 
function ChartColor(Nb, t, g) {
    Test = Choix
    Color = ""
    switch (Choix3) {
        case 'reset':
            switch (Test.slice(0, 1)) {
                case "D":
                    if (Nb === 1) {
                        if (g == false) {
                            return Color = '#800026'
                        } else {
                            return Color = '#808080'
                        }
                    } else if (Nb === 2) {
                        return Color = '#FD8D3C'
                    } else {
                        return Color = '#FED976'
                    }
                    break;
                case "E":
                    if (t === true) {
                        if (Nb === 1) {
                            return Color = "#78c679"
                        } else if (Nb === 2) {
                            return Color = "#d9f0a3"
                        } else {
                            return Color = "#005a32"
                        }
                    } else {
                        if (Nb === 1) {
                            if (g == false) {
                                return Color = '#005a32'
                            } else {
                                return Color = '#808080'
                            }
                        } else if (Nb === 2) {
                            return Color = "#78c679"
                        } else {
                            return Color = "#d9f0a3"
                        }
                    }
                    break;
                case "T":
                    if (Nb === 1) {
                        if (g == false) {
                            return Color = '#0c2c84'
                        } else {
                            return Color = '#808080'
                        }
                    } else if (Nb === 2) {
                        return Color = "#41b6c4"
                    } else {
                        return Color = "#c7e9b4"
                    }
                    break;
            }
            break;
        case 'GRP6':
            switch (Test.slice(0, 1)) {
                case "D":
                    return Color = '#800026';
                    break;
                case "E":
                    return Color = "#005a32";
                    break;
                case "T":
                    return Color = "#0c2c84";
                    break;
            }
            break;
        case 'GRP15':
            switch (Test.slice(0, 1)) {
                case "D":
                    return Color = '#FD8D3C';
                    break;
                case "E":
                    return Color = "#78c679";
                    break;
                case "T":
                    return Color = "41b6c4";
                    break
            }
            break;
        case 'GRP28':
            switch (Test.slice(0, 1)) {
                case "D":
                    return Color = '#FED976';
                    break;
                case "E":
                    return Color = "#d9f0a3";
                    break;
                case "T":
                    return Color = "c7e9b4";
                    break
            }
            break;
    }
}
// Fonction pour la gestion des couleurs du PieChart
function ChartColorPie(Nb) {
    Test = Choix
    Color = ""
    switch (Test.slice(0, 1)) {
        case "D":
            if (Nb === 1) {
                return Color = '#800026'
            } else if (Nb === 2) {
                return Color = '#FD8D3C'
            } else {
                return Color = '#FED976'
            }
            break;

        case "E":
            if (Nb === 1) {
                return Color = "#005a32"
            } else if (Nb === 2) {
                return Color = "#78c679"
            } else {
                return Color = "#d9f0a3"
            }
            break;

        case "T":
            if (Nb === 1) {
                return Color = "#0c2c84"
            } else if (Nb === 2) {
                return Color = "#41b6c4"
            } else {
                return Color = "#c7e9b4"
            }
            break;
    }
}

/* ------------------------------------------------------------------------------------------------------------------------------*/

/* PHASE 4 INTERACTIVITE GLOBALE DE L'APPLICATION */


// Gestion des boutons indicateur
function SelectionIndic(a) {

    $('#help').css('display', 'none')
    Choix = ""
    Indic = a
    Choix = Indic + Annee
    Choix2 = Indic + Annee
    Choix2 = Choix2.replace("_An", " ")

    var Test = Indic.slice(0, 1)
    switch (Test) {
        case 'D':
            $("#D").addClass("selectedIndic");
            $("#E").removeClass("selectedIndic");
            $("#T").removeClass("selectedIndic");
            break;
        case 'E':
            $("#E").addClass("selectedIndic");
            $("#D").removeClass("selectedIndic");
            $("#T").removeClass("selectedIndic");
            break;
        case 'T':
            $("#T").addClass("selectedIndic");
            $("#D").removeClass("selectedIndic");
            $("#E").removeClass("selectedIndic");
            break;
    }

    if (Annee === "") {
        alert("Veuillez choisir une année")
    } else {
        PopulationChoix = "Population " + Annee.replace("An", "")
        PIBChoix = "Pib " + Annee.replace("An", "")
        UpdateStyle(Choix)
        drawTable(4, Choix3);
        drawTable(5);
        $('#listepays').css({
            'display': 'block'
        })
    }

    if ($('#infobox').css('display') == 'block') {
        function trouvePays(pays) {
            return pays.Code_Pays === CPays;
        }
        Choix2011 = Choix.slice(0, Choix.length - 4) + "2011";
        Choix2012 = Choix.slice(0, Choix.length - 4) + "2012";
        Choix2013 = Choix.slice(0, Choix.length - 4) + "2013";
        label = ""
        if (Choix.slice(0, 1) === 'E') {
            label = "Energie propre"
        } else {
            label = Choix.slice(0, -7)
        }
        if (Choix.slice(0, 1) === 'T') {
            unite = "millions d'euros"
        } else {
            unite = "%"
        }
        document.getElementById("C2011").innerHTML = label + " 2011: " + Data_Europa.find(trouvePays)[Choix2011] + " " + unite
        document.getElementById("C2012").innerHTML = label + " 2012: " + Data_Europa.find(trouvePays)[Choix2012] + " " + unite
        document.getElementById("C2013").innerHTML = label + " 2013: " + Data_Europa.find(trouvePays)[Choix2013] + " " + unite
    }

}
// Gestion des boutons année
function SelectionAnnee(b) {
    $('#help').css('display', 'none')
    Choix = "";
    Annee = b
    Choix = Indic + Annee
    Choix2 = Indic + Annee
    Choix2 = Choix2.replace("_An", " ")

    var Test = Annee.slice(2, 6)
    switch (Test) {
        case '2011':
            $("#2011").addClass("selectedIndic");
            $("#2012").removeClass("selectedIndic");
            $("#2013").removeClass("selectedIndic");
            break;
        case '2012':
            $("#2012").addClass("selectedIndic");
            $("#2011").removeClass("selectedIndic");
            $("#2013").removeClass("selectedIndic");
            break;
        case '2013':
            $("#2013").addClass("selectedIndic");
            $("#2011").removeClass("selectedIndic");
            $("#2012").removeClass("selectedIndic");
            break;
    }

    if (Indic === "") {
        alert("Veuillez choisir un indicateur")
    } else {
        PopulationChoix = "Population " + Annee.replace("An", "")
        PIBChoix = "Pib " + Annee.replace("An", "")
        UpdateStyle(Choix)
        drawTable(4, Choix3);
        drawTable(5)
        $('#listepays').css({
            'display': 'block'
        })

    }

};

// Gestion des boutons groupe dans l'onglet tableau de bord
function FiltrerGroupe(c) {
    Choix3 = c
    switch (Choix3) {
        case 'reset':
            $("#reset").addClass("selectedGrp");
            $("#GRP6").removeClass("selectedGrp");
            $("#GRP15").removeClass("selectedGrp");
            $("#GRP28").removeClass("selectedGrp");
            break;
        case 'GRP6':
            $("#GRP6").addClass("selectedGrp");
            $("#reset").removeClass("selectedGrp");
            $("#GRP15").removeClass("selectedGrp");
            $("#GRP28").removeClass("selectedGrp");
            break;
        case 'GRP15':
            $("#GRP15").addClass("selectedGrp");
            $("#reset").removeClass("selectedGrp");
            $("#GRP6").removeClass("selectedGrp");
            $("#GRP28").removeClass("selectedGrp");
            break;
        case 'GRP28':
            $("#GRP28").addClass("selectedGrp");
            $("#reset").removeClass("selectedGrp");
            $("#GRP6").removeClass("selectedGrp");
            $("#GRP15").removeClass("selectedGrp");
            break;
    }
    drawTable(4, Choix3)
};

// Gestion des onglets
function Hide(c, d) {
    $('#help').css('display', 'none')
    if (c === "#container1") {
        $('.Grp').css("display", "block")
		if (T == 0){
        $("#reset").addClass("selectedGrp");
        $("#GRP6").removeClass("selectedGrp");
        $("#GRP15").removeClass("selectedGrp");
        $("#GRP28").removeClass("selectedGrp");}
        $("#TDB").addClass("selectedMenu");
        $("#CARTO").removeClass("selectedMenu")
		T = 1
    } else {
        $('.Grp').css("display", "none")
        $("#CARTO").addClass("selectedMenu");
        $("#TDB").removeClass("selectedMenu")
    }
    $(c).fadeOut(500, function() {})
    $(d).fadeIn(500, function() {})
}

function Help() {
    $('#infobox').fadeOut(0, function() {})
    $('#help').fadeIn(0, function() {})
    $('#listepays').css({
        'margin-top': 5,
        'display': 'block'
    })

}

/* -----------------------------------------------------FIN------------------------------------------------------------------------*/