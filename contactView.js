export const createHome = function() {
    var $container = $('<div></div>').addClass('container');
    var $photo = $('<img src="food.jpg" alt="Food">');
    var $siteName = $('<div>Foodie</div>').addClass('centered');
    $container.append($photo, $siteName);
    
    return $container;
}

export const createForm = function() {
    var $container = $('<div></div>').addClass('container'); 
    var $form = $('<form></form>'); 
    var $title = $('<div></div>').append($('<h1>Contact Us</h1>').addClass('contact'));
    var $fname = $('<div></div>').append($('<input type="text" name="firstname" placeholder="First Name">'));
    var $lname = $('<div></div>').append($('<input type="text" name="lastname" placeholder="Last Name">'));
    var $email = $('<div></div>').append($('<input type="text" name="email" placeholder="Email">'));
    var $comment = $('<div></div>').append($('<textarea placeholder="Your Questions/Concerns..."></textarea>'));
    var $submit = $('<div></div>').append($('<input type="submit" value="Submit">'));

    $form.append($title, $fname, $lname, $email, $comment, $submit); 
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
    
})