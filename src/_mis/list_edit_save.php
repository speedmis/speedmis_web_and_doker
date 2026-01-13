<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php'; ?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php'; ?>
<?php include 'hangeul-utils-master/hangeul_romaja.php'; ?>
<?php
require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use Firebase\JWT\JWT;

if ($MS_MJ_MY == 'MY')
    $addDir = 'MY';
else
    $addDir = '';

error_reporting(E_ALL);
ini_set("display_errors", 1);


accessToken_check();

$pre = requestVB('pre');
$addParam = requestVB('addParam');
$MisMenuList_Detail = 'MisMenuList_Detail';
if ($pre == '1') {
    $MisMenuList_Detail = 'MisMenuList_Detail_pre';
}

$MisJoinPid = requestVB("MisJoinPid");
$RealPid = requestVB("RealPid");
$max_SortElement = requestVB("max_SortElement");

$updateVersion = requestVB("updateVersion");    //웹소스상세내역 일 경우에만 사용; 버전기록용 

if ($MisJoinPid == '')
    $logicPid = $RealPid;
else
    $logicPid = $MisJoinPid;


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


$callback = requestVB("callback");
echo $callback . "(";

$key_aliasName = requestVB("key_aliasName");
$remoteUpdate = requestVB("remoteUpdate");
$updateRealPid = requestVB("updateRealPid");


$inList = "'" . $key_aliasName . "'";

$payload = file_get_contents('php://input');
$models = urldecode(splitVB($payload, "models=")[1]);
$models = json_decode($models, true);
//print_r($models["updated"]);exit;

$updated = $models["updated"];
$created = $models["created"];

if (count($created) == 1) {
    if (isset($created[0]['presql'])) {
        $presql = JWT::decode($created[0]['presql'], 'presql', array('HS256'));

        $apply_full_siteID_YN = "N";
        if (function_exists("apply_full_siteID_YN")) {
            apply_full_siteID_YN();
        }

        if ($apply_full_siteID_YN == 'Y') {
            $presql = apply_full_siteID($presql);
        }

        execSql($presql);
    }
}

foreach ($updated[0] as $k => $v) {

    $inList = $inList . ",'" . $k . "'";
}

$inList = str_replace('_pix_', '', $inList);

if ($remoteUpdate == 'Y' && $RealPid == "speedmis000314") {
    $programCount = onlyOnereturnSql("select count(*) from MisMenuList where RealPid='$updateRealPid' ") * 1;
    if ($programCount > 0) {
        //이미 생성된 프로그램일 경우, 일부필드에 한해서만 업데이트 시킴
        //'idx','rowNumber','idx','RealPid','MenuName','briefTitle','g12','AutoGubun','isMenuHidden','SortG2','SortG4','SortG6','depth','zsangwimenyubyeolbogi','table_new_gidxQngname','new_gidx','table_AuthCodeQnkname','AuthCode','table_MenuTypeQnkname','MenuType','table_MisJoinPidQnMenuName','MisJoinPid','table_upRealPidQnMenuName','upRealPid','AddURL','help_title','help_contents','remark','wdate','table_wdaterQnusername','wdater','lastupdate','table_lastupdaterQnusername','lastupdater','zsangwidanggyejohoe','isCoreProgram'

        //$full_siteID 가 speedmis 가 아니고, 도움말 거부일 경우 제외.
        $help_update_deny = onlyOnereturnSql("select help_update_deny from MisMenuList where RealPid='$updateRealPid' ");
        if ($full_siteID != 'speedmis' && $help_update_deny == '1') {
            $inList = "'idx','rowNumber','idx','RealPid','MenuName','briefTitle','AddURL'";
        } else {
            $inList = "'idx','rowNumber','idx','RealPid','MenuName','briefTitle','AddURL','help_title','help_contents'";
        }
    }
}

if ($MS_MJ_MY == 'MY') {
    $strsql = "
select 
ifnull(g01,'') as g01
,ifnull(g07,'') as g07
,ifnull(g08,'') as g08
,ifnull(g11,'') as g10
,ifnull(g11,'') as g11
,aliasName
,ifnull(Grid_Select_Tname,'') as Grid_Select_Tname
,ifnull(Grid_Select_Field,'') as Grid_Select_Field
,ifnull(Grid_Default,'') as Grid_Default
,ifnull(Grid_MaxLength,'') as Grid_MaxLength
,ifnull(Grid_CtlName,'') as Grid_CtlName 
,ifnull(Grid_ListEdit,'') as Grid_ListEdit
,ifnull(Grid_Schema_Type,'') as Grid_Schema_Type
from $MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where d.RealPid='" . iif($MisJoinPid != "", $MisJoinPid, $RealPid) . "' and aliasName in (" . $inList . iif($key_aliasName == "RealPidAliasName" && $RealPid == 'speedmis000267', ",'idx'", "") . ") 
and Grid_Select_Tname='table_m' and (
    aliasName in ('lastupdate','lastupdater',
    'Grid_View_Class','Grid_View_Fixed','Grid_Enter','Grid_View_XS','Grid_View_SM','Grid_View_MD','Grid_View_LG','Grid_View_Hight',
    '" . iif($key_aliasName == "RealPidAliasName" && $RealPid == 'speedmis000267', "idx", $key_aliasName) . "') 
    or (Grid_MaxLength!='' and Grid_CtlName in ('text','textarea','datepicker','timepicker','datetimepicker','dropdownitem','radio','check','html','dropdownlist','dropdowntree','multiselect'))
)
order by sortelement 
";


} else {
    $strsql = "
select 
isnull(g01,'') as g01
,isnull(g07,'') as g07
,isnull(g08,'') as g08
,isnull(g11,'') as g10
,isnull(g11,'') as g11
,aliasName
,isnull(Grid_Select_Tname,'') as Grid_Select_Tname
,isnull(Grid_Select_Field,'') as Grid_Select_Field
,isnull(Grid_Default,'') as Grid_Default
,isnull(Grid_MaxLength,'') as Grid_MaxLength
,isnull(Grid_CtlName,'') as Grid_CtlName 
,isnull(Grid_ListEdit,'') as Grid_ListEdit
,isnull(Grid_Schema_Type,'') as Grid_Schema_Type
from $MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where d.RealPid='" . iif($MisJoinPid != "", $MisJoinPid, $RealPid) . "' and aliasName in (" . $inList . iif($key_aliasName == "RealPidAliasName" && $RealPid == 'speedmis000267', ",'idx'", "") . ") 
and Grid_Select_Tname='table_m' and (
    aliasName in ('lastupdate','lastupdater',
    'Grid_View_Class','Grid_View_Fixed','Grid_Enter','Grid_View_XS','Grid_View_SM','Grid_View_MD','Grid_View_LG','Grid_View_Hight','" . iif($key_aliasName == "RealPidAliasName" && $RealPid == 'speedmis000267', "idx", $key_aliasName) . "') 
    or (Grid_MaxLength!='' and Grid_CtlName in ('text','textarea','datepicker','timepicker','datetimepicker','dropdownitem','radio','check','html','dropdownlist','dropdowntree','multiselect'))
)
order by sortelement 
";
}


$result = allreturnSql($strsql);
$mm = 0;
//$speed_fieldIndx = [];
$Grid_Default = [];
$Grid_Select_Tname = [];
$Grid_Select_Field = [];
$Grid_Default = [];
$Grid_MaxLength = [];
$Grid_CtlName = [];
$Grid_ListEdit = [];
$Grid_Schema_Type = [];

$pushList = '';
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
    if ($key_aliasName == "RealPidAliasName" && $RealPid == 'speedmis000267' && $aliasName == "idx") {
        $result[$mm]["aliasName"] = "RealPidAliasName";
        $aliasName = "RealPidAliasName";
        $result[$mm]["Grid_Select_Field"] = "RealPidAliasName";
    }
    $Grid_Select_Tname[$aliasName] = $result[$mm]["Grid_Select_Tname"];
    $Grid_Select_Field[$aliasName] = $result[$mm]["Grid_Select_Field"];
    $Grid_Default[$aliasName] = $result[$mm]["Grid_Default"];
    $Grid_MaxLength[$aliasName] = $result[$mm]["Grid_MaxLength"];

    //입력변수는 아니지만 함께저장해야할 필드들.
    if (InStr(";$aliasName;", ';Grid_View_Class;Grid_View_Fixed;Grid_Enter;Grid_View_XS;Grid_View_SM;Grid_View_MD;Grid_View_LG;Grid_View_Hight;') > 0) {
        $Grid_MaxLength[$aliasName] = '0';
    }

    if ($result[$mm]["Grid_CtlName"] == 'radio') {
        $result[$mm]["Grid_CtlName"] = 'dropdownitem';
    }
    $Grid_CtlName[$aliasName] = $result[$mm]["Grid_CtlName"];
    $Grid_ListEdit[$aliasName] = $result[$mm]["Grid_ListEdit"];
    $Grid_Schema_Type[$aliasName] = $result[$mm]["Grid_Schema_Type"];


    //if($Grid_Select_Tname=="table_m") $speed_fieldIndx[$aliasName] = $Grid_Select_Field;

    ++$mm;
}

$updateListAll = [];


$whereJsonAll = [];

$apply_full_siteID_YN = "N";
if (function_exists("apply_full_siteID_YN")) {
    apply_full_siteID_YN();
}


$cnt_updated = count($updated);
for ($i = 0; $i < $cnt_updated; $i++) {

    $saveList = $updated[$i];
    $updateList = [];
    $whereJson = [];
    $whereSql = '';

    $kendo_date_field = ";"; //kendo js 는 무조건 필드에 date 가 있으면 date 형으로 간주해버리는 문제가 있음.

    foreach ($saveList as $k => $v) {
        $kk = replace($k, '_pix_', '');


        if (InStr($kendo_date_field, ";" . $kk . ";") == 0) {



            if (isset($Grid_Select_Field[$kk])) {


                if ($kk == 'rowNumber') {


                } else if ($kk == $key_aliasName) {

                    $whereJson[$Grid_Select_Field[$kk] . "[=]"] = $v;
                    $whereSql = $Grid_Select_Field[$kk] . '=' . $Nchar . "'" . $v . "'";

                    if ($remoteUpdate == 'Y' && $RealPid == "speedmis000314") {
                        $whereSql = 'RealPid=' . $Nchar . "'" . $updateRealPid . "'";
                    }
                } else if ($Grid_MaxLength[$kk] != '' && $Grid_MaxLength[$kk] != '0' || $remoteUpdate == 'Y' && $RealPid == 'speedmis000267' && Left($kk, 5) == 'Grid_') {

                    //echo "\nkk=$kk, Grid_Select_Field.kk=" . $Grid_Select_Field[$kk];
                    $updateList[$Grid_Select_Field[$kk]] = $v;
                    //if($Grid_Schema_Type[$kk]=="date" && $Grid_MaxLength[$kk]=="10") $v = Left($v,10);
                    //if($Grid_Schema_Type[$kk]=="date") {
                    //}
                    //echo "
                    //새:" . $kk . "=" . $v . "::" . $Grid_Select_Field[$kk];



                    if ($remoteUpdate == 'Y' && $RealPid == "speedmis000266") {
                        //서버로직은 file 우선이므로 생성.
                        if ($kk == "addLogic") {
                            $destination = $base_root . '/_mis_addLogic/' . $updateRealPid . '.php';
                            if (file_exists($destination)) {
                                unlink($destination);
                            }
                            if ($v != "") {
                                if ($apply_full_siteID_YN == 'Y') {
                                    $v = apply_full_siteID($v);
                                }
                                WriteTextFile($destination, $v);
                            }
                        } else if ($kk == "addLogic_print") {
                            $destination = $base_root . '/_mis_addLogic/' . $updateRealPid . "_print.html";
                            if (file_exists($destination))
                                unlink($destination);
                            if ($v != "")
                                WriteTextFile($destination, $v);
                        }
                    } else if ($remoteUpdate == 'Y' && $RealPid == "speedmis000989") {
                        //서버로직은 file 우선이므로 생성.
                        if ($kk == "addLogic") {
                            $destination = $base_root . '/_mis_addLogic/' . $updateRealPid . '.php';
                            if (file_exists($destination)) {
                                unlink($destination);
                            }
                            if ($v != "") {
                                if ($apply_full_siteID_YN == 'Y') {
                                    $v = apply_full_siteID($v);
                                }
                                $v = str_replace('@_' . 'q;', '?', $v);
                                WriteTextFile($destination, $v);
                            }
                        } else if ($kk == "addLogic_treat") {
                            $destination = $base_root . '/_mis_addLogic/' . $updateRealPid . '_treat.php';
                            if (file_exists($destination)) {
                                unlink($destination);
                            }
                            if ($v != "") {
                                if ($apply_full_siteID_YN == 'Y') {
                                    $v = apply_full_siteID($v);
                                }
                                $v = str_replace('@_' . 'q;', '?', $v);
                                WriteTextFile($destination, $v);
                            }
                        }
                    }

                }
            }
        }


        if ($k != $kk) {
            $kendo_date_field = $kendo_date_field . $kk . ';';
        }
        ;

    }


    if (property_exists((object) $Grid_Select_Field, "lastupdate"))
        $updateList["lastupdate"] = date("Y-m-d H:i:s");
    if (property_exists((object) $Grid_Select_Field, "lastupdater"))
        $updateList["lastupdater"] = $MisSession_UserID;

    array_push($updateListAll, $updateList);
    array_push($whereJsonAll, $whereJson);

    $whereJson = json_encode($whereJson, JSON_UNESCAPED_UNICODE);

    //아래 두개는 같은 순서와 구조이며, Grid_Schema_Type 만 첫 key 가 idx 인 것에 착안하여 update 문 작성.
    //updateList 에는 실제 필드명, Grid_Schema_Type 에는 alias 로 구성되고 첫 key 가 더 있음.
    /*
    print_r($updateList);
    echo ';;;;;;;;;;;;;';
    print_r($Grid_Schema_Type);
    */


    $sql = '';
    $keys_updateList = array_keys($updateList);
    $keys_Grid_Schema_Type = array_keys($Grid_Schema_Type);
    $keys_Grid_Schema_Type_cnt = count($keys_Grid_Schema_Type);

    foreach ($updateList as $key => $value) {

        if ($sql != '')
            $sql = $sql . ",";
        $position = array_search($key, $keys_updateList);

        if ($position + 1 < $keys_Grid_Schema_Type_cnt) {
            if ($keys_Grid_Schema_Type[$position + 1] == 'boolean') {
                if ($value == 'true')
                    $value = 1;
                else if ($value == 'false')
                    $value = 0;
                $sql = $sql . $key . "=" . iif($value != '', $value, '0');
            } else if (Left($keys_Grid_Schema_Type[$position + 1], 6) == 'number') {
                $sql = $sql . $key . "=" . iif($value != '', $value, 'null');
            } else {
                $sql = $sql . $key . "=$Nchar'" . sqlValueReplace($value) . "'";
            }
        } else {
            $sql = $sql . $key . "=$Nchar'" . sqlValueReplace($value) . "'";
        }

    }

    if ($remoteUpdate == 'Y' && $RealPid == "speedmis000989") {
        $whereSql = 'RealPid=' . $Nchar . "'" . $updateRealPid . "'";
    }

    $sql = " update $table_m set $sql where $whereSql; ";

    if ($MS_MJ_MY == 'MY') {
        if ($remoteUpdate == 'Y' && $RealPid == "speedmis000314") {
            $sql = "insert into $table_m (RealPid) 
            select '$updateRealPid' FROM DUAL WHERE NOT EXISTS (
                select * from $table_m where $whereSql
            ); " . $sql;
        } else if ($remoteUpdate == 'Y' && $RealPid == 'speedmis000267') {
            if ($key_aliasName == "RealPidAliasName") {
                $sql = " update $table_m set lastupdate=current_timestamp() where $whereSql;
                insert into $table_m (RealPid, aliasName, RealPidAliasName) 
                select '$updateRealPid', '" . splitVB(splitVB($whereSql, ".")[1], "'")[0] . "', '" . splitVB($whereSql, "'")[1] . "' FROM DUAL 
                WHERE NOT EXISTS (
                    select * from $table_m where $whereSql
                ); " . $sql;
            }
        }
    } else {
        if ($remoteUpdate == 'Y' && $RealPid == 'speedmis000314') {
            $sql = " if not exists(select * from $table_m where $whereSql) 
            insert into $table_m (RealPid) 
            values ('$updateRealPid') " . $sql;
        } else if ($remoteUpdate == 'Y' && $RealPid == 'speedmis000267') {
            if ($key_aliasName == "RealPidAliasName") {
                $sql = " if not exists(select * from $table_m where $whereSql) begin
                insert into $table_m (RealPid, aliasName, RealPidAliasName) 
                values ('$updateRealPid', '" . splitVB(splitVB($whereSql, ".")[1], "'")[0] . "', '" . splitVB($whereSql, "'")[1] . "') 
                end else begin
                update $table_m set lastupdate=getdate() where $whereSql
                end
                " . $sql;
            }
        }
    }

    $sql = str_replace("Grid_Columns_Width=''", "Grid_Columns_Width=null", $sql);
    //echo ";;;;;;;;;;;;;;; $sql ;;;;;;;;;;;;;;";


    if ($apply_full_siteID_YN == 'Y') {
        $sql = apply_full_siteID($sql);
    }

    execSql_gate($sql, $dbalias);

    if ($remoteUpdate == 'Y' && $RealPid == 'speedmis000314') {
        $MenuType = onlyOnereturnSql("select MenuType from MisMenuList where RealPid='$updateRealPid';");
        if ($MenuType == '11' || $MenuType == '12' || $MenuType == '13') {
            $destination = $base_root . "/_mis_addLogic/updateVersion/updateVersion_" . $updateRealPid . ".txt";
            if (file_exists($destination))
                unlink($destination);
            WriteTextFile($destination, $updateVersion);

            $last_destination = $base_root . "/_mis_addLogic/updateVersion/updateVersion_" . "last.txt";
            $last_updateVersion = ReadTextFile($last_destination);
            if ($last_updateVersion == '')
                $last_updateVersion = 0;
            if ((int) $last_updateVersion < (int) str_replace('MY_', '', $updateVersion)) {
                WriteTextFile($last_destination, $updateVersion);
            }
        }
    }

}


if ($remoteUpdate == 'Y' && $RealPid == 'speedmis000267') {

    if ($MS_MJ_MY == 'MY') {
        $db_time = onlyOnereturnSql("select DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s') from $MisMenuList_Detail 
        where concat(RealPid,'.',aliasName)=" . splitVB($whereSql, "=")[1]);
        if ($db_time == '')
            $db_time = '2001-01-01';
        //SortElement 필드 기준, 중복된 내역 중 과거내역만 삭제시킨다. 
        $sql = "
		delete from $MisMenuList_Detail where RealPid='$updateRealPid' and idx in (
		   SELECT * FROM( SELECT idx FROM $MisMenuList_Detail WHERE RealPid='$updateRealPid' AND SortElement IN (
		   select SortElement
				from $MisMenuList_Detail aaa where idx in (
				select idx from $MisMenuList_Detail where RealPid='$updateRealPid'
				and abs(TIMESTAMPDIFF(SECOND, '2001-01-01', lastupdate))>3
		   ) GROUP BY SortElement HAVING count(SortElement)>1
		   )) kkk
        );
        delete from $MisMenuList_Detail where RealPid='$updateRealPid' and SortElement > $max_SortElement;
        ";
    } else {
        $db_time = onlyOnereturnSql("select convert(char(19), lastupdate, 120) from $MisMenuList_Detail where RealPid+'.'+aliasName=" . splitVB($whereSql, "=N")[1]);
        if ($db_time == '')
            $db_time = '2001-01-01';
        //SortElement 필드 기준, 중복된 내역 중 과거내역만 삭제시킨다. 
        $sql = "
        delete $MisMenuList_Detail where RealPid='$updateRealPid' and idx in (
            select idx from (
                select idx, SortElement, (select COUNT(*) from $MisMenuList_Detail where RealPid='$updateRealPid' and SortElement=aaa.SortElement) as cnt from $MisMenuList_Detail aaa where idx in (
                    select idx from $MisMenuList_Detail where RealPid='$updateRealPid'
                    and abs(DATEDIFF(SECOND, lastupdate, '$db_time'))>3
                )
            ) bbb where cnt>1
        )
        delete $MisMenuList_Detail where RealPid='$updateRealPid' and SortElement > $max_SortElement
        ";
    }
    //마지막에 사용된 $whereSql 로 시간끌어와서, 특이시간은 제거.

    $apply_full_siteID_YN = "N";
    if (function_exists("apply_full_siteID_YN")) {
        apply_full_siteID_YN();
    }

    if ($apply_full_siteID_YN == 'Y') {
        $sql = apply_full_siteID($sql);
    }

    execSql($sql);

    createFolder($base_root . "/_mis_addLogic/updateVersion");   //존재하면 생성안함.
    $destination = $base_root . "/_mis_addLogic/updateVersion/updateVersion_" . $updateRealPid . ".txt";
    if (file_exists($destination))
        unlink($destination);
    WriteTextFile($destination, $updateVersion);

    $last_destination = $base_root . "/_mis_addLogic/updateVersion/updateVersion_" . "last.txt";
    $last_updateVersion = ReadTextFile($last_destination);
    if ($last_updateVersion == '')
        $last_updateVersion = 0;


    if ((int) $last_updateVersion < (int) str_replace('MY_', '', $updateVersion)) {
        WriteTextFile($last_destination, $updateVersion);
    }

}

if ($remoteUpdate == 'Y' && $RealPid == "speedmis000989") {

    $destination = $base_root . "/_mis_addLogic/updateVersion/updateVersion_" . $updateRealPid . ".txt";
    if (file_exists($destination))
        unlink($destination);
    WriteTextFile($destination, $updateVersion);

    $last_destination = $base_root . "/_mis_addLogic/updateVersion/updateVersion_" . "last.txt";
    $last_updateVersion = ReadTextFile($last_destination);
    if ($last_updateVersion == '')
        $last_updateVersion = 0;
    if ((int) $last_updateVersion < (int) str_replace('MY_', '', $updateVersion)) {
        WriteTextFile($last_destination, $updateVersion);
    }

}

/* 수정할 경우, 아래와 같이 한글필드이면 false 를 해야 함!!!! */
/*
    $whereJsonAll = json_encode($whereJsonAll, JSON_UNESCAPED_UNICODE);
    if(len($key_aliasName)==uni_len($key_aliasName)) {
        $whereJsonAll = json_decode($whereJsonAll, true);
    } else {
        $whereJsonAll = json_decode($whereJsonAll, false);
    }


    $database->update($table_m, $updateListAll, $whereJsonAll);

$whereJson = json_encode($whereJson, JSON_UNESCAPED_UNICODE);
if(len($key_aliasName)==uni_len($key_aliasName)) {
    $whereJson = json_decode($whereJson, true);
} else {
    $whereJson = json_decode($whereJson, false);
}
$database->update($table_m, $updateList, $whereJson);
*/

//echo json_encode($models, true);
$updateList["참고_models"] = $models;

echo json_encode($updateList, true);

echo ")";

?>