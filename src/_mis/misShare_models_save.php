<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');
ob_start();

?>
<?php include 'MisCommonFunction.php'; ?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php'; ?>
<?php include 'hangeul-utils-master/hangeul_romaja.php'; ?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);


$MisSession_UserID = '';

accessToken_check();
$kendoTheme = '';
if (isset($_COOKIE["kendoTheme"])) {
    $kendoTheme = $_COOKIE["kendoTheme"];
}
if ($kendoTheme == '')
    $kendoTheme = "default";


///////////////////////////////////////////////////////

if (isset($_GET["RealPid"]))
    $RealPid = $_GET["RealPid"];
else
    $RealPid = '';

if (isset($_GET["MisJoinPid"]))
    $MisJoinPid = $_GET["MisJoinPid"];
else
    $MisJoinPid = '';

if ($MisJoinPid == '')
    $logicPid = $RealPid;
else
    $logicPid = $MisJoinPid;

$updateVersion = requestVB("updateVersion");
if ($updateVersion == "")
    exit;

/*
$models_314 = '';
$sql = "select count(*) from Mis__sdmoters__MenuList where RealPid='$RealPid' ";
$programCount = onlyOnereturnSql($sql)*1;
*/

//if($MS_MJ_MY=='MY') $target_site = 'http://mysql.speedmis.com';    //해당웹서버 https 사용문제로 https://speedmismy.mycafe24.com 로 변경.
if ($MS_MJ_MY == 'MY')
    $target_site = 'https://speedmismy.mycafe24.com';    //사용자는 체감되지 않는 부분임.
else
    $target_site = 'https://www.speedmis.com';

$url = "$target_site/_mis/misShare_models_create.php?RealPid=speedmis000314&idx=0&updateRealPid=$RealPid&remote_MS_MJ_MY=" . $MS_MJ_MY;
$models_314 = file_get_contents_new($url);

$url = "$target_site/_mis/misShare_models_create.php?RealPid=speedmis000266&idx=$RealPid&remote_MS_MJ_MY=" . $MS_MJ_MY;
$models_266 = file_get_contents_new($url);

$url = "$target_site/_mis/misShare_models_create.php?RealPid=speedmis000267&parent_idx=$RealPid&remote_MS_MJ_MY=" . $MS_MJ_MY;
$models_267 = file_get_contents_new($url);

$url = "$target_site/_mis/misShare_models_create.php?RealPid=speedmis000989&parent_idx=$RealPid&remote_MS_MJ_MY=" . $MS_MJ_MY;
$models_989 = file_get_contents_new($url);



$apply_full_siteID_YN = "N";
if (function_exists("apply_full_siteID_YN")) {
    apply_full_siteID_YN();
}
if ($apply_full_siteID_YN == "Y") {
    $models_314 = apply_full_siteID($models_314);
    $models_266 = apply_full_siteID($models_266);
    $models_267 = apply_full_siteID($models_267);
    $models_989 = apply_full_siteID($models_989);
    $MenuType = onlyOnereturnSql("select MenuType from Mis__" . $full_siteID . "__MenuList where RealPid='$RealPid';");
} else {
    $MenuType = onlyOnereturnSql("select MenuType from MisMenuList where RealPid='$RealPid';");
}

if (isset($_SERVER['HTTP_REFERER'])) {
    if (InStr($_SERVER['HTTP_REFERER'], 'mysql.speedmis.com/') > 0) {
        $sql = "update MisShare set updateVersion=N'" . str_replace('MY_', '', $updateVersion) . "' where RealPid='$RealPid' and (isnumeric(updateVersion)=0 or updateVersion<'" . str_replace('MY_', '', $updateVersion) . "');";
        execSql($sql);
    }
}


?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title></title>
    <link href='//fonts.googleapis.com/css?family=Roboto+Slab:400,700' rel='stylesheet'>
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="shortcut icon" href="/favicon.ico" />



    <script src="../_mis_kendo/js/jquery.min.js"></script>
    <script src="../_mis_kendo/js/kendo.all.min.js"></script>

    <script id="id_js" name="name_js" src="java_conv.js?ddd7447z3ze4efddw"></script>


</head>

<body>

    models_314
    <textarea id="models_314"><?php echo $models_314; ?></textarea>
    models_266
    <textarea id="models_266"><?php echo $models_266; ?></textarea>
    models_267
    <textarea id="models_267"><?php echo $models_267; ?></textarea>
    models_989
    <textarea id="models_989"><?php echo $models_989; ?></textarea>


    <script>
        <?php
        //해당 프로그램이 로컬에 없을 경우, 메뉴관리정보 기준으로 생성.
        if ($models_314 != "") {
            ?>
            $.ajax({
                url: "list_edit_save.php?RealPid=speedmis000314&key_aliasName=idx&updateRealPid=<?php echo $RealPid; ?>&remoteUpdate=Y",
                data: { models: json_char_receive(document.getElementById("models_314").value) },
                contentType: "application/json",
                dataType: "jsonp",
                method: "POST",
                success: function (result) {
                    console.log("프로그램 마스터 업데이트 완료!");

                },
                error: function (xhr, httpStatusMessage, customErrorMessage) {
                    console.log(xhr.responseText);
                }
            });


            <?php
        }
        ?>
        function run_update() {
            <?php if ($MenuType == '11' || $MenuType == '12' || $MenuType == '13') { ?>
                if (JSON.parse(json_char_receive(document.getElementById("models_314").value)).updated.length > 0) {
                    var url = "list_edit_save.php?RealPid=speedmis000314&key_aliasName=idx&updateRealPid=<?php echo $RealPid; ?>&remoteUpdate=Y";
                    url = url + "&updateVersion=<?php echo $updateVersion; ?>";
                    $.ajax({
                        url: url,
                        //data: { models: replaceAll(kendo.stringify(e.data), String.fromCharCode(12288), "") },
                        data: { models: json_char_receive(document.getElementById("models_314").value) },
                        contentType: "application/json",
                        dataType: "jsonp",
                        method: "POST",
                        success: function (result) {
                            console.log("프로그램 마스터 업데이트 완료! - MenuType:11,12,13");
                            parent.$('a#btn_reload').click();
                            parent.displayLoadingOff();
                        },
                        error: function (xhr, httpStatusMessage, customErrorMessage) {
                            console.log(xhr.responseText);
                        }
                    });
                }
            <?php } ?>
            if (JSON.parse(json_char_receive(document.getElementById("models_266").value)).updated.length > 0) {
                var url = "list_edit_save.php?RealPid=speedmis000266&key_aliasName=RealPid&updateRealPid=<?php echo $RealPid; ?>&remoteUpdate=Y";
                $.ajax({
                    url: url,
                    //data: { models: replaceAll(kendo.stringify(e.data), String.fromCharCode(12288), "") },
                    data: { models: json_char_receive(document.getElementById("models_266").value) },
                    contentType: "application/json",
                    dataType: "jsonp",
                    method: "POST",
                    success: function (result) {
                        console.log("프로그램 마스터 업데이트 완료!");
                    },
                    error: function (xhr, httpStatusMessage, customErrorMessage) {
                        console.log(xhr.responseText);
                    }
                });
            }
            if (JSON.parse(json_char_receive(document.getElementById("models_267").value)).updated.length > 0) {
                max_SortElement = JSON.parse(json_char_receive(document.getElementById("models_267").value)).max_SortElement[0];
                $.ajax({
                    url: "list_edit_save.php?max_SortElement=" + max_SortElement + "&RealPid=speedmis000267&key_aliasName=RealPidAliasName&updateRealPid=<?php echo $RealPid; ?>&remoteUpdate=Y&updateVersion=<?php echo $updateVersion; ?>",
                    //data: { models: replaceAll(kendo.stringify(e.data), String.fromCharCode(12288), "") },
                    data: { models: json_char_receive(document.getElementById("models_267").value) },
                    contentType: "application/json",
                    dataType: "jsonp",
                    method: "POST",
                    success: function (result) {
                        console.log("프로그램 디테일 업데이트 완료!");
                        parent.$('a#btn_reload').click();
                        parent.displayLoadingOff();
                    },
                    error: function (xhr, httpStatusMessage, customErrorMessage) {
                        console.log(xhr.responseText);
                    }
                });
            }
            if (JSON.parse(json_char_receive(document.getElementById("models_989").value)).updated.length > 0) {
                $.ajax({
                    url: "list_edit_save.php?RealPid=speedmis000989&key_aliasName=RealPidAliasName&updateRealPid=<?php echo $RealPid; ?>&remoteUpdate=Y&updateVersion=<?php echo $updateVersion; ?>",
                    //data: { models: replaceAll(kendo.stringify(e.data), String.fromCharCode(12288), "") },
                    data: { models: json_char_receive(document.getElementById("models_989").value) },
                    contentType: "application/json",
                    dataType: "jsonp",
                    method: "POST",
                    success: function (result) {
                        console.log("서버로직만 있는 해당 프로그램 업데이트 완료!");
                        parent.$('a#btn_reload').click();
                        parent.displayLoadingOff();
                    },
                    error: function (xhr, httpStatusMessage, customErrorMessage) {
                        console.log(xhr.responseText);
                    }
                });
            }
        }

        <?php
        if ($models_314 != "" || $MenuType == '11' || $MenuType == '12' || $MenuType == '13') {
            ?>
            setTimeout(function () {
                run_update();
            }, 1000);
        <?php } else {
            ?>
            run_update();
            <?php
        }
        ?>

    </script>


</body>

</html>