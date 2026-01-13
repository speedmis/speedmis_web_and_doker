<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';


error_reporting(E_ALL);
ini_set("display_errors", 1);

$query = encodeURI(requestVB('query'));

$url = "https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&page=1&size=10&query=$query";

$ch = curl_init();                                 //curl 초기화

curl_setopt($ch, CURLOPT_URL, $url);               //URL 지정하기
curl_setopt($ch, CURLOPT_HTTPHEADER, $kakaoAKheaders);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);    //요청 결과를 문자열로 반환 
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);      //connection timeout 10초 
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);   //원격 서버의 인증서가 유효한지 검사 안함
 
$response = curl_exec($ch);
curl_close($ch);

print_r($response);
