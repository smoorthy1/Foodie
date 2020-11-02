export const createHome = function() {
    var $container = $('<div></div>').addClass('container');
    var $photo = $('<img src="food.jpg" alt="Food">').addClass('bg-img');
    var $siteName = $('<div>Foodie</div>').addClass('centered');
    $container.append($photo);
    
    return $container;
}

export const previewProfPic = function(uploader) {
    if (uploader.files && uploader.files[0]) {
        var imageFile = uploader.files[0];
        var reader = new FileReader();    
        reader.onload = function (e) {
            //set the image data as source
            $('#profileImage').attr('src', e.target.result);
        }    
        reader.readAsDataURL( imageFile );
    }
}

// export const fasterPreview = function(uploader) {
//     if ( uploader.files && uploader.files[0] ){
//         $('#profileImage').attr('src', 
//            window.URL.createObjectURL(uploader.files[0]) );
//   }
// }

export const createForm = function() {
    var $container = $('<div></div>').addClass('container'); 
    var $form = $('<form></form>'); 
    var $firstSec = $('<div></div>').addClass('row');
    var $lastSec = $('<div></div>').addClass('row');
    var $emailSec = $('<div></div>').addClass('row');
    var $passSec = $('<div></div>').addClass('row');
    var $profSec = $('<div></div>').addClass('profile-container');
    var $profile = $('<img id="profilePic" src="https://image.freepik.com/free-vector/cute-welsh-corgi-puppy-cartoon-icon_42750-507.jpg">');
    var $pic = $('<input type="file" id="profileUpload" name="profilePic" placeholder="Photo" required="" capture>');
    var $title = $('<div></div>').append($('<h1>Name</h1>').addClass('contact'));
    var $flabel = $('<div></div>').addClass('col-25').append($('<label for="fname">First Name</label>'));
    var $fname = $('<div></div>').addClass('col-75').append($('<input type="text" id="fname" name="firstname" placeholder="First Name">'));
    var $lastlabel = $('<div></div>').addClass('col-25').append($('<label for="lname">Last Name</label>'));
    var $lname = $('<div></div>').addClass('col-75').append($('<input type="text" id="lname" name="lastname" placeholder="Last Name">'));
    var $emailLabel = $('<div></div>').addClass('col-25').append($('<label for="email">Email</label>'));
    var $email = $('<div></div>').addClass('col-75').append($('<input type="text" id="email" name="email" placeholder="Email">'));
    var $passLabel = $('<div></div>').addClass('col-25').append($('<label for="pass">Password</label>'));
    var $pass = $('<div></div>').addClass('col-75').append($('<input type="text" id="pass" name="pass" placeholder="Password">'));
    var $submit = $('<div></div>').append($('<input type="submit" value="Submit">'));

    $profSec.append($profile);
    $firstSec.append($flabel, $fname);
    $lastSec.append($lastlabel, $lname);
    $emailSec.append($emailLabel, $email);
    $passSec.append($passLabel, $pass);
    $form.append($profSec, $pic, $title, $firstSec, $lastSec, $emailSec, $passSec, $submit); 
    $container.append($form); 
    return $container;
}

export const footer = function() {
    var $footer = $('<div></div>').addClass('footer');
    var $footnote = $('<p>Property of CyberChase Inc.</p>').addClass('footnote');
    $footer.append($footnote);
    return $footer;
}

export const sideBar = function() {
    var $sideBar = $('<div id="sidebar"></div>').addClass('sidebar');
    $('<a href="index.html"><span><i class="material-icons">home</i><span class="icon-text">Home</span></a><br>').appendTo($sideBar);
    $('<a href="app.html"><span><i class="material-icons">local_dining</i><span class="icon-text">App</span></a><br>').appendTo($sideBar);
    $('<a href="inbox.html"><span><i class="material-icons">all_inbox</i><span class="icon-text">Recipe Inbox</span></a><br>').appendTo($sideBar);
    $('<a href="profile.html"><span><i class="material-icons">person</i><span class="icon-text">Profile</span></a><br>').appendTo($sideBar);
    $('<a href="contact.html"><span><i class="material-icons">contact_support</i><span class="icon-text">Contact</span></a><br>').appendTo($sideBar);
    //var $bottom = $('<div></div>').addClass('div-wrapper').appendTo($sideBar);
    $('<img src="foodie_logo.jpg" alt="Logo">').addClass('logo').appendTo($sideBar);
    return $sideBar;
}

$(function() {
    const $root = $('#root');
    const $page = $('<div id="page"><div>').addClass('main');
    $page.append(createHome(), createForm(), footer());
    $root.append(sideBar(), $page);


    $('#sidebar').on('mouseover', function(event) {
        event.preventDefault();
        document.getElementById('sidebar').style.width = '250px';
        document.getElementById('page').style.marginLeft = '250px'; 
    });

    $('#sidebar').on('mouseout', function(event) {
        event.preventDefault();
        document.getElementById('sidebar').style.width = '85px';
        document.getElementById('page').style.marginLeft = '85px'; 
    });

    $('#profilePic').on('click', function(event) {
        event.preventDefault();
        $('#profileUpload').on('click', function(event) {

        });
    });

    function fasterPreview( uploader ) {
        if ( uploader.files && uploader.files[0] ){
              $('#profilePic').attr('src', 
                 window.URL.createObjectURL(uploader.files[0]) );
        }
    }

    $('#profileUpload').on('change', function(event) {
        fasterPreview(this);
    });
    
    
})