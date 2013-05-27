<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// A working function to download a particular image ..
// get the url of the image you want to download
$url = $_GET['downloadImage'];
$file_name = basename($url);
$file_url = dirname($url) . '/' . $file_name;
$content = $url;

$ch = curl_init($content);
// the name of the image of the downloading photo
$fp = fopen('facebook_Image.jpg', 'wb');
curl_setopt($ch, CURLOPT_FILE, $fp);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_exec($ch);
curl_close($ch);
fclose($fp);

// downloading the pic now
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary");
header("Content-disposition: attachment; filename=\"facebook_Image.jpg\"");
readfile("facebook_Image.jpg");

if (file_exists('facebook_Image.jpg')) {
    // delete the photos when download downloading
    unlink('facebook_Image.jpg');
}
exit;
?>