<?php

$yourfile = "336561909702445.zip";
header("Content-Type: application/zip");
header("Content-Disposition: attachment; filename=" . $yourfile . "");
header("Content-Length: " . filesize($yourfile));
readfile($yourfile);

if (file_exists($yourfile)) {
    unlink($yourfile);
}
?>