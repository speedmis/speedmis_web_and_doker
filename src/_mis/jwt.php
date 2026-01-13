<?php


error_reporting(E_ALL);
ini_set("display_errors", 1);
require '../vendor/autoload.php';
use Firebase\JWT\JWT;
 
 
$secret_key = "speed@mis";
 
$data = array(
    'iat' => time(),
    'jti' => base64_encode("tokenID_example"),
    'iss' => 'v6b.speedmis.com',
    'exp' => time() + 60*60,
    'userid' => "gadmin"
);


$jwt = JWT::encode($data, $secret_key);
echo "encoded jwt: " . $jwt . "n";
 
$decoded = JWT::decode($jwt, $secret_key, array('HS256'));
 
print_r($decoded);
?>

