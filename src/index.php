<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("charset=UTF-8");

include "_mis/MisCommonFunction.php";


if (file_exists("_mis_uniqueInfo/paidKey.php") == true) {
    re_direct("_mis/");
} else {
    re_direct("_mis/setup.php");
}
