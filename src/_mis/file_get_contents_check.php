<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');
error_reporting(E_ALL);
ini_set("display_errors", 1);
?>
<?php include 'MisCommonFunction.php';?>
<?php include '../_mis_uniqueInfo/top_addLogic.php';?>

<h2>웹서버에서 타사이트의 URL 을 가져올 수 있어야 합니다</h2>
<h3>_mis_uniqueInfo/top_addLogic.php 의 file_get_contents_new 체크결과</h3>
        <h4 style="padding: 90px 20px; color: blue;"><?php 
            
            try {
                $cnt = iconv_strlen(file_get_contents_new("https://m.naver.com"))*1;
            } catch(Exception $e) {
                $cnt = 0;
            }
            if($cnt>1000) {
                echo "정상입니다. 조치할 사항이 없습니다.";
            } else {
                try {
                    $cnt = iconv_strlen(file_get_contents("https://m.naver.com"))*1;
                } catch(Exception $e) {
                    $cnt = 0;
                }
                if($cnt>1000) {
                    echo 'top_addLogic.php 를 열고 아래와 같이 file_get_contents 주석만 해제하세요!
                    <br><br>
                    return file_get_contents($url);           //택1: php_openssl 활성화시 가능. <br>
                    //return file_get_contents_bold($url);	    //택2: 택1이 안될때, 윈도우웹 보완책.<br>
                    //return file_get_contents_curl($url);      //택3: 택1이 안될때, 리눅스웹 보완책.<br><br>
                    ';
                } else {
                    try {
                        $cnt = iconv_strlen(file_get_contents_bold("https://m.naver.com"))*1;
                    } catch(Exception $e) {
                        $cnt = 0;
                    }
                    if($cnt>1000) {
                        echo 'top_addLogic.php 를 열고 아래와 같이 file_get_contents_bold 주석만 해제하세요!
                        <br><br>
                        //return file_get_contents($url);           //택1: php_openssl 활성화시 가능. <br>
                        return file_get_contents_bold($url);	    //택2: 택1이 안될때, 윈도우웹 보완책.<br>
                        //return file_get_contents_curl($url);      //택3: 택1이 안될때, 리눅스웹 보완책.<br><br>
                        ';
                        } else {
                        try {
                            $cnt = iconv_strlen(file_get_contents_curl("https://m.naver.com"))*1;
                        } catch(Exception $e) {
                            $cnt = 0;
                        }
                        if($cnt>1000) {
                            echo 'top_addLogic.php 를 열고 아래와 같이 file_get_contents_curl 주석만 해제하세요!
                            <br><br>
                            //return file_get_contents($url);           //택1: php_openssl 활성화시 가능. <br>
                            //return file_get_contents_bold($url);	    //택2: 택1이 안될때, 윈도우웹 보완책.<br>
                            return file_get_contents_curl($url);      //택3: 택1이 안될때, 리눅스웹 보완책.<br><br>
                            ';
                                } else {
                            echo "서버에서 외부URL 접속에 알수없는 장애가 있습니다. 방화벽을 체크하세요.";
                        }
                    }
                }
            }
        
        ?>
        | <a href='file_get_contents_check.php'>새로고침</a>
        </h4>

<h3>※ 사용목적 : 온라인업데이트 / 텔레그램연동</h3>

<?php


?>