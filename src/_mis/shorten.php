<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');


ob_start('ob_gzhandler');
//session_start();


include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';


if (isset($_POST['long_url'])) {

    $long_url = trim($_POST['long_url']);

    // URL 유효성 검사
    if (!filter_var($long_url, FILTER_VALIDATE_URL)) {
        die("유효한 URL을 입력하세요.");
    }
    $sql = "SELECT short_code FROM MisUrls WHERE long_url = '$long_url';";
    $short_code = onlyOnereturnSql($sql);
    if ($short_code != '') {
        // 이미 생성된 단축 URL 반환
        $short_url = $full_site . '/surl/' . $short_code;
        echo $short_url;
        exit;
    }

    // 고유한 단축 코드 생성 (여기서는 md5 해시의 앞 6자리 사용)
    $short_code = substr(md5(uniqid(rand(), true)), 0, 6);

    // (충돌 방지를 위한 간단한 중복검사)
    $sql = "SELECT count(idx) FROM MisUrls WHERE short_code = '$short_code';";

    while (onlyOnereturnSql($sql) > 0) {
        // 충돌 시 새로운 코드 생성
        $short_code = substr(md5(uniqid(rand(), true)), 0, 6);
        $sql = "SELECT count(idx) FROM MisUrls WHERE short_code = '$short_code';";
    }

    // URL과 단축 코드를 데이터베이스에 저장
    accessToken_check();
    $sql = "INSERT INTO MisUrls (long_url, short_code, wdater) VALUES ('$long_url', '$short_code', '$MisSession_UserID');";
    if (execSql($sql)) {
        // 단축 URL 생성 (현재 도메인을 기준으로 생성)
        $short_url = $full_site . '/surl/' . $short_code;
        echo $short_url;
    } else {
        echo "오류 발생: " . $stmt->error;
    }
} else {
    //header("Location: index.php");
    //exit;
}
?>