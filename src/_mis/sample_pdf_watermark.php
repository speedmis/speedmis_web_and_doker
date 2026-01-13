<?php
    //I don't get any error like require_once(): Failed opening required so I guess the files exist 
    require_once "FPDF/fpdf.php";
    require_once "FPDI/src/autoload.php";
    require_once "FPDI/src/Fpdi.php";


/*
    //define('FPDF_FONTPATH','../_mis_kendo/'); 
    require_once "FPDI/src/korean.php";
    //$pdf = new PDF_Korean();
  // pdf라는 객체를 생성하는데, A4용지, 단위는 mm, 세로(P/L)
  $pdf = new PDF_Korean('P','mm','A4');
 
  // 한글폰트 설정 H2hdrM -> HD 
  $pdf->AddUHCFont('HD', 'H2hdrM');
 
  // PDF 파일을 오픈합니다. 
  $pdf->Open();
 
  // 한페이지를 추가
  $pdf->AddPage();
   
  // 폰트를 설정   
  $pdf->setFont('HD','',30);
 
  // 글이 써질곳의 위치를 설정(x,y) - 단위 : mm 
  $pdf->SetXY(50, 50);
 
  // 글씨를 쓰는 명령 0 : 줄간격 
 
  $pdf->Write(0,'안녕하세요. ^^');
 
  // pdf파일을 생성 
  $pdf->Output(); 
  exit;
*/

    $pdf = new \setasign\Fpdi\Fpdi();
    //$pdf->AddFont('DejaVuSans','','../_mis_kendo/DejaVuSans.ttf',true);
    //exit;    
    //$pdf = new Fpdi();
    
    
    $pageCount = $pdf->setSourceFile('FPDI/sample.pdf');
    //exit;
    //$pdf->AddUHCFont();
    //$pdf->SetFont('UHC','',18);
    //exit;
    // iterate through all pages
    for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
        // import a page
        $templateId = $pdf->importPage($pageNo);
        // get the size of the imported page
        $size = $pdf->getTemplateSize($templateId);
    
        // create a page (landscape or portrait depending on the imported page size)
        if ($size[0] > $size[1]) {
            $pdf->AddPage('L', array($size[0], $size[1]));
            $pdf->useTemplate($templateId);
            //$pdf->Image('FPDI/sample.png', 100, 100, 88, 27);
        } else {
            $pdf->AddPage('P', array($size[0], $size[1]));
            $pdf->useTemplate($templateId);
            //$pdf->Image('FPDI/sample.png', 100, 100, 88, 27);
        }
        //$pdf->AddFont('DejaVuSans', '', '../_mis_kendo/DejaVuSans.ttf', true);
        //$pdf->SetFont('DejaVuSans', '', 14, '', false);
        $pdf->SetFont('Arial','I',26);
        $pdf->SetXY(40, 50);
        $pdf->Write(50, '스피드MIS');
    }
    
    $pdf->Output();

?>