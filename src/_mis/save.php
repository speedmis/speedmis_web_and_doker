<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
//header("Content-Type:application/json; charset=UTF-8");

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include 'MisCommonFunctionPlus.php';
//include 'hangeul-utils-master/hangeul_romaja.php';




if ($MS_MJ_MY == 'MY')
    $addDir = 'MY';
else
    $addDir = '';


$MisSession_UserID = '';
accessToken_check();

if (isset($_POST["ActionFlag"]))
    $ActionFlag = $_POST["ActionFlag"];
else
    $ActionFlag = '';

$MisJoinPid = requestVB("MisJoinPid");
$RealPid = requestVB("RealPid");
$pre = requestVB('pre');
$addParam = requestVB('addParam');
$MisMenuList_Detail = 'MisMenuList_Detail';
if ($pre == '1') {
    $MisMenuList_Detail = 'MisMenuList_Detail_pre';
}
$app = requestVB("app");

//일부 사용자에서 오류발생으로 중지시킴.
/*
$csrf_token = requestVB("csrf_token");
// POST된 csrf_token 값과 쿠키의 값을 비교
if ($csrf_token !== $_COOKIE['csrf_token']) {
    die('비정상적인 접근입니다 - CSRF 검증 실패');
}
*/

$click_id = requestVB("click_id");

$editorUploadKeys = [];
$editorUploadKeys_alias = [];
$afterScript = '';

$devQueryOn = 'N';
if (isset($_COOKIE["devQueryOn"])) {
    $devQueryOn = $_COOKIE["devQueryOn"];
}
if ($devQueryOn == 'Y') {
    error_reporting(E_ALL);
    ini_set("display_errors", 1);
}
$rnd = '';

if ($MisJoinPid == '')
    $logicPid = $RealPid;
else
    $logicPid = $MisJoinPid;

$parent_idx = requestVB('parent_idx');
$parent_gubun = requestVB('parent_gubun');


/* 서버 로직 start */
if (file_exists('../_mis_addLogic/' . $logicPid . '.php'))
    include '../_mis_addLogic/' . $logicPid . '.php';
/* 서버 로직 end */


if (isset($_GET["tempDir"]))
    $tempDir = $_GET["tempDir"];
else
    $tempDir = '';

if (isset($_GET["default"]))
    $upload_default = $_GET["default"];
else
    $upload_default = '';


$key_aliasName = $_POST["key_aliasName"];

if (isset($_POST["key_value"]))
    $key_value = $_POST["key_value"];
else
    $key_value = '';

if (isset($_POST["saveList"]))
    $saveList = json_decode(decode_cafe24(str_replace('@colon;', ':', $_POST["saveList"])), true);
else
    $saveList = [];
if (isset($_POST["initList"]))
    $initList = json_decode(decode_cafe24(str_replace('@colon;', ':', $_POST["initList"])), true);
else
    $initList = [];

if (isset($_POST["saveTextdecrypt1List"]))
    $saveTextdecrypt1List = json_decode($_POST["saveTextdecrypt1List"], true);
else
    $saveTextdecrypt1List = [];
if (isset($_POST["saveTextdecrypt2List"]))
    $saveTextdecrypt2List = json_decode($_POST["saveTextdecrypt2List"], true);
else
    $saveTextdecrypt2List = [];

if (isset($_POST["saveUploadList"]))
    $saveUploadList = json_decode($_POST["saveUploadList"], true);
else
    $saveUploadList = [];

if (isset($_POST["viewList"]))
    $viewList = json_decode(decode_cafe24(str_replace('@colon;', ':', $_POST["viewList"])), true);
else
    $viewList = [];


// $deleteList 는 특성 상, json_decode 로 처리하지 않는다. 
if (isset($_POST["deleteList"]))
    $deleteList = $_POST["deleteList"];
else
    $deleteList = '';

$upload_idx = '';
$AUTO_INCREMENT_KEY = '';
if ($viewList != []) {
    $AUTO_INCREMENT_KEY = array_key_first($viewList);   //mysql 자동증가 계산 크로스체크용.
}
if ($ActionFlag == 'templist') {

    //{"rowNumber":1,"idx":1,"daeyeoilja":"2021-03-010","chaekjemok":"로미오와 줄리엣","table_deungnokjasabeonQnusername":"admin","deungnokjasabeon":"admin","hit":8,"IP":null,"useflag":"1","wdate":"2021-07-31 12:21","wdater":"gadmin","lastupdate":null,"lastupdater":null}
    //[daeyeoilja] => 2021-07-30
    //[chaekjemok] => eeeee
    //[deungnokjasabeon] => 김도성

    $addList = [];

    if (!is_dir($base_root . "/temp/$tempDir")) {
        mkdir($base_root . "/temp/$tempDir", 0777, true);
    }
    $last_number = ReadTextFile($base_root . "/temp/$tempDir/last_number.txt");
    if ($last_number == '')
        $last_number = 0;
    else
        $last_number = (int) $last_number;

    ++$last_number;

    $templist = '[';

    for ($ii = 1; $ii <= $last_number - 1; $ii++) {
        $line_data = ReadTextFile($base_root . "/temp/$tempDir/$ii.txt");
        $templist = $templist . $line_data;
        if ($ii < $last_number)
            $templist = $templist . ',';
    }
    $templist = $templist . ']';

    if (function_exists("save_writeBefore")) {
        save_writeBefore();
    }
    $jj = 0;
    foreach ($viewList as $k => $v) {
        if ($jj == 0) {
            $addList[$k] = $last_number;
        } else if ($k == 'wdater') {
            $addList[$k] = $MisSession_UserID;
        } else if ($k == 'hit' || $k == 'IP' || $k == 'useflag' || $k == 'wdate' || $k == 'lastupdate' || $k == 'lastupdater' || $k == 'virtual_fieldQnmisPildokMem') {
        } else {
            $addList[$k] = $v;
        }
        ++$jj;
    }
    //기존 임시내역에 존재하는지 비교 시작 -----
    $check_data = json_encode($addList, JSON_UNESCAPED_UNICODE);
    $check_data = Mid($check_data, InStr($check_data, ',"'), 10000);

    if (function_exists("save_writeAfter")) {
        save_writeAfter();
    }

    if (InStr($templist, $check_data) > 0) {
        echo '{"resultCode":"fail","resultMessage": "이미 임시내역에 추가된 입력건입니다.","afterScript":"' . $afterScript . '"}';
        exit;
    }
    //비교 끝 ---


    WriteTextFile($base_root . "/temp/$tempDir/$last_number.txt", json_encode($addList, JSON_UNESCAPED_UNICODE));
    WriteTextFile($base_root . "/temp/$tempDir/last_number.txt", $last_number);
    echo '{"resultCode":"success","resultMessage": "' . $last_number . ' 번째 임시데이터가 정상적으로 추가되었습니다.","afterScript":"' . $afterScript . '"}';
    exit;
}

if ($ActionFlag == 'write') {
    if (isset($saveList[$key_aliasName])) {
        //사번ID 같이 자동증가가 아닌, 한개의 필드일 경우.
        $key_value = $saveList[$key_aliasName];
        $upload_idx = $key_value;
    } else {

        //saveList 에 없고 key_count>=2 때만 처리 : 다중 key 임.
        if (count($viewList) > 0) {
            $key_count = count(splitVB($viewList[$key_aliasName], '_-_'));
            if ($key_count >= 2) {
                $upload_idx = $viewList[$key_aliasName];
                $key_value = $upload_idx;
            }
        }
    }
    //echo $upload_idx;
}

$inList = "'" . $key_aliasName . "'";
$tempFileList = ''; //업로드된 임시폴더의 파일목록을 기억 후, 막판에 삭제함.

if ($ActionFlag != "delete" && $ActionFlag != "kill" && $ActionFlag != "restore") {
    foreach ($saveList as $k => $v) {
        $inList = $inList . ",'" . $k . "'";
    }
    foreach ($saveTextdecrypt1List as $k => $v) {
        $inList = $inList . ",'" . $k . "'";
    }
    foreach ($saveTextdecrypt2List as $k => $v) {
        $inList = $inList . ",'" . $k . "'";
    }
    foreach ($saveUploadList as $k => $v) {
        $inList = $inList . ",'" . $k . "'";
    }
}

if ($MS_MJ_MY == 'MY') {
    $sql = "select concat(ifnull(g08,''),'@',ifnull(dbalias,'')) from MisMenuList where RealPid='" . $logicPid . "'";
} else {
    $sql = "select isnull(g08,'')+'@'+isnull(dbalias,'') from MisMenuList where RealPid='" . $logicPid . "'";
}

$temp = splitVB(onlyOnereturnSql($sql), "@");
$table_m = $temp[0];
$dbalias = $temp[1];
/* MS_MJ_MY 셋트 start */
$isnull = 'isnull';
$Nchar = 'N';
$Nchar2 = 'N';
if ($dbalias == 'default') {
    $dbalias = '';
} else if (($dbalias == '' || $dbalias == '1st') && $MS_MJ_MY == 'MY') {
    $dbalias = '1st';
    $MS_MJ_MY2 = 'MY';
    $isnull = 'ifnull';
    $Nchar = '';
}
connectDB_dbalias($dbalias);
if ($MS_MJ_MY2 == 'MY') {
    $Nchar2 = '';
}
/* MS_MJ_MY 셋트 end */


if (Left($table_m, 4) == "dbo.")
    $table_m = splitVB($table_m, "dbo.")[1];

//아래 두 변수에 사용자 정의 save_updateBefore() 에서 입력/수정/삭제 전후 쿼리를 넣을 수 있음.
$sql_prev = '';
$sql_next = '';

if ($ActionFlag == 'modify') {
    //수정일 경우, 해당테이블에 업데이트필드가 있으면 업데이트 준비.

    if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
        $sql = "SELECT count(*) FROM Information_schema.columns
        WHERE table_schema = '$base_db2' 
        AND table_name = '$table_m' 
        AND (column_name = 'lastupdate' or column_name = 'lastupdater') ";
        if (onlyOnereturnSql_db2_mysql($sql) == "2") {
            $inList = $inList . ",'lastupdate'";
            $inList = $inList . ",'lastupdater'";
        }
    } else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
        $sql = "SELECT count(*) FROM ALL_TAB_COLUMNS 
        WHERE table_name = '$table_m' 
        AND (column_name = 'lastupdate' or column_name = 'lastupdater') ";
        if (onlyOnereturnSql_db2_oracle($sql) == "2") {
            $inList = $inList . ",'lastupdate'";
            $inList = $inList . ",'lastupdater'";
        }
    } else {
        $sql = "select count(name) from sys.syscolumns where (name='lastupdate' or name='lastupdater') 
        and id=(select id from sys.sysobjects where name=(select substring(g08, dbo.instr(0,g08,'.')+1, 100) from MisMenuList where RealPid='$logicPid'))";

        if ($dbalias != '') {
            if (onlyOnereturnSql_db2_mssql($sql) == "2") {
                $inList = $inList . ",'lastupdate'";
                $inList = $inList . ",'lastupdater'";
            }
        } else {

            if (onlyOnereturnSql($sql) == "2") {
                $inList = $inList . ",'lastupdate'";
                $inList = $inList . ",'lastupdater'";
            }
        }
    }

}

if ($MS_MJ_MY == 'MY') {
    $strsql = "
select 
ifnull(g01,'') as g01
,ifnull(g07,'') as g07
,ifnull(g08,'') as g08
,ifnull(g10,'') as g10
,ifnull(g11,'') as g11
,aliasName
,ifnull(Grid_Select_Tname,'') as Grid_Select_Tname
,ifnull(Grid_Select_Field,'') as Grid_Select_Field
,ifnull(Grid_Default,'') as Grid_Default
,ifnull(Grid_CtlName,'') as Grid_CtlName 
,ifnull(Grid_Schema_Type,'') as Grid_Schema_Type
from $MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where d.RealPid='" . iif($MisJoinPid != "", $MisJoinPid, $RealPid) . "' and (sortelement=1 or aliasName in (" . $inList . ") or Grid_Select_Tname='table_m')
order by sortelement 
";
} else {
    $strsql = "
select 
isnull(g01,'') as g01
,isnull(g07,'') as g07
,isnull(g08,'') as g08
,isnull(g10,'') as g10
,isnull(g11,'') as g11
,aliasName
,isnull(Grid_Select_Tname,'') as Grid_Select_Tname
,isnull(Grid_Select_Field,'') as Grid_Select_Field
,isnull(Grid_Default,'') as Grid_Default
,isnull(Grid_CtlName,'') as Grid_CtlName 
,isnull(Grid_Schema_Type,'') as Grid_Schema_Type
from $MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where d.RealPid='" . iif($MisJoinPid != "", $MisJoinPid, $RealPid) . "' and (sortelement=1 or aliasName in (" . $inList . ") or Grid_Select_Tname='table_m')
order by sortelement 
";
}



$result = allreturnSql($strsql);
$mm = 0;
//$speed_fieldIndx = [];
$Grid_Default = [];
$Grid_Select_Tname = [];
$Grid_Select_Field = [];
$contentList = ";";

$pushList = '';
$mailList = '';
$virtual_fieldQnmisPildokMem = '';
$newIdx = '';

$cnt_result = count($result);
while ($mm < $cnt_result) {
    //print_r($mm . ":" . $result[$mm]["Grid_Align"]);
    if ($mm == 0) {
        $BodyType = $result[$mm]["g01"];
        $Read_Only = $result[$mm]["g07"];          //읽기전용
        $table_m = $result[$mm]["g08"];          //테이블명
        if (Left($table_m, 4) == "dbo.")
            $table_m = splitVB($table_m, "dbo.")[1];

        $delflag_sql = $result[$mm]["g11"];           //삭제쿼리
        $useflag_sql = $result[$mm]["g10"];           //use 조건
    }
    $aliasName = $result[$mm]["aliasName"];
    $Grid_Select_Tname[$aliasName] = $result[$mm]["Grid_Select_Tname"];
    $Grid_Select_Field[$aliasName] = $result[$mm]["Grid_Select_Field"];
    $Grid_CtlName[$aliasName] = $result[$mm]["Grid_CtlName"];
    $Grid_Schema_Type[$aliasName] = $result[$mm]["Grid_Schema_Type"];
    $Grid_Default[$aliasName] = $result[$mm]["Grid_Default"];
    if ($result[$mm]["Grid_Schema_Type"] == 'content' && $Grid_Select_Tname[$aliasName] == "table_m")
        $contentList = $contentList . $result[$mm]["Grid_Select_Field"] . ';';
    //if($Grid_Select_Tname=="table_m") $speed_fieldIndx[$aliasName] = $Grid_Select_Field;

    ++$mm;
}


if ($ActionFlag == 'delete_templist') {

    $templist = '[';
    $tempDir = requestVB('tempDir');
    $deleteList = json_decode($deleteList);
    if (function_exists("save_deleteBefore")) {
        save_deleteBefore();
    }
    foreach ($deleteList as $v) {
        $delete_txt = $base_root . "/temp/$tempDir/$v.txt";
        fileDelete($delete_txt);
    }
    if (function_exists("save_deleteAfter")) {
        save_deleteAfter();
    }
    echo '{"resultCode":"success","resultMessage": "선택하신 내역이 삭제되었습니다.","afterScript":"' . $afterScript . '"}';
    exit;
}


if ($ActionFlag == 'templist_end') {

    $result = [];

    $templist = '[';
    $tempDir = requestVB('tempDir');
    if (!is_dir($base_root . "/temp/$tempDir")) {
        mkdir($base_root . "/temp/$tempDir", 0777, true);
    }
    $last_number = ReadTextFile($base_root . "/temp/$tempDir/last_number.txt");

    if ($last_number == '')
        $last_number = 0;
    else
        $last_number = (int) $last_number;

    for ($ii = 1; $ii <= $last_number; $ii++) {
        $line_data = ReadTextFile($base_root . "/temp/$tempDir/$ii.txt");
        if ($line_data != '') {
            $templist = $templist . $line_data;
            if ($ii < $last_number)
                $templist = $templist . ',';
        }
    }
    $templist = $templist . ']';
    $templist = json_decode($templist);
    $cnt_templist = count($templist);



    $index = 0;
    $field_list = '';
    if (count($templist) == 0) {
        echo '{"resultCode":"fail","resultMessage": "저장할 내역이 없습니다.","afterScript":"' . $afterScript . '"}';
        exit;
    }
    foreach ($templist[0] as $k => $v) {
        if (property_exists((object) $Grid_Select_Field, $k) && $index > 0) {
            if ($Grid_Select_Field[$k] != 'wdater') {
                if ($field_list != '')
                    $field_list = $field_list . ',';
                $field_list = $field_list . $Grid_Select_Field[$k];
            }
        }
        ++$index;
    }

    $sql = '';
    $insert_cnt = 0;
    $index = 0;


    for ($ii = 0; $ii < $cnt_templist; $ii++) {
        $index = 0;
        $value_list = '';
        foreach ($templist[$ii] as $k => $v) {

            if (property_exists((object) $Grid_Select_Field, $k) && $index > 0) {
                if ($Grid_Select_Field[$k] != 'wdater') {
                    if ($value_list != '')
                        $value_list = $value_list . ',';
                    $value_list = $value_list . "$Nchar2'" . sqlValueReplace($v) . "'";
                }
            }
            ++$index;
        }

        if ($value_list != '') {
            $sql = $sql . "insert into $table_m ($field_list,wdater) values ($value_list,$Nchar2'$MisSession_UserID'); \n";
            ++$insert_cnt;
        }
    }

    if (function_exists("save_writeBefore")) {
        save_writeBefore();
    }
    $sql = $sql_prev . $sql . $sql_next;

    if ($sql != '') {
        if (execSql($sql)) {
            $resultCode = 'success';
            $resultMessage = $insert_cnt . ' 개의 임시데이터가 최종적으로 저장되었습니다.';
        } else {
            $resultCode = 'fail';
            $resultMessage = $insert_cnt . ' 개의 임시데이터의 최종 저장이 실패되었습니다.';
        }
    }
    if (function_exists("save_writeAfter")) {
        save_writeAfter();
    }
    createFolder($base_root . "/temp/");
    $rnd = rand(101, 400);
    $devQuery_file = "temp/$full_siteID" . "_" . $RealPid . "_q" . $rnd . ".txt";
    WriteTextFile($base_root . '/' . $devQuery_file, $sql);

    $result["resultCode"] = $resultCode;
    $result["resultMessage"] = $resultMessage;
    $result["__devQuery_url"] = '/' . $devQuery_file;
    $result["afterScript"] = $afterScript;

    echo json_encode($result, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($ActionFlag == 'delete' || $ActionFlag == 'kill' || $ActionFlag == 'restore') {

    $deleteList = json_encode($deleteList, JSON_UNESCAPED_UNICODE);
    $removeChr = '"' . '[' . '\\' . '"';
    $deleteList = str_replace($removeChr, "'", $deleteList);
    $removeChr = '\\' . '"' . ']' . '"';
    $deleteList = str_replace($removeChr, "'", $deleteList);
    $removeChr = '\\' . '"' . ',' . '\\' . '"';
    $deleteList = str_replace($removeChr, "','", $deleteList);






    if ($dbalias != '') {
        if ($MS_MJ_MY2 == 'MY') {
            if ($delflag_sql != '' && $ActionFlag == 'delete') {
                $sql = " update $table_m table_m set $delflag_sql where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
            } else if ($delflag_sql != '' && $ActionFlag == 'restore') {
                if ($useflag_sql == '' || $delflag_sql == 'useflag=0' || $delflag_sql == "useflag='0'" || InStr($useflag_sql, 'useflag<>') > 0)
                    $delflag_sql = "useflag='1'";
                else {
                    $delflag_sql = splitVB(str_replace("table_m.", "", $useflag_sql), " ")[0];
                    if (InStr($delflag_sql, '<>') > 0) {
                        $delflag_sql = splitVB($delflag_sql, "<>")[0] . " = null";
                    }
                }
                $sql = " update $table_m table_m set $delflag_sql where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
            } else {
                $sql = " delete from table_m using $table_m as table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
            }
        } else if ($MS_MJ_MY2 == 'OC') {
            if ($delflag_sql != '' && $ActionFlag == 'delete') {
                $sql = " update $table_m set $delflag_sql from $table_m table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
            } else if ($delflag_sql != '' && $ActionFlag == 'restore') {
                if ($useflag_sql == '' || $delflag_sql == 'useflag=0' || $delflag_sql == "useflag='0'" || InStr($useflag_sql, 'useflag<>') > 0)
                    $delflag_sql = "useflag='1'";
                else {
                    $delflag_sql = splitVB(str_replace("table_m.", "", $useflag_sql), " ")[0];
                    if (InStr($delflag_sql, '<>') > 0) {
                        $delflag_sql = splitVB($delflag_sql, "<>")[0] . " = null";
                    }
                }
                $sql = " update $table_m set $delflag_sql from $table_m table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
            } else {
                $sql = " delete $table_m from $table_m table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
            }
        } else {
            if ($delflag_sql != '' && $ActionFlag == 'delete') {
                $sql = " update $table_m set $delflag_sql from $table_m table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
            } else if ($delflag_sql != '' && $ActionFlag == 'restore') {
                if ($useflag_sql == '' || $delflag_sql == 'useflag=0' || $delflag_sql == "useflag='0'" || InStr($useflag_sql, 'useflag<>') > 0)
                    $delflag_sql = "useflag='1'";
                else {
                    $delflag_sql = splitVB(str_replace("table_m.", "", $useflag_sql), " ")[0];
                    if (InStr($delflag_sql, '<>') > 0) {
                        $delflag_sql = splitVB($delflag_sql, "<>")[0] . " = null";
                    }
                }
                $sql = " update $table_m set $delflag_sql from $table_m table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
            } else {
                $sql = " delete $table_m from $table_m table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
            }
        }
    } else {

        if ($delflag_sql != '' && $ActionFlag == 'delete') {
            $sql = " update $table_m set $delflag_sql from $table_m table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
        } else if ($delflag_sql != '' && $ActionFlag == 'restore') {
            if ($useflag_sql == '' || $delflag_sql == 'useflag=0' || $delflag_sql == "useflag='0'" || InStr($useflag_sql, 'useflag<>') > 0)
                $delflag_sql = "useflag='1'";
            else {
                $delflag_sql = splitVB(str_replace("table_m.", "", $useflag_sql), " ")[0];
                if (InStr($delflag_sql, '<>') > 0) {
                    $delflag_sql = splitVB($delflag_sql, "<>")[0] . " = null";
                }
            }
            $sql = " update $table_m set $delflag_sql from $table_m table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
        } else {
            $sql = " delete $table_m from $table_m table_m where " . $Grid_Select_Field[$key_aliasName] . " in (" . $deleteList . "); ";
        }

    }






} else {

    if (function_exists("save_updateReady")) {
        save_updateReady();
    }

    $updateList = [];
    $key_updateList = [];

    $i = 0;
    $ii = 0;
    foreach ($saveList as $k => $v) {
        if (InStr($v, "/temp/" . $tempDir . "/" . $k . "_editorImage/") > 0) {
            $editorUploadKeys[$i] = $Grid_Select_Field[$k];
            $editorUploadKeys_alias[$i] = $k;
            $v = str_replace("/temp/" . $tempDir . "/" . $k . "_editorImage/", "{newEditorImageDir}", $v);
            ++$i;
        }


        if ($k == "virtual_fieldQnmisPildokMem") {
            $virtual_fieldQnmisPildokMem = $v;
        } else if ($k != '') {
            $updateList[$Grid_Select_Field[$k]] = $v;
            $key_updateList[$Grid_Select_Field[$k]] = $k;
        }


        if ($k == "virtual_fieldQnmisPildokMem") {
            $virtual_fieldQnmisPildokMem = $v;
        } else if ($k != '') {
            if (InStr($key_value, '_-_') == 0 || $key_aliasName == key($viewList) || $ActionFlag == "write") {
                $updateList[$Grid_Select_Field[$k]] = $v;
                $key_updateList[$Grid_Select_Field[$k]] = $k;
            } else {
                if ($ii >= count(splitVB($key_value, '_-_'))) {
                    $updateList[$Grid_Select_Field[$k]] = $v;
                    $key_updateList[$Grid_Select_Field[$k]] = $k;
                }
            }
        }
        $ii++;
    }

    if ($MS_MJ_MY == 'MY') {
        foreach ($saveTextdecrypt1List as $k => $v) {
            $updateList[$Grid_Select_Field[$k]] = "_noDDA_HEX(AES_ENCRYPT('$v','$pwdKey'))";		//_noDDA_ 는 따옴표 없다는 뜻.
            $key_updateList[$Grid_Select_Field[$k]] = $k;		//_noDDA_ 는 따옴표 없다는 뜻.
        }
        foreach ($saveTextdecrypt2List as $k => $v) {
            $updateList[$Grid_Select_Field[$k]] = "_noDDA_HEX(AES_ENCRYPT('$v','$pwdKey'))";		//_noDDA_ 는 따옴표 없다는 뜻.
            $key_updateList[$Grid_Select_Field[$k]] = $k;		//_noDDA_ 는 따옴표 없다는 뜻.
        }
    } else {
        foreach ($saveTextdecrypt1List as $k => $v) {
            $updateList[$Grid_Select_Field[$k]] = "_noDDA_ENCRYPTBYPASSPHRASE('$pwdKey', N'$v')";		//_noDDA_ 는 따옴표 없다는 뜻.
            $key_updateList[$Grid_Select_Field[$k]] = $k;
        }
        foreach ($saveTextdecrypt2List as $k => $v) {
            $updateList[$Grid_Select_Field[$k]] = "_noDDA_ENCRYPTBYPASSPHRASE('$pwdKey', N'$v')";		//_noDDA_ 는 따옴표 없다는 뜻.
            $key_updateList[$Grid_Select_Field[$k]] = $k;
        }
    }


    foreach ($saveUploadList as $k => $v) {
        $updateList[$Grid_Select_Field[$k]] = $v;
        $key_updateList[$Grid_Select_Field[$k]] = $k;
        if ($v == '') {
            $updateList[$Grid_Select_Field[$k] . "_midx"] = "@null";
            $key_updateList[$Grid_Select_Field[$k] . "_midx"] = $k;
        }

    }


    $tmpFilePath = $base_root . "/temp/" . $tempDir . "/";
    if ($ActionFlag == 'write') {

        //입력이므로, wdater 필드가 있으면 추가.
        if ($dbalias != '') {
            if ($MS_MJ_MY2 == 'MY') {
                $sql = "SELECT count(*) FROM Information_schema.columns
                WHERE table_schema = '$base_db2' 
                AND table_name = '$table_m' 
                AND (column_name = 'wdater') ";
                if (onlyOnereturnSql_db2_mysql($sql) == "1") {
                    $updateList["wdater"] = "$MisSession_UserID";
                    $key_updateList["wdater"] = "wdater";
                }

                if ($upload_idx == "") {
                    //mysql 은 AUTO_INCREMENT 자체가 이미 1증가된 값임.
                    $sql = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = '$table_m' and TABLE_SCHEMA='$base_db2'";
                    $upload_idx = onlyOnereturnSql_db2_mysql($sql);
                    if ($AUTO_INCREMENT_KEY != '') {
                        $sql = "SELECT MAX($AUTO_INCREMENT_KEY)+1 FROM $table_m;";
                        $upload_idx2 = onlyOnereturnSql_db2_mysql($sql);
                        if ($upload_idx2 > $upload_idx) {
                            $upload_idx = $upload_idx2;
                        }
                    }
                }
            } else if ($MS_MJ_MY2 == 'OC') {


                $sql = "SELECT count(*) FROM ALL_TAB_COLUMNS 
				WHERE table_name = '$table_m' 
				AND (column_name = 'wdater') ";
                if (onlyOnereturnSql_db2_oracle($sql) == "1") {
                    $updateList["wdater"] = "$MisSession_UserID";
                    $key_updateList["wdater"] = "wdater";
                }

                if ($upload_idx == "") {
                    $sql = "select " . $table_m . "_SEQ.NEXTVAL from dual";
                    $upload_idx = onlyOnereturnSql_db2_oracle($sql) + 1;
                }
            } else {
                $sql = "select count(name) from sys.syscolumns where (name='wdater') 
                and id=(select id from sys.sysobjects where name=N'$table_m')";
                if (onlyOnereturnSql_db2_mssql($sql) == "1") {
                    $updateList["wdater"] = "$MisSession_UserID";
                    $key_updateList["wdater"] = "wdater";
                }

                if ($upload_idx == "") {
                    //$sql = "select IDENT_CURRENT('" . $table_m . "')+1 ";
                    $sql = "select 1+case when IDENT_CURRENT('$table_m')=1 then (select count(*) from $table_m) else IDENT_CURRENT('$table_m') end";

                    $upload_idx = onlyOnereturnSql_db2_mssql($sql);

                }
            }
        } else {

            $sql = "select count(name) from sys.syscolumns where (name='wdater') 
            and id=(select id from sys.sysobjects where name=N'$table_m')";
            if (onlyOnereturnSql($sql) == "1") {
                $updateList["wdater"] = "$MisSession_UserID";
                $key_updateList["wdater"] = "wdater";
            }

            if ($upload_idx == "") {
                //$sql = "select IDENT_CURRENT('" . $table_m . "')+1 ";
                $sql = "select 1+case when IDENT_CURRENT('$table_m')=1 then (select count(*) from $table_m) else IDENT_CURRENT('$table_m') end";
                $upload_idx = onlyOnereturnSql($sql);
            }

        }

        //입력을 의미하므로, 입력값을 미리 가져올 것.


    } else {
        $upload_idx = $key_value;
    }

    $upload_field = $key_aliasName;
    $sql = "select Grid_Select_Field as fieldName from $MisMenuList_Detail where aliasName=N'" . $upload_field . "'";
    $fieldName = onlyOnereturnSql($sql);

    $upload_key = $key_aliasName;       //고도화 전에는 항상 이러했음.
    $sql = "select Grid_Select_Field as fieldName from $MisMenuList_Detail where aliasName=N'" . $upload_key . "'";
    $upload_real_field = onlyOnereturnSql($sql);  //고도화 이후에는 _-_ 로 합쳐진 형태등장.






    if (count($saveUploadList) > 0) {  /******** 첨부가 있거나 삭제 등의 변화가 있을 경우 start *********/


        $sql_ms = " declare @attachUrl nvarchar(1000), @attachName nvarchar(100), @fileList nvarchar(max)
        declare @midx int 
        declare @midx2 int 
        delete from MisTempSql
        update MisAttachList set useflag='2' where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m'  
        ";
        $sql_oc = " 
        declare
            attachUrl varchar2(1000);
            attachName varchar2(100);
            fileList varchar2(5000);
            v_midx int;
            v_midx2 int;
            v_idx int;
            v_cnt int;
        BEGIN

        v_midx:=0;
        v_idx:=0;


        delete from MisTempSql;
        update MisAttachList set useflag='2' where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m';
        ";
        $sql_my = " 
        delete from MisTempSql;
        update MisAttachList set useflag='2' where excel_idxname='$upload_key' and idxnum='$upload_idx' and table_m='$table_m';
        ";


        //for start -------------------------------------------------------------------------------
        foreach ($saveUploadList as $k => $v) {

            if ($v == '')
                continue;
            $upload_default = $Grid_Default[$k];
            if (Left($upload_default, 7) == 'select ') {
                $upload_default = onlyOnereturnSql_gate($upload_default, $dbalias);
            }

            if (InStr($upload_default, "{") > 0) {
                $searchAliasName = splitVB(splitVB($upload_default, '{')[1], '}')[0];

                if (!property_exists((object) $viewList, $searchAliasName))
                    continue;         //{} 형태의 업로드 디폴트값 관련 항목이 없으면 무시.

                $searchAliasValue = $viewList[$searchAliasName];


                if ($searchAliasValue == "" && inStr(json_encode($viewList, JSON_UNESCAPED_UNICODE), '{"' . $searchAliasName . '":"",') > 0) {

                    $searchAliasValue = $upload_idx;
                }
                $upload_default = replace($upload_default, '{' . $searchAliasName . '}', $searchAliasValue);
            }

            $fieldName = $Grid_Select_Field[$k];

            if ($upload_default == "") {
                $target_dir = "/uploadFiles/" . $table_m . "/" . $fieldName . "/" . $upload_idx . "/";
                $target_name = "{origin}";
            } else if (InStr($upload_default, "/") == 0) {
                $target_dir = "/uploadFiles/" . $table_m . "/" . $fieldName . "/";
                $target_name = $upload_default;
            } else if (Left($upload_default, 1) != "/" && Right($upload_default, 1) != "/") {
                $target_name = splitVB($upload_default, "/")[count(splitVB($upload_default, "/")) - 1];
                $target_dir = "/uploadFiles/" . Left($upload_default, Len($upload_default) - Len($target_name));
            } else if (Right($upload_default, 1) != "/") {
                $target_name = splitVB($upload_default, "/")[count(splitVB($upload_default, "/")) - 1];
                $target_dir = Left($upload_default, Len($upload_default) - Len($target_name));
            } else {
                $target_dir = $upload_default;
                $target_name = "{origin}";
            }



            $upload_field = $k;

            $forMax = count(splitVB($v, "@AND@"));
            for ($j = 0; $j < $forMax; $j++) {

                $origin = splitVB($v, "@AND@")[$j];

                if ($target_name == "{origin}")
                    $target_file = $target_dir . $origin;
                else {
                    if (InStr($target_name, "@ext") > 0) {
                        if (InStr($origin, ".") == 0) {
                            $target_file = $target_dir . replace($target_name, ".@ext", "");
                        } else {
                            $ext = splitVB($origin, ".")[count(splitVB($origin, ".")) - 1];
                            //echo "ext=" . $ext;
                            $target_file = $target_dir . replace($target_name, "@ext", $ext);
                        }
                    } else {
                        $target_file = $target_dir . $target_name;
                    }
                }
                $target_file = replace($base_root . '/' . $target_file, "//", "/");
                $target_file = my_physical_path($target_file);
                $target_file0 = $target_file;
                if ($forMax >= 2) {
                    //한개 필드에 멀티업로드인 경우, 파일명을 동적으로 변경해야함. 그래서 4자리 랜덤(문자/숫자혼용) 추가.
                    $extension = pathinfo($target_file, PATHINFO_EXTENSION);
                    $target_file = Left($target_file0, Len($target_file0) - Len($extension) - 1) . generateRandomCode() . ".$extension";
                }
                $target_file = replace($target_file, '+', '');

                //$target_url = "/" . replace($target_file, $base_root, "");
                $target_url = my_url_path(replace($target_file, $base_root . '/', '/'));
                $extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
                if (InStr($dangerExt, ".$extension.") > 0) {
                    $target_file = $target_file . ".@DANGER.txt";
                    $target_url = $target_url . ".@DANGER.txt";
                }

                $sql_ms = $sql_ms . " 
                set @midx=0
                select top 1 @midx=midx from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' order by idx desc
                if not exists(select * from MisAttachList where idx=@midx) set @midx=0
                set @midx2 = @midx
                if @midx=0 set @midx = 1+case when IDENT_CURRENT('MisAttachList')=1 then (select count(*) from MisAttachList) else IDENT_CURRENT('MisAttachList') end

                update MisAttachList set midx=@midx where @midx>isnull(@midx2,0) and excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName';

                delete from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' 
                and Grid_FieldName=N'$fieldName' and '$v'='';

                ";

                //and Grid_FieldName=N'$fieldName' and '$v'='';

                $sql_my = $sql_my . " 
                select @midx:=0;
                select @idx:=0;
                select @midx:=midx, @idx:=idx from MisAttachList where excel_idxname='$upload_key' and idxnum='$upload_idx' and table_m='$table_m' and Grid_FieldName='$fieldName' order by idx desc limit 1; 
                select @midx2:=@midx;
                -- select @idx:=idx from MisAttachList where idx=@midx;
                SELECT @midx:=AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = 'MisAttachList' and TABLE_SCHEMA='$base_db2' and (@idx is null or @idx=0 or @midx is null or @midx=0);
                SELECT @midx:=case when @midx<(max(idx)+1) then max(idx)+1 else @midx end from MisAttachList;
                
                update MisAttachList set midx=@midx where @midx>ifnull(@midx2,0) and excel_idxname='$upload_key' and idxnum='$upload_idx' and table_m='$table_m' 
                and Grid_FieldName='$fieldName' and '$v'<>'';

                delete from MisAttachList where excel_idxname='$upload_key' and idxnum='$upload_idx' and table_m='$table_m' 
                and Grid_FieldName='$fieldName' and '$v'='';
                
                ";
                if (InStr($sql_oc, "attachUrl varchar2") == 0) {
                    $sql_oc = $sql_oc . " 
                    declare
                    attachUrl varchar2(1000);
                    attachName varchar2(100);
                    fileList varchar2(5000);
                        v_midx int;
                        v_midx2 int;
                        v_idx int;
                        v_cnt int;
                        v_max int;
                    BEGIN
                    
                        v_midx:=0;
                        v_idx:=0;
                        select midx into v_midx from (select midx from MisAttachList where excel_idxname=N'$upload_key' 
                        and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' order by idx desc)
                        aaa RIGHT OUTER JOIN DUAL ON 1=1 where rownum=1;
                        
                        v_midx2:=v_midx;
                        select idx into v_idx from (select idx from MisAttachList where idx=midx) aaa RIGHT OUTER JOIN DUAL ON 1=1 where rownum=1;
                        
                        select nvl(max_idx,0)+1 into v_max from (select max(idx) as max_idx from MisAttachList) aaa RIGHT OUTER JOIN DUAL ON 1=1 where rownum=1;

                        if v_midx is null or v_midx=0 or v_idx is null or v_idx=0 then
                        select v_max into v_midx from dual;
                        end if;
                        
                        select count(*) into v_cnt from USER_SEQUENCES  where SEQUENCE_NAME='MISATTACHLIST_SEQ'; 
                        if v_cnt=1 then 
                        execute immediate 'drop sequence MISATTACHLIST_SEQ';
                        end if;
                        execute immediate 'create sequence MISATTACHLIST_SEQ START WITH ' || v_max;
                    ";
                }
                $sql_oc = $sql_oc . " 
                
                update MisAttachList set midx=v_midx where v_midx>nvl(v_midx2,0) and excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' 
                and Grid_FieldName=N'$fieldName' and '$v'<>'';
                
                delete from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' 
                and Grid_FieldName=N'$fieldName' and '$v'='';
            
                ";

                /* 불필요로로 추정. 차후 삭제할 것.
                if(isset($request_body)) {
                    $data = $request_body;
                } else {
                    $request_body = file_get_contents('php://input');
                    $data = json_decode($request_body);
                }
                */

                //수정이면서 신규파일이 아닌 경우 설정에 의한 경로가 아니라 DB 저장에 의한 경로로 따져야 함.
                $filePath = $tmpFilePath . $k . "/" . $origin;
                if ($ActionFlag == 'modify' && !file_exists($filePath) && $origin != "") {
                    $target_url_sql = "select attachUrl from MisAttachList where 
        excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' and attachName=N'$origin'
        ";
                    $target_url = onlyOnereturnSql_gate($target_url_sql, $dbalias);
                    $target_file = replace($base_root . '/' . $target_url, '//', '/');
                }
                //템프에 파일이 존재한다는 것은 신규로 올린 파일임.
                if (file_exists($filePath) && $origin != "") {


                    $upload_size = filesize($filePath);
                    $finfo = finfo_open(FILEINFO_MIME_TYPE);
                    $attachMime = finfo_file($finfo, $filePath);


                    //echo $filePath; exit;
                    //echo $target_file; exit;
                    if (file_exists($target_file))
                        unlink($target_file);
                    $dir_name = dirname($target_file);
                    if (!is_dir($dir_name)) {
                        //echo $dir_name;
                        mkdir($dir_name, 0777, true);
                    }
                    //echo $filePath . ' ------ ' . $target_file;
                    $extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
                    if (InStr($dangerExt, ".$extension.") > 0) {
                        $target_file = $target_file . ".@DANGER.txt";
                    }

                    //파일을 이동시킨다 : php 에서는 move 없음. copy 가 안전.
                    //$target_file = $target_file;$dangerExt
                    if (copy($filePath, $target_file)) {
                        //chown($tmpFilePath,465);
                        //save_writeBefore / save_updateBefore 에서의 파일분석을 위해 삭제보류
                        //unlink($filePath);
                        $tempFileList = $tempFileList . $tmpFilePath . $k . '/' . $origin . ';';
                    }


                    $sql_ms = $sql_ms . " 
                    delete from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' and attachUrl=N'" . sqlValueReplace($target_url) . "'
                    insert into MisAttachList (midx,table_m,Grid_FieldName,excel_idxname,idxnum,attachName,attachMime,attachUrl,attachSize,IP,wdater) 
                    select @midx, N'$table_m', N'$fieldName', N'$upload_key', N'$upload_idx', N'$origin', N'$attachMime', N'" . sqlValueReplace($target_url) . "', $upload_size, '$ServerVariables_REMOTE_ADDR', N'$MisSession_UserID'
                    ";

                    $sql_my = $sql_my . " 
                    delete from MisAttachList where excel_idxname='$upload_key' and idxnum='$upload_idx' and table_m='$table_m' and Grid_FieldName='$fieldName' and attachUrl='" . sqlValueReplace($target_url) . "';
                    insert into MisAttachList (midx,table_m,Grid_FieldName,excel_idxname,idxnum,attachName,attachMime,attachUrl,attachSize,IP,wdater)
                    select @midx, '$table_m', '$fieldName', '$upload_key', '$upload_idx', '$origin', '$attachMime', '" . sqlValueReplace($target_url) . "', $upload_size, '$ServerVariables_REMOTE_ADDR', '$MisSession_UserID';
                    ";

                    $sql_oc = $sql_oc . " 
                    delete from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' 
                    and Grid_FieldName=N'$fieldName' and attachUrl=N'" . sqlValueReplace($target_url) . "';
                    insert into MisAttachList (idx, midx,table_m,Grid_FieldName,excel_idxname,idxnum,attachName,attachMime,attachUrl,attachSize,IP,wdater)
                    select MISATTACHLIST_SEQ.NEXTVAL, v_midx, N'$table_m', N'$fieldName', N'$upload_key', N'$upload_idx', N'$origin', N'$attachMime', N'" . sqlValueReplace($target_url) . "'
                    , $upload_size, '$ServerVariables_REMOTE_ADDR', N'$MisSession_UserID' from dual;
                    ";


                    /*
                    echo "tmpFilePath=" . $tmpFilePath . "\n";
                    echo "origin=" . $origin . "\n";
                    echo "dir_name=" . $dir_name . "\n";
                    echo "table_m=" . $table_m . "\n";
                    echo "fieldName=" . $fieldName . "\n";
                    echo "upload_key=" . $upload_key . "\n";
                    echo "upload_idx=" . $upload_idx . "\n";
                    echo "upload_field=" . $upload_field . "\n";
                    echo "target_url=" . $target_url . "\n";
                    echo "target_file=" . $target_file . "\n";
                    exit;
                    */


                } else if (file_exists($target_file)) {
                    //이미 업로드된 파일이며, 변화가 없다는 사실만 update 시킨다. 
                    //echo "이미 업로드된 파일이며, 변화가 없다는 사실만 update 시킨다. = " . $target_file;
                    $sql_ms = $sql_ms . " 
                    update MisAttachList set useflag='1' where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' 
                    and attachUrl=N'" . sqlValueReplace($target_url) . "'
                    ";

                    $sql_oc = $sql_oc . " 
                    update MisAttachList set useflag='1' where excel_idxname='$upload_key' and idxnum='$upload_idx' and table_m='$table_m' and Grid_FieldName='$fieldName' 
                    and attachUrl='" . sqlValueReplace($target_url) . "';
                    ";
                    $sql_my = $sql_my . " 
                    update MisAttachList set useflag='1' where excel_idxname='$upload_key' and idxnum='$upload_idx' and table_m='$table_m' and Grid_FieldName='$fieldName' 
                    and attachUrl=N'" . sqlValueReplace($target_url) . "';
                    ";

                }


            }

            //마지막으로 삭제파일을 delete 하고, 해당필드에 여러파일들을 나열시키는 커서실행.
            $sql_ms = $sql_ms . " 

        delete from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' and useflag='2' 

        
        
        set @fileList = '';
        DECLARE Mis_CUR CURSOR FOR  
        
        select isnull(attachName,'') as attachName from MisAttachList where midx=@midx
        order by idx
        
        
        Open Mis_CUR
        
        FETCH NEXT FROM Mis_CUR INTO @attachName
        WHILE @@FETCH_STATUS = 0 
        BEGIN   
        
        if(@fileList='') set @fileList = @attachName
        else set @fileList = @fileList + ','+@attachName
        
        FETCH NEXT FROM Mis_CUR INTO @attachName
        
        END 
        
        CLOSE Mis_CUR
        
        DEALLOCATE Mis_CUR
        
        
        update $table_m  set $fieldName=@fileList, " . $fieldName . "_midx = @midx from $table_m table_m 
        where $upload_real_field=N'$upload_idx'

        if(@fileList<>'' and ''<>'$v')
        insert into MisTempSql (uniqueKey, tempSql, remark) values 
        (N'$tempDir', 'update " . $table_m . " set $fieldName = N''' + @fileList + ''', " . $fieldName . "_midx = ' + convert(nvarchar(7),@midx) + ' 
        from $table_m table_m where " . replace($upload_real_field, "'", "''") . " = N''$upload_idx''', N'새로입력 시, 첨부파일 동기화 쿼리');
        
        ";


            if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {

                $sql_my = $sql_my . " delete from MisAttachList where excel_idxname='$upload_key' and idxnum='$upload_idx' and table_m='$table_m' and Grid_FieldName='$fieldName' and useflag='2'; ";
                /*
                               echo "===아래===========
                   $sql_my

                   =====위=====
                   ";
               */

                execSql_gate($sql_my, $dbalias);


                $sql = "select midx from MisAttachList where excel_idxname='$upload_key' and idxnum='$upload_idx' and table_m='$table_m' and Grid_FieldName='$fieldName' order by idx desc limit 1;";
                $midx = onlyOnereturnSql_gate($sql, $dbalias);


                if ($midx != "") {
                    $sql = " select ifnull(attachName,'') as attachName from MisAttachList where midx=$midx and useflag=1 order by idx; ";
                    //echo $sql;
                    //exit;
                    $mm = 0;
                    $fileList = '';
                    $all_fileList = ";";  //같은필드 누적 방지용

                    $mysqli = new mysqli($DbServerName2, $DbID2, $DbPW2, $base_db2);
                    $mysqli->set_charset("utf8");
                    $result = $mysqli->query($sql);
                    $row = $result->fetch_all(MYSQLI_ASSOC);

                    $cnt_row = count($row);
                    while ($mm < $cnt_row) {
                        $attachName = $row[$mm]["attachName"];
                        foreach ($saveUploadList as $key => $value) {
                            if ($Grid_Select_Field[$key] == $fieldName) {
                                $attachName = $value;
                            }
                        }
                        $all_fileList = $all_fileList . $attachName . ';';
                        if ($fileList == "") {
                            $fileList = $attachName;
                        } else {
                            if (InStr($all_fileList, ';' . $attachName . ';') == 0)
                                $fileList = $fileList . ',' . $attachName;
                        }
                        ++$mm;
                    }

                    $result->close();

                    //$sql_my = "update $table_m set $fieldName='$fileList', " . $fieldName . "_midx = $midx from $table_m table_m where $upload_real_field=N'$upload_idx';";
                    $sql_my = "update $table_m set $fieldName='$fileList', " . $fieldName . "_midx = $midx where $upload_real_field=N'$upload_idx';";
                    if ($fileList != '' and '' <> '$v')
                        $sql_my = $sql_my . "
                    insert into MisTempSql (uniqueKey, tempSql, remark) values 
                    ('$tempDir', 'update $table_m set $fieldName = ''$fileList'', " . $fieldName . "_midx = $midx 
                    where " . replace($upload_real_field, "'", "''") . " = ''$upload_idx'';', '새로입력 시, 첨부파일 동기화 쿼리');
                    ";
                    //echo $sql_my;exit;
                    if (execSql_gate($sql_my, $dbalias)) {
                        //echo '[{"result":"파일 관련 저장 완료."}]';
                    } else {
                        echo '[{"result":"파일 관련 저장 실패."}]';
                        exit;
                    }
                    $sql_my = '';
                }

            }


            if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {

                $sql_oc = $sql_oc . " 
                delete from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' and useflag='2'; 
            end;
            ";

                /*        
                echo "===아래===========
                $sql_oc

                =====위=====
                ";
                */
                execSql_db2_oracle($sql_oc);


                $sql = "select midx from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' 
                and Grid_FieldName=N'$fieldName' and rownum=1 order by idx desc";

                $midx = onlyOnereturnSql_db2_oracle($sql);

                //오라클만 다른 로직!!!!
                if ($midx != "") {
                    $sql = " select nvl(attachName,'') as \"attachName\" from MisAttachList where midx=$midx and useflag=1 order by idx ";

                    $mm = 0;
                    $fileList = '';
                    $all_fileList = ";";  //같은필드 누적 방지용

                    $stmt = $database2->query($sql);
                    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);

                    $cnt_row = count($row);
                    while ($mm < $cnt_row) {
                        $attachName = $row[$mm]["attachName"];
                        foreach ($saveUploadList as $key => $value) {
                            if ($Grid_Select_Field[$key] == $fieldName) {
                                $attachName = $value;
                            }
                        }
                        $all_fileList = $all_fileList . $attachName . ';';
                        if ($fileList == "") {
                            $fileList = $attachName;
                        } else {
                            if (InStr($all_fileList, ';' . $attachName . ';') == 0)
                                $fileList = $fileList . ',' . $attachName;
                        }
                        ++$mm;
                    }


                    $sql_oc = "update  $table_m set $fieldName='$fileList', " . $fieldName . "_midx = $midx from $table_m table_m where $upload_real_field='$upload_idx';";
                    if ($fileList != '' and '' <> '$v')
                        $sql_oc = $sql_oc . "
                    insert into MisTempSql (idx, uniqueKey, tempSql, remark) values 
                    (MISTEMPSQL_SEQ.NEXTVAL, N'$tempDir', 'update $table_m set $fieldName = N''$fileList'', " . $fieldName . "_midx = $midx 
                    from $table_m table_m where " . replace($upload_real_field, "'", "''") . " = N''$upload_idx'';', N'새로입력 시, 첨부파일 동기화 쿼리');
                    ";

                    if (execSql_db2_oracle($sql_oc)) {
                        //echo '[{"result":"파일 관련 저장 완료."}]';
                    } else {
                        echo '[{"result":"파일 관련 저장 실패."}]';
                        exit;
                    }

                }
                $sql_oc = '';
            }

        }
        //for end -------------------------------------------------------------------------------


        if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {



        } else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {



        } else {
            //echo $sql_ms; exit;
            if (execSql_gate($sql_ms, $dbalias)) {
                //echo '[{"result":"파일 관련 저장 완료."}]';
            } else {
                echo '[{"resultMessage":"파일 관련 저장 실패."}]';
                exit;
            }
        }


    }   /******** 첨부가 있거나 삭제 등의 변화가 있을 경우 end *********/

    if (property_exists((object) $viewList, "lastupdate")) {
        if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
            $updateList["lastupdate"] = '_noDDA_CURRENT_TIMESTAMP';
            $key_updateList["lastupdate"] = "lastupdate";
        } else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
            //과제 
        } else {
            $updateList["lastupdate"] = '_noDDA_getdate()';
            $key_updateList["lastupdate"] = "lastupdate";
        }

    }
    if (property_exists((object) $viewList, "lastupdater")) {
        $updateList["lastupdater"] = $MisSession_UserID;
        $key_updateList["lastupdater"] = "lastupdater";
    }




    $whereJson = [];
    $whereJson[$Grid_Select_Field[$key_aliasName] . "[=]"] = $key_value;

    if (count($viewList) == 0) {
        //보고서의 디테일은 viewList 전송을 못함.
        $whereSql = $Grid_Select_Field[$key_aliasName] . "=$Nchar2'" . $key_value . "'";
    } else {
        //새 기능. viewList 까지 전송받아 처리함.
        $whereSql = $Grid_Select_Field[key($viewList)] . "=$Nchar2'" . Trim(reset($viewList)) . "'";
    }

    //$updateList = json_encode($updateList,JSON_UNESCAPED_UNICODE);


    //echo $updateList;

    //$updateList = json_decode($updateList, true);
    if (Left($table_m, 4) == "dbo.")
        $table_m = splitVB($table_m, "dbo.")[1];
}


if (function_exists("save_updateBefore")) {
    save_updateBefore();
}


$result = [];
if ($ActionFlag == 'delete' || $ActionFlag == "kill") {

    $msg = "정상적으로 삭제되었습니다.";
    if (function_exists("save_deleteBefore")) {
        save_deleteBefore();
    }

    $execSql_result = execSql_gate($sql_prev . $sql . $sql_next, $dbalias);
    $resultCode = $execSql_result['resultCode'];
    $resultMessage = $execSql_result['resultMessage'];
    $resultQuery = $execSql_result['resultQuery'];
    $result["resultCode"] = $resultCode;
    $result["resultQuery"] = $resultQuery;

    if ($resultCode == 'fail') {
        $result["resultMessage"] = "삭제가 실패되었습니다. - " . $resultMessage;
    } else {
        $result["resultMessage"] = $msg;
    }

    $result["table_m"] = $table_m;
    $result["sql"] = $sql;

} else if ($ActionFlag == "restore") {


    $execSql_result = execSql_gate($sql, $dbalias);
    $resultCode = $execSql_result['resultCode'];
    $resultMessage = $execSql_result['resultMessage'];
    $resultQuery = $execSql_result['resultQuery'];
    $result["resultCode"] = $resultCode;
    $result["resultQuery"] = $resultQuery;

    if ($resultCode == 'fail') {
        $result["resultMessage"] = "복원이 실패되었습니다. - " . $resultMessage;
    } else {
        $result["resultMessage"] = "정상적으로 복원되었습니다.";
    }

    $result["table_m"] = $table_m;
    $result["query"] = $sql;

} else if ($ActionFlag == 'modify') {

    /* 수정할 경우, 아래와 같이 한글필드이면 false 를 해야 함!!!! */
    $whereJson = json_encode($whereJson, JSON_UNESCAPED_UNICODE);

    if (len($Grid_Select_Field[$key_aliasName]) == uni_len($Grid_Select_Field[$key_aliasName])) {
        $whereJson = json_decode($whereJson, true);
    } else {
        $whereJson = json_decode($whereJson, false);
    }

    $sql = '';

    foreach ($updateList as $key => $value) {

        //virtual_field 일 경우, 최종 저장방지.
        $virtual_field_YN = 'N';
        if (isset($key_updateList[$key])) {
            if (InStr($key_updateList[$key], 'virtual_field') > 0)
                $virtual_field_YN = 'Y';
        }


        if ($virtual_field_YN == 'N') {
            //if(!property_exists((object) $viewList,'virtual_fieldQn' . $key)) {
            if ($sql != '')
                $sql = $sql . ",";

            if (isset($key_updateList[$key])) {
                if (isset($Grid_Schema_Type[$key_updateList[$key]])) {
                    if (Left($Grid_Schema_Type[$key_updateList[$key]], 6) == 'number' && $value == '')
                        $value = '@null';
                    else if ((Left($Grid_CtlName[$key_updateList[$key]], 4) == 'date' || Left($Grid_Schema_Type[$key_updateList[$key]], 6) == 'date') && ($value == '' || Left($value, 4) == '1900'))
                        $value = '@null';

                }
            }
            if (is_numeric(Left($key, 1)))
                $keykey = '[' . $key . ']';
            else
                $keykey = $key;

            if (Left($value, 7) == "_noDDA_")
                $sql = $sql . $keykey . "=" . replace($value, "_noDDA_", "");
            /* ???
            else if(is_numeric($value) && (Left($value,1)!="0" || 'A'.$value=='A0')) {
                $sql = $sql . $key . "=" . sqlValueReplace($value);
            } 
            */
            else if ($value == "@null")
                $sql = $sql . $keykey . "=null";
            else if (InStr($contentList, ";$key;") > 0)
                $sql = $sql . $keykey . "=" . to_clob_delta(sqlValueReplace($value));
            else {
                $same_int = 'N';
                if (is_numeric($value)) {
                    if (Len($value * 1) == Len($value)) {
                        $same_int = 'Y';
                        if (isset($key_updateList[$key])) {
                            if ($Grid_CtlName[$key_updateList[$key]] == 'textarea')
                                $same_int = 'N';
                        }
                    }
                }
                if ($same_int == 'Y') {
                    $sql = $sql . $keykey . "=" . $value;
                } else {
                    $sql = $sql . $keykey . "=$Nchar2'" . sqlValueReplace($value) . "'";
                }
            }

        }
    }
    if (Trim($sql) == '') {
        echo '저장할 수 있는 항목이 지정되어있지 않은 프로그램입니다.';
        exit;
    }

    $sql = ' update ' . $table_m . ' set ' . $sql . " where " . $whereSql . ';';

    if (function_exists("save_updateQueryBefore")) {
        //특정알림을 보낼 경우에도 사용할 수 있는 시점.
        save_updateQueryBefore();
    }
    /*
    print_r($updateList);
    echo "***********";
    echo $sql_prev . $sql . $sql_next;
    exit;
    */
    //echo $sql_prev . $sql . $sql_next . '----' . $dbalias;

    $execSql_result = execSql_gate($sql_prev . $sql . $sql_next, $dbalias);
    $resultCode = $execSql_result['resultCode'];
    $resultMessage = $execSql_result['resultMessage'];
    $resultQuery = $execSql_result['resultQuery'];




    //'{newEditorImageDir}', '/uploadFiles/editorImageDir/" . $table_m . "/" . $upload_idx . "/'
///temp/gadmin_1605284726/contents_editorImage/zzz.png

    if (count($editorUploadKeys) > 0) {
        $sql3 = '';
        $cnt_editorUploadKeys = count($editorUploadKeys);
        for ($i = 0; $i < $cnt_editorUploadKeys; $i++) {
            recursiveCopy($base_root . "/temp/" . $tempDir . "/" . $editorUploadKeys_alias[$i] . "_editorImage", $base_root . "/uploadFiles/editorImageDir/" . $table_m . "/" . $upload_idx);
            if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
                $sql3 = $sql3 . ' update ' . $table_m . ' set ' . $editorUploadKeys[$i] . "=replace(" . dbms_lob_delta($editorUploadKeys[$i]) . ", '{newEditorImageDir}', '$full_site/uploadFiles/editorImageDir/" . $table_m . "/" . $upload_idx . "/') where " . $Grid_Select_Field[$key_aliasName] . " = N'" . $upload_idx . "'; ";
            } else if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
                $sql3 = $sql3 . ' update ' . $table_m . ' set ' . $editorUploadKeys[$i] . "=replace(" . $editorUploadKeys[$i] . ", '{newEditorImageDir}', '$full_site/uploadFiles/editorImageDir/" . $table_m . "/" . $upload_idx . "/') where " . $Grid_Select_Field[$key_aliasName] . " = N'" . $upload_idx . "' ";
            } else {
                $sql3 = $sql3 . ' update ' . $table_m . ' set ' . $editorUploadKeys[$i] . "=replace(convert(nvarchar(max)," . $editorUploadKeys[$i] . "), '{newEditorImageDir}', '$full_site/uploadFiles/editorImageDir/" . $table_m . "/" . $upload_idx . "/') where " . $Grid_Select_Field[$key_aliasName] . " = N'" . $upload_idx . "' ";
            }
        }
        if (!is_dir($base_root . "/uploadFiles/editorImageDir/" . $table_m . "/" . $upload_idx)) {
            mkdir($base_root . "/uploadFiles/editorImageDir/" . $table_m . "/" . $upload_idx, 0777, true);
        }
        execSql_gate($sql3, $dbalias);

    }

    if (function_exists("save_updateAfter")) {
        save_updateAfter();
    }


    if ($parent_gubun != '' && $parent_idx != "") {
        if ($MS_MJ_MY == 'MY') {
            $log_sql = " 
            insert into MisReadList (RealPid, widx, userid, wdater, 자격, readDate, parent_gubun, parent_idx) 
            select '$RealPid', '$key_value', '$MisSession_UserID', '$MisSession_UserID', '수정', now(), $parent_gubun, '$parent_idx'
            WHERE NOT EXISTS (
                select * from (
                    select userid from MisReadList where RealPid='$RealPid' and widx='$key_value' and parent_gubun='$parent_gubun' and parent_idx='$parent_idx' and 자격='수정' order by 1 desc limit 1
                ) aaa where userid='$MisSession_UserID'
            )    
            ";
        } else {
            $log_sql = " 
            if N'$MisSession_UserID'<>(select top 1 userid from MisReadList where RealPid='$RealPid' and widx='$key_value' and parent_gubun='$parent_gubun' and parent_idx='$parent_idx' and 자격='수정' order by 1 desc) begin
                insert into MisReadList (RealPid, widx, userid, wdater, 자격, readDate, parent_gubun, parent_idx) 
                select '$RealPid', N'$key_value', N'$MisSession_UserID', N'$MisSession_UserID', N'수정', getdate(), $parent_gubun, N'$parent_idx'
            end    
            ";
        }
    } else {
        if ($MS_MJ_MY == 'MY') {
            $log_sql = " 
            insert into MisReadList (RealPid, widx, userid, wdater, 자격, readDate) 
            select '$RealPid', '$key_value', '$MisSession_UserID', '$MisSession_UserID', N'수정', now()
            WHERE NOT EXISTS (
                select * from (
                    select userid from MisReadList where RealPid='$RealPid' and widx='$key_value' and 자격='수정' order by 1 desc limit 1
                ) aaa where userid='$MisSession_UserID'
            )    
            ";
        } else {
            $log_sql = " 
            if N'$MisSession_UserID'<>(select top 1 userid from MisReadList where RealPid='$RealPid' and widx='$key_value' and 자격='수정' order by 1 desc) begin
                insert into MisReadList (RealPid, widx, userid, wdater, 자격, readDate) 
                select '$RealPid', N'$key_value', N'$MisSession_UserID', N'$MisSession_UserID', N'수정', getdate()
            end    
            ";
        }
    }


    execSql($log_sql);


    $result["resultCode"] = $resultCode;
    $result["resultQuery"] = $resultQuery;

    if ($resultCode == 'fail') {
        $result["resultMessage"] = "수정이 실패되었습니다. - " . $resultMessage;
    } else {
        if (property_exists((object) $result, 'resultMessage') == false)
            $result["resultMessage"] = "정상적으로 수정되었습니다.";
    }


    //$Grid_Schema_Validation 는 savefield 기능과 관련됨.
    $sql2 = "select aliasName,Grid_Schema_Validation from $MisMenuList_Detail 
    where RealPid='$logicPid' and $isnull(Grid_Schema_Validation,'') like '\"savefield\"%' order by sortelement ";
    $Grid_Schema_Validation = allreturnSql($sql2);

    $readResult_url = "list_json.php?flag=readResult&RealPid=$RealPid&MisJoinPid=$MisJoinPid&idx=$key_value&parent_gubun=&parent_idx=&MSUI=$MisSession_UserID";
    $savefield_sql = '';
    $cnt_Grid_Schema_Validation = count($Grid_Schema_Validation);
    if ($cnt_Grid_Schema_Validation > 0) {
        //echo $full_site.'/_mis/'.$readResult_url;exit;
        $result_data = file_get_contents_new($full_site . '/_mis/' . $readResult_url);
        if (bin2hex(substr($result_data, 0, 2)) === '1f8b') {
            $result_data = gzdecode($result_data);
        }
        $result_data = replace(replace(replace(replace(replace(replace($result_data, '@dda', '"'), '\\\\"', '\\"'), chr(9), ' '), chr(13) . chr(10), ' '), chr(13), ' '), chr(10), ' ');
        if (ord(Left($result_data, 1)) == 239)
            $result_data = Mid($result_data, 2, 99999999);
        //echo $result_data;exit;

        $result_data = json_decode($result_data)[0];
        for ($j = 0; $j < $cnt_Grid_Schema_Validation; $j++) {
            $savefield = json_decode('{' . $Grid_Schema_Validation[$j]['Grid_Schema_Validation'] . '}')->savefield[0];
            $savealias = $Grid_Schema_Validation[$j]['aliasName'];
            $savevalue = sqlValueReplace($result_data->$savealias);
            $savefield_sql = $savefield_sql . "update $table_m set $savefield=N'$savevalue' where " . $whereSql . ';';
        }
        execSql_gate($savefield_sql, $dbalias);
    }

    $result_data = file_get_contents_new($full_site . '/_mis/' . $readResult_url);

    if (bin2hex(substr($result_data, 0, 2)) === '1f8b') {
        $result_data = gzdecode($result_data);
    }
    $result_data = replace(replace(replace(replace(replace($result_data, '"', '\\"'), chr(9), ' '), chr(13) . chr(10), ' '), chr(13), ' '), chr(10), ' ');

    if (ord(Left($result_data, 1)) == 239)
        $result_data = Mid($result_data, 2, 99999999);



    $result["table_m"] = $table_m;
    $result["readResult_url"] = $readResult_url;
    $result["readResult"] = $result_data;
    $result["updateList"] = $updateList;
    $result["whereJson"] = $whereJson;
    if ($devQueryOn == 'Y' || $resultCode == 'fail') {

        $devQuery_all = "
-- update sql :

" . $sql;

        if ($savefield_sql != '') {
            $devQuery_all = $devQuery_all . "


-- savefield sql :
$savefield_sql


-----------------------------------------------
        ";
        }
        createFolder($base_root . "/temp/");
        $rnd = rand(101, 400);

        $devQuery_file = "temp/$full_siteID" . "_" . $RealPid . "_q" . $rnd . ".txt";
        if ($resultCode == 'fail') {
            $devQuery_file = replace($devQuery_file, 'temp/', 'temp/errU_');
        }
        WriteTextFile($base_root . '/' . $devQuery_file, $devQuery_all);
        $result["__devQuery_url"] = '/' . $devQuery_file;
    }

    if (property_exists((object) $result, 'afterScript') == false)
        $result['afterScript'] = $afterScript;

} else if ($ActionFlag == 'write') {

    if (isset($updateList['virtual_fieldQnmisPildokMem'])) {
        $virtual_fieldQnmisPildokMem = $updateList["virtual_fieldQnmisPildokMem"];
        unset($updateList["virtual_fieldQnmisPildokMem"]);
    }

    //오라클의 경우, 자동증가값도 입력값에 포함.
    if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
        $updateList[$key_aliasName] = $upload_idx;
    }

    if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
        //과제
    } else {
        if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
            $sql2 = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = '$table_m' and TABLE_SCHEMA='$base_db2'";
            $newIdx = onlyOnereturnSql_gate($sql2, $dbalias);
            if ($AUTO_INCREMENT_KEY != '') {
                $sql2 = "SELECT max($AUTO_INCREMENT_KEY)+1 from $table_m";
                $newIdx2 = onlyOnereturnSql_gate($sql2, $dbalias);
                if ($newIdx2 > $newIdx) {
                    $newIdx = $newIdx2;
                }
            }
        } else {
            $sql2 = "select IDENT_CURRENT('" . replace($table_m, "dbo.", "") . "')+1";
            $newIdx = onlyOnereturnSql_gate($sql2, $dbalias);
        }

    }
    if (function_exists("save_writeBefore")) {
        save_writeBefore();
    }

    $result["table_m"] = $table_m;
    $result["updateList"] = $updateList;
    $result["whereJson"] = $whereJson;


    $fieldList = '';
    $valueList = '';
    $i = 0;
    foreach ($updateList as $key => $value) {

        $virtual_field_YN = 'N';
        if (isset($key_updateList[$key])) {
            if (InStr($key_updateList[$key], 'virtual_field') > 0)
                $virtual_field_YN = 'Y';
        }


        if ($virtual_field_YN == 'Y') {

        } else {

            if ($fieldList != "") {
                $fieldList = $fieldList . ",";
                $valueList = $valueList . ",";
            }
            $fieldList = $fieldList . $key;

            if (isset($key_updateList[$key])) {
                if (isset($Grid_Schema_Type[$key_updateList[$key]])) {
                    if (Left($Grid_Schema_Type[$key_updateList[$key]], 6) == 'number' && $value == '')
                        $value = '0';
                }
            }
            if (Left($value, 7) == "_noDDA_")
                $valueList = $valueList . replace($value, "_noDDA_", "");
            else if (InStr($contentList, ";$key;") > 0)
                $valueList = $valueList . to_clob_delta(sqlValueReplace($value));
            else if (Left($value, 5) == '@fun!')
                $valueList = $valueList . splitVB($value, '@fun!')[1];
            else
                $valueList = $valueList . "N'" . sqlValueReplace($value) . "'";
        }
    }
    $sql = "insert into " . $table_m . " (" . $fieldList . ") values (" . $valueList . "); ";
    $sql = replace($sql, "N'@null'", "null");
    //echo "upload_idx=$upload_idx;";
//print_r($updateList);
//echo $sql_prev . $sql . $sql_next;

    if (function_exists("save_writeQueryBefore")) {
        save_writeQueryBefore();
    }

    $execSql_result = execSql_gate($sql_prev . $sql . $sql_next, $dbalias);
    $resultCode = $execSql_result['resultCode'];
    $resultMessage = $execSql_result['resultMessage'];
    $resultQuery = $execSql_result['resultQuery'];

    if ($resultCode == 'fail')
        $result["resultMessage"] = $resultMessage;
    else if (property_exists((object) $result, 'resultMessage') == false)
        $result['resultMessage'] = "정상적으로 입력되었습니다.";

    $result['resultCode'] = $resultCode;
    $result['resultQuery'] = $resultQuery;

    if ($devQueryOn == 'Y' || $resultCode == 'fail') {
        $devQuery_all = "
-- insert sql :

$sql_prev

$sql

$sql_next

-----------------------------------------------
        ";
        createFolder($base_root . '/temp/');
        $rnd = rand(101, 400);
        $devQuery_file = "temp/$full_siteID" . "_" . $RealPid . "_q" . $rnd . ".txt";
        if ($resultCode == 'fail') {
            $devQuery_file = replace($devQuery_file, 'temp/', 'temp/errC_');
        }
        WriteTextFile($base_root . '/' . $devQuery_file, $devQuery_all);
        $result["__devQuery_url"] = '/' . $devQuery_file;
    }


    if ($MS_MJ_MY == 'MY') {
        $firstField = onlyOnereturnSql("select Grid_Select_Field from $MisMenuList_Detail where RealPid='" . $logicPid . "' order by SortElement limit 1;");
    } else {
        $firstField = onlyOnereturnSql("select top 1 Grid_Select_Field from $MisMenuList_Detail where RealPid='" . $logicPid . "' order by SortElement");
    }

    if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
        $newIdx = $upload_idx;
    } else {
        if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
            $sql2 = "select " . replace($Grid_Select_Field[$key_aliasName], "table_m.", "") . " from " . $table_m . " order by " . $firstField . " desc limit 1";
        } else {
            $sql2 = "select top 1 " . replace($Grid_Select_Field[$key_aliasName], "table_m.", "") . " from " . $table_m . " order by " . $firstField . " desc";
        }
        $newIdx = onlyOnereturnSql_gate($sql2, $dbalias);
    }

    /* 2021.06.17 까지는 여기에 위치함. 첨부파일 처리후로 옮김.
    if(function_exists("save_writeAfter")) {
        save_writeAfter();
    }
    */


    $sql = '';
    $cnt_editorUploadKeys = count($editorUploadKeys);
    if ($cnt_editorUploadKeys > 0) {
        //echo $base_root . "/temp/" . $tempDir . "_editorImage";
        //echo "<br>" . $base_root . "/uploadFiles/editorImageDir/" . $table_m . "/" . $newIdx;
        //exit;

        //'{newEditorImageDir}', '/uploadFiles/editorImageDir/" . $table_m . "/" . $upload_idx . "/'
        for ($i = 0; $i < $cnt_editorUploadKeys; $i++) {
            recursiveCopy($base_root . "/temp/" . $tempDir . "/" . $editorUploadKeys_alias[$i] . "_editorImage", $base_root . "/uploadFiles/editorImageDir/" . $table_m . "/" . $newIdx);

            if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
                $sql = $sql . ' update ' . $table_m . ' set ' . $editorUploadKeys[$i] . "=replace(" . $editorUploadKeys[$i] . ", '{newEditorImageDir}', '$full_site/uploadFiles/editorImageDir/" . $table_m . "/" . $newIdx . "/') where " . $Grid_Select_Field[$key_aliasName] . " = N'" . $newIdx . "'; ";
            } else {
                $sql = $sql . ' update ' . $table_m . ' set ' . $editorUploadKeys[$i] . "=replace(convert(nvarchar(max)," . $editorUploadKeys[$i] . "), '{newEditorImageDir}', '$full_site/uploadFiles/editorImageDir/" . $table_m . "/" . $newIdx . "/') where " . $Grid_Select_Field[$key_aliasName] . " = N'" . $newIdx . "' ";
            }
        }
        if (!is_dir($base_root . "/uploadFiles/editorImageDir/" . $table_m . "/" . $newIdx)) {
            mkdir($base_root . "/uploadFiles/editorImageDir/" . $table_m . "/" . $newIdx, 0777, true);
        }
        //if($dbalias!='') {

        execSql_gate($sql, $dbalias);

        //}

    }

    for ($t = 0; $t < count(splitVB($tempFileList, ';')); $t++) {
        if (splitVB($tempFileList, ';')[$t] != '') {
            if (file_exists(splitVB($tempFileList, ';')[$t]))
                unlink(splitVB($tempFileList, ';')[$t]);
        }
    }

    $sql = '';
    if ($RealPid != "xxxspeedmis000974" && $RealPid != "speedmis000979") {
        if ($MS_MJ_MY == 'MY') {
            if ($parent_gubun != '' && $parent_idx != "") {
                $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격, readDate, parent_gubun, parent_idx) 
				values ('$RealPid', '$newIdx', '$MisSession_UserID', '$MisSession_UserID', '작성', now(), $parent_gubun, '$parent_idx'); ";
            } else {
                $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격, readDate) 
				values ('$RealPid', '$newIdx', '$MisSession_UserID', '$MisSession_UserID', '작성', now()); ";
            }
        } else {
            if ($parent_gubun != '' && $parent_idx != "") {
                $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격, readDate, parent_gubun, parent_idx) 
				values (N'$RealPid', N'$newIdx', N'$MisSession_UserID', N'$MisSession_UserID', '작성', getdate(), $parent_gubun, N'$parent_idx') ";
            } else {
                $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격, readDate) 
				values (N'$RealPid', N'$newIdx', N'$MisSession_UserID', N'$MisSession_UserID', '작성', getdate()) ";
            }
        }

        $pushList_flag = "필독";    //
        $pushList_members = '';

        //항상 push 받는 member group : gidx=20.
        $all_push_group = allReturnSql("select userid from MisGroup_Member where gidx=20 and userid in (select UniqueNum from MisUser where allPush_YN='Y' and delchk<>'D');");
        $cnt_aa = count($all_push_group);
        for ($aa = 0; $aa < $cnt_aa; $aa++) {
            if (InStr(',' . $virtual_fieldQnmisPildokMem . ',', ',' . $all_push_group[$aa]['userid'] . ',') == 0) {
                if ($virtual_fieldQnmisPildokMem != '')
                    $virtual_fieldQnmisPildokMem = $virtual_fieldQnmisPildokMem . ',';
                $virtual_fieldQnmisPildokMem = $virtual_fieldQnmisPildokMem . $all_push_group[$aa]['userid'];
            }
        }

        if (function_exists("save_pushList")) {
            //$virtual_fieldQnmisPildokMem 의 userid 를 변경시키거나, virtual_fieldQnmisPildokMem 외에 
            //새로운 $pushList_members 를 입력시킴.
            save_pushList();
        }

        if ($virtual_fieldQnmisPildokMem != "") {


            if ($MS_MJ_MY == 'MY') {

                if ($parent_gubun != '' && $parent_idx != "") {
                    $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격, parent_gubun, parent_idx) 
                    select '$RealPid', '$newIdx', table_m.UniqueNum, '$MisSession_UserID', '필독', $parent_gubun, '$parent_idx'";
                } else {
                    $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격) 
                    select '$RealPid', '$newIdx', table_m.UniqueNum, '$MisSession_UserID', '필독'";
                }

                $sql = $sql . " from MisUser table_m   
                left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum   
                where table_m.delchk<>'D' and ((datediff(table_m.toisa_date,DATE_FORMAT(NOW(), '%Y-%m-%d')<=0) or lTrim(ifnull(table_m.toisa_date,''))='') and ifnull(table_m.isRest,'')<>'Y'
                and table_m.UniqueNum in ('" . replace($virtual_fieldQnmisPildokMem, ",", "','") . "') 
                and table_m.UniqueNum <> '$MisSession_UserID'
                order by table_Station_NewNum.AutoGubun, table_m.positionNum; ";
            } else {

                if ($parent_gubun != '' && $parent_idx != "") {
                    $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격, parent_gubun, parent_idx) 
                    select N'$RealPid', N'$newIdx', table_m.UniqueNum, N'$MisSession_UserID', N'필독', $parent_gubun, N'$parent_idx'";
                } else {
                    $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격) 
                    select N'$RealPid', N'$newIdx', table_m.UniqueNum, N'$MisSession_UserID', N'필독'";
                }

                $sql = $sql . " from MisUser table_m   
                left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum   
                where table_m.delchk<>'D' and ((datediff(day,table_m.toisa_date,convert(char(10),getdate(),120))<=0) or lTrim(isnull(table_m.toisa_date,''))='') and isnull(table_m.isRest,'')<>'Y'
                and table_m.UniqueNum in (N'" . replace($virtual_fieldQnmisPildokMem, ",", "',N'") . "') 
                and table_m.UniqueNum <> N'$MisSession_UserID'
                order by table_Station_NewNum.AutoGubun, table_m.positionNum; ";
            }

        }


        if ($pushList_members != "") {


            if ($MS_MJ_MY == 'MY') {
                if ($parent_gubun != '' && $parent_idx != "") {
                    $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격, parent_gubun, parent_idx) 
                    select '$RealPid', '$newIdx', table_m.UniqueNum, '$MisSession_UserID', '$pushList_flag', $parent_gubun, '$parent_idx'";
                } else {
                    $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격) 
                    select '$RealPid', '$newIdx', table_m.UniqueNum, '$MisSession_UserID', '$pushList_flag'";
                }
                $sql = $sql . " from MisUser table_m   
            left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum   
            where table_m.delchk<>'D' and ((datediff(table_m.toisa_date,DATE_FORMAT(NOW(), '%Y-%m-%d')<=0) or lTrim(ifnull(table_m.toisa_date,''))='') and ifnull(table_m.isRest,'')<>'Y'
            and table_m.UniqueNum in (N'" . replace($pushList_members, ",", "',N'") . "') 
            and table_m.UniqueNum <> N'$MisSession_UserID'
            order by table_Station_NewNum.AutoGubun, table_m.positionNum ";
            } else {
                if ($parent_gubun != '' && $parent_idx != "") {
                    $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격, parent_gubun, parent_idx) 
                    select N'$RealPid', N'$newIdx', table_m.UniqueNum, N'$MisSession_UserID', N'$pushList_flag', $parent_gubun, N'$parent_idx'";
                } else {
                    $sql = $sql . " insert into MisReadList (RealPid, widx, userid, wdater, 자격) 
                    select N'$RealPid', N'$newIdx', table_m.UniqueNum, N'$MisSession_UserID', N'$pushList_flag'";
                }
                $sql = $sql . " from MisUser table_m   
            left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum   
            where table_m.delchk<>'D' and ((datediff(day,table_m.toisa_date,convert(char(10),getdate(),120))<=0) or lTrim(isnull(table_m.toisa_date,''))='') and isnull(table_m.isRest,'')<>'Y'
            and table_m.UniqueNum in (N'" . replace($pushList_members, ",", "',N'") . "') 
            and table_m.UniqueNum <> N'$MisSession_UserID'
            order by table_Station_NewNum.AutoGubun, table_m.positionNum ";
            }


        }

        if ($virtual_fieldQnmisPildokMem != '') {
            if ($pushList_members != '')
                $virtual_fieldQnmisPildokMem = $virtual_fieldQnmisPildokMem . "," . $pushList_members;
        } else {
            $virtual_fieldQnmisPildokMem = $pushList_members;
        }
        //이메일 & 텔레그램 알림
        if ($virtual_fieldQnmisPildokMem != '') {
            if ($telegram_bot_name != '') {
                $pushSql = " select UniqueNum from MisUser 
                where $isnull(telegram_chat_id,'')<>'' and UniqueNum in (N'" . replace($virtual_fieldQnmisPildokMem, ",", "',N'") . "') and receive_YN in ('T','A') ";
                $pushList = jsonReturnSql($pushSql);
                $pushList = replace(replace(replace($pushList, '"},{"UniqueNum":"', ','), '[{"UniqueNum":"', ''), '"}]', '');
            }
            if ($send_admin_mail != '') {
                $mailSql = " select UniqueNum from MisUser 
                where $isnull(email,'')<>'' and UniqueNum in (N'" . replace($virtual_fieldQnmisPildokMem, ",", "',N'") . "') and receive_YN in ('Y','A') ";
                $mailList = jsonReturnSql($mailSql);
                $mailList = replace(replace(replace($mailList, '"},{"UniqueNum":"', ','), '[{"UniqueNum":"', ''), '"}]', '');
            }

        }


    }






    //필독관련이므로 1차서버임.
    $execSql_result = execSql($sql);


    /*
    기본절차이므로 resultCode 필요없음.
    $resultCode = $execSql_result['resultCode'];
    $resultMessage = $execSql_result['resultMessage'];

    if($resultCode=='fail') $result["resultMessage"] = "입력이 실패되었습니다. - " . $resultMessage;
    else $result["resultMessage"] = "정상적으로 입력되었습니다.";
    */




}


//MisTempSql 는 각 DB 서버에 존재함.
if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {

    $sql = "select ifnull(tempSql,'') as tempSql from MisTempSql where uniqueKey='$tempDir' order by idx; ";

    $mm = 0;
    $tempSql = '';

    try {
        $mysqli = new mysqli($DbServerName2, $DbID2, $DbPW2, $base_db2);
        $mysqli->set_charset("utf8");
        $result_temp = $mysqli->query($sql);
        $row = $result_temp->fetch_all(MYSQLI_ASSOC);

        $cnt_row = count($row);
        while ($mm < $cnt_row) {
            $tempSql = $tempSql . $row[$mm]["tempSql"];
            ++$mm;
        }
    } catch (Exception $e) {
        echo "
    
            $sql
    
            ";
        echo $e->getMessage();
        exit;
    }


    $result_temp->close();

    if ($tempSql != "") {
        $tempSql = $tempSql . " delete from MisTempSql; ";
        execSql_db2_mysql($tempSql);
    }

} else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {

    $sql = "select nvl(tempSql,'') as \"tempSql\" from MisTempSql where uniqueKey=N'$tempDir' order by idx ";


    try {
        $result_temp = $database2->query($sql)->fetchAll(PDO::FETCH_ASSOC);

        $mm = 0;

        $tempSql = '';

        $cnt_result_temp = count($result_temp);
        while ($mm < $cnt_result_temp) {
            $tempSql = $tempSql . $result_temp[$mm]["tempSql"];
            ++$mm;
        }
    } catch (Exception $e) {
        echo "
    
            $sql
    
            ";
        echo $e->getMessage();
        exit;
    }
    if ($tempSql != "") {
        $tempSql = $tempSql . " delete from MisTempSql; ";

        execSql_gate($tempSql, $dbalias);
    }

} else {

    $sql = "select isnull(tempSql,'') as tempSql from MisTempSql where uniqueKey=N'$tempDir' order by idx; ";


    try {
        if ($dbalias != '') {
            $result_temp = $database2->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $result_temp = allreturnSql($sql);
        }
        $mm = 0;

        $tempSql = '';
        $cnt_result_temp = count($result_temp);
        while ($mm < $cnt_result_temp) {
            $tempSql = $tempSql . $result_temp[$mm]["tempSql"];
            ++$mm;
        }
        if ($tempSql != "") {
            $tempSql = $tempSql . " delete from MisTempSql; ";
            execSql_gate($tempSql, $dbalias);
        }
    } catch (Exception $e) {
        echo "
    
            $sql
    
            ";
        echo $e->getMessage();
        exit;
    }

}

//print_r($result);exit;

if ($ActionFlag == 'delete' || $ActionFlag == "kill") {

    if (function_exists("save_deleteAfter")) {
        save_deleteAfter();
    }
}

if ($ActionFlag == 'write') {

    //아래와 같이 위치를 옮김

    if (function_exists("save_writeAfter")) {
        save_writeAfter();
    }

    $result["newIdx"] = $newIdx;
    $result["table_m"] = $table_m;
    $result["insertList"] = $updateList;
    $result["pushList"] = $pushList;
    $result["mailList"] = $mailList;
    $result["afterScript"] = $afterScript;
}
/*
//실험실: 저장 시 로그를 남김.
if(count($updateList)>0) {
    if($ActionFlag=='write') {
        $log_file = "_mis_log/$full_siteID" . "_content_log_" . $RealPid . "_" . $newIdx . "_" . date('Ymd_His') . "_$MisSession_UserID.txt";
    } else {
        $log_file = "_mis_log/$full_siteID" . "_content_log_" . $RealPid . "_" . $key_value . "_" . date('Ymd_His') . "_$MisSession_UserID.txt";
    }
    WriteTextFile($base_root . '/' . $log_file, json_encode($updateList,JSON_UNESCAPED_UNICODE));
}
*/

echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>