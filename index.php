<?php
ob_start();
session_start();
require_once("appId_secretKey.php");
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Facebook Album Viewer</title>
        <!-- ----------------- some css for the presentation of this page-------------------------- -->
        <link href="css/meter.css" rel="stylesheet">
        <link href="css/bootstrap-modal.css" rel="stylesheet">
        <link href="css/bootstrap-responsive.css" rel="stylesheet">
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/camera.css" rel="stylesheet">
        <link href="css/myCssForFacebookApplication.css" rel="stylesheet">
        <link href="css/font-awesome.min.css" rel="stylesheet">
        <link href="css/bootswatch.css" rel="stylesheet">
        <!-- icon of the website -->
        <link rel="icon" href="http://www.aztanutopia.com/wp-content/uploads/2013/02/big-facebook-icon-png-psd.png">
        <link rel='stylesheet' id='camera-css'  href='css/camera.css' type='text/css' media='all'> 
        <link rel="stylesheet" href="css/colorbox.css" />

        <!-- ------------------ This js files are for jquery and my own javascript ------------------ -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="js/jqueryForFacebookApplication.js" type="text/javascript"></script>
        <script src="js/myJsForFacebookApplication.js" type="text/javascript"></script>
        <script src="js/bootstrap.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/bootstrap-modalmanager.js" type ="text/javascript"></script>
        <script src="js/tooltip.js" type ="text/javascript"></script>
        <script src="js/popover.js" type ="text/javascript"></script>

        <script src="js/jquery.colorbox.js"></script>
        <!-- -------------------------jquery plugin for full screen slideshow ---------------------- -->
        <script type='text/javascript' src='js/jquery.min.js'></script>
        <script type='text/javascript' src='js/jquery.mobile.customized.min.js'></script>
        <script type='text/javascript' src='js/jquery.easing.1.3.js'></script> 
        <script type='text/javascript' src='js/camera.min.js'></script> 

    </head>
    <body>
        <div class="container-fluid">
            <div class="row-fluid">
                <div class="span12">
                    <!-- ----------------------- logout button .. -------------------------------- -->
                    <div class="" align="right">
                        <div id="clickToDisconnect" class=""></div>
                    </div>
                    <!-- ----------------------- developer github link ------------------------------------ -->
                    <div class="" align="center">
                        <div id="mainLabel">
                            <button class="btn btn-large btn-block btn-info" type="button">
                                <a class="coderAndMakers" href="https://github.com/angvishkumar">Facebook Album Viewer & Download <i class="icon-thumbs-up icon-white"></i>  FORK ME
                                </a>
                            </button>
                        </div>            
                        <!-- ----------------------- login message --------------------------------------  -->
                        <div id="loginMsg" ></div>
                        <div id="logoutMsg"></div>
                        <!-- ----------------------- button thats  connects to facebook .. -------------------- -->
                        <div id="clickToConnect" class="">
                            <img rel="popover" data-content="Click to Login"
                                 data-original-title="Login" id='facebookLoginButton' src="img/connect.jpg"/>
                        </div>
                        <!-- ----------------- loading image while the facebook is sending data .. ---------------- -->
                        <div align="" class="span11" id="loading"></div>
                        <!-- ----------------- loading image while the facebook is sending data .. ---------------- -->
                        <div align="center" class="span11" id="loadingForDownload"></div>
                    </div><!-- mainLabel loginMsg logMsg clickToConnect loading loadingForDownload -->
                    <!-- -------------------------- User Album View -----------------------------------  -->
                    <div class="" id="containgAlbumCover" style="display:none">
                        <!-- Displaying User Name -->
                        <div id="displayName"></div>
                        <!-- ----------------------- User Albums displayed Here  --------------------------- -->
                        <div id="userAlbums" class="row"></div>   
                    </div>
                    <!-- ---------------------------- Album photo SlideShow  ----------------------------- -->
                    <div id="photoSlideShow"></div>

                    <!-- ----------------------- fb-root div and containing appId  --------------------------- -->
                    <div id="fb-root"></div>
                    <script> var appId='<?php echo $facebookAppId; ?>' </script><!-- facebook appid -->
                    <!-- ------------------- LIst of All the Images inside the Album -------------------------  -->
                    <div id="toBackAndDownloadButton">
                        <div id="back" class="span12" ></div>
                    </div>
                    <!-- ------------------- LIst of All the Images inside the Album -------------------------  -->
                    <div class="span12 fluid_container">
                        <div id="photoInsideAlbum"></div>
                    </div>
                </div><!-- span12 ends -->
            </div><!-- row fluid ends -->
        </div><!-- container Fluid ends -->
    </body>
</html>
