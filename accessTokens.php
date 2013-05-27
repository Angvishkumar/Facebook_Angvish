<?php

session_start();
$reponse = array();
// here we set the session for the accesstoken 
if (isset($_POST["accesstoken"])) {
    $_SESSION["accesstoken"] = $_POST["accesstoken"];
    return json_encode($reponse);
}

if (!$_SESSION["accesstoken"]) {
    $reponse["status"] = 0;
    echo json_encode($reponse);
}

// Initializing facebook sdk
// 
// 
// getting the facebook sdk named facebook.php
require_once("lib/facebook.php");
// getting the application Id and secret key ..
require_once("appId_secretKey.php");
$config = array();
$config['appId'] = $facebookAppId;
$config['secret'] = $facebookAppSecret;
$config['fileUpload'] = false; // optional

$facebook = new Facebook($config);
$facebook->setAccessToken($_SESSION["accesstoken"]);
if ($facebook->getUser() == 0) {
    $reponse["status"] = 0;
    echo json_encode($reponse);
}
?>