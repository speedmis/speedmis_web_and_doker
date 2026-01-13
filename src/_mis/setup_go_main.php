<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

?>
<?php include '../_mis/MisCommonFunction.php'; ?>
<?php


error_reporting(E_ALL);
ini_set("display_errors", 1);

ob_start();
//session_start();

$new_paidKey = requestVB("new_paidKey");
$new_full_siteID = requestVB("new_full_siteID");
$new_full_site = requestVB("new_full_site");
$expireDate = requestVB("expireDate");
WriteTextFile("../_mis_uniqueInfo/paidKey.php", "<" . "?" . "php " . $new_paidKey);
$txt_paidKey = str_replace("<" . "?" . "php ", "", ReadTextFile("../_mis_uniqueInfo/paidKey.php"));

setcookie('paidKey_ucount', 'END', 0, '/');
setcookie('expireDate', $expireDate, 0, '/');
?>
<!DOCTYPE html>
<html>

<head>
    <style>
        html {
            font-size: 14px;
            font-family: Arial, Helvetica, sans-serif;
        }
    </style>
    <title>고객등록 지원을 위한 스크립트</title>

    <script src="../_mis_kendo/js/jquery.min.js"></script>

    <script src="../_mis_kendo/js/kendo.all.min.js"></script>


    <script id="id_js" name="name_js" src="../_mis/java_conv.js?kddd7447z3ze4efddw"></script>
</head>

<body>
    <script>
        <?php
        if ($new_paidKey != '' && $new_paidKey != $txt_paidKey) {
            ?>
            alert("_mis_addLogic 폴더의 쓰기권한을 확인하신 후, 확인을 누르시면 다시 시도합니다.");
            location.href = location.href;
            <?php
        } else if ($new_paidKey == "") {
            ?>
                alert("비정상적인 처리입니다. 관리자에게 문의하세요.");
            <?php
        } else if ($new_full_site == curPageSite()) {
            setcookie('step', '3', 0, '/');
            setcookie('full_siteID', $new_full_siteID, 0, '/');
            ?>
                    setLocalStorage('full_siteID', '<?php echo $new_full_siteID; ?>');
            <?php
        }


        ?>

        parent.location.href = parent.location.href;
    </script>

</body>

</html>