const upperCaseRegex = /[A-Z]/;
const lowerCaseRegex = /[a-z]/;
const numberRegex = /\d/;
const symbolRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
const minLength = 8;

var fname=document.getElementById('fname');
var state_id=document.getElementById('state_id');
var documento=document.getElementById('documento');
var fechanacimiento=document.getElementById('fechanacimiento');
var email=document.getElementById('email');
var telefono=document.getElementById('telefono');
var contraseña=document.getElementById('contraseña');
var confirmar=document.getElementById('confirmar');
var message=document.getElementById('message');
var registroBtn=document.getElementById('registroBtn');

fname.addEventListener('input', handleInput);
state_id.addEventListener('input', handleInput);
documento.addEventListener('input', handleInput);
fechanacimiento.addEventListener('input', handleInput);
email.addEventListener('input', handleInput);
telefono.addEventListener('input', handleInput);
contraseña.addEventListener('input', handleInput);
confirmar.addEventListener('input', handleInput);

const errorContainer = document.getElementById('error-pass');

function handleInput() {  
    if (fname.value !== "" && state_id.value !== "" && documento.value!=="" && fechanacimiento.value !== "" && email.value  !== "" && telefono.value !== "" && contraseña.value !=="" && confirmar.value !=="" ) {
        registroBtn.disabled = false;
    } else {
        registroBtn.disabled = true;
    }
    if (errorContainer.textContent == 'Las contraseñas no son iguales'){
        errorContainer.textContent=""
    }
}
contraseña.addEventListener('keyup', () => {
    const password = contraseña.value;
    let errorMessage = '';

    if (!upperCaseRegex.test(password)) {
        errorMessage += 'Debe tener al menos una letra mayúscula. \n';
    }

    if (!lowerCaseRegex.test(password)) {
        errorMessage += 'Debe tener al menos una letra minúscula.\n ';
    }

    if (!numberRegex.test(password)) {
        errorMessage += 'Debe tener al menos un número.\n ';
    }

    if (!symbolRegex.test(password)) {
        errorMessage += 'Debe tener al menos un símbolo.\n ';
    }

    if (password.length < minLength) {
        errorMessage += `Debe tener al menos ${minLength} caracteres.\n `;
    }
    if (errorMessage){
        errorMessage= 'Fortaleza de la contraseña\n' +errorMessage
    }
    
    errorContainer.innerHTML = errorMessage.replace(/\n/g, '<br>');
});



const form = document.querySelector('form');
const url = 'http://localhost:8080/api/usuario';

form.addEventListener('submit', (event) => {
  event.preventDefault(); // evitar la acción predeterminada del formulario
    if (contraseña.value!==confirmar.value){
        errorContainer.textContent = 'Las contraseñas no son iguales'
        return
    }
  const dataUsuario = {
    username: email.value,
    password: contraseña.value,
    nombres:fname.value,
    tipo_ident:state_id.value,
    documento:documento.value,
    fecha_nacimiento:fechanacimiento.value,
    telefono:telefono.value,
    intereses:message.value
};

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataUsuario)
  };

  fetch(url, options)
    .then(response => {
        console.log(response)
      if (response.status==409){
        errorContainer.textContent="Ya existe un usario registrado con este correo"
      }  
      if (!response.ok) {
        throw new Error('Error al enviar datos');
      }
      return response.json();
    })
    .then(data => {
        window.parent.postMessage({type: "registroSuccess"}, "*");    
        console.log('Datos enviados correctamente:', data);

    })
    .catch(error => {
      console.error('Error al enviar datos:', error);
    });
});