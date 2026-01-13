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
if ($lite == 'Y') {
    if ($ChkOnlySum != '')
        exit;
    $liteString = '&lite=Y';
}


if ($MS_MJ_MY == 'MY')
    $addDir = 'MY';
else
    $addDir = '';

$devQueryOn = 'N';
$min = '.min';
if (isset($_COOKIE['devQueryOn'])) {
    $devQueryOn = $_COOKIE['devQueryOn'];
    if ($devQueryOn == 'Y') {
        error_reporting(E_ALL);
        ini_set('display_errors', 1);
        $min = '';
    }
}

$dd = '0';    //js,css 뒤에 붙음.
include 'speedmis_file_version.txt';



//$chcheID = requestVB('chcheID');
accessToken_check();

if ($MisSession_UserID == '') {
    echo 'logout';

    exit;
}
if (function_exists('top_addLogic_index')) {
    top_addLogic_index();
}



$isMenuIn = requestVB('isMenuIn');
if ($isMenuIn == 'auto') {
    if (InStr($ServerVariables_HTTP_USER_AGENT, 'mobile') + InStr($ServerVariables_HTTP_USER_AGENT, 'mobile') > 0) {
        echo 'index.php?' . str_replace('&isMenuIn=auto', '', $ServerVariables_QUERY_STRING);
        exit;
    } else {
        echo 'index.php?' . str_replace('&isMenuIn=auto', '&isMenuIn=Y', $ServerVariables_QUERY_STRING);
        exit;
    }
}

$jsonUrl = '';     //외부사이트의 json 조회를 위한 변수.

//아래와 같이 a 와 m 을 변환시킴. 아래는 디코딩하지 않음으로 상관없음. 아래와 같이 변환 안하면 setcookie 에서 에러남.
$cookie_authVersion_name = 'authVersion_' . base64_encode(str_replace('m', 'znm', str_replace('a', 'zna', str_replace('g', 'zng', $MisSession_UserID))));
$cookie_authVersion_name = str_replace('=', '', $cookie_authVersion_name);

if ($MS_MJ_MY == 'MY') {
    $sql = "select AUTO_INCREMENT-1 FROM information_schema.TABLES WHERE TABLE_NAME = 'MisMenuList_Member' AND TABLE_SCHEMA='$base_db2';";
} else {
    $sql = "select IDENT_CURRENT('MisMenuList_Member');";
}
$cookie_authVersion_value = onlyOnereturnSql($sql);


if (isset($_COOKIE['newLogin'])) {
    $newLogin = $_COOKIE['newLogin'];
} else
    $newLogin = '';


if (isset($_COOKIE[$cookie_authVersion_name])) {
    if ($_COOKIE[$cookie_authVersion_name] < $cookie_authVersion_value || $newLogin == 'Y') {
        setcookie($cookie_authVersion_name, $cookie_authVersion_value, time() + (86400 * 1000), '/');
        setcookie('newLogin', 'Y', 0, '/');
    }
} else {
    setcookie($cookie_authVersion_name, $cookie_authVersion_value, time() + (86400 * 1000), '/');
    setcookie('newLogin', 'Y', 0, '/');
}
$isDeleteList = requestVB('isDeleteList');


if (InStr($ServerVariables_HTTP_USER_AGENT, 'iphone') + InStr($ServerVariables_HTTP_USER_AGENT, 'android') > 0) {
    $isMobile = 'Y';
} else {
    $isMobile = 'N';
}

if (getCookie('screenMode') == '') {
    if ($isMobile == 'Y') {
        $screenMode = '1';
    } else {
        $screenMode = '2';
    }
} else {
    $screenMode = $_COOKIE['screenMode'];
}

if ($isMenuIn == 'Y' && ($screenMode == '1')) {
    $screenMode = '2';
}
setcookie('screenMode', $screenMode, time() + (86400 * 1000), '/');

if (getCookie('viewTarget') == '') {
    $viewTarget = 'right';
} else {
    $viewTarget = getCookie('viewTarget');
}

setcookie('viewTarget', $viewTarget, time() + (86400 * 1000), '/');

$isDeveloper = '';
if (isset($_COOKIE['isDeveloper'])) {
    $isDeveloper = $_COOKIE['isDeveloper'];
}
if ($isDeveloper == '') {
    $isDeveloper = MemberPid_XRWA('speedmis000266', $MisSession_UserID);
}
setcookie('isDeveloper', $isDeveloper, 0, '/');


$kendoTheme = '';
if (isset($_COOKIE['kendoTheme'])) {
    $kendoTheme = $_COOKIE['kendoTheme'];
}
if ($kendoTheme == '')
    $kendoTheme = 'default';


$codemirror_theme = 'eclipse';
if ($kendoTheme == 'moonlight' || $kendoTheme == 'highcontrast')
    $codemirror_theme = '3024-night';


if (isset($_GET['allFilter']))
    $allFilter = replace(replace($_GET['allFilter'], '@nd;', '&'), '@per;', '%');
else
    $allFilter = '';
if (isset($_GET['recently']))
    $recently = $_GET['recently'];
else
    $recently = '';
if (isset($_GET['orderby']))
    $orderby = $_GET['orderby'];
else
    $orderby = '';

if (isset($_GET['group_field']))
    $group_field = $_GET['group_field'];
else
    $group_field = '';


$chartKey = requestVB('chartKey');
$chartType = requestVB('chartType');
$chartOrderBy = requestVB('chartOrderBy');
$chartNumberColumns = requestVB('chartNumberColumns');
$helpbox = requestVB('helpbox');

if (isset($_GET['isIframe']))
    $isIframe = $_GET['isIframe'];
else
    $isIframe = '';

if (isset($_GET['flag']))
    $flag = $_GET['flag'];
else
    $flag = '';

if (isset($_GET['filter']))
    $p_filter = $_GET['filter'];
else
    $p_filter = '{ field: "nomean", operator: "eq", value: ""}';
if ($p_filter == '')
    $p_filter = '{}';

$inc = '';
$help_title = '';
$spreadsheets_url = '';
$userPrintPage = 'N';
if ($MS_MJ_MY == 'MY') {
    $isnull = 'ifnull';
} else {
    $isnull = 'isnull';
}



$gubun = requestVB('gubun');
$idx = requestVB('idx');
$parent_idx = requestVB('parent_idx');


$thisAlias_parent_idx = '';

if (isset($_GET['parent_gubun'])) {
    $parent_gubun = $_GET['parent_gubun'];
    $parent_RealPid = GubunIntoRealPid($parent_gubun);
} else if (isset($_GET['parent_RealPid'])) {
    $parent_RealPid = $_GET['parent_RealPid'];
    $parent_gubun = RealPidIntoGubun($parent_RealPid);
} else {
    $parent_gubun = '';
    $parent_RealPid = '';
}


$schedulerPid = requestVB('schedulerPid');

$ActionFlag = '';
$logicPid = '';

if ($gubun == '') {
    if (requestVB('RealPid') != '') {
        $sql = "select idx from MisMenuList where RealPid='" . requestVB("RealPid") . "'";
        $url = str_replace('RealPid=' . requestVB('RealPid'), 'gubun=' . onlyOnereturnSql($sql), $ServerVariables_URL);
        re_direct($url, false);
        return false;
    } else if ($RealPid_Home != '') {
        $sql = "select menuRefresh from MisUser where uniquenum=N'" . $MisSession_UserID . "';";
        if (onlyOnereturnSql($sql) == 'Y') {
            setcookie('newLogin', 'Y', 0, '/');
            if ($MS_MJ_MY == 'MY') {
                $appSql = "call MisUser_Authority_Proc ('" . $full_siteID . "','speedmis000001');update MisUser set menuRefresh = '' where uniquenum=N'" . $MisSession_UserID . "';";
            } else {
                $appSql = "exec MisUser_Authority_Proc '" . $full_siteID . "','speedmis000001';update MisUser set menuRefresh = '' where uniquenum=N'" . $MisSession_UserID . "'";
            }
            execSql($appSql);
        }
        $sql = "select idx from MisMenuList where RealPid='" . $RealPid_Home . "'";
        $url = 'index.php?gubun=' . onlyOnereturnSql($sql) . iif($isMenuIn == 'N' || $screenMode == '1', '', '&isMenuIn=Y') . $liteString;
        re_direct($url, false);
        return false;
    }
} else if ($gubun == '1' && $RealPid_Home != '') {
    $sql = "select idx from MisMenuList where RealPid='" . $RealPid_Home . "'";
    $url = 'index.php?gubun=' . onlyOnereturnSql($sql) . iif($isMenuIn == 'N' || $screenMode == '1', '', '&isMenuIn=Y') . $liteString;
    re_direct($url, false);
    return false;
}

$tempDir = $MisSession_UserID . '_' . time();

$pureUrl = str_replace('&isMenuIn=' . $isMenuIn, '', str_replace('?isMenuIn=' . $isMenuIn, '?', $ServerVariables_URL));
//echo $pureUrl;


//진짜 실행될 gubun 찾기.

if ($MS_MJ_MY == 'MY') {
    $strsql = " select table_m.idx, table_m.RealPid, ifnull(table_m.MisJoinPid,'') as MisJoinPid, table_m.autogubun, table_m.MenuType
    , table_m.MenuName, ifnull(table_m.help_title,'') as help_title, table_m.SPREADSHEET_ID, ifnull(table_m.isUsePrint,0) as isUsePrint, ifnull(table_m.isUseForm,0) as isUseForm
    , table_m.AddURL, ifnull(table_m.g05,'') as BriefInsertsql, ifnull(table_m.g07,'') as Read_Only, ifnull(table_m.g01,'') as BodyType
    , table_m.help_contents, ifnull(table_m.help_contents,'') as help_contents, ifnull(table_m.g02,'') as psize, table_m.g08 as TName, table_m.g12 as isThisChild FROM MisMenuList table_m
    left outer join MisMenuList_Member table_member
    on table_member.RealPid = table_m.RealPid and table_member.userid = '" . $MisSession_UserID . "'
    where table_m.useflag=1 and table_m.MenuType<>'00'";

    if (requestVB("nomove") == "1")
        $strsql = $strsql . " and table_m.idx='" . $gubun . "'";
    else {
        if ($gubun != '')
            $strsql = $strsql . " and table_m.autogubun like concat((select autogubun FROM MisMenuList where useflag=1
        and idx='" . $gubun . "'),'%') ";
    }

    $strsql = $strsql . " and (ifnull(table_m.AuthCode,'')<>'02' or table_member.userid = '" . $MisSession_UserID . "')
    and (table_member.AuthorityLevel is null or table_member.AuthorityLevel<>'9')
    order by table_m.sortG2,table_m.sortG4,table_m.sortG6,ifnull(table_m.isMenuHidden,'') limit 1;
    ";

} else {
    $strsql = " select top 1 table_m.idx, table_m.RealPid, table_m.MisJoinPid, table_m.autogubun, table_m.MenuType
    , table_m.MenuName, table_m.help_title, table_m.SPREADSHEET_ID, table_m.isUsePrint, table_m.isUseForm
    , table_m.AddURL, table_m.g05 as BriefInsertsql, table_m.g07 as Read_Only, table_m.g01 as BodyType
    , table_m.help_contents, table_m.g02 as psize, table_m.g08 as TName, table_m.g12 as isThisChild FROM MisMenuList table_m
    left outer join MisMenuList_Member table_member
    on table_member.RealPid = table_m.RealPid and table_member.userid = '" . $MisSession_UserID . "'
    where table_m.useflag=1 and table_m.MenuType<>'00'";

    if (requestVB("nomove") == "1")
        $strsql = $strsql . " and table_m.idx='" . $gubun . "'";
    else {
        if ($gubun != '')
            $strsql = $strsql . " and table_m.autogubun like (select autogubun FROM MisMenuList where useflag=1
        and idx='" . $gubun . "')+'%' ";
    }

    $strsql = $strsql . " and (table_m.AuthCode<>'02' or table_member.userid = '" . $MisSession_UserID . "')
    and (table_member.AuthorityLevel is null or table_member.AuthorityLevel<>'9')
    order by table_m.sortG2,table_m.sortG4,table_m.sortG6,table_m.isMenuHidden;
    ";
}

$data = allreturnSql($strsql);
$help_contents = '';

if (count($data) == 0) {
    //메뉴표시명일 경우면 다시 기회를 줌 : 메뉴추가 기능때문.
    //진짜 실행될 gubun 찾기.
    $strsql = str_replace(" and table_m.MenuType<>'00'", "", $strsql);

    $data = allreturnSql($strsql);
}
$psize = 100;

if (count($data) > 0) {


    $autogubun = $data[0]['autogubun'];
    if ($data[0]['idx'] != $gubun) {
        echo 'index.php?gubun=' . $data[0]['idx'] . iif($isMenuIn == 'N' || $screenMode == '1', '', '&isMenuIn=Y') . $liteString;
        exit;
    } else {

        $MenuType = $data[0]['MenuType'];

        $isThisChild = $data[0]['isThisChild'];

        $RealPid = $data[0]['RealPid'];
        $MisJoinPid = $data[0]['MisJoinPid'];

        //MisJoinPid 이 확정된 순간에 서버로직PID 도 확정시킨다.
        if ($MisJoinPid == '')
            $logicPid = $RealPid;
        else
            $logicPid = $MisJoinPid;

        $help_contents = $data[0]['help_contents'];

        $ActionFlag = requestVB('ActionFlag');
        if ($MenuType == '21')
            $ActionFlag = 'scheduler';
        else if ($MenuType == '22')
            $ActionFlag = 'simple';
        else if ($ActionFlag == '') {

            if ($idx == '')
                $ActionFlag = 'list';
            else
                $ActionFlag = 'view';
        }
        if ($ActionFlag == 'view' || $ActionFlag == 'modify' || $ActionFlag == 'write') {
            if ($lite == 'Y')
                exit;
            $inc = 'view';
        } else
            $inc = $ActionFlag;

        /* 서버 로직 start */
        if ($MenuType != '22') {
            if (file_exists('../_mis_addLogic/' . $logicPid . '.php'))
                include '../_mis_addLogic/' . $logicPid . '.php';
        }
        /* 서버 로직 end */


        if ($MisJoinPid != '') {

            if ($MS_MJ_MY == 'MY') {
                $sql = " select concat((case when isUsePrint=1 then '1' else '0' end),'.',(case when isUseForm=1 then '1' else '0' end)
                ,'.',ifnull(g05,''),'.',ifnull(g07,''),'.',ifnull(g01,''),'.',ifnull(help_title,''),'.',ifnull(g02,0)) FROM MisMenuList where RealPid='" . $MisJoinPid . "'";
            } else {
                $sql = " select (case when isUsePrint=1 then '1' else '0' end)+'.'+ (case when isUseForm=1 then '1' else '0' end)
                +'.'+g05+'.'+g07+'.'+g01+'.'+help_title+'.'+convert(varchar(4),g02) FROM MisMenuList where RealPid='" . $MisJoinPid . "'";
            }
            $temp = explode('.', onlyOnereturnSql($sql));
            $data[0]['isUsePrint'] = $temp[0] * 1;
            $data[0]['isUseForm'] = $temp[1] * 1;
            $data[0]['BriefInsertsql'] = $temp[2];

            if (Trim($data[0]['Read_Only']) == '')
                $data[0]['Read_Only'] = $temp[3];
            //else $Read_Only = $data[0]['Read_Only'];

            if ($data[0]['BodyType'] == '')
                $data[0]['BodyType'] = $temp[4];          //body type
            //else $BodyType = $data[0]['BodyType'];


            if ($data[0]['help_title'] == '') {
                $data[0]['help_title'] = $temp[5];
                if ($data[0]['help_title'] != '')
                    $data[0]['help_title'] = 'MIS_JOIN::' . $data[0]['help_title'];        // MIS_JOIN:: 를 추가함으로써, mis join 에 의한 도움말임을 기억.
            }
            $data[0]['psize'] = (int) $temp[6];

        }
        if (function_exists('misMenuList0_change')) {
            misMenuList0_change();
        }
        $BodyType = $data[0]['BodyType'];          //body type
        if ($BodyType == 'default')
            $BodyType = '';

        $psize = (int) $data[0]['psize'];

        $Read_Only = $data[0]['Read_Only'];

        $MenuName = $data[0]['MenuName'];
        $help_title = $data[0]['help_title'];

        $SPREADSHEET_ID = $data[0]['SPREADSHEET_ID'];
        $isUsePrint = $data[0]['isUsePrint'];
        $isUseForm = $data[0]['isUseForm'];
        $AddURL = $data[0]['AddURL'];
        $BriefInsertsql = $data[0]['BriefInsertsql'];
        $TName = $data[0]['TName'];


        $BriefInsertsql = str_replace('{MisSession_UserID}', $MisSession_UserID, $BriefInsertsql);
        $BriefInsertsql = str_replace('{parent_idx}', $parent_idx, $BriefInsertsql);




    }
    $StopMessage = '';
} else {
    $AddURL = '';
    $MenuType = '';
    $MisJoinPid = '';
    $RealPid = '';
    $BodyType = '';
    $isThisChild = '';
    $Read_Only = '';
    $MenuName = '';
    $SPREADSHEET_ID = '';
    $isUsePrint = 0;
    $isUseForm = 0;
    $autogubun = '';
    $StopMessage = '접근권한이 없습니다.';
}

if (isset($_GET['jsonname'])) {
    $jsonname = $_GET['jsonname'];
    $pageSizes = '100';
} else {
    $jsonname = '';

    if (requestVB("psize") != '')
        $pageSizes = requestVB("psize");
    else if (requestVB("treemenu") != '')
        $pageSizes = 9999;
    else if ($psize == '5' || $psize == '25')
        $pageSizes = $psize;
    else if (isset($_COOKIE["pageSizes"])) {
        $pageSizes = $_COOKIE["pageSizes"];
    } else if (is_numeric($psize))
        $pageSizes = $psize;
    else
        $pageSizes = "100";
}
if ($pageSizes == '5' && $BodyType != 'save_templist')
    $BodyType = 'only_one_list';

if (isset($_GET['tabjsonname'])) {
    $tabjsonname = $_GET['tabjsonname'];
} else
    $tabjsonname = '';

if (InStr($AddURL, '@') > 0) {
    $AddURL = '_call_url_' . $AddURL;
}


if ($helpbox == '') {
    if (InStr($AddURL, '@') > 0) {
        $AddURL = str_replace('@date', date('Y-m-d', time()), str_replace('@month', date('Y-m', time()), str_replace('@year', date('Y', time()), str_replace('{MisSession_UserID}', $MisSession_UserID, str_replace('@MisSession_UserID', $MisSession_UserID, $AddURL)))));
    }
    if (InStr($AddURL, '@SQL:') > 0) {
        $temp1 = explode('@SQL:', $AddURL);
        $temp_sql = decode_firewall($temp1[1]);
        $AddURL = $temp1[0] . onlyOnereturnSql($temp_sql);
    } else if (InStr($ServerVariables_QUERY_STRING, '@SQL:') > 0) {

        $temp1 = explode('@SQL:', $ServerVariables_QUERY_STRING);
        $temp_sql = decode_firewall($temp1[1]);
        $temp_sql = replace($temp_sql, '%20', ' ');
        $temp_sql = replace($temp_sql, '%22', '"');
        $temp_sql = replace($temp_sql, '%27%27', "'");

        $ServerVariables_QUERY_STRING = replace($temp1[0] . onlyOnereturnSql($temp_sql), '&isAddURL=Y', '');

        //echo $ServerVariables_QUERY_STRING;exit;
        re_direct('index.php?' . $ServerVariables_QUERY_STRING . '&isAddURL=Y');
    }

    if ($AddURL != '' && requestVB('isAddURL') != 'Y' && InStr('01,02,04,05,06,21,22', $MenuType) > 0) {
        echo 'index.php?' . $ServerVariables_QUERY_STRING . $AddURL . '&isAddURL=Y';
        exit;
    } else if ($AddURL != '' && requestVB('isAddURL') == 'Y' && InStr('01,02,04,05,06,21,22', $MenuType) > 0 && $idx == '' && InStr(urldecode($ServerVariables_QUERY_STRING), urldecode($AddURL)) == 0 && $ActionFlag == 'list' && InStr($AddURL, 'ActionFlag=') == 0) {

        ///////////////////////re_direct('index.php?'.$ServerVariables_QUERY_STRING.$AddURL);
    } else if ($AddURL != '' && $MenuType == '11') {

        //echo $AddURL;
        //exit;
        echo $AddURL;
        exit;
    } else if (InStr($ServerVariables_QUERY_STRING, '@') > 0) {
        $new_ServerVariables_QUERY_STRING = str_replace('@date', date('Y-m-d', time()), str_replace('@month', date('Y-m', time()), str_replace('@year', date('Y', time()), str_replace('{MisSession_UserID}', $MisSession_UserID, str_replace('@MisSession_UserID', $MisSession_UserID, $ServerVariables_QUERY_STRING)))));
        if ($new_ServerVariables_QUERY_STRING != $ServerVariables_QUERY_STRING || InStr($new_ServerVariables_QUERY_STRING, '@SQL:') > 0) {
            if (InStr($new_ServerVariables_QUERY_STRING, '@SQL:') > 0) {
                $temp1 = explode('@SQL:', $new_ServerVariables_QUERY_STRING);
                $temp_sql = replace(replace(replace(decode_firewall($temp1[1]), '%20', ' '), '%27%27', "'"), '%22', '"');
                $new_ServerVariables_QUERY_STRING = $temp1[0] . onlyOnereturnSql($temp_sql);
            }

            echo 'index.php?' . $new_ServerVariables_QUERY_STRING;
            exit;
        }
    }
}

/*
그리드가 필요 없는 경우 : 
온리원이거나,
쿼리스트링 - idx 가 있거나, 
쿼리스트링 - ActionFlag 값이 있거나
*/

/*
if($chcheID=='' && Len($ServerVariables_QUERY_STRING)<250) {

    $cache_file = '../_mis_cache/cache_' . $MisSession_UserID . '_' . replace(replace(replace($ServerVariables_QUERY_STRING,'&','@A_'),'"','@dd_'),"'",'@d_') . '.html';
    if(file_exists($cache_file)) {
        echo ReadTextFile($cache_file);
        echo '<!-- cache end -->';
        exit;
    } else {
        $cache_url = $full_site . '/_mis/index.php?' . $ServerVariables_QUERY_STRING . '&chcheID=' . $MisSession_UserID;
        $cache_content = file_get_contents_new($cache_url);
        WriteTextFile($cache_file, $cache_content);
    }
}
*/


if ($BodyType == 'only_one_list' || $idx != '' || $ActionFlag != '')
    $existGrid = 'N';
else
    $existGrid = 'Y';

if ($ActionFlag == 'view' && $BodyType == 'only_one_list' && $Read_Only != 'Y') {
    echo 'index.php?' . str_replace('&ActionFlag=view', '', $ServerVariables_QUERY_STRING) . '&ActionFlag=modify';
    exit;
}


if ($RealPid == 'speedmis000974' || $RealPid == 'speedmis000979') {
    $authRealPid = $parent_RealPid;
} else
    $authRealPid = $RealPid;
//쓰기권한 체크!
if ($MS_MJ_MY == 'MY') {
    $sql = " select table_m.idx, ifnull(table_m.new_gidx,0) as new_gidx
    ,ifnull(table_m.AuthCode,'') as AuthCode
    ,ifnull(table_member.AuthorityLevel,1) as AuthorityLevel
    FROM MisMenuList table_m
    left outer join MisMenuList_Member table_member 
    on table_member.RealPid = table_m.RealPid and table_member.userid = '" . $MisSession_UserID . "'
    where table_m.useflag=1
    and (ifnull(table_m.AuthCode,'')<>'02' or table_member.userid = '" . $MisSession_UserID . "')
    and table_m.RealPid='" . $authRealPid . "'
    order by table_member.AuthorityLevel desc limit 1;
    ";
} else {
    $sql = " select top 1 table_m.idx, table_m.new_gidx
    ,table_m.AuthCode
    ,isnull(table_member.AuthorityLevel,1) as AuthorityLevel
    FROM MisMenuList table_m
    left outer join MisMenuList_Member table_member 
    on table_member.RealPid = table_m.RealPid and table_member.userid = '" . $MisSession_UserID . "'
    where table_m.useflag=1
    and (table_m.AuthCode<>'02' or table_member.userid = '" . $MisSession_UserID . "')
    and table_m.RealPid='" . $authRealPid . "'
    order by table_member.AuthorityLevel desc 
    ";
}


$data = allreturnSql($sql);
$isAuthW = 'N';
$isAuthR = 'N';
$MisSession_IsAdmin = 'N';
if (count($data) > 0) {
    if ($data[0]['AuthCode'] == '02' && $data[0]['AuthorityLevel'] * 1 < 2) {
        $isAuthR = 'Y';
        $isAuthW = 'N';
    } else if ($data[0]['AuthorityLevel'] == '3') {
        $isAuthR = 'Y';
        $isAuthW = 'Y';
        $MisSession_IsAdmin = 'Y';
    } else if (($data[0]['AuthCode'] == '01' || $data[0]['AuthCode'] == '') && $data[0]['AuthorityLevel'] == '1') {
        $isAuthR = 'Y';
        if ($data[0]['AuthCode'] == '')
            $isAuthW = 'Y';
        else
            $isAuthW = 'N';
    } else {
        if ($data[0]['AuthorityLevel'] * 1 > 1 || $data[0]['new_gidx'] == 0) {
            $isAuthW = 'Y';
            $isAuthR = 'Y';
        }
    }
}

if ($Read_Only == 'Y')
    $isAuthW = 'N';
else if ($jsonname != '')
    $isAuthW = 'N';
else if ($ActionFlag == 'list' && $isThisChild == 'Y') {
    if ($parent_idx == '' && requestVB('allFilter') == '')
        $isAuthW = 'N';
}
if ($isAuthR == 'N') {
    $StopMessage = '읽기권한이 없습니다.';
}
if ($isAuthR == 'Y' && $RealPid == 'speedmis000974') {
    $isAuthW = 'Y';
}



$paidKey_ucount = 500;
$paidKey_expireDate = '2099-12-31';
$paidKey_msg = '';

fireWall();

if ($MS_MJ_MY == 'MY') {
    $sql = "select count(*) from MisReadList where useflag='1' and 자격<>'수정' and 자격<>'삭제' and 자격<>'복원' and userid='$MisSession_UserID' 
    and datediff(wdate, sysdate())<=6 and readDate is null and 1=2;";
} else {
    $sql = "select count(*) from MisReadList where useflag='1' and 자격<>'수정' and 자격<>'삭제' and 자격<>'복원' and userid='$MisSession_UserID' 
    and datediff(day, wdate, getdate())<=6 and readDate is null";
}

$gnbCount = onlyOnereturnSql($sql);

$jsonUrl_style = '';
if (function_exists('jsonUrl_index')) {
    jsonUrl_index();

    if ($jsonUrl != '') {
        $isAuthW = 'N';
        $MisSession_IsAdmin = 'N';
        if (InStr($jsonUrl, $full_site) == 0) {
            $jsonUrl_style = '<style>li[tabid="speedmis000974"],li[tabid="speedmis000979"] { display: none!important; }</style>';
        }
    }
}
if (requestVB('ChkOnlySum') == '2') {
    $isAuthW = 'N';
    $MisSession_IsAdmin = 'N';
}

$kendoCultureNew = $kendoCulture;
if (strlen(request_cookies('myLanguageCode')) > 1)
    $kendoCultureNew = request_cookies('myLanguageCode');

if ($MenuType == "22") {

} else if (mb_substr($MenuType, 0, 1, 'UTF-8') == '1') {

} else {

    if ($inc == 'list') {

        if ($ActionFlag != 'write' && ($BodyType == 'only_one_list' || requestVB('recently_view') == 'Y')) {

            //echo 'call_url';exit;
        }
    }
}

echo 'index.php?' . $ServerVariables_QUERY_STRING;
exit;

?>