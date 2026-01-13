<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

$MisSession_UserID = '';
accessToken_check();

if(InStr($ServerVariables_QUERY_STRING,'://')==0) {
    if(Left($ServerVariables_QUERY_STRING,1)=='/') {
        $ServerVariables_QUERY_STRING = $full_site . $ServerVariables_QUERY_STRING;
    } else {
        $ServerVariables_QUERY_STRING = $full_site . '/' . $ServerVariables_QUERY_STRING;
    }
}
$cont = file_get_contents_new($ServerVariables_QUERY_STRING);
if(ord(Left($cont,1))==239) $cont = Mid($cont, 2, 9999999999);

echo $cont;

?>