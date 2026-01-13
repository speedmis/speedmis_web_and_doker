
<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("charset=UTF-8");

include '../MisCommonFunction.php';

$HTTP_REFERER = $_SERVER['HTTP_REFERER']; 
re_direct("url.php?HTTP_REFERER=$HTTP_REFERER");
?>