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
        .then(response => {
            if (response.ok) {
              return response.text();
            } else {
                throw new Error('Network response was not ok');
                
            }
          })
        .then(data => {
            // Si las credenciales son correctas, data contendrá un JWT
                console.log(data)
                localStorage.setItem('jwtToken', data);
                window.parent.postMessage({type: "loginSuccess"}, "*");       
        })
        .catch(error => {
            errorMsg.textContent = 'Credenciales inválidas ingréselas nuevamente y vuelva a intentar';
            console.error(error);
        });
});

