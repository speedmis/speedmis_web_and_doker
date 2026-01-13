<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');


ob_start('ob_gzhandler');

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

if($MS_MJ_MY=='MY') {
    $addDir = 'MY';
    $isnull = 'ifnull';
} else {
    $addDir = '';
    $isnull = 'isnull';
}

$MisSession_UserID = '';
accessToken_check();

//해당파일은 서버안에서 실행되는 것이 대부분이므로 세션값이 거의 없다고 봐야함.
if($MisSession_UserID=='') {
    $MisSession_UserID = requestVB('MisSession_UserID');
}

$MisJoinPid = requestVB("MisJoinPid");
$RealPid = requestVB("RealPid");

$editorUploadKeys = [];
$afterScript = '';


if($MisJoinPid=='') $logicPid = $RealPid; else $logicPid = $MisJoinPid;



if($MS_MJ_MY=='MY') {
    $isnull = 'ifnull';
    $sql = "select concat(ifnull(g08,''),'@',ifnull(dbalias,'')) from MisMenuList where RealPid='" . $logicPid . "'";
} else {
    $isnull = 'isnull';
    $sql = "select isnull(g08,'')+'@'+isnull(dbalias,'') from MisMenuList where RealPid='" . $logicPid . "'";
}

$temp = splitVB(onlyOnereturnSql($sql),"@");
$table_m = $temp[0];
$dbalias = $temp[1];
/* MS_MJ_MY 셋트 start */
$isnull = 'isnull';
$Nchar = 'N';
$Nchar2 = 'N';
if($dbalias=='default') {
    $dbalias = '';
} else if(($dbalias=='' || $dbalias=='1st') && $MS_MJ_MY=='MY') {
    $dbalias = '1st';
    $MS_MJ_MY2 = 'MY';
    $isnull = 'ifnull';
    $Nchar = '';
}
connectDB_dbalias($dbalias);
if($MS_MJ_MY2=='MY') {
    $Nchar2 = '';
}
/* MS_MJ_MY 셋트 end */



/* 이 프로그램은 파라메터에 의해 단독으로 작동된다. 아직 적용 예제는 없음. */


/* 서버 로직 start */
if(file_exists('../_mis_addLogic/' . $logicPid . '.php')) include '../_mis_addLogic/' . $logicPid . '.php';
/* 서버 로직 end */
if(function_exists("addLogic_treat")) {
    addLogic_treat();
}

?>