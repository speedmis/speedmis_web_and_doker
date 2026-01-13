<?php include 'MisCommonFunction.php';?><?php

function downloadFile($url, $path)
{
    $newfname = $path;
    $file = fopen ($url, 'rb');
    if ($file) {
        $newf = fopen ($newfname, 'wb');
        if ($newf) {
            while(!feof($file)) {
                fwrite($newf, fread($file, 1024 * 8), 1024 * 8);
            }
        }
    }
    if ($file) {
        fclose($file);
    }
    if ($newf) {
        fclose($newf);
    }
}


//downloadFile("Tmpfile.zip", fopen($_GET["url"], 'r'));

re_direct($_GET["url"]);

?>