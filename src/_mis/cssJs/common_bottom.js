if ($('body').attr('isphonemobile') == 'Y' && $('body').width() <= 500 && getUrlParameter('isMenuIn') == 'Y') {
    url = location.href.split('#')[0];
    url = replaceAll(url, '?isMenuIn=Y&', '?');
    url = replaceAll(url, '&isMenuIn=Y', '');
    location.replace(url);
}


/*상단알림관련*/
$(document).on('click', function () {
    $('#gnb').hide();
});
$('button#js-tlrk-nav-overlay').on('click', function () {
    if ($('#gnb')[0].style.display != "none") setTimeout(function () { pushAlim(); });
});
$('li.TK-Aside-Menu-Item.TK-bn').on('click', function (e) {
    e.stopPropagation();
});
$('#gnb').on('click', function (e) {
    e.stopPropagation();
});
/*상단알림관련*/


$(".try-kendo").click(function (e) {
    window.dojo.postSnippet($('#source-code-1').data('html'), window.location.href);
});


$(".TK-Search input").focus(function () {
    if (InStr($("#example-sidebar").attr("class"), "k-rpanel-expanded") == 0) setTimeout(function () { $("#sidebar-toggle").click(); }, 100);
});
$(".TK-Search input").keyup(function () {
    if (InStr($("#example-sidebar").attr("class"), "k-rpanel-expanded") == 0) setTimeout(function () { $("#sidebar-toggle").click(); }, 100);
});


$("div.tc-theme-list").css("display", "inherit");


function nav_click(e) {
    var tree = $(e.target).closest('div[data-role="treeview"]').data("kendoTreeView");
    var dItem = tree.dataItem($(e.target).closest("li"));


    if (dItem == undefined) {
        return false;
    }
    if (dItem.MenuType == "00") {
        if (event == undefined) {
            //
        } else if ($(event.target).closest('li').find('ul').length == 0) {
            //location.href = "index.php?gubun="+dItem.id+"&isMenuIn=Y";
        } else if ($(event.target).hasClass('k-i-expand') == false) {
            sel_obj = $(event.target).closest('li');
            if (sel_obj.attr('aria-expanded') == 'true') $('div#example-nav').data('kendoTreeView').collapse(sel_obj[0]);
            else $('div#example-nav').data('kendoTreeView').expand(sel_obj[0]);
        }
        return false;
    }

    if (event) {
        if ($('iframe#grid_right')[0] && event.ctrlKey == false) {
            $('iframe#grid_right')[0].style.display = 'none';
        }

        if (dItem.MenuType == "11") {
            location.href = dItem.AddURL;
        } else if (dItem.MenuType == "12") {
            window.open(dItem.AddURL);
        } else if (dItem.MenuType == "13") {
            url = location.pathname + "?gubun=" + dItem.id + iif(document.getElementById('isMenuIn').value == 'Y', '&isMenuIn=Y', '');
            history.pushState(null, null, url);
            ifr_url = dItem.AddURL;
            $('div#main')[0].innerHTML = `<iframe src="` + ifr_url + `" frameborder="0" width="100%" height="100%"></iframe>`;
        } else if (event.ctrlKey) {
            window.open("index.php?gubun=" + dItem.id + iif(document.getElementById('isMenuIn').value == 'Y', '&isMenuIn=Y', ''));
            debugger;
            $('div#example-nav').data('kendoTreeView').select($('div#example-nav [firstmenu="Y"]'));
        } else if (event.shiftKey) {
            parent_popup_jquery("index.php?gubun=" + dItem.id, dItem.text);
            debugger;
            $('div#example-nav').data('kendoTreeView').select($('div#example-nav [firstmenu="Y"]'));
        } else {
            //zzzzzzzzzzzz
            //location.href = "index.php?gubun="+dItem.id+iif(document.getElementById('isMenuIn').value=='Y','&isMenuIn=Y','');
            go_mis_gubun(dItem.id);
        }
    }
}
$(document).ready(function () {

    $("#root-nav").on("click", function (e) {
        nav_click(e);
    });
    $('button#js-tlrk-nav-drawer-button,button#js-tlrk-nav-overlay').click(function () {
        var $drawer = $('div#js-tlrk-nav-drawer');
        var $overlay = $('button#js-tlrk-nav-overlay');
        if ($drawer.hasClass('TK-Drawer--Active') == false) {
            console.log(1122)
            $drawer.addClass('TK-Drawer--Active');
            $overlay.addClass('TK-Nav-Overlay--Active');
        } else {
            console.log(1133)
            $drawer.removeClass('TK-Drawer--Active');
            $overlay.removeClass('TK-Nav-Overlay--Active');
        }
    });
    common_bottom_ready();
});


$(window).on("beforeunload", function () {    //spa 로 되면서 view_bottom.js 에서 common.. 으로 옮김

    var $actionFlag = $('input#ActionFlag');
    if ($actionFlag.val() != 'modify' && $actionFlag.val() != 'write') {
        beforeunload_ignore();
        $(window).off("beforeunload");
    }
    if (isMainFrame() == false && parent.isMainFrame() == false) {
        beforeunload_ignore();
        $(window).off("beforeunload");
    }

    //$('body').width()*$('body').height()>0 : 숨겨진 경우는 무시.
    if (typeof check_beforeunload == 'undefined') {
        console.log('nv pv 보내');
        beforeunload_ignore();
        $(window).off("beforeunload");
    } else {
        var $body = $('body');
        if (check_beforeunload() == true && $body.width() * $body.height() > 0) {
            console.log('nv pv 멈춰');
            return true;
        } else {
            beforeunload_ignore();
            console.log('nv pv 보내');
            $(window).off("beforeunload");
            //return true;	//지워
        }
    }

});

$(window).resize(function () {


    gridHeight();


    setTimeout(function () {
        if (isMainFrame()) {

            select_device_id = getCookie('select_device_id');
            if (select_device_id == null || getCookie('select_device_on') == null) {
                setCookie('select_device_on', '1', 1000);
                if ($(document).width() >= 1600) {
                    select_device_id = 'device-md';
                } else {
                    select_device_id = 'device-sm';
                }
                setCookie('select_device_id', select_device_id, 1000);
            }
            if (getCookie('select_device_on') == '1' && getCookie('viewTarget') != 'popup' && getCookie('viewTarget') != 'bottom') {
                select_device_load();
            }
        }
        if (document.fullscreenElement == null && $('body').attr('screenname') == 'fullScreen') {
            $('a#btn_fullScreen').click();
        }
    });
});