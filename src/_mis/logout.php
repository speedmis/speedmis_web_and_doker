<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php 


error_reporting(E_ALL);
ini_set("display_errors", 1);

//session_start();

$MisSession_UserID = '';
accessToken_check();

misLog("02","","","",$MisSession_UserID);


//session_destroy();

setCookie("accessToken", "", 0, "/");
setCookie("accessToken", "", 0, "/");
setCookie("login_welcome", "", 0, "/");

if(requestVB('preaddress')!='') {       //preaddress 는 / 로 시작하는 간단한 형태만 취급.
    re_direct($full_site . requestVB('preaddress'));
} else {
    re_direct($full_site . "/$top_dir/login/?logout=1&isStop=Y");
}
?>