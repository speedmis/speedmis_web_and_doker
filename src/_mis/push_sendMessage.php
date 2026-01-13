<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php';?>
<?php include '../_mis_uniqueInfo/config_sendmail.php';?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

require __DIR__ . '/../vendor/autoload.php';

use Minishlink\WebPush\WebPush;
use Minishlink\WebPush\Subscription;


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
if (isset($data['userid']) && isset($data['title']) && isset($data['body'])) {
    $userid = $data['userid'];
    $title = $data['title'];
    $body = $data['body'];
    $url = isset($data['url']) ? $data['url'] : '';
} else {
    echo '{ "result": "fail", "message": "Missing required data." }';
    exit;
}
if($url=='undefined') {
    $url = '';
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

$subscriptions = allreturnSql("SELECT * FROM MisPush_subscriptions WHERE user_id = '$userid'");

// VAPID 키 설정  
//print_r(Minishlink\WebPush\VAPID::createVapidKeys());
$auth = [
    'VAPID' => [
        'subject' => 'mailto:speedmis@speedmis.com', // 연락용 이메일
        'publicKey' => 'BLHNMIlgjlixE-Zqc1YcqLxplAtxJMeilyhrhzXP_aqdMxd93yY7fa_r3aNF6gLqwlk70gntuX3ZWFQMm1D7Ky8',
        'privateKey' => 'cNUlA60bAbL2cmC6hcJd-W_5BlUTcNo-v9wEG6jJFI4',
    ],
];
$webPush = new WebPush($auth);
// 메시지 데이터 (payload)

$payload = json_encode([
    'title' => $title,
    'body' => $body,
    'icon' => '/path/to/icon.png',
    'url' => $url
], JSON_UNESCAPED_UNICODE);
$url = $url ?? '';
// 구독 정보로 Push 전송
foreach ($subscriptions as $sub) {
    $subscription = Subscription::create([
        'endpoint' => $sub['endpoint'],
        'keys' => [
            'p256dh' => $sub['p256dh'],
            'auth' => $sub['auth']
        ],
    ]);
    
    $webPush->queueNotification($subscription, $payload);
}

$deviceNums = 0;
// 전송 실행 및 결과 JSON으로 묶기
foreach ($webPush->flush() as $report) {
    $endpoint = $report->getRequest()->getUri()->__toString();
    $success = $report->isSuccess();

    if ($success) {
        $deviceNums++;
    }

    $results[] = [
        'endpoint' => $endpoint,
        'success' => $report->isSuccess(),
        'reason' => $report->isSuccess() ? null : $report->getReason(),
    ];
}



if($MS_MJ_MY=='MY') {
    $log_sql = " 
    insert into MisReadList (push_title, push_body, push_url, push_deviceNums, userid, wdater, 자격) 
    select '$title', '$body', '$url', '$deviceNums', '$userid', '$MisSession_UserID', '수신메세지';
    ";
} else {
    $log_sql = " 
    insert into MisReadList (push_title, push_body, push_url, push_deviceNums, userid, wdater, 자격) 
    select '$title', '$body', '$url', '$deviceNums', '$userid', '$MisSession_UserID', '수신메세지';
    ";
}
//echo $log_sql;
execSql($log_sql);

// JSON 출력
header('Content-Type: application/json; charset=utf-8');
echo json_encode([
    'result' => 'done',
    'push_results' => $results
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);





?>