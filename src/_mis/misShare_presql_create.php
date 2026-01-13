<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php include 'hangeul-utils-master/hangeul_romaja.php';?>
<?php
require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use Firebase\JWT\JWT;

$appSql = '';

error_reporting(E_ALL);
ini_set("display_errors", 1);


$MisSession_UserID = '';
accessToken_check();

$remote_MS_MJ_MY = requestVB("remote_MS_MJ_MY");

$t = requestVB('t');
if(is_numeric($t)==false) {
    exit;
}

if($remote_MS_MJ_MY=='MY') {
    $isnull = 'ifnull';
    connectDB_dbalias('1st');
    $MS_MJ_MY = $MS_MJ_MY2;
    $DbServerName = $DbServerName2;
    $base_db = $base_db2;
    $DbID = $DbID2;
    $DbPW = $DbPW2;
} else if($remote_MS_MJ_MY!='') {
    $isnull = 'isnull';
    connectDB_dbalias('');
} else if($MS_MJ_MY=='MY') {
    $isnull = 'ifnull';
} else {
    $isnull = 'isnull';
}

$t = Left($t,6);
$strsql = "
select $isnull(presql,'') as presql from MisShare where $isnull(presql,'')<>'' and updateVersion > '$t'
";
//echo $strsql;

$result = allreturnSql($strsql);

$presql = '';

$cnt_result = count($result);
for($mm=0;$mm<$cnt_result;$mm++) {
    $presql = $presql . '
    ' . $result[$mm]['presql'] .';;;';  // ; 를 일부러 3개 넣음(분할실행용,중요)
}


//이렇게 치환해야 함.
echo JWT::encode($presql, 'presql');

?>