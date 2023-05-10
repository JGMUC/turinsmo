
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