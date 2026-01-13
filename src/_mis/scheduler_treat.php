<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
//header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php include 'hangeul-utils-master/hangeul_romaja.php';?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

if($MS_MJ_MY=='MY') $addDir = 'MY'; else $addDir = '';

$schedulerPid = requestVB("schedulerPid");

include '../_mis_addLogic/' . $schedulerPid . '.php';


$MisSession_UserID = '';
accessToken_check();




$callback = requestVB("callback");
echo $callback;


$flag = $_GET["flag"];

$sql_read = '';
$newIdx = requestVB("idx");
$models = requestVB("models");
if($models!='') $models = json_decode($models, true)[0];
$key_aliasName = '';

$sql_destroy = '';

$updateList = array();



scheduler_treatTop();

if(Left($flag,4)=="read") {

    $result = jsonReturnSql($sql_read);
    
    echo "(" . $result . ")";
    exit;

} 



if($flag=="destroy") {

    execSql($sql_destroy);
    echo "([])";
    exit;

} 





$key_value = '';
foreach ($models as $k=>$v) {

    if($k==$key_aliasName) {
        $key_value = $v;
    } else if(property_exists((object) $updateList, $k)) {
        $updateList[$k] =  $v;
    }
}


if($flag=="create") {

    $updateList["wdater"] = $MisSession_UserID;
    //print_r($updateList);
    //exit;
    $database->insert("MisSchedule", $updateList);
    $newIdx = onlyOnereturnSql("select top 1 taskID from MisSchedule order by taskID desc");
    
    //$jsonUrl = $full_site . '/_mis/list_json.php?flag=read&RealPid=rbk000998&idx=' . $newIdx . '$callback=jQuery300462810';
    $jsonUrl = $full_site . '/_mis/scheduler_treat.php?flag=read&idx=' . $newIdx . '&$callback=jQuery300462810';
    $result = file_get_contents($jsonUrl);
    
    echo "(" . $result . ")";

} else if($flag=="update") {

    $updateList["lastupdate"] = date("Y-m-d H:i:s");
    $updateList["lastupdater"] = $MisSession_UserID;
    
    
    $whereJson = [];
    $whereJson[$key_aliasName . "[=]"] = $key_value;
    
    
    
    /* 수정할 경우, 아래와 같이 한글필드이면 false 를 해야 함!!!! */
    $whereJson = json_encode($whereJson, JSON_UNESCAPED_UNICODE);
    
    if(len($key_aliasName)==uni_len($key_aliasName)) {
        $whereJson = json_decode($whereJson, true);
    } else {
        $whereJson = json_decode($whereJson, false);
    }
    
    
    $database->update("MisSchedule", $updateList, $whereJson);
    
    
    //$jsonUrl = $full_site . '/_mis/list_json.php?flag=read&RealPid=rbk000998&idx=' . $key_value . '&$callback=jQuery300462810';
    $jsonUrl = $full_site . '/_mis/scheduler_treat.php?flag=read&idx=' . $key_value . '&$callback=jQuery300462810';
    $result = file_get_contents($jsonUrl);
    
    echo "(" . $result . ")";
    
}

?>
