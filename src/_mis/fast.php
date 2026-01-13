<?php
header('Content-Type: text/html; charset=UTF-8');
?>
<style>
.select_type {
    text-decoration: underline;
    color: green;
    font-weight: bold;
    font-size: 30;
}
</style>

<?php

function printN() {
    $s = microtime(true);
    for($i=1;$i<=40000000;$i++) {
        $k = $i / pow($i, 4);
    }
    $e = microtime(true);
    $r = $e - $s;
    echo '<h2 style="color: blue;">이 서버의 처리시간 : '. number_format($r, 2) . '초</h2>' ;
    return $r;
}

echo "<h2>웹서버의 성능테스트 : 숫자가 작을수록 성능이 우수</h2>";
$r = printN();
echo "<h2 id='a50'>4초 이내 : 우수</h2>";
echo "<h2 id='a100'>8초 이내 : 사용 가능</h2>";
echo "<h2 id='a101'>8초 초과 : 부적합 또는 테스트용</h2>";
echo "<h2><a href='fast.php' onclick='document.write(\"WAIT ...\");'>새로고침</a></h2>";

?>
<script>
var rr = <?php echo $r; ?>;
if(rr<5) document.getElementById("a50").setAttribute('class', 'select_type');
else if(rr<10) document.getElementById("a100").setAttribute('class', 'select_type');
else document.getElementById("a101").setAttribute('class', 'select_type');
</script>
