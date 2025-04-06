checkServer();

function checkServer() {
  fetch(config.url + '/', {
      method: 'GET'
  })
  .then(response => {
    if (response.status !== 200) {
      window.location.href = '/error/';
    }
  });
}

function el(id) {
  return document.getElementById(id);
}

function checkCookieToken() {
  var token = readTokenFromCookie();
  if (token == null || token == 'undefined') {
    return;
  }
  
  authorize(token)
  .then(bool => {
    if(bool) {
      changePage('/');
    }
  })
  .catch(error => console.error(error));
}

function checkCookieTokenOnStart() {
  var token = readTokenFromCookie();
  if (token == null || token == 'undefined'){
    changePage('/login/');
  }

  authorize(token)
  .then(bool => {
    if(!bool) {
      changePage("/login/");
    }
  })
  .catch(error => console.error(error));
}

function writeTokenToCookie(token) {
  var date = new Date();
  date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
  document.cookie = "token=" + token + "; SameSite=Lax; expires=" + date.toUTCString() + "; path=/";
}

async function authorize(token) {
  var response = await 
    fetch(config.url + 'documents/', {
      method: 'GET',
      headers: {
        'Authorization': token,
      }
    })
    .then(response => response.json())
    .then(json => !json.hasOwnProperty('message'));
  return response;
}

function readTokenFromCookie() {
  var nameEq = "token=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ')
      c = c.substring(1, c.length);
    if (c.indexOf(nameEq) == 0)
      return c.substring(nameEq.length, c.length);
  }
  return null;
}

function deleteTokenCookie() {
  document.cookie = "token=; Max-Age=-99999999";
}

function changePage(url) {
  document.location.href = url;
}

function showError1(element, message) {
  element.classList.add('input-error');
  showError(message);
}

function showError(message) {
  var messages = document.getElementById('messages');
  removeChilds(messages);
  messages.style.display = 'block';

  var div = document.createElement('div');
  div.classList.add('message-element');
  div.innerHTML = message;
  messages.appendChild(div);
}

function showSuccess(message) {
  var messages = document.getElementById('messages');
  removeChilds(messages);
  messages.style.display = 'block';
  messages.style.backgroundColor = '#00801e';

  var div = document.createElement('div');
  div.classList.add('message-element');
  div.innerHTML = message;
  messages.appendChild(div);
}

function removeChilds(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function logout() {
  var x = confirm('Do you really want to log out?');
  if(x === true) {
    deleteTokenCookie();
    changePage('/login/');
  }
}
