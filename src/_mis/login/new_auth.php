<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');
include '../MisCommonFunction.php';
include '../../_mis_uniqueInfo/config_siteinfo.php';

require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use Firebase\JWT\JWT;

error_reporting(E_ALL);
ini_set("display_errors", 1);
session_start();
$MisSession_UserID = '';
accessToken_check();

if($MisSession_UserID!='') {
    echo "
    
<script>
alert('로그아웃을 먼저 진행하세요!');
location.href = './';
</script>
    ";
    //exit;
}

if($MS_MJ_MY=='MY') $addDir = 'MY'; else $addDir = '';

$info_encode = $ServerVariables_QUERY_STRING;
$info = misDecrypt($info_encode,$DbPW,$DbPW);
//$userid . ';@;' . $username . ';@;' . $expireday;
//echo $info;

$info_array = splitVB($info,';@;');
if(count($info_array)!=3) exit;
$userid = $info_array[0];
$username = $info_array[1];
$expireday = $info_array[2];

if($expireday < date('Y-m-d')) {
    echo "
    
<script>
alert('만료된 정보입니다.');
location.href = './';
</script>
    
    ";
    exit;
}



?>


<!DOCTYPE html>
<html>
<head>



    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?php echo $intrannet_name; ?></title>


	<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">




    <script src="../../_mis_kendo/js/jquery.min.js"></script>
    <script id="id_js" name="name_js" type="text/javascript" src="/_mis/java_conv.js?a=a8"></script>

    <link type="text/css" rel="stylesheet" href="vendor.min.css?ver=hiEYb60WZqskvOM">
    <link type="text/css" rel="stylesheet" href="sg.min.css?ver=hiEYb60WZqskvOM">

    <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css'/>
    <script src='//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js'></script>

    <script src="../../_mis_uniqueInfo/user_define.js"></script>

    <link type="text/css" rel="stylesheet" href="index.css">
    <link href="/_mis_uniqueInfo/user_define.css?ddd74s7sd3s4302" rel="stylesheet"/>

<script>



function login() {

    document.Write1.MisSession_UserID.value = document.Write1.MisSession_UserID.value.toLowerCase();
	var params = {
            "MisSession_UserID": document.Write1.MisSession_UserID.value,  
            "MisSession_UserName": document.Write1.MisSession_UserName.value,  
            "MisSession_UserPW": document.Write1.MisSession_UserPW.value,
            "MisSession_UserPW2": document.Write1.MisSession_UserPW2.value,
            "info_encode": document.Write1.info_encode.value,
            "httpReffrer": document.Write1.httpReffrer.value,
        };


	$.ajax({
		url: "new_auth_treat.php",
		beforeSend: function(xhrObj){
			// Request headers
			xhrObj.setRequestHeader("Content-Type","application/json-patch+json");
			xhrObj.setRequestHeader("Hsit-Apim-Subscription-Key","642138a6542e459dacd4532c757a822c");
		},
		type: "POST",
		// Request body 
        data: JSON.stringify(params),
	})
	.done(function(data) {
        if(data.success) {

            if(data.success==true) {
                $('input#signIn')[0].disabled = true;
                alert('정상적으로 처리되었습니다. 로그인페이지로 이동합니다.');
                parent.location.href = "../";
            } else {
                alert(data.error.message);
                $('input#signIn')[0].disabled = false;
                return false;
            }
        } else {
            alert(data.error.message);
            $('input#signIn')[0].disabled = false;
            return false;
        }
	})
	.fail(function(aa) {
		alert("정확한 정보를 넣으세요!");
	});
}

function submit_ok() {
    if (document.Write1.MisSession_UserID.value == "") {
        alert("이 페이지에 해당하는 ID 를 입력해 주십시오.")
        document.Write1.MisSession_UserID.focus();
        return false;
    }
    if (document.Write1.MisSession_UserName.value == "") {
        alert("이 페이지에 해당하는 성명을 입력해 주십시오.")
        document.Write1.MisSession_UserName.focus();
        return false;
    }
    pw = document.Write1.MisSession_UserPW.value;
    if (pw == "") {
        alert("새 비밀번호를 넣으세요.")
        document.Write1.MisSession_UserPW.focus();
        return false;
    }

    //숫자와 문자 포함 형태의 6~12자리 이내의 암호 정규식 (1 가지 조합)
	var regExp1 = /^[a-z|A-Z|0-9|]+$/;

    //영문, 숫자, 특수문자 중 2가지 이상 조합하여 10자리 이내의 암호 정규식 ( 2 가지 조합)
    var regExp2 = /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_+=]{6,12}$/;  

    //특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 ( 3 가지 조합)
    var regExp3 = /^.*(?=^.{6,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;  

    r1 = iif(pw.match(regExp1),'1','0');
    r2 = iif(pw.match(regExp2),'1','0');
    r3 = iif(pw.match(regExp3),'1','0');
/* 적합결과 
111aaa : 110 OK
111!!! : 110 OK
11aa!! : 111 OK
alert(r1+r2+r3);
*/

    if (r1+r2+r3!='110' && r1+r2+r3!='111' && r1+r2+r3!='011') {
        //정규식에 맞지않으면 return null
        alert("새 비밀번호는 문자와 숫자가 포함된 6~12 자리로 넣으세요.");      //--> 특수문자포함도 관계는 없음.
        document.Write1.MisSession_UserPW.focus();
        return false;
    }

    if (document.Write1.MisSession_UserPW2.value == "") {
        alert("새 비밀번호 확인을 넣으세요.")
        document.Write1.MisSession_UserPW2.focus();
        return false;
    }
    if (document.Write1.MisSession_UserPW.value == "") {
        document.Write1.MisSession_UserPW.focus();
        return false;
    } else  {
        $('input#signIn')[0].disabled = true;
        setTimeout( function() {
            $('input#signIn')[0].disabled = false;
        },5000);
        login();
    }
}




</script>
<style>
.container h2 {
    font-size: 20px;
    line-height: 22px;
    color: #333;
    margin-bottom: 20px;
}
</style>
</head>
<body topmargin="50" style="background-color:#FFFFFF" xoncontextmenu="return false">
<form name="Write1" id="Write1" method="post" style="margin-top: calc(45vh - 295px);" 
  target="_top">

<div class="container-fluid">
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 logo">
                <span id="lblLogo"><img src='/uploadFiles/_HomeImages/loginlogo.png?1' border='0' height='60'></span>
            </div>
        </div>
        
        <div class="row">

            <div class="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4 login-form" style="margin-top:3px;">

            <h2>새 비밀번호 인증</h2>

                <div id="pnlLogin">
	
                    <div class="form-group ">
                            <div id="failLogin" class="alert alert-danger" style="display: none;">
                                <span id="lblErr" style="color:Red;"></span>
                            </div>                            
                        <label class="control-label" for="MisSession_UserID">ID</label>
                        <input name="info_encode" id="info_encode" type="hidden" value="<?=$info_encode?>"/>
                        <input name="MisSession_UserID" id="MisSession_UserID" type="text" maxlength="30" class="input-lg form-control" type="text" class="input-lg form-control" />
                    </div>
                    <div class="form-group ">
                        <label class="control-label" for="MisSession_UserName">성명</label>
                        <input name="MisSession_UserName" id="MisSession_UserName" type="text" class="input-lg form-control" type="text" class="input-lg form-control" />
                    </div>
                    <div class="form-group " title="문자와 숫자가 포함된 6~12 자리">
                        <label class="control-label" for="MisSession_UserPW">새비밀번호</label>
                        <input name="MisSession_UserPW" id="MisSession_UserPW" type="password" maxlength="20" class="input-lg form-control"/>
                    </div>
                    <div class="form-group " title="문자와 숫자가 포함된 6~12 자리">
                        <label class="control-label" for="MisSession_UserPW2">새비밀번호 확인</label>
                        <input name="MisSession_UserPW2" id="MisSession_UserPW2" type="password" maxlength="20" class="input-lg form-control"/>
                    </div>
                    <div class="checkbox" style="margin-bottom: 15px;">



                    </div>
                    
<input name="httpReffrer" id="httpReffrer" type="hidden" value="<?php echo $ServerVariables_HTTP_REFERER; ?>"/>

                    <input id="signIn" name="signIn" type="button" class="btn btn-primary btn-block" value="확인" onclick="submit_ok();"/>



                    
</div>
                
            </div>
        </div>
    </div>
</div>

<!-- 위에 div 를 닫고, 아래에 div 를 다시 연 이유 : 이렇게 안하면 style 이 적용이 안됨 -->





</form>




<script>
$("#MisSession_UserID").keyup( function() {
    if(event.keyCode==13) submit_ok();
});
$("#MisSession_UserPW").keyup( function() {
    if(event.keyCode==13) submit_ok();
});
$("#MisSession_UserPW2").keyup( function() {
    if(event.keyCode==13) submit_ok();
});



if(document.Write1.MisSession_UserID.value=="") document.Write1.MisSession_UserID.focus();
else document.Write1.MisSession_UserPW.focus();

//아래체크는 꼭 맨마지막 줄에서 체크해야 함.

//if(!messageBedBrower()) guestLogin();

</script>


</body>
</html>

