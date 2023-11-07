function getConfigUrl() {
  if (config.url.endsWith('/')) {
    return config.url;
  }
  else {
    return config.url + '/';
  }
}

function getVersion() {
  return '1.4.4';
}

function getLanguage() {
  return config.language;
}
