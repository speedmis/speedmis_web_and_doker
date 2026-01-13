<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php'; ?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php'; ?>
<?php include '../_mis_uniqueInfo/config_sendmail.php'; ?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

$gzip_YN = 'N';

$MisSession_UserID = '';

accessToken_check();

if ($MS_MJ_MY == 'MY') {
    $isnull = 'ifnull';
} else {
    $isnull = 'isnull';
}


$chat_id = requestVB("chat_id");
$userid = requestVB("userid");
$text = requestVB("text");

$sendername = requestVB("sendername");
$parse_mode = requestVB("parse_mode");
$email = '';
$username = '';
$log_name = '';
if ($chat_id == '' && $userid != "") {
    $sql = "select telegram_chat_id, email, username from MisUser where uniqueNum=N'$userid' ";
    $data = allreturnSql($sql);
    if (count($data) == 1) {
        $chat_id = $data[0]['telegram_chat_id'];
        $email = $data[0]['email'];
        $username = $data[0]['username'];
    }
}
if ($chat_id != '' && $telegram_bot_token != '') {
    $sql = "select uniquenum,username from MisUser where telegram_chat_id=N'$chat_id'";
    if ($userid != '')
        $sql = $sql . " and uniqueNum=N'$userid'";
    if (InStr($sendername, '알리미') > 0)
        $sql = $sql . " and $isnull(receive_YN,'') in ('A','Y') ";

    $data = allreturnSql($sql);
    if (count($data) == 1) {
        $userid = $data[0]['uniquenum'];
        $username = $data[0]['username'];
        $log_name = '텔레그램';
    }
} else if ($email != '' && $send_admin_mail != '') {
    $log_name = '이메일';
} else if ($telegram_bot_token != '') {
    $log_name = '텔레그램시도';
} else if ($email != '' || $send_admin_mail != '') {
    $log_name = '이메일시도';
}


if ($username == "" && InStr($sendername, '알리미') == 0) {
    echo "@alert:수신자를 찾을 수 없습니다.";
    exit;
}



if (InStr($text, '@userid') > 0)
    $text = replace($text, '@userid', $userid);

if ($sendername == '')
    $sendername = iif($MisSession_UserName != "", $MisSession_UserName, "알리미");

$text = $sendername . "→" . $username . " | " . $text;

/* log file 방식대신 db 저장으로 변경
$log = $base_root . "/_mis_log/telegram_" . date("Ymd_His") . "_" . $MisSession_UserID . "_" . $userid . ".log";
if($parse_mode=="HTML") $log = $log . ".htm";
WriteTextFile($log, $text);
*/


$msg = replace($text, "'", "''");
$sql = "insert into MisMessageLog (log_name,from_name,to_number,to_name,to_id,msg,parse_mode,wdater,HTTP_USER_AGENT) values 
('$log_name','$sendername','$chat_id','$username','$userid','$msg','$parse_mode','$MisSession_UserID','$ServerVariables_HTTP_USER_AGENT');";
execSql($sql);


if ($log_name == '텔레그램') {
    $text = urlencode($text);
    $url = "https://api.telegram.org/bot$telegram_bot_token/sendMessage?chat_id=$chat_id&text=$text";
    if ($parse_mode != '')
        $url = $url . "&parse_mode=" . $parse_mode;

    //echo file_get_contents_new("https://m.daum.net");
    echo file_get_contents_new($url);
} else if ($log_name == '이메일') {
    $text = TextToHtml($text);
    echo sendmail($send_admin_mail, $email, $base_domain . ' 알림메일', $text);
} else {
    if ($telegram_bot_token == '') {
        echo "@alert:텔레그램 사용설정이 되어있지 않습니다. 관리자에게 문의하세요.";
    } else if ($userid == $MisSession_UserID) {
        echo "@confirm:먼저 텔레그램ID 설정을 하셔야 합니다. 해당 페이지로 이동할까요?";
    } else if (InStr($sendername, '알리미') == 0) {
        echo "@alert:수신자ID $userid 님은 텔레그램ID 설정이 되어 있지 않아 전송하실 수 없습니다.";
    }
}


?>