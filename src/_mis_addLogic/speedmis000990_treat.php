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
       
        $sql = "update Mis__ddex__User set mainSortable = N'" . $mainSortable . "' where uniquenum=N'" . $MisSession_UserID . "'";

        execSql($sql);
        echo '{ "result" : "성공" }';
    }

    if (isset($_GET['idxnum'])) {
        $idxnum = $_GET['idxnum'];
        $attachname = $_GET['attachname'];
        
        // info.php?RealPid=speedmis000974&key_aliasName=idx&thisAlias=boardattach1&key_idx=139&flag=download&fileName=Screenshot_20190823-093256.png
        //select convert(nvarchar(10),attachSize)+'|'+attachUrl from Mis__ddex__AttachList 
        //where table_m='Mis__ddex__Comments' and Grid_FieldName='boardattach1' and idxnum=34 and attachUrl like '%/'+'a2.png'
        //order by 1

        $sql = "select Mis__ddex__User set mainSortable = N'" . $mainSortable . "' where uniquenum=N'" . $MisSession_UserID . "'";

        execSql($sql);
        echo '{ "result" : "성공" }';
    }

?>