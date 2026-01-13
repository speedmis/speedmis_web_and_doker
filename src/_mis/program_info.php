<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include 'MisCommonFunctionPlus.php';
include 'hangeul-utils-master/hangeul_romaja.php';


error_reporting(E_ALL);
ini_set("display_errors", 1);

if($MS_MJ_MY=='MY') $addDir = 'MY'; else $addDir = '';

$ActionFlag = '';


accessToken_check();
$MSUI = requestVB('MSUI');
if($MSUI!='') $MisSession_UserID = $MSUI;


if (isset($_GET["RealPid"])) $RealPid = $_GET["RealPid"];
else $RealPid = '';




//실사용 - 상세내역의 최신수정일자.
$sql = "select convert(char(19),max(lastupdate),120) from MisMenuList_detail where RealPid='" . $RealPid . "';";
$real_detail_date = onlyOnereturnSql($sql);

//실사용 - PHP 로직의 최신수정일자.
$RealPid_path = $base_root . '/_mis_addLogic/'.$RealPid.'.php';
$real_php_date = get_file_modified_date19($RealPid_path);

//테스트 - 상세내역의 최신수정일자.
$sql = "select ltrim(isnull(convert(char(19),max(lastupdate),120),'')) from MisMenuList_detail_pre where RealPid='" . $RealPid . "';";
$pre_detail_date = onlyOnereturnSql($sql);

//테스트 - PHP 로직의 최신수정일자.
$RealPid_path = $base_root . '/_mis_addLogic/'.$RealPid.'_pre.php';
$pre_php_date = get_file_modified_date19($RealPid_path);


$program_info = [];
$program_info['real_detail_date'] = $real_detail_date;
$program_info['real_php_date'] = $real_php_date;
$program_info['pre_detail_date'] = $pre_detail_date;
$program_info['pre_php_date'] = $pre_php_date;
echo json_encode($program_info);


?>