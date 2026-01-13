<?php
$gzip_YN = 'N';
$top_dir = '_mis';
$g_link = false;

$Enter_Tag = chr(13) . chr(10);
$ServerTag_Start = "<" . "?";
$ServerTag_End = "?" . ">";

$auto_logout_minute = 0;
$useLoginFail_level = 0;
$filter_autocomplete_stop = '';
$auto_file_update = '';

$dangerExt = ".ade.adp.asp.aspx.bas.bat.chm.cmd.com.cpl.crt.exe.hlp.hta.inf.ins.lnk";
$dangerExt = $dangerExt . ".mdb.mde.msc.msi.msp.mst.pcd.php.pif.reg.scr.sct.shb.shs.url.vb.vbe.vbs.wsc.wsf.wsh.xlsm.";

$ServerVariables_URL = $_SERVER["REQUEST_URI"];
if (isset($_SERVER['QUERY_STRING']))
	$ServerVariables_QUERY_STRING = $_SERVER["QUERY_STRING"];
else
	$ServerVariables_QUERY_STRING = '';
if (isset($_SERVER['HTTP_REFERER']))
	$ServerVariables_HTTP_REFERER = $_SERVER["HTTP_REFERER"];
else
	$ServerVariables_HTTP_REFERER = '';

$ServerVariables_HTTP_HOST = $_SERVER["HTTP_HOST"];
$ServerVariables_REMOTE_ADDR = $_SERVER["REMOTE_ADDR"];
if (isset($_SERVER["HTTP_USER_AGENT"]))
	$ServerVariables_HTTP_USER_AGENT = strtolower($_SERVER["HTTP_USER_AGENT"]);
else
	$ServerVariables_HTTP_USER_AGENT = '';

$MisSession_UserID = '';
$MisSession_UserName = '';
$MisSession_AuthSite = '';
$MisSession_StationName = '';
$MisSession_StationNum = '';
$MisSession_PositionName = '';
$MisSession_PositionCode = '';
$myLanguageCode = '';
$useWebApp = '';
$RealPid = '';

require $_SERVER['DOCUMENT_ROOT'] . "/vendor/autoload.php";
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


function delete_cache_files($path_pattern)
{
	// __DIR__ 은 현재 스크립트 파일이 있는 디렉토리를 나타내어 절대 경로를 구성합니다.
	// * .gadmin.* 은 ".gadmin." 이라는 문자열을 포함하는 모든 파일 이름을 뜻합니다.
	// (예: a.gadmin.b.php, temp.gadmin.cache, .gadmin.log 등)

	// 2. **파일 탐색 및 목록 확보**
	$files_to_delete = glob($path_pattern);

	// 3. **제거 로직 실행**
	$deleted_count = 0;
	$failed_to_delete = [];

	if ($files_to_delete) {
		foreach ($files_to_delete as $file) {
			// file_exists()로 파일을 한 번 더 확인하면 안전합니다.
			if (is_file($file)) {
				// unlink() 함수로 파일 삭제를 시도합니다.
				if (unlink($file)) {
					$deleted_count++;
				} else {
					// 삭제 실패 시 파일 경로를 기록합니다.
					$failed_to_delete[] = $file;
				}
			}
		}
	}

	/*
	// 4. **결과 보고 (선택 사항)**
	echo "--- 파일 삭제 보고서 ---\n";
	echo "탐색 패턴: {$path_pattern}\n";
	echo "총 {$deleted_count} 개의 파일이 성공적으로 제거되었습니다. ✨\n";

	if (!empty($failed_to_delete)) {
		echo "⚠️ 다음 파일은 권한 문제 등으로 삭제에 실패했습니다:\n";
		foreach ($failed_to_delete as $file) {
			echo "- {$file}\n";
		}
	} else if ($deleted_count === 0 && empty($files_to_delete)) {
		echo "해당 패턴에 일치하는 파일이 없었습니다. (청소할 필요가 없었군요!)\n";
	}
	*/

}


function file_update_check()
{
	$speedmis_file_update_info0 = ReadTextFile('speedmis_file_update_time.json');
	if (is_json($speedmis_file_update_info0)) {
		$speedmis_file_update_info = json_decode($speedmis_file_update_info0, true);
		//{"updater_update_time": "20250726123016","target_end_time": "20250726190627"}
		$file_updater_update_time = $speedmis_file_update_info['updater_update_time'];
		$file_target_end_time = $speedmis_file_update_info['target_end_time'];
	} else {
		$file_updater_update_time = '';
		$file_target_end_time = '';
	}



	$url = 'http://update.speedmis.com/_mis_speedmis/updateDaemon/updateListFiles_time.json';
	$speedmis_remote_update_info0 = file_get_contents_new($url);
	if (is_json($speedmis_remote_update_info0)) {
		$speedmis_remote_update_info = json_decode($speedmis_remote_update_info0, true);
	} else {
		return;
	}

	$remote_updater_update_time = $speedmis_remote_update_info['updater_update_time'];	//원소스 /update_all/index.php 의 파일수정일시
	$remote_target_end_time = $speedmis_remote_update_info['target_end_time'];	//원소스 /update_all/index.php 에 의한 게시일시


	if ($remote_target_end_time != '' && $remote_target_end_time != $file_target_end_time) {    //게시일시가 다르면 진행.

		//먼저 정보파일 자체를 업데이트 시켜서, 2중 업데이트를 방지.
		if (file_put_contents('speedmis_file_update_time.json', $speedmis_remote_update_info0) === false) {
			echo "❌ <br><br><br><br>파일 저장 실패: speedmis_file_update_time.json";
			return false;
		}


		if ($remote_updater_update_time != $file_updater_update_time) {	//업데이트를 실제 진행하는 파일에 대한 업데이트 진행

			getMIS_remoteFiles('/update_all/index.php', $remote_updater_update_time);
			getMIS_remoteFiles('/update/index.php', $remote_updater_update_time);
		}
		?>
		<script>
			location.href = '/update/';
		</script>

		<?php
		exit;
	}
}

//함수를 실행하여 네 자리 랜덤 코드 생성(또는 여러 자리) : 멀티업로드일 경우 파일명에 추가시킴(save.php).
function generateRandomCode($length = 4)
{
	// 1. 후보군 정의: 영문 소문자 (a-z)와 숫자 (0-9)
	$characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	// 후보군 문자열의 총 길이를 계산 (성능 최적화를 위해 미리 계산)
	$charLength = strlen($characters);

	// 2. 결과를 저장할 빈 문자열 초기화
	$randomString = '';

	// 3. 원하는 길이($length)만큼 반복하며 무작위 문자 선택
	for ($i = 0; $i < $length; $i++) {
		// mt_rand()는 rand()보다 빠르고 예측하기 어려운 난수를 생성합니다.
		// 0부터 ($charLength - 1) 사이의 무작위 인덱스 번호($randomIndex)를 생성합니다.
		$randomIndex = mt_rand(0, $charLength - 1);

		// $characters 문자열에서 $randomIndex 위치의 문자를 추출하여 결과 문자열에 추가합니다.
		$randomString .= $characters[$randomIndex];
	}

	// 4. 완성된 랜덤 문자열 반환
	return $randomString;
}

//MisCommonFunction.php 의 아래 두 함수를 /update_all/index.php 에서도 변경되어야 함.
function getMIS_remoteFiles($relativePath, $timestamp)
{

	$remoteBase = 'http://update.speedmis.com';
	$remoteUrl = $remoteBase . $relativePath;

	$localPath = $_SERVER['DOCUMENT_ROOT'] . $relativePath;
	$localPath = str_replace('\\', '/', $localPath); // 경로 구분자 정규화

	// 💡 디렉토리가 없으면 생성
	$dir = dirname($localPath);
	if (!is_dir($dir)) {
		mkdir($dir, 0777, true);
	}

	$remoteFileName = basename($relativePath); // 경로에서 파일 이름만 추출
	$fileExtension = strtolower(pathinfo($remoteFileName, PATHINFO_EXTENSION)); // 확장자를 소문자로 변환하여 비교

	if ($fileExtension == 'php') {
		$remoteUrl = str_replace('http://update.speedmis.com', 'http://update.speedmis.com/_mis_speedmis/updateDaemon/supportMIS_localFiles.php?relativePath=', $remoteUrl);
	}

	$remoteUrl = str_replace(' ', '%20', $remoteUrl);
	$remoteUrl = encodeHangulInUrl($remoteUrl);
	// 🌐 원격 파일 다운로드
	$fileData = file_get_contents_new($remoteUrl);

	if ($fileData === false) {
		echo "❌ <br><br><br><br>원격 파일 가져오기 실패: $remoteUrl";
		return false;
	}

	//echo "📥 원격 파일 다운로드 성공: $remoteUrl; localPath=$localPath;";

	// 💾 파일 저장
	$result = file_put_contents($localPath, $fileData);
	if ($result === false) {
		echo "❌ <br><br><br><br>파일 저장 실패: $localPath";
		return false;
	} else {
		//echo "파일 저장 성공! 저장된 바이트 수: $result";
	}

	// 🕒 수정일시 설정
	// '20250716133417' → 타임스탬프 변환
	$timestampUnix = strtotime(
		substr($timestamp, 0, 4) . '-' .
		substr($timestamp, 4, 2) . '-' .
		substr($timestamp, 6, 2) . ' ' .
		substr($timestamp, 8, 2) . ':' .
		substr($timestamp, 10, 2) . ':' .
		substr($timestamp, 12, 2)
	);
	if (!touch($localPath, $timestampUnix)) {
		echo "⚠️ <br><br><br><br>파일 수정일 설정 실패: $localPath";
		return false;
	}


	return true;
}
function encodeHangulInUrl($url)
{
	return preg_replace_callback('/[\x{AC00}-\x{D7AF}]+/u', function ($matches) {
		return rawurlencode($matches[0]);
	}, $url);
}




function check_and_block_repeated_requests()
{
	session_start();

	$user_ip = $_SERVER['REMOTE_ADDR'];
	$current_page = $_SERVER['REQUEST_URI'];

	$key = $user_ip . '_' . $current_page;

	if (!isset($_SESSION[$key])) {
		$_SESSION[$key] = array('timestamp' => time(), 'count' => 0);
	}

	// Check if user has accessed the page within the last 30 seconds
	if (time() - $_SESSION[$key]['timestamp'] < 30) {
		$_SESSION[$key]['count'] += 1;
	} else {
		$_SESSION[$key] = array('timestamp' => time(), 'count' => 0);
	}

	// If user accessed the page more than 10 times in the last 30 seconds, block them
	if ($_SESSION[$key]['count'] > 10) {
		WriteTextFileSimple('../temp/block_' . gmdate('Ymd_his', time()) . '.txt', $user_ip . ' | ' . $current_page);
		die('You have been temporarily blocked due to excessive requests.');
	}
}


function build_table($array)
{
	// start table
	$html = '<style>
    table.xls {
      xwidth: 100%;
      xborder: 1px solid #444444;
      xborder-collapse: collapse;
    }
    th.xls, tr.xls, td.xls {
      xborder: 1px solid #444444;
    }
    td.xls {
		white-space:nowrap;
    }
  </style><table class="xls">';
	// header row
	$html .= '<tr class="xls">';
	foreach ($array[0] as $key => $value) {
		$html .= '<th class="xls">' . htmlspecialchars($key) . '</th>';
	}
	$html .= '</tr>';

	// data rows
	foreach ($array as $key => $value) {
		$html .= '<tr class="xls">';
		foreach ($value as $key2 => $value2) {
			$html .= '<td class="xls">' . htmlspecialchars($value2) . '</td>';
		}
		$html .= '</tr>';
	}

	// finish table and return it

	$html .= '</table>';
	return $html;
}
//telegram_sendMessage.php 에서 전송되며, 텔레그램 전송우선 && 없으면 이메일 발송.
function telegram_sendMessage($p_chat_id, $p_userid, $p_text, $p_parse_mode, $p_sendername)
{
	$url = "/_mis/telegram_sendMessage.php?";
	//$p_text = encodeURIComponent($p_text);
	$url = $url . "text=" . $p_text;
	if ($p_chat_id != null && $p_chat_id != "")
		$url = $url . "&chat_id=" . $p_chat_id;
	if ($p_userid != null && $p_userid != "")
		$url = $url . "&userid=" . $p_userid;
	if ($p_parse_mode != null && $p_parse_mode != "")
		$url = $url . "&parse_mode=" . $p_parse_mode;
	if ($p_sendername != null && $p_sendername != "")
		$url = $url . "&sendername=" . $p_sendername;
	file_get_contents_new($url);

}
/* 내용보기에서 서버로직을 이용한 엑셀저장 함수 start */
function getCellAddress($p_getParent, $p_title)
{

	$searchNumber = InStr($p_getParent, '"{' . $p_title . '}"');
	if ($searchNumber > 0) {
		$s = splitVB($p_getParent, '"{' . $p_title . '}"')[0];
		//$s = $p_getParent;
		$s = splitVB($s, 'formulaAttributes')[count(splitVB($s, 'formulaAttributes')) - 1];
		$s = splitVB($s, ':"')[1];
		$s = splitVB($s, '"')[0];
		return $s;
	}
	return '';
}
function get_CellAddress($p_getParent, $p_title)
{

	$searchNumber = InStr($p_getParent, '{' . $p_title . '}');
	if ($searchNumber > 0) {
		$s = splitVB($p_getParent, '{' . $p_title . '}')[0];
		//$s = $p_getParent;

		$s = splitVB($s, 'phpspreadsheet.')[count(splitVB($s, 'phpspreadsheet.')) - 1];
		$s = splitVB($s, '"')[0];
		$s = splitVB(Right($s, 6), '.')[1];
		return $s;
	}
	return '';
}
function dateDiff($start, $target)
{
	$interval = date_diff($start, $target);
	return $interval->days;
}
//날짜용으로만 사용할 것.
function datetime_from_excel($excelSerialDate)
{
	if (is_numeric($excelSerialDate)) {
		$daysBeforeUnixEpoch = 70 * 365 + 19;
		$hour = 3600;  //60 * 60 * 1000;
		$tt = round(($excelSerialDate - $daysBeforeUnixEpoch) * 24 * $hour, 0, PHP_ROUND_HALF_UP) + 12 * $hour;
		$tt = date('Y-m-d H:m:s', $tt);
		return $tt;
	} else {
		return '';
	}
}
function download_excel_view_data($p_fname, $p_data, $speed_Grid_Columns_Title, $server_fname)
{

	global $idx;
	if (!file_exists($p_fname)) {
		return "파일 없음";
	}


	$objPHPExcel = \PhpOffice\PhpSpreadsheet\IOFactory::load($p_fname);
	$getParent = $objPHPExcel->getActiveSheet()->getParent();
	$getParent = serialize($getParent);

	$split_getParent = splitVB($getParent, ':"{');
	$cnt = count($split_getParent);

	for ($i = 1; $i < $cnt; $i++) {
		$title = splitVB($split_getParent[$i], '}')[0];

		if ($title != '') {
			$address = getCellAddress($getParent, $title);

			if ($address != '' && is_numeric(Right($address, 1))) {

				$alias = $speed_Grid_Columns_Title[$title];
				$objPHPExcel->getActiveSheet()->setCellValue($address, $p_data[0]->$alias);
			}
		}
	}

	//$objPHPExcel->getActiveSheet()->setCellValue('F3', '');

	$objWriter = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($objPHPExcel, 'Excel2007');

	if ($server_fname != '') {

		$objWriter->save($server_fname);

	} else {
		$file_name = splitVB($p_fname, '/')[count(splitVB($p_fname, '/')) - 1];
		$file_name = replace($file_name, '.xlsx', "_idx$idx" . "_" . date("Ymdhis") . ".xlsx");

		//+ '_idx' + document.getElementById('idx').value + '_' + today15() + ".pdf";

		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment; filename="' . $file_name . '"');

		$objWriter->save('php://output');
	}


	exit;
}

/* 내용보기에서 서버로직을 이용한 엑셀저장 함수 end */


function getReadableByte($bytes, $decimal = 1)
{
	if (!is_numeric($bytes))
		return '';
	else if ($bytes >= 1024 * 1024 * 1024 * 1024 * 1024) {
		$bytes = number_format($bytes / 1024 / 1024 / 1024 / 1024 / 1024, $decimal) . ' PB';
	} else if ($bytes >= 1024 * 1024 * 1024 * 1024) {
		$bytes = number_format($bytes / 1024 / 1024 / 1024 / 1024, $decimal) . ' TB';
	} else if ($bytes >= 1024 * 1024 * 1024) {
		$bytes = number_format($bytes / 1024 / 1024 / 1024, $decimal) . ' GB';
	} else if ($bytes >= 1024 * 1024) {
		$bytes = number_format($bytes / 1024 / 1024, $decimal) . ' MB';
	} else if ($bytes >= 1024) {
		$bytes = number_format($bytes / 1024, $decimal) . ' KB';
	} else if ($bytes >= 1) {
		$bytes = $bytes . ' Bytes';
	} else {
		$bytes = '0 Bytes';
	}

	return $bytes;
}
function encodeURI($url)
{
	// http://php.net/manual/en/function.rawurlencode.php
	// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/encodeURI
	$unescaped = array(
		'%2D' => '-',
		'%5F' => '_',
		'%2E' => '.',
		'%21' => '!',
		'%7E' => '~',
		'%2A' => '*',
		'%27' => "'",
		'%28' => '(',
		'%29' => ')'
	);
	$reserved = array(
		'%3B' => ';',
		'%2C' => ',',
		'%2F' => '/',
		'%3F' => '?',
		'%3A' => ':',
		'%40' => '@',
		'%26' => '&',
		'%3D' => '=',
		'%2B' => '+',
		'%24' => '$'
	);
	$score = array(
		'%23' => '#'
	);
	return strtr(rawurlencode($url), array_merge($reserved, $unescaped, $score));

}
function file_get_contents_bold($url, $context = null)
{
	try {
		if (empty($context)) {
			$context = stream_context_create([
				'ssl' => [
					'verify_peer' => false,
					'verify_peer_name' => false
				]
			]);
		}
		return file_get_contents($url, false, $context);
	} catch (Exception $e) {
		return '';
	}
}
function file_get_contents_curl($url, $context = null, $timeout = null)
{
	if ($timeout == null)
		$timeout = 5000;
	try {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);

		if (!empty($context)) {
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, stream_context_get_options($context)['http']['content']);
		}
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$g = curl_exec($ch);
		curl_close($ch);

		return $g;
	} catch (Exception $e) {
		return '';
	}
}

function isHTTPS()
{
	if (isset($_SERVER["HTTPS"])) {
		if ($_SERVER["HTTPS"] == "on")
			return true;
	}
	return false;
}
function curPageURL()
{
	$pageURL = 'http';
	if (isset($_SERVER["HTTPS"])) if ($_SERVER["HTTPS"] == "on") {
		$pageURL .= "s";
	}
	$pageURL .= "://" . $_SERVER["SERVER_NAME"];
	if ($_SERVER["SERVER_PORT"] != "80" && $_SERVER["SERVER_PORT"] != "443") {
		$pageURL .= ":" . $_SERVER["SERVER_PORT"];
	}
	$pageURL .= $_SERVER["REQUEST_URI"];
	return $pageURL;
}
function curPageSite()
{
	$pageURL = 'http';
	if (isset($_SERVER["HTTPS"])) if ($_SERVER["HTTPS"] == "on") {
		$pageURL .= "s";
	}
	$pageURL .= "://" . $_SERVER["SERVER_NAME"];
	if ($_SERVER["SERVER_PORT"] != "80" && $_SERVER["SERVER_PORT"] != "443") {
		$pageURL .= ":" . $_SERVER["SERVER_PORT"];
	}

	return $pageURL;
}
function curPageDomain()
{
	return $_SERVER["SERVER_NAME"];
}
function gzecho($p_data)
{
	global $gzip_YN, $jsonUrl, $full_site;
	if (requestVB('remote') == 'Y')
		echo $p_data;
	else if ($gzip_YN == 'Y')
		echo gzencode($p_data);
	else
		echo $p_data;
}
function misEncrypt($str, $secret_key = 'secret key', $secret_iv = 'secret iv')
{
	$key = hash('sha256', $secret_key);
	$iv = substr(hash('sha256', $secret_iv), 0, 16);

	return str_replace(
		"=",
		"",
		base64_encode(
			openssl_encrypt($str, "AES-256-CBC", $key, 0, $iv)
		)
	);
}
function misDecrypt($str, $secret_key = 'secret key', $secret_iv = 'secret iv')
{
	$key = hash('sha256', $secret_key);
	$iv = substr(hash('sha256', $secret_iv), 0, 16);

	return openssl_decrypt(
		base64_decode($str),
		"AES-256-CBC",
		$key,
		0,
		$iv
	);
}

function dcode1($s)
{
	return base64_decode($s);
}
function dcode2($s)
{
	return gzinflate($s);
}


function getCookie($cname)
{
	if (isset($_COOKIE[$cname]))
		return $_COOKIE[$cname];
	else
		return '';
}

function arrayValue($p_result, $p_mm, $p_item)
{
	if (isset($p_result[$p_mm][$p_item]))
		return $p_result[$p_mm][$p_item];
	else
		return false;
}


/*
set_error_handler(function ($errno, $errstr, $errfile, $errline ) {
	if (error_reporting()) {
		if(InStr($errfile, 'PHPExcel\\')+InStr($errstr, 'urlencoded')==0) throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
	}
});
*/

function helpbox_sql($p_logicPid, $p_helpbox, $p_app)
{

	global $dbalias, $MisMenuList_Detail;
	$helpbox_parent_idx = requestVB('helpbox_parent_idx');
	$sel_idx = requestVB('sel_idx');
	$strsql2 = "";

	$sql = "select aliasName, Grid_Columns_Title, Grid_Select_Tname,Grid_Select_Field, Grid_Schema_Validation, Grid_PrimeKey 
    from $MisMenuList_Detail where RealPid='$p_logicPid' and aliasName='$p_helpbox' ";


	$h_result = allreturnSql($sql);

	if (function_exists("helpbox_change")) {
		helpbox_change();
	}

	//print_r($h_result);
	$helpbox_Columns_Title = $h_result[0]['Grid_Columns_Title'];
	if (InStr($helpbox_Columns_Title, ',') > 0)
		$helpbox_Columns_Title = splitVB($helpbox_Columns_Title, ',')[1];
	$helpbox_Select_Tname = $h_result[0]['Grid_Select_Tname'];
	$helpbox_Select_Field = $h_result[0]['Grid_Select_Field'];

	if (1 == 2 && $p_app == 'list_inc' && $helpbox_Select_Tname != 'table_m') {
		echo '
        alert("첫번째 항목은 ' . $helpbox_Columns_Title . ' 여야 합니다.");
		parent.$("span.k-i-close").closest("a").click();
        //닫기로직추가.
        });
        </script>
        ';
		exit;
	}

	$helpbox_Schema_Validation = $h_result[0]['Grid_Schema_Validation'];
	$helpbox_PrimeKey = replace(replace(replace($h_result[0]['Grid_PrimeKey'], '@outer_tbname', 'table_m'), '@idx', $sel_idx), ' and 1=2', '');
	$helpbox_selectList = splitVB($helpbox_PrimeKey, '#')[0];
	$helpbox_g08 = splitVB($helpbox_PrimeKey, "#")[1];
	$helpbox_order_no = splitVB($helpbox_PrimeKey, "#")[2];

	if (count(splitVB($helpbox_PrimeKey, "#")) >= 5) {
		$helpbox_g09 = 'and ' . replace(splitVB($helpbox_PrimeKey, "#")[4], "'", "''");
	} else {
		$helpbox_g09 = '';
	}

	$helpbox_savelist = '';

	if (InStr($helpbox_selectList, ';') > 0) {
		if ($helpbox_Schema_Validation != '') {
			$helpbox_Schema_Validation = splitVB($helpbox_Schema_Validation, '"helplist":')[1];
			$helpbox_Schema_Validation = json_decode($helpbox_Schema_Validation);
		}


		$cnt = count(splitVB($helpbox_selectList, ';'));

		for ($j = 0; $j < $cnt; $j++) {
			$jj = $j + 1;
			$helpbox_Align = '';
			$helpbox_Schema_Type = '';
			$helpbox_Columns_Width = 20;

			if (InStr($helpbox_Schema_Validation[$j], '.') > 0) {
				$helpbox_aliasName = splitVB($helpbox_Schema_Validation[$j], '.')[0];
				$helpbox_Columns_Width = splitVB($helpbox_Schema_Validation[$j], '.')[1];
				if (is_numeric($helpbox_Columns_Width) == 0)
					$helpbox_Columns_Width = 20;
				if (count(splitVB($helpbox_Schema_Validation[$j], '.')) == 3) {
					$helpbox_Align = splitVB($helpbox_Schema_Validation[$j], '.')[2];
					if ($helpbox_Align == 'C')
						$helpbox_Align = 'center';
					else if ($helpbox_Align == 'R')
						$helpbox_Align = 'right';
					else {
						$helpbox_Schema_Type = 'number^^#,##0';
						if (is_numeric(Right($helpbox_Align, 1)) == 1) {
							$helpbox_Schema_Type = $helpbox_Schema_Type . '.' . str_repeat('0', 1 * Right($helpbox_Align, 1));
						}
						$helpbox_Align = 'right';
					}
				}
			} else {
				$helpbox_aliasName = $helpbox_Schema_Validation[$j];
			}
			$helpbox_Select_Field = replace(splitVB($helpbox_selectList, ';')[$j], "'", "''");
			if (InStr($helpbox_Select_Field, '.') + InStr($helpbox_Select_Field, '(') > 0)
				$helpbox_Select_Tname = '';
			else
				$helpbox_Select_Tname = 'table_m';



			if ($j == 0) {
				if (1 == 2 && $p_app == 'list_inc' && $helpbox_Columns_Title != $helpbox_aliasName) {
					echo '
                    alert("첫번째 항목은 ' . $helpbox_Columns_Title . ' 여야 합니다!");
					parent.$("span.k-i-close").closest("a").click();
                    //닫기로직추가.
                    });
                    </script>
                    ';
					exit;
				} else {
					$helpbox_savelist = $helpbox_aliasName;
				}
			} else {
				$sql = "select count(*) from $MisMenuList_Detail where RealPid='$p_logicPid' 
                and Grid_Select_Tname='table_m' and (Grid_Columns_Title='$helpbox_aliasName' or Grid_Columns_Title like '%,$helpbox_aliasName') ";
				if (onlyOnereturnSql($sql) == 1) {
					$helpbox_savelist = $helpbox_savelist . ',' . $helpbox_aliasName;
				}
			}

			if ($jj . '' == $helpbox_order_no || $helpbox_order_no == $helpbox_Select_Field) {
				$helpbox_Orderby = '1a';
			} else {
				$helpbox_Orderby = '';
			}
			$strsql2 = $strsql2 . iif($j > 0, " union ", "") . "
            select '' as menuName, $jj as idx, 'simplelist' as g01, 'Y' as g03, '' as g04, '' as g05, '' as g06, '' as g07, '$helpbox_g08' as g08, '$helpbox_g09' as g09, '123=123' as g10, '' as g11, '' as g12, '' as g13, '' as g14
            ,$jj as SortElement, '' as Grid_FormGroup, '$helpbox_Orderby' as Grid_Orderby, '' as Grid_MaxLength, '$dbalias' as dbalias, '$dbalias' as pro_dbalias 
            , '' as Grid_Default, '' as Grid_GroupCompute, '' as Grid_CtlName, '' as Grid_Items, '' as Grid_IsHandle
            , '' as Grid_ListEdit, '' as Grid_Templete, '' as Grid_Schema_Validation, '' as Grid_PrimeKey, '' as Grid_Alim, '' as Grid_Pil
            ";

			$strsql2 = $strsql2 . "
                , '" . replace($helpbox_aliasName, ' ', '') . "' as aliasName, '$helpbox_aliasName' as Grid_Columns_Title, $helpbox_Columns_Width as Grid_Columns_Width, '$helpbox_Select_Tname' as Grid_Select_Tname
				, '$helpbox_Select_Field' as Grid_Select_Field, '$helpbox_Align' as Grid_Align, '$helpbox_Schema_Type' as Grid_Schema_Type
            ";
		}
	} else {

	}

	if ($p_app == 'list_inc') {
		if (requestVB('winActionFlag') == 'list')
			echo 'document.getElementById("MenuName").value = "선택 시 ' . $helpbox_savelist . ' 항목이 저장됩니다";';
		else
			echo 'document.getElementById("MenuName").value = "선택 시 ' . $helpbox_savelist . ' 항목이 변경됩니다";';
	}
	return $strsql2;
}


function encode_firewall($ajax_sql)
{

	$ajax_sql = replace($ajax_sql, "union", "_@uni");
	$ajax_sql = replace($ajax_sql, "getdate", "_@get");
	$ajax_sql = replace($ajax_sql, "isnull", "_@isn");
	$ajax_sql = replace($ajax_sql, "declare", "_@dec");
	$ajax_sql = replace($ajax_sql, "like", "_@li");
	$ajax_sql = replace($ajax_sql, "outer", "_@ou");
	$ajax_sql = replace($ajax_sql, "left", "_@le");
	$ajax_sql = replace($ajax_sql, "inner", "_@in");
	$ajax_sql = replace($ajax_sql, "click", "_@cl");
	$ajax_sql = replace($ajax_sql, "char", "_@ch");
	$ajax_sql = replace($ajax_sql, "join", "_@jo");
	$ajax_sql = replace($ajax_sql, "varchar", "_@var");
	$ajax_sql = replace($ajax_sql, "convert", "_@co");
	$ajax_sql = replace($ajax_sql, ".dbo.", "_@.d");
	$ajax_sql = replace($ajax_sql, "distinct", "_@di");
	$ajax_sql = replace($ajax_sql, "and", "_@an");
	$ajax_sql = replace($ajax_sql, "where", "_@wh");
	$ajax_sql = replace($ajax_sql, "from", "_@fr");
	$ajax_sql = replace($ajax_sql, "script", "_@sc");
	$ajax_sql = replace($ajax_sql, "update", "_@up");
	$ajax_sql = replace($ajax_sql, "select", "_@se");
	$ajax_sql = replace($ajax_sql, "able", "_@ab");
	$ajax_sql = replace($ajax_sql, "#", "_@shap");
	$ajax_sql = replace($ajax_sql, "&", "_@_nd");
	$ajax_sql = replace($ajax_sql, "+", "_@plus");
	$ajax_sql = replace($ajax_sql, "(", "_@karoA");
	$ajax_sql = replace($ajax_sql, ")", "_@karoB");
	$ajax_sql = replace($ajax_sql, "%", "_@percent");
	$ajax_sql = replace($ajax_sql, "'", "_@dda");
	$ajax_sql = replace($ajax_sql, "00", "_@@@@");
	return $ajax_sql;
}
function encode_cafe24($ajax_sql)
{
	$ajax_sql = replace($ajax_sql, "wget", "_@w_get");
	return $ajax_sql;
}
function decode_cafe24($ajax_sql)
{
	$ajax_sql = replace($ajax_sql, "_@w_get", "wget");
	return $ajax_sql;
}
function decode_firewall($ajax_sql)
{

	$ajax_sql = replace($ajax_sql, "_@@@@", "00");
	$ajax_sql = replace($ajax_sql, "_@dda", "'");
	$ajax_sql = replace($ajax_sql, "_@percent", "%");
	$ajax_sql = replace($ajax_sql, "_@karoB", ")");
	$ajax_sql = replace($ajax_sql, "_@karoA", "(");
	$ajax_sql = replace($ajax_sql, "_@plus", "+");
	$ajax_sql = replace($ajax_sql, "_@_nd", "&");
	$ajax_sql = replace($ajax_sql, "_@shap", "#");
	$ajax_sql = replace($ajax_sql, "_@ab", "able");
	$ajax_sql = replace($ajax_sql, "_@se", "select");
	$ajax_sql = replace($ajax_sql, "_@up", "update");
	$ajax_sql = replace($ajax_sql, "_@sc", "script");
	$ajax_sql = replace($ajax_sql, "_@fr", "from");
	$ajax_sql = replace($ajax_sql, "_@wh", "where");
	$ajax_sql = replace($ajax_sql, "_@an", "and");
	$ajax_sql = replace($ajax_sql, "_@di", "distinct");
	$ajax_sql = replace($ajax_sql, "_@.d", ".dbo.");
	$ajax_sql = replace($ajax_sql, "_@co", "convert");
	$ajax_sql = replace($ajax_sql, "_@var", "varchar");
	$ajax_sql = replace($ajax_sql, "_@jo", "join");
	$ajax_sql = replace($ajax_sql, "_@ch", "char");
	$ajax_sql = replace($ajax_sql, "_@cl", "click");
	$ajax_sql = replace($ajax_sql, "_@in", "inner");
	$ajax_sql = replace($ajax_sql, "_@le", "left");
	$ajax_sql = replace($ajax_sql, "_@ou", "outer");
	$ajax_sql = replace($ajax_sql, "_@li", "like");
	$ajax_sql = replace($ajax_sql, "_@dec", "declare");
	$ajax_sql = replace($ajax_sql, "_@isn", "isnull");
	$ajax_sql = replace($ajax_sql, "_@get", "getdate");
	$ajax_sql = replace($ajax_sql, "_@uni", "union");

	return $ajax_sql;
}

function MemberPid_XRWA($p_RealPid, $p_UserID)
{
	global $MS_MJ_MY;
	if ($MS_MJ_MY == 'MY') {
		$temp_sql = " select concat(ifnull(table_RealPid.AuthorityLevel,0),';',ifnull(table_RealPid.userid,'')) as userid 
		FROM MisMenuList table_m 
		left outer join MisMenuList_Member table_RealPid
		on table_RealPid.RealPid=table_m.RealPid
		where table_m.RealPid='$p_RealPid' 
		and (
		ifnull(table_m.new_gidx,0)=0 
		or ifnull(table_m.AuthCode,'') in ('','01')
		or ifnull(table_RealPid.userid,'')='$p_UserID'
		)
		order by case when table_RealPid.userid='$p_UserID' then 1 else 2 end";
	} else {
		$temp_sql = " select convert(varchar(1),isnull(table_RealPid.AuthorityLevel,0))+';'+isnull(table_RealPid.userid,'') as userid 
		FROM MisMenuList table_m 
		left outer join MisMenuList_Member table_RealPid
		on table_RealPid.RealPid=table_m.RealPid
		where table_m.RealPid='$p_RealPid' 
		and (
		table_m.new_gidx=0 
		or table_m.AuthCode in ('','01')
		or isnull(table_RealPid.userid,'')='$p_UserID'
		)
		order by case when table_RealPid.userid='$p_UserID' then 1 else 2 end";
	}


	$r = onlyOnereturnSql($temp_sql);

	if ($r == "")
		return "X";
	$r1 = splitVB($r, ";")[0];
	$r2 = strtolower(splitVB($r, ";")[1]);


	if ($r1 == "9")
		$XRWA = "X";
	else if ($r1 == "3" && $r2 == $p_UserID)
		$XRWA = "A";
	else if ($r1 == "2" && $r2 == $p_UserID)
		$XRWA = "W";
	else if ($r1 == "0" && $r2 == '')
		$XRWA = "W";
	else
		$XRWA = "R";

	return $XRWA;

}

function get_date_diff($date)
{

	$diff = time() - strtotime($date);

	$s = 60; //1분 = 60초
	$h = $s * 60; //1시간 = 60분
	$d = $h * 24; //1일 = 24시간
	$y = $d * 30; //1달 = 30일 기준
	$a = $y * 12; //1년

	if ($diff < $s) {
		$result = $diff . '초전';
	} elseif ($h > $diff && $diff >= $s) {
		$result = round($diff / $s) . '분전';
	} elseif ($d > $diff && $diff >= $h) {
		$result = round($diff / $h) . '시간전';
	} elseif ($y > $diff && $diff >= $d) {
		$result = round($diff / $d) . '일전';
	} elseif ($a > $diff && $diff >= $y) {
		$result = round($diff / $y) . '달전';
	} else {
		$result = round($diff / $a) . '년전';
	}

	return $result;
}


function accessToken_check()
{
	global $auto_logout_minute;
	global $MS_MJ_MY, $MisSession_UserID, $MisSession_UserName, $MisSession_AuthSite, $myLanguageCode;
	global $MisSession_StationName, $MisSession_StationNum, $MisSession_PositionName, $MisSession_PositionCode;
	global $pwdKey, $base_domain;
	global $ServerVariables_URL;
	global $DbServerName, $DbID, $DbPW, $base_db, $database;
	global $readResult;

	$accessToken = requestVB('accessToken');
	if ($accessToken != '') {
		$readResult = 'Y';
	} else if (isset($_COOKIE['accessToken'])) {
		$accessToken = $_COOKIE['accessToken'];
	}

	if ($accessToken != '') {

		try {
			//$decoded = JWT::decode($accessToken, $pwdKey, array('HS256'));
			$decoded = JWT::decode($accessToken, new Key($pwdKey, 'HS256'));

			/*
			print_r($decoded);
				'iss' => $base_domain,
				'iat' => $accessTokenTime,                //토큰이 발급된 시간
				'nct' => $nextCheckTime,                //개인정보, 권한 등을 체크하기 위한 다음예정시간.
				'remember' => $remember,        //로그인기억여부
				'exp' => $exp,        //만료시간
				'auth_version' => $data[0]['auth_version'],
				'MisSession_UserID' => urlencode($MisSession_UserID),
				'MisSession_UserName' => urlencode($data[0]['한글성명']),
				'myLanguageCode' => $data[0]['myLanguageCode'],
				'MisSession_StationName' => urlencode($data[0]['소속팀']),
				'MisSession_StationNum' => $data[0]['팀코드'],
				'MisSession_PositionName' => urlencode($data[0]['직책']),
				'MisSession_PositionCode' => $data[0]['직책코드']
			*/

			$iss = urldecode($decoded->iss);
			$iat = urldecode($decoded->iat);
			$auth_version = urldecode($decoded->auth_version);
			$nextCheckTime = urldecode($decoded->nct) * 1;

			//echo "<script>console.log('ttt = " . ($nextCheckTime - time()) . "');</script>";

			$remember = urldecode($decoded->remember);

			if ($auto_logout_minute > 0) {
				$exp = time() + 60 * $auto_logout_minute;	//새로 30분
			} else {
				$exp = urldecode($decoded->exp);
			}

			//echo $exp;exit;//1679734281

			if ($iss != $base_domain) {
				setcookie('accessToken', '', time() - 60, '/');
				return '';
			}

			if ($remember == 'off') {
				if (isset($_COOKIE['accessTokenTime'])) {
					//echo $exp;
					if ($_COOKIE['accessTokenTime'] != $iat) {
						setcookie('accessToken', '', time() - 60, '/');
						return '';
					}
				} else {
					setcookie('accessToken', '', time() - 60, '/');
					return '';
				}
			}
			if ($MS_MJ_MY == 'MY') {
				$sql = "select ifnull(auth_version,0) as auth_version from MisUser where UniqueNum=N'" . urldecode($decoded->MisSession_UserID) . "';";
			} else {
				$sql = "select isnull(auth_version,0) as auth_version from MisUser where UniqueNum=N'" . urldecode($decoded->MisSession_UserID) . "'";
			}
			$r_auth_version = 0;

			$r = allreturnSql($sql);
			//gzecho($sql);exit;
			if (count($r) == 0 && InStr($ServerVariables_URL, 'index.php') > 0) {
				re_direct('/_mis/logout.php');
				exit;
			} else {
				$r_auth_version = $r[0]['auth_version'] * 1;
			}

			if ($auth_version * 1 < $r_auth_version) {
				setcookie('accessToken', '', time() - 60, '/');
				return '';
			}

			$MisSession_UserID = urldecode($decoded->MisSession_UserID);
			$MisSession_UserName = urldecode($decoded->MisSession_UserName);
			$MisSession_AuthSite = urldecode($decoded->MisSession_AuthSite);
			$myLanguageCode = $decoded->myLanguageCode;
			$MisSession_StationName = urldecode($decoded->MisSession_StationName);
			$MisSession_StationNum = $decoded->MisSession_StationNum;
			$MisSession_PositionName = urldecode($decoded->MisSession_PositionName);
			$MisSession_PositionCode = $decoded->MisSession_PositionCode;

			//echo $nextCheckTime - time();
//exit;
			if ($nextCheckTime - time() < 0) {
				//-- update token start ------------

				if ($MS_MJ_MY == 'MY') {
					$sql = "
				select table_m.UserName as '한글성명'
				,case when ifnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='g' then 'google' when ifnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='f' then 'facebook' else 'home' end as MisSession_AuthSite
				,table_m.email
				,ifnull(table_m.isRest,'') as '휴면'
				,ifnull(table_m.myLanguageCode,'')  as myLanguageCode
				,ifnull(table_Station_NewNum.StationName,'') as '소속팀'
				,ifnull(table_m.Station_NewNum,'') as '팀코드'
				,table_Station_NewNum2.StationName as '소속본부'
				,ifnull(table_Station_NewNum2.num,'') as '소속본부코드'
				,ifnull(table_positionNum.kname,'') as '직책'
				,table_m.positionNum as '직책코드'
				,table_m.ibsa_date as '입사일자'
				,table_m.toisa_date as '퇴사일자'
				,table_delchk.kname as '재직구분'
				,table_m.delchk as '재직코드'
				,ifnull(table_Station_NewNum.AutoGubun,'') as '자동정렬'
				,ifnull(table_m.attach1,'') as '사진'
				from MisUser table_m  
				left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum
				left outer join MisStation table_Station_NewNum2 on left(table_Station_NewNum.AutoGubun,2)=table_Station_NewNum2.AutoGubun
				left outer join MisCommonTable table_positionNum on table_positionNum.kcode = table_m.positionNum and table_positionNum.gcode='speedmis000188'
				left outer join MisCommonTable table_delchk on table_delchk.kcode = table_m.delchk and table_delchk.gcode='speedmis000203'
				where table_m.UniqueNum='$MisSession_UserID' and table_m.delchk<>'D';
				";
				} else {
					$sql = "
				select table_m.UserName as '한글성명'
				,case when isnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='g' then 'google' when isnull(table_m.google_name,'')<>'' and left(table_m.UniqueNum,1)='f' then 'facebook' else 'home' end as MisSession_AuthSite
				,table_m.email
				,isnull(table_m.isRest,'') as '휴면'
				,isnull(table_m.myLanguageCode,'')  as myLanguageCode
				,isnull(table_Station_NewNum.StationName,'') as '소속팀'
				,isnull(table_m.Station_NewNum,'') as '팀코드'
				,table_Station_NewNum2.StationName as '소속본부'
				,isnull(table_Station_NewNum2.num,'') as '소속본부코드'
				,isnull(table_positionNum.kname,'') as '직책'
				,table_m.positionNum as '직책코드'
				,table_m.ibsa_date as '입사일자'
				,table_m.toisa_date as '퇴사일자'
				,table_delchk.kname as '재직구분'
				,table_m.delchk as '재직코드'
				,isnull(table_Station_NewNum.AutoGubun,'') as '자동정렬'
				,isnull(table_m.attach1,'') as '사진'
				from MisUser table_m  
				left outer join MisStation table_Station_NewNum on table_Station_NewNum.Num = table_m.Station_NewNum
				left outer join MisStation table_Station_NewNum2 on left(table_Station_NewNum.AutoGubun,2)=table_Station_NewNum2.AutoGubun
				left outer join MisCommonTable table_positionNum on table_positionNum.kcode = table_m.positionNum and table_positionNum.gcode='speedmis000188'
				left outer join MisCommonTable table_delchk on table_delchk.kcode = table_m.delchk and table_delchk.gcode='speedmis000203'
				where table_m.UniqueNum='$MisSession_UserID' and table_m.delchk<>'D';
				";
				}


				$data = allreturnSql($sql);


				if (count($data) == 1) {

					$MisSession_UserName = $data[0]['한글성명'];
					$MisSession_AuthSite = $data[0]['MisSession_AuthSite'];
					$myLanguageCode = $data[0]['myLanguageCode'];
					$MisSession_StationName = $data[0]['소속팀'];
					$MisSession_StationNum = $data[0]['팀코드'];
					$MisSession_PositionName = $data[0]['직책'];
					$MisSession_PositionCode = $data[0]['직책코드'];

					$data = array(
						'iss' => $iss,
						'iat' => $iat,                //토큰이 발급된 시간
						'nct' => time() + 60 * 31,                //개인정보, 권한 등을 체크하기 위한 다음예정시간. 31분마다 체크.
						'remember' => $remember,        //로그인기억여부
						'exp' => $exp,        //만료시간
						'auth_version' => $auth_version,		//타장비아웃 otherOut==on 일 경우 현재시간으로 버전이 올라감.
						'MisSession_UserID' => urlencode($MisSession_UserID),
						'MisSession_UserName' => urlencode($data[0]['한글성명']),
						'MisSession_AuthSite' => urlencode($data[0]['MisSession_AuthSite']),
						'myLanguageCode' => $data[0]['myLanguageCode'],
						'MisSession_StationName' => urlencode($data[0]['소속팀']),
						'MisSession_StationNum' => $data[0]['팀코드'],
						'MisSession_PositionName' => urlencode($data[0]['직책']),
						'MisSession_PositionCode' => $data[0]['직책코드']
					);

					$accessToken = JWT::encode($data, $pwdKey, 'HS256');
					setcookie("accessToken", $accessToken, time() + 3600 * 24 * 100, "/");
				} else {
					$MisSession_UserID = '';
					return '';
				}

				//-- update token end ------------
			} else if ($auto_logout_minute > 0) {
				$data = array(
					'iss' => $iss,
					'iat' => $iat,                //토큰이 발급된 시간
					'nct' => time() + 60 * 31,                //개인정보, 권한 등을 체크하기 위한 다음예정시간. 31분마다 체크.
					'remember' => $remember,        //로그인기억여부
					'exp' => $exp,        //만료시간
					'auth_version' => $auth_version,		//타장비아웃 otherOut==on 일 경우 현재시간으로 버전이 올라감.
					'MisSession_UserID' => urlencode($MisSession_UserID),
					'MisSession_UserName' => urlencode($MisSession_UserName),
					'MisSession_AuthSite' => urlencode($MisSession_AuthSite),
					'myLanguageCode' => $myLanguageCode,
					'MisSession_StationName' => urlencode($MisSession_StationName),
					'MisSession_StationNum' => $MisSession_StationNum,
					'MisSession_PositionName' => urlencode($MisSession_PositionName),
					'MisSession_PositionCode' => $MisSession_PositionCode
				);

				$accessToken = JWT::encode($data, $pwdKey, 'HS256');
				setcookie("accessToken", $accessToken, time() + 3600 * 24 * 100, "/");
			}



		} catch (Exception $e) { // Also tried JwtException
			//print_r($e->getMessage());
			if (InStr($ServerVariables_URL, "/index.php") > 0 && InStr($ServerVariables_URL, "/login") == 0) {
				if ($e->getMessage() == 'Expired token')
					$emsg = '자동로그아웃되었습니다. 다시 로그인하세요!';
				//else $emsg = '로그인 정보에 문제가 발생하여 로그아웃 됩니다. 다시 로그인하세요!';
				else
					$emsg = '';
				?>
				<script>
					if (top.location.href == location.href) {
						<?php if ($emsg != '') { ?>
							alert("<?php echo $emsg; ?>");
							window.open("/_mis/logout.php");
						<?php } else { ?>
							location.href = "/_mis/logout.php";
						<?php } ?>
					}
				</script>
				<?php
				exit;
			} else {
				$MisSession_UserID = '';
				return '';
			}

		}


	}
}


//------------------------------------- 해킹방지 로직
function fireWall_v2($p_METHOD)
{
	global $ServerVariables_QUERY_STRING, $ServerVariables_URL, $ServerVariables_HTTP_REFERER, $full_site;
	global $gubun, $MisSession_UserID;

	if ($p_METHOD != '' && $p_METHOD != $_SERVER['REQUEST_METHOD']) {
		$temp1 = "METHOD 위반;<br/>";
		misLog("21", $gubun, $temp1, $ServerVariables_HTTP_REFERER, $MisSession_UserID);

		echo ("다음 단어로 인해 실행이 중지되었습니다. 관리자에게 문의하세요.<br/><br/>METHOD violation");
		exit;
	} else {
		// Optimized firewall logic
		// Using array iteration for faster partial matching if possible, but strpos loop is standard.
		// Optimized: Pre-calculate count, use stripos directly if possible or optimize logic.

		$hackwords = [
			"char(",
			"declare ",
			" set ",
			"exec(",
			"execute(",
			" having ",
			"group by",
			"insert into",
			"xor",
			"sysdate(",
			"if(",
			" union ",
			" from "
		];
		// Equivalent to " @z! " split in original, but cleaner.
		// Original used @z! delimiter.

		$temp4 = strtolower($ServerVariables_QUERY_STRING);
		$temp4_encoded = str_replace("+", "%20", $temp4); // Check encoded version too

		$full_url = $full_site . $ServerVariables_URL . "?" . $ServerVariables_QUERY_STRING;

		foreach ($hackwords as $word) {

			// Checks if word is in string
			if (strpos($temp4, $word) !== false || strpos($temp4, urlencode($word)) !== false) {
				misLog("21", $gubun, "차단키워드; " . $word . "<br/>" . $full_url, $ServerVariables_HTTP_REFERER, $MisSession_UserID);
				echo ("다음 단어로 인해 실행이 중지되었습니다. 관리자에게 문의하세요.<br/><br/>[" . $word . "]");
				exit;
			}

			// Check for encoded space variations if the word contains spaces (original logic had + checks)
			if (strpos($word, " ") !== false) {
				$word_space_enc = str_replace(" ", "%20", $word);
				if (strpos($temp4_encoded, $word_space_enc) !== false) {
					misLog("21", $gubun, "차단키워드; " . $word . "<br/>" . $full_url, $ServerVariables_HTTP_REFERER, $MisSession_UserID);
					echo ("다음 단어로 인해 실행이 중지되었습니다. 관리자에게 문의하세요.<br/><br/>[" . $word . "]");
					exit;
				}
			}
		}
	}
}


//25년도에는 해당함수 삭제할 것.
function fireWall()
{
	global $ServerVariables_QUERY_STRING, $ServerVariables_URL, $ServerVariables_HTTP_REFERER, $full_site;
	global $gubun, $MisSession_UserID;

	//-------공백일 경우 + 를 넣을 것 : 구분자 @z!
	$hackword = "char(@z!declare+@z!+set+@z!exec(@z!execute(@z!+having+@z!group+by@z!insert+into@z!xor@z!sysdate(@z!if(@z!+union+@z!+from+";

	$temp1 = explode("@z!", $hackword);
	$ii = 0;
	$temp2 = '';
	$temp3 = '';
	$temp4 = '';

	$temp4 = strtolower($ServerVariables_QUERY_STRING);

	$cnt_temp1 = count($temp1);
	for ($jj = 0; $jj < $cnt_temp1; $jj++) {
		$ii = $ii + InStr($temp4, $temp1[$jj]);
		$ii = $ii + InStr($temp4, urlencode($temp1[$jj]));
		//echo $temp1[$jj];echo ';';
		if (InStr($temp1[$jj], "+") > 0) {
			$ii = $ii + InStr($temp4, replace($temp1[$jj], "+", "%20"));
			$ii = $ii + InStr($temp4, replace(urlencode($temp1[$jj]), "+", "%20"));
		}
		if ($ii > 0) {
			$temp2 = $full_site . $ServerVariables_URL . "?" . $ServerVariables_QUERY_STRING;
			$temp3 = $temp1[$jj];
			break;
		}
	}

	if ($ii > 0) {
		$temp1 = "차단키워드; " . $temp3 . "<br/>" . $temp2;
		misLog("21", $gubun, $temp1, $ServerVariables_HTTP_REFERER, $MisSession_UserID);

		echo ("다음 단어로 인해 실행이 중지되었습니다. 관리자에게 문의하세요.<br/><br/>[" . $temp3 . "]");
		exit;
	}
}


function recursiveCopy($source, $destination)
{
	if (!is_dir($destination)) {
		mkdir($destination, 0777, true);
	}

	$splFileInfoArr = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);

	foreach ($splFileInfoArr as $fullPath => $splFileinfo) {
		//skip . ..
		if (in_array($splFileinfo->getBasename(), [".", ".."])) {
			continue;
		}
		//get relative path of source file or folder
		$path = str_replace($source, "", $splFileinfo->getPathname());

		if ($splFileinfo->isDir()) {
			mkdir($destination . "/" . $path, 0777, true);
		} else {
			copy($fullPath, $destination . "/" . $path);
		}
	}
}
// 파일의 최종 수정일자를 가져오는 함수
function get_file_modified_date($file_path)
{
	if (file_exists($file_path)) {
		return filemtime($file_path); // Unix timestamp
	} else {
		return '';
	}
}

function get_file_modified_date19($file_path)
{
	$d = get_file_modified_date($file_path);
	if ($d != '') {
		return date('Y-m-d H:i:s', $d);
	} else {
		return '';
	}
}
function fileDelete($filepath)
{
	if (file_exists($filepath)) {
		if (@unlink($filepath)) {
			return true;
		} else
			return false;
	} else
		return true;
}
function fileMove($oldfile, $newfile)
{

	if (file_exists($oldfile)) {
		if (!copy($oldfile, $newfile)) {
			return false;
		} else {
			if (@unlink($oldfile)) {
				return true;
			} else
				return false;
		}
	} else
		return false;
	;
}

function aliasN_update_all()
{
	global $DbServerName, $DbID, $DbPW, $base_db, $database;
	$sql = "select RealPid from MisMenuList where useflag=1 and MenuType='01' order by idx;";
	$data = allreturnSql($sql);
	$updateSql = '';

	$cnt_data = count($data);
	for ($i = 0; $i < $cnt_data; $i++) {
		$updateSql = $updateSql . aliasN_updateQuery_RealPid($data[$i]['RealPid']);
	}
	execSql($updateSql);
}

function aliasN_updateQuery_RealPid($p_RealPid)
{

	global $DbServerName, $DbID, $DbPW, $base_db, $database, $MS_MJ_MY, $MisMenuList_Detail;
	$sql = "select idx, aliasName, Grid_Select_Tname, Grid_Select_Field, Grid_Columns_Title from $MisMenuList_Detail where RealPid='$p_RealPid' order by SortElement, idx; ";
	$data = allreturnSql($sql);
	$updateSql = '';
	$aliasList = ';;';

	$cnt_data = count($data);
	for ($i = 0; $i < $cnt_data; $i++) {
		$new_aliasName = '';
		$r_idx = $data[$i]['idx'];
		$r_Grid_Select_Tname = replace(Trim($data[$i]['Grid_Select_Tname']), "\t", "");
		$r_Grid_Select_Field = replace(Trim($data[$i]['Grid_Select_Field']), "\t", "");
		$r_Grid_Columns_Title = replace(Trim($data[$i]['Grid_Columns_Title']), "\t", "");
		$aliasName = replace(Trim($data[$i]['aliasName']), "\t", "");

		if (Left($aliasName, 2) == "qq") {
			$new_aliasName = $aliasName;
		} else if ($r_Grid_Select_Tname == "table_m") {
			$new_aliasName = $r_Grid_Select_Field;
		} else if ($r_Grid_Select_Tname != "") {
			if ($r_Grid_Select_Field == 'uid')
				$new_aliasName = 'eX_' . $new_aliasName;	//uid is kendo 예약어
			else
				$new_aliasName = $r_Grid_Select_Tname . "Qn" . $r_Grid_Select_Field;
		} else if (InStr($r_Grid_Select_Field, " ") + InStr($r_Grid_Select_Field, "'") + InStr($r_Grid_Select_Field, "+") + InStr($r_Grid_Select_Field, "(") == 0) {
			$new_aliasName = replace($r_Grid_Select_Field, ".", "Qm");
		} else {
			if (InStr($r_Grid_Columns_Title, ',') > 0)
				$new_aliasName = 'z' . splitVB($r_Grid_Columns_Title, ',')[1];
			else
				$new_aliasName = 'z' . $r_Grid_Columns_Title;
		}
		$aliasN_new_aliasName = aliasN($new_aliasName);
		if ($r_Grid_Select_Field == '') {
			$aliasN_new_aliasName = '';
		} else {
			$cnt = count(splitVB($aliasList, ";$aliasN_new_aliasName;"));
			$aliasList = $aliasList . $aliasN_new_aliasName . ';;';
			if ($cnt > 1)
				$aliasN_new_aliasName = $aliasN_new_aliasName . 'Q' . ($cnt - 1);
		}
		$aliasN_new_aliasName = Left($aliasN_new_aliasName, 50);
		$updateSql = $updateSql . " update $MisMenuList_Detail set 
		aliasName='$aliasN_new_aliasName',
		Grid_Columns_Title=N'" . str_replace("'", "''", $r_Grid_Columns_Title) . "',
		Grid_Select_Tname=N'" . str_replace("'", "''", $r_Grid_Select_Tname) . "',
		Grid_Select_Field=N'" . str_replace("'", "''", $r_Grid_Select_Field) . "'
		where idx=$r_idx ";
		if ($MS_MJ_MY == 'MY')
			$updateSql = $updateSql . '; ';
	}
	return $updateSql;
}
function aliasN_update_RealPid($p_RealPid)
{
	$updateSql = aliasN_updateQuery_RealPid($p_RealPid);
	execSql($updateSql);
}

function aliasN($han)
{
	if (InStr($han, ",") > 0)
		$han = splitVB($han, ",")[1];

	// Optimized replacement using array
	$remove = [' ', ',', '*', "'", '-', ':', '[', ']', '+', '(', ')', '/', '|', '.', '~', '!', '@', '#', '$', '^', '&', '\\', '=', '`', '}', '{', '"', ';', '?', '<', '>'];
	$alias = str_replace($remove, '', $han);

	//$alias = urlencode($alias);
	if (is_numeric(Left($alias, 1)))
		$alias = 'numQ' . $alias;
	$alias = Hangeul_Romaja::convert($alias, Hangeul_Romaja::CAPITALIZE_WORDS);
	$alias = replace($alias, "%", "");

	if (uni_len($alias) > len($alias)) {
		//한글외 다국어일 경우 또는 ㅋㅋㅋ 같을때.
		$alias = urlencode($alias);
		$alias = replace($alias, "%", "");
	}
	;
	return $alias;
}



function fun_attach_render($p_RealPid, $p_TName)
{

	global $Read_Only;

	$isEditable = iif($Read_Only == "Y", "false", "true");
	$str = <<<HTML

	render: function (ui) {
            var rowData = ui.rowData,
                dataIndx = ui.dataIndx;
            if(Object.keys(rowData)[0]=="pq_gtitle" || Object.keys(rowData)[0]=="pq_grandsummary") return '';

            rowData.pq_cellcls = rowData.pq_cellcls || {};
            if (rowData[dataIndx]==null || rowData[dataIndx]=='') {//if change is negative.
                rowData.pq_cellcls[dataIndx] = 'pink';
                
                var isEditable = $isEditable;
                if(ui.column.editable!=undefined) {
                    if(ui.column.editable==false) isEditable = false;
                }

                if(isEditable) {
                    return "<form name='frm_r"+ui.rowIndx+"_c"+ui.column.dataIndx+"' onchange='fun_upload(this,"+ui.rowIndx+");' enctype='multipart/form-data' method='post'><input type='hidden' name='upload_table' value='$p_TName'/><input type='hidden' name='upload_RealPid' value='$p_RealPid'/><input type='hidden' name='upload_idxname' value='" + iif(isNumeric(Object.keys(rowData)[0]),Object.keys(rowData)[1],Object.keys(rowData)[0]) + "'/><input type='hidden' name='upload_idxvalue' value='"+rowData[iif(isNumeric(Object.keys(rowData)[0]),Object.keys(rowData)[1],Object.keys(rowData)[0])]+"'/><input type='hidden' name='upload_field' value='"+dataIndx+"'/><input style='width:100%;min-width:150px;' type='file' name='upload_file' xaccept='image/*'/></form>";
                }
            }
            else { //if change >= 0
                //rowData.pq_cellcls[dataIndx] = 'yellow';

                var lowerFile = rowData[dataIndx].toLowerCase();
                if(InStr(lowerFile,".png")+InStr(lowerFile,".jpg")+InStr(lowerFile,".jpeg")+InStr(lowerFile,".bmp")+InStr(lowerFile,".gif")>0)
                return "<img style='width:100%;max-height:150px;' src='/uploadFiles/"+rowData[dataIndx]+"'/>";
                else return "<div style='overflow: hidden; text-overflow: ellipsis;white-space: nowrap; width:150px;'><a target=_blank href='/uploadFiles/"+rowData[dataIndx]+"'><img style='margin-right:5px;' src='/_mis/images/disket.png'/>"+rowData[dataIndx].split("/")[rowData[dataIndx].split("/").length-1]+"</a></div>";

            }

            
        },

HTML;

	return $str;
}

function isMobile()
{
	global $ServerVariables_HTTP_USER_AGENT;
	$useragent = $ServerVariables_HTTP_USER_AGENT;
	if (preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i', $useragent) || preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i', substr($useragent, 0, 4)))
		return "Y";
	else if (InStr($useragent, "iPhone") + InStr($useragent, "iPad") + InStr($useragent, "android") > 0)
		return "Y";
	else
		return "N";
}
function isPhoneMobile()
{
	global $ServerVariables_HTTP_USER_AGENT;
	$useragent = $ServerVariables_HTTP_USER_AGENT;
	if (preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i', $useragent) || preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i', substr($useragent, 0, 4)))
		return "Y";
	else if (InStr($useragent, "iPhone") + InStr($useragent, "iPod") > 0)
		return "Y";
	else
		return "N";
}

function clean($string)
{
	$string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
	return preg_replace('/[^A-Za-z0-9\-_]/', '', $string); // Removes special chars.
}

function today10()
{
	return date("Y-m-d");
}
function today8()
{
	return date("Ymd");
}
function today14()
{
	return date("YmdHis");
}
function today15()
{
	return date("Ymd_His");
}
function today19()
{
	return date("Y-m-d H:i:s");
}
// PHP 8.0 미만 버전을 위한 str_starts_with 구현
if (!function_exists('str_starts_with')) {
    function str_starts_with($haystack, $needle) {
        return (string)$needle !== '' && strncmp($haystack, $needle, strlen($needle)) === 0;
    }
}
function re_direct($url, $permanent = false)
{
	global $full_site, $ServerVariables_URL;

	// 1. null 값 방어 (Deprecated 에러 방지)
	$full_site = $full_site ?? '';
	$url = $url ?? '';
	$ServerVariables_URL = $ServerVariables_URL ?? '';

	if (headers_sent() === false) {
		// 2. 안전한 비교 (str_starts_with 호출 전 변수 확인)
		if (!str_starts_with($url, 'http') && str_starts_with($full_site, 'https')) {
			if (str_starts_with($url, '/')) {
				$url = $full_site . $url;
			} else {
				if (str_starts_with($url, './')) {
					$url = substr($url, 2);
				}

				// 기존 splitVB, Left 연산 부분
				$a1 = explode('?', $ServerVariables_URL)[0]; // splitVB 대신 표준 explode 권장
				$path_parts = explode('/', $a1);
				$last_part = end($path_parts);
				$a3 = substr($a1, 0, strlen($a1) - strlen($last_part));

				$url = $full_site . $a3 . $url;
			}
		}

		// 3. 리다이렉트 실행
		header('Location: ' . $url, true, ($permanent === true) ? 301 : 302);
	} else {
		// 이미 헤더가 나갔다면 JS로라도 강제 이동 (비상구)
		echo "<script>location.href='$url';</script>";
	}

	exit();
}


function iif($tst, $cmp, $bad)
{
	return $tst ? $cmp : $bad;
}




function ReadTextFile($filename)
{
	if (file_exists($filename)) {
		$fp = fopen($filename, "r");
		if ($fp) {
			if (filesize($filename) == 0)
				return '';
			else {
				$buffer = fread($fp, filesize($filename));
				//return mb_convert_encoding(htmlspecialchars($buffer), "UTF-8", "EUC-KR");
				return $buffer;
			}
		} else
			return '';
		fclose($fp);
	} else
		return '';
}


function InStr($arg1, $arg2, $arg3 = null)
{
	if ($arg3 !== null) {
		$start = $arg1 > 0 ? $arg1 - 1 : 0;
		$haystack = $arg2;
		$needle = $arg3;
	} else {
		$start = 0;
		$haystack = $arg1;
		$needle = $arg2;
	}

	if ($haystack === null || $haystack === '' || $needle === '')
		return 0;

	$x = stripos($haystack, $needle, $start);

	if ($x !== false)
		return $x + 1;
	return 0;
}

function requestVB($arg)
{
	if (isset($_POST[$arg])) {
		if ($_POST[$arg] != '')
			return $_POST[$arg];
		else
			return '';
	} else if (isset($_GET[$arg])) {
		if ($_GET[$arg] != "")
			return $_GET[$arg];
		else
			return '';
	} else {
		return '';
	}
}

function GetMyConnection()
{
	global $g_link;
	global $DbServerName;		//처음 정의된 $DbServerName 를 사용하겠다는 뜻이네.
	global $DbID;
	global $DbPW; // your DbPW
	global $base_db;
	if ($g_link)
		return $g_link;
	$g_link = mysql_connect($DbServerName, $DbID, $DbPW) or die('Could not connect to server.');
	mysql_query("Set names 'utf8'");

	mysql_select_db($base_db, $g_link) or die('Could not select database.');
	return $g_link;
}

function CleanUpDB()
{
	global $g_link;
	if ($g_link != false)
		mysql_close($g_link);
	$g_link = false;
}


function request_querystring($arg)
{
	return $_GET[$arg];
}

function request_form($arg)
{
	return $_POST[$arg];
}

function request_cookies($arg)
{
	if (isset($_COOKIE[$arg]))
		return $_COOKIE[$arg];
	else
		return '';
}

function POST_GET($arg)
{
	if ($_POST[$arg] != "") {
		return $_POST[$arg];
	} else {
		//echo "OK POST\n";
		return $_GET[$arg];
	}
}
function trim2($arg1)
{
	if ($arg1 == null || $arg1 == '')
		return '';
	return str_replace(chr(194) . chr(160), '', trim($arg1));
}
function left($arg1, $arg2)
{
	return mb_substr($arg1 ?? '', 0, $arg2, "UTF-8");
}

function right($arg1, $arg2)
{
	return mb_substr($arg1 ?? '', -$arg2, $arg2, "UTF-8");
}

function mid($arg1, $arg2, $arg3)
{
	return mb_substr($arg1 ?? '', $arg2 - 1, $arg3, "UTF-8");
}


function replace($arg1, $arg2, $arg3)
{
	return str_replace($arg2, $arg3, $arg1 ?? '');
}

function splitVB($arg1, $arg2)
{
	return explode($arg2, $arg1);
}



function getStartAndEndDate($week, $year)
{
	$dto = new DateTime();
	$dto->setISODate($year, $week);
	$ret['week_start'] = $dto;
	$ret['week_start10'] = $dto->format('Y-m-d');
	$dto->modify('+6 days');
	$ret['week_end'] = $dto;
	$ret['week_end10'] = $dto->format('Y-m-d');
	return $ret;
}
function weekOfMonth($date)
{
	//Get the first day of the month.
	$firstOfMonth = strtotime(date("Y-m-01", strtotime($date)));
	//Apply above formula.
	return weekOfYear(strtotime($date)) - weekOfYear($firstOfMonth) + 1;
}
function weekOfYear($date)
{
	$weekOfYear = intval(date("W", $date));
	if (date('n', $date) == "1" && $weekOfYear > 51) {
		// It's the last week of the previos year.
		return 0;
	} else if (date('n', $date) == "12" && $weekOfYear == 1) {
		// It's the first week of the next year.
		return 53;
	} else {
		// It's a "normal" week.
		return $weekOfYear;
	}
}


function gridTxt_into_SortElement($p_RealPid, $gridTxt)
{
	global $MisMenuList_Detail;
	$temp1 = "select SortElement FROM $MisMenuList_Detail WHERE useflag='1' and RealPid='" . $p_RealPid . "' and Grid_TextMatrix0='" . $gridTxt . "';";
	return onlyOnereturnSql($temp1);
}
function gridAlias_into_SortElement($p_RealPid, $aliasName)
{
	global $MisMenuList_Detail;
	$temp1 = "select SortElement FROM $MisMenuList_Detail WHERE useflag='1' and RealPid='" . $p_RealPid . "' and aliasName='" . $aliasName . "';";
	return onlyOnereturnSql($temp1);
}
function gridAlias_into_Field($p_RealPid, $aliasName)
{
	global $MisMenuList_Detail;
	$temp1 = "select Grid_Select_Field FROM $MisMenuList_Detail WHERE useflag='1' and RealPid='" . $p_RealPid . "' and aliasName='" . $aliasName . "';";
	return onlyOnereturnSql($temp1);
}
function gridSortElement_into_Alias($p_RealPid, $SortElement)
{
	global $MisMenuList_Detail;
	$temp1 = "select aliasName FROM $MisMenuList_Detail WHERE useflag='1' and RealPid='" . $p_RealPid . "' and SortElement='" . $SortElement . "';";
	return onlyOnereturnSql($temp1);
}
function gridColumnTitle_into_Alias($p_RealPid, $Grid_Columns_Title)
{
	global $MisMenuList_Detail;
	$temp1 = "select aliasName FROM $MisMenuList_Detail WHERE useflag='1' and RealPid='" . $p_RealPid . "' and Grid_Columns_Title=N'" . $Grid_Columns_Title . "';";
	return onlyOnereturnSql($temp1);
}
function gridSortElement_into_Field($p_RealPid, $SortElement)
{
	global $MisMenuList_Detail;
	$temp1 = "select Grid_Select_Field FROM $MisMenuList_Detail WHERE useflag='1' and RealPid='" . $p_RealPid . "' and SortElement='" . $SortElement . "';";
	return onlyOnereturnSql($temp1);
}
//echo gridTxt_into_SortElement("speedmis000003","답변순");


function RealPidIntoGubun($p_rpd)
{
	$sql = "select idx FROM MisMenuList WHERE useflag='1' and RealPid='" . $p_rpd . "';";
	return onlyOnereturnSql($sql);
}

function GubunIntoRealPid($p_gbn)
{
	$sql = "select RealPid FROM MisMenuList WHERE useflag='1' and idx='" . $p_gbn . "';";
	return onlyOnereturnSql($sql);
}

function get_logicPid($p_RealPid)
{
	$sql = "select RealPid from MisMenuList where RealPid='$p_RealPid' and MenuType='01'
	union
	select MisJoinPid from MisMenuList where RealPid='$p_RealPid' and MenuType='06';";
	return onlyOnereturnSql($sql);
}

function sqlValueReplace($str)
{
	if (is_null($str))
		return '';

	// 1. 따옴표(')를 두 개의 따옴표('')로 치환 (SQL 문법 보호)
	$str = str_replace("'", "''", $str);

	// 2. 백슬래시(\) 제거 또는 치환 (MariaDB 이스케이프 혼란 방지)
	//$str = str_replace("\\", "", $str);

	// 3. 앞뒤 불필요한 공백 제거 (데이터 순수성 유지)
	//$str = trim($str);

	return $str;
}

//isExistTable 는 뷰도 포함함.
function isExistTable($p_table, $dbalias)
{
	global $os, $externalDB, $database2, $MS_MJ_MY, $MS_MJ_MY2, $DbServerName2, $base_db2, $DbID2, $DbPW2;
	if ($dbalias == 'default')
		$dbalias = '';
	if ($MS_MJ_MY == 'MY' && $dbalias == '')
		$dbalias = '1st';
	if ($dbalias != '') {
		connectDB_dbalias($dbalias);
		if ($MS_MJ_MY2 == 'MY') {
			$sql = "select count(*) from information_schema.tables where TABLE_NAME='$p_table' and TABLE_SCHEMA='$base_db2'";
		} else if ($MS_MJ_MY2 == 'OC') {
			$sql = "select count(*) from user_tables where table_name='$p_table'";
		} else {
			if (InStr($p_table, '.') > 0) {
				$this_table = splitVB($p_table, '.')[count(splitVB($p_table, '.')) - 1];
				$this_db = replace($p_table, '.' . $this_table, '');
				$sql = "select count(*) from $this_db.sysobjects where name='$this_table' and type in ('U','V')";
			} else {
				$sql = "select count(*) from sysobjects where name='$p_table' and type in ('U','V')";
			}
		}
	} else {
		if (InStr($p_table, '.') > 0) {
			$this_table = splitVB($p_table, '.')[count(splitVB($p_table, '.')) - 1];
			$this_db = replace($p_table, '.' . $this_table, '');
			$sql = "select count(*) from $this_db.sysobjects where name='$this_table' and type in ('U','V')";
		} else {
			$sql = "select count(*) from sysobjects where name='$p_table' and type in ('U','V')";
		}
	}
	return iif(onlyOnereturnSql_gate($sql, $dbalias) == 0, false, true);
}

function execSql_gate($p_sql, $dbalias)
{
	global $os, $externalDB, $database2, $MS_MJ_MY, $MS_MJ_MY2, $DbServerName2, $base_db2, $DbID2, $DbPW2;
	if ($dbalias == 'default')
		$dbalias = '';
	if ($MS_MJ_MY == 'MY' && $dbalias == '')
		$dbalias = '1st';
	if ($dbalias != '') {
		connectDB_dbalias($dbalias);
		if ($MS_MJ_MY2 == 'MY') {
			return execSql_db2_mysql($p_sql);
		} else if ($MS_MJ_MY2 == 'OC') {
			return execSql_db2_oracle($p_sql);
		} else {
			return execSql_db2_mssql($p_sql);
		}
	} else {
		return execSql($p_sql);
	}
}
function kendoCultureIntoLANGUAGE()
{
	//https://docs.microsoft.com/en-us/sql/relational-databases/system-compatibility-views/sys-syslanguages-transact-sql?view=sql-server-ver15
	global $kendoCulture;
	$kendoCultureNew = $kendoCulture;
	if (request_cookies('myLanguageCode') != '')
		$kendoCultureNew = request_cookies('myLanguageCode');
	$L2 = Left($kendoCultureNew, 2);
	$lang = 'Korean';
	if ($L2 == 'en')
		$lang = 'English';
	else if ($L2 == 'ja')
		$lang = 'Japanese';
	else if ($L2 == 'zh')
		$lang = 'Traditional Chinese';
	else if ($L2 == 'de')
		$lang = 'German';
	return $lang;
}
function execSql($p_sql)
{
	global $MS_MJ_MY, $DbServerName, $DbID, $DbPW, $base_db, $database, $gzip_YN;

	if ($MS_MJ_MY == 'MY') {
		return execSql_gate($p_sql, '1st');
	} else {
		//웹호스팅의 경우, 명령문이 150개 가량 되어도 일부 입력이 누락됨. 아래와 같이 조치.
		//MisPhpExecSql_Proc 에서 에러리턴

		/*
		$sql_out = "
		execute MisPhpExecSql_Proc '" . replace($p_sql,"'","''") . "'
		";
		*/
		//$p_sql = "update MisMenuList set addLogic='\\'':e?' where RealPid='mcare003002';";
		//   웹소스 내용이   \':e?    일때 저장 에러남. 
		/*
		$sql_out = "
		declare @outer_sql nvarchar(max); 
		set @outer_sql = N'
		declare @sql nvarchar(max)
		set @sql = N''" . replace($p_sql,"'","''''") . "''
		BEGIN TRY
		SET NOCOUNT ON
		SET ANSI_WARNINGS ON
		SET LANGUAGE ''" . kendoCultureIntoLANGUAGE() . "''	
		exec(@sql);
		END TRY 
			BEGIN CATCH
				select ERROR_MESSAGE()
			RETURN;
		END CATCH
		select ''success''
		'
		exec(@outer_sql);
		";
		//echo $sql_out;//exit;
		*/

		$sql_out = "
DECLARE @outer_sql NVARCHAR(MAX); 
SET @outer_sql = N'
	DECLARE @sql NVARCHAR(MAX);
	SET @sql = N''" . replace($p_sql, "'", "''''") . "''

	BEGIN TRY
		SET NOCOUNT ON;
		SET ANSI_WARNINGS ON;

		-- 실제 쿼리 실행
		EXEC(@sql);

		-- 실행 완료 신호
		SELECT ''success'' AS exec_result;
	END TRY
	BEGIN CATCH
		-- 에러 메시지 반환
		SELECT ERROR_MESSAGE() AS exec_result;
	END CATCH
';
EXEC(@outer_sql);
		";
		$stmt = $database->query($sql_out);


		do {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		}
		while ($stmt->nextRowset());

		if (count(array_values($result)) == 0) {
			$Exception = "처리할 쿼리문이 없습니다.";
			$output = array(
				'resultCode' => 'fail',
				'resultMessage' => $Exception,
				'resultQuery' => $p_sql
			);
			//gzecho(json_encode($output));
			return $output;

		} else {
			$Exception = array_shift($result[0]);
			$output = array(
				'resultCode' => iif($Exception == 'success', 'success', 'fail'),
				'resultMessage' => iif($Exception == 'success', '', $Exception),
				'resultQuery' => $p_sql
			);
			//gzecho(json_encode($output));
			return $output;
		}

	}

}
//oci_execute ??
function execSql_db2_oracle($p_sql)
{

	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $database2, $gzip_YN;
	//Dynamic SQL



	if (InStr($p_sql, ";--") > 0) {

		$pp_sql = "
		declare
			sql_stmt    varchar2(2000);
		begin
		";
		for ($i = 0; $i < count(splitVB($p_sql, ';--')) - 1; $i++) {
			$pp_sql = $pp_sql . "sql_stmt := '" . replace(splitVB($p_sql, ';--')[$i], "'", "''") . "';
			execute immediate sql_stmt;
			";
		}
		$pp_sql = $pp_sql . "
		end;
		";

		$p_sql = $pp_sql;



	} else if (InStr(strtolower($p_sql), "end;") + InStr(strtolower($p_sql), " table ") == 0) {

		$p_sql = "
		begin
	
		$p_sql
		
		end;";
	} else {

	}
	//if(InStr($p_sql,'REATE TABLE')>0) {echo $p_sql;exit;	}

	$stmt = $database2->prepare($p_sql);

	if ($stmt) {
		try {
			$stmt->execute();
			$output = array(
				'resultCode' => 'success',
				'resultMessage' => '',
				'resultQuery' => $p_sql
			);
			//gzecho(json_encode($output));
			return $output;
		} catch (Exception $e) {
			$Exception = "execSql_db2_oracle:A
			$p_sql
			";

			$output = array(
				'resultCode' => 'fail',
				'resultMessage' => '쿼리실행오류',
				'resultQuery' => 'execSql_db2_oracle:A - ' . $p_sql
			);
			//gzecho(json_encode($output));
			return $output;
		}
	} else {
		$output = array(
			'resultCode' => 'fail',
			'resultMessage' => '쿼리실행오류',
			'resultQuery' => 'execSql_db2_oracle:B - ' . $p_sql
		);
		//gzecho(json_encode($output));
		return $output;
	}
}
function execSql_db2_mssql($p_sql)
{
	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $database2, $gzip_YN, $MS_MJ_MY;

	if ($MS_MJ_MY == 'MY') {
		return execSql_gate($p_sql, '1st');
	} else {
		//웹호스팅의 경우, 명령문이 150개 가량 되어도 일부 입력이 누락됨. 아래와 같이 조치.
		//MisPhpExecSql_Proc 에서 에러리턴

		/*
		$sql_out = "
		execute MisPhpExecSql_Proc '" . replace($p_sql,"'","''") . "'
		";
		*/
		$sql_out = "
		declare @outer_sql nvarchar(max); 
		set @outer_sql = N'
		declare @sql nvarchar(max)
		set @sql = N''" . replace($p_sql, "'", "''''") . "''
		BEGIN TRY
		SET NOCOUNT ON
		SET ANSI_WARNINGS ON
		SET LANGUAGE ''" . kendoCultureIntoLANGUAGE() . "''	
		exec(@sql);
		END TRY 
			BEGIN CATCH
				select ERROR_MESSAGE()
			RETURN;
		END CATCH
		select ''success''
		'
		exec(@outer_sql);
		";

		$stmt = $database2->query($sql_out);

		do {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		}
		while ($stmt->nextRowset());

		if (count(array_values($result)) == 0) {
			$Exception = "처리할 쿼리문이 없습니다.";
			$output = array(
				'resultCode' => 'fail',
				'resultMessage' => $Exception,
				'resultQuery' => $p_sql
			);
			//gzecho(json_encode($output));
			return $output;

		} else {
			$Exception = array_shift($result[0]);
			$output = array(
				'resultCode' => iif($Exception == 'success', 'success', 'fail'),
				'resultMessage' => iif($Exception == 'success', '', $Exception),
				'resultQuery' => $p_sql
			);
			//gzecho(json_encode($output));
			return $output;
		}

	}

}
function execSql_db2_mysql($p_sql)
{
	if ($p_sql == '') {
		return false;
	}
	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $gzip_YN;
	$dsn = 'mysql:host=' . $DbServerName2 . ';dbname=' . $base_db2;
	$options = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
	$dbh = new PDO($dsn, $DbID2, $DbPW2, $options);
	$p_sql = str_replace('\\', '\\\\', $p_sql);

	$stmt = $dbh->prepare($p_sql);
	if ($stmt) {
		try {
			$stmt->execute();
			$output = array(
				'resultCode' => 'success',
				'resultMessage' => '',
				'resultQuery' => $p_sql
			);
			//gzecho(json_encode($output));
			return $output;
		} catch (Exception $e) {
			$Exception = "execSql_db2_mysql:A
			$p_sql
			";
			$output = array(
				'resultCode' => 'fail',
				'resultMessage' => '쿼리실행오류',
				'resultQuery' => $Exception
			);
			//gzecho(json_encode($output));
			return $output;
		}
	} else {
		$Exception = "execSql_db2_mysql:B
		$p_sql
		";
		$output = array(
			'resultCode' => 'fail',
			'resultMessage' => '쿼리실행오류',
			'resultQuery' => $Exception
		);
		//gzecho(json_encode($output));
		return $output;
	}
}

//oracle 용 컨텐츠 셀렉트용 변환기
function dbms_lob_delta($p_FullFieldName)
{
	$r = "substr($p_FullFieldName,1,4000)";
	for ($i = 1; $i < 200; $i++) {
		$r = $r . " || substr(" . $p_FullFieldName . "," . ($i * 4000 + 1) . ",4000)";
	}
	return $r;
}
//oracle 용 컨텐츠 입력/수정용 변환기
function to_clob_delta($p_value)
{
	$r = "to_clob('" . mid($p_value, 1, 4000) . "')";
	for ($i = 1; $i < 200; $i++) {
		$r = $r . " || to_clob('" . mid($p_value, $i * 4000 + 1, 4000) . "')";
	}
	return $r;
}

//쿼리의 결과값을 리턴, 에러나 값이 없으면 false 를 보냄?
function test($p_sql)
{
	global $DbServerName, $DbID, $DbPW, $base_db, $database;

	try {
		$result = $database->query($p_sql)->fetchAll(PDO::FETCH_ASSOC);
		if (count(array_values($result)) == 0)
			return false;
		else {
			print_r($result[0]);
			echo count($result[0]);
		}
	} catch (Exception $e) {
		error_log($e->getMessage());
		exit('Something weird happened'); //something a user can understand
	}

	exit;
}

function connectDB_dbalias($p_dbalias)
{

	global $os, $externalDB, $database2, $MS_MJ_MY, $MS_MJ_MY2, $DbServerName2, $base_db2, $DbID2, $DbPW2, $gzip_YN;

	if ($p_dbalias == 'default')
		$p_dbalias = '';

	if ($MS_MJ_MY == 'MY' && $p_dbalias == '')
		$p_dbalias = '1st';


	if ($p_dbalias != "") {

		if (property_exists((object) $externalDB, $p_dbalias)) {

			$temp = splitVB($externalDB[$p_dbalias], "(@)");
			$MS_MJ_MY2 = $temp[0];
			$DbServerName2 = $temp[1];
			$base_db2 = $temp[2];
			$DbID2 = $temp[3];
			$DbPW2 = $temp[4];
			if ($MS_MJ_MY2 == 'MS' || $MS_MJ_MY2 == 'MJ') {
				if ($os == 'windows') {
					//검증완료
					$database2 = new PDO("sqlsrv:server=$DbServerName2; Database=$base_db2", "$DbID2", "$DbPW2");
					$database2->setAttribute(PDO::ATTR_CASE, PDO::CASE_NATURAL);
					$database2->setAttribute(PDO::ATTR_TIMEOUT, 600);
					$database2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					$database2->setAttribute(PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true);
				} else {
					//검증완료
					$driverOptions2 = [PDO::ATTR_CASE => PDO::CASE_NATURAL, PDO::ATTR_TIMEOUT => 600, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
					$database2 = new PDO("dblib:host=$DbServerName2;dbname=$base_db2;charset=utf8", "$DbID2", "$DbPW2", $driverOptions2);
				}
			} else if ($MS_MJ_MY2 == 'OC') {
				if ($os == 'windows') {
					//검증완료
					$database2 = new PDO("oci:dbname=//$DbServerName2/$base_db2;charset=UTF8", "$DbID2", "$DbPW2");
					$database2->setAttribute(PDO::ATTR_CASE, PDO::CASE_NATURAL);
					$database2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					$database2->setAttribute(PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true);
				} else {
					//검증필요
					$database2 = new PDO("oci:dbname=//$DbServerName2/$base_db2;charset=UTF8", "$DbID2", "$DbPW2");
					$database2->setAttribute(PDO::ATTR_CASE, PDO::CASE_NATURAL);
					$database2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
					$database2->setAttribute(PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true);
				}
			}

		} else if ($p_dbalias != '1st') {

			$Exception = $p_dbalias . " 로 정의된 DB 서버가 없어 진행할 수 없습니다.";
			if ($gzip_YN == 'Y') {
				gzecho($Exception);
			} else {
				gzecho($Exception);
			}
			exit;

		}
	}
}

//쿼리의 결과값을 리턴, 에러나 값이 없으면 false 를 보냄?
function allreturnSql_gate($p_sql, $dbalias)
{
	global $os, $externalDB, $database2, $MS_MJ_MY, $MS_MJ_MY2, $DbServerName2, $base_db2, $DbID2, $DbPW2;

	if ($dbalias == 'default')
		$dbalias = '';

	if ($MS_MJ_MY == 'MY' && $dbalias == '')
		$dbalias = '1st';

	if ($dbalias != '') {
		connectDB_dbalias($dbalias);

		if ($MS_MJ_MY2 == 'MY') {
			return allreturnSql_db2_mysql($p_sql);
		} else if ($MS_MJ_MY2 == 'OC') {
			return allreturnSql_db2_oracle($p_sql);
		} else {
			return allreturnSql_db2_mssql($p_sql);
		}
	} else {
		return allreturnSql($p_sql);
	}
}
function allreturnSql($p_sql)
{

	global $MS_MJ_MY, $DbServerName, $DbID, $DbPW, $base_db, $database, $gzip_YN;
	if ($MS_MJ_MY == 'MY') {
		return allreturnSql_gate($p_sql, '1st');
	} else {
		try {

			$stmt = $database->query("
				SET NOCOUNT ON " . $p_sql);

			do {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			}
			while ($stmt->nextRowset());

			if (count(array_values($result)) == 0)
				return [];
			else
				return $result;

		} catch (Exception $e) {
			$errorInfo = '';
			foreach ($e->errorInfo as $key => $item) {
				$errorInfo = $errorInfo . "$key => $item \n\n";
			}
			$Exception = "<!-- select query error start ===========================\n

$MS_MJ_MY, $DbServerName, $base_db:

$errorInfo

			\n\n=== error end ========================\n

$p_sql

			:by function allreturnSql.
			-->";



			if ($gzip_YN == 'Y') {
				gzecho($Exception);
			} else {
				gzecho($Exception);
			}
		}
	}
}
function allreturnSql_db2_oracle($p_sql)
{

	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $database2, $gzip_YN;

	try {

		$stmt = $database2->query($p_sql);

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if (count(array_values($result)) == 0)
			return [];
		else
			return $result;

	} catch (Exception $e) {
		$Exception = "

		$DbServerName2, $base_db2:

		$p_sql

		:by function allreturnSql_db2_oracle
		---------
		" . $e->getMessage() . ':::Something weird happened oracle';

		if ($gzip_YN == 'Y') {
			gzecho($Exception);
		} else {
			gzecho($Exception);
		}
		exit;

	}
}
function allreturnSql_db2_mssql($p_sql)
{
	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $database2;
	try {
		$stmt = $database2->query("
			SET NOCOUNT ON " . $p_sql);
		do {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		}
		while ($stmt->nextRowset());

		if (count(array_values($result)) == 0)
			return [];
		else {
			return $result;
		}
	} catch (Exception $e) {
		gzecho("
		
		$p_sql
		
		
		by: function allreturnSql_db2_mssql 
		" . $e->getMessage());
		exit;
	}
}
function allreturnSql_db2_mysql($p_sql)
{
	//echo $p_sql;
	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $gzip_YN;
	$link = mysqli_connect($DbServerName2, $DbID2, $DbPW2, $base_db2);
	//echo $link->character_set_name();
	mysqli_set_charset($link, 'utf8');
	if ($result = mysqli_query($link, $p_sql, MYSQLI_USE_RESULT)) {
		$row = $result->fetch_all(MYSQLI_ASSOC);
		return $row;

	} else {
		return [];
	}

	$result->close();


}



//쿼리의 결과값을 리턴, 에러나 값이 없으면 false 를 보냄?
function onlyOnereturnSql_gate($p_sql, $dbalias)
{
	global $os, $externalDB, $database2, $MS_MJ_MY, $MS_MJ_MY2, $DbServerName2, $base_db2, $DbID2, $DbPW2;
	if ($dbalias == 'default')
		$dbalias = '';

	if ($MS_MJ_MY == 'MY' && $dbalias == '')
		$dbalias = '1st';

	if ($dbalias != '') {
		connectDB_dbalias($dbalias);
		if ($MS_MJ_MY2 == 'MY') {
			return onlyOnereturnSql_db2_mysql($p_sql);
		} else if ($MS_MJ_MY2 == 'OC') {
			return onlyOnereturnSql_db2_oracle($p_sql);
		} else {
			return onlyOnereturnSql_db2_mssql($p_sql);
		}
	} else {
		return onlyOnereturnSql($p_sql);
	}
}
function onlyOnereturnSql($p_sql)
{

	global $MS_MJ_MY, $DbServerName, $DbID, $DbPW, $base_db, $database, $gzip_YN;
	if ($p_sql == '')
		return false;

	if ($MS_MJ_MY == 'MY') {
		return onlyOnereturnSql_gate($p_sql, '1st');
	} else {
		try {

			$stmt = $database->query("
				SET NOCOUNT ON " . $p_sql);

			do {
				$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
			}
			while ($stmt->nextRowset());

			if (count(array_values($result)) == 0)
				return false;
			else
				return array_values($result[0])[0];

		} catch (Exception $e) {
			$errorInfo = '';
			foreach ($e->errorInfo as $key => $item) {
				$errorInfo = $errorInfo . "$key => $item \n\n";
			}
			$Exception = "<!-- select query error start ===========================\n

$MS_MJ_MY, $DbServerName, $base_db:

$errorInfo

			\n\n=== error end ========================\n

$p_sql

			:by function onlyOnereturnSql.
			-->";



			if ($gzip_YN == 'Y') {
				gzecho($Exception);
			} else {
				gzecho($Exception);
			}
		}
	}

}
function onlyOnereturnSql_db2_oracle($p_sql)
{

	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $database2, $gzip_YN;

	try {

		$stmt = $database2->query($p_sql);

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		if (count(array_values($result)) == 0)
			return false;
		else
			return array_values($result[0])[0];

	} catch (Exception $e) {
		$Exception = "

		$DbServerName2, $base_db2 :	

		$p_sql
		---------
		:by function onlyOnereturnSql_db2_oracle

		" . $e->getMessage() . ':::Something weird happened oracle';

		if ($gzip_YN == 'Y') {
			gzecho($Exception);
		} else {
			gzecho($Exception);
		}
		exit;

	}
}
function onlyOnereturnSql_db2_mssql($p_sql)
{

	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $database2;

	try {

		$stmt = $database2->query("
			SET NOCOUNT ON " . $p_sql);

		do {
			$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		}
		while ($stmt->nextRowset());

		if (count(array_values($result)) == 0)
			return false;
		else
			return array_values($result[0])[0];

	} catch (Exception $e) {

		gzecho("
		
$DbServerName2, $base_db2 :	

		$p_sql

		:by function onlyOnereturnSql_db2_mssql

		" . $e->getMessage());
		exit;
	}
}
function onlyOnereturnSql_db2_mysql($p_sql)
{
	//mysql 은 여러쿼리의 마지막쿼리만 리턴시킨다.
	if ($p_sql == '') {
		return false;
	}


	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $gzip_YN;

	try {
		$link = mysqli_connect($DbServerName2, $DbID2, $DbPW2, $base_db2);
		$link->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, TRUE);


	} catch (Exception $e) {
		$Exception = "

				<!--

$DbServerName2, $base_db2 :	

							mysqli_connect error

				:by function onlyOnereturnSql_db2_mysql 0
				-->

		" . $e->getMessage();

		if ($gzip_YN == 'Y') {
			gzecho($Exception);
		} else {
			gzecho($Exception);
		}
		exit;
	}

	//echo $link->character_set_name();
	mysqli_set_charset($link, 'utf8');
	try {
		$result = mysqli_multi_query($link, $p_sql);

		if ($result) {
			do {
				if ($result = mysqli_store_result($link)) {
					if (mysqli_more_results($link) == 0) {
						if ($result == '') {
							$Exception = "
<!--

$DbServerName2, $base_db2 :	

							$p_sql

				:by function onlyOnereturnSql_db2_mysql A
				-->
							";

							if ($gzip_YN == 'Y') {
								gzecho($Exception);
							} else {
								gzecho($Exception);
							}
							return '';
						}
						$row = $result->fetch_all(MYSQLI_ASSOC);
						//print_r(reset($row[0]));

						if (count($row) > 0)
							return reset($row[0]);
						else
							return '';
						/*
						print_r($row);
						while ($row = mysqli_fetch_row($result)) {
							printf("%s\n", $row[0]);
						}
						*/

						mysqli_free_result($result);
					}
				}

			} while (mysqli_next_result($link));
		} else {
			return '';
		}
		$result->close();
	} catch (Exception $e) {
		$Exception = "

				<!--

$DbServerName2, $base_db2 :		
			
							$p_sql

				:by function onlyOnereturnSql_db2_mysql B
				-->

		" . $e->getMessage();

		if ($gzip_YN == 'Y') {
			gzecho($Exception);
		} else {
			gzecho($Exception);
		}
		exit;
	}
}

function jsonReturnSql_gate($p_sql, $dbalias)
{
	global $os, $externalDB, $database2, $MS_MJ_MY, $MS_MJ_MY2, $DbServerName2, $base_db2, $DbID2, $DbPW2;
	if ($dbalias == 'default')
		$dbalias = '';
	if ($MS_MJ_MY == 'MY' && $dbalias == '')
		$dbalias = '1st';

	if ($dbalias != '') {
		connectDB_dbalias($dbalias);

		if ($MS_MJ_MY2 == 'MY') {
			return jsonReturnSql_db2_mysql($p_sql);
		} else if ($MS_MJ_MY2 == 'OC') {
			return jsonReturnSql_db2_oracle($p_sql);
		} else {
			return jsonReturnSql_db2_mssql($p_sql);
		}
	} else {
		return jsonReturnSql($p_sql);
	}
}
function jsonReturnSql($p_sql)
{
	global $DbServerName, $DbID, $DbPW, $base_db, $database, $MS_MJ_MY, $gzip_YN;
	if ($MS_MJ_MY == 'MY') {
		return jsonReturnSql_gate($p_sql, '1st');
	} else if ($MS_MJ_MY == "MJ") {
		//echo "select isnull((" . $selectQuery . " for json path, INCLUDE_NULL_VALUES),'[]')";
		$data = onlyOnereturnSql("select isnull((" . $p_sql . " for json path, INCLUDE_NULL_VALUES),'[]')");
	} else {

		try {
			$data = $database->query($p_sql)->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($data, JSON_UNESCAPED_UNICODE);
			//$data = json_encode($data,JSON_NUMERIC_CHECK);
		} catch (Exception $e) {
			$Exception = "

			$p_sql

			" . $e->getMessage();

			if ($gzip_YN == 'Y') {
				gzecho($Exception);
			} else {
				gzecho($Exception);
			}
			exit;
		}

	}
	return $data;
}
function jsonReturnSql_db2_oracle($p_sql)
{

	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $database2, $MS_MJ_MY2, $gzip_YN;

	try {
		$data = $database2->query($p_sql)->fetchAll(PDO::FETCH_ASSOC);
		$data = json_encode($data, JSON_UNESCAPED_UNICODE);
		//$data = json_encode($data,JSON_NUMERIC_CHECK);
	} catch (Exception $e) {
		$Exception = "

		$p_sql

		" . $e->getMessage();

		if ($gzip_YN == 'Y') {
			gzecho($Exception);
		} else {
			gzecho($Exception);
		}
		exit;
	}

	return $data;
}
function jsonReturnSql_db2_mssql($p_sql)
{
	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $database2, $MS_MJ_MY2, $gzip_YN;

	if ($MS_MJ_MY2 == "MJ") {
		//echo "select isnull((" . $selectQuery . " for json path, INCLUDE_NULL_VALUES),'[]')";
		$data = onlyOnereturnSql_db2_mssql("select isnull((" . $p_sql . " for json path, INCLUDE_NULL_VALUES),'[]')");
	} else {

		try {
			$data = $database2->query($p_sql)->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($data, JSON_UNESCAPED_UNICODE);
			//$data = json_encode($data,JSON_NUMERIC_CHECK);
		} catch (Exception $e) {
			$Exception = "

			$p_sql

			" . $e->getMessage();

			if ($gzip_YN == 'Y') {
				gzecho($Exception);
			} else {
				gzecho($Exception);
			}
			exit;
		}

	}
	return $data;
}


function jsonReturnSql_db2_mysql($p_sql)
{

	global $DbServerName2, $DbID2, $DbPW2, $base_db2, $gzip_YN;

	$mysqli = new mysqli($DbServerName2, $DbID2, $DbPW2, $base_db2);
	$mysqli->options(MYSQLI_OPT_INT_AND_FLOAT_NATIVE, TRUE);

	//설정된 값으로 set 한다 : 이렇게 해야 함.
	//$mysqli -> set_charset($mysqli->character_set_name());
	$mysqli->set_charset('utf8');

	try {
		$result = $mysqli->query($p_sql);

		if ($result == '') {
			$Exception = "
<!--
$DbServerName2,$base_db2 :

			$p_sql

:by function jsonReturnSql_db2_mysql A
-->
			";

			if ($gzip_YN == 'Y') {
				gzecho($Exception);
			} else {
				gzecho($Exception);
			}
			return '';
		}
		$resultArray = $result->fetch_all(MYSQLI_ASSOC);

	} catch (mysqli_sql_exception $e) {
		$Exception = "
<!--
$DbServerName2,$base_db2 :

		$p_sql
:by function jsonReturnSql_db2_mysql B
-->
		" . $e->getMessage();

		if ($gzip_YN == 'Y') {
			gzecho($Exception);
		} else {
			gzecho($Exception);
		}
		return '';
	}
	$data = json_encode($resultArray, JSON_UNESCAPED_UNICODE);
	if ($data == '') {	//mysql aribic 출력 시 공백출력에 대한 대안.
		if ($mysqli->character_set_name() != 'utf8') {
			$resultArray = utf8_converter($resultArray);
			$data = json_encode($resultArray, JSON_UNESCAPED_UNICODE);
		}
	}
	return $data;
}
function utf8_converter($array)
{
	array_walk_recursive($array, function (&$item, $key) {
		if (!mb_detect_encoding($item, 'utf-8', true)) {
			$item = utf8_encode($item);
		}
	});

	return $array;
}

//2016 버전 미만의 경우, grid 의 mvvm 이 boolean 구분에 문제가 있어, 이걸 사용함 : 주로 메인페이지 스킨용.
function jsonReturnSql_NUMERIC_CHECK($p_sql)
{
	global $DbServerName, $DbID, $DbPW, $base_db, $database, $MS_MJ_MY;

	if ($MS_MJ_MY == "MJ") {
		//echo "select isnull((" . $selectQuery . " for json path, INCLUDE_NULL_VALUES),'[]')";
		$data = onlyOnereturnSql("select isnull((" . $p_sql . " for json path, INCLUDE_NULL_VALUES),'[]')");
	} else {

		try {
			$data = $database->query($p_sql)->fetchAll(PDO::FETCH_ASSOC);
			$data = json_encode($data, JSON_NUMERIC_CHECK);
		} catch (Exception $e) {
			echo $e->getMessage();
			exit;
		}

	}
	return $data;
}


function misLog($logType, $menuIdx, $query, $HTTP_REFERER, $loginId)
{
	global $ServerVariables_HTTP_USER_AGENT, $ServerVariables_REMOTE_ADDR;

	$temp1 = "insert into MisLog (logType,menuIdx,query,HTTP_USER_AGENT,HTTP_REFERER,ip,wdater) values (
	'" . $logType . "'
	," . iif($menuIdx == "", "null", $menuIdx) . "
	,'" . replace($query, "'", "'+char(39)+'") . "'
	,'" . $ServerVariables_HTTP_USER_AGENT . "'
	,'" . $HTTP_REFERER . "'
	,'" . $ServerVariables_REMOTE_ADDR . "'
	,'" . $loginId . "'
	); ";
	execSql($temp1);

}

function is_json($string)
{
	return ((is_string($string) &&
		(is_object(json_decode($string)) ||
			is_array(json_decode($string))))) ? true : false;
}

function WriteTextFileSimple($filename, $StrOutText)
{
	$file = fopen($filename, 'w');
	fwrite($file, $StrOutText);
	while (is_resource($file)) {
		fclose($file);
	}
}
function WriteTextFile($filename, $StrOutText)
{
	global $gzip_YN;

	try {
		$file = fopen($filename, 'w');
	} catch (Exception $e) {
		if ($gzip_YN == 'Y') {
			gzecho("$filename 에 대한 폴더쓰기권한이 없습니다. 윈도우의 경우, 웹루트폴더의 보안 - Users 에 모든권한을 체크하시고, 리눅스의 경우 chmod 명령어 등을 이용하여 777 권한으로 변경해주세요. FTP 의 경우에도 알FTP 등을 이용하여 777 권한으로 변경하실 수 있습니다. ");
			exit;
		} else {
			?>

			<a href="javascript:;" onclick="location.reload(true);">
				비정상적인 접근일 수 있습니다.
				또는 파일/폴더 권한 오류입니다. 윈도우의 경우, 웹루트폴더의 보안 - Users 에 모든권한을 체크 후 여기를 다시 누르시면 새로고침됩니다.
				리눅스의 경우, chmod 명령어 등을 이용하여 777 또는 적절한 권한을 부여해주세요. FTP 의 경우에도 알FTP 등을 이용하여 777 권한으로 변경하실 수 있습니다. [새로고침]
			</a>

			<?php
			echo '
	  Message: 
	  ' . $e->getMessage();
		}
	}
	fwrite($file, $StrOutText);
	while (is_resource($file)) {
		fclose($file);
	}
}

function len($str)
{
	return iconv_strlen($str);
}


function uni_len($str)
{
	$len = 0;
	$chars = preg_split('//u', $str, -1, PREG_SPLIT_NO_EMPTY);
	foreach ($chars as $ch) {
		$len += (strlen($ch) > 1) ? 2 : 1;
	}
	return $len;
}

function uni_left($str, $limit)
{
	$result = '';
	$current = 0;

	$chars = preg_split('//u', $str, -1, PREG_SPLIT_NO_EMPTY);

	foreach ($chars as $ch) {
		$char_len = (strlen($ch) > 1) ? 2 : 1;

		if ($current + $char_len > $limit) {
			break;
		}

		$result .= $ch;
		$current += $char_len;
	}

	return $result;
}

function console_log($str)
{
	?>
	<img onerror="console.log(this.title);" src="" title="<?= $str ?>" style="display:none;" />
	<script></script>
	<?php
}


function createFolder($strDir)
{
	global $base_root;
	if (InStr(strtolower($strDir), strtolower($base_root . '/')) > 0) {
		if (!is_dir($strDir))
			mkdir($strDir, 0777, true);		//멀티레벨도 거뜬히 생성함.
	} else
		console_log($strDir . " 는 지정경로를 이탈함");
}
//createFolder("C:\\APM_Setup\\htdocs\\qqq2");


function FormatNum($pVal, $pFmt)
{

	$rValue = '';
	$f = "0";

	if (InStr($pFmt, ",") > 0) {
		if (InStr($pFmt, ".") == 0) {
			$rValue = number_format($pVal, 0);
		} else {
			if (InStr($pFmt, ".00000000") > 0)
				$rValue = number_format($pVal, 8);
			else if (InStr($pFmt, ".0000000") > 0)
				$rValue = number_format($pVal, 7);
			else if (InStr($pFmt, ".000000") > 0)
				$rValue = number_format($pVal, 6);
			else if (InStr($pFmt, ".00000") > 0)
				$rValue = number_format($pVal, 5);
			else if (InStr($pFmt, ".0000") > 0)
				$rValue = number_format($pVal, 4);
			else if (InStr($pFmt, ".000") > 0)
				$rValue = number_format($pVal, 3);
			else if (InStr($pFmt, ".00") > 0)
				$rValue = number_format($pVal, 2);
			else if (InStr($pFmt, ".0") > 0)
				$rValue = number_format($pVal, 1);
			else
				$rValue = number_format($pVal, 0);
		}
	} else {
		if (InStr($pFmt, ".") == 0) {
			$pVal = round($pVal);

			if (isSameString(left($pFmt, 8), "00000000"))
				$rValue = sprintf("%08d", $pVal);
			else if (isSameString(left($pFmt, 7), "0000000"))
				$rValue = sprintf("%07d", $pVal);
			else if (isSameString(left($pFmt, 6), "000000"))
				$rValue = sprintf("%06d", $pVal);
			else if (isSameString(left($pFmt, 5), "00000"))
				$rValue = sprintf("%05d", $pVal);
			else if (isSameString(left($pFmt, 4), "0000"))
				$rValue = sprintf("%04d", $pVal);
			else if (isSameString(left($pFmt, 3), "000"))
				$rValue = sprintf("%03d", $pVal);
			else if (isSameString(left($pFmt, 2), "00"))
				$rValue = sprintf("%02d", $pVal);
			else if (isSameString(left($pFmt, 1), "0"))
				$rValue = sprintf("%01d", $pVal);
			else
				$rValue = sprintf("%." . $f . "f", $pVal);

		} else {
			if (InStr($pFmt, ".00000000") > 0)
				$f = "8";
			else if (InStr($pFmt, ".0000000") > 0)
				$f = "7";
			else if (InStr($pFmt, ".000000") > 0)
				$f = "6";
			else if (InStr($pFmt, ".00000") > 0)
				$f = "5";
			else if (InStr($pFmt, ".0000") > 0)
				$f = "4";
			else if (InStr($pFmt, ".000") > 0)
				$f = "3";
			else if (InStr($pFmt, ".00") > 0)
				$f = "2";
			else if (InStr($pFmt, ".0") > 0)
				$f = "1";
			else
				$f = "0";

			if (isSameString(left($pFmt, 8), "00000000"))
				$rValue = sprintf("%0" . (9 + $f) . "." . $f . "f", $pVal);
			else if (isSameString(left($pFmt, 7), "0000000"))
				$rValue = sprintf("%0" . (8 + $f) . "." . $f . "f", $pVal);
			else if (isSameString(left($pFmt, 6), "000000"))
				$rValue = sprintf("%0" . (7 + $f) . "." . $f . "f", $pVal);
			else if (isSameString(left($pFmt, 5), "00000"))
				$rValue = sprintf("%0" . (6 + $f) . "." . $f . "f", $pVal);
			else if (isSameString(left($pFmt, 4), "0000"))
				$rValue = sprintf("%0" . (5 + $f) . "." . $f . "f", $pVal);
			else if (isSameString(left($pFmt, 3), "000"))
				$rValue = sprintf("%0" . (4 + $f) . "." . $f . "f", $pVal);
			else if (isSameString(left($pFmt, 2), "00"))
				$rValue = sprintf("%0" . (3 + $f) . "." . $f . "f", $pVal);
			else if (isSameString(left($pFmt, 1), "0"))
				$rValue = sprintf("%0" . (2 + $f) . "." . $f . "f", $pVal);
			else
				$rValue = sprintf("%." . $f . "f", $pVal);
		}



	}


	return $rValue;

}
//echo FormatNum("11123.885", "###,###,###.00") . "<br>";

//문자열이 같으면 true. 내용상 숫자일 경우 비교가 안되면 만듦
function isSameString($arg1, $arg2)
{
	return !strcmp($arg1, $arg2);
}



function UrlDecode_GBToUtf8($str)
{

	return urldecode($str);
}
//echo UrlDecode_GBToUtf8("%EC%A0%95%EC%8A%A4%ED%94%BC%EB%93%9C");

/*
is_numeric 가 php 의 isNumeric 임.
*/
function is_date($str)
{
	$d = date('Y-m-d', strtotime($str));
	return $d == $str;
}
function isnull($str)
{
	return is_null($str);
}

function lcase($str)
{
	return strtolower($str);
}

function ucase($str)
{
	return strtoupper($str);
}


function getTextString($str)
{

	if (isnull($str)) {
		$str = '';
	} else {
		$str = replace($str, "<style>", "<!--style");
		$str = replace($str, "<style", "<!--style");
		$str = replace($str, "</style>", "/style-->");
		$str = replace($str, "<script", "<!--script");
		$str = replace($str, "</script>", "/script-->");

		$str = replace($str, "<STYLE>", "<!--STYLE");
		$str = replace($str, "<STYLE", "<!--STYLE");
		$str = replace($str, "</STYLE>", "/STYLE-->");
		$str = replace($str, "<SCRIPT", "<!--SCRIPT");
		$str = replace($str, "</SCRIPT>", "/SCRIPT-->");

		$str = replace($str, "/css\">", "/css");

		$str = replace($str, "&nbsp;", " ");
	}

	$nLen = len($str);
	$sf = $str;
	for ($qq = 1; $qq <= $nLen; $qq++) {
		$st = InStr($qq, $str, "<");
		$ed = InStr($st + 1, $str, ">");
		if ($st > 0 && $ed > 0) {
			$ds = mid($str, $st, ($ed + 1) - $st);
			$sf = replace($sf, $ds, "");
			$qq = $ed;
		}
	}
	return $sf;
}




function HtmlTOText_MultiLine($str)
{

	$str = HtmlTOText($str);
	$str = replace($str, " ", "&nbsp;");
	$str = replace($str, chr(13) . chr(10), "<br/>");
	$str = replace($str, chr(10), "<br/>");

	return $str;
}

function HtmlTOText($str)
{

	$str = replace($str, "<STYLE>", "<STYLE><!--");
	$str = replace($str, "</STYLE>", "--></STYLE>");
	$str = replace($str, "<SCRIPT>", "<SCRIPT><!--");
	$str = replace($str, "</SCRIPT>", "--></SCRIPT>");
	$str = replace($str, "&nbsp;", " ");
	$str = replace($str, "</p>", chr(13) . chr(10));
	$str = replace($str, "<br>", chr(13) . chr(10));
	$str = replace($str, "<br/>", chr(13) . chr(10));

	$nLen = len($str);
	$sf = $str;
	for ($qq = 1; $qq <= $nLen; $qq++) {
		$st = InStr($qq, $str, "<");
		$ed = InStr($st + 1, $str, ">");
		if ($st > 0 && $ed > 0) {
			$ds = mid($str, $st, ($ed + 1) - $st);
			$sf = replace($sf, $ds, "");
			$qq = $ed;
		}
	}
	return $sf;
}
//echo HtmlTOText("aa<br/>나나나<br/><br>zzz");

function TextToHtml($temp)
{
	if (isnull($temp))
		$temp = '';
	$temp = replace($temp, "&nbsp;", "&ampnbsp;");
	$temp = replace(replace(replace(replace(replace(replace($temp, "<", "&lt;"), ">", "&gt;"), chr(13) . chr(10), "<br>"), chr(10), "<br>"), " ", "&nbsp;"), chr(9), "&nbsp;&nbsp;&nbsp;&nbsp;");
	return $temp;
}
//echo TextToHtml("zzz    sss");

function sendmail($p_setFrom, $p_addAddress, $p_subject, $p_body, $p_attachList = null)
{
	global $mail;

	if (is_array($p_addAddress)) {
		if (count($p_addAddress) == 0)
			return false;
	} else if (InStr($p_setFrom, '@') == 0 || InStr($p_addAddress, '@') == 0) {
		return false;
	}


	try {
		//$mail->isSMTP();                                            // Send using SMTP

		//Recipients
		if (InStr($p_setFrom, '@') == 0)
			return false;

		if (InStr($p_setFrom, '|') > 0) {
			$mail->setFrom(splitVB($p_setFrom, '|')[0], splitVB($p_setFrom, '|')[1]);
		} else {
			$mail->setFrom($p_setFrom);
		}

		if (is_array($p_addAddress)) {
			$cnt_p_addAddress = count($p_addAddress);
			for ($i = 0; $i < $cnt_p_addAddress; $i++) {
				$p_addAddress_item0 = $p_addAddress[$i][array_keys($p_addAddress[$i])[0]];
				if (count(array_keys($p_addAddress[$i])) == 2)
					$p_addAddress_item1 = $p_addAddress[$i][array_keys($p_addAddress[$i])[1]];
				else
					$p_addAddress_item1 = '';

				if ($p_addAddress_item1 != '') {
					$mail->addAddress($p_addAddress_item0, $p_addAddress_item1);
				} else {
					$mail->addAddress($p_addAddress_item0);
				}
			}
		} else {

			$p_addAddress_split = splitVB($p_addAddress, ',');

			$cnt_p_addAddress_split = count($p_addAddress_split);
			for ($i = 0; $i < $cnt_p_addAddress_split; $i++) {
				$p_addAddress_item = $p_addAddress_split[$i];
				if (InStr($p_addAddress_item, '@') > 0) {
					if (InStr($p_addAddress_item, '|') > 0) {
						$mail->addAddress(splitVB($p_addAddress_item, '|')[0], splitVB($p_addAddress_item, '|')[1]);
					} else {
						$mail->addAddress($p_addAddress_item);
					}
				}
			}
		}


		// Content
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = $p_subject;
		$mail->Body = $p_body;
		if ($p_attachList != null && $p_attachList != '') {
			for ($j = 0; $j < count(splitVB($p_attachList, ';')); $j++) {
				if (splitVB($p_attachList, ';')[$j] != '')
					$mail->AddAttachment(splitVB($p_attachList, ';')[$j]);
			}
		}
		//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

		$mail->send();
		//echo '발송 성공';
		$mail->clearAddresses();
		$mail->clearCCs();
		$mail->clearBCCs();

		$mail->clearAllRecipients();
		$mail->clearAttachments();
		$mail->clearCustomHeaders();
		return true;
	} catch (Exception $e) {
		//echo "발송 실패 에러정보 : {$mail->ErrorInfo}";
		return false;
	}
}




//list_json.php 를 개조함.
function list_top1_query()
{
	global $MS_MJ_MY, $MS_MJ_MY2, $dbalias, $RealPid, $MisJoinPid, $MisMenuList_Detail;
	global $MisSession_UserID, $MisSession_PositionCode, $parent_RealPid, $MisSession_StationNum;
	global $MS_MJ_MY2, $DbServerName2, $base_db2, $DbID2, $DbPW2, $pro_dbalias;
	global $result;   //과제 : 예의주시해야함.

	if ($MS_MJ_MY == 'MY')
		$addDir = 'MY';
	else
		$addDir = '';

	$afterScript = '';
	$appSql = '';

	error_reporting(E_ALL);
	ini_set("display_errors", 1);

	$ActionFlag = 'read';
	$flag = 'read';



	/*
	if($MS_MJ_MY=='MY') {
		$isnull = 'ifnull';
	} else if($MS_MJ_MY2=='MY') {
		$isnull = 'ifnull';
		//connectDB_dbalias('1st');
		$MS_MJ_MY = $MS_MJ_MY2;
		$DbServerName = $DbServerName2;
		$base_db = $base_db2;
		$DbID = $DbID2;
		$DbPW = $DbPW2;
	} else {
		$isnull = 'isnull';
	}
	*/


	$alldata = '';

	if (isset($_GET["RealPid"]))
		$RealPid = $_GET["RealPid"];


	if (isset($_GET["MisJoinPid"]))
		$MisJoinPid = $_GET["MisJoinPid"];

	if ($MisJoinPid == '')
		$logicPid = $RealPid;
	else
		$logicPid = $MisJoinPid;



	if (isset($_GET["parent_gubun"])) {
		$parent_gubun = $_GET["parent_gubun"];
		$parent_RealPid = GubunIntoRealPid($parent_gubun);
	} else {
		$parent_gubun = '';
		$parent_RealPid = '';
	}


	$devQueryOn = 'N';
	$min = '.min';
	if (isset($_COOKIE["devQueryOn"])) {
		$devQueryOn = $_COOKIE["devQueryOn"];
	}
	$rnd = '';

	if (isset($_GET["parent_idx"]))
		$parent_idx = $_GET["parent_idx"];
	else
		$parent_idx = '';

	$grid_load_once_event = requestVB("grid_load_once_event");
	$chartKey = requestVB("chartKey");
	$chartNumberColumns = requestVB("chartNumberColumns");
	$chartOrderBy = requestVB("chartOrderBy");
	$chartTop = requestVB("chartTop");
	if ($chartTop == '')
		$chartTop = 15;

	$resultMessage = '';
	$recently = '';
	$isDeleteList = '';
	$allFilter = '';

	$isDeleteList = requestVB("isDeleteList");      //경우에 따라 post / get

	$app = requestVB("app");
	$backup = requestVB("backup");
	$filter = requestVB('$filter');  //사용자 로직에서만 사용함.


	if (requestVB("allFilter") != "") {
		$allFilter = requestVB("allFilter");
		$recently = requestVB("recently");

		$allFilter = '{"entries":' . $allFilter . '}';

	}




	if (isset($_GET["idx"])) {
		$idx = $_GET["idx"];
	} else {
		$idx = '';
	}

	//idx_aliasName 의 값이 있을 경우, 특정필드에 대한 검색이라고 할 수 있다.
	if (isset($_GET["idx_aliasName"])) {
		$idx_aliasName = $_GET["idx_aliasName"];
	} else {
		$idx_aliasName = '';
	}

	$excel_where = '';

	if ($MS_MJ_MY == 'MY') {
		$strsql = "
		select 
		m.menuName
		,ifnull(g01,'') as g01
		,ifnull(g04,'') as g04
		,ifnull(g05,'') as g05
		,ifnull(g06,'') as g06
		,ifnull(g07,'') as g07
		,ifnull(g08,'') as g08
		,ifnull(g09,'') as g09
		,ifnull(g10,'') as g10
		,ifnull(g11,'') as g11
		,ifnull(g12,'') as g12
		,ifnull(g13,'') as g13
		,ifnull(dbalias,'') as dbalias
		,aliasName
		,Grid_Columns_Title
		,SortElement as SortElement 
		,ifnull(Grid_FormGroup,'') as Grid_FormGroup
		,ifnull(Grid_Columns_Width,'') as Grid_Columns_Width
		,ifnull(Grid_Align,'') as Grid_Align
		,ifnull(Grid_Orderby,'') as Grid_Orderby
		,ifnull(Grid_MaxLength,'') as Grid_MaxLength
		,ifnull(Grid_Default,'') as Grid_Default
		,ifnull(Grid_Select_Tname,'') as Grid_Select_Tname
		,ifnull(Grid_Select_Field,'') as Grid_Select_Field
		,ifnull(Grid_GroupCompute,'') as Grid_GroupCompute
		,ifnull(Grid_CtlName,'') as Grid_CtlName 
		,ifnull(Grid_IsHandle,'') as Grid_IsHandle
		,ifnull(Grid_Schema_Validation,'') as Grid_Schema_Validation
		,ifnull(Grid_PrimeKey,'') as Grid_PrimeKey
		,ifnull(Grid_Alim,'') as Grid_Alim
		,ifnull(Grid_Pil,'') as Grid_Pil
		,ifnull(Grid_Schema_Type,'') as Grid_Schema_Type
		from $MisMenuList_Detail d
		left outer join MisMenuList m on m.RealPid=d.RealPid
		where (d.sortelement<>999 or ifnull(d.Grid_Select_Field,'')!='') and ifnull(d.aliasName,'')<>'' and d.RealPid='" . $logicPid . "'  
		order by sortelement;
		";


	} else {
		$strsql = "
		select 
		m.menuName
		,m.g01
		,m.g04
		,m.g05
		,m.g06
		,m.g07
		,m.g08
		,m.g09
		,m.g10
		,m.g11
		,m.g12
		,m.g13
		,m.dbalias
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
		,d.Grid_IsHandle
		,d.Grid_Schema_Validation
		,d.Grid_PrimeKey
		,d.Grid_Alim
		,d.Grid_Pil
		,d.Grid_Schema_Type
		from $MisMenuList_Detail d
		left outer join MisMenuList m on m.RealPid=d.RealPid
		where (d.sortelement<>999 or d.Grid_Select_Field!='') and d.aliasName<>'' and d.RealPid='$logicPid'  
		order by sortelement;
		";


	}


	//echo  $strsql;
	//exit;
	$speed_fieldIndx = [];
	$speed_Grid_Schema_Type = [];
	$contentList = ";";
	$selectQuery = '';
	$table_m = '';
	$join_sql = '';
	$where_sql = "where 9=9 ";

	$json_codeSelect = [];
	$defaultList = [];

	$addLogic_msg = '';


	$result = allreturnSql($strsql);
	if (function_exists("misMenuList_change")) {
		misMenuList_change();
	}

	connectDB_dbalias($pro_dbalias);
	if ($pro_dbalias == '' && $MS_MJ_MY == 'MY')
		$pro_dbalias = '1st';		//과제



	$idx_FullFieldName = '';

	$mm = 0;

	$aliasNameAll = ";";
	$parent_alias = '';
	$idx_field = '';

	$waitRun = 'Y';
	$orderbyQuery = "order by ";
	$orderby = requestVB('$orderby');

	$cnt_result = count($result);
	while ($mm < $cnt_result) {
		//print_r($mm . ":" . $result[$mm]["Grid_Align"]);

		if ($table_m == "") {
			$menuName = $result[$mm]['menuName'];
			$read_only_condition = Trim($result[$mm]['g04']);          //읽기전용조건
			$brief_insertsql = $result[$mm]['g05'];          //간편추가쿼리
			$seekDate = $result[$mm]['g06'];          //기간검색항목명
			$Read_Only = $result[$mm]['g07'];          //읽기전용
			$table_m = $result[$mm]['g08'];          //테이블명
			$excel_where = $result[$mm]['g09'];          //기본필터
			$excel_where_ori = $excel_where;
			$useflag_sql = $result[$mm]['g10'];           //use조건
			$delflag_sql = $result[$mm]['g11'];           //삭제쿼리
			$isThisChild = $result[$mm]['g12'];           //아들여부
			$child_gubun = $result[$mm]['g13'];           //아들구분값



			if ($isDeleteList == 'Y') {
				$where_sql = $where_sql . ' and table_m.' . $delflag_sql . "\n";
			} else if ($useflag_sql == '') {
				$where_sql = $where_sql . " and table_m.useflag='1'\n";
			} else {
				$where_sql = $where_sql . " and $useflag_sql \n";
			}

		}


		$Grid_Columns_Title = $result[$mm]['Grid_Columns_Title'];
		$Grid_Columns_Title = str_replace(':', '', $Grid_Columns_Title);

		$Grid_FormGroup = $result[$mm]['Grid_FormGroup'];
		$Grid_Columns_Width = $result[$mm]['Grid_Columns_Width'];
		$Grid_Orderby = $result[$mm]['Grid_Orderby'];
		$Grid_MaxLength = $result[$mm]['Grid_MaxLength'];
		$Grid_PrimeKey = $result[$mm]['Grid_PrimeKey'];
		$Grid_Default = $result[$mm]['Grid_Default'];
		$Grid_Select_Tname = $result[$mm]['Grid_Select_Tname'];
		$Grid_Select_Field = $result[$mm]['Grid_Select_Field'];
		$Grid_CtlName = $result[$mm]['Grid_CtlName'];



		if ($Grid_CtlName == 'attach') {
		} else if ($Grid_CtlName == 'textencrypt') {
			$Grid_Select_Tname = '';
			$Grid_Select_Field = "'[암호화]'";
		} else if ($Grid_CtlName == 'textdecrypt') {
			$Grid_Select_Tname = '';
			$Grid_Select_Field = "'[암호화]'";
		} else if ($Grid_CtlName == 'textdecrypt2') {
			$Grid_Select_Tname = '';
			$Grid_Select_Field = "'[암호화]'";
		}



		$aliasName = $result[$mm]['aliasName'];


		if ($Grid_Select_Tname == 'table_m') {
			$FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
		} else if ($Grid_Select_Tname != '') {
			/*
			//차후과제!!!!!!!!!
			if($result[$mm+1]["Grid_PrimeKey"]!="") {
				//$Grid_Select_Field = 
				if(InStr($result[$mm+1]["Grid_PrimeKey"], "@outer_tbname")>0) {
					$FullFieldName = str_replace(explode($result[$mm+1]["Grid_PrimeKey"],"#")[0], "@outer_tbname", $Grid_Select_Tname);
				} else {
					$FullFieldName = $Grid_Select_Tname . "." . $Grid_Select_Field;
				}
			} else {
			}
			*/
			$FullFieldName = $Grid_Select_Tname . '.' . $Grid_Select_Field;
		} else {
			$FullFieldName = $Grid_Select_Field;
		}
		if ($mm == 0 && $Grid_Columns_Width != -1) {
			$idx_FullFieldName = $FullFieldName;
			$key_aliasName = $aliasName;
			$parent_alias = $aliasName;
		} else if ($mm == 0) {
			$key_aliasName = $result[1]['aliasName'];
		} else if ($mm == 1 && $idx_FullFieldName == '') {
			$idx_FullFieldName = $FullFieldName;
			$key_aliasName = $aliasName;
			$parent_alias = $aliasName;
		}




		$Grid_GroupCompute = $result[$mm]['Grid_GroupCompute'];
		$Grid_IsHandle = $result[$mm]['Grid_IsHandle'];
		$Grid_Schema_Validation = $result[$mm]['Grid_Schema_Validation'];
		$Grid_Alim = $result[$mm]['Grid_Alim'];
		$Grid_Pil = $result[$mm]['Grid_Pil'];
		$Grid_Schema_Type = $result[$mm]['Grid_Schema_Type'];


		if ($Grid_GroupCompute != '') {
			$join_sql = $join_sql . 'left outer join ' . $Grid_GroupCompute . "\n";
		}
		$join_sql = str_replace('  ', ' ', $join_sql);
		if ($Grid_PrimeKey != '') {
			$temp1 = explode('#', $Grid_PrimeKey);
			$join_sql = $join_sql . 'left outer join ' . $temp1[1] . ' ' . $pre_Grid_Select_Tname . ' on ' . $pre_Grid_Select_Tname . '.'
				. $temp1[3] . ' = ' . $Grid_Select_Tname . '.' . $Grid_Select_Field . "\n";

			if (count($temp1) >= 5) {

				//이 경우, 수정/입력 때만 사용(json_codeSelect.php)
				if (InStr($temp1[4], '@idx') > 0) {
					//과제. InStr($temp1[4], '@idx') 를 찾아볼것.

				} else if (InStr($temp1[4], '@outer_tbname') > 0) {
					$join_sql = $join_sql . ' and (' . str_replace('@outer_tbname', $pre_Grid_Select_Tname, $temp1[4]) . ')' . "\n";
				} else {
					$join_sql = $join_sql . ' and ' . $pre_Grid_Select_Tname . '.' . $temp1[4] . "\n";
				}
			}
			//echo $join_sql;

			if ($Grid_MaxLength != '') {
				if ($MS_MJ_MY2 == 'MY') {
					$temp2 =
						"select concat(" . $temp1[0] . ",' | '," . $temp1[3] . ") as codename from " . $temp1[1]
						. " as " . $pre_Grid_Select_Tname;
					if (count($temp1) >= 5) {
						if (InStr($temp1[4], '@outer_tbname') > 0) {
							$temp2 = $temp2 . ' where (' . str_replace('@outer_tbname', $pre_Grid_Select_Tname, $temp1[4]) . ')';
						} else {
							$temp2 = $temp2 . ' where ' . $pre_Grid_Select_Tname . '.' . $temp1[4];
						}
					}
				} else {
					$temp2 =
						"select " . $temp1[0] . "+' | '+" . $temp1[3] . " as codename from " . $temp1[1]
						. " as " . $pre_Grid_Select_Tname;
					if (count($temp1) >= 5) {
						if (InStr($temp1[4], '@outer_tbname') > 0) {
							$temp2 = $temp2 . ' where (' . str_replace('@outer_tbname', $pre_Grid_Select_Tname, $temp1[4]) . ')';
						} else {
							$temp2 = $temp2 . ' where ' . $pre_Grid_Select_Tname . '.' . $temp1[4];
						}
					}
				}
				$json_codeSelect[$pre_aliasName] = $temp2;
				//kname#MisCommonTable#1#kcode#gcode='speedmis000338'
			}


		}

		//if($Grid_Default!='' && $_GET["flag"]=="formAdd") {
		//    $defaultList[$aliasName] = str_replace(str_replace($Grid_Default,"@RealPid",$RealPid),"@date",date("Y-m-d"));
		//}

		//echo ":MS_MJ_MY2=$MS_MJ_MY2;MS_MJ_MY=$MS_MJ_MY;pro_dbalias=$pro_dbalias;dbalias=$dbalias;";

		if ($pro_dbalias != '' && $MS_MJ_MY2 == 'MY') {
			if (($flag == 'readResult' || $flag == 'read') && $Grid_Schema_Type == 'date') {
				//목록조회 및 순수필드일 경우, 컨버팅
				if (InStr($FullFieldName, '(') == 0)
					$FullFieldName = 'date_format(' . $FullFieldName . ",'%Y-%m-%d')";
			} else if ($Grid_Schema_Type == 'date' || $Grid_Schema_Type == 'datetime') {
				//목록조회 및 순수필드일 경우, 컨버팅
				if (InStr($FullFieldName, '(') == 0)
					$FullFieldName = 'date_format(' . $FullFieldName . ",'%Y-%m-%d %H:%i:%s')";
			}
		} else if ($pro_dbalias != '' && $MS_MJ_MY2 == 'OC') {
			if (($flag == 'readResult' || $flag == 'read') && $Grid_Schema_Type == 'date') {
				//목록조회 및 순수필드일 경우, 컨버팅
				if (InStr($FullFieldName, '(') == 0)
					$FullFieldName = 'to_char(' . $FullFieldName . ",'yyyy-mm-dd')";
			} else if ($Grid_Schema_Type == 'date' || $Grid_Schema_Type == 'datetime') {
				//목록조회 및 순수필드일 경우, 컨버팅
				if (InStr($FullFieldName, '(') == 0)
					$FullFieldName = 'to_char(' . $FullFieldName . ",'yyyy-mm-dd hh24:mi:ss')";
			}
		} else {
			if (($flag == 'readResult' || $flag == 'read') && $Grid_Schema_Type == 'date') {
				//목록조회 및 순수필드일 경우, 컨버팅
				if (InStr($FullFieldName, '(') == 0)
					$FullFieldName = 'convert(char(10),' . $FullFieldName . ',120)';
			} else if ($Grid_Schema_Type == 'date' || $Grid_Schema_Type == 'datetime') {
				//목록조회 및 순수필드일 경우, 컨버팅
				if (InStr($FullFieldName, '(') == 0)
					$FullFieldName = 'convert(char(16),' . $FullFieldName . ',120)';
			}
		}



		if ($waitRun == 'Y' && ($recently == 'Y' || $orderby == '')) {
			$orderby = $aliasName . ' desc';
			$waitRun = 'N';
			//echo $orderby;
		}

		if ($selectQuery == '') {
			if ($MS_MJ_MY2 == 'MS' || $MS_MJ_MY2 == 'MJ') {
				$selectQuery = "select top 1 " . $FullFieldName . " as \"" . $aliasName . "\"\n";
			} else {
				$selectQuery = "select " . $FullFieldName . " as \"" . $aliasName . "\"\n";
			}
		} else {
			if ($Grid_Select_Tname == 'virtual_field') {
			} else if ($pro_dbalias != '' && $MS_MJ_MY2 == 'OC') {
				if ($Grid_Schema_Type == 'content') {
					for ($i = 0; $i < 200; $i++) {
						$selectQuery = $selectQuery . ",dbms_lob.substr($FullFieldName,4000," . ($i * 4000 + 1) . ") as \"" . ($aliasName . "_" . ($i + 1)) . "\"\n";
					}
					$contentList = $contentList . $aliasName . ';';
					$Grid_Schema_Type = '';
				} else {
					$selectQuery = $selectQuery . ',' . $FullFieldName . " as \"" . $aliasName . "\"\n";
				}
			} else {
				$selectQuery = $selectQuery . ',' . $FullFieldName . " as \"" . $aliasName . "\"\n";
			}
		}



		$speed_fieldIndx[$aliasName] = $FullFieldName;
		$speed_Grid_Schema_Type[$aliasName] = $Grid_Schema_Type;

		if ($mm == 0 && $Grid_Columns_Width != -1)
			$idx_field = $Grid_Select_Field;
		else if ($mm == 1) {
			if ($idx_field == '')
				$idx_field = $Grid_Select_Field;
			if ($Grid_Select_Tname != '')
				$parent_field = $Grid_Select_Tname . '.' . $Grid_Select_Field;
			else
				$parent_field = $Grid_Select_Field;
		} else if ($mm == 2) {
			if (InStr($parent_idx, '_-_') > 0) {
				$parent_field = "concat($parent_field,'_-_',$Grid_Select_Tname.$Grid_Select_Field)";
			}
		}

		$pre_Grid_Select_Tname = $Grid_Select_Tname;
		$pre_aliasName = $aliasName;

		++$mm;
	}



	if ($pro_dbalias != '' && $MS_MJ_MY2 == 'OC') {
		$selectQuery = $selectQuery . "from \"" . $table_m . "\" table_m\n";
	} else {
		$selectQuery = $selectQuery . "from " . $table_m . " table_m\n";
	}

	$joinAndWhere = $join_sql . $where_sql . $excel_where;
	if ($parent_idx != '') {
		/*
		if(InStr($parent_field,'.')==0) {
			$joinAndWhere = $joinAndWhere . " and $parent_field = '$parent_idx' ";
		} else {
			$joinAndWhere = $joinAndWhere . " and $parent_field = '$parent_idx' ";
		}
		*/
		$joinAndWhere = $joinAndWhere . " and $parent_field = '$parent_idx' ";
	}
	if ($idx != "")
		$joinAndWhere = $joinAndWhere . ' and ' . $idx_FullFieldName . " = N'$idx' ";

	$selectQueryAll = '';
	$keyword = '';
	$filterQuery = '';
	$countQuery = '';
	if ($allFilter != "") {
		//allFilter: {"entries":[{"operator":"eq","value":"01 업무관리","field":"zsangwimenyubyeolbogi"}]}

		foreach (json_decode($allFilter)->entries as $row) {
			$field_alias = str_replace('toolbarSel_', '', str_replace('toolbar_', '', $row->field));
			$realField = $speed_fieldIndx[$field_alias];
			$keyword = Trim(sqlValueReplace($row->value));

			if ($row->operator == "contains") {
				if (InStr($keyword, ",,") > 0) {
					if (Right($keyword, 2) == ",,")
						$keyword = Left($keyword, Len($keyword) - 2);
					$or_sql = '';
					$split_keyword = explode(',,', $keyword);

					$cnt_split_keyword = count($split_keyword);
					for ($n = 0; $n < $cnt_split_keyword; $n++) {
						if ($n > 0)
							$or_sql = $or_sql . " or ";
						$or_sql = $or_sql . $realField . " = N'" . $split_keyword[$n] . "'";
						if ($split_keyword[$n] == '')
							$or_sql = $or_sql . " or " . $realField . " is null";
					}
					$filterQuery = $filterQuery . ' and (' . $or_sql . ")";
				} else if (InStr($row->field, 'toolbarSel_') == 0 && (Left($keyword, 1) == "=" || Left($keyword, 1) == ">" || Left($keyword, 1) == "<") && InStr(Mid($keyword, 3, 100), '<') + InStr(Mid($keyword, 3, 100), '>') == 0) {
					if (Mid($keyword, 2, 1) == "=")
						$mark = Left($keyword, 2);
					else
						$mark = Left($keyword, 1);

					$keyword = explode($mark, $keyword)[1];
					$purekeyword = explode(' ', $keyword)[0];
					if (!is_numeric($purekeyword))
						$keyword = str_replace($purekeyword, "N'$purekeyword'", $keyword);
					$filterQuery = $filterQuery . ' and (' . $realField . $mark . $keyword . ")";

					if (InStr($keyword, ' or ') > 0 || InStr($keyword, ' and ') > 0) {
						if (InStr($keyword, ' or ') > 0)
							$andOr = ' or ';
						else
							$andOr = ' and ';
						$newkeyword = explode($andOr, $keyword)[1];
						if (Left($newkeyword, 1) == '=' || Left($newkeyword, 1) == '>' || Left($newkeyword, 1) == '<') {

							if (Mid($newkeyword, 2, 1) == '=')
								$newmark = Left($newkeyword, 2);
							else
								$newmark = Left($newkeyword, 1);

							$newkeyword = explode($newmark, $newkeyword)[1];
							if (!is_numeric($newkeyword))
								$newkeyword = "N'" . $newkeyword . "'";
							$filterQuery = str_replace(
								" and (" . $realField . $mark . $keyword . ")",
								" and ((" . $realField . $mark . explode($andOr, $keyword)[0] . ")$andOr(" . $realField . $newmark . $newkeyword . "))",
								$filterQuery
							);
						}
					}
				} else {
					//Grid_Schema_Type
					if ($speed_Grid_Schema_Type[str_replace('toolbarSel_', '', str_replace('toolbar_', '', $row->field))] == 'boolean') {
						if ($keyword == 'true')
							$keyword = 1;
						else if ($keyword == 'false')
							$keyword = 0;
					}
					if ($keyword != '')
						$filterQuery = $filterQuery . " and $isnull(" . $realField . ",'') like N'%" . $keyword . "%'";
				}
			} else if ($row->operator == "eq") {
				if ($keyword == '(BLANK)') {
					$filterQuery = $filterQuery . ' and (' . $realField . " is null or " . $realField . " = N'')";
				} else {
					$filterQuery = $filterQuery . " and $isnull(" . $realField . ",'') = N'" . $keyword . "'";
				}
			} else if ($row->operator == 'startswith') {
				$filterQuery = $filterQuery . ' and ' . $realField . " like N'" . $keyword . "%'";
			} else if ($row->operator == 'endswith') {
				$filterQuery = $filterQuery . ' and ' . $realField . " like N'%" . $keyword . "'";
			} else if ($row->operator == 'doesnotcontain') {
				$filterQuery = $filterQuery . ' and ' . $realField . " not like N'%" . $keyword . "%'";
			} else {
				$keyword1 = '';
				$keyword2 = '';
				$operator1 = '>=';
				$operator2 = '<=';

				if ($row->operator == 'gt') {
					$keyword1 = $keyword;
					$operator1 = '>';
				} else if ($row->operator == 'gte') {
					$keyword1 = $keyword;
				} else if ($row->operator == 'lt') {
					$keyword2 = $keyword;
					$operator2 = '<';
				} else if ($row->operator == 'lte') {
					$keyword2 = $keyword;
				} else if ($row->operator == 'between') {
					$keyword1 = explode('~', $keyword)[0];
					$keyword2 = explode('~', $keyword)[1];
				} else {
					echo gzencode('알수없는 operator 로 인해 중지합니다.');
					exit;
				}

				if (Left($speed_Grid_Schema_Type[$field_alias], 8) == 'datetime') {
					if ($keyword1 != '') {
						$filterQuery = $filterQuery . ' and ' . $realField . $operator1 . " N'" . $keyword1 . "'";
					}
					if (is_date($keyword2)) {
						$filterQuery = $filterQuery . ' and ' . $realField . $operator2 . " N'" . $keyword2 . " 23:59:59'";
					} else if ($keyword2 != '') {
						$filterQuery = $filterQuery . ' and ' . $realField . $operator2 . " N'" . $keyword2 . "'";
					}
				} else if (Left($speed_Grid_Schema_Type[$field_alias], 6) == 'number') {
					$keyword1 = str_replace(',', '', $keyword1);
					$keyword2 = str_replace(',', '', $keyword2);
					if (is_numeric($keyword1)) {
						$filterQuery = $filterQuery . ' and ' . $realField . $operator1 . $keyword1 . " ";
					} else if ($keyword1 != '') {
						$filterQuery = $filterQuery . ' and ' . $realField . $operator1 . " N'" . $keyword1 . "'";
					}
					if (is_numeric($keyword2)) {
						$filterQuery = $filterQuery . ' and ' . $realField . $operator2 . $keyword2 . " ";
					} else if ($keyword2 != '') {
						$filterQuery = $filterQuery . ' and ' . $realField . $operator2 . " N'" . $keyword2 . "'";
					}
				} else {
					if ($keyword1 != '') {
						$filterQuery = $filterQuery . ' and ' . $realField . $operator1 . " N'" . $keyword1 . "'";
					}
					if ($keyword2 != '') {
						$filterQuery = $filterQuery . ' and ' . $realField . $operator2 . " N'" . $keyword2 . "'";
					}
				}
			}

		}

	}

	if ($filterQuery != '')
		$selectQueryAll = $selectQuery . $joinAndWhere;

	$tt0 = explode('where 9=9', $joinAndWhere);
	$tt1 = $tt0[0];
	$tt2 = $tt0[1] . $filterQuery;


	$selectQuery = $selectQuery . $joinAndWhere . $filterQuery;

	$selectQuery = $selectQuery . " order by 1 desc\n";

	if ($MS_MJ_MY2 == 'MY' || $MS_MJ_MY2 == 'OC') {
		$selectQuery = $selectQuery . " limit 1;\n";
	}

	$selectQuery = str_replace('@MisSession_UserID', $MisSession_UserID, $selectQuery);
	$selectQuery = str_replace('@MisSession_PositionCode', $MisSession_PositionCode, $selectQuery);
	$selectQuery = str_replace('@RealPid', $RealPid, $selectQuery);
	$selectQuery = str_replace('@parent_RealPid', $parent_RealPid, $selectQuery);
	$selectQuery = str_replace('@MisSession_StationNum', $MisSession_StationNum, $selectQuery);
	//echo $selectQuery;exit;
	return $selectQuery;
}


function cropImage($src, $dest, $x, $y, $width, $height)
{
	// 원본 이미지 로드 (JPEG 파일)
	$img = imagecreatefromjpeg($src);
	if (!$img) {
		return false;
	}

	// 잘라낼 영역 설정
	$cropArray = [
		'x' => $x,
		'y' => $y,
		'width' => $width,
		'height' => $height
	];

	// 이미지의 특정 영역 잘라내기
	$croppedImg = imagecrop($img, $cropArray);
	if ($croppedImg !== false) {
		// 잘라낸 이미지를 파일로 저장
		imagejpeg($croppedImg, $dest);
		imagedestroy($croppedImg);
		imagedestroy($img);
		return true;
	} else {
		imagedestroy($img);
		return false;
	}
}

function resize_image($departure, $destination, $size, $quality = '80', $ratio = 'false')
{


	if ($size[2] == 1)    //-- GIF 
		$src = imagecreatefromgif($departure);
	elseif ($size[2] == 2) //-- JPG 
		$src = imagecreatefromjpeg($departure);
	else    //-- $size[2] == 3, PNG 
		$src = imagecreatefrompng($departure);

	$dst = imagecreatetruecolor($size['w'], $size['h']);


	$dstX = 0;
	$dstY = 0;
	$dstW = $size['w'];
	$dstH = $size['h'];

	if ($ratio != 'false' && $size['w'] / $size['h'] <= $size[0] / $size[1]) {
		$srcX = ceil(($size[0] - $size[1] * ($size['w'] / $size['h'])) / 2);
		$srcY = 0;
		$srcW = $size[1] * ($size['w'] / $size['h']);
		$srcH = $size[1];
	} elseif ($ratio != 'false') {
		$srcX = 0;
		$srcY = ceil(($size[1] - $size[0] * ($size['h'] / $size['w'])) / 2);
		$srcW = $size[0];
		$srcH = $size[0] * ($size['h'] / $size['w']);
	} else {
		$srcX = 0;
		$srcY = 0;
		$srcW = $size[0];
		$srcH = $size[1];
	}

	@imagecopyresampled($dst, $src, $dstX, $dstY, $srcX, $srcY, $dstW, $dstH, $srcW, $srcH);
	@imagejpeg($dst, $destination, $quality);
	@imagedestroy($src);
	@imagedestroy($dst);

	return TRUE;
}
function view_round_area_apply($p_start_field, $p_end_field, $p_width, $p_height)
{
	global $control_all, $speed_fieldIndx, $result, $search_index;
	$search_index = array_search($p_end_field, array_column($result, 'aliasName'));
	$p_end_field = $result[$search_index + 1]['aliasName'];
	$control_all['기본폼'] = replace(
		$control_all['기본폼'],
		'<div id="round_' . $p_start_field . '"',
		'
<div id="round_' . $p_start_field . $p_end_field . '" class="view_round form-group round_textarea  row col-xxs-12 col-xs-12 col-sm-' . $p_width . ' row-' . $p_height . '" data-role="validator">
<div id="round_' . $p_start_field . '"
'
	);

	$control_all['기본폼'] = replace(
		$control_all['기본폼'],
		'<div id="round_' . $p_end_field . '"',
		'</div><!--end--><div id="round_' . $p_end_field . '"
'
	);
}

// $img : 원본이미지 
// $m : 목표크기 pixel 
// $ratio : 비율 강제설정 
function _getimagesize($img, $m, $ratio = 'false')
{

	$v = @getImageSize($img);

	if ($v === FALSE || $v[2] < 1 || $v[2] > 3)
		return FALSE;

	$m = intval($m);

	if ($m > $v[0] && $m > $v[1])
		return array_merge($v, array("w" => $v[0], "h" => $v[1]));

	if ($ratio != 'false') {
		$xy = explode(':', $ratio);
		return array_merge($v, array("w" => $m, "h" => ceil($m * intval(trim($xy[1])) / intval(trim($xy[0])))));
	} elseif ($v[0] > $v[1]) {
		$t = $v[0] / $m;
		$s = floor($v[1] / $t);
		$m = ($m > 0) ? $m : 1;
		$s = ($s > 0) ? $s : 1;
		return array_merge($v, array("w" => $m, "h" => $s));
	} else {
		$t = $v[1] / intval($m);
		$s = floor($v[0] / $t);
		$m = ($m > 0) ? $m : 1;
		$s = ($s > 0) ? $s : 1;
		return array_merge($v, array("w" => $s, "h" => $m));
	}
}


function serverTransfer($path)
{
	if (ob_get_length() > 0) {
		ob_end_clean();
	}
	require_once($path);
	exit;
}

function updateEvent1_lastupdate_add_default($dbalias)
{
	global $os, $externalDB, $database2, $MS_MJ_MY, $MS_MJ_MY2, $DbServerName2, $base_db2, $DbID2, $DbPW2;
	if ($dbalias == 'default')
		$dbalias = '';
	if ($MS_MJ_MY == 'MY' && $dbalias == '')
		$dbalias = '1st';

	if ($dbalias != '') {
		connectDB_dbalias($dbalias);
		if ($MS_MJ_MY2 == 'MY') {
			//$sql = "select count(*) from information_schema.tables where TABLE_NAME='$p_table' and TABLE_SCHEMA='$base_db2'";
			$sql = "select date_format(wdate,'%Y-%m-%d') from MisMenuList where idx=314";
			if (onlyOnereturnSql_gate($sql, $dbalias) == '2005-03-23')
				return false;
			$sql = "
			select TABLE_NAME, COLUMN_DEFAULT from INFORMATION_SCHEMA.COLUMNS 
			where column_name='lastupdate' and TABLE_NAME in (select TABLE_NAME from information_schema.tables where TABLE_SCHEMA='$base_db2')
			";  // and isnull(COLUMN_DEFAULT,'')<>'(getdate())'

			$result = allreturnSql_gate($sql, $dbalias);

			$sql = '';
			for ($i = 0; $i < count($result); $i++) {
				$TABLE_NAME = $result[$i]['TABLE_NAME'];
				$COLUMN_DEFAULT = $result[$i]['COLUMN_DEFAULT'];
				if ($COLUMN_DEFAULT != 'CURRENT_TIMESTAMP') {
					$sql = $sql . " 
					ALTER TABLE `$TABLE_NAME` MODIFY COLUMN lastupdate DATETIME DEFAULT CURRENT_TIMESTAMP;
					";
				}
				$sql = $sql . " 
				update `$TABLE_NAME` set lastupdate=wdate where lastupdate is null;
				update `$TABLE_NAME` set wdate=lastupdate where lastupdate is not null and wdate is null;
				";

			}
		} else if ($MS_MJ_MY2 == 'OC') {
			//$sql = "select count(*) from user_tables where table_name='$p_table'";
		} else {
			$sql = "select convert(char(10),isnull(wdate,'2020-01-01'),120) from MisMenuList where idx=314";
			if (onlyOnereturnSql($sql) == '2005-03-23')
				return false;
			$sql = "
			select TABLE_NAME, COLUMN_DEFAULT from INFORMATION_SCHEMA.COLUMNS 
			where column_name='lastupdate'
			";	//and isnull(COLUMN_DEFAULT,'')<>'(getdate())'

			$result = allreturnSql_gate($sql, $dbalias);

			$sql = '';
			for ($i = 0; $i < count($result); $i++) {
				$TABLE_NAME = $result[$i]['TABLE_NAME'];
				$COLUMN_DEFAULT = $result[$i]['COLUMN_DEFAULT'];
				if ($COLUMN_DEFAULT != '(getdate())') {
					$sql = $sql . " 
					ALTER TABLE [$TABLE_NAME] ADD CONSTRAINT [DF_$TABLE_NAME] DEFAULT GETDATE() FOR lastupdate
					";
				}
				$sql = $sql . " 
					update [$TABLE_NAME] set lastupdate=wdate where lastupdate is null
				";

			}
		}
	} else {

		$sql = "select convert(char(10),isnull(wdate,'2020-01-01'),120) from MisMenuList where idx=314";
		if (onlyOnereturnSql($sql) == '2005-03-23')
			return false;
		$sql = "
		select TABLE_NAME, COLUMN_DEFAULT from INFORMATION_SCHEMA.COLUMNS 
		where column_name='lastupdate' and TABLE_NAME in (select name FROM sysobjects where type='U')
		";  // and isnull(COLUMN_DEFAULT,'')<>'(getdate())'

		$result = allreturnSql_gate($sql, $dbalias);

		$sql = '';
		for ($i = 0; $i < count($result); $i++) {
			$TABLE_NAME = $result[$i]['TABLE_NAME'];
			$COLUMN_DEFAULT = $result[$i]['COLUMN_DEFAULT'];
			if ($COLUMN_DEFAULT != '(getdate())') {
				$sql = $sql . " 
				ALTER TABLE [$TABLE_NAME] ADD CONSTRAINT [DF_$TABLE_NAME] DEFAULT GETDATE() FOR lastupdate
				";
			}
			$sql = $sql . " 
				update [$TABLE_NAME] set lastupdate=wdate where lastupdate is null
			";

		}
	}


	if ($sql != '') {
		$sql = $sql . " update MisMenuList set wdate='2005-03-23' where idx=314; ";
		execSql_gate($sql, $dbalias);

	}

}

function apply_full_siteID($p_sql)
{
	global $full_siteID;

	$p_sql = replace($p_sql, "vMis" . "WorkReport_Date", "vMis__" . $full_siteID . "__WorkReport_Date");
	$p_sql = replace($p_sql, "vMis" . "WorkReport", "vMis__" . $full_siteID . "__WorkReport");
	$p_sql = replace($p_sql, "vMis" . "TeamTree", "vMis__" . $full_siteID . "__TeamTree");
	$p_sql = replace($p_sql, "vMis" . "TableFieldList", "vMis__" . $full_siteID . "__TableFieldList");
	$p_sql = replace($p_sql, "Mis" . "WorkTree_Ordering_Proc", "Mis__" . $full_siteID . "__WorkTree_Ordering_Proc");
	$p_sql = replace($p_sql, "Mis" . "WorkTree", "Mis__" . $full_siteID . "__WorkTree");
	$p_sql = replace($p_sql, "Mis" . "WorkReport", "Mis__" . $full_siteID . "__WorkReport");
	$p_sql = replace($p_sql, "Mis" . "Utils", "Mis__" . $full_siteID . "__Utils");
	$p_sql = replace($p_sql, "Mis" . "User_Authority_Proc", "Mis__" . $full_siteID . "__User_Authority_Proc");
	$p_sql = replace($p_sql, "Mis" . "User", "Mis__" . $full_siteID . "__User");
	$p_sql = replace($p_sql, "Mis" . "Urls", "Mis__" . $full_siteID . "__Urls");
	$p_sql = replace($p_sql, "Mis" . "UpdateCancel", "Mis__" . $full_siteID . "__UpdateCancel");
	$p_sql = replace($p_sql, "Mis" . "TempSql", "Mis__" . $full_siteID . "__TempSql");
	$p_sql = replace($p_sql, "Mis" . "TeamTree_Proc", "Mis__" . $full_siteID . "__TeamTree_Proc");
	$p_sql = replace($p_sql, "Mis" . "TeamTree_2024", "Mis__" . $full_siteID . "__TeamTree_2024");
	$p_sql = replace($p_sql, "Mis" . "TeamTree_2022", "Mis__" . $full_siteID . "__TeamTree_2022");
	$p_sql = replace($p_sql, "Mis" . "TeamTree", "Mis__" . $full_siteID . "__TeamTree");
	$p_sql = replace($p_sql, "Mis" . "Station_Ordering_Proc", "Mis__" . $full_siteID . "__Station_Ordering_Proc");
	$p_sql = replace($p_sql, "Mis" . "Station", "Mis__" . $full_siteID . "__Station");
	$p_sql = replace($p_sql, "Mis" . "SmsTreat", "Mis__" . $full_siteID . "__SmsTreat");
	$p_sql = replace($p_sql, "Mis" . "SMS_Master", "Mis__" . $full_siteID . "__SMS_Master");
	$p_sql = replace($p_sql, "Mis" . "SMS_Detail", "Mis__" . $full_siteID . "__SMS_Detail");
	$p_sql = replace($p_sql, "Mis" . "SMS_CallID", "Mis__" . $full_siteID . "__SMS_CallID");
	$p_sql = replace($p_sql, "Mis" . "Share", "Mis__" . $full_siteID . "__Share");
	$p_sql = replace($p_sql, "Mis" . "Schedule_meeting", "Mis__" . $full_siteID . "__Schedule_meeting");
	$p_sql = replace($p_sql, "Mis" . "Sample_부품내역", "Mis__" . $full_siteID . "__Sample_부품내역");
	$p_sql = replace($p_sql, "Mis" . "Sample_부품구매날짜", "Mis__" . $full_siteID . "__Sample_부품구매날짜");
	$p_sql = replace($p_sql, "Mis" . "Sample_부품구매", "Mis__" . $full_siteID . "__Sample_부품구매");
	$p_sql = replace($p_sql, "Mis" . "ReadList", "Mis__" . $full_siteID . "__ReadList");
	$p_sql = replace($p_sql, "Mis" . "Query_speedmis000864", "Mis__" . $full_siteID . "__Query_speedmis000864");
	$p_sql = replace($p_sql, "Mis" . "PhpExecSql_Proc", "Mis__" . $full_siteID . "__PhpExecSql_Proc");
	$p_sql = replace($p_sql, "Mis" . "PaymentMgt", "Mis__" . $full_siteID . "__PaymentMgt");
	$p_sql = replace($p_sql, "Mis" . "MyMenuListJson", "Mis__" . $full_siteID . "__MyMenuListJson");
	$p_sql = replace($p_sql, "Mis" . "Money_IO", "Mis__" . $full_siteID . "__Money_IO");
	$p_sql = replace($p_sql, "Mis" . "Money_AccountCode", "Mis__" . $full_siteID . "__Money_AccountCode");
	$p_sql = replace($p_sql, "Mis" . "Mobile", "Mis__" . $full_siteID . "__Mobile");
	$p_sql = replace($p_sql, "Mis" . "MessageLog", "Mis__" . $full_siteID . "__MessageLog");
	$p_sql = replace($p_sql, "Mis" . "MenuList_UserAuth", "Mis__" . $full_siteID . "__MenuList_UserAuth");
	$p_sql = replace($p_sql, "Mis" . "MenuList_pre", "Mis__" . $full_siteID . "__MenuList_pre");
	$p_sql = replace($p_sql, "Mis" . "MenuList_Member", "Mis__" . $full_siteID . "__MenuList_Member");
	$p_sql = replace($p_sql, "Mis" . "MenuList_Language", "Mis__" . $full_siteID . "__MenuList_Language");
	$p_sql = replace($p_sql, "Mis" . "MenuList_Detail_pre", "Mis__" . $full_siteID . "__MenuList_Detail_pre");
	$p_sql = replace($p_sql, "Mis" . "MenuList_Detail", "Mis__" . $full_siteID . "__MenuList_Detail");
	$p_sql = replace($p_sql, "Mis" . "MenuList", "Mis__" . $full_siteID . "__MenuList");
	$p_sql = replace($p_sql, "Mis" . "Log", "Mis__" . $full_siteID . "__Log");
	$p_sql = replace($p_sql, "Mis" . "IncomeMgt", "Mis__" . $full_siteID . "__IncomeMgt");
	$p_sql = replace($p_sql, "Mis" . "HomeImages", "Mis__" . $full_siteID . "__HomeImages");
	$p_sql = replace($p_sql, "Mis" . "HoliDayDefine", "Mis__" . $full_siteID . "__HoliDayDefine");
	$p_sql = replace($p_sql, "Mis" . "Help", "Mis__" . $full_siteID . "__Help");
	$p_sql = replace($p_sql, "Mis" . "Group_Member", "Mis__" . $full_siteID . "__Group_Member");
	$p_sql = replace($p_sql, "Mis" . "Group_Master", "Mis__" . $full_siteID . "__Group_Master");
	$p_sql = replace($p_sql, "Mis" . "Group_Detail_Proc", "Mis__" . $full_siteID . "__Group_Detail_Proc");
	$p_sql = replace($p_sql, "Mis" . "Group_Detail", "Mis__" . $full_siteID . "__Group_Detail");
	$p_sql = replace($p_sql, "Mis" . "Global_Language", "Mis__" . $full_siteID . "__Global_Language");
	$p_sql = replace($p_sql, "Mis" . "GetKendoDatetime", "Mis__" . $full_siteID . "__GetKendoDatetime");
	$p_sql = replace($p_sql, "Mis" . "FirstPhoto", "Mis__" . $full_siteID . "__FirstPhoto");
	$p_sql = replace($p_sql, "Mis" . "FavoriteMenu", "Mis__" . $full_siteID . "__FavoriteMenu");
	$p_sql = replace($p_sql, "Mis" . "EmailSkin", "Mis__" . $full_siteID . "__EmailSkin");
	$p_sql = replace($p_sql, "Mis" . "DocCompute_Detail", "Mis__" . $full_siteID . "__DocCompute_Detail");
	$p_sql = replace($p_sql, "Mis" . "DocCompute", "Mis__" . $full_siteID . "__DocCompute");
	$p_sql = replace($p_sql, "Mis" . "DevList", "Mis__" . $full_siteID . "__DevList");
	$p_sql = replace($p_sql, "Mis" . "CustCounsel_Master", "Mis__" . $full_siteID . "__CustCounsel_Master");
	$p_sql = replace($p_sql, "Mis" . "CustCounsel_Detail", "Mis__" . $full_siteID . "__CustCounsel_Detail");
	$p_sql = replace($p_sql, "Mis" . "Count", "Mis__" . $full_siteID . "__Count");
	$p_sql = replace($p_sql, "Mis" . "CompanyMgt", "Mis__" . $full_siteID . "__CompanyMgt");
	$p_sql = replace($p_sql, "Mis" . "CommonTable", "Mis__" . $full_siteID . "__CommonTable");
	$p_sql = replace($p_sql, "Mis" . "CommentsLike", "Mis__" . $full_siteID . "__CommentsLike");
	$p_sql = replace($p_sql, "Mis" . "Comments", "Mis__" . $full_siteID . "__Comments");
	$p_sql = replace($p_sql, "Mis" . "BoardArticle", "Mis__" . $full_siteID . "__BoardArticle");
	$p_sql = replace($p_sql, "Mis" . "BackupList", "Mis__" . $full_siteID . "__BackupList");
	$p_sql = replace($p_sql, "Mis" . "Attend", "Mis__" . $full_siteID . "__Attend");
	$p_sql = replace($p_sql, "Mis" . "AttachList_refresh_Proc", "Mis__" . $full_siteID . "__AttachList_refresh_Proc");
	$p_sql = replace($p_sql, "Mis" . "AttachList", "Mis__" . $full_siteID . "__AttachList");
	$p_sql = replace($p_sql, "Mis" . "ApplyAutority", "Mis__" . $full_siteID . "__ApplyAutority");
	$p_sql = replace($p_sql, "Mis" . "DocFolder", "Mis__" . $full_siteID . "__DocFolder");

	return $p_sql;

}

$google_client_id = '';
$facebook_param = '';
$beginner_stationNum = '';
?>