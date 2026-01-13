<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("charset=UTF-8");

//error_reporting(E_ALL);
//ini_set('display_errors', 1);

include '../MisCommonFunction.php';
include '../../_mis_uniqueInfo/config_siteinfo.php';
include '../MisCommonFunctionPlus.php';


$app_email = requestVB("app_email");
$app_displayName = requestVB("app_displayName");


if($ServerVariables_QUERY_STRING=='' && $app_email=='') { ?>
<script>
    function replaceAll(oldString,searchStr, replaceStr )
    {
        if (oldString==null) return false;
        var str;
        str = (oldString+"").split(searchStr).join(replaceStr);
        return str;
        
    }
    new_url = replaceAll(location.href, "#", "?");
    if(new_url!=location.href) location.href = new_url;
</script>
<?php
    //exit;
}





if($app_email!='') {
    $google_sub = 'nomeans';
    $google_email = $app_email;
    $google_name = $app_displayName;
    $google_picture = '';
} else {

    $access_token = requestVB("access_token");
    $result = file_get_contents_new("https://www.googleapis.com/oauth2/v3/userinfo?access_token=$access_token");
    $result = json_decode($result, true);


    $google_sub = 'g' . $result['sub'];
    $google_name = $result['name'];

    if(isset($result['email'])) {
        $google_email = $result['email']; 
    } else {
        $google_email = '';
    }
    if(isset($result['picture'])) {
        $google_picture = $result['picture']; 
    } else {
        $google_picture = '';
    }
}


$sql = "select count(*) from MisUser where uniqueNum='$google_sub' or google_email='$google_email'";

if(onlyOnereturnSql($sql)==0 && $google_email!='') {
    $sql = " 
    insert into MisUser (uniquenum, station_newnum, username, positionnum, myLanguageCode, email, google_name, google_picture, google_email, wdater)
    values ('$google_email', '$beginner_stationNum', '$google_name', '98', '$kendoCulture', '$google_email', '$google_name', '$google_picture', '$google_email', 'gadmin')";
    execSql($sql);

    if(function_exists("after_add_user")) {
        after_add_user($google_email);
    }
}

$MisSession_UserID = $google_email;
$sql = "
    select table_m.UserName as '한글성명'
    ,case when isnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='g' then 'google' when isnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='f' then 'facebook' else 'home' end as MisSession_AuthSite
	,table_Station_NewNum.StationName as '소속팀'
	,table_positionNum.kname as '직책'
    ,table_m.positionNum as '직책코드'
    ,table_m.myLanguageCode as myLanguageCode
    ,google_email as email
    from MisUser table_m  
    left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum
    left outer join MisCommonTable table_positionNum on table_positionNum.kcode = table_m.positionNum and table_positionNum.gcode='speedmis000188'
    where table_m.UniqueNum='$MisSession_UserID' and table_m.delchk<>'D';
";
$result_sns = allreturnSql($sql);

if(count($result_sns)==0) {
    echo "<script>alert('기존에 등록된 구글 계정이 휴면상태입니다. 관리자에게 문의하세요.');</script>";
    echo "<script>location.href='../';</script>";
    exit;
}
$MisSession_UserName = $result_sns[0]['한글성명'];
$MisSession_AuthSite = $result_sns[0]['MisSession_AuthSite'];
$MisSession_StationName = $result_sns[0]['소속팀'];
$MisSession_PositionName = $result_sns[0]['직책'];
$MisSession_PositionCode = $result_sns[0]['직책코드'];
$myLanguageCode = $result_sns[0]['myLanguageCode'];
$email = $result_sns[0]['email'];

$accessTokenTime = time();
$nextCheckTime = $accessTokenTime + 60 * 10;
$auth_version = $accessTokenTime;
$remember = 'on';
$exp = $accessTokenTime + 3600 * 24 * 365 * 10;
$data = array(
    'iss' => $base_domain,
    'iat' => $accessTokenTime,                //토큰이 발급된 시간
    'nct' => $nextCheckTime,                //개인정보, 권한 등을 체크하기 위한 다음예정시간. 10분.
    'remember' => $remember,        //로그인기억여부
    'exp' => $exp,        //만료시간
    'auth_version' => $auth_version,		//타장비아웃 otherOut==on 일 경우 현재시간으로 버전이 올라감.
    'MisSession_UserID' => urlencode($MisSession_UserID),
    'MisSession_UserName' => urlencode($MisSession_UserName),
    'MisSession_AuthSite' => urlencode($MisSession_AuthSite),
    'myLanguageCode' => $myLanguageCode,
    'MisSession_StationName' => urlencode($google_name),
    'MisSession_StationNum' => $beginner_stationNum,
    'MisSession_PositionName' => urlencode($MisSession_PositionName),
    'MisSession_PositionCode' => $MisSession_PositionCode
);

        
setcookie('myLanguageCode', $data['myLanguageCode'], time() + 3600*24*100, '/');
setCookie('modify_YN','N', time() + 3600*24*100, '/');

require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use Firebase\JWT\JWT;
$accessToken = JWT::encode($data, $pwdKey, 'HS256');


misLog("01","","",$ServerVariables_HTTP_REFERER,$MisSession_UserID);
setcookie("accessToken", $accessToken, time() + 3600*24*100, '/');
setcookie("accessTokenTime", $accessTokenTime, time() + 3600*24*100, '/');

$appSql = "
exec MisUser_Authority_Proc '$full_siteID','speedmis000001';
exec('update MisUser set menuRefresh = '''' where uniquenum=N''$MisSession_UserID''')
";
execSql($appSql);


if($app_email!='') {
    $target_uri = '/_mis/';
    re_direct($target_uri);
    exit;
}

//if(InStr($email,"@")==0) exit;
$target_uri = getcookie('target_uri');
//echo $target_uri;
if(InStr($target_uri,$full_site)==0 && Left($target_uri,4)=='http') {
    $target_uri = $target_uri . '_oauth/?tk=' . $accessToken . '&uid=' . $MisSession_UserID . '&uname=' . $MisSession_UserName . '&uposition=' . $MisSession_PositionCode . '&uemail=' . $email;
}

//구글 email 이 회원테이블에 없으면 추가 및 로그이력에 추가 후 이동.
//echo $target_uri;exit;
re_direct($target_uri);

?>