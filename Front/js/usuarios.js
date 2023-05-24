function fillTable(data) {
    var tableBody = document.querySelector('#myTable tbody');
    data.forEach(function (rowData) {
        var row = document.createElement('tr');
        Object.keys(rowData).forEach(function (key) {
            var cell = document.createElement('td');
            cell.appendChild(document.createTextNode(rowData[key]));
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}

fetch('localhost:8080/api/usuarios')
    .then(response => response.json())
    .then(data => fillTable(data));