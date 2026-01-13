<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');


ob_start('ob_gzhandler');
//session_start();

$list_numbering = 'N';

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include 'MisCommonFunctionPlus.php';
include 'hangeul-utils-master/hangeul_romaja.php';



$ChkOnlySum = requestVB('ChkOnlySum');
$lite = requestVB('lite');
$liteString = '';
if($lite=='Y') {
    if($ChkOnlySum!='') exit;
    $liteString = '&lite=Y';
}


if($MS_MJ_MY=='MY') $addDir = 'MY'; else $addDir = '';

$devQueryOn = 'N'; $min = '.min';
if (isset($_COOKIE['devQueryOn'])) {
    $devQueryOn = $_COOKIE['devQueryOn'];
    if($devQueryOn=='Y') {
        error_reporting(E_ALL);
        ini_set('display_errors', 1);
        $min = '';
    }
}

$dd = '0';    //js,css 뒤에 붙음.

//$chcheID = requestVB('chcheID');
accessToken_check();

$RealPid = requestVB('RealPid');
if($RealPid=='') $RealPid = 'speedmis000314';
$MisJoinPid = '';


$strsql = <<<EOF
select table_m.idx as "idx"
,table_m.aliasName as "field"
,table_m.SortElement as "SortElement"
,table_m.Grid_Columns_Title as "title"
,table_m.Grid_FormGroup as "Grid_FormGroup"
,case when table_m.Grid_Columns_Width<=0 then '0px' else concat(14+8*table_m.Grid_Columns_Width,'px') end as "width"
,table_m.Grid_Align as "Grid_Align"
,table_m.Grid_CtlName as "Grid_CtlName"
,table_m.Grid_Schema_Type as "filter"
,table_m.Grid_MaxLength as "Grid_MaxLength"
,table_m.Grid_Items as "Grid_Items"
,table_m.Grid_Default as "Grid_Default"
,table_m.Grid_Pil as "Grid_Pil"
,table_m.Grid_ListEdit as "Grid_ListEdit"
,table_m.Grid_Schema_Validation as "Grid_Schema_Validation"
,table_m.Grid_IsHandle as "Grid_IsHandle"
,table_m.Grid_Templete as "Grid_Templete"
,table_m.Grid_Alim as "Grid_Alim"
from MisMenuList_Detail table_m
left outer join MisMenuList table_RealPid on table_RealPid.RealPid = table_m.RealPid
where table_m.useflag='1' and table_m.RealPid = '$RealPid'
EOF;

$result = allreturnSql($strsql);
echo json_encode($result);
?>