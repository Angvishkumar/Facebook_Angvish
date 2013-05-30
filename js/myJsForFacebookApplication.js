/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var accessToken='';
var albumCounter=0;
// this is a function which uses ajax to send some data and start the progress bar
function downloadAlbum(album_id,name){
    $('#loading').html('<img class="well" id="load" src="images/loading.gif">');//showing loading gif while facebook is sending photos
    
    var accessTokenis='';
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            accessTokenis = response.authResponse.accessToken;
        } else if (response.status === 'not_authorized') {
            window.location.href="./";
        } else {
            window.location.href="./";
        }
    });
    if(accessTokenis==null || accessTokenis==""){
        alert("It seems that you are not login. Please login to downlaod the Photos");
        window.location.href="./";
    }
    else{
        $("body").css("overflow", "hidden");
        var id=album_id;
        var album_name=name;
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
                    window.location.href="./";
                }); 
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                alert("It seems that you are not login. Please login to downlaod the Photos");
                return false;
            }
        });
    }
}// download albums ends

//get all photos for an album and hide the album view
function show_albums_photos(album_id) {
    
    var accessTokenis='';
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            accessTokenis = response.authResponse.accessToken;
        } else if (response.status === 'not_authorized') {
            window.location.href="./";
        } else {
            window.location.href="./";
        }
    });
    if(accessTokenis==null || accessTokenis==""){
        alert("It seems that you are not login. Please login to start the slideshow");
        window.location.href="./";
    }
    else{
        FB.api('/' + album_id + '/photos', function(response) {
            var photosInsideAlbums='';
            $('#photoInsideAlbum').html(photosInsideAlbums);
            photosInsideAlbums+='<div class="camera_wrap camera_azure_skin pattern_1" id="camera_wrap_4">';
            $.each(response.data, function(key, value) {
                console.log(response.data.length);
                if(response.data.length==1){
                    // first image
                    photosInsideAlbums+='<div class="imageSize" data-portrait="'+value.picture+'" data-src="'+value.source+'" data-thumb="'+value.picture+'" >';
                    if(value.name==null){
                        photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
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
                        photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
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
                    // second image same as the first image
                    photosInsideAlbums+='<div class="imageSize" data-portrait="'+value.picture+'" data-src="'+value.source+'" data-thumb="'+value.picture+'" >';
                    if(value.name==null){
                        photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
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
                        photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
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
                    return false;
                }
                this.albumCounter++;
                photosInsideAlbums+='<div class="imageSize" data-portrait="'+value.picture+'" data-src="'+value.source+'" data-thumb="'+value.picture+'" >';
                if(value.name==null){
                    photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
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
                    photosInsideAlbums+='<div class="camera_caption fadeFromBottom">';
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
        
            $('#photoInsideAlbum').append(photosInsideAlbums);
            // This is a jquery plugin to loop through each pic in the facebok album
            jQuery(function(){
                jQuery('#camera_wrap_4').camera({
                    height: 'auto',
                    pagination: false,
                    thumbnails: false,
                    hover: false,
                    opacityOnGrid: false,
                    fx: 'random',
                    transPeriod: 0,
                    imagePath: 'https://fbcdn-photos-g-a.akamaihd.net/'
                });
            });
            
            $('#mainLabel').hide();
            $('#clickToDisconnect').html('');// hiding the logout button
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
        // click here to connect popover
        $("#clickToConnect").popover({
            title: '<b>Login</b>', 
            content: '<img class="img-rounded" src="images/popoverlogin.jpg" />', 
            placement: 'bottom',
            html:true
        });        // click to disconnect popover
        $("#clickToDisconnect").popover({
            title: '<b>Logout</b>', 
            content: '<img class="img-rounded" src="images/popoverlogout.jpg" />', 
            placement: 'bottom',
            html:true
        });
        // click to disconnect popover
        $("#backAndDownloadButton").popover({
            title: '<b>Back to Album</b>', 
            content: '<img class="img-rounded" src="images/album.jpg" />', 
            placement: 'right',
            html:true
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
                    ifConnected(response.name);
                } else if (response.status === 'not_authorized') {// the user is logged in to Facebook, 
                    alert("Not Authorised");// but has not authenticated your app
                } else {
                    // the user isn't logged in to Facebook.
                    $('#connectWithIt').html('<div id="clickToConnect" ><img rel="popover" data-content="Click to Login" data-original-title="Login" id="facebookLoginButton" src="images/connect.jpg"/></div>');
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
            var displayNameAndImage='';
            FB.api('/me?fields=picture,name',function(respo){
                displayNameAndImage+='<h3 class="well well-small" id="displayUserName"><a href="https://www.facebook.com/">';
                displayNameAndImage+='<span class="label label-info"><img class="img-circle img-polaroid" src="'+respo.picture.data.url+'"></img></span>';
                displayNameAndImage+='<strong id="namePopup"> '+respo.name+"</strong></a></h3>";
                $("#displayName").html(displayNameAndImage).show();// display the current user name ..
            });
            $("#clickToConnect").hide();// hidding the facebook button ..
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
                albumHtmlAppend+=' <span class="label label-info"><i class="icon-download-alt"></i> Download ';
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
                albumHtmlAppend+='</i>';
                albumHtmlAppend+='<li class="span3">';
                albumHtmlAppend+='<div class="thumbnail">';//div thumbnail
                albumHtmlAppend+='<a href="#" class="thumbnail albumCoverPhotolink' + key + '">';//cover image
                albumHtmlAppend+='<img id="coverphoto' + key + '" data-src="holder.js/260x180" alt="" src="images/loading.gif" />';
                albumHtmlAppend+='</a>';// coverimage ends
                albumHtmlAppend+='<div class="caption">';
                // name of the album ..
                albumHtmlAppend+='<a href="'+value.link+'" class="albumName' + key + '"><br />';
                var length = 20;  // set to the number of characters you want to keep
                var pathname = value.name;
                var trimmedPathname = pathname.substring(0, Math.min(length,pathname.length));
                if(trimmedPathname!=value.name)
                    albumHtmlAppend+='<h6>' + trimmedPathname + ' ..</h6>';// dot appended
                else
                    albumHtmlAppend+='<h6>' + trimmedPathname + '</h6>';// no dot appended
                albumHtmlAppend+='</a>';
                // end of the name of the album
                // 
                // privacy likes and comments starts
                albumHtmlAppend+='<table align="center">';
                albumHtmlAppend+='<tr><h6><td>Privacy - </td>';
                var Privacy=value.privacy;
                // privacy status
                if(Privacy=="everyone")
                    albumHtmlAppend+='<td><span class="badge badge-warning"> ' + Privacy.charAt(0).toUpperCase() + Privacy.slice(1) +' </span></h6></p></tr>';
                else
                    albumHtmlAppend+='<td><span class="badge badge-success"> ' + Privacy.charAt(0).toUpperCase() + Privacy.slice(1) +' </span></h6></p></tr>';
                
                // number of likes 
                if(value.likes==null){
                    albumHtmlAppend+='<tr><p><h6><td>Likes - </td><td><span class="badge badge-success"> 0</span></td></h6></tr>';
                }
                else{
                    albumHtmlAppend+='<tr><p><h6><td>Likes - </td><td><span class="badge badge-success"> '+value.likes.data.length+'</span></td></h6></tr>';
                }
                // number of comments
                if(value.comments==null){
                    albumHtmlAppend+='<tr><h6><td>Comments - </td><td><span class="badge badge-success"> 0</span></td></h6></p></tr>';
                }
                else{
                    albumHtmlAppend+='<tr><h6><td>Comments - </td><td><span class="badge badge-success"> '+value.comments.data.length+'</span></td></h6></p></tr>';
                }
                // privacy likes and commenst ends
                albumHtmlAppend+='</div>';// end thumbnail
                albumHtmlAppend+='</li>';
                albumHtmlAppend+='</table>';
                albumHtmlAppend+='</div>';
                $('#userAlbums').append(albumHtmlAppend);
                $('#loading').html('');
                $('#clickToDisconnect').html('<img id="facebookLogoutButton" class="img-circle img-polaroid" src="images/logout.jpg"></img>');//show the logout button ..
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
                    window.location.href=value.id;
                });
                // download this album when user clicks it ..
                $('#downloadThisAlbum' + key).click(function(event) {
                    event.preventDefault();
                    //downloadAlbum(value.id,value.name);
                    var nameis=value.name.replace("..","_");
                    nameis=nameis.replace("(","_");
                    nameis=nameis.replace(")","_");
                    nameis=nameis.replace(/ /g,"_");
                    window.location.href=value.id+"/"+nameis;
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
                $('#connectWithIt').html('<div id="clickToConnect" ><img rel="popover" data-content="Click to Login" data-original-title="Login" id="facebookLoginButton" src="images/connect.jpg"/></div>');
                $('#clickToDisconnect').html('');
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