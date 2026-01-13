$(document).ready( function() {
	
	if(!$('body').is(':visible')) return false;
	setTimeout( function() {

		//언어별 번역은 각 고객사에서 자체관리함, 큰 범위에서 작은범위로 좁혀짐.

		//1. 항상 적용되는 요소에 대한 번역 -------------------------------------------------
		changeText($('.themechooser .tc-activator'), 'Setting');
		changeText($('a#back-forward'), 'All Menu');

		//1a. 항상 적용되지만, 쩜쩜 영역을 클릭할 때만 번역 -------------------------------------------------
		$('#toolbar .k-overflow-anchor.k-button').click( function() {

			changeText($('li#btn_alim_overflow span'), 'Notification window');
			changeText($('li#btn_mConfig_overflow span'), 'Setting');
			changeText($('li#btn_delete_overflow span'), 'Delete');
			changeText($('li#btn_urlCopy_overflow span'), 'URL Copy');
			changeText($('li#btn_reopen_overflow span'), 'Reopen');
			changeText($('li#btn_newopen_overflow span'), 'Open a new window');
			changeText($('li#btn_menuRefresh_overflow span'), 'Refresh menu');
			changeText($('li#btn_opinion_overflow span'), 'Direct opinion');
			changeText($('li#btn_editHelp_overflow span'), 'Edit help');
			changeText($('li#btn_listedit_overflow span'), 'Batch editing window');
			changeText($('li#btn_logout_overflow span'), 'Log out');
			changeText($('li#btn_backup_overflow span'), 'Back up');
			changeText($('li#btn_backupList_overflow span'), 'Backup History');
			changeText($('li#btn_webSourceOpen_overflow span'), 'Open the web source');
			changeText($('li#btn_deleteList_overflow span'), 'Delete List');
			changeText($('li#btn_ChkOnlySum_overflow span'), 'Total loading and total');

			getEvents(this).click.splice(-1,1);		//마지막 click 만 제거.
		});

		//1a. 항상 적용되지만, 설정 영역을 클릭할 때만 번역 -------------------------------------------------
		$('.themechooser .tc-activator').click( function() {
			changeText($('.viewTarget h4'), 'Inner window position');
			changeText($('.viewTarget a.popup.tb-link'), 'Inner popup');
			changeText($('.viewTarget a.right.tb-link'), 'Right');
			changeText($('.viewTarget a.bottom.tb-link'), 'Bottom');
			changeText($('.tc-column.tb-column:last-child'), 'Close');
			
			getEvents(this).click.splice(-1,1);		//마지막 click 만 제거.
		});

		//2. 업무용 MIS 에 대한 일반적인 요소에 대한 번역
		if(getID("MenuType").value=="01" || getID("MenuType").value=="06") {
			changeText($('a#btn_recently'), 'Recent');
			changeText($('a#btn_write'), 'Add');
			changeText($('a#btn_modify'), 'Modify');
			changeText($('a#btn_list'), 'List');
			changeText($('a#btn_save'), 'Save');
			changeText($('a#btn_saveClose'), 'Save & Close');
			changeText($('a#btn_saveView'), 'Save & View');
			changeText($('a#btn_refWrite'), 'into Write');
			changeText($('a#btn_menuView'), 'Menu View');
			changeText($('a#btn_view'), 'View');
			changeText($('a#btn_up'), 'Up');
			changeText($('a#btn_down'), 'Down');
			changeText($('a#btn_delete'), 'Delete');

		}

		//3. 특정프로그램이나 MIS JOIN 에 대한 번역
		if(getID("RealPid").value=="speedmis000988") {
			changeText($('a#btn_1'), 'Widget Relocation');
		}


		//4. 특정 text 의 내용을 찾아 번역
		$('span:contains("└텔레그램전용 메시지전송")').text("└Telegram message transmission");


	}, 100);

});