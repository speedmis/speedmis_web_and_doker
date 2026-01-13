<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

ob_start();
//session_start();

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php
header('Content-Type:application/' . splitVB(right($ServerVariables_QUERY_STRING,4),'.')[count(splitVB(right($ServerVariables_QUERY_STRING,4),'.'))-1] . '; charset=UTF-8');

$resultCode = "success";
$afterScript = '';
$appSql = '';

error_reporting(E_ALL);
ini_set("display_errors", 1);


$MisSession_UserID = '';
accessToken_check();

if($MisSession_UserID=='') exit;


echo file_get_contents_new($ServerVariables_QUERY_STRING);

?>