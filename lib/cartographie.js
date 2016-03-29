var map = "";
var Zoom = [];
 var legend="";
var valeurStyle=""
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
					mouseout: function (e) {geojson.setStyle({fillOpacity: 0.6, weight: 1});}
				});
			}
			
			geojson = L.geoJson(dataToDisplay, {
				style: style,
				onEachFeature: onEachFeature
			}).addTo(map);
		})
		setTimeout(function() {CreateLegend()}, 500);
		
		}

        // Fonction pour avoir un tableau de valeurs (max, min , valeur intermédiaire) pour la gestion des couleurs et de la légende

	function MinMax(str) {
			Val = [];
			Val[0] = Data_Europa.reduce(function(o, n) {if (n[str] < o[str]) return n;return o;})[str];
			Val[1] = Data_Europa.reduce(function(o, n) {if (n[str] > o[str]) return n;return o;})[str];
			Val[2] = str;
			Ecart = Val[1] - Val[0];
			EchelleV = Math.trunc(((Ecart % 6) + Ecart) / 6);
				for (i = 1; i < 7; i++) {Val[i + 2] = EchelleV * i}
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
		layer.setStyle({fillOpacity: 0.8, weight: 2});
		var prop = e.target.feature.properties;
		var flag="" ;
		Test = Choix;
		Choix2011 = Choix.slice(0,Choix.length - 4) + "2011";
		Choix2012 = Choix.slice(0,Choix.length - 4) + "2012";
		Choix2013 = Choix.slice(0,Choix.length - 4) + "2013";
		if(Choix.slice(0,1) === 'E') {
		strchoix =  "Energie propre"; unite="%"}
		else if(Choix.slice(0,1) === 'D'){strchoix = Choix.slice(0,Choix.length - 7); unite="%"}
		else {strchoix = Choix.slice(0,Choix.length - 7); unite="millions d'euros"}	
		map.setView([48.06217, 11.95827], 4);
		if(Test === "")
			{}
			else{
				$('#help').css('display','none');
				$('#infobox').css({'display':'block'})
				$('#listepays').css({'margin-top': 5, 'display':'block'})
				if(prop.Code_Pays === "UK" ){flag= "GB"}else if(prop.Code_Pays === "EL"){flag= "GR"}else{flag= prop.Code_Pays}
				document.getElementById("NOM").innerHTML =  prop.Nom_Pays;
				document.getElementById("CODE").innerHTML =  prop.Code_Pays;
                CPays = prop.Code_Pays;
				document.getElementById("flagg").innerHTML = "<img id='flag' src='http://www.geognos.com/api/en/countries/flag/"+flag+".png'/>"
				document.getElementById("C2011").innerHTML =strchoix +" 2011: " +prop[Choix2011] + " "+unite
				document.getElementById("C2012").innerHTML = strchoix +" 2012: " +prop[Choix2012] +" "+  unite
				document.getElementById("C2013").innerHTML = strchoix +" 2013: "+ prop[Choix2013] +" "+ unite
				str.selection =  prop.Code_Pays
				drawTable(2); drawTable(3);	
		}
	}


    // Gestion des couleurs


	function getColor(d) {
	Test = Choix
	switch (Test.slice(0,1)){
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
			   d > valeurStyle[3] ? '#c7e9b4':
									'#ffffcc'; 
	   break;}
	}

    // MIse à jour de la légende

	 function UpdateLegend() {
			legend.removeFrom( map)
			legend = L.control({position: 'bottomright'});
			legend.onAdd = function (map) {
				var div = L.DomUtil.create('div', 'info legend'),
					grades = [ valeurStyle[8],  valeurStyle[7],  valeurStyle[6],  valeurStyle[5],  valeurStyle[4],  valeurStyle[3]],
					labels = ["<i>Légende</i>",LegendTitle()],
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
			legend = L.control({position: 'bottomright'});
			legend.onAdd = function (map) {
			var div = L.DomUtil.create('div', 'info legend'),
			grades = [ valeurStyle[8],  valeurStyle[7],  valeurStyle[6],  valeurStyle[5],  valeurStyle[4],  valeurStyle[3]],
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

	function LegendTitle(){
		Test= valeurStyle[2]
		titleL=""
		switch (Test.slice(0,1)){
			case "D":
			return titleL="Dechet " + Annee.replace("An","")
			break;
			case "E":
			return titleL="Energie propre" + Annee.replace("An"," ")
			break; 
			case "T":
			return titleL="Taxe" + Annee.replace("An"," ")
			break;
		   }
	}