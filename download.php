<?php
ob_start();
session_start();
$access = 'my_value';
require_once("appId_secretKey.php");
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Download Albums</title>
        <link href="css/bootstrap-modal.css" rel="stylesheet">
        <link href="css/bootstrap-responsive.css" rel="stylesheet">
        <link href="css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="css/bootstrap.css" rel="stylesheet">
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/camera.css" rel="stylesheet">
        <link href="css/myCssForFacebookApplication.css" rel="stylesheet">
        <link href="css/font-awesome.min.css" rel="stylesheet">
        <link href="css/bootswatch.css" rel="stylesheet">
        <link rel="icon" href="http://www.aztanutopia.com/wp-content/uploads/2013/02/big-facebook-icon-png-psd.png">

        <link rel='stylesheet' id='camera-css'  href='css/camera.css' type='text/css' media='all'> 
        <!-- ------------------ This js files are for jquery and my own javascript ------------------ -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="js/jqueryForFacebookApplication.js" type="text/javascript"></script>
        <script src="js/myJsForFacebookApplication.js" type="text/javascript"></script>
        <script src="js/bootstrap.js" type="text/javascript"></script>
        <script src="js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/bootstrap-modalmanager.js" type ="text/javascript"></script>
        <script src="js/tooltip.js" type ="text/javascript"></script>
        <script src="js/popover.js" type ="text/javascript"></script>

        <link rel="stylesheet" href="css/colorbox.css" />
        <script src="js/jquery.colorbox.js"></script>
        <!-- -------------------------jquery plugin for full screen slideshow ---------------------- -->
        <script type='text/javascript' src='js/jquery.min.js'></script>
        <script type='text/javascript' src='js/jquery.mobile.customized.min.js'></script>
        <script type='text/javascript' src='js/jquery.easing.1.3.js'></script> 
        <script type='text/javascript' src='js/camera.min.js'></script> 
    </head>
    <body>
        <?php
        require_once("appId_secretKey.php");
        $albumId = $_GET['albumid'];
        $albumName = $_GET['name'];
        ?>
        <script src="js/myJsForFacebookApplication.js" type="text/javascript"></script>
        <script type="text/javascript">
            var albumidis="<?php echo $albumId; ?>";
            var albumnameis="<?php echo $albumName; ?>";
            window.setTimeout('downloadAlbum(albumidis,albumnameis)', 3000);
        </script>
        <div class="container-fluid">
            <div class="row-fluid">

                <!-- ----------------- loading image while the facebook is sending data .. ---------------- -->
                <div align="center" class="span12" id="loading"></div>
                <!-- ----------------- loading image while the facebook is sending data .. ---------------- -->
                <div align="center" class="span11" id="loadingForDownload"></div>
            </div>
            <!-- ----------------------- fb-root div and containing appId  --------------------------- -->
            <div id="fb-root"></div>
            <script> var appId='<?php echo $facebookAppId; ?>' </script>
        </div><!-- row fluid ends -->
    </div><!-- container Fluid ends -->
    <div id="resultis"></div>
</body>
</html>
