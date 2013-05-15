<?php
ob_start();
session_start();
require_once("appId_secretKey.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Facebook Album Viewer</title>
        <link href="css/bootstrap-modal.css" rel="stylesheet">
        <link href="css/bootstrap-responsive.css" rel="stylesheet">
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/camera.css" rel="stylesheet">
        <link href="css/myCssForFacebookApplication.css" rel="stylesheet">
        <link rel="icon" href="img/fbicon.png">

        <link rel='stylesheet' id='camera-css'  href='css/camera.css' type='text/css' media='all'> 
        <!-- ------------------ This js files are for jquery and my own javascript ------------------ -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="js/jqueryForFacebookApplication.js" type="text/javascript"></script>
        <script src="js/myJsForFacebookApplication.js" type="text/javascript"></script>
        <script src="js/bootstrap.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/bootstrap-modalmanager.js" type ="text/javascript"></script>
        <script src="js/" type ="text/javascript"></script>

        <link rel="stylesheet" href="css/colorbox.css" />
        <script src="js/jquery.colorbox.js"></script>

        <script type='text/javascript' src='js/jquery.min.js'></script>
        <script type='text/javascript' src='js/jquery.mobile.customized.min.js'></script>
        <script type='text/javascript' src='js/jquery.easing.1.3.js'></script> 
        <script type='text/javascript' src='js/camera.min.js'></script> 
        <script>
            function openDialog() {
                Avgrund.show( "#default-popup" );
            }
            function closeDialog() {
                Avgrund.hide();
            }
        </script>
    </head>
    <body>
        <!-- ----------------------- logout button .. ---------------------------------------- -->
        <div class="" align="">
            <div id="clickToDisconnect" class="">
                <img id="facebookLogoutButton" class="img-circle img-polaroid" src="img/logout.jpg"></img>
                <!--button class="btn btn-block btn btn-warning" type="button" id='facebookLogoutButton'>Logout</button-->
            </div>
        </div>
        <!-- ----------------------- developer github link ------------------------------------ -->
        <div class="container" align="center">
            <div id="mainLabel" >
                <a class="coderAndMakers" href="https://github.com/angvishkumar">Facebook Album Viewer & Download</a>
            </div>
            <!-- ----------------------- button thats  connects to facebook .. -------------------- -->
            <!-- ----------------------- login message --------------------------------------  -->
            <div id="loginMsg" ></div>
            <div id="logoutMsg"></div>
            <div id="data"></div>
            <div id="clickToConnect" class="">
                <button class="btn btn-block btn btn-info" type="button" id='facebookLoginButton'>Click to Connect Facebook</button>
            </div>
            <!-- ----------------- loading image while the facebook is sending data .. ---------------- -->
            <div align="center" class="container" id="loading"><img class="well" id='load' src="img/loading.gif"></div>
            <!-- ----------------- loading image while the facebook is sending data .. ---------------- -->
            <div align="center" class="container" id="loadingForDownload"></div>
        </div>
        <!-- -------------------------- User Album View -----------------------------------  -->
        <div class="container" id="containgAlbumCover" style="display:none">
            <!-- Displaying User Name -->
            <div id="displayName"></div>
            <!-- ----------------------- User Albums displayed Here  --------------------------- -->
            <div id="userAlbums" class="row"></div>   
        </div>
        <!-- ---------------------------- Album photo SlideShow  ----------------------------- -->
        <div id="photoSlideShow"></div>

        <!-- ----------------------- fb-root div and containing appId  --------------------------- -->
        <div id="fb-root"></div>
        <script> var appId='<?php echo $facebookAppId; ?>' </script>
        <!-- ------------------- LIst of All the Images inside the Album -------------------------  -->
        <div id="toBackAndDownloadButton">
            <div id="back" >
                <img id="backAndDownloadButton" class="img-circle img-poloroid" src="img/back.jpg"></img>
            </div>
        </div>
        <div class="fluid_container container">
            <!-- ------------------- LIst of All the Images inside the Album -------------------------  -->
            <div id="photoInsideAlbum"></div>
            <!-- div class="camera_wrap camera_emboss" id="images">
                <div id="photoImage"></div>
            </div -->
        </div>
    </body>
</html>
