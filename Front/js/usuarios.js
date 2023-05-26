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
fetch('http://localhost:8080/api/usuarios', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => fillTable(data));
