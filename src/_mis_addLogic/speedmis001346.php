<?php

function pageLoad() {

    global $ActionFlag, $kendoTheme, $MisSession_IsAdmin, $base_domain;


	
    if($ActionFlag=="list") { ?>
		<style>
	body[ismainframe="Y"] td[comment="Y"] {
		background-image: none;
	}
	body td[comment="Y"]:after {
		content: "";
	}
			
	
	.u_cbox, .u_cbox input, .u_cbox textarea, .u_cbox select, .u_cbox button, .u_cbox table {
		font-size: 12px;
		line-height: 1.25em;
	}
	
	.u_cbox ul, .u_cbox ol {
		list-style: none;
		margin: 0;
		padding: 0;
		font-family: AppleSDGothicNeo,'돋움',dotum,Helvetica,sans-serif;
	
	}
	.u_cbox .u_cbox_comment {
		overflow-anchor: none;
		list-style: none;
		display: list-item;
		text-align: -webkit-match-parent;
	
	}
	.u_cbox .u_cbox_comment_box {
		position: relative;
		border-bottom: 0px solid #e2e2e2;
	}
	.u_cbox .u_cbox_comment_box .u_cbox_area {
		padding: 5px 0;
		max-width: 1000px;
	}
	.u_cbox .u_cbox_comment_box .u_cbox_info {
		padding-bottom: 1px;
		height: 25px;
	}
	.u_cbox .u_cbox_name_area {
		font-size: 15px;
		line-height: 25px;
		font-weight: normal;
		vertical-align: top;
	}
	.u_cbox .u_cbox_name .u_cbox_nick_area {
		display: inline-block;
		overflow: hidden;
		float: left;
		max-width: 50%;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.u_cbox .u_cbox_comment .u_cbox_text_wrap {
		overflow: hidden;
		font-size: 15px;
		line-height: 18px;
		word-break: break-all;
		word-wrap: break-word;
		margin-top: 6px;
		padding-top: 10px;
		margin-bottom: 6px;
		padding-bottom: 10px;
	}
	.u_cbox .u_cbox_info_base {
		position: relative;
		padding: 2px 0 0 0;
	}
	.u_cbox .u_cbox_date {
		display: block;
		font-size: 13px;
		font-family: tahoma,helvetica,sans-serif;
	}
	.u_cbox .u_cbox_attach {
		display: block;
		font-size: 13px;
		font-family: tahoma,helvetica,sans-serif;
		margin-top:5px;
		cursor: pointer;
	}

	.u_cbox a, .u_cbox a:link {
		xbackground-color: transparent;
	}
	.u_cbox .u_cbox_btn_report, .u_cbox .u_cbox_btn_unhide {
		float: left;
		padding-top: 2px;
		vertical-align: top;
	}
	.u_cbox a {
		text-decoration: none;
	}
	.u_cbox .u_cbox_info_base .u_cbox_ico_bar {
		display: inline-block;
		float: left;
		position: relative;
		top: 1px;
		left: auto;
		height: 12px;
		margin: 0 7px 0 9px;
		vertical-align: top;
	}
	.u_cbox .u_cbox_info_base:after {
		display: block;
		clear: both;
		content: '';
	}
	
	.k-alt, .k-pivot-layout>tbody>tr:first-child>td:first-child, .k-resource.k-alt, .k-separator {
		xbackground-color: inherit;
	}
	.u_cbox .u_cbox_comment_box .u_cbox_area {
		border-bottom: 1px dotted #999;
	}
	
		</style>
	
	<script id="list-mobile-template" type="text/x-kendo-tmpl">
	<div class="u_cbox">
	<ul class="u_cbox_list"><li class="u_cbox_comment"><div class="u_cbox_comment_box"><div class="u_cbox_area">
	<div class="u_cbox_info">
	<span class="u_cbox_info_main">
	<span class="u_cbox_name">
	<span class="u_cbox_name_area">
	<span class="u_cbox_nick_area">
	<span class="k-state-hover">{seongmyeong} | {yeollakcheo}
	</span>
	</span>
	</span>
	</span>
	</span>
	<span class="u_cbox_info_sub">
	</span></div><div class="u_cbox_text_wrap">
	<span class="u_cbox_contents name" data-lang="ko">
		{zjiyeok} | 예상제작비 {yesangjejakbi}
	</span></div><div class="u_cbox_info_base">
	<span class="u_cbox_date">{wdate}
	</span>
	
	</div>
	
	</div></div></li></ul>
	</div>
	
	
	  
	</script>
	
	<?php
	}

	
	if($ActionFlag=='list') updateEvent1_lastupdate_add_default('');
	?>
<script>
//원격 json 을 MY 가 아닌 MS DB 접속을 위해 변경.
document.getElementById('MS_MJ_MY').value = 'MS';
</script>

<style>
	li[tabid="commentApp"],li[tabid="readApp"] {
		display: none!important;
	}
</style><?php


	if($ActionFlag=="list" && requestVB("allFilter")) { 
		?>
		<script>
function listLogic_afterLoad_once() {

		if($('div#grid').data('kendoGrid').dataSource._total==1) {
			//$('a#btn_view').click();
		}
}
		</script>
		<?php
	}

    if($ActionFlag=="view") { 

        ?>
        
<style>
	xdiv#contentsMirror {
		width: calc(100% - 0px);
		height: calc(100vh - 354px);
	}
	xdiv#contentsMirror > div {
		height: 100%;
	}
	div#youtubeCode {
		width: calc(100vw - 65px);
		height: calc(100vh - 169px);
		overflow: hidden;
	}
	div#round_youtubeCode label {
		cursor: pointer;
	}

</style>
<script>


	//웹소스 디테일에서 템플릿으로 체크한 항목에 대해 출력내용을 변경할 수 있습니다. 이때 목록 또는 본문내용에 동일하게 적용됩니다.
function columns_templete(p_dataItem, p_aliasName) {

    if(p_aliasName=="youtubeCode") {

		if(p_dataItem["youtubeCode"]!="" && p_dataItem["youtubeCode"]!=undefined) {
			var rValue = `
<iframe id="ifr_youtube" style="width: 100%; height: 100%;" 
src="https://www.youtube.com/embed/`+p_dataItem['youtubeCode']+`" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
allowfullscreen></iframe>
`;
			$('li[tabid="youtubeCode"]').css('display','inline-block');
			$('div#round_youtubeCode label').click( function() {
				window.open('https://youtu.be/'+p_dataItem['youtubeCode']);
				$('iframe#ifr_youtube')[0].outerHTML = $('iframe#ifr_youtube')[0].outerHTML;
			});
			setTimeout( function() {
				parent.$('a.k-button[aria-label="Close"]').click( function() {
					$(this).closest('.k-widget.k-window').remove();
				});
			});
			return rValue;
		} else {
			$('li[tabid="youtubeCode"]').css('display','none');
			return '';
		}
	} else {
        return p_dataItem[p_aliasName];
    }

}
	
	function viewLogic_afterLoad_continue() {


			if(resultAll.d.results[0].phpCode!="" && resultAll.d.results[0].phpCode!=null) {

				$('li[tabid="phpCode"]').click();
				$('li[tabid="phpCode"]').css('display','inline-block');
			} else {
				$('li[tabid="idx"]').click();
				$('li[tabid="phpCode"]').css('display','none');
			}

			//각탭에 pdf href 가 1개만 있으면 뷰어로 변신
			tab_pdf_into_viewer();
	}
	
</script>

        <?php 
    }




}
//end pageLoad



function jsonUrl_index() {
	
	global $jsonUrl, $remote_MS_MJ_MY;
	
	$jsonUrl = "https://www.speedmis.com/_mis/";
	$remote_MS_MJ_MY = "MS";
}
//end jsonUrl_index

?>