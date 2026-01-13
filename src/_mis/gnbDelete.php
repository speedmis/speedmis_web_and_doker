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

if (isset($_GET["flag"])) $flag = $_GET["flag"];
else $flag = '';

if (isset($_GET["idx"])) $idx = $_GET["idx"];
else $idx = '';

if (isset($_GET["RealPid"])) $RealPid = $_GET["RealPid"];
else $RealPid = '';

if (isset($_GET["widx"])) $widx = $_GET["widx"];
else $widx = '';


if($flag=="idx") {
    $sql = " update MisReadList set useflag=0 where idx=$idx and RealPid='$RealPid' and widx='$widx' and userid=N'$MisSession_UserID' ";
} else if($flag=="read") {
    $sql = " update MisReadList set useflag=0 where readDate is not null and userid=N'$MisSession_UserID' ";
} else if($flag=="all") {
    $sql = " update MisReadList set useflag=0 where userid=N'$MisSession_UserID' ";
}
if(execSql($sql)) echo "성공"; else echo "실패";
?>