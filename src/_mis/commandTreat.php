<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include 'hangeul-utils-master/hangeul_romaja.php';

error_reporting(E_ALL);
ini_set("display_errors", 1);
//session_start();

accessToken_check();


if ($MS_MJ_MY == 'MY')
    $addDir = 'MY';
else
    $addDir = '';



$nmCommand = requestVB("nmCommand");
$nmActionFlag = requestVB("nmActionFlag");
$nmRealPid = requestVB("nmRealPid");
$nmMisJoinPid = requestVB("nmMisJoinPid");
$nmGubun = requestVB("nmGubun");
$nmIdx = requestVB("nmIdx");
$nmOpenPopup = requestVB("nmOpenPopup");

if ($nmMisJoinPid == '')
    $logicPid = $nmRealPid;
else
    $logicPid = $nmMisJoinPid;
if ($logicPid == '')
    $logicPid = GubunIntoRealPid($nmGubun);

$nmParent_gubun = requestVB("nmParent_gubun");
$nmparent_idx = requestVB("nmparent_idx");


$nmKey_aliasName = requestVB("nmKey_aliasName");
$nmBrief_insertsql = requestVB("nmBrief_insertsql");
$nmBrief_insertline = requestVB("nmBrief_insertline");

if ($nmCommand != 'help') {
    ?>
    <script src="../../_mis_kendo/js/jquery.min.js"></script>
    <script id="id_js" name="name_js" type="text/javascript" src="/_mis/java_conv.js?a=a8"></script>
    <?php
}


if ($MS_MJ_MY == 'MY') {
    $isnull = 'ifnull';
    $sql = "select concat(ifnull(g08,''),'@',ifnull(dbalias,''),'@',ifnull(MenuType,'')) from MisMenuList where RealPid='" . $logicPid . "'";
} else {
    $isnull = 'isnull';
    $sql = "select isnull(g08,'')+'@'+isnull(dbalias,'')+'@'+isnull(MenuType,'') from MisMenuList where RealPid='" . $logicPid . "'";
}

$temp = splitVB(onlyOnereturnSql($sql), "@");

$table_m = $temp[0];
$dbalias = $temp[1];
$MenuType = $temp[2];
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


/* 서버 로직 start :: 서버로직만의 경우 해당안됨; 업무용MIS 와 MIS Join 만. */
if (($MenuType == "01" or $MenuType == '06') && file_exists('../_mis_addLogic/' . $logicPid . '.php'))
    include '../_mis_addLogic/' . $logicPid . '.php';
/* 서버 로직 end */

if (InStr($nmCommand, "menuRefresh") > 0) {
    setcookie("newLogin", "Y", 0, "/");


    // 메뉴새로고침를 이용한 _mis_cache 파일 삭제 로직
    // _mis_cache 삭제 우선순위: 1. speedmis000266 메뉴 list 에서 gadmin 일 때 전체 삭제
    //                     2. speedmis000266 메뉴에서 gadmin 일 때 nmGubun 에 해당하는 파일만 삭제
    //                     3. 그 외의 경우는 MisSession_UserID 에 해당하는 파일만 삭제
    //$cache_path 로 저장된 url 파일을 삭제하는 로직임.
    if ($MisSession_UserID == 'gadmin' && $nmActionFlag == 'list' && $nmRealPid == 'speedmis000266') {
        $path_pattern = "$base_root/_mis_cache/*";
        delete_cache_files($path_pattern);
    } else if ($MisSession_UserID == 'gadmin' && $nmRealPid == 'speedmis000266') {
        $nmGubun = RealPidIntoGubun($nmIdx);
        $path_pattern = "$base_root/_mis_cache/*P.$nmIdx.*";
        delete_cache_files($path_pattern);
        $path_pattern = "$base_root/_mis_cache/*gubun.$nmGubun.*";
        delete_cache_files($path_pattern);
    } else {
        $path_pattern = "$base_root/_mis_cache/*U.$MisSession_UserID.*";
        delete_cache_files($path_pattern);
    }


    if ($MS_MJ_MY == 'MY') {
        $appSql = "
        call MisUser_Authority_Proc ('$full_siteID','speedmis000001');
        update MisUser set menuRefresh = '' where uniquenum=N'$MisSession_UserID';
        ";
        execSql($appSql);
    } else {
        $appSql = "
        exec MisUser_Authority_Proc '$full_siteID','speedmis000001';
        exec('update MisUser set menuRefresh = '''' where uniquenum=N''$MisSession_UserID''')
        ";
        execSql($appSql);
    }

    ?>
    <script>
        <?php if ($nmRealPid == "speedmis000314" || $nmRealPid == "speedmis000755") { ?>
            alert("권한적용 및 메뉴정렬처리가 완료되었습니다. 새로고침을 하시면 변경된 메뉴를 보실 수 있습니다.");
            parent.$('a#btn_1').css('pointer-events', 'all');
            parent.$('a#btn_1').css('opacity', '1');
        <?php } else if (InStr($nmCommand, "menuRefreshAndStop") == 0) { ?>
                parent.location.href = parent.location.href.split("#")[0];
        <?php } ?>
    </script>
    <?php
} else if ($nmCommand == "brief_insertsql") {
    $sql = "select g08 from MisMenuList where RealPid=N'" . $logicPid . "'";
    $table_m = onlyOnereturnSql($sql);

    if ($dbalias != '')
        if ($MS_MJ_MY2 == 'OC') {
            //+1 누락을 감수하고 간단히 코딩함.
            $sql = "select " . $table_m . "_SEQ.NEXTVAL from dual";
            $minIdx = onlyOnereturnSql_db2_oracle($sql) + 1;
        } else if ($MS_MJ_MY2 == 'MY') {
            //mysql 은 AUTO_INCREMENT 자체가 이미 1증가된 값임.
            $sql = "SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_NAME = '$table_m' and TABLE_SCHEMA='$base_db2'";
            $minIdx = onlyOnereturnSql_db2_mysql($sql);
        } else {
            $sql = "select IDENT_CURRENT(N'" . $table_m . "')+1 ";      //간편추가의 최초값 구하기.
            $minIdx = onlyOnereturnSql_db2_mssql($sql);
        } else {
        $sql = "select IDENT_CURRENT(N'" . $table_m . "')+1 ";      //간편추가의 최초값 구하기.
        $minIdx = onlyOnereturnSql($sql);
    }


    $nmBrief_insertline = $nmBrief_insertline * 1;
    $multiInsertSql = '';
    $insertSql = " insert into $table_m $nmBrief_insertsql ;";
    $insertSql = str_replace("@MisSession_UserID", $MisSession_UserID, $insertSql);
    $insertSql = str_replace("@parent_idx", $nmparent_idx, $insertSql);
    for ($i = 0; $i < $nmBrief_insertline; $i++) {
        $multiInsertSql = $multiInsertSql . $insertSql;
    }
    //echo $multiInsertSql;


    if (function_exists("commandTreat_briefInsertBefore")) {
        commandTreat_briefInsertBefore();
    }
    echo '<!--';
    $execSql_result = execSql_gate($multiInsertSql, $dbalias);
    echo '-->';
    $resultCode = $execSql_result['resultCode'];
    $resultMessage = $execSql_result['resultMessage'];
    $resultQuery = $execSql_result['resultQuery'];

    if ($resultCode == 'success') {
        ?>
            <script>
                var openPopup = "Y";
                if (parent.getUrlParameter("allFilter") != undefined && parent.getUrlParameter("orderby") == "idx") {
                    openPopup = "N";    //이미 팝업이 열린 상태임.
                }
                if (parent.$('body').attr('brief_insert_this_page') != undefined) openPopup = "N";
                if (openPopup == "Y" && "<?php echo $nmOpenPopup; ?>" != "N") {
                    url = 'index.php?gubun=<?php echo $nmGubun ?>&parent_idx=<?php echo $nmparent_idx ?>&parent_gubun=<?php echo $nmParent_gubun ?>&allFilter=[{"operator":"gte","value":"<?php echo $minIdx ?>","field":"toolbarSel_<?php echo $nmKey_aliasName ?>"}]&orderby=<?php echo $nmKey_aliasName ?>&isAddURL=Y';
                    parent.parent_popup_jquery(url, "간편추가에 의한 입력결과 및 편집");
                } else {
                    parent.$("#grid").data("kendoGrid").dataSource.read();
                }
            </script>
        <?php
    } else {
        ?>
            <textarea id="txt_resultMessage" style="display:none;"><?php echo $resultMessage . "\n\n" . $resultQuery; ?>
                        </textarea>
            <script>
                if (getCookie('devQueryOn') == 'Y') {
                    rnd = getRandomArbitrary(101, 400);
                    if (typeof parent.toastr == "object") {
                        parent.toastr.error('<a id="rnd' + rnd + '" href="javascript:;" onclick="query_error_popup(this);">간편추가가 실패되었습니다. 에러내용을 보시려면 여기를 클릭하세요.</a>', '', { progressBar: true, timeOut: 7000, positionClass: "toast-bottom-right" });
                        parent.$('a#rnd' + rnd).attr('msg', $('textarea#txt_resultMessage')[0].value);
                    } else {
                        toastr.error('<a id="rnd' + rnd + '" href="javascript:;" onclick="query_error_popup(this);">간편추가가 실패되었습니다. 에러내용을 보시려면 여기를 클릭하세요.</a>', '', { progressBar: true, timeOut: 7000, positionClass: "toast-bottom-right" });
                        $('a#rnd' + rnd).attr('msg', $('textarea#txt_resultMessage')[0].value);
                    }
                } else {
                    alert("간편추가가 실패되었습니다. 관리자에게 문의하세요!");
                }
            </script>
        <?php
    }
    ;
} else if ($nmCommand == "help") {
    if ($MS_MJ_MY == 'MY') {
        $sql = "select concat('<h4>',help_title,'</h4><br>',help_contents) from MisMenuList where RealPid=N'" . $nmRealPid . "'";
    } else {
        $sql = "select '<h4>'+help_title+'</h4><br>'+convert(nvarchar(max),help_contents) from MisMenuList where RealPid=N'" . $nmRealPid . "'";
    }
    $contents = onlyOnereturnSql($sql);
    if (Left($nmRealPid, 8) == 'speedmis') {
        $contents = str_replace('="/uploadFiles/', '="https://www.speedmis.com/uploadFiles/', $contents);
    }
    echo $contents;


}
?>