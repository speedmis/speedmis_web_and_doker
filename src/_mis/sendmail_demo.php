<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');


error_reporting(E_ALL);
ini_set('display_errors', 1);


include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include '../_mis_uniqueInfo/config_sendmail.php';
include 'MisCommonFunctionPlus.php';

//session_start();

if(getCookie('rnd')=='') {
	setcookie('rnd', rand(1000,9999), 0, '/');
}



/* 
메일 전송 테스트 입니다. 먼저 /_mis_uniqueInfo/config_sendmail.php 에서 적절한 셋팅을 진행하세요.
그후 아래의 $to 에는 원하는 수신메일주소를 넣으세요. 콤마로 구분하면 멀티전송됩니다.
*/

$msg = '전송 대기 중입니다.';
$from = $mail->Username;

$to = requestVB('tomail');
$isAttach = requestVB('isAttach');
if(getCookie('rnd')!='' && getCookie('rnd')==requestVB('rnd') && InStr(requestVB('tomail'),'@')>0 && InStr($from,'@')>0) {
	
	$subject = 'speedmis 를 통한 메일전송 demo 입니다.' . getCookie('rnd');
	$body = '<b>speedmis 를 통한 메일전송 demo 입니다.</b><br><br>감사합니다.';

	if($isAttach=='Y') $attachList = '../uploadFiles/_HomeImages/mainlogo.png;PHPExcleReader/jd.xlsx'; else $attachList = '';
	sendmail($from, $to, $subject, $body, $attachList);

	$msg = iif($isAttach=='Y','첨부파일 2개 포함 ','첨부파일 없이 ') . '전송이 완료되었습니다. - ' . getCookie('rnd');

	setcookie('rnd', rand(1000,9999), 0, '/');
}

if(InStr($from,'@')==0) {
	$msg = '먼저 /_mis_uniqueInfo/config_sendmail.php 에서 발송설정을 하세요!';
}

?>
<html>
<head>
<link rel="stylesheet" href="../_mis_kendo/examples/content/integration/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="../_mis_kendo/styles/kendo.common.min.css" />
  <link href="css/examples.css" rel="stylesheet" />
<script src="../_mis_kendo/js/jquery.min.js"></script>
<script src="../_mis_kendo/js/kendo.all.min.js"></script>
<script id="id_js" name="name_js" src="java_conv.js"></script>
</head>
<body class="k-content k-rpanel" style="padding: 20px;" onload="displayLoadingOff();">
<div id="main" class="">
<form method="post" action="sendmail_demo.php" class="form-group" 
onsubmit="if(event.submitter.id=='btn_attach_Y') document.getElementById('isAttach').value='Y';displayLoading();">
<h4 style="margin: 10px 0;">메일전송 개발을 위한 테스트페이지입니다.</h4>
<hr>
<h4 style="margin: 10px 0;">발신메일주소: <?php echo $from; ?></h4>
<hr>
<h4 class="k-in k-dropdown-wrap" style="border:0; margin-bottom:30px;">아래에 수신메일주소와 <?php echo getCookie('rnd'); ?> 값을 넣은 후 전송하시면 됩니다.</h4>
<input name="tomail" class="k-input k-multiselect-wrap" placeholder="수신메일주소" value="<?php echo $to; ?>" style="display: inline-block;height: 43px;width: 279px;font-size: 23px;padding: 0 9px;">
<input name="rnd" class="k-input k-multiselect-wrap" placeholder="숫자네자리" style="display: inline-block;height: 43px;width: 149px;font-size: 23px;padding: 0 9px;">
<input name="isAttach" id="isAttach" type="hidden" value="">
<input id="btn_attach_N" type="submit" value="첨부없이전송" class="k-button" style="top: -4px;height: 43px;font-size: 23px;"/>
<input id="btn_attach_Y" type="submit" value="첨부2개포함전송" class="k-button" style="top: -4px;height: 43px;font-size: 23px;"/>
</form>

<h3 style="margin-top:30px;"><u><?php echo $msg; ?></u></h3>
</div>

</body>
</html>