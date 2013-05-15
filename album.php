<?php

$downloadingAlbumId = $_POST['id'];
$albumName = $_POST['name'];
$access_token = $_POST['access'];

/* $downloadingAlbumId = $_GET['id'];
  $albumName = $_GET['name'];
  $access_token = $_GET['access']; */

if (!isset($downloadingAlbumId))
    die("No direct access allowed!");
//echo $_GET['id'];
require 'facebookSourceSDK/facebook.php';
$facebook = new Facebook(array(
            'appId' => '188240594648676',
            'secret' => '91058469a55393ba009979d81ccd9527',
            'cookie' => true,
        ));
$params = array();
$params['fields'] = 'name,source,images';
$params = http_build_query($params, null, '&');

$user_id = $facebook->getUser();
$facebook->setAccessToken($access_token);
$fql = "SELECT pid,aid,src_big, link, owner
FROM photo
WHERE aid in(select  aid from album where object_id=" . $downloadingAlbumId . ");";
$album_photos = $facebook->api(array(
    'method' => 'fql.query',
    'query' => $fql,
        ));
// Photos for the corresponding album id are accessed with their name, source and photo itself
$photos = array();

if (!empty($album_photos)) {
    foreach ($album_photos as $photo) {
        $temp = array();
        $temp['pid'] = $photo['pid'];
        $temp['aid'] = (isset($photo['aid'])) ? $photo['aid'] : '';
        $temp['src_big'] = $photo['src_big'];
//echo '<img src="'.$temp['src_big'].'" /> ';
        $photos[] = $temp;
    }
}
?>
<?php if (!empty($photos)) { ?>
    <?php

//Creates a zip file of photos if user asks to download the album
    $_SESSION['files'] = array();
    $zip = new ZipArchive();
    $zipname = "albums.zip";
# create a temp file & open it
    $zip->open($zipname, ZipArchive::CREATE);
# loop through each file
    foreach ($photos as $photo) {
        $ch = curl_init($photo['src_big']);
        echo $ch;
        $filename = $albumName . "_" . $photo['pid'] . ".jpg";
        $fp = fopen($filename, 'wb');
        curl_setopt($ch, CURLOPT_FILE, $fp);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $file = curl_exec($ch);
        curl_close($ch);
//echo '<img src=' . $photo['src_big'] . ' /> ';
        $url = $photo['src_big'];
        if (!isset($_SERVER['HTTP'])) {
            $url = preg_replace("/^https:/", "http:", $url);
        } else {
            $url = preg_replace("/^http:/", "https:", $url);
        }
        file_put_contents($filename, file_get_contents($url));
        $zip->addFile($filename, $filename . ".jpg");
        array_push($_SESSION['files'], $filename);
        fclose($fp);
//readfile($url);
    }
    $zip->close();
    foreach ($_SESSION['files'] as $filename) {
        unlink($filename);  //Deletes all photos to maintain consistency and privacy
    }
    header('Content-Description: File Transfer');
    header('Content-Type: application/zip');
    header("Content-Type: application/force-download");
    header('Content-Disposition: attachment; filename="albums.zip"');
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize('albums.zip'));
    readfile('albums.zip');
    ob_clean();
    flush();
    unlink('albums.zip');
    exit;
//header('location : download_new.php');
// }
    ?>

<?php } ?>
