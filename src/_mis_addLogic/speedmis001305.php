<?php






function save_writeAfter() {

    include '../_mis/PHPExcleReader/Classes/PHPExcel/IOFactory.php';

    global $base_root, $RealPid, $MisJoinPid, $logicPid, $parent_idx;
    global $MenuName, $key_aliasName, $key_value, $saveList, $saveUploadList, $viewList, $deleteList;
    global $Grid_Default, $ActionFlag, $MisSession_UserID, $newIdx, $MS_MJ_MY, $base_db2, $isnull;

    $pailmyeong = $saveUploadList["pailmyeong"];

    $f = $base_root . "/uploadFiles/spmoters_금융내역/파일명/$newIdx/$pailmyeong";
    //echo $f;
    if (!file_exists($f)) {
        exit("파일 없음");
    }

    $objPHPExcel = PHPExcel_IOFactory::load($f);

    $구분 = Left($objPHPExcel->getActiveSheet()->getCell("A5"), 2);
    $사업자등록번호 = '';
    $상호 = '';
    $대표자명 = '';
    $dataRange = '';

    if($구분!="매입" && $구분!="매출") {
        exit("올바른 국세청 세금계산서 파일이 아닙니다.");
    }

    if($구분=="매입") {
        $사업자등록번호 = $objPHPExcel->getActiveSheet()->getCell("B1");
        $상호 = $objPHPExcel->getActiveSheet()->getCell("D1");
        $대표자명 = $objPHPExcel->getActiveSheet()->getCell("F1");
        $dataRange = 'A7:AA10000';
    } else if($구분=="매출") {
        $사업자등록번호 = $objPHPExcel->getActiveSheet()->getCell("B1");
        $상호 = $objPHPExcel->getActiveSheet()->getCell("D1");
        $대표자명 = $objPHPExcel->getActiveSheet()->getCell("F1");
        $dataRange = 'A7:AA10000';
    } else {
        //알수 없는 양식
        exit("알 수 없는 양식입니다. 관리자에게 문의하세요.");
    }


    $allData = $objPHPExcel->getActiveSheet()->rangeToArray($dataRange);

    $cnt = count($allData);
    $sql = " 
    delete from spmoters_금융내역_detail where midx in (select idx from spmoters_금융내역 where useflag=0) or useflag=0;
    delete from spmoters_금융내역_detail where midx not in (select idx from spmoters_금융내역);
    ";

    $real_cnt = 0;

    for($i=0;$i<$cnt;$i++) {
        
        if($allData[$i][0]=="") {
            $real_cnt = $i;
            $i = 999999;
        } else {

            if($구분=="매입") {
 /*
0	거래일자
1	승인번호
6	상호
7	대표자명
14	합계금액
15	공급가액
16	세액
22	공급자이메일
23	공급받는자이메일1
	수탁사업자등록번호
	수탁사업자상호
25	품목명

*/

                if($MS_MJ_MY=='MY') {
                    $sql = $sql . " 
                    insert into spmoters_금융내역_detail(midx,m구분,m사업자등록번호,m상호,m대표자명,거래일자,승인번호,상호,대표자명,합계금액,공급가액,세액,공급자이메일,공급받는자이메일1,공급받는자이메일2,품목명,wdater) 
                    select N'" . $newIdx . "'";          //midx
                    $sql = $sql . ",N'" . $구분 . "'";
                    $sql = $sql . ",N'" . $사업자등록번호 . "'";
                    $sql = $sql . ",N'" . replace($상호,"'","''") . "'";
                    $sql = $sql . ",N'" . replace($대표자명,"'","''") . "'";
                    $sql = $sql . ",N'" . $allData[$i][0] . "'";    //거래일자
                    $sql = $sql . ",N'" . $allData[$i][1] . "'";    //승인번호
                    $sql = $sql . ",N'" . replace($allData[$i][6],"'","''") . "'";    //상호
                    $sql = $sql . ",N'" . replace($allData[$i][7],"'","''") . "'";    //대표자명
                    $sql = $sql . ",ifnull(NULLIF('" . replace($allData[$i][14],",","") . "',''),0)";    //합계금액
                    $sql = $sql . ",ifnull(NULLIF('" . replace($allData[$i][15],",","") . "',''),0)";    //공급가액
                    $sql = $sql . ",ifnull(NULLIF('" . replace($allData[$i][16],",","") . "',''),0)";    //세액
                    $sql = $sql . ",N'" . replace($allData[$i][22],"'","''") . "'";    //공급자이메일
                    $sql = $sql . ",N'" . replace($allData[$i][23],"'","''") . "'";    //공급받는자이메일1
                    $sql = $sql . ",N'" . replace($allData[$i][24],"'","''") . "'";    //공급받는자이메일2
                    $sql = $sql . ",N'" . replace($allData[$i][25],"'","''") . "'";    //품목명
                    $sql = $sql . ",N'" . $MisSession_UserID . "'
                    FROM dual WHERE NOT EXISTS (
                        select * from spmoters_금융내역_detail 
                        where 승인번호=N'" . $allData[$i][1] . "'
                    );
                    ";    //wdater
                } else {
                    $sql = $sql . " 
                if not exists(
                select * from spmoters_금융내역_detail 
                where 승인번호=N'" . $allData[$i][1] . "'
                )
                insert into spmoters_금융내역_detail(midx,m구분,m사업자등록번호,m상호,m대표자명,거래일자,승인번호,상호,대표자명,합계금액,공급가액,세액,공급자이메일,공급받는자이메일1,공급받는자이메일2,품목명,wdater) values ";
                $sql = $sql . "(N'" . $newIdx . "'";          //midx
                $sql = $sql . ",N'" . $구분 . "'";
                $sql = $sql . ",N'" . $사업자등록번호 . "'";
                $sql = $sql . ",N'" . replace($상호,"'","''") . "'";
                $sql = $sql . ",N'" . replace($대표자명,"'","''") . "'";
                $sql = $sql . ",N'" . $allData[$i][0] . "'";    //거래일자
                $sql = $sql . ",N'" . $allData[$i][1] . "'";    //승인번호
                $sql = $sql . ",N'" . replace($allData[$i][6],"'","''") . "'";    //상호
                $sql = $sql . ",N'" . replace($allData[$i][7],"'","''") . "'";    //대표자명
                $sql = $sql . ",N'" . replace($allData[$i][14],",","") . "'";    //합계금액
                $sql = $sql . ",N'" . replace($allData[$i][15],",","") . "'";    //공급가액
                $sql = $sql . ",N'" . replace($allData[$i][16],",","") . "'";    //세액
                $sql = $sql . ",N'" . replace($allData[$i][22],"'","''") . "'";    //공급자이메일
                $sql = $sql . ",N'" . replace($allData[$i][23],"'","''") . "'";    //공급받는자이메일1
                $sql = $sql . ",N'" . replace($allData[$i][24],"'","''") . "'";    //공급받는자이메일2
                $sql = $sql . ",N'" . replace($allData[$i][25],"'","''") . "'";    //품목명
                $sql = $sql . ",N'" . $MisSession_UserID . "');
                ";    //wdater
                }
                
            } else if($구분=='매출') {
/*
거래일자	0
승인번호	1
상호	11
대표자명	12
합계금액	14
공급가액	15
세액	16
공급자 이메일	22
공급받는자 이메일1	23
공급받는자 이메일2	24
수탁사업자등록번호	-1
상호	-1
품목일자	25
품목명	26
*/

                if($MS_MJ_MY=='MY') {
                    $sql = $sql . " 
                    insert into spmoters_금융내역_detail(midx,m구분,m사업자등록번호,m상호,m대표자명,거래일자,승인번호,상호,대표자명,합계금액,공급가액,세액,공급자이메일,공급받는자이메일1,공급받는자이메일2,품목명,wdater) 
                    select N'" . $newIdx . "'";          //midx
                    $sql = $sql . ",N'" . $구분 . "'";
                    $sql = $sql . ",N'" . $사업자등록번호 . "'";
                    $sql = $sql . ",N'" . replace($상호,"'","''") . "'";
                    $sql = $sql . ",N'" . replace($대표자명,"'","''") . "'";
                    $sql = $sql . ",N'" . $allData[$i][0] . "'";    //거래일자
                    $sql = $sql . ",N'" . $allData[$i][1] . "'";    //승인번호
                    $sql = $sql . ",N'" . replace($allData[$i][11],"'","''") . "'";    //상호
                    $sql = $sql . ",N'" . replace($allData[$i][12],"'","''") . "'";    //대표자명
                    $sql = $sql . ",ifnull(NULLIF('" . replace($allData[$i][14],",","") . "',''),0)";    //합계금액
                    $sql = $sql . ",ifnull(NULLIF('" . replace($allData[$i][15],",","") . "',''),0)";    //공급가액
                    $sql = $sql . ",ifnull(NULLIF('" . replace($allData[$i][16],",","") . "',''),0)";    //세액
                    $sql = $sql . ",N'" . replace($allData[$i][22],"'","''") . "'";    //공급자이메일
                    $sql = $sql . ",N'" . replace($allData[$i][23],"'","''") . "'";    //공급받는자이메일1
                    $sql = $sql . ",N'" . replace($allData[$i][24],"'","''") . "'";    //공급받는자이메일2
                    $sql = $sql . ",N'" . replace($allData[$i][26],"'","''") . "'";    //품목명
                    $sql = $sql . ",N'" . $MisSession_UserID . "'
                    FROM dual WHERE NOT EXISTS (
                        select * from spmoters_금융내역_detail 
                        where 승인번호=N'" . $allData[$i][1] . "'
                    );
                    ";    //wdater
                } else {
                    $sql = $sql . " 
                if not exists(
                select * from spmoters_금융내역_detail 
                where 승인번호=N'" . $allData[$i][1] . "'
                )
                insert into spmoters_금융내역_detail(midx,m구분,m사업자등록번호,m상호,m대표자명,거래일자,승인번호,상호,대표자명,합계금액,공급가액,세액,공급자이메일,공급받는자이메일1,공급받는자이메일2,품목명,wdater) values ";
                $sql = $sql . "(N'" . $newIdx . "'";          //midx
                $sql = $sql . ",N'" . $구분 . "'";
                $sql = $sql . ",N'" . $사업자등록번호 . "'";
                $sql = $sql . ",N'" . replace($상호,"'","''") . "'";
                $sql = $sql . ",N'" . replace($대표자명,"'","''") . "'";
                $sql = $sql . ",N'" . $allData[$i][0] . "'";    //거래일자
                $sql = $sql . ",N'" . $allData[$i][1] . "'";    //승인번호
                $sql = $sql . ",N'" . replace($allData[$i][11],"'","''") . "'";    //상호
                $sql = $sql . ",N'" . replace($allData[$i][12],"'","''") . "'";    //대표자명
                $sql = $sql . ",N'" . replace($allData[$i][14],",","") . "'";    //합계금액
                $sql = $sql . ",N'" . replace($allData[$i][15],",","") . "'";    //공급가액
                $sql = $sql . ",N'" . replace($allData[$i][16],",","") . "'";    //세액
                $sql = $sql . ",N'" . replace($allData[$i][22],"'","''") . "'";    //공급자이메일
                $sql = $sql . ",N'" . replace($allData[$i][23],"'","''") . "'";    //공급받는자이메일1
                $sql = $sql . ",N'" . replace($allData[$i][24],"'","''") . "'";    //공급받는자이메일2
                $sql = $sql . ",N'" . replace($allData[$i][26],"'","''") . "'";    //품목명
                $sql = $sql . ",N'" . $MisSession_UserID . "');
                ";    //wdater
                }
                
            }
            
        }
    }
    $sql = $sql . " 

    update spmoters_금융내역 set 분류='세금계산서', 파일명='$pailmyeong', 파일총건수=N'$real_cnt', 
    구분=N'$구분', 사업자등록번호=N'$사업자등록번호', 상호=N'$상호', 대표자명=N'$대표자명'
    where idx='$newIdx';
    update spmoters_금융내역_detail set 분류='세금계산서', 구분='$구분', 파일명=N'$pailmyeong'
    where midx='$newIdx';



    ";
    //echo $sql;exit;
    execSql($sql);
        
    
}
//end save_writeAfter

?>