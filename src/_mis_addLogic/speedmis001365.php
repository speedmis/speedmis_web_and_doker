<?php

function pageLoad() {

    global $ActionFlag,$paidKey_ucount,$full_siteID;
	global $MisSession_IsAdmin, $RealPid, $MenuType, $idx;


        ?>
<style>
	
	body[actionflag="list"] .k-grid tbody .k-button {
        min-width: auto;
	}
    a.depth0,a.depth3,a.zhawiAPP0 {
        display: none;
    }

    a#btn_spreadsheets_url {
        display: none;
    }
    .td_div a {
        display: block;
    }
</style>
        <script>
$('body').attr('onlylist','');

function rowFunction_UserDefine(p_this) {
	//if(p_this.AutoGubun!=null) {
		//p_this.table_upIdxQnteamName = Left(p_this.AutoGubun, p_this.AutoGubun.length-2) + " " + p_this.table_upIdxQnteamName;
    //}
}
//목록에서 grid 로드 후 한번만 실행됨, 이때 처리해야할 일반 스크립트를 삽입합니다.
function listLogic_afterLoad_once()	{
	//grid_remove_sort();    //그리드의 상단 정렬 기능 제거를 원할 경우.
    $('input.k-checkbox').remove();
	
}

function doGet(upIdx) {
    exec_url = 'https://script.google.com/macros/s/AKfycbz6nkezrY2y0SbwENc3p9QP7rhWFXnOedyDTXoHr7pepwaCW3Wb45xxbM5DRnK5D9U0/exec';
    
    exec_url = exec_url + '?RealPid='+$('input#RealPid')[0].value+'&upIdx='+upIdx;
    displayLoading_long();
    setTimeout( function() {
        result = ajax_url_return(exec_url);
        if(JSON.parse(result)['result']=='success') {
            $("#grid").data("kendoGrid").dataSource.read();
            alert('처리가 완료되었습니다.');
        } else {
            alert('처리가 실패되었습니다.');
        } 

    },100);
}

function thisLogic_toolbar() {
	
    //$("a#btn_1").text("전체내역 새로고침");
    //$("a#btn_1").attr("title","1분 이상 소요될 수 있습니다.");
    //$("li#btn_1_overflow").text("전체내역 새로고침");
    //$("#btn_1").css("background", "#88f");
    //$("#btn_1").css("color", "#fff");
    $("#btn_1").click( function() {
        doGet('0');
    });

}


function columns_templete(p_dataItem, p_aliasName) {
    
    if(p_aliasName=="zjojingmyeong") {
        if(p_dataItem['upIdx']=='1' || p_dataItem['idx']=='1') {
            rValue = p_dataItem[p_aliasName]+`<a href="javascript:;" onclick="doGet(`+p_dataItem["idx"]+`);" 
            style="margin-left:5px;background: transparent;border: 0;" class="k-button">
            <span style="margin:0;top: -2px;" class="k-icon k-i-k-icon k-i-reload"></span></a>`;
        } else {
            rValue = p_dataItem[p_aliasName];
        }
        return rValue;
    } else {
        return p_dataItem[p_aliasName];
    }
}

			
			
//스타일 등의 변형은 로딩후에 가능 = rowFunctionAfter
function rowFunctionAfter_UserDefine(p_this) {

	if(p_this.AutoGubun==null) {
		
	} else if(p_this.AutoGubun.length==6) {
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

    if(InStr(p_this.zsangwimenyubyeolbogi,'Global Admin')>0) {
        $('td[keyidx="'+p_this.idx+'"] > input')[0].disabled = true;
    }

}      
        </script>
        <?php 
}
//end pageLoad



function list_json_init() {
	global $RealPid, $MisJoinPid, $logicPid, $parent_idx, $full_siteID, $MS_MJ_MY;
    global $flag, $app, $idx, $appSql, $resultCode, $resultMessage, $afterScript, $base_domain;

    if($flag=="read") { 
        if($app=="조직정렬") {

            
            $appSql = "EXECUTE MisTeamTree_Proc ";
                
        
            
            if(execSql($appSql)) {
                $resultCode = "success";
                $resultMessage = "조직정렬이 완료되었습니다.";
            } else {
                $resultCode = "fail";
                $resultMessage = "조직정렬 처리가 실패하였습니다.";
            }
        }

    }
}
//end list_json_init



function save_writeBefore() {

    global $full_siteID, $base_root, $RealPid, $MisJoinPid, $logicPid, $parent_idx;
    global $key_aliasName, $key_value, $ActionFlag, $updateList;

	$NewIdx = onlyOnereturnSql("select IDENT_CURRENT('MisTeamTree') + 1");
    
    if($updateList["upIdx"]=='1') {
        $AutoGubun = '99';
        $updateList["AutoGubun"] = $AutoGubun;
        $updateList["SortG2"] = '99';
    } else {
        $AutoGubun = onlyOnereturnSql("select AutoGubun from MisTeamTree where idx='" . $updateList["upIdx"] . "'");
        $AutoGubun = $AutoGubun . "99";
        $updateList["AutoGubun"] = $AutoGubun;
        $updateList["SortG2"] = Left($AutoGubun,2);
    }

	if(Len($AutoGubun)==2) {
		$updateList["SortG4"] = 0;
		$updateList["SortG6"] = 0;
	} else if(Len($AutoGubun)==4) {
		$updateList["SortG4"] = '99';
		$updateList["SortG6"] = 0;
	} else {
		$updateList["SortG4"] = Mid($AutoGubun,3,2);
		$updateList["SortG6"] = 99;
    }

	//print_r($updateList);
	//exit;

}
//end save_writeBefore



function save_writeAfter() {

    global $base_root, $RealPid, $MisJoinPid, $logicPid, $parent_idx, $full_siteID, $MS_MJ_MY;
    global $key_aliasName, $key_value, $saveList, $saveUploadList, $viewList, $deleteList;
    global $Grid_Default, $ActionFlag, $MisSession_UserID, $newIdx;
    global $afterScript;

    
    $appSql = "exec MisTeamTree_Proc ";

  	execSql($appSql);

	setcookie("newLogin", "Y", 0, "/");

}
//end save_writeAfter



function save_deleteBefore() {

    global $full_siteID, $base_root, $RealPid, $MisJoinPid, $logicPid, $parent_idx;
    global $key_aliasName, $key_value, $ActionFlag, $sql_prev, $sql, $sql_next, $deleteList, $MS_MJ_MY;


    $sql_next = "exec MisTeamTree_Proc ";

    
    setcookie("newLogin", "Y", 0, "/");
}
//end save_deleteBefore



function addLogic_treat() {
	
    global $MisSession_UserID;
    
    //addLogic_treat 함수는 ajax 로 요청되어진(url 형식) 것에 대한 출력문입니다. echo 등으로 출력내용만 표시하면 됩니다.
    //아래는 url 에 동반된 파라메터의 예입니다.
    //해당 예제 TIP 의 기본폼에 보면 addLogic_treat 를 호출하는 코딩이 있습니다.

    $question = requestVB("question");
    $v = requestVB("v");
    

    
    if($question=="pid_name") {
        $sql = " select menuName from MisTeamTree where RealPid='$v' ";
        echo onlyOnereturnSql($sql);
    }

}
//end addLogic_treat

?>