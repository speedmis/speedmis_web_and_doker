<!--start view_inc.php-->
<style>
    <?php if ($isMenuIn == 'Y' || $screenMode == '1') { ?>
        a#btn_saveClose,
        a#btn_menuView {
            display: none !important;
        }

    <?php } ?>
    <?php if ($isIframe == 'Y') { ?>
        a#btn_list,
        a#btn_menuView {
            display: none !important;
        }

    <?php } ?>

    <?php if ($ActionFlag == 'view') { ?>
        .k-widget.k-upload.k-header>div.k-dropzone {
            display: none;
        }

        .k-widget.k-upload.k-header button.k-button.k-upload-action {
            display: none;
        }

        .k-widget.k-upload.k-header {
            border: 0;
        }

    <?php } ?>
</style>
<?php




if (isset($_GET["idx"]))
    $idx = $_GET["idx"];
else
    $idx = '';



$formGroupAll = ";";
$formGroupAll_alias = ";";

$dataSource_all = '';
$parent_ActionFlag = requestVB('parent_ActionFlag');

$control_maskedtextbox = <<<line
<div id="round_{aliasName}" class="form-group round_maskedtextbox row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="maskedtextbox col-xs-10 col-md-10">
<input id="{aliasName}" default='{Grid_Default}' data-role="maskedtextbox" data-text-field="{aliasName}" data-mask="{grid_schema_format}"
xrequired data-min-length="0" data-bind="source: {aliasName}Source, value: {aliasName}Value"/>
</div>
</div>
line;

$control_zipcode = <<<line
<div id="round_{aliasName}" class="form-group round_autocomplete zipcode row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="autocomplete zipcode col-xs-10 col-md-10">
<input id="{aliasName}" default='{Grid_Default}' data-role="textbox" data-text-field="name" maxlength="{Grid_MaxLength}" 
xrequired data-min-length="0" data-bind="value: {aliasName}Value" Grid_Schema_Type="zipcode"/>

<a role="button" class="k-button k-button-icontext zipcode">우편번호 찾기</a>

</div>
</div>
line;


$control_autocomplete = <<<line
<div id="round_{aliasName}" class="form-group round_autocomplete row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="autocomplete col-xs-10 col-md-10">
<input id="{aliasName}" default='{Grid_Default}' data-role="autocomplete" data-text-field="{aliasName}" maxlength="{Grid_MaxLength}" 
xrequired data-min-length="0" data-no-data-template="false" data-bind="source: {aliasName}Source, value: {aliasName}Value"/>
</div>
</div>
line;

$control_textbox = <<<line
<div id="round_{aliasName}" class="form-group round_autocomplete row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="autocomplete col-xs-10 col-md-10">
<input id="{aliasName}" default='{Grid_Default}' data-role="textbox" data-text-field="{aliasName}" maxlength="{Grid_MaxLength}" 
xrequired data-min-length="0" data-no-data-template="false" data-bind="source: {aliasName}Source, value: {aliasName}Value"/>
</div>
</div>
line;

$control_textdecrypt1 = <<<line
<div id="round_{aliasName}" class="form-group round_textdecrypt1 row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="autocomplete textdecrypt1 col-xs-10 col-md-10">
<input id="{aliasName}" default='{Grid_Default}' data-role="textbox" data-text-field="{aliasName}" maxlength="{Grid_MaxLength}" 
xrequired data-min-length="0" data-bind="source: {aliasName}Source, value: {aliasName}Value"/>
</div>
</div>
line;

$control_textdecrypt2 = <<<line
<div id="round_{aliasName}" class="form-group round_textdecrypt2 row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="textdecrypt2 col-xs-10 col-md-10">
<input id="{aliasName}" type="text" autocomplete="off" maxlength="{Grid_MaxLength}" 
xrequired class="k-input" disabled/>
<input id="isPassSave_{aliasName}" key="{aliasName}" type="checkbox" class="isPassSave k-checkbox">
<label for="isPassSave_{aliasName}" class="k-checkbox-label col-form-label">체크후 저장가능</label>
</div>
</div>
line;


$control_numerictextbox = <<<line
<div id="round_{aliasName}" class="form-group round_numerictextbox row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="numerictextbox col-xs-10 col-md-10">
<input id="{aliasName}" xrequired default='{Grid_Default}' data-spinners="false"
data-role="numerictextbox" data-text-field="name" data-bind="value: {aliasName}Value" xclass="form-control"/>
</div>
</div>
line;



//달력컨트롤은 무조건 네이티브 피커 쓰는 걸로. 자바스크립트 변경사항 없음.
$control_datepicker = <<<line
<div id="round_{aliasName}" class="form-group round_datepicker row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"></span>
</label>
<div class="datepicker col-xs-10 col-md-10">
<input 
    id="{aliasName}" 
    type="date" 
    xrequired 
    data-bind="value: {aliasName}Value" 
    data-text-field="name" 
    class="k-autocomplete k-widget k-datepicker"
    default='{Grid_Default}'
    
    style="width: 100%; height: 30px;" 
/>
</div>
</div>
line;


$control_timepicker = <<<line
<div id="round_{aliasName}" class="form-group round_timepicker row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="timepicker col-xs-10 col-md-10">
<input id="{aliasName}" xrequired data-role="timepicker" data-format="HH:mm" data-bind="value: {aliasName}Value" data-text-field="name" 
default='{Grid_Default}'/>
</div>
</div>
line;

$control_datetimepicker = <<<line
<div id="round_{aliasName}" class="form-group round_datetimepicker row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="datetimepicker col-xs-10 col-md-10">
<input id="{aliasName}" xrequired data-role="datetimepicker" data-bind="value: {aliasName}Value" data-text-field="name" 
default='{Grid_Default}' data-format="yyyy-MM-dd HH:mm"/>
</div>
</div>
line;

$control_helpbox = <<<line
<div id="round_{aliasName}" class="form-group round_helpbox row row-1 col-xs-12 col-sm-6 col-lg-6">
<label for="{aliasName}" style="width: calc(100% - 29px);" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
| {next_Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="autocomplete col-xs-12 col-lg-12">
<input id="{pre_aliasName}" data-role="autocomplete" class="round_helpbox1" data-text-field="{pre_aliasName}" title="표시명"
data-bind="value: {pre_aliasName}Value" style="width: calc(50% - 10px); max-width:350px; display: inline-block;"/>
<input id="{aliasName}" default='{Grid_Default}' data-role="autocomplete" class="round_helpbox2" data-text-field="name" maxlength="{Grid_MaxLength}" title="코드(저장값)"
xrequired data-min-length="0" data-bind="value: {aliasName}Value" style="width: calc(50% - 90px); max-width:150px; display: inline-block;"/>

<a role="button" class="k-button k-button-icontext" class="round_helpbox3" style="width: 30px;min-width:30px;">..</a>
<textarea id="helplist_{aliasName}" class="txt_helplist" style="display:none;">{Grid_Schema_Validation}</textarea>
</div>
</div>
line;

//https://demos.telerik.com/kendo-ui/mvvm/remote-binding
$control_dropdownlist = <<<line
<script type="text/x-kendo-template" id="headerTemplate_{aliasName}">
<div id="div_headerTemplate_{aliasName}" class="helplist k-popup"></div>
</script>

<div id="round_{aliasName}" class="form-group round_dropdownlist row {Grid_View_Class} {Grid_MaxLength_abs}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="col-xs-10 col-md-10">
<select id="{aliasName}" data-role="dropdownlist" data-text-field="{pre_aliasName}" data-value-field="{aliasName}" 
xrequired default='{Grid_Default}' data-header-template="headerTemplate_{aliasName}" data-auto-bind="true" data-filter="contains"
data-filter="contains" data-bind="source: {aliasName}Source, value: {aliasName}Value" xclass="form-control"></select>
<textarea id="helplist_{aliasName}" class="txt_helplist" style="display:none;">{Grid_Schema_Validation}</textarea>
</div>
</div>
line;

$control_dropdownlist_mobile = <<<line
<script type="text/x-kendo-template" id="headerTemplate_{aliasName}">
<div id="div_headerTemplate_{aliasName}" class="helplist k-popup"></div>
</script>

<div id="round_{aliasName}" class="form-group round_dropdownlist row {Grid_View_Class} {Grid_MaxLength_abs}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="col-xs-10 col-md-10">
<select id="{aliasName}" data-text-field="{pre_aliasName}" data-value-field="{aliasName}" 
class="k-widget k-dropdown"
xrequired default='{Grid_Default}' data-header-template="headerTemplate_{aliasName}" data-auto-bind="true" data-filter="contains"
data-filter="contains" data-bind="source: {aliasName}Source, value: {aliasName}Value" xclass="form-control"></select>
<span class="k-icon  k-i-arrow-60-up k-panelbar-collapse" style="right: auto;margin-left: -24px;"></span>
<textarea id="helplist_{aliasName}" class="txt_helplist" style="display:none;">{Grid_Schema_Validation}</textarea>
</div>
</div>
line;



$control_dropdownitem = <<<line
<textarea id="list_{aliasName}" style="display: none;" class="dropdownitem Grid_Items">{Grid_Items}</textarea>
<textarea id="default_{aliasName}" style="display: none;">{Grid_Default}</textarea>
<div id="round_{aliasName}" class="form-group round_dropdownlist row {Grid_View_Class} {Grid_MaxLength_abs}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="col-xs-10 col-md-10">
<select id="{aliasName}" data-role="dropdownlist" data-text-field="text" data-value-field="value" data-auto-bind="true" data-filter="contains"
Grid_Items="" default="" xrequired
data-bind="source: {aliasName}Source, value: {aliasName}Value" xclass="form-control"></select>
</div>
</div>
<script>
    $("select#{aliasName}").attr("Grid_Items", $("textarea#list_{aliasName}").val());
    $("select#{aliasName}").attr("default", $("textarea#default_{aliasName}").val());
</script>
line;
if ($isMobile == 'xxxY') {
    $control_dropdownitem = <<<line
<textarea id="list_{aliasName}" style="display: none;" class="dropdownitem Grid_Items">{Grid_Items}</textarea>
<textarea id="default_{aliasName}" style="display: none;">{Grid_Default}</textarea>
<div id="round_{aliasName}" class="form-group round_dropdownlist row {Grid_View_Class} {Grid_MaxLength_abs}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="col-xs-10 col-md-10">
<select id="{aliasName}" data-text-field="text" data-value-field="value" data-auto-bind="true" data-filter="contains"
class="k-widget k-dropdown"
Grid_Items="" default="" xrequired></select>
<span class="k-icon  k-i-arrow-60-up k-panelbar-collapse" style="right: auto;margin-left: -24px;"></span>
</div>
</div>
<script>
    $("select#{aliasName}").attr("Grid_Items", $("textarea#list_{aliasName}").val());
    $("select#{aliasName}").attr("default", $("textarea#default_{aliasName}").val());
</script>
line;
}



//https://demos.telerik.com/kendo-ui/multiselect/mvvm
//multiselect 는 네이티브피커 지원안함(웹뷰에서만 가능).
$control_multiselect = <<<line
<textarea id="list_{aliasName}" style="display: none;" class="multiselect Grid_Items">{Grid_Items}</textarea>
<textarea id="default_{aliasName}" style="display: none;">{Grid_Default}</textarea>
<div id="round_{aliasName}" class="form-group round_multiselect row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="col-xs-10 col-md-10">
<select id="{aliasName}" data-role="multiselect" data-text-field="text" data-value-field="value" 
multiple="multiple" Grid_Items="" default="" xrequired data-value-primitive="true" data-auto-bind="false" 
data-filter="contains"
data-bind="source: {aliasName}Source, value: {aliasName}Value" xclass="form-control"></select>
</div>
</div>
<script>
    $("select#{aliasName}").attr("Grid_Items", $("textarea#list_{aliasName}").val());
    $("select#{aliasName}").attr("default", $("textarea#default_{aliasName}").val());
</script>
line;



//mvvm 에서 treeview 의 value 를 미리 정의하면 이상하게 에러남. value: {aliasName}Value 제외.
//아래와 같이 control_dropdowntree 는 list 에서는 dropdowntree 를, write 에서는 treeview 로 작동함.
$control_dropdowntree = <<<line
<textarea id="list_{aliasName}" style="display: none;"  class="dropdowntree Grid_Items">{Grid_Items}</textarea>
<textarea id="default_{aliasName}" style="display: none;">{Grid_Default}</textarea>
<div id="round_{aliasName}" class="form-group round_dropdowntree row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="col-xs-10 col-md-10" style="width:calc(100% - 30px);">
<div id="{aliasName}" data-role="treeview" data-text-field="text" data-value-field="value" 
data-checkboxes="{checkChildren: true}"
Grid_Items="" default="" xrequired
data-bind="source: {aliasName}Source"></div>
</div>
</div>
<script>
    $("div#{aliasName}").attr("Grid_Items", $("textarea#list_{aliasName}").val());
    $("div#{aliasName}").attr("default", $("textarea#default_{aliasName}").val());
</script>
line;



$control_editor = <<<line
<div id="round_{aliasName}" class="form-group round_editor row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="col-xs-12" style="height: calc(100% - 30px);">
<textarea id="{aliasName}_template" style="display: none;">
<input id="{aliasName}_customuploadFiles" name="{aliasName}_customuploadFiles" type="file" class="editorFile" aliasName="{aliasName}"/>
</textarea>
<textarea id="{aliasName}" data-role="editor" data-text-field="name"
                      data-tools="['bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            'justifyLeft',
                            'justifyCenter',
                            'justifyRight',
                            'justifyFull',
                            'insertUnorderedList',
                            'insertOrderedList',
                            'indent',
                            'outdent',
                            'createLink',
                            'unlink',
                            'insertImage',
                            'tableWizard',
                            {
                                name: 'customupload',
                                tooltip: 'Upload my image files',
                                template: $('#{aliasName}_template').val(),
                            },
                            {
                                name: 'customuploadexec',
                                exec: function(e) {
                                    var editor = $(this).data('kendoEditor');
                                    editor.exec('inserthtml', { value: document.getElementById('temp1').value });
                                    document.getElementById('temp1').value = '';
                                }
                            },
line;

if ($screenMode != "1")
    $control_editor = $control_editor . <<<line
                            'createTable',
                            'addRowAbove',
                            'addRowBelow',
                            'addColumnLeft',
                            'addColumnRight',
                            'deleteRow',
                            'deleteColumn',
                            'viewHtml',
                            'formatting',
                            'cleanFormatting',
                            'fontName',
                            'fontSize',
                            'foreColor',
                            'backColor',
line;

$control_editor = $control_editor . <<<line
                            ]"
                      data-bind="value: {aliasName}Value,
                                 events: { change: onChange }"
                      style="height: 100%;"></textarea>
</div>
</div>
line;

$dataSource_pure_autocomplete = <<<line

              {aliasName}Source: new kendo.data.DataSource({
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: {
                        url: "list_json.php?flag=onefield&RealPid={RealPid}&MisJoinPid={MisJoinPid}",
                        dataType: "jsonp",
                        data: {
                            selField: "{aliasName}",
                            selValue: "",
                            app: "",    //사용자정의용
                        },
                        complete: function (jqXHR, textStatus) {
                            if(typeof complete_{aliasName}=='function') complete_{aliasName}(jqXHR, textStatus);
                        }
                    }
                },
                requestStart: function(e) {
                    e.sender.transport.options.read.data.selValue = $('input[data-text-field="'+e.sender.options.transport.read.data.selField+'"][data-role="autocomplete"]')[0].value;
                    //e.sender.transport.options.read.data.app = document.getElementById('app').value;
                },
                schema: {
                    data: function (response) {
                        return response.d.results;
                    },
                },
              }),

line;

$dataSource_pure_dropdownitem = <<<line

              {aliasName}Source: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "list_grid_items.php?RealPid={RealPid}&MisJoinPid={MisJoinPid}"
		+"&parent_gubun="+document.getElementById("parent_gubun").value
		+"&parent_idx="+document.getElementById("parent_idx").value
		+"&idx="+document.getElementById("idx").value
		+"&aliasName={aliasName}&ctl=dropdownitem&blank=Y"
                    },
                    complete: function (jqXHR, textStatus) {
                        if(typeof complete_{aliasName}=='function') complete_{aliasName}(jqXHR, textStatus);
                    }
                }

              }),

line;

$dataSource_pure_multiselect = <<<line

              {aliasName}Source: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "list_grid_items.php?RealPid={RealPid}&MisJoinPid={MisJoinPid}"
		+"&parent_gubun="+document.getElementById("parent_gubun").value
		+"&parent_idx="+document.getElementById("parent_idx").value
		+"&idx="+document.getElementById("idx").value
		+"&aliasName={aliasName}&ctl=multiselect&blank=N",
                        data: {
                            selCode: "",    //일단 선언
                            app: "",    //사용자정의용
                        },
                        complete: function (jqXHR, textStatus) {
                            if(typeof complete_{aliasName}=='function') complete_{aliasName}(jqXHR, textStatus);
                        }
                    }
                    
                },
                requestStart: function(e) {
                    //if(isMobile()==true) {
                    //    $('select#{aliasName}').data("kendoMultiSelect").input.attr("readonly", true);
                    //    $('select#{aliasName}').parent().find('input.k-input').hide();
                    //}

                    //console.log('{aliasName}Source'+$('body').prop('{aliasName}Source'));
					if(event) {
                        if(event.type=="readystatechange") {
							if(resultAll.d.results[0]) e.sender.transport.options.read.data.selCode = resultAll.d.results[0].{aliasName};
                            else if($({aliasName}).attr('default')!=undefined) e.sender.transport.options.read.data.selCode = $({aliasName}).attr('default');
                        } else if({aliasName}.value!='') e.sender.transport.options.read.data.selCode = {aliasName}.value;
                    } else e.sender.transport.options.read.data.selCode = '';
                    e.sender.transport.options.read.data.app = document.getElementById('app').value;
                   
                }

              }),

line;


$dataSource_pure = <<<line
              {aliasName}Source: new kendo.data.DataSource({
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: {
                        url: "json_codeSelect.php?RealPid={RealPid}&MisJoinPid={MisJoinPid}&parent_idx={parent_idx}&dataTextField={pre_aliasName}&dataValueField={aliasName}",
                        dataType: "jsonp",
                        data: {
                            selCode: "",    //일단 선언
                            app: "",    //사용자정의용
                            idx: document.getElementById("idx").value,
                            helplist: $("textarea#helplist_{aliasName}").val(),
                            helplistwidth: ""
                        },
                        complete: function (jqXHR, textStatus) {
                            //if(jqXHR.responseJSON.d.__count >= jqXHR.responseJSON.d.__count_all && this.url.split('filter=substringof').length==1) {      //단계별 드롭다운일때 에러날수있으나, 큰문제 아님.
                            //    $("div#{aliasName}-list > span.k-list-filter").css("display","none");
                            //} else {
                                $("div#{aliasName}-list > span.k-list-filter").css("display","inline-block");
                            //}
                            //if('{aliasName}'=='MenuType') debugger;
                            //console.log(this.url);
                            //this.url = this.url.split('&%24filter=')[0];
                            if($('select#MisJoinPid').data('kendoDropDownList')) {
                                if($('select#{aliasName}').data('kendoDropDownList').dataSource._filter) {
                                    $('select#{aliasName}').data('kendoDropDownList').dataSource._filter.filters = [];
                                }
                            }
                            //console.log(this.url);
                            if(typeof complete_{aliasName}=='function') complete_{aliasName}(jqXHR, textStatus);
                        }
                    }
                },
                requestStart: function(e) {
                    //if('{aliasName}'=='MenuType') debugger;
                    if($('body').prop('{aliasName}Source')=='reading' && pre_reading_idx==$('input#idx').val()) {    //두번읽지 않게 막음.
                        //console.log('허가여부:거부 {aliasName}Source'+$('body').prop('{aliasName}Source'));
                        //console.log('허가여부:거부 '+$('input#idx').val());
                        return false;
                    } else {
                        pre_reading_idx = $('input#idx').val();
                        //console.log('허가여부:허락 {aliasName}Source'+$('body').prop('{aliasName}Source'));
                        //console.log('허가여부:허락 '+$('input#idx').val());
                    }
                    $('body').prop('{aliasName}Source','reading');
                    setTimeout( function() {
                        $('body').prop('{aliasName}Source','read');
                    },2000);
                    
                    //console.log('{aliasName}Source'+$('body').prop('{aliasName}Source'));
                    delta = 0;
					//index.php style 또는 서버로직에 설정된 help width 캐치
					if($('div.k-list-container.helplist-container').length==0) {
						$('body').append('<div class="k-list-container helplist-container"></div>');
						helpfullwith = $('div.k-list-container.helplist-container').width();
						$('div.k-list-container.helplist-container').remove();
					}
					helplistwidth = '';
                    if(isJsonString(e.sender.transport.options.read.data.helplist)) {
                        helplist = JSON.parse(e.sender.transport.options.read.data.helplist);
                        tot_iwidth = 0;
                        for(t=0;t<helplist.length;t++) {
                            item = helplist[t];
							if(isNumeric(item)) {
								helpfullwith = item;
								$('#style_helplist_container')[0].innerHTML = 
`
body[ismobile="N"] div.k-list-container.helplist-container {
    width: `+helpfullwith+`px!important;
    min-height: 320px!important;
}
`;
							} else {
								if(InStr(item,'.')>0) {
									iwidth = item.split('.')[1]*1;
								} else {
									if($('label[grid_columns_title="'+item.split('.')[0]+'"]')[0]) {
										iwidth = Math.abs($('label[grid_columns_title="'+item.split('.')[0]+'"]').attr('grid_columns_width')*1-14)/8;
									} else iwidth = 20;
									if(iwidth<=1) iwidth = 20;
								}
								tot_iwidth = tot_iwidth + iwidth;
							}
                        }


                        if(isMobile()) {
                            if($(document).width()>helpfullwith) document_width = helpfullwith;
                            else document_width = $(document).width();
                        } else {
                            document_width = helpfullwith;
                        }
                        delta = document_width / tot_iwidth / 7;   //좌우꽉찬화면구현
                        for(t=0;t<helplist.length;t++) {
                            item = helplist[t];
							if(isNumeric(item)) {
					
							} else {
								item_field = $('label[grid_columns_title="'+item.split('.')[0]+'"]').attr('for');
								if(InStr(item,'.')>0) {
									iwidth = item.split('.')[1]*1;
								} else {
									if($('label[grid_columns_title="'+item.split('.')[0]+'"]')[0]) {
										iwidth = Math.abs($('label[grid_columns_title="'+item.split('.')[0]+'"]').attr('grid_columns_width')*1-14)/8;
									} else iwidth = 20;
									if(iwidth<=1) iwidth = 20;
								}
								item = item.split('.')[0];

								if($('input#'+item_field).attr('data-role')=='numerictextbox') helplist_align = 'R';
								else helplist_align = '';

								iwidth = Math.floor(iwidth * delta);
								helplistwidth = helplistwidth + iwidth + '.' + helplist_align + iif(t<helplist.length-1,';','');
							}
                        }
                    }
                    //특히 로딩 시, 초기값을 보내야 해당값이 목록결과가 많을 경우에도 보임(json_codeSelect.php 에서 해당값 포함)
                    if(event) {
                        if(event.type=="readystatechange") {
							if(resultAll.d.results[0]) e.sender.transport.options.read.data.selCode = resultAll.d.results[0].{aliasName};
                            else if($({aliasName}).attr('default')!=undefined) e.sender.transport.options.read.data.selCode = $({aliasName}).attr('default');
                        } else if({aliasName}.value!='') e.sender.transport.options.read.data.selCode = {aliasName}.value;
                    } else e.sender.transport.options.read.data.selCode = '';
                    e.sender.transport.options.read.data.helplistwidth = helplistwidth;
                    e.sender.transport.options.read.data.idx = document.getElementById("idx").value;
                    e.sender.transport.options.read.data.app = document.getElementById('app').value;

                },
                schema: {
                    data: function (response) {
                      if(response.d.msg!="") {
                        if(typeof parent.toastr=="object") toastr_obj = parent.toastr; else toastr_obj = toastr;
                        if(event) toastr_obj.success(response.d.msg, "검색결과", {timeOut: 2000, positionClass: "toast-bottom-right"});
                      }
                      return response.d.results;
                    },
                },
              }),

line;

$control_upload = <<<line
<div id="round_{aliasName}" class="form-group round_upload row {Grid_View_Class} {Grid_MaxLength_abs}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="upload col-xs-10 col-md-10">
<input id="{aliasName}" name="{aliasName}" type="file" data-role="upload" aria-label="files" default='{Grid_Default}' 
validation='{validation}' xrequired
data-multiple='false'
data-async="{ saveUrl: '{saveUrl}', removeUrl: '{removeUrl}', autoUpload: true }"
data-bind="events: { select: onSelect_{aliasName}, success: onSuccess_{aliasName}, remove: onRemove_{aliasName}, complete: onComplete_{aliasName} }"/>
</div>
</div>
line;



$control_checkbox = <<<line
<div id="round_{aliasName}" class="form-group round_checkbox row {Grid_View_Class} {Grid_MaxLength_abs}">
<div class="checkbox col-xs-10 col-md-10">
<input id="{aliasName}" data-text-field="name" type="checkbox" class="k-checkbox" xrequired Grid_Schema_Type="{Grid_Schema_Type}"
data-bind="checked: {aliasName}Checked" default='{Grid_Default}'/>
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="k-checkbox-label col-xs-12 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>

</div>
</div>
line;

$control_textarea = <<<line
<div id="round_{aliasName}" class="form-group round_textarea row {Grid_View_Class}">
<label for="{aliasName}" Grid_Columns_Title="{Grid_Columns_Title}" Grid_Columns_Title0="{Grid_Columns_Title0}" Grid_Columns_Width='{Grid_Columns_Width}' class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="textarea col-xs-12 col-md-12" style="height: calc(100% - 23px);">
<textarea id="{aliasName}" readonly class="k-textbox" default='{Grid_Default}'
style="width: calc(100% - 30px);" xrequired maxlength="{Grid_MaxLength}"
data-text-field="name" 
data-bind="source: colors, value: {aliasName}Value"></textarea>
</div>
</div>
line;

$control_child = <<<line
<div id="round_{aliasName}" class="form-group round_child row {Grid_View_Class}">
<div class="col-xs-12">
<iframe id="{aliasName}" src="about:blank" gubun='{Grid_Default}' real_src='{Grid_Default}' tabrealpid='{Grid_Default}' xonload="span_cnt_init(this);"
marginwidth=0 marginheight=0 frameborder=0 scrolling="no" style="width:100%;overflow-x: hidden;overflow-y: hidden;"
width="100%" height="100%">
</iframe>
</div>
</div>
line;


$control_iframe = <<<line
<div id="round_{aliasName}" class="form-group round_iframe row col-xs-12">
<div class="col-xs-12" style="padding-left: 0;padding-right: 0;height: 100%;">
<iframe id="{aliasName}" src="about:blank" real_src='{Grid_Default}' tabrealpid='{Grid_Default}'
marginwidth=0 marginheight=0 frameborder=0 scrolling="no" style="width:100%;overflow-x: hidden;overflow-y: hidden;"
width="100%" height="100%">
</iframe>
</div>
</div>
line;

$control_nocontrol = <<<line
<div id="round_{aliasName}" class="form-group round_nocontrol row {Grid_View_Class}">
<label class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="nocontrol">
<div id="{aliasName}" data-bind="text: {aliasName}Value" Grid_Templete="N" Grid_CtlName_ori="{Grid_CtlName_ori}"></div>
</div>
</div>
line;


$control_nocontrol_pre = <<<line
<div id="round_{aliasName}" class="form-group round_nocontrol_pre row {Grid_View_Class}">
<label class="col-xs-11 col-form-label">{Grid_Columns_Title}
<span class="alim k-checkbox"><!--alim--></span>
</label>
<div class="nocontrol_pre col-xs-12 col-md-12"><pre>
<div id="{aliasName}" data-bind="text: {aliasName}Value"></div>
</pre>
</div>
</div>
line;


if ($ActionFlag == 'view') {
    $control_dropdownitem = replace($control_dropdownitem, 'label for', 'label xfor');
    $control_upload = replace($control_upload, 'label for', 'label xfor');
}

if ($MS_MJ_MY == 'MY') {
    $strsql = "
    select 
    d.idx
    ,ifnull(dbalias,'') as dbalias
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
    ,ifnull(g13,'') as g13
    ,ifnull(d.aliasName,'') as aliasName
    ,Grid_Columns_Title
    ,SortElement as SortElement
    ,ifnull(Grid_Columns_Width,'') as Grid_Columns_Width
    ,ifnull(Grid_Enter,'') as Grid_Enter
    ,ifnull(Grid_View_Class,'') as Grid_View_Class
    ,ifnull(Grid_Align,'') as Grid_Align
    ,ifnull(Grid_Orderby,'') as Grid_Orderby
    ,ifnull(Grid_MaxLength,'') as Grid_MaxLength
    ,ifnull(Grid_Default,'') as Grid_Default
    ,ifnull(Grid_Select_Tname,'') as Grid_Select_Tname
    ,ifnull(Grid_Select_Field,'') as Grid_Select_Field
    ,ifnull(Grid_GroupCompute,'') as Grid_GroupCompute
    ,ifnull(Grid_CtlName,'') as Grid_CtlName 
    ,ifnull(Grid_Items,'') as Grid_Items 
    ,ifnull(Grid_IsHandle,'') as Grid_IsHandle
    ,ifnull(Grid_ListEdit,'') as Grid_ListEdit
    ,ifnull(Grid_Templete,'') as Grid_Templete
    ,ifnull(Grid_Schema_Validation,'') as Grid_Schema_Validation
    ,ifnull(Grid_PrimeKey,'') as Grid_PrimeKey
    ,ifnull(Grid_Alim,'') as Grid_Alim
    ,ifnull(Grid_Pil,'') as Grid_Pil
    ,ifnull(Grid_FormGroup,'') as Grid_FormGroup
    ,ifnull(Grid_Schema_Type,'') as Grid_Schema_Type
    from $MisMenuList_Detail d
    left outer join MisMenuList m on m.RealPid=d.RealPid
    where d.RealPid='" . iif($MisJoinPid != "", $MisJoinPid, $RealPid) . "' ";
    /*
        if($ActionFlag=="xxxwrite") {
            $strsql = $strsql . " 
        and ifnull(Grid_CtlName,'')<>'child' 
        and ifnull(Grid_Select_Tname,'')<>'virtual_field' 
        ";
        }
    */
    if ($ActionFlag == 'write') {
        $strsql = $strsql . " 
    and ifnull(Grid_CtlName,'')<>'child' 
    ";
    }
    if ($ActionFlag == 'view') {
        $strsql = $strsql . " 
    and ifnull(Grid_Select_Tname,'')<>'virtual_field xxxx' 
    ";
    }
    $strsql = $strsql . " 
    order by sortelement;
    ";
} else {
    $strsql = "
    select 
    d.idx
    ,m.dbalias
    ,m.g01
    ,m.g03
    ,m.g05
    ,m.g06
    ,m.g07
    ,m.g08
    ,m.g09
    ,m.g10
    ,m.g11
    ,m.g12
    ,m.g13
    ,d.aliasName
    ,d.Grid_Columns_Title
    ,d.SortElement
    ,d.Grid_FormGroup
    ,d.Grid_Columns_Width
    ,d.Grid_Enter
    ,d.Grid_View_Class
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
    where d.RealPid='" . iif($MisJoinPid != "", $MisJoinPid, $RealPid) . "' ";
    /*
        if($ActionFlag=="xxxwrite") {
            $strsql = $strsql . " 
        and d.Grid_CtlName<>'child' 
        and d.Grid_Select_Tname<>'virtual_field' 
        ";
        }
    */
    if ($ActionFlag == 'write') {
        $strsql = $strsql . " 
    and d.Grid_CtlName<>'child' 
    ";
    }
    if ($ActionFlag == 'view') {
        $strsql = $strsql . " 
    and d.Grid_Select_Tname<>'virtual_field xxxx' 
    ";
    }
    $strsql = $strsql . " 
    order by sortelement;
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

$dataSource_sort = '';
$group_field = '';

$aliasNameAll = ";";

$result = allreturnSql($strsql);
//echo $strsql;
if (function_exists("misMenuList_change")) {
    misMenuList_change();
}

$mm = 0;
$cnt_viewListCol = 0;
$resultCnt = count($result);


if ($RealPid != "speedmis000980" && $RealPid != "speedmis000979") {

    //virtual_field 필독멤버를 쓰기시 저장.
    if ($ActionFlag == 'write') {

        if (requestVB("notab") != "Y") {
            $result[$resultCnt] = $result[0];
            $result[$resultCnt]["idx"] = 1;
            $result[$resultCnt]["aliasName"] = "virtual_fieldQnmisPildokMem";
            $result[$resultCnt]["SortElement"] = $resultCnt + 1;
            $result[$resultCnt]["Grid_Columns_Width"] = "0";

            $result[$resultCnt]["Grid_Columns_Title"] = "필독멤버";
            $result[$resultCnt]["Grid_MaxLength"] = "1000";
            //$result[$resultCnt]["Grid_Pil"] = "Y";
            $result[$resultCnt]["Grid_Select_Tname"] = 'virtual_field';
            $result[$resultCnt]["Grid_Select_Field"] = "misPildokMem";
            $result[$resultCnt]["Grid_Default"] = '';






            if ($MS_MJ_MY == 'MY') {
                $pildok_sql = "select table_m.UniqueNum as 'value' 
                ,concat(table_m.UserName,' | ',ifnull(table_Station_NewNum2.stationname,''),case when ifnull(table_Station_NewNum4.stationname,'')='' then '' 
                else concat(' > ', ifnull(table_Station_NewNum4.stationname,'')) end,case when length(ifnull(table_Station_NewNum.AutoGubun,''))>=6 then concat(' > ' , ifnull(table_Station_NewNum.stationname,'')) else '' end,' > ' 
                ,table_positionNum.kname,case when ifnull(telegram_chat_id,'')<>'' then ' (Telegram OK)' else '' end) as 'text' 
                from MisUser table_m    
                left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum and table_Station_NewNum.useflag=1
                left outer join MisStation table_Station_NewNum2 on table_Station_NewNum2.autogubun = left(table_Station_NewNum.autogubun,2)   
                left outer join MisStation table_Station_NewNum4 on table_Station_NewNum4.autogubun = left(table_Station_NewNum.autogubun,4) 
                and length(table_Station_NewNum.autogubun)>=4    
                left outer join MisCommonTable table_positionNum on table_positionNum.kcode = table_m.positionNum     
                and table_positionNum.gcode='speedmis000188'    
                where table_m.delchk<>'D' and ((datediff(table_m.toisa_date,DATE_FORMAT(NOW(), '%Y-%m-%d'))<=0) 
                or lTrim(ifnull(table_m.toisa_date,''))='') and ifnull(table_m.isRest,'')<>'Y' ";
                $pildok_sql = $pildok_sql . " and (table_m.UniqueNum not in ('gadmin') or 'gadmin'='$MisSession_UserID')";

                if ($parent_gubun != "") {
                    $pildok_sql = $pildok_sql . " and (table_m.UniqueNum in (select userid from MisMenuList_Member where RealPid='" . GubunIntoRealPid($parent_gubun) . "') or (select AuthCode from MisMenuList where RealPid='" . GubunIntoRealPid($parent_gubun) . "') in ('','01')) ";
                } else {
                    $pildok_sql = $pildok_sql . " and (table_m.UniqueNum in (select userid from MisMenuList_Member where RealPid='$RealPid') or (select AuthCode from MisMenuList where RealPid='$RealPid') in ('','01')) ";
                }
                $pildok_sql = $pildok_sql . " order by table_Station_NewNum.AutoGubun, table_m.positionNum; ";

            } else {
                $pildok_sql = "select table_m.UniqueNum as 'value' 
                ,table_m.UserName+' | '+isnull(table_Station_NewNum2.stationname,'')+case when isnull(table_Station_NewNum4.stationname,'')='' then '' else ' > ' 
                + isnull(table_Station_NewNum4.stationname,'') end+case when len(isnull(table_Station_NewNum.AutoGubun,''))>=6 then ' > ' + isnull(table_Station_NewNum.stationname,'') else '' end + ' > ' 
                +table_positionNum.kname+case when isnull(telegram_chat_id,'')<>'' then ' (Telegram OK)' else '' end as 'text' 
                from MisUser table_m    
                left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum and table_Station_NewNum.useflag=1
                left outer join MisStation table_Station_NewNum2 on table_Station_NewNum2.autogubun = left(table_Station_NewNum.autogubun,2)   
                left outer join MisStation table_Station_NewNum4 on table_Station_NewNum4.autogubun = left(table_Station_NewNum.autogubun,4) 
                and len(table_Station_NewNum.autogubun)>=4    
                left outer join MisCommonTable table_positionNum on table_positionNum.kcode = table_m.positionNum     
                and table_positionNum.gcode='speedmis000188'    
                where table_m.delchk<>'D' and ((datediff(day,table_m.toisa_date,convert(char(10),getdate(),120))<=0) 
                or lTrim(isnull(table_m.toisa_date,''))='') and isnull(table_m.isRest,'')<>'Y' ";
                $pildok_sql = $pildok_sql . " and (table_m.UniqueNum not in ('gadmin') or 'gadmin'='$MisSession_UserID')";

                if ($parent_gubun != "") {
                    $pildok_sql = $pildok_sql . " and (table_m.UniqueNum in (select userid from MisMenuList_Member where RealPid='" . GubunIntoRealPid($parent_gubun) . "') or (select AuthCode from MisMenuList where RealPid='" . GubunIntoRealPid($parent_gubun) . "') in ('','01')) ";
                } else {
                    $pildok_sql = $pildok_sql . " and (table_m.UniqueNum in (select userid from MisMenuList_Member where RealPid='$RealPid') or (select AuthCode from MisMenuList where RealPid='$RealPid') in ('','01')) ";
                }
                $pildok_sql = $pildok_sql . " order by table_Station_NewNum.AutoGubun, table_m.positionNum ";

            }



            if ($RealPid == "speedmis000974") {
                $pildok_default_sql = replace($pildok_sql, "table_m.delchk<>'D'", "table_m.delchk<>'D' and table_m.UniqueNum in (select userid from MisReadList where RealPid=N'" . GubunIntoRealPid($parent_gubun) . "' and 자격<>'조회' and widx = '" . $parent_idx . "')");
                $result[$resultCnt]["Grid_Default"] = $pildok_default_sql;
                $result[$resultCnt]["Grid_Alim"] = "작성자 또는 필독인 경우 자동선택됨.";
                //echo  $pildok_sql;
            } else {
                $result[$resultCnt]["Grid_FormGroup"] = "필독멤버";
            }


            if (function_exists("change_pildok_member")) {
                change_pildok_member();
            }

            $result[$resultCnt]["Grid_Items"] = $pildok_sql;
            //echo $pildok_sql;

            $result[$resultCnt]["Grid_CtlName"] = "dropdowntree";

            ++$resultCnt;


            if ($isUseForm) {
                $result[$resultCnt] = $result[0];
                $result[$resultCnt]["idx"] = 1;
                $result[$resultCnt]["aliasName"] = "viewPrint";
                $result[$resultCnt]["SortElement"] = $resultCnt + 1;
                $result[$resultCnt]["Grid_Columns_Width"] = "0";
                $result[$resultCnt]["Grid_Columns_Title"] = $MenuName;
                $result[$resultCnt]["Grid_Default"] = '';
                $result[$resultCnt]["Grid_Select_Tname"] = '';
                $result[$resultCnt]["Grid_Select_Field"] = "''";
                $result[$resultCnt]["Grid_CtlName"] = '';
                $result[$resultCnt]["Grid_FormGroup"] = "입력폼";
                ++$resultCnt;
            }
        }
        //echo $resultCnt;
        //print_r($result);
        //exit;
    } else {

        //댓글 / 작성.조회내역.

        if ($RealPid != "speedmis000974") {


            if ($ActionFlag == 'view' && $SPREADSHEET_ID != '') {
                $result[$resultCnt] = $result[0];
                $result[$resultCnt]["idx"] = 1;
                $result[$resultCnt]["aliasName"] = "viewPrint";
                $result[$resultCnt]["SortElement"] = $resultCnt + 1;
                $result[$resultCnt]["Grid_Columns_Width"] = "0";
                $result[$resultCnt]["Grid_Columns_Title"] = $MenuName;
                $result[$resultCnt]["Grid_Default"] = '';
                $result[$resultCnt]["Grid_Select_Tname"] = '';
                $result[$resultCnt]["Grid_Select_Field"] = "''";
                $result[$resultCnt]["Grid_CtlName"] = '';
                $result[$resultCnt]["Grid_FormGroup"] = "구글폼";
                ++$resultCnt;
            } else if ($ActionFlag == 'view') {
                $result[$resultCnt] = $result[0];
                $result[$resultCnt]["idx"] = 1;
                $result[$resultCnt]["aliasName"] = "viewPrint";
                $result[$resultCnt]["SortElement"] = $resultCnt + 1;
                $result[$resultCnt]["Grid_Columns_Width"] = "0";
                $result[$resultCnt]["Grid_Columns_Title"] = $MenuName;
                $result[$resultCnt]["Grid_Default"] = '';
                $result[$resultCnt]["Grid_Select_Tname"] = '';
                $result[$resultCnt]["Grid_Select_Field"] = "''";
                $result[$resultCnt]["Grid_CtlName"] = '';
                $result[$resultCnt]["Grid_FormGroup"] = "인쇄폼";
                ++$resultCnt;
            } else if ($isUseForm) {
                $result[$resultCnt] = $result[0];
                $result[$resultCnt]["idx"] = 1;
                $result[$resultCnt]["aliasName"] = "viewPrint";
                $result[$resultCnt]["SortElement"] = $resultCnt + 1;
                $result[$resultCnt]["Grid_Columns_Width"] = "0";
                $result[$resultCnt]["Grid_Columns_Title"] = $MenuName;
                $result[$resultCnt]["Grid_Default"] = '';
                $result[$resultCnt]["Grid_Select_Tname"] = '';
                $result[$resultCnt]["Grid_Select_Field"] = "''";
                $result[$resultCnt]["Grid_CtlName"] = '';
                $result[$resultCnt]["Grid_FormGroup"] = "수정폼";
                ++$resultCnt;
            }

            //@MisSession 관련일 경우 댓글 제외시킴 - 알림으로 통보받아도 해당댓글이 안보임. 단 excel_where_1 형태만 존재하면 허용
            //if(InStr($result[0]["g09"],'@Mis')==0) {
            $excel_where_0 = replace($result[0]["g09"], ' ', '');
            $excel_where_1 = splitVB($excel_where_0, "table_member.userid='@MisSession_UserID'");
            $excel_where_2 = splitVB($excel_where_0, "'@MisSession_UserID'");
            if (count($excel_where_1) == count($excel_where_2)) {
                $result[$resultCnt] = $result[0];
                $result[$resultCnt]["idx"] = 1;
                $result[$resultCnt]["aliasName"] = "commentApp";
                $result[$resultCnt]["SortElement"] = $resultCnt + 1;
                $result[$resultCnt]["Grid_Columns_Width"] = "0";
                $result[$resultCnt]["Grid_Columns_Title"] = "댓글";
                $result[$resultCnt]["Grid_Default"] = "speedmis000974";
                $result[$resultCnt]["Grid_Select_Tname"] = '';
                $result[$resultCnt]["Grid_Select_Field"] = "''";
                $result[$resultCnt]["Grid_CtlName"] = "child";
                $result[$resultCnt]["Grid_FormGroup"] = "댓글";
                ++$resultCnt;
            }

        }

        $result[$resultCnt] = $result[0];
        $result[$resultCnt]["idx"] = 1;
        $result[$resultCnt]["aliasName"] = "readApp";
        $result[$resultCnt]["SortElement"] = $resultCnt + 1;
        $result[$resultCnt]["Grid_Columns_Width"] = "0";
        $result[$resultCnt]["Grid_Columns_Title"] = "작성/필독/결재";
        $result[$resultCnt]["Grid_Default"] = "speedmis000979";
        $result[$resultCnt]["Grid_Select_Tname"] = '';
        $result[$resultCnt]["Grid_Select_Field"] = "''";
        $result[$resultCnt]["Grid_CtlName"] = "child";
        $result[$resultCnt]["Grid_FormGroup"] = "작성/필독/결재";
        ++$resultCnt;

        //echo $resultCnt;
        //print_r($result);
        //exit;
    }

}


$view_html = '';
$control_all = array();
$control_cnt = 0;
$key_aliasName = '';
$viewPrint = '';

$select_alias_source = [];  //조회의 경우 참조쿼리는 정상작동하나, 수정/입력의 경우 table_m. 뒤의 값을 전달하는 동적 쿼리.
$select_alias_name = [];
if ($parent_idx == '')
    $parent_idx_count = 0;
else {
    $parent_idx_count = count(splitVB($parent_idx, '_-_'));
    if ($RealPid == 'speedmis000974' && $parent_idx_count > 1)
        $parent_idx_count = 1;
}

while ($mm < $resultCnt) {

    $control_line = '';
    $closeColumns = '';
    //print_r($mm . ":" . $result[$mm]["Grid_Align"]); 

    if ($table_m == "") {
        $dbalias = $result[$mm]["dbalias"];
        if ($dbalias == 'default')
            $dbalias = '';
        ///////////////////////////////////////////////////////////////////////////////////$BodyType = $result[$mm]["g01"];
        $Anti_SortWrite = $result[$mm]["g03"];           //최근순거부
        $brief_insertsql = $result[$mm]["g05"];          //간편추가쿼리
        $seekDate = $result[$mm]["g06"];          //기간검색항목명
        ///////////////////////////////////////////////////////////////////////////////////$Read_Only = $result[$mm]["g07"];          //읽기전용
        $table_m = $result[$mm]["g08"];          //테이블명
        $excel_where = $result[$mm]["g09"];          //기본필터
        $excel_where_ori = $excel_where;
        $useflag_sql = $result[$mm]["g10"];           //use조건
        $delflag_sql = $result[$mm]["g11"];           //삭제쿼리
        $isThisChild = $result[$mm]["g12"];           //아들여부
        $child_RealPid = $result[$mm]["g13"];           //아들구분값

        if ($useflag_sql == '') {
            $where_sql = $where_sql . " and table_m.useflag='1'\n";
        } else {
            $where_sql = $where_sql . " and $useflag_sql \n";
        }
        if ($excel_where != "") {
            $excel_where = replace($excel_where, "@MisSession_UserID", $MisSession_UserID);
            $excel_where = replace($excel_where, "@RealPid", $RealPid);
        }
        if ($ActionFlag == 'write') {
            $child_RealPid = '';
        }
    }

    $Grid_Columns_Title = $result[$mm]["Grid_Columns_Title"];
    if (InStr($Grid_Columns_Title, ':') > 0) {
        $Grid_Columns_Title = replace($Grid_Columns_Title, ':', '');
    }
    $Grid_Columns_Title0 = $Grid_Columns_Title;
    if (InStr($Grid_Columns_Title0, ',') > 0)
        $Grid_Columns_Title0 = splitVB($Grid_Columns_Title0, ',')[1];


    $Grid_Columns_Width = $result[$mm]["Grid_Columns_Width"];
    $Grid_Enter = $result[$mm]["Grid_Enter"];
    $Grid_View_Class = 'col-xxs-12 ' . $result[$mm]["Grid_View_Class"];




    $Grid_Align = $result[$mm]["Grid_Align"];
    $Grid_Orderby = $result[$mm]["Grid_Orderby"];
    $Grid_MaxLength = $result[$mm]["Grid_MaxLength"];
    $Grid_PrimeKey = $result[$mm]["Grid_PrimeKey"];
    $Grid_CtlName = $result[$mm]["Grid_CtlName"];
    $Grid_CtlName_ori = $Grid_CtlName;
    if ($Grid_CtlName == 'radio')
        $Grid_CtlName = 'dropdownitem';
    $Grid_Items = $result[$mm]["Grid_Items"];
    $Grid_Items = replace($Grid_Items, "@MisSession_UserID", $MisSession_UserID);
    $Grid_Items = replace($Grid_Items, "@MisSession_UserName", $MisSession_UserName);
    $Grid_Items = replace($Grid_Items, "@MisSession_StationNum", $MisSession_StationNum);
    $Grid_Items = replace($Grid_Items, "@idx", $idx);


    $next_Grid_Schema_Validation = arrayValue($result, $mm + 1, "Grid_Schema_Validation");
    $next_Grid_CtlName = arrayValue($result, $mm + 1, "Grid_CtlName");
    $next_Grid_PrimeKey = arrayValue($result, $mm + 1, "Grid_PrimeKey");
    $next_Grid_Default = arrayValue($result, $mm + 1, "Grid_Default");
    $next_Grid_Columns_Title = replace(arrayValue($result, $mm + 1, "Grid_Columns_Title"), ',', '');
    $next_Grid_Columns_Width = arrayValue($result, $mm + 1, "Grid_Columns_Width");
    $next_Grid_MaxLength = arrayValue($result, $mm + 1, "Grid_MaxLength");

    $aliasName = $result[$mm]["aliasName"];


    $Grid_Default = $result[$mm]["Grid_Default"];

    if ($next_Grid_CtlName == "dropdownlist") {
        if ($ActionFlag != 'view' && $next_Grid_Default != '') {
            if ($Grid_MaxLength == 4) {
                $next_Grid_Default = replace($next_Grid_Default, "@date", date("Y"));
            } else if ($Grid_MaxLength == 7) {
                $next_Grid_Default = replace($next_Grid_Default, "@date", date("Y-m"));
            } else {
                $next_Grid_Default = replace($next_Grid_Default, "@date", date("Y-m-d"));
            }
            $next_Grid_Default = replace($next_Grid_Default, "@MisSession_UserID", $MisSession_UserID);
            $next_Grid_Default = replace($next_Grid_Default, "@MisSession_UserName", $MisSession_UserName);
            $next_Grid_Default = replace($next_Grid_Default, "@MisSession_StationNum", $MisSession_StationNum);


            if (strtolower(Left($next_Grid_Default, 7)) == 'select ') {
                $defaultsArray = allreturnSql_gate($next_Grid_Default, $dbalias);
                $defaults = '';
                foreach ($defaultsArray as $v1) { // $a배열이 이차원 배열이므로 foreach가 두번 작성됩니다.
                    foreach ($v1 as $v2) {
                        $defaults = $defaults . iif($defaults != '', ',', '') . $v2;
                    }
                }
            } else {
                $defaultsArray = splitVB($next_Grid_Default, ',');
                $defaults = '';
                $cnt_i = count($defaultsArray);
                for ($i = 0; $i < $cnt_i; $i++) { // $a배열이 이차원 배열이므로 foreach가 두번 작성됩니다.
                    $defaults = $defaults . iif($defaults != '', ',', '') . $defaultsArray[$i];
                }
            }
            $next_Grid_Default = $defaults;
            $result[$mm + 1]["Grid_Default"] = $next_Grid_Default;
        }
    } else if ($Grid_Default != "") {

        if ($Grid_MaxLength == 4) {
            $Grid_Default = replace($Grid_Default, "@date", date("Y"));
        } else if ($Grid_MaxLength == 7) {
            $Grid_Default = replace($Grid_Default, "@date", date("Y-m"));
        } else {
            $Grid_Default = replace($Grid_Default, "@date", date("Y-m-d"));
        }
        $Grid_Default = replace($Grid_Default, "@MisSession_UserID", $MisSession_UserID);
        $Grid_Default = replace($Grid_Default, "@MisSession_UserName", $MisSession_UserName);
        $Grid_Default = replace($Grid_Default, "@MisSession_StationNum", $MisSession_StationNum);


        if (strtolower(Left($Grid_Default, 7)) == 'select ') {
            $defaultsArray = allreturnSql_gate($Grid_Default, $dbalias);
            $defaults = '';
            foreach ($defaultsArray as $v1) { // $a배열이 이차원 배열이므로 foreach가 두번 작성됩니다.
                foreach ($v1 as $v2) {
                    $defaults = $defaults . iif($defaults != '', ',', '') . $v2;
                }
            }
        } else {
            $defaultsArray = splitVB($Grid_Default, ',');
            $defaults = '';
            $cnt_i = count($defaultsArray);
            for ($i = 0; $i < $cnt_i; $i++) { // $a배열이 이차원 배열이므로 foreach가 두번 작성됩니다.
                $defaults = $defaults . iif($defaults != '', ',', '') . $defaultsArray[$i];
            }
        }
        $Grid_Default = $defaults;
        $result[$mm]["Grid_Default"] = $Grid_Default;

    }

    if ($next_Grid_CtlName == 'dropdownlist' && Left($next_Grid_MaxLength, 1) == '-') {
        $Grid_MaxLength_abs = 'maxlength_minus maxlength_less';
    } else if ($Grid_MaxLength == '')
        $Grid_MaxLength_abs = 'maxlength_null';
    else if ($Grid_MaxLength == '0')
        $Grid_MaxLength_abs = 'maxlength_zero maxlength_less';
    else if (Right($Grid_MaxLength, 1) == '!') {
        if (Left($Grid_MaxLength, 1) == '-') {
            $Grid_MaxLength_abs = 'maxlength_minus maxlength_less';
        } else {
            $Grid_MaxLength_abs = 'maxlength_plus';
        }
    } else if ($Grid_MaxLength * 1 > 0)
        $Grid_MaxLength_abs = 'maxlength_plus';
    else
        $Grid_MaxLength_abs = 'maxlength_minus maxlength_less';


    if (
        ($ActionFlag == 'view' || $isAuthW != 'Y' || ($Grid_MaxLength == '' || $ActionFlag == 'modify' && Left($Grid_MaxLength, 1) == '-')) && ($Grid_CtlName == "text0" || $Grid_CtlName == "text"
            || $Grid_CtlName == "timepicker" || $Grid_CtlName == "datepicker" || $Grid_CtlName == "datetimepicker" || $Grid_CtlName == "attach")
    ) {
        if ($Grid_CtlName != "attach") {
            $Grid_CtlName = '';
        }
        if (Left($Grid_MaxLength, 1) == '-')
            $Grid_MaxLength = Mid($Grid_MaxLength, 2, 10);
    } else if (($ActionFlag == 'modify' || $isAuthW != 'Y') && Left($Grid_MaxLength, 1) == '-') {
        $Grid_MaxLength = '';
    }
    //   || $Grid_CtlName=="multiselect" || $Grid_CtlName=="dropdowntree" || $Grid_CtlName=="check"
    //$Grid_CtlName=="dropdownitem" && InStr($Grid_Items,'"value":')==0 || 

    if ($parent_idx_count > 0) {
        if ($mm == 1 && $parent_idx_count == 1) {
            $Grid_Default = $parent_idx;
            $thisAlias_parent_idx = $aliasName;
        } else if ($parent_idx_count > 1) {
            if ($mm == 1) {
                $Grid_Default = splitVB($parent_idx, '_-_')[0];
                $thisAlias_parent_idx = $aliasName;
            } else if ($mm == 2) {
                $Grid_Default = splitVB($parent_idx, '_-_')[1];
                $thisAlias_parent_idx = $aliasName;
            } else if ($mm == 3 && $parent_idx_count >= 3) {
                $Grid_Default = splitVB($parent_idx, '_-_')[2];
                $thisAlias_parent_idx = $aliasName;
            } else if ($mm == 4 && $parent_idx_count == 4) {
                $Grid_Default = splitVB($parent_idx, '_-_')[3];
                $thisAlias_parent_idx = $aliasName;
            }
        }
    }


    $Grid_Select_Tname = $result[$mm]["Grid_Select_Tname"];
    $Grid_Select_Field = $result[$mm]["Grid_Select_Field"];


    //if($Grid_CtlName=="attach") $Grid_Select_Field = $Grid_Select_Field . "_timename";
    //else 

    if ($Grid_Select_Tname == "table_m") {
        $FullFieldName = $Grid_Select_Tname . "." . $Grid_Select_Field;
    } else if ($Grid_Select_Tname != "") {
        $FullFieldName = $Grid_Select_Tname . "." . $Grid_Select_Field;
    } else if (InStr($Grid_Select_Field, " ") + InStr($Grid_Select_Field, "'") + InStr($Grid_Select_Field, "(") == 0) {
        $FullFieldName = $Grid_Select_Field;
    } else {
        $FullFieldName = $Grid_Select_Field;
    }


    if ($mm == 0 && $Grid_Columns_Width != -1)
        $key_aliasName = $aliasName;
    else if ($mm == 1 && $key_aliasName == '')
        $key_aliasName = $aliasName;

    $Grid_GroupCompute = $result[$mm]["Grid_GroupCompute"];
    $Grid_IsHandle = $result[$mm]["Grid_IsHandle"];
    $Grid_ListEdit = $result[$mm]["Grid_ListEdit"];
    $Grid_Templete = $result[$mm]["Grid_Templete"];
    $Grid_Schema_Validation = $result[$mm]["Grid_Schema_Validation"];
    $Grid_Alim = $result[$mm]["Grid_Alim"];

    $Grid_Pil = $result[$mm]["Grid_Pil"];
    $Grid_FormGroup = $result[$mm]["Grid_FormGroup"];
    $Grid_Schema_Type = $result[$mm]["Grid_Schema_Type"];

    if ($Grid_CtlName == 'datepicker' && $Grid_Schema_Type == '')
        $Grid_Schema_Type = 'date';
    else if ($Grid_CtlName == 'datetimepicker' && $Grid_Schema_Type == '')
        $Grid_Schema_Type = 'datetime';


    if ($Grid_CtlName == "child" && $Grid_Columns_Width == -1) {
    } else if ($Grid_FormGroup == '') {

        //if($Grid_CtlName=="child") $formGroup = $Grid_Columns_Title;
        //else $formGroup = "기본폼";
        $formGroup = "기본폼";

        if (InStr($formGroupAll, ';' . $formGroup . ';') == 0) {
            ++$control_cnt;
            $formGroupAll = $formGroupAll . $formGroup . ';';
            $formGroupAll_alias = $formGroupAll_alias . $aliasName . ';';
        }
    } else if ($Grid_FormGroup == "Y") {
        ++$control_cnt;
        $formGroup = "상세폼" . ($control_cnt - 1);
        $formGroupAll = $formGroupAll . $formGroup . ';';
        $formGroupAll_alias = $formGroupAll_alias . $aliasName . ';';
    } else {
        $formGroup = $Grid_FormGroup;
        if (InStr($formGroupAll, ';' . $formGroup . ';') == 0) {
            ++$control_cnt;
            $formGroupAll = $formGroupAll . $formGroup . ';';
            $formGroupAll_alias = $formGroupAll_alias . $aliasName . ';';
        }
    }




    if ($mm == 1 && $child_RealPid != "") {
        $split_child_RealPid = explode(',', $child_RealPid);
        $cnt_split_child_RealPid = count($split_child_RealPid);
        for ($i = 0; $i < $cnt_split_child_RealPid; $i++) {
            ++$control_cnt;
            $formN = "상세폼" . ($control_cnt - 1);
            $formGroupAll = $formGroupAll . $formN . ";";
            $formGroupAll_alias = $formGroupAll_alias . $child_RealPid . ";";
            if (!isset($control_all[$formN]))
                $control_all[$formN] = '';
            $control_all[$formN] = $control_all[$formN] . replace(replace(replace(replace(replace(replace($control_child, '{Grid_View_Class}', 'col-xs-12'), "{grid_columns_title}", $split_child_RealPid[$i]), "{aliasName}", $split_child_RealPid[$i]), "tabrealpid=\"{Grid_Default}\"", "tabrealpid=\"" . $split_child_RealPid[$i] . "\""), "gubun=\"{Grid_Default}\"", "gubun=\"" . RealPidIntoGubun($split_child_RealPid[$i]) . "\""), '{Grid_Default}', "index.php?RealPid=" . $split_child_RealPid[$i] . iif($userPrintPage == 'Y', '&psize=999999', '') . "&parent_gubun=" . $gubun . "&parent_idx=");
        }
    }

    //if($Grid_CtlName=="check") $Grid_Schema_Type = "boolean";
    $grid_schema_format = '';

    if ($Grid_Schema_Type == '')
        $Grid_Schema_Type = "string";
    else if (InStr($Grid_Schema_Type, "^^") > 0) {
        $grid_schema_format = explode('^^', $Grid_Schema_Type)[1];
        $Grid_Schema_Type = explode('^^', $Grid_Schema_Type)[0];
    }



    if ($Grid_Select_Tname == "table_m") {
        $FullFieldName = $Grid_Select_Tname . "." . $Grid_Select_Field;
    } else if ($Grid_Select_Tname != "") {
        $FullFieldName = $Grid_Select_Tname . "." . $Grid_Select_Field;
    } else {
        $Grid_Select_Field = replace($Grid_Select_Field, "@MisSession_UserID", $MisSession_UserID);
        $Grid_Select_Field = replace($Grid_Select_Field, "@RealPid", $RealPid);
        $FullFieldName = $Grid_Select_Field;
    }


    if ($Grid_GroupCompute != "") {
        $Grid_GroupCompute = replace($Grid_GroupCompute, "@MisSession_UserID", $MisSession_UserID);
        $Grid_GroupCompute = replace($Grid_GroupCompute, "@RealPid", $RealPid);
        $join_sql = $join_sql . "left outer join " . $Grid_GroupCompute . "\n";
    }

    if ($Grid_PrimeKey != "") {
        $Grid_PrimeKey = replace($Grid_PrimeKey, "@MisSession_UserID", $MisSession_UserID);
        $Grid_PrimeKey = replace($Grid_PrimeKey, "@RealPid", $RealPid);
        $temp1 = explode('#', $Grid_PrimeKey);
        $join_sql = $join_sql . "left outer join " . $temp1[1] . " " . $pre_Grid_Select_Tname . " on " . $pre_Grid_Select_Tname . "."
            . $temp1[3] . " = " . $Grid_Select_Tname . "." . $Grid_Select_Field . "\n";

        if (count($temp1) >= 5) {

            if (InStr($temp1[4], "@outer_tbname") > 0) {
                $join_sql = $join_sql . ' and (' . replace($temp1[4], "@outer_tbname", $pre_Grid_Select_Tname) . ")" . "\n";
                if (InStr($temp1[4], "table_m.") > 0 && $ActionFlag != 'view') {
                    array_push($select_alias_source, $aliasName);
                    array_push($select_alias_name, explode('=', explode('table_m.', $temp1[4])[1])[0]);
                }
            } else {
                $join_sql = $join_sql . ' and ' . $pre_Grid_Select_Tname . "." . $temp1[4] . "div#list5 {";
            }
        }


        if ($Grid_MaxLength != "") {
            if (InStr($temp1[0], ';') > 0)
                $temp1[0] = splitVB($temp1[0], ';')[1];
            $temp2 =
                "select " . $temp1[0] . "+' | '+" . $temp1[3] . " as codename from " . $temp1[1]
                . " as " . $pre_Grid_Select_Tname;

            if (count($temp1) >= 5) {
                if (InStr($temp1[4], "@outer_tbname") > 0) {
                    $temp2 = $temp2 . " where (" . replace($temp1[4], "@outer_tbname", $pre_Grid_Select_Tname) . ")";
                } else {
                    $temp2 = $temp2 . " where " . $pre_Grid_Select_Tname . "." . $temp1[4];
                }
            }
            $json_codeSelect[$pre_aliasName] = $temp2;

            //kname#MisCommonTable#1#kcode#gcode='speedmis000338'
        }
    }


    if ($Grid_Orderby == "1a") {
        $group_field = $aliasName;
        $dataSource_sort = '{field:"' . $aliasName . '",dir:"asc"},' . $dataSource_sort;
    } else if ($Grid_Orderby == "1d") {
        $group_field = $aliasName;
        $dataSource_sort = '{field:"' . $aliasName . '",dir:"desc"},' . $dataSource_sort;
    } else if ($Grid_Orderby == "2a") {
        $dataSource_sort = $dataSource_sort . '{field:"' . $aliasName . '",dir:"asc"},';
    } else if ($Grid_Orderby == "2d") {
        $dataSource_sort = $dataSource_sort . '{field:"' . $aliasName . '",dir:"desc"},';
    }
    ++$cnt_viewListCol;
    if (InStr($Grid_Columns_Title, ",") > 0) {
        if (Left($result[$mm + 1]["Grid_Columns_Title"], 1) != ",") {
            $closeColumns = ']},';
        } else if ($result[$mm + 1]["Grid_Columns_Width"] == 0 || $result[$mm + 1]["Grid_Columns_Width"] == -1) {
            if (Left($result[$mm + 1]["Grid_Columns_Title"], 1) != ",")
                $closeColumns = ']},';
            else if ($result[$mm + 2]["Grid_Columns_Width"] == 0 || $result[$mm + 2]["Grid_Columns_Width"] == -1) {
                if (Left($result[$mm + 2]["Grid_Columns_Title"], 2) != ",")
                    $closeColumns = ']},';
            }
        }
        $Grid_Columns_Title = replace('<span class=\'hr hide\'>' . replace($Grid_Columns_Title, ',', '</span>'), '<span class=\'hr hide\'></span>', '<span class=\'hr_in hide\'></span>');

    }

    if ($Grid_CtlName == "attach") {
        $Grid_MaxLength0 = replace($Grid_MaxLength, '!', '');
        if (is_numeric($Grid_MaxLength0)) {
            if ($Grid_Schema_Validation != "") {
                $Grid_Schema_Validation = $Grid_Schema_Validation . ", \"maxFileSize\": " . abs($Grid_MaxLength0 * 1024 * 1024);
            } else {
                $Grid_Schema_Validation = "\"maxFileSize\": " . abs(replace($Grid_MaxLength0, "!", "") * 1024 * 1024);
            }
        }

        if ($Grid_MaxLength == '')
            $control_upload0 = replace($control_upload, 'label for', 'label xfor');
        else
            $control_upload0 = $control_upload;

        if (strtolower(Left($Grid_Default, 7)) == 'select ')
            $Grid_Default = onlyOnereturnSql_gate($Grid_Default, $dbalias);

        $control_line = replace(
            replace(
                replace(replace(replace(replace(replace(replace($control_upload0, "{Grid_MaxLength_abs}", $Grid_MaxLength_abs), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{validation}", $Grid_Schema_Validation), "data-multiple='false'", "data-multiple='" . iif(Right($Grid_MaxLength, 1) == "!", "true", "false") . "'")
                ,
                "{saveUrl}",
                "cell_upload.php?flag=formUpload&RealPid=" . $RealPid . "&MisJoinPid=" . $MisJoinPid . "&field=" . $aliasName . "&idx=" . $idx . "&key=" . $key_aliasName . iif($Grid_Default != "", "&default=" . $Grid_Default, "") . "&tempDir=" . $tempDir
            )
            ,
            "{removeUrl}",
            "info.php?flag=removeUploadForm&RealPid=" . $RealPid . "&MisJoinPid=" . $MisJoinPid . "&thisAlias=" . $aliasName . "&key_idx=" . $idx . "&key_aliasName=" . $key_aliasName
        );
        $dataSource_all = $dataSource_all . "
    onSelect_" . $aliasName . ": function(e) {
        $('a#btn_save').addClass('k-state-disabled');
        forMax = e.files.length;
        for(i=0;i<forMax;i++) {
            var fileInfo = e.files[i];
            var wrapper = e.sender.wrapper;
            var saveUrl = e.sender.options.async.saveUrl;

            if(InStr('.jpg.jpeg.png.gif.bmp',fileInfo.extension.toLowerCase())>0) addPreview(fileInfo, wrapper);
        }
        $('form#frm').attr('upload_change','Y');
    },
    onSuccess_" . $aliasName . ": function(e) {
        if(InStr(e.response[0].result, '실패')>0 || e.response[0].result=='fail') {
            alert(e.response[0].msg);
            setTimeout( function(p_e) {
                var close_button = p_e.sender.element.closest('div.k-widget.k-upload.k-upload-async').find('span.k-file-name[title=\"'+e.files[0].name+'\"]').parent().next().find('button');
                $(close_button).click();
            },0,e);
        }
    },
    onRemove_" . $aliasName . ": function(e) {
        $('form#frm').attr('upload_change','Y');
        setTimeout( function() {
            if($('.k-widget.k-upload.k-upload-async li.k-file.k-file-invalid').length==0) {
                $('a#btn_save').removeClass('k-state-disabled');
            }
        });
    },
    onComplete_" . $aliasName . ": function(e) {
        setTimeout( function() {
            if($('.k-widget.k-upload.k-upload-async li.k-file.k-file-invalid').length==0) {
                $('a#btn_save').removeClass('k-state-disabled');
            }
        });
    },
        ";
        //$rowFunctionAfter = $rowFunctionAfter . replace($upload_rowFunctionAfter_script, "{thisAlias}", $aliasName);

    } else if ($Grid_CtlName == "text" && $Grid_Schema_Type == "number") {
        if ($ActionFlag == 'view') {
            if ($grid_schema_format == '')
                $grid_schema_format = "n2";
            $control_line = replace(replace(replace(replace($control_nocontrol, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName);
        } else {
            $control_line = replace(replace(replace(replace(replace($control_numerictextbox, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_MaxLength}", $Grid_MaxLength);
        }
    } else if ($Grid_CtlName == "text" && $Grid_Schema_Type == "date" || $Grid_CtlName == "datepicker") {
        $control_line = replace(replace(replace($control_datepicker, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName);
        if ($grid_schema_format == '')
            $grid_schema_format = "yyyy-MM-dd";
    } else if ($Grid_CtlName == "text" && $Grid_Schema_Type == "string" && $grid_schema_format != '') {

        $control_line = replace(replace(replace(replace($control_maskedtextbox, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{grid_schema_format}", $grid_schema_format);

    } else if ($Grid_CtlName == "text" && $Grid_Schema_Validation == "zipcode") {

        $control_line = replace(replace(replace(replace($control_zipcode, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_MaxLength}", $Grid_MaxLength);

    } else if ($Grid_CtlName == "text0" || $Grid_CtlName == "text" || $Grid_CtlName == "autocomplete") {

        if ($ActionFlag != 'view' && ($Grid_CtlName == 'text0' || $Grid_Schema_Type == 'email' || $Grid_Schema_Type == 'password')) {
            $control_line = replace(replace(replace(replace(replace($control_textbox, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_MaxLength}", $Grid_MaxLength);
            $control_line = replace($control_line, ' data-role=', ' type="' . $Grid_Schema_Type . '" data-role=');
        } else {
            $control_line = replace(replace(replace(replace(replace($control_autocomplete, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_MaxLength}", $Grid_MaxLength);
        }

        if ($isMenuIn != 'S')
            $dataSource_all = $dataSource_all . replace(replace(replace($dataSource_pure_autocomplete, "{RealPid}", $RealPid), "{MisJoinPid}", $MisJoinPid), "{aliasName}", $result[$mm]["aliasName"]);
    } else if ($Grid_CtlName == "timepicker") {

        $control_line = replace(replace(replace($control_timepicker, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName);
        if ($grid_schema_format == '')
            $grid_schema_format = "HH:mm";

    } else if ($Grid_CtlName == "datetimepicker") {

        $control_line = replace(replace(replace($control_datetimepicker, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName);
        if ($grid_schema_format == '')
            $grid_schema_format = "yyyy-MM-dd HH:mm";

    } else if ($Grid_CtlName == "textdecrypt1") {

        $control_line = replace(replace(replace(replace($control_textdecrypt1, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_MaxLength}", $Grid_MaxLength);

    } else if ($Grid_CtlName == "textdecrypt2") {

        $control_line = replace(replace(replace(replace($control_textdecrypt2, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_MaxLength}", $Grid_MaxLength);
        if ($ActionFlag != 'view' && ($Grid_Schema_Type == 'password')) {
            $control_line = replace($control_line, 'type="text"', 'type="password"');
        }
    } else if ($Grid_CtlName == 'html' && $ActionFlag != 'view') {

        $control_line = replace(replace(replace($control_editor, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName);

    } else if ($next_Grid_CtlName == "dropdownlist" && $ActionFlag != 'view' && Left($next_Grid_Schema_Validation, 10) == '"helplist"') {

        $control_line = replace(replace(replace(replace(replace(replace(replace($control_helpbox, '{Grid_MaxLength}', $next_Grid_MaxLength), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{next_Grid_Columns_Title}", $next_Grid_Columns_Title), "{aliasName}", $result[$mm + 1]["aliasName"]), "{pre_aliasName}", $result[$mm]["aliasName"]), "{Grid_Schema_Validation}", replace($result[$mm + 1]["Grid_Schema_Validation"], '"helplist": ', ''));
        if (requestVB($result[$mm + 1]['aliasName'] . 'Value') != '')
            $default = replace(requestVB($result[$mm + 1]['aliasName'] . 'Value'), "@MisSession_StationNum", $MisSession_StationNum);
        else
            $default = replace(arrayValue($result, $mm + 1, "Grid_Default"), "@MisSession_StationNum", $MisSession_StationNum);

        $control_line = replace(replace($control_line, '{Grid_Default}', $default), '{Grid_MaxLength_abs}', $Grid_MaxLength_abs);

        $dataSource_all = $dataSource_all . replace(replace(replace(replace(replace($dataSource_pure, "{RealPid}", $RealPid), "{MisJoinPid}", $MisJoinPid), "{parent_idx}", $parent_idx), "{pre_aliasName}", $result[$mm]["aliasName"]), "{aliasName}", $result[$mm + 1]["aliasName"]);

    } else if ($next_Grid_CtlName == "dropdownlist" && $ActionFlag != 'view') {

        if (((isMobile() == 'N' && $parent_ActionFlag != 'modify') && $next_Grid_Schema_Validation != 'mobile' || $next_Grid_Schema_Validation == 'pc')) {
            $control_line = replace(replace(replace(replace(replace(replace($control_dropdownlist, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $result[$mm + 1]["aliasName"]), "{pre_aliasName}", $result[$mm]["aliasName"]), "{Grid_Schema_Validation}", replace($result[$mm + 1]["Grid_Schema_Validation"], '"helplist": ', ''));

            if (requestVB($result[$mm + 1]['aliasName'] . 'Value') != '')
                $default = replace(requestVB($result[$mm + 1]['aliasName'] . 'Value'), "@MisSession_StationNum", $MisSession_StationNum);
            else
                $default = replace(arrayValue($result, $mm + 1, "Grid_Default"), "@MisSession_StationNum", $MisSession_StationNum);

            $control_line = replace(replace($control_line, '{Grid_Default}', $default), '{Grid_MaxLength_abs}', $Grid_MaxLength_abs);
            $dataSource_pure2 = $dataSource_pure;
            if (InStr($next_Grid_PrimeKey, '!') > 0) {
                $dataSource_pure2 = replace($dataSource_pure, 'serverFiltering: true,', 'serverFiltering: true, group: { field: "group_item" },');
            }
        } else {
            $control_line = replace(replace(replace(replace(replace(replace($control_dropdownlist_mobile, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $result[$mm + 1]["aliasName"]), "{pre_aliasName}", $result[$mm]["aliasName"]), "{Grid_Schema_Validation}", replace($result[$mm + 1]["Grid_Schema_Validation"], '"helplist": ', ''));

            if (requestVB($result[$mm + 1]['aliasName'] . 'Value') != '')
                $default = replace(requestVB($result[$mm + 1]['aliasName'] . 'Value'), "@MisSession_StationNum", $MisSession_StationNum);
            else
                $default = replace(arrayValue($result, $mm + 1, "Grid_Default"), "@MisSession_StationNum", $MisSession_StationNum);

            $control_line = replace(replace($control_line, '{Grid_Default}', $default), '{Grid_MaxLength_abs}', $Grid_MaxLength_abs);
            $dataSource_pure2 = $dataSource_pure;
        }

        $dataSource_all = $dataSource_all . replace(replace(replace(replace(replace($dataSource_pure2, "{RealPid}", $RealPid), "{MisJoinPid}", $MisJoinPid), "{parent_idx}", $parent_idx), "{pre_aliasName}", $result[$mm]["aliasName"]), "{aliasName}", $result[$mm + 1]["aliasName"]);

    } else if ($Grid_CtlName == "dropdownitem") {
        //echo "--- $mm";echo $Grid_Columns_Title;print_r($result);exit;
        $Grid_Items = replace($Grid_Items, '/', '\/');

        if (strtolower(Left($Grid_Items, 7)) == 'select ') {
            $data = jsonReturnSql_gate($Grid_Items, $dbalias);

            if ($Grid_Pil != 'Y') {
                $data = '[{"value":"","text":""},' . Mid($data, 2, 10000000);
            }
            $control_line = replace(replace(replace(replace(replace($control_dropdownitem, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_Items}", $data);

            $dataSource_all = $dataSource_all . replace(replace(replace(replace($dataSource_pure_dropdownitem, "{RealPid}", $RealPid), "{MisJoinPid}", $MisJoinPid), "{parent_idx}", $parent_idx), "{aliasName}", $aliasName);
        } else {
            if (strtolower(Left($Grid_Items, 5)) == "exec ") {
                //미완성;예비용
                $data = "exec";
            } else if (Left($Grid_Items, 2) == "[{") {
                $data = $Grid_Items;
            } else {
                $data = '[';
                for ($k = 0; $k < count(explode(',', $Grid_Items)); $k++) {
                    if ($k > 0)
                        $data = $data . ',';
                    $data = $data . '{"value":"' . explode(',', $Grid_Items)[$k] . '","text":"' . explode(',', $Grid_Items)[$k] . '"}';
                }
                $data = $data . ']';
            }
            if (InStr($data, '"value":""') == 0)
                $data = '[{"value":"","text":""},' . Mid($data, 2, 100000000);
            $control_line = replace(replace(replace(replace($control_dropdownitem, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_Items}", $data);
        }
        if ($Grid_CtlName_ori == 'radio')
            $control_line = replace($control_line, 'data-role="dropdownlist"', 'data-role="dropdownlist" Grid_CtlName_ori="radio"');


        if (requestVB($aliasName . 'Value') != '')
            $default = replace(requestVB($aliasName . 'Value'), "@MisSession_StationNum", $MisSession_StationNum);
        else
            $default = replace(arrayValue($result, $mm, "Grid_Default"), "@MisSession_StationNum", $MisSession_StationNum);



        $control_line = replace(replace($control_line, '{Grid_Default}', $default), '{Grid_MaxLength_abs}', $Grid_MaxLength_abs);

    } else if ($Grid_CtlName == 'multiselect' && $ActionFlag != 'view') {
        $Grid_Items = replace($Grid_Items, '/', '\/');
        if (strtolower(Left($Grid_Items, 7)) == 'select ') {
            $control_line = replace(replace(replace($control_multiselect, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName);
            $dataSource_all = $dataSource_all . replace(replace(replace(replace($dataSource_pure_multiselect, "{RealPid}", $RealPid), "{MisJoinPid}", $MisJoinPid), "{parent_idx}", $parent_idx), "{aliasName}", $aliasName);
        } else {
            if (Left($Grid_Items, 5) == "exec ") {
                //미완성;예비용
                $data = "exec";
            } else if (Left($Grid_Items, 2) == "[{") {
                $data = $Grid_Items;
            } else {
                $data = '[';
                for ($k = 0; $k < count(explode(',', $Grid_Items)); $k++) {
                    if ($k > 0)
                        $data = $data . ',';
                    $data = $data . '{"value":"' . explode(',', $Grid_Items)[$k] . '","text":"' . explode(',', $Grid_Items)[$k] . '"}';
                }
                $data = $data . ']';
            }
            if (InStr($data, '"value":""') == 0)
                $data = '[{"value":"","text":""},' . Mid($data, 2, 100000000);
            $control_line = replace(replace(replace(replace($control_multiselect, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_Items}", $data);
        }

        if (requestVB($aliasName . 'Value') != '')
            $default = replace(requestVB($aliasName . 'Value'), "@MisSession_StationNum", $MisSession_StationNum);
        else
            $default = replace(arrayValue($result, $mm, "Grid_Default"), "@MisSession_StationNum", $MisSession_StationNum);


        if (strtolower(Left($default, 7)) == 'select ') {
            $default = onlyOnereturnSql_gate($default, $dbalias);
        }

        $control_line = replace($control_line, '{Grid_Default}', $default);
        /*            
            } else if($Grid_CtlName=="multiselect") {

                if(Left($Grid_Items, 7)=='select ') {
                    $data = jsonReturnSql($Grid_Items);
                } else if(Left($Grid_Items, 5)=="exec ") {
                    //미완성;예비용
                    $data = "exec";
                } else if(Left($Grid_Items, 2)=="[{") {
                    $data = $Grid_Items;
                } else {
                    $Grid_Items = replace($Grid_Items, '/', '\/');
                    $data = '[{"value":"' . replace($Grid_Items, ',', '"},{"value":"') . '"}]';
                }

                $control_line = replace(replace(replace($control_multiselect, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_Items}", $data);
        */
    } else if ($Grid_CtlName == "dropdowntree") {

        if (strtolower(Left($Grid_Items, 7)) == 'select ') {
            //필독의 경우, 기본DB 에 연결.
            if ($aliasName == 'virtual_fieldQnmisPildokMem')
                $data = jsonReturnSql($Grid_Items);
            else
                $data = jsonReturnSql_gate($Grid_Items, $dbalias);
        } else if (strtolower(Left($Grid_Items, 5)) == "exec ") {
            $data = "exec";
        } else {
            $Grid_Items = replace($Grid_Items, '/', '\/');
            $data = '[{"value":"' . replace($Grid_Items, ',', '"},{"value":"') . '"}]';
        }

        $data = '[{ text: "root", expanded: true, items: ' . $data . ' }]';

        $control_line = replace(replace(replace(replace($control_dropdowntree, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_Items}", $data);

    } else if ($Grid_CtlName == 'textarea') {


        if ($ActionFlag == 'view' && $Grid_Schema_Validation != 'code') {
            $control_line = replace(
                replace(replace(replace($control_nocontrol_pre, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName)
                ,
                '{Grid_View_Class}',
                $Grid_View_Class
            );
        } else {
            $control_line = replace($control_textarea, '{Grid_View_Class}', $Grid_View_Class);
            if ($ActionFlag != "view" && $Grid_MaxLength != '')
                $control_line = replace($control_line, 'readonly', '');
            $control_line = replace(replace($control_line, 'class="k-textbox"', 'class="k-textbox ' . $Grid_Schema_Validation . '"'), 'form-group round_textarea', 'form-group round_textarea ' . $Grid_Schema_Validation);
        }
        $control_line = replace(replace(replace($control_line, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName);
        if ($Grid_MaxLength == '1' || $Grid_MaxLength == '-1') {
            $control_line = replace($control_line, 'maxlength="{Grid_MaxLength}"', '');
        } else {
            $control_line = replace($control_line, '{Grid_MaxLength}', $Grid_MaxLength);
        }
        if ($ActionFlag == 'view' && $Grid_Schema_Type == 'html')
            $control_line = replace($control_line, 'data-bind="text:', 'data-bind="html:');
    } else if ($Grid_CtlName == 'child') {
        if ($Grid_Columns_Width != -1) {
            $control_line = replace(replace(replace(replace(replace(replace($control_child, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "tabrealpid=\"{Grid_Default}\"", "tabrealpid=\"" . $Grid_Default . "\""), "gubun=\"{Grid_Default}\"", "gubun=\"" . RealPidIntoGubun($Grid_Default) . "\""), '{Grid_Default}', "index.php?RealPid=" . $Grid_Default . iif($userPrintPage == 'Y', '&psize=999999', '') . "&parent_gubun=" . $gubun . "&parent_idx=");
            if ($Grid_FormGroup == '')
                $control_line = replace($control_line, '{Grid_View_Class}', $Grid_View_Class);
            else
                $control_line = replace($control_line, '{Grid_View_Class}', 'col-xs-12');
        }
    } else if ($Grid_CtlName == 'iframe') {

        $control_line = replace(replace(replace(replace(replace($control_iframe, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "tabrealpid=\"{Grid_Default}\"", "tabrealpid=\"" . $Grid_Default . "\""), '{Grid_Default}', replace($Grid_Default, "@idx", $idx));

    } else if ($Grid_CtlName == 'check') {

        $control_line = replace(replace(replace(replace(replace(replace($control_checkbox, '{Grid_MaxLength_abs}', $Grid_MaxLength_abs), '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_Schema_Type}", $Grid_Schema_Type);

    } else if ($Grid_CtlName == 'html') {
        $control_line = replace(replace(
            replace(replace(replace(replace($control_nocontrol, "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), 'data-bind="text:', 'data-bind="html:')
            ,
            '{Grid_View_Class}',
            $Grid_View_Class
        ), 'col-xs-10 col-md-10', 'col-xs-12 col-sm-12 col-lg-12');

    } else if ($result[$mm]["Grid_CtlName"] != 'dropdownlist') {

        if (InStr($result[$mm]['Grid_Columns_Title'], ':') > 0) {
            $control_line = replace(replace(replace(replace(replace(replace($control_nocontrol, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_CtlName_ori}", $Grid_CtlName_ori), "round_nocontrol", "round_nocontrol $Grid_CtlName");
        } else {
            if ($result[$mm]['Grid_MaxLength'] == '') {
                $control_line = replace(replace(replace(replace(replace(replace($control_nocontrol, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_CtlName_ori}", $Grid_CtlName_ori), "round_nocontrol", "round_nocontrol $Grid_CtlName write_hide");
            } else {
                $control_line = replace(replace(replace(replace(replace(replace($control_nocontrol, '{Grid_View_Class}', $Grid_View_Class), "{Grid_Columns_Title}", $Grid_Columns_Title), '{Grid_Columns_Title0}', $Grid_Columns_Title0), "{aliasName}", $aliasName), "{Grid_CtlName_ori}", $Grid_CtlName_ori), "round_nocontrol", "round_nocontrol $Grid_CtlName");
            }
        }
        if ($Grid_Schema_Type == 'html')
            $control_line = replace($control_line, 'data-bind="text:', 'data-bind="html:');
    }

    if ($grid_schema_format != '' & $Grid_Schema_Type == 'number') {
        $control_line = replace($control_line, 'data-bind=', 'data-format="' . $grid_schema_format . '" data-bind=');
    } else if ($Grid_Schema_Type == "string" && $grid_schema_format != '') {
        $control_line = replace($control_line, 'data-bind=', 'data-mask="' . $grid_schema_format . '" data-bind=');
    }

    if (requestVB($aliasName . 'Value') != '')
        $Grid_Default = replace(requestVB($aliasName . 'Value'), "@MisSession_StationNum", $MisSession_StationNum);

    if (strtolower(Left($Grid_Default, 7)) == 'select ')
        $Grid_Default = onlyOnereturnSql_gate($Grid_Default, $dbalias);
    $control_line = replace(replace($control_line, '{Grid_Default}', $Grid_Default), '{Grid_Columns_Width}', $Grid_Columns_Width);
    if ($Grid_Templete == "Y") {
        $control_line = replace($control_line, 'Grid_Templete="N"', 'Grid_Templete="Y"');
    }

    if ($next_Grid_CtlName == "dropdownlist") {
        if ($next_Grid_Columns_Width < 0)
            $control_line = replace($control_line, 'class="form-group', 'class="form-group hide');
        else
            $control_line = replace($control_line, '{Grid_View_Class}', $Grid_View_Class);
    } else {
        if ($Grid_Columns_Width < 0)
            $control_line = replace($control_line, 'class="form-group', 'class="form-group hide');
        else {
            $control_line = replace($control_line, '{Grid_View_Class}', $Grid_View_Class);
            if ($Grid_Columns_Width != -1 && InStr($result[$mm]["Grid_Columns_Title"], ":") > 0) {
                if ($Grid_Select_Field == "''") {
                    $control_line = replace($control_line, 'class="form-group', 'class="form-group sub_title');
                } else {
                    $control_line = replace($control_line, 'class="form-group', 'class="form-group sub_title h_two');
                }
            }
        }
    }
    if ($Grid_Enter == 1)
        $control_line = '<span style="
    float: left;
    width: 100%;
"></span>' . $control_line;



    if ($ActionFlag == 'write') {
        if ($Grid_Default != "") {
            $control_line = replace($control_line, 'input id="RealPid"', 'input id="RealPid" value="' . replace($Grid_Default, '@RealPid', $RealPid) . '"');
        }
    }

    if ($ActionFlag == 'write' || $ActionFlag == 'modify') {
        if ($Grid_Alim != "") {
            $control_line = replace($control_line, '<!--alim-->', $Grid_Alim);
        } else {
            $control_line = replace($control_line, '<!--alim-->', '');
        }
        if ($next_Grid_CtlName == "dropdownlist" && arrayValue($result, $mm + 1, "Grid_Pil") == "Y") {
            $control_line = replace($control_line, 'xrequired', 'required');
            $control_line = replace($control_line, '>' . $Grid_Columns_Title, '>' . $Grid_Columns_Title . '<span class="required">*</span>');
        } else if ($Grid_Pil == "Y" && $Grid_CtlName == "attach") {
            $control_line = replace($control_line, 'xrequired', 'attach_required');
            $control_line = replace($control_line, '>' . $Grid_Columns_Title, '>' . $Grid_Columns_Title . '<span class="required">*</span>');
        } else if ($Grid_Pil == 'Y') {
            $control_line = replace($control_line, 'xrequired', 'required');
            $control_line = replace($control_line, '>' . $Grid_Columns_Title, '>' . $Grid_Columns_Title . '<span class="required">*</span>');
        } else {
            $control_line = replace($control_line, 'xrequired', '');
        }
    } else {
        $control_line = replace($control_line, '<!--alim-->', '');
        $control_line = replace($control_line, 'xrequired', '');
    }





    if (!isset($control_all[$formGroup]))
        $control_all[$formGroup] = '';



    $control_all[$formGroup] = $control_all[$formGroup] . $control_line;

    if ($Grid_Orderby == "c") {
        $dataSource_aggregate = $dataSource_aggregate . '{ field: "' . $aliasName . '", aggregate: "count" },';

    }


    $speed_fieldIndx[$aliasName] = $FullFieldName;

    //if($mm==1) $parent_field = $Grid_Select_Field;
    $pre_Grid_Select_Tname = $Grid_Select_Tname;
    $pre_aliasName = $aliasName;

    ++$mm;
}

if (function_exists("view_round_area") && $ActionFlag != 'list') {
    view_round_area();
}


if (function_exists("view_templete") && $ActionFlag == 'view') {
    view_templete();
    if ($view_html != '')
        $control_all['기본폼'] = $view_html;
}

$list5 = '';

if ($helpbox == '' && ($BodyType == 'only_one_list' && $ActionFlag != 'xwrite' || $BodyType == 'save_templist' && $ActionFlag == 'write')) {
    //탭에 갯수표시를 위해서 1개 only_one_list 일때도 아래와 같이 로딩하고 숨김스타일로.
    if ($pageSizes != '5' && $BodyType != 'save_templist')
        echo '
<style>
div#list5 {
    display: none!important;
}
</style>
';

    $list5 = <<<'EOF'

<style>
.k-grid.k-widget.k-grid-display-block {
    display: block!important;
}
.k-pager-wrap.k-grid-pager > a, span.k-widget.k-dropdown.k-dropdown-operator {
    display: none;
}
td[role="gridcell"] {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    overflow-wrap: normal;
    vertical-align: top;
}
.k-filtercell>span {
    padding-right: 0;
}
.k-i-sort-asc-sm:before {
    content: "\e004";
}
.k-i-sort-desc-sm:before {
    content: "\e006";
}


</style>


<script>
    function templist_Template() {
        $('a#btn_save')[0].innerHTML = replaceAll($('a#btn_save')[0].innerHTML,'입력완료','아래의 임시내역을 저장');
        $('a#btn_save').css('color',theme_selected());
        $('a#btn_save').css('background',theme_selectedBack());
        var result = `
        
        <a role="button" class="k-button" style="border:0;">위 내용을 임시내역에</a>
        <a role="button" class="k-button k-button-icontext" id="btn_templist_add"><span class="k-icon k-i-k-icon k-i-plus"></span>추가하기</a>

        <a role="button" class="k-button" style="border:0;margin-left:20px;">아래의 선택내역을</a>
        <a role="button" class="k-button k-button-icontext" id="btn_templist_del"><span class="k-icon k-i-k-icon k-i-delete"></span>삭제하기</a>

        `;
        return result
    }

</script>

<div id="list5" style="display: inline-block">
</div>
<textarea id="text_list5" style="display: none;">
    <div id="grid_list5" data-role="grid"
    data-columns=''
    data-selectable="multiple row"
    data-pageable="true"
    data-filterable='{ mode: "row",field: "text",extra: false, operator: "contains",operators: {string: {contains: "contains"}}}'
    data-toolbar="#=templist_Template()#"
    data-bind="
    source: data_source,
    visible: isVisible,
    events: { change: gridClick }
    "
    data-resizable="true"
    data-sortable="true"
    >
    </div>
    <iframe src="about:blank" style="display:none;" onload="after_list5();"></iframe>
</textarea>
<script>


function viewLogic_afterLoad0() {

    if($('#text_list5')[0]==undefined) {
        return false;
    }

    $('#list5')[0].innerHTML = $('#text_list5')[0].value;
    fields = {};
    data_columns = [];
    //save_templist//data_columns.push({ selectable: true, width: "35px", headerAttributes: { "class": "selectableClass" }, attributes: { "keyIdx": "#=idx#" }});
    cnt = 0;
    if($('div.k-content.k-state-active [data-bind]').length==0) return false;
    d_field = $('div.k-content.k-state-active [data-bind]')[0].id;
    fields[d_field] = { type: "string" };
    d_title = $('div.k-content.k-state-active #'+d_field+'[data-bind]').closest('div.form-group').find('label')[0].innerText;
    d_title = Trim(d_title);
    data_columns.push({"field":d_field,"dir":"desc","title":d_title,"hidden":0,"width":50,"Grid_Align":"","Grid_Orderby":"","Grid_Schema_Type":""});
    var pre_d_title = '';
    $('div.k-content.k-state-active [data-bind]').each( function() {
        if(cnt<7) {
            if($(this).closest('div.form-group').css('display')!='none') {
                d_title = $(this).closest('div.form-group').find('label').text();
                d_title = Trim(d_title);
                d_field = this.id;
                if($('form#frm #'+d_field).attr('data-text-field')!=undefined && $('form#frm #'+d_field).attr('data-text-field')!='' && $('form#frm #'+d_field).attr('data-text-field')!='name') {
                    if($('form#frm #'+d_field).attr('data-text-field')!='text') {
                        d_field = $('form#frm #'+d_field).attr('data-text-field');
                    }
                }
                
                if(fields[d_field]==undefined && d_field!='grid_list5' && InStr(d_field,'virtual_field')==0 && $('div#'+d_field).attr('grid_templete')!='Y') {
                    fields[this.id] = { type: "string" };

                    if(document.getElementById('isMenuIn').value=='xxxS') {
                        cnt = 999;
                        ww = 330;
                        v_encoded = false;
                    } else {
                        ww = 70;
                        v_encoded = true;
                    }
                        push_title = iif(d_title==pre_d_title,iif(InStr(d_title,'|')>0,d_title.split('|')[1],d_title),iif(InStr(d_title,'|')>0,d_title.split('|')[0],d_title));
console.log('push_title 전 d_title='+d_title);
console.log('push_title='+push_title);
                    data_columns.push({"field":d_field,"title":push_title,"hidden":0, encoded: v_encoded,"width":ww,"Grid_Align":"","Grid_Orderby":"","Grid_Schema_Type":""});
                    pre_d_title = d_title;
                    
                    
                    ++cnt;
                }
            }
        }
    });
    
    var str_viewModel_list5 = `

    var _skip = 0;
    var _page = 1;
    var _sort = {
        field: $('div.k-content.k-state-active [data-bind]')[0].id,
        dir: 'desc'
    };
    var _filter = undefined;
    
    if($('input#temp1').attr('list5_state')!=undefined) {
        list5_state = JSON.parse($('input#temp1').attr('list5_state'));
        if(list5_state['_skip']) _skip = list5_state['_skip'];
        if(list5_state['_page']) _page = list5_state['_page'];
        if(list5_state['_sort']) _sort = list5_state['_sort'];
        if(list5_state['_filter']) _filter = list5_state['_filter'];
    }

    var viewModel_list5 = kendo.observable({
        isVisible: true,
        gridClick: function(e) {
            isOK = false;
            if(event==undefined) {
                isOK =  true;
            } else if($(event.target).parent()[0].tagName!='TH' && document.getElementById('BodyType').value!='save_templist') {
                isOK =  true;
            }
            if(isOK==true) {
                if($('div.k-content.k-state-active [data-bind]')[0].id==document.getElementById('key_aliasName').value)
                var p_idx = e.sender.element.find('tr[aria-selected="true"] td')[0].innerText;
                else var p_idx = e.sender.element.find('tr[aria-selected="true"] td')[1].innerText;

                list5_state = {};
                list5_state['_skip'] = $('#grid_list5').data('kendoGrid').dataSource._skip;
                list5_state['_page'] = $('#grid_list5').data('kendoGrid').dataSource._page;
                list5_state['_sort'] = $('#grid_list5').data('kendoGrid').dataSource._sort;
                list5_state['_filter'] = $('#grid_list5').data('kendoGrid').dataSource._filter;

                $('input#temp1').attr('list5_state', JSON.stringify(list5_state));

                if(document.getElementById('ActionFlag').value=='write') {
                    var url = replaceAll(status_view_url(),'ActionFlag=write','ActionFlag=modify');
                    url = replaceAll(url, '&idx='+document.getElementById('idx').value, '&idx='+p_idx);
                    location.href = url;
                } else {
                    read_idx(p_idx);
                }
            }
        },
        data_source: new kendo.data.DataSource({
            batch: false,
            pageSize: 5,
            page: _page,
            sort: _sort,
            filter: _filter,
            type: "odata",
            serverFiltering: true,
            serverPaging: true,
            serverSorting: true,
            schema: {
                model: {
                    id: "{idx}",
                    fields: fields
                },
                data: "d.results",
            },
            requestStart: function(e) {
                

                if($('#grid_list5').data('kendoGrid').dataSource._filter) {
                    $('#grid_list5').data('kendoGrid').dataSource.transport.options.read.data.allFilter 
                    = JSON.stringify($('#grid_list5').data('kendoGrid').dataSource._filter.filters);
                } else {
                    $('#grid_list5').data('kendoGrid').dataSource.transport.options.read.data.allFilter  = [];
                }
            },
            transport: {
                read: {
                    type: "POST",
                    data: {
                        $top: 5,
                        $skip: _skip,
                    },
                    complete: function (jqXHR, textStatus) {
                    
                        if($('#grid_list5').data('kendoGrid').dataSource._filter==undefined && $('#grid_list5').data('kendoGrid').dataSource._total*1<=5) {
                            $('tr.k-filter-row').css('display','none');
                        }
                        r = jqXHR.responseJSON.d.results;

                        
                        select_row = getObjects(r,document.getElementById('key_aliasName').value,document.getElementById('idx').value);
                        if(select_row.length>0) {

                            i = select_row[0]['rowNumber']*1 % 5 - 1;
                            if(i==-1) {
                                i=4;
                            }
                            $($('#grid_list5 tr.k-master-row')[i]).addClass('k-state-selected');
                        }
                        
                
                        tabObj = parent.$("div#round_"+windowID()).closest("div[tabnumber]");
                        //console.log(tabObj);
                        if(tabObj) {
                            tabnumber = tabObj.attr("tabnumber");
                            if(tabnumber!=undefined) {
                                parent.$('body li[tabnumber="'+tabnumber+'"] span.cnt').text("0");
                                cnt = $('div#grid_list5').data('kendoGrid').dataSource._total;
                                
                                if(cnt>99) {
                                    parent.$('body li[tabnumber="'+tabnumber+'"] span.cnt').text("99+");
                                } else {
                                    parent.$('body li[tabnumber="'+tabnumber+'"] span.cnt').text(cnt);
                                }
                                parent.$('body li[tabnumber="'+tabnumber+'"] span.cnt').attr("cnt",cnt);
                            }
                        }
                        
                        if(typeof thisLogic_grid_list5_complete=="function") {
                            thisLogic_grid_list5_complete(r);
                        } 
                        setTimeout( function() {
                            $(window).resize();     //이렇게 해야 select 디자인이 적용됨. 데이터로딩용.
                        });
                    },
                    url: 'list_json.php?flag=read&RealPid='+document.getElementById('RealPid').value
                    +'&MisJoinPid='+document.getElementById('MisJoinPid').value
                    +'&parent_gubun='+document.getElementById('parent_gubun').value
                    +'&parent_idx='+document.getElementById('parent_idx').value,
                    dataType: "jsonp",
                },
            },
        }),
    });
    `;
    eval(str_viewModel_list5);
    $('div#grid_list5').attr('data-columns',replaceAll(JSON.stringify(data_columns),'\n','\\\n'));
    //$('div#grid_list5').attr('data-pageable','true');
    kendo.bind($("#list5"), viewModel_list5);
}

function after_list5() {
    
    $('input.k-dropdown-operator').val('contains');

    setTimeout( function() {

        $('a#btn_templist_add').css('color',theme_selectedBack());
        $('a#btn_templist_add').css('background',theme_selected());
        setTimeout( function() {
            $(window).resize();     //이렇게 해야 select 디자인이 적용됨. write 용.
        },100);
        $('a#btn_templist_add').click( function() {
            $('#BodyType').attr('add','Y');
            setTimeout( function() {
                $('#BodyType').removeAttr('add');
            },5000);    //일부러 느슨하게 5초로 잡음.   view_top.js 에서 바로 removeAttr 함.
            $('a#btn_save').click();
        });

        $('a#btn_templist_del').click( function() {
            var deleteList = $('#grid_list5').data('kendoGrid').selectedKeyNames();
 
            if(deleteList.length==0) {
                toastr.warning("삭제할 내역이 없습니다.", "체크결과", {timeOut: 2000, positionClass: "toast-bottom-right"});
                return false;
            }
            var idxName = '순번';
            if(!confirm(idxName + " : " + JSON.stringify(deleteList) + " 를 삭제하시겠습니까?")) return false;

            $.ajax({
                method: "POST",
                url: "save.php",
                data: { deleteList : JSON.stringify(deleteList), key_aliasName : $("#key_aliasName")[0].value
                    ,ActionFlag : "delete_templist", tempDir : document.getElementById("tempDir").value, RealPid : document.getElementById("RealPid").value, MisJoinPid : document.getElementById("MisJoinPid").value }
            })
            .done(function( result ) {
                $('input#temp1').attr('pre_values','done');
                $("#grid_list5 thead input.k-checkbox").click();
                if($("#grid_list5 thead input.k-checkbox")[0].checked) $("#grid_list5 thead input.k-checkbox").click();
                if(typeof parent.toastr=="object") toastr_obj = parent.toastr; else toastr_obj = toastr;
                if(JSON.parse(result).resultCode=='success') {
                    toastr_obj.success(JSON.parse(result).resultMessage, "처리결과", {timeOut: 2000, positionClass: "toast-bottom-right"});
                    $("a#btn_reload").click();
                } else {
                    toastr_obj.error("실패: "+iif(JSON.parse(result).resultMessage,JSON.parse(result).resultMessage,"관리자에게 문의하세요."), "처리결과", {progressBar: true, timeOut: 6000, positionClass: "toast-bottom-right"});
                }
            })
            .fail(function() {
                $('input#temp1').attr('pre_values','fail');
                //console.log( "delete_templist error" );
            });
        });







    });
}

</script>


EOF;
}



if ($BodyType == 'save_templist') {
    $list5 = replace(replace(replace($list5, "pageSize: 5,", "pageSize: 1000,"), "dir: \"desc\"", "dir: \"asc\""), "list_json.php?flag=read&", "list_json.php?flag=templist&tempDir=$tempDir&");
    $list5 = replace(replace(replace($list5, 'data-filterable=', 'xdata-filterable='), 'data-sortable="true"', 'data-sortable="false"'), 'data-pageable="true"', 'data-pageable="false"');
    $list5 = replace($list5, '//save_templist//', '');
    $list5 = replace($list5, 'id: "{idx}",', 'id: "' . $key_aliasName . '",');
} else {
    $list5 = replace($list5, 'id: "{idx}",', '');
    $list5 = replace($list5, 'data-toolbar="#=templist_Template()#"', '');

}

$control_all['기본폼'] = $control_all['기본폼'] . $list5;
?>


<form id="frm" action="/_treat/" metheod="post" onsubmit="return false;">
    <input id="child_alias" type="hidden" />
    <input type="submit" id="checkSubmit" style="display: none;" />
    <div class="row example-wrapper" style="margin: 0;">
        <div class="col-xs-12 offset-sm-2 example-col demo-section k-content wide"
            style="flex: auto;margin: 0px;padding: 0;max-width: 100%;border: 0;">
            <div class="card" style="border: 0;">
                <div class="card-body" style="padding: 0;">


                    <div class="form-group round_tab row col-xs-12 col-sm-12">
                        <div data-role="tabstrip" data-animation="false">
                            <ul>
                                <?php
                                $splitVB_formGroupAll = explode(';', $formGroupAll);
                                $splitVB_formGroupAll_alias = explode(';', $formGroupAll_alias);

                                $cnt_splitVB_formGroupAll = count($splitVB_formGroupAll);


                                for ($mm = 1; $mm < $cnt_splitVB_formGroupAll - 1; $mm++) {
                                    ?>
                                    <li tabnumber="<?php echo $mm; ?>" onclick="refreshGrid_index(<?php echo $mm; ?>);"
                                        child_gubun tabrealpid="<?php
                                        //print_r($splitVB_formGroupAll);exit;
                                        $temp1 = replace($control_all[$splitVB_formGroupAll[$mm]], "RealPid='", "RealxPid='");

                                        if (InStr($temp1, 'RealPid=') > 0 && InStr($temp1, "&parent_gubun") > 0) {
                                            $temp1 = explode('&', explode('RealPid=', $temp1)[1])[0];
                                            echo $temp1;
                                        } else
                                            $temp1 = $splitVB_formGroupAll_alias[$mm];
                                        ?>" tabalias="<?php echo $splitVB_formGroupAll_alias[$mm]; ?>"
                                        tabname="<?php echo $splitVB_formGroupAll[$mm]; ?>" tabid="<?php echo $temp1; ?>"
                                        <?php echo iif($mm == 1, 'class="k-state-active"', ''); ?>>
                                        <?php echo $splitVB_formGroupAll[$mm]; ?><span class="cnt"></span></li>
                                    <?php
                                }
                                ?>

                            </ul>

                            <?php


                            if ($ActionFlag == 'view') {

                                $cnt_splitVB_formGroupAll = count($splitVB_formGroupAll);
                                for ($mm = 1; $mm < $cnt_splitVB_formGroupAll - 1; $mm++) {
                                    if ($splitVB_formGroupAll_alias[$mm] == "viewPrint" && $SPREADSHEET_ID != '') {
                                        echo "<div tabnumber='" . $mm . "' class='" . iif(InStr($control_all[$splitVB_formGroupAll[$mm]], "round_child") > 0, "round_child", "") . "'>";
                                        ?>
                                        <script src="jasonday-printThis/printThis.js"></script>
                                        <div class="viewPrintDivRound">
                                            <div id="viewPrintDiv" class="viewPrintDiv">
                                                <link href="/_mis/cssJs/viewPrint.css?<?= $dd ?>" rel="stylesheet" aaa />
                                                <style>
                                                    .viewPrintDivRound,
                                                    .viewPrintDiv {
                                                        height: 100%;
                                                        width: 100%;
                                                    }
                                                </style>

                                                <span class="k-icon k-i-pdf"
                                                    onclick='$("div#viewPrintDiv").removeClass("zoom150");pdf_onclick();'
                                                    title='save as pdf'></span>
                                                <span class="k-icon k-i-print" onclick='print_onclick();' title='print'></span>

                                                <iframe id="ifr_docs"
                                                    src="https://docs.google.com/spreadsheets/d/<?php echo $SPREADSHEET_ID; ?>/edit?embedded=true&rm=demo#gid=0"
                                                    xsrc="about:blank" style="width:100%; height: calc(100% - 4px);" frameborder="0"
                                                    allowfullscreen></iframe>

                                                <script>
                                                    function viewLogic_afterLoad0() {
                                                        var data = {};
                                                        Object.keys(resultAll['d']['results'][0]).forEach(function (k, v) {
                                                            kv = $('div#round_' + k).text();
                                                            if (kv.split('\n')[1] != '' && kv.split('\n')[1] != undefined) {
                                                                data[kv.split('\n')[1]] = resultAll['d']['results'][0][k];
                                                            }
                                                        });

                                                        main(data);
                                                    }
                                                    const fetchData = async (scriptURL, data) => {
                                                        var json;
                                                        try {
                                                            const response = await fetch(scriptURL, {
                                                                method: 'POST',
                                                                body: JSON.stringify(data),
                                                            });
                                                            if (response != "") {
                                                                json = await response.json();
                                                                //$('iframe#ifr_docs')[0].src = json['url'].split('?')[0];
                                                            }
                                                        } catch (e) {
                                                            console.log('Errors:', e.message)
                                                        }
                                                        return json;
                                                    }
                                                    async function main(p_data) {
                                                        const res = await fetchData("https://script.google.com/macros/s/AKfycbyFQx0jzd6tuCMEEskR8k9O5DYr__uCO9JwwShR98TkW3G1WACgn6jKRVMFJPnrNS0/exec?SPREADSHEET_ID=<?php echo $SPREADSHEET_ID; ?>", { "data": p_data });
                                                        //console.log(res['url']);
                                                    }


                                                    setTimeout(function () {




                                                        $('#btn_menuName').before(`<a role="button" class="k-button" id="btn_2" 
style="background: rgb(136, 255, 136); color: rgb(0, 0, 0);">데이터 적용 후 다운로드</a>`);
                                                        $('#btn_menuName').before(`<a role="button" class="k-button" id="btn_1" 
style="background: rgb(136, 136, 255); color: rgb(255, 255, 255);">데이터 적용 후 링크열기</a>`);

                                                        $('a#btn_1').click(function () {
                                                            exec_url = 'https://script.google.com/macros/s/AKfycbzDDK1sB9tsGefZTi15Y-8LeOPCLR1cw4Xv_0aAFpvOUOWHOX2rDTpEs9RUwMIpV5se/exec';
                                                            result = ajax_url_return(exec_url);
                                                            window.open(JSON.parse(result)['url']);
                                                        });
                                                        $('a#btn_2').click(function () {

                                                            exec_url = 'https://script.google.com/macros/s/AKfycbyIgiO50c_wUUkUscC83hgLMsvxeKKK06Wu3lbRU5oMOttiXAv0VFVoUcYUHGArLpF5/exec';
                                                            result = ajax_url_return(exec_url);
                                                            //open_url = "../_mis_addLogic/speedmis003018_treat.php?"+exec_url;
                                                            blob_string = JSON.parse(result)['blob'];

                                                            var element = document.createElement('a');

                                                            element.setAttribute('href', 'data:application/pdf;base64,' + blob_string);
                                                            element.setAttribute('download', 'prova');
                                                            element.style.display = 'none';
                                                            document.body.appendChild(element);

                                                            element.click();

                                                            document.body.removeChild(element);
                                                        });

                                                    });
                                                </script>


                                            </div>
                                        </div>
                                        <?php
                                        echo "</div>";
                                    } else if ($splitVB_formGroupAll_alias[$mm] == "viewPrint") {
                                        echo "<div tabnumber='" . $mm . "' class='" . iif(InStr($control_all[$splitVB_formGroupAll[$mm]], "round_child") > 0, "round_child", "") . "'>";
                                        ?>
                                            <script src="jasonday-printThis/printThis.js"></script>
                                            <div class="viewPrintDivRound">
                                                <div id="viewPrintDiv" class="viewPrintDiv">
                                                    <link href="/_mis/cssJs/viewPrint.css?<?= $dd ?>" rel="stylesheet" aaa />


                                                    <span class="k-icon k-i-pdf"
                                                        onclick='$("div#viewPrintDiv").removeClass("zoom150");pdf_onclick();'
                                                        title='save as pdf'></span>
                                                    <span class="k-icon k-i-print" onclick='print_onclick();' title='print'></span>



                                                    <div class="viewPrintTitle"><?php echo $MenuName; ?></div>
                                                    <table class="viewPrint">
                                                        <tbody>

                                                        <?php echo $viewPrint; ?>

                                                        </tbody>
                                                    </table>



                                                </div>
                                            </div>
                                        <?php
                                        echo "</div>";
                                    } else {
                                        echo "<div tabnumber='" . $mm . "' class='" . iif(InStr($control_all[$splitVB_formGroupAll[$mm]], "round_child") > 0, "round_child", "") . "'>" . $control_all[$splitVB_formGroupAll[$mm]] . "</div>";
                                    }
                                }
                            } else {
                                $cnt_splitVB_formGroupAll = count($splitVB_formGroupAll);
                                for ($mm = 1; $mm < $cnt_splitVB_formGroupAll - 1; $mm++) {
                                    if ($splitVB_formGroupAll[$mm] == "입력폼" || $splitVB_formGroupAll[$mm] == "수정폼") {
                                        echo "<div tabnumber='" . $mm . "' class='" . iif(InStr($control_all[$splitVB_formGroupAll[$mm]], "round_child") > 0, "round_child", "") . "'>";
                                        ?>
                                        <script src="jasonday-printThis/printThis.js"></script>
                                        <div class="viewPrintDivRound">
                                            <div id="viewPrintDiv" class="viewPrintDiv">
                                                <link href="/_mis/cssJs/viewPrint.css?<?= $dd ?>" rel="stylesheet" bbb />
                                                <link href="/_mis/cssJs/viewForm.css?<?= $dd ?>" rel="stylesheet" />



                                                <div class="viewPrintTitle"><?php echo $MenuName; ?></div>
                                                <table class="viewPrint">
                                                    <tbody>

                                                        <?php echo $viewPrint; ?>

                                                    </tbody>
                                                </table>



                                            </div>
                                        </div>
                                        <?php
                                        echo "</div>";
                                    } else {
                                        echo "<div tabnumber='" . $mm . "' class='" . iif(InStr($control_all[$splitVB_formGroupAll[$mm]], "round_child") > 0, "round_child", "") . "'>" . $control_all[$splitVB_formGroupAll[$mm]] . "</div>";
                                    }
                                }
                            }
                            ?>

                        </div>
                    </div>





                </div>
            </div>
        </div>
    </div>
</form>
<script>
    document.getElementById("key_aliasName").value = "<?php echo $key_aliasName; ?>";



    var resultAll;

    function read_idx(p_idx) {

        if (p_idx == undefined) p_idx = document.getElementById('idx').value;

        /*
        if($('div#list5')[0] && document.getElementById("ActionFlag").value=='write' && p_idx!='0') {
         url = location.href;
         url = replaceAll(replaceAll(url, '&idx=0', '&idx='+p_idx), '&ActionFlag=write', '&ActionFlag=modify');
         location.href = url;
         return false;
        }
        */

        document.getElementById("loadingEnd").value = "N";

        $('form#frm [initvalue]').removeAttr('initvalue');
        $('form#frm').attr('upload_change', 'N');
        $('#frm [templete_treat]').removeAttr('templete_treat');


        displayLoading();


        document.getElementById("idx").value = p_idx;
        value_pre = document.getElementById("pre").value;


        if (parent.document.getElementById("pre")) {
            if (isMainFrame() == false && parent.document.getElementById("pre").value != document.getElementById("pre").value) {
                value_pre = parent.document.getElementById("pre").value;
            }
        }
        var url = "<?php echo $jsonUrl; ?>list_json.php?flag=" + document.getElementById("ActionFlag").value + "&app=" + document.getElementById('app').value
            + "&RealPid=<?php echo $RealPid; ?>&MisJoinPid=<?= $MisJoinPid ?>&isDeleteList=<?= $isDeleteList ?>&idx=" + p_idx
            + "&parent_gubun=<?php echo $parent_gubun; ?>"
            + "&parent_idx=<?php echo $parent_idx; ?>"
            + "&pre=" + value_pre
            + "&addParam=" + document.getElementById("addParam").value
            + "&isSql=<?php echo requestVB("isSql"); ?>"
            + "&tsql=<?php echo requestVB("tsql"); ?>"
        <?php if ($jsonUrl != '') { ?>
                + iif(document.getElementById('MS_MJ_MY').value == 'MY', '&remote_MS_MJ_MY=MY', '')
        <?php } ?>
            + "&$callback=jQuery" + getRandomArbitrary(1000000000, 9999999999);

        if (InStr(document.getElementById('app').value, 'download.') > 0) {
            $('iframe#ifr_treat')[0].src = url;
            document.getElementById('app').value = '';
            return false;
        } else {
            document.getElementById('app').value = '';
        }

        /*
        document.getElementById('idx').value 만 전달된 상황에서 
        viewLogic_afterLoad, viewLogic_afterLoad_continue 함수보다 더 빠르게 사용자로직을 적용해야 하는 경우 유용함.
        예) kimgo. 3041 프로그램. list 는 일반적인 형태이지만, view 에서는 list5 를 사용하는 경우,
            사용자가 리스트를 클릭하면 빠르게 location 을 변경시켜야할 때가 있음. 이때 사용함.
        */
        if (typeof before_read_idx == "function") {
            if (before_read_idx() == 'stop') {
                return false;
            }
        }

        $.ajax({
            url: url,
            complete: function (data) {

                $(".k-upload-files").remove();
                $(".k-upload-status").remove();
                if (document.getElementById('ActionFlag').value == 'view') $(".k-upload.k-header").addClass("k-upload-empty");

                $(".k-upload-button").removeClass("k-state-focused");
                $("input[data-files]").removeAttr("data-files");
                $("input.isPassSave").prop("checked", true);
                $("input.isPassSave").click();

                var d1 = Mid(data.responseText, InStr(data.responseText, "(") + 1, 100000000);

                if (!isJsonString(Left(d1, d1.length - 3))) {
                    if (getCookie('devQueryOn') == 'Y') {
                        rnd = getRandomArbitrary(101, 400);
                        if ($('body').is(':visible')) toastr.error('<a id="rnd' + rnd + '" href="javascript:;" onclick="query_error_popup(this);">에러쿼리를 보시려면 여기를 클릭하세요.</a>', '', { progressBar: true, timeOut: 7000, positionClass: "toast-bottom-right" });
                        $('a#rnd' + rnd).attr('msg', d1);
                    } else {
                        if ($('body').is(':visible')) toastr.error('에러가 발생했습니다. 관리자에게 문의하세요.', '', { progressBar: true, timeOut: 7000, positionClass: "toast-bottom-right" });
                    }
                    displayLoadingOff();
                    return false;
                }

                resultAll = JSON.parse(Left(d1, d1.length - 3));

                result = resultAll.d.results[0];

                if (typeof thisLogic_view_after_resultAll == "function" && $('body').attr('view_load') == undefined) {
                    thisLogic_view_after_resultAll(resultAll);
                    $('body').attr('view_load', 'end');
                }

                document.getElementById("child_alias").value = resultAll.d.child_alias;


                read_idx_first(result);
                <?php if ($ActionFlag == 'write') { ?>
                    write_form_clear();
                <?php } else { ?>
                    //url 방식의 items 에 대한 viewModel Value 를 찾지 못해서 추가함.
                    $('select[data-role="dropdownlist"][grid_items=""]').each(function () {
                        viewModel[this.id + 'Value'] = resultAll.d.results[0][this.id];
                    });
                <?php } ?>
                kendo.bind($("div.example-wrapper"), viewModel);
                //if (typeof read_idx_first2 === 'function') {
                //    read_idx_first2();  //과도기
                //}
                if (p_idx == "null") {
                    displayLoadingOff();
                    return false;
                }

                <?php if ($ActionFlag != 'view') { ?>
                    key_count = 1;
                    //키이면 무조건 읽기전용
                    obj_input = $("#frm input#" + document.getElementById("key_aliasName").value);
                    if (obj_input.length == 1) {
                        if (document.getElementById("ActionFlag").value == "modify") {
                            obj_input[0].readOnly = true;
                        }
                        obj_input[0].style.backgroundColor = "#7190f8";
                        obj_input.attr('keys', 'Y');   //키의 경우, system_default 값이 있으면 우선적용임.
                        if (obj_input.attr('system_default') != undefined) obj_input[0].value = obj_input.attr('system_default');
                        if ($("div#round_" + document.getElementById("key_aliasName").value + " span.k-clear-value")[0]) $("div#round_" + document.getElementById("key_aliasName").value + " span.k-clear-value")[0].outerHTML = '';
                    } else if ($("#frm [data-bind]")[0].id != document.getElementById('key_aliasName').value) {
                        //다중 키일 경우 idx 값으로 갯수를 추정하여 읽기전용으로 처리.
                        <?php if ($ActionFlag == 'write') { ?>
                            key_count = "<?php echo onlyOnereturnSql("select Grid_Select_Field from $MisMenuList_Detail where RealPid='$logicPid' and SortElement=2"); ?>".split('_-_').length;
                        <?php } else { ?>
                            key_count = document.getElementById('idx').value.split('_-_').length;
                        <?php } ?>
                        obj_input = $("#frm input[data-bind],#frm select[data-bind]");
                        obj_input_current = obj_input[0];

                        if (key_count >= 1 && obj_input_current != undefined) {
                            if (obj_input_current.tagName == 'SELECT') {
                                if (document.getElementById("ActionFlag").value == "modify") $(obj_input_current).data("kendoDropDownList").readonly();
                                $(obj_input_current).prev().find('span').css('background-color', '#7190f8');
                            } else {
                                if (document.getElementById("ActionFlag").value == "modify") {
                                    obj_input_current.readOnly = true;
                                    if ($("div#round_" + obj_input_current.id + " span.k-clear-value")[0]) $("div#round_" + obj_input_current.id + " span.k-clear-value")[0].outerHTML = '';
                                }
                                obj_input_current.style.backgroundColor = "#7190f8";
                            }
                            $(obj_input_current).attr('keys', 'Y');
                            if ($(obj_input_current).attr('system_default') != undefined) obj_input_current.value = $(obj_input_current).attr('system_default');
                            obj_input_current = obj_input[1];
                            if (key_count >= 2) {
                                if (obj_input_current.tagName == 'SELECT') {
                                    if (document.getElementById("ActionFlag").value == "modify") $(obj_input_current).data("kendoDropDownList").readonly();
                                    $(obj_input_current).prev().find('span').css('background-color', '#7190f8');
                                } else {
                                    if (document.getElementById("ActionFlag").value == "modify") {
                                        obj_input_current.readOnly = true;
                                        if ($("div#round_" + obj_input_current.id + " span.k-clear-value")[0]) $("div#round_" + obj_input_current.id + " span.k-clear-value")[0].outerHTML = '';
                                    }
                                    obj_input_current.style.backgroundColor = "#7190f8";
                                }
                                $(obj_input_current).attr('keys', 'Y');
                                if ($(obj_input_current).attr('system_default') != undefined) obj_input_current.value = $(obj_input_current).attr('system_default');

                                obj_input_current = obj_input[2];
                                if (key_count >= 3) {
                                    if (obj_input_current.tagName == 'SELECT') {
                                        if (document.getElementById("ActionFlag").value == "modify") $(obj_input_current).data("kendoDropDownList").readonly();
                                        $(obj_input_current).prev().find('span').css('background-color', '#7190f8');
                                    } else {
                                        if (document.getElementById("ActionFlag").value == "modify") {
                                            obj_input_current.readOnly = true;
                                            if ($("div#round_" + obj_input_current.id + " span.k-clear-value")[0]) $("div#round_" + obj_input_current.id + " span.k-clear-value")[0].outerHTML = '';
                                        }
                                        obj_input_current.style.backgroundColor = "#7190f8";
                                    }
                                    $(obj_input_current).attr('keys', 'Y');
                                    if ($(obj_input_current).attr('system_default') != undefined) obj_input_current.value = $(obj_input_current).attr('system_default');

                                    obj_input_current = obj_input[3];
                                    if (key_count >= 4) {
                                        if (obj_input_current.tagName == 'SELECT') {
                                            if (document.getElementById("ActionFlag").value == "modify") $(obj_input_current).data("kendoDropDownList").readonly();
                                            $(obj_input_current).prev().find('span').css('background-color', '#7190f8');
                                        } else {
                                            if (document.getElementById("ActionFlag").value == "modify") {
                                                obj_input_current.readOnly = true;
                                                if ($("div#round_" + obj_input_current.id + " span.k-clear-value")[0]) $("div#round_" + obj_input_current.id + " span.k-clear-value")[0].outerHTML = '';
                                            }
                                            obj_input_current.style.backgroundColor = "#7190f8";
                                        }
                                        $(obj_input_current).attr('keys', 'Y');
                                        if ($(obj_input_current).attr('system_default') != undefined) obj_input_current.value = $(obj_input_current).attr('system_default');

                                        if (key_count >= 5) {
                                            alert("개발오류안내 : key 설정은 최대 4개만 가능합니다. 웹소스에서 다시 처리하세요!");
                                            return false;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    //parent_idx 이면 무조건 읽기전용
                    parent_idx_value = document.getElementById("parent_idx").value;
                    if (parent_idx_value != "") {
                        parent_idx_value_count = parent_idx_value.split("_-_").length;

                        if (parent_idx_value_count >= 1) {
                            obj = $($("#frm div[tabnumber] > div.row")[1]).find("input");
                            if (obj[0]) {
                                obj[0].readOnly = true;
                                obj[0].style.backgroundColor = "#7190f8";
                                if ($("div#round_" + obj[0].id + " span.k-clear-value")[0]) $("div#round_" + obj[0].id + " span.k-clear-value")[0].outerHTML = '';
                                if (parent_idx_value_count >= 2) {
                                    obj = $($("#frm div[tabnumber] > div.row")[2]).find("input");
                                    obj[0].readOnly = true;
                                    obj[0].style.backgroundColor = "#7190f8";
                                    if ($("div#round_" + obj[0].id + " span.k-clear-value")[0]) $("div#round_" + obj[0].id + " span.k-clear-value")[0].outerHTML = '';
                                    if (parent_idx_value_count >= 3) {
                                        obj = $($("#frm div[tabnumber] > div.row")[3]).find("input");
                                        obj[0].readOnly = true;
                                        obj[0].style.backgroundColor = "#7190f8";
                                        if ($("div#round_" + obj[0].id + " span.k-clear-value")[0]) $("div#round_" + obj[0].id + " span.k-clear-value")[0].outerHTML = '';
                                        if (parent_idx_value_count == 4) {
                                            obj = $($("#frm div[tabnumber] > div.row")[4]).find("input");
                                            obj[0].readOnly = true;
                                            obj[0].style.backgroundColor = "#7190f8";
                                            if ($("div#round_" + obj[0].id + " span.k-clear-value")[0]) $("div#round_" + obj[0].id + " span.k-clear-value")[0].outerHTML = '';
                                        }
                                    }
                                }
                            }
                        }
                    }

                    obj = $('select[data-role="dropdowntree"]');
                    for (i = 0; i < obj.length; i++) {
                        obj2 = $(obj[i]).data("kendoDropDownTree").value();
                        for (j = 0; j < obj2.length; j++) {
                            if (typeof obj2[j] == "object") {
                                //obj2.remByVal(obj2[j]);
                                obj2 = removeItem(obj2, obj2[j]);
                                --j;
                            }
                        }

                        $(obj[i]).data("kendoDropDownTree").value(obj2);
                    }

                    //필수입력이지만, 숨겨진 컨트롤 에러문제 해결.
                    obj = $('input[data-role="numerictextbox"][required]');
                    for (i = 0; i < obj.length; i++) {
                        $(obj[i]).removeAttr("required");
                        $($(obj[i]).parent().children('input')[0]).attr("required", "required");
                    }



                    if (document.getElementById("ActionFlag").value == 'write' && document.getElementById("idx").value == "0") {
                        obj = $('select[data-role="dropdownlist"]');
                        for (i = 0; i < obj.length; i++) {
                            if ($(obj[i]).attr("default") != '' && $(obj[i]).attr("default") != undefined) {
                                $(obj[i]).data("kendoDropDownList").value($(obj[i]).attr("default"));
                            } else {
                                $(obj[i]).data("kendoDropDownList").value('');
                            }
                        }
                    }
                <?php } ?>


                if (resultAll.d.results[0]) {
                    if (resultAll.d.results[0].read_only_condition == "1" && document.getElementById("ActionFlag").value != "write") {
                        $("body").attr("pageW_YN", "N");
                        if (document.getElementById("ActionFlag").value == "modify") {
                            toastr.warning("읽기전용 조건에 해당되어 저장이 불가함.", "", {
                                timeOut: 1000
                            });
                        }
                    } else {
                        $("body").attr("pageW_YN", "Y");
                    }
                } else $("body").attr("pageW_YN", "Y");
                <?php if ($MisSession_IsAdmin == "N" && $isAuthW == 'Y') { ?>
                    if (document.getElementById("ActionFlag").value == 'write') {

                    } else if (resultAll.d.results[0] == undefined) {
                        $("body").attr("pageW_YN", "N");
                    } else if (resultAll.d.results[0].wdater != document.getElementById("MisSession_UserID").value) {
                        $("body").attr("pageW_YN", "N");
                    }
                <?php } ?>

                document.getElementById("key_aliasName").value = resultAll.d.key_aliasName;

                $("div.round_child iframe[real_src]").each(function () {
                    if (resultAll.d.results[0]) {
                        var url = replaceAll($(this).attr("real_src"), 'RealPid=' + $(this).attr('tabrealpid'), 'gubun=' + $(this).attr('gubun')) + resultAll.d.results[0][resultAll.d.child_alias]
                        url = url + '&tabalias=' + this.id + '&parent_ActionFlag=' + document.getElementById("ActionFlag").value;
                        if (getUrlParameter("tabjsonname") != undefined) {
                            if (getUrlParameter("tabjsonname").split(".")[2] == resultAll.d.results[0][resultAll.d.child_alias]) {
                                if (InStr(url, "index.php?RealPid=" + getUrlParameter("tabjsonname").split(".")[0])) {
                                    url = url + "&jsonname=" + getUrlParameter("tabjsonname");
                                }
                            }
                        }

                        //if(InStr(url, 'speedmis000979')>0) debugger;
                        if ($('li[tabid="' + $(this).attr('tabrealpid') + '"]').css('display') == 'none' && document.getElementById('userDefine_page_print') == null) {
                            // 
                        } else if ($(this).attr('tabrealpid') == getUrlParameter('tabid') || $('li[tabid="' + $(this).attr('tabrealpid') + '"]').hasClass('k-state-active')) {
                            if (getUrlParameter('tabidx') != undefined && getUrlParameter('tabidx') != '') {
                                url = url + '&idx=' + getUrlParameter('tabidx');
                            }
                            //this.src = url;
                            window.frames[this.id].contentWindow.location.replace(url);
                        } else if (document.getElementById('userDefine_page_print') == null || $('.k-canvas.k-list-scroller.km-widget.km-scroll-wrapper').length == 1) {
                            $(this).attr("real_src2", url);

                            if ($(this).is(':visible') == true || $('li[tabalias="' + this.id + '"]').attr('tabid') == getUrlParameter('tabid') || window.frames[this.id].contentWindow.location.href != 'about:blank' && InStr(window.frames[this.id].contentWindow.location.href, '&lite=Y') == 0) {
                                if (window.frames[this.id].contentWindow.location.href.split('&parent_idx=').length == 2 && window.frames[this.id].contentWindow.location.href.split('&lite=Y').length == 1) {
                                    ifr_obj = getFrameObj(this.id);
                                    ifr_kendoGrid = ifr_obj.$('div#grid').data('kendoGrid');
                                    if (ifr_kendoGrid) {
                                        if (ifr_obj.$('span#parent_idx')[0]) {
                                            new_parent_idx = $('input#idx').val();
                                            ifr_parent_idx = ifr_obj.$('input#parent_idx').val();
                                            ifr_parent_idx2 = window.frames[this.id].contentWindow.location.href.split('&parent_idx=')[1].split('&')[0];
                                            ifr_kendoGrid.dataSource.options.transport.read.url = replaceAll(ifr_kendoGrid.dataSource.options.transport.read.url, '&parent_idx=' + ifr_parent_idx, '&parent_idx=' + new_parent_idx);
                                            ifr_kendoGrid.dataSource.transport.options.read.url = replaceAll(ifr_kendoGrid.dataSource.transport.options.read.url, '&parent_idx=' + ifr_parent_idx, '&parent_idx=' + new_parent_idx);
                                            ifr_obj.$('input#parent_idx')[0].value = new_parent_idx
                                            ifr_obj.$('span#parent_idx')[0].innerText = new_parent_idx;
                                            new_src = replaceAll(window.frames[this.id].contentWindow.location.href, '&parent_idx=' + ifr_parent_idx, '&parent_idx=' + new_parent_idx);
                                            if (new_src != window.frames[this.id].contentWindow.location.href) {
                                                ifr_obj.history.replaceState(null, null, new_src);
                                            } else {
                                                new_src = replaceAll(window.frames[this.id].contentWindow.location.href, '&parent_idx=' + ifr_parent_idx2, '&parent_idx=' + new_parent_idx);
                                                ifr_obj.history.replaceState(null, null, new_src);
                                            }
                                            //아이프레임에서 리스트의 필터링은 상위 idx에 따라 값이 달라짐. --> 이것을 반영함.
                                            if (ifr_obj.$('.union.toolbar_round_Grid_Columns_Title input[data-role="dropdownlist"]')[0]) {
                                                ifr_dropdownlist_value = '';
                                                ifr_obj.$('.union.toolbar_round_Grid_Columns_Title input[data-role="dropdownlist"]').each(function () {
                                                    this.value = '';
                                                });
                                                ifr_kendoGrid.element.closest('body').find('input#grid_load_once_event')[0].value = 'N';
                                                ifr_kendoGrid.dataSource.read();

                                                ifr_obj.$('.union.toolbar_round_Grid_Columns_Title input[data-role="dropdownlist"]').each(function (ii, tt) {
                                                    ifr_obj.$('#' + tt.id).data('kendoDropDownList');
                                                    obj = ifr_obj.$('#' + tt.id).data('kendoDropDownList');
                                                    const params = new URLSearchParams(obj.dataSource.transport.options.read.url);
                                                    if (params.get("parent_idx") != new_parent_idx
                                                        && params.get("parent_idx") != null) {
                                                        obj.dataSource.transport.options.read.url = replaceAll(obj.dataSource.transport.options.read.url
                                                            , "&parent_idx=" + params.get("parent_idx"), "&parent_idx=" + new_parent_idx);
                                                        obj.dataSource.read();
                                                    }
                                                });
                                            } else {
                                                ifr_kendoGrid.element.closest('body').find('input#grid_load_once_event')[0].value = 'N';
                                                ifr_kendoGrid.dataSource.read();
                                            }
                                        } else {
                                            //if(InStr(url,'974')+InStr(url,'990')>0) debugger;
                                            //this.src = url; 
                                            window.frames[this.id].contentWindow.location.replace(url);
                                        }
                                    } else {
                                        if (InStr(window.frames[this.id].contentWindow.location.href, 'RealPid=speedmis000974') > 0
                                            && InStr(window.frames[this.id].contentWindow.location.href, 'tabalias=commentApp') > 0 && getFrameObj(this.id).$('input#ActionFlag').val() == 'simple') {

                                            tab_idx = $('input#idx').val();
                                            tab_obj = getFrameObj(this.id);
                                            //tab_obj.history.pushState(null, null, '/_mis/'+replaceAll(url,'RealPid=speedmis000974','gubun=990'));
                                            tab_obj.$('input#parent_idx').val(tab_idx);
                                            tab_obj.$('div#listView').data('kendoListView').dataSource.transport.options.read.url = 'list_json.php?flag=read&RealPid=speedmis000974&parent_gubun=314&parent_idx=' + tab_idx + '&allFilter=[{"operator":"eq","value":"Y","field":"toolbar_zrefidx0"}]';
                                            tab_obj.$('div#listView').data('kendoListView').dataSource.options.transport.read.url = 'list_json.php?flag=read&RealPid=speedmis000974&parent_gubun=314&parent_idx=' + tab_idx + '&allFilter=[{"operator":"eq","value":"Y","field":"toolbar_zrefidx0"}]';
                                            tab_obj.$('div#listView').data('kendoListView').dataSource.read();

                                        } else {
                                            //this.src = url; 
                                            window.frames[this.id].contentWindow.location.replace(url);
                                        }
                                    }
                                } else {
                                    if (InStr(window.frames[this.id].contentWindow.location.href, 'RealPid=speedmis000974') > 0
                                        && InStr(window.frames[this.id].contentWindow.location.href, 'tabalias=commentApp') > 0 && getFrameObj(this.id).$('input#ActionFlag').val() == 'simple') {
                                        tab_idx = $('input#idx').val();
                                        tab_obj = getFrameObj(this.id);
                                        //tab_obj.history.pushState(null, null, '/_mis/'+replaceAll(url,'RealPid=speedmis000974','gubun=990'));
                                        tab_obj.$('input#parent_idx').val(tab_idx);
                                        tab_obj.$('div#listView').data('kendoListView').dataSource.transport.options.read.url = 'list_json.php?flag=read&RealPid=speedmis000974&parent_gubun=314&parent_idx=' + tab_idx + '&allFilter=[{"operator":"eq","value":"Y","field":"toolbar_zrefidx0"}]';
                                        tab_obj.$('div#listView').data('kendoListView').dataSource.options.transport.read.url = 'list_json.php?flag=read&RealPid=speedmis000974&parent_gubun=314&parent_idx=' + tab_idx + '&allFilter=[{"operator":"eq","value":"Y","field":"toolbar_zrefidx0"}]';
                                        tab_obj.$('div#listView').data('kendoListView').dataSource.read();

                                    } else {
                                        //this.src = url; 
                                        window.frames[this.id].contentWindow.location.replace(url);
                                    }
                                }
                            } else {
                                if ($('li[tabalias="' + this.id + '"]').is(':visible') == true) {
                                    if ($('li[tabalias="' + this.id + '"] span.cnt').css('max-width') != '0px') {
                                        //this.src = url+'&lite=Y';

                                        isCall = 'Y';
                                        if (window.frames[this.id].contentWindow.document.getElementById('RealPid')) {


                                            var f_url = new URL(window.frames[this.id].contentWindow.location.href);
                                            var f_RealPid = window.frames[this.id].contentWindow.document.getElementById('RealPid').value;
                                            var f_parent_gubun = f_url.searchParams.get("parent_gubun");
                                            var f_parent_idx = f_url.searchParams.get("parent_idx");
                                            var f_tabalias = f_url.searchParams.get("tabalias");

                                            var u_url = new URL(location.href.split('index.php?')[0] + url);
                                            var u_RealPid = u_url.searchParams.get("RealPid");;
                                            var u_parent_gubun = u_url.searchParams.get("parent_gubun");
                                            var u_parent_idx = u_url.searchParams.get("parent_idx");
                                            var u_tabalias = u_url.searchParams.get("tabalias");

                                            if (f_RealPid == u_RealPid && f_parent_gubun == u_parent_gubun && f_parent_idx == u_parent_idx && f_tabalias == u_tabalias) {
                                                isCall = 'N';
                                            }
                                        }

                                        //if(isCall=='Y') {
                                        window.frames[this.id].contentWindow.location.replace(url + '&lite=Y');
                                        //} else {
                                        //    console.log('이미 url 은 로딩되었고, json 으로만 호출된 경우이므로 재호출 안함');
                                        //}
                                    }
                                }
                            }
                        } else if (InStr(document.getElementById('userDefine_page_print').value, ':시작}') > 0) {
                            //상세가 있는 인쇄폼
                            if (getUrlParameter('tabidx') != undefined && getUrlParameter('tabidx') != '') {
                                url = url + '&idx=' + getUrlParameter('tabidx');
                            }
                            //this.src = url;
                            window.frames[this.id].contentWindow.location.replace(url);
                        } else {
                            url = replaceAll(url, '&psize=999999', '');  //인쇄양식과 관계가 없을때는 없앰.
                            $(this).attr("real_src2", url);
                            if ($(this).is(':visible') == true) {
                                //this.src = url;
                                window.frames[this.id].contentWindow.location.replace(url);
                            } else {
                                //this.src = url+'&lite=Y';
                                console.log('같은 url 에 대해서는 재호출 안하는 로직을 검토할 것1');
                                window.frames[this.id].contentWindow.location.replace(url + '&lite=Y');
                            }
                        }

                    }
                });
                $("div.round_iframe iframe[real_src]").each(function () {
                    if (resultAll.d.results[0]) {
                        var url = $(this).attr("real_src");
                        json = resultAll.d.results[0];
                        if (InStr(url, "@number_idx") > 0) {
                            if (jsonFromIndex(json, 0).key !== "rowNumber") url = replaceAll(url, "@number_idx", jsonFromIndex(json, 0).value);
                            else url = replaceAll(url, "@number_idx", jsonFromIndex(json, 1).value);
                        }

                        if (getUrlParameter("tabjsonname") != undefined) {
                            if (getUrlParameter("tabjsonname").split(".")[2] == resultAll.d.results[0][resultAll.d.child_alias]) {
                                if (InStr(url, "index.php?RealPid=" + getUrlParameter("tabjsonname").split(".")[0])) {
                                    url = url + "&jsonname=" + getUrlParameter("tabjsonname");
                                }
                            }
                        }
                        //if(InStr(url, 'speedmis000979')>0) debugger;
                        params_src = new URLSearchParams(window.frames[this.id].contentWindow.location.href.split('?')[1]);
                        params_url = new URLSearchParams(url.split('?')[1]);

                        //@number_idx 기법 등에 의한 iframe 호출 시, 같은 gubun, parent_gubun, parent_idx, allFilter 의 조회/수정 페이지에 한해 read_idx 로 호출.
                        is_read_idx = 'N';
                        if (getFrameObj(this.id)[0]) {
                            params_href = new URLSearchParams(getFrameObj(this.id).location.href.split('?')[1]);
                            if (params_src.get('ActionFlag') != 'list' && params_href.get('ActionFlag') != 'write' && (params_href.get('ActionFlag') != null || params_href.get('idx') != null) && params_src.get('ActionFlag') != 'write'
                                && params_src.get('gubun') == params_url.get('gubun')
                                && params_src.get('parent_gubun') == params_url.get('parent_gubun')
                                && params_src.get('parent_idx') == params_url.get('parent_idx')
                                && params_src.get('allFilter') == params_url.get('allFilter')

                                && params_href.get('gubun') == params_url.get('gubun')
                                && params_href.get('parent_gubun') == params_url.get('parent_gubun')
                                && params_href.get('parent_idx') == params_url.get('parent_idx')
                                && params_href.get('allFilter') == params_url.get('allFilter')
                            ) {
                                is_read_idx = 'Y';
                            }
                        }

                        if ($('li[tabid="' + $(this).attr('tabrealpid') + '"]').css('display') == 'none' && document.getElementById('userDefine_page_print') == null) {
                            // 
                        } else if (is_read_idx == 'Y') {
                            getFrameObj(this.id).read_idx(params_url.get('idx'));
                        } else if (document.getElementById('userDefine_page_print') || $(this).attr('tabrealpid') == getUrlParameter('tabid')
                            || $('li[tabid="' + $(this).attr('tabrealpid') + '"]').hasClass('k-state-active')) {
                            if (getUrlParameter('tabidx') != undefined && getUrlParameter('tabidx') != '') {
                                url = url + '&idx=' + getUrlParameter('tabidx');
                            }

                            //this.src = url;
                            window.frames[this.id].contentWindow.location.replace(url);
                        } else {
                            url = replaceAll(url, '&psize=999999', '');  //인쇄양식과 관계가 없을때는 없앰.
                            $(this).attr("real_src2", url);
                            if ($(this).is(':visible') == true) {
                                //this.src = url; 
                                window.frames[this.id].contentWindow.location.replace(url);
                            } else {
                                console.log('같은 url 에 대해서는 재호출 안하는 로직을 검토할 것2');
                                window.frames[this.id].contentWindow.location.replace(url + '&lite=Y');
                            }
                        }
                    }
                });
                $('div.round_helpbox span.round_helpbox1').each(function () {
                    var input_name = $(this).find('input');
                    var input_code = $(this).next().find('input');
                    var btn = $(this).next().next();

                    input_name.change(function () {
                        //console.log('helpbox - input_name.change');
                        if (btn.attr('onair') != 'Y') {
                            btn.attr('onair', 'Y');
                            btn.click();
                            setTimeout(function (p_this) {
                                btn.attr('onair', '');
                                obj_helpbox2 = $(p_this).closest('div.round_helpbox').find('input.round_helpbox2')[0];
                                if ($(p_this).attr('selvalue') != undefined) {
                                    $(p_this)[0].value = $(p_this).attr('selvalue');
                                    if (obj_helpbox2 && $(obj_helpbox2).attr('selvalue')) {
                                        obj_helpbox2.value = $(obj_helpbox2).attr('selvalue');
                                    }
                                } else if ($(p_this).attr('initvalue') != undefined) {
                                    $(p_this)[0].value = $(p_this).attr('initvalue');
                                    if (obj_helpbox2 && $(obj_helpbox2).attr('initvalue')) {
                                        obj_helpbox2.value = $(obj_helpbox2).attr('initvalue');
                                    }
                                }
                            }, 1000, this);
                        }
                    });
                    input_code.change(function () {
                        //console.log('helpbox - input_code.change');
                        if (btn.attr('onair') != 'Y') {
                            btn.attr('onair', 'Y');
                            btn.click();
                            setTimeout(function (p_this) {
                                btn.attr('onair', '');
                                obj_helpbox1 = $(p_this).closest('div.round_helpbox').find('input.round_helpbox1')[0];
                                if ($(p_this).attr('selvalue') != undefined) {
                                    $(p_this)[0].value = $(p_this).attr('selvalue');
                                    if (obj_helpbox1) {
                                        obj_helpbox1.value = $(obj_helpbox1).attr('selvalue');
                                    }
                                } else if ($(p_this).attr('initvalue') != undefined) {
                                    $(p_this)[0].value = $(p_this).attr('initvalue');
                                    if (obj_helpbox1) {
                                        obj_helpbox1.value = $(obj_helpbox1).attr('initvalue');
                                    }
                                }
                            }, 1000, this);
                        }
                    });

                    /*
                    input_name.keyup( function() {
                        if(event.keyCode==13) {
                            console.log('helpbox - input_name.keyup');
                            btn.click();
                        }
                    });
                    input_code.keyup( function() {
                        if(event.keyCode==13) {
                            console.log('helpbox - input_code.keyup');
                            btn.click();
                        }
                    });
                    */


                    btn.click(function () {
                        //debugger;
                        view_helpbox(this, input_code[0].id, event.currentTarget.id);
                    });
                    $(this).removeClass('round_helpbox1');
                });

                $("div.round_iframe").each(function () {
                    $(this).parent().css('padding', '0');
                    <?php if ($isMenuIn == 'Y') { ?>
                        $(this).parent().css('height', 'calc(100% - 158px)');
                    <?php } else { ?>
                        $(this).parent().css('height', 'calc(100% - 89px)');
                    <?php } ?>
                    $(this).parent().css('overflow-y', 'hidden');
                });



                //radio 태그 생성로직 : 한번만.
                $('form select[Grid_CtlName_ori="radio"]').each(function (i, select) {
                    var $select = $(select);
                    $select.closest('span.k-widget.k-dropdown').before(
                        "<div class='radio_area radio_area_" + $select.attr('id') + "'></div>"
                    );
                    $select.find('option').each(function (j, option) {
                        if (j == 0 && $('div#round_' + $select.attr('id') + ' span.required').length == 0) {
                            var $option = $(option);
                            var $radio = $('<input type="radio" />');
                            $radio.attr('name', $select.attr('id')).attr('value', '');
                            $radio.attr('id', $select.attr('id') + '__');
                            $radio.attr('checked', 'checked');
                            $option[0].outerHTML = '<span class="option_item">' + $option[0].outerHTML + '</span>';
                            $('div.radio_area_' + $select.attr('id')).append($radio);

                            $('div.radio_area_' + $select.attr('id')).append(
                                $("<label for='" + $select.attr('id') + "__'/>").text(iif(kendo.culture().name == "ko-KR", '(없음)', '(no select)'))
                            );
                        }
                        var $option = $(option);
                        var $radio = $('<input type="radio" />');
                        if ($option.val() != '') {
                            $radio.attr('name', $select.attr('id')).attr('value', $option.val());
                            $radio.attr('id', $select.attr('id') + '__' + j);
                            if ($option.attr('selected')) $radio.attr('checked', 'checked');
                            $option[0].outerHTML = '<span class="option_item">' + $option[0].outerHTML + '</span>';
                            $('div.radio_area_' + $select.attr('id')).append($radio);

                            $('div.radio_area_' + $select.attr('id')).append(
                                $("<label for='" + $select.attr('id') + '__' + j + "'/>").text($option.text())
                            );

                        }
                    });
                    $select.closest('span.k-widget.k-dropdown').css('display', 'none');
                    $('label[for="' + $select[0].id + '"]').removeAttr('for');
                    radio_obj = $('input[name="' + $select[0].id + '"][type="radio"]');
                    if (radio_obj.closest('div')[0]) {
                        radio_obj.closest('div')[0].outerHTML = replaceAll(replaceAll(radio_obj.closest('div')[0].outerHTML, '<input', '<span class="option_item"><input'), '</label>', '</label></span>');
                    }
                    radio_obj = $('input[name="' + $select[0].id + '"][type="radio"]');
                    radio_obj.click(function () {
                        $('select#' + $(this).attr('name')).data('kendoDropDownList').value(this.value);
                    });
                    $select.attr('Grid_CtlName_ori', '_radio');
                });
                //radio value 적용 : 계속
                $('form select[Grid_CtlName_ori="_radio"]').each(function (i, select) {
                    v = $(select).data('kendoDropDownList').value();
                    if (v != '') {
                        $('input[name="' + select.id + '"][type="radio"][value="' + v + '"]')[0].checked = true;
                        $('select[id="' + select.id + '"][data-role="dropdownlist"]').data('kendoDropDownList').value(v);       //1항
                        $('select[id="' + select.id + '"][data-role="dropdownlist"]').val(v);       //2항 : 1,2항 모두 지정해줘야함.
                    }
                });



                $('form#frm select[data-role="dropdownlist"][data-header-template]').each(function () {
                    if ($(this).data('kendoDropDownList')) {
                        v = $(this).data('kendoDropDownList').value();
                        //과제:아래를 주석처리함. 한번더 url 호출하여 느리게 만듦.
                        //$(this).data('kendoDropDownList').search();
                        if (v != '') {
                            setTimeout(function (p_this, p_v) {
                                $(p_this).data('kendoDropDownList').value(p_v);
                                vv = p_this.value;
                                if (vv == '') {
                                    setTimeout(function (pp_this, pp_v) {
                                        $(pp_this).data('kendoDropDownList').value(pp_v);
                                        vvv = p_this.value;
                                        if (vvv == '') {
                                            setTimeout(function (ppp_this, ppp_v) {
                                                $(ppp_this).data('kendoDropDownList').value(ppp_v);
                                            }, 500, pp_this, pp_v);
                                        }
                                    }, 500, p_this, p_v);
                                }
                            }, 100, this, v);
                        }
                    }
                });
                //return false;

                viewImageAfterLoad1();

                /*
                                if(document.getElementById("document_load_once_event").value=="N" && isNumeric(getUrlParameter("tabnumber"))) {
                                    document.getElementById("document_load_once_event").value = "Y";
                                    $("form#frm li[tabnumber="+getUrlParameter("tabnumber")+"]").click();
                                } else if(document.getElementById("document_load_once_event").value=="N" && getUrlParameter("tabid")!=undefined) {
                                    document.getElementById("document_load_once_event").value = "Y";
                                    $("form#frm li[tabid="+getUrlParameter("tabid")+"]").click();
                                } else if(document.getElementById("document_load_once_event").value=="N" && getUrlParameter("tabname")!=undefined) {
                                    document.getElementById("document_load_once_event").value = "Y";
                                    $("form#frm li[tabname="+getUrlParameter("tabname")+"]").click();
                                } else if(document.getElementById("document_load_once_event").value=="N" && getUrlParameter("tabrealpid")!=undefined) {
                                    document.getElementById("document_load_once_event").value = "Y";
                                    $("form#frm li[tabrealpid="+getUrlParameter("tabrealpid")+"]").click();
                                    if(getUrlParameter("tabrealpid_idx")!=undefined) {
                                        var obj = $('iframe[tabrealpid="'+getUrlParameter("tabrealpid")+'"]')[0];
                                        obj.src = obj.src + "&idx=" + getUrlParameter("tabrealpid_idx");
                                    }
                                }
                */
                if (document.getElementById("document_load_once_event").value == "N" && getUrlParameter("tabid") != undefined) {
                    setTimeout(function () {
                        document.getElementById("document_load_once_event").value = "Y";
                    });
                    $("form#frm li[tabid=" + getUrlParameter("tabid") + "]").click();
                    if (getUrlParameter("tabrealpid_idx") != undefined) {
                        var obj = $('div.round_tab div[tabnumber="' + $("form#frm li[tabid=" + getUrlParameter("tabid") + "]").attr('tabnumber') + '"] iframe')[0];
                        if (obj) {
                            if (getUrlParameter("tabrealpid_tabid") != undefined) {
                                obj.src = obj.src + "&idx=" + getUrlParameter("tabrealpid_idx") + '&tabrealpid_tabid=' + getUrlParameter("tabrealpid_tabid");
                            } else {
                                obj.src = obj.src + "&idx=" + getUrlParameter("tabrealpid_idx");
                            }
                        }
                    }
                } else if (document.getElementById("document_load_once_event").value == "N" && getUrlParameter("tabrealpid_tabid") != undefined) {
                    setTimeout(function () {
                        document.getElementById("document_load_once_event").value = "Y";
                    });
                    $("form#frm li[tabid=" + getUrlParameter("tabrealpid_tabid") + "]").click();
                }


                if (typeof first_afterScript == 'undefined') {
                    first_afterScript = resultAll.d.afterScript;
                } else if (first_afterScript == resultAll.d.afterScript) {
                    return false;
                }
                if (resultAll.d.afterScript != "" && resultAll.d.afterScript != undefined) {
                    try {
                        eval(resultAll.d.afterScript);
                        debugger;
                    } catch (error) {
                        alert(resultAll.d.afterScript);
                    }
                }


            }
        });


        var myInterval0 = setInterval(function () {
            //if(getUrlParameter('idx')=='0' && getUrlParameter('gubun')=='1247') debugger;
            if (top.document.getElementById("displayLoading")) {
                if (top.document.getElementById("displayLoading").value != "Y" && document.getElementById("ActionFlag").value == "view" || top.document.getElementById("displayLoading").value != "Y" && $('div[tabnumber] > .form-group select[id][data-role="dropdownlist"]').length == $('div[tabnumber] > .form-group select[id][data-role="dropdownlist"]').closest('div.round_dropdownlist').find('span.k-icon.k-i-arrow-60-down').length) {

                    if (top.document.getElementById("displayLoading").value != "Y") clearInterval(myInterval0);

                    //$("body")[0].style.setProperty('display', 'block', 'important');
                    $('form#frm input[data-bind][type="text"]').each(function () {
                        $(this).attr("initValue", this.value);
                    });
                    $('form#frm input[data-bind][type="checkbox"]').each(function () {
                        $(this).attr("initValue", this.checked);
                    });
                    $('form#frm textarea[data-bind]').each(function () {
                        $(this).attr("initValue", this.value);
                    });

                    $('form#frm select[data-bind]').each(function () {
                        $(this).attr("initValue", this.value);
                    });

                    if (typeof into_CodeMirror == "function" && $('div.k-content[tabnumber] textarea.code')[0]) {
                        //setTimeout( function() {
                        into_CodeMirror("refresh");
                        //}, 1000);
                    }
                    document.getElementById("loadingEnd").value = "Y";


                }
            }

        }, 100);


        ///////////////////////////////////////////////


        <?php
        $cnt_select_alias_name = count($select_alias_name);
        for ($ii = 0; $ii < $cnt_select_alias_name; $ii++) { ?>
            $('#frm #<?php echo $select_alias_name[$ii]; ?>').change(function () {
                viewModel.<?php echo $select_alias_source[$ii]; ?>Source.transport.options.read.url =
                    viewModel.<?php echo $select_alias_source[$ii]; ?>Source.options.transport.read.url
                        + "&select_alias=<?php echo $select_alias_name[$ii]; ?>"
                        + "&select_alias_value=" + this.value;

                $("#frm #<?php echo $select_alias_source[$ii]; ?>").data("kendoDropDownList").setDataSource($("#frm #<?php echo $select_alias_source[$ii]; ?>").data("kendoDropDownList").dataSource);
                $("#frm #<?php echo $select_alias_source[$ii]; ?>").data("kendoDropDownList").value("");
            });
            var myInterval_v1 = setInterval(function () {
                if ($('#frm #<?php echo $select_alias_name[$ii]; ?>').data("kendoDropDownList")) {
                    clearInterval(myInterval_v1);
                    var myInterval_v2 = setInterval(function () {
                        if ($('#frm #<?php echo $select_alias_name[$ii]; ?>').data("kendoDropDownList").dataSource._data.length > 0
                            && $('#frm #<?php echo $select_alias_name[$ii]; ?>').data("kendoDropDownList").dataSource._data.length
                            == $('#frm #<?php echo $select_alias_name[$ii]; ?>').find('option').length
                            && $('#frm #<?php echo $select_alias_name[$ii]; ?>').data("kendoDropDownList").value() == $('#frm #<?php echo $select_alias_name[$ii]; ?>')[0].value) {
                            $('#frm #<?php echo $select_alias_name[$ii]; ?>').change();
                            console.log("1차 셀렉트박스 - kendoDropDownList 의 값갯수는 " + $('#frm #<?php echo $select_alias_name[$ii]; ?>').data("kendoDropDownList").dataSource._data.length);
                            clearInterval(myInterval_v2);
                            var myInterval_v3 = setInterval(function () {
                                console.log("2차 셀렉트박스 - kendoDropDownList 의 값갯수는 " + $('#frm #<?php echo $select_alias_source[$ii]; ?>').data("kendoDropDownList").dataSource._data.length);
                                v = viewModel["<?php echo $select_alias_source[$ii]; ?>Value"];
                                $("#frm #<?php echo $select_alias_source[$ii]; ?>").data("kendoDropDownList").value(v);
                                if ($('#frm #<?php echo $select_alias_source[$ii]; ?>')[0].value == v || v == undefined) {
                                    console.log("2차 셀렉트박스 - kendoDropDownList 의 값지정종료");
                                    clearInterval(myInterval_v3);
                                }
                            }, 100);
                        }
                    }, 100);
                }
            }, 100);
        <?php } ?>

        //////////////////////////////////////////////


    }



    stringify.level = 1;


    var pre_reading_idx = '';
    var viewModel = [];
    $(document).ready(function () {


        viewModel = kendo.observable({


            <?php echo $dataSource_all; ?>

        });



        <?php if ($idx != '') { ?>
            read_idx(document.getElementById('idx').value);
        <?php } ?>



        if ($('div[data-role="tabstrip"]')[0]) {
            setTimeout(function () {
                $('div[data-role="tabstrip"]').css("width", "auto");
            }, 500);
        }


    });





    $("#toolbar").kendoToolBar({
        items: [
            { id: "btn_mMenu", icon: "k-icon k-i-menu", type: "button", togglable: true },
            { id: "btn_leftVibile", icon: "k-icon k-i-thumbnails-left", type: "button" },
            { id: "btn_fullScreen", icon: "k-icon k-i-full-screen", type: "button", togglable: true },
            { id: "btn_reload", icon: "k-icon k-i-reload", type: "button", overflow: "never" },
            <?php if ($BodyType != "only_one_list") { ?>
          { id: "btn_list", text: "목록", icon: "k-icon k-i-list-unordered", type: "button", overflow: "never" },
            <?php } ?>

    <?php if ($ActionFlag == 'view') { ?>
            <?php if (($isAuthW == "Y") && $isDeleteList != 'Y') { ?>
                { id: "btn_modify", text: "수정", icon: "k-icon k-i-track-changes-enable", type: "button" },
                    <?php if ($BodyType != "simplelist") { ?>
                    { id: "btn_delete", text: "삭제", icon: "k-icon k-i-delete", type: "button" },
                    <?php } ?>
            <?php } ?>

        

    <?php } else { ?>
            <?php if ($BodyType != "only_one_list" || $pageSizes == 5) { ?>
                { id: "btn_view", text: "조회", icon: "k-icon k-i-eye", type: "button", overflow: "never" },
                <?php } ?>
            <?php if ($isAuthW == "Y") { ?>
                    { id: "btn_save", text: "<?php echo iif($ActionFlag == 'modify', "저장", "입력완료"); ?>", icon: "k-icon k-i-track-changes-enable", type: "button", overflow: "never" },
                    <?php if ($ActionFlag == 'write') { ?>
                        { id: "btn_back", text: "취소", icon: "k-icon k-i-eye", type: "button" },
                    <?php } ?>
                <?php if ($BodyType != "only_one_list") { ?>
                    { id: "btn_saveClose", text: "<?php echo iif($ActionFlag == 'modify', "수정", "입력"); ?>완료후닫기", icon: "k-icon k-i-track-changes-enable", type: "button" },
                    <?php } ?>
                    <?php if ($BodyType != "only_one_list" && $ActionFlag == 'modify') { ?>
                    { id: "btn_saveView", text: "수정완료후조회", type: "button" },
                    <?php } ?>
                    <?php if ($BodyType != "simplelist" && $ActionFlag != "write") { ?>
                    { id: "btn_delete", text: "삭제", icon: "k-icon k-i-delete", type: "button" },
                    <?php } ?>

            <?php } ?>
            <?php if ($isAuthW == "Y" && $MisSession_IsAdmin == "Y" && $BodyType != "simplelist") { ?>
                    <?php if ($isDeleteList == 'Y') { ?>
                    { id: "btn_restore", text: "복원", type: "button" },
                        { id: "btn_kill", text: "완전삭제", icon: "k-icon k-i-delete", type: "button" },
                    <?php } ?>
            <?php } ?>
    <?php } ?>
    <?php if ($isAuthW == "Y" && $BodyType != "simplelist" && $isDeleteList != "Y" && $ActionFlag != "write") { ?>
            { id: "btn_refWrite", text: "참조입력", icon: "k-icon k-i-pencil", type: "button" },
                { id: "btn_write", text: "새로입력", icon: "k-icon k-i-pencil", type: "button" },
            <?php } ?>

    <?php if ($BodyType != "only_one_list") { ?>
          { id: "btn_close", text: "닫기", icon: "k-icon k-i-close", type: "button" },
            <?php } ?>
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

            <?php if ($isDeleteList != 'Y') { ?>
            {
                    id: "btn_urlCopy",
                    type: "button",
                    text: "URL 복사",
                    overflow: "always"
                },
            <?php } ?>


      <?php if ($ActionFlag == 'view' && $isUsePrint || $ActionFlag != "view" && $isUseForm) { ?>
          { id: "btn_basicFormVisible", text: "기본폼 노출", type: "button", overflow: "always" },
            <?php } ?>
      { id: "btn_reopen", text: "다시열기", type: "button", overflow: "always" },
            { id: "btn_newopen", text: "새창열기", type: "button", overflow: "always" },

            <?php if ($tabjsonname != '') { ?>
                {
                    id: "btn_backupBye",
                    type: "button",
                    text: "실데이터 보기",
                    overflow: "always"
                },
            <?php } ?>
    <?php if ($MisSession_IsAdmin == 'Y') { ?>
        {
                    id: "btn_editHelp",
                    type: "button",
                    text: "도움말 작성",
                    overflow: "always"
                },
            <?php } ?>
    { id: "btn_mConfig", type: "button", text: "설정", togglable: true },


            { id: "btn_menuRefresh", text: "메뉴새로고침", type: "button", overflow: "always" },
            <?php if ($isDeveloper != 'X') { ?>
        { id: "btn_addMenu", text: "프로그램 추가", type: "button", overflow: "always" },
            <?php } ?>
    <?php if ($isDeveloper != 'X' || $full_siteID == 'speedmis') { ?>
            { id: "btn_webSourceOpen", text: "해당 웹소스 열기", type: "button", overflow: "always" },
                { id: "btn_designer", text: "해당 뷰디자이너", type: "button", overflow: "always" },
            <?php } ?>
    <?php if ($MisSession_UserID == 'gadmin') { ?>
            <?php if ($devQueryOn == 'N') { ?>
            { id: "btn_devQueryOn", text: "개발자 모드", type: "button", overflow: "always" },
                <?php } else { ?>
            { id: "btn_devQueryOff", text: "실사용 모드", type: "button", overflow: "always" },
                <?php } ?>
    <?php } ?>
    <?php if ($telegram_bot_token != '') { ?>
        { id: "btn_opinion", text: "관리자문의/불편신고", type: "button", overflow: "always" },
            <?php } ?>

        { id: "btn_logout", text: "로그아웃", type: "button", overflow: "always" },
            { id: "btn_menuName", text: "", attributes: { title: "<?php echo iif($MisSession_IsAdmin == "Y", "관리자 권한", iif($isAuthW == "Y", "쓰기권한", "읽기권한")); ?>" }, type: "button", class: "info" },



            <?php if ($help_title != '') { ?>
            {
                    id: "btn_help",
                    <?php if (Left($help_title, 10) == "MIS_JOIN::") {
                        $help_title = Mid($help_title, 11, 1000);
                        ?>
                        attributes: { misjoin: "Y" },
                    <?php } ?>
            text: "Guide: <?php echo $help_title; ?>", type: "button", overflow: "never"
                },
            <?php } ?>


        { id: "btn_menuTitle", text: "", attributes: { title: "" }, type: "button", class: "info" }

        ],
        click: toolbar_onClick,
        toggle: onToggle,
    });

</script>

<?php

if (function_exists("pageLoad")) {
    pageLoad();
}
?>

<script>

    if (typeof thisLogic_toolbar == "function") {
        thisLogic_toolbar();
    }
    if ($("#btn_1").text() == '') $("#btn_1").remove();
    if ($("#btn_2").text() == '') $("#btn_2").remove();
    if ($("#btn_3").text() == '') $("#btn_3").remove();
    if ($("#btn_4").text() == '') $("#btn_4").remove();
    if ($("#btn_5").text() == '') $("#btn_5").remove();

    document.getElementById("thisAlias_parent_idx").value = "<?php echo $thisAlias_parent_idx; ?>";
    parent_cnt_obj = parent.$('li[tabid="' + document.getElementById('RealPid').value + '"] span.cnt')[0];
    if (parent_cnt_obj) {
        if (parent_cnt_obj.innerText != '') {
            parent_cnt_obj.innerText = 0;
            $(parent_cnt_obj).attr('cnt', '0');
        }
    }
</script>


</div>
</div>
<!--end view_inc.php-->