<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php'; ?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php'; ?>
<?php include 'hangeul-utils-master/hangeul_romaja.php'; ?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

if ($MS_MJ_MY == 'MY')
    $addDir = 'MY';
else
    $addDir = '';



$ActionFlag = requestVB('ActionFlag');

$MisSession_UserID = '';
accessToken_check();

$pre = requestVB('pre');
$addParam = requestVB('addParam');
$MisMenuList_Detail = 'MisMenuList_Detail';
if ($pre == '1') {
    $MisMenuList_Detail = 'MisMenuList_Detail_pre';
}

if (isset($_GET["idx"]))
    $idx = $_GET["idx"];
else
    $idx = '';

if (isset($_GET["RealPid"]))
    $RealPid = $_GET["RealPid"];
else
    $RealPid = '';

if (isset($_GET["MisJoinPid"]))
    $MisJoinPid = $_GET["MisJoinPid"];
else
    $MisJoinPid = '';

if ($MisJoinPid == '')
    $logicPid = $RealPid;
else
    $logicPid = $MisJoinPid;

$remote_MS_MJ_MY = requestVB('remote_MS_MJ_MY');
$selCode = requestVB('selCode');


if ($MS_MJ_MY == 'MY') {
    $sql = "select concat(ifnull(g08,''),'@',ifnull(dbalias,'')) from MisMenuList where RealPid='" . $logicPid . "'";

} else {
    $sql = "select isnull(g08,'')+'@'+isnull(dbalias,'') from MisMenuList where RealPid='" . $logicPid . "'";
}
$temp = splitVB(onlyOnereturnSql($sql), "@");

$table_m = $temp[0];
$dbalias = $temp[1];




if (isset($_GET["aliasName"]))
    $aliasName0 = $_GET["aliasName"];
else
    $aliasName0 = '';

if (isset($_GET["blank"]))
    $blank = $_GET["blank"];
else
    $blank = '';


if (isset($_GET["default_value"])) {
    $default_value = $_GET["default_value"];
} else {
    $default_value = '';
}
if (isset($_GET["parent_gubun"]))
    $parent_gubun = $_GET["parent_gubun"];
else
    $parent_gubun = '';

if (isset($_GET["parent_idx"]))
    $parent_idx = $_GET["parent_idx"];
else
    $parent_idx = '';

if (isset($_GET["allFilter"]))
    $allFilter = $_GET["allFilter"];
else
    $allFilter = '';

if (isset($_GET["itemList"]))
    $itemList = str_replace('[]', '', $_GET["itemList"]);
else
    $itemList = '';

$keyword = requestVB('filter');


$isMobile = isMobile();
$cache_path = '';
$lastUpdateTime = onlyOnereturnSql_gate("select max(lastupdate) FROM $table_m", $dbalias);
$ServerVariables_URL = $lastUpdateTime . $pre . $addParam . $idx . $selCode . $aliasName0 . $blank . $default_value . $parent_gubun . $parent_idx . $allFilter . $itemList . json_encode($keyword, JSON_UNESCAPED_UNICODE);

$cache_url = "list_grid_items.U.$MisSession_UserID.isMobile_$isMobile.RealP.$RealPid.JoinP.table.$table_m.$MisJoinPid.MD5." . md5($ServerVariables_URL) . '.html';
$cache_path = '../_mis_cache/' . $cache_url;

if (file_exists($cache_path)) {
    //아직 <html> 출력도 안된 시점임.
    echo ReadTextFile($cache_path);
    exit;
}
ob_start();



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
    $isnull = 'ifnull';
} else if ($remote_MS_MJ_MY == 'MY') {
    $isnull = 'ifnull';
    $MS_MJ_MY = $MS_MJ_MY2;
    $DbServerName = $DbServerName2;
    $base_db = $base_db2;
    $DbID = $DbID2;
    $DbPW = $DbPW2;
} else {
    $isnull = 'isnull';
}
/* MS_MJ_MY 셋트 end */



if ($itemList != '') {
    $itemList = str_replace('"}]', "'", str_replace('"},{"value":"', "','", str_replace('[{"value":"', "'", $itemList)));
}


if ($keyword != '') {
    if (array_key_exists('filters', $keyword) == 1) {
        $keyword = $keyword['filters'][0]['value'];
    } else {
        $keyword = '';
    }
}

/* 서버 로직 start */
if (file_exists('../_mis_addLogic/' . $logicPid . '.php'))
    include '../_mis_addLogic/' . $logicPid . '.php';
/* 서버 로직 end */

if ($MS_MJ_MY == 'MY') {
    $strsql = "
select 
m.menuName
,ifnull(g01,'') as g01
,ifnull(g04,'') as g04
,ifnull(g05,'') as g05
,ifnull(g06,'') as g06
,ifnull(g07,'') as g07
,ifnull(g08,'') as g08
,ifnull(g09,'') as g09
,ifnull(g10,'') as g10
,ifnull(g11,'') as g11
,ifnull(g12,'') as g12
,ifnull(dbalias,'') as dbalias
,aliasName
,Grid_Columns_Title
,SortElement as SortElement
,ifnull(Grid_FormGroup,0) as Grid_FormGroup
,ifnull(Grid_Columns_Width,'') as Grid_Columns_Width
,ifnull(Grid_Align,'') as Grid_Align
,ifnull(Grid_Orderby,'') as Grid_Orderby
,ifnull(Grid_MaxLength,'') as Grid_MaxLength
,ifnull(Grid_Default,'') as Grid_Default
,ifnull(Grid_Select_Tname,'') as Grid_Select_Tname
,ifnull(Grid_Select_Field,'') as Grid_Select_Field
,ifnull(Grid_GroupCompute,'') as Grid_GroupCompute
,ifnull(Grid_CtlName,'') as Grid_CtlName 
,ifnull(Grid_IsHandle,'') as Grid_IsHandle
,ifnull(Grid_Schema_Validation,'') as Grid_Schema_Validation
,ifnull(Grid_PrimeKey,'') as Grid_PrimeKey
,ifnull(Grid_Alim,'') as Grid_Alim
,ifnull(Grid_Pil,'') as Grid_Pil 
,ifnull(Grid_Items,'') as Grid_Items 
,ifnull(Grid_Schema_Type,'') as Grid_Schema_Type
from $MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where (d.sortelement<>99 or ifnull(d.Grid_Select_Field,'')!='') and d.RealPid='" . $logicPid . "'  
order by sortelement;
    ";
} else {
    $strsql = "
select 
m.menuName
,isnull(g01,'') as g01
,isnull(g04,'') as g04
,isnull(g05,'') as g05
,isnull(g06,'') as g06
,isnull(g07,'') as g07
,isnull(g08,'') as g08
,isnull(g09,'') as g09
,isnull(g10,'') as g10
,isnull(g11,'') as g11
,isnull(g12,'') as g12
,isnull(dbalias,'') as dbalias
,aliasName
,Grid_Columns_Title
,SortElement as SortElement
,isnull(Grid_FormGroup,'') as Grid_FormGroup
,isnull(Grid_Columns_Width,'') as Grid_Columns_Width
,isnull(Grid_Align,'') as Grid_Align
,isnull(Grid_Orderby,'') as Grid_Orderby
,isnull(Grid_MaxLength,'') as Grid_MaxLength
,isnull(Grid_Default,'') as Grid_Default
,isnull(Grid_Select_Tname,'') as Grid_Select_Tname
,isnull(Grid_Select_Field,'') as Grid_Select_Field
,isnull(Grid_GroupCompute,'') as Grid_GroupCompute
,isnull(Grid_CtlName,'') as Grid_CtlName 
,isnull(Grid_IsHandle,'') as Grid_IsHandle
,isnull(Grid_Schema_Validation,'') as Grid_Schema_Validation
,isnull(Grid_PrimeKey,'') as Grid_PrimeKey
,isnull(Grid_Alim,'') as Grid_Alim
,isnull(Grid_Pil,'') as Grid_Pil 
,isnull(Grid_Items,'') as Grid_Items 
,isnull(Grid_Schema_Type,'') as Grid_Schema_Type
from $MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where (d.sortelement<>99 or isnull(d.Grid_Select_Field,'')!='') and d.RealPid='" . $logicPid . "'  
order by sortelement;
    ";
}

if ($ActionFlag == 'write' && ($idx != "0" || $idx != "")) {
    //참조입력일 경우, 첨부파일은 끌어오지 않는다.
    $strsql = str_replace("where d.RealPid", "where isnull(Grid_CtlName,'')<>'attach' and d.RealPid", $strsql);
}

//echo  $strsql;
//exit;
$contentList = ";";
$selectQuery = '';
$table_m = '';
$join_sql = '';
$where_sql = "where 9=9 ";
if ($MisSession_UserID == "") {
    $stop_YN = "Y";
    //list_json_stop_YN 는 top_addLogic.php 에 존재
    if (function_exists("list_json_stop_YN")) {
        list_json_stop_YN();
    }
    if ($stop_YN == "Y") {
        $where_sql = $where_sql . " and 111=999 ";
        $afterScript = 'toastr.error(\"로그아웃되었습니다.\");x.stop;';
    }
}
$defaultList = [];

$addLogic_msg = '';

$result = allreturnSql($strsql);

if (function_exists("misMenuList_change")) {
    misMenuList_change();
}

$idx_FullFieldName = '';

$mm = 0;

$aliasNameAll = ";";
$parent_alias = '';
$idx_field = '';

$cnt_result = count($result);
while ($mm < $cnt_result) {
    //print_r($mm . ":" . $result[$mm]["Grid_Align"]);

    if ($table_m == '') {
        $menuName = $result[$mm]["menuName"];
        $BodyType = $result[$mm]["g01"];
        $read_only_condition = Trim($result[$mm]["g04"]);          //읽기전용조건
        $brief_insertsql = $result[$mm]["g05"];          //간편추가쿼리
        $seekDate = $result[$mm]["g06"];          //기간검색항목명
        $Read_Only = $result[$mm]["g07"];          //읽기전용
        $table_m = $result[$mm]["g08"];          //테이블명
        $excel_where = $result[$mm]["g09"];          //기본필터
        $excel_where_ori = $excel_where;
        $useflag_sql = $result[$mm]["g10"];           //use조건
        $delflag_sql = $result[$mm]["g11"];           //삭제쿼리
        $isThisChild = $result[$mm]["g12"];           //아들여부
        $dbalias = $result[$mm]["dbalias"];


    }


    $Grid_Columns_Title = $result[$mm]["Grid_Columns_Title"];
    $Grid_Columns_Title = str_replace("_", " ", str_replace(":", "", $Grid_Columns_Title));

    $Grid_Columns_Width = $result[$mm]["Grid_Columns_Width"];
    $Grid_Orderby = $result[$mm]["Grid_Orderby"];
    $Grid_MaxLength = $result[$mm]["Grid_MaxLength"];
    $Grid_PrimeKey = $result[$mm]["Grid_PrimeKey"];
    $Grid_Default = $result[$mm]["Grid_Default"];
    $Grid_Select_Tname = $result[$mm]["Grid_Select_Tname"];
    $Grid_Select_Field = $result[$mm]["Grid_Select_Field"];
    $Grid_CtlName = $result[$mm]["Grid_CtlName"];


    $aliasName = $result[$mm]["aliasName"];


    if ($Grid_Select_Tname == "table_m") {
        $FullFieldName = $Grid_Select_Tname . "." . $Grid_Select_Field;
    } else if ($Grid_Select_Tname != "") {

        $FullFieldName = $Grid_Select_Tname . "." . $Grid_Select_Field;
    } else {
        $FullFieldName = $Grid_Select_Field;
    }
    if ($mm == 0 && $Grid_Columns_Width != -1) {
        $idx_FullFieldName = $FullFieldName;
        $key_aliasName = $aliasName;
        $parent_alias = $aliasName;
    } else if ($mm == 1 && $idx_FullFieldName == "") {
        $idx_FullFieldName = $FullFieldName;
        $key_aliasName = $aliasName;
        $parent_alias = $aliasName;
    }


    $Grid_GroupCompute = $result[$mm]["Grid_GroupCompute"];
    $Grid_IsHandle = $result[$mm]["Grid_IsHandle"];
    $Grid_Schema_Validation = $result[$mm]["Grid_Schema_Validation"];
    $Grid_Alim = $result[$mm]["Grid_Alim"];
    $Grid_Pil = $result[$mm]["Grid_Pil"];
    $Grid_Items = $result[$mm]["Grid_Items"];


    $Grid_Schema_Type = $result[$mm]["Grid_Schema_Type"];




    if ($Grid_GroupCompute != "") {
        $join_sql = $join_sql . "left outer join " . $Grid_GroupCompute . "\n";
    }




    if ($mm == 0 && $Grid_Columns_Width != -1)
        $idx_field = $Grid_Select_Field;
    else if ($mm == 1) {
        if ($idx_field == '')
            $idx_field = $Grid_Select_Field;
        //$child_field = $Grid_Select_Field;
    }

    $pre_Grid_Select_Tname = $Grid_Select_Tname;
    $pre_aliasName = $aliasName;

    ++$mm;
}


$search_index = array_search($aliasName0, array_column($result, 'aliasName'));
$sel_tname = $result[$search_index]["Grid_Select_Tname"];
$sel_field = $result[$search_index]["Grid_Select_Field"];
$sel_value = '';

if ($idx != '' && $sel_tname != 'virtual_field') {
    $sel_sql = "select $sel_tname.$sel_field from $table_m table_m where $idx_FullFieldName=N'$idx'";
    $sel_value = onlyOnereturnSql_gate($sel_sql, $dbalias);
    if (InStr(",$sel_value,", "$selCode,") == 0) {
        if ($sel_value == '')
            $sel_value = $selCode;
        else
            $sel_value = $sel_value . ',' . $selCode;
    }
}


$Grid_Items = $result[$search_index]["Grid_Items"];
//$Grid_Items = replace($Grid_Items, '/', '\/');

$last_order_by = '';
if (strtolower(Left($Grid_Items, 7)) == "select ") {
    $Grid_Items = str_replace('@idx', $idx, $Grid_Items);

    if (InStr($Grid_Items, 'order by') > 0) {
        $last_order_by = 'order by' . splitVB($Grid_Items, 'order by')[count(splitVB($Grid_Items, 'order by')) - 1];
    }
    if ($MS_MJ_MY2 == 'MY') {
        if ($keyword != '' || $itemList != '') {
            $allSql = '';
            if (InStr($Grid_Items, 'order by') > 0) {
                $Grid_Items = Left($Grid_Items, Len($Grid_Items) - Len($last_order_by));

                $allSql = "select * from ($Grid_Items) bbb limit 100 ";
                $Grid_Items = "select * from ($Grid_Items) aaa where";
                if ($keyword != '' && $itemList != '')
                    $Grid_Items = $Grid_Items . " value in ($itemList) or text like '%$keyword%' ";
                else if ($keyword != '')
                    $Grid_Items = $Grid_Items . " value in ('$keyword') or text like '%$keyword%' ";
                else if ($itemList != '')
                    $Grid_Items = $Grid_Items . " value in ($itemList) ";
            } else {
                $allSql = "select * from ($Grid_Items) bbb limit 100 ";
                $Grid_Items = "select * from ($Grid_Items) aaa where";
                if ($keyword != '' && $itemList != '')
                    $Grid_Items = $Grid_Items . " value in ($itemList) or text like '%$keyword%' ";
                else if ($keyword != '')
                    $Grid_Items = $Grid_Items . " value in ('$keyword') or text like '%$keyword%' ";
                else if ($itemList != '')
                    $Grid_Items = $Grid_Items . " value in ($itemList) ";
            }

            if ($keyword == '') {
                $Grid_Items = 'select * from (' . $Grid_Items . ' union ' . $allSql . ') ccc ';
            }
        } else {
            $Grid_Items = "select " . Mid($Grid_Items, 8, 10000) . " limit 100";
        }
    } else {
        if ($keyword != '' || $itemList != '') {
            $allSql = '';
            if (InStr($Grid_Items, 'order by') > 0) {
                $Grid_Items = Left($Grid_Items, Len($Grid_Items) - Len($last_order_by));

                $allSql = "select top 100 * from ($Grid_Items) bbb ";
                $Grid_Items = "select * from ($Grid_Items) aaa where";
                if ($keyword != '' && $itemList != '')
                    $Grid_Items = $Grid_Items . " value in ($itemList) or text like '%$keyword%' ";
                else if ($keyword != '')
                    $Grid_Items = $Grid_Items . " value in ('$keyword') or text like '%$keyword%' ";
                else if ($itemList != '')
                    $Grid_Items = $Grid_Items . " value in ($itemList) ";
            } else {
                $allSql = "select top 100 * from ($Grid_Items) bbb ";
                $Grid_Items = "select * from ($Grid_Items) aaa where";
                if ($keyword != '' && $itemList != '')
                    $Grid_Items = $Grid_Items . " value in ($itemList) or text like '%$keyword%' ";
                else if ($keyword != '')
                    $Grid_Items = $Grid_Items . " value in ('$keyword') or text like '%$keyword%' ";
                else if ($itemList != '')
                    $Grid_Items = $Grid_Items . " value in ($itemList) ";
            }

            if ($keyword == '') {
                $Grid_Items = 'select * from (' . $Grid_Items . ' union ' . $allSql . ') ccc ';
            }
        } else {
            $Grid_Items = "select top 100 " . Mid($Grid_Items, 8, 10000);
        }
    }
    if ($default_value != '') {
        $Grid_Items = "select top 100 * from (" . str_replace(" top 100 ", " top 999999 ", $Grid_Items) . ") kkk order by case when value='$default_value' then 1 else 2 end";
        if ($last_order_by == 'order by 1')
            $Grid_Items = $Grid_Items . ', value';
        else if ($last_order_by == 'order by 1 desc')
            $Grid_Items = $Grid_Items . ', value desc';
        else if ($last_order_by == 'order by 2')
            $Grid_Items = $Grid_Items . ', text';
        else if ($last_order_by == 'order by 2 desc')
            $Grid_Items = $Grid_Items . ', text desc';
        else if ($last_order_by != '')
            $Grid_Items = $Grid_Items . ', value';
    }

    $sel_sql = "select * from ($Grid_Items) as ttt where value in ('" . str_replace(',', "','", $sel_value) . "')";


    $data = jsonReturnSql_gate('select * from (' . $sel_sql . ' union select * from (' . $Grid_Items . ') as yyy) as uuu', $dbalias);
} else if (strtolower(Left($Grid_Items, 5)) == "exec ") {
    $data = "exec";
} else if (Left($Grid_Items, 2) == "[{") {
    $data = $Grid_Items;
} else {
    $data = '[';
    for ($k = 0; $k < count(splitVB($Grid_Items, ',')); $k++) {
        if ($k > 0)
            $data = $data . ',';
        $data = $data . '{"value":"' . splitVB($Grid_Items, ',')[$k] . '","text":"' . splitVB($Grid_Items, ',')[$k] . '"}';
    }
    $data = $data . ']';
}


$decode_data = json_decode($data);

$exist_default_value = 0;

if ($decode_data == '') {
    $data = '[{"value":"","text":""}]';
} else if (count($decode_data) > 1) {
    if ($decode_data[1]->value != $decode_data[1]->text && InStr($decode_data[1]->text, '|') == 0) {
        $cnt_decode_data = count($decode_data);
        for ($i = 0; $i < $cnt_decode_data; $i++) {
            $decode_data[$i]->text = $decode_data[$i]->value . ' | ' . $decode_data[$i]->text;
        }
        $data = json_encode($decode_data, JSON_UNESCAPED_UNICODE);
    }
}
;

if (requestVB('ctl') == 'multiselect') {

} else {
    if (InStr($data, '"value":"' . $default_value . '"') + InStr($data, '"value":' . $default_value . ',') > 0)
        $exist_default_value = 1;
    if ($default_value != '' && $exist_default_value == 0 && $keyword == '') {
        $default_json = '{"value":"' . $default_value . '","text":"' . $default_value . ' | T.T코드리스트에 없음(체크요망!)"}';
        $data = '[' . $default_json . ',' . Mid($data, 2, 100000000);
    }
}

if ($blank == "Y" && InStr($data, '"value":""') == 0) {
    $data = '[{"value":"","text":""},' . Mid($data, 2, 100000000);
}

echo $data;




if ($cache_path == '') {
    ob_end_flush();
    exit; //캐시파일 경로가 없으면 종료
}

$output = ob_get_contents(); // 지금까지의 출력 내용 저장
WriteTextFileSimple($cache_path, $output);
ob_end_flush();
?>