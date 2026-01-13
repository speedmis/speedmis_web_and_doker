<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("charset=UTF-8");

include '../MisCommonFunction.php';
include '../../_mis_uniqueInfo/config_siteinfo.php';
include '../MisCommonFunctionPlus.php';

$HTTP_REFERER = splitVB($ServerVariables_URL, 'HTTP_REFERER=')[1];
if ($HTTP_REFERER != '') {
    $HTTP_REFERER = str_replace('preaddress=', '', $HTTP_REFERER);
    if (InStr($HTTP_REFERER, 'login/index.php?') > 0) {
        $HTTP_REFERER = splitVB($HTTP_REFERER, 'login/index.php?')[1];
    }
} else {
    $HTTP_REFERER = '/_mis/';
}

$redirect_uri = "$full_site/_mis/google_oauth/callback.php";
$scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

setcookie('target_uri', $HTTP_REFERER, 0, '/');
$auth_url = "https://accounts.google.com/o/oauth2/auth?client_id=$google_client_id&redirect_uri=$redirect_uri&scope=$scope&response_type=token";


re_direct($auth_url);
?>