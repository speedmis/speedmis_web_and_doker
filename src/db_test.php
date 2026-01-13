<?php
$host = '211.45.163.88';
$user = 'root';
$pass = 'djajsk!!00';
$db   = 'miraclecount';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("❌ MySQL 연결 실패: " . $conn->connect_error);
}
echo "✅ MySQL (SpeedMIS_V7) 연결 성공!";
?>
