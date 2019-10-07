var config = {
  url: 'https://everydocs.test.com/api/',
}

function getConfigUrl() {
  if (config.url.endsWith('/')) {
    return config.url;
  }
  else {
    return config.url + '/';
  }
}
