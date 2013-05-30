<?php

if (empty($access)) {
    header("location:index.php");
    die();
}
//for getting the app id and the app secret key you have to make your app from https://developers.facebook.com/apps ..
//Set Facebook App id and App Secret ..
$facebookAppId = '188240594648676'; //facebook app Id ..
$facebookAppSecret = '91058469a55393ba009979d81ccd9527'; // facebook app secret key ..
$_SESSION['appId'] = $facebookAppId;
$_SESSION['appSecret'] = $facebookAppSecret;
?>