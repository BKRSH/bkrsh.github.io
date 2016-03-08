google.charts.load('current', {
    'packages': ['table', 'corechart']
});
google.charts.setOnLoadCallback(drawTable);

var table={}
var data={}
var chart={}


function drawTable(a) {

    switch (a) {
        case 1:
            $('#partie1').css('display', 'block');
            createData(Data_Europa, false, 2);
            table = new google.visualization.Table(document.getElementById('table_div'));
            table.draw( /*createView(data,b,c)*/ data, {
                showRowNumber: true,
                width: '100%',
                height: '10%'
            });


             chart = new google.visualization.BarChart(document.getElementById('chart_div'));
            chart.draw(createView(data, 11, 2, 3), {
                title: 'Population of Largest U.S. Cities',
                fontSize: 8,
                height: 500,
                colors: ['#b0120a', '#ffab91'],
                hAxis: {
                    title: 'Total Population',

                },
                vAxis: {
                    title: 'City'
                }
            });


            var grouped_data = google.visualization.data.group(
                createView(data, 4, 7), [0], [{
                    'column': 1,
                    'aggregation': google.visualization.data.avg,
                    'type': 'number'
                }]);
            console.log(grouped_data)

            $('#table2_div').css('display', 'none');

            var options = {
                legend: 'none',
                pieSliceText: 'label',
                title: 'Swiss Language Use (100 degree rotation)',
                pieStartAngle: 100,
            };

            var chart2 = new google.visualization.PieChart(document.getElementById('piechart'));
            chart2.draw(grouped_data, options);


            var options3 = {
                hAxis: {
                    logScale: false
                    
                },
                vAxis: {
                    logScale: false
                },
                bubble: {
                    textStyle: {
                        fontSize: 11,
                        auraColor:'none'
                    }   
                },
                animation:{
                    duration:1000,
                    easing: 'out',

                },
                vAxis: {minValue:0, maxValue:1000}

            }


            var chart4 = new google.visualization.BubbleChart(document.getElementById('chart_div3'));
            chart4.draw(createViewfoBubbleChart(data, 0, 9, 6, 4, 2), options3);


            //      google.visualization.events.addListener(table, 'select', selectHandler);


            google.visualization.events.addListener(table, 'select', selectHandler)
             google.visualization.events.addListener(chart, 'select', selectHandler1)

            // hide("#btn1","#partie1")*/

           
            
        /*    function selectHandler(e) {               
}*/

            break;
        case 2:
            $('#table2_div').css('display', 'block');
            data = createData(Employee, false, 3);
            var table2 = new google.visualization.Table(document.getElementById('table2_div'));
            table2.draw(data, {
                showRowNumber: true,
                width: '40%',
                height: '10%'
            });
            //	hide('#btn2','#table2_div')
            $('#partie1').css('display', 'none');

            break;
    }
}

function hide(a, b) {
    $(document).ready(function() {
        $(a).click(function() {
            $(b).toggle();
        });
    });
}




function createData(array1, sort, col) {
    namecol = Object.keys(array1[0])
    data = []
    data = new google.visualization.DataTable();
    numbercol = 0
    for (i = 0; i < namecol.length; i++) {
        data.addColumn(typeof(array1[0][namecol[i]]), namecol[i]);
    }

    array1.forEach(function(d) {
        data.addRows([
            [d[namecol[0]], {
                    v: d[namecol[1]]
                }, d[namecol[2]], d[namecol[3]], d[namecol[4]],
                d[namecol[5]],
                d[namecol[6]],
                d[namecol[7]],
                d[namecol[8]],
                d[namecol[9]],
                d[namecol[10]],
                d[namecol[11]]
            ]
        ]);
    });
    data.sort([{
        column: col,
        desc: sort
    }]);


    return data
}

function createView(d, i, i2, i3) {
    var view = new google.visualization.DataView(data);
    view.setColumns([i, i2])
        //    view.setRows([3,9]);
    return view
}

function createViewfoBubbleChart(d, i, i2, i3, i4, i5) {
    var view = new google.visualization.DataView(data);
    view.setColumns([i, i2, i3, i4, i5]);
    return view
}
 function selectHandler() {
                  var selection = table.getSelection();
                for (var i = 0; i < selection.length; i++) {
                    var item = selection[i];
                    if (item.row != null) {
                        var str = data.getFormattedValue(item.row, 0);
                    }
                }
                Zoom.forEach(function(d) {
                    if (str === d.cp) {
                        InterGoogleLeaflet(d.coord)


                    }
                });
}

function selectHandler1() {
                  var selection = chart.getSelection();
                for (var i = 0; i < selection.length; i++) {
                    var item = selection[i];
                    if (item.row != null) {
                        var str = data.getFormattedValue(item.row, 0);
                    }
                }
                Zoom.forEach(function(d) {
                    if (str === d.cp) {
                        InterGoogleLeaflet(d.coord)


                    }
                });
}