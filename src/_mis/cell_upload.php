<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include 'MisCommonFunctionPlus.php';


error_reporting(E_ALL);
ini_set("display_errors", 1);

ini_set('upload_max_filesize', '50M');
ini_set('post_max_size', '50M');

$MisSession_UserID = '';
accessToken_check();

$pre = requestVB('pre');
$addParam = requestVB('addParam');
$MisMenuList_Detail = 'MisMenuList_Detail';
if ($pre == '1') {
    $MisMenuList_Detail = 'MisMenuList_Detail_pre';
}

if (isset($_GET["flag"]))
    $flag = $_GET["flag"];
else
    $flag = '';

if (isset($_GET["RealPid"]))
    $RealPid = $_GET["RealPid"];
else
    $RealPid = '';

if (isset($_GET["MisJoinPid"]))
    $MisJoinPid = $_GET["MisJoinPid"];
else
    $MisJoinPid = '';

if (isset($_GET["key"]))
    $upload_key = $_GET["key"];
else
    $upload_key = '';

if (isset($_GET["idx"]))
    $upload_idx = $_GET["idx"];
else
    $upload_idx = '';

if (isset($_GET["field"])) {
    $upload_field = $_GET["field"];
    $sql = "select Grid_Select_Field as fieldName from $MisMenuList_Detail where aliasName='" . $upload_field . "'";
    $fieldName = onlyOnereturnSql($sql);
} else {
    echo "upload_field 값이 없으면 중지";
}

if (isset($_GET["default"])) {
    $upload_default = $_GET["default"];
    if (Left($upload_default, 1) != "/")
        $upload_default = "/uploadFiles/" . $upload_default;

} else
    $upload_default = '';


//MisJoinPid 이 확정된 순간에 서버로직PID 도 확정시킨다.
if ($MisJoinPid == '')
    $logicPid = $RealPid;
else
    $logicPid = $MisJoinPid;


if (isset($_GET["tempDir"]))
    $tempDir = $_GET["tempDir"];
else
    $tempDir = '';

if ($MS_MJ_MY == 'MY') {
    $isnull = 'ifnull';
    $sql = "select concat(ifnull(g08,''),'@',ifnull(dbalias,'')) from MisMenuList where RealPid='" . $logicPid . "'";
} else {
    $isnull = 'isnull';
    $sql = "select isnull(g08,'')+'@'+isnull(dbalias,'') from MisMenuList where RealPid='" . $logicPid . "'";
}

$temp = splitVB(onlyOnereturnSql($sql), "@");
$table_m = $temp[0];
$dbalias = $temp[1];
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


if ($tempDir != "") {
    $target_dir = "/temp/$tempDir/$upload_field/";
    $target_name = "{origin}";
} else if ($upload_default == "") {
    $target_dir = "/uploadFiles/" . $table_m . "/" . $fieldName . "/" . $upload_idx . "/";
    $target_name = "{origin}";
} else if (InStr($upload_default, "/") == 0) {
    $target_dir = "/uploadFiles/" . $table_m . "/" . $fieldName . "/";
    $target_name = $upload_default;
} else if (Left($upload_default, 1) != "/" && Right($upload_default, 1) != "/") {
    $target_name = splitVB($upload_default, "/")[count(splitVB($upload_default, "/")) - 1];
    $target_dir = "/uploadFiles/" . Left($upload_default, Len($upload_default) - Len($target_name));
} else if (Right($upload_default, 1) != "/") {
    $target_name = splitVB($upload_default, "/")[count(splitVB($upload_default, "/")) - 1];
    $target_dir = Left($upload_default, Len($upload_default) - Len($target_name));
} else {
    $target_dir = $upload_default;
    $target_name = "{origin}";
}



if ($flag == "gridUpload") {
    //mydoc/{StationName}.@ext

    //Get the temp file path
    $tmpFilePath = $_FILES[$upload_field]['tmp_name'];

    $origin = $_FILES[$upload_field]['name'];
    $attachMime = $_FILES[$upload_field]['type'];


    if ($target_name == "{origin}") {
        $target_file = $target_dir . $origin;
    } else {
        if (InStr($target_name, "@ext") > 0) {
            if (InStr($origin, ".") == 0) {
                $target_file = $target_dir . replace($target_name, ".@ext", "");
            } else {
                $ext = splitVB($origin, ".")[count(splitVB($origin, ".")) - 1];
                //echo "ext=" . $ext;
                $target_file = $target_dir . replace($target_name, "@ext", $ext);
            }
        } else {
            $target_file = $target_dir . $target_name;
        }
    }
    $target_file = str_replace("//", "/", $base_root . '/' . $target_file);
    $target_pureFile = splitVB($target_file, "/")[count(splitVB($target_file, "/")) - 1];
    $target_url = "/" . str_replace($base_root, "", $target_file);
    $target_url = str_replace("//", "/", $target_url);

    $upload_size = $_FILES[$upload_field]["size"];

    //Make sure we have a file path
    if ($tmpFilePath != "") {

        if (file_exists($target_file))
            unlink($target_file);
        $dir_name = dirname($target_file);
        if (!is_dir($dir_name)) {
            mkdir($dir_name, 0777, true);
        }

        $extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        if (InStr($dangerExt, ".$extension.") > 0) {
            $target_file = $target_file . ".@DANGER.txt";
            $target_pureFile = $target_pureFile . ".@DANGER.txt";
            $target_url = $target_url . ".@DANGER.txt";
        }
        //Upload the file into the temp dir
        if (move_uploaded_file($tmpFilePath, $target_file)) {

            /*
                echo "\n\origin=" . $origin . "\n";
                echo "\n\ntarget_file=" . $target_file . "\n";
                echo "dir_name=" . $dir_name . "\n";
                        echo "table_m=" . $table_m . "\n";
                        echo "fieldName=" . $fieldName . "\n";
                        echo "upload_key=" . $upload_key . "\n";
                        echo "upload_idx=" . $upload_idx . "\n";
                        echo "upload_field=" . $upload_field . "\n";
                        echo "target_pureFile=" . $target_pureFile . "\n";
                        echo "target_url=" . $target_url . "\n";


                        target_file=D:\Web\web_speedmis_v6\uploadFiles\mydoc\(예정)스타렉스.png
                dir_name=D:\Web\web_speedmis_v6\uploadFiles\mydoc
                table_m=MisStation
                fieldName=사업자등록증
                upload_key=num
                upload_idx=512
                upload_field=saeopjadeungnokjeung
                target_pureFile=(예정)스타렉스.png
                target_url=/uploadFiles/mydoc/(예정)스타렉스.png
                업로드 성공!!!모두 끝
                */



            if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {

                $sql = "
                declare
                    v_midx int;
                    v_midx2 int;
                    v_idx int;
                    v_cnt int;
                BEGIN
            
                    delete from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' and attachUrl=N'" . sqlValueReplace($target_url) . "';
                    v_midx:=0;
                    v_idx:=0;                


                    select midx into v_midx from (select midx from MisAttachList where excel_idxname=N'$upload_key' 
                    and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' order by idx desc)
                    aaa RIGHT OUTER JOIN DUAL ON 1=1 where rownum=1;
                    
                    v_midx2:=v_midx;
                    select idx into v_idx from (select idx from MisAttachList where idx=midx) aaa RIGHT OUTER JOIN DUAL ON 1=1 where rownum=1;
                    select nvl(max_idx,0)+1 into v_midx from (select max(idx) as max_idx from MisAttachList) aaa RIGHT OUTER JOIN DUAL ON 1=1 where rownum=1;
                    
                    select count(*) into v_cnt from USER_SEQUENCES  where SEQUENCE_NAME='MISATTACHLIST_SEQ'; 
                    if v_cnt=1 then 
                    execute immediate 'drop sequence MISATTACHLIST_SEQ';
                    end if;
                    execute immediate 'create sequence MISATTACHLIST_SEQ START WITH ' || v_midx;
        
                    update MisAttachList set midx=v_midx where v_midx>nvl(v_midx2,0) and excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' 
                    and Grid_FieldName=N'$fieldName';
        
                    insert into MisAttachList (idx, midx,table_m,Grid_FieldName,excel_idxname,idxnum,attachUrl,attachName,attachMime,attachSize,IP,wdater) 
                    select MISATTACHLIST_SEQ.NEXTVAL, v_midx, N'$table_m', N'$fieldName', N'$upload_key', N'$upload_idx'
                    , N'" . sqlValueReplace($target_url) . "', N'$origin', N'$attachMime', $upload_size, '$ServerVariables_REMOTE_ADDR', N'$MisSession_UserID'
                    from dual;
                    
                end;
                ";

                execSql_db2_oracle($sql);

                $sql = " select midx from (select midx from MisAttachList order by idx desc) where rownum=1";
                $midx = onlyOnereturnSql_db2_oracle($sql);

                $sql = " select nvl(attachUrl,'') as \"attachUrl\" from MisAttachList where midx=$midx order by idx ";

                $mm = 0;
                $fileList = '';

                $stmt = $database2->query($sql);
                $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $cnt_row = count($row);
                while ($mm < $cnt_row) {

                    $attachUrl = $row[$mm]["attachUrl"];

                    if ($fileList == '')
                        $fileList = $origin;
                    else
                        $fileList = $fileList . ',' . $origin;

                    ++$mm;
                }


                $sql = "update " . $table_m . " set $fieldName='$fileList', " . $fieldName . "_midx = $midx where $upload_key=N'$upload_idx';";

            } else if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {

                $sql = "
                delete from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' and attachUrl=N'" . sqlValueReplace($target_url) . "';
                select @midx:=0;
                select @idx:=0;
                select @midx:=midx from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' order by idx desc limit 1; 
                select @midx2:=@midx;
                select @idx:=idx from MisAttachList where idx=@midx;

                SELECT @midx:=AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = 'MisAttachList' AND TABLE_SCHEMA='$base_db2' and (@idx is null or @idx=0 or @midx is null or @midx=0);
                SELECT @midx:=case when @midx<(max(idx)+1) then max(idx)+1 else @midx end from MisAttachList;
                update MisAttachList set midx=@midx where @midx>ifnull(@midx2,0) and excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName';

                insert into MisAttachList (midx,table_m,Grid_FieldName,excel_idxname,idxnum,attachUrl,attachName,attachMime,attachSize,IP,wdater) 
                select @midx, N'$table_m', N'$fieldName', N'$upload_key', N'$upload_idx', N'" . sqlValueReplace($target_url) . "', N'$origin', N'$attachMime', $upload_size, '$ServerVariables_REMOTE_ADDR', N'$MisSession_UserID';
                
                ";
                execSql_db2_mysql($sql);

                $sql = " select midx from MisAttachList order by idx desc limit 1;";
                $midx = onlyOnereturnSql_db2_mysql($sql);

                $sql = " select ifnull(attachUrl,'') as attachUrl from MisAttachList where midx=$midx order by idx limit 1000;";

                $mm = 0;
                $fileList = '';

                $mysqli = new mysqli($DbServerName2, $DbID2, $DbPW2, $base_db2);
                $mysqli->set_charset("utf8");
                $result = $mysqli->query($sql);
                $row = $result->fetch_all(MYSQLI_ASSOC);
                $cnt_row = count($row);
                while ($mm < $cnt_row) {
                    $attachUrl = $row[$mm]["attachUrl"];
                    if ($fileList == '')
                        $fileList = $origin;
                    else
                        $fileList = $fileList . ',' . $origin;
                    ++$mm;
                }

                $result->close();

                $sql = "update " . $table_m . " set $fieldName='$fileList', " . $fieldName . "_midx = $midx where $upload_key=N'$upload_idx'";


            } else {

                $sql = "

                declare @midx int
                declare @midx2 int
                set @midx=0
                delete from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' and attachUrl=N'" . sqlValueReplace($target_url) . "'
                select top 1 @midx=midx from MisAttachList where excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName' order by idx desc
                if not exists(select * from MisAttachList where idx=@midx) set @midx=0
                set @midx2 = @midx
                if @midx=0 set @midx = 1+case when IDENT_CURRENT('MisAttachList')=1 then (select count(*) from MisAttachList) else IDENT_CURRENT('MisAttachList') end
                update MisAttachList set midx=@midx where @midx>isnull(@midx2,0) and excel_idxname=N'$upload_key' and idxnum=N'$upload_idx' and table_m=N'$table_m' and Grid_FieldName=N'$fieldName';

                insert into MisAttachList (midx,table_m,Grid_FieldName,excel_idxname,idxnum,attachUrl,attachName,attachMime,attachSize,IP,wdater) 
                select @midx, N'$table_m', N'$fieldName', N'$upload_key', N'$upload_idx', N'" . sqlValueReplace($target_url) . "', N'$origin', N'$attachMime', $upload_size, '$ServerVariables_REMOTE_ADDR', N'$MisSession_UserID'
                
                
    
                declare @attachUrl nvarchar(1000), @fileList nvarchar(max)
                set @fileList = '';
                DECLARE Mis_CUR CURSOR FOR  
                
                select isnull(attachUrl,'') as attachUrl from MisAttachList where midx=@midx
                order by idx
                
                
                Open Mis_CUR
                
                FETCH NEXT FROM Mis_CUR INTO @attachUrl
                WHILE @@FETCH_STATUS = 0 
                BEGIN   
                
                if(@fileList='') set @fileList = '$origin'
                else set @fileList = @fileList + ',' + '$origin'
                
                FETCH NEXT FROM Mis_CUR INTO @attachUrl
                
                END 
                
                CLOSE Mis_CUR
                
                DEALLOCATE Mis_CUR
    
                update " . $table_m . " set $fieldName=@fileList, " . $fieldName . "_midx = @midx where $upload_key=N'$upload_idx'
    
                ";


            }

            if (execSql_gate($sql, $dbalias)) {
                echo '[{"result":"success", "msg":"' . $origin . ' 파일이 정상적으로 업로드 되었습니다."}]';
                exit;
            } else {
                echo '[{"result":"fail", "msg":"' . $origin . ' 파일 업로드가 실패되었습니다."}]';
                exit;
            }

        } else {
            echo '[{"result":"' . $origin . ' 파일의 업로드가 실패 되었습니다."}]';
            exit;
        }
    }
} else if ($flag == "formUpload") {
    //mydoc/{StationName}.@ext
    //Get the temp file path
    //print_r($_FILES);
    if (count($_FILES) == 0) {
        exit('[{"result":"fail", "msg": "용량제한 또는 기타문제로 업로드에 실패했습니다.\n서버제한용량: ' . ini_get("upload_max_filesize") . '", "url": "" } ]');
    }
    //echo $upload_field;
    $tmpFilePath = $_FILES[$upload_field]['tmp_name'];

    //WriteTextFile("D:\\Web\\web_speedmis_v6_test\\temp\\aaa92.txt", implode("\n", $_FILES[$upload_field]));
//exit;

    $origin = $_FILES[$upload_field]["name"];
    $attachMime = $_FILES[$upload_field]['type'];

    if ($target_name == "{origin}") {
        $target_file = $target_dir . $origin;
    } else {
        if (InStr($target_name, "@ext") > 0) {
            if (InStr($origin, ".") == 0) {
                $target_file = $target_dir . str_replace(".@ext", "", $target_name);
            } else {
                $ext = splitVB($origin, ".")[count(splitVB($origin, ".")) - 1];
                //echo "ext=" . $ext;
                $target_file = $target_dir . str_replace("@ext", $ext, $target_name);
            }
        } else {
            $target_file = $target_dir . $target_name;
        }
    }
    $target_file = str_replace("//", "/", $base_root . '/' . $target_file);
    $target_pureFile = splitVB($target_file, "/")[count(splitVB($target_file, "/")) - 1];
    $target_url = "/" . str_replace($base_root, "", $target_file);

    $upload_size = $_FILES[$upload_field]["size"];
    //Make sure we have a file path

    if ($tmpFilePath != '') {

        if (file_exists($target_file))
            unlink($target_file);
        $dir_name = dirname($target_file);
        if (!is_dir($dir_name)) {
            mkdir($dir_name, 0777, true);
        }
        //Upload the file into the temp dir

        $target_pureFile0 = $target_pureFile;

        /*
        //save.php 에서 처리하기 때문에 여기서는 하지 않음
        $extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        if(InStr($dangerExt, ".$extension.")>0) {
            $target_file = $target_file . ".@DANGER.txt";
            $target_pureFile = $target_pureFile . ".@DANGER.txt";
            $target_url = $target_url . ".@DANGER.txt";
        }
        */
        if (move_uploaded_file($tmpFilePath, $target_file)) {
            echo '[{"result":"success", "msg":"' . $target_pureFile0 . ' 파일 업로드가 성공했습니다. 저장을 해야 최종 처리됩니다.", "url": "' . $target_url . '" } ]';
            exit;
        } else {
            echo '[{"result":"fail", "msg":"' . $target_pureFile0 . ' 파일 업로드가 실패되었습니다."}]';
            exit;
        }
    } else {
        echo '[{"result":"fail", "msg": "파일 업로드 실패 - php ini 에서 용량설정이 작게 되어있을 수 있습니다."}]';
        exit;
    }
} else if ($flag == "formEditorUpload") {
    //mydoc/{StationName}.@ext
//_customuploadFiles
    //Get the temp file path
    $upload_field = $upload_field . '_customuploadFiles';


    $target_dir = str_replace('/_editorImage', '_editorImage', $target_dir . '_editorImage/');


    $tmpFilePath = $_FILES[$upload_field]['tmp_name'];

    $origin = $_FILES[$upload_field]["name"];
    $attachMime = $_FILES[$upload_field]['type'];

    if ($target_name == "{origin}")
        $target_file = $target_dir . $origin;
    else {
        if (InStr($target_name, "@ext") > 0) {
            if (InStr($origin, ".") == 0) {
                $target_file = $target_dir . str_replace(".@ext", "", $target_name);
            } else {
                $ext = splitVB($origin, ".")[count(splitVB($origin, ".")) - 1];
                //echo "ext=" . $ext;
                $target_file = $target_dir . str_replace("@ext", $ext, $target_name);
            }
        } else {
            $target_file = $target_dir . $target_name;
        }
    }
    $target_file = str_replace("//", "/", $base_root . '/' . $target_file);
    $target_pureFile = splitVB($target_file, "/")[count(splitVB($target_file, "/")) - 1];
    $target_pureFile0 = $target_pureFile;
    $target_url = "/" . str_replace($base_root, "", $target_file);

    $extension = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    if (InStr($dangerExt, ".$extension.") > 0) {
        $target_file = $target_file . ".@DANGER.txt";
        $target_pureFile = $target_pureFile . ".@DANGER.txt";
        $target_url = $target_url . ".@DANGER.txt";
    }


    $upload_size = $_FILES[$upload_field]["size"];
    //Make sure we have a file path
    if ($tmpFilePath != "") {

        if (file_exists($target_file))
            unlink($target_file);
        $dir_name = dirname($target_file);
        if (!is_dir($dir_name)) {
            mkdir($dir_name, 0777, true);
        }
        //Upload the file into the temp dir
        if (move_uploaded_file($tmpFilePath, $target_file)) {
            echo '[{"result":"success", "file":"' . $target_pureFile . '", "msg":"' . $target_pureFile0 . ' 파일 업로드가 성공했습니다. 저장을 해야 최종 처리됩니다."}]';
            exit;
        } else {
            echo '[{"result":"fail", "file":"", "msg":"' . $target_pureFile0 . ' 파일 업로드가 실패되었습니다."}]';
            exit;
        }
    }
}


echo '[{"result":"상단에서 종료하세요"}]';


?>