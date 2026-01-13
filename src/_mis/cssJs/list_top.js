window.onerror = function (message, source, lineno, colno, error) {
    if (message.indexOf("Cannot call method 'value' of kendoDropDownList") !== -1) {
        console.log('이 에러 무시');
        return true; // 이 에러 무시
    }
    return false; // 다른 에러는 그대로
};

var defaultFilter = "";
var updateList = {};
var key_aliasName;
var p_pageSize;
var commentObj = [];


function templeteReplace(p_tag, p_dataItem) {
    var json = $('#grid').data('kendoGrid').dataSource._pristineData;
    if (json.length == 0) return "";

    $.each(json[0], function (key, value) {
        if (value == null) value = "";
        p_tag = replaceAll(p_tag, "{" + key + "}", p_dataItem[key]);
    });
    return p_tag;
}

function grid_width_fixed() {
    if ($('div#grid colgroup > col').length <= 30 && isMobile() == false) {
        tw = 0;
        cnt = $('div#grid colgroup > col').length;
        arrw = [];
        $('div#grid colgroup > col').each(function (i, t) {
            if (i != 0 && i != cnt / 2) {
                ww = $(this).width() + 0;
                if (i == cnt - 1 || i == cnt / 2 - 1) {
                    ww = ww + 0;
                }
            } else {
                ww = 60;
            }
            arrw[i] = ww;
        });
        $('div#grid colgroup > col').each(function (i, t) {
            if (i != 0 && i != cnt / 2) {
                if (i == cnt - 1 || i == cnt / 2 - 1) {
                    $(this).after('<col style="width:500px">');
                }
            }
            tw = tw + arrw[i];
            $(this).attr('style', 'width:' + arrw[i] + 'px');
        });
        tww = $($('div#grid table[role="grid"]')[0]).width();
        $('div#grid table[role="grid"]')[0].style.setProperty("width", tww + "px", "important");
        $('div#grid table[role="grid"]')[1].style.setProperty("width", tww + "px", "important");
        //console.log(tw);
    }
}

var groupable;

function footerCount(p_e, p_aliasName) {
    if (!groupable) return '';
    if (isMainFrame() == false && parent.document.getElementById('userDefine_page_print')) {
        if (parent.document.getElementById('userDefine_page_print').value != '') return '';
    }
    //$("input#grid_load_once_event").val()
    if ($('#grid').data('kendoGrid').tbody.find('tr').length == 0) return '';
    if ($('#div_temp1').attr('filters') == '[]') return '';

    var nonNullCount = 0;
    var nonNullSum = 0;
    var indx = getCellIndex_alias(p_aliasName);
    if (document.getElementById('ChkOnlySum').value == '2') {
        var _keyidx_123 = 'N';     //keyidx 를 1,2,3 식으로 변경여부
        if ($('#grid').data('kendoGrid').dataSource._sort[0] == undefined) _keyidx_123 = 'N';
        else if ($('a#btn_recently').hasClass('k-state-active') == true) _keyidx_123 = 'N';
        else if (p_aliasName == $('#grid').data('kendoGrid').dataSource._sort[0].field) _keyidx_123 = 'N';
        else _keyidx_123 = 'Y';
        document.getElementById('keyidx_123').value = _keyidx_123;

        $('#grid').data('kendoGrid').tbody.find('td:nth-child(' + (indx + 1) + ')').each(
            function (idx, item) {
                if ($(item).text()) {
                    nonNullSum = nonNullSum + $(item).text() * 1;
                    nonNullCount++;
                }
                if (_keyidx_123 == 'Y') {
                    $(this).closest('tr').find('td[keyidx]').attr('keyidx', idx + 1);
                }
            }
        );
        $('#grid a.k-button').css('display', 'none');
        if (getObjects(p_columns_1D, 'field', p_aliasName)[0].hidden == true) {
            setTimeout(function (p_nonNullCount, p_nonNullSum) {
                sort_index = getCellIndex_alias($('div#grid').data('kendoGrid').dataSource._sort[0].field);
                $('div.k-grid-footer td')[sort_index].innerHTML = '<span title="lines & totals">' + p_nonNullCount + '행 ' + p_nonNullSum + '건</span>';
            }, 0, nonNullCount, nonNullSum);
        }
        if (_keyidx_123 == 'N') {
            return '<span title="lines">' + nonNullCount + '행</span>';
        } else {
            return '<span title="lines & totals">' + nonNullCount + '행 ' + nonNullSum + '건</span>';
        }
    } else {

        $('#grid').data('kendoGrid').tbody.find('td:nth-child(' + (indx + 1) + ')').each(
            function (idx, item) {
                if ($(item).text() != '' && $(item).text() != null && $(item).text() != 'null') {
                    nonNullCount++;
                    //if($(item).text()=='(주)에스피씨삼립진주(부산방향)휴게소	') debugger;
                }
                //if(idx+1==$('#grid').data('kendoGrid').tbody.find('td:nth-child('+(indx+1)+')').length) console.log(nonNullCount);
            }
        );
        //return '<span title="공백제외 갯수">건 '+nonNullCount+'</span>';
        return nonNullCount + '건';
    }
}

function fun_serverFiltering(TF) {
    if (TF) {
        //$('.k-header.k-grid-toolbar input.k-input').val('');
        //$('table[role="grid"] input.k-input').val('');

        $('#grid').data('kendoGrid').dataSource.options.serverFiltering = true;
        $('#div_temp1').attr('filter', JSON.stringify($('#grid').data('kendoGrid').dataSource.transport.options.read.data.$filter));
        $('#div_temp1').attr('allFilter', JSON.stringify($('#grid').data('kendoGrid').dataSource.transport.options.read.data.allFilter));
        /*
        $('#grid').data('kendoGrid').dataSource.transport.options.read.data.$filter = "";
        $('#grid').data('kendoGrid').dataSource.transport.options.read.data.allFilter = "";
        */

        //if($('#grid').data('kendoGrid').dataSource._filter==undefined) $('#grid').data('kendoGrid').dataSource._filter = {logic: "and", filters: eval($('#grid').data('kendoGrid').dataSource.transport.options.read.data.allFilter)};
        //else if($('#grid').data('kendoGrid').dataSource._filter.filters.length==0) {
        //    $('#grid').data('kendoGrid').dataSource._filter =  {logic: "and", filters: eval($('#grid').data('kendoGrid').dataSource.transport.options.read.data.allFilter)};
        //}
        $('#div_temp1').attr('filters', JSON.stringify($('#grid').data('kendoGrid').dataSource._filter.filters));
        $('#grid').data('kendoGrid').dataSource._filter.filters = [];

    } else {
        //setTimeout( function() {

        $('#grid').data('kendoGrid').dataSource.options.serverFiltering = false;
        _options = JSON.parse(JSON.stringify($('#grid').data('kendoGrid').dataSource.options));

        if ($('#grid').data('kendoGrid').dataSource._sort) _sort = JSON.parse(JSON.stringify($('#grid').data('kendoGrid').dataSource._sort));
        else _sort = [];

        if ($('#grid').data('kendoGrid').dataSource._filter) _filter = JSON.parse(JSON.stringify($('#grid').data('kendoGrid').dataSource._filter));
        else _filter = [];

        if ($('#grid').data('kendoGrid').dataSource._data.length > 0) _data = $('#grid').data('kendoGrid').dataSource._data;
        else _data = [];


        for (i = _filter.filters.length - 1; i >= 0; i--) {
            //splice 에 의해 삭제가 되면 i 값에 문제가 생기는 안좋은 코딩임.
            //if(_filter.filters[i].operator=="eq" || _filter.filters[i].operator=="doesnotendwith") _filter.filters.splice(i,1);
            //if(_filter.filters[i].operator=="eq" || _filter.filters[i].operator=="doesnotendwith") delete _filter.filters[i];   //delete 는 empty 가 남아서 좋음.
            if (InStr(_filter.filters[i].field, 'toolbar') > 0) delete _filter.filters[i];
        }
        json_unempty(_filter.filters);

        if (_filter.logic == undefined) _filter.logic = "and";
        $('#grid').data('kendoGrid').dataSource._filter = _filter;



        if ($('#grid').data('kendoGrid').dataSource._filter.filters.length == 0 && _filter.filters == 0) {
        } else if ($('#grid').data('kendoGrid').dataSource._filter.filters[0].operator == _filter.filters[0].operator
            && $('#grid').data('kendoGrid').dataSource._filter.filters[0].value + "" == _filter.filters[0].value + "") {

        } else {
            $('#grid').data('kendoGrid').dataSource.query({
                data: _data,
                filter: _filter,
                sort: _sort,
                options: _options,
                page: 1,
            });
        }

        $($('.k-grid-header input[data-text-field]')[0]).data('kendoAutoComplete').value("");
        $($('.k-grid-header input[data-text-field]')[0]).data('kendoAutoComplete')._old = "...";
        if ($($('.k-grid-header input[data-text-field]')[0]).is(':visible') == true) {
            $($('.k-grid-header input[data-text-field]')[0]).blur();
        }

        for (i = 0; i < _filter.filters.length; i++) {
            if ($('input[data-text-field="' + _filter.filters[i].field + '"]').data('kendoAutoComplete')) {
                $('input[data-text-field="' + _filter.filters[i].field + '"]').data('kendoAutoComplete').value(_filter.filters[i].value);
                $('input[data-text-field="' + _filter.filters[i].field + '"]').data('kendoAutoComplete')._old = "";
                $('input[data-text-field="' + _filter.filters[i].field + '"]').blur();
            }
        }
        //if(i>0) $('input[data-text-field="'+_filter.filters[i-1].field+'"]').blur();

        $('#div_temp1').attr('filters', '');

        //},2000);
    }
}

function grid_dataBound_chart() {
    if ($("#chartKey").data('kendoDropDownList') == undefined) {
        if ($('input#chartKey').val() != '' && $('input#chartKey').val() != undefined) {

            var chart_char_columns = [];
            var chart_number_columns = [];
            for (i = 1; i < p_columns.length; i++) {
                if (p_columns[i].field != undefined && InStr(p_columns[i].field, "(") == 0) {
                    if (p_columns[i].Grid_Schema_Type == "number") chart_number_columns.push({ text: p_columns[i].title, value: p_columns[i].field });
                    else chart_char_columns.push({ text: p_columns[i].title, value: p_columns[i].field });
                } else if (p_columns[i].title != undefined && p_columns[i].field == undefined) {
                    for (j = 0; j < p_columns[i].columns.length; j++) {
                        if (p_columns[i].columns[j].field != undefined && InStr(p_columns[i].columns[j].field, "(") == 0) {
                            if (p_columns[i].columns[j].Grid_Schema_Type == "number") chart_number_columns.push({ text: p_columns[i].columns[j].title, value: p_columns[i].columns[j].field });
                            else chart_char_columns.push({ text: p_columns[i].columns[j].title, value: p_columns[i].columns[j].field });
                        }
                    }
                }
            }

            // create DropDownList from input HTML element
            $("#chartKey").kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: chart_char_columns,
                index: 0,
                change: function () {
                    $('#grid').data('kendoGrid').dataSource.read();
                }
            });

            $("#chartType").kendoDropDownList({
                index: 0,
                change: function () {
                    $('#grid').data('kendoGrid').dataSource.read();
                }
            });

            $("#chartOrderBy").kendoDropDownList({
                index: 0,
                change: function () {
                    $('#grid').data('kendoGrid').dataSource.read();
                }
            });

            $('a#btn_chartClose').click(function () {
                $('div.chart_option').remove();
                var splitter = $("#horizontal").data("kendoSplitter");
                var size = splitter.size(".k-pane:first");
                setCookie('lastSize_right', size, 1000);
                splitter.size(".k-pane:first", "100%");
            });


            // create DropDownList from input HTML element
            $("#chartNumberColumns").kendoMultiSelect({
                dataTextField: "text",
                dataValueField: "value",
                dataSource: chart_number_columns,
                index: 0,
                change: function () {
                    $('#grid').data('kendoGrid').dataSource.read();
                }
            });
            if ($('#chartNumberColumns').val() != '') {
                $('#chartNumberColumns').data('kendoMultiSelect').value(eval($('#chartNumberColumns').val()));
            }

            $("#chartNumberColumns_all").click(function () {
                var values = $.map($("#chartNumberColumns").data("kendoMultiSelect").dataSource.data(), function (dataItem) {
                    return dataItem.value;
                });

                $("#chartNumberColumns").data("kendoMultiSelect").value(values);
                $('#grid').data('kendoGrid').dataSource.read();
            });

            $('#grid').data('kendoGrid').dataSource.read();

        }

    }

    if ($('input#chartKey').val() != '' && $('input#chartKey').val() != undefined) {
        var splitter = $("#horizontal").data("kendoSplitter");
        if (splitter != undefined) {
            var size = splitter.size(".k-pane:first");

            if (size == "100%" || $("div#right-pane").width() <= 30) {
                if ($(window).width() <= 1100 || isMobile()) splitter.size(".k-pane:first", "0%");
                else splitter.size(".k-pane:first", "33%");
            }
        }
    }
}

var setTimeout_run_times = 0;
grid_fun_ChkOnlySum = function (p_dataSource_sort, p_filter, p_group, p_schema_fieldsAll, p_columns) {

    if (p_columns.length <= 1) return false;

    if (!groupable) p_group = [];

    return $("#grid").kendoGrid({
        excel: {
            fileName: document.getElementById("MenuName").value + "_" + today15() + ".xlsx",
            filterable: true,
            allPages: true
        },
        toolbar: ["search"],
        saveChanges: function (e) {
            //debugger;
        },
        dataSource: {
            //timezone: "Asia/Seoul",
            type: "odata",
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            sort: p_dataSource_sort,

            filter: p_filter,

            group: p_group,
            aggregate: p_aggregate,
            transport: {
                read: {
                    type: "POST",
                    url: iif(document.getElementById("jsonname").value != "", "list_jsonfile.php?jsonname=" + document.getElementById("jsonname").value, "list_json.php?flag=read&RealPid=" + document.getElementById("RealPid").value
                        + "&MisJoinPid=" + document.getElementById("MisJoinPid").value
                        + "&isDeleteList=" + document.getElementById("isDeleteList").value
                        + "&parent_gubun=" + document.getElementById("parent_gubun").value
                        + "&parent_idx=" + document.getElementById("parent_idx").value)
                        + "&lite=" + iif(getUrlParameter('lite') == 'Y', 'Y', '')
                        + "&pre=" + document.getElementById("pre").value
                        + "&addParam=" + document.getElementById("addParam").value,
                    data: {
                        recently: function () { return iif(document.getElementById("Anti_SortWrite").value == "Y", "N", "Y"); },
                        isDeleteList: document.getElementById("isDeleteList").value,
                        grid_load_once_event: document.getElementById("grid_load_once_event").value,
                        app: "",
                        allFilter: "",
                        backup: "",
                        "$top": 1000000,
                        "$filter": function (p_filter) {
                            filter = "";
                            for (i = 0; i < p_filter.length; i++) {
                                if (i > 0) filter = filter + " and ";
                                filter = filter + p_filter[i].field + " " + p_filter[i].operator + " '" + p_filter[i].value + "'";
                            }
                            return filter;
                        }(p_filter),
                        "$orderby": function (p_dataSource_sort) {
                            orderby = "";
                            for (i = 0; i < p_dataSource_sort.length; i++) {
                                if (i > 0) orderby = orderby + ",";
                                orderby = orderby + p_dataSource_sort[i].field + iif(p_dataSource_sort[i].dir == "desc", " desc", "");
                            }
                            return orderby;
                        }(p_dataSource_sort),
                    },
                    complete: function (jqXHR, textStatus) {
                        displayLoadingOff();
                        if (jqXHR.responseJSON == undefined) {
                            //toastr.error("해당 내역 조회에 실패했습니다.");
                            return false;
                        }
                        if (jqXHR.responseJSON.d.resultCode == "success") {
                            $("a#btn_menuName").text("※ " + document.getElementById("MenuName").value);
                            //$("li#btn_menuName_overflow")[0].style.setProperty ("display", "none", "important");
                            var panelBar = $("#panelbar-left").data("kendoPanelBar");
                            //panelBar.select($($('div#panelbar-left > li')[4]));

                            if (document.getElementById("jsonname").value != "") toastr.success("백업본파일 " + document.getElementById("jsonname").value + " 이 정상적으로 조회되었습니다.", "", { timeOut: 7000, positionClass: "toast-bottom-right" });
                            else {
                                $('span.list_resultMessage').closest('div[aria-live="polite"]').remove();
                                //toastr.success(jqXHR.responseJSON.d.resultMessage, '<span class="list_resultMessage"></span>', {timeOut: 4000, positionClass: "toast-bottom-right"});
                            }

                            if (jqXHR.responseJSON.d.__devQuery_url && isMobile() == false) {
                                $('a.dev_query1').closest('div[aria-live="polite"]').remove();
                                toastr.info('<a class="dev_query1" href="javascript:;" onclick="query_popup(\'' + jqXHR.responseJSON.d.__devQuery_url + '\');">쿼리를 보시려면 여기를 클릭하세요.</a>', '', { timeOut: 7000 });
                            }

                            if (isMainFrame()) {
                                commentObj[jqXHR.responseJSON.d.pagenumber] = jqXHR.responseJSON.d.commentData;
                            } else {
                                commentObj[jqXHR.responseJSON.d.pagenumber] = jqXHR.responseJSON.d.commentData;
                                tabObj = parent.$("div#round_" + windowID()).closest("div[tabnumber]");
                                if (tabObj) {
                                    tabnumber = tabObj.attr("tabnumber");
                                    if (tabnumber != undefined) {
                                        parent.$('body li[tabnumber="' + tabnumber + '"] span.cnt').text("0");
                                        if (jqXHR.responseJSON.d.__count * 1 > 99) {
                                            parent.$('body li[tabnumber="' + tabnumber + '"] span.cnt').text("99+");
                                        } else {
                                            parent.$('body li[tabnumber="' + tabnumber + '"] span.cnt').text(jqXHR.responseJSON.d.__count);
                                        }
                                        parent.$('body li[tabnumber="' + tabnumber + '"] span.cnt').attr("cnt", jqXHR.responseJSON.d.__count);
                                    }
                                }

                                setTimeout(function () {
                                    $(window).resize();
                                });
                            }
                        } else if (jqXHR.responseJSON.d.resultCode != "") {
                            toastr.error(jqXHR.responseJSON.d.resultMessage);
                        }
                        if (jqXHR.responseJSON.d.afterScript != "") {
                            try {
                                eval(jqXHR.responseJSON.d.afterScript);
                            } catch (error) {
                                alert(jqXHR.responseJSON.d.afterScript);
                            }
                        }

                        if (typeof updateChart == "function") {
                            if ($('input#chartKey').val() != '' && $('input#chartKey').val() != undefined) updateChart(jqXHR.responseJSON.d.chart_data);
                        }

                    }

                },
                update: {
                    type: "POST",
                    //cache: true,
                    url: "list_json.php?flag=update&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&parent_idx=" + document.getElementById("parent_idx").value
                        + "&pre=" + document.getElementById("pre").value
                        + "&addParam=" + document.getElementById("addParam").value
                        + "&$callback=jQuery" + Date.now(),
                    data: function () {
                        return { updateList: updateList };
                    },
                    beforeSend: function (jqXHR, textStatus) {

                        if (document.getElementById("stopUpdate").value == "Y") {
                            //grid 에서 multiselect 영역을 그냥 클릭 후 blur 될때 [object object] 현상때문에 어쩔 수 없이 이런 식으로 막음.

                            setTimeout(function () { document.getElementById("stopUpdate").value = ""; });
                            displayLoadingOff("body");
                            dirtyClear();
                            return false;
                        }
                    },
                    complete: function (jqXHR, textStatus) {
                        //debugger;
                        console.log("complete");
                        dirtyClear();

                        var result = JSON.parse("[{" + replaceAll(jqXHR.responseText.split("([{")[1], "}])", "}]"));


                        if (updateList["_up_joinFieldValue"] == undefined) {
                            if (result.resultCode == 'fail') {
                                toastr.error(getTitle_aliasName(updateList["_up_field"]) + "::: " + updateList["_up_fieldValue"] + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
                            } else {
                                toastr.success(getTitle_aliasName(updateList["_up_field"]) + ": " + updateList["_up_fieldValue"] + "<br>로 저장이 완료되었습니다!", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
                            }
                        } else {
                            if (result.resultCode == 'fail') {
                                toastr.error(getTitle_aliasName(updateList["_up_joinField"]) + "::: " + updateList["_up_joinFieldValue"] + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
                            } else {
                                toastr.success(getTitle_aliasName(updateList["_up_joinField"]) + ": " + updateList["_up_joinFieldValue"] + "<br>로 저장이 완료되었습니다!", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
                            }
                        }


                        var key_idx = result[0][document.getElementById("key_aliasName").value];

                        $.each(result[0], function (key, value) {
                            //if(key=='Grid_ListEdit') debugger;
                            if (document.getElementById("key_aliasName").value != key) setGridCellValue_idx(key_idx, key, value);
                        });

                    },
                }
            },
            requestStart: function (e) {


                if (defaultFilter == "") defaultFilter = $('#grid').data('kendoGrid').dataSource._filter;

                if ($('#grid').data('kendoGrid').dataSource._filter == undefined) {
                    $('#grid').data('kendoGrid').dataSource._filter = defaultFilter;
                } else if ($('#grid').data('kendoGrid').dataSource._filter.filters.length == 0) {
                    if (isJsonString($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter) == true) {
                        defaultFilter = { logic: "and", filters: eval($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter) };
                    }
                    $('#grid').data('kendoGrid').dataSource._filter = defaultFilter;
                }
                var obj = $('#grid').data('kendoGrid').dataSource._filter.filters;

                jQuery(obj).each(function (index) {
                    if (obj[index]) {
                        if (obj[index].field == "nomean") {
                            obj.splice(index, 1);
                        } else if (obj[index].value == null) {
                        } else if (InStr(obj[index].value.toString(), "00 GMT+") > 0) {
                            //kendo 의 너무 좋아서 짜증나는 기능 timezone 을 없애버림.
                            dt = Left(obj[index].value.toString().split("00 GMT+")[1], 2) * 1;
                            obj[index].value = new Date(Date.parse(obj[index].value) + dt * 3600 * 1000).toISOString().slice(0, 10);
                        }
                    }
                });
                $('#toolbar [aria-labelledby]').each(function () {
                    //if($(this).attr("aria-labelledby")=='toolbar_zsimbunggubun_label') debugger;
                    //if(obj.find(fruit => fruit.field === 'nomean')) alert(9);
                    if (InStr($(this).attr("aria-labelledby"), "toolbar_") > 0) {
                        //var searchFilter = replaceAll(replaceAll($(this).attr("aria-labelledby"),"toolbar_",""),"_label","");
                        var searchFilter = replaceAll($(this).attr("aria-labelledby"), "_label", "");
                        //console.log(searchFilter);
                        var obj2 = obj.find(fruit => fruit.field === searchFilter);
                        //debugger;
                        v = $("#" + searchFilter).val();
                        if ($("#" + searchFilter).data("kendoMultiSelect")) {
                            v = $("#" + searchFilter).data("kendoMultiSelect").value().join(',');
                        }
                        if (v == null) v = "(BLANK)";

                        if (obj2) {

                            //dropdownlist 는 change 가 "" 일 경우 감지를 못함.
                            if ($("#" + searchFilter).data("kendoDropDownList")) {
                                isBlank = false;
                                // if($("#"+searchFilter).closest('div').find("span.k-input")[0].innerText=='') isBlank = true;
                                // else if(v=="") isBlank = true;
                                if (v == "") isBlank = true;

                                if (isBlank) {
                                    jQuery(obj).each(function (index) {
                                        if (obj[index]) {
                                            if (obj[index].field == searchFilter) {
                                                console.log("필더없음???" + searchFilter);
                                                //$('#grid').data('kendoGrid').dataSource.transport.options.read.data
                                                //$('#grid').data('kendoGrid').dataSource.options.transport.read.data
                                                $('#grid').data('kendoGrid').dataSource._filter.filters.slice(index, 1);
                                                obj.splice(index, 1);
                                                console.log($('#grid').data('kendoGrid').dataSource._filter.filters);
                                            }
                                        }
                                    });
                                } else {
                                    obj2.value = v;
                                }
                            } else if ($("#" + searchFilter).data("kendoMultiSelect")) {
                                isBlank = false;
                                if ($("#" + searchFilter).closest('div').find('ul')[0].innerText == '') isBlank = true;
                                else if (v == "") isBlank = true;

                                if (isBlank) {
                                    jQuery(obj).each(function (index) {
                                        if (obj[index]) {
                                            if (obj[index].field == searchFilter) {
                                                console.log("필더없음???" + searchFilter);
                                                //$('#grid').data('kendoGrid').dataSource.transport.options.read.data
                                                //$('#grid').data('kendoGrid').dataSource.options.transport.read.data
                                                $('#grid').data('kendoGrid').dataSource._filter.filters.slice(index, 1);
                                                obj.splice(index, 1);
                                                console.log($('#grid').data('kendoGrid').dataSource._filter.filters);
                                            }
                                        }
                                    });
                                } else {
                                    obj2.value = v;
                                }
                            }
                        } else {
                            //console.log("zzz="+v);

                            if ($("#" + searchFilter).data("kendoDropDownList")) {
                                isBlank = false;
                                // if($("#"+searchFilter).closest('div').find("span.k-input")[0].innerText=='') isBlank = true;
                                // else if(v=="") isBlank = true;
                                if (v == "") isBlank = true;

                                if (!isBlank) {
                                    if ($('#grid').data('kendoGrid').dataSource.options.serverFiltering) {
                                        obj.push({ operator: "eq", value: v, field: searchFilter });
                                    }
                                }
                            } else if ($("#" + searchFilter).data("kendoMultiSelect")) {
                                isBlank = false;
                                if ($("#" + searchFilter).closest('div').find('ul')[0].innerText == '') isBlank = true;
                                else if (v == "") isBlank = true;

                                if (!isBlank) {
                                    if ($('#grid').data('kendoGrid').dataSource.options.serverFiltering) {
                                        obj.push({ operator: "doesnotendwith", value: v, field: searchFilter });        //in
                                    }
                                }

                            }
                        }
                    }

                });

                if (document.getElementById('allFilter').value != "") {

                    if (event == undefined
                        && JSON.stringify($('#grid').data('kendoGrid').dataSource._filter.filters) == "[]"
                        && isJsonString(document.getElementById('allFilter').value)) {
                        $('#grid').data('kendoGrid').dataSource._filter.filters = eval(document.getElementById('allFilter').value);

                    } else if (event.type == "DOMContentLoaded"
                        && JSON.stringify($('#grid').data('kendoGrid').dataSource._filter.filters) == "[]"
                        && isJsonString(document.getElementById('allFilter').value)) {
                        $('#grid').data('kendoGrid').dataSource._filter.filters = eval(document.getElementById('allFilter').value);

                    }

                    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.allFilter = JSON.stringify($('#grid').data('kendoGrid').dataSource._filter.filters);
                    p_filter = $('#grid').data('kendoGrid').dataSource._filter.filters;

                    if (p_filter.length == 0 && $('#div_temp1').attr('filters') != "" && $('#div_temp1').attr('filters') != undefined) {
                        p_filter = JSON.parse($('#div_temp1').attr('filters'));
                        $('#grid').data('kendoGrid').dataSource._filter.filters = p_filter;
                    }

                    pp_filter = []; client_filter = [];
                    if ($('#grid').data('kendoGrid').dataSource.options.serverFiltering == false) {


                        for (i = 0; i < p_filter.length; i++) {
                            if (InStr(p_filter[i].field, 'toolbar') > 0) {
                                pp_filter.push(p_filter[i]);
                            } else {
                                client_filter.push(p_filter[i]);
                            }
                        }
                        p_filter = pp_filter;
                        $('#grid').data('kendoGrid').dataSource._filter.filters = p_filter;

                    }

                    filter = "";
                    for (i = 0; i < p_filter.length; i++) {
                        if (i > 0) filter = filter + " and ";
                        filter = filter + p_filter[i].field + " " + p_filter[i].operator + " '" + p_filter[i].value + "'";
                    }

                    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.$filter = filter;
                    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.allFilter = JSON.stringify(p_filter);
                    //위 까지는 json 전송을 위한 필터. setTimeout 은 클라이언트용.

                    setTimeout(function (p_client_filter) {

                        var p_allFilter = JSON.parse(document.getElementById('allFilter').value);
                        $('#grid').data('kendoGrid').dataSource._filter.filters = p_client_filter;
                        forMax = p_allFilter.length;
                        for (i = 0; i < forMax; i++) {

                            if (Left(p_allFilter[i].field, 11) == "toolbarSel_") {
                                if ($("#" + p_allFilter[i].field)[0]) {
                                    if ($("#" + p_allFilter[i].field).data("kendoDropDownList")) {
                                        $("#" + p_allFilter[i].field).data("kendoDropDownList").value(p_allFilter[i].operator);
                                        $("#" + replaceAll(p_allFilter[i].field, "toolbarSel_", "toolbarTxt_")).val(p_allFilter[i].value);
                                    } else {
                                        if (p_allFilter[i].operator == 'between' || p_allFilter[i].operator == 'gte') {
                                            $("#" + p_allFilter[i].field)[0].value = p_allFilter[i].value.split('~')[0];
                                        } else if (p_allFilter[i].operator == 'lte') {
                                            $("#" + p_allFilter[i].field + "_end")[0].value = p_allFilter[i].value;
                                        }
                                    }
                                }
                            } else if (Left(p_allFilter[i].field, 8) == "toolbar_") {
                                if (p_allFilter[i].operator == "doesnotendwith") {
                                    $("#" + p_allFilter[i].field).closest("div")[0].title = p_allFilter[i].value.split(",");
                                    $("#" + p_allFilter[i].field).data("kendoMultiSelect").value(p_allFilter[i].value.split(","));
                                } else {
                                    $("#" + p_allFilter[i].field).data("kendoDropDownList").value(p_allFilter[i].value);
                                }
                            } else {
                                var obj = $('#grid thead input[data-text-field=' + p_allFilter[i].field + ']');
                                if (obj[0]) {
                                    obj.val(p_allFilter[i].value);
                                    obj.attr('init_value', p_allFilter[i].value);
                                    //debugger;
                                }
                            }
                        }
                        //debugger;

                        document.getElementById('allFilter').value = "";

                    }, 0, client_filter);
                } else {

                    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.allFilter = JSON.stringify($('#grid').data('kendoGrid').dataSource._filter.filters);
                    $('#grid').data('kendoGrid').dataSource.options.transport.read.data.allFilter = JSON.stringify($('#grid').data('kendoGrid').dataSource._filter.filters);

                    if ($('input#chartKey')[0]) {
                        if ($('input#chartKey').data('kendoDropDownList')) {
                            $('#grid').data('kendoGrid').dataSource.transport.options.read.data.chartKey = $('input#chartKey').data('kendoDropDownList').value();
                            $('#grid').data('kendoGrid').dataSource.options.transport.read.data.chartKey = $('input#chartKey').data('kendoDropDownList').value();
                            $('#grid').data('kendoGrid').dataSource.transport.options.read.data.chartNumberColumns = $('#chartNumberColumns').data('kendoMultiSelect').value().toString();
                            $('#grid').data('kendoGrid').dataSource.options.transport.read.data.chartNumberColumns = $('#chartNumberColumns').data('kendoMultiSelect').value().toString();
                        } else if ($('input#chartKey').val() != '' && $('input#chartKey').val() != undefined) {
                            $('#grid').data('kendoGrid').dataSource.transport.options.read.data.chartKey = $('input#chartKey').val();
                            $('#grid').data('kendoGrid').dataSource.options.transport.read.data.chartKey = $('input#chartKey').val();
                        }
                        $('#grid').data('kendoGrid').dataSource.transport.options.read.data.chartOrderBy = $('select#chartOrderBy').val();
                        $('#grid').data('kendoGrid').dataSource.options.transport.read.data.chartOrderBy = $('select#chartOrderBy').val();
                    }
                    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.grid_load_once_event = document.getElementById('grid_load_once_event').value;
                    $('#grid').data('kendoGrid').dataSource.options.transport.read.data.grid_load_once_event = document.getElementById('grid_load_once_event').value;

                    p_filter = $('#grid').data('kendoGrid').dataSource._filter.filters;
                    if (p_filter.length == 0 && $('#div_temp1').attr('filters') != "" && $('#div_temp1').attr('filters') != undefined) {
                        p_filter = JSON.parse($('#div_temp1').attr('filters'));
                        $('#grid').data('kendoGrid').dataSource._filter.filters = p_filter;
                    }
                    if ($('#grid').data('kendoGrid').dataSource.options.serverFiltering == false) {

                        pp_filter = [];
                        for (i = 0; i < p_filter.length; i++) {
                            if (p_filter[i].operator != "eq" && p_filter[i].operator != "doesnotendwith") pp_filter.push(p_filter[i]);
                        }
                        p_filter = pp_filter;
                        $('#grid').data('kendoGrid').dataSource._filter.filters = p_filter;
                    }
                    filter = "";
                    for (i = 0; i < p_filter.length; i++) {
                        if (i > 0) filter = filter + " and ";
                        filter = filter + p_filter[i].field + " " + p_filter[i].operator + " '" + p_filter[i].value + "'";
                    }
                    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.$filter = filter;


                }

                setTimeout(function () {
                    if ($('#grid').data('kendoGrid').dataSource._filter == undefined) $('#grid').data('kendoGrid').dataSource._filter = { logic: "and", filters: [] };
                    else if ($('#grid').data('kendoGrid').dataSource._filter.filters.length == 0) {
                        $('#grid').data('kendoGrid').dataSource._filter = { logic: "and", filters: [] };
                    }

                    setTimeout(function (p_setTimeout_run_times) {
                        setTimeout(function (pp_setTimeout_run_times) {
                            setTimeout(function (ppp_setTimeout_run_times) {
                                setTimeout(function (pppp_setTimeout_run_times) {
                                    if (pppp_setTimeout_run_times == 0 && $('div#grid').data('kendoGrid').dataSource._total == 0) {
                                        $('a#btn_reload').click();
                                    }
                                }, 100, ppp_setTimeout_run_times);
                            }, 100, pp_setTimeout_run_times);
                        }, 100, p_setTimeout_run_times);
                    }, 100, setTimeout_run_times);
                    ++setTimeout_run_times;
                }, 0);


            },
            schema: {
                model: {
                    id: key_aliasName,
                    fields: p_schema_fieldsAll,
                    _rowFunction: function () {
                        var p_this = this;
                        setTimeout(function (pp_this) {
                            //아래와 같이 rowFunctionAfter 에서 해결해야 선랜더링의 피해가 없다.
                            //if($('td[stopedit="true"]:visible').length)
                            var page = $('#grid').data('kendoGrid').dataSource.page();
                            rowFunctionAfter(pp_this, commentObj[page]);
                            if (page > 1) rowFunctionAfter(pp_this, commentObj[page - 1]);
                        }, 0, p_this);
                        return rowFunction(this);
                    }
                }
            }
        },
        dataBound: function (e) {

            //체크박스갯수가 정렬 등의 문제로 달라지는 현상을 해결함.
            if (select_list() != '' && select_list().split(',').length != $('td[keyidx] input.k-checkbox:checked').length) {
                selectedIds = {};
                $('td[keyidx] input.k-checkbox:checked').each(function (i, o) {
                    selectedIds[$(o).parent().attr('keyidx')] = true;
                });
                $('#grid').data('kendoGrid')._selectedIds = selectedIds;
            }
            /*
        if($("#grid thead input.k-checkbox")[0].checked) {
        $('#grid').data('kendoGrid').dataSource.read(); 진행직후 켄도 오류로 전체선택이 되어 있으면 해제시킨다.
            $("#grid thead input.k-checkbox").click();
        }
            */

            //e.sender.dataSource._total; 
            gridHeight();

            if (!groupable) {
                $("div#grid .k-grid-footer").css("display", "none");
            }

            setTimeout(function () {

                var grid = $('#grid').data('kendoGrid');

                /* chart 로딩 */
                grid_dataBound_chart();
                /* chart 로딩 end */


                //click 이벤트 이중등록 방지를 위해 grid_load_once_event 사용함 : 페이지 로딩/그리드 로딩 후 딱 한번한 실행됨.
                if ($("input#grid_load_once_event").val() == "N") {
                    $("input#grid_load_once_event").val("Y");



                    if ($('#grid').data('kendoGrid').dataSource.options.serverFiltering == false && $('tr.k-filter-row input[init_value]').length > 0) {
                        setTimeout(function () {
                            $('a#btn_reload').click();  //ssssssss
                            $('tr.k-filter-row input[init_value]').each(function () {
                                this.value = $(this).attr('init_value');
                                setTimeout(function (p_this) {
                                    $(p_this).blur();
                                }, 0, this);
                                $(this).removeAttr('init_value');
                            });

                        }, 500);
                    }


                    if ($("a#btn_up")[0] && document.getElementById("parent_idx").value != "") {
                        $("a#btn_up")[0].outerHTML = "";
                        $("a#btn_down")[0].outerHTML = "";
                        $("li#btn_up_overflow")[0].outerHTML = "";
                        $("li#btn_down_overflow")[0].outerHTML = "";
                    }

                    if ($("input#toolbar_brief_insertsql").length == 1) {
                        obj_brief_insertsql = $("input#toolbar_brief_insertsql").kendoDropDownList({
                            optionLabel: "간편추가",
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: [
                                { text: "한줄입력", value: 1 },
                                { text: "두줄입력", value: 2 },
                                { text: "세줄입력", value: 3 },
                                { text: "5 줄입력", value: 5 },
                                { text: "10줄입력", value: 10 },
                                { text: "50줄입력", value: 50 }
                            ],
                            change: function (e) {
                                var dropdownlist = e.sender.element.data("kendoDropDownList");
                                document.treatForm.nmCommand.value = "brief_insertsql";
                                document.treatForm.nmBrief_insertline.value = e.sender.element.val();
                                if (event) {
                                    if (event.ctrlKey == true) {
                                        document.treatForm.nmOpenPopup.value = "N";
                                        setTimeout(function () {
                                            document.treatForm.nmOpenPopup.value = "";
                                        }, 500);
                                    }
                                }
                                if (dropdownlist.element.val() != "") document.treatForm.submit();
                                dropdownlist.select(0);
                            }
                        });
                        obj_brief_insertsql.data("kendoDropDownList").wrapper.attr("title", '컨트롤키를 누르고 추가하면 팝업없이 추가됩니다.');
                        //alert(document.treatForm.nmBrief_insertsql.value);
                    }

                    if (document.getElementById("screenMode").value == "9") {


                        $("a#btn_saveScreen").click(function (e) {
                            if (!confirm("설정을 저장할까요?")) return false;
                            e.preventDefault();
                            //localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());

                            var p_gridOptions = JSON.parse(JSON.stringify(grid.getOptions()));
                            p_gridOptions.dataSource.transport.read.data.recently = iif(document.getElementById("Anti_SortWrite").value == "Y", "N", "Y");

                            $.post("gridOptions_save.php", {
                                RealPid: $("input#RealPid").val(),
                                MisJoinPid: $("input#MisJoinPid").val(),
                                gridOptions: kendo.stringify(p_gridOptions)
                            }).done(function (e) {
                                if (e[0].msg != "") alert(e[0].msg);
                                $("a#btn_resetScreen")[0].style.setProperty("display", "inline-block", "important");
                                $("li#btn_resetScreen_overflow")[0].style.setProperty("display", "inline-block", "important");
                            });

                        });
                        $("a#btn_resetScreen").click(function (e) {

                            if (!confirm("설정을 초기화할까요?")) return false;
                            e.preventDefault();
                            //localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());

                            $.post("gridOptions_save.php", {
                                RealPid: $("input#RealPid").val(),
                                MisJoinPid: $("input#MisJoinPid").val(),
                                gridOptions: ""
                            }).done(function (e) {
                                if (e[0].msg != "") alert(e[0].msg);
                                location.href = location.href.split("#")[0];
                            });

                        });

                    }
                    /*
                    
                    grid.table.on("keyup", function (e) {
                        if(e.keyCode==38) {
                            btn_up_click();
                        } else if(e.keyCode==40) {
                            btn_down_click();
                        }
                    });
                    */
                }

                setTimeout(function () {
                    if (isApple() == true) {   //리스트에서 아이폰/아이패드만의 특이한 에러해소.
                        $('.k-top').click();
                    }
                }, 0);

                //click 이벤트 이중등록 방지를 위해 grid_dataBound_once_event 사용함. : 그리드 데이터완료 시마다 한번씩만 실행됨.
                if ($("input#grid_dataBound_once_event").val() == "N") {
                    if ($("input#grid_dataBound_once_event").attr("first_load") == undefined) {

                        //사용자 로직함수 : grid 로드 후 한번만 실행됨.
                        if (typeof listLogic_afterLoad_once == "function") {
                            setTimeout(function () {
                                listLogic_afterLoad_once();
                            }, 0);
                        }
                        $("input#grid_dataBound_once_event").attr("first_load", "end");
                    }


                    //$('input.k-checkbox[disabled]').closest('tr').find('a.k-button').css('display','none');


                    $("input#grid_dataBound_once_event").val("Y");
                    // tr 클릭시, 선택하는 기능.
                    //var touchtime = 0;
                    //var delay = 800;
                    //var action = null;

                    $("div#grid tbody > tr").click(function () {
                        if (event) {
                            if ($(event.target).closest('span.k-picker-wrap').length == 0 && e.originalEvent?.isTrusted) {  //달력 클릭이 아닐 경우만 작동.
                                //console.log(event.srcElement.tagName);
                                if (event.srcElement.tagName == "TD" || event.srcElement.tagName == "DIV" || event.srcElement.tagName == "SPAN") {
                                    if (event.srcElement.tagName == "TD") {
                                        hasClass_editorStyle = $(event.srcElement).hasClass('editorStyle');
                                    } else {
                                        hasClass_editorStyle = $(event.srcElement).closest('td').hasClass('editorStyle');
                                    }
                                    if (hasClass_editorStyle == false && $(event.srcElement).hasClass('k-file-name') == false && $(event.srcElement).hasClass('k-input') == false) {
                                        var obj = $(this).children("td").find("input.k-checkbox")[0];
                                        $($(this).find('td[comment="Y"]')[0]).keyup();
                                        $("div#grid th").find("input.k-checkbox")[0].checked = true;
                                        $("div#grid th").find("input.k-checkbox")[0].click();
                                        $(obj).click();
                                    }
                                }
                            }
                        }

                    });


                    $("#grid table").on("keydown", function (e) {
                        if (e.keyCode == 13) {
                            e.stopImmediatePropagation();
                            var grid = $('#grid').data('kendoGrid');
                            var currentCell = grid.current();
                            if (currentCell.attr("comment") == "Y") currentCell.click();
                        }
                    });


                    if ($('body[onlylist]').length == 0) $('td[comment="Y"]').keyup(function () {
                        if (parent.document.getElementById("jsonname")) {
                            if (parent.document.getElementById("jsonname").value != "") {
                                toastr.error("백업본은 목록조회만 가능합니다.", "", { timeOut: 10000, positionClass: "toast-bottom-right" });
                                return false;
                            }
                        }
                        if (InStr($(this).attr("class"), "editorStyle") <= 0
                            || event.srcElement.id == "btn_view" || event.srcElement.id == "btn_modify") {

                            var idx = getIdx_gridRowTr($(this).parent());

                            if (document.getElementById('keyidx_123').value == 'Y') {

                                var title = getTitle_aliasName(key_aliasName) + ":" + idx + " 상세";
                                var url = location.href.split('?')[0] + "?gubun=" + document.getElementById("gubun").value + "&idx=" + idx + iif(document.getElementById("isDeleteList").value == "Y", "&isDeleteList=Y", "");

                                if (getCookie("modify_YN") == "Y" && $('a#btn_modify')[0]) {
                                    if ($(this).parent().attr("stopEdit") != "true") url = url + "&ActionFlag=modify";
                                }
                                if (document.getElementById("parent_gubun").value != "") url = url + "&parent_gubun=" + document.getElementById("parent_gubun").value;
                                if (document.getElementById("parent_idx").value != "") url = url + "&parent_idx=" + document.getElementById("parent_idx").value;
                            } else {
                                var title = getTitle_aliasName(key_aliasName) + ":" + idx + " 상세";
                                var url = location.href.split('?')[0] + "?gubun=" + document.getElementById("gubun").value + "&idx=" + idx + iif(document.getElementById("isDeleteList").value == "Y", "&isDeleteList=Y", "");

                                if (getCookie("modify_YN") == "Y" && $('a#btn_modify')[0]) {
                                    if ($(this).parent().attr("stopEdit") != "true") url = url + "&ActionFlag=modify";
                                }
                                if (document.getElementById("parent_gubun").value != "") url = url + "&parent_gubun=" + document.getElementById("parent_gubun").value;
                                if (document.getElementById("parent_idx").value != "") url = url + "&parent_idx=" + document.getElementById("parent_idx").value;
                            }

                            url = url + "&isAddURL=Y";
                            var ctrl_key = false;

                            if (event) {
                                if (event.ctrlKey) {
                                    ctrl_key = true;
                                }
                            }
                            if (ctrl_key) {
                                window.open(url, title);
                            } else {
                                url = url + "&isIframe=Y";

                                if ($('body[topsite="notmis"]')[0]) {
                                    location.replace(url);
                                } else if (getFrameObj("grid_right") == null && getFrameObj("grid_bottom") == null || getUrlParameter("isSplitter") != "Y" && $('body').attr('ispopup') == 'N' && (event.shiftKey || !isMainFrame()
                                    || getCookie('viewTarget') == "popup" || document.getElementById("viewTarget_once").value == "popup")) {

                                    if (document.getElementById("last_frameElementId").value != "") {
                                        if ($("iframe#" + document.getElementById("last_frameElementId").value).closest("div.k-widget.k-window").css("display") == "none") {
                                            parent_popup_jquery(url, title);
                                        } else {
                                            kendo.ui.progress($(getFrameObj(document.getElementById("last_frameElementId").value).document.body), true);
                                            setTimeout(function () { if (document.getElementById("last_frameElementId").value != "") kendo.ui.progress($(getFrameObj(document.getElementById("last_frameElementId").value).document.body), false); }, 3000);
                                            getFrameObj(document.getElementById("last_frameElementId").value).read_idx(idx);
                                        }
                                    } else parent_popup_jquery(url, title);

                                    //2443 라인과 같음(붙여넣기할것)
                                } else {

                                    splitter_right_read_idx(idx, url);

                                }
                            }
                        }
                    });



                    setTimeout(function () { $("input#grid_dataBound_once_event").val("N"); }, 0);

                }


                //사용자 로직함수 : grid 로드 후 데이터 로딩마다 실행됨.
                if (typeof listLogic_afterLoad_continue == "function") setTimeout(function () {
                    listLogic_afterLoad_continue();
                }, 0);


            }, 0);

            //제1정렬이 있으면 실선으로--> 전체합계 때는 이미 느림으로 제외


        },
        persistSelection: true,
        resizable: true,
        reorderable: true,
        editable: document.getElementById("isAuthW").value == "Y",
        groupable: groupable,
        filterable: {
            mode: "row",
            //field: "text",
            //extra: false, //do not show extra filters
            operator: "contains",
            operators: {
                string: {
                    contains: "contains"
                }
            }
        },

        navigatable: true,

        //selectable: "multiple cell",
        allowCopy: true,

        sortable: {
            mode: "multiple",
            allowUnsort: true,
            showIndexes: true,
        },
        pageable: true,
        edit: function (e) {
            //rowFunctionAfter 에서 사용자 정의 로직에 의해 stopEdit=true 이면 셀편집 방지를 한다.
            if (!e.model.IsNotEditable) {
                if (e.container.attr("stopEdit") == "true") {
                    this.closeCell();
                }
            }
        },

        columns: p_columns,
        sort: onSorting_ChkOnlySum,
    });
}

function treemenu_select(e) {
    sel_idx = $('div#treemenu').data('kendoTreeView').dataItem(e.node).id;
    if (sel_idx == undefined) return false;
    $('tr.k-master-row.k-state-selected').removeClass('k-state-selected');
    $($(getGridRowObj_idx(sel_idx)).find('input[type="checkbox"]')[0]).click();
    btn_downup_click();
}

function draw_treemenu(p_result) {


    key_index = getObjectsIndex(p_columns_1D, 'field', key_aliasName);
    k0 = key_aliasName;
    //key_aliasName 의 다음항목과 그 다음항목이 숨겨져 있으면 treemenu 작동을 못할 수 있음.
    if (key_index == 1) {
        k1 = p_columns_1D[3].field;
        k2 = p_columns_1D[4].field;
    } else if (key_index == 3) {
        k1 = p_columns_1D[4].field;
        k2 = p_columns_1D[5].field;
    }
    cnt = p_result.length;

    aa_json = [];

    if (cnt > 0) {
        for (i = 0; i < cnt; i++) {
            aa_json.push({ 'id': p_result[i][k0], 'text': p_result[i][k0] + ' | ' + replaceAll(p_result[i][k1] + ' > ' + p_result[i][k2], ' | ', ' : ') });
        }

        aa = JSON.stringify(aa_json);
        //tree 구조답게 > 기호가 있을 경우와 없는 경우로 나눠서 계산.
        if (InStr(aa_json[0].text, '>') > 0) {

            ss = aa.split(' | ');
            rr0 = '{ text: "@text", expanded: true, items: [@items] }';

            rr = '[';
            for (ii = 1; ii < ss.length; ii++) {
                gg_prev = '';
                gg_next = '';
                gg = ss[ii].split(' > ')[0];
                if (ii > 0) gg_prev = ss[ii - 1].split(' > ')[0];
                if (ii < ss.length - 1) gg_next = ss[ii + 1].split(' > ')[0];

                if (ii == 0 || gg_prev != gg) {
                    rr = rr + iif(ii <= 1, '', ',') + replaceAll(rr0, '@text', gg);
                }
                tt = aa_json[ii - 1].text.split(' | ')[1];
                if (tt.split(' > ').length == 2) tt = tt.split(' > ')[1];
                rr = replaceAll(rr, '@items', '{"id":"' + aa_json[ii - 1].id + '","text":"' + tt + '"' + iif(aa_json[ii - 1].checked, ', "checked": true', '') + '},@items');

                if (gg_next != gg) rr = replaceAll(rr, ',@items', '');
            }

            rr = rr + ']';
            rr = replaceAll(replaceAll(rr, String.fromCharCode(10), ''), String.fromCharCode(13), '');
            rr = replaceAll(rr, '},@items] }]', '}] }]');
            var selectItems = eval(rr);

            if (selectItems) data_source = selectItems;

        } else {

            data_source = aa_json;

        }
    } else {

        data_source = aa_json;

    }




    $("#treemenu").kendoTreeView({
        dataSource: data_source,
        checkboxes: $('input#BodyType')[0].value != 'simplelist',
        dataTextField: ["text"],
        select: treemenu_select,
    });


}
function select_list() {
    if ($('#grid').data('kendoGrid') == undefined) return "[]";
    var selectList = $('#grid').data('kendoGrid').selectedKeyNames();
    if (getFieldAttr(document.getElementById("key_aliasName").value, "format") == "{0:yyyy-MM-dd}") {
        for (i = 0; i < selectList.length; i++) {
            selectList[i] = date10(selectList[i]);
        }
    }
    $('td[keyidx] input.k-checkbox[disabled]:checked').each(function () {
        var select_index = selectList.indexOf($(this).closest("td").attr("keyidx"));
        if (select_index > -1) selectList.splice(select_index, 1);
    });
    return selectList.join(',');
}

function splitter_right_read_idx(idx, url) {

    if ($('div.chart_option')[0]) {
        $('div.chart_option').remove();
    }
    if (url == undefined) {
        url = location.origin + location.pathname + '?gubun=' + $('input#gubun').val() + '&idx=' + idx + '&isAddURL=Y&isIframe=Y';
        //$(document.getElementById("grid_right")).attr("idx", getCookie("modify_YN")+idx);
    }
    if (document.getElementById('pre').value == '1' && InStr(url, '&pre=1') == 0) {
        url = url + '&pre=1';
    }
    var splitter = $("#horizontal").data("kendoSplitter");

    var size = splitter.size(".k-pane:first");

    if ($(document.getElementById("grid_right")).attr("idx") == getCookie("modify_YN") + idx && size != "100%") {
        setCookie('lastSize_right', size, 1000);
        splitter.size(".k-pane:first", "100%");
    } else {

        $(document.getElementById("grid_right")).attr("idx", getCookie("modify_YN") + idx);
        check_blcoked_frame = false;
        try {
            if (getFrameObj("grid_right")[0]) {
                check_blcoked_frame = getFrameObj("grid_right")[0].location.href;
            }
        } catch (e) {
            check_blcoked_frame = true;
        }
        //아이프레임이 타사이트일 경우를 대비한 로직.
        if (check_blcoked_frame == true) {

        } else if (typeof getFrameObj("grid_right").read_idx == "function" && InStr(url, '&allFilter=') <= 0) {
            if (document.getElementById("RealPid").value == getFrameObj("grid_right").document.getElementById("RealPid").value) {

                //[Violation] Permissions policy violation: unload is not allowed in this document. 에러에 따른 조치=setTimeout
                // 기존 방식보다 안전한 iframe 내부 접근법
                var gridRight = document.getElementById("grid_right");
                if (gridRight && gridRight.contentDocument) {
                    try {
                        // jQuery의 .find() 대신 querySelector를 사용하여 브라우저 부하를 줄임
                        var pdfViewer = gridRight.contentDocument.querySelector('div.k-content.k-pdf-viewer');
                        if (pdfViewer) {
                            // 로직 실행
                        }
                    } catch (e) {
                        // 크로스 도메인(localhost vs 127.0.0.1) 이슈 발생 시 예외 처리
                        console.warn("PDF 뷰어 접근 중 보안 정책 위반 가능성:", e);
                    }
                } else if (getFrameObj("grid_right").document.getElementById("ActionFlag").value == "modify" && InStr(url, "ActionFlag=modify") > 0) {
                    if (document.getElementById('keyidx_123').value == 'N') {
                        url = "";
                    }
                } else if ($('a#btn_modify').is(':visible') == true && getFrameObj("grid_right").document.getElementById("ActionFlag").value == "view" && InStr(url, "ActionFlag=modify") <= 0) {
                    if (document.getElementById('keyidx_123').value == 'N') {
                        url = "";
                    }
                }
            }
        }
        kendo.ui.progress($("body"), true);
        setTimeout(function () { kendo.ui.progress($("body"), false); }, 3000);


        obj_grid_gubun = $('iframe[grid_gubun=' + document.getElementById("gubun").value + ']')[0];
        if (obj_grid_gubun) {
            if (check_blcoked_frame == true) {
                obj_grid_gubun.outerHTML = '';
                obj_grid_gubun = $('iframe[grid_gubun=' + document.getElementById("gubun").value + ']')[0];
                $(obj_grid_gubun).attr("idx", getCookie("modify_YN") + idx);
            } else if (obj_grid_gubun.id == 'grid_right' && getFrameObj("grid_right").read_idx && InStr(url, '&allFilter=') <= 0) {

                //인쇄용일 경우 항상 새로 호출 : typeof getFrameObj("grid_right").userDefine_page_print=='object' --> 새로 호출 없는 기술(과제)
                if (getFrameObj("grid_right").getID('ActionFlag').value == 'write'
                    || getFrameObj("grid_right").getID('ActionFlag').value == 'view' && getCookie("modify_YN") == 'Y'
                    || getFrameObj("grid_right").getID('ActionFlag').value == 'modify' && getCookie("modify_YN") == 'N'
                    || typeof getFrameObj("grid_right").userDefine_page_print == 'object') {
                    /* 인쇄용일 경우 항상 새로 호출 안하는 로직.... 연구중. 미완.
                    if(typeof getFrameObj("grid_right").userDefine_page_print=='object') {
                        getFrameObj("grid_right").$('div.viewPrint')[0].outerHTML = '<table class="viewPrint">'+getFrameObj("grid_right").$('div.viewPrint')[0].outerHTML+'</table>';
                    } else
                    */
                    obj_grid_gubun.outerHTML = '';
                    obj_grid_gubun = $('iframe[grid_gubun=' + document.getElementById("gubun").value + ']')[0];
                    $(obj_grid_gubun).attr("idx", getCookie("modify_YN") + idx);


                }/* else if(document.getElementById('pre').value=='1' && InStr(obj_grid_gubun.src,'&pre=1')==0
                || document.getElementById('pre').value!='1' && InStr(obj_grid_gubun.src,'&pre=1')>0) {
                    obj_grid_gubun.outerHTML = '';
                    obj_grid_gubun = $('iframe[grid_gubun='+document.getElementById("gubun").value+']')[0];
                    $(obj_grid_gubun).attr("idx",getCookie("modify_YN")+idx);
                }*/
            }
        }
        if (obj_grid_gubun) {

            if (obj_grid_gubun.id == 'grid_right' && getFrameObj("grid_right").read_idx && InStr(url, '&allFilter=') <= 0) {
                getFrameObj("grid_right").read_idx(idx);
            } else {
                //아래 네줄 변경불가.
                $('iframe#grid_right')[0].id = 'grid_hidden';
                if ($('iframe#grid_right')[0]) {
                    $('iframe#grid_right')[0].id = 'grid_hidden';
                }


                $('iframe[grid_gubun=' + document.getElementById("gubun").value + ']')[0].id = 'grid_right';

                if (getFrameObj("grid_right").read_idx && InStr(url, '&allFilter=') <= 0) {
                    if (document.getElementById('pre').value == '1' && InStr(obj_grid_gubun.src, '&pre=1') == 0
                        || document.getElementById('pre').value != '1' && InStr(obj_grid_gubun.src, '&pre=1') > 0) {
                        document.getElementById("grid_right").src = url;
                    } else {
                        getFrameObj("grid_right").read_idx(idx);
                    }
                } else {
                    document.getElementById("grid_right").src = url;
                }
            }

        } else {
            $('iframe[grid_right_origin]')[0].id = 'grid_hidden';
            if ($('iframe#grid_right')[0]) {
                $('iframe#grid_right')[0].id = 'grid_hidden';
            }
            $('body').append(`<iframe id="grid_right" grid_gubun="` + document.getElementById("gubun").value + `" src="about:blank" marginwidth=0 marginheight=0 frameborder=0 scrolling="no" style="width:100%;overflow-x: hidden;overflow-y: hidden;"
            width="100%" height="100%"></iframe>`);
            if (url != "") {
                document.getElementById("grid_right").src = url;
            } else {
                document.getElementById("grid_right").src = url0;
            }
            $('iframe#grid_right').attr("idx", getCookie("modify_YN") + idx);
        }
        setTimeout(function () {
            resize_ifr_split();
        });

        $('iframe#grid_right')[0].style.display = 'block';

        if (size == "100%" || $("div#right-pane").width() <= 30) {
            if ($(document).width() < 600) {
                setCookie('lastSize_right', '0px');
            }
            now_size = replaceAll(replaceAll(getCookie('lastSize_right'), 'px', ''), '%', '');
            if (isNumeric(now_size)) {
                if (now_size > $(document).width() - 100 || now_size < 0) {
                    splitter.size(".k-pane:first", "33%");
                } else {
                    splitter.size(".k-pane:first", getCookie('lastSize_right'));
                }
            } else {
                splitter.size(".k-pane:first", "33%");
            }
        }
    }
}


var pre_status_url = '';
grid_fun = function (p_dataSource_sort, p_filter, p_group, p_schema_fieldsAll, p_columns) {

    if (p_columns.length <= 1) return false;

    if (!groupable) p_group = [];

    return $("#grid").kendoGrid({
        excel: {
            fileName: document.getElementById("MenuName").value + "_" + today15() + ".xlsx",
            filterable: false,
            allPages: true
        },
        pdf: {
            fileName: document.getElementById("MenuName").value + "_" + today15() + ".pdf",
            allPages: true,
            avoidLinks: true,
            paperSize: "A4",
            margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
            landscape: true,
            repeatHeaders: true,
            template: $("#pdf-template").html(),
            scale: 0.8
        },
        //timezone: "Asia/Seoul",
        saveChanges: function (e) {

        },
        page: function (e) {
            $('.k-grid-content.k-auto-scrollable')[0].scrollTop = 0;
        },
        dataSource: {
            //timezone: "Asia/Seoul",
            type: "odata",
            serverPaging: document.getElementById("jsonname").value == "",
            serverSorting: document.getElementById("jsonname").value == "",
            serverFiltering: document.getElementById("jsonname").value == "",
            sort: p_dataSource_sort,

            filter: p_filter,

            group: p_group,
            aggregate: p_aggregate,
            pageSize: iif(document.getElementById("pageSizes").value == "0", "50", document.getElementById("pageSizes").value) * 1,
            transport: {
                read: {
                    type: "POST",
                    dataType: "jsonp",
                    url: iif(document.getElementById("jsonname").value != "", "list_jsonfile.php?jsonname=" + document.getElementById("jsonname").value, document.getElementById("jsonUrl").value + "list_json.php?flag=read"
                        + iif($('body').attr('parentActionFlag'), "&parentActionFlag=" + $('body').attr('parentActionFlag'), "")
                        + "&ChkOnlySum=" + iif(getUrlParameter('ChkOnlySum'), getUrlParameter('ChkOnlySum'), "")
                        + "&RealPid=" + document.getElementById("RealPid").value
                        + "&MisJoinPid=" + document.getElementById("MisJoinPid").value
                        + "&isDeleteList=" + document.getElementById("isDeleteList").value
                        + "&parent_gubun=" + document.getElementById("parent_gubun").value
                        + "&parent_idx=" + document.getElementById("parent_idx").value
                        + "&helpbox_parent_idx=" + iif(getUrlParameter('helpbox_parent_idx'), getUrlParameter('helpbox_parent_idx'), "")
                        + "&helpbox=" + iif(getUrlParameter('helpbox'), getUrlParameter('helpbox'), "")
                        + "&sel_idx=" + iif(getUrlParameter('sel_idx'), getUrlParameter('sel_idx'), "")
                        + "&lite=" + iif(getUrlParameter('lite') == 'Y', 'Y', '')
                        + "&pre=" + document.getElementById("pre").value
                        + "&addParam=" + document.getElementById("addParam").value
                        + iif(document.getElementById("jsonUrl").value != "" && document.getElementById("MS_MJ_MY").value == "MY", "&remote_MS_MJ_MY=MY", "")),
                    data: {
                        isSql: getUrlParameter("isSql"),
                        isSkipZero: function () {
                            if (pre_status_url == '') return false;
                            if (pre_status_url != status_url()) {
                                $('#grid').data('kendoGrid').dataSource._skip = 0;
                                return true;
                            }
                            return false;
                        },
                        recently: function () { return iif(document.getElementById("Anti_SortWrite").value == "Y", "N", "Y"); },
                        isDeleteList: document.getElementById("isDeleteList").value,
                        app: getUrlParameter('app') == undefined ? '' : getUrlParameter('app'),
                        allFilter: "",
                        selectList: "",
                        backup: "",
                        chartKey: "",
                        grid_load_once_event: document.getElementById("grid_load_once_event").value,
                        chartNumberColumns: "",
                        chartOrderBy: "",
                        chartTop: iif(getUrlParameter("chartTop"), getUrlParameter("chartTop"), "")
                    },
                    beforeSend: function (jqXHR, textStatus) {
                        //debugger;
                        //$('#grid').data('kendoGrid').dataSource.options.transport.read.data.selectList = select_list();
                        //$('#grid').data('kendoGrid').dataSource.transport.options.read.data.selectList = select_list();
                        textStatus.data = replaceAll(textStatus.data, '&selectList=', '&selectList=' + select_list());
                    },
                    complete: function (jqXHR, textStatus) {
                        displayLoadingOff();

                        if (jqXHR.responseJSON == undefined) {
                            //toastr.error("해당 내역 조회에 실패했습니다.");
                            if (InStr(jqXHR.responseText, '</table>') > 0) {
                                download(jqXHR.responseText, $('input#MenuName')[0].value + "_" + today15() + ".xls", "application/zip");
                            }
                            return false;
                        }
                        if (jqXHR.responseJSON.d.resultCode == "success") {

                            pre_status_url = status_url();
                            if (getUrlParameter('treemenu') == 'Y') {
                                draw_treemenu(jqXHR.responseJSON.d.results);
                            }

                            $("a#btn_menuName").text("※ " + document.getElementById("MenuName").value);
                            //$("li#btn_menuName_overflow")[0].style.setProperty ("display", "none", "important");
                            var panelBar = $("#panelbar-left").data("kendoPanelBar");
                            //panelBar.select($($('div#panelbar-left > li')[4]));

                            if (document.getElementById("jsonname").value != "") {
                                toastr.success("백업본파일 " + document.getElementById("jsonname").value + " 이 정상적으로 조회되었습니다.", "", { timeOut: 7000, positionClass: "toast-bottom-right" });
                            } else {
                                $('span.list_resultMessage').closest('div[aria-live="polite"]').remove();
                                if (jqXHR.responseJSON.d.pagenumber == 1 && jqXHR.responseJSON.d.__count * 1 == jqXHR.responseJSON.d.results.length) {
                                    toastr.success(jqXHR.responseJSON.d.resultMessage, '<span class="list_resultMessage"></span>', { timeOut: 7000, toastClass: "toast-list", positionClass: "toast-bottom-right" });
                                } else if (document.getElementById('ChkOnlySum').value == '2') {
                                    msg = jqXHR.responseJSON.d.resultMessage;
                                    msg = replaceAll(msg, jqXHR.responseJSON.d.__count, jqXHR.responseJSON.d.results.length);
                                    toastr.success(msg, '<span class="list_resultMessage"></span>', { timeOut: 7000, positionClass: "toast-bottom-right" });
                                }
                            }

                            if (jqXHR.responseJSON.d.__devQuery_url && isMobile() == false) {
                                $('a.dev_query').closest('div[aria-live="polite"]').remove();
                                toastr.info('<a class="dev_query" href="javascript:;" onclick="query_popup(\'' + jqXHR.responseJSON.d.__devQuery_url + '\');">쿼리를 보시려면 여기를 클릭하세요!</a>', '', { timeOut: 37000 });
                            }
                            if (isMainFrame()) {
                                commentObj[jqXHR.responseJSON.d.pagenumber] = jqXHR.responseJSON.d.commentData;
                            } else {
                                commentObj[jqXHR.responseJSON.d.pagenumber] = jqXHR.responseJSON.d.commentData;

                                tabObj = parent.$("div#round_" + windowID()).closest("div[tabnumber]");

                                if (tabObj) {
                                    tabnumber = tabObj.attr("tabnumber");
                                    if (tabnumber != undefined) {
                                        if (jqXHR.responseJSON.d.__count * 1 > 99) {
                                            parent.$('body li[tabnumber="' + tabnumber + '"] span.cnt').text("99+");
                                        } else {
                                            parent.$('body li[tabnumber="' + tabnumber + '"] span.cnt').text(jqXHR.responseJSON.d.__count);
                                        }
                                        parent.$('body li[tabnumber="' + tabnumber + '"] span.cnt').attr("cnt", jqXHR.responseJSON.d.__count);
                                    }
                                }

                                setTimeout(function () {
                                    $(window).resize();
                                });
                            }
                        } else if (jqXHR.responseJSON.d.resultCode != "") {
                            result = jqXHR.responseJSON.d.resultMessage;
                            if (result.length <= 500 && InStr(result, '<!--') == 0) {
                                alert(result);
                            } else {
                                if (jqXHR.responseJSON.d.__devQuery_url) {
                                    $('a.dev_query').closest('div[aria-live="polite"]').remove();
                                    toastr.error('<a class="dev_query" href="javascript:;" onclick="query_popup(\'' + jqXHR.responseJSON.d.__devQuery_url + '\');">에러쿼리를 보시려면 여기를 클릭하세요!</a>', '저장에러', { timeOut: 7000 });
                                } else {
                                    toastr.error('관리자에게 문의하세요. : ' + result, '에러');
                                }
                            }
                        }
                        if (jqXHR.responseJSON.d.afterScript != "") {
                            try {
                                eval(jqXHR.responseJSON.d.afterScript);
                            } catch (error) {
                                alert(jqXHR.responseJSON.d.afterScript);
                            }
                        }

                        if (typeof updateChart == "function") {
                            if ($('input#chartKey').val() != '' && $('input#chartKey').val() != undefined) updateChart(jqXHR.responseJSON.d.chart_data);
                        }

                    }
                },
                update: {
                    type: "POST",
                    //cache: true,
                    url: "list_json.php?flag=update&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&parent_idx=" + document.getElementById("parent_idx").value
                        + "&pre=" + document.getElementById("pre").value
                        + "&addParam=" + document.getElementById("addParam").value
                        + "&$callback=jQuery" + Date.now(),
                    data: function () {
                        return { updateList: updateList };
                    },
                    beforeSend: function (jqXHR, textStatus) {

                        if (document.getElementById("stopUpdate").value == "Y") {
                            //grid 에서 multiselect 영역을 그냥 클릭 후 blur 될때 [object object] 현상때문에 어쩔 수 없이 이런 식으로 막음.
                            setTimeout(function () { document.getElementById("stopUpdate").value = ""; });
                            displayLoadingOff("body");
                            dirtyClear();
                            return false;
                        }
                    },
                    complete: function (jqXHR, textStatus) {
                        console.log("complete");
                        //dirtyClear();

                        var result = JSON.parse("[{" + replaceAll(jqXHR.responseText.split("([{")[1], "}])", "}]"));


                        if (updateList["_up_joinFieldValue"] == undefined) {
                            if (result.resultCode == 'fail') {
                                toastr.error(getTitle_aliasName(updateList["_up_field"]) + "::: " + updateList["_up_fieldValue"] + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
                            } else {
                                toastr.success(getTitle_aliasName(updateList["_up_field"]) + ":: " + updateList["_up_fieldValue"] + "<br>로 저장이 완료되었습니다.", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
                            }
                        } else {
                            if (result.resultCode == 'fail') {
                                toastr.error(getTitle_aliasName(updateList["_up_joinField"]) + "::: " + updateList["_up_joinFieldValue"] + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
                            } else {
                                toastr.success(getTitle_aliasName(updateList["_up_joinField"]) + ":: " + updateList["_up_joinFieldValue"] + "<br> 로 저장이 완료되었습니다.", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
                            }
                        }

                        if (result[0].__devQuery_url && isMobile() == false) {
                            toastr.info('<a class="q' + result[0].__devQuery_url.split('_q')[1].split('.')[0] + '" href="javascript:;" onclick="query_popup(\'' + result[0].__devQuery_url + '\');">쿼리를 보시려면 여기를 클릭하세요</a>', '', { timeOut: 7000 });
                        }

                        if (result[0].afterScript != "") eval(result[0].afterScript);

                        var key_idx = result[0][document.getElementById("key_aliasName").value];
                        //과제 : 아래 없어도 됨?
                        $.each(result[0], function (key, value) {
                            //if(key=='Grid_ListEdit') debugger;
                            if (document.getElementById("key_aliasName").value != key) setGridCellValue_idx(key_idx, key, value);
                        });
                    },
                }
            },
            error: function (error) {
                //과제 : ListEdit=Y 에서 '' 로 바꿀때 Y 로 안되는 문제
                if (getCookie('devQueryOn') == 'Y') {
                    if (InStr(error.xhr.responseText, '"__devQuery_url": "') > 0) {
                        devQuery_url = error.xhr.responseText.split('"__devQuery_url": "')[1].split('"')[0];
                        setTimeout(function (p_devQuery_url) {
                            $('a.q' + p_devQuery_url.split('_q')[1].split('.')[0]).parent().parent().remove();
                        }, 100, devQuery_url);
                        toastr.info('<a href="javascript:;" onclick="query_popup(\'' + devQuery_url + '\');">저장 쿼리를 보시려면, 여기를 클릭하세요!</a>', '', { timeOut: 7000 });
                    } else if (InStr(error.xhr.responseText, '</table>') == 0) {

                        rnd = getRandomArbitrary(101, 400);
                        toastr.error('<a id="rnd' + rnd + '" href="javascript:;" onclick="query_error_popup(this);">에러쿼리를 보시려면 여기를 클릭하세요.</a>', '', { progressBar: true, timeOut: 7000, positionClass: "toast-bottom-right" });
                        $('a#rnd' + rnd).attr('msg', error.xhr.responseText);
                    }
                }
                setTimeout(function () {
                    if ($('td.k-dirty-cell').length == 1) {
                        setTimeout(function (p_alias, p_idx, p_html) {
                            if ($(getCellObj_idx(p_idx, p_alias)).find('input').length == 0) setGridCellValue_idx(p_idx, p_alias, p_html);
                        }, 1000, getAliasName_tdObj($('td.k-dirty-cell')[0]), getIdx_gridRowTr($('td.k-dirty-cell').closest('tr')), $('td.k-dirty-cell')[0].innerHTML);
                        dirtyClear();
                    }
                }, 0);


            },
            change: function (e) {

                if (e.field == undefined) return false;
                if (e.items[0][e.field] == "[object Object]") {
                    if (event.relatedTarget) {
                        var vList = '';
                        $(event.relatedTarget).closest('.k-list-container').find('li[aria-checked="true"]').each(function (i, t) {
                            vList = vList + iif(i > 0, ',', '') + t.innerText.split(' | ')[0];
                        });
                        e.items[0][e.field] = vList;
                    } else {
                        e.items[0][e.field] = $(event.currentTarget).find('li[aria-selected="true"]').text();
                    }
                }
            },
            requestStart: function (e) {
                if (defaultFilter == "") defaultFilter = $('#grid').data('kendoGrid').dataSource._filter;

                if ($('#grid').data('kendoGrid').dataSource._filter == undefined) {
                    $('#grid').data('kendoGrid').dataSource._filter = defaultFilter;
                } else if ($('#grid').data('kendoGrid').dataSource._filter.filters.length == 0) {
                    $('#grid').data('kendoGrid').dataSource._filter = defaultFilter;
                }
                var obj = $('#grid').data('kendoGrid').dataSource._filter.filters;

                jQuery(obj).each(function (index) {
                    if (obj[index]) {
                        if (obj[index].field == "nomean") {
                            obj.splice(index, 1);
                        } else if (obj[index].value == null) {
                        } else if (InStr(obj[index].value.toString(), "00 GMT+") > 0) {
                            //kendo 의 너무 좋아서 짜증나는 기능 timezone 을 없애버림.
                            dt = Left(obj[index].value.toString().split("00 GMT+")[1], 2) * 1;
                            obj[index].value = new Date(Date.parse(obj[index].value) + dt * 3600 * 1000).toISOString().slice(0, 10);
                        }
                    }
                });
                $('#toolbar span[aria-labelledby]').each(function () {

                    //if(obj.find(fruit => fruit.field === 'nomean')) alert(9);
                    if (InStr($(this).attr("aria-labelledby"), "toolbar_") > 0) {
                        //var searchFilter = replaceAll(replaceAll($(this).attr("aria-labelledby"),"toolbar_",""),"_label","");
                        var searchFilter = replaceAll($(this).attr("aria-labelledby"), "_label", "");
                        //console.log(searchFilter);
                        var obj2 = obj.find(fruit => fruit.field === searchFilter);
                        v = $("#" + searchFilter).val();
                        if ($("#" + searchFilter).data("kendoMultiSelect")) {
                            v = $("#" + searchFilter).data("kendoMultiSelect").value().join(',');
                        }
                        if (v == null) v = "(BLANK)";
                        //debugger;
                        if (obj2) {

                            if ($("#" + searchFilter).data("kendoDropDownList")) {
                                isBlank = false;
                                // if($("#"+searchFilter).closest('div').find("span.k-input")[0].innerText=='') isBlank = true;
                                // else if(v=="") isBlank = true;
                                if (v == "") isBlank = true;

                                if (isBlank) {
                                    jQuery(obj).each(function (index) {
                                        if (obj[index]) {
                                            if (obj[index].field == searchFilter) {
                                                console.log("필더없음???" + searchFilter);
                                                //$('#grid').data('kendoGrid').dataSource.transport.options.read.data
                                                //$('#grid').data('kendoGrid').dataSource.options.transport.read.data
                                                $('#grid').data('kendoGrid').dataSource._filter.filters.slice(index, 1);
                                                obj.splice(index, 1);
                                                console.log($('#grid').data('kendoGrid').dataSource._filter.filters);
                                            }
                                        }
                                    });
                                } else {
                                    obj2.value = v;
                                }
                            } else if ($("#" + searchFilter).data("kendoMultiSelect")) {
                                isBlank = false;
                                if ($("#" + searchFilter).closest('div').find('ul')[0].innerText == '') isBlank = true;
                                else if (v == "") isBlank = true;

                                if (isBlank) {
                                    jQuery(obj).each(function (index) {
                                        if (obj[index]) {
                                            if (obj[index].field == searchFilter) {
                                                console.log("필더없음???" + searchFilter);
                                                //$('#grid').data('kendoGrid').dataSource.transport.options.read.data
                                                //$('#grid').data('kendoGrid').dataSource.options.transport.read.data
                                                $('#grid').data('kendoGrid').dataSource._filter.filters.slice(index, 1);
                                                obj.splice(index, 1);
                                                console.log($('#grid').data('kendoGrid').dataSource._filter.filters);
                                            }
                                        }
                                    });
                                } else {
                                    obj2.value = v;
                                }
                            }
                        } else {
                            //console.log("zzz="+v);

                            if ($("#" + searchFilter).data("kendoDropDownList")) {
                                isBlank = false;
                                // if($("#"+searchFilter).closest('div').find("span.k-input")[0].innerText=='') isBlank = true;
                                // else if(v=="") isBlank = true;
                                if (v == "") isBlank = true;

                                if (!isBlank) {
                                    if ($('#grid').data('kendoGrid').dataSource.options.serverFiltering) {
                                        obj.push({ operator: "eq", value: v, field: searchFilter });
                                    }
                                }
                            } else if ($("#" + searchFilter).data("kendoMultiSelect")) {
                                isBlank = false;
                                if ($("#" + searchFilter).closest('div').find('ul')[0].innerText == '') isBlank = true;
                                else if (v == "") isBlank = true;

                                if (!isBlank) {
                                    if ($('#grid').data('kendoGrid').dataSource.options.serverFiltering) {
                                        obj.push({ operator: "doesnotendwith", value: v, field: searchFilter });        //in
                                    }
                                }

                            }
                        }
                    }

                });


                //console.log($('#grid').data('kendoGrid').dataSource._filter.filters);
                if (document.getElementById('allFilter').value != "") {
                    $('#grid').data('kendoGrid').dataSource._filter.filters = JSON.parse(document.getElementById('allFilter').value);
                    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.allFilter = document.getElementById('allFilter').value;

                    setTimeout(function () {
                        var p_allFilter = JSON.parse(document.getElementById('allFilter').value);

                        forMax = p_allFilter.length;

                        for (i = 0; i < forMax; i++) {
                            if (Left(p_allFilter[i].field, 11) == "toolbarSel_") {
                                if ($("#" + p_allFilter[i].field)[0]) {
                                    if ($("#" + p_allFilter[i].field).data("kendoDropDownList")) {
                                        $("#" + p_allFilter[i].field).data("kendoDropDownList").value(p_allFilter[i].operator);
                                        $("#" + replaceAll(p_allFilter[i].field, "toolbarSel_", "toolbarTxt_")).val(p_allFilter[i].value);
                                    } else {
                                        if (p_allFilter[i].operator == 'between' || p_allFilter[i].operator == 'gte') {
                                            $("#" + p_allFilter[i].field)[0].value = p_allFilter[i].value.split('~')[0];
                                        } else if (p_allFilter[i].operator == 'lte') {
                                            $("#" + p_allFilter[i].field + "_end")[0].value = p_allFilter[i].value;
                                        }
                                    }
                                }
                            } else if (Left(p_allFilter[i].field, 8) == "toolbar_") {
                                if ($("#" + p_allFilter[i].field)[0]) {
                                    if (p_allFilter[i].operator == "doesnotendwith") {
                                        $("#" + p_allFilter[i].field).closest("div")[0].title = p_allFilter[i].value.split(",");
                                        $("#" + p_allFilter[i].field).data("kendoMultiSelect").value(p_allFilter[i].value.split(","));
                                    } else {
                                        $("#" + p_allFilter[i].field).data("kendoDropDownList").value(p_allFilter[i].value);
                                    }
                                }
                            } else {
                                var obj = $('#grid thead input[data-text-field=' + p_allFilter[i].field + ']');
                                if (obj[0]) {
                                    obj.val(p_allFilter[i].value);
                                }
                            }
                        }
                        document.getElementById('allFilter').value = "";
                    });
                } else {

                    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.allFilter = JSON.stringify($('#grid').data('kendoGrid').dataSource._filter.filters);
                    $('#grid').data('kendoGrid').dataSource.options.transport.read.data.allFilter = JSON.stringify($('#grid').data('kendoGrid').dataSource._filter.filters);
                    if ($('input#chartKey')[0]) {
                        if ($('input#chartKey').data('kendoDropDownList')) {
                            $('#grid').data('kendoGrid').dataSource.transport.options.read.data.chartKey = $('input#chartKey').data('kendoDropDownList').value();
                            $('#grid').data('kendoGrid').dataSource.options.transport.read.data.chartKey = $('input#chartKey').data('kendoDropDownList').value();
                            $('#grid').data('kendoGrid').dataSource.transport.options.read.data.chartNumberColumns = $('#chartNumberColumns').data('kendoMultiSelect').value().toString();
                            $('#grid').data('kendoGrid').dataSource.options.transport.read.data.chartNumberColumns = $('#chartNumberColumns').data('kendoMultiSelect').value().toString();
                        } else if ($('input#chartKey').val() != '' && $('input#chartKey').val() != undefined) {

                            /*
                            var kk = json_length($('#grid').data('kendoGrid').dataSource._sortFields);
                            var default_chartKey = '';
                            for(ii=0;ii<kk;ii++) {
                                uu = jsonFromIndex($('#grid').data('kendoGrid').dataSource._sortFields,ii).key;
                                default_chartKey = uu;
                                break;
                            }
                            
                            $('input#chartKey').val(default_chartKey);
                            */
                            $('#grid').data('kendoGrid').dataSource.transport.options.read.data.chartKey = $('input#chartKey').val();
                            $('#grid').data('kendoGrid').dataSource.options.transport.read.data.chartKey = $('input#chartKey').val();
                        }
                        $('#grid').data('kendoGrid').dataSource.transport.options.read.data.chartOrderBy = $('select#chartOrderBy').val();
                        $('#grid').data('kendoGrid').dataSource.options.transport.read.data.chartOrderBy = $('select#chartOrderBy').val();
                    }
                    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.grid_load_once_event = document.getElementById('grid_load_once_event').value;
                    $('#grid').data('kendoGrid').dataSource.options.transport.read.data.grid_load_once_event = document.getElementById('grid_load_once_event').value;
                }

            },
            schema: {
                model: {
                    id: key_aliasName,
                    fields: p_schema_fieldsAll,
                    _rowFunction: function () {

                        if (document.getElementById('ChkOnlySum').value == '2') {
                            setTimeout(function (p_this) {
                                if (typeof rowFunctionAfter_UserDefine_ChkOnlySum == "function") {
                                    rowFunctionAfter_UserDefine_ChkOnlySum(p_this);
                                }
                            }, 0, this);
                            return false;
                        }
                        var p_this = this;
                        setTimeout(function () {
                            //아래와 같이 rowFunctionAfter 에서 해결해야 선랜더링의 피해가 없다.
                            //if($('td[stopedit="true"]:visible').length)
                            if ($('#grid').data('kendoGrid') == undefined) {
                                return false;
                            }
                            var page = $('#grid').data('kendoGrid').dataSource.page();
                            rowFunctionAfter(p_this, commentObj[page]);
                            if (page > 1) rowFunctionAfter(p_this, commentObj[page - 1]);
                        }, 0);
                        return rowFunction(this);
                    }
                }
            },

        },
        dataBinding: function (e) {
            if ($('div#grid').attr('end_loading') != 'Y' && Left(document.getElementById('RealPid').value, 8) != 'speedmis' && typeof use_grid_width_fixed == 'boolean') {
                if (use_grid_width_fixed) grid_width_fixed();
                $('div#grid').attr('end_loading', 'Y');
            }
            //사용자 로직함수 
            if (typeof listLogic_dataBinding == "function") listLogic_dataBinding(e);
        },
        dataBound: function (e) {
            //체크박스갯수가 정렬 등의 문제로 달라지는 현상을 해결함.
            if ($('#grid').data('kendoGrid') && select_list() != '' && select_list().split(',').length != $('td[keyidx] input.k-checkbox:checked').length) {
                selectedIds = {};
                $('td[keyidx] input.k-checkbox:checked').each(function (i, o) {
                    selectedIds[$(o).parent().attr('keyidx')] = true;
                });
                $('#grid').data('kendoGrid')._selectedIds = selectedIds;
            }

            if (typeof listLogic_dataBound == "function") listLogic_dataBound(e);
            /*
        if($("#grid thead input.k-checkbox")[0].checked) {
        $('#grid').data('kendoGrid').dataSource.read(); 진행직후 켄도 오류로 전체선택이 되어 있으면 해제시킨다.
            $("#grid thead input.k-checkbox").click();
        }
            */

            //e.sender.dataSource._total; 
            gridHeight();

            if (!groupable) {
                $("div#grid .k-grid-footer").css("display", "none");
            }
            setTimeout(function () {

                var grid = $('#grid').data('kendoGrid');

                if (grid == undefined) {
                    return false;
                }
                /* chart 로딩 */
                grid_dataBound_chart();
                /* chart 로딩 end */

                //click 이벤트 이중등록 방지를 위해 grid_load_once_event 사용함 : 페이지 로딩/그리드 로딩 후 딱 한번한 실행됨.
                if ($("input#grid_load_once_event").val() == "N") {
                    $("input#grid_load_once_event").val("Y");

                    //페이지 무한스크롤 이슈
                    var pageSizes = [{ text: "무한스크롤", value: 0 }, { text: "50", value: 50 }, { text: "100", value: 100 }, { text: "1000", value: 1000 }, { text: "10000", value: 10000 }];
                    pageObj = $('.k-pager-sizes select[data-role="dropdownlist"]').data('kendoDropDownList');

                    pageObj.setDataSource(new kendo.data.DataSource({ data: pageSizes }));
                    if ($('body').attr('psize') == '0') {
                        pageObj.value('0');
                        if ($('select#virtual_page_sel').length == 0) {
                            $('span.k-pager-sizes.k-label').after($('span.k-pager-sizes.k-label select')[0].outerHTML);
                            $('span.k-pager-sizes.k-label').next().attr('id', 'virtual_page_sel');
                            $('span.k-pager-sizes.k-label').next()[0].title = '선택 시, 기본설정값으로 기억됩니다.';
                            $('select#virtual_page_sel').kendoDropDownList();
                            $('select#virtual_page_sel').data('kendoDropDownList').value(0);
                            $('span.k-pager-sizes.k-label').css('display', 'none');
                            $('select#virtual_page_sel').change(function () {
                                if (this.value * 1 <= 100 && isMainFrame()) setCookie('pageSizes', this.value, 100);
                                if (getUrlParameter('helpbox') != undefined && getUrlParameter('winID') != undefined) {
                                    url = location.href;
                                    if (getUrlParameter('psize') != undefined) url = replaceAll(url, '&psize=' + getUrlParameter('psize'), '');
                                    location.href = url + '&psize=' + this.value;
                                } else {
                                    location.href = status_url() + '&psize=' + this.value;
                                }
                                return false;
                            });
                        }
                    } else {
                        $('span.k-pager-sizes.k-label span')[0].title = '선택 시, 기본설정값으로 기억됩니다.';
                        $('.k-pager-sizes select[data-role="dropdownlist"]').change(function () {
                            if (this.value * 1 <= 100 && isMainFrame()) setCookie('pageSizes', this.value, 100);
                            if (this.value == '0') {
                                if (getUrlParameter('helpbox') != undefined && getUrlParameter('winID') != undefined) {
                                    url = location.href;
                                    if (getUrlParameter('psize') != undefined) url = replaceAll(url, '&psize=' + getUrlParameter('psize'), '');
                                    location.href = url + '&psize=' + this.value;
                                } else {
                                    location.href = status_url() + '&psize=' + this.value;
                                }
                                return false;
                            }
                        });
                    }

                    //아이프레임 리스트의 경우 100개 이하시 필터숨김.-->숨기지 말자.
                    //if(isMainFrame()==false && $('#grid').data('kendoGrid').dataSource._total*1<=5) {
                    //$('tr.k-filter-row')[0].style.display = 'none';
                    //$('body').attr('headrows',$('body').attr('headrows')*1-1)
                    //}

                    if ($("a#btn_up")[0] && document.getElementById("parent_idx").value != "") {
                        $("a#btn_up")[0].outerHTML = "";
                        $("a#btn_down")[0].outerHTML = "";
                        $("li#btn_up_overflow")[0].outerHTML = "";
                        $("li#btn_down_overflow")[0].outerHTML = "";
                    }

                    if ($("input#toolbar_brief_insertsql").length == 1) {
                        obj_brief_insertsql = $("input#toolbar_brief_insertsql").kendoDropDownList({
                            optionLabel: "간편추가",
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: [
                                { text: "한줄입력", value: 1 },
                                { text: "두줄입력", value: 2 },
                                { text: "세줄입력", value: 3 },
                                { text: "5 줄입력", value: 5 },
                                { text: "10줄입력", value: 10 },
                                { text: "50줄입력", value: 50 }
                            ],
                            change: function (e) {
                                var dropdownlist = e.sender.element.data("kendoDropDownList");
                                document.treatForm.nmCommand.value = "brief_insertsql";
                                document.treatForm.nmBrief_insertline.value = e.sender.element.val();
                                if (event) {
                                    if (event.ctrlKey == true) {
                                        document.treatForm.nmOpenPopup.value = "N";
                                        setTimeout(function () {
                                            document.treatForm.nmOpenPopup.value = "";
                                        }, 500);
                                    }
                                }
                                if (dropdownlist.element.val() != "") document.treatForm.submit();
                                dropdownlist.select(0);
                            }
                        });
                        obj_brief_insertsql.data("kendoDropDownList").wrapper.attr("title", '컨트롤키를 누르고 추가하면 팝업없이 추가됩니다.');
                        //alert(document.treatForm.nmBrief_insertsql.value);
                    }

                    if (document.getElementById("screenMode").value == "9") {


                        $("a#btn_saveScreen").click(function (e) {
                            if (!confirm("설정을 저장할까요?")) return false;
                            e.preventDefault();
                            //localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());

                            var p_gridOptions = JSON.parse(JSON.stringify(grid.getOptions()));
                            p_gridOptions.dataSource.transport.read.data.recently = iif(document.getElementById("Anti_SortWrite").value == "Y", "N", "Y");

                            $.post("gridOptions_save.php", {
                                RealPid: $("input#RealPid").val(),
                                MisJoinPid: $("input#MisJoinPid").val(),
                                gridOptions: kendo.stringify(p_gridOptions)
                            }).done(function (e) {
                                if (e[0].msg != "") alert(e[0].msg);
                                $("a#btn_resetScreen")[0].style.setProperty("display", "inline-block", "important");
                                $("li#btn_resetScreen_overflow")[0].style.setProperty("display", "inline-block", "important");
                            });

                        });
                        $("a#btn_resetScreen").click(function (e) {

                            if (!confirm("설정을 초기화할까요?")) return false;
                            e.preventDefault();
                            //localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());

                            $.post("gridOptions_save.php", {
                                RealPid: $("input#RealPid").val(),
                                MisJoinPid: $("input#MisJoinPid").val(),
                                gridOptions: ""
                            }).done(function (e) {
                                if (e[0].msg != "") alert(e[0].msg);
                                location.href = location.href.split("#")[0];
                            });

                        });

                    }

                    if (getUrlParameter('isMenuIn') != 'S' && $('body').is(':visible') && $(document).width() >= 1500 && isMainFrame() && isMobile() == false) {

                        setTimeout(function () {
                            if (getCookie('rframe') == '2' || getCookie('rframe') == '12') {
                                if ($('body').attr('auto_open_refuse') == undefined) {
                                    setCookie('viewTarget', 'right');
                                    //setCookie('lastSize_right','499px');
                                    $($('td[comment="Y"]')[0]).closest('tr').addClass('k-state-selected');
                                    $($('td[comment="Y"]')[0]).keyup();
                                    if ($($('td[comment="Y"]')[0]).closest('tr').find('input.k-checkbox')[0]) {
                                        $($('td[comment="Y"]')[0]).closest('tr').find('input.k-checkbox')[0].click();
                                        $($('td[comment="Y"]')[0]).closest('tr').find('input.k-checkbox')[0].click();
                                    }
                                    isOK = false;
                                }
                            } else if (isNumeric(getUrlParameter('list_idx'))) {
                                //url 필터가 있고, 목록이 1개 한개 이면 조회열기 : 간편추가 때는 방지하기 위해 orderby 는 제외.
                                $($('td[keyidx="' + getUrlParameter('list_idx') + '"]').closest('tr').find('td[comment="Y"]')[0]).keyup();
                                $($('td[keyidx="' + getUrlParameter('list_idx') + '"] input.k-checkbox')[0]).click();
                                if ($('div#treemenu')[0] && $('body').attr('auto_open_refuse') == undefined) {
                                    var treemenuObj = $('div#treemenu').data('kendoTreeView');
                                    sel_idx = getUrlParameter('list_idx');
                                    var barDataItem = treemenuObj.dataSource.get(sel_idx);
                                    if (barDataItem) {
                                        var barElement = treemenuObj.findByUid(barDataItem.uid);
                                        treemenuObj.select(barElement);
                                    }
                                }
                            } else if ($('div#grid').data('kendoGrid') == undefined) {
                                return false;
                            } else if ($('div#grid').data('kendoGrid').dataSource._total == 1 && getUrlParameter('allFilter') != "" && getUrlParameter("orderby") == undefined && getUrlParameter('allFilter') != undefined) {
                                if (Left(windowID(), 5) != 'grid_' && $('body').attr('auto_open_refuse') == undefined && ($('body').attr('onlylist') == undefined || getUrlParameter('helpbox') != undefined)) {
                                    if (isMainFrame()) {
                                        $($('td[comment="Y"]')[0]).keyup();
                                        toastr.warning("", "목록이 1건일 경우, 자동으로 내용이 열립니다.", { progressBar: true, timeOut: 3000 });
                                    }
                                }
                            }
                        });
                    }


                }

                setTimeout(function () {
                    if (isApple() == true) {   //리스트에서 아이폰/아이패드만의 특이한 에러해소.
                        $('.k-top').click();
                    }
                }, 0);

                //click 이벤트 이중등록 방지를 위해 grid_dataBound_once_event 사용함. : 그리드 데이터완료 시마다 한번씩만 실행됨.
                if ($("input#grid_dataBound_once_event").val() == "N") {

                    if ($("input#grid_dataBound_once_event").attr("first_load") == undefined) {

                        //사용자 로직함수 : grid 로드 후 한번만 실행됨.
                        setTimeout(function () {
                            if (typeof listLogic_afterLoad_once == "function") {
                                listLogic_afterLoad_once();
                            }
                        }, 0);
                        if (getUrlParameter('app') == 'saveAsExcel') {
                            setTimeout(function () {
                                setTimeout(function () {
                                    displayLoading_long();
                                }, 100);
                                var grid = $('#grid').data('kendoGrid');
                                grid.dataSource.options.transport.read.data.app = "saveAsExcel";
                                grid.dataSource.options.transport.read.data.allFilter = grid.dataSource.transport.options.read.data.allFilter;
                                grid.saveAsExcel();
                                grid.dataSource.options.transport.read.data.app = "";
                                setTimeout(function () {
                                    displayLoadingOff();
                                }, 2000);
                            }, 0);
                        } else if (getUrlParameter('app') == 'saveAsXls') {
                            setTimeout(function () {
                                setTimeout(function () {
                                    displayLoading_long();
                                }, 100);
                                var grid = $('#grid').data('kendoGrid');
                                grid.dataSource.options.transport.read.data.app = "saveAsXls";
                                grid.dataSource.read();
                                grid.dataSource.options.transport.read.data.app = "";
                                setTimeout(function () {
                                    displayLoadingOff();
                                }, 2000);
                            }, 0);
                        }
                        $("input#grid_dataBound_once_event").attr("first_load", "end");
                    }


                    //$('input.k-checkbox[disabled]').closest('tr').find('a.k-button').css('display','none');

                    $("input#grid_dataBound_once_event").val("Y");
                    // tr 클릭시, 선택하는 기능.
                    //var touchtime = 0;
                    //var delay = 800;
                    //var action = null;
                    //console.log($._data($("div#grid tbody > tr")[0], 'events')?.click);
                    console.log('click create');

                    $("div#grid tbody > tr").click(function (e) {
                        console.log('click 111');
                        if (event) {
                            console.log('click 222');
                            if ($(event.target).closest('span.k-picker-wrap').length == 0 && e.originalEvent?.isTrusted) {  //달력 클릭이 아닐 경우만 작동.
                                console.log('click 333');
                                //console.log(event.srcElement.tagName);
                                if (event.srcElement.tagName == "TD" || event.srcElement.tagName == "DIV" || event.srcElement.tagName == "SPAN") {
                                    console.log('click 444');
                                    if (event.srcElement.tagName == "TD") {
                                        hasClass_editorStyle = $(event.srcElement).hasClass('editorStyle');
                                    } else {
                                        hasClass_editorStyle = $(event.srcElement).closest('td').hasClass('editorStyle');
                                    }
                                    if (hasClass_editorStyle == false && $(event.srcElement).hasClass('k-file-name') == false && $(event.srcElement).hasClass('k-input') == false) {
                                        console.log('click 555');
                                        var obj = $(this).children("td").find("input.k-checkbox")[0];
                                        $($(this).find('td[comment="Y"]')[0]).keyup();
                                        $("div#grid th").find("input.k-checkbox")[0].checked = true;
                                        $("div#grid th").find("input.k-checkbox")[0].click();
                                        $(obj).click();
                                    }
                                }
                            }
                        }

                    });

                    $("#grid table").on("keydown", function (e) {
                        if (e.keyCode == 13) {
                            e.stopImmediatePropagation();
                            var grid = $('#grid').data('kendoGrid');
                            var currentCell = grid.current();
                            if (currentCell.attr("comment") == "Y") currentCell.click();
                        }
                    });
                    if ($('body[helpbox]').length == 1) {
                        //alert(99);
                        if ($('a#btn_write_blank').length == 0) {
                            $('a#btn_reload').after(`
                            <a role="button" class="k-button k-button-icontext" id="btn_write_blank"><span class="k-icon k-i-k-icon k-i-pencil"></span>공백으로 입력</a>
                            <a role="button" class="k-button k-button-icontext" id="btn_filter_blank"><span class="k-icon k-i-k-icon k-i-pencil"></span>필터비우기</a>
                            `);
                            $('a#btn_filter_blank').click(function () {
                                $('button.k-button.k-button-icon[data-bind]').click();
                            });
                            $('a#btn_write_blank').click(function () {
                                console.log('helpbox - blank 선택행의 데이터 가져오기');
                                sel_alias = ''; sel_value = ''; //사용자정의함수에 넘길값.

                                //아래쪽 [선택행의 데이터 가져오기] 와 거의 비슷한 로직.
                                winID = getUrlParameter('winID');
                                pwinID = getUrlParameter('pwinID');
                                if (winID == '') {
                                    opener = parent;
                                } else if (pwinID == '') {
                                    if (parent.parent.getFrameObj(winID)) opener = parent.parent.getFrameObj(winID);
                                    else opener = parent.getFrameObj(winID);
                                } else {
                                    if (parent.parent.getFrameObj(pwinID)) opener = parent.parent.getFrameObj(pwinID).getFrameObj(winID);
                                    else opener = parent.getFrameObj(pwinID).getFrameObj(winID);
                                }
                                //선택행의 데이터 가져오기
                                data = $('div#grid').data('kendoGrid').dataSource._data[getGridRowIndex_gridRowTr($(this).closest('tr'))];


                                if (opener.document.getElementById('ActionFlag').value == 'list') {

                                    helpbox_saveList = [];
                                    var aJson2 = new Object();
                                    for (i = 1; i < p_columns.length; i++) {
                                        var aJson = new Object();
                                        if (p_columns[i].hidden != true) {
                                            if (opener.getObjects(opener.p_columns_1D, 'title', p_columns[i].title).length) {
                                                aJson.title = p_columns[i].title;
                                                aJson.value = '';    //이것만 다름.
                                                helpbox_saveList.push(aJson);
                                            }
                                        }
                                    }
                                    if (helpbox_saveList.length == 0) {
                                        alert('저장할 내역이 없습니다. 관리자에게 문의하세요.');
                                        return false;
                                    }

                                    //리스트에서 열었을 경우 즉시 저장.
                                    if (getObjects(helpbox_saveList, 'title', 'sel_idx').length == 0) {
                                        aJson2.title = 'sel_idx';
                                        aJson2.value = getUrlParameter('sel_idx');
                                        helpbox_saveList.push(aJson2);

                                        sel_alias = getUrlParameter('helpbox');
                                        sel_value = getObjects(helpbox_saveList, 'title', getObjects(opener.p_columns_1D, 'field', sel_alias)[0].title)[0].value;
                                    }

                                    opener.$("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "helpbox_saveList!@!" + JSON.stringify(helpbox_saveList);
                                    opener.$("#grid").data("kendoGrid").dataSource.read();
                                    opener.$("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "";

                                } else {
                                    var input_code = getUrlParameter('helpbox');
                                    for (i = 1; i < p_columns.length; i++) {
                                        if (p_columns[i].hidden != true) {
                                            if (opener.$('label[grid_columns_title0="' + p_columns[i].title + '"]').length == 1) {
                                                input_obj = opener.$('label[grid_columns_title0="' + p_columns[i].title + '"]').closest('div.form-group').find('input[id]');

                                                if (input_obj.length > 0) {
                                                    input_obj[0].value = '';   //이것만 다름.
                                                    $(input_obj[0]).attr('selvalue', '');
                                                    if (input_obj.length == 2) {
                                                        sel_alias = input_obj[1].id;
                                                        d = 1;
                                                        if (i == 3) d = 2;
                                                        input_obj[1].value = '';  //이것만 다름.
                                                        $(input_obj[1]).attr('selvalue', '');
                                                    } else {
                                                        if (input_obj.attr('data-role') == "numerictextbox") {
                                                            if (input_obj[1]) {
                                                                sel_alias = input_obj[1].id;
                                                            } else {
                                                                sel_alias = input_obj[0].id;
                                                            }
                                                            input_obj.data('kendoNumericTextBox').value(input_obj[0].value);
                                                            input_obj.attr('selvalue', '');
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (typeof helpboxLogic_afterSelect == "function") {
                                    helpboxLogic_afterSelect(opener.$('input#ActionFlag')[0].value, opener, sel_alias, sel_value);
                                }
                                parent.$('iframe#' + windowID()).closest('div.k-widget.k-window').find('span.k-i-close').closest('a').click();
                            });
                            $('a#btn_menuName')[0].title = '';
                            $('a#btn_menuName').css('color', theme_selected());
                            $('a#btn_menuName').css('background-color', theme_selectedBack());
                        }

                        $('td[comment="Y"]').keyup(function () {

                            winID = getUrlParameter('winID');
                            pwinID = getUrlParameter('pwinID');


                            if (winID == '') {
                                opener = parent;
                            } else if (pwinID == '') {
                                if (parent.parent.getFrameObj(winID)) opener = parent.parent.getFrameObj(winID);
                                else opener = parent.getFrameObj(winID);
                            } else {
                                if (parent.parent.getFrameObj(pwinID)) opener = parent.parent.getFrameObj(pwinID).getFrameObj(winID);
                                else opener = parent.getFrameObj(pwinID).getFrameObj(winID);
                            }

                            console.log('helpbox - 선택행의 데이터 가져오기');
                            sel_alias = ''; sel_value = '';

                            //선택행의 데이터 가져오기
                            data = $('div#grid').data('kendoGrid').dataSource._data[getGridRowIndex_gridRowTr($(this).closest('tr'))];


                            if (opener.document.getElementById('ActionFlag').value == 'list') {

                                helpbox_saveList = [];
                                var aJson2 = new Object();
                                //과제 : 리스트에서 sel_alias 와 값을 구해야 함.
                                for (i = 1; i < p_columns.length; i++) {
                                    var aJson = new Object();
                                    if (p_columns[i].hidden != true) {
                                        if (opener.getObjects(opener.p_columns_1D, 'title', p_columns[i].title).length) {
                                            aJson.title = p_columns[i].title;
                                            aJson.value = data[replaceAll(p_columns[i].title, ' ', '')];
                                            helpbox_saveList.push(aJson);
                                        }
                                    }
                                }
                                if (helpbox_saveList.length == 0) {
                                    alert('저장할 내역이 없습니다. 관리자에게 문의하세요.');
                                    return false;
                                }

                                //리스트에서 열었을 경우 즉시 저장.
                                if (getObjects(helpbox_saveList, 'title', 'sel_idx').length == 0) {
                                    aJson2.title = 'sel_idx';
                                    aJson2.value = getUrlParameter('sel_idx');
                                    helpbox_saveList.push(aJson2);

                                    sel_alias = getUrlParameter('helpbox');
                                    sel_value = getObjects(helpbox_saveList, 'title', getObjects(opener.p_columns_1D, 'field', sel_alias)[0].title)[0].value;
                                }
                                opener.$("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "helpbox_saveList!@!" + JSON.stringify(helpbox_saveList);
                                opener.$("#grid").data("kendoGrid").dataSource.read();
                                opener.$("#grid").data("kendoGrid").dataSource.transport.options.read.data.app = "";
                            } else {
                                var input_code = getUrlParameter('helpbox');
                                for (i = 1; i < p_columns.length; i++) {
                                    if (p_columns[i].hidden != true) {
                                        if (opener.$('label[grid_columns_title0="' + p_columns[i].title + '"]').length == 1) {
                                            input_obj = opener.$('label[grid_columns_title0="' + p_columns[i].title + '"]').closest('div.form-group').find('input[id]')[0];
                                            if (input_obj) {
                                                input_obj.value = data[replaceAll(p_columns[i].title, ' ', '')];
                                                $(input_obj).attr('selvalue', input_obj.value);
                                                if ($(input_obj).attr('data-role') == "numerictextbox") {
                                                    //kendoNumericTextBox 를 사용할 경우, 다시 opener 추가.
                                                    opener.$(input_obj).data('kendoNumericTextBox').value(input_obj.value);
                                                    $(input_obj).attr('selvalue', input_obj.value);
                                                }
                                            }
                                        } else {
                                            //코드일 경우.
                                            var col_index = -1;
                                            opener.$('form#frm label[grid_columns_title0]').each(function (index, t) {
                                                if (InStr(replaceAll(replaceAll(replaceAll(t.innerText, ' ', ''), '*', ''), '\n', ''), '|' + p_columns[i].title) > 0) {
                                                    col_index = index;
                                                    sel_alias = $(opener.$('form#frm label[grid_columns_title0]')[col_index]).parent().find('[id][data-role]')[1].id;
                                                    sel_value = data[replaceAll(p_columns[i].title, ' ', '')];
                                                    $(opener.$('form#frm label[grid_columns_title0]')[col_index]).parent().find('[id][data-role]')[1].value = sel_value;
                                                    $($(opener.$('form#frm label[grid_columns_title0]')[col_index]).parent().find('[id][data-role]')[1]).attr('selvalue', sel_value);
                                                }
                                            });
                                        }
                                    }
                                }

                            }
                            if (typeof helpboxLogic_afterSelect == "function") {
                                helpboxLogic_afterSelect(opener.$('input#ActionFlag')[0].value, opener, sel_alias, sel_value);
                            }
                            parent.$('iframe#' + windowID()).closest('div.k-widget.k-window').find('span.k-i-close').closest('a').click();

                        });

                    } else if ($('body[onlylist]').length == 0) {

                        $('td[comment="Y"]').keyup(function () {

                            if (parent.document.getElementById("jsonname")) {
                                if (parent.document.getElementById("jsonname").value != "") {
                                    toastr.error("백업본은 목록조회만 가능합니다.", "", { timeOut: 6000, positionClass: "toast-bottom-right" });
                                    return false;
                                }
                            }
                            if (InStr($(this).attr("class"), "editorStyle") <= 0
                                || event.srcElement != $(this)[0] && event.code == undefined) {
                                var idx = getIdx_gridRowTr($(this).parent());

                                if (document.getElementById('keyidx_123').value == 'Y' || document.getElementById('ChkOnlySum').value == '2') {
                                    if (document.getElementById("Anti_SortWrite").value == 'N') {
                                        var sk = key_aliasName;
                                        var sv = Trim($(this).closest('tr').find('td')[getCellIndex_alias(sk)].innerText);
                                        idx = sv;
                                    } else {
                                        var sortArray = $("#grid").data("kendoGrid").dataSource._sort;
                                        var sk = sortArray[0].field;
                                        var sv = Trim($(this).closest('tr').find('td')[getCellIndex_alias(sk)].innerText);
                                    }
                                    if (getObjects(p_columns, 'field', sk).length == 0) {
                                        toastr.error("숨겨진 항목에 의해 정렬된 경우 상세내역을 표시할 수 없습니다.", "", { timeOut: 5000, positionClass: "toast-bottom-right" });
                                        return false;
                                    }
                                    var title = getObjects(p_columns, 'field', sk)[0].title + ':' + sv;

                                    status_filter = '';
                                    statusUrl = status_url();

                                    if (InStr(statusUrl, '&allFilter=[') > 0) {
                                        status_filter = statusUrl.split('&allFilter=[')[1].split(']')[0];
                                    }

                                    var url = location.href.split('?')[0] + '?gubun=' + document.getElementById('gubun').value;

                                    if (status_filter == '' && document.getElementById("Anti_SortWrite").value == 'Y') {
                                        url = url + '&allFilter=[{"operator":"eq","value":"' + replaceAll(replaceAll(sv, '+', '%2B'), '&', '@nd;') + '","field":"toolbar_' + sk + '"}]';
                                    } else if (status_filter == '') {
                                        url = url + '&idx=' + replaceAll(replaceAll(sv, '+', '%2B'), '&', '@nd;');
                                    } else if (InStr(status_filter, '"toolbar_' + sk + '"') > 0) {
                                        url = url + '&allFilter=[' + status_filter + ']';
                                    } else {
                                        url = url + '&allFilter=[' + status_filter + ',{"operator":"eq","value":"' + replaceAll(replaceAll(sv, '+', '%2B'), '&', '@nd;') + '","field":"toolbar_' + sk + '"}]';
                                    }

                                    if (sortArray) {
                                        if (sortArray.length >= 2) {
                                            var sk = sortArray[1].field;
                                            var sv = Trim($(this).closest('tr').find('td')[getCellIndex_alias(sk)].innerText);
                                            title = title + ', ' + getObjects(p_columns, 'field', sk)[0].title + ':' + sv;
                                            if (InStr(status_filter, '"toolbar_' + sk + '"') <= 0) {
                                                url = replaceAll(url, '"}]', '"},{"operator":"eq","value":"' + replaceAll(replaceAll(sv, '+', '%2B'), '&', '@nd;') + '","field":"toolbar_' + sk + '"}]');
                                            }
                                        }

                                        if (sortArray.length >= 3) {
                                            var sk = sortArray[2].field;
                                            var sv = Trim($(this).closest('tr').find('td')[getCellIndex_alias(sk)].innerText);
                                            title = title + ', ' + getObjects(p_columns, 'field', sk)[0].title + ':' + sv;
                                            if (InStr(status_filter, '"toolbar_' + sk + '"') <= 0) {
                                                url = replaceAll(url, '"}]', '"},{"operator":"eq","value":"' + replaceAll(replaceAll(sv, '+', '%2B'), '&', '@nd;') + '","field":"toolbar_' + sk + '"}]');
                                            }
                                        }

                                        if (sortArray.length >= 4) {
                                            var sk = sortArray[3].field;
                                            var sv = Trim($(this).closest('tr').find('td')[getCellIndex_alias(sk)].innerText);
                                            title = title + ', ' + getObjects(p_columns, 'field', sk)[0].title + ':' + sv;
                                            if (InStr(status_filter, '"toolbar_' + sk + '"') <= 0) {
                                                url = replaceAll(url, '"}]', '"},{"operator":"eq","value":"' + replaceAll(replaceAll(sv, '+', '%2B'), '&', '@nd;') + '","field":"toolbar_' + sk + '"}]');
                                            }
                                        }
                                    }

                                    if (document.getElementById("parent_gubun").value != "") url = url + "&parent_gubun=" + document.getElementById("parent_gubun").value;
                                    if (document.getElementById("parent_idx").value != "") url = url + "&parent_idx=" + document.getElementById("parent_idx").value;
                                    url = url + '&isAddURL=Y';
                                } else {
                                    var title = getTitle_aliasName(key_aliasName) + ':' + idx + " 상세";
                                    var url = location.href.split('?')[0] + "?gubun=" + document.getElementById("gubun").value + "&idx=" + idx + iif(document.getElementById("isDeleteList").value == "Y", "&isDeleteList=Y", "");
                                    if (getCookie("modify_YN") == "Y" && $('a#btn_modify')[0]) {
                                        if ($(this).parent().attr("stopEdit") != "true") url = url + "&ActionFlag=modify";
                                    }
                                    if (document.getElementById("parent_gubun").value != "") url = url + "&parent_gubun=" + document.getElementById("parent_gubun").value;
                                    if (document.getElementById("parent_idx").value != "") url = url + "&parent_idx=" + document.getElementById("parent_idx").value;
                                }

                                url = url + "&isAddURL=Y";
                                url0 = url;
                                var ctrl_key = false;

                                if (event) {
                                    if (event.ctrlKey) {
                                        ctrl_key = true;
                                    }
                                }
                                if (ctrl_key) {
                                    window.open(url, title);
                                } else {
                                    url = url + "&isIframe=Y";
                                    /*
                                    if(parent.getFrameObj) {
                                        if(parent.getFrameObj("grid_right")==null && getCookie('viewTarget')=="right") {
                                            if(isMainFrame()) setCookie('viewTarget','bottom',1000);
                                        }
                                    }
                                    */
                                    if (event) {
                                        event_shiftKey = event.shiftKey;
                                    } else {
                                        event_shiftKey = false;
                                    }

                                    if ($('body[topsite="notmis"]')[0]) {
                                        location.replace(url);
                                    } else if (getFrameObj("grid_right") == null && getFrameObj("grid_bottom") == null || getUrlParameter("isSplitter") != "Y" && $('body').attr('ispopup') == 'N' && (event_shiftKey || !isMainFrame()
                                        || getCookie('viewTarget') == "popup" || document.getElementById("viewTarget_once").value == "popup")) {

                                        if (document.getElementById("last_frameElementId").value != "") {
                                            if ($("iframe#" + document.getElementById("last_frameElementId").value).closest("div.k-widget.k-window").css("display") == "none") {
                                                parent_popup_jquery(url, title);
                                            } else {
                                                kendo.ui.progress($(getFrameObj(document.getElementById("last_frameElementId").value).document.body), true);
                                                setTimeout(function () { if (document.getElementById("last_frameElementId").value != "") kendo.ui.progress($(getFrameObj(document.getElementById("last_frameElementId").value).document.body), false); }, 3000);
                                                getFrameObj(document.getElementById("last_frameElementId").value).read_idx(idx);
                                            }
                                        } else {
                                            parent_popup_jquery(url, title);
                                        }
                                        //1044 라인과 같음(이게 기준소스)
                                    } else {

                                        splitter_right_read_idx(idx, url);

                                    }
                                }
                                if ($(this).closest('tr').find('input[type="checkbox"]')[0].disabled) {
                                    setTimeout(function (p_this) {
                                        $(p_this).closest('tr').addClass('k-state-selected');
                                    }, 0, this);
                                }
                            }
                        });


                    }

                    setTimeout(function () { $("input#grid_dataBound_once_event").val("N"); }, 0);

                }

                //사용자 로직함수 : grid 로드 후 데이터 로딩마다 실행됨.
                if (typeof listLogic_afterLoad_continue == "function") setTimeout(function () {
                    listLogic_afterLoad_continue();
                }, 0);

                /*
                reOpen = true;
                if($('body').attr('auto_open_refuse')!=undefined) {
                    reOpen = false;
                } else {
                    if(getCookie('rframe')=='12' || getCookie('rframe')=='2' || $("div#right-pane").width()>30) {

                    } else {
                        reOpen = false;
                    }
                }

                if(getFrameObj('grid_right') && reOpen==true) {
                    if($('div#grid tr.k-master-row').length>0) {
                        list_selected_idx = $('div#grid tr.k-master-row.k-state-selected td[keyidx]').attr('keyidx');
                    }
                    setTimeout( function() {
                        if($('div#grid tr.k-master-row').length>0) {
                            view_idx = 0;
                            if(getFrameObj('grid_right').$) {
                                view_idx = getFrameObj('grid_right').$('input#idx')[0].value;
                            }
                            list_selected_idx = $('div#grid tr.k-master-row.k-state-selected td[keyidx]').attr('keyidx');
                            if(list_selected_idx==undefined) {
                                list_selected_idx = $($('div#grid tr.k-master-row td[keyidx]')[0]).attr('keyidx');
                                if(list_selected_idx==view_idx) {
                                    $($('div#grid tr.k-master-row td[keyidx]')[0]).closest('tr').addClass('k-state-selected');
                                }
                            }


                            if(list_selected_idx==view_idx) {
                                reOpen = false;
                            } else if($($('div#grid tr.k-master-row')[0]).hasClass('k-state-selected')==true) {
                                if(getFrameObj('grid_right').$) {
                                    list_idx = $($('div#grid tr.k-master-row td[keyidx]')[0]).attr('keyidx');
                                    
                                    if(list_idx==view_idx) {
                                        reOpen = false;
                                    }
                                } else {
                                    reOpen = false;
                                }
                            }
                            if(getFrameObj('grid_right') && reOpen==true) {
                                $('div#grid tr.k-master-row.k-state-selected').removeClass('k-state-selected');
                                $($('div#grid tr.k-master-row td[comment="Y"]')[0]).keyup();
                                $($('div#grid tr.k-master-row input.k-checkbox')[0]).click();
                            }
                    
                        }
                    },0);
                }
                */

            }, 0);

            //제1정렬이 있으면 실선으로.
            if ($('a#btn_recently').hasClass('k-state-active') == false) {
                if ($('#grid').data('kendoGrid') == undefined) {
                    return false;
                }
                if ($('#grid').data('kendoGrid').dataSource._sort[0]) {
                    sort1_field = $('#grid').data('kendoGrid').dataSource._sort[0].field;
                    if (key_aliasName != sort1_field) {
                        //var indx = $("#grid th[data-field='"+sort1_field+"']").index();
                        var indx = getCellIndex_alias(sort1_field);
                        var pre_text = '@@start';
                        var pre_tr;
                        $('#grid').data('kendoGrid').tbody.find('td:nth-child(' + (indx + 1) + ')').each(
                            function (idx, item) {
                                if (idx > 0) {
                                    if (pre_text != $(item).text()) {
                                        pre_tr.addClass('newsort1');
                                    }
                                }
                                pre_text = $(item).text();
                                pre_tr = $(this).closest('tr');
                            }
                        );
                    }
                }
            }
        },
        scrollable: {
            virtual: document.getElementById("pageSizes").value == "0"
        },
        persistSelection: true,
        resizable: true,
        reorderable: true,
        editable: document.getElementById("isAuthW").value == "Y",
        groupable: groupable,
        filterable: {
            mode: "row",
            field: "text",
            extra: false, //do not show extra filters
            operator: "contains",
            operators: {
                string: {
                    contains: "contains"
                }
            }
        },
        filter: function (e) {
            if (e.filter == null && event) {
                if (event.keyCode == 13) {
                    event.target.value = $(event.target).data("kendoAutoComplete").dataSource.transport.options.read.data.selValue;
                    $(event.target).change();
                    $(event.target).keyup();
                    setTimeout(function (p_et) {
                        $(p_et).blur();
                    }, 0, event.target);
                }
                //console.log("filter has been cleared");
            } else if (event) {
                if (event.keyCode == 13) $(event.target).blur();
            }
        },
        navigatable: true,

        //selectable: "multiple cell",
        allowCopy: true,

        sortable: {
            mode: "multiple",
            allowUnsort: true,
            showIndexes: true,
        },
        pageable: { pageSizes: [50, 100, 1000, 10000] },
        edit: function (e) {
            //rowFunctionAfter 에서 사용자 정의 로직에 의해 stopEdit=true 이면 셀편집 방지를 한다.
            if (!e.model.IsNotEditable) {
                if (e.container.attr("stopEdit") == "true") {
                    this.closeCell();
                }
            }
        },

        columns: p_columns,
        sort: onSorting,
    });
}


function fileUploadEditor(container, options) {

    if (getColumnAttr_aliasName(options.field, 'width') * 1 == 0) return false;
    if (container.find("div").length > 0) return false;

    p_idx = options.model[key_aliasName]
    if (getFieldAttr(key_aliasName, "format") == "{0:yyyy-MM-dd}") {
        p_idx = date10(p_idx);
    }
    var info_url = "info.php?RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&key_aliasName=" + key_aliasName + "&thisAlias=" + options.field + "&key_idx=" + p_idx;
    if (options.model[options.field] == "" || options.model[options.field] == undefined) {
        var savedFiles = [];
    } else {
        var savedFiles = ajax_url_return(info_url + "&flag=upload");
        if (InStr(savedFiles, 'declare @sql') > 0) {
            if ($('body').is(':visible')) {
                savedFiles = replaceAll(replaceAll(savedFiles, '<!--', ''), '-->', '');
                rnd = getRandomArbitrary(101, 400);
                if (typeof parent.toastr == "object") toastr_obj = parent.toastr; else toastr_obj = toastr;
                toastr_obj.error('<a id="rnd' + rnd + '" href="javascript:;" onclick="query_error_popup(this);">첨부파일 오류입니다. key : ' + options.field + ' 여기를 클릭하세요.</a>', '', { progressBar: true, timeOut: 7000, positionClass: "toast-bottom-right" });
                $('a#rnd' + rnd).attr('msg', savedFiles);
            }
        } else {
            if (isJsonString(savedFiles)) savedFiles = JSON.parse(savedFiles);
            else savedFiles = [];
        }
        //[{"name":"speedmis 도장2.png","extension":".png","size":1112830},{"name":"DSCN1477.jpg","extension":".jpg","size":829425},{"name":"사진 471.jpg","extension":".jpg","size":850950}];
        //savedFiles = JSON.parse(savedFiles);
    }


    var addParams = "";
    var r_default = getColumnAttr_aliasName(options.field, "default");


    if (r_default != "") {
        if (InStr(r_default, "{") > 0) {
            searchAliasName = r_default.split("{")[1].split("}")[0];
            changeValue = encodeURI(getGridCellValue_idx(p_idx, searchAliasName));
            r_default = replaceAll(r_default, "{" + searchAliasName + "}", changeValue);
        }
        addParams = "&default=" + r_default;
    }
    $(container).text("");
    //디폴트값이 0 이면 기본정의 maxMB,  10! 이면 최대 10MB / 멀티업로드.
    var validation = JSON.parse("{ " + options.schema_validation + " }");
    validation["maxFileSize"] = replaceAll(options.maxLength, "!", "") * 1024 * 1024;
    validationInfo = "";
    if (validation.allowedExtensions) validationInfo = ', 제한 ' + validation.allowedExtensions.join();

    var obj = $('<input title="' + iif(Right(options.maxLength, 1) == "!", "여러개 업로드 가능", "한개 업로드 가능") + ', 파일당 최대 ' + replaceAll(options.maxLength, "!", "") + 'MB'
        + validationInfo + '" type="file" data-text-field="' + options.field
        + '" data-value-field="' + options.field
        + '" data-bind="value:' + options.field + '" name="' + options.field + '"/>')
        .appendTo(container)
        .kendoUpload({
            async: {
                saveUrl: "cell_upload.php?flag=gridUpload&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&key=" + key_aliasName + "&idx=" + p_idx + "&field=" + options.field + addParams,
                removeUrl: info_url + "&flag=removeUploadCell",
                autoUpload: true,
            },
            files: savedFiles,
            multiple: Right(options.maxLength, 1) == "!",
            validation: validation,
            error: function (e) {
                if (typeof parent.toastr == "object") toastr_obj = parent.toastr; else toastr_obj = toastr;
                toastr_obj.error("비정상적인 에러입니다.");
            },
            success: function (e) {
                var msg = e.response[0].msg;
                var result = e.response[0].result;
                if (typeof parent.toastr == "object") toastr_obj = parent.toastr; else toastr_obj = toastr;
                if (InStr(msg, "실패") > 0 || result == 'fail') {
                    toastr_obj.error(msg);
                } else {
                    toastr_obj.success(msg);
                }
                $('#grid').data('kendoGrid').dataSource.read();
                k_file_createClick();
            }
        });
    if (validation.allowedExtensions) obj.attr("accept", validation.allowedExtensions.join());
    k_file_createClick(info_url);
    obj.closest('.k-widget.k-upload.k-upload-async').find('button.k-button.k-upload-action').click(function () {
        if (!confirm("해당 파일을 삭제하시겠습니까?")) return false;
    });
}


function useAutoComplete(p_this) {
    if ($(p_this).attr("data-role") != "autocomplete") return false;

    var url = 'list_json.php?flag=onefield&RealPid=' + document.getElementById('RealPid').value + '&MisJoinPid=' + document.getElementById("MisJoinPid").value
        + "&pre=" + document.getElementById("pre").value
        + "&addParam=" + document.getElementById("addParam").value;
    debugger;
    $(p_this).data("kendoAutoComplete").dataSource.transport.options.read.data.selValue = p_this.value;
    $(p_this).data("kendoAutoComplete").dataSource.transport.options.read.url = url;
}
function columnsAutoCompleteEditor(container, options) {

    var inlineAddTag = '';
    var url = "json_blank.php";

    if (dataSourceFields(options.field).Grid_Schema_Type == 'date') {
        if (isMobile() == true) {
            debugger;
            inlineAddTag = '';
        } else {
            inlineAddTag = 'data-role="datepicker"';
        }
    }
    maxLength = getObjects(p_columns, 'field', options.field)[0].maxLength;
    if (maxLength * 1 > 1) {
        maxLength_var = ' maxLength="' + maxLength + '" ';
    } else {
        maxLength_var = '';
    }

    var obj = $('<input ' + inlineAddTag + maxLength_var + ' data-text-field="' + options.field + '" data-value-field="' + options.field
        + '" data-bind="value:' + options.field + '" onkeyup="if(event.keyCode==40) $(this).dblclick();" ondblclick="useAutoComplete(this);" name="' + options.field
        + '"/>')
        .appendTo(container)
        .kendoAutoComplete({
            autoBind: false,
            dataTextField: options.field,
            filter: "contains",
            dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: {
                        type: "POST",
                        //url: ,
                        url: url,
                        data: {
                            recently: function () { return iif(document.getElementById("Anti_SortWrite").value == "Y", "N", "Y"); },
                            selField: options.field,
                            selValue: options.model[options.field],
                        }
                    }
                }
            },
            filtering: columnsAutoComplete_onFiltering,
            dataBound: columnsAutoComplete_onDataBound,
            change: function (e) {

                if ($(e.sender.element).attr("required") != undefined && $(e.sender.element).val() == "") {
                    $(e.sender.element).val(iif(e.sender.oldText == undefined, e.sender._oldText, e.sender.oldText));
                    toastr.error("공백허용이 되지 않습니다.", "필수 입력 항목", { timeOut: 3000, positionClass: "toast-bottom-right" });
                    return false;
                }
                var url = "info.php?flag=textUpdate&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&parent_idx=" + document.getElementById("parent_idx").value
                    + "&pre=" + document.getElementById("pre").value
                    + "&addParam=" + document.getElementById("addParam").value;

                key_value = getIdx_gridRowTr(this.element.closest("tr"));
                if (key_value == 'null') {
                    var paramJson = { keyAlias: p_columns_1D[1].field, keyValue: this.element.closest("tr").find('td[keyidx]').next().text(), thisValue: this.element.val(), oldText: iif(this.oldText == undefined, this._oldText, this.oldText), thisAlias: this.element[0].dataset.valueField };
                } else {
                    var paramJson = { keyAlias: key_aliasName, keyValue: key_value, thisValue: this.element.val(), oldText: iif(this.oldText == undefined, this._oldText, this.oldText), thisAlias: this.element[0].dataset.valueField };
                }
                //if(key_value=="" || key_value==undefined) key_value = getIdx_gridRowTr(this.element.parent().parent().parent().parent().parent());  //datepicker 일 경우임.
                var paramJson = { keyAlias: key_aliasName, keyValue: key_value, thisValue: this.element.val(), oldText: iif(this.oldText == undefined, this._oldText, this.oldText), thisAlias: this.element[0].dataset.valueField };
                $.post(url, paramJson,
                    function (result) {
                        dirtyClear();




                        //eval(result.readResult)

                        result.readResult = replaceAll(replaceAll(result.readResult, '\\\\\\@dda', '\\"'), '\\@dda', '"');
                        result.thisValue = replaceAll(result.thisValue, '@dda', '"');
                        p_dataItem = eval(result.readResult.replace(/\r\n/gi, '\\r\\n'))[0];

                        $.each(p_dataItem, function (key, value) {
                            if (getObjects(p_columns_1D, 'field', key)[0]) {
                                if (getObjects(p_columns_1D, 'field', key)[0].template) {
                                    value = columns_templete(p_dataItem, key);
                                }
                            }
                            if (document.getElementById("key_aliasName").value != key && key != 'rowNumber') {
                                setGridCellValue_idx(key_value, key, value);
                            }
                        });

                        if (result.resultCode == 'fail') {
                            toastr.error(getTitle_aliasName(result.thisAlias) + "::: " + result.thisValue + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
                        } else {
                            toastr.success(getTitle_aliasName(result.thisAlias) + "::: " + result.thisValue + "<br>로 저장이 완료되었습니다", "", { progressBar: true, timeOut: 3000, positionClass: "toast-bottom-right" });
                            if (result.afterScript != "") eval(result.afterScript);
                            if (result.resultMessage != "") toastr.success(result.resultMessage, "", { progressBar: true, timeOut: 3000, positionClass: "toast-bottom-right" });
                        }
                        if (result.__devQuery_url && isMobile() == false) {
                            toastr.info('<a href="javascript:;" onclick="query_popup(\'' + result.__devQuery_url + '\');">쿼리를 보시려면, 여기를 클릭하세요</a>', '', { timeOut: 7000 });
                        }

                    }
                ).done(function () {
                    //alert( "second success" );
                })
                    .fail(function () {
                        //alert( "error" );
                    })
                    .always(function () {

                        //alert( "finished" );
                    });
            }
        });


    obj.click(function () {
        var autocomplete = $(this).data("kendoAutoComplete");
        autocomplete.dataSource.read();
        autocomplete.search(this.value);
    });

    obj.keydown(function () {
        if (event.keyCode == 13) {

            //값이 바뀌면서 엔터이면 다음칸 이동 안함으로 했다가 다시 이동하는 걸로 바꿈.
            if ($(this).data('kendoAutoComplete').value() != $(this).data('kendoAutoComplete').oldText) {
                $(this).data('kendoAutoComplete').oldText = $(this).data('kendoAutoComplete').value();
                /*
                var eventTd = $(this).closest('td');
                setTimeout( function(p_eventTd) {
                    p_eventTd.click();
                }, 1000, eventTd);
                
                */
                //return false;
            }
            /*
            var eventTd = $(this).closest('td[data-field="'+$(this).attr("name")+'"]');
            var allTd = $('td[data-field="'+$(this).attr("name")+'"]');
            console.log(eventTd);
            console.log(allTd);
            */
            var y_index = $(this).closest('tr').parent().children().index($(this).closest('tr'));
            var x_index = $(this).closest('tr').children().index($(this).closest('td'));
            if (event.shiftKey) y_index = y_index - 1;
            else y_index = y_index + 1;
            if (y_index < 0) y_index = 0;

            var nextTd = $($(this).closest('tr').parent().children()[y_index]).children()[x_index];
            if (nextTd) nextTd.click();

            return false;
        }
    });
    obj.keyup(function () {
        if ($(this).attr("aria-expanded") == undefined && event.keyCode == 40) {
            var autocomplete = $(this).data("kendoAutoComplete");
            autocomplete.dataSource.read();
            autocomplete.search(this.value);
        }
    });


    var obj2 = $('#grid').data('kendoGrid').dataSource.options.schema.model.fields[options.field].validation;
    var pType = $('#grid').data('kendoGrid').dataSource.options.schema.model.fields[options.field].type;
    if (obj2) {
        $.each(obj2, function (key, value) {
            obj.attr(key, value);
            if (pType == "number") {
                obj.attr("data-type", "number");
            }
            //obj.attr("validationMessage", "필수입력항목");
        });
    }

    obj.closest("td").append($('<div class="k-widget k-tooltip k-tooltip-validation k-invalid-msg" data-for="' + options.field + '"></div>'));

}



function columnsTimePicker(container, options) {

    var obj = $('<input data-bind="value:' + options.field + '" data-format="HH:mm" data-role="timepicker" name="' + options.field + '"/>').appendTo(container);
    obj.bind("focus", columnsTimePicker_focus);
    obj.bind("blur", columnsTimePicker_blur);
}
function columnsTimePicker_focus() {
    if ($(this).data("kendoTimePicker").value() == null) {
        if ($(this).closest('td').attr('oldText') != undefined && $(this).closest('td').attr('oldText') != '') {
            this.value = $(this).closest('td').attr('oldText');
        } else {
            this.value = null;
        }
    } else {
        this.value = Right($(this).data("kendoTimePicker").value().yyyymmddhhmm16(), 5);
    }
    $(this).closest('td').attr("oldText", this.value);
}

function columnsTimePicker_blur() {
    if ($(this).data("kendoTimePicker").value() == null || $(this).data("kendoTimePicker").value() == "") this.value = null;
    else this.value = Right($(this).data("kendoTimePicker").value().yyyymmddhhmm16(), 5);

    p_idx = getIdx_gridRowTr($(this).closest("tr"));
    p_aliasName = this.name;

    if (this.value == $(this).closest('td').attr("oldText")) {
        //아래와 같이 시간 0으로 setTimeout 을 2중으로 함.
        setTimeout(function (p_this, p_value) {
            setTimeout(function (pp_this, pp_value) {
                $(pp_this).text(pp_value);
            }, 0, p_this, p_value);
        }, 0, $(this).closest('td'), this.value);

        ////dirtyClear();
        return false;
    }

    var url = "info.php?flag=textUpdate&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&parent_idx=" + document.getElementById("parent_idx").value
        + "&pre=" + document.getElementById("pre").value
        + "&addParam=" + document.getElementById("addParam").value;
    var paramJson = { keyAlias: key_aliasName, keyValue: p_idx, thisValue: this.value, oldText: $(this).closest('td').attr("oldText"), thisAlias: p_aliasName };
    $.post(url, paramJson,
        function (result) {
            //dirtyClear();

            //eval(result.readResult)
            result.readResult = replaceAll(result.readResult, '@dda', '"');
            result.thisValue = replaceAll(result.thisValue, '@dda', '"');

            p_dataItem = eval(result.readResult.replace(/\r\n/gi, '\\r\\n'))[0];

            $.each(p_dataItem, function (key, value) {
                if (getObjects(p_columns_1D, 'field', key)[0]) {
                    if (getObjects(p_columns_1D, 'field', key)[0].template) {
                        value = columns_templete(p_dataItem, key);
                    }
                }
                if (document.getElementById("key_aliasName").value != key && key != 'rowNumber') {
                    setGridCellValue_idx(p_idx, key, value);
                }
            });

            if (result.resultCode == 'fail') {
                toastr.error(getTitle_aliasName(result.thisAlias) + "::: " + result.thisValue + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
            } else {
                toastr.success(getTitle_aliasName(result.thisAlias) + "= " + result.thisValue + "<br>로 저장이 완료되었습니다.", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
            }
            if (result.__devQuery_url && isMobile() == false) {
                toastr.info('<a href="javascript:;" onclick="query_popup(\'' + result.__devQuery_url + '\');">저장 쿼리를 보시려면, 여기를 클릭하세요.</a>', '', { timeOut: 7000 });
            }
        }
    ).done(function (e) {
        //alert( "second success" );
        //timepicker 에서는 검증됨. 2021년이 되면 debugger; 없앨것.
        //debugger;
        obj = $(getCellObj_idx(p_idx, p_aliasName));
        obj[0].innerText = e.thisValue;
        obj.attr('oldText', e.thisValue)
    })
        .fail(function () {
            //alert( "error" );
        })
        .always(function (e) {

            obj = $(getCellObj_idx(p_idx, p_aliasName));
            if (obj.text() == "") obj[0].innerText = null;
            else {
                obj[0].innerText = obj.text();
            }
            dirtyClear();
            //alert( "finished" );
        });
}





//$filter: substringof('zz',tolower(table_new_gidxQngname))
//$filter: startswith(tolower(table_new_gidxQngname),'zz')

function columnsDatePicker(container, options) {

    var obj = $('<input type="date" name="' + options.field + '" onkeydown="return false;" onfocus="this.showPicker();"/>').appendTo(container);
    obj.bind("focus", columnsDatePicker_focus);
    obj.bind("change", columnsDatePicker_change);
    if (options.model[options.field]) {
        if (options.model[options.field] != "" && options.model[options.field].length > 10) {
            options.model[options.field] = new Date(options.model[options.field]).yyyymmdd10();
        }
    }

}

function columnsDatePicker_focus() {

    if ($(this).val() == null) {
        this.value = null;
        $(this).attr("oldText", this.value);
    } else {
        this.value = new Date($(this).val()).yyyymmdd10();
        $(this).attr("oldText", this.value);
    }
}

function columnsDatePicker_change() {
    this.blur();
    if (this.value == null || this.value == '') {
        this.value = null;
    } else {
        this.value = new Date(this.value).yyyymmdd10();
    }
    p_idx = getIdx_gridRowTr($(this).closest("tr"));
    p_aliasName = this.name;

    if (this.value == $(this).attr("oldText")) {
        return false;
    }
    var url = "info.php?flag=textUpdate&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&parent_idx=" + document.getElementById("parent_idx").value
        + "&pre=" + document.getElementById("pre").value
        + "&addParam=" + document.getElementById("addParam").value;
    var paramJson = { keyAlias: key_aliasName, keyValue: p_idx, thisValue: this.value, oldText: $(this).attr("oldText"), thisAlias: p_aliasName };
    $.post(url, paramJson,
        function (result) {
            dirtyClear();
            $.each(eval(replaceAll(replaceAll(result.readResult, '\\\\\\@dda', '\\"'), '\\@dda', '"'))[0], function (key, value) {
                //if(key=='Grid_ListEdit') debugger;
                if (document.getElementById("key_aliasName").value != key) setGridCellValue_idx(p_idx, key, value);
            });
            if (result.afterScript != "") {
                eval(result.afterScript);
            }
            if (result.resultCode == 'fail') {
                toastr.error(getTitle_aliasName(result.thisAlias) + "::: " + result.thisValue + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
            } else {
                toastr.success(getTitle_aliasName(result.thisAlias) + "| " + result.thisValue + "<br>로 저장이 완료되었습니다.", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
            }
            if (result.__devQuery_url && isMobile() == false) {
                toastr.info('<a href="javascript:;" onclick="query_popup(\'' + result.__devQuery_url + '\');">저장 쿼리를 보시려면, 여기를 클릭하세요.</a>', '', { timeOut: 7000 });
            }
        }
    ).done(function () {
        //alert( "second success" );
    })
        .fail(function () {
            //alert( "error" );
        })
        .always(function () {
            obj = $(getCellObj_idx(p_idx, p_aliasName));
            if (obj.text() == "") obj[0].innerText = null;
            else obj[0].innerText = new Date(obj.text()).yyyymmdd10();
            //alert( "finished" );
        });
}





function columnsDateTimePicker(container, options) {

    var obj = $('<input data-bind="value:' + options.field + '" data-format="yyyy-MM-dd HH:mm" data-role="datetimepicker" name="' + options.field + '"/>').appendTo(container);
    obj.bind("focus", columnsDateTimePicker_focus);
    obj.bind("blur", columnsDateTimePicker_blur);
    if (options.model[options.field] != "" && options.model[options.field].length > 16) {
        options.model[options.field] = new Date(options.model[options.field]).yyyymmddhhmm16();
    }
}

function columnsDateTimePicker_focus() {
    if ($(this).data("kendoDateTimePicker").value() == null) {
        this.value = null;
        $(this).attr("oldText", this.value);
    } else {
        this.value = $(this).data("kendoDateTimePicker").value().yyyymmddhhmm16();
        $(this).attr("oldText", this.value);
    }
}

function columnsDateTimePicker_blur() {
    if ($(this).data("kendoDateTimePicker").value() == null || $(this).data("kendoDateTimePicker").value() == "") this.value = null;
    else this.value = $(this).data("kendoDateTimePicker").value().yyyymmddhhmm16();

    p_idx = getIdx_gridRowTr($(this).closest("tr"));
    p_aliasName = this.name;

    if (this.value == $(this).attr("oldText")) return false;

    var url = "info.php?flag=textUpdate&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&parent_idx=" + document.getElementById("parent_idx").value
        + "&pre=" + document.getElementById("pre").value
        + "&addParam=" + document.getElementById("addParam").value;
    var paramJson = { keyAlias: key_aliasName, keyValue: p_idx, thisValue: this.value, oldText: $(this).attr("oldText"), thisAlias: p_aliasName };
    $.post(url, paramJson,
        function (result) {
            dirtyClear();
            if (result.resultCode == 'fail') {
                toastr.error(getTitle_aliasName(result.thisAlias) + "::: " + result.thisValue + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
            } else {
                toastr.success(getTitle_aliasName(result.thisAlias) + ": " + result.thisValue + "<br>로 저장이 완료되었습니다.", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
            }
            if (result.__devQuery_url && isMobile() == false) {
                toastr.info('<a href="javascript:;" onclick="query_popup(\'' + result.__devQuery_url + '\');">저장 쿼리를 보시려면, 여기를 클릭하세요</a>', '', { timeOut: 7000 });
            }
        }
    ).done(function () {
        //alert( "second success" );
    })
        .fail(function () {
            //alert( "error" );
        })
        .always(function () {
            obj = $(getCellObj_idx(p_idx, p_aliasName));
            if (obj.text() == "") obj[0].innerText = null;
            else obj[0].innerText = new Date(obj.text()).yyyymmddhhmm16();
            //alert( "finished" );
        });
}







function columnsMaskedTextBox(container, options) {

    var obj = $('<input data-bind="value:' + options.field + '" data-mask="00:00" data-role="maskedtextbox" name="' + options.field + '"/>').appendTo(container);
    obj.bind("focus", columnsMaskedTextBox_focus);
    obj.bind("blur", columnsMaskedTextBox_blur);
}
function columnsMaskedTextBox_focus() {
    if ($(this).data("kendoMaskedTextBox").value() == null) {
        if ($(this).closest('td').attr('oldText') != undefined && $(this).closest('td').attr('oldText') != '') {
            this.value = $(this).closest('td').attr('oldText');
        } else {
            this.value = null;
        }
    } else {
        this.value = $(this).data("kendoMaskedTextBox").value();
    }
    $(this).closest('td').attr("oldText", this.value);
}

function columnsMaskedTextBox_blur() {
    if ($(this).data("kendoMaskedTextBox").value() == null || $(this).data("kendoMaskedTextBox").value() == "") this.value = null;
    else this.value = $(this).data("kendoMaskedTextBox").value();

    p_idx = getIdx_gridRowTr($(this).closest("tr"));
    p_aliasName = this.name;

    if (this.value == $(this).closest('td').attr("oldText")) {
        //아래와 같이 시간 0으로 setTimeout 을 2중으로 함.
        setTimeout(function (p_this, p_value) {
            setTimeout(function (pp_this, pp_value) {
                $(pp_this).text(pp_value);
            }, 0, p_this, p_value);
        }, 0, $(this).closest('td'), this.value);

        ////dirtyClear();
        return false;
    }

    var url = "info.php?flag=textUpdate&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&parent_idx=" + document.getElementById("parent_idx").value
        + "&pre=" + document.getElementById("pre").value
        + "&addParam=" + document.getElementById("addParam").value;
    var paramJson = { keyAlias: key_aliasName, keyValue: p_idx, thisValue: this.value, oldText: $(this).closest('td').attr("oldText"), thisAlias: p_aliasName };
    $.post(url, paramJson,
        function (result) {
            //dirtyClear();

            //eval(result.readResult)
            result.readResult = replaceAll(result.readResult, '@dda', '"');
            result.thisValue = replaceAll(result.thisValue, '@dda', '"');
            p_dataItem = eval(result.readResult.replace(/\r\n/gi, '\\r\\n'))[0];

            $.each(p_dataItem, function (key, value) {
                if (getObjects(p_columns_1D, 'field', key)[0]) {
                    if (getObjects(p_columns_1D, 'field', key)[0].template) {
                        value = columns_templete(p_dataItem, key);
                    }
                }
                if (document.getElementById("key_aliasName").value != key && key != 'rowNumber') {
                    setGridCellValue_idx(keyValue, key, value);
                }
            });

            if (result.resultCode == 'fail') {
                toastr.error(getTitle_aliasName(result.thisAlias) + "::: " + result.thisValue + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
            } else {
                toastr.success(getTitle_aliasName(result.thisAlias) + "= " + result.thisValue + "<br>로 저장이 완료되었습니다.", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
            }
            if (result.__devQuery_url && isMobile() == false) {
                toastr.info('<a href="javascript:;" onclick="query_popup(\'' + result.__devQuery_url + '\');">저장 쿼리를 보시려면, 여기를 클릭하세요.</a>', '', { timeOut: 7000 });
            }
        }
    ).done(function (e) {
        //alert( "second success" );
        //MaskedTextBox 에서는 검증됨. 2021년이 되면 debugger; 없앨것.
        //debugger;
        obj = $(getCellObj_idx(p_idx, p_aliasName));
        obj[0].innerText = e.thisValue;
        obj.attr('oldText', e.thisValue)
    })
        .fail(function () {
            //alert( "error" );
        })
        .always(function (e) {

            obj = $(getCellObj_idx(p_idx, p_aliasName));
            if (obj.text() == "") obj[0].innerText = null;
            else {
                obj[0].innerText = obj.text();
            }
            dirtyClear();
            //alert( "finished" );
        });
}





//textarea 해결
function columnsTextareaEditor(container, options) {
    maxLength = getObjects(p_columns, 'field', options.field)[0].maxLength;
    if (maxLength * 1 > 1) maxLength_var = ' maxLength="' + maxLength + '" '; else maxLength_var = '';

    var obj = $('<textarea data-bind="value:' + options.field + '" ' + maxLength_var + ' name="' + options.field + '" style="width:400px;" class="k-content k-raw-content columnsTextareaEditor"></textarea>').appendTo(container);
    obj.bind("focus", columnsTextareaEditor_focus);
    obj.bind("change", columnsTextareaEditor_blur);
}

function columnsTextareaEditor_focus() {
    $(this).attr("oldText", this.value);
}

function columnsTextareaEditor_blur() {

    p_idx = getIdx_gridRowTr($(this).closest("tr"));
    p_aliasName = this.name;

    var url = "info.php?flag=textUpdate&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&parent_idx=" + document.getElementById("parent_idx").value
        + "&pre=" + document.getElementById("pre").value
        + "&addParam=" + document.getElementById("addParam").value;
    var paramJson = { keyAlias: key_aliasName, keyValue: p_idx, thisValue: this.value, oldText: $(this).attr("oldText"), thisAlias: p_aliasName };
    $.post(url, paramJson,
        function (result) {
            dirtyClear();
            if (result.resultCode == 'fail') {
                toastr.error(getTitle_aliasName(result.thisAlias) + "::: " + result.thisValue + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
            } else {
                toastr.success(getTitle_aliasName(result.thisAlias) + ": " + result.thisValue + "<br>로 저장이 완료되었습니다.", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
            }
            if (result.afterScript != "") eval(result.afterScript);
            if (result.__devQuery_url && isMobile() == false) {
                toastr.info('<a href="javascript:;" onclick="query_popup(\'' + result.__devQuery_url + '\');">저장 쿼리를 보시려면, 여기를 클릭하세요.</a>', '', { timeOut: 7000 });
            }
        }
    ).done(function () {
        //alert( "second success" );
    })
        .fail(function () {
            //alert( "error" );
        })
        .always(function () {
            //alert( "finished" );
        });
}



function filerRowBound(p_keyword) {
    $("div.k-list-container[aria-hidden='false'] div.k-list-scroller ul.k-list.k-reset li").each(function () {
        this.innerHTML = replaceAll(this.innerHTML, p_keyword, "<font color=blue>" + p_keyword + "</font>");
    });
}


function kendoDropdown_items(container, options) {

    //debugger;
    var selectData = [];
    var items = getColumnAttr_aliasName(options.field, "Grid_Items");   //모든 코드리스트

    if (Array.isArray(items)) {
        var selectItems = items;
    } else {

        var selectItems = items.split(",");
    }
    forMax = selectItems.length;
    //아래처럼 불러와야 객체와 연결이 안됨.
    var selList = JSON.parse(JSON.stringify(options.model[options.field]));
    if (selList == null || selList == "") selList = [];
    if (selList.length > 0) {
        if (selList[0]['text'] == undefined && selList[0]['value'] != undefined) {
            for (j = 0; j < selList.length; j++) {
                if (getObjects(selectItems, 'value', selList[j]['value']).length == 1) {
                    selList[j]['text'] = getObjects(selectItems, 'value', selList[j]['value'])[0].text;
                }
            }
        }
    }
    for (ii = 0; ii < forMax; ii++) {
        selectData.push(selectItems[ii]);
        //selList.remByVal(selectItems[ii]);
        selList = removeItem(selList, selectItems[ii]);
    }
    //저장된 데이터에는 존재하지만, 사전정의 item list 없는 값을 추가하기 위해.
    for (ii = 0; ii < selList.length; ii++) {
        if (selList[ii].text == undefined) {
            selList[ii] = { value: selList[ii].value, text: selList[ii].value };
        }
        selectData.push(selList[ii]);
    }
    return selectData;

}

function kendoMultiSelect_items(container, options) {

    var selectData = [];
    var items = getColumnAttr_aliasName(options.field, "Grid_Items");   //모든 코드리스트

    if (Array.isArray(items)) {
        var selectItems = items;
    } else {

        var selectItems = items.split(",");
    }
    forMax = selectItems.length;
    //아래처럼 불러와야 객체와 연결이 안됨.
    var selList = JSON.parse(JSON.stringify(options.model[options.field]));
    if (selList == null || selList == "") selList = [];
    if (selList.length > 0) {
        if (selList[0]['text'] == undefined && selList[0]['value'] != undefined) {
            for (j = 0; j < selList.length; j++) {
                if (getObjects(selectItems, 'value', selList[j]['value']).length == 1) {
                    selList[j]['text'] = getObjects(selectItems, 'value', selList[j]['value'])[0].text;
                }
            }
        }
    }
    for (ii = 0; ii < forMax; ii++) {
        selectData.push(selectItems[ii]);
        //selList.remByVal(selectItems[ii]);
        selList = removeItem(selList, selectItems[ii]);
    }
    //저장된 데이터에는 존재하지만, 사전정의 item list 없는 값을 추가하기 위해.
    for (ii = 0; ii < selList.length; ii++) {
        if (selList[ii].text == undefined) {
            selList[ii] = { value: selList[ii].value, text: selList[ii].value };
        }
        selectData.push(selList[ii]);
    }
    return selectData;

}

function kendoMultiSelect_default(container, options) {
    if (typeof options.model[options.field] == "object") return options.model[options.field];
    var selectData = [];

    if (options.model[options.field] != undefined && options.model[options.field] != "") {
        var selectItems = options.model[options.field].split(",");
        forMax = selectItems.length;
        for (ii = 0; ii < forMax; ii++) {
            selectData.push({ "value": selectItems[ii] });
        }
    }
    return selectData;
}

function columnsMultiSelect_blur(p_this) {
    if ($(p_this).data("kendoMultiSelect")) {
        document.getElementById("stopUpdate").value = "Y";
        $(p_this).data("kendoMultiSelect").trigger("change");
        document.getElementById("stopUpdate").value = "";
    } else if ($(p_this).data("kendoDropDownTree")) {
        document.getElementById("stopUpdate").value = "Y";
        $(p_this).data("kendoDropDownTree").trigger("change");
        document.getElementById("stopUpdate").value = "";
    }
}

function columnsMultiSelectEditor(container, options) {
    var p_default = kendoMultiSelect_default(container, options);
    options.model[options.field] = p_default;
    var Grid_Items_6 = Left(getObjects(p_columns, 'field', options.field)[0]["Grid_Items"], 6);


    if (Grid_Items_6 == 'select') {
        var addUrl = "";
        if (getObjects(p_columns, "field", options.field)[0].editor.toString().split("(")[0].split("function ")[1] == "columnsDropDownItemEditor") {
            addUrl = "&blank=Y";
        }
        list_grid_items_url = "list_grid_items.php?RealPid=" + document.getElementById("RealPid").value
            + "&allFilter=" + $('textarea#allFilter')[0].innerHTML
            + "&MisJoinPid=" + document.getElementById("MisJoinPid").value
            + "&parent_gubun=" + document.getElementById("parent_gubun").value
            + "&parent_idx=" + document.getElementById("parent_idx").value
            + "&idx=" + getIdx_gridRowTr($(event.srcElement).closest('tr'))
            + "&ActionFlag=list_grid_items"
            + "&aliasName=" + options.field + addUrl
            + "&itemList=" + JSON.stringify(p_default);
        var p_dataSource = {
            //type: "odata",
            serverFiltering: true,
            transport: {
                read: list_grid_items_url
            }
        };
    } else {
        debugger;
        var p_dataSource = kendoMultiSelect_items(container, options);
    }

    var obj = $('<select id="sel_multiSelect" ' + iif(isMobile() == true, ' onkeydown="return false;" ', '') + ' onblur="columnsMultiSelect_blur(this);" data-value-primitive="true" data-value-field="value" data-text-field="text" data-bind="value:' + options.field + '" multiple="multiple"></select>')
        .appendTo(container)
        .kendoMultiSelect({
            dataTextField: "text",
            dataValueField: "value",
            autoBind: iif(Grid_Items_6 == 'select', true, false),
            filter: 'contains',
            dataSource: p_dataSource,
            value: p_default,
            valuePrimitive: iif(Grid_Items_6 == 'select', false, true),       //반드시 true. 안하면 이상해짐.
            /*
            filtering: function(e) {
                if(e.filter!=undefined) {
                    e.sender.dataSource.transport.options.read.url = e.sender.dataSource.transport.options.read.url.split("&selValue=")[0]+"&selValue="+e.filter.value;
                }
            },

            dataBound: function(e) {
            },
            */
            dataBound: function (e) {
                if ($('input[aria-owns="sel_multiSelect_taglist sel_multiSelect_listbox"]')[0]) {
                    $('input[aria-owns="sel_multiSelect_taglist sel_multiSelect_listbox"]').keydown(function (e) {
                        if (event.code == 'Escape') {  //새로고침 외에는 대안을 못찾음 [object object] 증상.
                            //debugger
                            $('#grid').data('kendoGrid').dataSource.read();
                            return false;
                        }
                    });
                }
            },
            select: function (e) {
                if (event.srcElement.tagName == "LI") {    //추가할 경우 old 값 저장
                    if (this._old) updateList["_up_fieldOldValue"] = this._old.join(",");
                    else updateList["_up_fieldOldValue"] = "@@fail";
                }
            },
            change: function (e) {

                var selIdx = getIdx_gridRowTr(this.element.closest("tr"));
                var selData = e.sender.dataSource._pristineData[0];
                if (selData == undefined) {
                    x.stop;
                }
                var selKey = replaceAll(this.element.attr("data-bind"), "value:", "");

                //자동증가키값도 같이 보냄.
                if (p_columns[1].field == undefined) {
                    updateList["_up_autoincrement_key"] = p_columns[2].field;
                    updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][p_columns[2].field];
                } else {
                    updateList["_up_autoincrement_key"] = p_columns[1].field;
                    updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][p_columns[1].field];
                }


                updateList["_up_field"] = selKey;
                updateList["_up_fieldValue"] = getGridCellValue_idx(selIdx, updateList["_up_field"]);
                updateList["_up_key"] = key_aliasName;
                if (event.srcElement.tagName == "SPAN") {  // 제거할 경우 old 값 저장
                    if (this._initialValues) updateList["_up_fieldOldValue"] = this._initialValues.join(",");
                    else updateList["_up_fieldOldValue"] = "@@fail";
                }
                $('#grid').data('kendoGrid').saveChanges();
                setTimeout(function () {
                    updateList["_up_fieldOldValue"] = "@@fail";
                });
            }
        });
    //var multiselect = $(obj).data("kendoMultiSelect");
    //console.log(obj.parent().find("input"));

    obj.parent().find("input").unbind("keydown");   //이걸 해야 kendoMultiSelect 때, esc 누를경우 지워짐 방지.
}


function isClick(p_this) {
    if (event.relatedTarget == undefined) {
        return false;
    }

    if (event.relatedTarget.tagName != 'INPUT') {
        if ($('.toast.toast-warning').length == 0) {
            toastr.warning(event.relatedTarget.tagName + $(event.path[1]).attr('class'), "클릭을 너무 짧게하면 트리뷰가 사라집니다.", { progressBar: true, timeOut: 6000 });
        }
    }
    if ($(p_this).attr('isClick') == 'N') $(p_this).attr('isClick', 'Y');
    else columnsMultiSelect_blur(p_this);
}

function columnsDropDownTreeEditor(container, options) {

    optValue = options.model[options.field];
    if (Right(optValue, 1) == ',') {
        optValue = Left(optValue, optValue.length - 1);
    }
    $(container).attr('escape_attack', optValue);

    //너무 짧게 클릭했을 때는 데이터 새로고침.
    setTimeout(function (p_container) {
        if ($('#sel_dropDownTree').length == 0) {
            $('#grid').data('kendoGrid').dataSource.read();
        }
    }, 1000, container);

    var p_default = kendoMultiSelect_default(container, options);
    options.model[options.field] = p_default;

    var p_dataSource = getColumnAttr_aliasName(options.field, "Grid_Items");   //모든 코드리스트
    allList = JSON.stringify(p_dataSource);
    selList = options.model[options.field];
    if (selList != null) {
        for (k = 0; k < selList.length; k++) {
            allList = replaceAll(allList, '"value":"' + selList[k].value + '"', '"value":"' + selList[k].value + '","checked":true');
        }
    }


    aa_json = JSON.parse(allList);


    //tree 구조답게 > 기호가 있을 경우와 없는 경우로 나눠서 계산.
    if (InStr(aa_json[0].text, '>') > 0) {
        allList = replaceAll(allList, ' | ', '|');
        allList = replaceAll(allList, ' |', '|');
        allList = replaceAll(allList, '| ', '|');
        ss = allList.split('|');
        rr0 = '{ text: "@text", expanded: true, items: [@items] }';
        rr = '[';
        for (ii = 1; ii < ss.length; ii++) {
            gg_prev = '';
            gg_next = '';
            gg = ss[ii].split(' > ')[0];
            if (ii > 0) gg_prev = ss[ii - 1].split(' > ')[0];
            if (ii < ss.length - 1) gg_next = ss[ii + 1].split(' > ')[0];

            if (ii == 0 || gg_prev != gg) {
                rr = rr + iif(ii <= 1, '', ',') + replaceAll(rr0, '@text', gg);
            }
            rr = replaceAll(rr, '@items', '{"value":"' + aa_json[ii - 1].value + '","text":"' + aa_json[ii - 1].text + '"' + iif(InStr(allList, '"value":"' + aa_json[ii - 1].value + '","checked":true') > 0, ',"checked":true', '') + '},@items');

            if (gg_next != gg) rr = replaceAll(rr, ',@items', '');
        }
        rr = rr + ']';
        rr = replaceAll(replaceAll(rr, String.fromCharCode(10), ''), String.fromCharCode(13), '');
        allList = rr;

    } else {

    }


    p_dataSource = eval(allList);
    p_default = p_dataSource.filter(x => {
        return x.checked
    });
    p_default = JSON.parse(replaceAll(JSON.stringify(p_default), ',"checked":true', ''));
    options.model[options.field] = p_default;


    var obj = $('<select id="sel_dropDownTree" isClick="N" onblur="isClick(this);" data-bind="value:' + options.field + ', source: p_dataSource"></select>')
        .appendTo(container)
        .kendoDropDownTree({
            dataTextField: "text",
            dataValueField: "value",
            autoBind: false,          //반드시 false
            //filter: "contains",   //반드시 주석. 이것 때문에 checkChildren 가 안됨
            checkAll: true,
            checkboxes: { checkChildren: true },
            autoClose: false,   //반드시 false
            dataValue: options.field,
            dataSource: p_dataSource,
            valuePrimitive: true,       //반드시 true. 안하면 이상해짐.
            open: function (e) {
                /*
                $("div.k-popup-dropdowntree div.k-check-all span.k-checkbox-label").click( function() {
                    var allChecked = $("div.k-popup-dropdowntree div.k-check-all input")[0].checked;
                    console.log(allChecked);
                    if(allChecked) {
                        var obj = $('div.k-popup-dropdowntree div[data-role="treeview"] input:not(:checked)').click();
                    } else {
                        var obj = $('div.k-popup-dropdowntree div[data-role="treeview"] input:checked').click();
                    }

                    //$('div.k-popup-dropdowntree div[data-role="treeview"] span.k-checkbox-label').prop("checked",allChecked);
                });
                */
            },
            dataBound: function (e) {
                //this_value = $(this.element).data('kendoDropDownTree').value();

                if (e.node != undefined) {
                    if (e.node.context.className == 'k-item k-last') $(this.element).data('kendoDropDownTree').open();
                }
                //x.stop;
                /*
                this.element.closest("div.k-dropdowntree").blur( function() {
                    console.log("blur...");
                    document.getElementById("sel_aliasName").value = replaceAll($(this).find("select").attr("data-bind"), "value:", "");
                    document.getElementById("sel_idx").value = getIdx_gridRowTr($(this).closest("tr"));
                    setTimeout( function() {
                        if($(getCellObj_idx(document.getElementById("sel_idx").value, document.getElementById("sel_aliasName").value)).find('div').length==0) {
                            var obj = getGridCellValue_idx(document.getElementById("sel_idx").value, document.getElementById("sel_aliasName").value);
                            var t = "";
                            for(i=0;i<obj.length;i++) {
                                if(i==0) t = obj[i].value;
                                else t = t + "," + obj[i].value;
                            }
                            getCellObj_idx(document.getElementById("sel_idx").value, document.getElementById("sel_aliasName").value).innerText = t;
                        } 
                    });
                });
                */
            },
            close: function (e) {

                if (event.code == 'Escape') {
                    $('#grid').data('kendoGrid').dataSource.read();
                    return false;
                }
                var selIdx = getIdx_gridRowTr(this.element.closest("tr"));
                var selData = e.sender.dataSource._pristineData[0];
                if (selData == undefined) {
                    x.stop;
                }
                var selKey = replaceAll(this.element.attr("data-bind"), "value:", "");
                updateList["_up_field"] = selKey.split(',')[0];
                _up_fieldValue = getGridCellValue_idx(selIdx, updateList["_up_field"]);
                if (Right(_up_fieldValue, 1) == ',') {
                    _up_fieldValue = Left(_up_fieldValue, _up_fieldValue.length - 1);
                }

                //자동증가키값도 같이 보냄.
                if (p_columns[1].field == undefined) {
                    updateList["_up_autoincrement_key"] = p_columns[2].field;
                    updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][p_columns[2].field];
                } else {
                    updateList["_up_autoincrement_key"] = p_columns[1].field;
                    updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][p_columns[1].field];
                }

                updateList["_up_fieldValue"] = _up_fieldValue;
                updateList["_up_key"] = key_aliasName;
                if (e.sender.element.closest('td').attr('escape_attack') != _up_fieldValue) {
                    $('#grid').data('kendoGrid').saveChanges();
                } else {
                    dirtyClear();
                }
                //e.sender.element.closest('tr').find('td[comment="Y"]').prev().click();

            },
            select: function (e) {
                /*
                if(event.srcElement.tagName=="LI") {    //추가할 경우 old 값 저장
                    //if(this._old) updateList["_up_fieldOldValue"] = this._old.join(",");
                    //else updateList["_up_fieldOldValue"] = "@@fail";
                }
                */
            },
            change: function (e) {
                var selIdx = getIdx_gridRowTr(this.element.closest("tr"));
                var selData = e.sender.dataSource._pristineData[0];
                if (selData == undefined) {
                    x.stop;
                }
                var selKey = replaceAll(this.element.attr("data-bind"), "value:", "");
                updateList["_up_field"] = selKey.split(',')[0];
                updateList["_up_fieldValue"] = getGridCellValue_idx(selIdx, updateList["_up_field"]);
                updateList["_up_key"] = key_aliasName;

                if (event) {
                    if (event.code == 'Escape') {
                        /*
                        document.getElementById("sel_aliasName").value = replaceAll(this.element.attr("data-bind"), "value:", "");
                        document.getElementById("sel_idx").value = getIdx_gridRowTr(this.element.closest("tr"));
                        setTimeout( function() {
                            if($(getCellObj_idx(document.getElementById("sel_idx").value, document.getElementById("sel_aliasName").value.split(",")[0])).find('div').length==0) {
                                var obj = getGridCellValue_idx(document.getElementById("sel_idx").value, document.getElementById("sel_aliasName").value.split(",")[0]);
                                var t = "";
                                for(i=0;i<obj.length;i++) {
                                    if(i==0) t = obj[i].value;
                                    else t = t + "," + obj[i].value;
                                }
                                getCellObj_idx(document.getElementById("sel_idx").value, document.getElementById("sel_aliasName").value.split(",")[0]).innerText = t;
                            } 
                        });
                        */
                        dirtyClear();
                        return false;
                    }
                    if (event.srcElement.tagName == "SPAN") {  // 제거할 경우 old 값 저장
                        if (this._initialValues) updateList["_up_fieldOldValue"] = this._initialValues.join(",");
                        else updateList["_up_fieldOldValue"] = "@@fail";
                    }

                    //////////////////////////////////////////////////////////$('#grid').data('kendoGrid').saveChanges();
                    setTimeout(function () {
                        updateList["_up_fieldOldValue"] = "@@fail";
                    });
                } else {
                    dirtyClear();
                }
                //obj.parent().find("input").unbind("keydown");   //이걸 해야 kendoMultiSelect 때, esc 누를경우 지워짐 방지.

            }
        });

    //var multiselect = $(obj).data("kendoMultiSelect");
    //console.log(obj.parent().find("input"));

    //obj.parent().find("input").unbind("keydown");   //이걸 해야 kendoMultiSelect 때, esc 누를경우 지워짐 방지.
}
function list_helpbox(p_this) {
    code_alias = getAliasName_tdObj($(p_this).closest('td').next());
    sel_idx = getIdx_gridRowTr($(p_this).closest('tr'));
    url = url = location.href.split('?')[0] + '?' + iif(document.getElementById('MisJoinPid').value != '', 'RealPid=' + document.getElementById('MisJoinPid').value, 'gubun=' + document.getElementById('gubun').value) + '&helpbox_parent_idx=' + document.getElementById("parent_idx").value + '&sel_idx=' + sel_idx + '&helpbox=' + code_alias + '&winID=' + windowID() + '&pwinID=' + parent.windowID() + '&winActionFlag=' + document.getElementById('ActionFlag').value;
    //특성상, parent_popup_jquery 로 안함. 현재창에서 연다.
    popup_jquery(url, getFieldAttr(key_aliasName, 'title') + ':' + sel_idx + ' 에 대한 ' + getFieldAttr(code_alias, 'title') + ' 선택창', 1000, 600, true);
}


function sel_dropDownItem_change(p_this) {

    var selIdx = getIdx_gridRowTr($(p_this).closest("tr"));

    updateList["_up_field"] = $(p_this).attr('data-bind').split(':')[1];
    updateList["_up_fieldOldValue"] = $(p_this).attr('oldValue');
    updateList["_up_fieldOldValue"] = "@@fail";
    updateList["_up_fieldValue"] = p_this.value;

    const queryString = $('#grid').data('kendoGrid').dataSource.transport.options.update.url.split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    const parentIdxValue = urlParams.get('parent_idx');
    if (parentIdxValue != undefined && parentIdxValue != '') {
        $('#grid').data('kendoGrid').dataSource.transport.options.update.url = replaceAll($('#grid').data('kendoGrid').dataSource.transport.options.update.url, 'parent_idx=' + parentIdxValue, 'parent_idx=' + document.getElementById('parent_idx').value);
    }

    //자동증가키값도 같이 보냄.
    if (p_columns[1].field == undefined) {
        updateList["_up_autoincrement_key"] = p_columns[2].field;
        updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr($(p_this).closest("tr"))][p_columns[2].field];
    } else {
        updateList["_up_autoincrement_key"] = p_columns[1].field;
        updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr($(p_this).closest("tr"))][p_columns[1].field];
    }

    updateList["_up_key"] = key_aliasName;

    $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr($(p_this).closest("tr"))][updateList["_up_field"]] = updateList["_up_fieldValue"];
    $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr($(p_this).closest("tr"))][updateList["_up_joinField"]] = updateList["_up_joinFieldValue"];

    let dataItem = $('#grid').data('kendoGrid').dataSource.view()[getGridRowIndex_idx(selIdx)];
    dataItem['dirty'] = true;

    $('#grid').data('kendoGrid').saveChanges();

    if (typeof listLogic_afterListEdit == "function") {
        listLogic_afterListEdit($('#grid').data('kendoGrid')._data, updateList);
    }
    $(p_this).off('change');
    gridHeight();
}
function options_field_change(p_this) {


    var selIdx = getIdx_gridRowTr($(p_this).closest("tr"));

    updateList["_up_field"] = $(p_this).attr('dataValueField');
    updateList["_up_joinField"] = p_this.id.split('options_')[1];
    updateList["_up_fieldOldValue"] = $(p_this).attr('oldValue');
    updateList["_up_fieldValue"] = p_this.value;
    updateList["_up_joinFieldValue"] = $(p_this).find("option:selected").text();
    updateList["_helplist"] = "";

    //자동증가키값도 같이 보냄.
    if (p_columns[1].field == undefined) {
        updateList["_up_autoincrement_key"] = p_columns[2].field;
        updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr($(p_this).closest("tr"))][p_columns[2].field];
    } else {
        updateList["_up_autoincrement_key"] = p_columns[1].field;
        updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr($(p_this).closest("tr"))][p_columns[1].field];
    }

    updateList["_up_key"] = key_aliasName;

    $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr($(p_this).closest("tr"))][updateList["_up_field"]] = updateList["_up_fieldValue"];
    $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr($(p_this).closest("tr"))][updateList["_up_joinField"]] = updateList["_up_joinFieldValue"];

    let dataItem = $('#grid').data('kendoGrid').dataSource.view()[getGridRowIndex_idx(selIdx)];
    dataItem['dirty'] = true;

    $('#grid').data('kendoGrid').saveChanges();

    if (typeof listLogic_afterListEdit == "function") {
        listLogic_afterListEdit($('#grid').data('kendoGrid')._data, updateList);
    }


}
function columnsDropDownListEditor(container, options) {
    //debugger;
    delta = 0;

    //index.php style 또는 서버로직에 설정된 help width 캐치
    if ($('div.k-list-container.helplist-container').length == 0) {
        $('body').append('<div class="k-list-container helplist-container"></div>');
        helpfullwith = $('div.k-list-container.helplist-container').width();
        $('div.k-list-container.helplist-container').remove();
    }
    helplistwidth = '';
    //console.log("표시는="+options.field);
    //console.log("값은="+getNextKey_key(options.model.fields, options.field));
    helplist = getColumnAttr_aliasName(options.field, 'helplist');
    if (helplist != undefined) {
        headerTemplate = '';
        tot_iwidth = 0;
        for (t = 0; t < helplist.length; t++) {
            item = helplist[t];
            if (isNumeric(item)) {
                helpfullwith = item;
                $('#style_helplist_container')[0].innerHTML =
                    `
body[ismobile="N"] div.k-list-container.helplist-container {
    width: `+ helpfullwith + `px!important;
    min-height: 320px!important;
}
`;
            } else {
                if (InStr(item, '.') > 0) {
                    iwidth = item.split('.')[1] * 1;
                } else {
                    if (getObjects(p_columns, 'title', item.split('.')[0]).length > 0) {
                        iwidth = (Math.abs(getObjects(p_columns, 'title', item.split('.')[0])[0].width) - 14) / 8;
                    } else {
                        iwidth = 20;
                    }
                }
                tot_iwidth = tot_iwidth + iwidth;
            }
        }



        if (isMobile()) {
            if ($(document).width() > helpfullwith) document_width = helpfullwith;
            else document_width = $(document).width();
        } else {
            document_width = helpfullwith;
        }
        delta = document_width / tot_iwidth / 7;   //좌우꽉찬화면구현
        for (t = 0; t < helplist.length; t++) {
            item = helplist[t];
            if (isNumeric(item)) {

            } else {
                if (InStr(item, '.') > 0) {
                    iwidth = item.split('.')[1] * 1;
                } else {
                    if (getObjects(p_columns, 'title', item.split('.')[0]).length > 0) {
                        iwidth = (Math.abs(getObjects(p_columns, 'title', item.split('.')[0])[0].width) - 14) / 8;
                    } else {
                        iwidth = 20;
                    }
                }
                item = item.split('.')[0];
                if (InStr(JSON.stringify(getObjects(p_columns, 'title', item)[0]), 'text-right') > 0) helplist_align = 'R';
                else helplist_align = '';

                iwidth = Math.floor(iwidth * delta);
                helplistwidth = helplistwidth + iwidth + '.' + helplist_align + iif(t < helplist.length - 1, ';', '');

                if (iwidth > uni_len(item)) {
                    headerTemplate = headerTemplate + iif(headerTemplate == '', '', '&nbsp;|&nbsp;') + item + '&nbsp;'.repeat(iwidth - uni_len(item));
                } else {
                    headerTemplate = headerTemplate + iif(headerTemplate == '', '', '&nbsp;|&nbsp;') + item;
                }
            }
        }

        headerTemplate = '<div class="helplist k-popup">' + headerTemplate + '</div>';

    }
    if (helplistwidth == '') headerTemplate = '';

    //사용장비선언확인: pc or mobile 에 따른 네이티브피커 사용여부 결정
    pc_mobile = getObjects(p_columns_1D, 'field', getNextKey_key(options.model.fields, options.field))[0]['Grid_Schema_Validation'];
    if (headerTemplate != '') {
        var obj = $('<div style="padding: 5px 4px;" onclick="list_helpbox(this);">' + options.model[options.field] + '</div>').appendTo(container);
        setTimeout(function (p_obj) {
            $(p_obj).attr('helplistwidth', helplistwidth);
            $(p_obj).attr('headerTemplate', headerTemplate);
            if ($(p_obj).text() == 'null') $(p_obj).text('');
            p_obj.click();
        }, 0, obj);
    } else if ((isMobile() == true || getUrlParameter('parent_ActionFlag') == 'modify') && pc_mobile != 'pc' || pc_mobile == 'mobile') {
        //드롭다운리스트에서의 네이티브피커 로직
        g_idx = getIdx_gridRowTr($(event.target).closest('tr'));
        dataValueField = getNextKey_key(options.model.fields, options.field);
        g_value = getGridCellValue_idx(g_idx, dataValueField);
        var obj = $('<select id="options_' + options.field + '" dataValueField="' + dataValueField + '" onchange="options_field_change(this);" style="width: calc(100% - 7px); padding: 5px 4px;" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" title="' + options.model[options.field] + '" name="' + options.field + '"><option value="">선택하세요</option></select>')
            .appendTo(container)
            .one("mouseenter", function (e) {
                $("#options_" + options.field).attr("oldValue", g_value);
                $.ajax({
                    url: "json_codeSelect.php?RealPid=" + document.getElementById("RealPid").value
                        + "&MisJoinPid=" + document.getElementById("MisJoinPid").value
                        + "&idx=" + document.getElementById("idx").value
                        + "&helplistwidth=" + helplistwidth + "&dataTextField=" + options.field + "&dataValueField=" + dataValueField + "&key_aliasName=" + document.getElementById("key_aliasName").value + "&key_value=" + options.model[document.getElementById("key_aliasName").value], // 여기에 실제 API 주소 입력
                    dataType: "jsonp",
                    jsonp: "$callback",
                    success: function (response) {
                        const items = response.d.results;
                        items.forEach(item => {
                            // 비어 있는 항목은 제외하거나 필요에 따라 처리
                            v_key = Object.keys(item)[0];
                            t_key = Object.keys(item)[1];
                            if (item[v_key] && item[t_key]) {
                                $("#options_" + options.field).append(
                                    $("<option>", {
                                        value: item[v_key],
                                        text: item[t_key]
                                    })
                                );
                            }
                        });
                        $("#options_" + options.field).val(g_value);

                    },
                    complete: function () {
                    },
                    error: function () {
                        alert("데이터 로딩 실패");
                    }
                });

            });
        $("#options_" + options.field).mouseenter();


    } else {
        var obj = $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" title="' + options.model[options.field] + '" name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                adaptiveMode: true,
                autoBind: true,
                dataTextField: options.field,
                dataValueField: getNextKey_key(options.model.fields, options.field),
                headerTemplate: headerTemplate,
                filter: "contains",
                dataSource: {
                    type: "odata",
                    serverFiltering: true,
                    ...(p_schema_fieldsAll[getNextKey_key(options.model.fields, options.field)]['group'] && {
                        group: { field: "group_item" }
                    }),
                    transport: {
                        read: "json_codeSelect.php?RealPid=" + document.getElementById("RealPid").value
                            + "&MisJoinPid=" + document.getElementById("MisJoinPid").value
                            + "&idx=" + document.getElementById("idx").value
                            + "&helplistwidth=" + helplistwidth + "&dataTextField=" + options.field + "&dataValueField=" + getNextKey_key(options.model.fields, options.field) + "&key_aliasName=" + document.getElementById("key_aliasName").value + "&key_value=" + options.model[document.getElementById("key_aliasName").value]
                    }
                },
                filtering: function (e) {
                    debugger;
                    if (e.filter != undefined) {
                        e.sender.dataSource.transport.options.read.url = e.sender.dataSource.transport.options.read.url.split("&selValue=")[0] + "&selValue=" + e.filter.value;
                    }
                },
                dataBound: function (e) {
                    /*
                    if($('div.k-list-container.helplist-container ul')[0]) {
                        if(InStr($('div.k-list-container.helplist-container ul')[0].innerHTML, 'ˇ')>0) {
                            $('div.k-list-container.helplist-container ul')[0].innerHTML = replaceAll($('div.k-list-container.helplist-container ul')[0].innerHTML, 'ˇ', '&nbsp;');
                        }
                    }
                    */

                    /*
                    if(e.sender.dataSource._data.length<=20 && e.sender._prev=="") {
                        if($("div.k-animation-container input.k-textbox").length==0 || $("div.k-animation-container input.k-textbox").val()=="") {
                            $("span.k-list-filter").hide();
                        }
                    }
                    */
                    e.sender.dataSource.transport.options.read.url = e.sender.dataSource.transport.options.read.url.split("&selValue=")[0];
                },
                select: function (e) {

                    var selIdx = getIdx_gridRowTr(this.element.closest("tr"));
                    var selData = e.sender.dataSource._pristineData[0];
                    if (selData == undefined) {
                        x.stop;
                    }
                    updateList = {};
                    ii = 0;
                    $.each(selData, function (key, data) {
                        if (ii == 0) {
                            updateList["_up_field"] = key;
                        } else if (ii == 1) {
                            updateList["_up_joinField"] = key;
                        }
                        ++ii;
                    });
                    if (this.selectedIndex >= 0) updateList["_up_fieldOldValue"] = this.dataSource._data[this.selectedIndex][updateList["_up_field"]];
                    else updateList["_up_fieldOldValue"] = "@@fail";
                },
                open: function (e) {
                    $('body').attr('dropdown', 'on');
                    //e.sender.element.parent().children()[0].innerText = e.sender.element[0].title;
                    //e.sender.element.data('kendoDropDownList').value(e.sender.element[0].title);    //경우에 따라 작동됨.
                },
                close: function (e) {
                    $('body').attr('dropdown', 'off');
                },
                change: function (e) {

                    var selIdx = getIdx_gridRowTr(this.element.closest("tr"));
                    var selData = e.sender.dataSource._pristineData[0];
                    if (selData == undefined) {
                        x.stop;
                    }

                    ii = 0;
                    $.each(selData, function (key, data) {
                        if (ii == 0) {
                            updateList["_up_field"] = key;
                        } else if (ii == 1) {
                            updateList["_up_joinField"] = key;
                        }
                        ++ii;
                    });
                    updateList["_up_fieldValue"] = this.dataSource._data[this.selectedIndex][updateList["_up_field"]];
                    updateList["_up_joinFieldValue"] = this.dataSource._data[this.selectedIndex][updateList["_up_joinField"]];
                    if (helplist.length > 0) {
                        _helplist = [];
                        for (i = 0; i < helplist.length; i++) {
                            if (isNumeric(helplist[i])) {

                            } else {
                                if (getObjects(p_columns, 'title', helplist[i].split('.')[0])[0]) {
                                    _helplist.push(getObjects(p_columns, 'title', helplist[i].split('.')[0])[0].field);
                                } else {
                                    _helplist.push('');
                                }
                            }
                        }
                        updateList["_helplist"] = JSON.stringify(_helplist);
                    } else updateList["_helplist"] = "";

                    //자동증가키값도 같이 보냄.
                    if (p_columns[1].field == undefined) {
                        updateList["_up_autoincrement_key"] = p_columns[2].field;
                        updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][p_columns[2].field];
                    } else {
                        updateList["_up_autoincrement_key"] = p_columns[1].field;
                        updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][p_columns[1].field];
                    }

                    updateList["_up_key"] = key_aliasName;

                    e.sender.element.prev().text(updateList["_up_joinFieldValue"]);
                    $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][updateList["_up_field"]] = updateList["_up_fieldValue"];
                    $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][updateList["_up_joinField"]] = updateList["_up_joinFieldValue"];

                    $('#grid').data('kendoGrid').saveChanges();

                    if (typeof listLogic_afterListEdit == "function") {
                        listLogic_afterListEdit($('#grid').data('kendoGrid')._data, updateList);
                    }
                }
            });
        if ($('.helplist')[0]) {
            if ($('.helplist')[0].innerText != '') {
                $('.helplist').closest('.k-list-container').addClass('helplist-container');
                if (isMobile()) $('.helplist').closest('.k-list-container').parent().addClass('helplist-container');
            }
        }
        setTimeout(function (p_obj) {
            p_obj.click();
        }, 0, obj);


    }




}

function toolbarTxt_dblclick(p_this) {
    p_this.value = '';
}
function toolbarTxt_keyup(p_this) {
    if (event.code == 'Enter') {
        p_this.blur();
    }
}
function toolbarSel_keyup(p_this) {
    if (event.code == 'Enter') {
        p_this.blur();
        $("a#btn_search_" + replaceAll(p_this.id.split('toolbarSel_')[1], '_end', '')).click();
    }
}

//ss
async function loadDropdownItems(list_grid_items_url) {
    try {
        // 1. Fetch를 사용하여 URL에 요청을 보냅니다. (URL: list_grid_items_url)
        const response = await fetch(list_grid_items_url);

        // 2. 응답 상태 확인: HTTP 상태 코드가 200-299가 아니면 오류 발생
        if (!response.ok) {
            // error: function () {} 에 해당
            throw new Error(`HTTP 통신 오류! 상태 코드: ${response.status}`);
        }

        // 3. JSON 데이터 파싱 (dataType: "json" 에 해당)
        const items = await response.json(); // items = response 에 해당

        // 4. 성공 로직 실행 (success: function (response) {} 에 해당)

        // 드롭다운 초기화 (선택 사항: 기존 항목을 비우고 시작하려면 추가)
        // $("#sel_dropDownItem").empty(); 

        const v_key = 'value';
        const t_key = 'text';

        items.forEach(item => {
            // 비어 있는 항목은 제외하거나 필요에 따라 처리
            if (item[v_key] && item[t_key]) {
                // 기존 jQuery .append() 로직 유지
                $("#sel_dropDownItem").append(
                    $("<option>", {
                        value: item[v_key],
                        text: item[t_key]
                    })
                );
            }
        });

        // 값 설정 로직 (success 블록 마지막 부분)
        $("#sel_dropDownItem").val(g_value);

        // complete: function () {} 로직이 있다면 여기에 추가
        // console.log("데이터 로딩 완료!");

    } catch (error) {
        // 5. 오류 처리 (error: function () {} 에 해당)
        // 네트워크 오류 또는 HTTP 오류 발생 시
        console.error("데이터 로딩 실패:", error);
        alert("데이터 로딩 실패: " + error.message);

    } finally {
        // complete: function () {} 의 로직은 일반적으로 finally 블록에 넣을 수 있습니다.
        // 다만 async/await 구조에서는 성공/실패와 관계없이 실행되므로, 
        // 기존 complete의 목적에 따라 try/catch 외부에 두어도 무방합니다.
    }
}
function columnsDropDownItemEditor(container, options) {

    var Grid_Items_6 = Left(getObjects(p_columns, 'field', options.field)[0]["Grid_Items"], 6);

    if (options.model[options.field] == null || options.model[options.field] == '' || options.model[options.field][0] == undefined) {
        var p_default = '';
    } else {
        var p_default = options.model[options.field][0].value;
    }

    var addUrl = "";
    if (getObjects(p_columns, "field", options.field)[0].editor.toString().split("(")[0].split("function ")[1] == "columnsDropDownItemEditor") {
        addUrl = "&blank=Y";
    }
    list_grid_items_url = "list_grid_items.php?RealPid=" + document.getElementById("RealPid").value
        + "&allFilter=" + $('textarea#allFilter')[0].innerHTML
        + "&MisJoinPid=" + document.getElementById("MisJoinPid").value
        + "&parent_gubun=" + document.getElementById("parent_gubun").value
        + "&parent_idx=" + document.getElementById("parent_idx").value
        + "&idx=" + getIdx_gridRowTr($(event.srcElement).closest('tr'))
        + "&ActionFlag=list_grid_items"
        + "&aliasName=" + options.field + addUrl;
    var p_dataSource = {
        //type: "odata",
        serverFiltering: true,
        transport: {
            read: list_grid_items_url
        }
    };
    //드롭다운아이템 에서는 group 속성 지원 안하기로함. 드롭다운리스트에서는 지원함.
    pc_mobile = getObjects(p_columns_1D, 'field', getNextKey_key(options.model.fields, options.field))[0]['Grid_Schema_Validation'];
    if ((isMobile() == true || getUrlParameter('parent_ActionFlag') == 'modify') && pc_mobile != 'pc' || pc_mobile == 'mobile') {
        //드롭다운아이템에서의 네이티브피커 로직
        g_idx = getIdx_gridRowTr($(event.target).closest('tr'));
        dataValueField = options.field;
        g_value = getGridCellValue_idx(g_idx, dataValueField);
        var obj = $(`<select id="sel_dropDownItem" name="sel_dropDownItem" data-value-field="value" data-text-field="text" data-bind="value:`
            + options.field + `" title="` + p_default + `" onchange="sel_dropDownItem_change(this);" style="width: calc(100% - 7px); padding: 5px 4px;">
                <option value="">선택하세요</option></select>
                `)
            .appendTo(container)
            .one("mouseenter", function (e) {
                $("#options_" + options.field).attr("oldValue", g_value);

                $.ajax({
                    url: list_grid_items_url,
                    dataType: "json",
                    success: function (response) {
                        const items = response;
                        items.forEach(item => {
                            // 비어 있는 항목은 제외하거나 필요에 따라 처리
                            v_key = 'value';
                            t_key = 'text';
                            if (item[v_key] && item[t_key]) {
                                $("#sel_dropDownItem").append(
                                    $("<option>", {
                                        value: item[v_key],
                                        text: item[t_key]
                                    })
                                );
                            }
                        });
                        $("#sel_dropDownItem").val(g_value);

                    },
                    complete: function () {
                    },
                    error: function () {
                        alert("데이터 로딩 실패");
                    }
                });

                //loadDropdownItems(list_grid_items_url);

            });
        $('#sel_dropDownItem').mouseenter();
    } else {

        var obj = $('<input id="sel_dropDownItem" name="sel_dropDownItem" data-value-field="value" data-text-field="text" data-bind="value:' + options.field + '" title="' + p_default + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataTextField: "text",
                dataValueField: "value",
                dataValue: options.field,
                autoBind: iif(Grid_Items_6 == 'select', true, false),
                filter: 'contains',
                dataSource: p_dataSource,
                open: function (e) {
                    $('body').attr('dropdown', 'on');
                    e.sender.element.attr('initvalue', e.sender.value());
                    //e.sender.element.parent().children()[0].innerText = e.sender.element[0].title;
                    //e.sender.element.data('kendoDropDownList').value(e.sender.element[0].title);    //경우에 따라 작동됨.
                },
                close: function (e) {
                    $('body').attr('dropdown', 'off');
                },
                change: function (e) {
                    setTimeout(function (p_e, p_this) {

                        var selIdx = getIdx_gridRowTr(p_this.element.closest("tr"));
                        if (selIdx == undefined) return false;

                        var selData = e.sender.dataSource._pristineData[0];
                        if (selData == undefined) {
                            dirtyClear();
                            x.stop;
                        }

                        if (e.sender.element.data("kendoDropDownList")) t0 = e.sender.element.attr('initvalue');
                        else t0 = "";

                        t1 = p_this.element.parent().find('span.k-input').text();
                        if (t1 == null) t1 = "";

                        var selKey = replaceAll(p_this.element.attr("data-bind"), "value:", "");
                        updateList["_up_field"] = selKey;
                        updateList["_up_fieldValue"] = Trim(p_this.value().split('|')[0]);
                        updateList["_up_key"] = key_aliasName;
                        updateList["_up_fieldOldValue"] = "@@fail";

                        p_e.sender.element[0].title = p_e.sender.element.data('kendoDropDownList').value();
                        //if(selKey=='Grid_ListEdit') debugger;

                        if (p_columns[1].field == undefined) {
                            updateList["_up_autoincrement_key"] = p_columns[2].field;
                            updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][p_columns[2].field];
                        } else {
                            updateList["_up_autoincrement_key"] = p_columns[1].field;
                            updateList["_up_autoincrement_keyValue"] = $('#grid').data('kendoGrid')._data[getGridRowIndex_gridRowTr(e.sender.element.closest('tr'))][p_columns[1].field];
                        }

                        if (t0 != t1) {
                            setGridCellValue_idx(selIdx, updateList["_up_field"], t1);
                            $('#grid').data('kendoGrid').saveChanges();
                            setGridCellValue_idx(selIdx, updateList["_up_field"], t1);      //한번 더해야 확실해짐.
                        } else {
                            document.getElementById("stopUpdate").value = "Y";
                            $('#grid').data('kendoGrid').saveChanges();
                            document.getElementById("stopUpdate").value = "";
                        }
                    }, 0, e, this);

                }
            });
        setTimeout(function (p_obj) {
            p_obj.click();
        }, 0, obj);
    }

}



function columnsAutoComplete_onFiltering(e) {

    if (event) {
        if (event.keyCode == 27) {
            e.sender.element.val(e.sender.oldText);
            e.sender.element.blur();
        }
    }   //esc키 누르면 에러발생시켜야 입력값이 안사라짐. 더좋은 방법이 없음.
    //e.sender.dataSource.transport.options.read.data.selValue = e.sender.element.val();
}
function columnsAutoComplete_onDataBound(e) {

    if (e.sender._prev == "") return false;
    $("div.k-list-container.k-popup.k-group.k-reset div.k-list-scroller ul.k-list li").each(function () {
        this.innerHTML = replaceAll(this.innerHTML, e.sender._prev, "<font color=red>" + e.sender._prev + "</font>");
    });
}




//컨트롤 안누르고 정렬 누르면 새정렬 시키는 기능.
function onSorting_ChkOnlySum(arg) {

    //$('#grid').data('kendoGrid').dataSource.transport.options.read.data.recently = "";

    //if(InStr($("a#btn_recently").attr("class"),"k-state-active")>0) $("a#btn_recently").click();

    _sort = $('#grid').data('kendoGrid').dataSource._sort;
    if (_sort.length > 0) {
        if (_sort[0].field == key_aliasName && _sort[0].dir == "desc") {
            if ($('a#btn_recently').hasClass('k-state-active') == false) {
                $('a#btn_recently').addClass('k-state-active');
            }
        } else {
            if ($('a#btn_recently').hasClass('k-state-active') == true) {
                $('a#btn_recently').removeClass('k-state-active');
            }
        }
    } else {
        if ($('a#btn_recently').hasClass('k-state-active') == true) {
            $('a#btn_recently').removeClass('k-state-active');
        }
    }


    var event_ctrlKey = false;
    if (event) {
        if (event.ctrlKey) event_ctrlKey = true;
    }

    if (!event_ctrlKey) {
        setTimeout(function () {
            $('#grid').data('kendoGrid').dataSource.sort({ field: arg.sort.field, dir: arg.sort.dir });


            if ($('input#chartKey').data('kendoDropDownList')) {
                if ($('input#chartKey').data('kendoDropDownList').value() != "") {
                    $('input#chartKey').data('kendoDropDownList').value(arg.sort.field);
                }
            }


            _sort = $('#grid').data('kendoGrid').dataSource._sort;
            if (_sort.length > 0) {
                if (_sort[0].field == key_aliasName && _sort[0].dir == "desc") {
                    if ($('a#btn_recently').hasClass('k-state-active') == false) {
                        $('a#btn_recently').addClass('k-state-active');
                    }
                } else {
                    if ($('a#btn_recently').hasClass('k-state-active') == true) {
                        $('a#btn_recently').removeClass('k-state-active');
                    }
                }
            } else {
                if ($('a#btn_recently').hasClass('k-state-active') == true) {
                    $('a#btn_recently').removeClass('k-state-active');
                }
            }
            if (document.getElementById('ChkOnlySum').value == '2') {
                setTimeout(function () {
                    $('div#grid tr.k-state-selected').removeClass('k-state-selected');  //다중선택 불필요.
                }, 500);
            }
        }, 0);
        if (event.currentTarget.tagName == 'TH') x.stop;     //억지로 에러내야 json 을 또부르는 비효율을 막을 수 있다.
    } else if (document.getElementById('ChkOnlySum').value == '2') {
        setTimeout(function () {
            $('div#grid tr.k-state-selected').removeClass('k-state-selected');
        }, 500);
    }

}
//컨트롤 안누르고 정렬 누르면 새정렬 시키는 기능.
function onSorting(arg) {

    $('#grid').data('kendoGrid').dataSource.transport.options.read.data.recently = "";

    if (InStr($("a#btn_recently").attr("class"), "k-state-active") > 0) $("a#btn_recently").click();

    var event_ctrlKey = false;
    if (event) {
        if (event.ctrlKey) event_ctrlKey = true;
    }

    if (!event_ctrlKey) {
        setTimeout(function () {
            if ($('input#chartKey').data('kendoDropDownList')) {
                if ($('input#chartKey').data('kendoDropDownList').value() != "") {
                    $('input#chartKey').data('kendoDropDownList').value(arg.sort.field);
                }
            }
            $('#grid').data('kendoGrid').dataSource.sort({ field: arg.sort.field, dir: arg.sort.dir });

            if (document.getElementById('ChkOnlySum').value == '2') {
                setTimeout(function () {
                    $('div#grid tr.k-state-selected').removeClass('k-state-selected');  //다중선택 불필요.
                }, 500);
            }

        }, 0);
        if (event.currentTarget.tagName == 'TH') x.stop;     //억지로 에러내야 json 을 또부르는 비효율을 막을 수 있다.
    } else if (document.getElementById('ChkOnlySum').value == '2') {
        setTimeout(function () {
            $('div#grid tr.k-state-selected').removeClass('k-state-selected');
        }, 500);
    }

}





var onToggles = 'off';
function onToggle(e) {
    setTimeout(function () {
        onToggles = 'off';
    }, 100);
    if (onToggles == 'on') {
        setTimeout(function () {
            console.log($("body").attr("screenName"));
        }, 100);
        return false;
    }
    //console.log('onToggle 진행'+$("body").attr("screenName"));
    onToggles = 'on';
    if (e.id == "btn_mMenu") {
        mobile_line();
        if (e.checked) {
            $("div#panelbar-left").css("display", "block");
        } else {
            $("div#panelbar-left").css("display", "none");
        }

        $(window).resize();
    }

    if (e.id == "btn_mConfig") {
        $("span.tc-activator.k-content").click();
    }



    if (e.id == "btn_fullScreen") {
        toggleFullScreen(e.checked);
        if (!e.checked) {
            $('a#btn_fullScreen').removeClass('k-toolbar-first-visible');
            $('a#btn_fullScreen').removeClass('k-state-active');
            $('a#btn_fullScreen').attr('aria-pressed', 'false');

            $("body").attr("screenName", "normalScreen");
            $("nav#js-tlrk-nav").css("display", "block");
            setTimeout(function () {
                if (typeof top.window_resize == 'function') {
                    top.window_resize();
                }
            }, 100);
            setTimeout(function () {
                if (typeof top.window_resize == 'function') {
                    top.window_resize();
                }
            }, 400);
        } else {
            $('a#btn_fullScreen').addClass('k-toolbar-first-visible');
            $('a#btn_fullScreen').addClass('k-state-active');
            $('a#btn_fullScreen').attr('aria-pressed', 'true');

            $("body").attr("screenName", "fullScreen");
            $("nav#js-tlrk-nav").css("display", "none");
        }


    }

    if (e.id == "btn_recently") {

        if (document.getElementById('ChkOnlySum').value == "1") {

            _sort = $('#grid').data('kendoGrid').dataSource._sort;
            if (_sort == undefined) _sort = [];

            if (e.checked) {
                for (i = _sort.length - 1; i >= 0; i--) {
                    if (_sort[i].field == key_aliasName) _sort.splice(i, 1);
                }
                _sort.unshift({ field: key_aliasName, dir: "desc" });
            } else {
                if (_sort.length > 0) {
                    if (_sort[0].field == key_aliasName) _sort.shift();
                }
            }
            if (_sort.length == 0) {
                _sort.push({ field: key_aliasName, dir: "asc" });
            }
            $('#grid').data('kendoGrid').dataSource.sort(_sort);
        } else {
            if (e.checked) {
                $('#grid').data('kendoGrid').dataSource.transport.options.read.data.recently = "Y";
            } else {
                $('#grid').data('kendoGrid').dataSource.transport.options.read.data.recently = "";
            }
            $('#grid').data('kendoGrid').dataSource.read();
        }
        if (e.checked) document.getElementById("Anti_SortWrite").value = 'N';
        else document.getElementById("Anti_SortWrite").value = 'Y';

        $("a#btn_recently").blur();
    }

    if (e.id == "btn_view") {
        setCookie('modify_YN', 'N');
        if ($("#grid tbody tr.k-state-selected").length == 0) {
            $('a#btn_down').click();
        } else {
            $($($("#grid tbody tr.k-state-selected")[0]).find('td[comment="Y"]')[0]).keyup();
        }
    } else if (e.id == "btn_modify") {
        setCookie('modify_YN', 'Y');
        if ($("#grid tbody tr.k-state-selected").length == 0) {
            $('a#btn_down').click();
        } else {
            $($($("#grid tbody tr.k-state-selected")[0]).find('td[comment="Y"]')[0]).keyup();
        }
    }


}







function rowFunction(p_this) {

    if (typeof rowFunction_UserDefine == "function" && getUrlParameter('helpbox') == undefined) {
        if (p_this._scanningYN != 'Y') {
            rowFunction_UserDefine(p_this);
            p_this._scanningYN = 'Y';
        }
    }
}




function saveCheckbox(p_this) {
    if (p_this.checked) p_this.value = "Y";
    else p_this.value = "N";

    p_idx = p_this.id.split("__idx")[1];
    p_aliasName = p_this.id.split("__idx")[0];

    var url = "info.php?flag=textUpdate&RealPid=" + document.getElementById("RealPid").value + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&parent_idx=" + document.getElementById("parent_idx").value
        + "&pre=" + document.getElementById("pre").value
        + "&addParam=" + document.getElementById("addParam").value;

    if (p_idx == 'null') {
        if (getColumnProperty_aliasName(p_aliasName, "Grid_Schema_Type") == "boolean") {
            var paramJson = { keyAlias: p_columns_1D[1].field, keyValue: $(p_this).closest("tr").find('td[keyidx]').next().text(), thisValue: iif(p_this.value == "Y", 1, 0), oldText: iif(p_this.value == "Y", "0", "1"), thisAlias: p_aliasName };
        } else {
            var paramJson = { keyAlias: p_columns_1D[1].field, keyValue: $(p_this).closest("tr").find('td[keyidx]').next().text(), thisValue: p_this.value, oldText: iif(p_this.value == "Y", "N", "Y"), thisAlias: p_aliasName };
        }
    } else {
        if (getColumnProperty_aliasName(p_aliasName, "Grid_Schema_Type") == "boolean") {
            var paramJson = { keyAlias: key_aliasName, keyValue: p_idx, thisValue: iif(p_this.value == "Y", 1, 0), oldText: iif(p_this.value == "Y", "0", "1"), thisAlias: p_aliasName };
        } else {
            var paramJson = { keyAlias: key_aliasName, keyValue: p_idx, thisValue: p_this.value, oldText: iif(p_this.value == "Y", "N", "Y"), thisAlias: p_aliasName };
        }
    }
    $.post(url, paramJson,
        function (result) {
            dirtyClear();
            //debugger;
            if (result.resultCode == 'fail') {
                toastr.error(getTitle_aliasName(result.thisAlias) + "::: " + result.thisValue + "<br>로 저장이 실패되었습니다 - " + result.resultMessage, "", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
            } else {
                toastr.success(getTitle_aliasName(result.thisAlias) + ": " + result.thisValue + "<br>로 저장이 완료되었습니다", "", { progressBar: true, timeOut: 5000, positionClass: "toast-bottom-right" });
            }
            if (result.__devQuery_url && isMobile() == false) {
                toastr.info('<a href="javascript:;" onclick="query_popup(\'' + result.__devQuery_url + '\');">쿼리를 보시려면, 여기를 클릭하세요.</a>', '', { timeOut: 7000 });
            }
            if (result.afterScript != "") eval(result.afterScript);

        }
    ).done(function () {
        //alert( "second success" );
    })
        .fail(function () {
            //alert( "error" );
        })
        .always(function () {
            //alert( "finished" );
        });


    //p_idx, p_aliasName, p_this.value);
}


function delete_list(deleteList) {


    if (getFieldAttr(document.getElementById("key_aliasName").value, "format") == "{0:yyyy-MM-dd}") {
        for (i = 0; i < deleteList.length; i++) {
            deleteList[i] = date10(deleteList[i]);
        }
    }
    $('td[keyidx] input.k-checkbox[disabled]:checked').each(function () {
        var delete_index = deleteList.indexOf($(this).closest("td").attr("keyidx"));
        if (delete_index > -1) deleteList.splice(delete_index, 1);
    });
    if (deleteList.length == 0) {
        toastr.warning("삭제할 내역이 없습니다.", "체크결과", { timeOut: 2000, positionClass: "toast-bottom-right" });
        return false;
    }

    //var idxName = getTitle_aliasName(key_aliasName);
    //if(!confirm(idxName + " : " + JSON.stringify(deleteList) + " 를 삭제하시겠습니까?")) return false;
    g_idx = deleteList[0];
    if ($(getCellObj_idx(g_idx, 'idx').closest('tr')).next().length == 0) {
        alert("삭제할 수 없습니다. 마지막 행입니다.");
        return false;
    }
    var rowIndex = getGridRowIndex_idx(deleteList[0]) + 1
    if (!confirm("No." + rowIndex + " 를 삭제하시겠습니까?")) return false;

    $.ajax({
        method: "POST",
        dataType: "text",
        url: "save.php",
        data: {
            deleteList: JSON.stringify(deleteList), key_aliasName: key_aliasName
            , ActionFlag: "delete", RealPid: document.getElementById("RealPid").value
            , MisJoinPid: document.getElementById("MisJoinPid").value
            , parent_idx: document.getElementById('parent_idx').value
        }
    })
        .done(function (result) {
            $("#grid thead input.k-checkbox").click();
            if ($("#grid thead input.k-checkbox")[0].checked) $("#grid thead input.k-checkbox").click();
            if (typeof parent.toastr == "object") toastr_obj = parent.toastr; else toastr_obj = toastr;
            if (JSON.parse(result).resultCode == 'fail') {
                toastr_obj.error(JSON.parse(result).resultMessage, "처리결과", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
            } else {
                toastr_obj.success(JSON.parse(result).resultMessage, "처리결과", { timeOut: 2000, positionClass: "toast-bottom-right" });
            }
            if (isMainFrame()) {
                $("a#btn_reload").click();
            } else {
                $("a#btn_close").click();
                if (parent.$("a#btn_reload")[0]) parent.$("a#btn_reload").click();
            }
        })
        .fail(function () {
            console.log("save error");
        });
}

function toolbar_onClick(e) {
    var grid = $('#grid').data('kendoGrid');

    if (e.id == "btn_urlCopy") {
        url = status_url();
        url = encodeURI(url);
        $.ajax({
            url: './shorten.php',       // 요청을 처리할 서버측 스크립트
            type: 'POST',
            dataType: 'text',         // 반환값을 텍스트로 처리
            data: {
                long_url: url,
            },
            success: function (response) {
                copyStringToClipboard(response);
                if (typeof parent.toastr == "object") {
                    toastr_obj = parent.toastr;
                } else {
                    toastr_obj = toastr;
                }
                toastr_obj.success("현재 상태의 URL 주소가 복사되었습니다.", "처리결과", { timeOut: 2000, positionClass: "toast-bottom-right" });

            },
            error: function (xhr, status, error) {
                console.error("에러 발생:", error);
            }
        });

    } else if (e.id == "btn_recentlyU") {
        onSorting({ sort: { field: "lastupdate", dir: "desc" } });
    } else if (e.id == "btn_alim") {
        setTimeout(function () { pushAlim(); });
    } else if (e.id == "btn_excel") {
        setTimeout(function () {
            displayLoading_long();
        }, 100);
        grid.dataSource.options.transport.read.data.app = "saveAsExcel";
        grid.dataSource.options.transport.read.data.allFilter = grid.dataSource.transport.options.read.data.allFilter;
        grid.saveAsExcel();
        grid.dataSource.options.transport.read.data.app = "";
        setTimeout(function () {
            displayLoadingOff();
        }, 2000);

    } else if (e.id == "btn_xls") {
        setTimeout(function () {
            displayLoading_long();
        }, 100);
        grid.dataSource.transport.options.read.data.app = "saveAsXls";
        grid.dataSource.read();
        grid.dataSource.transport.options.read.data.app = "";
        setTimeout(function () {
            displayLoadingOff();
        }, 2000);

    } else if (e.id == "btn_reopen") {
        if (isMainFrame()) {
            go_mis_gubun(document.getElementById("gubun").value, status_url());
        } else {
            go_mis_gubun(document.getElementById("gubun").value, location.href);     //목록에 대한 다시열기의 경우, 디테일에서는 필더까지 감안할 필요는 없음.
        }
    } else if (e.id == "btn_goHome") {
        parent.location.href = location.href.split('?')[0];
    } else if (e.id == "btn_close") {
        if (!window.frameElement) return false;
        if (window.frameElement.id == "grid_bottom") {
            var splitter = parent.$("#vertical").data("kendoSplitter");
            var size = splitter.size(".k-pane:first");
            if (size != "100%") {
                parent.setCookie('lastSize_bottom', size, 1000);
                splitter.size(".k-pane:first", "100%");
            }
        } else if (window.frameElement.id == "grid_right") {
            var splitter = parent.$("#horizontal").data("kendoSplitter");
            var size = splitter.size(".k-pane:first");
            if (size != "100%") {
                parent.setCookie('lastSize_right', size, 1000);
                splitter.size(".k-pane:first", "100%");
            }
        } else {
            //팝업닫기!!!
            if (parent.$(".k-widget.k-window.k-dialog a.k-dialog-close").length == 1) {
                parent.$("a#btn_reload").click();
                parent.$(".k-widget.k-window.k-dialog a.k-dialog-close").click();
                parent.$(".k-widget.k-window.k-dialog a.k-dialog-close").closest('.k-widget.k-window').remove();
            } else if (window.frameElement.id != '') {
                if (parent.$("div#" + replaceAll(window.frameElement.id, "ifr_", "") + "[data-role=window]").data("kendoWindow")) {
                    parent.$("div#" + replaceAll(window.frameElement.id, "ifr_", "") + "[data-role=window]").data("kendoWindow").close();
                    parent.$("div#" + replaceAll(window.frameElement.id, "ifr_", "") + "[data-role=window]").closest('.k-widget.k-window').remove();
                }
            } else if ($('body[topsite="notmis"]')[0]) {
                $('#grid').data('kendoGrid').dataSource.read();
            }
        }
    } else if (e.id == "btn_webSourceOpen") {
        url = location.href.split('?')[0] + "?RealPid=speedmis000266&idx=" + document.getElementById("logicPid").value + "&tabname=" + encodeURI("상세내역");
        if (document.getElementById("logicPid").value != document.getElementById("RealPid").value) {
            if (confirm('Mis Join 으로된 프로그램입니다. \n기본정보를 조회/수정하시려면 [확인](메뉴관리로 이동)을,\n웹소스로 이동하시려면 [취소]를 선택하세요!')) {
                url = location.href.split('?')[0] + "?RealPid=speedmis000314&idx=" + document.getElementById("gubun").value;
            }
        }
        window.open(url);
    } else if (e.id == "btn_designer") {
        url = "addLogic_treat.php?RealPid=speedmis000314&question=pid_name&v=" + document.getElementById('logicPid').value;
        pid_name = ajax_url_return(url);
        url = location.href.split('?')[0] + '?RealPid=speedmis001333&isAddURL=Y&allFilter=[{"operator":"eq","value":"' + document.getElementById('logicPid').value + ':' + shortUrl_replace(pid_name) + '","field":"toolbar_zpeurogeuraemseontaek"},{"operator":"eq","value":"Y","field":"toolbar_znaeyongnochuryeobu"}]';
        window.open(url);
    } else if (e.id == "btn_addMenu") {
        if ($('div#example-nav').data('kendoTreeView').dataItem($('div#example-nav span.k-state-selected.k-in'))) {
            var gubun = $('div#example-nav').data('kendoTreeView').dataItem($('div#example-nav span.k-state-selected.k-in')).id;
            var pname = $('div#example-nav').data('kendoTreeView').dataItem($('div#example-nav span.k-state-selected.k-in')).text;
        } else {
            var gubun = getUrlParameter('gubun');
            var pname = document.getElementById('MenuName').value;
        }
        url = location.href.split('?')[0] + '?RealPid=speedmis001170&idx=' + gubun + '&ActionFlag=write';
        parent_popup_jquery(url, pname + ' 에 대한 ', 850, 600);
    } else if (e.id == "btn_newopen") {
        if (document.getElementById("MenuType").value == "13") {
            window.open(document.getElementById("AddURL").value);
        } else {
            window.open(replaceAll(replaceAll(location.href.split("#")[0], "&isMenuIn=Y", ""), "?isMenuIn=Y&", "?"));
        }
    } else if (e.id == "btn_listprint") {
        printGrid();
    } else if (e.id == "btn_listedit") {
        if ($('body').attr('psize') == '0') {
            if ($('div#grid').data('kendoGrid').dataSource._skip > 0) {
                alert("무한스크롤에서는 1페이지 일때만 일괄편집창 사용이 가능합니다. 1페이지로 이동후 사용하시거나 페이지당 갯수로 바꾸세요!");
                return false;
            }
        }
        parent_popup_jquery("list_edit.php?windowID=" + windowID() + "&up_windowID=" + parent.windowID() + "&RealPid=" + document.getElementById("RealPid").value + "&parent_idx=" + iif(getUrlParameter("parent_idx"), getUrlParameter("parent_idx"), "") + "&MisJoinPid=" + document.getElementById("MisJoinPid").value + "&key_aliasName=" + document.getElementById("key_aliasName").value);
    } else if (e.id == "btn_chart") {
        if ($('iframe#grid_right')[0]) {
            creatChartArea();
        }

        if ($('input#chartKey').val() == "") {
            var kk = json_length($('#grid').data('kendoGrid').dataSource._sortFields);
            var default_chartKey = '';
            for (ii = 0; ii < kk; ii++) {
                uu = jsonFromIndex($('#grid').data('kendoGrid').dataSource._sortFields, ii).key;
                if (isNumeric(getColumnAttr_aliasName(uu, 'width'))) {
                    if (getColumnAttr_aliasName(uu, 'width') * getColumnAttr_aliasName(uu, 'width') > 1) {
                        default_chartKey = uu;
                        break;
                    }
                }
            }
            if (default_chartKey == "") {
                if (p_columns[2].hidden != false && p_columns[2].width * p_columns[2].width > 1) default_chartKey = p_columns[2].field;
                else if (p_columns[3].hidden != false && p_columns[3].width * p_columns[3].width > 1) default_chartKey = p_columns[3].field;
                else if (p_columns[4].hidden != false && p_columns[4].width * p_columns[4].width > 1) default_chartKey = p_columns[4].field;
                else if (p_columns[5].hidden != false && p_columns[5].width * p_columns[5].width > 1) default_chartKey = p_columns[5].field;
                else if (p_columns[1].hidden != false && p_columns[1].width * p_columns[1].width > 1) default_chartKey = p_columns[1].field;
            }
            $('input#chartKey').val(default_chartKey);
        }
        $('#grid').data('kendoGrid').dataSource.read();
    } else if (e.id == "btn_ChkOnlySum1") {
        url = replaceAll(replaceAll(replaceAll(replaceAll(status_url(), "&ChkOnlySum=1", ""), "?ChkOnlySum=1&", "?"), "&ChkOnlySum=2", ""), "?ChkOnlySum=2&", "?") + "&ChkOnlySum=1";
        go_mis_gubun(document.getElementById("gubun").value, url);
    } else if (e.id == "btn_ChkOnlySum2") {
        url = replaceAll(replaceAll(replaceAll(replaceAll(status_url(), "&ChkOnlySum=1", ""), "?ChkOnlySum=1&", "?"), "&ChkOnlySum=2", ""), "?ChkOnlySum=2&", "?") + "&ChkOnlySum=2";
        go_mis_gubun(document.getElementById("gubun").value, url);
    } else if (e.id == "btn_ChkOnlySum_end") {
        url = replaceAll(replaceAll(replaceAll(replaceAll(status_url(), "&ChkOnlySum=1", ""), "?ChkOnlySum=1&", "?"), "&ChkOnlySum=2", ""), "?ChkOnlySum=2&", "?");
        go_mis_gubun(document.getElementById("gubun").value, url);
    } else if (e.id == "btn_devQueryOn") {
        devQueryOn();
    } else if (e.id == "btn_devQueryOff") {
        devQueryOff();
    } else if (e.id == "btn_opinion") {
        sendMsg_opinion();
    } else if (e.id == "btn_logout") {
        if (confirm(document.getElementById("MisSession_UserName").value + " 님, 로그아웃을 하시겠습니까?")) location.href = "logout.php";
    } else if (e.id == "btn_menuName") {
        if (document.getElementById("MenuType").value == "13") {
            $("div#main")[0].innerHTML = "<iframe src='" + document.getElementById("AddURL").value + "' js='list_top.js' frameborder='0' width='100%' height='100%'></iframe>";
        }
    } else if (e.id == "btn_reload") {
        if (document.getElementById('ChkOnlySum').value == "1") {
            fun_serverFiltering(true);
            grid.dataSource.read();
            fun_serverFiltering(false);
        } else {
            grid.dataSource.read();
        }

    } else if (e.id == "btn_backup") {
        $('#grid').data('kendoGrid').dataSource.transport.options.read.data.backup = "Y";
        grid.dataSource.read();
        $('#grid').data('kendoGrid').dataSource.transport.options.read.data.backup = "";
    } else if (e.id == "btn_backupList") {
        var url = location.href.split('?')[0] + '?RealPid=speedmis000982&allFilter=[{"operator":"contains","value":"' + document.getElementById("MenuName").value + '","field":"table_RealPidQnMenuName"}';
        if (document.getElementById("parent_idx").value != "") url = url + ',{"operator":"contains","value":"' + document.getElementById("parent_idx").value + '","field":"parent_idx"}';
        url = url + ']&isAddURL=Y';
        parent_popup_jquery(url, '백업내역');
    } else if (e.id == "btn_backupBye") {
        location.href = location.href.split('?')[0] + "?gubun=" + document.getElementById("gubun").value
            + iif(document.getElementById("parent_gubun").value != "", "&parent_gubun=" + document.getElementById("parent_gubun").value, "")
            + iif(document.getElementById("parent_idx").value != "", "&parent_idx=" + document.getElementById("parent_idx").value, "")
            + iif(document.getElementById("isMenuIn").value == "Y", "&isMenuIn=Y", "")
            + iif(document.getElementById("pre").value == "1", "&pre=1", "");
    } else if (e.id == "btn_editHelp") {
        var url = location.href.split('?')[0] + '?RealPid=speedmis001067&ActionFlag=modify&tabid=help_title&idx=' + document.getElementById("gubun").value;
        parent_popup_jquery(url);
    } else if (e.id == "btn_up") {
        btn_up_click();
    } else if (e.id == "btn_down") {
        btn_down_click();
    } else if (e.id == "btn_write") {
        url = location.href.split('?')[0] + "?gubun=" + document.getElementById("gubun").value + "&idx=0&ActionFlag=write"
            + iif(document.getElementById("parent_gubun").value != "", "&parent_gubun=" + document.getElementById("parent_gubun").value, "")
            + iif(document.getElementById("parent_idx").value != "", "&parent_idx=" + document.getElementById("parent_idx").value, "")
            + iif(document.getElementById("isMenuIn").value == "Y", "&isMenuIn=Y", "")
            + iif(document.getElementById("pre").value == "1", "&pre=1", "")
            + "&isAddURL=Y";

        go_mis_gubun(document.getElementById("gubun").value, url);
    } else if (e.id == "btn_delete") {
        var deleteList = $('#grid').data('kendoGrid').selectedKeyNames();
        if (getFieldAttr(document.getElementById("key_aliasName").value, "format") == "{0:yyyy-MM-dd}") {
            for (i = 0; i < deleteList.length; i++) {
                deleteList[i] = date10(deleteList[i]);
            }
        }
        $('td[keyidx] input.k-checkbox[disabled]:checked').each(function () {
            var delete_index = deleteList.indexOf($(this).closest("td").attr("keyidx"));
            if (delete_index > -1) deleteList.splice(delete_index, 1);
        });
        if (deleteList.length == 0) {
            toastr.warning("삭제할 내역이 없습니다.", "체크결과", { timeOut: 2000, positionClass: "toast-bottom-right" });
            return false;
        }
        var idxName = getTitle_aliasName(key_aliasName);
        if (!confirm(idxName + " : " + JSON.stringify(deleteList) + " 를 삭제하시겠습니까?")) return false;

        $.ajax({
            method: "POST",
            dataType: "text",
            url: "save.php",
            data: {
                deleteList: JSON.stringify(deleteList), key_aliasName: key_aliasName
                , ActionFlag: "delete", RealPid: document.getElementById("RealPid").value
                , MisJoinPid: document.getElementById("MisJoinPid").value
                , parent_idx: document.getElementById('parent_idx').value
            }
        })
            .done(function (result) {
                $("#grid thead input.k-checkbox").click();
                if ($("#grid thead input.k-checkbox")[0].checked) $("#grid thead input.k-checkbox").click();
                if (typeof parent.toastr == "object") toastr_obj = parent.toastr; else toastr_obj = toastr;

                if (isJsonString(result) == false) {
                    try {
                        eval(result);
                    } catch (error) {
                        alert(result);
                    }
                    return false;
                }

                if (JSON.parse(result).resultCode == 'fail') {
                    toastr_obj.error(JSON.parse(result).resultMessage, "처리결과", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
                } else {
                    toastr_obj.success(JSON.parse(result).resultMessage, "처리결과", { timeOut: 2000, positionClass: "toast-bottom-right" });
                }
                if (isMainFrame()) {
                    $("a#btn_reload").click();
                } else {
                    $("a#btn_close").click();
                    if (parent.$("a#btn_reload")[0]) parent.$("a#btn_reload").click();
                }
            })
            .fail(function () {
                console.log("save error");
            });

    } else if (e.id == "btn_deleteList") {
        //url = location.href.split('?')[0]+"?gubun="+document.getElementById("gubun").value+"&isDeleteList=Y"+iif(document.getElementById("isMenuIn").value=="Y","&isMenuIn=Y","");
        //if(document.getElementById("parent_gubun").value!="") url = url + "&parent_gubun="+document.getElementById("parent_gubun").value;
        //if(document.getElementById("parent_idx").value!="") url = url + "&parent_idx="+document.getElementById("parent_idx").value;
        url = location.href + "&isDeleteList=Y";


        go_mis_gubun(document.getElementById("gubun").value, url);
    } else if (e.id == "btn_normalList") {
        //url = location.href.split('?')[0]+"?gubun="+document.getElementById("gubun").value+iif(document.getElementById("isMenuIn").value=="Y","&isMenuIn=Y","");
        //if(document.getElementById("parent_gubun").value!="") url = url + "&parent_gubun="+document.getElementById("parent_gubun").value;
        //if(document.getElementById("parent_idx").value!="") url = url + "&parent_idx="+document.getElementById("parent_idx").value;
        url = replaceAll(location.href, "&isDeleteList=Y", "");

        go_mis_gubun(document.getElementById("gubun").value, url);
    } else if (e.id == "btn_restore") {

        var deleteList = $('#grid').data('kendoGrid').selectedKeyNames();
        if (deleteList.length == 0) {
            toastr.warning("복원할 내역이 없습니다.", "체크결과", { timeOut: 2000, positionClass: "toast-bottom-right" });
            return false;
        }
        var idxName = getTitle_aliasName(key_aliasName);
        if (!confirm(idxName + " : " + JSON.stringify(deleteList) + " 를 복원하시겠습니까?")) return false;

        $.ajax({
            method: "POST",
            url: "save.php",
            data: {
                deleteList: JSON.stringify(deleteList), key_aliasName: key_aliasName
                , ActionFlag: "restore", RealPid: document.getElementById("RealPid").value
                , MisJoinPid: document.getElementById("MisJoinPid").value
                , parent_idx: document.getElementById('parent_idx').value
            }
        })
            .done(function (result) {

                $("#grid thead input.k-checkbox").click();
                if ($("#grid thead input.k-checkbox")[0].checked) $("#grid thead input.k-checkbox").click();
                if (typeof parent.toastr == "object") toastr_obj = parent.toastr; else toastr_obj = toastr;
                if (JSON.parse(result).resultCode == 'fail') {
                    toastr_obj.error(JSON.parse(result).resultMessage, "처리결과", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
                } else {
                    toastr_obj.success(JSON.parse(result).resultMessage, "처리결과", { timeOut: 2000, positionClass: "toast-bottom-right" });
                }
                if (isMainFrame()) {
                    $("a#btn_reload").click();
                } else {
                    $("a#btn_close").click();
                    if (parent.$("a#btn_reload")[0]) parent.$("a#btn_reload").click();
                }
            })
            .fail(function () {
                console.log("save error");
            });

    } else if (e.id == "btn_kill") {
        var deleteList = $('#grid').data('kendoGrid').selectedKeyNames();
        if (deleteList.length == 0) {
            toastr.warning("완전삭제할 내역이 없습니다.", "체크결과", { timeOut: 2000, positionClass: "toast-bottom-right" });
            return false;
        }
        var idxName = getTitle_aliasName(key_aliasName);
        if (!confirm(idxName + " : " + JSON.stringify(deleteList) + " 를 완전삭제하시겠습니까?")) return false;

        $.ajax({
            method: "POST",
            url: "save.php",
            data: {
                deleteList: JSON.stringify(deleteList), key_aliasName: key_aliasName
                , ActionFlag: "kill", RealPid: document.getElementById("RealPid").value
                , MisJoinPid: document.getElementById("MisJoinPid").value
                , parent_idx: document.getElementById('parent_idx').value
            }
        })
            .done(function (result) {
                $("#grid thead input.k-checkbox").click();
                if ($("#grid thead input.k-checkbox")[0].checked) $("#grid thead input.k-checkbox").click();
                if (typeof parent.toastr == "object") toastr_obj = parent.toastr; else toastr_obj = toastr;
                if (JSON.parse(result).resultCode == 'fail') {
                    toastr_obj.error(JSON.parse(result).resultMessage, "처리결과", { progressBar: true, timeOut: 10000, positionClass: "toast-bottom-right" });
                } else {
                    toastr_obj.success(JSON.parse(result).resultMessage, "처리결과", { timeOut: 2000, positionClass: "toast-bottom-right" });
                }
                if (isMainFrame()) {
                    $("a#btn_reload").click();
                } else {
                    $("a#btn_close").click();
                    if (parent.$("a#btn_reload")[0]) parent.$("a#btn_reload").click();
                }
            })
            .fail(function () {
                console.log("save error");
            });

    }

}

function status_url() {
    var grid = $('#grid').data('kendoGrid');

    var url = $(location).attr('protocol') + "//" + $(location).attr('host') + "" + $(location).attr('pathname')
        + "?gubun=" + document.getElementById("gubun").value + iif(document.getElementById("isMenuIn").value == "Y", "&isMenuIn=Y", "")
        + iif(document.getElementById("parent_gubun").value != "", "&parent_gubun=" + document.getElementById("parent_gubun").value, "")
        + iif(document.getElementById("parent_idx").value != "", "&parent_idx=" + document.getElementById("parent_idx").value, "")
        + iif(getUrlParameter('treemenu') == 'Y', "&treemenu=Y", "")
        + iif(document.getElementById("pre").value == "1", "&pre=1", "");

    if ($("#grid").data("kendoGrid").dataSource._filter == undefined) var obj = { logic: "and", filters: eval($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter) };
    else var obj = $('#grid').data('kendoGrid').dataSource._filter.filters;


    if (obj.length > 0) {      //원래는 0
        url = url + "&allFilter=" + replaceAll(replaceAll(JSON.stringify(obj), '&', '@nd;'), '%', '@per;');        //합산일 경우 상단필터 관련 url 만 가져옴.
    }

    //합산 그리드일 경우임. '[';
    if ($('#grid').data('kendoGrid').dataSource.options.serverFiltering == false) {

        allFilterAll = '';
        $('div#toolbar input[data-role="dropdownlist"]').each(function () {
            allFilterCell = '{"operator":"eq","value":"@value","field":"@id"}';
            if (this.value != '') {
                allFilterAll = allFilterAll + iif(allFilterAll == '', '', ',')
                    + replaceAll(replaceAll(allFilterCell, '@value', this.value), '@id', this.id);
            }
        });
        $('div#toolbar input[data-role="multiselect"]').each(function () {
            allFilterCell = '{"operator":"doesnotendwith","value":"@value","field":"@id"}';
            if ($($('div#toolbar input[data-role="multiselect"]')[0]).data('kendoMultiSelect').value().length > 0) {

                allFilterAll = allFilterAll + iif(allFilterAll == '', '', ',')
                    + replaceAll(replaceAll(allFilterCell, '@value', $($('div#toolbar input[data-role="multiselect"]')[0]).data('kendoMultiSelect').value().join(',')), '@id', this.id);
            }
        });
        $('div#toolbar span.likeField input').each(function (i, j) {
            if (i % 2 == 0) {
                allFilterCell = '{"operator":"gte","value":"' + j.value + '","field":"' + j.id + '"}';
            } else {
                allFilterCell = '{"operator":"lte","value":"' + j.value + '","field":"' + replaceAll(j.id, '_end', '') + '"}';
            }
            allFilterAll = allFilterAll + iif(allFilterAll == '', '', ',') + allFilterCell;
        });

        //합산의 경우 $('#grid').data('kendoGrid').dataSource._filter.filters 는 서버사이드(상단 셀렉트 박스 등의 필터)만 기억함.
        //'{"operator":"eq","value":"11 Global Admin","field":"toolbar_zsangwimenyubyeolbogi"}'
        if (allFilterAll != '') {
            allFilterAll = replaceAll(replaceAll(allFilterAll, '&', '@nd;'), '%', '@per;');
        }

        if (obj.length > 0) {
            url = replaceAll(url, "&allFilter=[", "&allFilter=[" + allFilterAll + ",");
        } else {
            allFilterAll = '[' + allFilterAll + ']';
            url = url + "&allFilter=" + allFilterAll;
        }

    }


    var obj = $('#grid').data('kendoGrid').dataSource._sort;
    if (obj.length > 0) {
        var sorts = "";
        forMax = obj.length;
        for (i = 0; i < forMax; i++) {
            if (i > 0) sorts = sorts + ",";
            if (obj[i].dir == "desc") sorts = sorts + obj[i].field + " desc";
            else sorts = sorts + obj[i].field;
        }
        url = url + "&orderby=" + sorts;
    }
    if (grid.dataSource._group.length > 0) {
        var group_fields = '';
        for (j = 0; j < grid.dataSource._group.length; j++) {
            if (j == 0) group_fields = grid.dataSource._group[j].field + " " + grid.dataSource._group[j].dir;
            else group_fields = group_fields + "," + grid.dataSource._group[j].field + " " + grid.dataSource._group[j].dir;
        }
        url = url + "&group_field=" + group_fields;
    }
    if (getUrlParameter('ChkOnlySum') == '2') url = url + '&ChkOnlySum=2';
    else if ($('tr.k-footer-template').length == 1) url = url + '&ChkOnlySum=1';

    if ($('a#btn_recently').hasClass('k-state-active')) url = url + "&recently=Y";
    else url = url + "&recently=N";

    if ($('input#chartKey').val() != '' && $('input#chartKey').val() != undefined) {
        url = url + '&chartKey=' + $('input#chartKey').val() + '&chartType=' + $("#chartType")[0].value
            + '&chartOrderBy=' + $('#chartOrderBy')[0].value + '&chartTop=' + iif(getUrlParameter('chartTop'), getUrlParameter('chartTop'), 15);
        if ($('#chartNumberColumns').data('kendoMultiSelect')) {
            if ($('#chartNumberColumns').data('kendoMultiSelect').value().toString() != '') {
                url = url + '&chartNumberColumns=' + $('#chartNumberColumns').data('kendoMultiSelect').value().toString();
            }
        }
    }
    url = replaceAll(url, '[,{"', '[{"');
    if (isNumeric(getUrlParameter('psize')) == true) {
        url = url + "&psize=" + getUrlParameter('psize');
    }
    url = url + "&isAddURL=Y";
    return url;
}

function splitter_open(p_url, p_target, p_size) {
    var ctrl_key = false;
    if (event) if (event.ctrlKey) ctrl_key = true;
    if (ctrl_key) {
        window.open(p_url);
        return false;
    }
    if (p_target == undefined) p_target = getCookie('viewTarget');


    if (p_target == 'bottom') {
        obj = $("#vertical").data("kendoSplitter");

        if (p_size == undefined) p_size = getCookie('lastSize_bottom');
        if ($('iframe#grid_bottom')[0].src == p_url && obj.size(".k-pane:first") != '100%') {
            obj.size(".k-pane:first", "100%");
        } else {
            $('iframe#grid_bottom')[0].src = p_url;
            obj.size(".k-pane:first", "30%");
        }
    } else {
        obj = $("#horizontal").data("kendoSplitter");
        if (p_size == undefined) {
            p_size = getCookie('lastSize_right');
        }
        if ($('iframe#grid_right')[0].src == p_url && obj.size(".k-pane:first") != '100%') {
            obj.size(".k-pane:first", "100%");
        } else {
            $('iframe#grid_right')[0].src = p_url;
            debugger;
            obj.size(".k-pane:first", p_size);
        }

    }

}

$(function () {
    if (kendo.support.mobileOS) {
        $(document.documentElement).addClass("k-hover-enabled");
    }
});



function grid_remove_sort() {
    $('div.k-grid-header tr[role="row"] th').unbind('click');
    $('div.k-grid-header tr[role="row"] th *').css('cursor', 'default');
    $('div.k-grid-header tr[role="row"] th a').removeAttr('href');
}


function dirtyClear() {
    var hasDirtyRow = $.grep($('#grid').data('kendoGrid').dataSource.view(), function (e) { return e.dirty === true; });
    forMax = hasDirtyRow.length;
    for (ii = 0; ii < forMax; ii++) {
        hasDirtyRow[ii].dirtyFields = {};
        hasDirtyRow[ii].dirty = false;
    }
    $("td.k-dirty-cell").removeClass("k-dirty-cell");
    $("span.k-dirty").removeClass("k-dirty");
}





//getGridCellValue(918, "MenuName");
function getGridRowIndex_idx(p_idx) {
    if (getFieldAttr(key_aliasName, "format") == "{0:yyyy-MM-dd}") {
        p_idx = date10(p_idx);
    }
    if ($('#grid td[keyIdx="' + p_idx + '"]').parent()[0]) return $('#grid td[keyIdx="' + p_idx + '"]').parent()[0].rowIndex;
    else return '';
}


function getIdx_gridRowTr(p_tr) {
    return p_tr.find('td[keyIdx]').attr('keyIdx');
}


function getGridRowIndex_gridRowTr(p_tr) {
    return $('table[role="grid"] tbody tr').index(p_tr);
}

function getGridRowObj_idx(p_idx) {
    if (getFieldAttr(key_aliasName, "format") == "{0:yyyy-MM-dd}") {
        p_idx = date10(p_idx);
    }
    return $('#grid td[keyIdx="' + p_idx + '"]').parent()[0];
}


//그리드 타이틀의 data-index
function getFieldIndex_aliasName(p_aliasName) {
    return $('#grid th[data-field="' + p_aliasName + '"]').attr("data-index");
}

function getOptionsfieldsIndex_aliasName(p_aliasName) {
    var i = -1;
    var indexNum = -1;
    $.each($('#grid').data('kendoGrid').dataSource.options.fields, function (index, obj) {
        ++indexNum;
        if (p_aliasName == obj.field) {
            i = indexNum;
        } else if (obj.columns) {
            --indexNum;
            forMax = obj.columns.length;
            for (j = 0; j < forMax; j++) {
                ++indexNum;
                if (p_aliasName == obj.columns[j].field) {
                    i = indexNum;
                }
            }
        }
    });
    return i;
}

function dataSourceFields(p_aliasName) {
    var r_obj;
    $.each($('#grid').data('kendoGrid').dataSource.options.fields, function (index, obj) {
        if (p_aliasName == obj.field) {
            r_obj = obj;
            return true;
        } else if (obj.columns) {
            forMax = obj.columns.length;
            for (j = 0; j < forMax; j++) {
                if (p_aliasName == obj.columns[j].field) {
                    r_obj = obj.columns[j];
                    j = 9999;
                }
            }
        }
    });
    return r_obj;
}


function getTitle_aliasName(p_aliasName) {
    if (getOptionsfieldsIndex_aliasName(p_aliasName) > -1) return dataSourceFields(p_aliasName).title;
    else return "";
}

function getColumnProperty_aliasName(p_aliasName, p_attr) {
    if (getObjects(p_columns, "field", p_aliasName)[0]) return getObjects(p_columns, "field", p_aliasName)[0][p_attr];
    else return "";
}


//$('#grid').data('kendoGrid').columns  기준
function getColumnAttr_aliasName(p_aliasName, p_attr) {
    if (p_attr == "Grid_Items") {
        var Grid_Items_6 = Left(getObjects(p_columns, 'field', p_aliasName)[0]["Grid_Items"], 6);
        if (Grid_Items_6 != '' && Grid_Items_6 != 'select' && dataSourceFields(p_aliasName)[p_attr + "_result"]) {
            attrValue = dataSourceFields(p_aliasName)[p_attr + "_result"];    //한번만 url 로 불러오고 그후로는 url 접속 안하도록 하기 위함.
        } else {
            addUrl = "";
            if (getObjects(p_columns, "field", p_aliasName)[0].editor.toString().split("(")[0].split("function ")[1] == "columnsDropDownItemEditor") {
                addUrl = "&blank=Y";
            }
            list_grid_items_url = "list_grid_items.php?RealPid=" + document.getElementById("RealPid").value
                + "&allFilter=" + $('textarea#allFilter')[0].innerHTML
                + "&MisJoinPid=" + document.getElementById("MisJoinPid").value
                + "&parent_gubun=" + document.getElementById("parent_gubun").value
                + "&parent_idx=" + document.getElementById("parent_idx").value
                + "&idx=" + getIdx_gridRowTr($(event.srcElement).closest('tr'))
                + "&ActionFlag=list_grid_items"
                + "&aliasName=" + p_aliasName + addUrl;
            attrValue = ajax_url_return(list_grid_items_url);
            dataSourceFields(p_aliasName)[p_attr + "_result"] = attrValue;
        }
    } else if (dataSourceFields(p_aliasName)) {
        attrValue = dataSourceFields(p_aliasName)[p_attr];
    } else return '';

    if (attrValue != undefined && attrValue != "") {
        if (InStr(Left(attrValue, 2), "{") > 0 && isJsonString(attrValue)) return JSON.parse(attrValue);
        else return attrValue;
    } else return "";
}

function getCellObj_idx(p_idx, p_aliasName) {
    if (getFieldAttr(key_aliasName, "format") == "{0:yyyy-MM-dd}") {
        p_idx = date10(p_idx);
    }
    return $(getGridRowObj_idx(p_idx)).find('td[role="gridcell"]')[getFieldIndex_aliasName(p_aliasName)];
}
function getCellObj_list(p_aliasName) {
    if (getCellIndex_alias(p_aliasName) == -1) return undefined;
    return $('#grid').data('kendoGrid').tbody.find('td:nth-child(' + (getCellIndex_alias(p_aliasName) + 1) + ')');

}

function getGridCellValue_idx(p_idx, p_aliasName) {
    if (getFieldAttr(key_aliasName, "format") == "{0:yyyy-MM-dd}") {
        p_idx = date10(p_idx);
    }
    v = $('#grid').data('kendoGrid').dataSource._data[getGridRowIndex_idx(p_idx)][p_aliasName];
    if (getFieldAttr(key_aliasName, "format") == "{0:yyyy-MM-dd}") {
        v = date10(v);
    }
    if (InStr(v, "[object Object]") > 0) {
        v = replaceAll(v, "[object Object],", "");
        v = replaceAll(v, "[object Object]", "");
        $('#grid').data('kendoGrid').dataSource._data[getGridRowIndex_idx(p_idx)][p_aliasName] = v;
    }
    if (v == null) v = "";
    return v;
}

function setGridCellValue_idx(p_idx, p_aliasName, p_value) {
    if (getFieldAttr(key_aliasName, "format") == "{0:yyyy-MM-dd}") {
        p_idx = date10(p_idx);
    }
    if (getGridRowIndex_idx(p_idx) == "" && getGridRowIndex_idx(p_idx) != "0") return false;
    $('#grid').data('kendoGrid').dataSource._data[getGridRowIndex_idx(p_idx)][p_aliasName] = p_value;

    //if(p_aliasName=='pummokkodeu') debugger;

    if (getCellObj_idx(p_idx, p_aliasName)) {
        if ($(getCellObj_idx(p_idx, p_aliasName)).find('input')[0]) return false;
        //console.log("p_idx="+p_idx);
        //console.log("p_aliasName="+p_aliasName);
        //if(p_aliasName=='Grid_ListEdit') debugger;
        if (p_value == null) p_value = '';
        if (InStr(getCellObj_idx(p_idx, p_aliasName).innerHTML, 'button') > 0 && InStr(getCellObj_idx(p_idx, p_aliasName).innerHTML, '<a ') > 0) return false;
        if (getCellObj_idx(p_idx, p_aliasName).innerHTML == '' || InStr(getCellObj_idx(p_idx, p_aliasName).innerHTML, '<') == 0 || getCellObj_idx(p_idx, p_aliasName).innerHTML == '<span class=""></span>') {
            if (InStr(p_value, 'span title="') > 0) return false;   //멈추는게 답
            else if (getColumnAttr_aliasName(p_aliasName, 'template') && typeof getColumnAttr_aliasName(p_aliasName, 'template') == 'string') {
                getCellObj_idx(p_idx, p_aliasName).innerText = eval(replaceAll(Mid(getColumnAttr_aliasName(p_aliasName, 'template'), 3, getColumnAttr_aliasName(p_aliasName, 'template').length - 3), p_aliasName, '"' + p_value + '"'));
            } else {
                getCellObj_idx(p_idx, p_aliasName).innerText = p_value;
            }
        } else if (InStr(p_value, "<") > 0) {
            getCellObj_idx(p_idx, p_aliasName).innerHTML = p_value;
        } else {
            getCellObj_idx(p_idx, p_aliasName).innerText = p_value;
        }
    }
}


function getAliasName_tdObj(p_tdObj) {
    if (event != undefined) {
        if ($(event.target)[0].tagName == "INPUT" && $(p_tdObj).attr("name") != "") return $(p_tdObj).attr("name");
    }
    p_index = $(p_tdObj).closest("tr").find("td").index($(p_tdObj).closest("td"));
    if (p_index >= 0) return $($("div#grid thead tr:first-child th")[p_index]).attr("data-field");
    else return "";
}

function getVisibleCellIndex_alias(p_aliasName) {
    //return $('th:not([style="display: none;"]) span[data-field]').index($('th span[data-field="'+p_aliasName+'"]'));
    return $('thead tr.k-filter-row th:not([style="display: none;"]').index($('th span[data-field="' + p_aliasName + '"]').closest('th'));
}
function getCellIndex_alias(p_aliasName) {
    return $('thead tr.k-filter-row th').index($('th span[data-field="' + p_aliasName + '"]').closest('th'));
}

function resizeColumn(p_visibleCellIndex, p_width) {
    $("#grid .k-grid-header-wrap") //header
        .find("colgroup col")
        .eq(idx)
        .css({ width: width });

    $("#grid .k-grid-content") //content
        .find("colgroup col")
        .eq(idx)
        .css({ width: width });
}


function getNextKey_key(p_json, p_key) {
    var nextKey = "";
    $.each(p_json, function (key, value) {
        if (nextKey == p_key) {
            nextKey = key;
            return false;
        }
        if (key == p_key) {
            nextKey = key;
        }
    });
    return nextKey;
}
//getNextKey_key(options.model.fields, options.field)



function printGrid() {
    var gridElement = $('#grid'),
        printableContent = '',
        win = window.open('', 'print_win', 'width=1200, height=900, resizable=1, scrollbars=1'),
        doc = win.document.open();

    var htmlStart = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8" />
    <title>`+ document.getElementById('MenuName').value + ` 목록인쇄</title>
    <script src="../_mis_kendo/js/jquery.min.js"></script>
    <script src="../_mis_kendo/js/kendo.all.min.js"></script>
    <script id="id_js" name="name_js" src="java_conv.js?fkdrdd7447z3ze4efddw"></script>
    <link rel="stylesheet" href="../_mis_kendo/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="../_mis_kendo/styles/kendo.default.min.css" />

    <style>
    td.text-right {
        text-align: right;
    }
    tr.k-filter-row, .k-pager-numbers-wrap, .k-grid-footer, .k-grid-pager {
        display: none;
    }
    div#header_filter {
        display: none;
    }
    div#grid {
        border-left: 0;
    }
    .k-grid {
        font-size: 10px;
    }
    .k-pager-info {
        font-size: 11px;
        position: relative;
        top: -3px;
        text-align: left;
        display: block;
    }
    button.k-button.k-button-icon.k-flat.k-upload-action, .k-dropzone {
        display: none;
    }
    h2#title {
        position: relative;
        height: 0px;
    }
    th[data-colspan] {
        border-bottom: 0!important;
    }
    tbody tr[role="row"] {
        border-bottom: 1px solid #000!important;
    }
    tbody tr > td {
        border-bottom: 1px dashed#000!important;
    }
    tbody tr:last-child > td {
        border-bottom: 0!important;
    }
    .k-upload {
        max-width: 150px;
    }
    .k-grid td {
        max-width: 270px;
            padding: 3px;
    }
    .td_div {
        white-space: normal;
    }
    tr.newsort1 td {
        border-bottom-style: double!important;
        border-bottom-width: 2px!important;
    }
    .k-grid, .k-grid-content {
        border-right: 0!important;
    }
    span.k-icon.k-i-print {
        position: absolute;
        top: 32px;
        right: 20px;
    }
    span.k-icon.k-i-pdf {
        position: absolute;
        right: 45px;
        top: 32px;
    }
    img {
        max-width: 300px;
        max-height: 150px;
    }
    td {
        white-space: nowrap;
    }


    @media print
    {    
        .no-print, .no-print *
        {
            display: none !important;
        }
    }
    html { font: 11pt 'DejaVu Sans'; font-family: 'DejaVu Sans', sans-serif; }
    body * { font-family: 'DejaVu Sans', sans-serif; }
    .k-grid { border-top-width: 0; }
    .k-grid, .k-grid-content { height: auto !important; }
    .k-scrollbar-vertical {
        overflow: hidden;
    }
    .k-grid-content { overflow: visible !important; }
    div.k-grid table { table-layout: auto; }
    .k-grid .k-grid-header th { border-top: 1px solid; }
    .k-grouping-header, .k-grid-toolbar, .k-grid-pager > .k-link { display: none; }' +
        // '.k-grid-pager { display: none; }' + // optional: hide the whole pager
        '</style>
    </head>
    <body class="list_print">
    <span class="k-icon k-i-pdf no-print" onclick="listprint_PDF('body', '`+ document.getElementById('MenuName').value + `' + '_print_' + today15() + '.pdf', 'A4', '10px');" title="save as pdf"></span>
    <span class="k-icon k-i-print no-print" onclick="print();" title="print"></span>
    `;

    var htmlEnd = `
    <script>

    $('.k-grid-content.k-auto-scrollable tbody tr:last-child').after($('tr.k-footer-template'));
    $('body').prepend($('span.k-pager-info.k-label'));
    $('body').prepend($('<center><h2 id="title">`+ document.getElementById('MenuName').value + `</h2></center>'));
    $('.k-grid-content.k-auto-scrollable').attr('style','');
    $('a.k-link').each( function() {
        this.outerText = this.innerText;
    });
    $('a.k-button').each( function() {
        this.outerText = '';
    });
    $('tr td:first-child input.k-checkbox').closest('td').each( function(i) {
        this.style.display = 'none';
        $(this).next()[0].style.borderLeft = 0;
    });
    if($('tr th:first-child input.k-checkbox').closest('th')[0]) {
        $('tr th:first-child input.k-checkbox').closest('th')[0].style.display = 'none';
        $('tr th:first-child input.k-checkbox').closest('th').next()[0].style.borderLeft = 0;
    }
    if($('tr.k-footer-template td:first-child')[0]) {
        $('tr.k-footer-template td:first-child')[0].style.display = 'none';
        $('tr.k-footer-template td:first-child').next()[0].style.borderLeft = 0;
    }



    </script>
    </body>
    </html>
    `;

    var gridHeader = gridElement.children('.k-grid-header');
    if (gridHeader[0]) {
        var thead = gridHeader.find('thead').clone().addClass('k-grid-header');
        printableContent = gridElement
            .clone()
            .children('.k-grid-header').remove()
            .end()
            .children('.k-grid-content')
            .find('table')
            .first()
            .children('tbody').before(thead)
            .end()
            .end()
            .end()
            .end()[0].outerHTML;
    } else {
        printableContent = gridElement.clone()[0].outerHTML;
    }

    doc.write(htmlStart + printableContent + htmlEnd);
    doc.close();

    if (typeof parent.list_print_add == "function") {
        setTimeout(function (p_doc) {
            list_print_add(p_doc);
        }, 1000, doc);
    }
}

function grid_top_line_tr_select() {
    //클릭은 아니며, 첫번째 내역만 선택하는 기능임.
    if ($("#grid tbody tr.k-state-selected td[keyidx] input")[0]) {
        $("#grid tbody tr.k-state-selected td[keyidx] input")[0].checked = false;
        $("#grid tbody tr.k-state-selected").removeClass('k-state-selected');
    }
    $($("#grid tbody tr")[0]).addClass('k-state-selected');
    $("#grid tbody tr.k-state-selected td[keyidx] input")[0].checked = true;

}


function btn_up_click() {
    if ($("#grid tbody tr.k-state-selected")[0]) {
        if ($($("#grid tbody tr.k-state-selected")[0]).prev().length == 0) {
            toastrAlert("최상위 목록입니다.");
            return false;
        }
        var nowObj = $($("#grid tbody tr.k-state-selected")[0]).find("input[type='checkbox']")[0];
        var changeObj = $($("#grid tbody tr.k-state-selected")[0]).prev().find("input[type='checkbox']")[0];
        if (changeObj == undefined) {
            var changeObj = $($("#grid tbody tr.k-state-selected")[0]).prev().prev().find("input[type='checkbox']")[0];
            if (changeObj == undefined) {
                var changeObj = $($("#grid tbody tr.k-state-selected")[0]).prev().prev().prev().find("input[type='checkbox']")[0];
                if (changeObj == undefined) {
                    var changeObj = $($("#grid tbody tr.k-state-selected")[0]).prev().prev().prev().prev().find("input[type='checkbox']")[0];
                }
            }
        }
        var nowObj_disabled = false;
        if (nowObj.disabled == true) {
            nowObj.disabled = false;
            nowObj_disabled = true;
        }
        var changeObj_disabled = false;
        if (changeObj.disabled == true) {
            changeObj.disabled = false;
            changeObj_disabled = true;
        }
        nowObj.checked = false;
        nowObj.click();
        changeObj.checked = true;

        if ($(changeObj).parent().css("display") == "none") {
            $(changeObj).parent().css("display", "inherit");
            $(changeObj).focus();
            $(changeObj).parent().css("display", "none");
        } else $(changeObj).focus();
        changeObj.click();
        $($(changeObj).closest('tr').find('td[comment="Y"]')[0]).keyup();


        if (nowObj_disabled == true) {
            nowObj.disabled = true;
        }
        if (changeObj_disabled == true) {
            changeObj.disabled = true;
        }

        if (changeObj.disabled) {
            $(nowObj).closest('tr').removeClass('k-state-selected');
            $(changeObj).closest('tr').addClass('k-state-selected');
        }

    } else {
        var nowObj = $($("#grid tbody tr")[0]).find("input[type='checkbox']")[0];
        if (nowObj != undefined) {
            var nowObj_disabled = false;
            if (nowObj.disabled == true) {
                nowObj.disabled = false;
                nowObj_disabled = true;
            }
            nowObj.checked = false;
            if ($(nowObj).parent().css("display") == "none") {
                $(nowObj).parent().css("display", "inherit");
                $(nowObj).focus();
                $(nowObj).parent().css("display", "none");
            } else $(nowObj).focus();
            nowObj.click();
            $($(nowObj).closest('tr').find('td[comment="Y"]')[0]).keyup();

            if (nowObj_disabled == true) {
                nowObj.disabled = true;
            }
            if (nowObj.disabled) {
                $(nowObj).closest('tr').removeClass('k-state-selected');
            }
        }
    }
    if ($('div#treemenu')[0]) {
        setTimeout(function () {
            var treemenuObj = $('div#treemenu').data('kendoTreeView');
            sel_idx = $('tr.k-master-row.k-state-selected td[keyidx]').attr('keyidx');
            var barDataItem = treemenuObj.dataSource.get(sel_idx);
            if (barDataItem) {
                var barElement = treemenuObj.findByUid(barDataItem.uid);
                treemenuObj.select(barElement);
            }
        });
    }
}

function btn_down_click() {
    if ($("#grid tbody tr.k-state-selected")[0]) {
        if ($($("#grid tbody tr.k-state-selected")[0]).next().length == 0) {
            toastrAlert("최하위 목록입니다.");
            return false;
        }
        var nowObj = $($("#grid tbody tr.k-state-selected")[0]).find("input[type='checkbox']")[0];
        var changeObj = $($("#grid tbody tr.k-state-selected")[0]).next().find("input[type='checkbox']")[0];
        if (changeObj == undefined) {
            var changeObj = $($("#grid tbody tr.k-state-selected")[0]).next().next().find("input[type='checkbox']")[0];
            if (changeObj == undefined) {
                var changeObj = $($("#grid tbody tr.k-state-selected")[0]).next().next().next().find("input[type='checkbox']")[0];
                if (changeObj == undefined) {
                    var changeObj = $($("#grid tbody tr.k-state-selected")[0]).next().next().next().next().find("input[type='checkbox']")[0];
                }
            }
        }
        var nowObj_disabled = false;
        if (nowObj.disabled == true) {
            nowObj.disabled = false;
            nowObj_disabled = true;
        }
        var changeObj_disabled = false;
        if (changeObj.disabled == true) {
            changeObj.disabled = false;
            changeObj_disabled = true;
        }
        nowObj.checked = false;
        nowObj.click();
        changeObj.checked = true;

        if ($(changeObj).parent().css("display") == "none") {
            $(changeObj).parent().css("display", "inherit");
            $(changeObj).focus();
            $(changeObj).parent().css("display", "none");
        } else $(changeObj).focus();
        changeObj.click();
        $($(changeObj).closest('tr').find('td[comment="Y"]')[0]).keyup();

        if (nowObj_disabled == true) {
            nowObj.disabled = true;
        }
        if (changeObj_disabled == true) {
            changeObj.disabled = true;
        }

        if (changeObj.disabled) {
            $(nowObj).closest('tr').removeClass('k-state-selected');
            $(changeObj).closest('tr').addClass('k-state-selected');
        }

    } else {
        var nowObj = $($("#grid tbody tr")[0]).find("input[type='checkbox']")[0];
        if (nowObj == undefined) {
            $($('tr.k-master-row')[0]).addClass('k-state-selected');
            var nowObj = $($("#grid tbody tr")[0]).find("input[type='checkbox']")[0];
        }

        if (nowObj != undefined) {
            var nowObj_disabled = false;
            if (nowObj.disabled == true) {
                nowObj.disabled = false;
                nowObj_disabled = true;
            }
            nowObj.checked = false;
            if ($(nowObj).parent().css("display") == "none") {
                $(nowObj).parent().css("display", "inherit");
                $(nowObj).focus();
                $(nowObj).parent().css("display", "none");
            } else $(nowObj).focus();
            nowObj.click();
            $($(nowObj).closest('tr').find('td[comment="Y"]')[0]).keyup();

            if (nowObj_disabled == true) {
                nowObj.disabled = true;
            }
            if (nowObj.disabled) {
                $($('tr.k-master-row')[0]).addClass('k-state-selected');
            }
        }
    }
    if ($('div#treemenu')[0]) {
        var treemenuObj = $('div#treemenu').data('kendoTreeView');
        sel_idx = $('tr.k-master-row.k-state-selected td[keyidx]').attr('keyidx');
        var barDataItem = treemenuObj.dataSource.get(sel_idx);
        if (barDataItem) {
            var barElement = treemenuObj.findByUid(barDataItem.uid);
            treemenuObj.select(barElement);
        }
    }
}

//현재 선택된 라인에 대한 클릭임.
function btn_downup_click() {

    if ($("#grid tbody tr.k-state-selected")[0]) {

        var nowObj = $($("#grid tbody tr.k-state-selected")[0]).find("input[type='checkbox']")[0];
        var changeObj = $($("#grid tbody tr.k-state-selected")[0]).find("input[type='checkbox']")[0];
        var nowObj_disabled = false;
        if (nowObj.disabled == true) {
            nowObj.disabled = false;
            nowObj_disabled = true;
        }
        var changeObj_disabled = false;
        if (changeObj.disabled == true) {
            changeObj.disabled = false;
            changeObj_disabled = true;
        }
        nowObj.checked = false;
        nowObj.click();
        changeObj.checked = true;

        if ($(changeObj).parent().css("display") == "none") {
            $(changeObj).parent().css("display", "inherit");
            $(changeObj).focus();
            $(changeObj).parent().css("display", "none");
        } else $(changeObj).focus();
        changeObj.click();
        $($(changeObj).closest('tr').find('td[comment="Y"]')[0]).keyup();

        if (nowObj_disabled == true) {
            nowObj.disabled = true;
        }
        if (changeObj_disabled == true) {
            changeObj.disabled = true;
        }

        if (changeObj.disabled) {
            $(nowObj).closest('tr').removeClass('k-state-selected');
            $(changeObj).closest('tr').addClass('k-state-selected');
        }

    } else {
        var nowObj = $($("#grid tbody tr")[0]).find("input[type='checkbox']")[0];
        if (nowObj == undefined) {
            $($('tr.k-master-row')[0]).addClass('k-state-selected');
            var nowObj = $($("#grid tbody tr")[0]).find("input[type='checkbox']")[0];
        }

        if (nowObj != undefined) {
            var nowObj_disabled = false;
            if (nowObj.disabled == true) {
                nowObj.disabled = false;
                nowObj_disabled = true;
            }
            nowObj.checked = false;
            if ($(nowObj).parent().css("display") == "none") {
                $(nowObj).parent().css("display", "inherit");
                $(nowObj).focus();
                $(nowObj).parent().css("display", "none");
            } else $(nowObj).focus();
            nowObj.click();
            $($(nowObj).closest('tr').find('td[comment="Y"]')[0]).keyup();

            if (nowObj_disabled == true) {
                nowObj.disabled = true;
            }
            if (nowObj.disabled) {
                $($('tr.k-master-row')[0]).addClass('k-state-selected');
            }
        }
    }
    if ($('div#treemenu')[0]) {
        var treemenuObj = $('div#treemenu').data('kendoTreeView');
        sel_idx = $('tr.k-master-row.k-state-selected td[keyidx]').attr('keyidx');
        var barDataItem = treemenuObj.dataSource.get(sel_idx);
        if (barDataItem) {
            var barElement = treemenuObj.findByUid(barDataItem.uid);
            treemenuObj.select(barElement);
        }
    }
}
kendo.ui.FilterCell.prototype.options.messages.isTrue = 'Y';
kendo.ui.FilterCell.prototype.options.messages.isFalse = 'N';