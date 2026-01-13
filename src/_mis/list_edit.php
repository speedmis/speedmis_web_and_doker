<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');
ob_start();

?>
<?php include 'MisCommonFunction.php'; ?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php'; ?>
<?php include 'hangeul-utils-master/hangeul_romaja.php'; ?>
<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

if ($MS_MJ_MY == 'MY')
    $addDir = 'MY';
else
    $addDir = '';


accessToken_check();
$kendoTheme = '';
if (isset($_COOKIE["kendoTheme"])) {
    $kendoTheme = $_COOKIE["kendoTheme"];
}
if ($kendoTheme == '')
    $kendoTheme = "default";

$pre = requestVB('pre');
$addParam = requestVB('addParam');
$MisMenuList_Detail = 'MisMenuList_Detail';
if ($pre == '1') {
    $MisMenuList_Detail = 'MisMenuList_Detail_pre';
}

///////////////////////////////////////////////////////

if (isset($_GET["RealPid"]))
    $RealPid = $_GET["RealPid"];
else
    $RealPid = '';

if (isset($_GET["MisJoinPid"]))
    $MisJoinPid = $_GET["MisJoinPid"];
else
    $MisJoinPid = '';

if ($MisJoinPid == '')
    $logicPid = $RealPid;
else
    $logicPid = $MisJoinPid;

$parent_idx = requestVB('parent_idx');

$kendoCultureNew = $kendoCulture;
if (request_cookies("myLanguageCode") != '')
    $kendoCultureNew = request_cookies("myLanguageCode");

/* 서버 로직 start */
if (file_exists('../_mis_addLogic/' . $logicPid . '.php'))
    include '../_mis_addLogic/' . $logicPid . '.php';
/* 서버 로직 end */


$key_aliasName = $_GET["key_aliasName"];

if ($MS_MJ_MY == 'MY') {
    $strsql = "
select 
d.idx
,ifnull(g01,'') as g01
,ifnull(g03,'') as g03
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
,ifnull(Grid_Columns_Width,'') as Grid_Columns_Width
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
where (d.sortelement<>99 or ifnull(d.Grid_Select_Field,'')!='') and d.RealPid='" . $logicPid . "' 
order by d.sortelement;
    ";
} else {
    $strsql = "
select 
d.idx
,isnull(g01,'') as g01
,isnull(g03,'') as g03
,isnull(g05,'') as g05
,isnull(g06,'') as g06
,isnull(g07,'') as g07
,isnull(g08,'') as g08
,isnull(g09,'') as g09
,isnull(g10,'') as g10
,isnull(g11,'') as g11
,isnull(g12,'') as g12
,isnull(d.aliasName,'') as aliasName
,Grid_Columns_Title
,SortElement as SortElement
,isnull(Grid_Columns_Width,'') as Grid_Columns_Width
,isnull(Grid_Align,'') as Grid_Align
,isnull(Grid_Orderby,'') as Grid_Orderby
,isnull(Grid_MaxLength,'') as Grid_MaxLength
,isnull(Grid_Default,'') as Grid_Default
,isnull(Grid_Select_Tname,'') as Grid_Select_Tname
,isnull(Grid_Select_Field,'') as Grid_Select_Field
,isnull(Grid_GroupCompute,'') as Grid_GroupCompute
,isnull(Grid_CtlName,'') as Grid_CtlName 
,isnull(Grid_Schema_Type,'') as Grid_Schema_Type
,isnull(Grid_Items,'') as Grid_Items 
,isnull(Grid_IsHandle,'') as Grid_IsHandle
,isnull(Grid_ListEdit,'') as Grid_ListEdit
,isnull(Grid_Templete,'') as Grid_Templete
,isnull(Grid_Schema_Validation,'') as Grid_Schema_Validation
,isnull(Grid_PrimeKey,'') as Grid_PrimeKey
,isnull(Grid_Alim,'') as Grid_Alim
,isnull(Grid_Pil,'') as Grid_Pil
from $MisMenuList_Detail d
left outer join MisMenuList m on m.RealPid=d.RealPid
where (d.sortelement<>99 or isnull(d.Grid_Select_Field,'')!='') and d.RealPid='" . $logicPid . "' 
order by d.sortelement;
    ";
}

//echo  $strsql;
$speed_fieldIndx = [];
$selectQuery = '';
$table_m = '';
$join_sql = '';
$where_sql = "where 9=9 ";
$json_codeSelect = [];
$defaultList = [];

$addLogic_msg = '';

$schema_fieldsAll = '';
$script_columnsAll = '';



$result = allreturnSql($strsql);

if (function_exists("misMenuList_change")) {
    misMenuList_change();
}

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
$aliasNameAll = ";";

$mobileCell_index = -1;
$idx_FullFieldName = '';

$cnt_result = count($result);
while ($mm < $cnt_result) {

    $closeColumns = '';
    $script_columns = '';
    //print_r($mm . ":" . $result[$mm]["Grid_Align"]); 
    $Grid_Schema_Type = $result[$mm]["Grid_Schema_Type"];

    if ($table_m == "") {

        $Grid_Schema_Type = 'number", format: "{0}';

        $BodyType = $result[$mm]["g01"];

        $table_m = $result[$mm]["g08"];          //테이블명
        $excel_where = $result[$mm]["g09"];          //기본필터
        $excel_where_ori = $excel_where;
        $useflag_sql = $result[$mm]["g10"];           //use조건
        $delflag_sql = $result[$mm]["g11"];           //삭제쿼리
        $isThisChild = $result[$mm]["g12"];           //아들여부

        if ($useflag_sql == '') {
            $where_sql = $where_sql . " and table_m.useflag='1'\n";
        } else {
            $where_sql = $where_sql . " and $useflag_sql \n";
        }
        if ($excel_where != "") {
            $excel_where = str_replace("@MisSession_UserID", $MisSession_UserID, $excel_where);
            $excel_where = str_replace("@RealPid", $RealPid, $excel_where);
        }
    }
    $aliasName = $result[$mm]["aliasName"];

    $Grid_Columns_Title = $result[$mm]["Grid_Columns_Title"];
    $Grid_Columns_Title = str_replace("_", " ", str_replace(":", "", $Grid_Columns_Title));

    $Grid_Columns_Width = $result[$mm]["Grid_Columns_Width"];

    ++$cnt_viewListCol;
    if ($Grid_Columns_Width > 0 || $Grid_Columns_Width < -1)
        ++$cnt_viewListColB;

    if (InStr($Grid_Columns_Title, ",") > 0) {
        $Grid_Columns_Title = splitVB($Grid_Columns_Title, ',')[1];
    }
    $script_columns = $script_columns . '{ field: "' . $aliasName . '", title: "' . $Grid_Columns_Title . '" },';
    $script_columnsAll = $script_columnsAll . "\n" . $script_columns . $closeColumns;


    ++$mm;

}


?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title></title>
    <link href='//fonts.googleapis.com/css?family=Roboto+Slab:400,700' rel='stylesheet'>
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="canonical" href="https://demos.telerik.com/kendo-ui/grid/index" />




    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">




    <link rel="stylesheet" href="../_mis_kendo/styles/kendo.common.min.css" />
    <link rel="stylesheet" href="../_mis_kendo/styles/kendo.<?php echo $kendoTheme; ?>.min.css" />

    <link href="css/examples.css" rel="stylesheet" />
    <script src="../_mis_kendo/js/jquery.min.js"></script>
    <script src="../_mis_kendo/js/jszip.min.js"></script>
    <script src="../_mis_kendo/js/kendo.all.min.js"></script>
    <script src="../_mis_kendo/js/cultures/kendo.culture.<?php echo $kendoCultureNew; ?>.min.js"></script>
    <script src="../_mis_kendo/js/messages/kendo.messages.<?php echo $kendoCultureNew; ?>.min.js"></script>
    <script src="../_mis_kendo/js/kendo.timezones.min.js"></script>
    <script src="../_mis_uniqueInfo/local_<?php echo $kendoCultureNew; ?>.js"></script>



    <script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.2.0/codemirror.min.js"></script>
    <link rel="stylesheet" type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.2.0/codemirror.min.css">
    <script type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.2.0/mode/javascript/javascript.min.js"></script>


    <script id="id_js" name="name_js" src="java_conv.js?ddd7447z3ze4efddw"></script>

    <link rel="stylesheet" type="text/css" href="cssJs/list_edit.css">

    <?php if ($kendoTheme == "moonlight" || $kendoTheme == "highcontrast") { ?>
        <style>
            div#spreadsheet {
                color: #000000;
            }

            .k-state-disabled,
            .k-spreadsheet-active-cell.k-single {
                color: #f0f;
            }
        </style>
    <?php } ?>

</head>

<body>
    <div id="example">
        <div class="box wide">
            <div>
                <ul class="options">
                    <li>
                        <button class="k-button" id="save">수정한 내용 저장</button>
                        <button class="k-button" id="cancel">수정 취소</button>
                        <div class="comment hide">일자의 경우 반드시 작은따옴표로 시작하세요.</div>
                    </li>
                </ul>
            </div>
        </div>

        <div id="spreadsheet" style="width: 100%"></div>
        <script>
            var p_window = top;
            var up_windowID = getUrlParameter("up_windowID");
            var p_windowID = getUrlParameter("windowID");


            if (Left(windowID(), 10) == "ifr_window" && Left(p_windowID, 10) == "ifr_window") {
                p_window = parent.getFrameObj(p_windowID);
            } else if (up_windowID != "") {
                if (up_windowID != p_windowID && p_window.getFrameObj(up_windowID)[0]) {
                    p_window = p_window.getFrameObj(up_windowID).getFrameObj(p_windowID);
                } else {
                    if (up_windowID != p_windowID) {
                        p_window = p_window.getFrameObj(p_windowID);
                    } else if (up_windowID != "") {
                        p_window = p_window.getFrameObj(up_windowID);
                    }
                }
            } else if (up_windowID != p_windowID) {
                p_window = p_window.getFrameObj(p_windowID);
            }
            var this_fields = p_window.$("#grid").data("kendoGrid").dataSource.options.schema.model.fields;

            var dataSource = new kendo.data.DataSource({
                transport: {
                    read: onRead,
                    submit: onSubmit
                },
                batch: true,
                change: function () {
                    $("#cancel, #save").toggleClass("k-state-disabled", !this.hasChanges());
                },
                schema: {
                    model: {
                        id: "<?php echo $key_aliasName; ?>",
                        fields: p_window.$("#grid").data("kendoGrid").dataSource.options.schema.model.fields
                    }
                }
            });


            var columns_width = [{ "width": 0 }];
            var p_columns = p_window.p_columns_1D;
            var data0 = p_window.$("#grid").data("kendoGrid").dataSource._data[0];


            for (i = 1; i < p_columns.length; i++) {
                //if(p_columns[i].field=='upRealPid') debugger;
                if (i == 2) {
                    //_rowFunction() 는 무시.
                } else if (p_columns[i].field) {
                    if (p_columns[i].width) {
                        console.log(':합격=' + p_columns[i].field);
                        columns_width.push({ "width": p_columns[i].width + 20 });
                    } else if (data0[p_columns[i].field]) {
                        console.log(':합격0=' + p_columns[i].field);
                        columns_width.push({ "width": 0 });
                    }
                }
            };
            var rows_cells = [];
            //var field_count = JSON.stringify(p_window.$("#grid").data("kendoGrid").dataSource._data[0]).split('":').length;
            var field_count = json_length(p_window.$("#grid").data("kendoGrid").dataSource._data[0]) + 1;
            for (i = 0; i < field_count - 1; i++) {
                rows_cells.push({
                    bold: "true",
                    background: "#9c27b0",
                    textAlign: "center",
                    color: "white",
                    //format: "{0:yyyy-MM-dd}"
                    format: "@"
                });
            };

            //var targetObj = parent;
            //if(getUrlParameter('windowID')!='') targetObj = parent.getFrameObj(getUrlParameter('windowID'));
            $("#spreadsheet").kendoSpreadsheet({
                columns: field_count - 2,
                rows: p_window.$("#grid").data("kendoGrid").dataSource._data.length + 3,
                toolbar: false,
                sheetsbar: false,
                sheets: [{
                    name: "<?php echo $key_aliasName; ?>",
                    dataSource: dataSource,
                    rows: [{
                        height: 40,
                        cells: rows_cells,
                    }],
                    columns: columns_width
                }]
            });

            function onSubmit(e) {
                //targetObj = parent;
                //if(getUrlParameter('windowID')!='') targetObj = parent.getFrameObj(getUrlParameter('windowID'));

                col_length = p_columns.length;
                data_length = e.data.updated.length;

                for (i = 2; i < col_length; i++) {
                    //if(p_columns[i].field=='sincheongnaljja') debugger;
                    if (p_columns[i].Grid_Schema_Type == 'date' || p_columns[i].Grid_CtlName == 'datepicker') {
                        for (j = 0; j < data_length; j++) {
                            e.data.updated[j][p_columns[i].field] = p_window.kendoDateNumber_into_day10(e.data.updated[j][p_columns[i].field + '_pix_']);
                            e.data.updated[j][p_columns[i].field + '_pix_'] = p_window.kendoDateNumber_into_day10(e.data.updated[j][p_columns[i].field + '_pix_']);
                        }
                    } else if (p_columns[i].Grid_Schema_Type == "datetime" || p_columns[i].Grid_CtlName == "datetimepicker") {
                        for (j = 0; j < data_length; j++) {
                            e.data.updated[j][p_columns[i].field] = p_window.kendoDateNumber_into_day16(e.data.updated[j][p_columns[i].field + '_pix_']);
                            e.data.updated[j][p_columns[i].field + '_pix_'] = p_window.kendoDateNumber_into_day16(e.data.updated[j][p_columns[i].field + '_pix_']);
                        }
                    } else if (p_columns[i].Grid_CtlName == "timepicker") {
                        for (j = 0; j < data_length; j++) {
                            e.data.updated[j][p_columns[i].field] = p_window.kendoDateNumber_into_time5(e.data.updated[j][p_columns[i].field + '_pix_']);
                            e.data.updated[j][p_columns[i].field + '_pix_'] = p_window.kendoDateNumber_into_time5(e.data.updated[j][p_columns[i].field + '_pix_']);
                        }
                    }
                }
                $.ajax({
                    url: "list_edit_save.php?RealPid=<?php echo $RealPid; ?>&MisJoinPid=<?php echo $MisJoinPid; ?>&key_aliasName=<?php echo $key_aliasName; ?>",
                    data: { models: replaceAll(kendo.stringify(e.data), String.fromCharCode(12288), "") },
                    //contentType: "application/json",  이거 주석처리하면서 전송 url 자체 에러 안남.
                    dataType: "jsonp",
                    method: "POST",
                    success: function (result) {
                        p_window.toastr.success("", "정상적으로 저장되었습니다.", { progressBar: true, timeOut: 3000 });
                        p_window.$("#grid").data("kendoGrid").dataSource.read();
                        setTimeout(function () {
                            if (p_window.$('div.k-loading-image').length == 1) {
                                setTimeout(function () {
                                    if (p_window.$('div.k-loading-image').length == 1) {
                                        setTimeout(function () {
                                            if (p_window.$('div.k-loading-image').length == 1) {
                                                setTimeout(function () {
                                                    $("#spreadsheet").data("kendoSpreadsheet").sheets()[0].dataSource.read();
                                                }, 8000);
                                            } else {
                                                $("#spreadsheet").data("kendoSpreadsheet").sheets()[0].dataSource.read();
                                            }
                                        }, 4000);
                                    } else {
                                        $("#spreadsheet").data("kendoSpreadsheet").sheets()[0].dataSource.read();
                                    }
                                }, 2000);
                            } else {
                                $("#spreadsheet").data("kendoSpreadsheet").sheets()[0].dataSource.read();
                            }
                        }, 1500);
                    },
                    error: function (xhr, httpStatusMessage, customErrorMessage) {
                        alert(xhr.responseText);
                    }
                });
            }

            function onRead(options) {

                var data = JSON.parse(JSON.stringify(p_window.$("#grid").data("kendoGrid").dataSource._data));
                delete data._events;
                //var field_count = JSON.stringify(data[0]).split('":').length;
                var field_count = json_length(data[0]) + 1;

                var p_columns = p_window.p_columns_1D;
                var k = 1;



                for (i = 0; i < p_columns.length; i++) {
                    if (p_columns[i].field) {
                        for (j = k; j < field_count - 1; j++) {
                            if (jsonFromIndex(data[0], j).key == p_columns[i].field) {
                                k = j;

                                if (p_columns[i].Grid_Schema_Type == "date" || p_columns[i].Grid_CtlName == 'datepicker') {
                                    var date_index = p_window.getOptionsfieldsIndex_aliasName(p_columns[i].field);
                                    p_window.$('div#grid tbody > tr > td:nth-child(' + (date_index + 1) + ')').each(function (ii, jj) {
                                        if (data[ii][p_columns[i].field] == null) {
                                        } else if (data[ii][p_columns[i].field].length > 10) {
                                            data[ii][p_columns[i].field] = jj.innerText;
                                        }
                                    });
                                }
                            }
                        }

                    }
                }
                var new_data = JSON.stringify(data);
                for (i = 0; i < p_columns.length; i++) {
                    if (p_columns[i].field) {
                        if (p_columns[i].Grid_Schema_Type == "date" || p_columns[i].Grid_CtlName == 'datepicker') {
                            new_data = replaceAll(new_data, '"' + p_columns[i].field + '":', '"' + p_columns[i].field + '_pix_":');
                        }
                    }
                }

                //var new_data = JSON.parse(replaceAll(replaceAll(replaceAll(replaceAll(JSON.stringify(data),'Date":','D_ate":'),'date":','d_ate":'),'Time":','T_ime":'),'time":','t_ime":'));
                var new_data = JSON.parse(new_data);


                $.ajax({
                    url: "json_blank.php",
                    dataType: "jsonp",
                    success: function (result) {
                        options.success(new_data);


                        var spreadsheet = $("#spreadsheet").data("kendoSpreadsheet");

                        var p_columns = p_window.p_columns_1D;
                        var k = 1;

                        /*높은 보안  new_data.length 가 원래는 100 이었음.*/
                        var range = spreadsheet.activeSheet().range(1, 0, new_data.length, field_count);
                        range.enable(false);
                        /*
                        var range = spreadsheet.activeSheet().range(1,0,100,2);
                        range.enable(false);*/

                        for (i = 0; i < p_columns.length; i++) {
                            if (p_columns[i].field) {
                                if (p_columns[i].width) {
                                    for (j = k; j < field_count - 1; j++) {
                                        /*
                                        console.log(p_columns[i].field);
                                        console.log(spreadsheet.activeSheet().range(0,j,1,1).value());
                                        console.log(jsonFromIndex(data[0], j).key);
                                        console.log(top.getFieldAttr(p_columns[i].field,'width'));
                                        console.log("---");
                                        */

                                        //if(p_columns[i].field=='chwigeuppummok') debugger;
                                        if (p_columns[i].field == 'saveDate') debugger;

                                        if (replaceAll(jsonFromIndex(new_data[0], j).key, '_pix_', '') == p_columns[i].field) {
                                            console.log("---");
                                            console.log(i);
                                            console.log(p_columns[i].field);
                                            console.log(p_columns[i].Grid_Schema_Type);
                                            console.log(p_columns[i].Grid_CtlName);

                                            k = j;

                                            var range2 = spreadsheet.activeSheet().range(1, k, new_data.length, 1);
                                            if (p_columns[i].Grid_Schema_Type == "date" || p_columns[i].Grid_CtlName == "datepicker") {
                                                range2.format("yyyy-MM-dd");
                                            } else if (p_columns[i].Grid_Schema_Type == "datetime" || p_columns[i].Grid_CtlName == "datetimepicker") {
                                                range2.format("yyyy-MM-dd HH:mm");
                                            } else if (p_columns[i].Grid_CtlName == "timepicker") {
                                                range2.format("HH:mm");
                                            }


                                            isEdit = "N";

                                            if (InStr(p_columns[i].Grid_CtlName, "columnsDropDownListEditor") > 0) {
                                                isEdit = "Y2";
                                            }
                                            if (p_columns[i].Grid_CtlName == "text" || p_columns[i].Grid_CtlName == "dropdownitem" || p_columns[i].Grid_CtlName == "check" || p_columns[i].Grid_CtlName == "textarea" || p_columns[i].Grid_CtlName == "timepicker" || p_columns[i].Grid_CtlName == "datepicker" || p_columns[i].Grid_CtlName == "datetimepicker") {
                                                if (p_columns[i].maxLength != undefined || p_columns[i].Grid_CtlName == "dropdownitem") {
                                                    this_fields[p_columns[i].field].editable = true;
                                                    isEdit = "Y";
                                                }
                                            }

                                            if (isEdit == "Y" || isEdit == "Y2") {
                                                if (isEdit == "Y2") {
                                                    var range = spreadsheet.activeSheet().range(1, j + 1, new_data.length, 1);
                                                    range.enable(true);
                                                } else {
                                                    var range = spreadsheet.activeSheet().range(1, j, new_data.length, 1);
                                                    range.enable(true);
                                                }
                                                range.background("#dfd");

                                            } else {
                                                var range = spreadsheet.activeSheet().range(1, j, new_data.length, 1);
                                                //if(!range.enable() && j>1) $("#spreadsheet").data("kendoSpreadsheet").activeSheet().hideColumn(j); 
                                            }
                                            spreadsheet.activeSheet().range(0, j, 1, 1).value(p_columns[i].title);
                                            console.log('title=' + p_columns[i].title);
                                            break;
                                        } else {
                                            var obj = getObjects(p_columns, "field", jsonFromIndex(new_data[0], j).key);
                                            if (obj.length == 1) {
                                                spreadsheet.activeSheet().range(0, j, 1, 1).value(obj[0].title);
                                                console.log('보충 title=' + obj[0].title);
                                            }
                                        }
                                    }
                                } else {
                                    if ($("#spreadsheet").data("kendoSpreadsheet").activeSheet()._columns._count > (i + 1)) {
                                        //$("#spreadsheet").data("kendoSpreadsheet").activeSheet().hideColumn(i-1); 
                                    }
                                }
                            }

                        };
                        columns_count = $("#spreadsheet").data("kendoSpreadsheet").activeSheet()._columns._count;
                        for (i = j; i < columns_count; i++) {
                            $("#spreadsheet").data("kendoSpreadsheet").activeSheet().hideColumn(i);
                        }

                        options.success(new_data);

                    }
                });
            }

            $("#save").click(function () {
                if (!$(this).hasClass("k-state-disabled")) {
                    dataSource.sync();
                }
            });

            $("#cancel").click(function () {
                if (!$(this).hasClass("k-state-disabled")) {
                    dataSource.cancelChanges();
                }
            });

        </script>
    </div>

</body>

</html>