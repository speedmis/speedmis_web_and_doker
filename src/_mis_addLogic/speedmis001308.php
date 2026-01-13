<?php

function spMisMenuList_change() {

	//spMisMenuList 테이블에 의한 설정값인 $result 를 바꾸는게 이 함수의 핵심기능
    global $ActionFlag, $gubun, $parent_gubun, $parent_idx, $RealPid, $logicPid, $result;
	global $MisSession_PositionCode, $flag;



}
//end spMisMenuList_change



function pageLoad() {

    global $ActionFlag;
	global $MisSession_IsAdmin;


	if($ActionFlag=="modify") {
        ?>
        <style>

        </style>
        <?php 
	}
}
//end pageLoad




?>