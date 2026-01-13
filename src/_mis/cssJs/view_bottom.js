
if(getID("ActionFlag").value=="write" || getID("ActionFlag").value=="modify") {
	$("#frm div.row").kendoValidator().data("kendoValidator");
}



if(isMainFrame()) {
  

} else {
	$("div.form-group.round_child").parent().css("padding-right",0);

	if(windowID()!="" && windowID()!="grid_right" && windowID()!="grid_bottom" && InStr(windowID(), "ifr_window")==0) {
		//이럴 경우, 닫기버튼은 필요 없음.
		if($("a#btn_close")[0]) $("a#btn_close")[0].outerHTML = "";
		if($("li#btn_close_overflow")[0]) $("li#btn_close_overflow")[0].outerHTML = "";
		if($("a#btn_saveClose")[0]) $("a#btn_saveClose")[0].outerHTML = "";
		if($("li#btn_saveClose_overflow")[0]) $("li#btn_saveClose_overflow")[0].outerHTML = "";
		if($("a#btn_close")[0]) $("a#btn_close")[0].outerHTML = "";
		if($("li#btn_close_overflow")[0]) $("li#btn_close_overflow")[0].outerHTML = "";
	}

	if($("#isIframe").val()=="Y") {
		if(parent.$('div#dialog iframe').attr('src')!=undefined) {
			$("body").attr("isDialog","Y");
		}
	}	
	$('div#main').mouseenter( function() {
		resize_ifr_split();
	});
	
}





$("input.isPassSave").click( function() {
	if(this.checked) {
		$(document.getElementById($(this).attr("key"))).css("pointer-events","all");
		$(document.getElementById($(this).attr("key"))).attr("data-textdecrypt2-field","name");
		document.getElementById($(this).attr("key")).disabled = false;
		document.getElementById($(this).attr("key")).focus();
    } else {
		$(document.getElementById($(this).attr("key"))).removeAttr("data-textdecrypt2-field");
		document.getElementById($(this).attr("key")).value = "";
		document.getElementById($(this).attr("key")).disabled = true;
    }
});

if(getID("isDeleteList").value=="Y") {
	$("body").attr("isDeleteList", "Y");
}
/*
window.onbeforeunload = function() {
	return true;
}
*/

$(document).ready( function() {

	if(getID("ActionFlag").value=="modify" || getID("ActionFlag").value=="write") {
		
		$('div.round_dropdowntree').each( function() {
			key = replaceAll(this.id,'round_','');
			$('label[for="'+key+'"]').append('<span class="selectAll"><input type="checkbox" id="chbAll" class="k-checkbox" onchange="treeview_chbAllOnChange(this);"><label class="k-checkbox-label" for="chbAll"></label></span>');
		});

		setTimeout( function() {
			$('span.alim').each(function(index, item){ 
				item.title = item.innerText;
			});
		});

		
	}

	$('span.hr').each( function() {
		inx = $(this).closest('div.form-group').parent().find('div.form-group').index($(this).closest('div.form-group'));
		before_class = 'before_'+$(this).closest('div.form-group').attr('id');
		if($(this).closest('div.form-group').hasClass('hide')) {
			$($(this).closest('div.form-group').parent().find('div.form-group')[inx]).before(`<div class="form-group round_nocontrol row col-xs-12 col-lg-12 hide subtitle `+before_class+`" data-role="validator">
			<label class="col-xs-4 col-md-4 col-form-label">`+this.innerText+`
			</label><div class="nocontrol"></div>
			</div>`);
		} else {
			$($(this).closest('div.form-group').parent().find('div.form-group')[inx]).before(`<div class="form-group round_nocontrol row col-xs-12 col-lg-12 subtitle `+before_class+`" data-role="validator">
			<label class="col-xs-4 col-md-4 col-form-label">`+this.innerText+`
			</label><div class="nocontrol"></div>
			</div>`);
		}
	});
	$('span.hr_in').each( function(i,t) {
		if(i>0) {
			inx0 = $('div.form-group.row').index($($('span.hr_in')[i-1]).closest('div.form-group'));
			inx = $('div.form-group.row').index($($('span.hr_in')[i]).closest('div.form-group'));
			round_id = 'g_'+$('div.form-group.row')[inx-1].id;
			if(inx0+1<inx) {
				$('div.form-group.row').slice(inx0+1, inx+2).addClass(round_id);
				$($('div.form-group.row')[inx0]).after('<div class="round_bottom_line '+round_id+'"></div>');
			} else if($('span.hr_in').length-1==i) {
				$('div.form-group.row').slice(i+1, inx+2).addClass(round_id);
				$($('span.hr_in')[i]).closest('div.form-group').after('<div class="round_bottom_line '+round_id+'"></div>');
			}
		}
	});
	
	setTimeout( function() {
        if(isMainFrame()) {
			if(getUrlParameter('tabid')!=undefined) {
				setTimeout( function() {
					setTimeout( function() {
		
						$('li[tabid="'+getUrlParameter('tabid')+'"]').click();
			
					},100);
				},100);
			}
        } else {
            if(parent.$('li[tabid="'+getID('RealPid').value+'"]')[0]) {
                tag = parent.$('li[tabid="'+getID('RealPid').value+'"] span.k-link')[0].innerHTML;
                if(InStr(tag,'<')>0) tag = '<'+tag.split('<')[1]; else tag = '';
                parent.$('li[tabid="'+getID('RealPid').value+'"] span.k-link')[0].innerHTML = getID('MenuName').value+tag;
            }
			$('body').mouseenter( function() {
				if(parent.$('style#themechooser_style')[0]) {
					//parent.$('style#themechooser_style')[0].innerHTML = '';
					if(typeof parent.gridHeight=='function') parent.gridHeight();
				}
			});
            $('body[isMenuIn="N"][actionflag="view"] .viewPrintDivRound').closest('div[tabnumber').css('overflow-x','auto');
        }

		setTimeout( function() {
			$('div[data-role="tabstrip"]').css("visibility", "visible");		//500은 되야 파싱 후 보임
    	},500);
    });
	

	if(getUrlParameter('isMenuIn')!='S' && (document.getElementById('ActionFlag').value=='view' || document.getElementById('ActionFlag').value=='modify') && isMainFrame() || windowID()=='grid_right') {
		
			
		if(document.getElementById('userDefine_page_print')==null && $('li[tabnumber="1"]').is(":visible") && (getCookie('rframe')=='2') && $('body').width()>=600) {
			tabnumber = $('div[tabnumber] iframe').closest('div[tabnumber]').attr('tabnumber');
			
			if(tabnumber!=undefined) {
				objLi = $('li[tabnumber="'+tabnumber+'"]');
				if(objLi.is(":visible")==false) {
					tabnumber = undefined;
				}
				/* else if(getCookie('rframe')=='12') {
					if(objLi.attr('tabid')=='speedmis000974' || objLi.attr('tabid')=='speedmis000979') {
						tabnumber = undefined;
					}
				}*/

				if(tabnumber!=undefined) {
					$('div[tabnumber]').css('width','50%');
					$('div[tabnumber="1"]').addClass('rframe_main');
					$('div[tabnumber="1"]').parent().addClass('rframe_area');
					loadjscssfile('/_mis/cssJs/rframe_main.css','css');
					objTab = $('div[tabnumber="'+tabnumber+'"]');
					objTab.css('width','calc(50% - 28px)');
					objTab.css('top','37px');
					objTab[0].style.setProperty("display", "block", "important");
					objTab.css('position','absolute');
					objTab.css('padding','0');
					objTab.css('right','0');
					objTab.css('height','calc(100% - 43px)');
					objTab.css('overflow','hidden');
		

					objLi.css('right','15px');
					objLi.css('pointer-events','none');
					objLi.css('visibility','hidden');
					objLi.addClass('k-state-active');

					setTimeout( function(p_objLi) {
						p_objLi.css('position','fixed');
						p_objLi.css('visibility','visible');
					},1000,objLi);
					
				}

			}
		}
	
	}



});

$('a.k-button.save').click( function() {
	$('a#btn_save').click();
});
$('a.k-button.reset').click( function() {
	aa = confirm(`양식을 지우시겠습니까?`);
	if(!aa) return false;
	location.href = location.href;
});
$('a.k-button.modify').click( function() {
	location.href = replaceAll(location.href,'&ActionFlag=view','')+'&ActionFlag=modify';
});