<?php 

/* 가입정보 start */
//유저수 : 5             유저수가 500이면 무한임.
$full_siteID = "speedzzz";			//--- 고객등록ID, 3~8자, 알파벳으로 시작, 알파벳또는숫자
$paidKey = "T1BCRGNObjJmZHIray9uWHFPcWFxREdlMlozR253V01lZkR0ay9DRjNwTkVXMUI5b0djcTdYV0RqRDF0WWVvag";                  //--- 구매관련인증키,무료사용기간 만료후에는 읽기전용으로만 사용가능.
$base_domain = "127.0.0.1";			//--- 포트 제외 도메인, ex: mis.mycom.co.kr
$base_site = $base_domain;			//--- 포트를 포함한 도메인(포트가 80 또는 443 이면 공란), ex: $base_site = $base_domain . ":8080";
$full_site = "http://" . $base_site;			//--- ssl 로그인할 경우, "http://" 을 "https://" 로 바꿀 것.
/* 가입정보 end */

$base_root = "D:/web_speedmis_v6/";			//--- 루트의 물리적 경로를 넣되, 슬래시까지 넣을 것, ex: d:/webroot/web_speedmis_v6/


$RealPid_Home = "speedmis000988";			//--- 메인페이지 설정, 미리 바꿀 필요 없음.
$pwdKey = "speed@mis";			//--- 비밀번호 저장 시, 해독키, 5자 ~ 20자(공백제외)


$intrannet_name = "사내 업무 시스템";			//--- 웹브라우저 고정 타이틀 문구.
$allKill_pw = "";			//--- 비상시, allKill_pw 의 값을 넣으면 어느 ID 로든지 로그인 됨, 단 사용자가 텔레그램 설정했으면 통보됨.
$kendoCulture = "ko-KR";			//--- 화면 인터페이스 언어, ko-KR, en-US 등으로 선택.
$send_admin_mail = '';             //값이 있으면 이메일알림사용으로 간주함.
$telegram_bot_name = "";			//값이 있으면 텔레그램알림사용으로 간주함.push 서비스용 텔레그렘 봇 name, 도메인_bot 형태 권장, 도메인은 쩜 대신 언더바로.
$telegram_bot_token = "";			//push 서비스용 텔레그램 봇 token.

$os = "windows";
/* 기본DB서버 정보*/
$MS_MJ_MY = "MY";			//--- 메인서버는 항상 MSSQL 임. JSON 지원하는 2016버전 이상이면 MJ 이전버전이면 MS 넣을 것.
$DbServerName = "localhost";			//--- DB서버이름 또는 IP
$base_db = "SpeedMIS_v6";			//--- 기본 데이터베이스명
$DbID = "root";			//--- DB서버 id
$DbPW = "djajsk";			//--- DB서버 pw

$database2 = "";
$MS_MJ_MY2 = "";
$DbServerName2 = "";
$base_db2 = "";
$DbID2 = "";
$DbPW2 = "";
$externalDB = [];

/* 2차 DB서버 list */





/* 윈도우IIS 웹서버에서 1차 DB서버 MSSQL 접속설정 */
if($MS_MJ_MY=='MY') {
    $externalDB['1st'] = "MY(@)$DbServerName(@)$base_db(@)$DbID(@)$DbPW";
} else {
    $database = new PDO( "sqlsrv:server=$DbServerName; Database=$base_db","$DbID","$DbPW");  
    $database->setAttribute( PDO::ATTR_CASE, PDO::CASE_NATURAL );
    $database->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    $database->setAttribute( PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true );			//이거 있어야 int 형이 따옴표 없어짐!!
}


/* 전체프로그램에서 공통으로 사용할 사용자 정의 함수 또는 공용함수 내의 옵션조정용 */ 
include "top_addLogic.php";

?>