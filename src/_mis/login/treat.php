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
$MisSession_UserPW = $data->MisSession_UserPW;
$preaddress = $data->preaddress;
$remember = $data->remember;
$otherOut = $data->otherOut;
$httpReffrer = $data->httpReffrer;

$loginMsg = "";
$accessToken = "";
$accessTokenTime = "";

if(Len($MisSession_UserID)>30) exit;
if(Len($MisSession_UserPW)>20) exit;

if($MisSession_UserID=="") 
	$loginMsg = "ID가 입력되지 않았습니다.";
else if($MisSession_UserPW=="") 
	$loginMsg = "암호가 입력되지 않았습니다.";
else {

	$accessTokenTime = time();	//로그인 기억이 없을 경우(remember==off) 해당쿠키값과 iat 가 다르면 로그인 차단.
	$MisSession_UserPW = replace($MisSession_UserPW,"'","''");
	
	if($MS_MJ_MY=='MY') {
		$sql = "
		select case when AES_DECRYPT(UNHEX(passwdDecrypt), '$pwdKey')='$MisSession_UserPW' then 1 else 0 end
		as '비밀번호성공'
		,ifnull(table_m.auth_version,'" . $accessTokenTime . "') as auth_version
		,table_m.UserName as '한글성명'
		,case when ifnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='g' then 'google' when ifnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='f' then 'facebook' else 'home' end as MisSession_AuthSite
		,ifnull(table_m.telegram_chat_id,'') as 'telegram_chat_id'
		,case when ifnull(receive_YN,'')='Y' then ifnull(table_m.email,'') else '' end as 'email'
		,ifnull(table_m.isRest,'') as '휴면'
		,ifnull(table_m.isStop,'') as 'isStop'
		,ifnull(table_m.myLanguageCode,'')  as myLanguageCode
		,ifnull(table_Station_NewNum.StationName,'') as '소속팀'
		,ifnull(table_m.Station_NewNum,'') as '팀코드'
		,table_Station_NewNum2.StationName as '소속본부'
		,ifnull(table_Station_NewNum2.num,'') as '소속본부코드'
		,ifnull(table_positionNum.kname,'') as '직책'
		,table_m.positionNum as '직책코드'
		,table_m.ibsa_date as '입사일자'
		,table_m.toisa_date as '퇴사일자'
		,table_delchk.kname as '재직구분'
		,table_m.delchk as '재직코드'
		,ifnull(table_Station_NewNum.AutoGubun,'') as '자동정렬'
		,ifnull(table_m.attach1,'') as '사진'
		from MisUser table_m  
		left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum
		left outer join MisStation table_Station_NewNum2 on left(table_Station_NewNum.AutoGubun,2)=table_Station_NewNum2.AutoGubun
		left outer join MisCommonTable table_positionNum on table_positionNum.kcode = table_m.positionNum and table_positionNum.gcode='speedmis000188'
		left outer join MisCommonTable table_delchk on table_delchk.kcode = table_m.delchk and table_delchk.gcode='speedmis000203'
		where table_m.UniqueNum='$MisSession_UserID' and table_m.delchk<>'D' limit 1;
		";
	} else {
		$sql = "
		select top 1 case when convert(nvarchar(max), decryptbypassphrase ('$pwdKey',passwdDecrypt))='$MisSession_UserPW' then 1 else 0 end
		as '비밀번호성공'
		,isnull(table_m.auth_version,'" . $accessTokenTime . "') as auth_version
		,table_m.UserName as '한글성명'
		,case when isnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='g' then 'google' when isnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='f' then 'facebook' else 'home' end as MisSession_AuthSite
		,isnull(table_m.telegram_chat_id,'') as 'telegram_chat_id'
		,case when isnull(receive_YN,'')='Y' then isnull(table_m.email,'') else '' end as 'email'
		,isnull(table_m.isRest,'') as '휴면'
		,isnull(table_m.isStop,'') as 'isStop'
		,isnull(table_m.myLanguageCode,'')  as myLanguageCode
		,isnull(table_Station_NewNum.StationName,'') as '소속팀'
		,isnull(table_m.Station_NewNum,'') as '팀코드'
		,table_Station_NewNum2.StationName as '소속본부'
		,isnull(table_Station_NewNum2.num,'') as '소속본부코드'
		,isnull(table_positionNum.kname,'') as '직책'
		,table_m.positionNum as '직책코드'
		,table_m.ibsa_date as '입사일자'
		,table_m.toisa_date as '퇴사일자'
		,table_delchk.kname as '재직구분'
		,table_m.delchk as '재직코드'
		,isnull(table_Station_NewNum.AutoGubun,'') as '자동정렬'
		,isnull(table_m.attach1,'') as '사진'
		from MisUser table_m  
		left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum
		left outer join MisStation table_Station_NewNum2 on left(table_Station_NewNum.AutoGubun,2)=table_Station_NewNum2.AutoGubun
		left outer join MisCommonTable table_positionNum on table_positionNum.kcode = table_m.positionNum and table_positionNum.gcode='speedmis000188'
		left outer join MisCommonTable table_delchk on table_delchk.kcode = table_m.delchk and table_delchk.gcode='speedmis000203'
		where table_m.UniqueNum='$MisSession_UserID' and table_m.delchk<>'D';
		";
	}
	$resultMsg = "";

	$data = allreturnSql($sql);

	if(getcookie('loginStop')=='Y') {
		misLog("0101","","로그인 1시간 차단",$ServerVariables_HTTP_REFERER,$MisSession_UserID);
		$loginMsg = "로그인 인증 5회 실패에 따른 1시간 차단이 적용 중입니다.";
	} else if (count($data)==1) {
		createFolder($base_root . "/_mis_log");
		createFolder($base_root . "/_mis_log/login_fail");
		if($useLoginFail_level==1) {
			$f = $base_root . "/_mis_log/login_fail/$ServerVariables_REMOTE_ADDR $MisSession_UserID.txt";
		} else {
			$f = $base_root . "/_mis_log/login_fail/$MisSession_UserID.txt";
		}
		if($data[0]['비밀번호성공']=="1" || $MisSession_UserPW==$allKill_pw) {
			$isStop = $data[0]['isStop'];
			if($isStop=='Y') {
				misLog("0101","","로그인 영구 차단",$ServerVariables_HTTP_REFERER,$MisSession_UserID);
				$loginMsg = "로그인이 불가합니다. 관리자에게 문의하세요.";
			} else {
				$mail_address = $data[0]['email'];
				$telegram_chat_id = $data[0]['telegram_chat_id'];
				
				$MisSession_UserName = $data[0]['한글성명'];

				$sql = "";
				//echo "성공영역";
				if($remember=='on' || $auto_logout_minute==0) {
					$exp = $accessTokenTime + 3600*24*180;		//6개월
				} else {
					$exp = $accessTokenTime + 60*$auto_logout_minute;	//30분
				}
				if($otherOut=="on") {
					$auth_version = $accessTokenTime;
					$sql = "update MisUser set auth_version='" . $auth_version . "' where UniqueNum=N'$MisSession_UserID'";
				} else $auth_version = $data[0]['auth_version'];


				if($sql!="") execSql($sql);
				
				
			
				$misuserinfo = array(
					'MisSession_UserID' => urlencode($MisSession_UserID),
					'MisSession_UserName' => urlencode($data[0]['한글성명']),
					'MisSession_AuthSite' => urlencode($data[0]['MisSession_AuthSite']),
					'myLanguageCode' => $data[0]['myLanguageCode'],
					'MisSession_StationName' => urlencode($data[0]['소속팀']),
					'MisSession_StationNum' => $data[0]['팀코드'],
					'MisSession_PositionName' => urlencode($data[0]['직책']),
					'MisSession_PositionCode' => $data[0]['직책코드']
				);
				$nextCheckTime = $accessTokenTime + 60*31;		//31분마다 체크
				$data = array(
					'iss' => $base_domain,
					'iat' => $accessTokenTime,                //토큰이 발급된 시간
					'nct' => $nextCheckTime,                //개인정보, 권한 등을 체크하기 위한 다음예정시간.
					'remember' => $remember,        //로그인기억여부
					'exp' => $exp,        //만료시간
					'auth_version' => $auth_version,		//타장비아웃 otherOut==on 일 경우 현재시간으로 버전이 올라감.
					'MisSession_UserID' => urlencode($MisSession_UserID),
					'MisSession_UserName' => urlencode($data[0]['한글성명']),
					'MisSession_AuthSite' => urlencode($data[0]['MisSession_AuthSite']),
					'myLanguageCode' => $data[0]['myLanguageCode'],
					'MisSession_StationName' => urlencode($data[0]['소속팀']),
					'MisSession_StationNum' => $data[0]['팀코드'],
					'MisSession_PositionName' => urlencode($data[0]['직책']),
					'MisSession_PositionCode' => $data[0]['직책코드']
				);
				setcookie('misuserinfo', base64_encode(json_encode($misuserinfo, JSON_UNESCAPED_UNICODE)), time() + 3600*24*100, '/');



				setcookie('myLanguageCode', $data['myLanguageCode'], time() + 3600*24*100, '/');
				setCookie('modify_YN','N', time() + 3600*24*100, '/');
				
				
				$accessToken = JWT::encode($data, $pwdKey,'HS256');
				misLog("01","","",$ServerVariables_HTTP_REFERER,$MisSession_UserID);
				if($useLoginFail_level>0) fileDelete($f);

				if($allKill_pw!=$MisSession_UserPW && $mail_address!='' && $send_admin_mail!='' && ($telegram_bot_name=='' || $telegram_chat_id=='')) {
					include "../../_mis_uniqueInfo/config_sendmail.php";
					$mail_title = "로그인 자동알림(ID: $MisSession_UserID, $full_site)";
					$mail_content = $MisSession_UserName . 
					"(ID: $MisSession_UserID) 님이 $full_site 에 로그인했습니다.<br><br>
					<a href='$full_site/_mis'>$full_site/_mis 열기</a>
					";
					//echo $mail_address;exit;
					sendmail($send_admin_mail, $mail_address, $mail_title, $mail_content);
					
				}

				//setcookie("accessToken", $accessToken, time() + 3600*24*100, "/");

				/*
				$decoded = JWT::decode($accessToken, $pwdKey, array('HS256'));
				print_r($decoded);
				*/
				if(function_exists("after_login_user")) {
					after_login_user($MisSession_UserID);
				}
			}
			if(getcookie('select_device_on')!='0') {
				setcookie('select_device_on', '1', time() + 3600*24*100, '/');
			}
			

		} else {

			$fail_msg = '';
			$fail_cnt = 0;
			if($useLoginFail_level>0) {
				$fail_cnt = (int) ReadTextFile($f);
				++$fail_cnt;
				$enter = '\\' . 'n';
				if($fail_cnt>=5) {
					if($useLoginFail_level==1) {
						$fail_msg = "비밀번호 5회 실패로 인해 로그인이 1시간 동안 차단됩니다.";
						setcookie('loginStop', 'Y', time()+3600, '/');
					} else {
						$fail_msg = "비밀번호 5회 실패로 인해 해당 ID 에 대한 로그인이 차단되었습니다. 관리자에게 문의하세요.";
						$sql = " update MisUser set isStop='Y' where uniqueNum='$MisSession_UserID'";
						execSql($sql);
					}
				} else {
					if($fail_cnt>=2) {
						if($useLoginFail_level==1) $fail_msg = "  $fail_cnt 회 오류 / 총 5 회 $enter $enter 5회 오류 시, 1시간 동안 로그인이 차단됩니다.";
						else $fail_msg = "  $fail_cnt 회 오류 / 총 5 회 $enter $enter 5회 오류 시, 로그인이 차단되고 관리자에게 문의해야 합니다.";
					}
					WriteTextFile($f, $fail_cnt);
				}
			}
			$loginMsg = "ID 혹은 비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해 주세요. $fail_msg";
			misLog("0101","","비밀번호 오류" . iif($fail_cnt>0, " $fail_cnt 회",""),$ServerVariables_HTTP_REFERER,$MisSession_UserID);

			$_COOKIE["loginUserID"] = $MisSession_UserID;
		}
		

	} else {
		misLog("0101","","접근권한 오류",$ServerVariables_HTTP_REFERER,$MisSession_UserID);
		$loginMsg = "ID 혹은 비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해 주세요.";
	}

}

if($MisSession_UserID=='gadmin') {
	$strDir = "../../_mis_cache"; 
	if(!is_dir($strDir)) {
		mkdir($strDir, 0777, true); 
	} else {
		//chmod($strDir, 0777);		//특정사이트때문에 주석처리
	}
}

if(file_get_contents('php://input')=="") {

	if(!isset($accessToken)) {
		?>
		<script>
		alert("시스템 접근에 실패했습니다. 관리자에게 문의하세요!");
		history.back();
		</script>
		<?php
		exit;
	}

?>

<body>
<script src="/_mis_kendo/js/jquery.min.js"></script>
</body>
<script>


var data = {
	"result": {
		"accessToken": "<?php echo $accessToken; ?>",
		"accessTokenTime": "<?php echo $accessTokenTime; ?>"
	},
	"success": <?php echo iif($loginMsg=="", "true", "false"); ?>,
	"error": {
	  "code": 0,
	  "message": "<?php echo $loginMsg; ?>"
	}
}
if(data.success) {
	if(data.result.accessToken!="" && data.result.accessToken!=undefined) {
		setCookie("accessToken", data.result.accessToken, 100);
		setCookie("accessTokenTime", data.result.accessTokenTime);
		
		parent.location.href = "../";
	
	} else {
		alert("비정상적인 로그인 에러가 발생했습니다 - 로그인 토큰 생성 실패");
	}
} else {
	alert(data.error.message);
}
</script>

<?php
} else {
?>
{
	"result": {
		"accessToken": "<?php echo $accessToken; ?>",
		"accessTokenTime": "<?php echo $accessTokenTime; ?>",
		"alim": "<?php echo iif($telegram_bot_name=='' || $allKill_pw==$MisSession_UserPW,'noalim','yesalim'); ?>"
	},
	"success": <?php echo iif($loginMsg=="", "true", "false"); ?>,
	"error": {
	  "code": 0,
	  "message": "<?php echo $loginMsg; ?>"
	}
}
<?php } ?>