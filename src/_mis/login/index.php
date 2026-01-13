<?php
header('Content-Type: text/html; charset=UTF-8');

error_reporting(E_ALL);
ini_set("display_errors", 1);

$pre = '';


include '../../_mis/MisCommonFunction.php';
include '../../_mis_uniqueInfo/config_siteinfo.php';

require $_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php';
use Firebase\JWT\JWT;

/*

if InStr(Request.ServerVariables("HTTP_HOST"),base_site)=0 then 
	response.redirect("http://" & base_site & Request.ServerVariables("URL") & "?" & $_SERVER["QUERY_STRING"])
end if
*/
if($MS_MJ_MY=='MY') $addDir = 'MY'; else $addDir = '';
//re_direct("http://dev.enage.com/_mis");

if($ServerVariables_HTTP_HOST!=$base_site) re_direct($base_site);

$MisSession_UserID = "";

accessToken_check();


if(InStr($ServerVariables_QUERY_STRING,"preaddress=") > 0) {
	$preaddress = splitVB($ServerVariables_QUERY_STRING,"preaddress=")[1];
} else $preaddress = "";


if($MisSession_UserID!="") {
	if($preaddress!="") re_direct($preaddress);
    else re_direct("/$top_dir/index.php");
}

?>


<!DOCTYPE html>
<html>
<head>



    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title><?php echo $intrannet_name; ?></title>
    <base href="/_mis/login/"/>

	<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">




    <script src="../../_mis_kendo/js/jquery.min.js"></script>
    <script id="id_js" name="name_js" type="text/javascript" src="/_mis/java_conv.js?a=ffff00dd"></script>

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
            "MisSession_UserPW": document.Write1.MisSession_UserPW.value,
            "preaddress": document.Write1.preaddress.value,
            "remember": document.Write1.remember.value,
            "otherOut": document.Write1.otherOut.value,
            "httpReffrer": document.Write1.httpReffrer.value,
        };


	$.ajax({
		url: "treat.php",
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

            if(data.result.accessToken!="" && data.result.accessToken!=undefined) {
                setCookie("accessToken", data.result.accessToken, 100);
                setCookie("accessTokenTime", data.result.accessTokenTime);
                setCookie("loginID", document.Write1.MisSession_UserID.value, 365);

                if(isMobile()) {
                    setCookie('screenMode','1',1000);
                }
                if(data.result.alim=='yesalim') {

                    $.ajaxSetup({	timeout: 500 });        //IP 에 대한 좋은 기능 리턴도 0.5초로 제한.
                    r = $.getJSON("//ipinfo.io", function(data) {
                        
                        if(data.city==data.region) msg = '기기 로그인 알림 '+data.ip+' / '+data.city+' / '+data.country+' / '+data.org+' 에서 '+location.origin+' 로 로그인했습니다.';
                        else msg = '기기 로그인 알림 '+data.ip+' / '+data.city+' / '+data.region+' / '+data.country+' / '+data.org+' 에서 '+location.origin+' 로 로그인했습니다.';

                        telegram_sendMessage('', document.Write1.MisSession_UserID.value, msg, '', '알리미');

                        if(typeof userDefined_successLogin == "function") userDefined_successLogin();

                        if((document.Write1.MisSession_UserPW.value.length<=4 || document.Write1.MisSession_UserPW.value=='1234!') && document.Write1.MisSession_UserID.value!='방문고객' && topsite()=="mis") {
                            alert('로그인에 성공했습니다. 비밀번호 변경을 위하여 수정페이지로 이동합니다.');
                            parent.location.href = "/<?php echo $top_dir; ?>/index.php?RealPid=speedmis000338&isMenuIn=auto";
                        } else if(document.getElementById("preaddress").value=="") {
                            parent.location.href = location.href.split('/login')[0];
                        } else {
                            if(topsite()=="notmis") location.href = document.getElementById("preaddress").value;
                            else parent.location.href = document.getElementById("preaddress").value;
                        }
                    })
                    .error(function() { 

                        msg = '기기 로그인 알림 <?php echo $ServerVariables_REMOTE_ADDR; ?> 에서 '+location.origin+' 로 로그인했습니다.';

                        telegram_sendMessage('', document.Write1.MisSession_UserID.value, msg, '', '알리미');

                        if(typeof userDefined_successLogin == "function") userDefined_successLogin();

                        if(document.getElementById("preaddress").value=="") {
                            parent.location.href = location.href.split('/login')[0];
                        } else {
                            parent.location.href = document.getElementById("preaddress").value;
                        }
                    });

                } else { 

                    if(typeof userDefined_successLogin == "function") userDefined_successLogin();

                    if(document.getElementById("preaddress").value=="") {
                        parent.location.href = location.href.split('/login')[0];
                    } else {
                        if(document.getElementById("preaddress").value=="") {
                            parent.location.href = location.href.split('/login')[0];
                        } else {
                            parent.location.href = document.getElementById("preaddress").value;
                        }
                    }
                }
                
            } else {
                alert("비정상적인 로그인 에러가 발생했습니다 - 로그인 토큰 생성 실패");
                $('input#signIn')[0].disabled = false;
                return false;
            }
        } else {
            $('input#signIn')[0].disabled = false;
            alert(data.error.message);
        }
	})
	.fail(function(aa) {
		alert("정확한 로그인 정보를 넣으세요!");
        $('input#signIn')[0].disabled = false;
	});
}

function submit_ok() {
    if (document.Write1.MisSession_UserID.value == "") {
        alert("ID 를 입력해 주십시오.")
        document.Write1.MisSession_UserID.focus();
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
                <div id="pnlLogin">
	
                    <div class="form-group ">
                            <div id="failLogin" class="alert alert-danger" style="display: none;">
                                <span id="lblErr" style="color:Red;"></span>
                            </div>                            
                        <label class="control-label" for="MisSession_UserID">ID</label>
                        <input name="MisSession_UserID" id="MisSession_UserID" type="text" class="input-lg form-control" type="text" class="input-lg form-control" />
                    </div>
                    <div class="form-group ">
                        <label class="control-label" for="MisSession_UserPW">Password</label>
                        <input name="MisSession_UserPW" id="MisSession_UserPW" type="password" class="input-lg form-control"/>
                    </div>
                    <div class="checkbox" style="margin-bottom: 15px;">

                    <label
                    <?php if($auto_logout_minute>0) { ?>style="display:none;"<?php } ?>                         
                    >
                        <input type="checkbox" name="remember" value="off" onclick="this.value = iif(this.checked,'on','off');"> 로그인 상태유지
                    </label>
                     
                    
                    <label style="margin-left:15px;">
                        <input type="checkbox" name="otherOut" value="off" onclick="this.value = iif(this.checked,'on','off');"> 타장비 로그아웃
                    </label>

                    </div>
                    
					
                    <input name="preaddress" id="preaddress" type="hidden" value="<?php echo $preaddress; ?>"/>
<input name="httpReffrer" id="httpReffrer" type="hidden" value="<?php echo $ServerVariables_HTTP_REFERER; ?>"/>

                    <input id="signIn" name="signIn" type="button" class="btn btn-primary btn-block" value="Login" onclick="submit_ok();"/>


                    <?php if($google_client_id!='' && InStr($ServerVariables_HTTP_USER_AGENT,'build/')>0) { ?>
                    <input id="google_login" type="button" class="btn btn-primary btn-block" value="Google 계정으로 로그인" 
                    onclick="onGoogleLoginButtonClicked();" style="margin-top:20px;background: #dd4b39;">
                    <?php } else if($google_client_id!='') { ?>
                    <input id="google_login" type="button" class="btn btn-primary btn-block" value="Google 계정으로 로그인" 
                    onclick="location.href='../google_oauth/';" style="margin-top:20px;background: #dd4b39;">
                    <?php } ?>

					<?php if($facebook_param!='') { ?>
                    <input id="facebook_login" type="button" class="btn btn-primary btn-block" value="Facebook 계정으로 로그인" 
                    onclick="location.href='../facebook_oauth/?preaddress=<?php echo $preaddress; ?>';" style="margin-top:20px;background: #3b5998;">
                    <?php } ?>
                    
</div>
                
            </div>
        </div>
    </div>
</div>

<!-- 위에 div 를 닫고, 아래에 div 를 다시 연 이유 : 이렇게 안하면 style 이 적용이 안됨 -->



<hr />
<div>
    <div class="container-fluid">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 footer">
                    <span id="lblFooter">(c)Copyright 2005-<?php echo date("Y"); ?> <a class='link4' href='https://www.speedmis.com' target='_blank'>
                    <font color='#3e445f'><b>SpeedMIS Inc.</b></font></a> 
                    <span class="wide">All Rights Reserved.</span>
                    <br/></span>
                </div>
            </div>
        </div>
    </div>
</div>



</form>




<script>
$("#MisSession_UserID").keyup( function() {
    if(event.keyCode==13) submit_ok();
});
$("#MisSession_UserPW").keyup( function() {
    if(event.keyCode==13) submit_ok();
});

document.Write1.MisSession_UserID.value = getCookie("loginID");

if(document.Write1.MisSession_UserID.value=="") document.Write1.MisSession_UserID.focus();
else document.Write1.MisSession_UserPW.focus();

//아래체크는 꼭 맨마지막 줄에서 체크해야 함.

//if(!messageBedBrower()) guestLogin();

</script>

<?php include '../../_mis_uniqueInfo/bottom_addLogic.php'; ?>
</body>
</html>

