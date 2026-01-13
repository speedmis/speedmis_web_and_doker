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

$appSql = '';

error_reporting(E_ALL);
ini_set("display_errors", 1);



$MisSession_UserID = '';
accessToken_check();


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

if (isset($_GET["parent_gubun"])) {
    $parent_gubun = $_GET["parent_gubun"];
    $parent_RealPid = GubunIntoRealPid($parent_gubun);
} else {
    $parent_gubun = '';
    $parent_RealPid = '';
}

if (isset($_GET["parent_idx"]))
    $parent_idx = $_GET["parent_idx"];
else
    $parent_idx = '';

$selField = requestVB("selField");

if (isset($_POST["selValue"]))
    $selValue = $_POST["selValue"];
else if (isset($_GET["selValue"]))
    $selValue = $_GET["selValue"];

$recently = requestVB("recently");

$updateRealPid = requestVB("updateRealPid");

$remote_MS_MJ_MY = requestVB("remote_MS_MJ_MY");





if ($MS_MJ_MY == 'MY') {
    $isnull = 'ifnull';
} else if ($remote_MS_MJ_MY == 'MY') {
    $isnull = 'ifnull';
    connectDB_dbalias('1st');
    $MS_MJ_MY = $MS_MJ_MY2;
    $DbServerName = $DbServerName2;
    $base_db = $base_db2;
    $DbID = $DbID2;
    $DbPW = $DbPW2;
} else {
    $isnull = 'isnull';
}
if ($MS_MJ_MY == 'MY')
    $addDir = 'MY';
else
    $addDir = '';





$presql = '';

if ($RealPid == "speedmis000314") {
    $presql = onlyOnereturnSql("select $isnull(presql,'') from MisShare where RealPid='$updateRealPid'");
}

if (isset($_GET["idx"])) {
    $idx = $_GET["idx"];
    if ($idx == "0" && $updateRealPid != "") {
        $idx = onlyOnereturnSql("select idx from MisMenuList where RealPid='$updateRealPid'");
    }
} else {
    $idx = '';
}

//idx_aliasName 의 값이 있을 경우, 특정필드에 대한 검색이라고 할 수 있다.
if (isset($_GET["idx_aliasName"])) {
    $idx_aliasName = $_GET["idx_aliasName"];
} else {
    $idx_aliasName = '';
}

?>{"created":[<?php if ($RealPid == 'speedmis000314' && $presql != '') { ?>{"presql":"
    <?php
    echo JWT::encode($presql, 'presql');
    ?>"}<?php } ?>],"updated":
<?php

if ($RealPid == "speedmis000266") {
    //서버로직파일과 프린트파일을 DB 에 적용한다(미반영 우려로 인함);
    $destination = $base_root . "/_mis_addLogic/" . $idx . '.php';
    $v = ReadTextFile($destination);

    $destination = $base_root . "/_mis_addLogic/" . $idx . "_print.html";
    $v_print = ReadTextFile($destination);
    $sql = '';
    if ($v != "") {
        $sql = " update MisMenuList set addLogic=N'" . str_replace("'", "''", $v) . "' where RealPid='$idx'; ";
    }
    if ($v_print != "") {
        $sql = $sql . " update MisMenuList set addLogic_print=N'" . str_replace("'", "''", $v_print) . "' where RealPid='$idx'; ";
    }
    if ($sql != "") {
        execSql($sql);
    }
}
if ($RealPid == "speedmis000989") {
    //서버로직파일과 treat 파일을 DB 에 적용한다(미반영 우려로 인함);
    $destination = $base_root . "/_mis_addLogic/" . $idx . '.php';
    $v = ReadTextFile($destination);

    $destination = $base_root . "/_mis_addLogic/" . $idx . "_treat.php";
    $v_treat = ReadTextFile($destination);
    $sql = '';
    if ($v != "") {
        $sql = " update MisMenuList set addLogic=N'" . str_replace("'", "''", $v) . "' where RealPid='$idx'; ";
    }
    if ($v_treat != "") {
        $sql = $sql . " update MisMenuList set addLogic_treat=N'" . str_replace("'", "''", $v_treat) . "' where RealPid='$idx'; ";
    }
    if ($sql != "") {
        execSql($sql);
    }
}

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
,ifnull(Grid_Columns_Width,'') as Grid_Columns_Width
,ifnull(Grid_View_Fixed,'') as Grid_View_Fixed
,ifnull(Grid_Enter,'') as Grid_Enter 
,ifnull(Grid_View_XS,'') as Grid_View_XS
,ifnull(Grid_View_SM,'') as Grid_View_SM
,ifnull(Grid_View_MD,'') as Grid_View_MD
,ifnull(Grid_View_LG,'') as Grid_View_LG
,ifnull(Grid_View_Hight,'') as Grid_View_Hight
,ifnull(Grid_View_Class,'') as Grid_View_Class
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
,ifnull(RealPidAliasName,'') as RealPidAliasName
,ifnull(Grid_Alim,'') as Grid_Alim
,ifnull(Grid_Pil,'') as Grid_Pil
,ifnull(Grid_Schema_Type,'') as Grid_Schema_Type
from MisMenuList_Detail d
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
,isnull(Grid_Columns_Width,'') as Grid_Columns_Width
,isnull(Grid_View_Fixed,'') as Grid_View_Fixed
,isnull(Grid_Enter,'') as Grid_Enter 
,isnull(Grid_View_XS,'') as Grid_View_XS
,isnull(Grid_View_SM,'') as Grid_View_SM
,isnull(Grid_View_MD,'') as Grid_View_MD
,isnull(Grid_View_LG,'') as Grid_View_LG
,isnull(Grid_View_Hight,'') as Grid_View_Hight
,isnull(Grid_View_Class,'') as Grid_View_Class
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
,isnull(RealPidAliasName,'') as RealPidAliasName
,isnull(Grid_Alim,'') as Grid_Alim
,isnull(Grid_Pil,'') as Grid_Pil
,isnull(Grid_Schema_Type,'') as Grid_Schema_Type
from MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where (d.sortelement<>99 or isnull(d.Grid_Select_Field,'')!='') and d.RealPid='" . $logicPid . "'  
order by sortelement;
    ";
}


$speed_fieldIndx = [];
$selectQuery = '';
$table_m = '';
$join_sql = '';
$where_sql = "where 9=9 ";

$json_codeSelect = [];
$defaultList = [];


$result = allreturnSql($strsql);


$idx_FullFieldName = '';

$mm = 0;

$aliasNameAll = ";";
$parent_alias = '';
$idx_field = '';


$cnt_result = count($result);
while ($mm < $cnt_result) {
    //print_r($mm . ":" . $result[$mm]["Grid_Align"]);

    if ($table_m == "") {
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
        if ($dbalias == 'default')
            $dbalias = '';

        if ($useflag_sql == '') {
            $where_sql = $where_sql . " and table_m.useflag='1'\n";
        } else {
            $where_sql = $where_sql . " and $useflag_sql \n";
        }

    }



    $Grid_Columns_Title = $result[$mm]["Grid_Columns_Title"];
    $Grid_Columns_Title = str_replace("_", " ", str_replace(":", "", $Grid_Columns_Title));

    $Grid_Columns_Width = $result[$mm]["Grid_Columns_Width"];


    $Grid_View_Fixed = $result[$mm]["Grid_View_Fixed"];
    $Grid_Enter = $result[$mm]["Grid_Enter"];
    $Grid_View_XS = $result[$mm]["Grid_View_XS"];
    $Grid_View_SM = $result[$mm]["Grid_View_SM"];
    $Grid_View_MD = $result[$mm]["Grid_View_MD"];
    $Grid_View_LG = $result[$mm]["Grid_View_LG"];
    $Grid_View_Hight = $result[$mm]["Grid_View_Hight"];
    $Grid_View_Class = $result[$mm]["Grid_View_Class"];

    $Grid_Align = $result[$mm]["Grid_Align"];
    $Grid_Orderby = $result[$mm]["Grid_Orderby"];
    $Grid_MaxLength = $result[$mm]["Grid_MaxLength"];
    $Grid_PrimeKey = $result[$mm]["Grid_PrimeKey"];
    $RealPidAliasName = $result[$mm]["RealPidAliasName"];
    $Grid_Default = $result[$mm]["Grid_Default"];
    $Grid_Select_Tname = $result[$mm]["Grid_Select_Tname"];
    $Grid_Select_Field = $result[$mm]["Grid_Select_Field"];
    $Grid_CtlName = $result[$mm]["Grid_CtlName"];



    if ($Grid_CtlName == "attach") {
    } else if ($Grid_CtlName == "textencrypt") {
        $Grid_Select_Tname = '';
        $Grid_Select_Field = "'[암호화]'";
    } else if ($Grid_CtlName == "textdecrypt") {
        $Grid_Select_Tname = '';
        $Grid_Select_Field = "'[암호화]'";
    } else if ($Grid_CtlName == "textdecrypt2") {
        $Grid_Select_Tname = '';
        $Grid_Select_Field = "'[암호화]'";
    }



    $aliasName = $result[$mm]["aliasName"];
    if ($aliasName == "idx" && $RealPid == "speedmis000267") {
        $aliasName = "RealPidAliasName";
        $Grid_Select_Field = "RealPidAliasName";
    }



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
    $Grid_Schema_Type = $result[$mm]["Grid_Schema_Type"];




    if ($Grid_GroupCompute != "") {
        $join_sql = $join_sql . "left outer join " . $Grid_GroupCompute . "\n";
    }

    if ($Grid_PrimeKey != "") {
        $temp1 = splitVB($Grid_PrimeKey, "#");
        $join_sql = $join_sql . "left outer join " . $temp1[1] . " " . $pre_Grid_Select_Tname . " on " . $pre_Grid_Select_Tname . "."
            . $temp1[3] . " = " . $Grid_Select_Tname . "." . $Grid_Select_Field . "\n";

        if (count($temp1) >= 5) {

            //이 경우, 수정/입력 때만 사용(json_codeSelect.php)
            if (InStr($temp1[4], "@idx") > 0) {

            } else if (InStr($temp1[4], "@outer_tbname") > 0) {
                $join_sql = $join_sql . ' and (' . str_replace("@outer_tbname", $pre_Grid_Select_Tname, $temp1[4]) . ")" . "\n";
            } else {
                $join_sql = $join_sql . ' and ' . $pre_Grid_Select_Tname . "." . $temp1[4] . "\n";
            }
        }
        //echo $join_sql;

        if ($Grid_MaxLength != "") {
            $temp2 =
                "select concat(" . $temp1[0] . ",' | '," . $temp1[3] . ") as codename from " . $temp1[1]
                . " as " . $pre_Grid_Select_Tname;
            if (count($temp1) >= 5) {
                if (InStr($temp1[4], "@outer_tbname") > 0) {
                    $temp2 = $temp2 . " where (" . str_replace("@outer_tbname", $pre_Grid_Select_Tname, $temp1[4]) . ")";
                } else {
                    $temp2 = $temp2 . " where " . $pre_Grid_Select_Tname . "." . $temp1[4];
                }
            }
            $json_codeSelect[$pre_aliasName] = $temp2;
        }


    }


    /*
            if($flag=="read" && $Grid_Schema_Type=="date") {
                //목록조회 및 순수필드일 경우, 컨버팅
                if(InStr($FullFieldName, "(")==0) $FullFieldName = "convert(char(10)," . $FullFieldName . ",120)";
            } else if($Grid_Schema_Type=="date" || $Grid_Schema_Type=="datetime") {
                //목록조회 및 순수필드일 경우, 컨버팅
                if(InStr($FullFieldName, "(")==0) $FullFieldName = "convert(char(16)," . $FullFieldName . ",120)";
            }
    */


    $speed_fieldIndx[$aliasName] = $FullFieldName;

    if ($selectQuery == '') {
        $selectQuery = "select {rowNumber_field}," . $FullFieldName . " as '" . $aliasName . "'\n";
    } else {
        if ($Grid_Select_Tname == 'virtual_field')
            ;
        else
            $selectQuery = $selectQuery . ',' . $FullFieldName . " as '" . $aliasName . "'\n";
    }

    if ($mm == 0 && $Grid_Columns_Width != -1)
        $idx_field = $Grid_Select_Field;
    else if ($mm == 1) {
        if ($idx_field == '')
            $idx_field = $Grid_Select_Field;
        $parent_field = $Grid_Select_Field;
    }

    $pre_Grid_Select_Tname = $Grid_Select_Tname;
    $pre_aliasName = $aliasName;

    ++$mm;
}



$selectQuery = $selectQuery . "from " . $table_m . " table_m\n";

$joinAndWhere = $join_sql . $where_sql . $excel_where;
if ($parent_idx != '')
    $joinAndWhere = $joinAndWhere . " and table_m.$parent_field = '$parent_idx' ";
if ($idx != "") {
    $joinAndWhere = $joinAndWhere . ' and ' . $idx_FullFieldName . " = N'$idx' ";


}

$selectQueryAll = '';
$keyword = '';
$filterQuery = '';
$countQuery = '';




if ($filterQuery != '')
    $selectQueryAll = $selectQuery . $joinAndWhere;


$tt0 = splitVB($joinAndWhere, "where 9=9");
$tt1 = $tt0[0];
$tt2 = $tt0[1] . $filterQuery;
if ($selField != "") {
    $tt2 = $tt2 . $speed_fieldIndx[$selField];
    $resultCode = '';
    $resultMessage = '';
}
$selectQuery2 = $selectQuery;
$selectQuery = $selectQuery . $joinAndWhere . $filterQuery;

$pagenumber = '';

$tt3 = splitVB($tt1, "left outer join ");
$tt9 = '';
for ($ii = count($tt3) - 1; $ii >= 1; $ii--) {
    $tt4 = trim(replace(trim($tt3[$ii]), "  ", " "));
    $tt5 = splitVB(splitVB($tt4, " ")[1], " on ")[0];
    if (InStr(strtolower($tt2), strtolower($tt5) . ".") > 0) {
        $tt9 = "left outer join " . $tt4;
        $tt9 = substr($tt1, 0, strpos(strtolower($tt1), strtolower($tt9)) + strlen($tt9));
        $ii = -1;
    }
}

$selectQuery2 = $selectQuery2 . $tt9 . " where 9=9" . $tt0[1] . $filterQuery;


$orderbyQuery = "order by ";
$orderby = requestVB('$orderby');
if ($recently == "Y") {
    $orderbyQuery = $orderbyQuery . array_values($speed_fieldIndx)[0] . " desc";
} else if ($orderby != '') {
    $temp1 = splitVB($orderby, ",");
    $forMax = count($temp1);
    for ($ii = 0; $ii < $forMax; $ii++) {
        if ($ii > 0)
            $orderbyQuery = $orderbyQuery . ",";
        $temp2 = splitVB($temp1[$ii], " ");
        if (count($temp2) == 1)
            $orderbyQuery = $orderbyQuery . $speed_fieldIndx[$temp1[$ii]];
        else
            $orderbyQuery = $orderbyQuery . $speed_fieldIndx[$temp2[0]] . " " . $temp2[1];
    }
} else {
    $orderbyQuery = $orderbyQuery . array_values($speed_fieldIndx)[0] . " asc";
}
$countQuery = "select count(*) from " . $table_m . " table_m " . splitVB($selectQuery2, "from " . $table_m . " table_m")[1];


if ($MS_MJ_MY == 'MY') {
    $selectQuery = str_replace("{rowNumber_field}", "@RANKT := @RANKT + 1 as 'rowNumber'", $selectQuery);
    if (isset($_POST['$skip']))
        $skip = $_POST['$skip'] * 1;
    else
        $skip = 0;
    $selectQuery = str_replace('where 9=9', ',(SELECT @RANKT := 0) XX where 9=9', $selectQuery) . $orderbyQuery;
    $selectQuery = "select * from (" . $selectQuery . ") aaa ";
} else {
    $selectQuery = str_replace("{rowNumber_field}", "ROW_NUMBER() over (" . $orderbyQuery . ") as rowNumber", $selectQuery);
    if (isset($_POST['$skip']))
        $skip = $_POST['$skip'] * 1;
    else
        $skip = 0;
    $selectQuery = "select * from (" . $selectQuery . ") aaa ";

}





$countQuery = str_replace("@MisSession_UserID", $MisSession_UserID, $countQuery);
$countQuery = str_replace("@MisSession_PositionCode", $MisSession_PositionCode, $countQuery);
$countQuery = str_replace("@RealPid", $RealPid, $countQuery);
$countQuery = str_replace("@parent_RealPid", $parent_RealPid, $countQuery);
$countQuery = str_replace("@MisSession_StationNum", $MisSession_StationNum, $countQuery);

$selectQuery = str_replace("@MisSession_UserID", $MisSession_UserID, $selectQuery);
$selectQuery = str_replace("@MisSession_PositionCode", $MisSession_PositionCode, $selectQuery);
$selectQuery = str_replace("@RealPid", $RealPid, $selectQuery);
$selectQuery = str_replace("@parent_RealPid", $parent_RealPid, $selectQuery);
$selectQuery = str_replace("@MisSession_StationNum", $MisSession_StationNum, $selectQuery);

$max_SortElement = '';
if ($RealPid == "speedmis000267") {
    //보다 크면 삭제위함.
    $max_SortElement = onlyOneReturnSql(str_replace('select count(*) from', 'select max(table_m.SortElement) from', $countQuery));
}

$data = jsonReturnSql_gate($selectQuery, $dbalias);

//이렇게 치환해야 함.
echo str_replace('&#', '_andShap@', $data);

?>,"destroyed":[],"max_SortElement":[<?php echo $max_SortElement; ?>]}