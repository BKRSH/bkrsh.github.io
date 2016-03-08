var map="";
var Zoom=[];


function TraitementEurope(k) {
var kk="";    
     map = L.map('map').setView([48.06217, 11.95827], 4);
    	map.dragging.disable();
	//	map.touchZoom.disable();
		map.doubleClickZoom.disable();
		map.scrollWheelZoom.disable();
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

    }).addTo(map);

    $.getJSON("data/countries.geojson", function(data) {
        //                    console.log(data)
        dataToDisplay = {}
        dataToDisplay.type = "FeatureCollection"
        dataToDisplay.features = []
        data.features.forEach(function(d) {

            for (i = 0; i < Data_Europa.length; i++) {
                if (d.properties.iso_a2 === Data_Europa[i].Code_Pays || d.properties.iso_a2 === "GR" && Data_Europa[i].Code_Pays == "EL" || d.properties.iso_a2 === "GB" && Data_Europa[i].Code_Pays === "UK") {
                    // Data_Europa[i].EuropePolygon = d.properties.iso_a2;
                    Data_Europa[i].Nom_Pays = d.properties.name;
                    dataToDisplay.features[i] = d

                    d.properties = {}

                    d.properties.Code_Pays = Data_Europa[i].Code_Pays
                    d.properties.Nom_Pays = Data_Europa[i].Nom_Pays
                    d.properties.Taxe_An2011 = Data_Europa[i].Taxe_An2011
                    d.properties.Taxe_An2012 = Data_Europa[i].Taxe_An2012
                    d.properties.Taxe_An2013 = Data_Europa[i].Taxe_An2013
                    d.properties.Pib_An2011 = Data_Europa[i].Pib_An2011
                    d.properties.Pib_An2012 = Data_Europa[i].Pib_An2012
                    d.properties.Pib_An2013 = Data_Europa[i].Pib_An2013
                    d.properties.Population_An2011 = Data_Europa[i].Population_An2011
                    d.properties.Population_An2012 = Data_Europa[i].Population_An2012
                    d.properties.Population_An2013 = Data_Europa[i].Population_An2013
                } else {
                    delete(d)
                }
            }          
        })
  
            valeurStyle = MinMax(k)
 		
            function onEachFeature(feature, layer) {
                    		
             var int = {}
                int.cp = feature.properties.Code_Pays
                int.coord = layer.getBounds()
                    Zoom.push(int)
                    
                    
                  
							layer.on({
							click: zoomToFeature
							});
						}
            
        geojson = L.geoJson(dataToDisplay, {
            // option de style à mettre ici
             style: style,
            onEachFeature: onEachFeature
        }).addTo(map);

    
    })
}


function MinMax(str){
    
    Val=[]

     Val[0] = Data_Europa.reduce(function(o, n) { if (n[str] < o[str]) return n; return o; })[str];
     Val[1]  = Data_Europa.reduce(function(o, n) { if (n[str]> o[str]) return n; return o; })[str];
     Val[2]  = str
    
     Ecart =  Val[1] - Val[0];
     EchelleV = ((Ecart % 6) + Ecart) / 6;
    
    
    for(i=1;i < 7; i++)
        {
            Val[i+2] =  EchelleV * i
            
          
        }
     
    return Val
					
}

function getColor(d) {

    return d < Val [3] ? 'edf8fb' :
d < Val[4] ? 'ccece6' :
d < Val[5] ? '99d8c9' :
d < Val[6] ? '66c2a4' :
d < Va[7] ? '2ca25f' :
            '006d2c' ;

}

function style(feature) {

							return {
								fillColor: couleur(feature.properties[valeurStyle[2]], valeurStyle[0] , valeurStyle[1]),
								fillOpacity: 0.6,
                                weight: 1,
                                color: "#000",
                                opacity: 1,
							};
						}

function Tstyle(m) {
         valeurStyle = MinMax(m)
         console.log(valeurStyle)
  geojson.setStyle(function (feature) { return {
								fillColor: couleur(feature.properties[valeurStyle[2]], valeurStyle[0] , valeurStyle[1]),
								fillOpacity: 0,
                                weight: 1,
                                color: "#000",
                                opacity: 1,
							}})
 
							
						}
                   
                             
        function  kokoo()
        {
            geojson.setStyle(function (feature){
                return {
            fillColor: "green",
            fillOpacity: 0.5,
            weight: 1,
            color: "#777",
            opacity: 1 
            }}); 

           
        };
        
        
function couleur (val, min, max) {
                        var r = 255,
                            g = Math.floor((1 - (val - min) / (max - min)) * 255)
                            b = Math.floor((1 - (val - min) / (max - min)) * 255);
                        return "rgb(" + r + ", " + g + ", " + b + ")";
     
                    }


function InterGoogleLeaflet(coord) {
        
    
  //  kko = [{lat:o,lng:oi},{lat:o,lng;oi}]
         map.fitBounds(coord)

     
    
}

function zoomToFeature(e)  {
    
                        var prop = e.target.feature.properties;
                document.getElementById("tt").innerHTML = prop.Nom_Pays;
    map.setView([48.06217, 11.95827], 4)
					}


