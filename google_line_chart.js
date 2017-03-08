

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
    var data = response.getDataTable();

    data.setColumnProperty(2, "role", "annotation");
    data.setColumnProperty(3, "role", "annotationText");
    // data.addColumn('date', 'Date');
    // data.addColumn('number', 'Score');
    // // A column for custom tooltip content
    // data.addColumn({type: 'string', role: 'tooltip'});

    //data.setColumn('string', 'Year');


    // var csv = google.visualization.dataTableToCsv(data);
    // console.log(csv);

// GENERATE DATA PROGRAMMATICALLY
//        var data = new google.visualization.DataTable();
//        data.addColumn('date', 'Date');
//        data.addColumn('number', 'Value');
//
//        // add 100 rows of pseudo-random-walk data
//        for (var i = 0, val = 50; i < 100; i++) {
//            val += ~~(Math.random() * 5) * Math.pow(-1, ~~(Math.random() * 2));
//            if (val < 0) {
//                val += 5;
//            }
//            if (val > 100) {
//                val -= 5;
//            }
//            data.addRow([new Date(2014, 0, i + 1), val]);
//        }

    var chart = new google.visualization.ChartWrapper({
        chartType: 'LineChart',
        containerId: 'chart_div',
        options: {
            height: 400,
            // omit width, since we set this in CSS
            chartArea: {
                width: '75%' // this should be the same as the ChartRangeFilter
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
                    chartArea: {
                        width: '75%' // this should be the same as the ChartRangeFilter
                    }
                }
            }
        }
    });

    var dashboard = new google.visualization.Dashboard(document.querySelector('#dashboard_div'));
    dashboard.bind([control], [chart]);
    dashboard.draw(data);

    function zoomLastDay () {
        var range = data.getColumnRange(0);
        control.setState({
            range: {
                start: new Date(range.max.getFullYear(), range.max.getMonth(), range.max.getDate() - 1),
                end: range.max
            }
        });
        control.draw();
    }
    function zoomLastWeek () {
        var range = data.getColumnRange(0);
        control.setState({
            range: {
                start: new Date(range.max.getFullYear(), range.max.getMonth(), range.max.getDate() - 7),
                end: range.max
            }
        });
        control.draw();
    }
    function zoomLastMonth () {
        // zoom here sets the month back 1, which can have odd effects when the last month has more days than the previous month
        // eg: if the last day is March 31, then zooming last month will give a range of March 3 - March 31, as this sets the start date to February 31, which doesn't exist
        // you can tweak this to make it function differently if you want
        var range = data.getColumnRange(0);
        control.setState({
            range: {
                start: new Date(range.max.getFullYear(), range.max.getMonth() - 1, range.max.getDate()),
                end: range.max
            }
        });
        control.draw();
    }

    var runOnce = google.visualization.events.addListener(dashboard, 'ready', function () {
        google.visualization.events.removeListener(runOnce);

        if (document.addEventListener) {
            document.querySelector('#lastDay').addEventListener('click', zoomLastDay);
            document.querySelector('#lastWeek').addEventListener('click', zoomLastWeek);
            document.querySelector('#lastMonth').addEventListener('click', zoomLastMonth);
        }
        else if (document.attachEvent) {
            document.querySelector('#lastDay').attachEvent('onclick', zoomLastDay);
            document.querySelector('#lastWeek').attachEvent('onclick', zoomLastWeek);
            document.querySelector('#lastMonth').attachEvent('onclick', zoomLastMonth);
        }
        else {
            document.querySelector('#lastDay').onclick = zoomLastDay;
            document.querySelector('#lastWeek').onclick = zoomLastWeek;
            document.querySelector('#lastMonth').onclick = zoomLastMonth;
        }
    });
}
