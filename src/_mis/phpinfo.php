<?php
header('Content-Type: text/html; charset=UTF-8');
error_reporting(E_ALL);
ini_set("display_errors", 1);
include 'MisCommonFunction.php';
ob_start();
//session_start();

$step = 0;
if (getCookie('step')!='') {
	$step = getCookie('step')*1;
}
if(1==2 && $step<2) {
	echo '<center style="margin-top:150px;"><h3><a href="setup.php" target=_top>로그인을 먼저 하세요!</a></h3></center>';
	exit;
}
phpinfo();
?>