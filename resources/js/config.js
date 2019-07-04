var config = {
  url: 'https://your-domain.com/',
}

function getConfigUrl() {
  if (config.url.endsWith('/')) {
    return config.url;
  }
  else {
    return config.url + '/';
  }
}
