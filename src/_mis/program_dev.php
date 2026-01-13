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

if($MS_MJ_MY=='MY') $addDir = 'MY'; else $addDir = '';

$ActionFlag = '';


accessToken_check();

$program_info = [];
$program_info['result'] = 'fail';

if($MisSession_UserID!='gadmin') {
    $program_info['resultMsg'] = '비정상적인 접속입니다.';
    echo json_encode($program_info);
    exit();
}



$RealPid = requestVB('RealPid');
$flag = requestVB('flag');

//실사용 - 상세내역의 최신수정일자.
$sql = "select convert(char(19),max(lastupdate),120) from MisMenuList_detail where RealPid='" . $RealPid . "';";
$real_detail_date = onlyOnereturnSql($sql);

//실사용 - PHP 로직의 최신수정일자.
$RealPid_path = $base_root . '/_mis_addLogic/'.$RealPid.'.php';
$real_php_date = get_file_modified_date19($RealPid_path);

//테스트 - 상세내역의 최신수정일자.
$sql = "select ltrim(isnull(convert(char(19),max(lastupdate),120),'')) from MisMenuList_detail_pre where RealPid='" . $RealPid . "';";
$pre_detail_date = onlyOnereturnSql($sql);

//테스트 - PHP 로직의 최신수정일자.
$RealPid_path = $base_root . '/_mis_addLogic/'.$RealPid.'.pre.php';
$pre_php_date = get_file_modified_date19($RealPid_path);



if($flag=='info') {
    $program_info['result'] = 'success';
    $program_info['real_detail_date'] = $real_detail_date;
    $program_info['real_php_date'] = $real_php_date;
    $program_info['pre_detail_date'] = $pre_detail_date;
    $program_info['pre_php_date'] = $pre_php_date;
} else if($flag=='copy' || $flag=='copyTo_pre') {

    $copy1 = 'N';$copy2 = 'N';
    if($pre_detail_date=='' || $flag=='copyTo_pre') {
        $copy1 = 'Y';
        $program_info['result'] = 'success';
        $sql = "
        delete MisMenuList_detail_pre where RealPid='$RealPid';
        insert into MisMenuList_detail_pre 
        (
        RealPid,SortElement,Grid_Select_Field,Grid_Select_Tname,aliasName,RealPidAliasName,Grid_Columns_Title,Grid_Columns_Width,Grid_View_Fixed,Grid_Enter,Grid_View_XS,Grid_View_SM,Grid_View_MD,Grid_View_LG,Grid_View_Hight,Grid_View_Class,Grid_IsVisibleMobile,Grid_Schema_Type,Grid_Items,Grid_Schema_Validation,Grid_Align,Grid_Orderby,Grid_Relation,Grid_MaxLength,Grid_Default,Grid_GroupCompute,Grid_CtlName,Grid_IsHandle,Grid_ListEdit,Grid_Templete,Grid_PrimeKey,Grid_Alim,Grid_Pil,Grid_FormGroup,wdater
        )
        select 
        RealPid,SortElement,Grid_Select_Field,Grid_Select_Tname,aliasName,RealPidAliasName,Grid_Columns_Title,Grid_Columns_Width,Grid_View_Fixed,Grid_Enter,Grid_View_XS,Grid_View_SM,Grid_View_MD,Grid_View_LG,Grid_View_Hight,Grid_View_Class,Grid_IsVisibleMobile,Grid_Schema_Type,Grid_Items,Grid_Schema_Validation,Grid_Align,Grid_Orderby,Grid_Relation,Grid_MaxLength,Grid_Default,Grid_GroupCompute,Grid_CtlName,Grid_IsHandle,Grid_ListEdit,Grid_Templete,Grid_PrimeKey,Grid_Alim,Grid_Pil,Grid_FormGroup,N'$MisSession_UserID'
        from MisMenuList_detail where RealPid='$RealPid' order by idx;
        ";
        execSql($sql);
    }
    if($pre_php_date=='' || $flag=='copyTo_pre') {
        $copy2 = 'Y';
        $program_info['result'] = 'success';

        $nowRealPid = $RealPid;
        $destination = $base_root . "/_mis_addLogic/" . $nowRealPid . ".php";
        $newDestination = $base_root . "/_mis_addLogic/" . $nowRealPid . ".pre.php";

        $destination_print = $base_root . "/_mis_addLogic/" . $nowRealPid . "_print.html";
        $newDestination_print = $base_root . "/_mis_addLogic/" . $nowRealPid . "_print.pre.html";

        if (file_exists($newDestination)) unlink($newDestination);
        if (file_exists($newDestination_print)) unlink($newDestination_print);

        if(file_exists($destination)) {
            copy($destination, $newDestination);
        } else {
            WriteTextFile($newDestination, '<?php ?>');
        }
        if(file_exists($destination_print)) {
            copy($destination_print, $newDestination_print);
        }
    }
    if($program_info['result']=='success') {
        $program_info['resultMsg'] = '정상적으로 ' . iif($copy1=='Y','상세내역','') . iif($copy1.$copy2=='YY',' 및 ','') . iif($copy2=='Y','PHP','') . ' 이(가) 생성되었습니다.';
    }
   

} else if($flag=='applyTo_real') {

    $copy1 = 'N';$copy2 = 'N';
    if($pre_detail_date!='') {
        $copy1 = 'Y';
        $program_info['result'] = 'success';
        $sql = "
        delete MisMenuList_detail where RealPid='$RealPid';
        insert into MisMenuList_detail 
        (
        RealPid,SortElement,Grid_Select_Field,Grid_Select_Tname,aliasName,RealPidAliasName,Grid_Columns_Title,Grid_Columns_Width,Grid_View_Fixed,Grid_Enter,Grid_View_XS,Grid_View_SM,Grid_View_MD,Grid_View_LG,Grid_View_Hight,Grid_View_Class,Grid_IsVisibleMobile,Grid_Schema_Type,Grid_Items,Grid_Schema_Validation,Grid_Align,Grid_Orderby,Grid_Relation,Grid_MaxLength,Grid_Default,Grid_GroupCompute,Grid_CtlName,Grid_IsHandle,Grid_ListEdit,Grid_Templete,Grid_PrimeKey,Grid_Alim,Grid_Pil,Grid_FormGroup,wdater
        )
        select 
        RealPid,SortElement,Grid_Select_Field,Grid_Select_Tname,aliasName,RealPidAliasName,Grid_Columns_Title,Grid_Columns_Width,Grid_View_Fixed,Grid_Enter,Grid_View_XS,Grid_View_SM,Grid_View_MD,Grid_View_LG,Grid_View_Hight,Grid_View_Class,Grid_IsVisibleMobile,Grid_Schema_Type,Grid_Items,Grid_Schema_Validation,Grid_Align,Grid_Orderby,Grid_Relation,Grid_MaxLength,Grid_Default,Grid_GroupCompute,Grid_CtlName,Grid_IsHandle,Grid_ListEdit,Grid_Templete,Grid_PrimeKey,Grid_Alim,Grid_Pil,Grid_FormGroup,N'$MisSession_UserID'
        from MisMenuList_detail_pre where RealPid='$RealPid' order by idx;
        ";
        execSql($sql);
    }
    if($pre_php_date!='') {
        $copy2 = 'Y';
        $program_info['result'] = 'success';

        $nowRealPid = $RealPid;
        $destination = $base_root . "/_mis_addLogic/" . $nowRealPid . ".php";
        $newDestination = $base_root . "/_mis_addLogic/" . $nowRealPid . ".pre.php";

        $destination_print = $base_root . "/_mis_addLogic/" . $nowRealPid . "_print.html";
        $newDestination_print = $base_root . "/_mis_addLogic/" . $nowRealPid . "_print.pre.html";

        if (file_exists($destination)) unlink($destination);
        if (file_exists($destination_print)) unlink($destination_print);

        if(file_exists($newDestination)) {
            copy($newDestination, $destination);
        } else {
            WriteTextFile($destination, '<?php ?>');
        }
        if(file_exists($newDestination_print)) {
            copy($newDestination_print, $destination_print);
        }
    }
    if($program_info['result']=='success') {
        $program_info['resultMsg'] = '정상적으로 테스트의 ' . iif($copy1=='Y','상세내역','') . iif($copy1.$copy2=='YY',' 및 ','') . iif($copy2=='Y','PHP','') . ' 이(가) 실사용에 적용되었습니다.';
    }
   

} else if($flag=='delete') {

    if($pre_detail_date!='') {
        $program_info['result'] = 'success';
        $sql = "
        delete MisMenuList_detail_pre where RealPid='$RealPid'
        ";
        execSql($sql);
    }
    if($pre_php_date!='') {
        $program_info['result'] = 'success';

        $nowRealPid = $RealPid;
        $newDestination = $base_root . "/_mis_addLogic/" . $nowRealPid . ".pre.php";
        $newDestination_print = $base_root . "/_mis_addLogic/" . $nowRealPid . "_print.pre.html";

        if (file_exists($newDestination)) unlink($newDestination);
        if (file_exists($newDestination_print)) unlink($newDestination_print);

    }
    if($program_info['result']=='success') {
        $program_info['resultMsg'] = '정상적으로 테스트 소스가 삭제되었습니다.';
    }

}

echo json_encode($program_info);

?>