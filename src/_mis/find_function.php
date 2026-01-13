<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$_SERVER['DOCUMENT_ROOT'] = __DIR__ . '/..';

include 'MisCommonFunction.php';

$functions = ['replace', 'Left', 'Right', 'Mid', 'splitVB', 'iif', 'InStr'];

foreach ($functions as $func) {
    if (function_exists($func)) {
        $refl = new ReflectionFunction($func);
        echo "FOUND|$func|" . $refl->getFileName() . "|" . $refl->getStartLine() . "\n";
    } else {
        echo "MISSING|$func\n";
    }
}
?>