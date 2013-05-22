<?php

$myFile = "testFile.txt";
$fh = fopen($myFile, 'w') or die("can't open file");
$stringData = "Bobby Bopper\n";
fwrite($fh, $stringData);
$stringData = "Tracy Tanner\n";
fwrite($fh, $stringData);
fclose($fh);

$f = file_get_contents($myFile, 'r');
echo '-----' . $f . '-----<br/>';
/*  $file = 'http://www.prlog.org/10552687-j3000-quadband-wifi-googl-maps-tv-dual-sim-cell-phone.jpg';
  header('Content-Description: File Transfer');
  header("Content-type: image/jpg");
  header("Content-disposition: attachment; filename= ".$file."");
  readfile($file); */

$content = file_get_contents("http://www.google.co.in/intl/en_com/images/srpr/logo1w.png");

if (!isset($_SERVER['HTTP'])) {
    $content = preg_replace("/^https:/", "http:", $content);
} else {
    $content = preg_replace("/^http:/", "https:", $content);
}
$dir='';
//Store in the filesystem.
$fp = fopen("image.jpg", "w");
fwrite($fp, file_put_contents($dir . substr($content, strrpos($content, '/'), strlen($content)), file_get_contents($content)));
fclose($fp);

/*function getfile($url, $dir) {
    file_put_contents($dir . substr($url, strrpos($url, '/'), strlen($url)), file_get_contents($url));
}*/

echo '<img src="image.jpg" />';
?>