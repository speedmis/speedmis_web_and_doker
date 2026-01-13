<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');
header("Content-Type:application/json");

ob_start('ob_gzhandler');

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include '../_mis_uniqueInfo/kakao_aligo_token.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

//sms api : https://smartsms.aligo.in/admin/api/spec.html


$enddate = date('Ymd');

//윈도우스케줄러는 8:30~18:30시까지 1시간마다 동작. 이때 9시 전에는 최근 5일간을 일괄업데이트시킴. 그외에는 오늘것만 업데이트.
if (date("H") * 1 < 9) {
    $startdate = date("Ymd", strtotime("-5 days"));
    $limit_day = '5';
} else {
    $startdate = $enddate;
    $limit_day = '1';
}



//임의테스트할 경우, 아래를 조절할 것-------------------
//$startdate = '20230817';$limit_day = '15';
//---------------------------------------------------



$_apiURL = 'https://apis.aligo.in/list/';
$_hostInfo = parse_url($_apiURL);
$_port = (strtolower($_hostInfo['scheme']) == 'https') ? 443 : 80;
$limit_day_1 = $limit_day * 1 - 1;
$enddate = date("Ymd", strtotime("+$limit_day_1 day", strtotime($startdate)));

$totalPage = 20;
$next_yn = 'Y';
$totalCount = 0;

for ($p = 0; $p < $totalPage; $p++) {



    $sql = '';
    $_variables = array(
        'key' => $kakao_aligo_apikey,
        'user_id' => $kakao_aligo_userid,
        'page' => 1,
        'page_size' => 100,
        'start_date' => "$startdate",
        'limit_day' => $limit_day
    );

    $oCurl = curl_init();
    curl_setopt($oCurl, CURLOPT_PORT, $_port);
    curl_setopt($oCurl, CURLOPT_URL, $_apiURL);
    curl_setopt($oCurl, CURLOPT_POST, 1);
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($oCurl, CURLOPT_POSTFIELDS, http_build_query($_variables));
    curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);

    $ret = json_decode(curl_exec($oCurl), true);

    $next_yn = $ret['next_yn'];


    curl_close($oCurl);
    //print_r($ret);exit;
    $ret = $ret['list'];
    $cnt = count($ret);



    for ($i = 0; $i < $cnt; $i++) {
        //echo "p=$p, i=$i \n";
        //print_r($ret[$i]);

        $mid = $ret[$i]['mid'];
        $type = $ret[$i]['type'];
        $sender = $ret[$i]['sender'];
        $sms_count = $ret[$i]['sms_count'];
        $msg = $ret[$i]['msg'];
        $fail_count = $ret[$i]['fail_count'];
        $reg_date = $ret[$i]['reg_date'];



        if ($type != 'AT') {       //알림톡은 제외시킨다. 알리고에서 논리에 안맞게 개발함.
            ++$totalCount;
            $_apiURL2 = 'https://apis.aligo.in/sms_list/';      //sms 상세조회
            $_hostInfo2 = parse_url($_apiURL2);
            $_variables2 = array(
                'key' => $kakao_aligo_apikey,
                'userid' => $kakao_aligo_userid,
                //'token' => $kakao_aligo_token,
                'page' => 1,
                'page_size' => 1,
                'limit' => 1,
                'mid' => $mid
            );

            $oCurl2 = curl_init();
            curl_setopt($oCurl2, CURLOPT_PORT, $_port);
            curl_setopt($oCurl2, CURLOPT_URL, $_apiURL2);
            curl_setopt($oCurl2, CURLOPT_POST, 1);
            curl_setopt($oCurl2, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($oCurl2, CURLOPT_POSTFIELDS, http_build_query($_variables2));
            curl_setopt($oCurl2, CURLOPT_SSL_VERIFYPEER, FALSE);

            //print_r($ret[$i]);
            $ret2 = json_decode(curl_exec($oCurl2), true);
            //print_r($ret2['list'][0]);
            //exit;
            curl_close($oCurl2);

            if (count($ret2['list']) > 0) {
                $ret2 = $ret2['list'][0];

                $mdid2 = $ret2['mdid'];
                $type2 = $ret2['type'];
                $sender2 = $ret2['sender'];
                $receiver2 = $ret2['receiver'];
                $sms_state2 = $ret2['sms_state'];
                $reg_date2 = $ret2['reg_date'];
                $send_date2 = $ret2['send_date'];
            } else {
                $mdid2 = '';
                $type2 = '';
                $sender2 = '';
                $receiver2 = '';
                $sms_state2 = '';
                $reg_date2 = '';
                $send_date2 = '';        //@NULL
            }



            $sql = $sql . "
            if exists(select * from MisKakaoAligoHistory where mid=$mid) begin
                update MisKakaoAligoHistory set type='$type',msg=N'$msg'
                ,sender='$sender',sms_count='$sms_count',fail_count='$fail_count',regdate='$reg_date'
                ,phone=N'$receiver2',rslt_message=N'$sms_state2'
                where mid=$mid
            end else begin
                insert into MisKakaoAligoHistory (mid,type,msg,sender
                ,sms_count,fail_count,regdate,phone,rslt_message) values (
                    $mid,N'$type',N'$msg','$sender'
                    ,'$sms_count','$fail_count','$reg_date','$receiver2',N'$sms_state2'
                )
            end
            ";
            //if($mid=='630385205') {
            //    echo Right($sql,1000);exit;
            //}
        }
    }

    if ($sql != '') {
        $sql = str_replace("'@NULL'", "NULL", $sql);
        execSql($sql);
        //if(InStr($sql,'630385205')>0) {
        //    echo $sql;
        //}

    }
    if ($next_yn == 'N') {
        $totalPage = 0;
        $p = 9999;
    }

    //echo $totalPage;
    //echo $next_yn;

    //if($totalPage>2) exit;
}
//echo $sql;exit;


echo "$startdate ~ $enddate totalCount=$totalCount Treat";
//print_r($ret);
//echo  json_encode($ret, JSON_UNESCAPED_UNICODE);