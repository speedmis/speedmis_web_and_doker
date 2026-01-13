<?php

function pageLoad() {

    global $ActionFlag;
	global $MisSession_IsAdmin;

/*
	//특정상황에서 페이지를 이동시키는 예제입니다.
	if($ActionFlag=="list" && $parent_RealPid=="speedmis000028") {
		$target_parent_gubun = RealPidIntoGubun("speedmis001071");
		$url = "index.php?RealPid=$RealPid&parent_gubun=$target_parent_gubun&parent_idx=$parent_idx";
		re_direct($url);
	}
*/

        ?>
        <script>

//웹소스 디테일에서 템플릿으로 체크한 항목에 대해 출력내용을 변경할 수 있습니다. 이때 목록 또는 본문내용에 동일하게 적용됩니다.
function columns_templete(p_dataItem, p_aliasName) {

    if(p_aliasName=="table_RealPidQnidx") {
		var rValue = "<a href='index.php?gubun=" + p_dataItem["table_RealPidQnidx"] + "&isMenuIn=Y' target='_blank' class='k-button'>Go</a>";
		rValue = rValue 
			+ "<a id='aid_" + p_dataItem["table_RealPidQnidx"] + "' href='index.php?RealPid=speedmis000266&idx=" + p_dataItem["table_RealPidQnRealPid"] + "&isMenuIn=Y' target='_blank' class='k-button'>소스</a>"
			+ "&nbsp;<a id='aid2_" + p_dataItem["table_RealPidQnidx"] + "' href='http://mysql.speedmis.com/_mis/index.php?RealPid=speedmis000266&idx=" + p_dataItem["table_RealPidQnRealPid"] + "&isMenuIn=Y' target='_blank' class='k-button'>MY소스</a>";
		rValue = rValue + p_dataItem["table_RealPidQnidx"];
        return rValue;
    } else {
        return p_dataItem[p_aliasName];
    }

}

//아래의 함수는 목록에서만 해당되며, 템플릿으로 정의하지 않아도 특정항목의 값이나 태그를 추가할 수 있습니다. 
function rowFunction_UserDefine(p_this) {
/*
	p_this.MenuName = p_this.depth + p_this.LanguageCode; 
    p_this.AutoGubun = 
    "<a href=index.asp?gubun=" + p_this.idx + "&isMenuIn=Y target=_blank>[Go]</a> <a id='aid_" + p_this.idx + "' href=index.asp?RealPid=speedmis000266&idx=" + p_this.idx + "&isMenuIn=Y target=_blank>[Source]</a>?" 
    + p_this.AutoGubun;
*/
}

<?php 
//아래는 해당프로그램의 관리자 권한을 가진 사용자가 목록 조회 시에 적용되는 내용입니다.			
if($MisSession_IsAdmin=="Y" && $ActionFlag=="list") { 
?>

//툴바 명령버튼에 btn_1 이라고 하는 예비버튼을 "적용" 이라는 기능을 넣고, 클릭 시, 그리드에 app="적용" 이라는 신호로 보냅니다.
//이때 app=="적용" 에 대한 처리는 list_json_init() 를 참조하세요.
function thisLogic_toolbar() {

    $("a#btn_1").text("프로그램체크");
    $("li#btn_1_overflow").text("프로그램체크");
    $("#btn_1").css("background", "#88f");
    $("#btn_1").css("color", "#fff");
    $("#btn_1").click( function() {
		if(!confirm('프로그램체크를 진행할까요? 검색조건없이 진행할 경우 시간이 오래 걸립니다.')) return false;
        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "프로그램체크";
        $("#grid").data("kendoGrid").dataSource.read();
        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "";
    });

}
<?php } ?>

//아래는 그리드의 로딩이 거의 끝난 후, 항목에 스타일 시트를 적용하는 예입니다. 스타일 등을 직접 변경하려면 이 함수를 이용해야 합니다.
function rowFunctionAfter_UserDefine(p_this) {
/*
    if(p_this.AutoGubun.length==6) {
        $(getCellObj_idx(p_this[key_aliasName], "SortG2")).attr("stopEdit","true");
        $(getCellObj_idx(p_this[key_aliasName], "SortG2")).css("color","transparent");
        $(getCellObj_idx(p_this[key_aliasName], "SortG4")).attr("stopEdit","true");
        $(getCellObj_idx(p_this[key_aliasName], "SortG4")).css("color","transparent");
    } else if(p_this.AutoGubun.length==4) {
        $(getCellObj_idx(p_this[key_aliasName], "SortG2")).attr("stopEdit","true");
        $(getCellObj_idx(p_this[key_aliasName], "SortG2")).css("color","transparent");
        $(getCellObj_idx(p_this[key_aliasName], "SortG6")).attr("stopEdit","true");
        $(getCellObj_idx(p_this[key_aliasName], "SortG6")).css("color","transparent");
    } else if(p_this.AutoGubun.length==2) {
        $(getCellObj_idx(p_this[key_aliasName], "SortG4")).attr("stopEdit","true");
        $(getCellObj_idx(p_this[key_aliasName], "SortG4")).css("color","transparent");
        $(getCellObj_idx(p_this[key_aliasName], "SortG6")).attr("stopEdit","true");
        $(getCellObj_idx(p_this[key_aliasName], "SortG6")).css("color","transparent");
    }
*/
}
			
			
			
		
			
			
        </script>
        <?php 
}
//end pageLoad



function list_query() {

    global $RealPid, $MisJoinPid, $logicPid, $parent_idx;
    global $flag, $app, $idx, $appSql, $resultCode, $resultMessage, $afterScript;
    global $countQuery, $selectQuery, $idx_aliasName;

	if($flag=="read" && $app=='프로그램체크') { 
    
        $selectQuery = splitVB($selectQuery, ') aaa where')[0] . ") aaa ";

	}

}
//end list_query



function list_json_load() {

    global $base_root, $RealPid, $MisJoinPid, $logicPid, $parent_idx;
    global $flag, $selField, $app, $idx, $appSql, $resultCode, $resultMessage, $afterScript;
    global $data, $key_aliasName, $child_alias, $selectQuery, $keyword, $menuName, $speed_aliasName_title;
	//$flag 는 목록조회시 'read'   내용조회시 'view'    수정시 'modify'   입력시 'write'
	//$selField 는 필터링을 하는 순간 발생하는 필드alias 값.

	//아래는 조회 또는 수정 시, addLogic 이라는 항목에 대해 만약 파일로 존재하는 php 파일이 있다면 해당파일로 바꿔서 json 에 반영하는 로직입니다.
    if($flag=="read" && $selField=="" && $app=='프로그램체크') { 

		$new_data = json_decode($data);
		$new_data_cnt = count($new_data);
		$update_sql = '';

		$query_txt = '';
		for($i=0;$i<$new_data_cnt;$i++) {
			$RealPidAliasName = $new_data[$i]->table_RealPidQnRealPid . '.' . $new_data[$i]->aliasName;
			$url = "http://mysql.speedmis.com/_mis/addLogic_treat.php?RealPid=speedmis000290&question=RealPidAliasName&RealPidAliasName=$RealPidAliasName";
			$mysql_value = file_get_contents_new($url);
			if($mysql_value!='' && $mysql_value!='[]') {
				$mysql_value = json_decode($mysql_value);
				$msg = '';
				foreach ($mysql_value[0] as $k=>$v) {
					$this_v = $new_data[$i]->$k;
					if(strtolower($this_v) != strtolower($v)) {
						if($speed_aliasName_title[$k]=='선택목록' || $speed_aliasName_title[$k]=='디폴트값') {
							if(InStr($v,'select ')==0) $msg = $speed_aliasName_title[$k] . ';';
							else if(abs(Len($this_v) - Len($v))>15) $msg = $speed_aliasName_title[$k] . ';';
						} else {
							$msg = $speed_aliasName_title[$k] . ';';
							if(InStr($k,'table_')==0) {
								$query_txt = $query_txt . " update MisMenuList_Detail set $k = N'" . sqlValueReplace($this_v) . "' where RealPidAliasName='$RealPidAliasName'; \n";
							}
						}
					}
					
				}
				if($msg=='') $msg = '같음'; else $msg = $msg . '다름';
				$new_data[$i]->check_result = $msg;
			} else {
				$msg = '없음';
				$new_data[$i]->check_result = $msg;
			}
			$detail_idx = $new_data[$i]->idx;
			$update_sql = $update_sql . " update MisMenuList_Detail set check_result = N'$msg' where idx=$detail_idx; ";
			if(Len($update_sql)>500) {
				execSql($update_sql);
				$update_sql = '';
			}
		}
		if($update_sql!='') execSql($update_sql);
		if($query_txt!='') $appSql = '/* ' . $query_txt . '*/';
		$data = json_encode($new_data);

    }

}
//end list_json_load

?>