<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include "../_mis/MisCommonFunction.php";?>
<?php include "../_mis_uniqueInfo/config_siteinfo.php";?>
<?php 

    $MisSession_UserID = "";
    accessToken_check();

    if (isset($_POST['mainSortable'])) {
        $mainSortable = $_POST['mainSortable'];
       
        $sql = "update MisUser set mainSortable = N'" . $mainSortable . "' where uniquenum=N'" . $MisSession_UserID . "'";

        execSql($sql);
    }
?>{ "result" : "성공" }