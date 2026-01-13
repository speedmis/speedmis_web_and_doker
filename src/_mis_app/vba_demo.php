<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

header("charset=UTF-8");

require __DIR__ . '/../vendor/autoload.php';

com_load_typelib('excel.application');

$excel = new COM("excel.application") or die("Unable to instanciate excel");

print "Loaded excel, version {$excel->Version}\n";


$input_filePath = 'D:\web_speedmis_v6\_mis_work\HMS_월별점검현황2.xlsx';
$Excel = new com("Excel.Application", NULL, CP_UTF8) or Die ("Did not instantiate Excel");
# dont want alerts ... run silent
$Excel->DisplayAlerts = 0;
//$Workbook = $Excel->Workbooks->Open($input_filePath);    ## 파일열기 
exit;
//$Workbook->saveas('D:\web_speedmis_v6\_mis_work\HMS_월별점검현황5.xlsx');
$Workbook->saveas('D:\web_speedmis_v6\_mis_work\HMS_월별점검현황02.html',2);
$Workbook->saveas('D:\web_speedmis_v6\_mis_work\HMS_월별점검현황03.html',3);
$Workbook->saveas('D:\web_speedmis_v6\_mis_work\HMS_월별점검현황04.html',4);
$Workbook->saveas('D:\web_speedmis_v6\_mis_work\HMS_월별점검현황05.html',5);
$Workbook->saveas('D:\web_speedmis_v6\_mis_work\HMS_월별점검현황06.html',6);
$Workbook->saveas('D:\web_speedmis_v6\_mis_work\HMS_월별점검현황07.html',7);
$Workbook->saveas('D:\web_speedmis_v6\_mis_work\HMS_월별점검현황08.html',8);
echo 'zzz';
echo 'zzz';
exit;

   //bring it to front
   #$excel->Visible = 1;//NOT

   //dont want alerts ... run silent
   $excel->DisplayAlerts = 0;

   //create a new workbook
   $wkb = $excel->Workbooks->Add();

   //select the default sheet
   $sheet=$wkb->Worksheets(1);

   //make it the active sheet
   $sheet->activate;

   //fill it with some bogus data
   for($row=1;$row<=7;$row++){
       for ($col=1;$col<=5;$col++){

          $sheet->activate;
          $cell=$sheet->Cells($row,$col);
          $cell->Activate;
          $cell->value = 'pool4tool 4eva ' . $row . ' ' . $col . ' ak';
       }//end of colcount for loop
   }

   ///////////
   // Select Rows 2 to 5
   $r = $sheet->Range("2:5")->Rows;

   // group them baby, yeah
   $r->Cells->Group;

   // save the new file
   $strPath = 'tfile.xls';
   if (file_exists($strPath)) {unlink($strPath);}
   $wkb->SaveAs($strPath);

   //close the book
   $wkb->Close(false);
   $excel->Workbooks->Close();

   //free up the RAM
   unset($sheet);

   //closing excel
   $excel->Quit();

   //free the object
   $excel = null;
?>
