<?php
// counter.txt 파일에 숫자 저장 (없으면 0부터 시작)

$cate = isset($_GET['cate']) ? $_GET['cate'] : '';

$counterFile = "../_mis_uniqueInfo/_counter_$cate.txt";

if (!file_exists($counterFile)) {
    file_put_contents($counterFile, '0');
}

// 파일에서 현재 숫자 읽기
$current = (int)file_get_contents($counterFile);

// 1 증가
$current++;

// 다시 파일에 저장
file_put_contents($counterFile, (string)$current);

$redirectUrl = "count_result.php?cate=" . $cate;

// 리다이렉트 시키기
header("Location: $redirectUrl");
exit();

?>
