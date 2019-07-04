checkMobileDevice();
checkCookieToken();

var button = document.getElementById('login-button');
button.addEventListener('click', login);

function login() {
	var url = config.url + 'auth/login/';
	
	var emailDiv = document.getElementById('email');
	var passwordDiv = document.getElementById('password');
	
	var email = emailDiv.value;
	var password = passwordDiv.value;
	
	if (email === '') {
		showError(emailDiv, 'Please enter an email address.');
		return;
	}
	
	if (password === '') {
		showError(emailDiv, 'Please enter your password.');
		return;
	}

  console.log(email + " " + password)
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
    console.log(response);
    writeTokenToCookie(response["auth_token"]);
    changePage('/');
  })
	.catch(error => console.error(error));	
}
