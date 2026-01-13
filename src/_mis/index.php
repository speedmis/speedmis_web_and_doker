<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');


//ob_start('ob_gzhandler');


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
$index_main_YN = 'N';

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

require $_SERVER['DOCUMENT_ROOT'] . "/vendor/autoload.php";
use Firebase\JWT\JWT;
//$chcheID = requestVB('chcheID');
accessToken_check();


if ($MisSession_UserID == '') {
    if ($ServerVariables_URL == '')
        re_direct($full_site . '/_mis/login/');
    else
        re_direct($full_site . "/$top_dir/login/index.php?preaddress=$ServerVariables_URL");

    exit;
}
if (function_exists('top_addLogic_index')) {
    top_addLogic_index();
}


$pre = requestVB('pre');
$preExt = '';
if ($pre == '1') {
    $preExt = '.pre';
}
$addParam = requestVB('addParam');
$MisMenuList_Detail = 'MisMenuList_Detail';
if ($pre == '1') {
    $MisMenuList_Detail = 'MisMenuList_Detail_pre';
}
$isPhoneMobile = isPhoneMobile();

$gubun = requestVB('gubun');
$isMobile = isMobile();
setcookie('isMobile', $isMobile, time() + (86400 * 1000), '/');
if ($isMobile == 'Y') {
    setcookie('screenMode', 1, time() + (86400 * 1000), '/');
} else {
    setcookie('screenMode', 2, time() + (86400 * 1000), '/');
}


$isMenuIn = requestVB('isMenuIn');
if ($isMenuIn == 'auto') {
    if ($isMobile == 'Y') {
        re_direct("/$top_dir/index.php?" . str_replace('&isMenuIn=auto', '', $ServerVariables_QUERY_STRING), false);
    } else {
        re_direct("/$top_dir/index.php?" . str_replace('&isMenuIn=auto', '&isMenuIn=Y', $ServerVariables_QUERY_STRING), false);
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


$viewTarget = 'right';

$isDeveloper = '';
if (isset($_COOKIE['isDeveloper'])) {
    $isDeveloper = $_COOKIE['isDeveloper'];
}
if ($isDeveloper == '') {
    $isDeveloper = MemberPid_XRWA('speedmis000266', $MisSession_UserID);
}
setcookie('isDeveloper', $isDeveloper, 0, '/');

$kendoThemeSystem = getCookie('kendoThemeSystem');
$kendoTheme = getCookie('kendoTheme');
if ($kendoThemeSystem != 'N') {
    $kendoThemeSystem = 'Y';
}
if ($kendoTheme == '') {
    $kendoTheme = 'silver';
}
setcookie('kendoThemeSystem', $kendoThemeSystem, time() + (864001000), '/');
setcookie('kendoTheme', $kendoTheme, time() + (864001000), '/');


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
        $url = "/$top_dir/index.php?gubun=" . onlyOnereturnSql($sql) . iif($isPhoneMobile == 'Y', '', '&isMenuIn=Y') . $liteString;

        re_direct($url, false);
        return false;
    }
} else if ($gubun == '1' && $RealPid_Home != '') {
    $sql = "select idx from MisMenuList where RealPid='" . $RealPid_Home . "'";
    $url = "/$top_dir/index.php?gubun=" . onlyOnereturnSql($sql) . iif($isPhoneMobile == 'Y', '', '&isMenuIn=Y') . $liteString;
    re_direct($url, false);
    return false;
}

$tempDir = $MisSession_UserID . '_' . time();

$pureUrl = str_replace('&isMenuIn=' . $isMenuIn, '', str_replace('?isMenuIn=' . $isMenuIn, '?', $ServerVariables_URL));
//echo $pureUrl;


//진짜 실행될 gubun 찾기.

if ($MS_MJ_MY == 'MY') {
    $strsql = " select table_m.idx, table_m.RealPid, (select RealPid from MisMenuList where AutoGubun=left(table_m.AutoGubun,2) and useflag=1 limit 1) as topRealPid, ifnull(table_m.MisJoinPid,'') as MisJoinPid, table_m.autogubun, table_m.MenuType
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
    $strsql = " select top 1 table_m.idx, table_m.RealPid, (select top 1 RealPid from MisMenuList where AutoGubun=left(table_m.AutoGubun,2) and useflag=1) as topRealPid, table_m.MisJoinPid, table_m.autogubun, table_m.MenuType
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
$isAuthW = 'N';
$isAuthR = 'N';
$MisSession_IsAdmin = 'N';
if (count($data) > 0) {


    $autogubun = $data[0]['autogubun'];
    if ($data[0]['idx'] != $gubun) {
        re_direct("/$top_dir/index.php?gubun=" . $data[0]['idx'] . iif($isMenuIn == 'N' || $screenMode == '1', '', '&isMenuIn=Y') . $liteString, false);
    } else {

        $MenuType = $data[0]['MenuType'];

        $isThisChild = $data[0]['isThisChild'];

        $RealPid = $data[0]['RealPid'];
        $MisJoinPid = $data[0]['MisJoinPid'];
        $topRealPid = $data[0]['topRealPid'];

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
            if (file_exists('../_mis_addLogic/' . $logicPid . $preExt . '.php')) {
                if (file_exists('../_mis_addLogic/' . $logicPid . '.php'))
                    include '../_mis_addLogic/' . $logicPid . $preExt . '.php';
            }
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
    $topRealPid = '';
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
        $pageSizes = requestVB('psize');
    else if (requestVB("treemenu") != '')
        $pageSizes = 9999;
    else if ($psize == '5' || $psize == '25')
        $pageSizes = $psize;
    else if (isset($_COOKIE['pageSizes'])) {
        $pageSizes = $_COOKIE['pageSizes'];
    } else if (is_numeric($psize))
        $pageSizes = $psize;
    else if ($isMobile == 'Y')
        $pageSizes = '20';
    else
        $pageSizes = '100';
}
if ($pageSizes == '5' && $BodyType != 'save_templist')
    $BodyType = 'only_one_list';

if (isset($_GET['tabjsonname'])) {
    $tabjsonname = $_GET['tabjsonname'];
} else
    $tabjsonname = '';


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
        re_direct("/$top_dir/index.php?" . $ServerVariables_QUERY_STRING . '&isAddURL=Y');
    }

    if ($AddURL != '' && requestVB('isAddURL') != 'Y' && InStr('01,02,04,05,06,21,22', $MenuType) > 0) {
        if (InStr($AddURL, $ServerVariables_HTTP_HOST . $ServerVariables_URL) == 0 && InStr($ServerVariables_QUERY_STRING, '/login/') == 0 && (Left($AddURL, 8) == 'https://' || Left($AddURL, 7) == 'http://')) {
            re_direct($AddURL);
        } else if (Left($AddURL, 1) == '&') {
            re_direct("/$top_dir/index.php?" . $ServerVariables_QUERY_STRING . $AddURL . '&isAddURL=Y');
        } else {
            re_direct($AddURL);
        }
    } else if ($AddURL != '' && requestVB('isAddURL') == 'Y' && InStr('01,02,04,05,06,21,22', $MenuType) > 0 && $idx == '' && InStr(urldecode($ServerVariables_QUERY_STRING), urldecode($AddURL)) == 0 && $ActionFlag == 'list' && InStr($AddURL, 'ActionFlag=') == 0) {

        ///////////////////////re_direct('index.php?'.$ServerVariables_QUERY_STRING.$AddURL);
    } else if ($AddURL != '' && $MenuType == '11') {

        //echo $AddURL;
        //exit;
        re_direct($AddURL);
    } else if (InStr($ServerVariables_QUERY_STRING, '@') > 0) {
        $new_ServerVariables_QUERY_STRING = str_replace('@date', date('Y-m-d', time()), str_replace('@month', date('Y-m', time()), str_replace('@year', date('Y', time()), str_replace('{MisSession_UserID}', $MisSession_UserID, str_replace('@MisSession_UserID', $MisSession_UserID, $ServerVariables_QUERY_STRING)))));
        if ($new_ServerVariables_QUERY_STRING != $ServerVariables_QUERY_STRING || InStr($new_ServerVariables_QUERY_STRING, '@SQL:') > 0) {
            if (InStr($new_ServerVariables_QUERY_STRING, '@SQL:') > 0) {
                $temp1 = explode('@SQL:', $new_ServerVariables_QUERY_STRING);
                $temp_sql = replace(replace(replace(decode_firewall($temp1[1]), '%20', ' '), '%27%27', "'"), '%22', '"');
                $new_ServerVariables_QUERY_STRING = $temp1[0] . onlyOnereturnSql($temp_sql);
            }

            re_direct("/$top_dir/index.php?" . $new_ServerVariables_QUERY_STRING);
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
    re_direct("/$top_dir/index.php?" . str_replace('&ActionFlag=view', '', $ServerVariables_QUERY_STRING) . '&ActionFlag=modify&zzz=333', false);

}

$cache_path = '';
if ($devQueryOn == 'N' && $isMenuIn != 'Y' && $isMenuIn != 'S' && $ActionFlag != 'list') {
    $ServerVariables_URL2 = 'index.php?' . splitVB($ServerVariables_URL, 'index.php?')[1];
    $ServerVariables_URL2 = str_replace("&idx=$idx", '', $ServerVariables_URL2);
    $ServerVariables_URL2 = str_replace("&parent_idx=$parent_idx", '', $ServerVariables_URL2);
    //U, 모바일여부, P 2개를 넣어야 삭제로직이 정확히 동작함.
    $cache_url = "index.U.$MisSession_UserID.isMobile_$isMobile.RealP.$RealPid.JoinP.$MisJoinPid.MD5." . md5($ServerVariables_URL) . '.html';
    $cache_path = "../_mis_cache/$cache_url";
    if (file_exists($cache_path)) {
        ob_start('ob_gzhandler');   //아직 <html> 출력도 안된 시점임.
        echo ReadTextFile($cache_path);
        exit;
    }
}
ob_start();

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

fireWall_v2('GET');     //GET 이 아닌 경우 중지시킴.

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
if (strlen(request_cookies('myLanguageCode')) > 1) {
    $kendoCultureNew = request_cookies('myLanguageCode');
}


// 토큰이 없으면 csrf_token 생성
if (!isset($_COOKIE['csrf_token'])) {
    $csrf_token = bin2hex(random_bytes(32));
    setcookie('csrf_token', $csrf_token, time() + 3600, '/');
} else {
    $csrf_token = $_COOKIE['csrf_token'];
}
?>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title><?php echo iif($pre == '1', '(TEST)', '') . $MenuName . ' - ' . $intrannet_name; ?></title>
    <base href="/_mis/" />

    <style>
        <?php if ($kendoThemeSystem == 'Y') { ?>
            /* 다크모드 감지 */
            @media (prefers-color-scheme: dark) {
                html {
                    background-color: #121212;
                    color: #e0e0e0;
                }
            }

        <?php } else if ($kendoTheme == 'highcontrast') { ?>

                html {
                    background-color: #121212;
                    color: #e0e0e0;
                }

        <?php } ?>
    </style>

    <link href='//fonts.googleapis.com/css?family=Roboto+Slab:400,700' rel='stylesheet'>

    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="shortcut icon" href="/favicon.ico" />



    <link rel="stylesheet" href="../_mis_kendo/examples/content/integration/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../_mis_kendo/styles/kendo.common.min.css" />
    <!--<script src="../_mis_kendo/js/jquery.min.js"></script>-->
    <script src="../_mis/cssJs/jquery-3.4.1.min.js"></script>

    <script src="../_mis_kendo/js/kendo.all.min.js?a=1"></script>


    <?php if ($min == '.min') { ?>
        <link rel="stylesheet" href="cssJs/speedmis_bundle.min.css?<?= $dd ?>">
        <script src="cssJs/speedmis_bundle.min.js?<?= $dd ?>"></script>

    <?php } else { ?>

        <link rel='stylesheet' href='toast/toastr.min.css' />
        <link href="css/examples.css?<?= $dd ?>" rel="stylesheet" />
        <link rel="stylesheet" href="codemirror-5.52.0/lib/codemirror.css">
        <link href="cssJs/common_top.css?<?= $dd ?>ds" rel="stylesheet" />


        <script src="../_mis_kendo/js/jszip.min.js"></script>
        <script src="../_mis_kendo/js/kendo.timezones.min.js"></script>
        <script src="downloadJS/download2.js"></script>
        <script src="codemirror-5.52.0/lib/codemirror.js"></script>
        <script src="codemirror-5.52.0/addon/edit/matchbrackets.js"></script>
        <script src="codemirror-5.52.0/mode/htmlmixed/htmlmixed.js"></script>
        <script src="codemirror-5.52.0/mode/xml/xml.js"></script>
        <script src="codemirror-5.52.0/mode/javascript/javascript.js"></script>
        <script src="codemirror-5.52.0/mode/css/css.js"></script>
        <script src="codemirror-5.52.0/mode/clike/clike.js"></script>
        <script src="codemirror-5.52.0/mode/php/php.js"></script>
        <script id="id_js" name="name_js" src="java_conv.js?<?= $dd ?>"></script>
        <script src='toast/toastr.min.js'></script>

    <?php } ?>
    <link id="kendoTheme_css" rel="stylesheet" />
    <link id="codemirror_theme" rel="stylesheet" />
    <script>
        /*
        <?php if ($kendoThemeSystem == 'Y') { ?>
            if (isSystemDarkMode() == true && (isMainFrame() || parent.$('body').attr('topsite') == 'mis')) {
                window.kendoTheme = 'highcontrast';
                document.getElementById('kendoTheme_css').href = '../_mis_kendo/styles/kendo.highcontrast.min.css';
                $('#kendoTheme_css').attr('kendoTheme', 'highcontrast');
                document.getElementById('codemirror_theme').href = 'codemirror-5.52.0/theme/3024-night.css';
            } else {
                <?php
                if ($kendoTheme == 'highcontrast') {
                    //여기서의 변경은 쿠키에 영향을 주지 않음.
                    $kendoTheme = 'silver';
                }
                ?>
                window.kendoTheme = '<?php echo $kendoTheme; ?>';
                document.getElementById('kendoTheme_css').href = '../_mis_kendo/styles/kendo.<?php echo $kendoTheme; ?>.min.css';
                $('#kendoTheme_css').attr('kendoTheme', '<?php echo $kendoTheme; ?>');
                document.getElementById('codemirror_theme').href = 'codemirror-5.52.0/theme/eclipse.css';
            }
        <?php } else if ($kendoTheme == 'highcontrast') { ?>
                if (isMainFrame() || parent.$('body').attr('topsite') == 'mis') {
                    window.kendoTheme = 'highcontrast';
                    document.getElementById('kendoTheme_css').href = '../_mis_kendo/styles/kendo.highcontrast.min.css';
                    $('#kendoTheme_css').attr('kendoTheme', 'highcontrast');
                    document.getElementById('codemirror_theme').href = 'codemirror-5.52.0/theme/3024-night.css';
                } else {
                    window.kendoTheme = 'silver';
                    document.getElementById('kendoTheme_css').href = '../_mis_kendo/styles/kendo.silver.min.css';
                    $('#kendoTheme_css').attr('kendoTheme', 'silver');
                    document.getElementById('codemirror_theme').href = 'codemirror-5.52.0/theme/eclipse.css';
                }
        <?php } else { ?>
                window.kendoTheme = '<?php echo $kendoTheme; ?>';
                document.getElementById('kendoTheme_css').href = '../_mis_kendo/styles/kendo.<?php echo $kendoTheme; ?>.min.css';
                $('#kendoTheme_css').attr('kendoTheme', '<?php echo $kendoTheme; ?>');
                document.getElementById('codemirror_theme').href = 'codemirror-5.52.0/theme/eclipse.css';
        <?php } ?>
            */

    </script>

    <script src="https://spi.maps.daum.net/imap/map_js_init/postcode.v2.js"></script>

    <script src="../_mis_kendo/js/cultures/kendo.culture.<?php echo $kendoCultureNew; ?>.min.js"></script>
    <script src="../_mis_kendo/js/messages/kendo.messages.<?php echo $kendoCultureNew; ?>.min.js"></script>
    <script src="../_mis_uniqueInfo/local_<?php echo $kendoCultureNew; ?>.js"></script>
    <script src="cssJs/<?= iif($inc != '', $inc, 'simple') ?>_top<?= $min ?>.js?<?= $dd ?>zzw"></script>
    <link id="link_<?= iif($inc != '', $inc, 'simple') ?>"
        href="cssJs/<?= iif($inc != '', $inc, 'simple') ?>_top<?= $min ?>.css?<?= $dd ?>ee" rel="stylesheet" />
    <?php if ($inc == 'view' && $isMenuIn == 'S') { ?>
        <link href="cssJs/view_top_s.css?<?= $dd ?>" rel="stylesheet" />
    <?php } ?>
    <style id="list_css"></style>

    <?php if ($useWebApp == 'Y') { ?>
        <link rel="manifest" href="/_mis_uniqueInfo/pwa/manifest.js?<?= $dd ?>" />
        <meta name="theme-color" content="#000000" />
        <script>

        </script>
    <?php } ?>

    <link id="rframe_main" rel="stylesheet" />
    <link href="/_mis_uniqueInfo/user_define.css?<?= $dd ?>" rel="stylesheet" />
    <script id="script_user_define" src="../_mis_uniqueInfo/user_define.js?<?= $dd ?>"></script>


    <style id="left_menu_hide"> </style>



    <style>
        <?php if ($isMenuIn == 'Y') { ?>
            li.TK-bn.user a.TK-Aside-Menu-Button::after {
                content: "<?php echo iif($MisSession_AuthSite == 'home', $MisSession_UserID, $MisSession_AuthSite . ' / ' . $MisSession_UserName); ?>";
                width: 200px;
                left: -77px;
                z-index: 0;
            }

            <?php if ($BodyType == "only_one_list" || $ActionFlag != "list") { ?>

                html {
                    overflow: hidden;
                }

                div#main {
                    height: auto !important;
                }

            <?php } ?>

        <?php } else { ?>
            div#toolbar {
                left: 0px !important;
            }

            a#sidebar-toggle,
            div#example-sidebar {
                display: none !important;
            }


            div#main {
                height: 100% !important;
            }


            .k-toolbar .k-overflow-anchor {
                top: 0px;
                height: 53px;
                /*** 61 ***/
            }

        <?php } ?>
    </style>


    <?php echo $jsonUrl_style; ?>
    <script src="cssJs/common_top<?= $min ?>.js?<?= $dd ?>w20sq21"></script>


    <textarea id="txt_themechooser_style" style="display:none;">
.themechooser {
    height: auto!important;
    max-height: 153px!important;
    min-height: <?php echo iif($isMenuIn == 'Y', '53px', '51px'); ?>;
    overflow-y: auto;
}
body[screenname="fullScreen"] .themechooser {
    min-height: <?php echo iif($isMenuIn == 'Y', '52px', '51px'); ?>;
}
.themechooser::-webkit-scrollbar, .k-overflow-anchor {
    display: none;
}
#example-search-wrapper {
    height: auto!important;
    padding-right: 0!important;
}
#toolbarRound {
    width: 100%!important;
    height: 100%!important;
    display: block!important;
}
div#toolbar {
    display: ruby;
    position: fixed;
    z-index: 99;
    /*아래3개는 띄어쓰기도 바꾸지 말것*/
    /*toolbar_top*/top: 61px;
    /*toolbar_left*/left: 299px;
    /*toolbar_width*/width: calc(100% - 300px);
    background-color: rgba(255, 255, 255, 0.8);
    padding: 9px 10px 10px 14px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    border-bottom: 1px solid #ddd;
    border-radius: 0 0 5px 5px;
    box-sizing: border-box;
    overflow: hidden;
}
body[kendotheme="highcontrast"] div#toolbar {
    background-color: rgba(44, 35, 43, 0.8);
}
a#btn_help,a#btn_alert {
    display: inherit!important;
}
</textarea>
    <style id="themechooser_style">


    </style>


    <script>
        kendo.culture("<?php echo $kendoCultureNew; ?>");
        if (isMainFrame()) setCookie('viewTarget', '<?php echo $viewTarget; ?>', 1000);


    </script>


</head>

<body class="k-content" screenname="normalScreen" isMobile="<?php echo $isMobile; ?>"
    isPhoneMobile="<?php echo $isPhoneMobile; ?>" screenMode="<?php echo $screenMode; ?>"
    MenuType="<?php echo $MenuType; ?>" style="visibility:hidden;" ActionFlag="<?php echo $ActionFlag; ?>"
    BodyType="<?php echo $BodyType; ?>" psize="<?php echo $pageSizes; ?>" <?php if ($helpbox != '')
              echo ' onlylist helpbox '; ?> RealP="<?php echo Left($RealPid, Len($RealPid) - 6); ?>" RealPid="<?php echo $RealPid; ?>"
    topRealPid="<?php echo $topRealPid; ?>" logicPid="<?php echo $logicPid; ?>"
    parent_RealPid="<?php echo $parent_RealPid; ?>" UserID="<?php echo $MisSession_UserID; ?>"
    isAuthW="<?php echo $isAuthW; ?>" ChkOnlySum="<?php echo $ChkOnlySum; ?>"
    isMenuIn0="<?php echo requestVB('isMenuIn'); ?>" actionInc="<?php if ($ActionFlag == 'list')
           echo "list";
       else if ($ActionFlag == 'view' || $ActionFlag == 'modify' || $ActionFlag == 'write')
           echo "view"; ?>">

    <?php if ($useWebApp == 'Y') { ?>
        <button id="installBtn" style="display: none;" class="install-button">📱 앱 설치하기</button>
        <input id="push_endpoint" type="hidden" />
        <input id="push_p256dh" type="hidden" />
        <input id="push_auth" type="hidden" />

        <script>

            let deferredPrompt;
            install_speedmis_app_load();
            // 앱 설치 버튼 보이기
            install_btn_visible();



        </script>
    <?php } ?>

    <iframe id="ifr_treat" name="ifr_treat" src="about:blank" style="display:none;"></iframe>
    <textarea id="txt_window" style="display: none;">
<div id="window{popCnt}" class="windowPop">
    <iframe id="ifr_window{popCnt}" style="width:100%;height:100%;border:0;"></iframe>
    <input id="txt_windowIdx{popCnt}" type="hidden"/>
    <input id="txt_windowRowIndx{popCnt}" type="hidden"/>
</div>
</textarea>
    <form id="treatForm" name="treatForm" method="post" action="commandTreat.php" class="form " target="ifr_treat">

        <div id="div_temp1" style="display:none;"></div>
        <input id="top_dir" type="hidden" value="<?php echo $top_dir; ?>" />
        <input id="index_main_YN" type="hidden" value="N" />
        <input id="grid_load_once_event" type="hidden" value="N" />
        <input id="grid_dataBound_once_event" type="hidden" value="N" />
        <input id="document_load_once_event" type="hidden" value="N" />
        <input id="command" name="nmCommand" type="hidden" />
        <input id="nmOpenPopup" name="nmOpenPopup" type="hidden" />
        <input id="MisSession_UserID" name="nmMisSession_UserID" type="hidden"
            value="<?php echo $MisSession_UserID; ?>" />
        <input id="MisSession_UserName" name="nmMisSession_UserName" type="hidden"
            value="<?php echo $MisSession_UserName; ?>" />
        <input id="ActionFlag" name="nmActionFlag" type="hidden" value="<?php echo $ActionFlag; ?>" />
        <input id="RealPid" name="nmRealPid" type="hidden" value="<?php echo $RealPid; ?>" />
        <input id="MisJoinPid" name="nmMisJoinPid" type="hidden" value="<?php echo $MisJoinPid; ?>" />
        <input id="logicPid" type="hidden" value="<?php echo $logicPid; ?>" />
        <input id="gubun" name="nmGubun" type="hidden" value="<?php echo $gubun; ?>" />

        <input id="viewTarget_once" type="hidden" value="" />
        <input id="MS_MJ_MY" type="hidden" value="<?php echo $MS_MJ_MY; ?>" />
        <input id="addDir" type="hidden" value="<?php echo $addDir; ?>" />

        <input id="parent_gubun" name="nmParent_gubun" type="hidden" value="<?php echo $parent_gubun; ?>" />
        <input id="parent_RealPid" name="nmParent_RealPid" type="hidden" value="<?php echo $parent_RealPid; ?>" />
        <input id="parent_idx" name="nmparent_idx" type="hidden" value="<?php echo $parent_idx; ?>" />
        <input id="thisAlias_parent_idx" type="hidden" value="" />


        <input id="isMenuIn" name="nmIsMenuIn" type="hidden" value="<?php echo $isMenuIn; ?>" />
        <input id="idx" name="nmIdx" type="hidden" value="<?php echo $idx; ?>" />
        <input id="key_aliasName" name="nmKey_aliasName" type="hidden" />

        <input id="jsonUrl" type="hidden" value="<?php echo $jsonUrl; ?>" />

        <input id="BodyType" type="hidden" value="<?php echo $BodyType; ?>" />

        <input id="MenuName" type="hidden" value="<?php echo replace($MenuName, "\"", "&quot;"); ?>" />

        <input id="jsonname" type="hidden" value="<?php echo $jsonname; ?>" />
        <input id="ChkOnlySum" type="hidden" value="<?php echo $ChkOnlySum; ?>" />
        <input id="group_field" type="hidden" value="<?php echo $group_field; ?>" />
        <input id="bot_name" type="hidden" value="<?php echo $telegram_bot_name; ?>" />


        <input id="isAuthW" type="hidden" value="<?php echo $isAuthW; ?>" />
        <input id="isAuthR" type="hidden" value="<?php echo $isAuthR; ?>" />
        <input id="MisSession_IsAdmin" type="hidden" value="<?php echo $MisSession_IsAdmin; ?>" />
        <input id="keyidx_123" type="hidden" value="N" />
        <input id="Anti_SortWrite" type="hidden" />
        <input id="MenuType" type="hidden" value="<?php echo $MenuType; ?>" />
        <textarea id="AddURL" style="display:none;"><?php echo $AddURL; ?></textarea>
        <input id="last_frameElementId" type="hidden" />
        <input id="toolbarDropdownlist" type="hidden" />
        <input id="isDeleteList" type="hidden" value="<?php echo $isDeleteList; ?>" />
        <input id="flag" name="nmFlag" type="hidden" value="<?php echo $flag; ?>" />

        <input id="csrf_token" name="nmApp" type="hidden" value="<?php echo $csrf_token; ?>" />
        <input id="app" name="nmApp" type="hidden" value="<?php echo $flag; ?>" />
        <input id="pre" type="hidden" value="<?php echo $pre; ?>" />
        <input id="addParam" type="hidden" value="<?php echo $addParam; ?>" />
        <input id="screenMode" name="nmScreenMode" type="hidden" value="<?php echo $screenMode; ?>" />
        <input id="pageSizes" name="nmPageSizes" type="hidden" value="<?php echo $pageSizes; ?>" />
        <input id="ServerVariables_QUERY_STRING" name="nmServerVariables_QUERY_STRING" type="hidden"
            value="<?php echo $ServerVariables_QUERY_STRING; ?>" />


        <input id="brief_insertsql" name="nmBrief_insertsql" type="hidden" value="" />
        <input id="brief_insertline" name="nmBrief_insertline" type="hidden" value="" />
        <input id="isIframe" name="nmIsIframe" type="hidden" value="<?php echo $isIframe; ?>" />
        <input id="tempDir" name="nmTempDir" type="hidden" value="<?php echo $tempDir; ?>" />

        <input id="stopUpdate" type="hidden" value="" />
        <input id="sel_aliasName" type="hidden" value="" />
        <input id="sel_idx" type="hidden" value="" />
        <input id="loadingEnd" type="hidden" value="N" />

        <input id="displayLoading" type="hidden" value="" />
        <input id="temp1" name="nmTemp1" type="hidden" value="" />
        <input id="temp2" name="nmTemp2" type="hidden" value="" />
        <input id="temp3" name="nmTemp3" type="hidden" value="" />
    </form>
    <?php
    if ($ActionFlag != "list") {
        if ($ActionFlag == 'view' && $isUsePrint || $ActionFlag != "view" && $isUseForm) {
            ?>
            <textarea id="userDefine_page_print" style="display: none;"><?php
            if (file_exists('../_mis_addLogic/' . $RealPid . "_print.html")) {
                $userPrintPage = 'Y';
                include '../_mis_addLogic/' . $RealPid . "_print.html";
            } else if (file_exists('../_mis_addLogic/' . $logicPid . "_print.html")) {
                $userPrintPage = 'Y';
                include '../_mis_addLogic/' . $logicPid . "_print.html";
            }
            ?></textarea>
        <?php }
    } ?>
    <textarea id="allFilter" style="display:none;"><?php echo $allFilter; ?></textarea>



    <?php if ($lite == 'Y') { ?>
        <div id="example" style="padding-top: 0;">
            <?php
            if ($MenuType == "22") {
                include '../_mis_addLogic/' . $logicPid . '.php';
                include 'simple_inc.php';
            } else if (mb_substr($MenuType, 0, 1, 'UTF-8') == '1') {
                include 'simple_inc.php';
            } else {
                if ($inc == '')
                    $inc = 'simple';
                include $inc . "_inc.php";
            }
            ?>
        </div>

    </body>

    </html>
    <?php
    ob_end_flush();
    exit;
    } ?>




<?php if ($isMenuIn == 'Y') { ?>

    <link rel="stylesheet" type="text/css" href="../_mis_kendo/telerik-navigation/metric.min.css"
        xhref="https://d6vtbcy3ong79.cloudfront.net/fonts/1.1.5/css/metric.min.css">
    <link rel="stylesheet" type="text/css" href="../_mis_kendo/telerik-navigation/index.min.css?v=11"
        xhref="https://d6vtbcy3ong79.cloudfront.net/telerik-navigation/2.0.3/css/index.min.css">
    <nav id="js-tlrk-nav" class="TK-Nav TK-Nav--Shadow TK-Nav--Loading TK-Nav--Fluid" data-tlrk-nav-version="2.0.3">

        <section class="TK-Bar">
            <div class="TK-container TK-Bar-container">


                <div class="TK-TLRK-Brand"><a
                        onclick="document.treatForm.nmCommand.value = 'menuRefresh';document.treatForm.submit();"
                        href="/<?php echo $top_dir; ?>/index.php?RealPid=<?php echo $RealPid_Home; ?>&isMenuIn=Y"
                        class="TK-TLRK-Logo"></a></div>


                <div class="TK-Search">
                    <div class="k-textbox k-space-right search" style="padding-right: 0; width: 100%; border:0;">
                        <input id="txtSearch" class="root-nav" title="프로그램 검색" placeholder="<?php echo $MenuName; ?>" />
                        <label for="txtSearch" class="k-icon k-i-search">&nbsp;</label>
                    </div>
                </div>




                <div class="TK-Drawer" id="js-tlrk-nav-drawer">

                    <ul class="TK-Context-Menu TK-Menu">

                        <li class="TK-Menu-Item"><a class="TK-Menu-Item-Link" data-match-exact-path>loading...</a></li>
                    </ul>


                    <ul class="TK-Aside-Menu">


                        <li class="TK-Aside-Menu-Item TK-bn gnb"><a onclick="pushAlim();" class="TK-Aside-Menu-Button"
                                title="최근 7일간 알림내역입니다." data-match-starts-with-path>
                                <span class="k-icon k-i-notification"></span>

                                <?php if ($gnbCount > 0) { ?>
                                    <span class="TK-Counter TK-Counter--SC TK-Counter--Visible"><?php echo $gnbCount; ?></span>
                                <?php } else { ?>
                                    <span class="TK-Counter TK-Counter--SC TK-Counter--Visible TK-Counter--Empty">0</span>
                                <?php } ?>

                            </a></li>

                        <li class="TK-Aside-Menu-Item TK-bn user"><a
                                onclick="$(`button#js-tlrk-nav-drawer-button`).click();go_mis_gubun('338');"
                                xhref="index.php?RealPid=speedmis000338&isMenuIn=<?= iif($isMenuIn == 'Y', 'Y', '') ?>"
                                class="TK-Aside-Menu-Button" title="개인정보수정" data-match-starts-with-path><span
                                    class="k-icon k-i-user"></span></a></li>

                        <?php if ($telegram_bot_token != '' || $send_admin_mail != '') { ?>
                            <li class="TK-Aside-Menu-Item TK-bn sos"><a
                                    onclick="$(`button#js-tlrk-nav-drawer-button`).click();sendMsg_opinion();"
                                    class="TK-Aside-Menu-Button" title="관리자에게 문의 / 불편신고" data-match-starts-with-path><img
                                        src="img/sos.png" style="width: 18px;"></a></li>
                        <?php } ?>

                        <li class="TK-Aside-Menu-Item TK-bn tip"><a
                                onclick='$(`button#js-tlrk-nav-drawer-button`).click();openTip();'
                                class="TK-Aside-Menu-Button" title="사용Tip & 개발Tip"
                                style="padding: 0 7px 0 11px; font-weight: bold; top: -1px;"
                                data-match-starts-with-path><span class="k-icon" style="width: 25px;">TIP</span></a></li>


                        <li class="TK-Aside-Menu-Item TK-bn logout"><a
                                onclick='$(`button#js-tlrk-nav-drawer-button`).click();if(confirm(document.getElementById("MisSession_UserName").value+iif(document.getElementById("MisSession_UserName").value!=document.getElementById("MisSession_UserID").value," (ID: "+document.getElementById("MisSession_UserID").value+")","")+ " 님, 로그아웃을 하시겠습니까?")) { stop(); location.href = "logout.php"; }'
                                class="TK-Aside-Menu-Button" title="<?php echo $MisSession_UserID; ?> 님, 로그아웃"
                                data-match-starts-with-path><span class="k-icon k-i-logout"></span></a></li>



                    </ul>
                </div>
                <div class="TK-Drawer-Extension"></div>
                <div class="TK-Aside TK-Mobile">
                    <ul class="TK-Aside-Menu">
                        <li class="TK-Aside-Menu-Item"><button type="button"
                                class="TK-Aside-Menu-Button TK-Aside-Menu-Button--Toggle-Drawer"
                                id="js-tlrk-nav-drawer-button"><svg xmlns="http://www.w3.org/2000/svg" width="15"
                                    height="15" viewBox="0 0 512 512" fill="#4d4f52">
                                    <path d="M0 91h512v60H0zM0 237.3h512v60H0zM0 383.5h512v60H0z" />
                                </svg></button></li>
                    </ul>
                </div>
            </div>
        </section><button type="button" class="TK-Nav-Overlay" id="js-tlrk-nav-overlay">close mobile menu</button>
    </nav>

<?php } ?>



<div id="gnb" class="gnb_one gnb_notice_li gnb_lst" style="display: none;">
    <div class="demo-section k-content gnb_notice_li gnb_lyr_opened" id="gnb_notice_layer"
        style="display: inline-block;">
        <div class="gnb_notice_lyr" id="gnb_notice_lyr">
            <div class="svc_noti svc_panel">
                <div class="svc_scroll">
                    <div class="svc_head"><strong class="gnb_tit">최근 7일간 알림</strong>
                        <div class="task_right">
                            <button onclick="gnbDelete('read');" id="gnb_btn_read_noti_del">
                                처리된 알림 삭제</button>
                            <button onclick="gnbDelete('all');" id="gnb_btn_all_noti_del">모두 삭제</button>
                        </div>
                    </div>
                    <div class="svc_body" id="gnb_naverme_layer">

                        <?php if ($gnbCount > 0) { ?>
                            <ul class="svc_list" id="listView"></ul>

                            <script type="text/x-kendo-template" id="gnb_template">
        <li class="gnb_unread" data-serviceid="checkout" data-catid="998" data-messagetimekey="1195806670579315702">            
        <a onclick="gnbRead('#= idx #', '#= RealPid #', '#= widx #');"
        href="#= gnb_template_href(RealPid, widx, parent_gubun, parent_idx) #" class="gnb_list_cover gnb_Klist">
        <p 
        #if(readDate){#
            class="gnb_subject" style="color:\\#999;" title="처리완료"
        #}else{#
            class="gnb_subject unread" style="color:\\#177e12; font-weight:bold;" title="미처리"
        #}#
        >#:table_RealPidQnMenuName#</p>
        #if(table_parent_gubunQnMenuName){#
        <p class="gnb_info"><span class="gnb_user_name">상위프로</span>
        <em class="svc_name">#= table_parent_gubunQnMenuName #</em></p>      
        #}#
        <p class="gnb_info">
        #if(table_wdaterQnusername){#
            <span class="gnb_user_name">#= table_wdaterQnusername #</span>&nbsp;
        #}#
            <span class="date">#= wdate #</span></p></a>        
        <button class="gnb_btn_remove gnb_Kdel" 
        onclick="gnbDelete('idx', '#= idx #', '#= RealPid #', '#= widx #');">
        <span>알림 삭제</span></button>
        </li>    
        </script>


                            <?php if ($isMenuIn != 'Y') { ?>
                                <style>
                                    body[isMenuIn="N"][isMainFrame="Y"] .k-i-more-vertical:before {
                                        content: "<?php echo iif($gnbCount > 9, "9+", $gnbCount) ?>";
                                        font-size: 17px;
                                        COLOR: yellow;
                                        font-weight: bold;
                                        background: blue;
                                        border: 4px blue solid;
                                        border-radius: 100%;
                                        font-family: monospace;
                                    }

                                    body[isMenuIn="N"][isMainFrame="Y"] .k-toolbar .k-overflow-anchor>.k-icon {
                                        position: absolute;
                                        top: 43%;
                                        left: 0;
                                        margin: -8px 0;
                                        width: 100%;
                                        height: 29px;
                                    }
                                </style>
                            <?php } ?>


                        <?php } else { ?>
                            <div class="svc_blank">
                                <div class="svc_msg_box">
                                    <h4 class="gnb_tit">새로운 알림이 없습니다.</h4>
                                    <p class="gnb_desc"><br></p>
                                </div><span class="gnb_v_guide"></span>
                            </div>
                            <style>
                                #gnb button {
                                    pointer-events: none;
                                }
                            </style>
                        <?php } ?>


                    </div>
                </div>
                <a href="/<?php echo $top_dir; ?>/index.php?RealPid=speedmis000980&isMenuIn=<?php echo $isMenuIn; ?>"
                    class="gnb_notice_all">내 알림 전체보기</a>
            </div>
        </div>
    </div>
</div>





<script>

    /*
    toastr.warning("안녕하세요?", "제목", {progressBar: true, timeOut: 5000});
    toastr.success("안녕하세요?", "제목", {progressBar: true, timeOut: 3000});
    toastr.error("안녕하세요?", "제목", {progressBar: true, timeOut: 0, closeButton: false, positionClass: "toast-bottom-right"});
    
    
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-bottom-right",
    
    */

    (function ($) {
        function endsWith(str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        }
        var banner = $("#webinar-banner");
        var bannerLink = banner.find("a");
        var trackingAttribute = "data-gtm-event";
        var uniqueLocalStorageBannerKey = "KendoUI2018R1";
        var bannerExpiresAt = Date.UTC(2019, 0, 25); // 25th of Jan, 2019
        var showWebinarBanner = true;
        var suites = {
            // "suite": "trackingAttribute"
            "/kendo-demos/": "yellow-strip, KendoUI2018R1ExportWebinar, kendo-overview-page", // for localhost only
            "kendo-demos/": "yellow-strip, KendoUI2018R1ExportWebinar, kendo-demos-page", // for localhost only
            "https://demos.telerik.com/kendo-ui/": "yellow-strip, KendoUI2018R1ExportWebinar, kendo-overview-page", // Kendo UI Demos Overview page only
            "kendo-ui/": "yellow-strip, KendoUI2018R1ExportWebinar, kendo-demos-page",
            "aspnet-mvc/": "yellow-strip, KendoUI2018R1ExportWebinar, mvc-demos-page",
            "php-ui/": "yellow-strip, KendoUI2018R1ExportWebinar, php-demos-page",
            "jsp-ui/": "yellow-strip, KendoUI2018R1ExportWebinar, jsp-demos-page"
        };

        for (var j in suites) {
            var isOverviewKey = (j === "https://demos.telerik.com/kendo-ui/" || j === "/kendo-demos/" || j === "/php-ui/" || j === "/jsp-ui/");
            var containsKey = location.href.indexOf(j) > 0;
            var endsWithKey = endsWith(location.href, j);

            if (containsKey && (isOverviewKey && endsWithKey || !isOverviewKey && !endsWithKey)) {
                try {
                    showWebinarBanner = (typeof bannerExpiresAt == "undefined" || bannerExpiresAt > (new Date()).getTime()) && ("1" !== localStorage.getItem(uniqueLocalStorageBannerKey));
                } catch (e) {
                }
                if (showWebinarBanner) {
                    bannerLink.attr(trackingAttribute, suites[j]);
                    banner.show().find(".close").click(function () {
                        try {
                            localStorage.setItem(uniqueLocalStorageBannerKey, 1);
                            banner.animate({ marginTop: "-40px", height: 0 }, function () {
                                banner.hide();
                                $(window).resize();
                            });
                            return true;
                        } catch (e) {
                        }
                    });
                }
                break;
            }
        }
    })($);
</script>


<script>
    //$('body').attr('kendoTheme', window.kendoTheme);
    //if(window.kendoTheme=='highcontrast' && (isMainFrame() || $('body').attr('topsite')=='mis')) {
    //    document.documentElement.classList.add('invert-mode');
    //}

</script>



<script>

    change_dark_mode();

    var NAV_JSON_URL = '';
    var navProduct = "online";
    var product = "kendo-ui";
</script>
<script src="../_mis_kendo/examples/content/shared/js/example-datasources_speedmis.js"
    xsrc="https://demos.telerik.com/kendo-ui/content/shared/js/example-datasources.js"></script>
<script src="../_mis_kendo/examples/content/shared/js/web-examples.js"
    xsrc="https://demos.telerik.com/kendo-ui/content/shared/js/web-examples.js"></script>
<div id="main-wrap" class="normalScreen" isMainFrame="Y">


    <?php if ($isMenuIn == 'Y' || 111 == 111) { ?>

        <div id="example-sidebar">
            <div id="example-nav-bar">
                <a href="#" title="전체 메뉴 보기" id="back-forward" class="back-nav">전체 메뉴</a>
            </div>
            <div id="nav-wrapper" style="padding-top: 12px;">
                <div id="nav">
                    <div id="root-nav">

                    </div>






                    <div id="example-nav">
                    </div>






                </div>


                <script>
                    $("input.root-nav").on("input", function () {

                        var query = this.value.toLowerCase();
                        var dataSource = $("#root-nav").data("kendoTreeView").dataSource;


                        filter(dataSource, query);

                        if ($("#back-forward").hasClass("back-nav")) $("#back-forward").click();
                        if (query == "" && !$("#back-forward").hasClass("back-nav")) $("#back-forward").click();
                    });
                    <?php

                    if ($newLogin == "Y") {

                        setcookie("newLogin", "", 0, "/");

                        if ($MS_MJ_MY == 'MY') {
                            $sql = "select MisMyMenuListJson('$MisSession_UserID','');";
                        } else {
                            $sql = "select dbo.MisMyMenuListJson('$MisSession_UserID','');";
                        }

                        ?>
                        var myMenuListAll = <?php echo onlyOnereturnSql($sql); ?>;
                        localStorage.setItem("myMenuListAll_<?php echo $MisSession_UserID; ?>", JSON.stringify(myMenuListAll));
                        var myUrl = {};
                        localStorage.setItem("myUrl_<?php echo $MisSession_UserID; ?>", JSON.stringify(myUrl));
                        /*
                        for(key in localStorage) {
                            if(InStr(key, '_gubunEqual')>0) {
                                delete localStorage[key];
                            }
                            //console.log(key);
                        }
                        */

                    <?php } else {
                        ?>
                        var myMenuListAll = JSON.parse(localStorage.getItem("myMenuListAll_<?php echo $MisSession_UserID; ?>"));

                        if (getCookie("<?php echo $cookie_authVersion_name; ?>") != "" && myMenuListAll == null) {
                            console.log("오류로 쿠키 삭제 후 재호출합니다.");
                            //쿠키 초기화는 아래와 같이 setTimeout 로 해야 제대로 반영됨.



                            setTimeout(function () { setCookie("newLogin", "Y"); setCookie("<?php echo $cookie_authVersion_name; ?>", ""); location.href = replaceAll(location.href, "#", ""); }, 0);
                        }
                    <?php } ?>

                    if (myMenuListAll != null) {

                        var myMenuListThis = [];
                        var TK_Menu_Html = '';

                        //우측상단 대메뉴
                        myMenuListAll[0].items.forEach(function (el, i, arr) {
                            if (el.gubun == "<?php echo mb_substr($autogubun, 0, 2, 'UTF-8'); ?>") {
                                myMenuListThis = [myMenuListAll[0].items[i]];
                                if (myMenuListAll[0].items[i].items) {
                                    myMenuListAll[0].items[i].items.forEach(function (a) {
                                        if (a.expanded == true) a.expanded = false;
                                    });
                                }
                                TK_Menu_Html = TK_Menu_Html + '<li class="TK-Menu-Item"><a xhref="/<?php echo $top_dir; ?>/index.php?gubun=' + el.id + '&isMenuIn=' + $('input#isMenuIn').val() + '" onclick="$(`button#js-tlrk-nav-drawer-button`).click();go_mis_gubun(' + el.id + ');" class="TK-Menu-Item-Link TK-Item--Selected" data-match-exact-path>' + el.text + '</a></li>';
                            } else if (el.MenuType == '11') {
                                TK_Menu_Html = TK_Menu_Html + '<li class="TK-Menu-Item"><a href=\'' + el.AddURL + '\' onclick="$(`button#js-tlrk-nav-drawer-button`).click();" class="TK-Menu-Item-Link" data-match-exact-path>' + el.text + '</a></li>';
                            } else if (el.MenuType == '12') {
                                TK_Menu_Html = TK_Menu_Html + '<li class="TK-Menu-Item"><a target=_blank href=\'' + el.AddURL + '\' onclick="$(`button#js-tlrk-nav-drawer-button`).click();" class="TK-Menu-Item-Link" data-match-exact-path>' + el.text + '</a></li>';
                            } else {
                                TK_Menu_Html = TK_Menu_Html + '<li class="TK-Menu-Item"><a xhref="/<?php echo $top_dir; ?>/index.php?gubun=' + el.id + '&isMenuIn=' + $('input#isMenuIn').val() + '" onclick="$(`button#js-tlrk-nav-drawer-button`).click();go_mis_gubun(' + el.id + ');" class="TK-Menu-Item-Link" data-match-exact-path>' + el.text + '</a></li>';
                            }
                        });

                        if (myMenuListThis.length == 0) myMenuListThis = [myMenuListAll[0].items[0]];
                        $("ul.TK-Context-Menu").html(TK_Menu_Html);


                        $("#root-nav").kendoTreeView({
                            loadOnDemand: false,
                            dataSource: {
                                data: myMenuListAll
                            },
                        });



                        var rootNav = $("#root-nav").data("kendoTreeView");

                        /* 현재메뉴의 briefTitle 노출 */
                        make_example_nav();
                        /* 현재메뉴의 briefTitle 노출 end */




                    }


                    function mobile_line() {

                        $("#panelbar-left")[0].outerHTML = '<div id="panelbar-left"></div>';

                        var mMenu_json = myMenuListAll[0].items;
                        mMenu_json = replaceAll(JSON.stringify(mMenu_json), '"expanded":true', '"expanded":false');
                        var selMenuName = '';
                        var selAutogubun = '';
                        temp = InStr(mMenu_json, '","id":"' + document.getElementById('gubun').value + '"');
                        if (temp > 0) {
                            selMenuName = mMenu_json.split('","id":"' + document.getElementById('gubun').value + '"')[0];
                            selMenuName = selMenuName.split('"text":"').pop(-1);
                            selAutogubun = mMenu_json.split(',"text":"' + selMenuName + '","id":"' + document.getElementById('gubun').value + '"')[0];
                            selAutogubun = selAutogubun.split('"gubun":"').pop(-1);
                            selAutogubun = selAutogubun.split('"')[0];
                            if (selAutogubun.length >= 2) {
                                mMenu_json = replaceAll(mMenu_json, '"gubun":"' + Left(selAutogubun, 2) + '","expanded":false', '"gubun":"' + Left(selAutogubun, 2) + '","expanded":true, "selected":true');
                                if (selAutogubun.length >= 4) {
                                    mMenu_json = replaceAll(mMenu_json, '"gubun":"' + Left(selAutogubun, 4) + '","expanded":false', '"gubun":"' + Left(selAutogubun, 4) + '","expanded":true, "selected":true');
                                    if (selAutogubun.length >= 6) mMenu_json = replaceAll(mMenu_json, '"gubun":"' + Left(selAutogubun, 6) + '"', '"gubun":"' + Left(selAutogubun, 6) + '", "selected":true');
                                }
                            }
                        }
                        mMenu_json = JSON.parse(mMenu_json);
                        forMax = mMenu_json.length;
                        for (ii = 0; ii < forMax; ii++) {
                            mMenu_json[ii].expanded = false;
                        }

                        var inlineDefault = new kendo.data.HierarchicalDataSource({
                            data: mMenu_json
                        });
                        $("#panelbar-left").kendoPanelBar({
                            dataSource: inlineDefault,
                            expandMode: "single",
                            select: expandCollapse
                        });
                        var panelBar = $("#panelbar-left").data("kendoPanelBar");
                        panelBar.expand($("#panelbar-left .k-state-selected").closest('li'));


                        $("#panelbar-left").prepend(
                            `<li role="treeitem" aria-expanded="false" class="k-item k-state-default k-last">

<ul class="TK-Aside-Menu">


<li class="TK-Aside-Menu-Item TK-bn gnb"><a onclick="pushAlim();" class="TK-Aside-Menu-Button" title="최근 7일간 알림내역입니다." data-match-starts-with-path>
<span class="k-icon k-i-notification"></span>

<?php if ($gnbCount > 0) { ?>
<span class="TK-Counter TK-Counter--SC TK-Counter--Visible"><?php echo $gnbCount; ?></span>
<?php } else { ?> 
<span class="TK-Counter TK-Counter--SC TK-Counter--Visible TK-Counter--Empty">0</span>
<?php } ?>

</a></li>

<li class="TK-Aside-Menu-Item TK-bn user"><a href="/<?php echo $top_dir; ?>/index.php?RealPid=speedmis000338" class="TK-Aside-Menu-Button" title="개인정보관리" 
data-match-starts-with-path><span class="k-icon k-i-user"></span></a></li>

<?php if ($telegram_bot_token != '' || $send_admin_mail != '') { ?>
<li class="TK-Aside-Menu-Item TK-bn sos"><a onclick="sendMsg_opinion();" class="TK-Aside-Menu-Button" title="관리자에게 문의 / 불편신고" 
data-match-starts-with-path><img src="img/sos.png" style="width: 18px;"></a></li>
<?php } ?>

<li class="TK-Aside-Menu-Item TK-bn tip"><a onclick='openTip();'
class="TK-Aside-Menu-Button" title="사용Tip & 개발Tip" style="padding: 0 7px 0 11px; font-weight: bold; top: -1px;"
data-match-starts-with-path><span class="k-icon" style="width: 25px;">TIP</span></a></li>


<li class="TK-Aside-Menu-Item TK-bn logout"><a onclick='if(confirm(document.getElementById("MisSession_UserName").value+iif(document.getElementById("MisSession_UserName").value!=document.getElementById("MisSession_UserID").value," (ID: "+document.getElementById("MisSession_UserID").value+")","")+ " 님, 로그아웃을 하시겠습니까?")) { stop(); location.href = "logout.php"; }' class="TK-Aside-Menu-Button" title="<?php echo $MisSession_UserID; ?> 님, 로그아웃" data-match-starts-with-path><span class="k-icon k-i-logout"></span></a></li>
</ul></li>`

                        );

                    }

                    $("#back-forward").on("click", function (e) {
                        if ($(this).hasClass("back-nav")) {
                            $(this).removeClass("back-nav").addClass("forward-nav").text(myMenuListThis[0].text).attr("title", "현재 메뉴 보기");
                            $("#nav").addClass("root");

                            /* 전체메뉴의 briefTitle 노출 */
                            if ($("#back-forward").attr("rootNavLoad_YN") != "Y") {

                                $("#back-forward").attr("rootNavLoad_YN", "Y");  //한번만 실행하기 위한 조치

                                var briefTitleClass = ['new-widget', 'updated-widget', 'beta-widget', 'pro-widget'];
                                var cnt = rootNav.dataSource._data["0"].items.length;
                                for (i = 0; i < cnt; i++) {
                                    if (rootNav.dataSource._data["0"].items[i].briefTitle != "") {
                                        barDataItem = rootNav.dataSource.get(rootNav.dataSource._data["0"].items[i].id);
                                        if (barDataItem) {
                                            barElement = rootNav.findByUid(barDataItem.uid);
                                            barElement.find('.k-in').before('<span class="' + briefTitleClass[barDataItem.briefTitle.charCodeAt() % 4] + '">' + barDataItem.briefTitle + '</span>');
                                        }
                                    }
                                    if (rootNav.dataSource._data["0"].items[i].items) {
                                        var cntQ = rootNav.dataSource._data["0"].items[i].items.length;

                                        for (iQ = 0; iQ < cntQ; iQ++) {
                                            if (rootNav.dataSource._data["0"].items[i].items[iQ].briefTitle != "") {
                                                barDataItemQ = rootNav.dataSource.get(rootNav.dataSource._data["0"].items[i].items[iQ].id);
                                                if (barDataItemQ) {
                                                    barElementQ = rootNav.findByUid(barDataItemQ.uid);
                                                    barElementQ.find('.k-in').before('<span class="' + briefTitleClass[barDataItemQ.briefTitle.charCodeAt() % 4] + '">' + barDataItemQ.briefTitle + '</span>');
                                                }
                                            }

                                            if (rootNav.dataSource._data["0"].items[i].items[iQ].items) {
                                                var cntQQ = rootNav.dataSource._data["0"].items[i].items[iQ].items.length;

                                                for (iQQ = 0; iQQ < cntQQ; iQQ++) {
                                                    if (rootNav.dataSource._data["0"].items[i].items[iQ].items[iQQ].briefTitle != "") {
                                                        barDataItemQQ = rootNav.dataSource.get(rootNav.dataSource._data["0"].items[i].items[iQ].items[iQQ].id);
                                                        if (barDataItemQQ) {
                                                            barElementQQ = rootNav.findByUid(barDataItemQQ.uid);
                                                            barElementQQ.find('.k-in').before('<span class="' + briefTitleClass[barDataItemQQ.briefTitle.charCodeAt() % 4] + '">' + barDataItemQQ.briefTitle + '</span>');
                                                        }

                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            /* 전체메뉴의 briefTitle 노출 end */
                            root_treeview_select(getUrlParameter('gubun'));

                        } else {
                            $(this).removeClass("forward-nav").addClass("back-nav").text("전체 메뉴").attr("title", "전체 메뉴 보기");
                            $("#nav").removeClass("root");
                        }

                        e.preventDefault();
                    });


                </script>
            </div>
        </div>

    <?php } ?>

    <div id="main">
        <a href="#" id="sidebar-toggle"><span></span></a>

        <div class="themechooser" data-rel="themechooser" data-role="details">


            <div id="example-search-wrapper" class="k-content search-wrapper">


                <div id="toolbarRound">
                    <div id="toolbar"></div>
                </div>

            </div>




            <div id="panelbar-left"></div>


            <span class="tc-activator k-content">설정</span>

            <div class="tc-theme-list k-content k-button.k-state-active">
            </div>




        </div>

        <script id="theme-item-template" type="text/x-kendo-template">
    <li class="tc-item #: iif(themeName()==name,'k-state-selected','') #">
        # for (var i = 0; i < colors.length; i++) { #
            <span class="tc-color" style="background-color: #= colors[i] #"></span>
        # } #
        <span class="tc-name">#: name #</span>
    </li>
</script>

        <script id="size-item-template" type="text/x-kendo-template">
    <li class="tc-item">
        <span class="tc-name">#: name #</span>
        # if ('relativity' in data) { #
            <span class="tc-relativity">
                (#: relativity #)
            </span>
        # } #
    </li>
</script>



        <script type="x/kendo-template" id="pdf-template">
  <div class="pdf-template">
    <div class="header">
      <div style="float: right">Page #: pageNum # of #: totalPages #</div>
      <span><?php echo $MenuName; ?></span>
    </div>
    <div class="watermark">SpeedMIS</div>
    <div class="footer">
      Page #: pageNum # of #: totalPages #
    </div>
  </div>
</script>

        <div id="help_contents_top" style="display:none;"></div>
        <div id="help_contents" style="display:none;">
            <div class="help_MenuName"><?php echo $MenuName; ?></div>
            <div class="help_contents"><?php echo $help_contents; ?></div>
        </div>

        <div id="exampleWrap">



            <div id="example" style="padding-top: 0;">

                <?php

                if ($StopMessage != '') { ?>
                    <script>
                        alert("<?php echo $StopMessage; ?>");
                    </script>


                <?php }

                if ($MenuType == "22") {
                    include '../_mis_addLogic/' . $logicPid . '.php';
                    include 'simple_inc.php';
                } else if (mb_substr($MenuType, 0, 1, 'UTF-8') == '1') {
                    include 'simple_inc.php';
                } else {
                    if ($inc == 'scheduler') {
                        //별도의 사용자정의 scheduler_...$schedulerPid 가 있으면 include 함.
                        if (file_exists('../_mis_addLogic/scheduler_' . $schedulerPid . '.php'))
                            include '../_mis_addLogic/scheduler_' . $schedulerPid . '.php';
                        else
                            include $inc . '_inc.php';
                    } else {
                        if ($inc == '')
                            $inc = 'simple';
                        include $inc . '_inc.php';
                    }
                }
                ?>
                <input id='spreadsheets_url' value='<?php echo $spreadsheets_url; ?>' type='hidden' />


            </div>
        </div>

        <?php if ($isMenuIn == 'S') { ?>
            <div class="help_button">
                <?php if ($ActionFlag == 'view') { ?>
                    <a class="k-button modify">수정</a>
                <?php } else if ($ActionFlag == 'modify') { ?>
                        <a class="k-button save">수정제출</a><a onclick="s_modify_cancel();" style="float: right;color: rgb(251, 0, 0);"
                            class="k-button">취소</a>
                <?php } else { ?>
                        <a class="k-button save">신규제출(저장)</a><a class="k-button" onclick="location.href = status_view_url();"
                            style="float: right;color: rgb(251, 0, 0);">양식 지우기</a>
                <?php } ?>
            </div>
            <div id="intrannet_name"><?php echo $intrannet_name; ?></div>
        <?php } ?>




        <script id="template_help" type="text/x-kendo-template">
    <div class="template-wrapper help">
        <p>A cheese made in the La Mancha region of Spain from the milk of sheep of the Manchega breed</p>
    </div>
</script>




        <script src="cssJs/common_bottom<?= $min ?>.js?<?= $dd ?>sds"></script>
        <script src="cssJs/<?= $inc ?>_bottom<?= $min ?>.js?<?= $dd ?>333"></script>



        <script>


            if (!isMainFrame()) {
                if (parent.document.getElementById("MenuType")) {
                    if (parent.document.getElementById("MenuType")) $('body').attr('parentMenuType', parent.document.getElementById("MenuType").value);
                    $('body').attr('parentIsMainFrame', iif(parent.isMainFrame(), "Y", "N"));
                    $('body').attr('parentActionFlag', parent.document.getElementById('ActionFlag').value);
                }
            }


            <?php if ($kendoCultureNew != "ko-KR") { ?>
                $(document).ready(function () {
                    if (typeof localization<?php echo $MenuType; ?> == "function") localization<?php echo $MenuType; ?>();
                });
            <?php } ?>



        </script>


        <?php include '../_mis_uniqueInfo/bottom_addLogic.php'; ?>


        <?php
        if ($auto_file_update == 'Y') {
            //top_addLogic.php 에서 $auto_file_update=='Y' 이고, 개발자모드가 아니고, PC버전, 기본홈 접근 시에만, 파일업데이트 체크
            if ($devQueryOn != 'Y' && $isMenuIn == 'Y' && $RealPid == $RealPid_Home) {
                file_update_check();
            }
        }
        ?>


        <?php if ($isMenuIn == 'Y' && $devQueryOn == 'Y' && $MS_MJ_MY == 'MJ') { ?>
            <!-- Open the example in Dojo and select version prior to 2022 R1 to see the difference in the appearance -->
            <div id="fab">

                <div id="dev_ctrl"></div>
                <table class="dev_table k-table">
                    <tbody>
                        <tr>
                            <th style="width:60px;background:#ddd;color:#000;font-size:11px;">선택 :</th>
                            <th style="border-left:none;width:80px;"><a id="dev_page_view_real"
                                    onclick="dev_page_view('real');" href="javascript:;">실사용 보기</a></th>
                            <th style="border-left:none;width:78px;background:#ddd;color:#000;font-size:11px;">복제 / 적용<br>
                                <a href="javascript:;" onclick="open_design();" style="color:blue">실디</a> ▼ <a
                                    href="javascript:;" onclick="open_design('pre');" style="color:#000">테디</a>
                            </th>
                            <th style="border-left:none;width:80px;background:#000;"><a id="dev_page_view_pre"
                                    onclick="dev_page_view('pre');" href="javascript:;">테스트 보기</a></th>
                        </tr>
                        <tr>
                            <td style="border-top:none;background:#ddd;color:#000;font-size:11px;">상세내역</td>
                            <td style="border-top:none;border-left:none;"><a id="real_detail" href="javascript:;"
                                    onclick="dev_source_open('real','detail');"></a></td>
                            <td rowspan="2" style="border-top:none;"><a href="javascript:;"
                                    onclick="dev_source_copyTo_pre();">테스트로 복제</a><br /><br />
                                <a href="javascript:;" onclick="dev_source_applyTo_real();">실사용에 적용</a><br /><br />
                                <a href="javascript:;" onclick="dev_source_delete_pre();">테스트 삭제</a>
                            </td>
                            <td style="border-top:none;border-left:none;background:#000;"><a id="pre_detail"
                                    href="javascript:;" onclick="dev_source_open('pre','detail');"></a></td>
                        </tr>
                        <tr>
                            <td style="border-top:none;background:#ddd;color:#000;font-size:11px;">PHP로직</td>
                            <td style="border-top:none;border-left:none;"><a id="real_php" href="javascript:;"
                                    onclick="dev_source_open('real','php');"></a></td>
                            <td style="border-top:none;border-left:none;background:#000;"><a id="pre_php"
                                    href="javascript:;" onclick="dev_source_open('pre','php');"></a></td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <script>
                if (getCookie('dev_ctrl_on') == null) {
                    setCookie('dev_ctrl_on', 'off', 999);
                }

                $('div#dev_ctrl').click(function () {
                    dev_ctrl_apply(1);
                    draw_program_info();
                    dev_page_view();
                });


                var devTarget = getCookie('devTarget');     //1=실사용, 2=테스트
                if (devTarget != '1' && devTarget != '2') {
                    devTarget = '1';
                    setCookie('devTarget', devTarget, 1000);
                }
                if (getCookie('dev_ctrl_on') != 'off') {
                    draw_program_info();
                    dev_page_view();
                }


            </script>



        <?php } ?>

        </body>

        </html>


        <?php


        if ($cache_path == '') {
            ob_end_flush();
            exit; //캐시파일 경로가 없으면 종료
        }

        $output = ob_get_contents(); // 지금까지의 출력 내용 저장
        $output = $output . "
<!-- url : $ServerVariables_URL -->
";
        echo '---------------------------------------------------------
';

        WriteTextFileSimple($cache_path, $output, FILE_APPEND);
        ob_end_flush();
