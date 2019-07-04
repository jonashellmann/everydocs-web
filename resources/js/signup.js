checkMobileDevice();
checkCookieToken();

var button = document.getElementById('signup-button');
button.addEventListener('click', signup);

function showError() {

}

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
	showError(emailDiv, 'Please enter your email.');
	return;
  }
  
  if (!/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email)) {
	showError(emailDiv, 'Please enter a valid email.');
	return;
  }
  
  if (name === '') {
	showError(nameDiv, 'Please enter your name.');
	return;
  }
	
  if (password === '') {
    showError(passwordDiv, 'Please enter your password.');
    return;
  }
  
  if (passwordConfirmation === '') {
    showError(passwordConfirmationDiv, 'Please confirm your password.');
    return;
  }
  
  if (password !== passwordConfirmation) {
    showError(passwordConfirmationDiv, 'You entered different passwords.');
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
      if (response['create'] === 'success') {
        writeTokenToCookie(response["auth_token"]);
        changePage('/');
      } else {
        showError(response['message']);
      }
  })
  .catch(error => console.error(error));

}
