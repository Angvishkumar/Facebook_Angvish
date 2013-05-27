<?php

// name of the zip file
$yourfile = $_GET['name'] . ' Album Pics' . '.zip';
// code for downloading the zip file from the server
header("Content-Type: application/zip");
header("Content-Disposition: attachment; filename=" . $yourfile . "");
header("Content-Length: " . filesize($yourfile));
readfile($yourfile);

if (file_exists($yourfile)) {
    // deleteing the zip file after downloading it
    unlink($yourfile);
}
exit;
?>