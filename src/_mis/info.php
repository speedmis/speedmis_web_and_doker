<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include 'MisCommonFunctionPlus.php';
include 'hangeul-utils-master/hangeul_romaja.php';



error_reporting(E_ALL);
ini_set("display_errors", 1);

if ($MS_MJ_MY == 'MY')
    $addDir = 'MY';
else
    $addDir = '';

$ActionFlag = '';


accessToken_check();
$MSUI = requestVB('MSUI');
if ($MSUI != '')
    $MisSession_UserID = $MSUI;



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

if (isset($_GET["parent_idx"]))
    $parent_idx = $_GET["parent_idx"];
else
    $parent_idx = '';

if (isset($_GET["flag"]))
    $flag = $_GET["flag"];
else
    exit;

$pre = requestVB('pre');
$addParam = requestVB('addParam');
$MisMenuList_Detail = 'MisMenuList_Detail';
if ($pre == '1') {
    $MisMenuList_Detail = 'MisMenuList_Detail_pre';
}


if ($MS_MJ_MY == 'MY') {
    $sql = "select concat(ifnull(g08,''),'@',ifnull(g14,''),'@',ifnull(dbalias,'')) from MisMenuList where RealPid='" . $logicPid . "'";

} else {
    $sql = "select isnull(g08,'')+'@'+isnull(g14,'')+'@'+isnull(dbalias,'') from MisMenuList where RealPid='" . $logicPid . "'";
}
$temp = splitVB(onlyOnereturnSql($sql), "@");

$table_m = $temp[0];
$isNoWriter = $temp[1];
$dbalias = $temp[2];
/* MS_MJ_MY 셋트 start */
$isnull = 'isnull';
$Nchar = 'N';
$Nchar2 = 'N';
if ($dbalias == 'default') {
    $dbalias = '';
} else if (($dbalias == '' || $dbalias == '1st') && $MS_MJ_MY == 'MY') {
    $dbalias = '1st';
    $MS_MJ_MY2 = 'MY';
    $isnull = 'ifnull';
    $Nchar = '';
}
connectDB_dbalias($dbalias);
if ($MS_MJ_MY2 == 'MY') {
    $Nchar2 = '';
}
/* MS_MJ_MY 셋트 end */


if (Left($table_m, 4) == "dbo.")
    $table_m = splitVB($table_m, "dbo.")[1];

$devQueryOn = 'N';
$min = '.min';
if (isset($_COOKIE["devQueryOn"])) {
    $devQueryOn = $_COOKIE["devQueryOn"];
}
$rnd = '';
$resultQuery = '';

/* 서버 로직 start */
if (file_exists('../_mis_addLogic/' . $logicPid . '.php'))
    include '../_mis_addLogic/' . $logicPid . '.php';
/* 서버 로직 end */

if ($flag == "textUpdate") {

    if (isset($_POST["keyAlias"]))
        $keyAlias = $_POST["keyAlias"];
    else
        exit;

    if (isset($_POST["keyValue"]))
        $keyValue = $_POST["keyValue"];
    else
        exit;

    if (isset($_POST["thisValue"]))
        $thisValue = $_POST["thisValue"];
    else
        exit;

    if (isset($_POST["oldText"]))
        $oldText = $_POST["oldText"];
    else
        exit;

    if (isset($_POST["thisAlias"]))
        $thisAlias = $_POST["thisAlias"];
    else
        exit;
    if (InStr($thisAlias, '__idx') > 0)
        $thisAlias = splitVB($thisAlias, '__idx')[0];

    if (function_exists("textUpdate_previous")) {
        textUpdate_previous();
    }

    $sql = "select replace(Grid_Select_Field,'table_m.','') as fieldName from $MisMenuList_Detail where RealPid='$logicPid' and aliasName='$keyAlias'";
    $keyField = onlyOnereturnSql($sql);

    $resultCode = "success";
    $resultMessage = '';
    $afterScript = '';

    if ($keyField == '') {
        $resultMessage = "Key 에 해당하는 $keyAlias 는 기본테이블에 존재하지 않는 필드임으로 저장할 수 없습니다.";
        $resultCode = 'fail';

        exit('{"thisAlias":"Grid_Columns_Width", "resultCode":"fail", "resultMessage":"' . $resultMessage . '" }');
    }
    //$Grid_Schema_Validation 는 savefield 기능과 관련됨.

    if ($MS_MJ_MY == 'MY') {
        $sql = "select aliasName,Grid_Schema_Validation from $MisMenuList_Detail 
        where RealPid='$logicPid' and ifnull(Grid_Schema_Validation,'') like '\"savefield\"%' order by sortelement ";
    } else {
        $sql = "select aliasName,Grid_Schema_Validation from $MisMenuList_Detail 
        where RealPid='$logicPid' and isnull(Grid_Schema_Validation,'') like '\"savefield\"%' order by sortelement ";
    }
    $Grid_Schema_Validation = allreturnSql($sql);

    $sql = "select Grid_Select_Field, Grid_CtlName, Grid_Schema_Type from $MisMenuList_Detail where RealPid='$logicPid' and aliasName='$thisAlias'";
    $temp1 = allreturnSql($sql);

    $thisField = $temp1[0]['Grid_Select_Field'];
    $Grid_CtlName = $temp1[0]['Grid_CtlName'];
    $Grid_Schema_Type = $temp1[0]['Grid_Schema_Type'];





    if (Left($Grid_CtlName, 4) == "date" || $Grid_CtlName == "numerictextbox" || Left($Grid_Schema_Type, 6) == "number" || Left($Grid_Schema_Type, 4) == "date") {
        if ($thisValue == "" || ((Left($Grid_CtlName, 4) == "date" || Left($Grid_Schema_Type, 4) == "date") && Left($thisValue, 4) == "1900"))
            $thisValue = "@^@NULL";
        else {
            $thisValue = replace($thisValue, ',', '');
        }
    }

    if ($Grid_Schema_Type == 'boolean') {
        $strsql = "update $table_m set $thisField=" . sqlValueReplace($thisValue) . " where $keyField=N'$keyValue'; ";
    } else {
        $strsql = "update $table_m set $thisField=N'" . sqlValueReplace($thisValue) . "' where $keyField=N'$keyValue'; ";
    }

    $strsql = replace($strsql, "N'@^@NULL'", "null");
    $thisValue = replace($thisValue, "@^@NULL", "");


    $log_sql = " insert into MisReadList (RealPid, widx, userid, wdater, 자격) 
    select N'$RealPid', N'$keyValue', N'$MisSession_UserID', N'$MisSession_UserID', N'수정'; ";


    if (function_exists("textUpdate_sql"))
        textUpdate_sql();

    if ($dbalias != '') {
        if ($MS_MJ_MY2 == 'MY') {
            if ($dbalias == '1st' && $isNoWriter != 'Y') {

                $strsql = $strsql . "

SET @cnt := (select COUNT(*) from information_schema.Columns where TABLE_NAME = '$table_m' AND TABLE_SCHEMA='$base_db2' AND (COLUMN_NAME = 'lastupdate' or COLUMN_NAME = 'lastupdater'));
set @query = IF(@cnt=2, 'update $table_m set lastupdate=current_timestamp(),lastupdater=N''$MisSession_UserID'' where $keyField=N''$keyValue''',
'select 111');
prepare stmt from @query;
EXECUTE stmt; 
                ";

            }
            execSql_gate($strsql, $dbalias);
        } else if ($MS_MJ_MY2 == 'OC') {
            execSql_gate($strsql, $dbalias);
        } else {
            if ($isNoWriter != 'Y') {
                $strsql = $strsql . "

if((select count(name) from sys.syscolumns where (name='lastupdate' or name='lastupdater') 
and id=(select id from sys.sysobjects where name='$table_m'))=2)
update $table_m set lastupdate=getdate(),lastupdater=N'$MisSession_UserID' where $keyField=N'$keyValue' 
                ";
            }
            //execSql_db2_mssql($strsql);
            execSql_gate($strsql, $dbalias);
        }
    } else {
        if ($isNoWriter != 'Y') {
            $strsql = $strsql . "
        
if((select count(name) from sys.syscolumns where (name='lastupdate' or name='lastupdater') 
and id=(select id from sys.sysobjects where name='$table_m'))
=2)
update $table_m set lastupdate=getdate(),lastupdater=N'$MisSession_UserID' where $keyField=N'$keyValue' ";
        }
        execSql($strsql . $log_sql);
    }
    /*
    } else {



        $execSql_result = execSql_gate($strsql . $log_sql, $dbalias);
        $resultCode = $execSql_result['resultCode'];
        $resultMessage = $execSql_result['resultMessage'];
        $resultQuery = $execSql_result['resultQuery'];
    }
    */

    /*
    $strsql = replace($strsql, chr(10), " ");
    $strsql = replace($strsql, chr(13), " ");
    $strsql = replace($strsql, "  ", " ");
    */

    echo '{"thisAlias":"' . $thisAlias . '", "resultCode":"' . $resultCode . '"';





    $readResult_url = "list_json.php?flag=readResult&RealPid=$RealPid&MisJoinPid=$MisJoinPid&idx=$keyValue&parent_gubun=&parent_idx=&MSUI=$MisSession_UserID";
    if ($MS_MJ_MY == 'MY') {
        $readResult_url = $readResult_url . '&remote_MS_MJ_MY=MY';
    }
    $savefield_sql = '';
    $cnt_Grid_Schema_Validation = count($Grid_Schema_Validation);
    if ($cnt_Grid_Schema_Validation > 0) {

        $result_data = file_get_contents_new($full_site . '/_mis/' . $readResult_url);
        if (bin2hex(substr($result_data, 0, 2)) === '1f8b') {
            $result_data = gzdecode($result_data);
        }
        $result_data = replace(replace(replace(replace(replace(replace($result_data, '@dda', '"'), '\\\\"', '\\"'), chr(9), ' '), chr(13) . chr(10), ' '), chr(13), ' '), chr(10), ' ');
        if (ord(Left($result_data, 1)) == 239)
            $result_data = Mid($result_data, 2, 99999999);
        $result_data = json_decode($result_data)[0];
        for ($j = 0; $j < $cnt_Grid_Schema_Validation; $j++) {
            $savefield = json_decode('{' . $Grid_Schema_Validation[$j]['Grid_Schema_Validation'] . '}')->savefield[0];
            $savealias = $Grid_Schema_Validation[$j]['aliasName'];
            $savevalue = sqlValueReplace($result_data->$savealias);
            $savefield_sql = $savefield_sql . "update $table_m set $savefield=N'$savevalue' where $keyField=N'$keyValue'; ";

        }
        execSql_gate($savefield_sql, $dbalias);

    }


    $result_data = file_get_contents_new($full_site . '/_mis/' . $readResult_url);
    if (bin2hex(substr($result_data, 0, 2)) === '1f8b') {
        $result_data = gzdecode($result_data);
    }

    $result_data = replace(replace(replace(replace(replace(replace($result_data, '"', '\\"'), '@dda', '\\"'), chr(9), ' '), chr(13) . chr(10), ' '), chr(13), ' '), chr(10), ' ');
    if (ord(Left($result_data, 1)) == 239)
        $result_data = Mid($result_data, 2, 99999999);

    if ($devQueryOn == 'Y') {
        $devQuery_all = "
--update sql :

$strsql

-----------------------------------------------

$log_sql

";
        if ($savefield_sql != '')
            $devQuery_all = $devQuery_all . "


--savefield sql :
$savefield_sql
";

        $devQuery_all = $devQuery_all . "
-----------------------------------------------
        ";
        createFolder($base_root . "/temp/");
        $rnd = rand(10000000, 99999999);
        $devQuery_file = "temp/$full_siteID" . "_" . $RealPid . "_q" . $rnd . ".txt";
        WriteTextFile($base_root . '/' . $devQuery_file, $devQuery_all);
        echo ', "__devQuery_url":"/' . $devQuery_file . '"';
    }

    echo ', "readResult_url":"' . $readResult_url . '"
        , "readResult":"' . replace(replace(replace(replace(replace(replace($result_data, '"', '@dda'), '\\', '\\\\'), chr(9), ' '), chr(13) . chr(10), ' '), chr(13), ' '), chr(10), ' ') . '"
        , "resultMessage":"' . $resultMessage . '"
        , "resultQuery":"' . replace(replace(replace(replace(replace(replace($resultQuery, '"', '@dda'), '\\', '\\\\'), chr(9), ' '), chr(13) . chr(10), ' '), chr(13), ' '), chr(10), ' ') . '"
        , "afterScript":"' . $afterScript . '"
        , "thisValue":"' . replace(replace(replace(replace(replace(replace($thisValue, '"', '@dda'), '\\', '\\\\'), chr(9), ' '), chr(13) . chr(10), ' '), chr(13), ' '), chr(10), ' ') . '" }';


} else if ($flag == "removeUploadCell") {

    if (isset($_GET["thisAlias"]))
        $thisAlias = $_GET["thisAlias"];
    else
        exit;

    if (isset($_GET["key_aliasName"]))
        $key_aliasName = $_GET["key_aliasName"];
    else
        exit;

    if (isset($_GET["key_idx"]))
        $key_idx = $_GET["key_idx"];
    else
        exit;

    if (isset($_POST["fileNames"]))
        $fileName = $_POST["fileNames"];
    else
        exit;



    $sql = "select g08 from MisMenuList where RealPid='" . $logicPid . "'";
    $table_m = onlyOnereturnSql($sql);
    if (Left($table_m, 4) == "dbo.")
        $table_m = splitVB($table_m, "dbo.")[1];

    $sql = "select Grid_Select_Field as fieldName from $MisMenuList_Detail where aliasName='" . $key_aliasName . "'";
    $keyField = onlyOnereturnSql($sql);
    $sql = "select Grid_Select_Field as fieldName from $MisMenuList_Detail where aliasName='" . $thisAlias . "'";
    $thisField = onlyOnereturnSql($sql);


    $strsql = "select " . $thisField . "_midx from " . $table_m . " where " . $keyField . " = '" . $key_idx . "'";
    $midx = onlyOnereturnSql_gate($strsql, $dbalias);

    if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
        $sql = "select nvl(attachUrl,'') from MisAttachList
        where midx=$midx and attachName='$fileName' ";
    } else if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
        $sql = "select ifnull(attachUrl,'') from MisAttachList
        where midx=$midx and attachName='$fileName'; ";
    } else {
        $sql = "select isnull(attachUrl,'') from MisAttachList
        where midx=$midx and attachName='$fileName' ";
    }
    $attPath = onlyOnereturnSql_gate($sql, $dbalias);

    if ($attPath != "") {
        $attPath = replace($base_root . '/' . $attPath, "//", "/");
        if (file_exists($attPath))
            unlink($attPath);
    }


    if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {

        $strsql = "delete from MisAttachList where midx=$midx and attachName=N'" . $fileName . "';";
        execSql_db2_oracle($strsql);

        $sql = "select nvl(attachName,'') as \"attachName\" from MisAttachList where midx=$midx order by idx";

        $mm = 0;
        $fileList = '';

        $stmt = $database2->query($sql);
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $cnt_row = count($row);
        while ($mm < $cnt_row) {
            $attachName = $row[$mm]["attachName"];

            if ($fileList == '')
                $fileList = $attachName;
            else
                $fileList = $fileList . ',' . $attachName;

            ++$mm;
        }


        $strsql = "update $table_m set $thisField=N'$fileList', " . $thisField . "_midx = $midx where $keyField=N'$key_idx';";
        execSql_db2_oracle($strsql, $dbalias);

        echo '[{"result":"success", "msg":"' . $fileName . ' 파일이 삭제되었습니다."}]';

    } else if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {

        $strsql = "delete from MisAttachList where midx=$midx and attachName=N'" . $fileName . "';";
        execSql_db2_mysql($strsql);

        $sql = "select ifnull(attachName,'') as attachName from MisAttachList where midx=$midx order by idx;";

        $mm = 0;
        $fileList = '';

        $mysqli = new mysqli($DbServerName2, $DbID2, $DbPW2, $base_db2);
        $mysqli->set_charset("utf8");
        $result = $mysqli->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
        $cnt_row = count($row);
        while ($mm < $cnt_row) {
            $attachName = $row[$mm]["attachName"];
            if ($fileList == '')
                $fileList = $attachName;
            else
                $fileList = $fileList . ',' . $attachName;
            ++$mm;
        }


        $result->close();

        $strsql = "update $table_m set $thisField=N'$fileList', " . $thisField . "_midx = $midx where $keyField=N'$key_idx'";
        execSql_db2_mysql($strsql, $dbalias);

        echo '[{"result":"success", "msg":"' . $fileName . ' 파일이 삭제되었습니다."}]';

    } else {

        $strsql = "
declare @sql nvarchar(max), @midx int

set @midx = $midx


delete from MisAttachList where attachName=N'" . $fileName . "'



declare @attachName nvarchar(1000), @fileList nvarchar(max)
set @fileList = '';
DECLARE Mis_CUR CURSOR FOR  

select isnull(attachName,'') as attachName from MisAttachList where midx=@midx
order by idx


Open Mis_CUR

FETCH NEXT FROM Mis_CUR INTO @attachName
WHILE @@FETCH_STATUS = 0 
BEGIN   

if(@fileList='') set @fileList = @attachName
else set @fileList = @fileList + ','+@attachName

FETCH NEXT FROM Mis_CUR INTO @attachName

END 

CLOSE Mis_CUR

DEALLOCATE Mis_CUR

select @fileList

";

        $fileList = onlyOnereturnSql_gate($strsql, $dbalias);
        $strsql = "update $table_m set $thisField=N'$fileList', " . $thisField . "_midx = $midx where $keyField=N'$key_idx'";
        execSql_gate($strsql, $dbalias);
        echo '[{"result":"success", "msg":"' . $fileName . ' 파일이 삭제되었습니다."}]';

    }




} else if ($flag == "removeUploadForm") {

    if (isset($_POST["fileNames"]))
        $fileName = $_POST["fileNames"];
    else
        $fileName = '';

    echo '[{"result":"' . $fileName . ' 파일의 삭제준비가 되었습니다."}]';

} else if ($flag == "download") {

    if (isset($_GET["thisAlias"]))
        $thisAlias = $_GET["thisAlias"];
    else
        exit;

    if (isset($_GET["key_aliasName"]))
        $key_aliasName = $_GET["key_aliasName"];
    else
        exit;

    if (isset($_GET["key_idx"]))
        $key_idx = $_GET["key_idx"];
    else
        exit;

    if (isset($_GET["fileName"]))
        $fileName = $_GET["fileName"];
    else
        exit;

    $key_field = onlyOnereturnSql("
    select d.Grid_Select_Field from $MisMenuList_Detail d
    left outer join MisMenuList m on m.RealPid=d.RealPid
    where m.RealPid='$logicPid' and d.aliasName='$key_aliasName';
    ");

    $this_field = onlyOnereturnSql("
    select d.Grid_Select_Field from $MisMenuList_Detail d
    left outer join MisMenuList m on m.RealPid=d.RealPid
    where m.RealPid='$logicPid' and d.aliasName='$thisAlias';
    ");

    if ($MS_MJ_MY2 == 'MY' && $dbalias != '') {
        $strsql = "
        set @s = concat('select @midx:=$this_field','_midx from $table_m where $key_field = ''$key_idx''');
        PREPARE stmt1 FROM @s;
        EXECUTE stmt1;

        update MisAttachList set download=ifnull(download,0)+1 where midx=@midx and attachName=N'$fileName';
        select attachUrl from MisAttachList where midx=@midx and attachName=N'$fileName';
        ";

    } else {
        $strsql = "
        declare @sql nvarchar(max), @midx int

        set @sql = 'select @int = $this_field' + '_midx from $table_m table_m where " . replace($key_field, "'", "''") . " = ''$key_idx'''

        DECLARE @param    NVARCHAR(100)
        SET @param   = '@int INT OUTPUT'
        EXEC SP_EXECUTESQL @sql, @param, @int = @midx OUTPUT

        update MisAttachList set download=isnull(download,0)+1 where midx=@midx and attachName=N'$fileName'

        select attachUrl from MisAttachList where midx=@midx and attachName=N'$fileName'
        ";
    }

    if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
        $strsql = replace(splitVB($strsql, "DECLARE @param")[0], "select @int =", "select") . " select @sql ";
        $strsql = onlyOnereturnSql($strsql);
        $midx = onlyOnereturnSql_db2_oracle($strsql);

        $strsql = " 
        update MisAttachList set download=nvl(download,0)+1 
        where midx=$midx and attachName=N'$fileName';
        ";
        execSql_db2_oracle($strsql);

        $strsql = " select attachUrl from MisAttachList where midx=$midx and attachName=N'$fileName'";

        $attachUrl = onlyOnereturnSql_db2_oracle($strsql);
        echo $attachUrl;


    } else {
        $attachUrl = onlyOnereturnSql_gate($strsql, $dbalias);
        echo $attachUrl;
    }

} else if ($flag == "upload") {

    if (isset($_GET["thisAlias"]))
        $thisAlias = $_GET["thisAlias"];
    else
        exit;

    if (isset($_GET["key_aliasName"]))
        $key_aliasName = $_GET["key_aliasName"];
    else
        exit;

    if (isset($_GET["key_idx"]))
        $key_idx = $_GET["key_idx"];
    else
        exit;


    $key_field = onlyOnereturnSql("
    select d.Grid_Select_Field from $MisMenuList_Detail d
    left outer join MisMenuList m on m.RealPid=d.RealPid
    where m.RealPid='$logicPid' and d.aliasName='$key_aliasName';
    ");

    $this_field = onlyOnereturnSql("
    select d.Grid_Select_Field from $MisMenuList_Detail d
    left outer join MisMenuList m on m.RealPid=d.RealPid
    where m.RealPid='$logicPid' and d.aliasName='$thisAlias';
    ");



    if ($MS_MJ_MY2 == 'MY' && $dbalias != '') {
        $strsql = "
        
        set @s = concat('select @midx:=$this_field','_midx from $table_m where $key_field = ''$key_idx''');
        PREPARE stmt1 FROM @s;
        EXECUTE stmt1;
        
        set @sql = concat('select attachUrl, attachName as name
        ,ltrim(right(replace(attachUrl, ''.'', LPAD('''',100,'' '')),100)) as extension, attachSize as size
        from MisAttachList where midx=''',@midx,'''  and Grid_FieldName=''$this_field''
        order by idx');
        
        select @sql;
        ";
    } else {

        $strsql = "

        declare @sql nvarchar(max), @midx int
        
        
        set @sql = 'select @int = $this_field' + '_midx from $table_m table_m where " . replace($key_field, "'", "''") . " = ''$key_idx'''
        
        DECLARE @param    NVARCHAR(100)
        SET @param   = '@int INT OUTPUT'
        EXEC SP_EXECUTESQL @sql, @param, @int = @midx OUTPUT
        
        set @sql = 'select attachUrl, attachName as name
        ,ltrim(right(replace(attachUrl, ''.'', replicate('' '',100)),100)) as extension, attachSize as size
        from MisAttachList where midx='''+convert(nvarchar(10),@midx)+'''  and Grid_FieldName=''$this_field''
        order by idx'
        
        select @sql
        ";
    }

    if ($dbalias == '1st') {

        $selectQuery = onlyOnereturnSql($strsql);

        if ($selectQuery != '')
            $data = jsonReturnSql($selectQuery);
        else
            $data = '[]';

    } else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {

        $strsql = replace(splitVB($strsql, "DECLARE @param")[0], "select @int =", "select ");
        $strsql = $strsql . " select @sql ";
        $selectQuery = onlyOnereturnSql($strsql);
        $midx = onlyOnereturnSql_gate($selectQuery, $dbalias);

        $strsql = "select attachUrl as \"attachUrl\", attachName as \"name\"
        ,ltrim(substr(replace(attachUrl, '.', LPAD(' ',100,' ')),-100)) as \"extension\", attachSize as \"size\"
        from MisAttachList where midx='$midx' order by idx";

        if ($selectQuery != '')
            $data = jsonReturnSql_db2_oracle($strsql);
        else
            $data = '[]';

    } else {

        $selectQuery = onlyOnereturnSql_gate($strsql, $dbalias);
        //echo $strsql;
        if ($selectQuery != '')
            $data = jsonReturnSql_gate($selectQuery, $dbalias);
        else
            $data = '[]';
    }

    echo $data;

}

?>