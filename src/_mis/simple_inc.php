

<script>

var p_columns;

if(getCookie("modify_YN")=="") setCookie('modify_YN','N');

$(document).ready(function() {
    

    $("#toolbar").kendoToolBar({
        items: [
                { id: "btn_mMenu", icon: "k-icon k-i-menu", type: "button", togglable: true, overflow: "never" },
                { id: "btn_leftVibile", icon: "k-icon k-i-thumbnails-left", type: "button", overflow: "never" },
                { id: "btn_fullScreen", icon: "k-icon k-i-full-screen", type: "button", togglable: true, overflow: "never" },
            { id: "btn_reload", icon: "k-icon k-i-reload", type: "button", overflow: "never" },
            
            {
                type: "buttonGroup",
                buttons: [
                    { id: "btn_view", group: "view", selected: getCookie("modify_YN")!="Y", togglable: true, text: "조회", icon: "k-icon k-i-eye", type: "button" },
                    <?php if($MisSession_IsAdmin=="Y" && $isAuthW=="Y" && $isDeleteList!='Y') { ?>
                    { id: "btn_modify", group: "view", selected: getCookie("modify_YN")=="Y", togglable: true, text: "수정", icon: "k-icon k-i-track-changes-enable", type: "button" },
                    <?php } ?>
                ]
            },
            { id: "btn_1", text: "", type: "button", overflow: "never" },
            { id: "btn_2", text: "", type: "button", overflow: "never" },
            { id: "btn_3", text: "", type: "button", overflow: "never" },
            { id: "btn_4", text: "", type: "button", overflow: "never" },
            { id: "btn_5", text: "", type: "button", overflow: "never" },
            



            { id: "btn_alert", icon: "k-icon k-i-question", type: "button" },


            <?php if($screenMode!='1') { ?>
            { id: "btn_menuView", text: "메뉴삽입", icon: "k-icon k-i-thumbnails-left", type: "button" },
            <?php } ?>

            
            {
                id: "btn_urlCopy",
                type: "button",
                text: "URL 복사",
                overflow: "always"
            },
            {
                id: "btn_alim",
                type: "button",
                text: "알림창",
                overflow: "always"
            },
            { id: "btn_reopen", text: "다시열기", type: "button", overflow: "always" },
            { id: "btn_newopen", text: "새창열기", type: "button", overflow: "always" },


            
            { id: "btn_mConfig", type: "button", text: "설정", togglable: true },
            { id: "btn_menuName", text: "<?php echo $MenuName; ?>", attributes: { title: "<?php 
                if($MenuType=="13") echo "";
                else if($MisSession_IsAdmin=="Y") echo "관리자 권한";
                else if($isAuthW=="Y") echo "쓰기권한";
                else echo "읽기권한"; 
                ?>" }, type: "button", class: "info" },



        <?php if($help_title!='') { ?>
        { id: "btn_help", 
            <?php if(Left($help_title,10)=="MIS_JOIN::") { 
                $help_title = Mid($help_title, 11, 1000);
                ?>
                attributes: { misjoin: "Y" },
            <?php } ?>
        text: "Guide: <?php echo $help_title; ?>", type: "button", overflow: "never" },
        <?php } ?>

        <?php if($MisSession_IsAdmin=='Y') { ?>
        {
            id: "btn_editHelp",
            type: "button",
            text: "도움말 작성",
            overflow: "always"
        },
        <?php } ?>

            
            { id: "btn_menuRefresh", text: "메뉴새로고침", type: "button", overflow: "always" },
            <?php if($isDeveloper!="X") { ?>
            { id: "btn_webSourceOpen", text: "해당 웹소스 열기", type: "button", overflow: "always" },
            <?php } ?>
            <?php if($MisSession_UserID=='gadmin' || $MisSession_UserID=='방문고객') { ?>
                <?php if($devQueryOn=='N') { ?>
            { id: "btn_devQueryOn", text: "개발자 모드", type: "button", overflow: "always" },
                <?php } else { ?>
            { id: "btn_devQueryOff", text: "실사용 모드", type: "button", overflow: "always" },
                <?php } ?>
            <?php } ?>
            <?php if($telegram_bot_token!='') { ?>
            { id: "btn_opinion", text: "관리자문의/불편신고", type: "button", overflow: "always" },
            <?php } ?>

            { id: "btn_logout", text: "로그아웃", type: "button", overflow: "always" },
        ],
        click: toolbar_onClick,
        toggle: onToggle,
    });


    if(typeof thisLogic_toolbar=="function") {
        thisLogic_toolbar();
    } 
    if($("#btn_alert")[0]) {
        if($("#btn_alert")[0].style.background!="yellow") { $("#btn_alert").remove(); $("#btn_alert_overflow").remove(); }
    }
    if($("a#btn_1").text()=="") { $("#btn_1").remove(); }
    if($("a#btn_2").text()=="") { $("#btn_2").remove(); }
    if($("a#btn_3").text()=="") { $("#btn_3").remove(); }
    if($("a#btn_4").text()=="") { $("#btn_4").remove(); }
    if($("a#btn_5").text()=="") { $("#btn_5").remove(); }



    $("div#toolbar a").focus( function() {
        $(this).blur();
    });

    $('li[data-overflow="always"] a').focus( function() {
        $(this).blur();
    });
    



});



    </script>
</div>



        </div>

    </div>

