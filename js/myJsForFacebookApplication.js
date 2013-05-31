/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var accessToken='';
var albumCounter=0;
// this is a function which uses ajax to send some data and start the progress bar
function downloadAlbum(album_id){
    $('#loading').html('<img class="well" id="load" src="../images/loading.gif">');//showing loading gif while facebook is sending photos
    $('#downloadbtn').html('');
    var accessTokenis='';
    var albumName='';
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            accessTokenis = response.authResponse.accessToken;
            if (response.authResponse) {
                token = response.authResponse.accessToken;
                FB.api('/' + album_id, function(response) {
                    albumName=response.name;
                    if(accessTokenis==null || accessTokenis==''){
                        window.location.href="../../";
                    }
                    else{
                        $("body").css("overflow", "hidden");
                        var id=album_id;
                        var album_name=albumName;
                        var key=this.albumCounter;
                        var count=0.0;
                        $('#loading').html('');
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
                            }); 
                        }, 100);
                        $.ajax({ //Ajax call to download script to get the photos and zip them
                            type: "POST",
                            data: {
                                id: album_id,
                                name: album_name,
                                access: accessTokenis
                            },
                            url: "../../zipAlbum.php",
                            success: function(data){
                                $('#resulted').html(data);
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
                                    window.location.href="../../downloadZip.php?id="+id+"&name="+album_name;      
                                    $('#loadingForDownload').html('').hide(); //hiding the loading image ..
                                    $('#downloadbtn').html('<button class="btn btn-inverse"\n\
                                                                  onclick="downloadAlbum(albumidis)">\n\
                                                                  Download This Album Again</button>');
                                });                
                                $('#cancelDownload').click(function(){
                                    window.location.href="../../";
                                }); 
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown){
                                alert("Downloading files not found on server : 500 (Internal Server Error) ");
                                $('#loadingForDownload').html('').hide(); //hiding the loading image ..
                                return false;
                            }
                        });
                    }
                // do something here they are logged in and have given you perms   
                });
            } else {
            // no user session available, someone you dont know
            }
        } else if (response.status === 'not_authorized') {
            window.location.href="../../";
        } else {
            
            if(accessTokenis==null || accessTokenis==""){
                alert("It seems that you are not login. Please login to Download the Albums");
                window.location.href="../../";
            }
        }
    });
    
}// download albums ends

//get all photos for an album and hide the album view
function show_albums_photos(album_id) {
    var accessTokenis='';
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            accessTokenis = response.authResponse.accessToken;
        } else if (response.status === 'not_authorized') {
            window.location.href="../../";
        } else {
            window.location.href="../../";
        }
    });
    if(accessTokenis==null || accessTokenis==""){
        alert("It seems that you are not login. Please login to start the Slideshow");
        window.location.href="../../";
    }
    else{
        FB.api('/' + album_id + '/photos', function(response) {
            var photosInsideAlbums='';
            $('#photoInsideAlbum').html(photosInsideAlbums);
            photosInsideAlbums+='<div class="camera_wrap camera_black_skin pattern_1" id="camera_wrap_4">';
            $.each(response.data, function(key, value) {
                if(response.data.length==1){
                    // first image
                    photosInsideAlbums+='<div class="imageSize" data-portrait="'+value.picture+'" data-src="'+value.source+'" data-thumb="'+value.picture+'" >';
                    if(value.name==null){
                        photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
                        if(value.likes==null){
                            photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> 0 ';
                        }
                        else{
                            photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> '+value.likes.data.length+'';
                        }
                        if(value.comments==null){
                            photosInsideAlbums+=' <i class="icon-edit icon-white"></i> 0';
                        }
                        else{
                            photosInsideAlbums+=' <i class="icon-edit icon-white"></i> '+value.comments.data.length+'';
                        }
                        photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbspNo tags found .. &nbsp&nbsp&nbsp&nbsp&nbsp';
                        photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                        photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                    }
                    else
                    {
                        photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
                        if(value.likes==null){
                            photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> 0 ';
                        }
                        else{
                            photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> '+value.likes.data.length+'';
                        }
                        if(value.comments==null){
                            photosInsideAlbums+=' <i class="icon-edit icon-white"></i> 0 ';
                        }
                        else{
                            photosInsideAlbums+=' <i class="icon-edit icon-white"></i> '+value.comments.data.length+'';
                        }
                        photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbsp'+value.name+'&nbsp&nbsp&nbsp&nbsp&nbsp';
                        photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                        photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                    }
                    photosInsideAlbums+='</div>';
                    // second image same as the first image
                    photosInsideAlbums+='<div class="imageSize" data-portrait="'+value.picture+'" data-src="'+value.source+'" data-thumb="'+value.picture+'" >';
                    if(value.name==null){
                        photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
                        if(value.likes==null){
                            photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> 0 ';
                        }
                        else{
                            photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> '+value.likes.data.length+'';
                        }
                        if(value.comments==null){
                            photosInsideAlbums+=' <i class="icon-edit icon-white"></i> 0';
                        }
                        else{
                            photosInsideAlbums+=' <i class="icon-edit icon-white"></i> '+value.comments.data.length+'';
                        }
                        photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbspNo tags found .. &nbsp&nbsp&nbsp&nbsp&nbsp';
                        photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                        photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                    }
                    else
                    {
                        photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
                        if(value.likes==null){
                            photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> 0 ';
                        }
                        else{
                            photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> '+value.likes.data.length+'';
                        }
                        if(value.comments==null){
                            photosInsideAlbums+=' <i class="icon-edit icon-white"></i> 0 ';
                        }
                        else{
                            photosInsideAlbums+=' <i class="icon-edit icon-white"></i> '+value.comments.data.length+'';
                        }
                        photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbsp'+value.name+'&nbsp&nbsp&nbsp&nbsp&nbsp';
                        photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                        photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                    }
                    photosInsideAlbums+='</div>';
                    return false;
                }
                this.albumCounter++;
                photosInsideAlbums+='<div class="imageSize" data-portrait="'+value.picture+'" data-src="'+value.source+'" data-thumb="'+value.picture+'" >';
                if(value.name==null){
                    photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
                    if(value.likes==null){
                        photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> 0 ';
                    }
                    else{
                        photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> '+value.likes.data.length+'';
                    }
                    if(value.comments==null){
                        photosInsideAlbums+=' <i class="icon-edit icon-white"></i> 0';
                    }
                    else{
                        photosInsideAlbums+=' <i class="icon-edit icon-white"></i> '+value.comments.data.length+'';
                    }
                    photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbspNo tags found .. &nbsp&nbsp&nbsp&nbsp&nbsp';
                    photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                    photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                }
                else
                {
                    photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
                    if(value.likes==null){
                        photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> 0 ';
                    }
                    else{
                        photosInsideAlbums+='<i class="icon-thumbs-up icon-white"></i> '+value.likes.data.length+'';
                    }
                    if(value.comments==null){
                        photosInsideAlbums+=' <i class="icon-edit icon-white"></i> 0 ';
                    }
                    else{
                        photosInsideAlbums+=' <i class="icon-edit icon-white"></i> '+value.comments.data.length+'';
                    }
                    photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbsp'+value.name+'&nbsp&nbsp&nbsp&nbsp&nbsp';
                    photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                    photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                }
                photosInsideAlbums+='</div>';
            });
            photosInsideAlbums+='</div>';
        
            $('#photoInsideAlbum').append(photosInsideAlbums);
            // This is a jquery plugin to loop through each pic in the facebok album
            jQuery(function(){
                jQuery('#camera_wrap_4').camera({
                    height: 'auto',
                    loader: 'bar',
                    pagination: false,
                    thumbnails: false,
                    hover: false,
                    opacityOnGrid: false,
                    fx: 'random',
                    transPeriod: 0,
                    time: 7000,
                    loaderOpacity: .5,
                    loaderPadding: 2,
                    loaderStroke: 10,
                    pieDiameter: 75,
                    imagePath: 'https://fbcdn-photos-g-a.akamaihd.net/'
                });
            });
            
            $('#mainLabel').hide();
            $('#containgAlbumCover').hide();// hiding the list of albums
            $('.fluid_container').show();
            $('#back').html('<img id="backAndDownloadButton" class="img-circle img-poloroid" src="images/back.jpg"></img>');
            $('#loading').html(''); //hideing the loading image ..
        });
    }
}
$(window).load(function(){// UPON LOADING THE ENTIRE WINDOW
    $(document).ready(function(){ // DOCUMENT FIRST LOADS WITH THE SDK's
				
        //when the document is ready ..
        $('#logoutMsg').html('');
        $("#loginMsg").click(function(){
            $("#loginMsg").delay(4000).slideUp('fast');
        });
    
        var facebookAuthorizationResponse;
        window.fbAsyncInit = function() {
            FB.init({
                appId: appId,// App ID
                status: true,// check login status
                cookie: true,// enable cookies to allow the server to access the session
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
               
        var accessToken='';
        // jquery to login if the user is already login
        $(document).on('fbload',function(){//  <---- HERE'S OUR CUSTOM EVENT BEING LISTENED FOR
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    var uid = response.authResponse.userID;
                    accessToken = response.authResponse.accessToken;
                    $('#connectWithIt').html('');
                    ifConnected(response.name);
                } else if (response.status === 'not_authorized') {// the user is logged in to Facebook, 
                    alert("Not Authorised");// but has not authenticated your app
                } else {
                    // the user isn't logged in to Facebook.
                    $('#connectWithIt').html('<i class="icon-user icon-white"></i> Login');
                }
            });
        });
        //jquery if the user clicks on the facebook login button
        $("#connectWithIt").click(function() {
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
                    ifConnected(response.name);
                } else {}
            }, {
                scope: 'email,user_photos'
            });
        }
        function ifConnected(UserNameis){
            $('#loading').html('<img class="well" id="load" src="images/loading.gif">');//showing loading gif while facebook is sending photos
            // showing the login msg
            $('#loginMsg').html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                        <strong>Sucessfull !!</strong>\n\
                         Congratulation you have successfully Logged IN into the system.</div>').delay(4000).slideUp('fast');
            //Get User Name
            var displayNameAndImage='',displayImg='';
            FB.api('/me?fields=picture,name',function(respo){
                displayImg+='<a href="https://www.facebook.com/"><img class="media-object" data-src="holder.js/64x64" alt="64x64"';
                displayImg+='style="width: 25px; height: 25px;" src="'+respo.picture.data.url+'"></img></a>';
                displayNameAndImage+='<a href="http://albumdownloader.funpic.org"><i class="icon-share-alt icon-white"></i> '+respo.name+"</a>";
                $("#displayImg").html(displayImg).show();// display the current user name ..
                $("#displayName").html(displayNameAndImage).show();// display the current user name ..
            });
            $("#clickToConnect").html('');// hidding the facebook button ..
            //show all ablums of user ..
            FB.api('/me/albums', showAlbums);
        }
        var photosInsideAlbums='';
        // this is a function which gets all the albums cover image using response got from facebook api
        function showAlbums(response) {
            //showing loading gif while facebook is sending photos
            $('#loading').html('<img class="well" id="load" src="images/loading.gif">');
            $('#containgAlbumCover').show();
        
            $('#userAlbums').empty();
            
            // loop through each json object and get the name, count, privacy, likes, comments on a particular album
            $.each(response.data, function(key, value) {
                //create html structure
                var albumHtmlAppend='';
                photosInsideAlbums='';
                $('#photoInsideAlbum').html(photosInsideAlbums);
                albumHtmlAppend += '<div id="albumCoverPhoto' + key + '" class="span4"> ';// album cover photos div
            
                albumHtmlAppend+='<p id="pageLink">';
                albumHtmlAppend+='<i id="downloadThisAlbum'+key+'" class="downloadThisAlbum">';
                albumHtmlAppend+='<button class="btn btn-inverse" type="button">';
                albumHtmlAppend+='<i class="icon-download-alt icon-white"></i> Download - ';
                if(value.count==1)
                    albumHtmlAppend+='' + value.count + ' Photos </button></p>';// number of images in the album ..    
                else{
                    if(value.name=='Mobile Uploads'){
                        var count=0;
                        count=value.count-1;
                        albumHtmlAppend+='' + count + ' Photo</button></p>';// number of images in the album ..
                    }
                    else
                        albumHtmlAppend+='' + value.count + ' Photos </button></p>';// number of images in the album ..
                }
                albumHtmlAppend+='</i>';
                albumHtmlAppend+='<li class="">';
                albumHtmlAppend+='<div class="thumbnail">';//div thumbnail
                albumHtmlAppend+='<a href="#" class="thumbnail albumCoverPhotolink' + key + '">';//cover image
                albumHtmlAppend+='<img id="coverphoto' + key + '" style="height:160px" src="images/loading.gif" />';
                albumHtmlAppend+='</a>';// coverimage ends
                albumHtmlAppend+='<div class="caption">';
                // name of the album ..
                albumHtmlAppend+='<a href="'+value.link+'" class="albumName' + key + '"><br />';
                var length = 20;  // set to the number of characters you want to keep
                var pathname = value.name;
                var trimmedPathname = pathname.substring(0, Math.min(length,pathname.length));
                var Privacy=value.privacy;
                // privacy status
                if(Privacy=="everyone")
                    albumHtmlAppend+='<tr><td><i class="icon-eye-open"></i>';
                else
                    albumHtmlAppend+='<tr><td><i class="icon-eye-close"></i>';
                
                if(trimmedPathname!=value.name)
                    albumHtmlAppend+='<i id="photoName"> ' + trimmedPathname + ' ..</i></tr>';// dot appended
                else
                    albumHtmlAppend+='<i id="photoName"> ' + trimmedPathname + '</i></tr>';// no dot appended
                albumHtmlAppend+='</a>';
                // end of the name of the album
                // 
                // likes and comments starts
                albumHtmlAppend+='<table align="center">';
                
                // number of likes 
                if(value.likes==null){
                    albumHtmlAppend+='<tr><td><i class="icon-thumbs-up"></i></td><td><span class="badge badge-inverse"> 0 </span>';
                }
                else{
                    albumHtmlAppend+='<tr><td><i class="icon-thumbs-up"></i></td><td><span class="badge badge-inverse"> '+value.likes.data.length+' </span>';
                }
                // number of comments
                if(value.comments==null){
                    albumHtmlAppend+=' <i class="icon-edit"></i></td><td><span class="badge badge-inverse"> 0</span></td></tr>';
                }
                else{
                    albumHtmlAppend+=' <i class="icon-edit"></i></td><td><span class="badge badge-inverse"> '+value.comments.data.length+'</span></td></tr>';
                }
                // privacy likes and commenst ends
                albumHtmlAppend+='</div>';// end thumbnail
                albumHtmlAppend+='</li>';
                albumHtmlAppend+='</table>';
                albumHtmlAppend+='</div>';
                $('#userAlbums').append(albumHtmlAppend);
                $('#loading').html('');
                $('#clickToDisconnect').html('<i class="icon-off icon-white"></i> Logout');//show the logout button ..
                $('#clickToDisconnect').show().animate({
                    opacity: 1
                }, 1000).popover('enable');
               
                //calling the facebook api for cover photos..
                FB.api('/' + value.cover_photo + '', function(response) {
                    // if user doesn't  has pictures ..
                    if (!response.picture) {
                        if(value.count){
                            $('#coverphoto' + key).attr("src",'images/No-Cover.jpg');
                        }else
                            $('#albumCoverPhoto' + key).hide();
                    } 
                    // if he have any cover album..
                    else {
                        $('#loading_' + key).hide();
                        $('#coverphoto' + key).attr("src", response.picture);
                    }
                });
            
                // when clicked show the photos inside the albums ..
                $('.albumCoverPhotolink' + key).click(function(event) {
                    event.preventDefault();
                    //show_albums_photos(value.id);
                    window.location.href="album/view/"+value.id;
                });
                // download this album when user clicks it ..
                $('#downloadThisAlbum' + key).click(function(event) {
                    event.preventDefault();
                    //downloadAlbum(value.id,value.name);
                    var nameis=value.name.replace("..","_");
                    nameis=nameis.replace("(","_");
                    nameis=nameis.replace(")","_");
                    nameis=nameis.replace(/ /g,"_");
                    window.location.href="albums/download/"+value.id;
                });
            });
        }
        // this a jquery click event to logout from the system ..
        $('#clickToDisconnect').click(function(){
            FB.logout(function(response) {
                $('#containgAlbumCover').slideUp("fast");
                $('#loginMsg').hide('slow');
                $('#loadingForDownload').hide();
                $('#displayName').hide();
                $('#connectWithIt').html('<i class="icon-user icon-white"></i> Login');
                $('#clickToDisconnect').html('Logout');
                $('#clickToDisconnect').hide().animate({
                    opacity: 0
                }, 1000).popover('disable');
            });
            // showing the logout msg
            $('#logoutMsg').html('<div class="alert alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                        <strong>Sucessfull !!</strong>\n\
                         Congratulation you have successfully Logged OUT the system.</div>').delay(4000).slideUp('fast');
        });
    });// document ready ends ..
});// window load ends ..