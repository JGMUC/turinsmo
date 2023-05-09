var emailInput = document.getElementById('email');
var pwdInput = document.getElementById('pwd');
var loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('formlogin');
const modal = document.getElementById('loginModal');
const errorMsg = document.querySelector('#error-msg');

emailInput.addEventListener('input', handleInput);
pwdInput.addEventListener('input', handleInput);

function handleInput() {
    if (emailInput.value !== "" && pwdInput.value !== "") {
        loginBtn.disabled = false;
    } else {
        loginBtn.disabled = true;
    }
}

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const credentials = {
        username: emailInput.value,
        password: pwdInput.value
    };

    fetch('http://localhost:8080/api/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => response)
        .then(data => {
            // Si las credenciales son correctas, data contendrá un JWT
            if (data.status==200){
                localStorage.setItem('jwtToken', data.text);
                window.parent.postMessage({type: "loginSuccess"}, "*");     
            }else{
                errorMsg.textContent = 'Credenciales inválidas. Por favor, inténtelo de nuevo.';
            }
            
        })
        .catch(error => {
            // Si las credenciales son incorrectas o si ocurre un error en el servidor, el catch capturará el error
            console.error(error);
        });
});

