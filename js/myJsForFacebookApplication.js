/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var accessToken='';
$(window).load(function(){
    $(document).ready(function(){ 
        //when the document is ready ..
        $('#logoutMsg').html('');
        $("#loginMsg").click(function(){
            $("#loginMsg").delay(4000).slideUp('fast');
        });
        // click here to connect popover
        $("#clickToConnect").popover({
            title: '<b>Login</b>', 
            content: '<img class="img-rounded" src="img/popoverlogin.jpg" />', 
            placement: 'bottom',
            html:true
        });
        // click to goto github
        $("#mainLabel").popover({
            title: '<b>Checkout the Developer</b>', 
            content: '<img class="img-rounded" src="img/github.jpg" />', 
            placement: 'bottom',
            html:true
        });
        // click to disconnect popover
        $("#clickToDisconnect").popover({
            title: '<b>Logout</b>', 
            content: '<img class="img-rounded" src="img/popoverlogout.jpg" />', 
            placement: 'bottom',
            html:true
        });
        // click to disconnect popover
        $("#backAndDownloadButton").popover({
            title: '<b>Back to Album</b>', 
            content: '<img class="img-rounded" src="img/album.jpg" />', 
            placement: 'right',
            html:true
        });
    
        var facebookAuthorizationResponse;
        window.fbAsyncInit = function() {
            FB.init({
                appId: appId,
                // App ID
                status: true,
                // check login status
                cookie: true,
                // enable cookies to allow the server to access the session
                xfbml: true // parse XFBML
            });
            $(document).trigger('fbload'); 
        };

        // Load the SDK Asynchronously
        (function(d) {
            var js, id = 'facebook-jssdk',
            ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
               
        // jquery to login if the user is already login
        $(document).on('fbload',function(){//  <---- HERE'S OUR CUSTOM EVENT BEING LISTENED FOR
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        var uid = response.authResponse.userID;
                        var accessToken = response.authResponse.accessToken;
                        ifConnected();
                    } else if (response.status === 'not_authorized') {
                        // the user is logged in to Facebook, 
                        // but has not authenticated your app
                        alert("Not Authorised");
                    } else {
                        // the user isn't logged in to Facebook.
                        alert("You are not logged in ");
                    }
                });
            });
        //jquery if the user clicks on the facebook login button
        $("#facebookLoginButton").click(function() {
            displayUserDataAndAlbum();
        });
        // function to load the images and details of the user ..
        function displayUserDataAndAlbum(){
            FB.login(function(response) {
                if (response.authResponse) {
                    facebookAuthorizationResponse=response;
                    accessToken=response.authResponse.accessToken;
                    //Set Accesstoken of user in session
                    $.ajax({
                        url: 'accessTokens.php',
                        type: 'post',
                        data: {
                            'accesstoken' : response.authResponse.accessToken
                        },
                        success: function(data) {
                        }
                    });
                    ifConnected();                
                } else {}
            }, {
                scope: 'email,user_photos'
            });
        }
        function ifConnected(){
            $('#loading').html('<img class="well" id="load" src="img/loading.gif">');//showing loading gif while facebook is sending photos
            // showing the login msg
            $('#loginMsg').html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                        <strong>Sucessfull !!</strong>\n\
                         Congratulation you have successfully Logged IN into the system.</div>').delay(4000).slideUp('fast');
            //Get User Name
            var displayNameAndImage='';
            FB.api('/me?fields=picture,name',function(respo){
                displayNameAndImage+='<h3 class="well well-small" id="displayUserName"><a href="https://www.facebook.com/">';
                displayNameAndImage+='<span class="label label-info"><img class="img-circle img-polaroid" src="'+respo.picture.data.url+'"></img></span>';
                displayNameAndImage+='<strong id="namePopup"> '+respo.name+"</strong></a></h3>";
                $("#displayName").html(displayNameAndImage).show();// display the current user name ..
                $("#namePopup").popover({
                    title: '<strong>'+respo.name+'</strong>', 
                    content: '<img class="img-rounded" src="'+respo.picture.data.url+'">', 
                    placement: 'bottom',
                    html:true
                });
            });
            $("#clickToConnect").hide();// hidding the facebook button ..
            //show all ablums of user ..
            FB.api('/me/albums', showAlbums);
        }
        var photosInsideAlbums='';
        // this is a function which gets all the albums cover image using response got from facebook api
        function showAlbums(response) {
            //showing loading gif while facebook is sending photos
            $('#loading').html('<img class="well" id="load" src="img/loading.gif">');
            $('#containgAlbumCover').show();
        
            $('#userAlbums').empty();
            // loop through each json object and get the name, count, privacy, likes, comments on a particular album
            $.each(response.data, function(key, value) {
                //create html structure
                var albumHtmlAppend='';
                photosInsideAlbums='';
                $('#photoInsideAlbum').html(photosInsideAlbums);
                albumHtmlAppend += '<div id="albumCoverPhoto' + key + '" class="span3"> ';// album cover photos div
            
                albumHtmlAppend+='<p id="pageLink">';
                albumHtmlAppend+='<i id="downloadThisAlbum'+key+'" class="downloadThisAlbum">';
                albumHtmlAppend+='<img class="img-circle img-polaroid" src="img/download.jpg"></img>';
                albumHtmlAppend+='</i>';
                albumHtmlAppend+='<span class="label label-info"> Total of ';
                if(value.count==1)
                    albumHtmlAppend+='<span class="badge badge-inverse">' + value.count + '</span> Image</span></p>';// number of images in the album ..    
                else{
                    if(value.name=='Mobile Uploads'){
                        var count=0;
                        count=value.count-1;
                        albumHtmlAppend+='<span class="badge badge-inverse">' + count + '</span> Image</span></p>';// number of images in the album ..
                    }
                    else
                        albumHtmlAppend+='<span class="badge badge-inverse">' + value.count + '</span> Images</span></p>';// number of images in the album ..
                }
                albumHtmlAppend+='<a href="#" class="albumCoverPhotolink' + key + '">';// allowing to click on album cover photos links
                albumHtmlAppend+='<img class="imgcover" id="coverphoto' + key + '" src="img/loading.gif"></img>';//cover photos of the album 
                albumHtmlAppend+='</a>';
                albumHtmlAppend+='<a href="'+value.link+'" class="albumName' + key + '"><br />';
                albumHtmlAppend+='<p><h6>Privacy - ';
                var Privacy=value.privacy;
                // privacy status
                if(Privacy=="everyone")
                    albumHtmlAppend+='<span class="badge badge-warning"> ' + Privacy.charAt(0).toUpperCase() + Privacy.slice(1) +' </span></h6></p>';
                else
                    albumHtmlAppend+='<span class="badge badge-success"> ' + Privacy.charAt(0).toUpperCase() + Privacy.slice(1) +' </span></h6></p>';
                // name of the album ..
                albumHtmlAppend+='<p><h6>' + value.name + '</h6></p>';
                // number of likes 
                if(value.likes==null){
                    albumHtmlAppend+='<p><h6>Likes - <span class="badge badge-success"> 0</span></h6>';
                }
                else{
                    albumHtmlAppend+='<p><h6>Likes - <span class="badge badge-success"> '+value.likes.data.length+'</span></h6>';
                }
                // number of comments
                if(value.comments==null){
                    albumHtmlAppend+='<h6>Comments - <span class="badge badge-success"> 0</span></h6></p>';
                }
                else{
                    albumHtmlAppend+='<h6>Comments - <span class="badge badge-success"> '+value.comments.data.length+'</span></h6></p>';
                }
                albumHtmlAppend+='</a>';// end of the page link
                albumHtmlAppend+='</div>';
                $('#userAlbums').append(albumHtmlAppend);
                $('#loading').html('');
                $('#clickToDisconnect').html('<img id="facebookLogoutButton" class="img-circle img-polaroid" src="img/logout.jpg"></img>');//show the logout button ..
            
                // popover jquery for downloading image
                $('#downloadThisAlbum'+key).popover({
                    title: '<b>Download '+value.name+'</b>',
                    content: '<img class="img-rounded" src="img/zip.jpg">',
                    placement: 'top',
                    html:true
                });
                //calling the facebook api for cover photos..
                FB.api('/' + value.cover_photo + '', function(response) {
                    // if user doesn't  has pictures ..
                    if (!response.picture) {
                        if(value.count){
                            $('#coverphoto' + key).attr("src",'img/No-Cover.jpg');
                            //goto page link
                            $('#coverphoto' +key).popover({
                                title: '<b>Please Click to view Album  !!</b>',
                                content: '<img class="img-rounded" src="img/No-Cover.jpg">',
                                placement: 'bottom',
                                html:true
                            });
                        }else
                            $('#albumCoverPhoto' + key).hide();
                    } 
                    // if he have any cover album..
                    else {
                        $('#loading_' + key).hide();
                        $('#coverphoto' + key).attr("src", response.picture);
                        //goto page link
                        $('#coverphoto' +key).popover({
                            title: '<b>Please Click to view Album  !!</b>',
                            content: '<img class="img-rounded" src="'+response.picture+'">',
                            placement: 'bottom',
                            html:true
                        });
                    }
                });
            
                // when clicked show the photos inside the albums ..
                $('.albumCoverPhotolink' + key).click(function(event) {
                    event.preventDefault();
                    show_albums_photos(value.id);
                });
                // download this album when user clicks it ..
                $('#downloadThisAlbum' + key).click(function(event) {
                    event.preventDefault();
                    downloadAlbum(value.id,value.name);
                });
            });
        }
        //get all photos for an album and hide the album view
        function show_albums_photos(album_id) {
            $('#loading').html('<img class="well" id="load" src="img/loading.gif">');//showing loading gif while facebook is sending photos
       
            FB.api('/' + album_id + '/photos', function(response) {
            
                photosInsideAlbums='';
                $('#photoInsideAlbum').html(photosInsideAlbums);
                photosInsideAlbums+='<div class="camera_wrap camera_azure_skin pattern_1" id="camera_wrap_4">';
                $.each(response.data, function(key, value) {
                    photosInsideAlbums+='<div class="imageSize" data-portrait="'+value.picture+'" data-src="'+value.source+'" data-thumb="'+value.picture+'" >';
                    if(value.name==null){
                        photosInsideAlbums+='<div class="camera_caption moveFromLeft">';
                        if(value.likes==null){
                            photosInsideAlbums+='<span class="badge badge-success"><h6>Likes - 0 ';
                        }
                        else{
                            photosInsideAlbums+='<span class="badge badge-success"><h6>Likes - '+value.likes.data.length+'';
                        }
                        if(value.comments==null){
                            photosInsideAlbums+=' & Comments - <span class="badge badge-success">0</h6></span>';
                        }
                        else{
                            photosInsideAlbums+=' & Comments - <span class="badge badge-success">'+value.comments.data.length+'</h6></span>';
                        }
                        photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbspNo tags found .. &nbsp&nbsp&nbsp&nbsp&nbsp';
                        photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                        photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbsp<div id="downloadImage" class="btn btn-info" value="DownLoad this Photo">';
                        photosInsideAlbums+='<a href="downloadImage.php?downloadImage='+value.source+'" >DownLoad this Photo</a></div>';
                        photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                    }
                    else
                    {
                        photosInsideAlbums+='<div class="camera_caption moveFromLeft">';
                        if(value.likes==null){
                            photosInsideAlbums+='<span class="badge badge-success"><h6>Likes - 0 ';
                        }
                        else{
                            photosInsideAlbums+='<span class="badge badge-success"><h6>Likes - '+value.likes.data.length+'';
                        }
                        if(value.comments==null){
                            photosInsideAlbums+=' & Comments - 0 </h6></span>';
                        }
                        else{
                            photosInsideAlbums+=' & Comments - '+value.comments.data.length+'</h6></span>';
                        }
                        photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbsp'+value.name+'&nbsp&nbsp&nbsp&nbsp&nbsp';
                        photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                        photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbsp<div id="downloadImage" class="btn btn-info" value="DownLoad this Photo">';
                        photosInsideAlbums+='<a href="downloadImage.php?downloadImage='+value.source+'">DownLoad this Photo</a></div>';
                        photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                    }
                    photosInsideAlbums+='</div>';
                });
                photosInsideAlbums+='</div>';
                $("body").fadeIn('slow').css("background-image","none").css('background-color', '#00334C');//showing a background image
                $('#photoInsideAlbum').append(photosInsideAlbums);
                // This is a jquery plugin to loop through each pic in the facebok album
                jQuery(function(){
                    jQuery('#camera_wrap_4').camera({
                        height: 'auto',
                        pagination: false,
                        thumbnails: false,
                        hover: false,
                        opacityOnGrid: false,
                        fx: 'scrollRight',
                        transPeriod: 2000,
                        imagePath: 'https://fbcdn-photos-g-a.akamaihd.net/'
                    });
                });
            
                $('#mainLabel').hide();
                $('#clickToDisconnect').html('');// hiding the logout button
                $('#containgAlbumCover').hide();// hiding the list of albums
                $('.fluid_container').show();
                $('#back').html('<img id="backAndDownloadButton" class="img-circle img-poloroid" src="img/back.jpg"></img>');
                $('#loading').html(''); //hideing the loading image ..
            });
        }
        // this a jquery click event to logout from the system ..
        $('#clickToDisconnect').click(function(){
            FB.logout(function(response) {
                $('#containgAlbumCover').slideUp("fast");
                $('#loginMsg').hide('slow');
                $('#loadingForDownload').hide();
                $('#displayName').hide();
                $('#clickToConnect').show();
                $('#clickToDisconnect').html('');
            });
            // showing the logout msg
            $('#logoutMsg').html('<div class="alert alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                        <strong>Sucessfull !!</strong>\n\
                         Congratulation you have successfully Logged OUT the system.</div>').delay(4000).slideUp('fast');
        });
        //this is the jquery for going back to the main list of album page ..
        $('#back').click(function(){
            $('#back').html('');
            $('#mainLabel').show();
            $('#loading').html('<img class="well" id="load" src="img/loading.gif">');//showing loading gif while facebook is sending photos
            $('.fluid_container').hide();// hiding the list of images in a particular album
            $('#containgAlbumCover').show(); //showing the list of albums
            $('#clickToDisconnect').html('<img id="facebookLogoutButton" class="img-circle img-polaroid" src="img/logout.jpg"></img>');// hiding the list of albums
            $('#loading').html(''); //showing the loading image ..
        });
        // this is a function which uses ajax to send some data and start the progress bar
        function downloadAlbum(album_id,name){
            $("body").css("overflow", "hidden");
            var id=album_id;
            var album_name=name;
            var key=this.albumCounter;
            for(var i=0;i< this.albumCounter;i++)
                $('#downloadThisAlbum'+i).hide().animate({
                    opacity: 0
                }, 1000).popover('disable');
            var count=0.0;
            setInterval(function() {
                if(count!=100.00){
                    var loadingForDownload='<div id="close" class="alert alert-success">';
                    loadingForDownload+='<div class="well well-small">';
                    loadingForDownload+='<p><h3>-- <strong>'+album_name+' --</strong></h3>will be downloaded in a while, Please wait..</p></div>';
                    loadingForDownload+='<div class="well well-small" id="showDownload"><div class="progress progress-striped active">';
                    loadingForDownload+='<div class="bar" style="width: '+count+'%;"></div></div>';
                    loadingForDownload+='<div class="">';
                    loadingForDownload+='<strong> ( Building the zip - '+Math.floor(count)+' % Compeleted ) </strong>';
                    loadingForDownload+='<button id="clickToDownload" name="filter" class="disabled btn btn-large" data-loading-text="Downloading..">';
                    loadingForDownload+='Click to Download</button>';
                    loadingForDownload+='</div></div>';
                    $('#loadingForDownload').html(loadingForDownload).show(); //showing the loading image ..
                    count=count+0.50;
                }
                $('#cancelDownload').click(function(){
                    count=100.00;
                    $('#loadingForDownload').html(''); //hiding the loading image ..
                    for(var j=0;j< key;j++)
                        $('#downloadThisAlbum'+j).show().animate({
                            opacity: 1
                        }, 1000).popover('enable');
                }); 
            }, 100);
            // cancel all the images
            $.ajax({ //Ajax call to download script to get the photos and zip them
                type: "POST",
                data: {
                    id: album_id,
                    name: album_name,
                    access: accessToken
                },
                url: "zipAlbum.php",
                success: function(){
                    count=100;
                    var showDownload='<div class="progress progress-success progress-striped">';
                    showDownload+='<div class="bar" style="width: 100%;"></div>';
                    showDownload+='</div><div class="">';
                    showDownload+='<strong> ( Building the zip- '+Math.floor(count)+' % Compeleted ) </strong>';
                    showDownload+='<button id="clickToDownload" name="filter" class="btn btn-large btn-success" data-loading-text="Downloading..">';
                    showDownload+='Click to Download</button>';
                    showDownload+='<button id="cancelDownload" name="filter" class="btn btn-large" data-loading-text="Downloading..">';
                    showDownload+='Cancel</button>';
                    showDownload+='</div>'
                    $('#showDownload').html(showDownload).show();
                    $('#clickToDownload').click(function(){
                        $("body").css("overflow", "visible");
                        //On Completion of Zipping all the files, Request for headers to prompt user for download
                        window.location.href="downloadZip.php?id="+id+"&name="+album_name;                    
                        $('#loadingForDownload').delay(1000).slideUp("slow").html(''); //hiding the loading image ..
                        for(var j=0;j< key;j++)
                            $('#downloadThisAlbum'+j).show().animate({
                                opacity: 1
                            }, 1000).popover('enable');
                    });                
                    $('#cancelDownload').click(function(){
                        $('#loadingForDownload').delay(1000).slideUp("slow").html(''); //hiding the loading image ..
                        for(var j=0;j< key;j++)
                            $('#downloadThisAlbum'+j).show().animate({
                                opacity: 1
                            }, 1000).popover('enable');
                    }); 
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    return false;
                }
            });
        }// download albums ends
    });// document ready ends ..
});// window load ends ..