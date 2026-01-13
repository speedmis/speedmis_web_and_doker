<?php
header("Content-Type:application/json; charset=UTF-8");

?>
<?php include 'MisCommonFunction.php';?>
<?php


error_reporting(E_ALL);
ini_set("display_errors", 1);



$btn_id = $_POST["btn_id"];

$WINDOWS_LINUX = $_POST["WINDOWS_LINUX"];   //1,2차 서버 공통.
$DbServerName = $_POST["DbServerName"];
$base_db = $_POST["base_db"];
$DbID = $_POST["DbID"];
$DbPW = $_POST["DbPW"];
$MS_MJ_MY = "MS";	// MS 로 정하고 자동으로 바뀌게 함.


$dbAlias = $_POST["dbAlias"];
$MS_MJ_MY = $_POST["MS_MJ_MY"];
$MS_MJ_MY2 = $_POST["MS_MJ_MY2"];   //2차 서버는 수동값
$DbServerName2 = $_POST["DbServerName2"];
$base_db2 = $_POST["base_db2"];
$DbID2 = $_POST["DbID2"];
$DbPW2 = $_POST["DbPW2"];


$errMsg = '';

if($btn_id=="btn_check_db") {
    if($DbServerName=="") {
        $errMsg = "정확한 Db Server Name 를 입력하세요!";
    } else if($base_db=="") {
        $errMsg = "정확한 DB Name 를 입력하세요!";
    } else if($base_db=="") {
        $errMsg = "정확한 DB Name 를 입력하세요!";
    } else if($DbID=="") {
        $errMsg = "정확한 DB ID 를 입력하세요!";
    } else if($DbPW=="") {
        $errMsg = "정확한 Db 암호 를 입력하세요!";
    } 
} else if($btn_id=="btn_check_db2") {
    if($dbAlias=="") {
        $errMsg = "추가하실 2차 DB 서버의 별명을 입력하세요!";
    } else if($MS_MJ_MY2=="") {
        $errMsg = "추가하실 2차 DB 서버의 종류를 선택하세요!";
    } else if($DbServerName2=="") {
        $errMsg = "정확한 DB2 Server Name 를 입력하세요!";
    } else if($base_db2=="") {
        $errMsg = "정확한 DB2 Name 를 입력하세요!";
    } else if($base_db2=="") {
        $errMsg = "정확한 DB2 Name 를 입력하세요!";
    } else if($DbID2=="") {
        $errMsg = "정확한 DB2 ID 를 입력하세요!";
    } else if($DbPW2=="") {
        $errMsg = "정확한 DB2 암호 를 입력하세요!";
    } 
}

if($errMsg!="") {
?>
[{ "errMsg": "<?php echo $errMsg; ?>" }]
<?php
} else {
    require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';
	
	$lastRealPid = '';
	$msg = '';
    if($btn_id=="btn_check_db") {
        if($WINDOWS_LINUX=="windows") {

			if($MS_MJ_MY=="MY") {
				try {
					$dbAlias = '1st';
					$MS_MJ_MY = 'MY';   //2차 서버는 수동값
					$externalDB["1st"] = "MY(@)$DbServerName(@)$base_db(@)$DbID(@)$DbPW";
					$result = onlyOnereturnSql("select 'success' as aaa;");
					if($result=='success') {
						$msg = "축하합니다. 1차 DB 서버 MYSQL 연결에 성공했습니다!";
					} else $errMsg = '1차 DB 서버 MYSQL 연결에 실패했습니다.';
				} catch(Exception $e) {
					$MS_MJ_MY = "MS";   //첫 TEST 이므로 항상 MS
					//ini_set("default_socket_timeout", 2);

					$database = new PDO( "sqlsrv:server=$DbServerName; Database=$base_db","$DbID","$DbPW" );  

					
					$database->setAttribute( PDO::ATTR_CASE, PDO::CASE_NATURAL );
					$database->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
					$database->setAttribute( PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true );			//이거 있어야 int 형이 따옴표 없어짐!!
					
					
					$MS_MJ_MY = '';
					$result = onlyOnereturnSql("select @@VERSION");
					if(InStr($result, 'SQL')>0) {
						$year = splitVB(splitVB($result,"Server ")[1]," ")[0]*1;
						$msg = "축하합니다. 윈도우IIS 웹서버에서 MSSQL DB $year 연결에 성공했습니다!";
						if($year>=2016) {
							$MS_MJ_MY = "MJ";
							$msg = $msg . " JSON 을 지원하는 DB 서버입니다.";
						} else {
							$MS_MJ_MY = "MS";
							$msg = $msg . " JSON 을 지원하는 DB 서버는 아니지만, 웹서버를 통해서도 충분히 JSON 이 생성됩니다.";
						}

						$lastRealPid = onlyOnereturnSql("if exists(select * from sysobjects where name='MisMenuList' and xtype='U') select top 1 RealPid from MisMenuList order by idx desc else select ''");
						if($lastRealPid=="") {
							$msg = $msg . " 그렇지만, SpeedMIS 관련 테이블과 데이터 호출에는 실패했습니다. 자체 MSSQL 서버에 speedmisV6.sql 를 통한 입력이 잘 되었는지 확인 후 다시 시도하세요!";
							$errMsg = $msg;
						}
					} else $errMsg = '윈도우IIS 웹서버에서 MSSQL DB 연결에 실패했습니다.';
		
				}
			} else {
				try {
					$MS_MJ_MY = "MS";   //첫 TEST 이므로 항상 MS
					//ini_set("default_socket_timeout", 2);

					$database = new PDO( "sqlsrv:server=$DbServerName; Database=$base_db","$DbID","$DbPW" );  

					
					$database->setAttribute( PDO::ATTR_CASE, PDO::CASE_NATURAL );
					$database->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
					$database->setAttribute( PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true );			//이거 있어야 int 형이 따옴표 없어짐!!
					
					
					$MS_MJ_MY = '';
					$result = onlyOnereturnSql("select @@VERSION");
					if(InStr($result, 'SQL')>0) {
						$year = splitVB(splitVB($result,"Server ")[1]," ")[0]*1;
						$msg = "축하합니다. 윈도우IIS 웹서버에서 MSSQL DB $year 연결에 성공했습니다!";
						if($year>=2016) {
							$MS_MJ_MY = "MJ";
							$msg = $msg . " JSON 을 지원하는 DB 서버입니다.";
						} else {
							$MS_MJ_MY = "MS";
							$msg = $msg . " JSON 을 지원하는 DB 서버는 아니지만, 웹서버를 통해서도 충분히 JSON 이 생성됩니다.";
						}

						$lastRealPid = onlyOnereturnSql("if exists(select * from sysobjects where name='MisMenuList' and xtype='U') select top 1 RealPid from MisMenuList order by idx desc else select ''");
						if($lastRealPid=="") {
							$msg = $msg . " 그렇지만, SpeedMIS 관련 테이블과 데이터 호출에는 실패했습니다. 자체 MSSQL 서버에 speedmisV6.sql 를 통한 입력이 잘 되었는지 확인 후 다시 시도하세요!";
							$errMsg = $msg;
						}
					} else $errMsg = '윈도우IIS 웹서버에서 MSSQL DB 연결에 실패했습니다.';
				} catch(Exception $e) {
					$dbAlias = '1st';
					$MS_MJ_MY = 'MY';   //2차 서버는 수동값
					$externalDB["1st"] = "MY(@)$DbServerName(@)$base_db(@)$DbID(@)$DbPW";
					$result = onlyOnereturnSql("select 'success' as aaa;");
					if($result=='success') {
						$msg = "축하합니다. 1차 DB 서버 MYSQL 연결에 성공했습니다!";
					} else $errMsg = '1차 DB 서버 MYSQL 연결에 실패했습니다.';
		
				}
				


			}
		
		} else if($WINDOWS_LINUX=="linux") {

            try {
                $MS_MJ_MY = "MS";   //첫 TEST 이므로 항상 MS
                $driverOptions = [PDO::ATTR_CASE => PDO::CASE_NATURAL,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
                $database = new PDO ("dblib:host=$DbServerName;dbname=$base_db;charset=utf8","$DbID","$DbPW", $driverOptions);
    
                $MS_MJ_MY = '';
                $result = onlyOnereturnSql("select @@VERSION");
                if(InStr($result, 'SQL')>0) {
                    $year = splitVB(splitVB($result,"Server ")[1]," ")[0]*1;
                    $msg = "축하합니다. 리눅스 웹서버에서 MSSQL DB $year 연결에 성공했습니다!";
                    if($year>=2016) {
                        $MS_MJ_MY = "MJ";
                        $msg = $msg . " JSON 을 지원하는 DB 서버입니다.";
                    } else {
                        $MS_MJ_MY = "MS";
                        $msg = $msg . " JSON 을 지원하는 DB 서버는 아니지만, 웹서버를 통해서도 충분히 JSON 이 생성됩니다.";
                    }
                } else $errMsg = '리눅스 웹서버에서 MSSQL DB 연결에 실패했습니다.';
    
            } catch(Exception $e) {
                $dbAlias = '1st';
                $MS_MJ_MY = 'MY';   //2차 서버는 수동값
                $externalDB["1st"] = "MY(@)$DbServerName(@)$base_db(@)$DbID(@)$DbPW";
                $result = onlyOnereturnSql("select 'success' as aaa;");
                if($result=='success') {
                    $msg = "축하합니다. 1차 DB 서버 MYSQL 연결에 성공했습니다!";
                } else $errMsg = '1차 DB 서버 MYSQL 연결에 실패했습니다.';
    
            }
		
		}
    } else if($btn_id=="btn_check_db2") {
        $MS_MJ_MY = '';
        if($WINDOWS_LINUX=="windows") {
            if($MS_MJ_MY2=="MS" || $MS_MJ_MY2=="MJ") {
                $database2 = new PDO( "sqlsrv:server=$DbServerName2; Database=$base_db2","$DbID2","$DbPW2");  
                $database2->setAttribute( PDO::ATTR_CASE, PDO::CASE_NATURAL );
                $database2->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
                $database2->setAttribute( PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true );			//이거 있어야 int 형이 따옴표 없어짐!!

                $result = onlyOnereturnSql_db2_mssql("select @@VERSION");
                if(InStr($result, 'SQL')>0) {
                    $year = splitVB(splitVB($result,"Server ")[1]," ")[0]*1;
                    $msg = "축하합니다. 윈도우IIS 웹서버에서 2차 DB 서버 MSSQL DB $year 연결에 성공했습니다!";
                    if($year>=2016) {
                        $MS_MJ_MY2 = "MJ";
                        $msg = $msg . " JSON 을 지원하는 DB 서버입니다.";
                    } else {
                        $MS_MJ_MY2 = "MS";
                        $msg = $msg . " JSON 을 지원하는 DB 서버는 아니지만, 웹서버를 통해서도 충분히 JSON 이 생성됩니다.";
                    }
                } else $errMsg = '윈도우IIS 웹서버에서 2차 DB 서버 MSSQL 연결에 실패했습니다.';
    
            } else if($MS_MJ_MY2=='OC') {
				$database2 = new PDO("oci:dbname=//$DbServerName2/$base_db2","$DbID2","$DbPW2");
				$database2->setAttribute( PDO::ATTR_CASE, PDO::CASE_NATURAL );
				$database2->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
				$database2->setAttribute( PDO::SQLSRV_ATTR_FETCHES_NUMERIC_TYPE, true );

                $result = onlyOnereturnSql_db2_oracle("select 'success' as aaa FROM dual");
                if($result=='success') {
                    $msg = "축하합니다. 윈도우IIS 웹서버에서 2차 DB 서버 오라클 연결에 성공했습니다!";
                } else $errMsg = '윈도우IIS 웹서버에서 2차 DB 서버 오라클 연결에 실패했습니다.';
    
            } else if($MS_MJ_MY2=='MY') {

                $result = onlyOnereturnSql_db2_mysql("select 'success' as aaa;");
                if($result=='success') {
                    $msg = "축하합니다. 윈도우IIS 웹서버에서 2차 DB 서버 MYSQL 연결에 성공했습니다!";
                } else $errMsg = '윈도우IIS 웹서버에서 2차 DB 서버 MYSQL 연결에 실패했습니다.';
    
            }
        } else if($WINDOWS_LINUX=="linux") {
            if($MS_MJ_MY2=="MS" || $MS_MJ_MY2=="MJ") {
				$MS_MJ_MY2 = "MS";   //첫 TEST 이므로 항상 MS
				$driverOptions2 = [PDO::ATTR_CASE => PDO::CASE_NATURAL,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
				$database2 = new PDO ("dblib:host=$DbServerName2;dbname=$base_db2;charset=utf8","$DbID2","$DbPW2", $driverOptions2);

                $result = onlyOnereturnSql_db2_mssql("select @@VERSION");
                if(InStr($result, 'SQL')>0) {
                    $year = splitVB(splitVB($result,"Server ")[1]," ")[0]*1;
                    $msg = "축하합니다. 리눅스 웹서버에서 2차 DB 서버 MSSQL DB $year 연결에 성공했습니다!";
                    if($year>=2016) {
                        $MS_MJ_MY2 = "MJ";
                        $msg = $msg . " JSON 을 지원하는 DB 서버입니다.";
                    } else {
                        $MS_MJ_MY2 = "MS";
                        $msg = $msg . " JSON 을 지원하는 DB 서버는 아니지만, 웹서버를 통해서도 충분히 JSON 이 생성됩니다.";
                    }
                } else $errMsg = '리눅스 웹서버에서 2차 DB 서버 MSSQL 연결에 실패했습니다.';
    
            } else if($MS_MJ_MY2=='MY') {

                $result = onlyOnereturnSql_db2_mysql("select 'success' as aaa;");
                if($result=='success') {
                    $msg = "축하합니다. 리눅스 웹서버에서 2차 DB 서버 MYSQL 연결에 성공했습니다!";
                } else $errMsg = '리눅스 웹서버에서 2차 DB 서버 MYSQL 연결에 실패했습니다.';
    
            }
        }
        
    }
    ?>
[{ "msg": "<?php echo $msg; ?>", "errMsg": "<?php echo $errMsg; ?>", "MS_MJ_MY": "<?php echo $MS_MJ_MY; ?>", "lastRealPid": "<?php echo $lastRealPid; ?>", "MS_MJ_MY2": "<?php echo $MS_MJ_MY2; ?>" }]
    <?php
}
?>