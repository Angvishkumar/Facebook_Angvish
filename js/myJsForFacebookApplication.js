/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){ //when the document is ready ..
    $('#clickToDisconnect').hide();// hide the logout button when the document is ready ..
    $('#loading').hide();// hide the loading image when the document is ready ..
    $('#toBackAndDownloadButton').hide(); // hiding the back and download button ..
    
    $("#loginMsg").click(function(){
        $("#loginMsg").delay(4000).slideUp('fast');
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

    // Additional initialization code here
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
    // jquery to Authanticate User with app by asking for emailid and password 
    $("#facebookLoginButton").click(function() {
        FB.login(function(response) {
            if (response.authResponse) {
                facebookAuthorizationResponse=response;
                accessToken=response.authResponse.accessToken;
                //Set Accesstoken of user in session
                $.ajax({
                    url: 'someFacebookFunction.php',
                    type: 'post',
                    data: {
                        'accesstoken' : response.authResponse.accessToken
                    },
                    success: function(data) {
                    }
                });
                $('#loading').show();//showing loading gif while facebook is sending photos
                // showing the login msg
                $('#loginMsg').html('<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                        <strong>Sucessfull !!</strong>\n\
                         Congratulation you have successfully Logged IN into the system.</div>').delay(1000).slideDown('slow');
                $('#loginMsg').delay(5000).slideUp('slow');
                //Get User Name
                var displayNameAndImage='';
                FB.api('/me?fields=picture,name',function(respo){
                    displayNameAndImage+='<h3 id="displayUserName"><a href="https://www.facebook.com/">';
                    displayNameAndImage+='<span class="label label-inverse"><img class="img-circle img-polaroid" src="'+respo.picture.data.url+'"></img></span>';
                    displayNameAndImage+='<strong><b><i id="userName"> '+respo.name+"</b></i></strong></a></h3>";
                    $("#displayName").html(displayNameAndImage).show();// display the current user name ..
                });
                $("#clickToConnect").hide();// hidding the facebook button ..
                    
                //show all ablums of user ..
                FB.api('/me/albums', showAlbums);
                
            } else {
                alert("Not connected to Network !!");
            }
        }, {
            scope: 'email,user_photos'
        });
    });
    var photosInsideAlbums='';
    function showAlbums(response) {
        $('#loading').show();//showing loading gif while facebook is sending photos
        $('#containgAlbumCover').show();
        
        $('#userAlbums').empty();
        $.each(response.data, function(key, value) {
            //create html structure
            var albumHtmlAppend='';
            photosInsideAlbums='';
            //$('#userAlbums').html(albumHtmlAppend);
            //document.getElementById("userAlbums").value="";
            $('#photoInsideAlbum').html(photosInsideAlbums);
            albumHtmlAppend += '<div id="albumCoverPhoto' + key + '" class="span3"> ';// album cover photos div
            albumHtmlAppend+='<a href="#" class="albumCoverPhotolink' + key + '">';// allowing to click on album cover photos links
            albumHtmlAppend+='<img class="imgcover" id="coverphoto' + key + '" src="img/loading.gif"></img>';//cover photos of the album 
            albumHtmlAppend+='</a>';
            albumHtmlAppend+='<a href="'+value.link+'" class="albumName' + key + '">';
            albumHtmlAppend+='<h6>' + value.name + '</h6>';// name of the album ..
            albumHtmlAppend+='</a>';
            albumHtmlAppend+='<p id="pageLink">';
            albumHtmlAppend+='<i id="downloadThisAlbum'+key+'" class="downloadThisAlbum">';
            albumHtmlAppend+='<img class="img-circle img-polaroid" src="img/download.jpg"></img>';
            albumHtmlAppend+='</i>';
            albumHtmlAppend+='<span class="label label-success"> Total of ';
            if(value.count==1)
                albumHtmlAppend+='<span class="badge badge-info">' + value.count + '</span> Image</span></p>';// number of images in the album ..    
            else{
                if(value.name=='Mobile Uploads'){
                    var count=0;
                    count=value.count-1;
                    albumHtmlAppend+='<span class="badge badge-info">' + count + '</span> Image</span></p>';// number of images in the album ..
                }
                else
                    albumHtmlAppend+='<span class="badge badge-info">' + value.count + '</span> Images</span></p>';// number of images in the album ..
            }
            albumHtmlAppend+='</div>';

            $('#userAlbums').append(albumHtmlAppend);
            $('#loading').hide();
            $('#clickToDisconnect').show();//show the logout button ..
            
            //calling the facebook api for cover photos..
            FB.api('/' + value.cover_photo + '', function(response) {
                // if user doesn't  has pictures ..
                if (!response.picture) {
                    if(value.count)
                        $('#coverphoto' + key).attr("src",'img/No-Cover.jpg');
                    //hidding the album cover photo's
                    else
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
        $('#loading').show(); //showing the loading image ..
        FB.api('/' + album_id + '/photos', function(response) {
            
            photosInsideAlbums='';
            $('#photoInsideAlbum').html(photosInsideAlbums);
            photosInsideAlbums+='<div class="camera_wrap camera_azure_skin pattern_1" id="camera_wrap_1">';
            $.each(response.data, function(key, value) {
                photosInsideAlbums+='<div class="imageSize" data-src="'+value.source+'" data-thumb="'+value.picture+'" >';
                //alert('href="../someFacebookFunction.php?downloadImage='+value.source+'"');
                if(value.name==null){
                    photosInsideAlbums+='<div class="camera_caption moveFromLeft">No tags found .. &nbsp&nbsp&nbsp&nbsp&nbsp';
                    photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                    photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbsp<div id="downloadImage" class="btn btn-info" value="DownLoad this Photo">';
                    photosInsideAlbums+='<a href="downloadImage.php?downloadImage='+value.source+'"  target="_blank">DownLoad this Photo</a></div>';
                    photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                //$('#downloadImage').attr("href",value.source);
                }
                else
                {
                    photosInsideAlbums+='<div class="camera_caption moveFromLeft">'+value.name+'&nbsp&nbsp&nbsp&nbsp&nbsp';
                    photosInsideAlbums+='<a id="pageLink" href="'+value.link+'">Go To page</a>';
                    photosInsideAlbums+='&nbsp&nbsp&nbsp&nbsp&nbsp<div id="downloadImage" class="btn btn-info" value="DownLoad this Photo">';
                    photosInsideAlbums+='<a href="downloadImage.php?downloadImage='+value.source+'"  target="_blank">DownLoad this Photo</a></div>';
                    photosInsideAlbums+='</div>';// camera fade from bottom ends ..
                //$('#downloadImage').attr("href",value.source);
                }
                photosInsideAlbums+='</div>';
            });
            photosInsideAlbums+='</div>';
            $('#photoInsideAlbum').append(photosInsideAlbums);
            jQuery(function(){
                jQuery('#camera_wrap_1').camera({
                    height: '65%',
                    pagination: true,
                    thumbnails: true,
                    hover: false,
                    opacityOnGrid: false,
                    imagePath: 'https://fbcdn-photos-g-a.akamaihd.net/'
                });
            })
            $('#mainLabel').hide();
            $('#clickToDisconnect').hide();// hiding the logout button
            $('#containgAlbumCover').hide();// hiding the list of albums
            $('.fluid_container').show();
            $('#toBackAndDownloadButton').show();
            $('#loading').hide(); //hideing the loading image ..
        });
    }
    $('#facebookLogoutButton').click(function(){
        $('#loginMsg').hide('slow');
        $('#logoutMsg').show('slow');
        // showing the logout msg
        $('#logoutMsg').html('<div class="alert alert-info"><button type="button" class="close" data-dismiss="alert">&times;</button>\n\
                        <strong>Sucessfull !!</strong>\n\
                         Congratulation you have successfully Logged OUT the system.</div>').delay(1000).slideDown('slow');
        $('#logoutMsg').delay(2000).slideUp('slow');
        FB.logout(function(response) {
            $('#containgAlbumCover').hide();
            $('#displayName').hide();
            $('#clickToConnect').show();
            $('#clickToDisconnect').hide();
        });
    });
    //this is the jquery for going back to the main list of album page ..
    $('#backAndDownloadButton').click(function(){
        
        $('#toBackAndDownloadButton').hide();
        $('#mainLabel').show();
        $('#loading').show(); //showing the loading image ..
        $('.fluid_container').hide();// hiding the list of images in a particular album
        $('#containgAlbumCover').show(); //showing the list of albums
        $('#clickToDisconnect').show();// hiding the list of albums
        $('#loading').hide(); //showing the loading image ..
    });
    //photosCounter.serializeArray();
    function downloadAlbum(album_id,name){
        var id=album_id;
        var album_name=name;
        window.location = "album.php?id="+ album_id+"&access="+accessToken;
    //self.location='download_new.php';
    //alert(id+" "+name);
    /*var request=$.ajax({ //Ajax call to download script to get the photos and zip them
            type: "POST",
            data: {
                id: album_id,
                name: album_name,
                type: 'download'
            },
            url: "album.php",
            success: function(){
                self.location='download_new.php'
            //On Completion of Zipping all the files, Request for headers to prompt user for download
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                return false;
            }
        });*/
    }
});// document ready ends ..