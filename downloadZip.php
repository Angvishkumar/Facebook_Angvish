<?php

/*
  //then send the headers to force download the zip file
  header('Content-Type: application/octet-stream');
  header('Content-Disposition: attachment; filename="Facebook_albums.zip"');
  readfile("Facebook_albums.zip"); */
/*
  header('Content-Description: File Transfer');
  header('Content-Type: application/zip');
  header("Content-Type: application/force-download");
  header('Content-Disposition: attachment; filename="Facebook_albums.zip"');
  header('Cache-Control: must-revalidate');
  header('Pragma: public');
  header('Content-Length: ' . filesize('Facebook_albums.zip'));
  readfile('albums.zip');
  ob_clean();
  flush();
  exit; */
header('Cache-Control: must-revalidate');
header('Content-Description: File Transfer');
header('Content-Disposition: attachment; filename="Facebook_albums.zip"');
header('Content-Type: application/zip');
header('Content-Transfer-Encoding: binary');
readfile("Facebook_albums.zip")
?>