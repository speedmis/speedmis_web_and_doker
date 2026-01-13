<?php
if(file_get_contents('php://input')=="") {
	header('Content-Type: text/html; charset=UTF-8');
	echo '<script id="id_js" name="name_js" type="text/javascript" src="/_mis/java_conv.js?a=a8"></script>';
} else {
	header("Content-Type:application/json; charset=UTF-8");
}	

error_reporting(E_ALL);
ini_set("display_errors", 1);


require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use Firebase\JWT\JWT;

include "../MisCommonFunction.php";

include "../../_mis_uniqueInfo/config_siteinfo.php";


$pre = "";

if(isset($request_body)) {
	$data = $request_body;
} else {
	$request_body = file_get_contents('php://input');
	$data = json_decode($request_body);
}
//print_r($request_body);


$MisSession_UserID = $data->MisSession_UserID;
$MisSession_UserID = strtolower($MisSession_UserID);
$MisSession_UserName = $data->MisSession_UserName;
$MisSession_UserPW = $data->MisSession_UserPW;
$MisSession_UserPW2 = $data->MisSession_UserPW2;
$info_encode = $data->info_encode;
$httpReffrer = $data->httpReffrer;

$loginMsg = "";


if(Len($MisSession_UserID)>30) exit;
if(Len($MisSession_UserPW)>20) exit;



if($MisSession_UserID=="") 
	$loginMsg = "ID가 입력되지 않았습니다.";
else if($MisSession_UserPW=="") 
	$loginMsg = "새비밀번호가 입력되지 않았습니다.";
else if($MisSession_UserPW2=="") 
	$loginMsg = "새비밀번호확인이 입력되지 않았습니다.";
else if($MisSession_UserPW!=$MisSession_UserPW2) 
	$loginMsg = "새비밀번호가 서로 다릅니다.";
else {
	$info = misDecrypt($info_encode,$DbPW,$DbPW);
	$info_array = splitVB($info,';@;');
	if(count($info_array)!=3) exit;
	$userid = strtolower($info_array[0]);
	$username = $info_array[1];
	$expireday = $info_array[2];
	//echo $userid . ';@;' . $username . ';@;' . $expireday;

	if($expireday < date('Y-m-d')) {
		misLog("0101","","새비밀번호창에서 일자만료",$ServerVariables_HTTP_REFERER,$userid);
		$loginMsg = "만료된 링크입니다.";
	} else if($userid!=$MisSession_UserID || $username!=$MisSession_UserName) {
		misLog("0101","","새비밀번호창에서 정보불일치; 입력:$userid/$username; 실제정보:$MisSession_UserID;$MisSession_UserName",$ServerVariables_HTTP_REFERER,$MisSession_UserID);
		$loginMsg = "ID 혹은 성명정보가 일치하지 않습니다. 입력한 내용을 다시 확인해 주세요.";
	} else if($MS_MJ_MY=='MY') {
		$sql = "
		update MisUser set PasswdDecrypt=HEX(AES_ENCRYPT('$pwdKey', N'$MisSession_UserPW')) where uniquenum='$userid';
		";
		execSql($sql);
	} else {
		$sql = "
		update MisUser set PasswdDecrypt=ENCRYPTBYPASSPHRASE('$pwdKey', N'$MisSession_UserPW'),isStop='' where uniquenum='$userid';
		";
		execSql($sql);
	}
	$resultMsg = "";
	setcookie('loginStop', '', time() + 3600*24*100, '/');
	misLog("01","","새비밀번호창에서 정상변경완료",$ServerVariables_HTTP_REFERER,$MisSession_UserID);
}
?>
{
	"success": <?php echo iif($loginMsg=="", "true", "false"); ?>,
	"error": {
	  "code": 0,
	  "message": "<?php echo $loginMsg; ?>"
	}
}
