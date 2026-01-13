<?php
// counter.txt 파일에 숫자 저장 (없으면 0부터 시작)

$cate = isset($_GET['cate']) ? $_GET['cate'] : '';

$counterFile = "../_mis_uniqueInfo/_counter_$cate.txt";

// 파일에서 현재 숫자 읽기
$current = (int)file_get_contents($counterFile);

echo $current;

?>
