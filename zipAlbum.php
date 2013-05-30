<?php

$access = 'my_value';
if (empty($access)) {
    header("Location: index");
    die();
}

$downloadingAlbumId = '';
$albumName = '';
$access_token = '';
firstMethod();

function firstMethod() {
    $downloadingAlbumId = $_POST['id'];
    $albumName = $_POST['name'];
    $access_token = $_POST['access'];

    if (!isset($downloadingAlbumId))
        die("No direct access allowed!");
    //echo $_GET['id'];
    require 'lib/facebook.php';
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
    $fql = "SELECT pid,aid,src_big,src, link, owner
                FROM photo
                WHERE aid in
                (select  aid 
                from album 
                where object_id=" . $downloadingAlbumId . ");";
    $album_photos = $facebook->api(array(
        'method' => 'fql.query',
        'query' => $fql,
            ));
// Photos for the corresponding album id are accessed with their name, source and photo itself
    $photos = array();

    if (!empty($album_photos)) {
        foreach ($album_photos as $photo) {
            $temp = array();
            $temp['src_big'] = $photo['src_big'];
            $photos[] = $temp;
        }
    }

    if (!empty($photos)) {
        create_zip($photos);
        rename($_POST['id'] . '.zip', $_POST['name'] . ' Album Pics' . '.zip');
    }
}

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

/**
 * Download File Form URL 
 * @param type $url : File Url to Download 
 * @param type $dir : Directory Path to store
 */
function getfile($url, $dir) {
    //echo '<br/>Getting the file lisst and their data ->';

    $ch = curl_init($url);
    $fp = fopen($dir . '/' . basename($url), 'wb');
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_exec($ch);
    curl_close($ch);
    fclose($fp);
}

/* creates a compressed zip file */

/**
 *
 * @param type $dir : Dir name to zip it
 * @param type $zip_file  : Zip file name to save
 * @return boolean|\ZipArchive 
 */
function createZipFromDir($dir, $zip_file) {
    $zip = new ZipArchive;
    if (true !== $zip->open($zip_file, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE)) {
        return false;
    }
    zipDir($dir, $zip);
    return $zip;
}

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

/**
 *
 * @param type $files :  URL of files to zip
 * @param type $destination : destination path to store that zip
 * @param type $overwrite  : Booleand flag to overwrite file or not
 */
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
