export const logInHead = function() {
    var $container = $('<div id="header"></div>').addClass('account-head'); 
    var $logIn = $('<a href="profile.html" class="button" style="position: absolute; right: 80px; top: 2px;">Log In</a>');
    var $logOut = $('<button id="logout">Log Out</button>').addClass('out-btn'); 

    $container.append($logIn, $logOut); 
    return $container;
}


export const createHome = function() {
    var $container = $('<div></div>').addClass('container');
    var $photo = $('<img src="food.jpg" alt="Food">');
    var $siteName = $('<div>Foodie</div>').addClass('centered');
    $container.append($photo, $siteName);
    
    return $container;
}


export const body = function() {
    var $body = $('<div></div>').addClass('home-body');
    var $head = $('<h1>What is Foodie?<h1>');
    var $blurb = $('<p>Welcome to our recipe website, I hope you are ready to cook! Click on the <b>Application</b> tab to start choosing recipes :)<br><br>Our website aims to bring you the best cooking experience ever. You will be presented with a variety of foods and their respective recipes in our application and choose which ones appeal to you most. If you like it, select that recipe and it will go into your inbox, where you can view all the foods and recipes that you have chosen so far. In the inbox, you will also have the option to open up a detailed recipe for said foods. Hope you enjoy!</p>');
    
    var $photoGallery = $('<div></div>').addClass('row');
    var $photo1 = $('<img src="food4.jpg" alt="Food2">').addClass('resize');
    var $photo2 = $('<img src="food5.jpg" alt="Food3">').addClass('resize');
    var $photo3 = $('<img src="burger.jpg" alt="Food4">').addClass('resize');
    var $photo4 = $('<img src="calamari.jpg" alt="Food5">').addClass('resize');
    var $photo5 = $('<img src="oatmeal.jpg" alt="Food6">').addClass('resize');
    var $photo6 = $('<img src="pancake_coffee.jpg" alt="Food7">').addClass('resize');
    var $photo7 = $('<img src="pancake.jpg" alt="Food8">').addClass('resize');
    var $photo8 = $('<img src="pizza.jpg" alt="Food9">').addClass('resize');
    var $photo9 = $('<img src="popsicle.jpg" alt="Food10">').addClass('resize');
    var $photo10 = $('<img src="milkshake.jpg" alt="Food11">').addClass('resize');
   
    $('<div></div>').addClass('column').append($photo1, $photo2, $photo10, $photo3).appendTo($photoGallery);
    $('<div></div>').addClass('column').append($photo4, $photo8, $photo7).appendTo($photoGallery);
    $('<div></div>').addClass('column').append($photo9, $photo5, $photo6).appendTo($photoGallery);
    $body.append($head, $blurb, $photoGallery);
    return $body; 
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
    $('<a href="profilepage.html"><span><i class="material-icons">person</i><span class="icon-text">Profile</span></a><br>').appendTo($sideBar);
    $('<a href="contact.html"><span><i class="material-icons">contact_support</i><span class="icon-text">Contact</span></a><br>').appendTo($sideBar);
    // $('<img src="foodie_logo.jpg" alt="Logo">').addClass('logo').appendTo($sideBar);
    return $sideBar;
}

function signOut() {
    let userId = "";
    authg.onAuthStateChanged(function (user) {
        if (user) {
            firebase.auth().signOut();
        }
        else {
        }
    });
}

$(document).ready(() => {
    const $root = $('#root');

    const $page = $('<div id="page"><div>').addClass('main');
    $page.append(logInHead(), createHome(), body(), footer());
    $root.append(sideBar(), $page);

    $('#header').append(`<p id="greeting">Please sign in</p>`);
    authg.onAuthStateChanged(function (user) {
        if (user) {
            $('#greeting').text(`Hello, ${firebase.auth().currentUser.email}`);
        }
        else {
            $('#greeting').text(`Hello, Not signed in`);
        }
    });

    $('#logout').on('click', function(event) {
        event.preventDefault();
        signOut();
    });

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