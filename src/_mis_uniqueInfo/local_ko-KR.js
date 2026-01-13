/*
//외국어로 제작된 페이지에 대한 한국어 출력 : 필요에 따라 주석을 풀고 사용할 것.
$(document).ready( function() {
	
	if(!$('body').is(':visible')) return false;
	setTimeout( function() {

		//언어별 번역은 각 고객사에서 자체관리함, 큰 범위에서 작은범위로 좁혀짐.

		//1. 항상 적용되는 요소에 대한 번역 -------------------------------------------------
		//changeText($('.themechooser .tc-activator'), 'Setting');
		

		//1a. 항상 적용되지만, 쩜쩜 영역을 클릭할 때만 번역 -------------------------------------------------
		//$('#toolbar .k-overflow-anchor.k-button').click( function() {
		//	changeText($('li#btn_mConfig_overflow span'), 'Setting');
		//	getEvents(this).click.splice(-1,1);		//마지막 click 만 제거.
		//});

		//1a. 항상 적용되지만, 설정 영역을 클릭할 때만 번역 -------------------------------------------------
		//$('.themechooser .tc-activator').click( function() {
		//	changeText($('.viewTarget h4'), 'Inner window position');
		//	getEvents(this).click.splice(-1,1);		//마지막 click 만 제거.
		//});

		//2. 업무용 MIS 에 대한 일반적인 요소에 대한 번역
		//if(getID("MenuType").value=="01" || getID("MenuType").value=="06") {
		//	changeText($('a#btn_delete'), 'Delete');
		//}

		//3. 특정프로그램이나 MIS JOIN 에 대한 번역
		//if(getID("RealPid").value=="speedmis000988") {
		//	changeText($('a#btn_1'), 'Widget Relocation');
		//}

	}, 100);

});
*/