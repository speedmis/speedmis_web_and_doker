<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("charset=UTF-8");

include '../MisCommonFunction.php';
include '../../_mis_uniqueInfo/config_siteinfo.php';
include '../MisCommonFunctionPlus.php';

$redirect_uri = "$full_site/_mis/facebook_oauth/callback.php";
setcookie('target_uri', iif($ServerVariables_QUERY_STRING != '', str_replace('preaddress=', '', $ServerVariables_QUERY_STRING), '/_mis/'), 0, '/');
$auth_url = "https://www.facebook.com/v12.0/dialog/oauth?$facebook_param&redirect_uri=$redirect_uri&response_type=token";

re_direct($auth_url);
?>