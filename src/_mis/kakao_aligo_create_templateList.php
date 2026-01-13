<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');


ob_start('ob_gzhandler');

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../_mis_uniqueInfo/kakao_aligo_token.php';

function my_json_encode($arr)
{
    //convmap since 0x80 char codes so it takes all multibyte codes (above ASCII 127). So such characters are being "hidden" from normal json_encoding
    array_walk_recursive($arr, function (&$item, $key) { if (is_string($item)) $item = mb_encode_numericentity($item, array (0x80, 0xffff, 0, 0xffff), 'UTF-8'); });
    return mb_decode_numericentity(json_encode($arr), array (0x80, 0xffff, 0, 0xffff), 'UTF-8');
}

$_apiURL	  =	'https://kakaoapi.aligo.in/akv10/template/list/'; 
$_hostInfo	=	parse_url($_apiURL);
$_port		  =	(strtolower($_hostInfo['scheme']) == 'https') ? 443 : 80;
$_variables	=	array(
    'apikey' => $kakao_aligo_apikey,
    'userid' => $kakao_aligo_userid,
    'senderkey'   => $kakao_aligo_senderkey, 
    'token' => $kakao_aligo_token
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
$cnt = count($retArr['list']);
for($i=0;$i<$cnt;$i++) {
    $templtCode = $retArr['list'][$i]['templtCode'];
    $templtBody = my_json_encode($retArr['list'][$i]);
    WriteTextFile('../_mis_uniqueInfo/kakao_aligo_' . $templtCode . '.txt', $templtBody);
}
