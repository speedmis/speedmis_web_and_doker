<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

include 'MisCommonFunction.php';
include '../_mis_uniqueInfo/config_siteinfo.php';
include 'MisCommonFunctionPlus.php';

error_reporting(E_ALL);
ini_set("display_errors", 1);

$img_url = splitVB($ServerVariables_QUERY_STRING, '?')[0];

//1.실제경로와 생성일자 구하기
$image = $base_root . urldecode($img_url);
$image = replace($image, '//', '/');


$image = my_physical_path($image);


if (InStr($img_url, '.') > 0 && file_exists($image)) {
   $image_date = date("Y-m-d H:i:s.", filemtime($image));
} else {
   $image_blank = $base_root . '/_mis/img/blank.png';
   header('Content-Type: image/png');
   serverTransfer($image_blank);
   exit;
}
//echo "$image 기준파일생성일 : $image_date <br>";


//2.섬네일존재 및 생성일자 구하기
$thumb = $image . '_mini.png';

$isMake = false;
if (file_exists($thumb)) {
   $thumb_date = date("Y-m-d H:i:s.", filemtime($thumb));
   //echo "섬네일생성일 : $thumb_date <br>";
   if ($image_date > $thumb_date)
      $isMake = true;
} else {
   $isMake = true;
}
if ($isMake == true) {
   $get_size = _getimagesize($image, 200, 'false');

   try {

      resize_image($image, $thumb, $get_size);

   } catch (Exception $e) {

      //resize 실패 시 원본출력
      header('Content-Type: image/png');
      //require_once($thumb);
      echo readfile($image);
      exit;

   }

}
header('Content-Type: image/png');
//require_once($thumb);
echo readfile($thumb);

?>