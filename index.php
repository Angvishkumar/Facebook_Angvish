<?php
ob_start();
session_start();
$access = 'my_value';
require_once("appId_secretKey.php");
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Facebook Album Viewer</title>
        <link href="./css/bootstrap-modal.css" rel="stylesheet">
        <link href="./css/bootstrap-responsive.css" rel="stylesheet">
        <link href="./css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="./css/bootstrap.css" rel="stylesheet">
        <link href="./css/bootstrap.min.css" rel="stylesheet">
        <link href="./css/camera.css" rel="stylesheet">
        <link href="./css/myCssForFacebookApplication.css" rel="stylesheet">
        <link href="./css/font-awesome.min.css" rel="stylesheet">
        <link href="./css/bootswatch.css" rel="stylesheet">
        <link rel="icon" href="http://www.aztanutopia.com/wp-content/uploads/2013/02/big-facebook-icon-png-psd.png">


        <!-- Le styles -->
        <link href="./css/bootstrap.css" rel="stylesheet">
        <link href="./css/bootstrap-responsive.css" rel="stylesheet">
        <link href="./css/docs.css" rel="stylesheet">
        <link href="./js/google-code-prettify/prettify.css" rel="stylesheet">

        <link rel='stylesheet' id='camera-css'  href='./css/camera.css' type='text/css' media='all'> 
        <!-- ------------------ This js files are for jquery and my own javascript ------------------ -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
        <script src="./js/jqueryForFacebookApplication.js" type="text/javascript"></script>
        <script src="./js/myJsForFacebookApplication.js" type="text/javascript"></script>
        <script src="./js/bootstrap.js" type="text/javascript"></script>
        <script src="./js/bootstrap.min.js" type="text/javascript"></script>
        <script src="./js/bootstrap-modalmanager.js" type ="text/javascript"></script>
        <script src="./js/tooltip.js" type ="text/javascript"></script>
        <script src="./js/popover.js" type ="text/javascript"></script>

        <link rel="stylesheet" href="css/colorbox.css" />
        <script src="./js/jquery.colorbox.js"></script>
        <!-- -------------------------jquery plugin for full screen slideshow ---------------------- -->
        <script type='text/javascript' src='./js/jquery.min.js'></script>
        <script type='text/javascript' src='./js/jquery.mobile.customized.min.js'></script>
        <script type='text/javascript' src='./js/jquery.easing.1.3.js'></script> 
        <script type='text/javascript' src='./js/camera.min.js'></script> 
        <script type="text/javascript">
            var _gaq = _gaq || [];
            _gaq.push(['_setAccount', 'UA-146052-10']);
            _gaq.push(['_trackPageview']);
            (function() {
                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
            })();
        </script>
    </head>

    <body data-spy="scroll" data-target=".bs-docs-sidebar">

        <!-- Navbar
        ================================================== -->
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="brand" href="http://www.facebook.com">Facebook</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class="active">
                                <a href="http://albumdownloader.funpic.org">Home</a>
                            </li>
                            <li id="displayImg" class="">
                            </li>
                            <li id="displayName" class="">
                            </li>
                        </ul>
                        <ul class="nav pull-right">
                            <li><a href="https://github.com/angvishkumar"><i class="icon-star icon-white"></i> Fork Me</a></li>
                            <li><a href="#"><div id="clickToDisconnect"></div></a></li>
                            <li><a href="#"><div id="connectWithIt"><i class="icon-user icon-white"></i> Login</div></a></li>
                            <li class="divider-vertical"></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- ------------------- LIst of All the Images inside the Album -------------------------  -->
        <div class="row-fluid">
            <ul class="thumbnails">
                <div id="photoInsideAlbum"></div>
            </ul>
        </div>
        <div class="" align="center">
            <!-- ----------------------- login message --------------------------------------  -->
            <div id="loginMsg" ></div>
            <div id="logoutMsg"></div>
        </div>
        <!-- -------------------------- User Album View -----------------------------------  -->
        <div class="container" id="containgAlbumCover" style="">
            <!-- ----------------------- User Albums displayed Here  --------------------------- -->
            <div id="userAlbums" class="row"></div>   
        </div>
        <!-- ----------------- loading image while the facebook is sending data .. ---------------- -->
        <div align="center" class="" id="loading"></div>
        <!-- Footer
        ================================================== -->
        <footer class="footer">
            <div id="footer" class="container">
                <p>Designed and built with all the love in the world by <a href="https://twitter.com/Angvishvish" target="_blank">@gifted</a></a>.</p>
                <ul class="footer-links">
                    <li><a href="https://github.com/Angvishkumar/Facebook_Angvish/issues">Issues</a></li>
                    <li class="muted">&middot;</li>
                    <li><a href="https://github.com/Angvishkumar/Facebook_Angvish/">Repository</a></li>
                </ul>
            </div>
        </footer>

        <!-- Le javascript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>
        <script src="./js/jquery.js"></script>
        <script src="./js/bootstrap-transition.js"></script>
        <script src="./js/bootstrap-alert.js"></script>
        <script src="./js/bootstrap-modal.js"></script>
        <script src="./js/bootstrap-dropdown.js"></script>
        <script src="./js/bootstrap-scrollspy.js"></script>
        <script src="./js/bootstrap-tab.js"></script>
        <script src="./js/bootstrap-tooltip.js"></script>
        <script src="./js/bootstrap-popover.js"></script>
        <script src="./js/bootstrap-button.js"></script>
        <script src="./js/bootstrap-collapse.js"></script>
        <script src="./js/bootstrap-carousel.js"></script>
        <script src="./js/bootstrap-typeahead.js"></script>
        <script src="./js/bootstrap-affix.js"></script>

        <script src="js/holder/holder.js"></script>
        <script src="js/google-code-prettify/prettify.js"></script>

        <script src="js/application.js"></script>

        <!-- ----------------------- fb-root div and containing appId  --------------------------- -->
        <div id="fb-root"></div>
        <script> var appId='<?php echo $facebookAppId; ?>' </script>
        <!-- Analytics
        ================================================== -->
        <script>
            var _gauges = _gauges || [];
            (function() {
                var t   = document.createElement('script');
                t.type  = 'text/javascript';
                t.async = true;
                t.id    = 'gauges-tracker';
                t.setAttribute('data-site-id', '4f0dc9fef5a1f55508000013');
                t.src = '//secure.gaug.es/track.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(t, s);
            })();
        </script>

    </body>
</html>
