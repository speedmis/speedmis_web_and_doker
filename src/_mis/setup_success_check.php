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

require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$strsql = "select * from (select 'success' as 'setup_success_check') aaa ";
echo jsonReturnSql($strsql);


if($MS_MJ_MY=='MY') $addDir = 'MY'; else $addDir = '';
$update_check = file_get_contents_new($full_site . '/_mis_addLogic/updateVersion/updateVersion_' . 'last.txt');
if(is_numeric($update_check)) {
    $presql_url = 'https://www.speedmis.com/_mis/misShare_presql_create.php?remote_MS_MJ_MY=' . $MS_MJ_MY . '&t=' . $update_check;
    $presql = Trim(file_get_contents_new($presql_url));

    if(ord(Left($presql,1))==239) $presql = Mid($presql, 2, 999999);
	//misShare_presql_create.php 에러가 안났을 경우 실행.
	if(InStr($presql,'misShare_presql_create')==0 && $presql!='') {
		//$presql = JWT::decode($presql, 'presql', array('HS256'));
		$presql = JWT::decode($presql, new Key('presql', 'HS256'));
		$apply_full_siteID_YN = "N";
		if(function_exists("apply_full_siteID_YN")) {
			apply_full_siteID_YN();
		}

		if($apply_full_siteID_YN=="Y") {
			$presql = apply_full_siteID($presql);
		}
		
		if(Len($presql)>0) {
            for($i=0;$i<count(splitVB($presql,';;;'));$i++) {
                $sql = Trim(splitVB($presql,';;;')[$i]);
                if($sql!='') execSql($sql);
            }
        }
	}
}


exit;

?>
