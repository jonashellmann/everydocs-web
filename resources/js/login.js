checkMobileDevice();
checkCookieToken();

var form = document.getElementsByTagName('form')[0];
form.addEventListener('submit', login);

function login(event) {
  event.preventDefault();
  var url = getConfigUrl() + 'auth/login/';
  
  var emailDiv = document.getElementById('email');
  var passwordDiv = document.getElementById('password');
  
  var email = emailDiv.value;
  var password = passwordDiv.value;
  
  if (email === '') {
    showError1(emailDiv, 'Please enter an email address.');
    return;
  }
  
  if (password === '') {
    showError1(passwordDiv, 'Please enter your password.');
    return;
  }

  var data = "email=" + email + "&password=" + password;

  fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then(res => res.json())
  .then(response => {
    if(response.hasOwnProperty('auth_token')) {
      writeTokenToCookie(response["auth_token"]);
      changePage('/');
    } else {
      showError1(passwordDiv, 'You entered the wrong password!');
    }
  })
  .catch(error => console.error(error));  
}
