<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: text/html; charset=UTF-8');

error_reporting(E_ALL);
ini_set("display_errors", 1);

$gzip_YN = 'N';

include 'MisCommonFunction.php';




$db_expireDate = '';
$today = date_format(date_create(),"Y-m-d");
$db_expireDate = '2099-12-31';


$speedmis_addSource = 'BcHdlkJAAADgx6mOC0qSs1cYGaaUbKibPZjxM2yswcjT7/eRKWnWxVK98yYZyDpNGDnsfzDJWkzWqyZTzlnrcF0H/n77DcvHmyJrgeWz8Y0nLwIwYWzqblMLhm71zgEPobbIBhHQPTxf02UcWVA850DxSH8ieXw27Up7f+M8HqTZlkqr7AIIPhItxrlQvKdpKclLNuella4VhY/c/rXFZtgrvcY0NwL3pqNia+O71abHjvkXlrDUnTLBLxgLkHb8o5j0vz7xbpSLHo4/NYkvcuTXGlI1+ALeweaQNmd5xMM0SDIX8hmKKnZ4uMuS90tywlMQd4VHKZpKYKqyv0OyeuowrzSZmeJ9dA1J/Lxc7uvboMNe1EbYOPKGVtbRAReKbuhWF3FynR/Rrp9sfGu3vOpUeFhCy2gREJiOwR/c6akRizVcbTabr38=';
eval(dcode2(dcode1($speedmis_addSource)));
?>