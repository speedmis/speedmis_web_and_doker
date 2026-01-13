<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php include 'hangeul-utils-master/hangeul_romaja.php';?>
<?php

$resultCode = "success";
$afterScript = '';
$appSql = '';

error_reporting(E_ALL);
ini_set("display_errors", 1);

echo $_GET['callback'];


$MisSession_UserID = '';
accessToken_check();


if (isset($_GET["RealPid"])) $RealPid = $_GET["RealPid"];
else $RealPid = '';

if (isset($_GET["MisJoinPid"])) $MisJoinPid = $_GET["MisJoinPid"];
else $MisJoinPid = '';

if($MisJoinPid=='') $logicPid = $RealPid; else $logicPid = $MisJoinPid;

if (isset($_GET["parent_gubun"])) {
    $parent_gubun = $_GET["parent_gubun"];
    $parent_RealPid = GubunIntoRealPid($parent_gubun);
} else {
    $parent_gubun = '';
    $parent_RealPid = '';
}

if($MS_MJ_MY=='MY') {
    $selectSql = "select * from (select @RANKT := @RANKT + 1 as rowNumber,table_m.taskID as 'taskID'   ,table_m.ownerID as 'ownerID'   ,table_m.title as 'title'   ,table_m.description as 'description'   ,table_m.startDate as 'startDate'   ,table_m.endDate as 'endDate'   ,table_m.startTimezone as 'startTimezone'   ,table_m.endTimezone as 'endTimezone'   ,table_m.recurrenceRule as 'recurrenceRule'   ,table_m.recurrenceID as 'recurrenceID'   ,table_m.recurrenceException as 'recurrenceException'   ,table_m.isAllDay as 'isAllDay'   ,table_m.remark as 'remark'   ,table_m.wdate as 'wdate'   ,table_wdater.username as 'table_wdaterQnusername'   ,table_m.wdater as 'wdater'   ,table_m.lastupdate as 'lastupdate'   ,table_lastupdater.username as 'table_lastupdaterQnusername'   ,table_m.lastupdater as 'lastupdater'   from MisSchedule table_m   left outer join MisUser table_wdater on table_wdater.UniqueNum = table_m.wdater   left outer join MisUser table_lastupdater on table_lastupdater.UniqueNum = table_m.lastupdater,(SELECT @RANKT := 0) XX where 9=9  and table_m.useflag='1') aaa where rowNumber between 1 and 100";
} else {
    $selectSql = "select * from (select ROW_NUMBER() over (order by table_m.taskID asc) as rowNumber,table_m.taskID as 'taskID'   ,table_m.ownerID as 'ownerID'   ,table_m.title as 'title'   ,table_m.description as 'description'   ,table_m.startDate as 'startDate'   ,table_m.endDate as 'endDate'   ,table_m.startTimezone as 'startTimezone'   ,table_m.endTimezone as 'endTimezone'   ,table_m.recurrenceRule as 'recurrenceRule'   ,table_m.recurrenceID as 'recurrenceID'   ,table_m.recurrenceException as 'recurrenceException'   ,table_m.isAllDay as 'isAllDay'   ,table_m.remark as 'remark'   ,table_m.wdate as 'wdate'   ,table_wdater.username as 'table_wdaterQnusername'   ,table_m.wdater as 'wdater'   ,table_m.lastupdate as 'lastupdate'   ,table_lastupdater.username as 'table_lastupdaterQnusername'   ,table_m.lastupdater as 'lastupdater'   from MisSchedule table_m   left outer join MisUser table_wdater on table_wdater.UniqueNum = table_m.wdater   left outer join MisUser table_lastupdater on table_lastupdater.UniqueNum = table_m.lastupdater   where 9=9  and table_m.useflag='1') aaa where rowNumber between 1 and 100";
}


?>({
    "d" : {
    "results": 
    [{"rowNumber":1,"taskID":1,"ownerID":null,"title":"Bowling tournament","description":"zzzzzz zzzzzzzzzzzzzzzzzzzzzzzzzzzzz zzzzzzzzzzzzzzzz","startDate":"\/Date(1370811600000)\/","endDate":"\/Date(1370822400000)\/","startTimezone":"","endTimezone":"","recurrenceRule":"","recurrenceID":0,"recurrenceException":"","isAllDay":false,"remark":"","wdate":"2019-12-06T09:50:29.030","table_wdaterQnusername":"Global Admin","wdater":"gadmin","lastupdate":"2019-12-06T10:20:34","table_lastupdaterQnusername":"Global Admin","lastupdater":"gadmin"}], "commentData": [], "pagenumber": 1, "key_aliasName": "taskID"
    , "child_alias": "taskID"
    , "__page": "1"
    , "__count": "1"
    , "__countSql": "select count(*) from MisSchedule table_m where table_m.useflag='1'   "
    , "__selectSql": "<?php echo $selectSql; ?>"
    , "keyword": ""
    , "app": ""
    , "resultCode": "success"
    , "resultMessage": "정상적으로 1 페이지가 조회되었습니다."
    , "menuName": "일정관리 기본형"
    , "afterScript": ""
    , "appSql": ""
    }
    }
    )
    