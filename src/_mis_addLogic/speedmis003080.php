<?php

function pageLoad() {

    global $ActionFlag, $RealPid, $parent_idx, $idx;
	global $MisSession_UserID, $MisSession_IsAdmin, $parent_RealPid;
/*
	//특정상황에서 페이지를 이동시키는 예제입니다.
	if($ActionFlag=='list' && $parent_RealPid=='speedmis000028') {
		$target_parent_gubun = RealPidIntoGubun('speedmis001071');
		$url = "index.php?RealPid=$RealPid&parent_gubun=$target_parent_gubun&parent_idx=$parent_idx";
		re_direct($url);
	}
*/
	$sql = "EXECUTE MisCompany_Ordering_Proc ";
	execSql($sql);
        ?>

<style>
/* 필요할 경우, 해당프로그램에 추가할 css 를 넣으세요 */
.k-grid tbody .k-button {
    margin: 0;
    min-width: 23px;
}
	
</style>


        <script>
			
//아래 한줄의 주석문을 풀면 리스트 상에서 내용조회나 수정으로 접근할 수 없습니다.
$('body').attr('onlylist','');			
//아래 한줄의 주석문을 풀면 리스트 상에서 목록1개만 로딩되어도 자동내용열림을 방지할 수 있습니다.
//$('body').attr('auto_open_refuse','');	
			
//간편추가 쿼리를 팝업이 아닌, 현재창에서 진행합니다.			
//$('body').attr('brief_insert_this_page','');
			
			
//엑셀을 이용한 인쇄폼에서 PDF 로 저장할 경우, 또는 인쇄폼에서 PDF 로 저장할 경우 용지나 여백을 조정해야할 경우.
/*
function thisPage_options_pdf() {
    return {
        paperSize: "A4",
		scale: 0.567,
		landscape: false,
		margin: { left: "0.2cm", top: "0.9cm", right: "1.0cm", bottom: "0.5cm" }
    }
}
*/
function move_company(p_this, p_move) {
	idx = $(p_this).attr('idx');
	url = "addLogic_treat.php?RealPid=<?=$RealPid?>&question=move&idx="+idx+"&move="+p_move;
	result = ajax_url_return(url);
	if(result=='success') {
		$("#grid").data("kendoGrid").dataSource.read();
	} else {
		alert('이동에 실패하였습니다. 잠시후 다시 시도해 주십시오.');
	}
}
function add_company(p_this, p_add, p_depth) {
	add_name = prompt('추가할 거래처명을 입력하세요.', '');
	if(add_name==null || add_name=='') {
		return;
	}
	idx = $(p_this).attr('idx');
	url = "addLogic_treat.php?RealPid=<?=$RealPid?>&question=add&idx="+idx+"&add="+p_add+"&depth="+p_depth+"&add_name="+encodeURI(add_name);
	temp = ajax_url_return(url);
	$("#grid").data("kendoGrid").dataSource.read();
}
			
function open_info(p_this) {
	teamName = $(p_this).attr('teamName');
	idx = $(p_this).attr('idx');
	url = 'index.php?gubun=733&idx='+idx+'&ActionFlag=modify';
	parent_popup_jquery(url, teamName+' 수정', 800, 600, true);
}

function columns_templete(p_dataItem, p_aliasName) {

	rValue0 = '';
	rValue1 = '';
    if(p_aliasName=='g4name') {
		if(p_dataItem['AutoGubun']!='0000' && Len(p_dataItem['AutoGubun'])==4) {
		rValue0 = `
<a onclick="add_company(this,'down',1);" idx="`+p_dataItem['idx']+`" class="k-button" title="바로 아래에 거래처추가">+</a>
`;
		} else if(p_dataItem['AutoGubun']=='0000') {
		rValue0 = `
<a onclick="add_company(this,'down',1);" idx="`+p_dataItem['idx']+`" class="k-button" title="바로 아래에 거래처추가">+</a>
`;
		} else {
			rValue0 = `
<a class="k-button invisible"></a>
`;
		}
		if(p_dataItem['AutoGubun']!='0000' && Len(p_dataItem['AutoGubun'])==4 ) {
			rValue1 = `
<a onclick="move_company(this,'top');" idx="`+p_dataItem['idx']+`" class="k-button hide"`+iif(p_dataItem['AutoGubun']=='0001',' disabled','')+` title="맨위로 이동">↑</a>
<a onclick="move_company(this,'up');" idx="`+p_dataItem['idx']+`" class="k-button"`+iif(p_dataItem['AutoGubun']=='0001',' disabled','')+` title="한칸 위로 이동">▲</a>
<a onclick="move_company(this,'down');" idx="`+p_dataItem['idx']+`" class="k-button" title="한칸 아래로 이동">▼</a>
<a onclick="move_company(this,'bottom');" idx="`+p_dataItem['idx']+`" class="k-button hide" title="맨 아래로 이동">↓</a>
`;
		}
		rValue = rValue0+' '+p_dataItem[p_aliasName]+'<div style="display:inline;line-height: 250%;">'+rValue1+'</div>';
        return rValue;
    } else if(p_aliasName=='g8name') {
		if(p_dataItem['AutoGubun']!='0000' && Len(p_dataItem['AutoGubun'])>=4 && Len(p_dataItem['AutoGubun'])<=8) {
			rValue0 = `
<a onclick="add_company(this,'down',2);" idx="`+p_dataItem['idx']+`" class="k-button" title="바로 아래에 거래처추가">+</a>
`;
		} else {
			rValue0 = `
<a class="k-button invisible"></a>
`;
		}
		if(Len(p_dataItem['AutoGubun'])==8) {
			rValue1 = `
<a onclick="move_company(this,'top');" idx="`+p_dataItem['idx']+`" class="k-button hide"`+iif(Right(p_dataItem['AutoGubun'],4)=='0001',' disabled','')+` title="맨위로 이동">↑</a>
<a onclick="move_company(this,'up');" idx="`+p_dataItem['idx']+`" class="k-button"`+iif(Right(p_dataItem['AutoGubun'],4)=='0001',' disabled','')+` title="한칸 위로 이동">▲</a>
<a onclick="move_company(this,'down');" idx="`+p_dataItem['idx']+`" class="k-button" title="한칸 아래로 이동">▼</a>
<a onclick="move_company(this,'bottom');" idx="`+p_dataItem['idx']+`" class="k-button hide" title="맨 아래로 이동">↓</a>
`;
		}
		rValue = rValue0+' '+p_dataItem[p_aliasName]+'<div style="display:inline;line-height: 250%;">'+rValue1+'</div>';
        return rValue;
    } else if(p_aliasName=='g12name') {
		if(Len(p_dataItem['AutoGubun'])>=8 && Len(p_dataItem['AutoGubun'])<=12) {
			rValue0 = `
<a onclick="add_company(this,'down',3);" idx="`+p_dataItem['idx']+`" class="k-button" title="바로 아래에 거래처추가">+</a>
`;
		} else {
			rValue0 = `
<a class="k-button invisible"></a>
`;
		}
		if(Len(p_dataItem['AutoGubun'])==12) {
			rValue1 = `
<a onclick="move_company(this,'top');" idx="`+p_dataItem['idx']+`" class="k-button hide"`+iif(Right(p_dataItem['AutoGubun'],4)=='0001',' disabled','')+` title="맨위로 이동">↑</a>
<a onclick="move_company(this,'up');" idx="`+p_dataItem['idx']+`" class="k-button"`+iif(Right(p_dataItem['AutoGubun'],4)=='0001',' disabled','')+` title="한칸 위로 이동">▲</a>
<a onclick="move_company(this,'down');" idx="`+p_dataItem['idx']+`" class="k-button" title="한칸 아래로 이동">▼</a>
<a onclick="move_company(this,'bottom');" idx="`+p_dataItem['idx']+`" class="k-button hide" title="맨 아래로 이동">↓</a>
`;
		}
		rValue = rValue0+' '+p_dataItem[p_aliasName]+'<div style="display:inline;line-height: 250%;">'+rValue1+'</div>';
        return rValue;
    } else if(p_aliasName=='virtual_fieldQninfo') {
		teamName = '';
		if(Len(p_dataItem['AutoGubun'])==12) {
			teamName = p_dataItem['g12name'];
		} else if(Len(p_dataItem['AutoGubun'])==8) {
			teamName = p_dataItem['g8name'];
		} else if(Len(p_dataItem['AutoGubun'])==4) {
			teamName = p_dataItem['g4name'];
		}
		var rValue = `
<a onclick="open_info(this);" class="k-button" idx="`+p_dataItem['idx']+`" teamName="`+teamName+`">수정</a>
`;
		if(p_dataItem['AutoGubun']=='0000') {
			rValue = '';
		}
        return rValue;
    } else {
        return p_dataItem[p_aliasName];
    }
}
			
			
//아래의 함수는 목록에서만 해당되며, 템플릿으로 정의하지 않아도 특정항목의 값이나 태그를 추가할 수 있습니다. 
//row 갯수만큼 실행됩니다.
function rowFunction_UserDefine(p_this) {
/*
	p_this.MenuName = p_this.depth + p_this.LanguageCode; 
    p_this.AutoGubun = 
    "<a href=index.asp?gubun=" + p_this.idx + "&isMenuIn=Y target=_blank>[Go]</a> <a id='aid_" + p_this.idx + "' href=index.asp?RealPid=speedmis000266&idx=" + p_this.idx + "&isMenuIn=Y target=_blank>[Source]</a>?" 
    + p_this.AutoGubun;
*/
}

			
//아래는 그리드의 로딩이 거의 끝난 후, 항목에 스타일 시트를 적용하는 예입니다. 스타일 등을 직접 변경하려면 이 함수를 이용해야 합니다.
//row 갯수만큼 실행됩니다.
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
			
<?php 
//해당프로그램의 관리자 권한을 가진 사용자는 $MisSession_IsAdmin=='Y' 입니다. 필요 시, 여러 부분에서 해당 조건을 넣어 사용하세요.
//if($MisSession_IsAdmin=='Y' && $ActionFlag=='list') { 
			
//}
?>
//사용자 정의버튼 생성 예제입니다.
//툴바 명령버튼에 btn_1 이라고 하는 예비버튼을 "적용" 이라는 기능을 넣고, 클릭 시, 그리드에 app="적용" 이라는 신호로 보냅니다.
//이때 app=="적용" 에 대한 처리는 개발Tip 의 list_json_init() 를 참조하세요.
function thisLogic_toolbar() {
/*
    $("a#btn_1").text("적용");
    $("li#btn_1_overflow").text("적용");
    $("#btn_1").css("background", "#88f");
    $("#btn_1").css("color", "#fff");
    $("#btn_1").click( function() {
        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "적용";
        $("#grid").data("kendoGrid").dataSource.read();
        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "";
    });
*/
}

//목록에서 grid 로드 후 한번만 실행됨, 이때 처리해야할 일반 스크립트를 삽입합니다.
function listLogic_afterLoad_once()	{
	grid_remove_sort();    //그리드의 상단 정렬 기능 제거를 원할 경우.
	
}
			
//목록에서 grid 로드 후 데이터 로딩마다 실행됨, 이때 처리해야할 일반 스크립트를 삽입합니다.		
function listLogic_afterLoad_continue()	{
	
	
}

function helpboxLogic_afterSelect(p_actionFlag, p_opener, p_sel_alias, p_sel_value) {
	//dropdownlist 에 의한 helplist (popup) 선택 직후 추가 작업이 필요할 경우 사용합니다.
	/*
	if(p_actionFlag=='write' && p_sel_alias=='TUNE_CD') {
		v = p_sel_value;
		//p_opener.$('input#vTUNE_CD')[0].value = v;
	}
	*/
	
}

//업무용 MIS 의 목록형태가 save_templist 일 경우, 데이터가 추가될때마다 자동화면clear 대신 임의설정을 하고자할때 활성화 시켜서 사용할 것.
/*			
function templist_write_form_clear() {
    
	//자동 forme clear
    //write_form_clear();  
	
	//입력컨트롤 중에 첫째 컨트롤에 포커스를 맞춤
    //if($('form#frm input[type="text"][data-role]:visible')[0]) {
    //    $($('form#frm input[type="text"][data-role]:visible')[0]).focus();
    //}
    
    //임의의 특정컨트롤에 포커스를 맞춤.
	//$('input#BARCODE').focus();
}
*/
			
//내용조회 또는 수정/입력 페이지 로딩이 끝나는 순간 한번만 실행됨, 이때 처리해야할 일반 스크립트를 삽입합니다.
function viewLogic_afterLoad() {

	//debugger;
	//console.log(resultAll);
	//console.log(resultAll.d.results[0]);
	
	
	//각탭에 html 에디터를 통해 pdf 업로드나 pdf 링크가 href 가 1개만 있으면 뷰어로 변신
	//tab_pdf_into_viewer();

	//특정항목에 대한 내용을 바꾸는 코딩
    //$('div#table_mQmidx')[0].innerText = resultAll.d.results[0].table_mQmidx;
	
	//특정 tabid 를 넣으면 해당 탭이 먼저 열린다. 아래는 wdate 를 넣어서 등록정보 탭이 열리는 예제.
	//if($('input#ActionFlag')[0].value=='view') $('li[tabid="viewPrint"]').attr('active_tabid','wdate');


}			
//내용조회 또는 수정/입력 페이지 로딩이 끝난 후, 데이터 호출때마다 실행됨. 
function viewLogic_afterLoad_continue() {

	//debugger;
	//console.log(resultAll);
	//console.log(resultAll.d.results[0]);
	

}	
			
			
//사용자 정의 인쇄폼의 로딩이 완료될때 처리해야할 스크립트를 삽입합니다.
function viewLogic_afterLoad_viewPrint() {
	
	//아래는 특정이미지를 하단에 넣는 예제입니다.
	//$('div.viewPrint').append('<img style="position: absolute;bottom: 32px;left: 35px;width: 200px;" src="/_mis/img/speedmis_wide.png">');
	
}			

			
//입력 또는 수정 폼에서 우편번호 팝업 선택 직후, 추가로직을 넣을 수 있습니다. 아주 간혹 필요합니다.
/*
function addLogic_zipcode(zipdata) {
		//sido / sigungu / bname / jibunAddress
	$('input#dodo')[0].value = zipdata.sido.split(' ')[0];
	$('input#sigunggu')[0].value = zipdata.sigungu.split(' ')[0];
	$('input#dongmyeon')[0].value = zipdata.bname.split(' ')[0];
	$('input#beonji')[0].value = zipdata.jibunAddress.split(zipdata.bname+' ')[1];
}	
*/		
			
        </script>
        <?php 
}
//end pageLoad



function addLogic_treat() {
	
	global $MisSession_UserID;
	
	//addLogic_treat 함수는 ajax 로 요청되어진(url 형식) 것에 대한 출력문입니다. echo 등으로 출력내용만 표시하면 됩니다.
	//아래는 url 에 동반된 파라메터의 예입니다.
	//해당 예제 TIP 의 기본폼에 보면 addLogic_treat 를 호출하는 코딩이 있습니다.

	$question = requestVB("question");
	$p_idx = requestVB("idx");
	$p_move = requestVB("move");
	$p_add = requestVB("add");

	//아래는 값에 따라 mysql 서버를 통해 알맞는 값을 출력하여 보냅니다.
	if($question=="move") {
		$sql = " select SortG2,SortG4,SortG6,SortG8,SortG10,depth from MisCompanyMgt where idx='$p_idx' ";
		$r = allreturnSql($sql);
		$depth = $r[0]['depth'];
		$SortG2 = $r[0]['SortG2'];
		$SortG4 = $r[0]['SortG4'];
		$SortG6 = $r[0]['SortG6'];
		$SortG8 = $r[0]['SortG8'];
		$SortG10 = $r[0]['SortG10'];
		if($depth==1) {
			if($p_move=='top') {
				$SortG2 = '0.5';
			} else if($p_move=='up') {
				$SortG2 = $SortG2 - 1.5;
			} else if($p_move=='down') {
				$SortG2 = $SortG2 + 1.5;
			} else if($p_move=='bottom') {
				$SortG2 = '9999';
			}
		} else if($depth==2) {
			if($p_move=='top') {
				$SortG4 = '0.5';
			} else if($p_move=='up') {
				$SortG4 = $SortG4 - 1.5;
			} else if($p_move=='down') {
				$SortG4 = $SortG4 + 1.5;
			} else if($p_move=='bottom') {
				$SortG4 = '9999';
			}
		} else if($depth==3) {
			if($p_move=='top') {
				$SortG6 = '0.5';
			} else if($p_move=='up') {
				$SortG6 = $SortG6 - 1.5;
			} else if($p_move=='down') {
				$SortG6 = $SortG6 + 1.5;
			} else if($p_move=='bottom') {
				$SortG6 = '9999';
			}
		} else if($depth==4) {
			if($p_move=='top') {
				$SortG8 = '0.5';
			} else if($p_move=='up') {
				$SortG8 = $SortG8 - 1.5;
			} else if($p_move=='down') {
				$SortG8 = $SortG8 + 1.5;
			} else if($p_move=='bottom') {
				$SortG8 = '9999';
			}
		} else if($depth==5) {
			if($p_move=='top') {
				$SortG10 = '0.5';
			} else if($p_move=='up') {
				$SortG10 = $SortG10 - 1.5;
			} else if($p_move=='down') {
				$SortG10 = $SortG10 + 1.5;
			} else if($p_move=='bottom') {
				$SortG10 = '9999';
			}
		}
		$sql = " 
		update MisCompanyMgt set SortG2='$SortG2',SortG4='$SortG4',SortG6='$SortG6',SortG8='$SortG8',SortG10='$SortG10' where idx='$p_idx';
		EXECUTE MisCompany_Ordering_Proc;
		";
		//echo $sql;
		execSql($sql);
		echo 'success';
		
	} else if($question=="add") {
		$sql = " select SortG2,SortG4,SortG6,SortG8,SortG10,upidx,depth from MisCompanyMgt where idx='$p_idx' ";
		$r = allreturnSql($sql);
		$p_depth = requestVB('depth');
		$SortG2 = $r[0]['SortG2'];
		$SortG4 = $r[0]['SortG4'];
		$SortG6 = $r[0]['SortG6'];
		$SortG8 = $r[0]['SortG8'];
		$SortG10 = $r[0]['SortG10'];
		$upidx = $r[0]['upidx'];
		$depth = $r[0]['depth'];
		if($p_depth!= $depth) {
			$upidx = $p_idx;
			$depth = $p_depth;
		}
		
		$add_name = requestVB("add_name");
		$add_name = str_replace("'", "", $add_name);

		if($depth==1) {
			if($p_add=='top') {
				$SortG2 = '0.5';
			} else if($p_add=='up') {
				$SortG2 = $SortG2 - 0.5;
			} else if($p_add=='down') {
				$SortG2 = $SortG2 + 0.5;
			} else if($p_add=='bottom') {
				$SortG2 = '9999';
			}
		} else if($depth==2) {
			if($p_add=='top') {
				$SortG4 = '0.5';
			} else if($p_add=='up') {
				$SortG4 = $SortG4 - 0.5;
			} else if($p_add=='down') {
				$SortG4 = $SortG4 + 0.5;
			} else if($p_add=='bottom') {
				$SortG4 = '9999';
			}
		} else if($depth==3) {
			if($p_add=='top') {
				$SortG6 = '0.5';
			} else if($p_add=='up') {
				$SortG6 = $SortG6 - 0.5;
			} else if($p_add=='down') {
				$SortG6 = $SortG6 + 0.5;
			} else if($p_add=='bottom') {
				$SortG6 = '9999';
			}
		} else if($depth==4) {
			if($p_add=='top') {
				$SortG8 = '0.5';
			} else if($p_add=='up') {
				$SortG8 = $SortG8 - 0.5;
			} else if($p_add=='down') {
				$SortG8 = $SortG8 + 0.5;
			} else if($p_add=='bottom') {
				$SortG8 = '9999';
			}
		} else if($depth==5) {
			if($p_add=='top') {
				$SortG10 = '0.5';
			} else if($p_add=='up') {
				$SortG10 = $SortG10 - 0.5;
			} else if($p_add=='down') {
				$SortG10 = $SortG10 + 0.5;
			} else if($p_add=='bottom') {
				$SortG10 = '9999';
			}
		}
		$sql = " 
		insert into MisCompanyMgt (거래처명, upidx, SortG2, SortG4, SortG6, SortG8, SortG10, depth, wdater) 
		values (N'$add_name', $upidx, '$SortG2', '$SortG4', '$SortG6', '$SortG8', '$SortG10', '$depth', N'$MisSession_UserID');
		EXECUTE MisCompany_Ordering_Proc;
		";
		//echo $sql;exit;
		execSql($sql);
		echo 'success';
		
	}
}
//end addLogic_treat

?>