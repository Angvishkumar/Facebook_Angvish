<?php

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
    file_put_contents($dir . substr($url, strrpos($url, '/'), strlen($url)), file_get_contents($url));
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
    $albumid = '336561909702445'; // $_GET["albumid"];
    if (file_exists($albumid)) {
        rrmdir($albumid);
    }
    mkdir($albumid);
    //if files were passed in...
    if (is_array($files)) {
        //cycle through each file
        foreach ($files as $file) {
            //make sure the file exists
            getfile($file, $albumid);
        }
    }
    createZipFromDir($albumid, $albumid . ".zip");
    rrmdir($albumid);
}
$files = array('http://www.technobuffalo.com/wp-content/uploads/2012/12/Google-Apps.jpeg', 'http://blogs.independent.co.uk/wp-content/uploads/2012/12/google-zip.jpg', 'http://setandbma.files.wordpress.com/2013/01/google.png');
echo 'zip file Created' . create_zip($files);
header('location: zip.php');
/* creates a compressed zip file */
/*
  function create_zip($files = array(), $destination = '', $overwrite = FALSE) {
  //if the zip file already exists and overwrite is false, return false
  if (file_exists($destination) && !$overwrite) {
  return false;
  }
  //vars
  $valid_files = array();
  //if files were passed in...
  if (is_array($files)) {
  //cycle through each file
  foreach ($files as $file) {
  //make sure the file exists
  if (curl_init($file)) {
  //echo 'here I am';
  $valid_files[] = $file;
  }
  }
  }
  //if we have good files...
  if (count($valid_files)) {
  //create the archive
  $zip = new ZipArchive();
  if ($zip->open($destination, $overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
  echo 'I am here<br/>';
  return false;
  }
  //add the files
  foreach ($valid_files as $file) {
  /*if ('' == file_get_contents($file)) {
  echo 'file is empty<br/>';
  } else {
  echo 'file is NOT empty<br/>';
  } *//*
  $zip->addFile($file);
  }

  //debug
  echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status.'<br/>';
  //close the zip -- done!
  $zip->close();
  echo is_file($destination);
  //check to make sure the file exists
  return file_exists($destination);
  } else {
  return false;
  }
  }

  /* * *** Example Usage ** */

?>