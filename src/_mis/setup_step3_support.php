<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');
ob_start();
//session_start();

?>
<?php include 'MisCommonFunction.php'; ?>
<?php
$send_admin_mail = '';
include '../_mis_uniqueInfo/config_siteinfo.php';
?>
<?php include 'hangeul-utils-master/hangeul_romaja.php'; ?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

$gzip_YN = 'N';

$step = 0;
if (getCookie('step') != '') {
	$step = getCookie('step') * 1;
}
if ($step < 2) {
	echo '로그인을 먼저 하세요!';
	exit;
}

?>
<!DOCTYPE html>
<html lang="ko">

<head>
	<title>인증서 및 등록정보 확인 & 개통을 위한 설정 페이지</title>
	<script src="../_mis_kendo/js/jquery.min.js"></script>
	<script src="../_mis_kendo/js/kendo.all.min.js"></script>
	<script id="id_js" name="name_js" src="java_conv.js?kddd7447z3ze4efddw"></script>
	<script>

		function config_into_pc() {

			var step3_title = "웹서버의 설정파일이 존재하여 자동으로 가져온 데이타입니다.";
			parent.$('div[data-container-for="step3_title"] > div').text(step3_title);

			parent.$('#RealPid_Home')[0].value = "<?php echo $RealPid_Home; ?>";
			parent.$('#pwdKey')[0].value = "<?php echo $pwdKey; ?>";

			if (parent.$('#full_siteID')[0].value == "") parent.$('#full_siteID')[0].value = "<?php echo $full_siteID; ?>";
			parent.$('#intrannet_name')[0].value = "<?php echo str_replace('"', '\\"', str_replace("\\", "\\\\", $intrannet_name)); ?>";
			parent.$('#allKill_pw')[0].value = "<?php echo str_replace('"', '\\"', $allKill_pw); ?>";
			parent.$('#kendoCulture')[0].value = "<?php echo $kendoCulture; ?>";
			parent.$('#send_admin_mail')[0].value = "<?php echo $send_admin_mail; ?>";
			parent.$('#telegram_bot_name')[0].value = "<?php echo $telegram_bot_name; ?>";
			parent.$('#telegram_bot_token')[0].value = "<?php echo $telegram_bot_token; ?>";
			parent.$('#MS_MJ_MY')[0].value = "<?php echo $MS_MJ_MY; ?>";
			parent.$('#DbServerName')[0].value = "<?php echo str_replace("\\", "\\\\", $DbServerName); ?>";
			parent.$('#base_db')[0].value = "<?php echo $base_db; ?>";
			parent.$('#DbID')[0].value = "<?php echo $DbID; ?>";
			parent.$('#DbPW')[0].value = "<?php echo $DbPW; ?>";
			parent.$('input#MS_MJ_MY').data('kendoDropDownList').value(parent.$('#MS_MJ_MY')[0].value);


			<?php
			foreach ($externalDB as $key => $value) {
				if ($key != '1st' || $MS_MJ_MY != 'MY') {
					?>
					if (parent.$('input.externalDB#<?php echo $key; ?>')[0] == undefined) {
						parent.$('body').append('<input id="<?php echo $key; ?>" class="externalDB" type="hidden"/>');
					}
					parent.$('input#<?php echo $key; ?>').val('<?php echo $value; ?>');
					<?php
				}
			}
			?>
			parent.fun_externalDB();

	/*
	parent.$('#MS_MJ_MY2')[0].value = "<?php echo $MS_MJ_MY2; ?>";
			parent.$('#DbServerName2')[0].value = "<?php echo $DbServerName2; ?>";
			parent.$('#base_db2')[0].value = "<?php echo $base_db2; ?>";
			parent.$('#DbID2')[0].value = "<?php echo $DbID2; ?>";
			parent.$('#DbPW2')[0].value = "<?php echo $DbPW2; ?>";

			parent.$('input#MS_MJ_MY2').data('kendoDropDownList').value(parent.$('#MS_MJ_MY2')[0].value);
			parent.$('input#MS_MJ_MY2').change();
	*/

			var r = JSON.parse(ajax_url_return('setup_success_check.php'))[0];
			if (r) {
				if (r.setup_success_check == 'success') var msg = " DB 접속도 원할합니다.";
				else var msg = " DB 접속에는 실패하였습니다.";
			} else var msg = " DB 접속에는 실패하였습니다.";
			parent.$('div[data-container-for="step3_title"] > div').text(step3_title + msg);
		}

		config_into_pc();

	</script>
</head>

</html>