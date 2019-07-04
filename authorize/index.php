<?php

include '../config.php';

// Check that token is present
$token = $_POST['token'];
if(!isset($token)) {
  echo '{"authorize": "false"}';
  exit;
}

// Try to request documents with given token
$url = $baseurl . 'documents/';
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array('Authorization:' . $token));
$response = curl_exec($curl);
curl_close($curl);

// Check response
if(strpos($response, 'message') !== false) {
  $authorization = "false";
} else {
  $authorization = "true";
}

// Print result
echo '{"authorize": "' . $authorization .'"}';

?>
