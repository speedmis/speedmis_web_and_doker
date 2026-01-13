<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");


error_reporting(E_ALL);
ini_set("display_errors", 1);


?>
<?php include 'MisCommonFunction.php'; ?>
<?php include '../_mis_uniqueInfo/config_siteinfo.php'; ?>
<?php

if ($MS_MJ_MY == 'MY')
	$addDir = 'MY';
else
	$addDir = '';

$MisSession_UserID = '';
accessToken_check();

$MisJoinPid = requestVB("MisJoinPid");
$RealPid = requestVB("RealPid");
if ($MisJoinPid == '')
	$logicPid = $RealPid;
else
	$logicPid = $MisJoinPid;
$idx = requestVB("idx");

if ($MS_MJ_MY == 'MY') {
	$sql = "select concat(ifnull(g08,''),'@',ifnull(dbalias,'')) from MisMenuList where RealPid='" . $logicPid . "'";
} else {
	$sql = "select isnull(g08,'')+'@'+isnull(dbalias,'') from MisMenuList where RealPid='" . $logicPid . "'";
}
$temp = splitVB(onlyOnereturnSql($sql), "@");
$table_m = $temp[0];
$dbalias = $temp[1];
/* MS_MJ_MY 셋트 start */
$isnull = 'isnull';
$Nchar = 'N';
$Nchar2 = 'N';
if ($dbalias == 'default') {
	$dbalias = '';
} else if (($dbalias == '' || $dbalias == '1st') && $MS_MJ_MY == 'MY') {
	$dbalias = '1st';
	$MS_MJ_MY2 = 'MY';
	$isnull = 'ifnull';
	$Nchar = '';
}
connectDB_dbalias($dbalias);
if ($MS_MJ_MY2 == 'MY') {
	$Nchar2 = '';
}
/* MS_MJ_MY 셋트 end */

if (Left($table_m, 4) == "dbo.")
	$table_m = splitVB($table_m, "dbo.")[1];




$key_aliasName = requestVB("key_aliasName");
$key_value = requestVB("key_value");



//다단구성의 경우 탄력적인 하단목록생성.
$upValue = requestVB("upValue");


//$MisJoinPid = $_GET["MisJoinPid"];
//if($MisJoinPid=='') $logicPid = $RealPid; else $logicPid = $MisJoinPid;

if (isset($_GET["parent_idx"]))
	$parent_idx = $_GET["parent_idx"];
else
	$parent_idx = '';


$dataTextField = $_GET["dataTextField"];
$dataValueField = $_GET["dataValueField"];
if (isset($_GET["select_alias"]))
	$select_alias = $_GET["select_alias"];
else
	$select_alias = '';
if (isset($_GET["select_alias_value"]))
	$select_alias_value = $_GET["select_alias_value"];
else
	$select_alias_value = '';

$filter = requestVB('$filter');

echo $_GET['$callback'];





/* 서버 로직 start */
if (file_exists('../_mis_addLogic/' . $logicPid . '.php'))
	include '../_mis_addLogic/' . $logicPid . '.php';


$sql = "
select d.aliasName, d.Grid_Select_Field, d.Grid_Select_Tname, d.Grid_GroupCompute, d.Grid_PrimeKey, m.g08, m.g09 from MisMenuList_Detail d 
left outer join MisMenuList m on m.RealPid=d.RealPid
where d.RealPid='$logicPid' and d.aliasName in ('$dataTextField','$dataValueField')
order by d.SortElement;
";


$result = allreturnSql($sql);


if (function_exists("misMenuList_change")) {
	misMenuList_change();
}

$isMobile = isMobile();
$cache_path = '';
$cache_table = splitVB($result[1]['Grid_PrimeKey'], '#')[1];
//기준테이블은 반드시 lastupdate 칼럼이 있어야함.
if (InStr($cache_table, '.') == 0) {	//스키마명이 있으면 시스템테이블 또는 처리 어려움으로 간주.
	$sql = "select max(lastupdate) FROM $cache_table";

	$lastUpdateTime = onlyOnereturnSql_gate($sql, $dbalias);
	$ServerVariables_URL = $lastUpdateTime . isMobile() . $key_aliasName . $key_value . $upValue . $dataTextField . $filter . requestVB('selCode') . $select_alias . $select_alias_value . $parent_idx;
	//$dataValueField 기준으로 삭제해야할 수 있음.
	$cache_url = "json_codeSelect.U.$MisSession_UserID.isMobile_$isMobile.RealP.$RealPid.JoinP.table.$cache_table.$MisJoinPid.MD5." . md5($ServerVariables_URL) . '.html';
	$cache_path = '../_mis_cache/' . $cache_url;


	if (file_exists($cache_path)) {
		//$callback 만 출력된 시점임.
		echo ReadTextFile($cache_path);
		exit;
	}
}
ob_start();


//modify 페이지에서 저장된 값을 결과목록에 반영해주기 위한 변수 / selCode 파람이 두개일 경우 첫번째것을 취함.

if ($filter == '' && count(splitVB($ServerVariables_URL, '&selCode=')) > 1) {
	$selCode = splitVB(splitVB($ServerVariables_URL, '&selCode=')[1], '&')[0];
	$selCode = urldecode($selCode);
} else {
	$selCode = requestVB('selCode');
}

$Grid_Tname_1 = '';
$key_field_1 = '';
$table_m = '';
$mm = 0;
$cnt_result = count($result);
while ($mm < $cnt_result) {
	if ($mm == 0) {
		$Grid_Tname_0 = $result[$mm]['Grid_Select_Tname'];
		$key_field_0 = $result[$mm]['Grid_Select_Field'];
		$table_m = $result[$mm]["g08"];
	} else {
		$Grid_Tname_1 = $result[$mm]['Grid_Select_Tname'];
		$key_field_1 = $result[$mm]['Grid_Select_Field'];
	}
	$Grid_PrimeKey = $result[$mm]['Grid_PrimeKey'];
	if ($upValue != '' && $Grid_PrimeKey != '') {
		$pr = splitVB($Grid_PrimeKey, "#");
		if (count($pr) >= 5) {
			$last = '#' . $pr[4];
			if (InStr($last, '=') > 0) {
				$last2 = splitVB($last, '=')[0];
				$Grid_PrimeKey = splitVB($Grid_PrimeKey, $last)[0] . '#' . $last2 . '=' . $upValue;
			}
			if (count($pr) == 6) {
				$Grid_PrimeKey = $Grid_PrimeKey . '#' . $pr[5];
			}
		}
	}
	if ($key_value != '' || $idx == '') {
		$Grid_PrimeKey = str_replace('@idx', $key_value, $Grid_PrimeKey);
	} else {
		$Grid_PrimeKey = str_replace('@idx', $idx, $Grid_PrimeKey);
	}
	++$mm;
}



if ($upValue != '' && $Grid_PrimeKey != '') {
	//echo $Grid_PrimeKey; exit('333');
}

$Grid_PrimeKey = str_replace('@MisSession_UserID', $MisSession_UserID, $Grid_PrimeKey);
$Grid_PrimeKey = str_replace('@MisSession_StationNum', $MisSession_StationNum, $Grid_PrimeKey);
$Grid_PrimeKey = str_replace('@RealPid', $RealPid, $Grid_PrimeKey);
$Grid_PrimeKey = str_replace('@MisSession_PositionCode', $MisSession_PositionCode, $Grid_PrimeKey);
$Grid_PrimeKey = str_replace('@parent_idx', $parent_idx, $Grid_PrimeKey);
if ($key_value != '' || $idx == '')
	$Grid_PrimeKey = str_replace('@idx', $key_value, $Grid_PrimeKey);
else
	$Grid_PrimeKey = str_replace('@idx', $idx, $Grid_PrimeKey);


$temp_sql = '';
$temp_sql_not_del = '';
$temp_joinsql = '';



if ($Grid_PrimeKey != "") {
	$temp1 = splitVB($Grid_PrimeKey, '#');
	$label_field = $temp1[0];
	if (InStr($label_field, ';') > 0) {
		//helpbox 흔적이 있을 경우 두번째값을 취함.
		$label_field = splitVB($label_field, ';')[1];
	}
	$new_label_field = '';
	$label_field_like = '';


	$label_field_like = $label_field;	//?????

	$temp_orderby = $temp1[2];
	$key_field = $temp1[3];
	$primery_table = $temp1[1];
	$cnt_temp1 = count($temp1);
	if ($cnt_temp1 > 3) {
		for ($ss = 4; $ss < $cnt_temp1; $ss++) {
			$temp2 = $temp1[$ss];
			if ($select_alias != '')
				$temp2 = str_replace("table_m." . $select_alias, "'" . $select_alias_value . "'", $temp2);
			if ($ss >= 4 && $temp2 != "") {
				if (InStr($temp2, "@outer_tbname") > 0) {
					$temp_joinsql = $temp_joinsql . ' and (' . str_replace("@outer_tbname", $Grid_Tname_0, $temp2) . ") ";
				} else if (Left($temp2, 1) == "(") {
					$temp_joinsql = $temp_joinsql . ' and ' . $temp2;
				} else {
					$temp_joinsql = $temp_joinsql . ' and ' . $Grid_Tname_0 . "." . $temp2;
				}
			}
		}
	}

	$Grid_PrimeKeySql = "select " . $Grid_Tname_0 . "." . $key_field . " as \"" . $dataValueField . "\"," . $label_field . " as \"" . $dataTextField . "\" from " . $primery_table . " " . $Grid_Tname_0
		. " where 111=111 " . $temp_joinsql . " order by " . str_replace('!', ',', $temp_orderby);
	if (InStr($temp_orderby, '!') > 0) {
		//2개 이상일 경우, kendo ui group 형식으로 출력.
		$Grid_PrimeKeySql = str_replace(" from " . $primery_table . " ", ", " . splitVB(splitVB($temp_orderby, '!')[0], ' ')[0] . " as group_item from " . $primery_table . " ", $Grid_PrimeKeySql);
	}
} else {
	if ($Grid_Tname_1 == "") {
		$Grid_Tname_1 = $Grid_Tname_0;
		$key_field_1 = $key_field_0;
	}
	$Grid_PrimeKeySql = "select " . $key_field_0 . " as \"" . $dataValueField . "\"," . $key_field_1 . " as \"" . $dataTextField . "\" from " . $table_m . " table_m where 111=111 " . $temp_joinsql;
}


if ($dbalias != '')
	connectDB_dbalias($dbalias);
$filterQuery = '';
$selValue = '';
if (isset($_GET['selValue'])) {
	$selValue = $_GET['selValue'];
} else if (isset($_GET['$filter'])) {
	$filter = $_GET['$filter'];
	if (InStr($filter, "substringof('") > 0) {
		if (InStr($filter, "',tolower(") > 0) {
			$selValue = splitVB(splitVB($filter, "substringof('")[1], "',tolower(")[0];
		}
	}
}
if ($selValue != "") {
	if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
		$filterQuery = " and lower(" . $label_field_like . ") like N'%" . sqlValueReplace($selValue) . "%'";
	} else {
		$filterQuery = ' and ' . $label_field_like . " like N'%" . sqlValueReplace($selValue) . "%'";
	}
	$Grid_PrimeKeySql = str_replace(" where 111=111 ", " where 111=111 " . $filterQuery, $Grid_PrimeKeySql);
}
// . " where " . $Grid_Tname_0 . "." . $key_field . "='@Grid_rr_value' " . $temp_sql;

$Grid_PrimeKeySql = str_replace("@outer_tbname", $Grid_Tname_0, $Grid_PrimeKeySql);

?>
({
"d" : {
"results":
<?php
$orderByPos = strrpos(splitVB($Grid_PrimeKeySql, " from $primery_table $Grid_Tname_0 ")[1], ' order by ');

$count_sql = "select count(*) from $primery_table $Grid_Tname_0 " . substr(splitVB($Grid_PrimeKeySql, " from $primery_table $Grid_Tname_0 ")[1], 0, $orderByPos);

$cnt = onlyOnereturnSql_gate($count_sql, $dbalias) * 1;
if ($cnt > 500)
	$cnt = 500;
$count_sql = str_replace($filterQuery, "", $count_sql);

$cnt_all = onlyOnereturnSql_gate($count_sql, $dbalias) * 1;



if ($cnt_all > 500) {
	$msg = "총 $cnt_all 건 중, $cnt 개가 검색되었습니다.";
} else {
	$msg = '';
}

//50 에서 500건으로 변경함. 사실상 전체노출임. 노출건이 많을 경우, help box 방식으로 변경할 것.
if ($cnt_all > 500) {
	if ($dbalias != '' && $MS_MJ_MY2 == 'MY') {
		$Grid_PrimeKeySql = $Grid_PrimeKeySql . " limit 500;";
	} else if ($dbalias != '' && $MS_MJ_MY2 == 'OC') {
		$Grid_PrimeKeySql = str_replace(" order by ", " and ROWNUM <= 500 order by ", $Grid_PrimeKeySql);
	} else {
		$Grid_PrimeKeySql = " select top 500 " . Mid($Grid_PrimeKeySql, 7, 10000000);
	}
}

$data = jsonReturnSql_gate($Grid_PrimeKeySql, $dbalias, $MS_MJ_MY2);
if ($selCode != '') {
	$data_decode = json_decode($data, true);
	$idx_list = array_column($data_decode, $key_field_1);
	//echo "---$selCode, $$key_field_1---";
	if (in_array($selCode, $idx_list)) {
		//echo '존재하기 때문에 문제가 안됨';
	} else {
		$temp_joinsql2 = " and $Grid_Tname_0.$key_field=N'$selCode' ";
		$Grid_PrimeKeySql2 = str_replace("where 111=111", "where 111=111 $temp_joinsql2", $Grid_PrimeKeySql);
		$data2 = jsonReturnSql_gate($Grid_PrimeKeySql2, $dbalias, $MS_MJ_MY2);
		//echo "----$data2----";
		$data_decode2 = json_decode($data2, true);
		$data_decode = array_merge($data_decode2, $data_decode);
		$data = json_encode($data_decode, JSON_UNESCAPED_UNICODE);
	}
	//echo '111111111';
	//print_r($data_decode);
	//echo '111111111';
}


if (InStr($Grid_PrimeKeySql, 'group_item') > 0) {
	$data = '[{"' . $dataValueField . '":"","' . $dataTextField . '":"", "group_item":""}' . iif($data == '[]', '', ',') . Mid($data, 2, 10000000);
} else {
	$data = '[{"' . $dataValueField . '":"","' . $dataTextField . '":""}' . iif($data == '[]', '', ',') . Mid($data, 2, 10000000);
}
echo $data;
?>, "keyword": "<?php echo $selValue; ?>"
, "sql": "<?php echo str_replace('"', '\\"', $Grid_PrimeKeySql); ?>"
, "__count": <?php echo $cnt; ?>
, "__count_all": <?php echo $cnt_all; ?>
, "msg": "<?php echo $msg; ?>"
}
})
<?php


if ($cache_path == '') {
	ob_end_flush();
	exit; //캐시파일 경로가 없으면 종료
}

$output = ob_get_contents(); // 지금까지의 출력 내용 저장
WriteTextFileSimple($cache_path, $output, FILE_APPEND);
ob_end_flush();