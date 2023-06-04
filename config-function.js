function getConfigUrl() {
  if (config.url.endsWith('/')) {
    return config.url;
  }
  else {
    return config.url + '/';
  }
}

function getVersion() {
  return '1.4.2';
}

function getLanguage() {
  return config.language;
}
