var Data_Europa = []		
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
                 var   Pib = [];
                 var  Pib_Data = [];		 
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
			})}

    // Affectation d'un groupe européen selon le pays
			
			function AffectationGroupe(array1){
					array1.forEach(function(d) {			
					if ($.inArray(d.Code_Pays,UeGrp6) > -1) {
						d.GroupeEurope = "GRP6";
					}
					else if($.inArray(d.Code_Pays,UeGrp15) > -1) {
						 d.GroupeEurope = "GRP15";
					} else  {d.GroupeEurope = "GRP28"}
					})          
				}

    // Création de la variable Data_Europa + importation du premier fichier sur les taxes

			function CreateDataEuropa(){
				d3.tsv("data/taxe.tsv", function(data){
				Taxe = data;
				 string_a = "ENV,MIO_EUR,";
				 UeGrp6 = ["DE","FR","BE","IT","LU","NL"];
				 UeGrp15 = ["AT","DK","EL","ES","FI","IE","PT","SE","UK"];
				 NotUE = ["ENV,MIO_EUR,CH","ENV,MIO_EUR,EA19","ENV,MIO_EUR,EU28","ENV,MIO_EUR,LI","ENV,MIO_EUR,NO","ENV,MIO_EUR,RS","ENV,MIO_EUR,TR"];
					
					 Taxe.forEach(function(c) {
						 var Data_Europa_Objet = {}
						 string_t = c[Object.getOwnPropertyNames(c)[0]].trim()
					 if( string_t.indexOf(string_a) > -1){
						if($.inArray(string_t,NotUE) > -1 ){
							}
							else{
							Data_Europa_Objet['Code_Pays'] = string_t.slice(12,14);
							Data_Europa_Objet['Taxe_An2011'] = +c[Object.getOwnPropertyNames(c)[3]].slice(0, 5).trim();
							Data_Europa_Objet['Taxe_An2012'] = +c[Object.getOwnPropertyNames(c)[2]].slice(0, 5).trim();
							Data_Europa_Objet['Taxe_An2013'] = +c[Object.getOwnPropertyNames(c)[1]].slice(0, 5).trim();
							Data_Europa.push(Data_Europa_Objet);}
						}
						else{}
						}) ;
					})     						
			}

       
