google.charts.load('45', {packages: ['corechart']});
google.charts.setOnLoadCallback(queryData);

function queryData() {
    var query = new google.visualization.Query(
        "https://docs.google.com/spreadsheets/d/1QG0spehL2ofBCEtkZLcpZwkIczHHd0w9vaifp3lzHa8/gviz/tq?gid=1511124293&headers=1&range=A:E"
    );

    query.send(handleQueryResponse);
}


function handleQueryResponse(response) {

    // GET DATA FROM GOOGLE SPREADSHEET

    if (response.isError()) {
        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
        return;
    }
    var responseData = response.getDataTable();

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Speech');
    data.addColumn('number', 'Hyperbole');
    data.addColumn('number', 'Distraction');
    data.addColumn('number', 'Ego-Fanning');
    //data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
    //data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

    var colCount = responseData.getNumberOfColumns();
    var rowCount = responseData.getNumberOfRows();

    var ticks = [];
    for (var j = 0; j < rowCount; j++) {

        var date = responseData.getValue(j, 0);
        var one = responseData.getValue(j, 1);
        var two = responseData.getValue(j, 2);
        var three = responseData.getValue(j, 3);

        var speech = responseData.getValue(j, 4) + " - " + date.toLocaleString();

        //var tooltip =  date.toLocaleDateString() + " - " + responseData.getValue(j, 2);

        var tooltip = "<div class='point-hover'><b>" + responseData.getValue(j, 2)
            + "</b><br/><font size='smaller'><i>" + date.toLocaleDateString() + "</i> (click for details)</font></div>";

        // var tooltip = "<div class='point-hover'><i>" + date.toLocaleDateString() +"</i><br/><b>" + responseData.getValue(j, 2)
        //     + "</b><br/>" + responseData.getValue(j, 3) + "</div>";

        // var tickValue = responseData.getValue(j, 2);
        // var tickMark = {v: date, f: tickValue};
        // ticks[j] = tickMark;

        data.addRow([speech, one, two, three]);
    }

    // var csv = google.visualization.dataTableToCsv(data);
    // console.log(csv);


    var options = {
        isStacked: true,
        backgroundColor: '#FEFEFE',
        colors:['#C8CFC5','#9FB8C3', '#B95352', '#EFDD7B'],
        height: 800,
        legend: {
            position: 'in',
            maxLines: 3},
        // omit width, since we set this in CSS
        chartArea: {
            width: '100%',
            top: 50,
            left: 200

        },
        dataOpacity: 0.8, // opacity of points
        crosshair: {
            trigger: 'selection',
            color: '#B95352'
        },
        pointSize: 4,
        hAxis: {
            //title: "Date of Speech",
            gridlines: {
                color: '#333', count: 10
            },
            textStyle: {
                fontSize: '14'
            },
            titleTextStyle: {
                color: '#000000',
                fontSize: '18',
                italic: false
            },
            slantedText: true,
            slantedTextAngle: "45",
            maxTextLines: 2,
            maxAlternation: 1
            // ,
            // ticks: ticks
        },
        tooltip: {
            trigger: 'hover',
            isHtml: false,
            ignoreBounds: false
        },
        vAxis: {
            gridlines: {
                color: '#d7d7d7', count: 9
            },
            titleTextStyle: {
                color: '#000000',
                fontSize: '18',
                italic: false
            }
        },
        explorer: {
            axis: 'horizontal',
            actions: ['dragToZoom', 'rightClickToReset'],
            keepInBounds: false // set to false to re-enable panning
        },
        annotations: {
            textStyle: {
                fontName: 'Arial',
                fontSize: 13,
                bold: false,
                italic: false,
                // The color of the text.
                color: '#333',
                // The color of the text outline.
                auraColor: '#fff',
                // The transparency of the text.
                opacity: 0.8
            }
            // ,
            // boxStyle: {
            //     // Color of the box outline.
            //     stroke: '#888',
            //     // Thickness of the box outline.
            //     strokeWidth: 1,
            //     // x-radius of the corner curvature.
            //     rx: 10,
            //     // y-radius of the corner curvature.
            //     ry: 10,
            //     // Attributes for linear gradient fill.
            //     gradient: {
            //         // Start color for gradient.
            //         color1: '#fbf6a7',
            //         // Finish color for gradient.
            //         color2: '#33b679',
            //         // Where on the boundary to start and
            //         // end the color1/color2 gradient,
            //         // relative to the upper left corner
            //         // of the boundary.
            //         x1: '0%', y1: '0%',
            //         x2: '100%', y2: '100%',
            //         // If true, the boundary for x1,
            //         // y1, x2, and y2 is the box. If
            //         // false, it's the entire chart.
            //         useObjectBoundingBoxUnits: true
            //     }
            // }
        }

    };


    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);


}
