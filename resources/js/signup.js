checkMobileDevice();
checkCookieToken();

var button = document.getElementById('signup-button');
button.addEventListener('click', signup);

function signup() {
  var url = getConfigUrl() + 'signup/';

  var emailDiv = document.getElementById('email');
  var nameDiv = document.getElementById('name');
  var passwordDiv = document.getElementById('password');
  var passwordConfirmationDiv = document.getElementById('password-confirmation');
  
  var email = emailDiv.value;
  var name = nameDiv.value;
  var password = passwordDiv.value;
  var passwordConfirmation = passwordConfirmationDiv.value;

  if (email === '') {
    showError1(emailDiv, 'Please enter your email.');
    return;
  }
  
  if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email)) {
    showError1(emailDiv, 'Please enter a valid email.');
    return;
  }
  
  if (name === '') {
    showError1(nameDiv, 'Please enter your name.');
    return;
  }
  
  if (password === '') {
    showError1(passwordDiv, 'Please enter your password.');
    return;
  }
  
  if (passwordConfirmation === '') {
    showError1(passwordConfirmationDiv, 'Please confirm your password.');
    return;
  }
  
  if (password !== passwordConfirmation) {
    showError1(passwordConfirmationDiv, 'You entered different passwords.');
    return;
  }
  
  var data = "email=" + email + "&name=" + name + "&password=" + password + "&password_confirmation=" + passwordConfirmation;

  fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then(res => res.json())
  .then(response => {
    if (response.hasOwnProperty('auth_token')) {
      writeTokenToCookie(response["auth_token"]);
      changePage('/');
    } else {
      showError1(emailDiv, response['message']);
    }
  })
  .catch(error => console.error(error));
}
