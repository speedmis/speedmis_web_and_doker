<?php
header('Content-Type: text/html; charset=UTF-8');
?>
<?php include 'MisCommonFunction.php';?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

ob_start();
//session_start();


$allowSetup = getCookie('allowSetup');


if($allowSetup!="allow") exit;

$config_siteinfo = '';
if (isset($_POST["config_siteinfo"])) {
	$config_siteinfo = $_POST["config_siteinfo"];
}
if($config_siteinfo=="") exit;

$config_siteinfo2 = decode_firewall($config_siteinfo);
if($config_siteinfo==$config_siteinfo2) exit;


?>
<?php

WriteTextFile('../_mis_uniqueInfo/config_siteinfo.php', $config_siteinfo2);


?>
<script src="../_mis_kendo/js/jquery.min.js"></script>
<script src="../_mis_kendo/js/kendo.all.min.js"></script>
<script id="id_js" name="name_js" src="java_conv.js?kddd7447z3ze4efddw"></script>
<script>

var setup_success_check = ajax_url_return('setup_success_check.php');
var isSuccess = "N";
if(isJsonString(setup_success_check)) {
	setup_success_check = JSON.parse(setup_success_check);
	if(setup_success_check[0].setup_success_check=='success') {
		
		isSuccess = "Y";
		setLocalStorage('setup_data',null);
		
		if(confirm("사이트설정파일에 반영되었고, DB 접속도 원할한 것으로 확인됩니다. PC 에 임시 설정된 정보는 모두 삭제되었습니다. 실사이트에 접속하시겠습니까?")) window.open("/_mis/");


	}
}
if(isSuccess=="N") if(confirm("사이트설정파일에 반영되었지만, DB 접속에 실패하였습니다. 실사이트에 접속하시겠습니까?")) window.open("/_mis/");

</script>
