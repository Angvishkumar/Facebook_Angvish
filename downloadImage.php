<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// A working function to download a particular image ..
//$url = 'http://www.google.com/images/srpr/logo3w.png';

$url = $_GET['downloadImage'];
if (!isset($_SERVER['HTTP'])) {
    $url = preg_replace("/^https:/", "http:", $url);
} else {
    $url = preg_replace("/^http:/", "https:", $url);
}
//$url = 'http://www.google.com/images/srpr/logo3w.png';
//$url = 'http://profile.ak.fbcdn.net/hprofile-ak-snc6/276519_104958162837_864712231_q.jpg';
$file_name = basename($url);
$file_url = dirname($url) . '/' . $file_name;
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary");	
header('Content-Disposition: attachment; filename="Facebook_albums.jpg"');
readfile($file_url);
?>