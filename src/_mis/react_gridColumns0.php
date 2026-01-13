<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Content-Type:application/json; charset=UTF-8");
?>[
  {"field": "idx", "filter": "numeric", "title": "idx", "width": "80px"},
  {"field": "sincheongnaljja", "title": "신청일자2", "width": "120px"},
  {"field": "saeopjang1", "title": "사업장1", "width": "100px"},
  {"field": "saeopjang2", "title": "사업장2", "width": "200px"},
  {"field": "pummokkodeu", "title": "품목명", "width": "400px"},
  {"field": "dangga", "filter": "numeric", "format": "{0:c}", "title": "품목명", "width": "200px"},
  {"field": "suryang", "filter": "numeric", "title": "수량", "width": "200px"}
]