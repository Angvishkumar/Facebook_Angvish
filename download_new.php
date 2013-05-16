<?php

//then send the headers to force download the zip file
header("Content-type: application/zip");
header('Content-Disposition: attachment; filename="Facebook_albums.zip"');
header("Pragma: no-cache");
header("Expires: 0");
readfile("Facebook_albums.zip");
exit;
unlink("Facebook_albums.zip");
/* header('Content-Description: File Transfer');
  header('Content-Type: application/zip');
  header("Content-Type: application/force-download");
  header('Content-Disposition: attachment; filename="facebookalbums.zip"');
  header('Content-Transfer-Encoding: binary');
  header('Expires: 0');
  header('Cache-Control: must-revalidate');
  header('Pragma: public');
  header('Content-Length: ' . filesize('facebookalbums.zip'));
  readfile('albums.zip');
  ob_clean();
  flush();
  unlink('albums.zip');
  exit; */
?>