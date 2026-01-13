<?php

$list_numbering = 'Y';	//목록에서 순번(No.) 를 표시하려면 Y. 아니면 주석처리.



/* 전체프로그램에서 공통으로 사용할 사용자 정의 함수 또는 공용함수 내의 옵션조정용 */
function list_json_stop_YN()
{
    global $stop_YN, $RealPid;

    //외부접속이나, 로그인정보가 없어도 접속허용=$stop_YN = "N";
    if ($RealPid == "speedmis001040" || $RealPid == "speedmis001043")
        $stop_YN = "N";
}


function file_get_contents_new($url)
{
    try {
        //return file_get_contents($url);           //택1: php_openssl 활성화시 가능. 
        //return file_get_contents_bold($url);	    //택2: 택1이 안될때, 윈도우웹 보완책.
        return file_get_contents_curl($url);      //택3: 택1이 안될때, 리눅스웹 보완책.
    } catch (Exception $e) {
        //echo 'Message: ' .$e->getMessage();
        return "";
    }
}

?>