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
    <?php if($ActionFlag=="modify" || $ActionFlag=="view") { ?>
    a#btn_delete {
        display: none;
    }
    <?php } ?>

</style>
        <script>
$('body').attr('auto_open_refuse','');	

function applyDownAuth(p_this, p_idx) {
    if(!confirm(getGridCellValue_idx(p_idx,'MenuName')+' 메뉴 하위의 '+getGridCellValue_idx(p_idx,'zhawiAPP')
    +'개 메뉴의 권한도 \n'+getGridCellValue_idx(p_idx,'table_new_gidxQngname')+' | '+getGridCellValue_idx(p_idx,'table_AuthCodeQnkname')
    +'\n로 바꾸시겠습니까?')) return false;
    $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "권한전달."+p_idx;
    $("#grid").data("kendoGrid").dataSource.read();
    $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "";
}

function addMenu(p_this) {
    url = 'index.php?RealPid=speedmis001170&idx='+$(p_this).attr('idx')+'&ActionFlag=write';
    parent_popup_jquery(url, getGridCellValue_idx($(p_this).attr('idx'),'MenuName') + ' 에 대한 ', 850, 600);
}
//사용자 정의 함수 = 함수 이름은 변형하면 안됨. 내용만. 없어도 됨. ==============================
//데이타의 변형은 즉시 가능 = rowFunction



function rowFunction_UserDefine(p_this) {
	if(p_this.AutoGubun!=null) {
		p_this.table_upIdxQnteamName = Left(p_this.AutoGubun, p_this.AutoGubun.length-2) + " " + p_this.table_upIdxQnteamName;
		//p_this.teamName = Mid(p_this.AutoGubun, 3, 2) + " " + p_this.teamName;
    }
}
<?php if($MisSession_IsAdmin=="Y" && $ActionFlag=="list") { ?>
    function thisLogic_toolbar() {
	
    $("a#btn_1").text("조직정렬");
    $("li#btn_1_overflow").text("조직정렬");
    $("#btn_1").css("background", "#88f");
    $("#btn_1").css("color", "#fff");
    $("#btn_1").click( function() {
		
        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "조직정렬";
        $("#grid").data("kendoGrid").dataSource.read();
        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "";
    });

    $("a#btn_2").text("<?php echo date("Y"); ?> 년도 조직도에 반영");
    $("li#btn_2_overflow").text("조직도반영");
    $("#btn_2").css("background", "#f88");
    $("#btn_2").css("color", "#fff");
    $("#btn_2").click( function() {
		
        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "조직도반영";
        $("#grid").data("kendoGrid").dataSource.read();
        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "";
    });


}
<?php } ?>

function thisLogic_view_after_resultAll(p_resultAll) {

<?php if($ActionFlag=="modify" || $ActionFlag=="view") { ?>
    
    setTimeout( function() {
        $('a#btn_delete').css('display','inline-block');
        
    },0);
    
<?php } ?>
}	

function addMenu(p_this,isChild) {
    this_idx = $(p_this).attr('idx');
    if(isChild==0) {
        teamName = prompt('같은 레벨로 추가할 조직명을 입력하세요');
        upIdx = $('div#grid').data('kendoGrid').dataSource._data[getGridRowIndex_idx(this_idx)]['upIdx'];
    } else {
        teamName = prompt('하위 레벨로 추가할 조직명을 입력하세요');
        upIdx = this_idx;
    }
    teamName = Trim(teamName);
    if(Len(teamName)==0 || teamName==false) return false;
    
    saveList = {"upIdx":upIdx,"teamName": teamName,"isMenuHidden":"N","SortG2":"99","SortG4":"99","SortG6":"99","remark":"","virtual_fieldQnmisPildokMem":""};
    saveList = JSON.stringify(saveList);
    key_aliasName = 'idx';
    key_value = 0;
    ActionFlag = 'write';
    RealPid = 'speedmis003022';
    jQuery.ajax({
        url: 'save.php',
        type: "post",
        data: { saveList, key_aliasName, key_value, ActionFlag, RealPid },
        dataType: "json",
        success:function(response)
        {
            if(response['resultCode']=='success') {
                $('a#btn_reload').click();
            } else {
                alert(response['resultMsg']);
            }
        }
    });
}
function columns_templete(p_dataItem, p_aliasName) {
    
    if(p_aliasName=="teamName") {
		if(p_dataItem['depth']=='1') var rValue = Left(p_dataItem['AutoGubun'],2) + ' '+p_dataItem[p_aliasName];
		else var rValue = '└'+Left('──────────',(p_dataItem['depth']*1-1)*2-1) + ' ' + p_dataItem[p_aliasName];
        return rValue;
    } else if(p_aliasName=="zchuga") {
		var rValue = "<a href='javascript:;' onclick='addMenu(this,0);' idx='"+p_dataItem["idx"]+"' class='k-button'>추가</a>";
        if(p_dataItem['depth']*1<=2) rValue = rValue +"<a href='javascript:;' onclick='addMenu(this,1);' idx='"+p_dataItem["idx"]+"' class='k-button'>자식추가</a>";
        return rValue;
    } else if(p_aliasName=="zgwonhanjeondal") {
		var rValue = "<a href='javascript:;' onclick='applyDownAuth(this,"+p_dataItem["idx"] + ");' class='k-button depth"+p_dataItem["depth"]+" zhawiAPP"+p_dataItem["zhawiAPP"]+"'>적용"+p_dataItem["zhawiAPP"]+"</a>";
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
	
	if(p_this.AutoGubun.length!=6) {
        $(getCellObj_idx(p_this[key_aliasName], "groupName")).attr("stopEdit","true");
        $(getCellObj_idx(p_this[key_aliasName], "groupName")).css("color","transparent");
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
        } else if($app=="조직도반영") {

            $yyyy = date("Y");
            $appSql = "

            IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='MisTeamTree_$yyyy' AND xtype='U') begin

            select 
            idx, teamName, groupName, SortG2, SortG4, SortG6, upIdx, AutoGubun, depth, docList, useflag, HIT, IP, remark, wdate, wdater, lastupdate, lastupdater, comment_count
            into MisTeamTree_$yyyy
            from MisTeamTree
            where isnull(isMenuHidden,'Y')<>'Y'  and useflag='1' order by idx
            
            
            
            end else begin
            delete MisTeamTree_$yyyy where concat(idx,';',teamName,';',groupName,';',AutoGubun,';',depth) not in 
            (select concat(idx,';',teamName,';',groupName,';',AutoGubun,';',depth) from MisTeamTree where isnull(isMenuHidden,'Y')<>'Y'  and useflag='1')
            
            SET IDENTITY_INSERT MisTeamTree_$yyyy ON 
            insert into MisTeamTree_$yyyy (idx, teamName, groupName, SortG2, SortG4, SortG6, upIdx, AutoGubun, depth, docList, useflag, HIT, IP, remark, wdate, wdater, lastupdate, lastupdater, comment_count)
            select 
            idx, teamName, groupName, SortG2, SortG4, SortG6, upIdx, AutoGubun, depth, docList, useflag, HIT, IP, remark, wdate, wdater, lastupdate, lastupdater, comment_count
            from MisTeamTree
            where isnull(isMenuHidden,'Y')<>'Y'  and useflag='1' and idx not in (select idx from MisTeamTree_$yyyy)
            order by idx
            end            
            ";
                
        
            
            if(execSql($appSql)) {
                $resultCode = "success";
                $resultMessage = "금년 $yyyy 조직도에 반영되었습니다.";
            } else {
                $resultCode = "fail";
                $resultMessage = "금년 $yyyy 조직도 반영처리가 실패하였습니다.";
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