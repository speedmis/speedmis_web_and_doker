<style>
    <?php if ($isMenuIn == 'Y' || $screenMode == '1') { ?>
        a#btn_menuView {
            display: none !important;
        }

    <?php } ?>
</style>
<?php
$brief_insertsql = '';
$Anti_SortWrite = '';
$delflag_sql = '';


?>



<div id="vertical" class="k-content">
    <div id="top-pane">
        <div id="horizontal" style="height: 100%; width: 100%;">
            <div id="left-pane">
                <div class="pane-content">




                    <div id="grid"></div>




                </div>
            </div>
            <div id="right-pane">
                <div class="pane-content k-widget">
                    <iframe id="grid_right" src="about:blank" marginwidth=0 marginheight=0 frameborder=0 scrolling="no"
                        style="width:100%;overflow-x: hidden;overflow-y: hidden;" width="100%" height="100%"></iframe>
                </div>
            </div>
        </div>
    </div>
    <div id="bottom-pane">
        <div class="pane-content">
            <iframe id="grid_bottom" src="about:blank" marginwidth=0 marginheight=0 frameborder=0 scrolling="no"
                style="width:100%;overflow-x: hidden;overflow-y: hidden;" width="100%" height="100%"></iframe>
        </div>
    </div>
</div>


<script type="text/x-kendo-template" id="template_ChkOnlySum2">
    <div class="detailTabstrip" style="display:none;">
        <iframe src="about:blank" style="width:100%;height:100%;" onload="template_ChkOnlySum2_load(this);"></iframe>
    </div>
</script>

<script>

    var p_columns;
    var p_schema_fieldsAll;

    if (getCookie("modify_YN") == "") setCookie('modify_YN', 'N');

    $(document).ready(function () {

        <?php
        $key_mm = -1;


        if ($MS_MJ_MY == 'MY') {
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
from MisMenuList_Detail d
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
,m.g12
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
from MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where (d.sortelement<>999 or d.Grid_Select_Field!='') and d.aliasName<>'' and d.RealPid='" . iif($MisJoinPid != '', $MisJoinPid, $RealPid) . "' 
order by d.sortelement;
    ";
        }


        //echo  $strsql;
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
{ type: "separator" },
{
    template: "<input id=\'toolbar_brief_insertsql\'/>",
    overflow: "never"
},
';



        $toolbar_searchField = '
{ template: "<label class=\'k-button\' for=\'toolbar_{searchField}\'>{Grid_Columns_Title}:</label>" },
{
    template: "<input id=\'toolbar_{searchField}\' style=\'width: 100px;\' />",
    overflow: "never"
},
';

        $toolbar_searchLikeField = '
{ template: "<label class=\'k-button\' for=\'toolbar_{searchLikeField}\'>{Grid_Columns_Title}:</label>" },
{
    template: "<input id=\'toolbarTxt_{searchLikeField}\' onkeyup=\'toolbarTxt_keyup(this);\'class=\'k-textbox likeField\'/><input id=\'toolbarSel_{searchLikeField}\' class=\'k-textbox\' style=\'width: 65px;\' />",
    overflow: "never"
},
';

        $toolbar_searchBetweenField = '
{ template: "<label class=\'k-button\' for=\'toolbar_{searchBetweenField}\'>{Grid_Columns_Title}:</label>" },
{
    template: "<input id=\'toolbarSel_{searchBetweenField}\' onkeyup=\'toolbarTxt_keyup(this);\'class=\'k-textbox likeField\'/><span class=\'between\'>~</span> <input id=\'toolbarSel_{searchBetweenField}_end\' onkeyup=\'toolbarTxt_keyup(this);\'class=\'k-textbox likeField\'/>",
    overflow: "never"
},
';

        $toolbar_searchField_all = '';

        $toolbar_searchField_kendoDropDownList0 = '
$("#toolbar_{searchField}").kendoDropDownList({
    autoBind: false,
    autoWidth: true,
    dataTextField: "{searchField}",
    dataValueField: "{searchField}", 
    filter: "contains",
    dataSource: {
        type: "odata",
        serverFiltering: true,
        transport: {
            read: "' . $jsonUrl . 'list_json.php?flag=toolbar_searchField_kendoDropDownList&RealPid=' . $RealPid . '&MisJoinPid=' . $MisJoinPid . '&selField={searchField}&selValue={searchValue}"
        }
    },
    filtering: function(e) {
        console.log(88888);
        e.sender.dataSource.transport.options.read.url = e.sender.dataSource.transport.options.read.url.split("&selValue=")[0]+"&selValue="+e.filter.value;
    },
    select: function(e) {
 
        if($("#grid").data("kendoGrid").dataSource._filter==undefined) $("#grid").data("kendoGrid").dataSource._filter = {logic: "and", filters: []};

        var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;
        //var searchFilter = replaceAll(this.element[0].id,"toolbar_","");
        var searchFilter = this.element[0].id;
        
        var obj2 = obj.find(fruit => fruit.field === searchFilter);
        v = e.dataItem[replaceAll(searchFilter,"toolbar_","")];
        if(v==null) v = "(BLANK)";
        if(obj2) {
            if(v=="") {
                jQuery(obj).each(function (index){
                    if(obj[index]) {
                        if(obj[index].field == searchFilter){
                            obj.splice(index, 1);
                            $("#"+searchFilter).val("");
                            console.log(222);
                        }
                    }
                });
            } else {
                obj2.value = v;
                $("#"+searchFilter).val(v);          //select 시점에서 미리 반영시킨다. 이래야 잘됨.
                
            }
        } else {
            
            if(v!="") {
                console.log(searchFilter);
                console.log("215="+v);
                obj.push({ operator: "eq", value: v, field: searchFilter });
                $("#"+searchFilter).val(v);          //select 시점에서 미리 반영시킨다. 이래야 잘됨.
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
        
        if(e.sender.dataSource._data.length<=20 && e.sender._prev=="") {
            obj = $(\'input[aria-owns="\'+e.sender.element[0].id+\'_listbox"]\');
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

        if($("#grid").data("kendoGrid").dataSource._filter==undefined) $("#grid").data("kendoGrid").dataSource._filter = {logic: "and", filters: []};

        var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;


        var old_word = "";
        var now_word = e.sender.element.closest("div").find("input")[0].value;
        if(getObjects($("#grid").data("kendoGrid").dataSource._filter.filters, "field", e.sender.element[0].id)[0]) {
            var old_word = getObjects($("#grid").data("kendoGrid").dataSource._filter.filters, "field", e.sender.element[0].id)[0].value;
        }
        if(now_word==old_word) return false;
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
        obj.push({ operator: this.element.val(), value: $("#"+replaceAll(searchFilter,"toolbarSel_","toolbarTxt_")).val(), field: searchFilter });
        $("#grid").data("kendoGrid").dataSource.read();
    }
});
$("#toolbarTxt_{searchLikeField}").blur( function() {
    $("#toolbarSel_{searchLikeField}").data("kendoDropDownList").trigger("change");
});

';

        $toolbar_searchBetweenField_kendoDropDownList = '
$("#toolbarSel_{searchBetweenField}").change( function(e) {

    if($("#grid").data("kendoGrid").dataSource._filter==undefined) $("#grid").data("kendoGrid").dataSource._filter = {logic: "and", filters: []};

    var obj = $("#grid").data("kendoGrid").dataSource._filter.filters;
    var searchFilter = this.id;
    
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
    obj.push({ operator: "gte", value: this.value, field: searchFilter });
    obj.push({ operator: "lte", value: $("#"+this.id+"_end")[0].value, field: searchFilter });
    $("#grid").data("kendoGrid").dataSource.read();
});
$("#toolbarSel_{searchBetweenField}").blur( function() {
    $("#toolbarSel_{searchBetweenField}").trigger("change");
});
$("#toolbarSel_{searchBetweenField}_end").blur( function() {
    $("#toolbarSel_{searchBetweenField}").trigger("change");
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


        if (function_exists('misMenuList_change')) {
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

                $BodyType = $result[$mm]['g01'];

                if ($recently != '')
                    $Anti_SortWrite = iif($recently == 'Y', 'N', 'Y');        //최근순거부
                else
                    $Anti_SortWrite = $result[$mm]['g03'];           //최근순거부
        
                $read_only_condition = Trim($result[$mm]['g04']);          //읽기전용조건
                $brief_insertsql = $result[$mm]['g05'];          //간편추가쿼리
        
                $Read_Only = $result[$mm]['g07'];          //읽기전용
        
                $table_m = $result[$mm]['g08'];          //테이블명
                $excel_where = $result[$mm]['g09'];          //기본필터
                $excel_where_ori = $excel_where;
                $useflag_sql = $result[$mm]['g10'];           //use조건
                $delflag_sql = $result[$mm]['g11'];           //삭제쿼리
                $isThisChild = $result[$mm]['g12'];           //아들여부
        
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
            $Grid_Columns_Title = str_replace('_', ' ', str_replace(':', '', $Grid_Columns_Title));

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
            $Grid_CtlName = $result[$mm]['Grid_CtlName'];
            $Grid_Items = $result[$mm]['Grid_Items'];



            //if($Grid_CtlName=='attach') $Grid_Select_Field = $Grid_Select_Field . '_timename';
            //else 
        
            if ($Grid_CtlName == 'textencrypt') {
                $Grid_Select_Tname = '';
                $Grid_Select_Field = "'[암호화]'";
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
            $Grid_ListEdit = $result[$mm]['Grid_ListEdit'];
            $Grid_Templete = $result[$mm]['Grid_Templete'];


            if ($BodyType == 'only_one_list' && $idx_FullFieldName != '' && requestVB('isAddURL') != 'Y') {
                $move_list = allreturnSql(list_top1_query());
                //print_r($move_list) ;exit;
                if (count($move_list) > 0)
                    $move_idx = $move_list[0][$key_aliasName];
                else
                    $move_idx = '';

                $url = 'index_lite.php?' . $ServerVariables_QUERY_STRING;
                if ($move_idx != '' && $move_idx != '0') {
                    if ($isAuthR == 'Y' || $isAuthW == 'Y' || $MisSession_IsAdmin == 'Y')
                        $url = $url . '&ActionFlag=modify&idx=' . $move_idx;
                    else
                        exit;
                } else {
                    $url = $url . '&ActionFlag=write&idx=0';
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
                    if($isAuthW=='N') re_direct('index_lite.php?' . $ServerVariables_QUERY_STRING . '&ActionFlag=view&idx=' . $idx_FullFieldName2);
                    else re_direct('index_lite.php?' . $ServerVariables_QUERY_STRING . '&ActionFlag=modify&idx=' . $idx_FullFieldName2);
                } else re_direct('index_lite.php?' . $ServerVariables_QUERY_STRING . '&ActionFlag=write&idx=0');

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
            if ($Grid_Schema_Validation == 'zipcode' || $Grid_Schema_Validation == 'code')
                $Grid_Schema_Validation = '';    //우편번호는 입력/수정때만.
            $Grid_Alim = $result[$mm]['Grid_Alim'];
            $Grid_Pil = $result[$mm]['Grid_Pil'];
            $grid_schema_format = '';

            if ($Grid_Schema_Type == '')
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
                $dataSource_sort = "{field:'" . str_replace(' desc,', "'{comma}dir:'desc'}{comma}{field:'", $orderby);
                $dataSource_sort = str_replace(',', "'{comma}dir:'asc'},{field:'", $dataSource_sort);
                if (Right($dataSource_sort, 5) == ' desc')
                    $dataSource_sort = str_replace(' desc', "'{comma}dir:'desc'}", $dataSource_sort);
                else
                    $dataSource_sort = $dataSource_sort . "'{comma}dir:'asc'}";

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
                    if ($Grid_Columns_Width == -1 || $Grid_Columns_Width == 0) {
                        if (InStr(',' . $aliasName . ',', ',' . $aliasName . ',') > 0) {
                            $Grid_Columns_Width = 12;
                        }
                    }
                    if (InStr(',' . str_replace(' desc', '', $orderby) . ',', ',' . $aliasName . ',') > 0) {
                        $schema_fields = $aliasName . ': { type: "string" },';
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

            if ($Grid_Columns_Width == 0 || $Grid_Columns_Width == -1) {
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
            if ($Grid_Schema_Type == "number") {
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

                if ($Grid_CtlName == 'dropdownlist')
                    $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", editable: false', $schema_fields);
                else
                    $script_columns = str_replace('"class": "', '"class": "editorStyle ', $script_columns);

                if ($mobileCell_index == 1) {
                    $script_columns = str_replace('editorStyle ', '', str_replace('title: "' . $Grid_Columns_Title . '"', 'title: "주요내용"', str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: function(dataItem) { tag = $("#list-mobile-template").html(); return templeteReplace(tag, dataItem); }', $script_columns)));
                    $Grid_ListEdit = '';
                    $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", editable: false', $schema_fields);
                } else if ($Grid_CtlName == 'attach') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", default: "' . $Grid_Default . '", maxLength: "' . $Grid_MaxLength . '", schema_validation: "' . str_replace('"', '\"', $Grid_Schema_Validation) . '"', $script_columns);
                    $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "' . $Grid_Schema_Type . '", editable: false', $schema_fields);
                    $rowFunctionAfter = $rowFunctionAfter . str_replace('{thisAlias}', $aliasName, $upload_rowFunctionAfter_script);
                } else if ($Grid_CtlName == 'datepicker' || $Grid_CtlName == "text" && $Grid_Schema_Type == "date") {
                    //if($grid_schema_format=='') $grid_schema_format = "yyyy-MM-dd";
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsDatePicker', $script_columns);
                } else if ($Grid_CtlName == 'text') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsAutoCompleteEditor', $script_columns);
                } else if ($Grid_CtlName == 'timepicker') {
                    //if($grid_schema_format=='') $grid_schema_format = "HH:mm";
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsTimePicker', $script_columns);
                } else if ($Grid_CtlName == 'datetimepicker') {
                    //if($grid_schema_format=='') $grid_schema_format = "yyyy-MM-dd HH:mm";
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsDateTimePicker', $script_columns);
                } else if ($Grid_CtlName == 'dropdownitem') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", Grid_Items: "' . str_replace('"', '\"', $Grid_Items) . '", editor: columnsDropDownItemEditor', $script_columns);
                    if (InStr($script_columns, '"class": "editorStyle ') == 0)
                        $script_columns = str_replace('"class": "', '"class": "editorStyle ', $script_columns);
                } else if ($Grid_CtlName == 'multiselect') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'Grid_Items: "' . str_replace('"', '\"', $Grid_Items) . '", field: "' . $aliasName . '", editor: columnsMultiSelectEditor', $script_columns);
                    if (InStr($script_columns, '"class": "editorStyle ') == 0)
                        $script_columns = str_replace('"class": "', '"class": "editorStyle ', $script_columns);
                } else if ($Grid_CtlName == 'dropdowntree') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'Grid_Items: "' . str_replace('"', '\"', $Grid_Items) . '", field: "' . $aliasName . '", editor: columnsDropDownTreeEditor', $script_columns);
                    if (InStr($script_columns, '"class": "editorStyle ') == 0)
                        $script_columns = str_replace('"class": "', '"class": "editorStyle ', $script_columns);
                } else if ($Grid_CtlName == 'textarea') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsTextareaEditor', $script_columns);
                } else if ($Grid_CtlName == 'check') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: kendo.template($("#templateCheckbox_' . $aliasName . '").html())', $script_columns);

                    $templateCheckbox_write = $templateCheckbox_write .
                        'document.write(replaceAll(txt_templateCheckbox.value,"{aliasName}","' . $aliasName . '"));
';
                    $schema_fields = str_replace('type: "' . $Grid_Schema_Type . '"', 'type: "string", editable: false', $schema_fields);
                }



            } else if (arrayValue($result, $mm + 1, "Grid_ListEdit") == "Y" && arrayValue($result, $mm + 1, "Grid_CtlName") == "dropdownlist") {

                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", editor: columnsDropDownListEditor', $script_columns);
                $script_columns = str_replace('"class": "', '"class": "editorStyle ', $script_columns);
                //Grid_Schema_Validation 는 코드width=0 을 대비하여 추가해놓음.
                if (arrayValue($result, $mm + 1, "Grid_Schema_Validation") != '') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", ' . arrayValue($result, $mm + 1, "Grid_Schema_Validation"), $script_columns);
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
            } else {
                $schema_fields = str_replace('type: "', 'editable: false, type: "', $schema_fields);
            }
            $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", Grid_Schema_Type: "' . $Grid_Schema_Type . '"', $script_columns);

            if ($Grid_CtlName != 'attach' && $Grid_Schema_Validation != '') {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", ' . $Grid_Schema_Validation, $script_columns);
            }


            if ($Grid_Templete == 'Y') {
                $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", template: function(dataItem) { return columns_templete(dataItem,"' . $aliasName . '"); }', $script_columns);
            }



            if ($ChkOnlySum == '1') {
                if ($Grid_Orderby == 'c') {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", aggregates: ["count"], footerTemplate: "#=count#건", groupHeaderTemplate: "Count: #=count#"', $script_columns);
                    if ($dataSource_aggregate != '')
                        $dataSource_aggregate = $dataSource_aggregate . ",";
                    $dataSource_aggregate = $dataSource_aggregate . '{ field: "' . $aliasName . '", aggregate: "count" }';
                } else if ($Grid_Schema_Type == "number") {
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
                } else if ($Grid_Schema_Type == "number") {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", aggregates: ["sum"], footerTemplate: "#=kendo_format_n(sum,0)#", groupHeaderTemplate: "#=kendo_format_n(sum,0)#"', $script_columns);
                    if ($dataSource_aggregate != '')
                        $dataSource_aggregate = $dataSource_aggregate . ",";
                    $dataSource_aggregate = $dataSource_aggregate . '{ field: "' . $aliasName . '", aggregate: "sum" }';
                }
            }

            if ($mm == 0) {
                if ($Grid_Columns_Width == 0 || $Grid_Columns_Width == -1) {
                    $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", hidden: true', $script_columns);
                }

                $script_columns = $script_columns . '
{ field: "_rowFunction()", hidden: true, title: "rowFunction" },';
            }

            $script_columns = str_replace('field: "' . $aliasName . '"', 'field: "' . $aliasName . '", Grid_CtlName: "' . $Grid_CtlName . '"', $script_columns);

            if ($Grid_Columns_Width >= 1 || $Grid_Columns_Width < -1) {
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
                    $toolbar_searchField_kendoDropDownList = str_replace('{searchValue}', $searchValue, $toolbar_searchField_kendoDropDownList0);
                } else {
                    $toolbar_searchField_kendoDropDownList = str_replace('&selValue={searchValue}', '', $toolbar_searchField_kendoDropDownList0);
                }


                $toolbar_searchField_kendoDropDownList_all = $toolbar_searchField_kendoDropDownList_all . str_replace('{searchField}', $aliasName, $toolbar_searchField_kendoDropDownList);

                //과제 : 초기값 url 에 대한 t / w 는 왜 코딩 없나?
        
            } else if ($Grid_IsHandle == 't') {
                $toolbar_searchField_all = $toolbar_searchField_all . str_replace('{Grid_Columns_Title}', $Grid_Columns_Title, str_replace('{searchLikeField}', $aliasName, $toolbar_searchLikeField));
                $toolbar_searchField_kendoDropDownList_all = $toolbar_searchField_kendoDropDownList_all . str_replace('{searchLikeField}', $aliasName, $toolbar_searchLikeField_kendoDropDownList);
            } else if ($Grid_IsHandle == 'w') {
                $toolbar_searchField_all = $toolbar_searchField_all . str_replace('{Grid_Columns_Title}', $Grid_Columns_Title, str_replace('{searchBetweenField}', $aliasName, $toolbar_searchBetweenField));
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
        $dataSource_aggregate = str_replace('aggregate:', '"aggregate":', str_replace('field:', '"field":', $dataSource_aggregate));

        ?>
    key_aliasName = "<?php echo $key_aliasName; ?>";
    document.getElementById("pageSizes").value = "<?php echo $pageSizes; ?>";


    document.getElementById("key_aliasName").value = key_aliasName;
    document.getElementById("Anti_SortWrite").value = "<?= $Anti_SortWrite; ?>";


    var dataSource_aggregate = [<?php echo $dataSource_aggregate; ?>];


    var p_dataSource_sort = [<?php echo $dataSource_sort; ?>];
    var p_filter = <?php echo $p_filter; ?>;
    p_schema_fieldsAll = { <?php echo $schema_fieldsAll; ?> };

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

            <?php if ($BodyType != 'simplelist' && $key_mm > -1) { ?>
    
        <?php if ($result[$key_mm]['Grid_Schema_Type'] == 'date' || $result[$key_mm]['Grid_Schema_Type'] == "datetime") { ?>
            { selectable: true, width: "35px", headerAttributes: { "class": "selectableClass" }, attributes: { "keyIdx": "#=kendo.toString(<?php echo $key_aliasName; ?>,'yyyy-MM-dd')#" } },
                <?php } else { ?>
            { selectable: true, width: "35px", headerAttributes: { "class": "selectableClass" }, attributes: { "keyIdx": "#=<?php echo $key_aliasName; ?>#" } },
                <?php } ?>
<?php } else if ($key_mm > -1) { ?>
        <?php if ($result[$key_mm]['Grid_Schema_Type'] == 'date' || $result[$key_mm]['Grid_Schema_Type'] == "datetime") { ?>
                { selectable: true, hidden: true, attributes: { "keyIdx": "#=kendo.toString(<?php echo $key_aliasName; ?>,'yyyy-MM-dd')#" } },
                <?php } else { ?>
                { selectable: true, hidden: true, attributes: { "keyIdx": "#=<?php echo $key_aliasName; ?>#" } },
                <?php } ?>
<?php } ?>

<?php echo $script_columnsAll; ?>

        ];

            <?php if ($ChkOnlySum == '1') { ?>
                        grid = grid_fun_ChkOnlySum(p_dataSource_sort, p_filter, p_group, p_schema_fieldsAll, p_columns);
            <?php } else { ?>
                        grid = grid_fun(p_dataSource_sort, p_filter, p_group, p_schema_fieldsAll, p_columns);
            <?php } ?>


                });



</script>
</div>


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


<?php
/*
if(function_exists("pageLoad")) {
    pageLoad();
}
*/
?>