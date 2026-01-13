<?php
    

use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use PHPMailer\PHPMailer\POP3;

$mail = new PHPMailer(true);
//$mail->SMTPDebug = SMTP::DEBUG_SERVER;        //메일전송 테스트할 때만 활성화할 것. 그외에는 주석처리
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth   = true;                                   // Enable SMTP authentication
$mail->SMTPSecure = "ssl";  // SSL을 사용함
$mail->Username   = "메일주소@gmail.com';                     // SMTP username
$mail->Password   = '비번을넣으세요';                               // SMTP password
$mail->Port       = 465;                                    // TCP port to connect to
$mail->CharSet = 'utf-8'; 
$mail->Encoding = 'base64';



?>