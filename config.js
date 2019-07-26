var config = {
  url: 'https://dms.jonas-hellmann.de/api/',
}

function getConfigUrl() {
  if (config.url.endsWith('/')) {
    return config.url;
  }
  else {
    return config.url + '/';
  }
}
