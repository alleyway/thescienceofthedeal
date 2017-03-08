google.charts.load('current', {'packages':['annotationchart']});
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

    var chart = new google.visualization.AnnotationChart(document.getElementById('chart_div'));

    var options = {
        displayAnnotations: true,
        allowHtml: true,
        displayLegendValues: true,
        max: 10,
        min: -10,
        thickness: 2,
        displayAnnotationsFilter: true,
        annotationsWidth: 30
    };

    chart.draw(data, options);
}