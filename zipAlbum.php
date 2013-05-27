<?php

$downloadingAlbumId = ''; // id of a particular album
$albumName = ''; // name of the particular album
$access_token = ''; // accesstoken an alpha numeric sequence
firstMethod();

function firstMethod() {
    $downloadingAlbumId = $_POST['id'];
    $albumName = $_POST['name'];
    $access_token = $_POST['access'];
    // die if album id is not set
    if (!isset($downloadingAlbumId))
        die("No direct access allowed!");
    //echo $_GET['id'];
    require 'lib/facebook.php';
    $facebook = new Facebook(array(
                'appId' => '',
                'secret' => '',
                'cookie' => true,
            ));
    // get the user id
    $user_id = $facebook->getUser();
    // set the accesstoken 
    $facebook->setAccessToken($access_token);
    // an fql query to get the image from the facebook table
    $fql = "SELECT src_big
    FROM photo
    WHERE aid in(select  aid from album where object_id=" . $downloadingAlbumId . ");";
    // facebook api to call a fql query 
    $album_photos = $facebook->api(array(
        'method' => 'fql.query',
        'query' => $fql,
            ));
    // Photos for the corresponding album id are accessed with their name, source and photo itself
    $photos = array();
    // don't proceed if the album photos are empty
    if (!empty($album_photos)) {
        // get all the images from the particular album
        foreach ($album_photos as $photo) {
            $temp = array();
            $temp['src_big'] = $photo['src_big'];
            $photos[] = $temp;
        }
    }
    // if the photos array is not empty
    if (!empty($photos)) {
        // a function to creat the zip file in the root directory of the application
        create_zip($photos);
        // after the downloading is done rename to the album name given by the user
        rename($_POST['id'] . '.zip', $_POST['name'] . ' Album Pics' . '.zip');
    }
}
// remake the directory with the same name if directory exist with
function rrmdir($dir) {
    if (is_dir($dir)) {
        $objects = scandir($dir);
        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (filetype($dir . "/" . $object) == "dir")
                    rrmdir($dir . "/" . $object); else
                    unlink($dir . "/" . $object);
            }
        }
        reset($objects);
        rmdir($dir);
    }
}
// get the url of the image and store it in the dir directory of the applicaiton
function getfile($url, $dir) {
    $ch = curl_init($url);
    $fp = fopen($dir . '/' . basename($url), 'wb');
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_exec($ch);
    curl_close($ch);
    fclose($fp);
}

// create a compress file
function createZipFromDir($dir, $zip_file) {
    $zip = new ZipArchive;
    if (true !== $zip->open($zip_file, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE)) {
        return false;
    }
    zipDir($dir, $zip);
    return $zip;
}
// two paramerter tha is the dir and the zip of the particular album
function zipDir($dir, $zip, $relative_path = DIRECTORY_SEPARATOR) {
    $dir = rtrim($dir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
    if ($handle = opendir($dir)) {
        while (false !== ($file = readdir($handle))) {
            if ($file === '.' || $file === '..') {
                continue;
            }
            if (is_file($dir . $file)) {
                $zip->addFile($dir . $file, $file);
            } elseif (is_dir($dir . $file)) {
                zipDir($dir . $file, $zip, $relative_path . $file);
            }
        }
    }
    closedir($handle);
}
// create a zip file provide the array with url of the photo is given
function create_zip($files = array(), $destination = '', $overwrite = false) {
    //if the zip file already exists and overwrite is false, return false
    $albumid = $_POST["id"];
    if (file_exists($albumid)) {
        rrmdir($albumid);
    }
    mkdir($albumid);
    //if files were passed in...
    if (is_array($files)) {
        //cycle through each file
        foreach ($files as $file) {
            //make sure the file exists
            getfile($file['src_big'], $albumid);
        }
    }
    createZipFromDir($albumid, $albumid . ".zip");
    rrmdir($albumid);
}

?>
