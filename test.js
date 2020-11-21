import {signUp, signIn, signOut, deleteUser} from './profile.js';

const sideBar = function() {
    var $sideBar = $('<div id="sidebar"></div>').addClass('sidebar');
    $('<a href="index.html"><span><i class="material-icons">home</i><span class="icon-text">Home</span></a><br>').appendTo($sideBar);
    $('<a href="app.html"><span><i class="material-icons">local_dining</i><span class="icon-text">App</span></a><br>').appendTo($sideBar);
    $('<a href="inbox.html"><span><i class="material-icons">all_inbox</i><span class="icon-text">Recipe Inbox</span></a><br>').appendTo($sideBar);
    $('<a href="profilepage.html"><span><i class="material-icons">person</i><span class="icon-text">Profile</span></a><br>').appendTo($sideBar);
    $('<a href="contact.html"><span><i class="material-icons">contact_support</i><span class="icon-text">Contact</span></a><br>').appendTo($sideBar);
    //var $bottom = $('<div></div>').addClass('div-wrapper').appendTo($sideBar);
    $('<img src="foodie_logo.jpg" alt="Logo">').addClass('logo').appendTo($sideBar);
    return $sideBar;
}

const signInPage = function() {
    var $container = $('<div></div>').addClass('forms');
    var $tabs = $('<ul class="tab-group"></ul>');
    var $logInTab = $('<li class="tab active"><a href="#login">Log In</a></li>');
    var $signUpTab = $('<li class="tab"><a href="#signup">Sign Up</a></li>');
    $tabs.append($logInTab, $signUpTab);

    var $loginForm = $('<form action="#" id="login"></form>');
    var $loginTitle = $('<h1>Login to Foodie</h1>');
    var $loginFormInput = $('<div class="input-field"></div>');
    var $email = $('<input type="email" placeholder="email" id="emailLogin" required="email" />');
    var $pass = $('<input type="password" placeholder="password" id="passwordLogin" required/>');
    var $loginBtn = $('<input type="submit" value="Login" id="signIn" class="button" />');
    var $deleteBtn = $('<input type="submit" value="Delete Account" id="deleteUser" class="button" />');
    $loginFormInput.append($email, $pass, $loginBtn, $deleteBtn);
    $loginForm.append($loginTitle, $loginFormInput);

    var $signupForm = $('<form action="#" id="signup"></form>');
    var $signupTitle = $('<h1>Sign Up to Foodie</h1>');
    var $signupFormInput = $('<div class="input-field"></div>');
    var $signupEmail = $('<input type="email" placeholder="email" id="email" required="email" />');
    var $signupPass = $('<input type="password" placeholder="password" id="password" required/>')
    var $first = $('<input type="text" placeholder="first name" id="firstName"/>');
    var $last = $('<input type="text" placeholder="last name" id="lastName"/>');
    var $signupBtn = $('<input type="submit" value="Sign up" id="signUpbtn" class="button" />');
    $signupFormInput.append($signupEmail, $signupPass, $first, $last, $signupBtn); 
    $signupForm.append($signupTitle, $signupFormInput); 

    $container.append($tabs, $loginForm, $signupForm); 

    return $container; 

}

$(document).ready(() => {

    const $root = $('#header');
    const $page = $('<div id="page"><div>').addClass('main');
    //$page.append(`<p id="greeting">Welcome</p>`);
    $page.append(signInPage());
    $root.append(sideBar(), $page);

    authg.onAuthStateChanged(function(user) {
        if (firebase.auth().currentUser) {
            // let usersRef = db.collection('users').doc(firebase.auth().currentUser.uid);
            console.log("checkpoint 1");
            console.log(firebase.auth().currentUser.email);
            //document.getElementById("greeting").innerHTML = `Hello, ${firebase.auth().currentUser.email}`;
            /*
            usersRef.get().then(function(doc) {
                if (doc.exists) {
                    console.log("Did it get here?");
                    console.log(doc.data());
                    document.getElementById("greeting").innerHTML = `Hello, ${doc.data().first_name} ${doc.data().last_name}`;
                }
                else {
                    alert("No data found in database");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            })
            */
        }
        else {
            console.log("No current user found");
            //document.getElementById("greeting").innerHTML = `Not signed in`;
        }
    });

    // $root.append(sideBar(), $page);

    $('.tab a').on('click', function (e) {
        e.preventDefault();
         
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
         
        var href = $(this).attr('href');
        $('.forms > form').hide();
        $(href).fadeIn(500);
      });

    $('#signIn').on('click', function(event) {
        event.preventDefault();
        signIn(); 
    });

    $('#deleteUser').on('click', function(event) {
        event.preventDefault();
        deleteUser();
    });

    $('#signUpbtn').on('click', function(event) {
        event.preventDefault();
        signUp();
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
