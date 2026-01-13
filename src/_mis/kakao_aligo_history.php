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


//kakao api : https://smartsms.aligo.in/shop/kakaoapispec.html

$enddate = date('Ymd');

//윈도우스케줄러는 8:30~18:30시까지 1시간마다 동작. 이때 9시 전에는 최근 3일간을 일괄업데이트시킴. 그외에는 오늘것만 업데이트.
if (date("H") * 1 < 9) {
    $startdate = date("Ymd", strtotime("-3 days"));
} else {
    $startdate = $enddate;
}



//임의테스트할 경우, 아래를 조절할 것-------------------
//$startdate = '20230901';
//$enddate = '20230906';
//---------------------------------------------------




$_apiURL = 'https://kakaoapi.aligo.in/akv10/history/list/';
$_hostInfo = parse_url($_apiURL);
$_port = (strtolower($_hostInfo['scheme']) == 'https') ? 443 : 80;
$_variables = array(
    'apikey' => $kakao_aligo_apikey,
    'userid' => $kakao_aligo_userid,
    'token' => $kakao_aligo_token,
    'page' => 99999,    //이렇게해야 리스트없이 totalPage 만 나옴.
    'limit' => 100,
    'startdate' => "$startdate",
    'enddate' => "$enddate"
);

$oCurl = curl_init();
curl_setopt($oCurl, CURLOPT_PORT, $_port);
curl_setopt($oCurl, CURLOPT_URL, $_apiURL);
curl_setopt($oCurl, CURLOPT_POST, 1);
curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($oCurl, CURLOPT_POSTFIELDS, http_build_query($_variables));
curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);

$ret = json_decode(curl_exec($oCurl), true);

$totalPage = $ret['totalPage'];
$totalCount = $ret['totalCount'];
curl_close($oCurl);


for ($p = 0; $p < $totalPage; $p++) {
    $sql = '';
    $_variables = array(
        'apikey' => $kakao_aligo_apikey,
        'userid' => $kakao_aligo_userid,
        'token' => $kakao_aligo_token,
        'page' => $p + 1,
        'limit' => 100,
        'startdate' => "$startdate",
        'enddate' => "$enddate"
    );

    $oCurl = curl_init();
    curl_setopt($oCurl, CURLOPT_PORT, $_port);
    curl_setopt($oCurl, CURLOPT_URL, $_apiURL);
    curl_setopt($oCurl, CURLOPT_POST, 1);
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($oCurl, CURLOPT_POSTFIELDS, http_build_query($_variables));
    curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);

    $ret = json_decode(curl_exec($oCurl), true);
    curl_close($oCurl);

    $ret = $ret['list'];
    $cnt = count($ret);

    //print_r($ret);


    for ($i = 0; $i < $cnt; $i++) {

        //print_r($ret[$i]);

        $mid = $ret[$i]['mid'];
        $type = $ret[$i]['type'];
        $sender = $ret[$i]['sender'];
        $reserve_state = $ret[$i]['reserve_state'];
        $regdate = $ret[$i]['regdate'];
        $mbody = $ret[$i]['mbody'];




        $_apiURL2 = 'https://kakaoapi.aligo.in/akv10/history/detail/';
        $_hostInfo2 = parse_url($_apiURL2);
        $_variables2 = array(
            'apikey' => $kakao_aligo_apikey,
            'userid' => $kakao_aligo_userid,
            'token' => $kakao_aligo_token,
            'page' => 1,
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
        //print_r($ret2);
        curl_close($oCurl2);

        if (count($ret2['list']) > 0) {
            $ret2 = $ret2['list'][0];
            $phone = $ret2['phone'];
            $status = $ret2['status'];
            $reportdate = $ret2['reportdate'];
            $rslt = $ret2['rslt'];
            $rslt_message = $ret2['rslt_message'];
        } else {
            $phone = '';
            $status = '';
            $reportdate = '@NULL';
            $rslt = '';
            $rslt_message = '';
        }

        $sql = $sql . "
        if exists(select * from MisKakaoAligoHistory where mid=$mid) begin
            update MisKakaoAligoHistory set type='$type', msg='$mbody', reserve_state=N'$reserve_state',regdate='$regdate'
            ,phone='$phone',status='$status',reportdate='$reportdate',rslt='$rslt',rslt_message=N'$rslt_message'
            where mid=$mid
        end else begin
            insert into MisKakaoAligoHistory (mid,type,msg,sender,reserve_state,regdate
            ,phone,status,reportdate,rslt,rslt_message) values (
                $mid,N'$type',N'$mbody','$sender',N'$reserve_state','$regdate'
                ,'$phone','$status','$reportdate','$rslt',N'$rslt_message'
            )
        end
        ";
        //if($mid=='630385205') {
        //    echo Right($sql,1000);exit;
        //}
    }

    if ($sql != '') {
        $sql = str_replace("'@NULL'", "NULL", $sql);
        execSql($sql);
        //if(InStr($sql,'630385205')>0) {
        //    echo $sql;
        //}

    }

}

$sql = "
update hanjin003017 set 최신알림톡결과=k.최신알림톡결과 from hanjin003017 h3017
join (
    select 
    table_m.phone 
    ,(select top 1 case when rslt='0' then '성공' else '실패' end from MisKakaoAligoHistory where phone=table_m.phone and rslt<>'U' and rslt<>'P' order by mid desc) as 최신알림톡결과
    from MisKakaoAligoHistory table_m
    where isnull(table_m.phone,'')<>'' 
) as k on replace(replace(h3017.전화번호,'-',''),' ','')=k.phone
where replace(replace(h3017.전화번호,'-',''),' ','')=k.phone
";
execSql($sql);



echo "$startdate ~ $enddate totalCount=$totalCount Treat";
//print_r($ret);
//echo  json_encode($ret, JSON_UNESCAPED_UNICODE);