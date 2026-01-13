<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';


echo file_get_contents_new($ServerVariables_QUERY_STRING);
?>