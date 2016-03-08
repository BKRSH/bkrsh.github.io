            var Data_Europa = []
			
          	 
           function traitementDonnee() {
				CreateDataEuropa()
                setTimeout(function() {
						traitement1('data/tsdec100.tsv');
						traitement2('data/tps00001.tsv');
                        AffectationGroupe(Data_Europa)
						//TraitementEurope("Pib_An2013"); 				
                }, 500)
            };

            function test(array) {
                for (i = 0; i < array.length; i++) {
                    var augmentation = array[i].An2012P - array[i].An2011P
                    console.log(array[i].Code_Pays + ": " + augmentation);
                }
            }

            function createArray(a) {
                for (i = 0; i < a.length; i++) {
                    toto.push(a[i].An2011)
                };
                var v = 0
                for (y = 0; y < a.length; y++) {
                    v = v + toto[y];

                }
                v = v / a.length;
               
            }

            function traitement1(fichier1) {
                d3.tsv(fichier1, function(data) {
                 var   Pib = []
                 var  Pib_Data = [];
				 
				Pib = data

                    Pib.forEach(function(c) {
                        var pib_Objet = {}
                        if (c[Object.getOwnPropertyNames(c)[0]].length <= 21) {
                            pib_Objet['Code_Pays'] = c[Object.getOwnPropertyNames(c)[0]].slice(19, 21).trim()
                            pib_Objet['An2011'] = +c[Object.getOwnPropertyNames(c)[17]].slice(0, 5).trim()
                            pib_Objet['An2012'] = +c[Object.getOwnPropertyNames(c)[18]].slice(0, 5).trim()
                            pib_Objet['An2013'] = +c[Object.getOwnPropertyNames(c)[19]].slice(0, 5).trim()
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

            function traitement2(fichier2) {
                d3.tsv(fichier2, function(data) {
                    var Pop = []
                    var Pop_Data = [];
                    
                    Pop = data
                    
                    Pop.forEach(function(c) {
                        var pop_Objet = {}
                        if (c[Object.getOwnPropertyNames(c)[0]].length <= 21) {
                            pop_Objet['Code_Pays'] = c[Object.getOwnPropertyNames(c)[0]].slice(4, 6).trim()
                            pop_Objet['An2011_p'] = +c[Object.getOwnPropertyNames(c)[9]].trim().slice(0, 8)
                            pop_Objet['An2012_p'] = +c[Object.getOwnPropertyNames(c)[10]].trim().slice(0, 8)
                            pop_Objet['An2013_p'] = +c[Object.getOwnPropertyNames(c)[11]].trim().slice(0, 8)
                        
                            Pop_Data.push(pop_Objet);
                            
                        }
                    })
                    
                    console.log(Pop_Data)

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

          	/*  function TraitementEurope() {
                $.getJSON("countries.geojson", function(data) {
                    data.features.forEach(function(d) {
                        for (i = 0; i < Data_Europa.length; i++) {
                            if (d.properties.iso_a2 === Data_Europa[i].Code_Pays || d.properties.iso_a2 === "GR" && Data_Europa[i].Code_Pays == "EL" || d.properties.iso_a2 === "GB" && Data_Europa[i].Code_Pays === "UK") {
                                Data_Europa[i].EuropePolygon = d.properties.iso_a2;
                                Data_Europa[i].Nom_Pays = d.properties.name;
                            } else {}

                        }
                    })
			
                 $.getJSON("european-union.geojson", function(data) {
                        for (i = 0; i < Data_Europa.length; i++) {
                            if (Data_Europa[i].Code_Pays === 'MT') {
                                var Malte = i;
                            }
                        }
                        data.features.forEach(function(d) {
                            if (d.id === Data_Europa[Malte].Code_Pays) {
                                Data_Europa[Malte].EuropePolygon = d.geometry;
                                Data_Europa[Malte].Nom_Pays = d.properties.name;
                            } else {}

                        })
                    })                     
                setTimeout(function() {        
                    for(i=0;i< Data_Europa.length;i++){
                        console.log(Data_Europa[i].Code_Pays)
                        console.log (Data_Europa[i].Nom_Pays)}},2000) 
                });}  */
function AffectationGroupe(array1){
    
                array1.forEach(function(d) {
                    
    if ($.inArray(d.Code_Pays,UeGrp6) > -1) {
        d.GroupeEurope = "GRP6"
        
    }
    else if($.inArray(d.Code_Pays,UeGrp15) > -1) {
         d.GroupeEurope = "GRP15"
    } else  {d.GroupeEurope = "GRP28"}
})          
            }

				



function CreateDataEuropa(){
				d3.tsv("data/env_ac_tax.tsv", function(data){
				Taxe = data
				 string_a = "ENV,MIO_EUR,"
                 UeGrp6 = ["DE","FR","BE","IT","LU","NL"]
                 UeGrp15 = ["AT","DK","EL","ES","FI","IE","PT","SE","UK"]
				 NotUE = ["ENV,MIO_EUR,CH","ENV,MIO_EUR,EA19","ENV,MIO_EUR,EU28","ENV,MIO_EUR,LI","ENV,MIO_EUR,NO","ENV,MIO_EUR,RS","ENV,MIO_EUR,TR"]
					
				                     Taxe.forEach(function(c) {
								 var Data_Europa_Objet = {}
						   string_t = c[Object.getOwnPropertyNames(c)[0]].trim()
                     if( string_t.indexOf(string_a) > -1){
						if($.inArray(string_t,NotUE) > -1 ){
							}
							else{
							Data_Europa_Objet['Code_Pays'] = string_t.slice(12,14)
							Data_Europa_Objet['Taxe_An2011'] = +c[Object.getOwnPropertyNames(c)[3]].slice(0, 5).trim()
                            Data_Europa_Objet['Taxe_An2012'] = +c[Object.getOwnPropertyNames(c)[2]].slice(0, 5).trim()
                            Data_Europa_Objet['Taxe_An2013'] = +c[Object.getOwnPropertyNames(c)[1]].slice(0, 5).trim()

						    Data_Europa.push(Data_Europa_Objet);}
						}
						else{}
                        }) ;
					})     
			

}

       
	   traitementDonnee()