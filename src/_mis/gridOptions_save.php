<?php
// 이제 사용안함. 이 파일 나중에 지워도 됨.

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

$RealPid = $_POST["RealPid"];
$MisJoinPid = $_POST["MisJoinPid"];
$gridOptions = $_POST["gridOptions"];

if($MisJoinPid=='') $logicPid = $RealPid; else $logicPid = $MisJoinPid;



$destination = $base_root . "/_mis_addLogic/kendo-grid-options/" . $logicPid . ".json";
if(trim($gridOptions)!="") {
    WriteTextFile($destination, $gridOptions);
    echo '[{ "msg": "정상적으로 저장되었습니다." }]';
} else {
    if (file_exists($destination)) unlink($destination);
    echo '[{ "msg": "" }]';
}



?>