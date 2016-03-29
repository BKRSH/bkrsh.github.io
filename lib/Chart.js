google.charts.load('current', {'packages': ['table', 'corechart']});
google.charts.setOnLoadCallback(drawTable);

var table = {}
var data = {}
var chart = {}
var filtre = false

	function drawTable(a) {

	   var cssClassNames= { 
            headerRow: 'headerRow',
            tableRow: 'tableRow',
            oddTableRow: 'oddTableRow',
            selectedTableRow: 'selectedTableRow',
            hoverTableRow: 'hoverTableRow',
            headerCell: 'headerCell',
            tableCell: 'tableCell',
            rowNumberCell: 'rowNumberCell'
        }
	
	setTimeout(function() {data = createData(Data_Europa, false, 17)}, 500)

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
			optionBarChart =  {
					title: ChartText(2),
					colors: ['#b0120a'],
					hAxis: {
						title: ChartText(4),
					},
					titlePosition:'out',
					vAxis: {
						title: 'Pays'				
					},
					size: 40,
					width:600,
					height:500,
					 chartArea: {
						width: '45%',
						height: '85%',
                         top: 40
					},
                    legend:{position:'none'},
					colors: [ChartColor(1,false,true), ChartColor(2,false,true), ChartColor(3,false,true)]
				}
				BarData = createView("B", data, 17, data.getColumnIndex(Choix2))   
				BarChart.draw(BarData,optionBarChart);
				 
				 // CREATION DU BUUBLE CHART
				var BubbleChart = new google.visualization.BubbleChart(document.getElementById('BubbleChart'));        
				var optionBubbleChart = {
					title: ChartText(3), 
					hAxis: {
						title: 'Population',
					viewWindow:{
					min:0
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
						 width:1400,
						 height:400,
				   chartArea: {
						width: '80%',
						height: '75%',
                       top:50,
					},
					colors: [ChartColor(1,true,false), ChartColor(2,true,false), ChartColor(3,true,false)]
				}
				BubbleData = createView("BU", data, data.getColumnIndex("Code Pays"), data.getColumnIndex(PopulationChoix),data.getColumnIndex(PIBChoix), data.getColumnIndex("GroupeEurope"),data.getColumnIndex(Choix2))
				BubbleChart.draw(BubbleData, optionBubbleChart);
			   
				// CREATION DU PIE CHART
				grouped_data = google.visualization.data.group(createView("P", data, 4, data.getColumnIndex(Choix2)), [0], [{
						'column': 1,
						'aggregation': google.visualization.data.avg,
						'type': 'number'
					}]);						
				var optionsPiechart = {
					legend:'none',
					pieSliceText: 'label',
					title: ChartText(1),
					width:500,
					height:500,
					pieHole:0.4,
					chartArea: {
						width: '90%',
						height: '70%',   
						backgroundColor: {
							stroke: '#fff',
							strokeWidth: 1,
					}},
					colors: [ChartColorPie(2,false,false), ChartColorPie(3,false,false), ChartColorPie(1),false,false]
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
					[d[namecol[0]], 
					{v: d[namecol[1]], f:d[namecol[1]]+" millions euros"}, 
					{v: d[namecol[2]], f:d[namecol[2]]+" millions euros"}, 
					{v: d[namecol[3]], f:d[namecol[3]]+" millions euros"}, 
					 {v:d[namecol[4]], f:d[namecol[4]].replace("GRP","Groupe ")},
					 {v:d[namecol[5]], f:d[namecol[5]]+" euros/hab"},
					 {v:d[namecol[6]], f:d[namecol[6]]+" euros/hab"},
					 {v:d[namecol[7]], f:d[namecol[7]]+" euros/hab"},
					 {v:d[namecol[8]], f:d[namecol[8]]+" habitants"},
					 {v:d[namecol[9]], f:d[namecol[9]]+" habitants"},
					 {v:d[namecol[10]], f:d[namecol[10]]+" habitants"},
					 {v:d[namecol[11]], f:d[namecol[11]]+" %"},
					 {v:d[namecol[12]], f:d[namecol[12]]+" %"},
					 {v:d[namecol[13]], f:d[namecol[13]]+" %"},
					 {v:d[namecol[14]], f:d[namecol[14]]+" %"},
					 {v:d[namecol[15]], f:d[namecol[15]]+" %"},
					 {v:d[namecol[16]], f:d[namecol[16]]+" %"},
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
					if(Choix3==="reset"){}
					else{			
					view.setRows(data.getFilteredRows([{
						column: 4,
						value: Choix3
					}]))}
					return view;
					break;
				case "P":
					view.setColumns([i, i2]);
					return view;
					break;		
				case "BU":
					view.setColumns([i, i2, i3, i4, i5]);
					if(Choix3==="reset"){}
					else{			
					view.setRows(data.getFilteredRows([{
						column: 4,
						value: Choix3
					}]))}
					return view;
					break;
			}
		}

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
                            'margin-top': 5,'display':'block'
                        })
                    }
                    drawTable(2);
                    drawTable(3);
                    document.getElementById("NOM").innerHTML = data.getFormattedValue(item.row, 17);
                    document.getElementById("CODE").innerHTML = data.getFormattedValue(item.row, 0);
                    CPays = data.getFormattedValue(item.row, 0);
                    label=""
                    if(Choix.slice(0,1)==='E'){label ="Energie propre"}else{label = Choix.slice(0,-7)}
                    document.getElementById("C2011").innerHTML = label + " 2011: " + data.getFormattedValue(item.row, data.getColumnIndex(tmp1));
                    document.getElementById("C2012").innerHTML = label + " 2012: " +data.getFormattedValue(item.row, data.getColumnIndex(tmp2));
                    document.getElementById("C2013").innerHTML = label + " 2013: " +data.getFormattedValue(item.row, data.getColumnIndex(tmp3));
                    if (data.getFormattedValue(item.row, 0) === "UK") {flag = "GB"}else if (data.getFormattedValue(item.row, 0) === "EL") {flag = "GR"} else {flag = data.getFormattedValue(item.row, 0)}
                    document.getElementById("flagg").innerHTML = "<img id='flag' src='http://www.geognos.com/api/en/countries/flag/" + flag + ".png'/>"
                }
            })}
// Fonction pour la création de titre ou légende dynamique pour les graphiques
	function ChartText(Nb){
	Test = Choix
	Text = ""
		switch (Test.slice(0,1))
			{
				case "D": //DECHET
					if(Nb === 1){return Text ="Part des déchets ménagers recyclés en moyenne par groupe européen"}
					else if (Nb === 2) {return Text ="Part des déchets ménagers recyclés par pays"}
					else if(Nb ===3){return Text ="Taux des déchets ménagers recyclés en fonction du PIB et de la population par pays"}
					else{return Text="Part des déchets ménagers recyclés(%)"}        
					break;
				case "E": //ENERGIE PROPRE
					if(Nb === 1){return Text ="Part de la production moyenne d'énergie propre par groupe européen"}
					else if (Nb === 2) {return Text="Part des énergies propres produites par pays"}
					else if(Nb ===3){return Text ="Taux des énergies propres produites en fonction du PIB et de la population par pays"}
					else{return Text="Part des énergies propres(%)"}
					break;
				case "T": // TAXE
					 if(Nb === 1){return Text ="Montant des taxes liées à l'environnement en moyenne par groupe européen"}
					else if (Nb === 2) {return Text ="Montant des taxes liées à l'environnement perçues par pays"}
					else if(Nb ===3){return Text ="Montant des taxes liées à l'environnement en fonction du PIB et de la population par pays"}
					else{return Text= "Revenus perçus (en millions d'euros)"}
					break;         
			}
		}
// Fonction pour la gestion des couleurs des graphiques 
	function ChartColor(Nb,t,g){
	Test = Choix
	Color = ""
		switch(Choix3){
			case 'reset':
					switch (Test.slice(0,1))
						{	case "D": 
								if(Nb === 1){if(g==false){return Color = '#800026'}else{return Color ='#808080'}}
								else if (Nb === 2) {return Color ='#FD8D3C'}
								else{return Color='#FED976'}
								break;     
							case "E":
								if(t===true){if(Nb === 1){ return  Color="#78c679"} else if (Nb === 2) {return Color ="#d9f0a3" }else{return Color="#005a32"}}
								else{if(Nb === 1){if(g==false){return Color = '#005a32'}else{return Color ='#808080'}}
								else if (Nb === 2) {return Color ="#78c679"}
								else{return Color="#d9f0a3"}}
								break;
							case "T":
								if(Nb === 1){if(g==false){return Color = '#0c2c84'}else{return Color ='#808080'}}
								else if (Nb === 2) {return Color="#41b6c4"}
								else{return Color="#c7e9b4"}
								break;
						}
						break;		
			case 'GRP6':
					switch (Test.slice(0,1))
						{	case "D": return Color ='#800026';break;      
							case "E": return  Color="#005a32";break;
							case "T": return Color ="#0c2c84";break;
						}
					break;  
			case 'GRP15':
					switch (Test.slice(0,1))
						{	case "D": return Color = '#FD8D3C'; break;
							case "E": return  Color="#78c679"; break;
							case "T": return Color ="41b6c4";break
						}
					break; 
			case 'GRP28':
					switch (Test.slice(0,1))
						{	case "D":return Color = '#FED976'; break;   
							case "E": return  Color="#d9f0a3"; break;
							case "T":return Color ="c7e9b4";break
						}
					break; 
		}   
	}
// Fonction pour la gestion des couleurs du PieChart
	function ChartColorPie(Nb){
	Test = Choix
	Color = ""
		 switch (Test.slice(0,1))
		{
			case "D": 
				if(Nb === 1){return Color = '#800026'}
				else if (Nb === 2) {return Color ='#FD8D3C'}
				else{return Color='#FED976'}
				break;
				
			case "E":
				if(Nb === 1){return  Color="#005a32"}
				else if (Nb === 2) {return Color ="#78c679"}
				else{return Color="#d9f0a3"   }   
				break;
				
			case "T":
				if(Nb === 1){return Color ="#0c2c84"}
				else if (Nb === 2) {return Color="#41b6c4"}
				else{return Color="#c7e9b4"}
				break;
		}
	}
	 