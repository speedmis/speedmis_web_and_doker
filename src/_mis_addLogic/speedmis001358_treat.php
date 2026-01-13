<?php

//header('Content-type: application/pdf');
header("Cache-Control: no-cache");
header("Pragma: no-cache");
//header("Content-Disposition: inline;filename=myfile.pdf'");
//header("Content-length: ".strlen($pdf_contents));
?>
<?php include "../_mis/MisCommonFunction.php";?>
<?php include "../_mis_uniqueInfo/config_siteinfo.php";?>
<?php 

    $MisSession_UserID = "";
    accessToken_check();



	$blob_url = file_get_contents_new($ServerVariables_QUERY_STRING);
	$blob_url = splitVB(splitVB($blob_url, 'moved <A HREF="')[1], '"')[0];

	$blob_string = file_get_contents_new($blob_url);

//$blob_string = splitVB($blob_string, '"blob":"')[1];
	//$blob_string = Left($blob_string, Len($blob_string.length) - 3);
	echo $blob_string;

?>