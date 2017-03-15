google.charts.load('45', {packages: ['controls']});
google.charts.setOnLoadCallback(queryData);

function queryData() {
    var query = new google.visualization.Query(
        "https://docs.google.com/spreadsheets/d/1QG0spehL2ofBCEtkZLcpZwkIczHHd0w9vaifp3lzHa8/gviz/tq?gid=0&headers=1&range=A:D"
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
    data.addColumn('date', 'Date');
    data.addColumn('number', 'Score');
    data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});
    //data.addColumn({'type': 'string', 'role': 'tooltip', 'p': {'html': true}});

    var colCount = responseData.getNumberOfColumns();
    var rowCount = responseData.getNumberOfRows();

    var ticks = [];
    for (var j = 0; j < rowCount; j++) {

        var date = responseData.getValue(j, 0);
        var score = responseData.getValue(j, 1);
        //var tooltip =  date.toLocaleDateString() + " - " + responseData.getValue(j, 2);

        var tooltip = "<div class='point-hover'><b>" + responseData.getValue(j, 2)
            + "</b><br/><font size='smaller'><i>" + date.toLocaleDateString() + "</i> (click for details)</font></div>";

        // var tooltip = "<div class='point-hover'><i>" + date.toLocaleDateString() +"</i><br/><b>" + responseData.getValue(j, 2)
        //     + "</b><br/>" + responseData.getValue(j, 3) + "</div>";

        // var tickValue = responseData.getValue(j, 2);
        // var tickMark = {v: date, f: tickValue};
        // ticks[j] = tickMark;

        data.addRow([date, score, tooltip]);
    }

    // var csv = google.visualization.dataTableToCsv(data);
    // console.log(csv);


    var chart = new google.visualization.ChartWrapper({
        chartType: 'LineChart',
        containerId: 'chart_div',
        options: {
            interpolateNulls: true,
            backgroundColor: '#FEFEFE',
            height: 400,
            // omit width, since we set this in CSS
            chartArea: {
                width: '100%',
                top: 10,
                left: 100

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
                titleTextStyle: {
                    color: '#000000',
                    fontSize: '18',
                    italic: false
                },
                slantedText: true,
                maxAlternation: 3
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
                titleTextStyle: {
                    color: '#000000',
                    fontSize: '18',
                    italic: false
                }
            },
            legend: {
                position: "right"
            },
            min: -10,
            max: 10,
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

        }
    });

    var control = new google.visualization.ControlWrapper({
        controlType: 'ChartRangeFilter',
        containerId: 'control_div',
        options: {
            filterColumnIndex: 0,
            ui: {
                chartOptions: {
                    height: 50,
                    // omit width, since we set this in CSS
                    // chartArea: {
                    //     width: '100%' // this should be the same as the ChartRangeFilter
                    // },
                    annotations: {
                        textStyle: {
                            color: 'red',
                            opacity: 0.0
                        }
                    }
                }
            }
        }
    });

    var dashboard = new google.visualization.Dashboard(document.querySelector('#dashboard_div'));
    dashboard.bind([control], [chart]);
    dashboard.draw(data);

    function zoomLastMonth() {
        var range = data.getColumnRange(0);
        control.setState({
            range: {
                start: new Date(range.max.getFullYear(), range.max.getMonth()-1, range.max.getDate()),
                end: range.max
            }
        });
        control.draw();
    }

    function zoomLastYear() {
        // zoom here sets the month back 1, which can have odd effects when the last month has more days than the previous month
        // eg: if the last day is March 31, then zooming last month will give a range of March 3 - March 31, as this sets the start date to February 31, which doesn't exist
        // you can tweak this to make it function differently if you want
        var range = data.getColumnRange(0);
        control.setState({
            range: {
                start: new Date(range.max.getFullYear() - 1, range.max.getMonth(), range.max.getDate()),
                end: range.max
            }
        });
        control.draw();
    }

    var runOnce = google.visualization.events.addListener(dashboard, 'ready', function () {
        google.visualization.events.removeListener(runOnce);

        if (document.addEventListener) {
            document.querySelector('#lastMonth').addEventListener('click', zoomLastMonth);
            document.querySelector('#lastYear').addEventListener('click', zoomLastYear);
        }
        else if (document.attachEvent) {
            document.querySelector('#lastMonth').attachEvent('onclick', zoomLastMonth);
            document.querySelector('#lastYear').attachEvent('onclick', zoomLastYear);
        }
        else {
            document.querySelector('#lastMonth').onclick = zoomLastMonth;
            document.querySelector('#lastYear').onclick = zoomLastYear;
        }
    });
}
