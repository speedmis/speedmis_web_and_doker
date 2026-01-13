<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

include '../_mis_addLogic/' . $schedulerPid . '.php';


$filterField_sql = ''; $filterField = '';
scheduler_pageLoad();


$vtype = requestVB("vtype");
if($vtype=='') $vtype = "weekSimple";


?>


<style id="style-k-scheduler-update">
a.k-button.k-primary.k-scheduler-update {
    display: none;
}
</style>
<style>
    
    .scheduler-template p {
        font-size: 12px;
        padding: 5px 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: normal;
		display: contents;
    }
    .scheduler-template a {
        color: #ffffff;
        font-weight: bold;
        text-decoration: none;
    }
    .k-state-hover .scheduler-template a,
    .scheduler-template a:hover {
        color: #000000;
    }


div#dialog iframe {
    border: 0;
}


body > .k-widget.k-window {
    xdisplay: none!important;
}
body > .k-widget.k-window.k-dialog {
    display: block!important;
}


</style>

<div id="dialog"></div>
<div id="scheduler"></div>



<script>

function popDialog(p_taskID, p_date, p_hh1, p_hh2) {

    function onClose() {
        undo.fadeIn();
    }

    if(parent.$('#dialog')[0]) var dialog = parent.$('#dialog');
    else var dialog = $('#dialog');
    var url = "index.php?RealPid=<?php echo $schedulerPid; ?>&idx="+p_taskID+"&isIframe=Y";
    if(p_taskID=="0") url = url + "&ActionFlag=write";
    if(p_date!=undefined) url = url + "&form_useDate=" + p_date;
    if(p_hh1!=undefined) url = url + "&form_startTime=" + p_hh1;
    if(p_hh2!=undefined) url = url + "&form_endTime=" + p_hh2;
    
    dialog.kendoDialog({
        content: "<iframe src='" + url + "' width='100%' height='100%' marginwidth='0' marginheight='0' frameborder='0'></iframe>",
        draggable: true,
        resizable: true,
        width: "650px",
        height: "570px",               
        title:  "일정",
        closable: true,
        modal: true,
        close: function() {
            if(parent.$('#dialog')[0]) parent.$('div.k-widget.k-window.k-dialog')[0].outerHTML = '<div id="dialog" style="height: 100%;"></div>';
            else $('div.k-widget.k-window.k-dialog')[0].outerHTML = '<div id="dialog" style="height: 100%;"></div>';
        },  
    });
    
}


$("#toolbar").kendoToolBar({
  items: [
    <?php if($screenMode=='1') { ?>
        { id: "btn_mMenu", icon: "k-icon k-i-menu", type: "button", togglable: true },
    <?php } else { ?>
        { id: "btn_leftVibile", icon: "k-icon k-i-thumbnails-left", type: "button" },
        { id: "btn_fullScreen", icon: "k-icon k-i-full-screen", type: "button", togglable: true },
    <?php } ?>
    { id: "btn_reload", icon: "k-icon k-i-reload", type: "button" },
    { template: "<label id='lbl_scheduler' style='margin-left: 30px;position: relative;font-size: 16px;top: 3px;'></label>" },
    { template: "<select id='filter_field' style='min-width: 100px; max-height: 35px;'></select>" },

    { id: "btn_1", text: "", type: "button" },
    { id: "btn_2", text: "", type: "button" },
    { id: "btn_3", text: "", type: "button" },
    { id: "btn_4", text: "", type: "button" },
    { id: "btn_5", text: "", type: "button" },
    { id: "btn_menuView", text: "메뉴삽입", icon: "k-icon k-i-thumbnails-left", type: "button" },

      
        {
            id: "btn_alim",
            type: "button",
            text: "알림창",
            overflow: "always"
        },

        <?php if($isDeleteList!='Y') { ?>
        {
            id: "btn_urlCopy",
            type: "button",
            text: "URL 복사",
            overflow: "always"
        },
        <?php } ?>

      {
          id: "btn_pdf",
          type: "button",
          text: "saveAs PDF",
          overflow: "always"
      },
      { id: "btn_reopen", text: "다시열기", type: "button", overflow: "always" },
      { id: "btn_newopen", text: "새창열기", type: "button", overflow: "always" },

      { id: "btn_goHome", text: "Home", type: "button", overflow: "always" },


    { id: "btn_menuRefresh", text: "메뉴새로고침", type: "button", overflow: "always" },
    <?php if($telegram_bot_token!='') { ?>
    { id: "btn_opinion", text: "관리자문의/불편신고", type: "button", overflow: "always" },
    <?php } ?>


        { id: "btn_logout", text: "로그아웃", type: "button", overflow: "always" },
      { id: "btn_menuName", text: "", attributes: { title: "<?php echo iif($MisSession_IsAdmin=="Y", "관리자 권한", iif($isAuthW=="Y", "쓰기권한", "읽기권한")); ?>" }, type: "button", class: "info" },



		<?php if($help_title!='') { ?>
		{ id: "btn_help", 
			<?php if(Left($help_title,10)=="MIS_JOIN::") { 
				$help_title = Mid($help_title, 11, 1000);
				?>
				attributes: { misjoin: "Y" },
			<?php } ?>
		text: "Guide: <?php echo $help_title; ?>", type: "button", overflow: "never" }
		<?php } ?>




      ],
  click: toolbar_onClick,
  toggle: onToggle,
});

if($("a#btn_1").text()=="") { $("#btn_1").remove(); }
if($("a#btn_2").text()=="") { $("#btn_2").remove(); }
if($("a#btn_3").text()=="") { $("#btn_3").remove(); }
if($("a#btn_4").text()=="") { $("#btn_4").remove(); }
if($("a#btn_5").text()=="") { $("#btn_5").remove(); }


var my_filter_field = $("#filter_field").kendoDropDownList({
	optionLabel: ":::: ALL ::::",
	dataTextField: "text",
	dataValueField: "value",
	dataSource: filterField_data,
	change: filter_field_change,

}).data("kendoDropDownList");

var p_resources = [
        {
            field: filterField,
            name: filterField,
            dataSource: filterField_data,
            title: filterField_title
        },
    ]

$( document ).ready(function() {

/*
    var customAgenda = kendo.ui.AgendaView.extend({
//월초
//date = new Date(Left(date.yyyymmdd10(),8)+"01");
//월말
//date = new Date(DateAdd("d",-1,DateAdd("m",1,Left(date.yyyymmdd10(),8)+"01")));
        startDate: function () {
            var date = kendo.ui.AgendaView.fn.startDate.call(this);
            console.log(date.yyyymmdd10());
            date = new Date(Left(date.yyyymmdd10(),8)+"01");
            console.log(date.yyyymmdd10());
            return date; // take the date and add 7 next days
        },
        endDate: function () {
            var date = kendo.ui.AgendaView.fn.startDate.call(this);
            console.log(date.yyyymmdd10());
            var date99 = kendo.ui.AgendaView.fn.endDate.call(this);
            console.log("date99="+date99.yyyymmdd10());
            date = new Date(DateAdd("d",-1,DateAdd("m",1,Left(date.yyyymmdd10(),8)+"01")));
            console.log(date.yyyymmdd10());
            return date; // take the date and add 7 next days
        }
    });
*/

    var CustomAgenda = kendo.ui.AgendaView.extend({
        options: {
            selectedDateFormat: "{0:D} - {1:D}",
            selectedShortDateFormat: "{0:d} - {1:d}",
            numberOfDays: 7,
        },
        previousDate: function() {
            var date = new Date(this.startDate());
            date.setDate(date.getDate() - this.options.numberOfDays);
            return date
        },
        nextDate: function() {
            var date = new Date(this.startDate());
            date.setDate(date.getDate() + this.options.numberOfDays);
            return date
        },
        startDate: function () {
            var date = kendo.ui.AgendaView.fn.startDate.call(this);
            console.log("start");
            return getWeekSun(date)[0];
        },
        endDate: function () {
            var date = kendo.ui.AgendaView.fn.startDate.call(this);
            return getWeekSun(date)[1];
        },
        calculateDateRange: function () {
            //create a range of dates to be shown within the view
 
            var selectedDate = this.options.date,
                start = kendo.date.dayOfWeek(selectedDate, this.calendarInfo().firstDay, -1),
                idx, length,
                dates = [];
                debugger;
 
            for (idx = 0, length = 11; idx < length; idx++) {
                dates.push(start);
                start = kendo.date.nextDay(start);
            }
 
            this._render(dates);
        }
    });

    $("#scheduler").kendoScheduler({
        date: Date(),
        startTime: new Date("2020/1/1 07:00 AM"),
        height: 600,        //숫자는 의미없으나, 지정하는 자체가 의미가 있음.
        views: [
            { type: "day"<?php if($vtype=="day") echo ", selected: true"; ?> },
            //"workWeek",
            { type: "week"<?php if($vtype=="week") echo ", selected: true"; ?> },
            { type: CustomAgenda, title: iif(kendo.culture().name=="ko-KR","주별요약","WeekSimple")<?php if($vtype=="weekSimple") echo ", selected: true"; ?> },
            { type: "month", eventsPerDay: 8, adaptiveSlotHeight: true, eventSpacing: 5<?php if($vtype=="month") echo ", selected: true"; ?> },
            //"timelineWeek",
            //"agenda",
            //{ type: "timeline", eventHeight: 50}
        ],
        timezone: "Etc/UTC",
        eventTemplate: $("#event-template").html(),
        allDayEventTemplate: $("#allDay-event-template").html(),
        dataBound: function(e) {
            console.log("dataBound");
            displayLoadingOff();
        },
        dataSource: {
            batch: true,
            transport: {
                read: {
                    url: "scheduler_treat.php?flag=read&schedulerPid=<?php echo $schedulerPid; ?>",
                    //url: "scheduler_json.php",
                    dataType: "jsonp",
                },
                update: {
                  //url: "https://demos.telerik.com/kendo-ui/service/tasks/update",
                  url: "scheduler_treat.php?flag=update&schedulerPid=<?php echo $schedulerPid; ?>",
                    dataType: "jsonp"
                },
                create: {
                    //url: "https://demos.telerik.com/kendo-ui/service/tasks/create",
                    url: "scheduler_treat.php?flag=create&schedulerPid=<?php echo $schedulerPid; ?>",
                    dataType: "jsonp"
                },
                destroy: {
                    //url: "https://demos.telerik.com/kendo-ui/service/tasks/destroy",
                    url: "scheduler_treat.php?flag=destroy&schedulerPid=<?php echo $schedulerPid; ?>",
                    dataType: "jsonp"
                },
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
                    }
                }
            },
            schema: {
                data: function (data) {
                  return data;
                },
                model: {
                    id: "taskID",
                    fields: p_fields
                }
            },
        },
        editable: {
            confirmation: false,
            create: true,
            destroy: false,
            move: false,
            editRecurringMode: "series",
            resize:false
        },
        edit: function(e) {
            var tt = e.event.start.yyyymmddhhmm16();
            var hh1 = Right(tt, 5);
            var hh2 = Left(hh1,2)*1+1;
            if(hh2==24) hh2 = "23:59";
            else {
                if(hh2<10) hh2 = "0" + hh2;
                hh2 = hh2 + ":00";
            }

            if(hh1=="00:00") popDialog('0', Left(tt,10));
            else popDialog('0', Left(tt,10), hh1, hh2);
            
            setTimeout( function(e) {
                $('.k-widget.k-window a.k-button.k-window-action')[0].click();
            });
            return false;
        },
        resources: p_resources
    });
    //더블클릭에 의한 스케줄 등록을 클릭으로 바꾼다.------
    var scheduler = $("#scheduler").data("kendoScheduler");
            
    scheduler.wrapper.on("mouseup touchend", ".k-scheduler-table td, .k-event", function(e) {
        return false;
        var target = $(e.currentTarget);
        
        if (target.hasClass("k-event")) {
        var event = scheduler.occurrenceByUid(target.data("uid"));
        scheduler.editEvent(event);
        } else {
        var slot = scheduler.slotByElement(target[0]);

        scheduler.addEvent({
            start: slot.startDate,
            end: slot.endDate
        });
        }
    });
           



    $('#lbl_scheduler').text(p_resources[0].title+':');

    var interval = setInterval(function() {
        if($("#scheduler").data("kendoScheduler")==undefined) {
            clearInterval(interval);
        }
        if(document.getElementById("grid_load_once_event").value=="Y") return false;
        if($("#scheduler").data("kendoScheduler")) {
            if($("#scheduler").data("kendoScheduler")._data) {
                $("#scheduler").data("kendoScheduler").refresh();
                document.getElementById("grid_load_once_event").value = "Y";
                return false;
            }
        }
     }, 200);

});


</script>