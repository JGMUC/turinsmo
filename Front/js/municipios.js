window.addEventListener("message", function(event) {
  if (event.data.type === "municipioSuccess") {
    const municipioModal = document.getElementById("crearMunicipioModal");
    const bootstrapModal = bootstrap.Modal.getInstance(municipioModal);
    bootstrapModal.hide();
  }
  if (event.data.type === "registroSuccess") {
    const registroModal = document.getElementById("registroModal");
    const bootstrapModal = bootstrap.Modal.getInstance(registroModal);
    bootstrapModal.hide();
  }
});

function fillTable(data) {
  var tableBody = document.querySelector('#myTableMun tbody');
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
    var deleteLink = document.createElement('a');
    deleteLink.href = '#';
    deleteLink.className = 'btn btn-danger btn-sm';
    deleteLink.innerHTML = `<i class="bi bi-trash-fill"></i> Eliminar`;
    deleteLink.setAttribute('data-user-id', rowData.id);
    deleteLink.addEventListener('click', function (event) {
      event.preventDefault();
      var munId = event.target.getAttribute('data-user-id');
      deleteMunicipio(munId);
    });
    actionsCell.appendChild(deleteLink);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}
function main() {
  fetch('http://localhost:8080/api/municipiospublic', {
    method: 'GET',
    headers: {
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
  var tableBody = document.querySelector('#myTableMun tbody');
  tableBody.innerHTML = '';
}

function deleteMunicipio(munId) {
  var url = 'http://localhost:8080/api/municipios/' + munId;
  fetch(url, {
    method: 'DELETE',

    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        console.log('Municipio eliminado');
        main();
      } else {
        console.error('Error al actualizar el estado del usuario');
      }
    })
    .catch(error => {
      console.error('Error en la solicitud fetch:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
  const crearMunicipioForm = document.getElementById('crearMunicipioForm');
  
  crearMunicipioForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(crearMunicipioForm);
    const requestData = Object.fromEntries(formData.entries());
    const file =requestData.imagen
    requestData.imagen=file.name
    console.log(requestData)
    fetch('http://localhost:8080/api/municipios', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      crearMunicipioForm.reset() 
      main();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });
});
