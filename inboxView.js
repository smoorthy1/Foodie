export const header = function() {
    var $container = $('<div></div>').addClass('header');
    var $photo = $('<img src="food2.jpg" alt="Food">').addClass('ibx-img');
    var $insideHeader = $('<p>Recipe Inbox</p>').addClass('inside-header');
    $container.append($photo, $insideHeader);
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
    $page.append(header(), footer());
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