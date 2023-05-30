function fillTable(data) {
  var tableBody = document.querySelector('#myTable tbody');
  data.forEach(function (rowData) {
    var row = document.createElement('tr');
    Object.keys(rowData).forEach(function (key) {
      if (key != 'password') {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(rowData[key]));
        row.appendChild(cell);
      }
    });
    var actionsCell = document.createElement('td');

    var estado = rowData['estado'] == 'A' ? 'Activo' : 'Inactivo'
    var deleteLink = document.createElement('a');
    deleteLink.href = '#';
    deleteLink.className = 'btn btn-danger btn-sm';
    deleteLink.innerHTML = `<i class="bi bi-trash-fill"></i> ${estado}`;
    deleteLink.setAttribute('data-user-id', rowData.id);
    deleteLink.setAttribute('data-estado', rowData.estado);
    deleteLink.addEventListener('click', function (event) {
      event.preventDefault();
      var userId = event.target.getAttribute('data-user-id');
      var userEstado = event.target.getAttribute('data-estado');
      updateUserStatus(userId, userEstado);
    });
    actionsCell.appendChild(deleteLink);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}
function main() {
  fetch('http://localhost:8080/api/usuarios', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => {
      clearTable();
      fillTable(data);
    });
}

main();
function clearTable() {
  var tableBody = document.querySelector('#myTable tbody');
  tableBody.innerHTML = '';
}

function updateUserStatus(userId, estadoUser) {
  estadoUser=estadoUser=='I'?'A':'I'
  var url = 'http://localhost:8080/api/usuarios/' + userId;
  fetch(url, {
    method: 'PUT',

    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ estado: estadoUser }) // Actualiza el valor 'bloqueado' según tu necesidad
  })
    .then(response => {
      if (response.ok) {
        console.log('Estado del usuario actualizado');
        main();
      } else {
        console.error('Error al actualizar el estado del usuario');
      }
    })
    .catch(error => {
      console.error('Error en la solicitud fetch:', error);
    });
}