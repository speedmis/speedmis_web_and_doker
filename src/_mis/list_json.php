<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

ob_start();

$commentData = '[]';

//session_start();

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include 'hangeul-utils-master/hangeul_romaja.php';

$readResult = 'N';      //readResult=='Y' 이면 jQuery.... 로 시작하지 않고 순수데이터만 출력.

$ActionFlag = $_GET['flag'];
if (isset($_GET['flag'])) {
    $flag = $_GET['flag'];
    if ($flag == 'readResult') {
        $readResult = 'Y';
    }
} else {
    $flag = '';
}
$devQueryOn = 'N';
$gzip_YN = 'N';

$parentActionFlag = requestVB('parentActionFlag');  //addLogic 에서 사용하면 유용.
$pre = requestVB('pre');
$addParam = requestVB('addParam');
$MisMenuList_Detail = 'MisMenuList_Detail';
if ($pre == '1') {
    $MisMenuList_Detail = 'MisMenuList_Detail_pre';
}
$app = requestVB('app');

if (isset($_COOKIE['devQueryOn'])) {
    $devQueryOn = $_COOKIE['devQueryOn'];
}
if ($devQueryOn != 'Y' && InStr($app, 'download') == 0) {
    header('Content-Encoding: gzip');
    $gzip_YN = 'Y';
}

if ($MS_MJ_MY == 'MY')
    $addDir = 'MY';
else
    $addDir = '';

$resultQuery = '';
$resultCode = "success";
$afterScript = '';
$appSql = '';

// 모든 보고를 끄고, 에러(Error)와 파싱 에러(Parse)만 켭니다.
error_reporting(E_ERROR | E_PARSE | E_CORE_ERROR | E_COMPILE_ERROR);
ini_set('display_errors', 1);


//ini_set('max_execution_time',300);
//echo ini_get('max_execution_time');

accessToken_check();
$MSUI = requestVB('MSUI');
if ($MSUI != '') {
    $MisSession_UserID = $MSUI;
}
if (isset($_GET['RealPid']))
    $RealPid = $_GET['RealPid'];
else
    $RealPid = '';
if (isset($_GET['MisJoinPid']))
    $MisJoinPid = $_GET['MisJoinPid'];
else
    $MisJoinPid = '';
if ($MisJoinPid == '')
    $logicPid = $RealPid;
else
    $logicPid = $MisJoinPid;
$remote_MS_MJ_MY = requestVB('remote_MS_MJ_MY');


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


$alldata = '';


if (isset($_GET['ChkOnlySum']))
    $ChkOnlySum = $_GET['ChkOnlySum'];
else
    $ChkOnlySum = '';

if (isset($_GET['parent_gubun'])) {
    $parent_gubun = $_GET['parent_gubun'];
    $parent_RealPid = GubunIntoRealPid($parent_gubun);
} else {
    $parent_gubun = '';
    $parent_RealPid = '';
}
$helpbox = requestVB('helpbox');
$sel_idx = requestVB('sel_idx');
if (requestVB('skip') != '') {
    $skip = requestVB('skip');    //flextudio 에서 $skip 허용 안함.
} else {
    $skip = requestVB('$skip');
}
$isSkipZero = requestVB('isSkipZero');
if ($skip == '' || $isSkipZero == 'true') {
    $skip = 0;
} else {
    $skip = $skip * 1;
}
$rnd = '';

if (isset($_GET['parent_idx']))
    $parent_idx = $_GET['parent_idx'];
else
    $parent_idx = '';

$lite = requestVB("lite");
$onlyCnt = requestVB("onlyCnt");

$callback = requestVB('$callback');



if ($lite == 'Y' && $flag == 'modify') {
    gzecho($callback . '({
        "d" : {
        "results":
        []
        }
        }
        )');
    exit;
}
if ($callback == '') {
    $callback = requestVB('callback');
}
// 허용된 콜백 이름만 허용
if ($callback != '' && !preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $callback)) {
    header('HTTP/1.1 400 Bad Request');
    exit('Invalid callback');
}

$grid_load_once_event = requestVB("grid_load_once_event");
$chartKey = requestVB("chartKey");
$chartNumberColumns = requestVB("chartNumberColumns");
$chartOrderBy = requestVB("chartOrderBy");
$chartTop = requestVB("chartTop");
if ($chartTop == '')
    $chartTop = 15;

$resultMessage = '';
$recently = '';
$isDeleteList = '';
$allFilter = '';
$selField = '';
$selValue = '';
$isDeleteList = requestVB("isDeleteList");      //경우에 따라 post / get


$backup = requestVB("backup");
$filter = requestVB('$filter');  //사용자 로직에서만 사용함.
$allFilter = requestVB("allFilter");

if (requestVB('top') != '') {
    $req_top = requestVB('top');    //flextudio 에서 $top 허용 안함.
} else {
    $req_top = requestVB('$top');
}

if ($allFilter == '' && InStr($filter, ") or substringof('") > 0) {
    $allFilter = str_replace("(substringof('", '[{"operator":"contains","value":"', $filter);
    $allFilter = str_replace("',", '","field":"', $allFilter);
    $allFilter = str_replace(") or substringof('", '"},{"operator":"contains","value":"', $allFilter);
    $allFilter = str_replace('))', '"}]', $allFilter);
}

$recently = requestVB("recently");
if ($allFilter != '') {

    $allFilter = str_replace('@per;', '%', str_replace('@nd;', '&', $allFilter));


    $allFilter = '{"entries":' . $allFilter . '}';

}
$selField = requestVB("selField");

if (isset($_POST['selValue']))
    $selValue = $_POST['selValue'];
else if (isset($_GET['selValue']))
    $selValue = $_GET['selValue'];
$selValue = str_replace('@per;', '%', str_replace('@nd;', '&', $selValue));

$selectList = requestVB("selectList");

if (isset($_GET['idx'])) {
    $idx = $_GET['idx'];
} else {
    $idx = '';
}

//idx_aliasName 의 값이 있을 경우, 특정필드에 대한 검색이라고 할 수 있다.
if (isset($_GET['idx_aliasName'])) {
    $idx_aliasName = $_GET['idx_aliasName'];
} else {
    $idx_aliasName = '';
}


/* 서버 로직 start */
if (file_exists('../_mis_addLogic/' . $logicPid . '.php'))
    include '../_mis_addLogic/' . $logicPid . '.php';

if (function_exists("view_templete")) {
    $use_templete = 'Y';
} else {
    $use_templete = 'N';
}

if (function_exists("jsonUrl_index")) {
    $remote_MS_MJ_MY = $MS_MJ_MY;
    jsonUrl_index();

    if ($jsonUrl != "") {

        if (InStr($jsonUrl, $full_site) == 0) {
            $remote_url = explode('/_mis', $jsonUrl)[0] . $ServerVariables_URL;
            if (InStr($remote_url, '&recently=') == 0 && $recently != '')
                $remote_url = $remote_url . '&recently=' . $recently;
            if (InStr($remote_url, '&$orderby=') == 0 && requestVB('$orderby') != '')
                $remote_url = $remote_url . '&$orderby=' . requestVB('$orderby');
            if (InStr($remote_url, '&top=') == 0 && $req_top != '')
                $remote_url = $remote_url . '&$top=' . $req_top;
            //if($devQueryOn=='Y') $remote_url = $remote_url . '&devQueryOn=Y';

            //gzecho($remote_url);exit;
            if ($recently != '' && InStr($ServerVariables_URL, 'recently=') == 0) {
                $remote_url = $remote_url . "&$recently=$recently";
            }
            if ($remote_MS_MJ_MY == 'MY') {
                $remote_url = $remote_url . '&remote_MS_MJ_MY=MY';
            }
            $remote_url = $remote_url . '&remote=Y';
            gzecho(file_get_contents_new($remote_url));
            exit;
        }
    }
}
if ($readResult == 'Y') {

} else if ($callback != '') {
    $alldata = $alldata . $callback;
} else {
    exit;
}



if (function_exists("list_json_init")) {
    list_json_init();
}


/* 서버 로직 end */



if ($readResult == 'N')
    $alldata = $alldata . '(';

if ($flag != 'update') {

    if ($readResult == 'N') {
        $alldata = $alldata . '{
"d" : {
"results":
';
    }
}

if ($helpbox != '')
    $strsql = helpbox_sql($logicPid, $helpbox, 'list_json');
else if ($MS_MJ_MY == 'MY') {
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
    ,ifnull(g13,'') as g13
    ,ifnull(g14,'') as g14
    ,ifnull(dbalias,'') as dbalias
    ,aliasName
    ,Grid_Columns_Title
    ,SortElement as SortElement 
    ,ifnull(Grid_FormGroup,'') as Grid_FormGroup
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
    ,ifnull(Grid_Templete,'') as Grid_Templete
    ,ifnull(Grid_Schema_Validation,'') as Grid_Schema_Validation
    ,ifnull(Grid_PrimeKey,'') as Grid_PrimeKey
    ,ifnull(Grid_Alim,'') as Grid_Alim
    ,ifnull(Grid_Pil,'') as Grid_Pil
    ,ifnull(Grid_Schema_Type,'') as Grid_Schema_Type
    from $MisMenuList_Detail d
    left outer join MisMenuList m on m.RealPid=d.RealPid
    where (d.sortelement<>999 or ifnull(d.Grid_Select_Field,'')!='') and ifnull(d.aliasName,'')<>'' and d.RealPid='" . $logicPid . "'  
    order by sortelement;
    ";

    if ($ActionFlag == 'write' && ($idx != "0" || $idx != "")) {
        //참조입력일 경우, 첨부파일은 끌어오지 않는다.
        $strsql = str_replace('where d.RealPid', "where ifnull(d.Grid_CtlName,'')<>'attach' and d.RealPid", $strsql);
    }
} else {
    $strsql = "
    select 
    m.menuName
    ,m.g01
    ,m.g04
    ,m.g05
    ,m.g06
    ,m.g07
    ,m.g08
    ,m.g09
    ,m.g10
    ,m.g11
    ,m.g12
    ,m.g13
    ,m.g14
    ,m.dbalias
    ,d.aliasName
    ,d.Grid_Columns_Title
    ,d.SortElement
    ,d.Grid_FormGroup
    ,d.Grid_Columns_Width
    ,d.Grid_Align
    ,d.Grid_Orderby
    ,d.Grid_MaxLength
    ,d.Grid_Default
    ,d.Grid_Select_Tname
    ,case when d.Grid_Select_Tname<>'' and isnumeric(left(d.Grid_Select_Field,1))=1 then '['+d.Grid_Select_Field+']' else d.Grid_Select_Field end as Grid_Select_Field
    ,d.Grid_GroupCompute
    ,d.Grid_CtlName 
    ,d.Grid_IsHandle
    ,d.Grid_Templete
    ,d.Grid_Schema_Validation
    ,d.Grid_PrimeKey
    ,d.Grid_Alim
    ,d.Grid_Pil
    ,d.Grid_Schema_Type
    from $MisMenuList_Detail d
    left outer join MisMenuList m on m.RealPid=d.RealPid
    where (d.sortelement<>999 or d.Grid_Select_Field<>'') and d.aliasName<>'' and d.RealPid='$logicPid'  
    order by sortelement;
    ";

    if ($ActionFlag == 'write' && ($idx != '0' || $idx != '')) {
        //참조입력일 경우, 첨부파일은 끌어오지 않는다.
        $strsql = str_replace('where d.RealPid', "where d.Grid_CtlName<>'attach' and d.RealPid", $strsql);
    }
}




//echo  $strsql;
//exit;
$speed_fieldIndx = [];
$speed_Grid_Schema_Type = [];
$speed_aliasName_title = [];
$speed_Grid_Columns_Title = [];
$contentList = ";";
$selectQuery = '';
$table_m = '';
$join_sql = '';
$where_sql = "where 9=9 ";
if ($MisSession_UserID == '' && $readResult == 'N') {
    $stop_YN = "Y";
    //list_json_stop_YN 는 top_addLogic.php 에 존재
    if (function_exists("list_json_stop_YN")) {
        list_json_stop_YN();
    }
    if ($stop_YN == 'Y') {
        $where_sql = $where_sql . " and 111=999 ";
        if ($auto_logout_minute > 0) {
            if (isMobile() == 'N') {
                $afterScript = 'alert(\"유휴시간 ' . $auto_logout_minute . '분 경과 또는 기타사유로 로그아웃 되었습니다.\");window.open(\"./\");';
            } else {
                $afterScript = 'alert(\"유휴시간 ' . $auto_logout_minute . '분 경과 또는 기타사유로 로그아웃 되었습니다.\");location.href = \"./\";';
            }
        } else {
            if (isMobile() == 'N') {
                $afterScript = 'alert(\"로그아웃 되었습니다. 로그인페이지로 이동합니다.\");window.open(\"./\");';
            } else {
                $afterScript = 'alert(\"로그아웃 되었습니다. 로그인페이지로 이동합니다.\");location.href = \"./\";';
            }
        }
    }
}
$json_codeSelect = [];
$defaultList = [];

$addLogic_msg = '';

$waitRun = 'Y';
$orderbyQuery = "order by ";
$orderby = str_replace(', ', ',', requestVB('$orderby'));

if (($flag == 'read' || $ActionFlag == 'list') && $idx == '' && $app == '') {
    $ddadda = "''''";
    $strsql = str_replace("and d.aliasName<>''", "and d.aliasName<>'' and (d.Grid_Columns_Width<>-1 or d.Grid_Select_Tname<>'' or d.aliasName like '%Qn%' or d.Grid_PrimeKey<>'' or d.Grid_GroupCompute<>'' or d.Grid_Templete='Y' or d.Grid_Select_Field='$ddadda' or d.Grid_IsHandle<>'' or d.Grid_Orderby<>'' or d.SortElement<=4)", $strsql);

    if ($orderby != '') {
        $strsql = str_replace("and d.Grid_Columns_Width<>-1 or", "and d.Grid_Columns_Width<>-1 or d.Grid_Select_Field in ('" . str_replace(' desc', '', str_replace(",", "','", $orderby)) . "') or", $strsql);
    }
}
//echo $strsql;
$result = allreturnSql($strsql);

if (function_exists("misMenuList_change") && $helpbox == '') {
    misMenuList_change();
}


$idx_FullFieldName = '';

$mm = 0;

$aliasNameAll = ";";
$parent_alias = '';
$idx_field = '';



$key_count = count(splitVB($parent_idx, '_-_'));
if ($RealPid == 'speedmis000974')
    $key_count = 1;
$cnt_result = count($result);

while ($mm < $cnt_result) {
    //print_r($mm . ":" . $result[$mm]["Grid_Align']);

    if ($table_m == "") {
        $menuName = $result[$mm]['menuName'];
        $BodyType = $result[$mm]['g01'];
        $read_only_condition = Trim($result[$mm]['g04']);          //읽기전용조건
        $brief_insertsql = $result[$mm]['g05'];          //간편추가쿼리
        $seekDate = $result[$mm]['g06'];          //기간검색항목명
        $Read_Only = $result[$mm]['g07'];          //읽기전용
        $table_m = $result[$mm]['g08'];          //테이블명
        $excel_where = $result[$mm]['g09'];          //기본필터
        $excel_where_ori = $excel_where;
        $useflag_sql = $result[$mm]['g10'];           //use조건
        $delflag_sql = $result[$mm]['g11'];           //삭제쿼리
        $isThisChild = $result[$mm]['g12'];           //아들여부
        $child_gubun = $result[$mm]['g13'];           //아들구분값
        $isNoWriter = $result[$mm]['g14'];           //수정기록없음
        $dbalias = $result[$mm]['dbalias'];
        if ($dbalias == 'default')
            $dbalias = '';
        if ($dbalias == '' && $MS_MJ_MY == 'MY')
            $dbalias = '1st';

        if ($isDeleteList == 'Y') {
            $where_sql = $where_sql . ' and table_m.' . $delflag_sql . "\n";
        } else if ($useflag_sql == '') {
            $where_sql = $where_sql . " and table_m.useflag='1'\n";
        } else {
            $where_sql = $where_sql . " and $useflag_sql \n";
        }

    }


    $Grid_Columns_Title = $result[$mm]['Grid_Columns_Title'];
    //$Grid_Columns_Title = str_replace('_',' ',str_replace(':','',$Grid_Columns_Title));
    $Grid_Columns_Title = str_replace(':', '', $Grid_Columns_Title);

    $Grid_FormGroup = $result[$mm]['Grid_FormGroup'];
    $Grid_Columns_Width = $result[$mm]['Grid_Columns_Width'];
    $Grid_Orderby = $result[$mm]['Grid_Orderby'];
    $Grid_MaxLength = $result[$mm]['Grid_MaxLength'];
    $Grid_PrimeKey = $result[$mm]['Grid_PrimeKey'];
    $Grid_Default = $result[$mm]['Grid_Default'];
    $Grid_Select_Tname = $result[$mm]['Grid_Select_Tname'];
    $Grid_Select_Field = $result[$mm]['Grid_Select_Field'];
    $Grid_CtlName = $result[$mm]['Grid_CtlName'];



    if ($Grid_CtlName == 'attach') {
    } else if ($Grid_CtlName == 'textdecrypt2') {
        $Grid_Select_Tname = '';
        $Grid_Select_Field = "'[암호화]'";
    }



    $aliasName = $result[$mm]['aliasName'];
    if (requestVB('tsql') == 'Y' || $use_templete == 'Y' && $idx != '') {
        $aliasName = str_replace(' ', '', $Grid_Columns_Title);
        if (InStr($aliasName, ',') > 0)
            $aliasName = splitVB($aliasName, ',')[1];
    }

    $Grid_Schema_Type = $result[$mm]['Grid_Schema_Type'];
    if ($Grid_CtlName == 'textdecrypt1' || $Grid_Schema_Type == 'textdecrypt1') {
        if ($Grid_Select_Tname == '') {
            if ($MS_MJ_MY == 'MY') {
                $FullFieldName = "AES_DECRYPT(UNHEX($Grid_Select_Field), '$pwdKey')";
            } else {
                $FullFieldName = "convert(nvarchar(1000),decryptbypassphrase('$pwdKey',$Grid_Select_Field))";
            }
        } else {
            if ($MS_MJ_MY == 'MY') {
                $FullFieldName = "AES_DECRYPT(UNHEX($Grid_Select_Tname.$Grid_Select_Field), '$pwdKey')";
            } else {
                $FullFieldName = "convert(nvarchar(1000),decryptbypassphrase('$pwdKey',$Grid_Select_Tname.$Grid_Select_Field))";
            }
        }
    } else if ($Grid_Select_Tname == 'table_m') {
        $FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
    } else if ($Grid_Select_Tname != '') {
        /*
        //차후과제!!!!!!!!!
        if($result[$mm+1]['Grid_PrimeKey']!='') {
            //$Grid_Select_Field = 
            if(InStr($result[$mm+1]["Grid_PrimeKey"], "@outer_tbname")>0) {
                $FullFieldName = str_replace(explode($result[$mm+1]["Grid_PrimeKey"],"#")[0], "@outer_tbname", $Grid_Select_Tname);
            } else {
                $FullFieldName = $Grid_Select_Tname . "." . $Grid_Select_Field;
            }
        } else {
        }
        */
        $FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
    } else {
        $FullFieldName = $Grid_Select_Field;
    }
    if ($mm == 0 && $Grid_Columns_Width != -1) {
        $idx_FullFieldName = $FullFieldName;
        $key_aliasName = $aliasName;
        $parent_alias = $aliasName;
    } else if ($mm == 0) {
        $key_aliasName = $result[1]['aliasName'];
    } else if ($mm == 1 && $idx_FullFieldName == '') {
        $idx_FullFieldName = $FullFieldName;
        $key_aliasName = $aliasName;
        $parent_alias = $aliasName;
    }


    //hp?flag=templist&tempDir=gadmin_1627722…allb
    if ($flag == 'templist' && $key_aliasName != '') {


        $templist = '';
        $tempDir = requestVB('tempDir');
        if (!is_dir($base_root . "/temp/$tempDir")) {
            mkdir($base_root . "/temp/$tempDir", 0777, true);
        }
        $last_number = ReadTextFile($base_root . "/temp/$tempDir/last_number.txt");

        if ($last_number == '')
            $last_number = 0;
        else
            $last_number = (int) $last_number;

        $cnt_line_data = 0;
        for ($ii = $last_number; $ii >= 1; $ii--) {
            $line_data = ReadTextFile($base_root . "/temp/$tempDir/$ii.txt");
            if ($line_data != '') {
                if ($templist != '')
                    $templist = $templist . ',';
                $templist = $templist . $line_data;
                ++$cnt_line_data;
            }
        }
        $alldata = $alldata . '[' . $templist . ']
        , "commentData": []
        , "pagenumber": 1
        , "key_aliasName": "' . $key_aliasName . '"
        , "__page": "' . iif($cnt_line_data == 0, 0, 1) . '"
        , "__count": "' . $cnt_line_data . '"
        , "keyword": ""
        , "app": ""
        , "resultCode": "success"
        , "resultMessage": "정상적으로 1 페이지가 조회되었습니다 || 총 ' . $cnt_line_data . '건"
        }
        }
        )
';
        gzecho($alldata);
        exit;
    }



    $Grid_GroupCompute = $result[$mm]['Grid_GroupCompute'];
    $Grid_IsHandle = $result[$mm]['Grid_IsHandle'];
    $Grid_Templete = $result[$mm]['Grid_Templete'];
    $Grid_Schema_Validation = $result[$mm]['Grid_Schema_Validation'];
    $Grid_Alim = $result[$mm]['Grid_Alim'];
    $Grid_Pil = $result[$mm]['Grid_Pil'];



    if ($Grid_GroupCompute != '' && InStr($Grid_GroupCompute, 'group by') == 0) {
        $join_sql = $join_sql . 'left outer join ' . $Grid_GroupCompute . "\n";
        //echo "<br>join_sql=" . $Grid_GroupCompute . "\n";
    }

    $join_sql = str_replace('  ', ' ', $join_sql);
    if ($Grid_PrimeKey != '') {
        $temp1 = explode('#', $Grid_PrimeKey);
        $join_sql = $join_sql . 'left outer join ' . $temp1[1] . ' ' . $pre_Grid_Select_Tname . ' on ' . $pre_Grid_Select_Tname . '.'
            . $temp1[3] . ' = ' . $Grid_Select_Tname . '.' . $Grid_Select_Field . "\n";

        if (count($temp1) >= 5) {
            //echo $temp1[4];exit;
            //이 경우, 수정/조회때만 사용(json_codeSelect.php)
            if (InStr($temp1[4], '@idx') > 0) {
                if ($idx != '') {
                    if (InStr($temp1[4], '@outer_tbname') > 0) {
                        $join_sql = $join_sql . ' and (' . str_replace('@outer_tbname', $pre_Grid_Select_Tname, str_replace('@idx', $idx, $temp1[4])) . ')' . "\n";
                    } else {
                        $join_sql = $join_sql . ' and ' . $pre_Grid_Select_Tname . '.' . str_replace('@idx', $idx, $temp1[4]) . "\n";
                    }
                }
            } else if (InStr($temp1[4], '@outer_tbname') > 0) {
                $join_sql = $join_sql . ' and (' . str_replace('@outer_tbname', $pre_Grid_Select_Tname, $temp1[4]) . ')' . "\n";
            } else {
                if (Left($temp1[4], 1) == '(')
                    $join_sql = $join_sql . ' and ' . $temp1[4] . "\n";
                else
                    $join_sql = $join_sql . ' and ' . $pre_Grid_Select_Tname . '.' . $temp1[4] . "\n";
            }
        }
        //echo $join_sql;

        if ($Grid_MaxLength != '') {
            if ($MS_MJ_MY == 'MY') {
                $temp2 =
                    "select concat(" . $temp1[0] . ",' | '," . $temp1[3] . ") as codename from " . $temp1[1]
                    . " as " . $pre_Grid_Select_Tname;
                if (count($temp1) >= 5) {
                    if (InStr($temp1[4], '@outer_tbname') > 0) {
                        $temp2 = $temp2 . ' where (' . str_replace('@outer_tbname', $pre_Grid_Select_Tname, $temp1[4]) . ')';
                    } else {
                        $temp2 = $temp2 . ' where ' . $pre_Grid_Select_Tname . '.' . $temp1[4];
                    }
                }
            } else {
                $temp2 =
                    "select " . $temp1[0] . "+' | '+" . $temp1[3] . " as codename from " . $temp1[1]
                    . " as " . $pre_Grid_Select_Tname;
                if (count($temp1) >= 5) {
                    if (InStr($temp1[4], '@outer_tbname') > 0) {
                        $temp2 = $temp2 . ' where (' . str_replace('@outer_tbname', $pre_Grid_Select_Tname, $temp1[4]) . ')';
                    } else {
                        $temp2 = $temp2 . ' where ' . $pre_Grid_Select_Tname . '.' . $temp1[4];
                    }
                }
            }
            $json_codeSelect[$pre_aliasName] = $temp2;
            //kname#MisCommonTable#1#kcode#gcode='speedmis000338'
        }


    }

    //if($Grid_Default!='' && $_GET['flag"]=="formAdd") {
    //    $defaultList[$aliasName] = str_replace(str_replace($Grid_Default,"@RealPid",$RealPid),"@date",date("Y-m-d"));
    //}

    connectDB_dbalias($dbalias);

    if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
        if (($flag == 'readResult' || $flag == 'read') && $Grid_Schema_Type == 'date') {
            //목록조회 및 순수필드일 경우, 컨버팅
            if (InStr($FullFieldName, '(') == 0)
                $FullFieldName = 'date_format(' . $FullFieldName . ",'%Y-%m-%d')";
        } else if ($Grid_Schema_Type == 'date' || $Grid_Schema_Type == 'datetime') {
            //목록조회 및 순수필드일 경우, 컨버팅
            if (InStr($FullFieldName, '(') == 0)
                $FullFieldName = 'date_format(' . $FullFieldName . ",'%Y-%m-%d %H:%i:%s')";
        } else if (($flag == 'readResult' || $flag == 'read') && $Grid_Schema_Type == 'boolean') {
            //bit type 을 그대로 출력하면 1도 0으로 나오는 문제 해결위해서.
            if (InStr($FullFieldName, '(') == 0)
                $FullFieldName = 'BIN(' . $FullFieldName . ")";
        }
    } else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
        if (($flag == 'readResult' || $flag == 'read') && $Grid_Schema_Type == 'date') {
            //목록조회 및 순수필드일 경우, 컨버팅
            if (InStr($FullFieldName, '(') == 0)
                $FullFieldName = 'to_char(' . $FullFieldName . ",'yyyy-mm-dd')";
        } else if ($Grid_Schema_Type == 'date' || $Grid_Schema_Type == 'datetime') {
            //목록조회 및 순수필드일 경우, 컨버팅
            if (InStr($FullFieldName, '(') == 0)
                $FullFieldName = 'to_char(' . $FullFieldName . ",'yyyy-mm-dd hh24:mi:ss')";
        }
    } else {
        /*
        if(($flag=='readResult' || $flag=='read') && $Grid_Schema_Type=='date') {
            //목록조회 및 순수필드일 경우, 컨버팅
            if(InStr($FullFieldName, '(')==0) $FullFieldName = 'convert(char(10),' . $FullFieldName . ',120)';
        } else if($Grid_Schema_Type=='date' || $Grid_Schema_Type=='datetime') {
            //목록조회 및 순수필드일 경우, 컨버팅
            if(InStr($FullFieldName, '(')==0) $FullFieldName = 'convert(char(16),' . $FullFieldName . ',120)';
        }
        */
        //위의 로직을 속도문제로 아래와 같이 변경함.
        if ($Grid_Schema_Type == 'datetime') {
            //목록조회 및 순수필드일 경우, 컨버팅
            if (InStr($FullFieldName, '(') == 0)
                $FullFieldName = 'convert(char(16),' . $FullFieldName . ',120)';
        }
    }



    if ($waitRun == 'Y' && ($recently == 'Y' || $orderby == '')) {
        $orderby = $aliasName . ' desc';
        $waitRun = 'N';
        //echo $orderby;
    }


    if ($ChkOnlySum == '2') {
        $orderby_array = explode(',', str_replace(' desc', '', $orderby));

        if (in_array($aliasName, $orderby_array)) {

            if ($selectQuery == '') {
                $selectQuery = 'select {rowNumber_field}, ' . $FullFieldName . " as \"" . $aliasName . "\"\n";
            } else {
                if ($Grid_Select_Tname == 'virtual_field') {
                } else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
                    if ($Grid_Schema_Type == 'content') {
                        for ($i = 0; $i < 200; $i++) {
                            $selectQuery = $selectQuery . ",dbms_lob.substr($FullFieldName,4000," . ($i * 4000 + 1) . ") as \"" . ($aliasName . "_" . ($i + 1)) . "\"\n";
                        }
                        $contentList = $contentList . $aliasName . ';';
                        $Grid_Schema_Type = '';
                    } else {
                        $selectQuery = $selectQuery . ',' . $FullFieldName . " as \"" . $aliasName . "\"\n";
                    }
                } else {
                    $selectQuery = $selectQuery . ', ' . $FullFieldName . " as \"" . $aliasName . "\"\n";
                }
            }
        } else {
            if ($selectQuery == '') {
                $selectQuery = "select {rowNumber_field}, count(" . $FullFieldName . ") as \"" . $aliasName . "\"\n";
            } else {
                if ($Grid_Select_Tname == 'virtual_field') {
                } else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
                    if ($Grid_Schema_Type == 'content') {
                        for ($i = 0; $i < 200; $i++) {
                            $selectQuery = $selectQuery . ",dbms_lob.substr($FullFieldName,4000," . ($i * 4000 + 1) . ") as \"" . ($aliasName . "_" . ($i + 1)) . "\"\n";
                        }
                        $contentList = $contentList . $aliasName . ';';
                        $Grid_Schema_Type = '';
                    } else {
                        if ($Grid_Schema_Type == 'number') {
                            $selectQuery = $selectQuery . ", count(case when nvl(" . $FullFieldName . ",0)=0 then null else '1' end) as \"" . $aliasName . "\"\n";
                        } else {
                            $selectQuery = $selectQuery . ", count(case when nvl(" . $FullFieldName . ",'')='' then null else '1' end) as \"" . $aliasName . "\"\n";
                        }
                    }
                } else if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
                    if (InStr($FullFieldName, '(select ') > 0 || ($Grid_Columns_Width == 0 || $Grid_Columns_Width == -1) || ($Grid_CtlName == 'textencrypt' || $Grid_CtlName == 'textarea' || $Grid_CtlName == 'html')) {
                        $selectQuery = $selectQuery . ", '' as \"" . $aliasName . "\"\n";
                    } else if (Left($Grid_Schema_Type, 6) == 'number') {
                        $selectQuery = $selectQuery . ", sum(" . $FullFieldName . ") as \"" . $aliasName . "\"\n";
                    } else {
                        if ($Grid_Schema_Type == 'number') {
                            $selectQuery = $selectQuery . ", count(case when ifnull(" . $FullFieldName . ",0)=0 then null else '1' end) as \"" . $aliasName . "\"\n";
                        } else {
                            $selectQuery = $selectQuery . ", count(case when ifnull(" . $FullFieldName . ",'')='' then null else '1' end) as \"" . $aliasName . "\"\n";
                        }
                    }
                } else {
                    if (InStr($FullFieldName, '(select ') > 0 || ($Grid_Columns_Width == 0 || $Grid_Columns_Width == -1) || ($Grid_CtlName == 'textencrypt' || $Grid_CtlName == 'textarea' || $Grid_CtlName == 'html')) {
                        $selectQuery = $selectQuery . ", '' as \"" . $aliasName . "\"\n";
                    } else if (Left($Grid_Schema_Type, 6) == 'number') {
                        $selectQuery = $selectQuery . ", sum(" . $FullFieldName . ") as \"" . $aliasName . "\"\n";
                    } else {
                        if ($Grid_Schema_Type == 'number') {
                            $selectQuery = $selectQuery . ", count(case when isnull(" . $FullFieldName . ",0)=0 then null else '1' end) as \"" . $aliasName . "\"\n";
                        } else {
                            $selectQuery = $selectQuery . ", count(case when isnull(" . $FullFieldName . ",'')='' then null else '1' end) as \"" . $aliasName . "\"\n";
                        }
                    }
                }
            }
        }

    } else {
        if ($selectQuery == '') {
            $selectQuery = "select {rowNumber_field}," . $FullFieldName . " as \"" . $aliasName . "\"\n";
        } else {
            if ($Grid_Select_Tname == 'virtual_field') {
                $selectQuery = $selectQuery . ",'' as \"" . $aliasName . "\"\n";
            } else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
                if ($Grid_Schema_Type == 'content') {
                    for ($i = 0; $i < 200; $i++) {
                        $selectQuery = $selectQuery . ",dbms_lob.substr($FullFieldName,4000," . ($i * 4000 + 1) . ") as \"" . ($aliasName . "_" . ($i + 1)) . "\"\n";
                    }
                    $contentList = $contentList . $aliasName . ';';
                    $Grid_Schema_Type = '';
                } else {
                    $selectQuery = $selectQuery . ',' . $FullFieldName . " as \"" . $aliasName . "\"\n";
                }
            } else {
                //과제 : MY / OC 에도 아래와 같이 적용 할 것. helplist 의 첫항목을 일반쿼리문에도 적용시키는 로직.
                if ($mm < $cnt_result - 1) {
                    if (Left($result[$mm + 1]['Grid_Schema_Validation'], 10) == '"helplist"') {
                        $selectQuery = $selectQuery . ',' . replace(splitVB($result[$mm + 1]['Grid_PrimeKey'], ';')[0], '@outer_tbname', $Grid_Select_Tname) . " as \"" . $aliasName . "\"\n";
                    } else if ($idx == '' && $app == '') {   //목록조회시, 입력글수500자 이상은 width=0,-1 이면 '' 로 처리한다 : 속도개선.
                        if ($Grid_Columns_Width != '0' && $Grid_Columns_Width != '-1' || $Grid_Templete == 'Y' || $mm <= 3) {    //$mm<=3 는 a+'_-_'+b+'_-_'+c+'_-_'+d  의 최대 4개 필드조합 감안.
                            $selectQuery = $selectQuery . ',' . $FullFieldName . " as \"" . $aliasName . "\"\n";
                        } else if ($Grid_MaxLength >= 500 || $Grid_CtlName == 'textdecrypt1' || $Grid_CtlName == 'textdecrypt2' || $Grid_CtlName == 'textarea' || $Grid_CtlName == 'html' || $Grid_IsHandle != '' || $Grid_Schema_Type == 'datetime' || $Grid_Select_Tname == '') {
                            if ($Grid_Orderby != '' && $MS_MJ_MY2 == 'MY') { //mysql 의 경우, 정렬대상이 목록에 있어야 함. 구조적으로.
                                $selectQuery = $selectQuery . ',' . $FullFieldName . " as \"" . $aliasName . "\"\n";
                            } else {
                                $selectQuery = $selectQuery . "-- ,nULL as \"" . $aliasName . "\"\n";
                            }
                        } else {
                            $selectQuery = $selectQuery . ',' . $FullFieldName . " as \"" . $aliasName . "\"\n";
                        }
                    } else {
                        $selectQuery = $selectQuery . ',' . $FullFieldName . " as \"" . $aliasName . "\"\n";
                    }
                } else {
                    $selectQuery = $selectQuery . ',' . $FullFieldName . " as \"" . $aliasName . "\"\n";
                }
            }
        }
    }


    $speed_fieldIndx[$aliasName] = $FullFieldName;
    $speed_Grid_Schema_Type[$aliasName] = $Grid_Schema_Type;
    $speed_aliasName_title[$aliasName] = $Grid_Columns_Title;

    if (InStr($Grid_Columns_Title, ',') > 0)
        $Grid_Columns_Title = splitVB($Grid_Columns_Title, ',')[1];

    if (isset($speed_Grid_Columns_Title[$Grid_Columns_Title])) {
        if (isset($speed_Grid_Columns_Title[$Grid_Columns_Title . 'Q1'])) {
            if (isset($speed_Grid_Columns_Title[$Grid_Columns_Title . 'Q2'])) {
                if (isset($speed_Grid_Columns_Title[$Grid_Columns_Title . 'Q3'])) {
                    if (isset($speed_Grid_Columns_Title[$Grid_Columns_Title . 'Q4'])) {
                        $speed_Grid_Columns_Title[$Grid_Columns_Title . 'Q5'] = $aliasName;
                    } else
                        $speed_Grid_Columns_Title[$Grid_Columns_Title . 'Q4'] = $aliasName;
                } else
                    $speed_Grid_Columns_Title[$Grid_Columns_Title . 'Q3'] = $aliasName;
            } else
                $speed_Grid_Columns_Title[$Grid_Columns_Title . 'Q2'] = $aliasName;
        } else
            $speed_Grid_Columns_Title[$Grid_Columns_Title . 'Q1'] = $aliasName;
    } else
        $speed_Grid_Columns_Title[$Grid_Columns_Title] = $aliasName;

    if ($mm == 0 && $Grid_Columns_Width != -1)
        $idx_field = $Grid_Select_Field;
    else if ($mm == 1) {
        if ($idx_field == '')
            $idx_field = $Grid_Select_Field;
        $parent_field = $Grid_Select_Field;
    } else if ($mm == 2 && $key_count >= 2) {
        if (InStr($parent_field, '_-_') > 0) {
            $key_count = 2;
        } else {
            $parent_field = "concat(table_m.$parent_field,'_-_',$FullFieldName)";
        }
    } else if ($mm == 3 && $key_count >= 3) {
        $parent_field = "concat(table_m.$parent_field,'_-_',$FullFieldName)";
    } else if ($mm == 4 && $key_count == 4) {
        $parent_field = "concat(table_m.$parent_field,'_-_',$FullFieldName)";
    }

    $pre_Grid_Select_Tname = $Grid_Select_Tname;
    $pre_aliasName = $aliasName;

    ++$mm;
}

if ($read_only_condition != '' && $ChkOnlySum != '2') {

    $speed_fieldIndx['read_only_condition'] = $read_only_condition;
    $selectQuery = $selectQuery . ',' . $read_only_condition . " as \"read_only_condition\"\n";

    ++$mm;
}

if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
    $selectQuery = $selectQuery . "from \"" . $table_m . "\" table_m\n";
} else {
    $selectQuery = $selectQuery . "from " . $table_m . " table_m\n";
}
//echo ";;;;$join_sql;$where_sql;$excel_where;;;;";exit;
$joinAndWhere = $join_sql . $where_sql . $excel_where;
if ($parent_idx != '') {
    if (InStr($parent_field, '.') == 0) {
        $joinAndWhere = $joinAndWhere . " and table_m.$parent_field = '$parent_idx' ";
    } else {
        $joinAndWhere = $joinAndWhere . " and $parent_field = '$parent_idx' ";
    }
}

if ($idx != "") {
    $joinAndWhere = $joinAndWhere . ' and ' . $idx_FullFieldName . " = N'$idx' ";
    if ($resultMessage == '') {
        if ($idx == '0')
            $resultMessage = "입력페이지입니다.";
        else
            $resultMessage = "정상적으로 " . $speed_aliasName_title[$key_aliasName] . ": " . $idx . " 내용이 조회되었습니다.";
    }


    if ($idx != '' && $idx != '0') {
        //필드에 HIT 가 있으면 1증가 시킨다.
        $sql_hit = '';
        if (InStr($selectQuery, "table_m.hit as") > 0) {
            if (getCookie('HIT_list') != $table_m . "." . $idx) {
                setcookie("HIT_list", $table_m . "." . $idx, 0, "/");
                $sql_hit = ' update ' . $table_m . " set hit = " . $isnull . "(hit,0)+1 where " . str_replace('table_m.', '', $speed_fieldIndx[$key_aliasName]) . "=N'" . $idx . "';";

            }
        }
        if ($RealPid != "speedmis000980" && $RealPid != "speedmis000979" && $RealPid != "speedmis000815") {
            if ($MS_MJ_MY == 'MY') {
                if ($parent_gubun != '' && $parent_idx != "") {
                    $sql_hit = $sql_hit . "
                    update MisReadList set readDate=now() where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID'
                    and 자격 in ('조회','필독') and readDate is null;
                    insert into MisReadList (RealPid, widx, userid, 자격, readDate, parent_gubun, parent_idx) 
                    select N'$RealPid', N'$idx', N'$MisSession_UserID', '조회', now(), $parent_gubun, N'$parent_idx'
                    from dual WHERE NOT EXISTS (select * from MisReadList where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID');
                    ";
                } else {
                    $sql_hit = $sql_hit . " 
                    update MisReadList set readDate=now() where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID'
                    and 자격 in ('조회','필독') and readDate is null;
                    insert into MisReadList (RealPid, widx, userid, 자격, readDate)
                    select N'$RealPid', N'$idx', N'$MisSession_UserID', '조회', now()
                    from dual WHERE NOT EXISTS (select * from MisReadList where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID');
                    ";
                }
            } else {
                if ($parent_gubun != '' && $parent_idx != "") {
                    $sql_hit = $sql_hit . " if not exists(select * from MisReadList where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID') 
                    insert into MisReadList (RealPid, widx, userid, 자격, readDate, parent_gubun, parent_idx) values (N'$RealPid', N'$idx', N'$MisSession_UserID', '조회', getdate(), $parent_gubun, N'$parent_idx') 
                    else if exists(select * from MisReadList where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID' 
                    and readDate is null and 자격 in ('조회','필독'))
                    update MisReadList set readDate=getdate() where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID'
                    and 자격 in ('조회','필독')
                    ";
                } else {
                    $sql_hit = $sql_hit . " if not exists(select * from MisReadList where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID') 
                    insert into MisReadList (RealPid, widx, userid, 자격, readDate) values (N'$RealPid', N'$idx', N'$MisSession_UserID', '조회', getdate()) 
                    else if exists(select * from MisReadList where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID' 
                    and readDate is null and 자격 in ('조회','필독'))
                    update MisReadList set readDate=getdate() where RealPid=N'$RealPid' and widx=N'$idx' and userid=N'$MisSession_UserID'
                    and 자격 in ('조회','필독')
                    ";
                }
            }
        }
        //echo $sql_hit;

        if ($sql_hit != '') {
            execSql($sql_hit);
        }
    }
}




if (InStr($app, 'helpbox_saveList!@!') > 0) {
    $helpbox_saveList = json_decode(splitVB($app, '!@!')[1], true);
    $helpbox_update0 = "update $table_m set ";
    $helpbox_update = '';
    $cnt_j = count($helpbox_saveList);
    for ($j = 0; $j < $cnt_j; $j++) {
        $k = $helpbox_saveList[$j]['title'];
        $v = $helpbox_saveList[$j]['value'];
        $sql = "select Grid_Select_Field from $MisMenuList_Detail where RealPid='$logicPid' and Grid_Select_Tname='table_m' "
            . " and replace(Grid_Columns_Title,' ','')='" . replace($k, ' ', '') . "'";

        $uField = onlyOnereturnSql($sql);
        if ($uField != '' || $k == 'sel_idx') {
            if ($j == 0)
                $helpbox_update = "$uField=N'$v'";
            else if ($k == 'sel_idx')
                $helpbox_update = $helpbox_update . " where " . splitVB($idx_FullFieldName, '.')[1] . "=N'$v'";
            else
                $helpbox_update = $helpbox_update . iif($helpbox_update != '', ',', '') . "$uField=N'$v'";
        }

    }
    $helpbox_update = $helpbox_update0 . $helpbox_update;
    if (InStr($helpbox_update, ' where ') > 0) {
        $result_helpbox_saveList = execSql_gate($helpbox_update, $dbalias);
        $resultMessage = $result_helpbox_saveList['resultMessage'];
        $resultCode = $result_helpbox_saveList['resultCode'];
        $resultQuery = $result_helpbox_saveList['resultQuery'];

    }
}



$selectQueryAll = '';
$keyword = '';
$filterQuery = '';
$countQuery = '';

if ($flag == 'update') {
    $request_body = file_get_contents('php://input');
    $request_body = json_decode($request_body);
    $updateList = $request_body->updateList;
    $helplist_field = '';
    $helplist_fieldValue = '';
    //print_r($request_body);
    //print_r($request_body->updateList->_up_field);

    $up_field = $request_body->updateList->_up_field;
    $up_fieldValue = $request_body->updateList->_up_fieldValue;

    if (property_exists((object) $request_body->updateList, '_up_fieldOldValue') == 1) {
        $up_fieldOldValue = $request_body->updateList->_up_fieldOldValue;
    } else
        $up_fieldOldValue = '';

    $sql_update = '';

    $up_key = $request_body->updateList->_up_key;
    $up_keyValue = $request_body->$up_key;

    //print_r($request_body);
    if (property_exists((object) $request_body->updateList, '_up_autoincrement_key') == 1) {
        $up_autoincrement_key = $request_body->updateList->_up_autoincrement_key;
        $up_autoincrement_keyValue = $request_body->updateList->_up_autoincrement_keyValue;
    } else {
        $up_autoincrement_key = $up_key;
        $up_autoincrement_keyValue = $up_keyValue;
    }
    $whereSql = $speed_fieldIndx[$up_autoincrement_key] . "=N'" . $up_autoincrement_keyValue . "'";


    //if(array_key_exists("_up_joinField", $request_body->updateList)==1) {
    if (property_exists((object) $request_body->updateList, '_up_joinField') == 1) {
        $up_joinField = $request_body->updateList->_up_joinField;
        $up_joinFieldValue = $request_body->updateList->_up_joinFieldValue;
        //$up_joinFieldValue = str_replace($up_joinFieldValue,'ˇ','');
        $_helplist = $request_body->updateList->_helplist;

        //dropdownlist 관련 필드 외의 업데이트일 경우, helplist 에 의한 업데이트는 막아야 정상.
        if (InStr($up_joinField, 'table_' . $up_field . 'Qn') == 0)
            $_helplist = '';
        //echo $up_joinField . ';;;' . 'table_' . $up_field . 'Qn';

        if ($_helplist != '') {
            for ($t = 0; $t < count(json_decode($_helplist)); $t++) {

                //_helplist 중에 table_m 중에 업데이트 필드가 아닌것.
                if (property_exists((object) $speed_fieldIndx, json_decode($_helplist)[$t])) {
                    $realField = $speed_fieldIndx[json_decode($_helplist)[$t]];
                    if (Left($realField, 7) == 'table_m' && json_decode($_helplist)[$t] != $up_field) {

                        if (InStr($up_joinFieldValue, ' | ') > 0) {
                            $helplist_field = $realField;
                            $helplist_fieldValue = explode(' | ', $up_joinFieldValue)[$t];
                            if ($dbalias != '') {
                                $sql_update = $sql_update . ' update ' . $table_m . ' set ' . explode('.', $helplist_field)[1] . " = N'" . sqlValueReplace($helplist_fieldValue) . "' "
                                    . " where " . str_replace('table_m.', '', $speed_fieldIndx[$up_autoincrement_key]) . "=N'" . $up_autoincrement_keyValue . "';";
                            } else {
                                $sql_update = $sql_update . ' update ' . $table_m . ' set ' . explode('.', $helplist_field)[1] . " = N'" . sqlValueReplace($helplist_fieldValue) . "' "
                                    . " from " . $table_m . " table_m where $whereSql;";
                            }
                        }

                    }
                }
            }
        }
    }


    if ($dbalias != '') {
        $sql_update = $sql_update . ' update ' . $table_m . ' set ' . explode('.', $speed_fieldIndx[$up_field])[1] . " = N'" . sqlValueReplace($up_fieldValue) . "' "
            . " where " . str_replace('table_m.', '', $speed_fieldIndx[$up_autoincrement_key]) . "=N'" . $up_autoincrement_keyValue . "';";
    } else {
        $sql_update = $sql_update . ' update ' . $table_m . ' set ' . explode('.', $speed_fieldIndx[$up_field])[1] . " = N'" . sqlValueReplace($up_fieldValue) . "' "
            . " from " . $table_m . " table_m where $whereSql;";
    }
    //gzecho($sql_update);exit;
    if (function_exists("list_json_updateBefore")) {
        list_json_updateBefore();
    }


    if ($parent_gubun != '' && $parent_idx != "") {
        $log_sql = " insert into MisReadList (RealPid, widx, userid, wdater, 자격, parent_gubun, parent_idx) 
        select N'$RealPid', N'$up_autoincrement_keyValue', N'$MisSession_UserID', N'$MisSession_UserID', N'수정', $parent_gubun, N'$parent_idx'";
    } else {
        $log_sql = " insert into MisReadList (RealPid, widx, userid, wdater, 자격) 
        select N'$RealPid', N'$up_autoincrement_keyValue', N'$MisSession_UserID', N'$MisSession_UserID', N'수정'";
    }

    if ($dbalias != '') {
        if ($MS_MJ_MY2 == 'MY') {
            if ($dbalias == '1st') {

                $log_sql = $log_sql . "
                SET @cnt := (select COUNT(*) from information_schema.Columns where TABLE_NAME = '$table_m' AND TABLE_SCHEMA='$base_db2' AND (COLUMN_NAME = 'lastupdate' or COLUMN_NAME = 'lastupdater'));
                set @query = IF(@cnt=2, 'update $table_m set lastupdate=current_timestamp(),lastupdater=N''$MisSession_UserID'' where " . $speed_fieldIndx[$up_key] . "=N''" . sqlValueReplace($up_keyValue) . "''',
                'select 111');
                prepare stmt from @query;
                EXECUTE stmt; 
                ";

            }
            //execSql_db2_mysql($log_sql);
        } else if ($MS_MJ_MY2 == 'OC') {
            //execSql_db2_oracle($log_sql);
        } else if ($isNoWriter != 'Y') {
            $log_sql = $log_sql . "
                if((select count(name) from sys.syscolumns where (name='lastupdate' or name='lastupdater') 
                and id=(select id from sys.sysobjects where name='$table_m'))=2)
                update $table_m set lastupdate=getdate(),lastupdater=N'$MisSession_UserID' from $table_m table_m where " . $speed_fieldIndx[$up_key] . "=N'" . sqlValueReplace($up_keyValue) . "'
                ";
            //execSql_db2_mssql($log_sql);
        }
    } else if ($isNoWriter != 'Y') {

        $log_sql = $log_sql . "if(
            (select count(name) from sys.syscolumns where (name='lastupdate' or name='lastupdater') 
        and id=(select id from sys.sysobjects where name='$table_m'))
        =2)
        update $table_m set lastupdate=getdate(),lastupdater=N'$MisSession_UserID' from $table_m table_m where " . $speed_fieldIndx[$up_key] . "=N'" . sqlValueReplace($up_keyValue) . "' ";
        //echo $log_sql;exit;
        //execSql($log_sql);
    }
    if (!execSql_gate($sql_update . $log_sql, $dbalias)) {
        gzecho("업데이트 실패");
        exit;
    }
    ;


    $filterQuery = ' and ' . $speed_fieldIndx[$up_key] . "=N'" . sqlValueReplace($up_keyValue) . "'";
} else if ($allFilter != "") {
    //allFilter: {"entries":[{"operator":"eq","value":"01 업무관리","field":"zsangwimenyubyeolbogi"}]}


    if (isset(json_decode($allFilter)->entries)) {
        $decode_allFilter = json_decode($allFilter)->entries;
        $row_cnt = count($decode_allFilter);
    } else {
        $row_cnt = 0;
    }

    if ($row_cnt > 0) {
        $row_ii = 0;
        foreach ($decode_allFilter as $row) {
            $field_alias = str_replace('toolbarSel_', '', str_replace('toolbar_', '', $row->field));
            $realField = $speed_fieldIndx[$field_alias];
            //$keyword = Trim(sqlValueReplace($row -> value));
            $keyword = sqlValueReplace($row->value);
            $keyword_rep = $keyword;
            if ($MS_MJ_MY == 'MS' || $MS_MJ_MY == 'MJ')
                $keyword_rep = replace($keyword, '_', '[_]');

            if ($row->operator == "contains") {
                if (InStr($keyword, ",,") > 0) {
                    if (Right($keyword, 2) == ",,")
                        $keyword = Left($keyword, Len($keyword) - 2);
                    $or_sql = '';
                    $split_keyword = explode(',,', $keyword);

                    $cnt_split_keyword = count($split_keyword);
                    for ($n = 0; $n < $cnt_split_keyword; $n++) {
                        if ($n > 0)
                            $or_sql = $or_sql . " or ";
                        $or_sql = $or_sql . $realField . " = N'" . $split_keyword[$n] . "'";
                        if ($split_keyword[$n] == '')
                            $or_sql = $or_sql . " or " . $realField . " is null";
                    }
                    $filterQuery = $filterQuery . ' and (' . $or_sql . ")";
                } else if (InStr($row->field, 'toolbarSel_') == 0 && (Left($keyword, 1) == "=" || Left($keyword, 1) == ">" || Left($keyword, 1) == "<") && InStr(Mid($keyword, 3, 100), '<') + InStr(Mid($keyword, 3, 100), '>') == 0) {
                    if (Mid($keyword, 2, 1) == "=" || Left($keyword, 2) == "<>")
                        $mark = Left($keyword, 2);
                    else
                        $mark = Left($keyword, 1);

                    $keyword = explode($mark, $keyword)[1];
                    $keyword_rep = $keyword;
                    if ($MS_MJ_MY == 'MS' || $MS_MJ_MY == 'MJ')
                        $keyword_rep = replace($keyword, '_', '[_]');

                    if ($mark == '=') {
                        $purekeyword = $keyword;
                        if ($purekeyword == '') {
                            $keyword = "''";
                        }
                    } else {
                        $purekeyword = explode(' ', $keyword)[0];
                    }

                    if ($mark == '<>') {
                        if (InStr($purekeyword, '%') > 0 || $purekeyword == '') {
                            $filterQuery = $filterQuery . ' and (' . $realField . " not like '" . $keyword_rep . "')";
                        } else {
                            $filterQuery = $filterQuery . ' and (' . $realField . " <> '" . $keyword_rep . "')";
                        }
                    } else {
                        if (!is_numeric($purekeyword))
                            $keyword = str_replace($purekeyword, "N'$purekeyword'", $keyword);
                        $filterQuery = $filterQuery . ' and (' . $realField . $mark . $keyword . ")";
                    }

                    if (InStr($keyword, ' or ') > 0 || InStr($keyword, ' and ') > 0) {

                        if (InStr($keyword, ' or ') > 0)
                            $andOr = ' or ';
                        else
                            $andOr = ' and ';
                        $newkeyword = explode($andOr, $keyword)[1];
                        if (Left($newkeyword, 1) == '=' || Left($newkeyword, 1) == '>' || Left($newkeyword, 1) == '<') {

                            if (Left($newkeyword, 2) == '<>')
                                $newmark = Left($newkeyword, 2);
                            else if (Mid($newkeyword, 2, 1) == '=')
                                $newmark = Left($newkeyword, 2);
                            else
                                $newmark = Left($newkeyword, 1);

                            if ($newmark == '<>') {
                                $newkeyword = explode($newmark, $newkeyword)[1];
                                $filterQuery = str_replace(
                                    " and (" . $realField . $mark . $keyword . ")",
                                    " and ((" . $realField . $mark . explode($andOr, $keyword)[0] . ")$andOr(" . $realField . " not like N'%" . replace($newkeyword, '_', '[_]') . "%'))",
                                    $filterQuery
                                );
                            } else {
                                $newkeyword = explode($newmark, $newkeyword)[1];
                                if (!is_numeric($newkeyword))
                                    $newkeyword = "N'" . $newkeyword . "'";
                                $filterQuery = str_replace(
                                    " and (" . $realField . $mark . $keyword . ")",
                                    " and ((" . $realField . $mark . explode($andOr, $keyword)[0] . ")$andOr(" . $realField . $newmark . $newkeyword . "))",
                                    $filterQuery
                                );
                            }

                        }
                    }
                } else {
                    //Grid_Schema_Type
                    if ($speed_Grid_Schema_Type[str_replace('toolbarSel_', '', str_replace('toolbar_', '', $row->field))] == 'boolean') {
                        if ($keyword == 'true')
                            $keyword = 1;
                        else if ($keyword == 'false')
                            $keyword = 0;
                    }
                    if ($keyword != '') {

                        $keyword_rep = $keyword;
                        if ($MS_MJ_MY == 'MS' || $MS_MJ_MY == 'MJ') {
                            $keyword_rep = replace($keyword, '_', '[_]');
                        }

                        if (InStr($filter, ") or substringof('") > 0) {   // 전체 검색 or 용 유일한 로직.
                            if ($filterQuery == '') {
                                if (InStr($keyword_rep, '%') > 0) {
                                    $filterQuery = $filterQuery . " and ($isnull(" . $realField . ",'') like N'" . $keyword_rep . "'";
                                } else {
                                    $filterQuery = $filterQuery . " and ($isnull(" . $realField . ",'') like N'%" . $keyword_rep . "%'";
                                }
                            } else {
                                if (InStr($keyword_rep, '%') > 0) {
                                    $filterQuery = $filterQuery . " or $isnull(" . $realField . ",'') like N'" . $keyword_rep . "'";
                                } else {
                                    $filterQuery = $filterQuery . " or $isnull(" . $realField . ",'') like N'%" . $keyword_rep . "%'";
                                }
                            }
                            if ($row_cnt == $row_ii + 1)
                                $filterQuery = $filterQuery . ')';
                        } else {
                            if (InStr($keyword_rep, '%') > 0) {
                                $filterQuery = $filterQuery . " and $isnull(" . $realField . ",'') like N'" . $keyword_rep . "'";
                            } else {
                                $filterQuery = $filterQuery . " and $isnull(" . $realField . ",'') like N'%" . $keyword_rep . "%'";
                            }
                        }
                    }
                }
            } else if ($row->operator == "eq") {
                if ($keyword == '(BLANK)') {
                    $filterQuery = $filterQuery . ' and (' . $realField . " is null or " . $realField . " = N'')";
                } else {
                    $filterQuery = $filterQuery . " and $isnull(" . $realField . ",'') = N'" . $keyword . "'";
                }

            } else if ($row->operator == "doesnotendwith") {
                if ($keyword == '') {
                } else if ($keyword == '(BLANK)' || $keyword == 'null') {
                    $filterQuery = $filterQuery . ' and (' . $realField . " is null or " . $realField . " = N'')";
                } else {
                    if (Right($keyword, 5) == ',null') {
                        $keyword = Left($keyword, Len($keyword) - 5) . ',(BLANK)';
                    } else if (Left($keyword, 5) == 'null,') {
                        $keyword = '(BLANK),' . Mid($keyword, 6, 999);
                    } else if (InStr($keyword, ',null,') > 0) {
                        $keyword = replace($keyword, ',null,', ',(BLANK)');
                    }
                    $keyword = replace($keyword, '(BLANK)', '');
                    $filterQuery = $filterQuery . " and $isnull(" . $realField . ",'') in ('" . replace(replace($keyword, ",", "','"), ",''", "") . "')";
                }
            } else if ($row->operator == 'startswith') {
                $filterQuery = $filterQuery . ' and ' . $realField . " like N'" . $keyword_rep . "%'";
            } else if ($row->operator == 'endswith') {
                $filterQuery = $filterQuery . ' and ' . $realField . " like N'%" . $keyword_rep . "'";
            } else if ($row->operator == 'doesnotcontain') {
                $filterQuery = $filterQuery . ' and ' . $realField . " not like N'%" . $keyword_rep . "%'";
            } else {
                $keyword1 = '';
                $keyword2 = '';
                $operator1 = '>=';
                $operator2 = '<=';

                if ($row->operator == 'gt') {
                    $keyword1 = $keyword;
                    $operator1 = '>';
                } else if ($row->operator == 'gte') {
                    $keyword1 = $keyword;
                } else if ($row->operator == 'lt') {
                    $keyword2 = $keyword;
                    $operator2 = '<';
                } else if ($row->operator == 'lte') {
                    $keyword2 = $keyword;
                } else if ($row->operator == 'between') {
                    $keyword1 = explode('~', $keyword)[0];
                    $keyword2 = explode('~', $keyword)[1];
                } else {
                    gzecho('알수없는 operator 로 인해 중지합니다.');
                    exit;
                }

                if (Left($speed_Grid_Schema_Type[$field_alias], 8) == 'datetime') {
                    if ($keyword1 != '') {
                        $filterQuery = $filterQuery . ' and ' . $realField . $operator1 . " N'" . $keyword1 . "'";
                    }
                    if (is_date($keyword2)) {
                        $filterQuery = $filterQuery . ' and ' . $realField . $operator2 . " N'" . $keyword2 . " 23:59:59'";
                    } else if ($keyword2 != '') {
                        $filterQuery = $filterQuery . ' and ' . $realField . $operator2 . " N'" . $keyword2 . "'";
                    }
                } else if (Left($speed_Grid_Schema_Type[$field_alias], 6) == 'number') {
                    $keyword1 = str_replace(',', '', $keyword1);
                    $keyword2 = str_replace(',', '', $keyword2);
                    if (is_numeric($keyword1)) {
                        $filterQuery = $filterQuery . ' and ' . $realField . $operator1 . $keyword1 . " ";
                    } else if ($keyword1 != '') {
                        $filterQuery = $filterQuery . ' and ' . $realField . $operator1 . " N'" . $keyword1 . "'";
                    }
                    if (is_numeric($keyword2)) {
                        $filterQuery = $filterQuery . ' and ' . $realField . $operator2 . $keyword2 . " ";
                    } else if ($keyword2 != '') {
                        $filterQuery = $filterQuery . ' and ' . $realField . $operator2 . " N'" . $keyword2 . "'";
                    }
                } else {
                    if ($keyword1 != '') {
                        $filterQuery = $filterQuery . ' and ' . $realField . $operator1 . " N'" . $keyword1 . "'";
                    }
                    if ($keyword2 != '') {
                        $filterQuery = $filterQuery . ' and ' . $realField . $operator2 . " N'" . $keyword2 . "'";
                    }
                }
            }
            ++$row_ii;
        }
    }

}

if ($selValue != '' && ($flag == 'onefield' || Left($flag, 8) == 'toolbar_')) {

    if ($flag == "toolbar_searchField_kendoMultiSelect") {
        //$filterQuery = ' and ' . $speed_fieldIndx[$selField] . " in ('" . replace(replace($selValue,",","','"),",''","") . "')";
    } else {
        $selValue_rep = $selValue;
        if ($MS_MJ_MY == 'MS' || $MS_MJ_MY == 'MJ') {
            $selValue_rep = replace($selValue, '_', '[_]');
        }
        $filterQuery = ' and ' . $speed_fieldIndx[$selField] . " like N'%" . sqlValueReplace($selValue) . "%'";

    }
}


if ($filterQuery != '')
    $selectQueryAll = $selectQuery . $joinAndWhere;

$tt0 = explode('where 9=9', $joinAndWhere);
$tt1 = $tt0[0];
$tt2 = $tt0[1] . $filterQuery;
if ($selField != '') {
    $tt2 = $tt2 . $speed_fieldIndx[$selField];
    $resultCode = '';
    $resultMessage = '';
}
$selectQuery2 = $selectQuery;
$selectQuery = $selectQuery . $joinAndWhere . $filterQuery;



$pagenumber = '';


if (InStr($tt1, 'left outer join ') > 0) {

    $tt3 = explode('left outer join ', $tt1);
    $tt9 = '';
    for ($ii = count($tt3) - 1; $ii >= 1; $ii--) {
        $tt4 = trim(str_replace('  ', ' ', trim($tt3[$ii])));

        $tt4 = replace($tt4, ' ON ', ' on ');
        $tt5 = explode(' on ', $tt4)[count(explode(' on ', $tt4)) - 2];

        $tt5 = explode(' ', $tt5)[count(explode(' ', $tt5)) - 1];
        //echo "\n::::::" . $tt2 . '------' . $tt5 . "\n";
        if (InStr(strtolower($tt2), strtolower($tt5) . '.') > 0) {
            $tt9 = 'left outer join ' . $tt4;
            $tt9 = substr($tt1, 0, strpos(strtolower($tt1), strtolower($tt9)) + strlen($tt9) + 1);
            $ii = -1;
        }
    }
    //echo "\n end---";

    $selectQuery2 = $selectQuery2 . $tt9 . ' where 9=9' . $tt0[1] . $filterQuery;
    //count_sql = tt0 & " FROM " & table_m & " table_m " & tt9 & " WHERE 9=9 " & tt2
} else
    $selectQuery2 = $selectQuery;

if (InStr($Grid_GroupCompute, 'group by') > 0) {
    $selectQuery = $selectQuery . "\n" . $Grid_GroupCompute . "\n";
    $selectQuery2 = $selectQuery2 . "\n" . $Grid_GroupCompute . "\n";
}
///////////////////

if ($flag == 'update') {
    $selectQuery = 'select * from (' . str_replace('{rowNumber_field},', '', $selectQuery) . ') aaa ';
} else if ($selField != "") {

    $distincts = 'distinct 1';
    if ($filter == '') {  //이 경우는 최초 로딩시, 즉 필터가 없을 때는 궃이 order by 를 위해 1로 하지 않음.
        $distincts = 'distinct 2';
    }
    //$countQuery = "select count(*) from (select distinct " . $speed_fieldIndx[$selField] . " as \"fff\" from " . $table_m . ' table_m ' . explode('from ' . $table_m . ' table_m',$selectQuery2)[1] . ") aaa ";
    $selectQuery = "select $distincts as nnn, " . $speed_fieldIndx[$selField] . " as \"" . $selField . "\" from " . $table_m . ' table_m ' . explode('from ' . $table_m . ' table_m', $selectQuery)[1];
    $countQuery = 'select 1 as fff';
    if ($MS_MJ_MY == 'MY') {
        if ($filterQuery != '' && $flag != 'read') {
            $selectQueryAll = 'select distinct 2 as AAA, ' . $speed_fieldIndx[$selField] . " as \"" . $selField . "\" from " . $table_m . ' table_m ' . explode('from ' . $table_m . ' table_m', str_replace($filterQuery, str_replace(" like N'%$selValue%'", " not like N'%$selValue%'", $filterQuery), $selectQuery))[1];

            $selectQuery = 'select ' . $selField . ' from (' . $selectQuery . ' union ' . $selectQueryAll . ") aaa order by nnn, " . $selField . " limit 31";
            //$selectQuery = 'select ' . $selField . ' from (' . $selectQuery . ") aaa order by nnn, " . $selField . " limit 30";
        } else
            $selectQuery = 'select ' . $selField . ' from (' . $selectQuery . ") aaa order by nnn, " . $selField . " limit 31";
    } else {
        if ($filterQuery != '' && $flag != 'read') {
            $selectQueryAll = "select distinct 2 as AAA, " . $speed_fieldIndx[$selField] . " as \"" . $selField . "\" from " . $table_m . ' table_m ' . explode('from ' . $table_m . ' table_m', str_replace($filterQuery, str_replace(" like N'%$selValue%'", " not like N'%$selValue%'", $filterQuery), $selectQuery))[1];

            $selectQuery = "select top 100 " . $selField . ' from (' . $selectQuery . ' union ' . $selectQueryAll . ") aaa order by nnn, " . $selField;
            //$selectQuery = "select top 30 " . $selField . ' from (' . $selectQuery . ") aaa order by nnn, " . $selField ;
        } else
            $selectQuery = "select top 100 " . $selField . ' from (' . $selectQuery . ") aaa order by nnn, " . $selField;
    }

} else {


    $temp1 = explode(',', $orderby);
    $forMax = count($temp1);
    $groupbyQuery = '';
    for ($ii = 0; $ii < $forMax; $ii++) {
        if ($ii > 0)
            $orderbyQuery = $orderbyQuery . ',';
        $temp2 = explode(' ', $temp1[$ii]);

        if (count($temp2) == 1)
            $orderbyQuery = $orderbyQuery . $speed_fieldIndx[$temp1[$ii]];
        else
            $orderbyQuery = $orderbyQuery . $speed_fieldIndx[$temp2[0]] . " " . $temp2[1];

        if ($ChkOnlySum == '2') {
            if ($ii == 0)
                $groupbyQuery = ' group by ';
            else
                $groupbyQuery = $groupbyQuery . ',';

            $temp2 = explode(' ', $temp1[$ii]);

            $groupbyQuery = $groupbyQuery . $speed_fieldIndx[$temp2[0]];
        }
    }
    $selectQuery = $selectQuery . $groupbyQuery . ' ';


    //echo $selectQuery2;exit;
    if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
        $countQuery = "select count(*) from \"" . $table_m . "\" table_m " . explode("from \"" . $table_m . "\" table_m", $selectQuery2)[1];
    } else {
        $countQuery = "select count(*) from " . $table_m . ' table_m ' . explode('from ' . $table_m . ' table_m', $selectQuery2)[1];
        if (InStr($Grid_GroupCompute, 'group by') > 0) {
            $countQuery = replace($countQuery, 'select count(*) from', 'select count(*) as cnt from');
            $countQuery = "select count(*) from (
                $countQuery
            ) kkk
            ";
        }
    }
    //echo $countQuery;exit;


    if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
        if (1 == 1 || $chartKey == '') {
            $selectQuery = str_replace('{rowNumber_field},', "", $selectQuery);
            if ($backup == 'Y')
                $top = 10000000;
            else if ($req_top != '')
                $top = $req_top * 1;
            else
                $top = 100;


            $selectQuery = str_replace('where 9=9', ', (select @RANKT := 0) XX where 9=9', $selectQuery) . $orderbyQuery;
            if (InStr($selectQuery, 'order by date_format(table_m.lastupdate') > 0) {
                $selectQuery = "select bbb.* from (select @RANKT := @RANKT + 1 as \"rowNumber\",aaa.* from (" . $selectQuery . " limit " . ($skip + $top) . ") aaa) bbb where rowNumber between " . ($skip + 1) . ' and ' . ($skip + $top);
            } else {
                $selectQuery = "select bbb.* from (select @RANKT := @RANKT + 1 as \"rowNumber\",aaa.* from (" . $selectQuery . " limit " . ($skip + $top) . ") aaa order by $orderby) bbb where rowNumber between " . ($skip + 1) . ' and ' . ($skip + $top);
            }
        } else {
            $selectQuery = str_replace('{rowNumber_field}', "@RANKT := @RANKT + 1 as \"rowNumber\"", $selectQuery);
            if ($backup == 'Y')
                $top = 10000000;
            else if ($req_top != '')
                $top = $req_top * 1;
            else
                $top = 100;

            $selectQuery = str_replace('where 9=9', ',(select @RANKT := 0) XX where 9=9', $selectQuery) . $orderbyQuery;
            $selectQuery = "select * from (" . $selectQuery . ") aaa where rowNumber between " . ($skip + 1) . ' and ' . ($skip + $top) . " order by 1 ";
        }
    } else {
        if ($backup == 'Y')
            $top = 10000000;
        else if ($req_top != '')
            $top = $req_top * 1;
        else
            $top = 100;

        $selectQuery = str_replace('{rowNumber_field}', 'ROW_NUMBER() over (' . $orderbyQuery . ") as \"rowNumber\"", $selectQuery);
        $selectQuery = "select * from (" . $selectQuery . ") aaa where \"rowNumber\" between " . ($skip + 1) . ' and ' . ($skip + $top) . " order by 1 ";
    }


    /* mssql & mysql select 문 비교
    select * from (select ROW_NUMBER() over (order by table_m.mb_id,table_m.mb_datetime) as rowNumber,table_m.mb_no as 'mb_no'
    ,table_m.mb_id as 'mb_id'
    from g5_member_copy table_m
    where 9=9  and 111=111 
    ) aaa where rowNumber between 1 and 100


    select * from (select @RANKT := @RANKT + 1 as rowNumber,table_m.mb_no as 'mb_no'
        ,table_m.mb_id as 'mb_id'
        from g5_member_copy table_m,  (SELECT @RANKT := 0) XX
        where 9=9  and 111=111 
        order by table_m.mb_id,table_m.mb_datetime
        ) aaa where rowNumber between 1 and 100;
    */



    $pagenumber = iif($skip == '0', '1', $skip / $top + 1);
    if ($resultMessage == '') {
        if ($backup == 'Y') {
            $resultMessage = '정상적으로 백업되었습니다.';
        } else {
            $resultMessage = '정상적으로 ' . $pagenumber . ' 페이지가 조회되었습니다 || 총 {cnt}건';
        }
    }

}


$countQuery = str_replace('@MisSession_UserID', $MisSession_UserID, $countQuery);
$countQuery = str_replace('@MisSession_PositionCode', $MisSession_PositionCode, $countQuery);
$countQuery = str_replace('@RealPid', $RealPid, $countQuery);
$countQuery = str_replace('@parent_RealPid', $parent_RealPid, $countQuery);
$countQuery = str_replace('@MisSession_StationNum', $MisSession_StationNum, $countQuery);

$selectQuery = str_replace('@MisSession_UserID', $MisSession_UserID, $selectQuery);
$selectQuery = str_replace('@MisSession_PositionCode', $MisSession_PositionCode, $selectQuery);
$selectQuery = str_replace('@RealPid', $RealPid, $selectQuery);
$selectQuery = str_replace('@parent_RealPid', $parent_RealPid, $selectQuery);
$selectQuery = str_replace('@MisSession_StationNum', $MisSession_StationNum, $selectQuery);

if (function_exists('list_query')) {
    list_query();
}

//echo $selectQuery;exit;
if ($app == 'saveAsXls') {
    //print_r($selectQuery);exit;
    $mm = 0;
    $Grid_Columns_Title_all = ';';
    while ($mm < $cnt_result) {
        $aliasName = $result[$mm]['aliasName'];
        $Grid_Columns_Title = $result[$mm]['Grid_Columns_Title'];
        $Grid_Columns_Title = str_replace(':', '', $Grid_Columns_Title);
        $Grid_Columns_Title = splitVB($Grid_Columns_Title, ',')[count(splitVB($Grid_Columns_Title, ',')) - 1];
        $Grid_Select_Tname = $result[$mm]['Grid_Select_Tname'];
        $Grid_Select_Field = $result[$mm]['Grid_Select_Field'];
        $Grid_Columns_Width = $result[$mm]['Grid_Columns_Width'] * 1;
        $Grid_CtlName = $result[$mm]['Grid_CtlName'];
        if ($Grid_CtlName == 'attach') {
        } else if ($Grid_CtlName == 'textdecrypt2') {
            $Grid_Select_Tname = '';
            $Grid_Select_Field = "'[암호화]'";
        }
        $Grid_Schema_Type = $result[$mm]['Grid_Schema_Type'];
        if ($Grid_CtlName == 'textdecrypt1' || $Grid_Schema_Type == 'textdecrypt1') {
            if ($Grid_Select_Tname == '') {
                if ($MS_MJ_MY == 'MY') {
                    $FullFieldName = "AES_DECRYPT(UNHEX($Grid_Select_Field), '$pwdKey')";
                } else {
                    $FullFieldName = "convert(nvarchar(1000),decryptbypassphrase('$pwdKey',$Grid_Select_Field))";
                }
            } else {
                if ($MS_MJ_MY == 'MY') {
                    $FullFieldName = "AES_DECRYPT(UNHEX($Grid_Select_Tname.$Grid_Select_Field), '$pwdKey')";
                } else {
                    $FullFieldName = "convert(nvarchar(1000),decryptbypassphrase('$pwdKey',$Grid_Select_Tname.$Grid_Select_Field))";
                }
            }
        } else if ($Grid_Select_Tname == 'table_m') {
            $FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
        } else if ($Grid_Select_Tname != '') {
            /*
            //차후과제!!!!!!!!!
            if($result[$mm+1]["Grid_PrimeKey"]!="") {
                //$Grid_Select_Field = 
                if(InStr($result[$mm+1]["Grid_PrimeKey"], "@outer_tbname")>0) {
                    $FullFieldName = str_replace(explode($result[$mm+1]["Grid_PrimeKey"],"#")[0], "@outer_tbname", $Grid_Select_Tname);
                } else {
                    $FullFieldName = $Grid_Select_Tname . "." . $Grid_Select_Field;
                }
            } else {
            }
            */
            $FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
        } else {
            $FullFieldName = $Grid_Select_Field;
        }
        /*
        if($dbalias!='' && $MS_MJ_MY2=='MY') {
            if(($flag=='readResult' || $flag=='read') && $Grid_Schema_Type=='date') {
                //목록조회 및 순수필드일 경우, 컨버팅
                if(InStr($FullFieldName, '(')==0) $FullFieldName = 'date_format(' . $FullFieldName . ",'%Y-%m-%d')";
            } else if($Grid_Schema_Type=='date' || $Grid_Schema_Type=='datetime') {
                //목록조회 및 순수필드일 경우, 컨버팅
                if(InStr($FullFieldName, '(')==0) $FullFieldName = 'date_format(' . $FullFieldName . ",'%Y-%m-%d %H:%i:%s')";
            } else if(($flag=='readResult' || $flag=='read') && $Grid_Schema_Type=='boolean') {
                //bit type 을 그대로 출력하면 1도 0으로 나오는 문제 해결위해서.
                if(InStr($FullFieldName, '(')==0) $FullFieldName = 'BIN(' . $FullFieldName . ")";
            }
        } else if($dbalias!='' && $MS_MJ_MY2=='OC') {
            if(($flag=='readResult' || $flag=='read') && $Grid_Schema_Type=='date') {
                //목록조회 및 순수필드일 경우, 컨버팅
                if(InStr($FullFieldName, '(')==0) $FullFieldName = 'to_char(' . $FullFieldName . ",'yyyy-mm-dd')";
            } else if($Grid_Schema_Type=='date' || $Grid_Schema_Type=='datetime') {
                //목록조회 및 순수필드일 경우, 컨버팅
                if(InStr($FullFieldName, '(')==0) $FullFieldName = 'to_char(' . $FullFieldName . ",'yyyy-mm-dd hh24:mi:ss')";
            }
        } else {
            if(($flag=='readResult' || $flag=='read') && $Grid_Schema_Type=='date') {
                //목록조회 및 순수필드일 경우, 컨버팅
                if(InStr($FullFieldName, '(')==0) $FullFieldName = 'convert(char(10),' . $FullFieldName . ',120)';
            } else if($Grid_Schema_Type=='date' || $Grid_Schema_Type=='datetime') {
                //목록조회 및 순수필드일 경우, 컨버팅
                if(InStr($FullFieldName, '(')==0) $FullFieldName = 'convert(char(16),' . $FullFieldName . ',120)';
            }
        }
        */


        //echo ";$Grid_Columns_Width;";
        if ($Grid_Columns_Width >= -2 && $Grid_Columns_Width <= 0) {
            $selectQuery = replace(
                $selectQuery,
                ',' . $FullFieldName . ' as "' . $aliasName . '"',
                ''
            );
            $selectQuery = replace(
                $selectQuery,
                ',' . "''" . ' as "' . $aliasName . '"',
                ''
            );
            $selectQuery = replace(
                $selectQuery,
                ',' . $Grid_Select_Field . ' as "' . $aliasName . '"',
                ''
            );
            $selectQuery = replace(
                $selectQuery,
                ' as "' . $aliasName . '"',
                ' as "' . $Grid_Columns_Title . '"'
            );

        } else {
            if (InStr($Grid_Columns_Title_all, ";$Grid_Columns_Title;") > 0) {
                $Grid_Columns_Title = $Grid_Columns_Title . 'A';
                if (InStr($Grid_Columns_Title_all, ";$Grid_Columns_Title" . 'A') > 0) {
                    $Grid_Columns_Title = Left($Grid_Columns_Title, Len($Grid_Columns_Title) - 1) . 'B';

                    if (InStr($Grid_Columns_Title_all, ";$Grid_Columns_Title" . 'B') > 0) {
                        $Grid_Columns_Title = Left($Grid_Columns_Title, Len($Grid_Columns_Title) - 1) . 'C';

                        if (InStr($Grid_Columns_Title_all, ";$Grid_Columns_Title" . 'C') > 0) {
                            $Grid_Columns_Title = Left($Grid_Columns_Title, Len($Grid_Columns_Title) - 1) . 'D';

                            if (InStr($Grid_Columns_Title_all, ";$Grid_Columns_Title" . 'D') > 0) {
                                $Grid_Columns_Title = $Grid_Columns_Title . 'E';
                                $Grid_Columns_Title = Left($Grid_Columns_Title, Len($Grid_Columns_Title) - 1) . 'E';
                            }
                        }
                    }
                }
            }
            $Grid_Columns_Title_all = $Grid_Columns_Title_all . $Grid_Columns_Title . ';';

            if ($Grid_Select_Tname != 'table_m' && $Grid_Select_Tname != '') {
                if (InStr($selectQuery, " $Grid_Select_Tname on $Grid_Select_Tname.") == 0) {
                    $selectQuery = replace(
                        $selectQuery,
                        ',' . $FullFieldName . ' as "' . $aliasName . '"',
                        ''
                    );
                    $selectQuery = replace(
                        $selectQuery,
                        ',' . "''" . ' as "' . $aliasName . '"',
                        ''
                    );
                    $selectQuery = replace(
                        $selectQuery,
                        ',' . $Grid_Select_Field . ' as "' . $aliasName . '"',
                        ''
                    );
                    $selectQuery = replace(
                        $selectQuery,
                        ',' . $FullFieldName . ' as "' . $Grid_Columns_Title . '"',
                        ''
                    );
                    //echo $selectQuery . "\n," . $FullFieldName. ' as "'. $Grid_Columns_Title . '"::::';exit;
                }
            }

            $selectQuery = replace(
                $selectQuery,
                ',' . $FullFieldName . ' as "' . $aliasName . '"',
                ',' . $FullFieldName . ' as "' . $Grid_Columns_Title . '"'
            );
            $selectQuery = replace(
                $selectQuery,
                ',' . "''" . ' as "' . $aliasName . '"',
                ',' . "''" . ' as "' . $Grid_Columns_Title . '"'
            );
            $selectQuery = replace(
                $selectQuery,
                ' as "' . $aliasName . '"',
                ' as "' . $Grid_Columns_Title . '"'
            );


        }
        //echo $mm . '::::' . $selectQuery . "\n,";


        ++$mm;

    }
    //exit;
    //echo $selectQuery;exit;
    if ($MS_MJ_MY == 'MY') {
        $selectQuery = splitVB($selectQuery, 'aaa.* from (')[1];
        $selectQuery = splitVB($selectQuery, ' limit ' . ($skip + $top) . ') aaa order by')[0];
    } else {
        $selectQuery = 'select ROW_NUMBER()' . splitVB($selectQuery, 'select * from (select ROW_NUMBER()')[1];
        $selectQuery = splitVB($selectQuery, ') aaa where')[0];
        $selectQuery = replace($selectQuery, ' as "rowNumber"', ' as "No."');
    }

}



if ($app == 'saveAsXls') {
    $array = allreturnSql($selectQuery);

    gzecho(build_table($array));

    exit;
}

if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
    if (InStr($selectQuery, 'select top 100') > 0) {
        $selectQuery = str_replace('select top 100', 'select', $selectQuery) . ' limit 100;';
    }
}


if (requestVB('isSql') == 'Y') {
    gzecho($selectQuery);
    exit;
}


if ($chartKey != '') {

    if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
        $chartKey_sql = "case when ifnull($chartKey,'')='' then '(no data)' else left($chartKey,15) end";
        if ($chartNumberColumns != "") {
            $chartNumberColumns_sql = ', sum(' . str_replace(',', ') as "value1", sum(', $chartNumberColumns) . ') as "value1"';

            for ($j = 0; $j < count(explode(',', $chartNumberColumns)); $j++) {
                $chartNumberColumns_sql = str_replace('(' . explode(',', $chartNumberColumns)[$j] . ') as "value1"', '(' . explode(',', $chartNumberColumns)[$j] . ') as "' . explode(',', $chartNumberColumns)[$j] . '"', $chartNumberColumns_sql);
            }
            $chartQuery = str_replace('select bbb.* from (', 'select * from (select ' . $chartKey_sql . ' as "category", count(' . $chartKey_sql . ') as "value"' . $chartNumberColumns_sql . ' from (', $selectQuery);
        } else {
            $chartQuery = str_replace('select bbb.* from (', 'select * from (select ' . $chartKey_sql . ' as "category", count(' . $chartKey_sql . ') as "value" from (', $selectQuery);
        }
        $chartQuery = splitVB($chartQuery, ') bbb where')[0] . ') bbb group by ' . $chartKey_sql . ') bbb2 ';

        if ($chartOrderBy == "high" && $chartNumberColumns != '')
            $chartQuery = $chartQuery . "order by 3 desc";
        else if ($chartOrderBy == "high")
            $chartQuery = $chartQuery . "order by 2 desc";
        else if ($chartOrderBy == "low" && $chartNumberColumns != '')
            $chartQuery = $chartQuery . "order by 3";
        else if ($chartOrderBy == "low")
            $chartQuery = $chartQuery . "order by 2";
        else if ($chartOrderBy == "abc")
            $chartQuery = $chartQuery . "order by 1";
        else if ($chartOrderBy == "cba")
            $chartQuery = $chartQuery . "order by 1 desc";

        $chartQuery = $chartQuery . " limit $chartTop";

    } else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
        $chartKey_sql = "case when NVL(\"$chartKey\",'')='' then '(no data)' else substr(\"$chartKey\",1,15) end";

        if ($chartNumberColumns != "") {
            $chartNumberColumns_sql = ', sum(' . str_replace(',', ') as "value1", sum(', $chartNumberColumns) . ') as "value1"';

            for ($j = 0; $j < count(explode(',', $chartNumberColumns)); $j++) {
                $chartNumberColumns_sql = str_replace('(' . explode(',', $chartNumberColumns)[$j] . ') as "value1"', '(' . explode(',', $chartNumberColumns)[$j] . ') as "' . explode(',', $chartNumberColumns)[$j] . '"', $chartNumberColumns_sql);
            }
            $chartQuery = str_replace('select * from (select', ' ' . 'select ' . $chartKey_sql . ' as "category", count(' . $chartKey_sql . ') as "value"' . $chartNumberColumns_sql . ' from (select', $selectQuery);
        } else {
            $chartQuery = str_replace('select * from (select', ' ' . 'select ' . $chartKey_sql . ' as "category", count(' . $chartKey_sql . ') as "value" from (select', $selectQuery);
        }
        $chartQuery = "select * from (" . explode(') aaa where', $chartQuery)[0] . ') aaa group by ' . $chartKey_sql . ") bbb where ROWNUM <= $chartTop ";

        if ($chartOrderBy == "high" && $chartNumberColumns != '')
            $chartQuery = $chartQuery . "order by 3 desc";
        else if ($chartOrderBy == "high")
            $chartQuery = $chartQuery . "order by 2 desc";
        else if ($chartOrderBy == "low" && $chartNumberColumns != '')
            $chartQuery = $chartQuery . "order by 3";
        else if ($chartOrderBy == "low")
            $chartQuery = $chartQuery . "order by 2";
        else if ($chartOrderBy == "abc")
            $chartQuery = $chartQuery . "order by 1";
        else if ($chartOrderBy == "cba")
            $chartQuery = $chartQuery . "order by 1 desc";

    } else {
        $chartKey_sql = "case when $isnull($chartKey,'')='' then '(no data)' else left($chartKey,15) end";
        if ($chartNumberColumns != "") {
            $chartNumberColumns_sql = ', sum(' . str_replace(',', ') as "value1", sum(', $chartNumberColumns) . ') as "value1"';

            for ($j = 0; $j < count(explode(',', $chartNumberColumns)); $j++) {
                $chartNumberColumns_sql = str_replace('(' . explode(',', $chartNumberColumns)[$j] . ') as "value1"', '(' . explode(',', $chartNumberColumns)[$j] . ') as "' . explode(',', $chartNumberColumns)[$j] . '"', $chartNumberColumns_sql);
            }
            $chartQuery = str_replace('select * from (select', ' ' . 'select ' . $chartKey_sql . ' as "category", count(' . $chartKey_sql . ') as "value"' . $chartNumberColumns_sql . ' from (select', $selectQuery);
        } else {
            $chartQuery = str_replace('select * from (select', ' ' . 'select ' . $chartKey_sql . ' as "category", count(' . $chartKey_sql . ') as "value" from (select', $selectQuery);
        }
        $chartQuery = "select top $chartTop * from (" . explode(') aaa where', $chartQuery)[0] . ') aaa group by ' . $chartKey_sql . ') bbb ';

        if ($chartOrderBy == "high" && $chartNumberColumns != '')
            $chartQuery = $chartQuery . "order by 3 desc";
        else if ($chartOrderBy == "high")
            $chartQuery = $chartQuery . "order by 2 desc";
        else if ($chartOrderBy == "low" && $chartNumberColumns != '')
            $chartQuery = $chartQuery . "order by 3";
        else if ($chartOrderBy == "low")
            $chartQuery = $chartQuery . "order by 2";
        else if ($chartOrderBy == "abc")
            $chartQuery = $chartQuery . "order by 1";
        else if ($chartOrderBy == "cba")
            $chartQuery = $chartQuery . "order by 1 desc";
    }

    $chart_data = jsonReturnSql_gate($chartQuery, $dbalias);

} else {
    $chart_data = "[]";
}

//gzecho($selectQuery);

if ($MS_MJ_MY2 == 'MY' || $MS_MJ_MY2 == 'OC') {
    $selectQuery_speed = $selectQuery;
} else {
    $selectQuery_speed = replace($selectQuery, "from $table_m table_m", "from $table_m table_m WITH (READPAST)");
}
$_count = onlyOnereturnSql_gate($countQuery, $dbalias);
if ($onlyCnt == 'Y') {
    gzecho($_count);
    exit;
} else if ($lite == 'Y') {
    $data = '[]';
} else {
    /*
    if($flag!='update' && $selField=='' && $MS_MJ_MY!='MY') {
        //$selectQuery_speed = replace($selectQuery, "select ROW_NUMBER() over (" . $orderbyQuery . ")", "select top " . ($skip+$top) . " ROW_NUMBER() over (" . $orderbyQuery . ")");
        //convert 를 넣으면 쿼리의 특이하게 느려지는 문제해결.
        $selectQuery_speed = replace($selectQuery, "select ROW_NUMBER() over (" . $orderbyQuery . ")", "select convert(int,ROW_NUMBER() over (" . $orderbyQuery . "))");
    }
    */
    //gzecho($selectQuery_speed);
    $data = jsonReturnSql_gate($selectQuery_speed, $dbalias);
    if (Len($data) == 0 && $MS_MJ_MY == 'MJ') {  //MJ 일 경우, 매우 특이한 경우 에러발생.
        $MS_MJ_MY = 'MS';
        $data = jsonReturnSql_gate($selectQuery_speed, $dbalias);
        $afterScript = "if(typeof read_idx=='function') read_idx();";
    }

    if ($flag != 'update' && $selField == '') {
        //ROW_NUMBER MSSQL 의 이상작동에 의해 값이 없을 경우 원래의 쿼리로 변경하여 실행
        if ($data == '[]' && $_count * 1 > 0)
            $data = jsonReturnSql_gate($selectQuery, $dbalias);
    }


}

//gzecho(json_encode($data,JSON_UNESCAPED_UNICODE));
//exit;
if ($selField != "") {
    $dataRep = str_replace($selField, '', $data);
    $dataRep = Left($dataRep, 50) . Right($dataRep, 50);
    $dataRep = str_replace('-', '', str_replace(':', '', str_replace(',', '', str_replace(']', '', str_replace('[', '', str_replace('}', '', str_replace('{', '', str_replace('"', '', $dataRep))))))));
    $isnum = is_numeric($dataRep);
    if ($isnum == 1) {
        if ($MS_MJ_MY2 == 'MY' && $dbalias != '') {
            $selectQuery = str_replace(' limit 31', ' desc limit 31', $selectQuery);
        } else {
            $selectQuery = $selectQuery . ' desc';
        }
        $data = jsonReturnSql_gate($selectQuery, $dbalias);

    }
}

$commentSql = '';

if ($RealPid != "speedmis000974" && $RealPid != "speedmis000979" && $selField == "") {

    $decode_data = json_decode($data);
    //오라클의 컨텐츠로직
    if ($contentList != "" && $contentList != ";") {
        for ($i = 1; $i < count(explode(';', $contentList)) - 1; $i++) {
            $r = '';
            for ($j = 0; $j < 200; $j++) {
                $r = $r . $decode_data[0]->{explode(';', $contentList)[$i] . "_" . ($j + 1)};
                unset($decode_data[0]->{explode(';', $contentList)[$i] . "_" . ($j + 1)});
            }
            $decode_data[0]->{explode(';', $contentList)[$i]} = $r;
        }
        $data = json_encode($decode_data, JSON_UNESCAPED_UNICODE);
    }
    //데이터 건수
    $cnt = count($decode_data);



    if ($helpbox == '' && $cnt > 0 && $decode_data && $commentData == '[]') {

        $arrayIdx = "'" . $decode_data[0]->{$key_aliasName} . "'";
        for ($i = 1; $i < $cnt; $i++) {
            $arrayIdx = $arrayIdx . ",'" . $decode_data[$i]->{$key_aliasName} . "'";
        }
        $commentSql = "select midx, count(idx) as commentCnt from MisComments
        where useflag=1 and midx in ($arrayIdx) and RealPid='$RealPid' group by midx";

        /*
        if($MS_MJ_MY=="MJ") {
            $commentData = onlyOnereturnSql("select isnull((" . $commentSql . " for json path, INCLUDE_NULL_VALUES),'[]')");
        } else {
            $commentData = $database->query($commentSql)->fetchAll(PDO::FETCH_ASSOC);
            $commentData = json_encode($commentData,JSON_UNESCAPED_UNICODE);
        }
        */
        $commentData = jsonReturnSql($commentSql);



    }

}


/*
if (isset($_GET['selField"])) {
    $data = '[{"' . $selField . '":""},' . Mid($data,2,1000000);
}
*/
if ($selField != "") {
    //if($flag=="toolbar_searchField_kendoDropDownList") $data = '[{"' . $selField . '":""},' . Mid($data,2,1000000);
    $data = replace($data, ',{"' . $selField . '":null}', '');

    if (Left($flag, 8) != 'toolbar_' && $flag != 'onefield') {
        $data = replace($data, ':""}', ':",,"}');
        $data = replace($data, ':null}', ':",,"}');
    }
}
if (function_exists("list_json_load")) {
    if (json_encode($data, JSON_UNESCAPED_UNICODE) != '"[]"')
        list_json_load();
}

//[{"zsangwimenyubyeolbogi":"00 HOME"},

if ($flag == 'update' && ($dbalias == '' || $dbalias == '1st')) {

    //$Grid_Schema_Validation 는 savefield 기능과 관련됨.
    $sql = "select aliasName,Grid_Schema_Validation from $MisMenuList_Detail 
    where RealPid='$logicPid' and $isnull(Grid_Schema_Validation,'') like '\"savefield\"%' order by sortelement ";
    $Grid_Schema_Validation = allreturnSql($sql);
    $savefield_sql = '';

    $cnt_Grid_Schema_Validation = count($Grid_Schema_Validation);
    if ($cnt_Grid_Schema_Validation > 0) {
        $result_data = json_decode($data)[0];

        for ($j = 0; $j < $cnt_Grid_Schema_Validation; $j++) {
            $savefield = json_decode('{' . $Grid_Schema_Validation[$j]['Grid_Schema_Validation'] . '}')->savefield[0];
            $savealias = $Grid_Schema_Validation[$j]['aliasName'];
            $savevalue = sqlValueReplace($result_data->$savealias);

            if ($dbalias != '') {
                $savefield_sql = $savefield_sql . ' update ' . $table_m . " set $savefield=N'$savevalue' "
                    . " where " . str_replace('table_m.', '', $speed_fieldIndx[$up_autoincrement_key]) . "=N'" . $up_autoincrement_keyValue . "';";
            } else {
                $savefield_sql = $savefield_sql . ' update ' . $table_m . " set $savefield=N'$savevalue' "
                    . " from " . $table_m . " table_m where $whereSql;";
            }
        }
        execSql_gate($savefield_sql, $dbalias);
        $data = jsonReturnSql_gate($selectQuery, $dbalias);
    }


    if ($devQueryOn == 'Y') {
        $devQuery_all = "
--update sql :

$sql_update 

-----------------------------------------------

$log_sql

-----------------------------------------------
        ";
        createFolder($base_root . '/temp/');
        $rnd = rand(101, 400);
        $devQuery_file = "temp/$full_siteID" . "_" . $RealPid . "_q" . $rnd . ".txt";
        WriteTextFile($base_root . '/' . $devQuery_file, $devQuery_all);
        //echo "----$data---";exit;
        //$data = '[{"__devQuery_url": "/' . $devQuery_file . '","afterScript": "' . $afterScript . '",' . Mid($data,3,100000000);
        $data = '[{"__devQuery_url": "/' . $devQuery_file . '","afterScript": "' . $afterScript . '"' . iif(Len($data) > 2, ',' . Mid($data, 3, 100000000), '}]');

    } else {
        $data = '[{"afterScript": "' . $afterScript . '",' . Mid($data, 3, 100000000);
    }
    $alldata = $alldata . $data . ")";
    gzecho($alldata);
    //    echo "::::" . "select isnull((" . $selectQuery . " for json path),'[]')" . ":::";
    exit;
} else {
    //toolbar_searchField_kendoDropDownList
    //[{"zMyConfirmStatus":""},{"zMyConfirmStatus":"Refusal"}]
    if ($flag == "toolbar_searchField_kendoDropDownList" && $selField != '') {
        if ($selValue != '' && InStr($data, '"' . $selField . '":"' . replace($selValue, '/', '\/') . '"') == 0) {
            //$filter 가 빈값이면 초기로딩을 의미함. url 에 의한 필터의 경우는 해당키워드를 존중해서 빈값이라도 나열해야 함.
            if ($filter == '') {
                $data = str_replace('[{"' . $selField . '":', '[{"' . $selField . '":"' . replace($selValue, '/', '\/') . '"},{"' . $selField . '":', $data);
            }
        }

        $data = str_replace('{"' . $selField . '":""},', '{"' . $selField . '":"(BLANK)"},', $data);
        $data = str_replace('{"' . $selField . '":null},', '{"' . $selField . '":"(BLANK)"},', $data);
        $data = str_replace('{"' . $selField . '":"(BLANK)"},{"' . $selField . '":"(BLANK)"},', '{"' . $selField . '":"(BLANK)"},', $data);

        //echo "*************$data************";
        //echo $selField;
    }
    ;



    if ($readResult == 'Y') {
        //$alldata = replace($alldata,'":null,','":"",');
        if (requestVB('pure') == '1')
            $alldata = $data;
        else
            $alldata = str_replace('"', '@dda', str_replace('\\"', '\\\\@dda', $data));
        //echo $devQueryOn;
        //gzecho('999');exit;
        gzecho($alldata);
        exit;
    } else {
        $alldata = $alldata . $data;
        //$alldata = replace($alldata,'":null,','":"",');
    }


    if ($commentData != '') {

        $alldata = $alldata . '    
, "commentData": ' . $commentData;
    }

    if ($pagenumber != '') {
        $alldata = $alldata . '  
, "pagenumber": ' . $pagenumber;
    }
    //__page ......?????
    $total_count = onlyOnereturnSql_gate($countQuery, $dbalias);
    $alldata = $alldata . '
, "key_aliasName": "' . $key_aliasName . '"
, "child_alias": "' . $parent_alias . '"
, "chart_data": ' . $chart_data . '
, "__page": "' . $total_count . '"
, "__count": "';



    $alldata = $alldata . $_count . '"
, "keyword": "' . str_replace('"', '@dda', str_replace('\\"', '\\\\@dda', str_replace('\\', '\\\\', $keyword))) . '"
, "app": "' . str_replace("\n", '\n', str_replace('"', '@dda', str_replace('\\"', '\\\\@dda', $app))) . '"
, "resultCode": "' . $resultCode . '"
, "menuName": "' . str_replace('"', '@dda', str_replace('\\"', '\\\\@dda', $menuName)) . '"
, "afterScript": "' . $afterScript . '"';

    if ($devQueryOn == 'Y') {
        $devQuery_all = '';
        if ($dbalias != '')
            $devQuery_all = "
--dbalias : $dbalias


";
        $devQuery_all = $devQuery_all . "--count sql :
$countQuery

--select sql :
" . iif($selField == '', $selectQuery_speed, $selectQuery) . "

--app Sql :
$appSql
-----------------------------------------------
    ";
        createFolder($base_root . '/temp/');
        $rnd = rand(101, 400);
        $devQuery_file = "temp/$full_siteID" . "_" . $RealPid . "_q" . $rnd . ".txt";
        WriteTextFile($base_root . '/' . $devQuery_file, iif($resultQuery != '', 'helpbox update query : 
' . $resultQuery . '
-----------------
', '') . str_replace(') aaa where', '

) aaa where', str_replace('select * from (select', 'select * from (

    select', $devQuery_all)));

        $alldata = $alldata . ' 
, "__devQuery_url": "/' . $devQuery_file . '"';
    }

    $_count = onlyOnereturnSql_gate($countQuery, $dbalias);
    if (Instr($resultMessage, '{cnt}') > 0 && $pagenumber == '1' && $_count <= $top) {
        $resultMessage = '정상적으로 조회되었습니다 || 총 {cnt}건';
    }
    $alldata = $alldata . '
, "resultMessage": "' . str_replace('{cnt}', $_count, $resultMessage) . '"
}
}
';




    $alldata = $alldata . ')
';

    gzecho($alldata);



    if ($backup == 'Y') {
        //RealPid.parent_RealPid.parent_idx.MisSession_UserID.Ymd.His.json
        //RealPid.MisSession_UserID.Ymd.His.json

        if ($parent_RealPid != '' && $parent_idx != "") {
            $f = $RealPid . "." . $parent_RealPid . "." . $parent_idx . "." . $MisSession_UserID . "." . date("Ymd.His") . ".json";
            $sql = "insert into MisBackupList (RealPid, parent_RealPid, parent_idx, wdater, jsonname) values
                    ('$RealPid', '$parent_RealPid', '$parent_idx', '$MisSession_UserID', '$f') ";
        } else {
            $f = $RealPid . "." . $MisSession_UserID . "." . date("Ymd.His") . ".json";
            $sql = "insert into MisBackupList (RealPid, wdater, jsonname) values
                    ('$RealPid', '$MisSession_UserID', '$f') ";
        }

        if (execSql($sql)) {
            $strDir = $base_root . '/_mis_backup';
            createFolder($strDir);


            $contents = ob_get_contents();
            $contents = replace($contents, $callback, '');
            file_put_contents('../_mis_backup/' . $f, $contents);

        }
    }


}


ob_end_flush();
?>