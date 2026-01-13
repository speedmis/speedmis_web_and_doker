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



if (isset($_GET["idx"])) $idx = $_GET["idx"];
else $idx = '';

if (isset($_GET["RealPid"])) $RealPid = $_GET["RealPid"];
else $RealPid = '';

if (isset($_GET["widx"])) $widx = $_GET["widx"];
else $widx = '';

if($MS_MJ_MY=='MY') {
    $sql = " update MisReadList set readDate=now() where idx=$idx and RealPid='$RealPid' and widx='$widx' and userid=N'$MisSession_UserID' and 자격 in ('조회','필독'); ";
} else {
    $sql = " update MisReadList set readDate=getdate() where idx=$idx and RealPid='$RealPid' and widx='$widx' and userid=N'$MisSession_UserID' and 자격 in ('조회','필독') ";
}



if(execSql($sql)) echo "성공"; else echo "실패";
?>