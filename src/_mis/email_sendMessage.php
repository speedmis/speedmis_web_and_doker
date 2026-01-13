<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');
ob_start();
//session_start();

?>
<?php include 'MisCommonFunction.php'; ?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php'; ?>
<?php include '../_mis_uniqueInfo/config_sendmail.php'; ?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);


if ($send_admin_mail == '') {
    echo '메일설정이 필요합니다.';
    exit;
}
$pushList = requestVB("pushList");
$title = requestVB("title");
$contents = requestVB("contents");
$sendername = requestVB("sendername");

if ($pushList == '')
    exit;
if ($title == '')
    exit;
if ($contents == '')
    exit;

$MisSession_UserID = '';
accessToken_check();


$pushList = "'" . str_replace(",", "','", $pushList) . "'";
$sql = "select email, username from MisUser where email like '%@%' and uniquenum in ($pushList)";

//알리미의 경우에 한해 알림체크를 따진다.
if (InStr($sendername, '알리미') > 0)
    $sql = $sql . " and isnull(receive_YN,'') in ('A','Y') ";

$sql = $sql . ";";

$emailList = allreturnSql($sql);

$email_skin = ReadTextFile('../_mis_uniqueInfo/email_skin.html');
if ($email_skin == '')
    $email_skin = ReadTextFile('email_skin.html');
if ($email_skin != '') {
    $email_skin = str_replace('{제목}', $title, $email_skin);

    $email_skin = str_replace('{내용}', $contents, $email_skin);

    $contents = $email_skin;
}
//여러명에게 보낼때
echo sendmail($send_admin_mail . '|' . $sendername, $emailList, $title, $contents);


?>