google.charts.load('45', {packages: ['corechart']});
google.charts.setOnLoadCallback(queryData);

function queryData() {
    var query = new google.visualization.Query(
        "https://docs.google.com/spreadsheets/d/1QG0spehL2ofBCEtkZLcpZwkIczHHd0w9vaifp3lzHa8/gviz/tq?gid=1511124293&headers=2&range=A:K"
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
    // data.addColumn('date', 'Date');
    data.addColumn('string', 'title');

    var colCount = responseData.getNumberOfColumns();

    for (var i = 2; i< colCount; i++) {
        //NOTE: tooltips in stacked charts follow the column of the data
        data.addColumn('number', responseData.getColumnLabel(i).split("$")[1]);
        data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
    }

    var pvaData = new google.visualization.DataTable();
    pvaData.addColumn('string', 'Date');
    pvaData.addColumn('number', 'PVA Score');
    pvaData.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

    var rowCount = responseData.getNumberOfRows();

    var ticks = [];
    for (var j = 0; j < rowCount; j++) {

        var date = responseData.getValue(j, 0);
        var title = responseData.getValue(j, 1);

        //var speech = responseData.getValue(j, 4); // + " - " + date.toLocaleString();

        //var tooltip =  date.toLocaleDateString() + " - " + responseData.getValue(j, 2);

        // var tooltip = "<div class='point-hover'><b>" + responseData.getValue(j, 2)
        //     + "</b><br/><font size='smaller'><i>" + date.toLocaleDateString() + "</i> (click for details)</font></div>";

        // var tooltip = "<div class='point-hover'><i>" + date.toLocaleDateString() +"</i><br/><b>" + responseData.getValue(j, 2)
        //     + "</b><br/>" + responseData.getValue(j, 3) + "</div>";

        // var tickValue = responseData.getValue(j, 2);
        // var tickMark = {v: date, f: tickValue};
        // ticks[j] = tickMark;

        //data.addRow([date, title, two, three, four]);

        var pvaRow = [moment(date).format("MMM D, YYYY")];

        var row = [moment(date).format("MMM D, YYYY")];
        var total = 0;
        for (var i = 1, k = 2; k < colCount; i += 2, k++) {
            var value = responseData.getValue(j,k);
            row[i] = value;
            total += value;
            row[i+1] = "<div class='point-hover'> <i>" + moment(date).format("MMM D, YYYY") + "<br/>" + title + "</i><br/>"
                + "<b>" + data.getColumnLabel(i) + ": " + value + "</b><br/>"
            + "" + responseData.getColumnLabel(k).split("$")[0] + "</div>";

            pvaRow[1] = total;

            pvaRow[2] = "<div class='point-hover'> <i>" + responseData.getValue(j,1) + "</i><br/>"
                + "<b>PVA Score: "  + total + "</b></div>";
        }
        if (total > 0) {//simple check to weed out incomplete data
            data.addRow(row);
            pvaData.addRow(pvaRow);
        }

    }

    // var csv = google.visualization.dataTableToCsv(data);
    // console.log(csv);


    var options = {
        isStacked: 'true',
        backgroundColor: 'transparent',
        colors:['#C8CFC5', '#ffbb78','#9FB8C3', '#B95352', '#EFDD7B', "#e377c2", "#98df8a", "#ff9896", "#6D81F5"],
        height: 530,
        orientation: 'horizontal',
        bar: {
            groupWidth: '6'
        },
        legend: {
            position: 'top',
            maxLines: 3},
        // omit width, since we set this in CSS
        chartArea: {
            width: '93%',
            top: 100,
            left: 50
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
                fontSize: '11'
            },
            titleTextStyle: {
                color: '#000000',
                fontSize: '12',
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
            isHtml: true,
            ignoreBounds: false
        },
        vAxis: {
            gridlines: {
                color: '#d7d7d7', count: 9
            },
            textStyle: {
                fontSize: '10'
            },
            titleTextStyle: {
                color: '#000000',
                fontSize: '10',
                italic: false
            },
            maxTextLines: 2
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
        }

    };


    var pvaOptions = {
        backgroundColor: 'transparent',
        colors:['#C8CFC5', '#ffbb78','#9FB8C3', '#B95352', '#EFDD7B', "#e377c2", "#98df8a", "#ff9896", "#6D81F5"],
        height: 300,
        legend: {
            position: 'top',
            maxLines: 3},
        // omit width, since we set this in CSS
        chartArea: {
            width: '93%',
            top: 50,
            left: 50
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
                fontSize: '11'
            },
            titleTextStyle: {
                color: '#000000',
                fontSize: '12',
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
            isHtml: true,
            ignoreBounds: false
        },
        vAxis: {
            gridlines: {
                color: '#d7d7d7', count: 9
            },
            textStyle: {
                fontSize: '10'
            },
            titleTextStyle: {
                color: '#000000',
                fontSize: '10',
                italic: false
            },
            maxTextLines: 2
        },
        // explorer: {
        //     axis: 'horizontal',
        //     actions: ['dragToZoom', 'rightClickToReset'],
        //     keepInBounds: false // set to false to re-enable panning
        // },
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
        }

    };


    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    var chartPva = new google.visualization.LineChart(document.getElementById('chart2_div'));
    chartPva.draw(pvaData, pvaOptions);


}
