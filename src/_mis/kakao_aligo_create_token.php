<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');


ob_start('ob_gzhandler');

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);



$_apiURL	  =	'https://kakaoapi.aligo.in/akv10/token/create/30/y/';       //  30/y/ = 30년간 토큰유지.
$_hostInfo	=	parse_url($_apiURL);
$_port		  =	(strtolower($_hostInfo['scheme']) == 'https') ? 443 : 80;
$_variables	=	array(
    'apikey' => $kakao_aligo_apikey,
    'userid' => $kakao_aligo_userid
);

$oCurl = curl_init();
curl_setopt($oCurl, CURLOPT_PORT, $_port);
curl_setopt($oCurl, CURLOPT_URL, $_apiURL);
curl_setopt($oCurl, CURLOPT_POST, 1);
curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($oCurl, CURLOPT_POSTFIELDS, http_build_query($_variables));
curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);

$ret = curl_exec($oCurl);
$error_msg = curl_error($oCurl);
curl_close($oCurl);

// 리턴 JSON 문자열 확인
$retArr = json_decode($ret,true);
$token = $retArr['token'];

WriteTextFile('../_mis_uniqueInfo/kakao_aligo_token.php', '<'.'?php $kakao_aligo_token = '."'".$token."'; ?".'>');