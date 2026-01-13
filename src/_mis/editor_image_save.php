<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
//header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

$MisSession_UserID = '';
accessToken_check();
if($MisSession_UserID=='') exit;

$tempDir = requestVB('tempDir');
$imgname = requestVB('imgname');
$field = requestVB('field');

$imgpath = $base_root . '/temp/' . $tempDir . '/' . $field . '_editorImage/' . $imgname;
createFolder($base_root . '/temp');
createFolder($base_root . '/temp/' . $tempDir);
createFolder($base_root . '/temp/' . $tempDir . '/' . $field . '_editorImage');

$img = $_POST['base64data'];
$img = substr(explode(";",$img)[1], 7);
file_put_contents($imgpath, base64_decode($img));
?>