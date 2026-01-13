


function filter_field_change() {
	var value = this.value();
	$("#scheduler").data("kendoScheduler").dataSource.filter({
        operator: function(task) {
            return task[filterField]==value || value=="";
        }
            /*
	  operator: function(task) {
		return $.inArray(task[filterField], value) >= 0 || value.length==0;
      }
      */
	});
}



function tab() {
    var tabs = "";

    for (var i = 0; i < stringify.level; i++) {
        tabs += "\t";
    }

    return tabs;
}

function stringify(items) {
    var item,
        itemString,
        levelString = "";

    for (var i = 0; i < items.length; i++) {
        item = items[i];

        if (!item.items) {
            itemString = kendo.stringify(item);
        } else {
            stringify.level++;
            var subnodes = stringify(item.items);
            stringify.level--;

            delete item.items;

            itemString = kendo.stringify(item);

            itemString = itemString.substring(0, itemString.length - 1);

            itemString += ",\"items\":[\r\n" + subnodes + tab() + "]}";
        }

        levelString += tab() + itemString;

        if (i != items.length - 1) {
            levelString += ",";
        }

        levelString += "\r\n";
    }

    return levelString;
}



function checkedNodeIds(nodes, checkedNodes) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked) {
            checkedNodes.push(nodes[i].value);
        }

        if (nodes[i].hasChildren) {
            checkedNodeIds(nodes[i].children.view(), checkedNodes);
        }
    }
}

function toolbar_onClick(e) {

    if(e.id=="btn_leftVibile") {
        $("a#sidebar-toggle").click();
    }
    
    if(e.id=="btn_alim") {
        setTimeout( function() { pushAlim(); });
    }

    if(e.id=="btn_urlCopy") {
        var url = location.href.split("?")[0]+"?gubun="+document.getElementById("gubun").value;
        if(getUrlParameter("isMenuIn")!=undefined) url = url + "&isMenuIn=" + getUrlParameter("isMenuIn");
        if(getUrlParameter("schedulerPid")!=undefined) url = url + "&schedulerPid=" + getUrlParameter("schedulerPid");
        url = url + "&vtype=" + $('button.k-button.k-state-selected').attr('data-name');
        url = url + "&isAddURL=Y";
        copyStringToClipboard(url);
        if(typeof parent.toastr=="object") toastr_obj = parent.toastr; else toastr_obj = toastr;
        toastr_obj.success("현재 상태의 URL 주소가 복사되었습니다.", "처리결과", {timeOut: 2000, positionClass: "toast-bottom-right"});
       
    }

    if(e.id=="btn_pdf") {
        fname = document.getElementById('MenuName').value + '_' + $('div#scheduler').data('kendoScheduler')._selectedViewName + '_' + replaceAll(replaceAll(replaceAll($('div#scheduler').data('kendoScheduler')._model.formattedShortDate,' - ','_'),' ',''),'-','') + ".pdf";
        $('div#scheduler span.k-icon').css('display','none');
        $('div#scheduler *:visible').each( function() {
            this.style.setProperty ("font-family", "Arial", "important"); 
        });
        $('div#scheduler')[0].innerHTML = $('div#scheduler')[0].innerHTML;
        getPDF($('div#scheduler'), fname, 'A4', 15, 0.7);
        setTimeout( function() {
            location.href = location.href;
        },3000);
    }


    if(e.id=="btn_reopen") {
        p_url = location.href.split("#")[0];
        p_idx = getUrlParameter("idx");
        g_idx = document.getElementById("idx").value;
        if(g_idx!=p_idx) {
            p_url = replaceAll(p_url, "&idx="+p_idx, "&idx="+g_idx);
            p_url = replaceAll(p_url, "?idx="+p_idx, "?idx="+g_idx);
        }
        location.href = p_url;
    }
    if(e.id=="btn_backupBye") {
        p_url = location.href.split("#")[0];
        p_tabjsonname = getUrlParameter("tabjsonname");
        p_url = replaceAll(p_url, "&tabjsonname="+p_tabjsonname, "");
        location.href = p_url;
    }
    if(e.id=="btn_opinion") {
        sendMsg_opinion();
    }

    if(e.id=="btn_logout") {
        if(confirm(document.getElementById("MisSession_UserName").value + " 님, 로그아웃을 하시겠습니까?")) location.href = "logout.php";
    }

    if(e.id=="btn_goHome") {
        parent.location.href = "index.php";
    }

    if(e.id=="btn_newopen") {
        p_url = location.href.split("#")[0];
        p_idx = getUrlParameter("idx");
        g_idx = document.getElementById("idx").value;
        if(g_idx!=p_idx) {
            p_url = replaceAll(p_url, "&idx="+p_idx, "&idx="+g_idx);
            p_url = replaceAll(p_url, "?idx="+p_idx, "?idx="+g_idx);
        }
        p_url = replaceAll(p_url, "&ActionFlag=modify", "");
        p_url = replaceAll(p_url, "?iActionFlag=modify&", "?");
        p_url = replaceAll(p_url, "&isIframe=Y", "");
        
        window.open(replaceAll(replaceAll(p_url, "&isMenuIn=Y", ""), "?isMenuIn=Y&", "?"));
    }

    if(e.id=="btn_reload") {
        $("#scheduler").data("kendoScheduler").dataSource.read();
    }
  
  

}



function editToggleHandler(e) {
    var obj = $("#scheduler").data("kendoScheduler").options.editable;
    if(e.target[0].id=="read") {
        $('#style-k-scheduler-update')[0].innerHTML = 'a.k-button.k-primary.k-scheduler-update { display: none; }';
        obj.confirmation = false;
        obj.create = false;
        obj.destroy = false;
        obj.move = false;
        obj.editRecurringMode = "series";
        obj.resize = false;
    } else if(e.target[0].id=="edit") {
        $('#style-k-scheduler-update')[0].innerHTML = 'a.k-button.k-primary.k-scheduler-update { display: inline-block; }';
        obj.confirmation = true;
        obj.create = true;
        obj.destroy = true;
        obj.move = true;
        obj.editRecurringMode = "";
        obj.resize = true;
    }
    $('button.k-button.k-view-month').click();       //이걸해야 create 가 반영됨.
}
var onToggles = 'off';
function onToggle(e) {
    //console.log('onToggle 입구'+$("body").attr("screenName"));
    setTimeout( function() {
        onToggles = 'off';
    },100);
    if(onToggles=='on') {
        setTimeout( function() {
            console.log($("body").attr("screenName"));
        },100);
        return false;
    }
    //console.log('onToggle 진행'+$("body").attr("screenName"));
    onToggles = 'on';
    if(e.id=="btn_mMenu") {
        mobile_line();
        if(e.checked) {
            $("div#panelbar-left").css("display", "block");
        } else {
            $("div#panelbar-left").css("display", "none");
        }
        $(window).resize();
    }

    if(e.id=="btn_mConfig") {
        $("span.tc-activator.k-content").click();
    }

    if(e.id=="btn_fullScreen") {

        toggleFullScreen(e.checked);
        if(!e.checked) {
            $('a#btn_fullScreen').removeClass('k-toolbar-first-visible');
            $('a#btn_fullScreen').removeClass('k-state-active');
            $('a#btn_fullScreen').attr('aria-pressed','false');

            $("body").attr("screenName","normalScreen");
            $("nav#js-tlrk-nav").css("display", "block");
            setTimeout( function() {
                if(typeof top.window_resize=='function') {
                    top.window_resize();
                }
            },100);
            setTimeout( function() {
                if(typeof top.window_resize=='function') {
                    top.window_resize();
                }
            },400);
        } else {
            $('a#btn_fullScreen').addClass('k-toolbar-first-visible');
            $('a#btn_fullScreen').addClass('k-state-active');
            $('a#btn_fullScreen').attr('aria-pressed','true');

            $("body").attr("screenName","fullScreen");
            $("nav#js-tlrk-nav").css("display", "none");
        }
        
    }


}
