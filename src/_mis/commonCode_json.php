<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php include 'hangeul-utils-master/hangeul_romaja.php';?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

$MisSession_UserID = '';
accessToken_check();


$RealCid = $_GET["RealCid"];


$sql = " select Kname as text, kcode as value, kname2 as color from MisCommonTable where RealCid<>ggcode and ggcode = '$RealCid' ";
$json = jsonReturnSql($sql);

echo $json;
?>    