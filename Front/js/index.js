
window.addEventListener("message", function(event) {
    if (event.data.type === "loginSuccess") {
      const loginModal = document.getElementById("loginModal");
      const bootstrapModal = bootstrap.Modal.getInstance(loginModal);
      bootstrapModal.hide();
    }
});
