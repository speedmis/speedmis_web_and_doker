<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("charset=UTF-8");


ob_start('ob_gzhandler');
//session_start();


include '../_mis/MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_GET['code'])) {
    $short_code = str_replace('/surl/', '', $_GET['code']);
    // 데이터베이스에서 긴 URL 조회
    $sql = "SELECT long_url FROM MisUrls WHERE short_code = '$short_code';";

    $long_url = onlyOnereturnSql($sql);
    if ($long_url != '') {
        header("Location: " . $long_url);
        exit;
    } else {
        echo "존재하지 않는 단축 URL입니다.";
    }
} else {
    echo "잘못된 요청입니다.";
}
?>