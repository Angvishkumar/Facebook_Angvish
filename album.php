<?php

if (!isset($_GET['id']))
    die("No direct access allowed!");
//echo $_GET['id'];
require 'facebookSourceSDK/facebook.php';
$facebook = new Facebook(array(
            'appId' => '188240594648676',
            'secret' => '91058469a55393ba009979d81ccd9527',
            'cookie' => true,
        ));
//echo $_GET['access'];
$params = array();
$params['fields'] = 'name,source,images';
$params = http_build_query($params, null, '&');

$user_id = $facebook->getUser();
$access_token = $_GET['access'];
$facebook->setAccessToken($access_token);
//echo ' '.$access_token;
//Use to generate a query string
// /{$id}/photos?fields=name,source,images
// fields=albums.fields({$id},photos.fields(name,source,picture))
$fql = "SELECT pid,aid,src_big, link, owner
FROM photo
WHERE aid in(select  aid from album where object_id=154629251229046);";
$album_photos = $facebook->api(array(
    'method' => 'fql.query',
    'query' => $fql,
        ));
//print_r($album_photos[0]);
// Photos for the corresponding album id are accessed with their name, source and photo itself
$photos = array();
//echo empty($album_photos['data']);
//echo count($album_photos);

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
//print_r($photos);
?>
<?php if (!empty($photos)) { ?>
    <?php

    //Creates a zip file of photos if user asks to download the album
    //if ($_POST['type'] == 'download') {
    $_SESSION['files'] = array();
    $zip = new ZipArchive();
    $zipname = "albums.zip";
    # create a temp file & open it
    $zip->open('albums.zip', ZipArchive::CREATE);
    # loop through each file
    foreach ($photos as $photo) {
        $ch = curl_init($photo['src_big']);
        $filename = "new_" . $photo['pid'] . ".jpg";
        $fp = fopen($filename, 'wb');
        curl_setopt($ch, CURLOPT_FILE, $fp);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $file = curl_exec($ch);
        curl_close($ch);
        echo '<img src='.$photo['src_big'].' /> ';
        $url=$photo['src_big'];
        if (!isset($_SERVER['HTTP'])) {
            $url = preg_replace("/^https:/", "http:", $url);
        } else {
            $url = preg_replace("/^http:/", "https:", $url);
        }
        file_put_contents("file", file_get_contents($url));
        $zip->addFile($filename, $photo['pid'] . ".jpg");
        array_push($_SESSION['files'], $filename);
        fclose($fp);
    }
    $zip->close();
    foreach ($_SESSION['files'] as $filename) {
        unlink($filename);  //Deletes all photos to maintain consistency and privacy
    }
    // }
    ?>

<?php } ?>
