

<script>

var p_columns;

if(getCookie("modify_YN")=="") setCookie('modify_YN','N');

$(document).ready(function() {
    


                    $("#toolbar").kendoToolBar({
                        items: [
                            <?php if($screenMode=='1') { ?>
                                { id: "btn_mMenu", icon: "k-icon k-i-menu", type: "button", togglable: true, overflow: "never" },
                            <?php } else { ?>
                                { id: "btn_leftVibile", icon: "k-icon k-i-thumbnails-left", type: "button", overflow: "never" },
                                { id: "btn_fullScreen", icon: "k-icon k-i-full-screen", type: "button", togglable: true, overflow: "never" },
                            <?php } ?>
                            { id: "btn_reload", icon: "k-icon k-i-reload", type: "button", overflow: "never" },
                            
                            { type: "separator" },
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

                            
                            { type: "separator" },
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

                            { id: "btn_goHome", text: "Home", type: "button", overflow: "always" },
                            
                            { id: "btn_menuRefresh", text: "메뉴새로고침", type: "button", overflow: "always" },
                            <?php if($isDeveloper!="X") { ?>
                            { type: "separator" },
                            { id: "btn_addMenu", text: "프로그램 추가", type: "button", overflow: "always" },
                            { id: "btn_webSourceOpen", text: "해당 웹소스 열기", type: "button", overflow: "always" },
                            <?php } ?>
                            <?php if($telegram_bot_token!='') { ?>
                            { id: "btn_opinion", text: "관리자문의/불편신고", type: "button", overflow: "always" },
                            <?php } ?>

                            { type: "separator" },
                            { id: "btn_logout", text: "로그아웃", type: "button", overflow: "always" },
                        ],
                        click: toolbar_onClick,
                        toggle: onToggle,
                    });



                

                    $("div#toolbar a").focus( function() {
                        $(this).blur();
                    });

                    $('li[data-overflow="always"] a').focus( function() {
                        $(this).blur();
                    });
                    

                    $("input[data-text-field]").focus( function() {
                        var autocomplete = $(this).data("kendoAutoComplete");
                        autocomplete.dataSource.transport.options.read.data.selField = $(this).attr("data-text-field");
                        autocomplete.dataSource.transport.options.read.data.selValue = this.value;
                        autocomplete.dataSource.read();
                        autocomplete.search(this.value);
                        var this_value = this.value;
                        if(this_value!="") {
                            setTimeout( function() { 
                                $('ul.k-list.k-reset > li:contains("'+this_value+'")').css("background", "blueviolet");
                                $('ul.k-list.k-reset > li:contains("'+this_value+'")').css("color", "white");
                            },500);
                        }
                        return false;
                        autocomplete.dataSource.fetch(function(){
                            if(this._filter) {
                                if(this._filter.filters.length>0) {
                                    var k = this._filter.filters[0].value;
                                    setTimeout( function() { filerRowBound(k) },0);
                                }
                            }
                        });
                    });
                    $("input[data-text-field]").keyup( function() {
                        if(event.keyCode<37 || event.keyCode>40) {
                            var autocomplete = $(this).data("kendoAutoComplete");
                            autocomplete.dataSource.transport.options.read.data.selField = $(this).attr("data-text-field");
                            autocomplete.dataSource.transport.options.read.data.selValue = this.value;
                            var this_value = this.value;
                            if(this_value!="") {
                                setTimeout( function() { 
                                    $('ul.k-list.k-reset > li:contains("'+this_value+'")').css("background", "blueviolet");
                                    $('ul.k-list.k-reset > li:contains("'+this_value+'")').css("color", "white");
                                },500);
                            }
                            return false;
                            autocomplete.dataSource.read();
                            autocomplete.search(this.value);
                            autocomplete.dataSource.fetch(function(){
                                if(this._filter) {
                                    if(this._filter.filters.length>0) {
                                        var k = this._filter.filters[0].value;
                                        //setTimeout( function() { filerRowBound(k) },100);
                                    }
                                }
                            });
                        }
                    });



                });



    </script>
</div>



        </div>

    </div>

