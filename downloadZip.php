<?php

$access = 'my_value';
if (empty($access)) {
    header("Location: index");
    die();
}

if (isset($_GET['name'])) {
// or however you get the path
    $yourfile = $_GET['name'] . ' Album Pics' . '.zip';

    header("Content-Type: application/zip");
    header("Content-Disposition: attachment; filename=" . $yourfile . "");
    header("Content-Length: " . filesize($yourfile));
    readfile($yourfile);

    if (file_exists($yourfile)) {
        unlink($yourfile);
    }
    exit;
} else {
    header('Location: ./');
}
?>