<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');


error_reporting(E_ALL);
ini_set("display_errors", 1);

ob_start();
//session_start();

include 'MisCommonFunction.php';

$gzip_YN = 'N';

try {
    $strDir = "../_mis_log";
    if (!is_dir($strDir))
        mkdir($strDir, 0777, true);
    else
        chmod($strDir, 0777);
    $strDir = "../_mis_cache";
    if (!is_dir($strDir))
        mkdir($strDir, 0777, true);
    else
        chmod($strDir, 0777);
    $strDir = "../_mis_addLogic_autoSave";
    if (!is_dir($strDir))
        mkdir($strDir, 0777, true);
    else
        chmod($strDir, 0777);
    $strDir = "../_mis_addLogic/updateVersion";
    if (!is_dir($strDir))
        mkdir($strDir, 0777, true);
    else
        chmod($strDir, 0777);
    $strDir = "../temp";
    if (!is_dir($strDir))
        mkdir($strDir, 0777, true);
    else
        chmod($strDir, 0777);
} catch (Exception $e) {

}

$paidMsg = '알수없는';
$txt_paidKey = '';
$paidKey_base_domain = '';
$paidKey_full_siteID = '';
$paidKey_ucount = '';
$paidKey_full_site = '';
$paidKey_full_siteID = '';
$step1_msg = '';
$step2_msg = '';

$setupPass = str_replace("<" . "?" . "php ", "", ReadTextFile("../_mis_uniqueInfo/setupPass.php"));


$step = 1;


$logout = requestVB("logout");
if ($logout == "Y") {
    setcookie("step", "1", 0, "/");
    re_direct("setup.php");
}
if ($setupPass == "") {
    setcookie("step", "1", 0, "/");
}
if (getCookie('step') != '') {
    $step = getCookie('step') * 1;
}

$full_siteID = getCookie('full_siteID');


if (Left($_SERVER["DOCUMENT_ROOT"], "1") == "/")
    $os = "linux";
else
    $os = "windows";

if (isset($_POST["new_setupPass"])) {
    $new_setupPass = $_POST["new_setupPass"];
    WriteTextFile("../_mis_uniqueInfo/setupPass.php", "<" . "?php $new_setupPass");
    $setupPass = str_replace("<" . "?" . "php ", "", ReadTextFile("../_mis_uniqueInfo/setupPass.php"));
    if ($setupPass == '') {
        if ($os == 'linux')
            $stopMsg = '리눅스의 경우, chmod 777 등의 명령어를 이용하세요!';
        else
            $stopMsg = '윈도우의 경우, 파일탐색기에서 웹루트의 속성 - 보안 - 편집 - Users 의 모든권한을 체크하세요.';
        ?>
        <script>
            alert('비밀번호 생성이 계속 안되는 경우, 웹루트의 폴더권한을 변경해야 합니다. <?php echo $stopMsg; ?>');
            location.href = 'setup.php';
        </script>
        <?php
        exit;
    }
    re_direct("setup.php");
}



if (isset($_POST["try_setupPass"])) {
    $try_setupPass = $_POST["try_setupPass"];
    $full_siteID = $_POST["full_siteID"];
    setcookie("full_siteID", $full_siteID, 0, "/");
    if ($try_setupPass . "a" == $setupPass . "a" && $setupPass != "") {
        setcookie("step", 2, 0, "/");
        ?>
        <script>
            alert("로그인이 되었습니다.");
            location.href = "setup.php";
        </script>
        <?php

    }
}



$speedmis_addSource = 'BcFHkqpAAADQ44wWC+gm19QsiCpBQCTI5hdNFBCEVtLp/3vFnHaHan/2ZZd+igNKccEx//IiG/Li8FPmMsKvqyRJqsfmW8u214nVjbu42W380YdoINtEGHZV4eo1ckGwB9ZLhpmDAz71SHcumS9kvLDe/eT5dhlnIzb3KThnUs+3Jr5FwzpttR4/IGjqu9ZQwXZOHM+nO5mCAlXCHYBECiipZawAjPRltE7A61QlTmUDvM1Ga3SfTu9KIkPTtlL/NuIVzhrmkHPrHtYAiGfIvSbxktVR0u6zug3IhHyByABed8EWVuC3n042m8d6nkMAbOA98IoHEkmUMGXt4lqj9mEUaVwYnu/NhaQ0uAu8TOtAiIuI74kPS8uNVE+Zo0qGzyp9w4WyyqoY+d0p/jJ0JZDPnYDryegTcV4Mp0RglqVT+uYHBLip1/DSDTQCN2RwY4qxoNnra6jEBEhJnUdXzjujkcVkmLe08J1jS+jeMLNxNRsVy8RdTqmsxVpLU/CbtrcAXUUPmxcc+acqw9x88fouhN5LzVKRDb2SKV2eI9qSUJa/v5/j8fj7Hw==';
eval (dcode2(dcode1($speedmis_addSource)));



if (count(splitVB($reg_info, ";")) != 5)
    $reg_info = '';

$paidKey_base_domain = '';
$paidKey_base_domainID = '';
$paidKey_ucount = '';
$paidKey_full_site = '';
$paidKey_full_siteID = '';

if ($reg_info != "") {

    $paidKey_base_domain = splitVB($reg_info, ";")[0];
    $paidKey_base_domainID = splitVB($reg_info, ";")[1];
    $paidKey_ucount = splitVB($reg_info, ";")[2];
    $paidKey_full_site = splitVB($reg_info, ";")[3];
    $paidKey_full_siteID = splitVB($reg_info, ";")[4];

    if ($paidKey_base_domain == curPageDomain()) {

        if (InStr($paidKey_ucount, '.') > 0)
            $paidMsg = '(만료일:' . splitVB($paidKey_ucount, '.')[1] . ')';
        else
            $paidMsg = '구매';

        if (splitVB($paidKey_ucount, '.')[0] == "500") {
            if ($paidKey_full_site == curPageSite())
                $step2_msg = "엔터프라이즈 $paidMsg 고객임이 확인되었습니다.";
            else
                $step2_msg = "엔터프라이즈 $paidMsg 고객이지만, 사이트 정보가 일치하지 않습니다. 아래의 [고객등록정보] 에서 인증서를 갱신하세요.";
        } else if (splitVB($paidKey_ucount, '.')[0] == "50") {
            if ($paidKey_full_site == curPageSite())
                $step2_msg = "스탠다드 $paidMsg 고객임이 확인되었습니다.";
            else
                $step2_msg = "스탠다드 $paidMsg 고객이지만, 사이트 정보가 일치하지 않습니다. 아래의 [고객등록정보] 에서 인증서를 갱신하세요.";
        } else {
            if ($paidKey_full_site == curPageSite())
                $step2_msg = "정상적인 인증서이지만, 유저수 20개 / 자체생성APP 20개 의 제한이 있습니다.";
            else
                $step2_msg = "도메인정보가 일치하여 사용에는 지장이 없으나, 사이트정보가 일치않지 않아 재등록이 필요합니다. 아래의 [고객등록정보] 를 클릭하세요!";
        }
        if ($step == 2 && $paidKey_full_site != curPageSite()) {
            $step2_msg = $step2_msg . " 등록ID(프로그램식별자) 확인을 위해 아래를 클릭해주세요.";
        }

    } else {
        $step2_msg = "인증서 정보가 오픈할 사이트와 다릅니다. 이 경우, 고객등록을 새로 하시거나, 또는 기존도메인에서 인증서갱신 팝업에 나오는 URL변경정보룰 수정하세요!";
        if ($step == 3) {
            setcookie("step", 2, 0, "/");
            $step = 2;
        }
    }
} else {
    if ($step == 3) {
        setcookie("step", 2, 0, "/");
        $step = 2;
    }
    $step2_msg = "인증정보가 없습니다. 아래의 [고객등록정보 및 인증서갱신] 를 클릭하세요!";
}


if ($step >= 2) {
    $init_pass = requestVB("init_pass");
    if ($init_pass == "Y") {
        $init_pass_file = "../_mis_uniqueInfo/setupPass.php";
        if (file_exists($init_pass_file)) {
            @unlink($init_pass_file);
        }
        setcookie("step", 1, 0, "/");
        re_direct("setup.php");
    }
}

$errMsg = '';




if ($os == "windows" && InStr(strtolower($_SERVER["SERVER_SOFTWARE"]), "iis") == 0) {
    $errMsg = "탐지 로직의 잘못 : 웹서버가 윈도우일 경우, IIS 웹서버이어야 합니다. 문의: 010-8244-9795";
    echo $errMsg;
}


$base_root = str_replace("\\", "/", $_SERVER["DOCUMENT_ROOT"]);
$base_root = mb_convert_encoding($base_root, 'UTF-8', 'EUC-KR');

?>
<!DOCTYPE html>
<html lang="ko">

<head>

    <title>인증서 및 등록정보 확인 & 개통을 위한 설정 페이지</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover">



    <link rel="stylesheet" href="../_mis_kendo/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="../_mis_kendo/styles/kendo.silver.min.css" />

    <script src="../_mis_kendo/js/jquery.min.js"></script>

    <script src="../_mis_kendo/js/kendo.all.min.js"></script>
    <script src="../_mis_kendo/js/cultures/kendo.culture.ko-KR.min.js"></script>


    <script id="id_js" name="name_js" src="java_conv.js?kddd7447z3ze4efddw"></script>

    <style>
        body {
            background: #f1f1f1;
            color: #444;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
            -webkit-font-smoothing: subpixel-antialiased;
            font-size: 14px;
        }

        body[isMobile="N"] {
            margin: 60px auto 25px;
            padding: 20px 20px 10px 20px;
            max-width: 1150px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 1);
        }

        body[isMobile="Y"] {}

        body[isMobile="N"] #misarea .k-tabstrip .k-content {
            height: 550px;
        }

        body[isMobile="Y"] #misarea .k-tabstrip .k-content {
            height: calc(100% - 167px);
        }

        body[isMobile="Y"] .k-card-header>h5 {
            margin: 0;
            font-size: 13px;
        }

        body[isMobile="N"] h6.k-card-subtitle {
            font-size: 15px;
        }

        .demo-section *+h4 {
            margin-top: 2em;
        }

        .demo-section .k-tabstrip .k-content {
            height: 140px;
        }

        div.blue_content {
            padding: 10px;
            color: blue;
        }

        textarea#config_siteinfo {
            position: relative;
            z-index: 1;
            height: 300px;
        }

        .hide {
            display: none;
        }

        input#full_siteID,
        input#base_root,
        input#base_domain,
        input#WINDOWS_LINUX,
        input#paidKey,
        input#full_site {
            pointer-events: none;
            font-style: italic;
        }

        .k-card-header {
            background-color: #428bca;
            color: #ffffff;
        }

        label.bigtitle {
            font-size: 20px;
            color: blue;
            padding: 5px 0;
            margin-top: 30px !important;
            width: 100%;
            display: block !important;
        }
    </style>


</head>

<body>

    <iframe id="ifr_treat" name="ifr_treat" src="about:blank" style="display:none;"></iframe>
    <div id="window"></div>

    <script>
        $('body').attr('isMobile', iif(isMobile(), 'Y', 'N'));
        kendo.culture("ko-KR");


        function init_pass() {
            if (!confirm('비밀번호 초기화를 진행할까요?')) return false;
            location.href = "setup.php?init_pass=Y";
        }

        function fun_externalDB() {
            while ($('input#sel_externalDB').data('kendoDropDownList').dataSource.data().length > 2) {
                var oldData = $('input#sel_externalDB').data('kendoDropDownList').dataSource.data();
                $('input#sel_externalDB').data('kendoDropDownList').dataSource.remove(oldData[oldData.length - 1]);
            }

            $('input.externalDB').each(function () {
                info = this.id + ' : ' + this.value.split('(@)')[0] + ' / ' + this.value.split('(@)')[1] + ' / ' + this.value.split('(@)')[2] + ' / ' + this.value.split('(@)')[3];
                $('input#sel_externalDB').data('kendoDropDownList').dataSource.add({ Name: info, Id: "externalDB_" + this.id });
            });
            cnt = $('input.externalDB').length;
            $('label#sel_externalDB-form-label')[0].innerHTML = $('label#sel_externalDB-form-label')[0].innerText.split('|')[0] + '|&nbsp;<span style="color:red;">' + cnt + '개 추가됨.</span>';
        }
        function goMis() {
            window.open("./");
        }

    </script>
    <div id="misarea">

        <div class="demo-section k-content k-card">

            <div class="k-card-header">
                <h5 class="k-card-title">인증서 및 등록정보 확인 & 개통을 위한 설정 페이지</h5>
                <h6 class="k-card-subtitle">Support page for using SpeedMIS</h6>
            </div>


            <div id="tabstrip-left">
                <ul>
                    <li class="k-state-active">
                        1단계 : <br>설정 페이지 로그인
                    </li>
                    <?php if ($step >= 2) { ?>
                        <li>
                            2단계 : <br>인증서 확인 및
                            <br>고객등록정보
                        </li>
                    <?php } ?>
                    <?php if ($step >= 2) { ?>
                        <li>
                            3단계 : <br>설정 및 적용
                        </li>
                    <?php } ?>
                    <?php if ($step >= 2) { ?>
                        <li>
                            타사이트 감지
                            <br>(필수체크)
                        </li>
                        <li onclick="window.open('./');return false;">
                            실사이트 열기
                        </li>
                        <li>
                            phpinfo 열기
                            <br>(참고용)
                        </li>
                        <li>
                            serverinfo 열기
                            <br>(참고용)
                        </li>
                        <li>
                            웹서버 성능체크
                            <br>(참고용)
                        </li>
                    <?php } ?>
                </ul>
                <div>
                    <form id="stepForm1"></form>
                    <p>



                    </p>
                </div>
                <div>
                    <form id="stepForm2"></form>
                    <p>



                    </p>
                </div>
                <div>
                    <form id="stepForm3" target="ifr_treat" action="setup_applyToSite.php" method="post"></form>
                    <p>



                    </p>
                </div>
                <div>
                    <iframe src="file_get_contents_check.php" marginwidth="0" marginheight="0" frameborder="0"
                        style="overflow-x:hidden; width: 100%; height: calc(100% - 5px);"></iframe>
                </div>
                <div>
                </div>
                <div>
                    <iframe src="phpinfo.php" marginwidth="0" marginheight="0" frameborder="0"
                        style="overflow-x:hidden; width: 100%; height: calc(100% - 5px);"></iframe>
                </div>
                <div>
                    <iframe src="serverinfo.php" marginwidth="0" marginheight="0" frameborder="0"
                        style="overflow-x:hidden; width: 100%; height: calc(100% - 5px);"></iframe>
                </div>
                <div>
                    <iframe src="fast.php" marginwidth="0" marginheight="0" frameborder="0"
                        style="overflow-x:hidden; width: 100%; height: calc(100% - 5px);"></iframe>
                </div>
            </div>

        </div>
        <script>
            $(document).ready(function () {

                $("#tabstrip-left").kendoTabStrip({
                    tabPosition: iif(isMobile(), "top", "left"),
                    animation: { open: { effects: "fadeIn" } }
                });

                <?php if ($step == 1 && $setupPass != '') { ?>
                    $.ajax({
                        url: 'setup_check_login_userid.php',
                        //dataType: 'json',
                        success: function (data) {
                            var result = data;

                            if (result.length <= 50 && result != "gadmin") {
                                $('form#stepForm1 button.k-form-submit').text('새로고침');
                                $('form#stepForm1 button.k-form-submit').parent().append('<input type="button" id="btn_speedmis_login" value="현재 사이트 SpeedMIS 로그인" class="k-button k-form-new" style="color: #fff; background: #8888ff;" onclick="goMis();"/>');
                                $('label#step1_msg-form-label').css('color', 'red');
                                $('input#try_setupPass').closest('.k-form-field').remove();
                                $('label#step1_msg-form-label').text('해당 사이트의 SpeedMIS 로그인이 가능한 상태입니다. 이 경우, 반드시 gadmin 으로 로그인이 되어 있어야 설정페이지 이용이 가능합니다. \n\n만약 사이트가 달라진 경우라면 현재 페이지에서는 로그인ID 를 인식할 수 없습니다. 이 경우, config_siteinfo.php 파일을 직접 편집하여 $base_domain 를 변경해야 합니다. ');
                                alert($('label#step1_msg-form-label').text());
                            }
                        },
                        error: function (data) {
                            console.log('에러이면 무시하면 됨.');
                        }
                    });
                    setTimeout(function () {
                        $('input#try_setupPass').focus();
                    }, 1000);
                <?php } ?>
                <?php if ($step == 1 && $setupPass == '') { ?>
                    setTimeout(function () {
                        $('input#new_setupPass').focus();
                    }, 1000);

                <?php } ?>



                //======================== step 1 start =========================

                $("#stepForm1").kendoForm({
                    formData: {
                        full_siteID: getLocalStorage('full_siteID'),
                    },
                    items: [
                        <?php if ($step == 1 && $setupPass == '') { ?>
                                { field: "new_setupPass", label: { text: "비밀번호 만들기 : 이 페이지의 비밀번호를 설정하세요! 암호는 \n/_mis_uniqueInfo/setupPass.php \n에 저장됩니다. 4자리 이상 넣으세요." } },
                        <?php } else if ($step == 1 && $setupPass != '') { ?>
                                        { field: "try_setupPass", label: { text: "로그인 비밀번호 : 비밀번호를 입력하세요." } },
                                { field: "full_siteID", label: { text: "로컬에 저장된 full_siteID 이 있으면 1단계에서 바로 3단계로 갈 수 있습니다." } },
                            <?php if (isset($_POST["try_setupPass"])) { ?>
                                                {
                                        field: "try_setupPass_comment", label: "정확한 비밀번호를 입력하세요!",
                                        editor: function (container, options) {
                                            container.append($(""));
                                            $('input#try_setupPass').focus();
                                        }
                                    },
                            <?php } ?>

                                        {
                                    field: "step1_msg", label: "비밀번호를 분실한 경우, /_mis_uniqueInfo/setupPass.php 파일을 삭제 후 다시 시도하세요.",
                                    editor: function (container, options) {
                                        container.append($(""));
                                    }
                                },
                        <?php } else { ?>
                                        {
                                    field: "logout_msg", label: "로그인된 상태입니다.",
                                    editor: function (container, options) {
                                        container.append($(""));
                                    }
                                },
                        <?php } ?>
                    ],
                    submit: function (e) {

                        if (event.submitter.innerText == "생성하기") {
                            var setupPass = $('input#new_setupPass')[0].value;

                            if (setupPass == '') {
                                alert("생성할 비밀번호를 넣으세요!");
                                e.preventDefault();
                                return false;
                            }
                            if (setupPass != Trim(replaceAll(setupPass, " ", ""))) {
                                alert("공백은 제외하세요!");
                                return false;
                            }
                            if (setupPass != replaceAll(setupPass, "'", "")) {
                                alert("따옴표는 제외하세요!");
                                return false;
                            }
                            if (setupPass != replaceAll(setupPass, '"', '')) {
                                makeSetupPass();
                                return false;
                            }
                            if (setupPass.length < 4) {
                                alert("네 자 이상 넣으세요!");
                                return false;
                            }

                            $("#stepForm1")[0].method = "post";
                        } else if (event.submitter.innerText == "로그인") {
                            if ($('input#try_setupPass').val() == '') {
                                alert("로그인 비밀번호를 넣으세요!");
                                e.preventDefault();
                                return false;
                            }
                            $("#stepForm1")[0].method = "post";
                        } else if (event.submitter.innerText == "로그아웃") {
                            location.href = "setup.php?logout=Y";
                            e.preventDefault();
                        } else if (event.submitter.innerText == "새로고침") {
                            location.href = "setup.php";
                            e.preventDefault();
                        }
                        //btn_init_pass

                    },

                });
                $('form#stepForm1 input#full_siteID').closest('.k-form-field').hide();

                <?php if ($step == 1 && $setupPass == '') { ?>
                    $('form#stepForm1 button.k-form-submit').text('생성하기');
                <?php } else if ($step == 1 && $setupPass != '') { ?>
                        $('form#stepForm1 input#try_setupPass').attr('type', 'password');
                        $('form#stepForm1 button.k-form-submit').text('로그인');
                <?php } else { ?>
                        $('form#stepForm1 button.k-form-submit').text('로그아웃');
                        $('form#stepForm1 button.k-form-submit').parent().after().append('<button id="btn_init_pass" class="k-button k-primary k-form-submit" type="button" style="margin-left:30px; background: azure; color: black;" onclick="init_pass();">비밀번호 초기화</button>');
                <?php } ?>
                $('form#stepForm1 input#logout').closest('.k-form-field').css('display', 'none');
                $('form#stepForm1 button.k-button.k-form-clear').css('display', 'none');

                <?php if ($step == 2) { ?>
                    $('div#tabstrip-left ul > li')[1].click();
                <?php } else if ($step == 3) { ?>
                        $('div#tabstrip-left ul > li')[2].click();
                <?php } else if ($step == 4) { ?>
                            $('div#tabstrip-left ul > li')[3].click();
                <?php } ?>




                //======================== step 2 start =========================

                $("#stepForm2").kendoForm({
                    formData: {
                        paidKey: "<?php echo $txt_paidKey; ?>",
                        base_domain: "<?php echo curPageDomain(); ?>",
                        base_domain_ip: "<?php echo gethostbyname(curPageDomain()); ?>",
                        base_domain_exip: ajax_url_return('https://www.speedmis.com/_mis_speedmis/serverIP.php'),
                        full_site: location.origin,
                    },
                    items: [
                        { field: "paidKey", label: { text: "인증키 : paidKey.php 파일의 내용" } },
                        {
                            field: "paidKey_content", label: "인증키가 담고있는 중요정보 : 일치하지 않으면 서비스가 제한됩니다.",
                            editor: function (container, options) {
                                container.append($("<div class='k-textbox k-valid blue_content'>등록도메인 : <?php echo $paidKey_base_domain; ?><br>도메인ID : <?php echo $paidKey_base_domainID; ?><br>유저수 : <?php
                                      if (splitVB($paidKey_ucount, '.')[0] == "500")
                                          echo "엔터프라이즈 $paidMsg 고객";
                                      else if (splitVB($paidKey_ucount, '.')[0] == "50")
                                          echo "스탠다드 $paidMsg 고객";
                                      else if (splitVB($paidKey_ucount, '.')[0] == "5")
                                          echo "무료고객";
                                      else
                                          echo "비등록고객";
                                      ?></div > "));
                            }
                        },
                {
                    field: "paidKey_content2", label: "인증키가 담고있는 부가정보 : 일치하지 않아도 서비스에 제한은 없습니다.",
                    editor: function (container, options) {
                        container.append($("<div class='k-textbox k-valid blue_content'>등록사이트 : <?php echo $paidKey_full_site; ?><br>사이트ID(3자~8자, 영문 또는 숫자) : <?php echo $paidKey_full_siteID; ?></div>"));
                    }
                },

                { field: "base_domain", label: "이 사이트의 도메인(또는 등록된 도메인)", validation: { required: true } },
                { field: "base_domain_ip", label: "웹서버ip", validation: { required: true } },
                { field: "base_domain_exip", label: "외부인식웹서버ip", validation: { required: true } },
                { field: "full_site", label: "이 사이트의 URL(또는 등록된 사이트)", validation: { required: true } },
                {
                    field: "step2_msg", label: "인증서 확인결과 :",
                    editor: function (container, options) {
                        container.append($("<div class='k-textbox k-valid blue_content'><?php echo $step2_msg; ?></div>"));
                    }
                },
                    ],
                submit: function (e) {

                    if (event.submitter.id == "btn_open_custInfo") {
                        <?php if (file_exists("../_mis_uniqueInfo/config_siteinfo.php") == true) { ?>
                            db_check = ajax_url_return('setup_check_login_userid.php');
                            if (InStr(db_check, "by function") > 0) {
                                alert("DB 연결이 실패되었습니다. 이 경우, /_mis_uniqueInfo/config_siteinfo.php 파일에서 DB연결정보를 수정하시거나, 또는 파일 삭제후 다시 시도하세요!");
                                return false;
                            }
                        <?php } ?>
                        var myWindow = $("#window"),
                            undo = $("#undo");

                        undo.click(function () {
                            myWindow.data("kendoWindow").open();
                            undo.fadeOut();
                        });

                        function onClose() {
                            undo.fadeIn();
                        }
                        var step3_add_info = ajax_url_return('setup_step3_check.php');
                        myWindow.kendoWindow({
                            content: "https://www.speedmis.com/_mis_speedmis/custReg.php?full_site=" + location.origin + "&base_domain=" + location.hostname + "&base_domain_ip=" + $("input#base_domain_ip").val() + "&base_domain_exip=" + $("input#base_domain_exip").val() + "&paidKey=<?php echo $txt_paidKey; ?>&MS_MJ_MY=" + $('input#MS_MJ_MY')[0].value + "&step3_add_info=" + step3_add_info,
                            width: "700px",
                            height: "600px",
                            title: "이 창은 speedmis.com 의 고객등록 페이지입니다.",
                            visible: false,
                            actions: ["Close"],
                            modal: true,
                        }).data("kendoWindow").center().open();
                        e.preventDefault();
                        return false;
                    }

                    e.preventDefault();
                },

                });

            <?php
            if (splitVB($paidKey_ucount, '.')[0] == "500" && $paidKey_full_site == curPageSite()) {
                ?>
                if (getLocalStorage('full_siteID') != "" && getLocalStorage('full_siteID') != null) {
                    $('div[data-container-for="step2_msg"] div').text('엔터프라이즈 고객임이 확인되었습니다. 3단계로 바로 진입하실 수 있습니다.');
                }
                <?php
                if ($step == 2) {
                    setcookie("step", 3, 0, "/");
                    re_direct("setup.php");
                }
            } else if (splitVB($paidKey_ucount, '.')[0] == "50" && $paidKey_full_site == curPageSite()) {
                ?>
                    if (getLocalStorage('full_siteID') != "" && getLocalStorage('full_siteID') != null) {
                        $('div[data-container-for="step2_msg"] div').text('스탠다드 고객임이 확인되었습니다. 3단계로 바로 진입하실 수 있습니다.');
                    }
                    <?php
                    if ($step == 2) {
                        setcookie("step", 3, 0, "/");
                        re_direct("setup.php");
                    }
            }

            ?>

            $('form#stepForm2 button.k-button.k-form-clear').hide();
            $('form#stepForm2 button.k-button.k-form-clear').prev().hide();
            $('form#stepForm2 button.k-button.k-form-clear').parent().append('<button id="btn_open_custInfo" class="k-button k-primary k-form-submit" style="background: #7777ff; color: #fff;">고객등록정보 및 인증서갱신</button>');



            $('.k-form-field > label.k-label.k-form-label').each(function () {
                if (InStr(this.innerHTML, ":") > 0) {
                    this.innerHTML = '<span style="font-weight: bold;">' + this.innerHTML.split(":")[0] + '</span> : ' + this.innerHTML.split(":")[1];
                } else {
                    this.innerHTML = '<span style="font-weight: bold;">' + this.innerHTML + '</span>';
                }
            });



            //======================== step 3 start =========================

            $("#stepForm3").kendoForm({
                formData: {
                    full_siteID: "<?php echo iif($full_siteID != '', $full_siteID, $paidKey_full_siteID); ?>",
                    intrannet_name: "사내 업무 시스템",
                    RealPid_Home: "speedmis000988",
                    ucount: "<?php echo splitVB($paidKey_ucount, '.')[0]; ?>",
                    kendoCulture: "ko-KR",
                    pwdKey: "speed@mis",
                    base_root: "<?php echo $base_root; ?>",
                    WINDOWS_LINUX: "<?php echo $os; ?>",
                    MS_MJ_MY: "MS",
                    port: "1433",
                },
                items: [
                    {
                        field: "step3_title", label: "아래의 빈칸에 알맞는 값을 넣고, 적용하시면 신속하고 편리하게 사이트를 오픈할 수 있습니다.",
                        editor: function (container, options) {
                            container.append($("<div class='k-textbox k-valid blue_content' style='display:none;'></div>"));
                        }
                    },
                    { field: "full_siteID", label: { text: "사이트ID: 읽기전용" } },
                    { field: "ucount", label: { text: "ucount" } },
                    { field: "intrannet_name", label: { text: "타이틀:" } },
                    { field: "RealPid_Home", label: { text: "홈페이지 메인: 가급적 개통 후 수정하세요! 기본값: speedmis000988" } },
                    { field: "allKill_pw", label: { text: "모든 유저에 대한 올패스 암호: 사용 안하려면 빈칸. 사용시 5자이상. 외부유출금지", optional: true } },
                    { field: "kendoCulture", label: { text: "인터페이스 언어: 가급적 개통 후 수정하세요! ex) ko-KR, en-US ", optional: true } },
                    { field: "pwdKey", label: { text: "DB 필드에 비밀번호 저장 시, 해독키" } },
                    { field: "send_admin_mail", label: { text: "이메일알림용 발송주소:", optional: true } },
                    { field: "telegram_bot_name", label: { text: "텔레그램 봇 ID:", optional: true } },
                    { field: "telegram_bot_token", label: { text: "텔레그램 봇 Token:", optional: true } },

                    { field: "base_root", label: "웹서버 루트경로: 자동감지/읽기전용", validation: { required: true } },

                    { field: "WINDOWS_LINUX", label: "웹서버가 윈도우 IIS 기반 인지 리눅스 기반 인지 자동감지/읽기전용:", validation: { required: true } },
                    {
                        field: "db1_title", label: "::: 기본DB서버정보(MSSQL or MYSQL) 및 고객등록(확인) :::",
                        editor: function (container, options) {
                            container.append($(""));
                        }
                    },
                    { field: "DbServerName", label: "Db Server Name: 1433 포트가 아닐 경우 포트값 포함. ex) localhost | 1.222.99.252,1499 | WIN-NL4G4\\SQLEXPRESS", validation: { required: true } },
                    { field: "base_db", label: "DB Name:", validation: { required: true } },
                    { field: "DbID", label: "DB ID:", validation: { required: true } },
                    { field: "DbPW", label: "Db 암호:", validation: { required: true } },
                    {
                        field: "MS_MJ_MY", label: "MYSQL 인지 MSSQL 또는 JSON 지원 MSSQL 인지 자동감지됩니다.",
                        editor: "DropDownList",
                        editorOptions: {
                            dataSource: [
                                { Name: "자동감지 됩니다.", Id: "" },
                                { Name: "MYSQL : MY", Id: "MY" },
                                { Name: "MSSQL 2016 미만 - 웹 서버에서 JSON 생성 : MS", Id: "MS" },
                                { Name: "MSSQL 2016 이상 - DB 서버에서 JSON 생성 : MJ", Id: "MJ" }
                            ],
                            dataTextField: "Name",
                            dataValueField: "Id"
                        },
                        validation: { required: true }
                    },

                    {
                        field: "db2_title", label: "** DB서버 추가 및 설정 : 무제한 추가가능 **",
                        editor: function (container, options) {
                            container.append($(""));
                        }
                    },
                    {
                        field: "sel_externalDB", label: "DB 서버를 선택 후 편집하시거나, DB 서버 추가를 선택하세요 | 0개 추가됨.",
                        editor: "DropDownList",
                        editorOptions: {
                            dataSource: [
                                { Name: "", Id: "blank" },
                                { Name: "DB 서버를 추가하려면 여기를 선택하세요!", Id: "add" },
                            ],
                            dataTextField: "Name",
                            dataValueField: "Id"
                        },
                    },
                    { field: "dbAlias", label: "해당DB 서버의 간단한 별명을 넣으세요(생성 후 가급적 수정 금물)." },
                    {
                        field: "MS_MJ_MY2", label: "DB 서버의 종류를 선택하세요.",
                        editor: "DropDownList",
                        editorOptions: {
                            dataSource: [
                                { Name: "MYSQL or MARIA DB : MY", Id: "MY" },
                                { Name: "오라클 DB : OC", Id: "OC" },
                                { Name: "MSSQL 2016 미만 - 웹 서버에서 JSON 생성 : MS", Id: "MS" },
                                { Name: "MSSQL 2016 이상 - DB 서버에서 JSON 생성 : MJ", Id: "MJ" },
                            ],
                            dataTextField: "Name",
                            dataValueField: "Id"
                        },
                    },
                    { field: "DbServerName2", label: "Db Server Name 2: MYSQL 의 경우 3306 기본포트가 아니면 :포트번호형태로 추가하세요." },
                    { field: "base_db2", label: "DB Name 2:" },
                    { field: "DbID2", label: "DB ID 2:" },
                    { field: "DbPW2", label: "Db 암호 2:" },

                    {
                        field: "apply_title", label: "** 최종 반영 단계 **",
                        editor: function (container, options) {
                            container.append($(""));
                        }
                    },

                    {
                        field: "config_siteinfo", label: "config_siteinfo.php 에 반영할 내용(읽기전용) : 아래의 [설정파일 미리보기] 를 클릭하세요.",
                        editor: function (container, options) {
                            container.append($("<textarea class='k-textbox k-valid' id='config_siteinfo' readonly></textarea><input name='config_siteinfo' type='hidden'/>"));
                        }
                    }

                ],
                submit: function (e) {

                    if ($('input#paidKey')[0].value == "") {
                        alert("인증키 정보를 알 수 없습니다. 먼저 \n[기본 DB 서버 연결 테스트 및 JSON 지원 감지 및 고객등록(확인)] \n를 클릭하세요!");
                        e.preventDefault();
                        return false;
                    }
                    if (event.submitter.id == "btn_applyToSite") {

                        var config_siteinfo = $('textarea#config_siteinfo').val();

                        if (config_siteinfo == "") {
                            alert("반영할 내용이 없습니다. [설정파일 미리보기] 를 먼저 진행하세요!");
                            e.preventDefault();
                            return false;
                        }

                        if ($('textarea#config_siteinfo').val().length < 1000) {
                            alert("반영할 내용을 신뢰할 수 없습니다. SpeedMIS 에 문의하세요.");
                            e.preventDefault();
                            return false;
                        }

                        if (!confirm("실사이트 설정으로 반영할까요? 반영할 경우, 기존설정파일은 autosave 폴더에 자동백업됩니다. 문제발생 시, 복원은 직접 편집하셔야 합니다.")) {
                            e.preventDefault();
                            return false;
                        }

                        getName('config_siteinfo').value = encode_firewall(document.getElementById('config_siteinfo').value);


                    } else {
                        var pw = $('input#allKill_pw')[0].value;
                        if (InStr(pw, '"') + InStr(pw, "'") + InStr(pw, ' ') > 0) {
                            alert("올패스 암호에는 따옴표나 공백이 들어갈 수 없습니다.");
                            $('input#allKill_pw').focus();
                            return false;
                        }
                        if (pw.length > 0 && pw.length < 5) {
                            alert("올패스 암호는 5자 이상이어야 합니다.");
                            $('input#allKill_pw').focus();
                            return false;
                        }
                        //config_siteinfo_basic 기준으로 변환시작.
                        config_basic = $('textarea#config_siteinfo_basic')[0].value;

                        config_siteinfo_db1ms_windows = $('textarea#config_siteinfo_db1ms_windows')[0].value;
                        config_siteinfo_db1ms_linux = $('textarea#config_siteinfo_db1ms_linux')[0].value;

                        config_siteinfo_db2ms_windows = $('textarea#config_siteinfo_db2ms_windows')[0].value;
                        config_siteinfo_db2ms_linux = $('textarea#config_siteinfo_db2ms_linux')[0].value;
                        config_siteinfo_db2oc_windows = $('textarea#config_siteinfo_db2oc_windows')[0].value;


                        $('form#stepForm2 [name], form#stepForm3 [name]').each(function () {
                            if (this.name == "ucount") {
                                if (isDate(this.value)) {
                                    if (this.value == "500") {
                                        config_basic = replaceAll(config_basic, '{ucount}', '엔터프라이즈 구매고객');
                                    } else if (this.value == "50") {
                                        config_basic = replaceAll(config_basic, '{ucount}', '스탠다드 구매고객');
                                    }
                                }
                                config_basic = replaceAll(config_basic, '{' + this.name + '}', this.value);
                            } else {
                                config_basic = replaceAll(config_basic, '{' + this.name + '}', replaceAll(this.value, '"', '\\"'));
                            }
                        });

                        config_basic = replaceAll(config_basic, '{base_domain}', location.hostname);
                        if (location.hostname != location.host) config_basic = replaceAll(config_basic, '$base_site = $base_domain;', '$base_site = $base_domain . ":' + location.port + '";');
                        if (location.protocol == "https:") config_basic = replaceAll(config_basic, '$full_site = "http://"', '$full_site = "https://"');


                        config_all = "<" + "?php \n\n" + config_basic;
                        if ($('input#WINDOWS_LINUX').val() == "windows") config_all = config_all + "\n\n" + config_siteinfo_db1ms_windows;
                        else if ($('input#WINDOWS_LINUX').val() == "linux") config_all = config_all + "\n\n" + config_siteinfo_db1ms_linux;

                        externalDB_list = '';
                        $('input.externalDB').each(function () {
                            externalDB_list = externalDB_list + '$externalDB["' + this.id + '"] = "' + this.value + '";\n';
                        });
                        config_all = replaceAll(config_all, '{externalDB_list}', externalDB_list);

                        config_all = config_all + '\n\n/* 전체프로그램에서 공통으로 사용할 사용자 정의 함수 또는 공용함수 내의 옵션조정용 */ \ninclude "top_addLogic.php";\n\n?' + '>';

                        $('textarea#config_siteinfo')[0].value = config_all;

                        e.preventDefault();

                    }


                },

            });

            $('label#base_domain_ip-form-label').closest('div').hide();
            $('label#base_domain_exip-form-label').closest('div').hide();
            $('label#kendoCulture-form-label').closest('div').hide();
            $('label#pwdKey-form-label').closest('div').hide();
            $('label#ucount-form-label').closest('div').hide();
            $('input#send_admin_mail').closest('.k-form-field').hide();

            $('input#DbPW').attr('type', 'password');
            $('input#DbPW2').attr('type', 'password');
            $('input#allKill_pw').attr('type', 'password');


            $('label#MS_MJ_MY-form-label').parent().prev().append('<button id="btn_check_db" class="k-button k-primary k-form-submit" type="button" style="background: #dffd0b; color: black; margin-top: 15px;">기본 DB 서버 연결 테스트 및 JSON 지원 감지 및 고객등록(확인)</button>');
            $('input#DbPW2').parent().parent().after().append('<button id="btn_check_db2" class="k-button k-primary k-form-submit" type="button" style="background: azure; color: black; margin-top: 15px;">해당 2차 DB 서버 연결 테스트 및 JSON 지원 감지 및 적용</button>');

            $('label#step3_title-form-label').css('background', 'yellow');
            $('label#db1_title-form-label').addClass('bigtitle');
            $('label#db2_title-form-label').addClass('bigtitle');
            $('label#apply_title-form-label').addClass('bigtitle');

            //id="btn_open_custInfo" 
            $('form#stepForm3 .k-form-buttons button.k-button.k-form-submit').text('설정파일 미리보기');
            $('form#stepForm3 .k-form-buttons button.k-button.k-form-clear').css('display', 'none');
            $('form#stepForm3 button.k-button.k-form-clear').parent().append('<button id="btn_applyToSite" class="k-button k-form-new">실사이트설정으로 반영하기</button>');


            function sel_externalDB_change(e) {

                $('button#btn_delete_db2').css('display', 'none');

                if (this.value == undefined) {
                    $('input#dbAlias').css('pointer-events', 'none');
                    $('input#MS_MJ_MY2').css('pointer-events', 'none');
                    $('input#DbServerName2').css('pointer-events', 'none');
                    $('input#base_db2').css('pointer-events', 'none');
                    $('input#DbID2').css('pointer-events', 'none');
                    $('input#DbPW2').css('pointer-events', 'none');


                    $('input#dbAlias').val('');
                    $('input#MS_MJ_MY2').data('kendoDropDownList').value('');
                    $('input#DbServerName2').val('');
                    $('input#base_db2').val('');
                    $('input#DbID2').val('');
                    $('input#DbPW2').val('');

                    return false;

                } else if (this.value() == 'blank' || this.value == undefined) {
                    $('input#dbAlias').css('pointer-events', 'none');
                    $('input#MS_MJ_MY2').css('pointer-events', 'none');
                    $('input#DbServerName2').css('pointer-events', 'none');
                    $('input#base_db2').css('pointer-events', 'none');
                    $('input#DbID2').css('pointer-events', 'none');
                    $('input#DbPW2').css('pointer-events', 'none');
                } else {
                    $('input#dbAlias').css('pointer-events', 'all');
                    $('input#MS_MJ_MY2').css('pointer-events', 'all');
                    $('input#DbServerName2').css('pointer-events', 'all');
                    $('input#base_db2').css('pointer-events', 'all');
                    $('input#DbID2').css('pointer-events', 'all');
                    $('input#DbPW2').css('pointer-events', 'all');
                }

                if (this.value() == 'blank' || this.value() == 'add') {
                    $('input#dbAlias').val('');
                    $('input#MS_MJ_MY2').data('kendoDropDownList').value('');
                    $('input#DbServerName2').val('');
                    $('input#base_db2').val('');
                    $('input#DbID2').val('');
                    $('input#DbPW2').val('');
                    if (this.value() == 'add') $('input#dbAlias').focus();
                } else {
                    $('button#btn_delete_db2').css('display', 'block');

                    dbAlias = this.text().split(' : ')[0];
                    $('input#dbAlias').val(dbAlias);
                    db_info = $('input#' + $('input#dbAlias').val()).val().split('(@)');
                    $('input#MS_MJ_MY2').data('kendoDropDownList').value(db_info[0]);
                    $('input#DbServerName2').val(db_info[1]);
                    $('input#base_db2').val(db_info[2]);
                    $('input#DbID2').val(db_info[3]);
                    $('input#DbPW2').val(db_info[4]);
                }
            }


            $("#sel_externalDB").data("kendoDropDownList").bind("change", sel_externalDB_change);

            sel_externalDB_change();




            //도움말 항목 & 키워드 정의.
            var help_keyword = {};
            help_keyword['full_siteID'] = '사이트ID';
            help_keyword['intrannet_name'] = '타이틀';
            help_keyword['RealPid_Home'] = '홈페이지메인';
            help_keyword['telegram_bot_name'] = '텔레그램';
            help_keyword['WINDOWS_LINUX'] = '서버';

            cnt = Object.keys(help_keyword).length;
            for (i = 0; i < cnt; i++) {
                k = jsonFromIndex(help_keyword, i).key;
                v = jsonFromIndex(help_keyword, i).value;
                if ($('label#' + k + '-form-label')[0]) {
                    $('label#' + k + '-form-label').append('<a class="go_help" target=_blank keyword="' + v + '"><span class="k-icon k-i-question"></span></a>');
                }
            }
            $('a.go_help').each(function () {
                $(this).attr('title', $(this).attr('keyword') + ' 에 대한 도움말 열기');
                $(this).attr('href', 'https://www.speedmis.com/_mis/index.php?RealPid=speedmis001040&allFilter=[{"operator":"contains","value":"' + $(this).attr('keyword') + '","field":"zjemok"}]');
            })


            $('button#btn_check_db2').after('<button id="btn_delete_db2" class="k-button k-primary k-form-submit" type="button" style="display: none;background: #ffdddd; color: black; margin-top: 15px;">해당 2차 DB 서버 연결 정보 삭제</button>');

            $('#btn_check_db,#btn_check_db2').click(function () {

                $('input[type="text"]').filter(function () {
                    return $(this).css('pointer-events') != 'none';
                }).each(function () {
                    var trimmed = $(this).val().trim();
                    $(this).val(trimmed);
                });

                if (this.id == 'btn_check_db2') {
                    if ($('input#sel_externalDB').data('kendoDropDownList').text() == '' || $('input#sel_externalDB').data('kendoDropDownList').value() == 'blank') {
                        alert('이미 추가된 2차 DB 서버를 선택하시거나 추가를 선택하세요!');
                        $('input#sel_externalDB').data('kendoDropDownList').focus();
                        return false;
                    } else if ($('input#sel_externalDB').data('kendoDropDownList').value() == 'add') {
                        if ($('input#dbAlias').val() != '') {
                            if ($('input.externalDB#' + $('input#dbAlias').val())[0]) {
                                alert('이미 존재하는 별명 입니다.');
                                $('input#dbAlias').focus();
                                return false;
                            }
                        }
                    }
                }
                displayLoading();
                $.ajax({

                    url: "setup_check_db.php",
                    //data: { models: replaceAll(kendo.stringify(e.data), String.fromCharCode(12288), "") },
                    data: {
                        btn_id: this.id,

                        WINDOWS_LINUX: $('input#WINDOWS_LINUX')[0].value,
                        DbServerName: $('input#DbServerName')[0].value,
                        base_db: $('input#base_db')[0].value,
                        DbID: $('input#DbID')[0].value,
                        DbPW: $('input#DbPW')[0].value,

                        dbAlias: $('input#dbAlias')[0].value,
                        MS_MJ_MY: $('input#MS_MJ_MY')[0].value,
                        MS_MJ_MY2: $('input#MS_MJ_MY2')[0].value,
                        DbServerName2: $('input#DbServerName2')[0].value,
                        base_db2: $('input#base_db2')[0].value,
                        DbID2: $('input#DbID2')[0].value,
                        DbPW2: $('input#DbPW2')[0].value,

                    },
                    //contentType: "application/json",
                    //dataType: "jsonp",
                    method: "POST",
                    success: function (result) {
                        if (result[0].errMsg != undefined && result[0].errMsg != "") {
                            alert(result[0].errMsg);
                        } else {
                            alert(result[0].msg);

                            if (result[0].MS_MJ_MY != "") {
                                $('input#MS_MJ_MY').data('kendoDropDownList').value(result[0].MS_MJ_MY);
                                $('input#MS_MJ_MY').change();
                            } else if (result[0].MS_MJ_MY2 != "") {
                                $('input#MS_MJ_MY2').data('kendoDropDownList').value(result[0].MS_MJ_MY2);
                                if (InStr(result[0].msg, '성공') > 0) {
                                    if ($('input#sel_externalDB').data('kendoDropDownList').value() == 'add') {

                                        db_alias = $('input#dbAlias').val();
                                        db_info = $('input#MS_MJ_MY2').data('kendoDropDownList').value()
                                            + '(@)' + $('input#DbServerName2').val()
                                            + '(@)' + $('input#base_db2').val()
                                            + '(@)' + $('input#DbID2').val()
                                            + '(@)' + $('input#DbPW2').val()

                                        if ($('input.externalDB#' + db_alias)[0] == undefined) {
                                            $('body').append('<input id="' + db_alias + '" class="externalDB" type="hidden"/>');
                                        }
                                        $('input.externalDB#' + db_alias).val(db_info);

                                    } else {

                                        db_alias = $('input#sel_externalDB').data('kendoDropDownList').value().split('externalDB_')[1];
                                        db_info = $('input#MS_MJ_MY2').data('kendoDropDownList').value()
                                            + '(@)' + $('input#DbServerName2').val()
                                            + '(@)' + $('input#base_db2').val()
                                            + '(@)' + $('input#DbID2').val()
                                            + '(@)' + $('input#DbPW2').val()

                                        $('input.externalDB#' + db_alias).val(db_info);
                                        if ($('input#dbAlias').val() != db_alias) {
                                            $('input.externalDB#' + db_alias).attr('id', $('input#dbAlias').val());
                                        }
                                    }

                                    fun_externalDB();
                                    sel_externalDB_change();
                                }

                            }
                            //custReg(result[0].lastRealPid);
                        }
                    },
                    error: function (xhr, httpStatusMessage, customErrorMessage) {
                        if (InStr(xhr.responseText, "축하") > 0) {
                            result = [];
                            result = JSON.parse("[{" + xhr.responseText.split("[{")[1]);
                            alert(result[0].msg);

                            if (result[0].MS_MJ_MY != "") {
                                $('input#MS_MJ_MY').data('kendoDropDownList').value(result[0].MS_MJ_MY);
                                $('input#MS_MJ_MY').change();
                            } else if (result[0].MS_MJ_MY2 != "") {
                                $('input#MS_MJ_MY2').data('kendoDropDownList').value(result[0].MS_MJ_MY2);
                                if (InStr(result[0].msg, '성공') > 0) {
                                    if ($('input#sel_externalDB').data('kendoDropDownList').value() == 'add') {

                                        db_alias = $('input#dbAlias').val();
                                        db_info = $('input#MS_MJ_MY2').data('kendoDropDownList').value()
                                            + '(@)' + $('input#DbServerName2').val()
                                            + '(@)' + $('input#base_db2').val()
                                            + '(@)' + $('input#DbID2').val()
                                            + '(@)' + $('input#DbPW2').val()

                                        if ($('input.externalDB#' + db_alias)[0] == undefined) {
                                            $('body').append('<input id="' + db_alias + '" class="externalDB" type="hidden"/>');
                                        }
                                        $('input.externalDB#' + db_alias).val(db_info);

                                    } else {

                                        db_alias = $('input#sel_externalDB').data('kendoDropDownList').value().split('externalDB_')[1];
                                        db_info = $('input#MS_MJ_MY2').data('kendoDropDownList').value()
                                            + '(@)' + $('input#DbServerName2').val()
                                            + '(@)' + $('input#base_db2').val()
                                            + '(@)' + $('input#DbID2').val()
                                            + '(@)' + $('input#DbPW2').val()

                                        $('input.externalDB#' + db_alias).val(db_info);
                                        if ($('input#dbAlias').val() != db_alias) {
                                            $('input.externalDB#' + db_alias).attr('id', $('input#dbAlias').val());
                                        }
                                    }

                                    fun_externalDB();
                                    sel_externalDB_change();
                                }

                            }

                        } else {
                            alert(innerTEXT($("<div>" + xhr.responseText + "</div>")[0]));
                        }
                    },
                    complete: function () {
                        displayLoadingOff();
                    }
                });

            });

            $('button#btn_delete_db2').click(function () {
                db_alias = $('input#sel_externalDB').data('kendoDropDownList').value();
                if (InStr(db_alias, 'externalDB_') > 0) {
                    db_alias = replaceAll(db_alias, 'externalDB_', '');
                    if (confirm(db_alias + ' DB 설정을 삭제하시겠습니까?')) {
                        $('input.externalDB#' + db_alias).remove();
                        fun_externalDB();
                        sel_externalDB_change();
                    }
                }

            });

            //브라우저세션에 임시저장
            var setup_data = {};
            if (isJsonString(getSessionStorage('setup_data'))) {
                setup_data = JSON.parse(getSessionStorage('setup_data'));
                cnt = Object.keys(setup_data).length;
                for (i = 0; i < cnt; i++) {
                    k = jsonFromIndex(setup_data, i).key;
                    v = jsonFromIndex(setup_data, i).value;

                    if (InStr(";dbAlias;MS_MJ_MY2;DbServerName2;base_db2;DbID2;DbPW2;base_domain;base_domainID;base_domain_ip;base_domain_exip;base_root;paidKey;WINDOWS_LINUX;full_site;full_siteID;ucount;", ";" + k + ";") == 0) {

                        if ($('[name="' + k + '"]')[0]) {
                            $('[name="' + k + '"]')[0].value = v;
                            if (k == 'MS_MJ_MY') $('[name="' + k + '"]').data('kendoDropDownList').value(v);
                            if (v != '' && (k == 'DbPW' || k == 'allKill_pw')) $('[name="' + k + '"]').attr('type', 'password');
                        }

                    }
                }
            } else {
                //alert("원할한 설정작업을 위해 설정값이 바뀔 때마다 전체설정값이 사용PC 의 임시데이터로 자동저장됩니다.");
            }
            $('form#stepForm3 [name]').change(function () {
                setup_data = {};
                $('form#stepForm2 [name], form#stepForm3 [name]').each(function () {
                    setup_data[this.name] = this.value;
                });
                setSessionStorage('setup_data', JSON.stringify(setup_data));
            });




            <?php if ($step > 1) { ?>
                setTimeout(function () {
                    if ($('.k-textbox.k-valid.blue_content:contains("!")').length > 0) {
                        $('.k-textbox.k-valid.blue_content:contains("!")').css('color', 'red');
                        $('li[aria-controls="' + $('.k-textbox.k-valid.blue_content:contains("!")').closest('.k-content')[0].id + '"]').click();
                        alert($('.k-textbox.k-valid.blue_content:contains("!")')[0].innerText);
                    }
                }, 1000);
            <?php } ?>
            });
        </script>
    </div>

    <div id="div_temp1" style="display: none;"></div>

    <textarea id="config_siteinfo_basic"
        class="hide"><?php include "config_txt/config_siteinfo_basic.txt"; ?></textarea>
    <textarea id="config_siteinfo_db1ms_windows"
        class="hide"><?php include "config_txt/config_siteinfo_db1ms_windows.txt"; ?></textarea>
    <textarea id="config_siteinfo_db1ms_linux"
        class="hide"><?php include "config_txt/config_siteinfo_db1ms_linux.txt"; ?></textarea>
    <textarea id="config_siteinfo_db2ms_windows"
        class="hide"><?php include "config_txt/config_siteinfo_db2ms_windows.txt"; ?></textarea>
    <textarea id="config_siteinfo_db2ms_linux"
        class="hide"><?php include "config_txt/config_siteinfo_db2ms_linux.txt"; ?></textarea>
    <textarea id="config_siteinfo_db2oc_windows"
        class="hide"><?php include "config_txt/config_siteinfo_db2oc_windows.txt"; ?></textarea>
    <iframe src="setup_step3_support.php" class="hide"></iframe>

</body>

</html>