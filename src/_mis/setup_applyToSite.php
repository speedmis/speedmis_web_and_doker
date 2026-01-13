<?php
header('Content-Type: text/html; charset=UTF-8');
?>
<?php include 'MisCommonFunction.php'; ?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

ob_start();
//session_start();

$gzip_YN = 'N';

$step = 0;
if (getCookie('step') != '') {
	$step = getCookie('step') * 1;
}
if ($step < 2) {
	echo '<script>alert("새로고침 후, 로그인을 먼저 하세요!");</script>';
	exit;
}

$config_siteinfo = '';
if (isset($_POST["config_siteinfo"])) {
	$config_siteinfo = $_POST["config_siteinfo"];
}
if ($config_siteinfo == "")
	exit;

$config_siteinfo2 = decode_firewall($config_siteinfo);
if ($config_siteinfo == $config_siteinfo2)
	exit;


?>
<?php
$MS_MJ_MY = requestVB('MS_MJ_MY');
$config_siteinfo = '../_mis_uniqueInfo/config_siteinfo.php';
$strDir = str_replace("\\", "/", $_SERVER["DOCUMENT_ROOT"]) . "/_mis_uniqueInfo/autosave";
if (!is_dir($strDir))
	mkdir($strDir, 0777, true);
else
	chmod($strDir, 0777);
if (file_exists($config_siteinfo)) {
	copy($config_siteinfo, str_replace("config_siteinfo", "autosave/config_siteinfo_" . date("Ymd_His"), $config_siteinfo));
}
WriteTextFile('../_mis_uniqueInfo/config_siteinfo.php', $config_siteinfo2);
include '../_mis_uniqueInfo/config_siteinfo.php';


setcookie("paidKey_ucount", "END", 0, "/");
setcookie("newLogin", "Y", 0, "/");



if ($MS_MJ_MY == 'MY') {
	$appSql = "
	call MisUser_Authority_Proc ('" . requestVB("full_siteID") . "','speedmis000001');update MisUser set menuRefresh = '' where uniquenum=N'gadmin';
	";
	if (requestVB("full_siteID") != 'speedmis') {
		$sql = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = 'MisMenuList' AND TABLE_SCHEMA='$base_db'";
		$AUTO_INCREMENT = onlyOnereturnSql($sql);
		if ($AUTO_INCREMENT == "") {
			echo '<script>alert("오류발생! SpeedMIS_v6_my.sql 를 실행하여 기본 DB를 먼저 구성하세요!");</script>';
			exit;
		}
		if ($AUTO_INCREMENT * 1 < 6000) {
			$appSql = $appSql . "
		alter table MisMenuList AUTO_INCREMENT=6000;
		";
		}
	}

} else {
	$appSql = "
	exec MisUser_Authority_Proc '" . requestVB("full_siteID") . "','speedmis000001';update MisUser set menuRefresh = '' where uniquenum=N'gadmin'
	";
	if (requestVB("full_siteID") != 'speedmis') {
		$appSql = $appSql . "
		if IDENT_CURRENT('MisMenuList')<3000 begin
			DBCC CHECKIDENT('MisMenuList', RESEED, 3000)
		end
		";
	}

}
execSql($appSql);


?>
<script src="../_mis_kendo/js/jquery.min.js"></script>
<script src="../_mis_kendo/js/kendo.all.min.js"></script>
<script id="id_js" name="name_js" src="java_conv.js?kddd7447z3ze4efddw"></script>
<script>

	var setup_success_check = ajax_url_return('setup_success_check.php');
	var isSuccess = "N";
	if (isJsonString(setup_success_check)) {
		setup_success_check = JSON.parse(setup_success_check);
		if (setup_success_check[0].setup_success_check == 'success') {

			isSuccess = "Y";
			setLocalStorage('setup_data', null);

			if (confirm("사이트설정파일에 반영되었고, DB 접속도 원할한 것으로 확인됩니다. PC 에 임시 설정된 정보는 모두 삭제되었습니다. 실사이트에 접속하시겠습니까?")) window.open("/_mis/");


		}
	}
	if (isSuccess == "N") if (confirm("사이트설정파일에 반영되었지만, DB 접속에 실패하였습니다. 실사이트에 접속하시겠습니까?")) window.open("/_mis/");

</script>