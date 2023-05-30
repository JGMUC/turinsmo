
window.addEventListener("message", function(event) {
    if (event.data.type === "loginSuccess") {
      const loginModal = document.getElementById("loginModal");
      const bootstrapModal = bootstrap.Modal.getInstance(loginModal);
      document.getElementById("cerrarSesionBtn").style.display = "block";
      document.getElementById("iniciarsesion").style.display = "none";
      bootstrapModal.hide();
    }
    if (event.data.type === "registroSuccess") {
      const registroModal = document.getElementById("registroModal");
      const bootstrapModal = bootstrap.Modal.getInstance(registroModal);
      bootstrapModal.hide();
    }
});

const logoutButton = document.getElementById("cerrarSesionBtn");

logoutButton.addEventListener("click", function() {
  localStorage.removeItem("jwtToken");
  document.getElementById("cerrarSesionBtn").style.display = "none";
  document.getElementById("iniciarsesion").style.display = "block";
});

fetch('http://localhost:8080/api/municipiospublic')
.then(response => response.json())
.then(data => {
  const galleryContainer = document.getElementById('gallery');
  let currentIndex = 0; 
  const showCurrentMunicipio = () => {
    galleryContainer.innerHTML = '';

    const municipioElement = document.createElement('div');
    municipioElement.classList.add('municipio');

    const municipio = data[currentIndex];

    const nombreElement = document.createElement('h3');
    nombreElement.textContent = municipio.nombre;

    const fotoElement = document.createElement('img');
    fotoElement.src = "./img/" +municipio.imagen;
    fotoElement.alt = municipio.nombre;

    const descripcionElement = document.createElement('p');
    descripcionElement.textContent = municipio.descripcion;

    municipioElement.appendChild(nombreElement);
    municipioElement.appendChild(fotoElement);
    municipioElement.appendChild(descripcionElement);

    galleryContainer.appendChild(municipioElement);
  };

  // Función para pasar al siguiente municipio
  const nextMunicipio = () => {
    currentIndex = (currentIndex + 1) % data.length;
    showCurrentMunicipio();
  };

  // Mostrar el primer municipio
  showCurrentMunicipio();

  // Cambiar automáticamente de municipio cada 5 segundos
  setInterval(nextMunicipio, 5000);
})
.catch(error => {
  console.error('Error al obtener los datos de los municipios:', error);
});