<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php'; ?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php'; ?>
<?php include 'hangeul-utils-master/hangeul_romaja.php'; ?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

$MisSession_UserID = '';
accessToken_check();


if (isset($_POST["flag"]))
    $flag = $_POST["flag"];
else
    exit;

if ($flag == 'write') {
    if (isset($_POST["RealPid"]))
        $RealPid = $_POST["RealPid"];
    else
        exit;

    if (isset($_POST["contents"])) {
        $contents = decode_cafe24(str_replace("'", "''", $_POST["contents"]));
    } else
        exit;

    if (isset($_POST["midx"]))
        $midx = $_POST["midx"];
    else
        exit;

    if (isset($_POST["refidx"]))
        $refidx = $_POST["refidx"];
    else
        exit;

    if ($MS_MJ_MY == 'MY') {
        //과제
        $isnull = 'ifnull';
        //$sql = "select concat(ifnull(g08,''),'@',ifnull(dbalias,''),'@',ifnull(MenuType,'')) from MisMenuList where RealPid='" . $logicPid . "'";
        //$sql = " update MisReadList set readDate=now() where idx=$idx and RealPid='$RealPid' and widx='$widx' and userid=N'$MisSession_UserID' and 자격 in ('조회','필독'); ";
        $sql = " 
        insert into MisComments (midx,refidx,RealPid,contents,wdater,lastupdate,lastupdater,table_m,excel_idxname) 
        select '$midx',N'$refidx',N'$RealPid',N'$contents',N'$MisSession_UserID',CURRENT_TIMESTAMP,'gadmin',g08,'idx' from MisMenuList 
        where RealPid='speedmis000314' or (MisJoinPid='speedmis000314' and MenuType='06') and ifnull(g08,'')<>'' LIMIT 1;
        ";
        // echo $sql;
    } else {
        $isnull = 'isnull';
        $sql = " 
        declare @table_m nvarchar(50) select @table_m=g08 from MisMenuList 
        where RealPid='$RealPid' or (MisJoinPid='$RealPid' and MenuType='06') and isnull(g08,'')<>''
        insert into MisComments (midx,refidx,RealPid,contents,wdater,lastupdate,lastupdater,table_m,excel_idxname) values 
        (N'$midx',N'$refidx',N'$RealPid',N'$contents',N'$MisSession_UserID',getdate(),N'gadmin',@table_m,N'idx'); 
     
        ";
    }


    $result = [];
    if (execSql($sql)) {
        $result['resultCode'] = 'success';
        $sql2 = "
        select table_m.userid from MisReadList table_m 
        left outer join MisUser table_user on table_user.uniquenum=table_m.userid
        where table_m.RealPid=N'$RealPid' 
        and table_user.delchk<>'D' and table_m.widx = '$midx' and table_m.자격 in ('작성','필독')
        union
        select userid from MisGroup_Member where gidx=20 and userid in (select UniqueNum from MisUser where allPush_YN='Y' and delchk<>'D')
        ";
        $all_push_group = allReturnSql($sql2);
        $virtual_fieldQnmisPildokMem = '';
        $cnt_aa = count($all_push_group);
        for ($aa = 0; $aa < $cnt_aa; $aa++) {
            if (InStr(',' . $virtual_fieldQnmisPildokMem . ',', ',' . $all_push_group[$aa]['userid'] . ',') == 0) {
                if ($virtual_fieldQnmisPildokMem != '')
                    $virtual_fieldQnmisPildokMem = $virtual_fieldQnmisPildokMem . ',';
                $virtual_fieldQnmisPildokMem = $virtual_fieldQnmisPildokMem . $all_push_group[$aa]['userid'];
            }
        }
        //이메일 & 텔레그램 알림
        $pushList = '';
        $mailList = '';
        if ($virtual_fieldQnmisPildokMem != '') {
            if ($telegram_bot_name != '') {
                $pushSql = " select UniqueNum from MisUser 
                where $isnull(telegram_chat_id,'')<>'' and UniqueNum in (N'" . str_replace(",", "',N'", $virtual_fieldQnmisPildokMem) . "') and receive_YN in ('T','A') ";
                $pushList = jsonReturnSql($pushSql);
                $pushList = str_replace('"}]', '', str_replace('[{"UniqueNum":"', '', str_replace('"},{"UniqueNum":"', ',', $pushList)));
            }
            if ($send_admin_mail != '') {
                $mailSql = " select UniqueNum from MisUser 
                where $isnull(email,'')<>'' and UniqueNum in (N'" . str_replace(",", "',N'", $virtual_fieldQnmisPildokMem) . "') and receive_YN in ('Y','A') ";
                $mailList = jsonReturnSql($mailSql);
                $mailList = str_replace('"}]', '', str_replace('[{"UniqueNum":"', '', str_replace('"},{"UniqueNum":"', ',', $mailList)));
            }
            $result['pushList'] = $pushList;
            $result['mailList'] = $mailList;
        }

    } else {
        $result['resultCode'] = 'fail';
    }
    echo json_encode($result, JSON_UNESCAPED_UNICODE);



} else if ($flag == 'likeOrHate') {
    if (isset($_POST["commentsIdx"]))
        $commentsIdx = $_POST["commentsIdx"];
    else
        exit;

    if (isset($_POST["LH"]))
        $LH = $_POST["LH"];
    else
        exit;

    if ($MS_MJ_MY == 'MY') {
        $sql = "
        call MisCommentsLike_Proc($commentsIdx,'$LH','$MisSession_UserID');
        ";
        echo json_encode(allreturnSql($sql));
    } else {
        $sql = "
        declare @p0 char(1), @p1 char(1), @msg nvarchar(20), @LH char(1), @cntL int, @cntH int
        set @LH='$LH'
        set @p0=''
        set @msg=''
        select @p0=likeOrHate from MisCommentsLike where commentsIdx=$commentsIdx and wdater='$MisSession_UserID'
        if @p0='' begin
            insert into MisCommentsLike (commentsIdx, likeOrHate, wdater) values ($commentsIdx, @LH, '$MisSession_UserID')
            set @p1 = @LH
        end else if @p0=@LH begin
            delete MisCommentsLike where commentsIdx=$commentsIdx and wdater='$MisSession_UserID'
            set @p1 = ''
        end else if @p0='L' begin
            set @msg='이미 공감한 글입니다.'
            set @p1 = 'L'
        end else if @p0='H' begin
            set @msg='이미 비공감한 글입니다.'
            set @p1 = 'H'
        end
        select @cntL=count(*) from MisCommentsLike where commentsIdx=$commentsIdx and likeOrHate='L'
        select @cntH=count(*) from MisCommentsLike where commentsIdx=$commentsIdx and likeOrHate='H'
        update MisComments set sel_like=@cntL where idx=$commentsIdx
        update MisComments set sel_hate=@cntH where idx=$commentsIdx
    
    
    
        select @p1 as 'resultLH', @cntL as cntL, @cntH as cntH, @msg as 'msg'
        ";

        echo json_encode(allreturnSql($sql));
    }

}

?>