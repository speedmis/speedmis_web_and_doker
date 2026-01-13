<?php
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

ob_start();
//session_start();

$MisSession_UserID = '';

accessToken_check();

if(onlyOneReturnSql("select count(*) from MisUser where uniqueNum='gadmin' ")*1 > 0) {
    if($MisSession_UserID=="") echo "[nologin]";
    else echo $MisSession_UserID;
}
?>
