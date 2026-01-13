<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

$gzip_YN = 'N';

$MisSession_UserID = '';

accessToken_check();

if($MS_MJ_MY=='MY') {
    $isnull = 'ifnull';
} else {
    $isnull = 'isnull';
}

// JSON 데이터를 받기 위해 php://input 사용
$input = file_get_contents('php://input');

// 받은 JSON 데이터를 PHP 배열로 디코딩
$data = json_decode($input, true);

// 받은 데이터 출력 (디버깅용)
if (!$data) {
    echo '{ "result": "fail", "message": "No valid JSON data received." }';
    exit;
}


// 예시로 받은 데이터 중 endpoint를 사용하여 푸시 메시지 보내기
if (isset($data['endpoint']) && isset($data['p256dh']) && isset($data['auth'])) {
    $endpoint = $data['endpoint'];
    $p256dh = $data['p256dh'];
    $auth = $data['auth'];
} else {
    echo '{ "result": "fail", "message": "Missing required data." }';
    exit;
}

if($MisSession_UserID=='') {
    echo '{ "result": "fail", "message": "not login" }';
    exit;
}
if(isPhoneMobile()=='Y') {
    $device_type = 'mobile';
} else if(isMobile()=='Y') {
    $device_type = 'tablet';
} else {
    $device_type = 'pc';
}



$sql = "
-- 먼저, subscription이 존재하는지 확인합니다.
-- 예를 들어, `endpoint` 컬럼을 기준으로 확인한다고 가정합니다.
INSERT INTO MisPush_subscriptions (user_id, device_type, endpoint, p256dh, auth)
SELECT '$MisSession_UserID', '$device_type', '$endpoint', '$p256dh', '$auth'
WHERE NOT EXISTS (
    SELECT 1 FROM MisPush_subscriptions WHERE endpoint = '$endpoint'
);
update MisUser set push_YN='Y' where uniqueNum='$MisSession_UserID';
";

execSql($sql);
echo '{ "result": "success", "message": "tried save" }';

?>