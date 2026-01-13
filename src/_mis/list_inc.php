<style>
    <?php if ($isMenuIn == 'Y' || $screenMode == '1') { ?>
        a#btn_menuView {
            display: none !important;
        }

    <?php } ?>
    <?php if ($screenMode == '1') { ?>
        #btn_menuView {
            display: none !important;
        }

    <?php } ?>
</style>

<?php
$brief_insertsql = '';
$Anti_SortWrite = '';
$delflag_sql = '';


?>

<?php if ($helpbox != '') { ?>
    <div id="grid"></div>
    <?php
} else {
    ?>

    <div id="vertical" class="k-content">
        <div id="top-pane">
            <div id="horizontal" style="height: 100%; width: 100%;">
                <div id="left-pane">
                    <div class="pane-content">



                        <?php if (requestVB('treemenu') == 'Y') { ?>


                            <div class="demo-section k-content">
                                <div id="treemenu" style="width: 100%;"></div>
                            </div>



                            <style>
                                .demo-section {
                                    display: flex;
                                    justify-content: space-evenly;
                                    float: left;
                                    height: 100%;
                                    padding: 20px 0 20px 20px;
                                    max-width: 100% !important;
                                    width: calc(100% - 22px);
                                }
                            </style>
                            <div id="grid" style="display:none;"></div>

                        <?php } else { ?>

                            <div id="grid"></div>

                        <?php } ?>


                    </div>
                </div>
                <div id="right-pane">
                    <div class="pane-content k-widget">
                        <iframe id="grid_right" grid_right_origin src="about:blank" marginwidth=0 marginheight=0
                            frameborder=0 scrolling="no" style="width:100%;overflow-x: hidden;overflow-y: hidden;"
                            width="100%" height="100%"></iframe>
                    </div>
                </div>
            </div>
        </div>

    </div>
<?php } ?>

<script type="text/x-kendo-template" id="template_ChkOnlySum2">
    <div class="detailTabstrip" style="display:none;">
        <iframe src="about:blank" style="width:100%;height:100%;" onload="template_ChkOnlySum2_load(this);"></iframe>
    </div>
</script>


<script id="scr_list">

    var p_columns;
    var p_schema_fieldsAll;

    if (getCookie("modify_YN") == "") {
        setCookie('modify_YN', 'N');
    }

    if (document.getElementById("index_main_YN").value == "Y") {
        setTimeout(function () {
            if ($('div#grid').data('kendoGrid')) {
                location.href = location.href;
                return false;
            }
            list_main();
        });
    } else {
        $(document).ready(function () {
            list_main();
        });
    }

    function list_main() {

        <?php
        $key_mm = -1;


        if ($helpbox != '')
            $strsql = helpbox_sql($logicPid, $helpbox, 'list_inc');
        else if ($MS_MJ_MY == 'MY') {
            $strsql = "
select 
d.idx
,ifnull(g01,'') as g01
,ifnull(g03,'') as g03
,ifnull(g04,'') as g04
,ifnull(g05,'') as g05
,ifnull(g06,'') as g06
,ifnull(g07,'') as g07
,ifnull(g08,'') as g08
,ifnull(g09,'') as g09
,ifnull(g10,'') as g10
,ifnull(g11,'') as g11
,ifnull(g12,'') as g12
,ifnull(dbalias,'') as pro_dbalias
,ifnull(spreadsheets_url,'') as spreadsheets_url
,ifnull(d.aliasName,'') as aliasName
,Grid_Columns_Title
,SortElement as SortElement
,ifnull(Grid_FormGroup,0) as Grid_FormGroup
,ifnull(Grid_Columns_Width,0) as Grid_Columns_Width
,ifnull(Grid_Align,'') as Grid_Align
,ifnull(Grid_Orderby,'') as Grid_Orderby
,ifnull(Grid_MaxLength,'') as Grid_MaxLength
,ifnull(Grid_Default,'') as Grid_Default
,ifnull(Grid_Select_Tname,'') as Grid_Select_Tname
,ifnull(Grid_Select_Field,'') as Grid_Select_Field
,ifnull(Grid_GroupCompute,'') as Grid_GroupCompute
,ifnull(Grid_CtlName,'') as Grid_CtlName 
,ifnull(Grid_Schema_Type,'') as Grid_Schema_Type
,ifnull(Grid_Items,'') as Grid_Items 
,ifnull(Grid_IsHandle,'') as Grid_IsHandle
,ifnull(Grid_ListEdit,'') as Grid_ListEdit
,ifnull(Grid_Templete,'') as Grid_Templete
,ifnull(Grid_Schema_Validation,'') as Grid_Schema_Validation
,ifnull(Grid_PrimeKey,'') as Grid_PrimeKey
,ifnull(Grid_Alim,'') as Grid_Alim
,ifnull(Grid_Pil,'') as Grid_Pil
from $MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where (d.sortelement<>999 or ifnull(d.Grid_Select_Field,'')!='') and ifnull(d.aliasName,'')<>'' and d.RealPid='" . iif($MisJoinPid != '', $MisJoinPid, $RealPid) . "' 
order by d.sortelement;
    ";
        } else {
            $strsql = "
select 
d.idx
,m.g01
,m.g03
,m.g04
,m.g05
,m.g06
,m.g07
,m.g08
,m.g09
,m.g10
,m.g11
,m.spreadsheets_url
,m.g12
,m.dbalias as pro_dbalias
,d.aliasName
,d.Grid_Columns_Title
,d.SortElement
,d.Grid_FormGroup
,d.Grid_Columns_Width
,d.Grid_Align
,d.Grid_Orderby
,d.Grid_MaxLength
,d.Grid_Default
,d.Grid_Select_Tname
,d.Grid_Select_Field
,d.Grid_GroupCompute
,d.Grid_CtlName 
,d.Grid_Schema_Type
,d.Grid_Items 
,d.Grid_IsHandle
,d.Grid_ListEdit
,d.Grid_Templete
,d.Grid_Schema_Validation
,d.Grid_PrimeKey
,d.Grid_Alim
,d.Grid_Pil
from $MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where (d.sortelement<>999 or d.Grid_Select_Field!='') and d.aliasName<>'' and d.RealPid='" . iif($MisJoinPid != '', $MisJoinPid, $RealPid) . "' 
order by d.sortelement;
    ";
        }




        $speed_fieldIndx = [];
        $selectQuery = '';
        $table_m = '';
        $join_sql = '';
        $where_sql = 'where 9=9 ';
        $json_codeSelect = [];
        $defaultList = [];

        $addLogic_msg = '';

        $schema_fieldsAll = '';
        $script_columnsAll = '';
        $dataSource_sort = '';


        $rowFunctionAfter = '';
        $upload_rowFunctionAfter_script = '';
        if ($isAuthW == 'N')
            $upload_rowFunctionAfter_script = '
$(getCellObj_idx(p_this[key_aliasName], "{thisAlias}")).attr("stopEdit","true");
';

        $upload_rowFunctionAfter_script = $upload_rowFunctionAfter_script . '
var container2 = $(getCellObj_idx(p_this[key_aliasName], "{thisAlias}"));
var options2 = dataSourceFields("{thisAlias}");
options2.model = p_this;

if(document.getElementById("ChkOnlySum").value=="") {
	fileUploadEditor(container2, options2);
}
';


        $toolbar_brief_insertsql = '
{
    template: "<input id=\'toolbar_brief_insertsql\'/>",
    overflow: "never",
    attributes: { "class": "union toolbar_round_brief_insertsql" }
},
';



        $toolbar_searchField = '
{ template: "<label class=\'k-button\' for=\'toolbar_{searchField}\'>{Grid_Columns_Title}:</label> <input id=\'toolbar_{searchField}\' style=\'width: 100px;\' />",
    overflow: "never",
    attributes: { "class": "union toolbar_round_{searchField}" }
},
';

        $toolbar_searchLikeField = '
{ template: "<label class=\'k-button\' for=\'toolbarTxt_{searchLikeField}\'>{Grid_Columns_Title}:</label> <input id=\'toolbarTxt_{searchLikeField}\' onkeyup=\'toolbarTxt_keyup(this);\' ondblclick=\'toolbarTxt_dblclick(this);\' class=\'k-textbox likeField\'/><input id=\'toolbarSel_{searchLikeField}\' class=\'k-textbox\' style=\'width: 65px;\' />",
    overflow: "never"
    //attributes: { "class": "union toolbar_round_{searchField}" }
},
';

        $toolbar_searchBetweenField = '
{ template: "<label class=\'k-button\' for=\'toolbarSel_{searchBetweenField}\'>{Grid_Columns_Title}:</label> <input id=\'toolbarSel_{searchBetweenField}\' onkeyup=\'toolbarSel_keyup(this);\' ondblclick=\'toolbarTxt_dblclick(this);\' class=\'k-textbox likeField schema_type_{Grid_Schema_Type}\'/><span class=\'between\'>~</span> <input id=\'toolbarSel_{searchBetweenField}_end\' onkeyup=\'toolbarSel_keyup(this);\' ondblclick=\'toolbarTxt_dblclick(this);\' class=\'k-textbox likeField schema_type_{Grid_Schema_Type}\'/> <a role=\'button\' href=\'\' class=\'k-button k-button-icon btn_search\' id=\'btn_search_{searchBetweenField}\'><span class=\'k-icon k-i-k-icon k-i-search\'></span></a>",
    overflow: "never",
    attributes: { "class": "union toolbar_round_{searchField}" }
},
';

        $toolbar_searchField_all = '';
        /*
        const params = new URLSearchParams(autocomplete.dataSource.transport.options.read.url);
                                if(params.get("parent_gubun")==document.getElementById('parent_gubun').value
                                && params.get("parent_idx")!=document.getElementById('parent_idx').value
                                && params.get("parent_idx")!=null) {
                                    autocomplete.dataSource.transport.options.read.url = replaceAll(autocomplete.dataSource.transport.options.read.url
                                    ,'&parent_idx='+params.get("parent_idx"),'&parent_idx='+document.getElementById('parent_idx').value);
                                }
                                */
        $toolbar_searchField_kendoDropDownList0 = '
//wakeUpTime = Date.now() + 1000;          //자바용 로직 2줄.
//while (Date.now() < wakeUpTime) {}      //자바용 로직 2줄.
$("#toolbar_{searchField}").kendoDropDownList({
    autoBind: true,
    autoWidth: true,
    dataTextField: "{searchField}",
    dataValueField: "{searchField}", 
    filter: "contains",
    optionLabel: iif(kendo.culture().name=="ko-KR","전체","All list"),
    dataSource: {
        type: "odata",
        serverFiltering: true,
        transport: {
            read: "' . $jsonUrl . 'list_json.php?flag=toolbar_searchField_kendoDropDownList&RealPid=' . $RealPid . '&MisJoinPid=' . $MisJoinPid . '&parent_gubun=' . $parent_gubun . '&parent_idx=' . $parent_idx . '&selField={searchField}&selValue={searchValue}&addParam="+document.getElementById("addParam").value
        }
    },
    filtering: function(e) {
        if(event) if(event.keyCode==38 || event.keyCode==40) return false;
        if(e.filter==undefined) {
            //검색 후 클릭 시의 에러를 복구함.
            e.filter = {value: $(\'input[aria-owns="\'+e.sender.element[0].id+\'_listbox"]\').val(), field: replaceAll(e.sender.element[0].id,"toolbar_",""), operator: "contains", ignoreCase: true};
        }
        //debugger;
        if(e.filter.value) vv = e.filter.value;
        //else if(e.sender._prev!="") vv = e.sender._prev;
        //else if($(e.sender.element).attr("recently")) vv = $(e.sender.element).attr("recently");
        //else if(e.sender.optionLabel.parent().find("li.k-item.k-state-focused")[0]) vv = e.sender.optionLabel.parent().find("li.k-item.k-state-focused")[0].innerText
        else vv = "";
        e.sender.dataSource.transport.options.read.url = e.sender.dataSource.transport.options.read.url.split("&selValue=")[0]+"&selValue="+vv;
    },
    select: function(e) {
        if($("#grid").data("kendoGrid").dataSource._filter==undefined) var obj = {logic: "and", filters: eval($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter)};
        else var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;

        var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;
        //var searchFilter = replaceAll(this.element[0].id,"toolbar_","");
        var searchFilter = this.element[0].id;
        
        var obj2 = obj.find(fruit => fruit.field === searchFilter);

        if(e.dataItem!=undefined) {
            v = e.dataItem[replaceAll(searchFilter,"toolbar_","")];
            if(v==null) v = "(BLANK)";
            if(obj2) {
                if(v=="") {
                    jQuery(obj).each(function (index){
                        if(obj[index]) {
                            if(obj[index].field == searchFilter){
                                obj.splice(index, 1);
                                $("#"+searchFilter).val("");
                                e.sender.value("");
                                //console.log(222);
                            }
                        }
                    });
                } else {
                    //console.log("2222vvvvvvvvvvvvvvvvvvvvv="+v);
                    obj2.value = v;
                    $("#"+searchFilter).val(v);          //select 시점에서 미리 반영시킨다. 이래야 잘됨.
                    ////////e.sender.value(v);
                    
                }
            } else {
                //return false;
                //e.sender.value(v);
                $("#"+searchFilter).val(v);
                if(v!="") {
                    //console.log(searchFilter);
                    //console.log("215="+v);
                    //$("#"+searchFilter).attr("recently",e.sender._prev);
                    obj.push({ operator: "eq", value: v, field: searchFilter });
                } 
                if(isJsonString($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter)) {
                    allFilter = eval($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter);
                    var index = -1;
                    var filteredObj = allFilter.find(function(item, i){
                        if(item.field === searchFilter){
                        index = i;
                        return i;
                        }
                    });
                    if(index>-1) {
                        delete allFilter[index];
                        json_unempty(allFilter);
                        if(v!="") allFilter.push({ operator: "eq", value: v, field: searchFilter });
                        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter = JSON.stringify(allFilter);
                        $("#grid").data("kendoGrid").dataSource._filter =  {logic: "and", filters: allFilter};
                    };
                }
                if(InStr($("#grid").data("kendoGrid").dataSource.transport.options.read.data.$filter, searchFilter+" eq ")>0) {
                    data_filter = $("#grid").data("kendoGrid").dataSource.transport.options.read.data.$filter;
                    if(v!="") {
                        data_filter = replaceAll(data_filter, searchFilter+" eq \'"+e.sender._old+"\' and ", searchFilter+" eq \'"+v+"\' and ");
                        data_filter = replaceAll(data_filter, "and "+searchFilter+" eq \'"+e.sender._old+"\'", "and "+searchFilter+" eq \'"+v+"\'");
                    } else {
                        data_filter = replaceAll(data_filter, searchFilter+" eq \'"+e.sender._old+"\' and ","");
                        data_filter = replaceAll(data_filter, "and "+searchFilter+" eq \'"+e.sender._old+"\'","");
                    }
                    $("#grid").data("kendoGrid").dataSource.transport.options.read.data.$filter = data_filter;
                }
            
                
            }
        }
        if(document.getElementById("ChkOnlySum").value=="1") {
            fun_serverFiltering(true);
            $("#grid").data("kendoGrid").dataSource.read();
            fun_serverFiltering(false);
        } else {
            $("#grid").data("kendoGrid").dataSource.read();
        }
    },
    dataBound: function(e) {

        obj = $(\'input[aria-controls="\'+e.sender.element[0].id+\'_listbox"]\');
        if(e.sender.dataSource._data.length<=20 && e.sender._prev=="") {
            obj.parent().hide();
            if(obj.parent().parent().height()>=145) {
                obj.parent().parent().css(\'height\', (obj.parent().parent().height()-27)+\'px\');
            }
        }
        v = obj.val();
        if(v!=``) {
            if($(`ul.k-list.k-reset > li:contains("`+v+`")`).is(":visible")) {
                $(`ul.k-list.k-reset > li:contains("`+v+`")`).css("background", "blueviolet");
                $(`ul.k-list.k-reset > li:contains("`+v+`")`).css("color", "white");
            }
        }
    }
});
';
        //kendoMultiSelect
        $toolbar_searchField_kendoMultiSelect0 = '
$("#toolbar_{searchField}").kendoMultiSelect({
    autoBind: false,
    autoWidth: true,
    dataTextField: "{searchField}",
    dataValueField: "{searchField}", 
    filter: "contains",
    tagMode: "single",
    //optionLabel: " ",
    dataSource: {
        type: "odata",
        serverFiltering: true,
        transport: {
            read: "' . $jsonUrl . 'list_json.php?flag=toolbar_searchField_kendoMultiSelect&RealPid=' . $RealPid . '&MisJoinPid=' . $MisJoinPid . '&selField={searchField}&selValue={searchValue}"
        },
    },
    filtering: function(e) {
        if(event) if(event.keyCode==38 || event.keyCode==40) return false;
        //console.log(88888);
        if(e.filter.value) vv = e.filter.value;
        //else if(e.sender._prev!="") vv = e.sender._prev;
        //else if($(e.sender.element).attr("recently")) vv = $(e.sender.element).attr("recently");
        //else if(e.sender.optionLabel.parent().find("li.k-item.k-state-focused")[0]) vv = e.sender.optionLabel.parent().find("li.k-item.k-state-focused")[0].innerText
        else vv = "";
        e.sender.dataSource.transport.options.read.url = e.sender.dataSource.transport.options.read.url.split("&selValue=")[0]+"&selValue="+vv;
    },
    select: function(e) {
        
        if($("#grid").data("kendoGrid").dataSource._filter==undefined) var obj = {logic: "and", filters: eval($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter)};
        else var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;

        var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;
        //var searchFilter = replaceAll(this.element[0].id,"toolbar_","");
        var searchFilter = this.element[0].id;
        
        var obj2 = obj.find(fruit => fruit.field === searchFilter);
        v = e.sender.value().join(",");
        v_txt = e.dataItem[replaceAll(searchFilter,"toolbar_","")];
        if(v=="") v = v_txt; else v = v + "," + v_txt;
        if(v==null) v = "(BLANK)";
        if(obj2) {
            if(v=="") {
                jQuery(obj).each(function (index){
                    if(obj[index]) {
                        if(obj[index].field == searchFilter){
                            obj.splice(index, 1);
                            $("#"+searchFilter).val("");
                            e.sender.value([]);
                        }
                    }
                });
            } else {
                //console.log("33333vvvvvvvvvvvvvvvvvvvvv="+v);
                obj2.value = v;
                $("#"+searchFilter).val(v);          //select 시점에서 미리 반영시킨다. 이래야 잘됨.
                e.sender.value(v.split(","));
                
            }
        } else {
            
            $("#"+searchFilter).val(v);          //select 시점에서 미리 반영시킨다. 이래야 잘됨.
            e.sender.value(v.split(","));
            if(v!="") {
                //console.log(searchFilter);
                //console.log("215="+v);
                //$("#"+searchFilter).attr("recently",e.sender._prev);
                obj.push({ operator: "doesnotendwith", value: v, field: searchFilter });    //in
            }
            
        }
       

        if(document.getElementById("ChkOnlySum").value=="1") {
            fun_serverFiltering(true);
            $("#grid").data("kendoGrid").dataSource.read();
            fun_serverFiltering(false);
        } else {
            $("#grid").data("kendoGrid").dataSource.read();
        }

        setTimeout( function(p_obj) {
            p_obj.closest(".k-widget.k-multiselect")[0].title = p_obj.data("kendoMultiSelect").value().join(",");
            /*
            var tooltip = p_obj.closest("div[data-uid]").kendoTooltip({
                filter: ".k-widget.k-multiselect",
                width: 120,
                position: "top",
                visibe: true,
            }).data("kendoTooltip");

            tooltip.show(p_obj.closest(".k-widget.k-multiselect"));
            */

        },0,$(this.element));
        x.stop;

    },
    deselect: function(e) {
        //if(e.dataItem.zjeongbu!="구성원") return false;

        if($("#grid").data("kendoGrid").dataSource._filter==undefined) var obj = {logic: "and", filters: eval($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter)};
        else var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;

        var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;
        //var searchFilter = replaceAll(this.element[0].id,"toolbar_","");
        var searchFilter = this.element[0].id;
        
        var obj2 = obj.find(fruit => fruit.field === searchFilter);
        v = e.sender.value().join(",");
        
        v_txt = e.dataItem[replaceAll(searchFilter,"toolbar_","")];
        v = replaceAll(replaceAll(","+v+",", ","+v_txt+",", ","), ",,", ",");
        if(Left(v,1)==",") v = Mid(v, 2, 1000);
        if(Right(v,1)==",") v = Mid(v, 1, v.length-1);
        //if(v==null) v = "@null^";
        
        if(obj2) {
            if(v=="") {
                jQuery(obj).each(function (index){
                    if(obj[index]) {
                        if(obj[index].field == searchFilter){
                            obj.splice(index, 1);
                            $("#"+searchFilter).val("");
                            e.sender.value([]);
                            $("#"+searchFilter).closest("div")[0].title = "";
                        }
                    }
                });
            } else {
                //console.log("111vvvvvvvvvvvvvvvvvvvvv="+v);
                obj2.value = v;
                $("#"+searchFilter).val(v);          //select 시점에서 미리 반영시킨다. 이래야 잘됨.
                e.sender.value(v.split(","));
                $("#"+searchFilter).closest("div")[0].title = v.split(",");
                
            }
        } else {
            
            $("#"+searchFilter).val(v);          //select 시점에서 미리 반영시킨다. 이래야 잘됨.
            e.sender.value(v.split(","));
            $("#"+searchFilter).closest("div")[0].title = v.split(",");
            if(v!="") {
                //console.log(searchFilter);
                //console.log("215="+v);
                obj.push({ operator: "doesnotendwith", value: v, field: searchFilter });    //in
            }
           

            if(isJsonString($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter)) {
                allFilter = eval($("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter);
                var index = -1;
                var filteredObj = allFilter.find(function(item, i){
                    if(item.field === searchFilter){
                    index = i;
                    return i;
                    }
                });
                if(index>-1) {
                    delete allFilter[index];
                    json_unempty(allFilter);
                    if(v!="") allFilter.push({ operator: "doesnotendwith", value: v, field: searchFilter });
                    $("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter = JSON.stringify(allFilter);
                    $("#grid").data("kendoGrid").dataSource.options.transport.read.data.allFilter = JSON.stringify(allFilter);
                    $("#grid").data("kendoGrid").dataSource._filter =  {logic: "and", filters: allFilter};
                };
            }
            if(InStr($("#grid").data("kendoGrid").dataSource.transport.options.read.data.$filter, searchFilter+" doesnotendwith ")>0) {
                
                data_filter = $("#grid").data("kendoGrid").dataSource.transport.options.read.data.$filter;
                data_filter = replaceAll(data_filter, searchFilter+" doesnotendwith \'"+e.sender._old+"\' and ","");
                data_filter = replaceAll(data_filter, "and "+searchFilter+" doesnotendwith \'"+e.sender._old+"\'","");
                $("#grid").data("kendoGrid").dataSource.transport.options.read.data.$filter = data_filter;
                $("#grid").data("kendoGrid").dataSource.options.transport.read.data.$filter = data_filter;
            }

            
        }
        
        //멀티셀렉트에서 한꺼번에 삭제할 경우, 마지막 v=="" 일때까지 기다렸다가 처리해야 함.
        if($(event.currentTarget).hasClass("k-clear-value")==true && v=="" || $(event.currentTarget).hasClass("k-clear-value")==false) {
            if(document.getElementById("ChkOnlySum").value=="1") {
                fun_serverFiltering(true);
                $("#grid").data("kendoGrid").dataSource.read();
                fun_serverFiltering(false);
            } else {
                $("#grid").data("kendoGrid").dataSource.read();
            }
            setTimeout( function(p_obj) {
                /*
                p_obj.closest(".k-widget.k-multiselect")[0].title = p_obj.data("kendoMultiSelect").value().join(",");
                var tooltip = p_obj.closest("div[data-uid]").kendoTooltip({
                    filter: ".k-widget.k-multiselect",
                    width: 120,
                    position: "top",
                    visibe: true,
                }).data("kendoTooltip");
                tooltip.show(p_obj.closest(".k-widget.k-multiselect"));
                */
            },0,$(this.element));

            x.stop;
            
        } 
        


    },
    dataBound: function(e) {
        //if(JSON.stringify(e.sender.value())==\'[""]\') e.sender.value(null);
        
        if(e.sender.dataSource._data.length<=20 && e.sender._prev=="") {
            obj = $(\'input[aria-controls="\'+e.sender.element[0].id+\'_listbox"]\');
            obj.parent().hide();
            if(obj.parent().parent().height()>=145) {
                obj.parent().parent().css(\'height\', (obj.parent().parent().height()-27)+\'px\');
            }
        }
    }
});
';


        $toolbar_searchLikeField_kendoDropDownList = '
$("#toolbarSel_{searchLikeField}").kendoDropDownList({
    dataTextField: "text",
    dataValueField: "value", 
    dataSource: [
                    { text: "포함", value: "contains" },
                    { text: "일치", value: "eq" },
                    { text: "시작", value: "startswith" },
                    { text: "끝남", value: "endswith" },
                    { text: "제외", value: "doesnotcontain" },
                    { text: "초과", value: "gt" },
                    { text: "이상", value: "gte" },
                    { text: "미만", value: "lt" },
                    { text: "이하", value: "lte" },
                ],
    change: function(e) {

        if($(this).attr("onair")=="Y") return false;
        $(this).attr("onair","Y");
        setTimeout( function(p_this) {
            $(p_this).attr("onair","");
        },100,this);


        if($("#grid").data("kendoGrid").dataSource._filter==undefined) $("#grid").data("kendoGrid").dataSource._filter = {logic: "and", filters: []};

        var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;

        if(event.currentTarget.tagName=="INPUT") {
            var old_word = "";
            var now_word = e.sender.element.closest("div").find("input")[0].value;
            if(getObjects($("#grid").data("kendoGrid").dataSource._filter.filters, "field", e.sender.element[0].id)[0]) {
                var old_word = getObjects($("#grid").data("kendoGrid").dataSource._filter.filters, "field", e.sender.element[0].id)[0].value;
            }
            if(now_word==old_word) return false;
        }

        var searchFilter = this.element[0].id;

        
        var obj2 = obj.find(fruit => fruit.field === searchFilter);
        if(obj2) {
            jQuery(obj).each(function (index){
                if(obj[index]) {
                    if(obj[index].field == searchFilter){
                        obj.splice(index, 1);
                    }
                }
            });
        }
        if(getObjects(obj, "field", searchFilter).length==0) {
            obj.push({ operator: this.element.val(), value: $("#"+replaceAll(searchFilter,"toolbarSel_","toolbarTxt_")).val(), field: searchFilter });
        }
        $("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter = JSON.stringify(obj);
        if(getUrlParameter("ChkOnlySum")=="1") {
            $("a#btn_reload").click();
            return false;
        } else {
            $("#grid").data("kendoGrid").dataSource.read();
        }
    }
});
$("#toolbarTxt_{searchLikeField}").blur( function() {
    $("#toolbarSel_{searchLikeField}").data("kendoDropDownList").trigger("change");
});
';

        $toolbar_searchBetweenField_kendoDropDownList = '
$("#toolbarSel_{searchBetweenField}").change( function(e) {
    if($(this).attr("onair")=="Y") return false;
    $(this).attr("onair","Y");
    setTimeout( function(p_this) {
        $(p_this).attr("onair","");
    },100,this);


    if($(event.currentTarget).attr("data-role")=="datepicker") {
        event.currentTarget.value = date10(event.currentTarget.value);
    }
    if($("#grid").data("kendoGrid").dataSource._filter==undefined) $("#grid").data("kendoGrid").dataSource._filter = {logic: "and", filters: []};

    var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;
    var searchFilter = this.id;
    
    var obj2 = obj.find(fruit => fruit.field === searchFilter);
    if(obj2) {
        jQuery(obj).each(function (index){
            if(obj[index]) {
                if(obj[index].field == searchFilter){
                    obj.splice(index, 1);
                    if(obj[index].field == searchFilter){
                        obj.splice(index, 1);
                    }
                }
            }
        });
    }
    if(getObjects(getObjects(obj, "field", searchFilter), "operator", "gte").length==0) {
        obj.push({ operator: "gte", value: this.value, field: searchFilter });
    }
    if(getObjects(getObjects(obj, "field", searchFilter), "operator", "lte").length==0) {
        obj.push({ operator: "lte", value: $("#"+this.id+"_end")[0].value, field: searchFilter });
    }
    $("#grid").data("kendoGrid").dataSource.transport.options.read.data.allFilter = JSON.stringify(obj);

});
$("#toolbarSel_{searchBetweenField}").blur( function() {
    $("#toolbarSel_{searchBetweenField}").trigger("change");
});
$("#toolbarSel_{searchBetweenField}_end").blur( function() {
    $("#toolbarSel_{searchBetweenField}").trigger("change");
});
$("a#btn_search_{searchBetweenField}").click( function() {
    if(getUrlParameter("ChkOnlySum")=="1") {
        $("a#btn_reload").click();
        return false;
    } else {
        $("#grid").data("kendoGrid").dataSource.read();
    }
});
';

        $toolbar_searchField_kendoDropDownList_all = '';

        $result = allreturnSql($strsql);

        $mm = 0;
        $cnt_viewListCol = 0;
        $cnt_viewListColB = 0;

        /*
        $mobileCell = '
        <div class="@widthClass">
            <strong>@title</strong>
            <p class="col-template-val">#=data.@alias#&nbsp;</p>
        </div>
        ';
        */

        $mobileList = '';
        $templateCheckbox_write = '';
        $dataSource_aggregate = '';
        $aliasNameAll = ';';
        $key_aliasName = '';
        $mobileCell_index = -1;
        $idx_FullFieldName = '';


        if (function_exists('misMenuList_change') && $helpbox == '') {

            misMenuList_change();
        }
        $read_only_condition = '';

        $cnt_result = count($result);
        while ($mm < $cnt_result) {

            $closeColumns = '';
            $script_columns = '';
            //print_r($mm . ':' . $result[$mm]['Grid_Align']); 
            $Grid_Schema_Type = $result[$mm]['Grid_Schema_Type'];

            if ($table_m == '') {

                $Grid_Schema_Type = '';

                //if($BodyType!='only_one_list' && $BodyType!='simplelist') $BodyType = $result[$mm]['g01'];
        
                if ($recently != '')
                    $Anti_SortWrite = iif($recently == 'Y', 'N', 'Y');        //최근순거부
                else {
                    $Anti_SortWrite = iif($result[$mm]['g03'] == 'Y', 'Y', 'N');           //최근순거부
                }

                $read_only_condition = Trim($result[$mm]['g04']);          //읽기전용조건
                $brief_insertsql = $result[$mm]['g05'];          //간편추가쿼리
        
                $Read_Only = $result[$mm]['g07'];          //읽기전용
        
                $table_m = $result[$mm]['g08'];          //테이블명
                $excel_where = $result[$mm]['g09'];          //기본필터
                $excel_where_ori = $excel_where;
                $useflag_sql = $result[$mm]['g10'];           //use조건
                $delflag_sql = $result[$mm]['g11'];           //삭제쿼리
                $isThisChild = $result[$mm]['g12'];           //아들여부
                $pro_dbalias = $result[$mm]['pro_dbalias'];
                if ($MisSession_IsAdmin == 'Y' && $helpbox == '')
                    $spreadsheets_url = $result[$mm]['spreadsheets_url'];  //admin 권한일때만 노출
        
                if ($useflag_sql == '') {
                    $where_sql = $where_sql . " and table_m.useflag='1'\n";
                } else {
                    $where_sql = $where_sql . " and $useflag_sql \n";
                }
                if ($excel_where != '') {
                    $excel_where = str_replace('@MisSession_UserID', $MisSession_UserID, $excel_where);
                    $excel_where = str_replace('@RealPid', $RealPid, $excel_where);
                }
                if ($isAuthW == 'N') {
                    $brief_insertsql = '';
                }
            }

            $Grid_Columns_Title = $result[$mm]['Grid_Columns_Title'];
            //$Grid_Columns_Title = str_replace('_',' ',str_replace(':','',$Grid_Columns_Title));
            $Grid_Columns_Title = str_replace(':', '', $Grid_Columns_Title);

            $Grid_FormGroup = $result[$mm]['Grid_FormGroup'];
            $Grid_Columns_Width = $result[$mm]['Grid_Columns_Width'];
            /*
            if($Grid_Columns_Width==-1 && InStr($Grid_Columns_Title,',')>0) {
                $Grid_Columns_Title = str_replace(',', '__',$Grid_Columns_Title);
            }
            */

            $Grid_Align = $result[$mm]['Grid_Align'];
            $Grid_Orderby = $result[$mm]['Grid_Orderby'];
            $Grid_MaxLength = $result[$mm]['Grid_MaxLength'];
            $Grid_PrimeKey = $result[$mm]['Grid_PrimeKey'];
            $Grid_Default = $result[$mm]['Grid_Default'];
            $Grid_Select_Tname = $result[$mm]['Grid_Select_Tname'];
            $Grid_Select_Field = $result[$mm]['Grid_Select_Field'];
            $Grid_ListEdit = $result[$mm]['Grid_ListEdit'];

            if ($result[$mm]['Grid_CtlName'] == 'radio')
                $result[$mm]['Grid_CtlName'] = 'dropdownitem';
            $Grid_CtlName = $result[$mm]['Grid_CtlName'];

            if (Left($Grid_MaxLength, 1) == '-') {
                $Grid_MaxLength = '';
                $Grid_ListEdit = '';
            } else if (Left(arrayValue($result, $mm + 1, "Grid_MaxLength"), 1) == '-' && arrayValue($result, $mm + 1, "Grid_CtlName") == 'dropdownlist') {
                $result[$mm + 1]['Grid_MaxLength'] = '';
                $result[$mm + 1]['Grid_ListEdit'] = '';
            }
            $Grid_Items = $result[$mm]['Grid_Items'];



            //if($Grid_CtlName=='attach') $Grid_Select_Field = $Grid_Select_Field . '_timename';
            //else 
        
            if ($Grid_CtlName == 'textencrypt') {
                $Grid_Select_Tname = '';
                $Grid_Select_Field = "'[암호화]'";
            } else if ($Grid_CtlName == 'datepicker' && $Grid_Schema_Type == '') {
                $Grid_Schema_Type = 'date';
            }
            /*
            목록붙여넣기 테스트
                if($Grid_CtlName!='' && $Grid_CtlName!="textencrypt" && $Grid_CtlName!="attach") {
                    $Grid_CtlName = "text";
                }
            */
            $aliasName = $result[$mm]['aliasName'];


            if ($Grid_Select_Tname == 'table_m') {
                $FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
            } else if ($Grid_Select_Tname != '') {
                $FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
            } else if (InStr($Grid_Select_Field, ' ') + InStr($Grid_Select_Field, "'") + InStr($Grid_Select_Field, '(') == 0) {
                $FullFieldName = $Grid_Select_Field;
            } else {
                $FullFieldName = $Grid_Select_Field;
            }





            if ($mm == 0 && $Grid_Columns_Width != -1) {
                $idx_FullFieldName = $FullFieldName;
                $key_aliasName = $aliasName;
                $key_mm = $mm;
            } else if ($mm == 1 && $idx_FullFieldName == '') {
                $idx_FullFieldName = $FullFieldName;
                $key_aliasName = $aliasName;
                $parent_alias = $aliasName;
                //$child_field = $Grid_Select_Field;
                $key_mm = $mm;
            }
            $Grid_Templete = $result[$mm]['Grid_Templete'];


            if ($helpbox == '' && $lite != 'Y' && ($BodyType == 'only_one_list' || requestVB('recently_view') == 'Y') && $idx_FullFieldName != '' && requestVB('isAddURL') != 'Y') {
                $move_list = allreturnSql_gate(list_top1_query(), $pro_dbalias);
                //print_r($move_list);        echo $key_aliasName;exit;
                if (count($move_list) > 0)
                    $move_idx = $move_list[0][$key_aliasName];
                else
                    $move_idx = '';

                $url = 'index.php?' . $ServerVariables_QUERY_STRING;
                //echo $url;echo "-------
                //" . $move_idx;exit;
                if ($move_idx != '' && $move_idx != '0') {
                    if ($Read_Only != 'Y' && ($isAuthW == 'Y' || $MisSession_IsAdmin == 'Y')) {
                        $url = $url . '&ActionFlag=modify&idx=' . $move_idx;
                    } else {
                        $url = $url . '&ActionFlag=view&idx=' . $move_idx;
                    }
                } else {
                    $url = $url . '&ActionFlag=write&idx=0';
                }
                if ($index_main_YN == 'Y') {
                    $url = replace($url, 'index.php', 'index_main.php');
                }

                re_direct($url);

                /*
                if($MS_MJ_MY=='MY') {
                    if($parent_idx!='') { 
                        $sql = "select $idx_FullFieldName from $table_m table_m $join_sql $where_sql $excel_where and " . $result[1]['Grid_Select_Field'] . "='$parent_idx' order by $idx_FullFieldName desc limit 1;";
                    } else {
                        $sql = "select $idx_FullFieldName from $table_m table_m $join_sql $where_sql $excel_where order by $idx_FullFieldName desc limit 1;";
                    }        
                } else {
                    if($parent_idx!='') { 
                        $sql = "select top 1 $idx_FullFieldName from $table_m table_m $join_sql $where_sql $excel_where and " . $result[1]['Grid_Select_Field'] . "='$parent_idx' order by $idx_FullFieldName desc ";
                    } else {
                        $sql = "select top 1 $idx_FullFieldName from $table_m table_m $join_sql $where_sql $excel_where order by $idx_FullFieldName desc ";
                    }        
                }
                $idx_FullFieldName2 = onlyOnereturnSql($sql);
                //echo $sql;exit;
                if($idx_FullFieldName2!='') {
                    if($isAuthW=='N') re_direct('index.php?' . $ServerVariables_QUERY_STRING . '&ActionFlag=view&idx=' . $idx_FullFieldName2);
                    else re_direct('index.php?' . $ServerVariables_QUERY_STRING . '&ActionFlag=modify&idx=' . $idx_FullFieldName2);
                } else re_direct('index.php?' . $ServerVariables_QUERY_STRING . '&ActionFlag=write&idx=0');

                exit;
                */
            }

            if ($BodyType == 'list_template') {
                $Grid_Columns_Width = 0;
                if ($key_aliasName != '') {
                    ++$mobileCell_index;
                    if ($mobileCell_index == 1) {
                        $Grid_Columns_Width = 50;
                        $Grid_ListEdit = 'Y';
                        $Grid_Align = '';
                    }
                }
            }

            $Grid_GroupCompute = $result[$mm]['Grid_GroupCompute'];
            $Grid_IsHandle = $result[$mm]['Grid_IsHandle'];
            $Grid_Schema_Validation = $result[$mm]['Grid_Schema_Validation'];

            //zipcode, code, pc, mobile 등일 경우임.
            if ($Grid_Schema_Validation != '' && Left($Grid_Schema_Validation, 1) != '"') {
                $Grid_Schema_Validation = 'Grid_Schema_Validation:"' . $Grid_Schema_Validation . '"';
            }
            $Grid_Alim = $result[$mm]['Grid_Alim'];
            $Grid_Pil = $result[$mm]['Grid_Pil'];
            $grid_schema_format = '';

            if ($Grid_Schema_Type == '' || $Grid_Schema_Type == 'html')
                $Grid_Schema_Type = 'string';
            else if (InStr($Grid_Schema_Type, '^^') > 0) {
                $grid_schema_format = explode('^^', $Grid_Schema_Type)[1];
                $Grid_Schema_Type = explode('^^', $Grid_Schema_Type)[0];
            }

            if ($Grid_Select_Tname == 'table_m') {
                $FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
            } else if ($Grid_Select_Tname != '') {
                $FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
            } else {
                $Grid_Select_Field = str_replace('@MisSession_UserID', $MisSession_UserID, $Grid_Select_Field);
                $Grid_Select_Field = str_replace('@RealPid', $RealPid, $Grid_Select_Field);
                $FullFieldName = $Grid_Select_Field;
            }


            if ($Grid_GroupCompute != '') {
                $Grid_GroupCompute = str_replace('@MisSession_UserID', $MisSession_UserID, $Grid_GroupCompute);
                $Grid_GroupCompute = str_replace('@RealPid', $RealPid, $Grid_GroupCompute);
                $join_sql = $join_sql . 'left outer join ' . $Grid_GroupCompute . "\n";
            }

            if ($Grid_PrimeKey != '') {
                $Grid_PrimeKey = str_replace('@MisSession_UserID', $MisSession_UserID, $Grid_PrimeKey);
                $Grid_PrimeKey = str_replace('@RealPid', $RealPid, $Grid_PrimeKey);
                $temp1 = explode('#', $Grid_PrimeKey);
                $join_sql = $join_sql . 'left outer join ' . $temp1[1] . ' ' . $pre_Grid_Select_Tname . ' on ' . $pre_Grid_Select_Tname . '.'
                    . $temp1[3] . ' = ' . $Grid_Select_Tname . '.' . $Grid_Select_Field . "\n";

                if (count($temp1) >= 5) {
                    if (InStr($temp1[4], '@outer_tbname') > 0) {
                        $join_sql = $join_sql . ' and (' . str_replace('@outer_tbname', $pre_Grid_Select_Tname, $temp1[4]) . ')' . "\n";
                    } else {
                        $join_sql = $join_sql . ' and ' . $pre_Grid_Select_Tname . '.' . $temp1[4] . '\n';
                    }
                }
                //echo $join_sql;
        
                if ($Grid_MaxLength != '') {
                    if ($MS_MJ_MY == 'MY') {
                        $temp2 = "select concat(" . $temp1[0] . ",' | '," . $temp1[3] . ") as codename from " . $temp1[1] . " as " . $pre_Grid_Select_Tname;
                    } else {
                        $temp2 = "select " . $temp1[0] . "+' | '+" . $temp1[3] . " as codename from " . $temp1[1] . " as " . $pre_Grid_Select_Tname;
                    }
                    if (count($temp1) >= 5) {
                        if (InStr($temp1[4], '@outer_tbname') > 0) {
                            $temp2 = $temp2 . ' where (' . str_replace('@outer_tbname', $pre_Grid_Select_Tname, $temp1[4]) . ')';
                        } else {
                            $temp2 = $temp2 . ' where ' . $pre_Grid_Select_Tname . '.' . $temp1[4];
                        }
                    }
                    $json_codeSelect[$pre_aliasName] = $temp2;
                    //kname#MisCommonTable#1#kcode#gcode='speedmis000338'
                }
            }
            //{field:'MenuName '',dir:'asc'},{field:'dir:'desc'},{field:'AutoGubun',dir:'desc'}
            if ($orderby != '') {
                $dataSource_sort = '{field:"' . str_replace(' desc,', '"{comma}dir:"desc"}{comma}{field:"', $orderby);
                $dataSource_sort = str_replace(',', '"{comma}dir:"asc"},{field:"', $dataSource_sort);
                if (Right($dataSource_sort, 5) == ' desc')
                    $dataSource_sort = str_replace(' desc', '"{comma}dir:"desc"}', $dataSource_sort);
                else
                    $dataSource_sort = $dataSource_sort . '"{comma}dir:"asc"}';

                $dataSource_sort = str_replace('{comma}', ',', $dataSource_sort);
            } else {
                if ($Grid_Orderby == '1a') {
                    $dataSource_sort = '{field:"' . $aliasName . '",dir:"asc"},' . $dataSource_sort;
                } else if ($Grid_Orderby == '1d') {
                    $dataSource_sort = '{field:"' . $aliasName . '",dir:"desc"},' . $dataSource_sort;
                } else if ($Grid_Orderby == '2a') {
                    $dataSource_sort = $dataSource_sort . '{field:"' . $aliasName . '",dir:"asc"},';
                } else if ($Grid_Orderby == '2d') {
                    $dataSource_sort = $dataSource_sort . '{field:"' . $aliasName . '",dir:"desc"},';
                }
            }
            //echo $Grid_Schema_Type;
//exit;
        




            //if($mm==0 || $Grid_Columns_Width >= -1 || $Grid_Columns_Width < -1) {
            ++$cnt_viewListCol;







            //datetime 일때만 string 로.
            if ($ChkOnlySum == '2') {
                if ($key_aliasName == $aliasName) {
                    if ($mm == 0)
                        $schema_fields = $aliasName . ': { type: "number" },';
                    else
                        $schema_fields = $aliasName . ': { type: "string" },';
                } else if (Left($Grid_Schema_Type, 6) == 'number') {
                    $schema_fields = $aliasName . ': { type: "number" },';
                } else if ($orderby != '') {
                    if (InStr(',' . str_replace(' desc', '', $orderby) . ',', ',' . $aliasName . ',') > 0) {
                        $schema_fields = $aliasName . ': { type: "string" },';
                        if ($Grid_Columns_Width == -1 || $Grid_Columns_Width == -2 || $Grid_Columns_Width == 0) {
                            if (InStr(',' . $aliasName . ',', ',' . $aliasName . ',') > 0) {
                                $Grid_Columns_Width = 12;
                            }
                        }
                    } else {
                        $schema_fields = $aliasName . ': { type: "string" },';
                    }
                } else {
                    if (InStr(';1a;1d;2a;2d;', ';' . $Grid_Orderby . ';') > 0) {
                        $schema_fields = $aliasName . ': { type: "string" },';
                    } else {
                        $schema_fields = $aliasName . ': { type: "string" },';
                    }
                }
            } else if (Left($Grid_Schema_Type, 4) != 'date')
                $schema_fields = $aliasName . ': { type: "' . $Grid_Schema_Type . '" },';
            else
                $schema_fields = $aliasName . ': { type: "string" },';
            //$schema_fields = $aliasName . ': { type: "' . $Grid_Schema_Type . '" },';
        
            //테스트용
            //if($mm>=2 && $mm<=10) { $Grid_Columns_Width = 0; $Grid_IsHandle = "s"; }
        




            if (InStr($Grid_Columns_Title, ',') > 0) {
                if (Left($Grid_Columns_Title, 1) != ',') {
                    $script_columns = '{ title: "' . explode(',', $Grid_Columns_Title)[0] . '", columns: [' . $script_columns;
                }
                if (count($result) <= $mm + 1)
                    $closeColumns = ']},';
                else if (Left($result[$mm + 1]['Grid_Columns_Title'], 1) != ',') {
                    $closeColumns = ']},';
                }
                $Grid_Columns_Title = explode(',', $Grid_Columns_Title)[1];
            }
            /* 반응형 포기 
            $script_columns = $script_columns . '{ field: "' . $aliasName . '", title: "' . $Grid_Columns_Title . '", media: "(min-width: 511px)" },';
            */
            /* 반응형 포기2 
            if($isMobile=="N") $script_columns = $script_columns . '{ field: "' . $aliasName . '", title: "' . $Grid_Columns_Title . '" },';
            else {
                if($cnt_viewListCol<=3) 
                    $script_columns = $script_columns . '{ field: "' . $aliasName . '", title: "' . $Grid_Columns_Title . '" },';
                else if($cnt_viewListCol<=9) 
                    $script_columns = $script_columns . '{ field: "' . $aliasName . '", title: "' . $Grid_Columns_Title . '", media: "(min-width: ' . (511 + ($cnt_viewListCol-4)*100) . 'px)" },';
                else $script_columns = $script_columns . '{ field: "' . $aliasName . '", title: "' . $Grid_Columns_Title . '", media: "(min-width: 1024px)" },';
            }
            */
            $script_columns = $script_columns . '{ field: "' . $aliasName . '", title: "' . $Grid_Columns_Title . '" },';

            if ($Grid_Columns_Width == 0 || $Grid_Columns_Width == -2 || $Grid_Columns_Width == -1) {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", hidden: true', $script_columns);
            } else {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", width: ' . (14 + 8 * abs($Grid_Columns_Width)), $script_columns);
            }


            if ($Grid_CtlName == 'textarea' && $Grid_ListEdit != 'Y' || $Grid_CtlName == 'html') {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", attributes: { "class": "grid_td_textarea"}', $script_columns);
            } else if ($Grid_Align == "center" || $Grid_Align == "right") {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", attributes: { "class": "text-' . $Grid_Align . '"}', $script_columns);
            } else {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", attributes: { "class": ""}', $script_columns);
            }

            //format 대신 template 으로 해야 필터입력이 자유로움.
            if ($Grid_Schema_Type == "string" && $grid_schema_format != '') {
                //$("<input>").val("0294").kendoMaskedTextBox({mask: "00:00"}).data("kendoMaskedTextBox").value()
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: "#=$' . '(\"<input>\").val(' . $aliasName . ').kendoMaskedTextBox({mask: \"' . $grid_schema_format . '\"}).data(\"kendoMaskedTextBox\").value()#"', $script_columns);
            } else if ($Grid_Schema_Type == 'number') {
                if ($grid_schema_format == '')
                    $grid_schema_format = 'n0';
                if ($Grid_Align == '')
                    $script_columns = str_replace('attributes: { "class": ""}', 'attributes: { "class": "text-right"}', $script_columns);
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: "#=kendo.toString(1*' . $aliasName . ', \"' . str_replace('#', '\"+String.fromCharCode(35)+\"', $grid_schema_format) . '\" )#"', $script_columns);
            } else if ($Grid_CtlName == "timepicker") {
                if ($grid_schema_format == '')
                    $grid_schema_format = 'HH:mm';
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: "#=kendoDate_toString(new Date(\"2000-01-01 \"+' . $aliasName . '), \"' . $grid_schema_format . '\" )#"', $script_columns);
            } else if ($Grid_Schema_Type == 'datetime') {
                if ($grid_schema_format == '')
                    $grid_schema_format = 'yyyy-MM-dd HH:mm';
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: "#=kendoDate_toString(new Date(' . $aliasName . '), \"' . $grid_schema_format . '\" )#"', $script_columns);
            } else if ($Grid_Schema_Type == 'date') {
                if ($grid_schema_format == '')
                    $grid_schema_format = 'yyyy-MM-dd';
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: "#=kendoDate_toString(new Date(' . $aliasName . '), \"' . $grid_schema_format . '\" )#"', $script_columns);
            }

            if ($Grid_ListEdit == 'Y') {

                if ($Grid_CtlName == 'dropdownlist') {
                    $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", editable: false', $schema_fields);
                    if (InStr($Grid_PrimeKey, '!') > 0) {
                        $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", group: { field: "group_item" }', $schema_fields);
                    }
                } else if ($isAuthW == 'Y') {
                    $script_columns = str_replace('"class": "', '"class": "editorStyle ', $script_columns);
                }

                if ($mobileCell_index == 1) {
                    $script_columns = str_replace('editorStyle ', '', str_replace('title: "' . $Grid_Columns_Title . '"', 'title: "주요내용"', str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: function(dataItem) { tag = $("#list-mobile-template").html(); return templeteReplace(tag, dataItem); }', $script_columns)));
                    $Grid_ListEdit = '';
                    $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", editable: false', $schema_fields);
                } else if ($Grid_CtlName == 'attach') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", default: "' . $Grid_Default . '", maxLength: "' . $Grid_MaxLength . '", schema_validation: "' . str_replace('"', '\"', $Grid_Schema_Validation) . '"', $script_columns);
                    $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", editable: false', $schema_fields);
                    $rowFunctionAfter = $rowFunctionAfter . str_replace('{thisAlias}', $aliasName, $upload_rowFunctionAfter_script);
                } else if ($Grid_CtlName == 'text' && $Grid_Schema_Type == "string" && $grid_schema_format != '') {
                    //if($grid_schema_format=='') $grid_schema_format = "yyyy-MM-dd";
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsMaskedTextBox', $script_columns);
                } else if ($Grid_CtlName == 'datepicker' || $Grid_CtlName == "text" && $Grid_Schema_Type == "date") {
                    //if($grid_schema_format=='') $grid_schema_format = "yyyy-MM-dd";
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsDatePicker', $script_columns);
                } else if ($Grid_CtlName == 'text') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsAutoCompleteEditor, maxLength: "' . $Grid_MaxLength . '"', $script_columns);
                } else if ($Grid_CtlName == 'timepicker') {
                    //if($grid_schema_format=='') $grid_schema_format = "HH:mm";
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsTimePicker', $script_columns);
                } else if ($Grid_CtlName == 'datetimepicker') {
                    //if($grid_schema_format=='') $grid_schema_format = "yyyy-MM-dd HH:mm";
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsDateTimePicker', $script_columns);
                } else if ($Grid_CtlName == 'dropdownitem') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", Grid_Items: "' . str_replace('"', '\"', $Grid_Items) . '", editor: columnsDropDownItemEditor', $script_columns);
                    if (InStr($script_columns, '"class": "editorStyle ') == 0 && $isAuthW == 'Y') {
                        $script_columns = str_replace('"class": "', '"class": "editorStyle ', $script_columns);
                    }
                } else if ($Grid_CtlName == 'multiselect') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'Grid_Items: "' . str_replace('"', '\"', $Grid_Items) . '", field: "' . $aliasName . '", editor: columnsMultiSelectEditor', $script_columns);
                    if (InStr($script_columns, '"class": "editorStyle ') == 0 && $isAuthW == 'Y') {
                        $script_columns = str_replace('"class": "', '"class": "editorStyle ', $script_columns);
                    }
                } else if ($Grid_CtlName == 'dropdowntree') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'Grid_Items: "' . str_replace('"', '\"', $Grid_Items) . '", field: "' . $aliasName . '", editor: columnsDropDownTreeEditor', $script_columns);
                    if (InStr($script_columns, '"class": "editorStyle ') == 0 && $isAuthW == 'Y') {
                        $script_columns = str_replace('"class": "', '"class": "editorStyle ', $script_columns);
                    }
                } else if ($Grid_CtlName == 'textarea') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsTextareaEditor, maxLength: "' . $Grid_MaxLength . '"', $script_columns);
                } else if ($Grid_CtlName == 'check') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: kendo.template($("#templateCheckbox_' . $aliasName . '").html())', $script_columns);

                    $templateCheckbox_write = $templateCheckbox_write .
                        '$("body").after(replaceAll(txt_templateCheckbox.value,"{aliasName}","' . $aliasName . '"));
';
                    $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "string", editable: false', $schema_fields);
                }



            } else if (arrayValue($result, $mm + 1, "Grid_ListEdit") == 'Y' && arrayValue($result, $mm + 1, "Grid_CtlName") == 'dropdownlist') {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsDropDownListEditor', $script_columns);
                if ($isAuthW == 'Y') {
                    $script_columns = str_replace('"class": "', '"class": "editorStyle ' . iif(InStr(arrayValue($result, $mm + 1, 'Grid_Schema_Validation'), '"helplist"') > 0, 'k-icon k-i-check ', ''), $script_columns);
                }
                //Grid_Schema_Validation 는 코드width=0 을 대비하여 추가해놓음.
                $Grid_Schema_Validation2 = arrayValue($result, $mm + 1, 'Grid_Schema_Validation');
                if ($Grid_Schema_Validation2 != '') {
                    if ($Grid_Schema_Validation2 != '' && Left($Grid_Schema_Validation2, 1) != '"') {
                        $Grid_Schema_Validation2 = 'Grid_Schema_Validation:"' . $Grid_Schema_Validation2 . '"';
                    }
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", ' . $Grid_Schema_Validation2, $script_columns);
                }
            } else if ($Grid_CtlName == "attach") {
                $script_columns = str_replace('"class": "', '"class": "editorStyle readOnlyAttach ', $script_columns);
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", default: "' . $Grid_Default . '", maxLength: "' . $Grid_MaxLength . '", schema_validation: "' . str_replace('"', '\"', $Grid_Schema_Validation) . '"', $script_columns);
                $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", editable: false', $schema_fields);
                $rowFunctionAfter = $rowFunctionAfter . str_replace('{thisAlias}', $aliasName, $upload_rowFunctionAfter_script);

            } else if ($Grid_CtlName == 'html') {
                //'data-bind="text:', 'data-bind="html:'
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: function(dataItem) { return $("<div>"+dataItem.' . $aliasName . '+"</div>")[0].innerText } ', $script_columns);
                $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", editable: false', $schema_fields);
            } else if ($Grid_CtlName == 'textarea' && $Grid_Columns_Width != 0 && $Grid_Columns_Width != -2 && $Grid_Columns_Width != -1) {
                //'data-bind="text:', 'data-bind="html:'
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: function(dataItem) { return "<div class=\"td_div\">"+dataItem["' . $aliasName . '"]+"</div>" } ', $script_columns);
                $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", editable: false', $schema_fields);
            } else {
                $schema_fields = str_replace('type: "', 'editable: false, type: "', $schema_fields);
            }
            $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", Grid_Schema_Type: "' . $Grid_Schema_Type . '"', $script_columns);

            if ($Grid_CtlName != 'attach' && $Grid_Schema_Validation != '') {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", ' . $Grid_Schema_Validation, $script_columns);
            }
            if ($Grid_Select_Tname == 'virtual_field' || Left($Grid_Select_Field, 1) == "'" || is_numeric(Left($Grid_Select_Field, 1))) {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", sortable: false', $script_columns);
            }

            if ($Grid_Templete == 'Y') {
                $script_columns = str_replace(', template: "#=kendo', ', columns_format: "#=kendo', $script_columns);
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: function(dataItem) { 
                ct = columns_templete(dataItem,"' . $aliasName . '"); 
                if(ct==null) {
                    ct = "";
                } 
                if(ct==dataItem["' . $aliasName . '"]) {
                    ct = columns_format(dataItem, "' . $aliasName . '");
                }
                return ct; 
            }', $script_columns);
            }

            if ($Grid_CtlName != '') {
                $script_columns = str_replace('"class": "', '"class": "ctl_' . $Grid_CtlName . ' ', $script_columns);
            }

            if ($aliasName == $key_aliasName || $Grid_Columns_Width >= 1 || $Grid_Columns_Width < -2) {
                if ($ChkOnlySum == '1') {
                    if ($Grid_Orderby == 'c') {
                        $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", aggregates: ["count"], footerTemplate: "#=count#건", groupHeaderTemplate: "Count: #=count#"', $script_columns);
                        if ($dataSource_aggregate != '')
                            $dataSource_aggregate = $dataSource_aggregate . ",";
                        $dataSource_aggregate = $dataSource_aggregate . '{ field: "' . $aliasName . '", aggregate: "count" }';
                    } else if ($Grid_Schema_Type == 'number') {
                        $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", aggregates: ["sum"], footerTemplate: "#=kendo_format_n(sum,0)#", groupHeaderTemplate: "#=kendo_format_n(sum,0)#"', $script_columns);
                        if ($dataSource_aggregate != '')
                            $dataSource_aggregate = $dataSource_aggregate . ",";
                        $dataSource_aggregate = $dataSource_aggregate . '{ field: "' . $aliasName . '", aggregate: "sum" }';
                    } else {
                        $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", aggregates: ["count"], footerTemplate: function(e){ return footerCount(e, "' . $aliasName . '"); }, groupHeaderTemplate: "' . $Grid_Columns_Title . ': #=value#, Count: #=count#"', $script_columns);
                        if ($dataSource_aggregate != '')
                            $dataSource_aggregate = $dataSource_aggregate . ",";
                        $dataSource_aggregate = $dataSource_aggregate . '{ field: "' . $aliasName . '", aggregate: "count" }';
                    }
                } else if ($ChkOnlySum == '2') {
                    if ($mm == $key_mm) {
                        $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", aggregates: ["count"], footerTemplate: function(e){ return footerCount(e, "' . $aliasName . '"); }, groupHeaderTemplate: "' . $Grid_Columns_Title . ': #=value#, Count: #=count#"', $script_columns);
                        if ($dataSource_aggregate != '')
                            $dataSource_aggregate = $dataSource_aggregate . ",";
                        $dataSource_aggregate = $dataSource_aggregate . '{ field: "' . $aliasName . '", aggregate: "count" }';
                    } else if ($Grid_Schema_Type == 'number') {
                        $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", aggregates: ["sum"], footerTemplate: "#=kendo_format_n(sum,0)#", groupHeaderTemplate: "#=kendo_format_n(sum,0)#"', $script_columns);
                        if ($dataSource_aggregate != '')
                            $dataSource_aggregate = $dataSource_aggregate . ",";
                        $dataSource_aggregate = $dataSource_aggregate . '{ field: "' . $aliasName . '", aggregate: "sum" }';
                    }
                }
            }

            if ($mm == 0) {
                if ($Grid_Columns_Width == 0 || $Grid_Columns_Width == -2 || $Grid_Columns_Width == -1) {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", hidden: true', $script_columns);
                }

                $script_columns = $script_columns . '
{ field: "_rowFunction()", hidden: true, title: "rowFunction" },';
            }

            $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", Grid_CtlName: "' . $Grid_CtlName . '"', $script_columns);


            if ($Grid_Columns_Width >= 1 || $Grid_Columns_Width < -2) {
                ++$cnt_viewListColB;
            }
            if ($cnt_viewListColB == 1) {

                if (InStr($script_columns, 'attributes:') == 0) {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", attributes: { "comment": ""}', $script_columns);
                } else {
                    $script_columns = str_replace('attributes: { ', 'attributes: { "comment": "Y", ', $script_columns);
                }

            }

            /*
                    if($cnt_viewListCol<=3 || count($result)-$mm<=7) {
                        $mobileList = $mobileList . str_replace(str_replace(str_replace($mobileCell, "@title", $Grid_Columns_Title), "@alias", $aliasName), "@widthClass", iif(abs($Grid_Columns_Width)>=20,"widthClassA","widthClassB"));
                    }
            */

            //} 
        
            if ($Grid_IsHandle == 's') {
                $toolbar_searchField_all = $toolbar_searchField_all . str_replace('{Grid_Columns_Title}', $Grid_Columns_Title, str_replace('{searchField}', $aliasName, $toolbar_searchField));

                //url 에 의한 필터링 초기값을 url 에 실음.
                if (InStr($allFilter, '"toolbar_' . $aliasName . '"') > 0) {
                    $searchValue = explode('"value":"', explode('"toolbar_' . $aliasName . '"', $allFilter)[0]);
                    $searchValue = explode('"', $searchValue[count($searchValue) - 1])[0];
                    $toolbar_searchField_kendoDropDownList = str_replace('{searchValue}', replace(replace($searchValue, '&', '@nd;'), '%', '@per;'), $toolbar_searchField_kendoDropDownList0);
                } else {
                    $toolbar_searchField_kendoDropDownList = str_replace('&selValue={searchValue}', '', $toolbar_searchField_kendoDropDownList0);
                }


                $toolbar_searchField_kendoDropDownList_all = $toolbar_searchField_kendoDropDownList_all . str_replace('{searchField}', $aliasName, $toolbar_searchField_kendoDropDownList);



            } else if ($Grid_IsHandle == 'm') {
                $toolbar_searchField_all = $toolbar_searchField_all . str_replace('{Grid_Columns_Title}', $Grid_Columns_Title, str_replace('{searchField}', $aliasName, $toolbar_searchField));

                //url 에 의한 필터링 초기값을 url 에 실음.
                if (InStr($allFilter, '"toolbar_' . $aliasName . '"') > 0) {
                    $searchValue = explode('"value":"', explode('"toolbar_' . $aliasName . '"', $allFilter)[0]);
                    $searchValue = explode('"', $searchValue[count($searchValue) - 1])[0];
                    $toolbar_searchField_kendoMultiSelect = str_replace('{searchValue}', replace(replace($searchValue, '&', '@nd;'), '%', '@per;'), $toolbar_searchField_kendoMultiSelect0);
                } else {
                    $toolbar_searchField_kendoMultiSelect = str_replace('&selValue={searchValue}', '', $toolbar_searchField_kendoMultiSelect0);
                }


                $toolbar_searchField_kendoDropDownList_all = $toolbar_searchField_kendoDropDownList_all . str_replace('{searchField}', $aliasName, $toolbar_searchField_kendoMultiSelect);



            } else if ($Grid_IsHandle == 't') {
                //echo ";Grid_Columns_Title=$Grid_Columns_Title;";
                $toolbar_searchField_all = $toolbar_searchField_all . str_replace('{Grid_Columns_Title}', $Grid_Columns_Title, str_replace('{searchLikeField}', $aliasName, $toolbar_searchLikeField));
                $toolbar_searchField_kendoDropDownList_all = $toolbar_searchField_kendoDropDownList_all . str_replace('{searchLikeField}', $aliasName, $toolbar_searchLikeField_kendoDropDownList);
            } else if ($Grid_IsHandle == 'w') {
                $toolbar_searchField_all = $toolbar_searchField_all . str_replace('{searchField}', $aliasName, str_replace('{Grid_Schema_Type}', $Grid_Schema_Type, str_replace('{Grid_Columns_Title}', $Grid_Columns_Title, str_replace('{searchBetweenField}', $aliasName, $toolbar_searchBetweenField))));
                $toolbar_searchField_kendoDropDownList_all = $toolbar_searchField_kendoDropDownList_all . str_replace('{searchBetweenField}', $aliasName, $toolbar_searchBetweenField_kendoDropDownList);
            }

            //if($Grid_Default!='' && $_GET["flag"]=="formAdd") {
            //    $defaultList[$aliasName] = str_replace("@date",date("Y-m-d"),str_replace("@RealPid",$RealPid,$Grid_Default));
            //}
        
            $speed_fieldIndx[$aliasName] = $FullFieldName;




            $pre_Grid_Select_Tname = $Grid_Select_Tname;
            $pre_aliasName = $aliasName;

            $schema_fieldsAll = $schema_fieldsAll . "\n" . $schema_fields;
            $script_columnsAll = $script_columnsAll . "\n" . $script_columns . $closeColumns;
            ++$mm;


            if ($BodyType == 'list_template') {
                if ($mobileCell_index == 1) {
                    //$BodyType = "simplelist";
                    break;
                }
            }
        }


        if ($read_only_condition != '') {
            $schema_fieldsAll = $schema_fieldsAll . "\n" . 'read_only_condition: { type: "boolean", editable: false },';
            $script_columnsAll = $script_columnsAll . "\n" . '{ field: "read_only_condition", hidden: true, title: "read_only_condition" }';
        }


        if ($jsonname != '' || $ChkOnlySum == '2')
            $BodyType = 'simplelist';


        if ($brief_insertsql != '') {
            $toolbar_searchField_all = $toolbar_searchField_all . $toolbar_brief_insertsql;
            ?>
            document.treatForm.nmBrief_insertsql.value = "<?php echo $brief_insertsql; ?>";
            <?php
        }

        $dataSource_sort = str_replace('dir:', '"dir":', str_replace('field:', '"field":', $dataSource_sort));

        if ($recently == 'Y' && $ChkOnlySum == '1') {
            if (InStr($dataSource_sort, ":\"$key_aliasName\"") > 0) {
                $dataSource_sort = str_replace("\"field\":\"$key_aliasName\",\"dir\":\"asc\"", "\"field\":\"$key_aliasName\",\"dir\":\"desc\"", $dataSource_sort);
            } else {
                $dataSource_sort = "{\"field\":\"$key_aliasName\",\"dir\":\"desc\"}," . $dataSource_sort;
            }
        }

        $dataSource_aggregate = str_replace('aggregate:', '"aggregate":', str_replace('field:', '"field":', $dataSource_aggregate));

        ?>
        key_aliasName = "<?php echo $key_aliasName; ?>";


        document.getElementById("key_aliasName").value = key_aliasName;
        document.getElementById("Anti_SortWrite").value = "<?= $Anti_SortWrite; ?>";


        var dataSource_aggregate = [<?php echo $dataSource_aggregate; ?>];


        var p_dataSource_sort = [<?php echo $dataSource_sort; ?>];
        var p_filter = <?php echo $p_filter; ?>;
        p_schema_fieldsAll = {
            <?php echo $schema_fieldsAll; ?>
    <?php if ($list_numbering == 'Y') { ?>
                                                                        rowNumber: { editable: false, type: "string" }
    <?php } ?>
        };

        if (getUrlParameter("ChkOnlySum") == '1' || getUrlParameter("ChkOnlySum") == '2' || getUrlParameter("group_field") != undefined || dataSource_aggregate.length > 0)
            groupable = true; else groupable = false;

        if (dataSource_aggregate.length > 0 && groupable) {
            <?php if ($group_field != '') { ?>
                p_group = [{
                    field: "<?php echo str_replace(' desc', '", dir: "desc"', str_replace(' asc', '", dir: "asc"', str_replace(',', ', aggregates:dataSource_aggregate }, { field: "', $group_field))); ?>, aggregates: dataSource_aggregate }];
    <?php } else { ?>
                                                                            p_group =[];
                <?php } ?>
    p_aggregate = dataSource_aggregate;
                document.getElementById("pageSizes").value = 1000000;
            } else {
                p_group =[];
                p_aggregate =[];
            }


p_columns = [
                <?php if ($list_numbering == 'Y') { ?>
                                                                                { field: "rowNumber", Grid_CtlName: "", attributes: { "class": "text-center" }, width: 55, title: "No." },
                <?php } ?>
    <?php if ($BodyType != 'simplelist' && $key_mm > -1) { ?>
    
                                                                            <?php if ($result[$key_mm]['Grid_Schema_Type'] == 'date' || $result[$key_mm]['Grid_Schema_Type'] == "datetime") { ?>
                                                                                                                                                    { selectable: true, width: "35px", headerAttributes: { "class": "selectableClass" }, attributes: { "class": "text-center", "keyIdx": "#=kendo.toString(<?php echo $key_aliasName; ?>,'yyyy-MM-dd')#" } },
                    <?php } else { ?>
                                                                                                                                                    { selectable: true, width: "35px", headerAttributes: { "class": "selectableClass" }, attributes: { "class": "text-center", "keyIdx": "#=<?php echo iif($ChkOnlySum == '2', 'rowNumber', $key_aliasName); ?>#" } },
                    <?php } ?>
<?php } else if ($key_mm > -1) { ?>
                                                                            <?php if ($result[$key_mm]['Grid_Schema_Type'] == 'date' || $result[$key_mm]['Grid_Schema_Type'] == "datetime") { ?>
                                                                                                                                                                                                                            { selectable: true, hidden: true, attributes: { "keyIdx": "#=kendo.toString(<?php echo $key_aliasName; ?>,'yyyy-MM-dd')#" } },
                    <?php } else { ?>
                                                                                                                                                                                                                            { selectable: true, hidden: true, attributes: { "keyIdx": "#=<?php echo iif($ChkOnlySum == '2', 'rowNumber', $key_aliasName); ?>#" } },
                    <?php } ?>
<?php } ?>

<?php echo $script_columnsAll; ?>

            ];

            //일괄편집창 등에서 2단 배열형태가 아닌 단순구성을 활용하기 위함.
            p_columns_1D = [

                <?php if ($BodyType != 'simplelist' && $key_mm > -1) { ?>

                                                                        <?php if ($result[$key_mm]['Grid_Schema_Type'] == 'date' || $result[$key_mm]['Grid_Schema_Type'] == "datetime") { ?>
                                                                                                                                                { selectable: true, width: "35px", headerAttributes: { "class": "selectableClass" }, attributes: { "class": "text-center", "keyIdx": "#=kendo.toString(<?php echo $key_aliasName; ?>,'yyyy-MM-dd')#" } },
                    <?php } else { ?>
                                                                                                                                                { selectable: true, width: "35px", headerAttributes: { "class": "selectableClass" }, attributes: { "class": "text-center", "keyIdx": "#=<?php echo iif($ChkOnlySum == '2', 'rowNumber', $key_aliasName); ?>#" } },
                    <?php } ?>
<?php } else if ($key_mm > -1) { ?>
                                                                        <?php if ($result[$key_mm]['Grid_Schema_Type'] == 'date' || $result[$key_mm]['Grid_Schema_Type'] == "datetime") { ?>
                                                                                                                                                                                                                        { selectable: true, hidden: true, attributes: { "keyIdx": "#=kendo.toString(<?php echo $key_aliasName; ?>,'yyyy-MM-dd')#" } },
                    <?php } else { ?>
                                                                                                                                                                                                                        { selectable: true, hidden: true, attributes: { "keyIdx": "#=<?php echo iif($ChkOnlySum == '2', 'rowNumber', $key_aliasName); ?>#" } },
                    <?php } ?>
<?php } ?>

<?php echo replace(replace($script_columnsAll, '", columns: [{ field: "', '", field: "'), '" },]},', '" },'); ?>

            ];

                <?php if ($ChkOnlySum == '1') { ?>
                                                                                            grid = grid_fun_ChkOnlySum(p_dataSource_sort, p_filter, p_group, p_schema_fieldsAll, p_columns);
                <?php } else { ?>
                                                                                            grid = grid_fun(p_dataSource_sort, p_filter, p_group, p_schema_fieldsAll, p_columns);
                <?php } ?>

<?php if ($lite == 'Y') { ?>
                                                                        } //lite=Y
    </script>



    <?php
    exit;
}
?>







if(grid) {

$("#grid").data("kendoGrid").dataSource.one("requestEnd", function () {
if(p_filter!="{}") {
//url 에 의한 필터링의 경우, 이상작동 필터를 초기에 한번 없앤다.
if($("input[data-text-field]").data("kendoAutoComplete")) {
$("input[data-text-field]").data("kendoAutoComplete").dataSource._filter = undefined;
}
}
/* 당분간 예의주시
if(typeof rowFunction == "function") {
setTimeout( function() {
$("#grid").data("kendoGrid").refresh();
},0);
}
*/
});


$(document.body).keydown(function(e) {
if (e.altKey && e.keyCode == 87) {
$("#grid").data("kendoGrid").table.focus();
}
});
}




if($("#toolbar").html()=='') {
$("#toolbar").kendoToolBar({
items: [
{ id: "btn_mMenu", icon: "k-icon k-i-menu", type: "button", togglable: true, overflow: "never" },
{ id: "btn_leftVibile", icon: "k-icon k-i-thumbnails-left", type: "button", overflow: "never" },
{ id: "btn_fullScreen", icon: "k-icon k-i-full-screen", type: "button", togglable: true, overflow: "never" },
{ id: "btn_recently", type: "button", text: "최근순", overflow: "never", togglable: true, selected:
<?php echo iif($Anti_SortWrite == "Y", "false", "true"); ?> },
{ id: "btn_reload", icon: "k-icon k-i-reload", type: "button", overflow: "never" },
<?php if ($isAuthW == "Y" && $isDeleteList != 'Y') { ?>
    { id: "btn_write", text: "입력", icon: "k-icon k-i-pencil", type: "button", overflow: "never" },
<?php } ?>


{
type: "buttonGroup",
buttons: [
<?php if ($MisSession_IsAdmin == "Y" && $isAuthW == "Y" && $isDeleteList != 'Y') { ?>
    { id: "btn_modify", group: "view", selected: getCookie("modify_YN")=="Y", togglable: true, attributes:{"title":"수정모드"},
    icon: "k-icon k-i-track-changes-enable", type: "button" },
    { id: "btn_view", group: "view", selected: getCookie("modify_YN")!="Y", togglable: true, attributes:{"title":"조회모드"},
    icon: "k-icon k-i-eye", type: "button" },
<?php } ?>
]
},
{ id: "btn_1", text: "", type: "button", overflow: "never" },
{ id: "btn_2", text: "", type: "button", overflow: "never" },
{ id: "btn_3", text: "", type: "button", overflow: "never" },
{ id: "btn_4", text: "", type: "button", overflow: "never" },
{ id: "btn_5", text: "", type: "button", overflow: "never" },



{ id: "btn_up", attributes:{"title":"이전"}, icon: "k-icon k-i-sort-asc-sm", type: "button" },
{ id: "btn_down", attributes:{"title":"다음"}, icon: "k-icon k-i-sort-desc-sm", type: "button" },
{ id: "btn_close", text: "닫기", icon: "k-icon k-i-close", type: "button" },
{ id: "btn_alert", icon: "k-icon k-i-question", type: "button" },
<?php if (InStr($schema_fieldsAll, 'lastupdate:') > 0) { ?>
    { id: "btn_recentlyU", text: "최근수정순", type: "button", overflow: "always" },
<?php } ?>
<?php if ($MisSession_IsAdmin == 'Y') { ?>
    <?php if ($isDeleteList == 'Y') { ?>
        <?php if ($BodyType != "simplelist") { ?>
            { id: "btn_restore", text: "복원", type: "button" },
            { id: "btn_kill", text: "완전삭제", icon: "k-icon k-i-delete", type: "button" },
        <?php } ?>
        { id: "btn_normalList", text: "정상목록조회", attributes: { title: "현재 삭제내역을 조회 중입니다." }, type: "button" },
    <?php } else if ($BodyType != "simplelist") { ?>
            { id: "btn_delete", text: "삭제", icon: "k-icon k-i-delete", type: "button" },
    <?php } ?>
<?php } ?>
{ id: "btn_menuView", text: "메뉴삽입", icon: "k-icon k-i-thumbnails-left", type: "button" },
<?php if ($toolbar_searchField_all != '')
    echo $toolbar_searchField_all; ?>
<?php if ($delflag_sql != '' && $MisSession_IsAdmin == 'Y') { ?>
    <?php if ($isDeleteList != 'Y') { ?>
        {
        id: "btn_deleteList",
        type: "button",
        text: "삭제내역 조회",
        overflow: "always"
        },
    <?php } ?>
<?php } ?>
<?php if ($isDeleteList != 'Y') { ?>
    {
    id: "btn_urlCopy",
    type: "button",
    text: "URL 복사",
    overflow: "always"
    },
<?php } ?>
{
id: "btn_alim",
type: "button",
text: "알림창",
overflow: "always"
},

{ id: "btn_reopen", text: "다시열기", type: "button", overflow: "always" },
{ id: "btn_newopen", text: "새창열기", type: "button", overflow: "always" },



<?php if ($ChkOnlySum == '1') { ?>
    { id: "btn_excel",
    type: "button",
    text: "saveAs Excel",
    overflow: "always"
    },
    { id: "btn_ChkOnlySum_end", text: "┌전체합계해제", type: "button", overflow: "always" },
    { id: "btn_ChkOnlySum2", text: "└정렬합계(빠름)", type: "button", overflow: "always" },
<?php } else if ($ChkOnlySum == "2") { ?>
        { id: "btn_excel",
        type: "button",
        text: "saveAs Excel",
        overflow: "always"
        },
        { id: "btn_ChkOnlySum1", text: "┌전체합계(느림)", type: "button", overflow: "always" },
        { id: "btn_ChkOnlySum_end", text: "└정렬합계해제", type: "button", overflow: "always" },
<?php } else { ?>
        { id: "btn_excel",
        type: "button",
        text: "┌saveAs Excel(xlsx)",
        overflow: "always"
        },
        { id: "btn_xls",
        type: "button",
        text: "└saveAs xls(빠름)",
        overflow: "always"
        },
        { id: "btn_ChkOnlySum1", text: "┌전체합계(느림)", type: "button", overflow: "always" },
        { id: "btn_ChkOnlySum2", text: "└정렬합계(빠름)", type: "button", overflow: "always" },
<?php } ?>

{ id: "btn_listprint", text: "목록 인쇄(saveAs pdf)", type: "button", overflow: "always" },
{ id: "btn_chart", text: "차트", type: "button", overflow: "always" },

<?php if ($MisSession_IsAdmin == 'Y') { ?>
    { id: "btn_listedit", text: "일괄 편집창", type: "button", overflow: "always" },
<?php } ?>
{ id: "btn_mConfig", type: "button", text: "설정", togglable: true },
{ id: "btn_menuName", text: "<?php echo replace($MenuName, "\"", "\\\""); ?>", attributes: { title: "<?php
     if ($MenuType == "13")
         echo "";
     else if ($MisSession_IsAdmin == "Y")
         echo "관리자 권한";
     else if ($isAuthW == "Y")
         echo "쓰기권한";
     else
         echo "읽기권한";
     ?>" }, type: "button", class: "info", overflow: "never" },

{ id: "btn_menuTitle", text: "<?php
if ($parent_idx != '') {
    echo onlyOnereturnSql("select MenuName from MisMenuList where idx='" . $parent_gubun . "'");
    echo "&nbsp;<span id=parent_idx>" . $parent_idx . "</span>&nbsp;에 대한 상세내역";
}
?>", attributes: { title: "상위프로그램의 기준항목값을 표시합니다." }, type: "button", class: "info", overflow: "never" },

<?php if ($help_title != '') { ?>
    { id: "btn_help",
    <?php if (Left($help_title, 10) == 'MIS_JOIN::') {
        $help_title = mb_substr($help_title, 10, 1000, 'UTF-8');
        ?>
        attributes: { misjoin: "Y" },
    <?php } ?>
    text: "Guide: <?php echo $help_title; ?>", type: "button", overflow: "never" },
<?php } ?>

<?php if ($isDeveloper != 'X' || $full_siteID == 'speedmis') { ?>
    { id: "btn_webSourceOpen", text: "해당 웹소스 열기", type: "button", overflow: "always" },
    <?php if ($isDeveloper != 'X') { ?>
        { id: "btn_designer", text: "해당 뷰디자이너", type: "button", overflow: "always" },
    <?php } ?>
<?php } ?>
<?php if ($MisSession_UserID == 'gadmin' || $MisSession_UserID == '방문고객') { ?>
    <?php if ($devQueryOn == 'N') { ?>
        { id: "btn_devQueryOn", text: "개발자 모드", type: "button", overflow: "always" },
    <?php } else { ?>
        { id: "btn_devQueryOff", text: "실사용 모드", type: "button", overflow: "always" },
    <?php } ?>
<?php } ?>


<?php if ($MisSession_IsAdmin == 'Y') { ?>
    {
    id: "btn_editHelp",
    type: "button",
    text: "도움말 작성",
    overflow: "always"
    },
<?php } ?>

{ id: "btn_menuRefresh", text: "메뉴새로고침", type: "button", overflow: "always" },
<?php if ($isDeveloper != 'X') { ?>
    { id: "btn_addMenu", text: "프로그램 추가", type: "button", overflow: "always" },
<?php } ?>
<?php if ($telegram_bot_token != '') { ?>
    { id: "btn_opinion", text: "관리자문의/불편신고", type: "button", overflow: "always" },
<?php } ?>
{ id: "btn_logout", text: "로그아웃", type: "button", overflow: "always" },
],
click: toolbar_onClick,
toggle: onToggle,
});
}

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

<?php echo $toolbar_searchField_kendoDropDownList_all; ?>



<?php if ($ChkOnlySum != '1') { ?>
    $("input[data-text-field]").focus( function() {
    var autocomplete = $(this).data("kendoAutoComplete");
    <?php if ($filter_autocomplete_stop == 'Y') { ?>
        autocomplete.unbind("dataBound");
        autocomplete.bind("open", function (e) {
        e.preventDefault();
        });
        return false;
    <?php } ?>
    autocomplete.bind("dataBound", autocomplete_dataBound_color);
    autocomplete.dataSource.transport.options.read.data.selField = $(this).attr("data-text-field");
    autocomplete.dataSource.transport.options.read.data.selValue = this.value;

    var p_this = this;
    aa = autocomplete.dataSource.options.transport.read.data.allFilter;
    if(aa=='' && getUrlParameter('allFilter')!=undefined && getUrlParameter('allFilter')!='') {
    aa = getUrlParameter('allFilter');
    }
    bb = [];
    v = $(p_this).val();

    if(aa!='') {
    JSON.parse(aa).forEach( function(a) {
    if(a.field.split('toolbar_').length==2) {
    bb.push(a);
    }
    });
    }

    if(v!='') {
    a = {operator: 'contains', value: v, field: $(p_this).attr('data-text-field')};
    if(Left(v,2)=='>=') {
    a.operator = 'gte';
    a.value = Mid(v,3,100);
    } else if(Left(v,2)=='<=') { a.operator='lte' ; a.value=Mid(v,3,100); } else if(Left(v,1)=='>' ) { a.operator='gt' ;
        a.value=Mid(v,2,100); } else if(Left(v,1)=='<' ) { a.operator='lt' ; a.value=Mid(v,2,100); } bb.push(a); }
        aa=JSON.stringify(bb); autocomplete.dataSource.transport.options.read.data.allFilter=aa; const params=new
        URLSearchParams(autocomplete.dataSource.transport.options.read.url);
        if(params.get("parent_gubun")==document.getElementById('parent_gubun').value &&
        params.get("parent_idx")!=document.getElementById('parent_idx').value && params.get("parent_idx")!=null) {
        autocomplete.dataSource.transport.options.read.url=replaceAll(autocomplete.dataSource.transport.options.read.url
        ,'&parent_idx='+params.get("parent_idx"),' &parent_idx='+document.getElementById(' parent_idx').value); }
        autocomplete.dataSource.read(); autocomplete.search(this.value); }); <?php if ($filter_autocomplete_stop != 'Y') { ?>
            $("input[data-text-field]").keydown( function(e) { if(event==undefined) { return false; }
            $(this).attr('keyup_value',this.value); if((event.keyCode<37 || event.keyCode>40) && event.keyCode!=13) {
            if(event.ctrlKey==false) {
            if(event.key.length==1) {
            $(this).attr('keydown_keyvalue',String.fromCharCode(event.key.charCodeAt(0)));
            } else {
            $(this).attr('keydown_keyvalue','@@ctrlKey');
            }
            } else {
            $(this).attr('keydown_keyvalue','@@ctrlKey');
            }
            } else {
            setTimeout( function(p_this) {
            if($(p_this).attr('keydown_keyvalue')) {
            v1 = $(p_this).attr('keydown_keyvalue');
            } else {
            v1 = '';
            }
            //console.log('keydown_keyvalue='+ v1); //1
            v2 = $(p_this).attr('keyup_value');
            //console.log('keyup_value='+ v2); //2
            v3 = p_this.value;
            //console.log('p_this.value='+ p_this.value);
            //console.log(p_this);
            keyup_keyCode = $(p_this).attr('keyup_keyCode');
            //console.log('keyup_keyCode='+ keyup_keyCode);
            //3
            //v1==v3 or v2==v3 이어야 정상.
            if(v1!=v3 && v2!=v3) {
            if(v1=='@@ctrlKey') v1 = v2;
            else if(keyup_keyCode=='229') v1 = v2;
            else if(v2.charCodeAt(0)>1000) v1 = v2;
            else if(Right(v2,1)==v1) v1 = v2;
            if(v1!='') {
            p_this.value = v1;
            $(p_this).attr('value',v1);
            $(p_this).prop('value',v1);
            $('input#txtSearch').focus();
            $(p_this).focus();
            $(p_this).closest('th').find('button').focus();
            $(p_this).attr('keyup_value','');
            }
            }
            },0,this);
            //x.stop;
            }
            });

            $("input[data-text-field]").keyup( function() {
            //console.log('event.keyCode='+event.keyCode);
            if((event.keyCode<37 || event.keyCode>40) && event.keyCode!=13) {



                var autocomplete = $(this).data("kendoAutoComplete");
                autocomplete.dataSource.transport.options.read.data.selField = $(this).attr("data-text-field");
                autocomplete.dataSource.transport.options.read.data.selValue = this.value;

                var p_this = this;
                aa = autocomplete.dataSource.options.transport.read.data.allFilter;
                bb = [];
                v = $(p_this).val();
                if(aa!='') {
                JSON.parse(aa).forEach( function(a) {
                if(a.field.split('toolbar_').length==2) {
                bb.push(a);
                }
                });
                }
                if(v!='') {
                a = {operator: 'contains', value: v, field: $(p_this).attr('data-text-field')};
                if(Left(v,2)=='>=') {
                a.operator = 'gte';
                a.value = Mid(v,3,100);
                } else if(Left(v,2)=='<=') { a.operator='lte' ; a.value=Mid(v,3,100); } else if(Left(v,1)=='>' ) {
                    a.operator='gt' ; a.value=Mid(v,2,100); } else if(Left(v,1)=='<' ) { a.operator='lt' ; a.value=Mid(v,2,100);
                    } bb.push(a); } aa=JSON.stringify(bb); autocomplete.dataSource.transport.options.read.data.allFilter=aa;
                    const params=new URLSearchParams(autocomplete.dataSource.transport.options.read.url);
                    if(params.get("parent_gubun")==document.getElementById('parent_gubun').value &&
                    params.get("parent_idx")!=document.getElementById('parent_idx').value && params.get("parent_idx")!=null) {
                    autocomplete.dataSource.transport.options.read.url=replaceAll(autocomplete.dataSource.transport.options.read.url
                    ,'&parent_idx='+params.get("parent_idx"),' &parent_idx='+document.getElementById(' parent_idx').value); }
                    autocomplete.dataSource.read(); autocomplete.search(this.value); } }); <?php } ?> <?php } ?> } //end
            list_main </script>


            <textarea id="txt_templateCheckbox" style="display: none;">
<script type="text/x-kendo-tmpl" id="templateCheckbox_{aliasName}">
    <input id="{aliasName}__idx#=<?php echo $key_aliasName; ?>#" type="checkbox" 
    <?php if ($isAuthW == "N")
        echo "disabled"; ?>
    onclick="saveCheckbox(this);" 
    # var t = getColumnProperty_aliasName("{aliasName}", "Grid_Schema_Type"); if(t=="boolean") {
        if({aliasName}=="true" || {aliasName}=="1"){#
    checked value="1"
        #} else {#
    value="0"
        #}
    } else {
        if({aliasName}=="Y"){#
    checked value="Y"
        #} else {#
    value="N"
        #}
    }#
    class="k-checkbox">
    <label class="k-checkbox-label" for="{aliasName}__idx#=<?php echo $key_aliasName; ?>#"></label>
</script>
</textarea>
            <script>
        <?php echo $templateCheckbox_write; ?>
            </script>


            <script>
        function rowFunctionAfter(p_this, page_commentObj) {

            <?= $rowFunctionAfter ?>


            if (page_commentObj != undefined) {
                if (page_commentObj.length > 0) {

                    if ($('div#treemenu')[0]) {
                        treemenuObj = $('div#treemenu').data('kendoTreeView');
                        for (i = 0; i < page_commentObj.length; i++) {
                            var barDataItem = treemenuObj.dataSource.get(page_commentObj[i].midx);
                            if (barDataItem) {
                                var barElement = treemenuObj.findByUid(barDataItem.uid);
                                barElement.addClass("cnt0" + iif(page_commentObj[i].commentCnt < 10, page_commentObj[i].commentCnt, "9P"));
                            }
                        }
                    } else {
                        for (i = 0; i < page_commentObj.length; i++) {
                            $('td[keyidx="' + page_commentObj[i].midx + '"]').parent().find('td[comment="Y"]').addClass("cnt0" + iif(page_commentObj[i].commentCnt < 10, page_commentObj[i].commentCnt, "9P"));
                        }
                    }
                }
            }
            /////////////////////////////////////////////////////////////////////


            <?php if ($read_only_condition != '') { ?>
                if (p_this["read_only_condition"]) {
                    $('th.selectableClass.k-header input.k-checkbox').css('display', 'none');
                    $(getGridRowObj_idx(p_this[key_aliasName])).find('td.editorStyle:not([data-field="remark"]):not([data-field="memo"])').attr("stopEdit", "true");
                    $(getGridRowObj_idx(p_this[key_aliasName])).find('td.editorStyle[stopEdit][data-field="remark"]').attr("title", "비고란의 경우, 읽기전용 시에도 목록에서의 수정이 가능합니다.");
                    $(getGridRowObj_idx(p_this[key_aliasName])).find('td.editorStyle[data-field="memo"]').attr("title", "비고란의 경우, 읽기전용 시에도 목록에서의 수정이 가능합니다.");
                    <?php if ($MisSession_IsAdmin == 'Y') { ?>
                        $(getGridRowObj_idx(p_this[key_aliasName])).find('td.editorStyle[data-field="boho"]').attr("title", "보호체크 후에는 편집이 불가하지만, 관리자권한의 경우에는 보호해제가 가능합니다.");

                        $('td.editorStyle[data-field="boho"]').css('pointer-events', 'all');
                        $('td.editorStyle[data-field="boho"] *').css('background', 'none');

                    <?php } ?>
                    if ($(getGridRowObj_idx(p_this[key_aliasName])).find("td[keyidx] input.k-checkbox")[0]) {
                        $(getGridRowObj_idx(p_this[key_aliasName])).find("td[keyidx] input.k-checkbox")[0].disabled = true;
                    }

                }
            <?php } else if ($isAuthW == "Y" && $MisSession_IsAdmin == "N") { ?>
                    //읽기쓰기이면서 admin 은 아닌경우.
                    if (p_this["wdater"] != document.getElementById("MisSession_UserID").value) {
                        $('th.selectableClass.k-header input.k-checkbox').css('display', 'none');
                        $(getGridRowObj_idx(p_this[key_aliasName])).find("td.editorStyle").attr("stopEdit", "true");
                        $(getGridRowObj_idx(p_this[key_aliasName])).find("td.editorStyle").attr("title", "본인이 작성한 게시물에 대해서만 수정이 가능합니다.");
                        $(getGridRowObj_idx(p_this[key_aliasName])).attr("stopEdit", "true");
                        if ($(getGridRowObj_idx(p_this[key_aliasName])).find("td[keyidx] input.k-checkbox")[0]) {
                            $(getGridRowObj_idx(p_this[key_aliasName])).find("td[keyidx] input.k-checkbox")[0].disabled = true;
                        }

                    }
            <?php } ?>


            if (typeof rowFunctionAfter_UserDefine == "function") {
                rowFunctionAfter_UserDefine(p_this);
            }
        }

            </script>
            </div>






            <script id="responsive-column-template" type="text/x-kendo-template">
    <?php echo $mobileList; ?>
</script>

            </div>

            </div>


            <span id="span_pageLoad">
                <?php

                if (function_exists("pageLoad")) {
                    pageLoad();
                }
                ?>
            </span>

            <?php if ($MenuType == '01' || $MenuType == '06') { ?>


                <script>
                        ////////////////////////////////////////////////////////////////// chart start

                        var dataAlias = [];
                        function creatChartArea() {
                            chart_outerHTML = `
            <div class="chart_option">
            <input id="chartKey" value="<?php echo $chartKey; ?>"/>
            <select id="chartType">
            <option value="column"<?php if ($chartType == "column")
                echo " selected"; ?>>세로막대차트</option>
            <option value="bar"<?php if ($chartType == "bar")
                echo " selected"; ?>>가로막대차트</option>
            <option value="line"<?php if ($chartType == "line")
                echo " selected"; ?>>선형차트</option>
            <option value="pie"<?php if ($chartType == "pie")
                echo " selected"; ?>>원형차트</option>
            </select>
            <select id="chartOrderBy">
            <option value="high"<?php if ($chartOrderBy == "high")
                echo " selected"; ?>>높은 합계순</option>
            <option value="low"<?php if ($chartOrderBy == "low")
                echo " selected"; ?>>낮은 합계순</option>
            <option value="abc"<?php if ($chartOrderBy == "abc")
                echo " selected"; ?>>가나다순</option>
            <option value="cba"<?php if ($chartOrderBy == "cba")
                echo " selected"; ?>>가나다역순</option>
            </select>

            <a role="button" class="k-button k-button-icontext" id="btn_chartClose"><span class="k-icon k-i-k-icon k-i-close"></span>닫기</a>
            <input id="chartNumberColumns" style="width: 100%;" />
            <button class="k-button" id="chartNumberColumns_all">전체선택</button>

            <div id="chart"></div>
            </div>
        `;

                            if ($('div.chart_option')[0]) {
                                $('div.chart_option').remove();
                            }

                            if (isMainFrame() == true) {
                                obj_grid_gubun = $('iframe[grid_gubun=' + document.getElementById("gubun").value + ']')[0];
                                if (obj_grid_gubun) {
                                    if (obj_grid_gubun.id == 'grid_right' && getFrameObj("grid_right").read_idx) {

                                    } else {
                                        $('iframe#grid_right')[0].id = 'grid_hidden';
                                        if ($('iframe#grid_right')[0]) {
                                            $('iframe#grid_right')[0].id = 'grid_hidden';
                                        }
                                    }
                                } else {
                                    $('iframe[grid_right_origin]')[0].id = 'grid_hidden';
                                    if ($('iframe#grid_right')[0]) {
                                        $('iframe#grid_right')[0].id = 'grid_hidden';
                                    }
                                }
                            }
                            $('body').append(`<iframe id="grid_right" grid_gubun="` + document.getElementById("gubun").value + `" src="about:blank" marginwidth=0 marginheight=0 frameborder=0 scrolling="no" style="width:100%;overflow-x: hidden;overflow-y: hidden;"
            width="100%" height="100%"></iframe>`);

                            if (isMainFrame() == false) {
                                chart_outerHTML = chart_outerHTML + `<style>
.themechooser, div#main-wrap {
    display: none;
}
div#chart {
    position: absolute !important;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.chart_option .k-widget.k-multiselect,button#chartNumberColumns_all {
    display: none;
}

            </style>`;
                            }
                            $('iframe#grid_right').after(chart_outerHTML);
                            $('iframe#grid_right').css('display', 'none');
                            //$('div#right-pane .pane-content.k-widget').attr('inner_html', outer_html);

                            if (isMainFrame() == true) {
                                resize_chart_split();
                            }

                        }


                        var grid_total = 1;
                        function updateChart(chart_data) {


                            var kk = json_length($("#grid").data("kendoGrid").dataSource._sortFields);

                            /*
                            var default_chartKey = '';
                            for(ii=0;ii<kk;ii++) {
                                uu = jsonFromIndex($("#grid").data("kendoGrid").dataSource._sortFields,ii).key;
                                if(isNumeric(getColumnAttr_aliasName(uu,'width'))) {
                                    if(getColumnAttr_aliasName(uu,'width')*getColumnAttr_aliasName(uu,'width')>1) {
                                        default_chartKey = uu;
                                        break;
                                    }
                                }
                            }
                            */

                            if ($('#chartNumberColumns').data('kendoMultiSelect')) {
                                dataAlias = $('#chartNumberColumns').data('kendoMultiSelect').value();
                            }

                            grid_total = $("#grid").data("kendoGrid").dataSource._total * 1;


                            //갯수에 대해서만 Top 외 표시.
                            if ($('#chartNumberColumns').data('kendoMultiSelect')) {
                                if ($('#chartNumberColumns').data('kendoMultiSelect').value().toString() == '') {
                                    cnt_top20 = 0;

                                    for (h = 0; h < chart_data.length; h++) {
                                        cnt_top20 = cnt_top20 + chart_data[h].value;
                                    }

                                    if (grid_total > cnt_top20) {
                                        chart_data.push({ category: "(TOP " + iif(getUrlParameter("chartTop"), getUrlParameter("chartTop"), "15") + " 외)", value: (grid_total - cnt_top20) });
                                    }
                                }

                            }

                            $("#chart").kendoChart({
                                seriesDefaults: {
                                    type: $("#chartType").val(),
                                    labels: {
                                        visible: true,
                                        background: "transparent",
                                        rotation: -20,
                                    }
                                },
                                categoryAxis: {
                                    //categories: dataAlias, //Each month(column) is added as a category
                                    labels: {
                                        rotation: -20
                                    }
                                },
                                tooltip: {
                                    visible: true,
                                    shared: true,
                                    format: "N0"
                                }
                            });

                            //debugger;
                            //if(!$('input#chartKey').data('kendoDropDownList')) $('input#chartKey').val(default_chartKey);

                            if (jsonFromIndex(chart_data[0], 2) != undefined) {

                                var chartData_categories = [];
                                var chartData_series = [];

                                for (ii = 0; jsonFromIndex(chart_data[0], ii) != undefined; ii++) {
                                    column_data = [];
                                    for (jj = 0; jj < chart_data.length; jj++) {
                                        column_data.push(chart_data[jj][jsonFromIndex(chart_data[0], ii).key]);
                                    }
                                    if (ii > 0) {
                                        if (jsonFromIndex(chart_data[0], ii).key == "value") {
                                            key_title = "갯수";     //갯수는 다른항목의 합산이 있을때는 제외시킴.
                                        } else {
                                            key_title = getObjects(p_columns, "field", jsonFromIndex(chart_data[0], ii).key)[0].title;
                                            chartData_series.push({ name: key_title, data: column_data });
                                        }
                                    } else {
                                        chartData_categories = column_data;
                                    }
                                }

                                var chart = $("#chart").data("kendoChart");
                                var options = chart.options;

                                $("#chart").data("kendoChart").options.series = chartData_series;

                                options.series = chartData_series;
                                options.categoryAxis.categories = chartData_categories;

                                //합산항목이 1개일 경우, 범례는 숨김.
                                if ($('#chartNumberColumns').data('kendoMultiSelect').value().length == 1) {
                                    options.legend.visible = false;
                                }

                                chart.setOptions(options); //re-initializing the Chart
                                $('.k-multiselect-wrap.k-floatwrap > input').attr('placeholder', '항목을 선택하면 갯수통계를 대신합니다');


                            } else {

                                var chartSeries = [];
                                chartSeries.push({
                                    data: chart_data
                                });

                                var chart = $("#chart").data("kendoChart");
                                var options = chart.options;
                                options.series = chartSeries; //setting the series with the new data to the options
                                options.seriesDefaults.categoryField = "category";
                                options.seriesDefaults.labels.template = "#= category #: #= value#건 (#= kendo.toString(value / grid_total, 'p1') #)";

                                chart.setOptions(options); //re-initializing the Chart

                            }

                        }



                </script>
            <?php } ?>