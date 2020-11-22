export const logInHead = function() {
    var $container = $('<div id="header"></div>').addClass('account-head'); 
    var $logIn = $('<a href="profile.html" class="button" style="position: absolute; right: 80px; top: 2px;">Log In</a>');
    var $logOut = $('<button id="logout">Log Out</button>').addClass('out-btn'); 

    $container.append($logIn, $logOut); 
    return $container;
}

/*
export const createHome = function() {
    var $container = $('<div></div>').addClass('cropped');
    var $photo = $('<img src="food.jpg" alt="Food">').addClass('bg-img');
    var $siteName = $('<div>Foodie</div>').addClass('centered');
    $container.append($photo, $siteName);
    
    return $container;
}
*/

export const createHome = function() {
    var $container = $('<div></div>').addClass('header');
    var $photo = $('<img src="food2.jpg" alt="Food">').addClass('ibx-img');
    var $insideHeader = $('<p>Account Information</p>').addClass('inside-header');
    $container.append($photo, $insideHeader);
    return $container; 
}

export const createForm = function(id) {
    let usersRef = db.collection('users').doc(firebase.auth().currentUser.uid);
    var $container = $('<div></div>').addClass('container'); 
    var $form = $('<form></form>'); 
    var $firstSec = $('<div></div>').addClass('row');
    var $lastSec = $('<div></div>').addClass('row');
    var $emailSec = $('<div></div>').addClass('row');
    var $passSec = $('<div></div>').addClass('row');
    var $profSec = $('<div></div>').addClass('profile-container');
    var $profile = $('<img id="profilePic" src="https://i.pinimg.com/564x/5e/fc/87/5efc87ed8b6dae09f05c8f497cc1b738.jpg">');
    var $pic = $('<input type="file" id="upload" name="picUpload" placeholder="Photo" capture>');
    var $title = $('<div></div>');
    var $flabel = $('<div></div>').addClass('col-25').append($('<label for="fname">First Name</label>'));;
    var $fname = $('<div></div>').addClass('col-75');
    var $lastlabel = $('<div></div>').addClass('col-25').append($('<label for="lname">Last Name</label>'));
    var $lname = $('<div></div>').addClass('col-75');
    var $emailLabel = $('<div></div>').addClass('col-25').append($('<label for="email">Email</label>'));
    var $email = $('<div></div>').addClass('col-75');
    var $passLabel = $('<div></div>').addClass('col-25').append($('<label for="pass">Password</label>'));
    var $pass = $('<div></div>').addClass('col-75');
    var $submit = $('<div></div>');
    var $deleteBtn = $('<input type="submit" value="Delete Account" id="deleteUser" class="button" />');

    usersRef.get().then(function(doc) {
        console.log(doc.data());
        if(doc.data()) {
            console.log("Did you get into the userRef form???");
            $title.append($(`<h1>${doc.data().first_name} ${doc.data().last_name}</h1>`).addClass('contact'));
            $fname.append($(`<input type="text" id="fname" name="firstname" placeholder="${doc.data().first_name}">`));
            $lname.append($(`<input type="text" id="lname" name="lastname" placeholder="${doc.data().last_name}">`));
            $email.append($(`<p>${doc.data().email}</p>`));
            $pass.append($(`<input type="password" id="pass" name="pass" placeholder="${doc.data().password}">`));
            $submit.append($('<input type="submit" id="updateProfile" value="Submit">'));
            $profSec.append($profile);
            $firstSec.append($flabel, $fname);
            $lastSec.append($lastlabel, $lname);
            $emailSec.append($emailLabel, $email);
            $passSec.append($passLabel, $pass);
            $form.append($profSec, $pic, $title, $firstSec, $lastSec, $emailSec, $passSec, $submit, $deleteBtn); 
            $container.append($form); 
        }
        $(document).on('click', '#updateProfile', function(event) {
            console.log("User attempting to be updated");
            event.preventDefault();
            console.log("current first name = " + document.getElementById('fname').value);
            let new_first_name = document.getElementById('fname').value;
            let new_last_name = document.getElementById('lname').value;
            // let new_email = document.getElementById('email').value;
            let new_password = document.getElementById('pass').value;
            if(new_first_name == '') {
                new_first_name = doc.data().first_name;
            }
            if(new_last_name == '') {
                new_last_name = doc.data().last_name;
            }
            /*
            if(new_email == '') {
                new_email = doc.data().email;
            }
            */
            if(new_password == '') {
                new_password = doc.data().password;
            }
            usersRef.update({
                first_name: new_first_name,
                last_name: new_last_name,
                //email: new_email,
                password: new_password
            })
            if (document.getElementById('pass').value !== '') {
                firebase.auth().currentUser.updatePassword(new_password).then(() => {
                    console.log("Password successfully changed");
                }, (error) => {
                    console.log(error);
                });
            }
        })
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
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
    $('<a href="profilepage.html"><span><i class="material-icons">person</i><span class="icon-text">Profile</span></a><br>').appendTo($sideBar);
    $('<a href="contact.html"><span><i class="material-icons">contact_support</i><span class="icon-text">Contact</span></a><br>').appendTo($sideBar);
    //var $bottom = $('<div></div>').addClass('div-wrapper').appendTo($sideBar);
    $('<img src="foodie_logo.jpg" alt="Logo">').addClass('logo').appendTo($sideBar);
    return $sideBar;
}

function signOut() {
    let userId = "";
    authg.onAuthStateChanged(function (user) {
        if (user) {
            console.log("Display Name = " + firebase.auth().currentUser.email);
            firebase.auth().signOut();
        }
        else {
            console.log("No one logged in");
        }
    });
}

export function deleteUser() {
    auth.onAuthStateChanged(function(user) {
        if(user) {
            var email = user.email;
            console.log("Current user = " + auth.currentUser.uid);
            auth.currentUser.delete().then(function() {
                console.log("User deleted successfully");
            }).catch(function(error) {
                console.log(error);
                console.log("unexpected user deletion error");  
            });
        }
        else {
            console.log("No Active User");
        }
        
    });
}

$(function() {
    // const $root = $('#root');
    // const $page = $('<div id="page"><div>').addClass('main');
    // $page.append(logInHead(), createHome(), createForm(), footer());
    // $root.append(sideBar(), $page);


    auth.onAuthStateChanged(function(user) {
        if(user) {
            window.authUID = firebase.auth().currentUser.uid;
            console.log(authUID);

            const $root = $('#root');
            const $page = $('<div id="page"><div>').addClass('main');
            $page.append(logInHead(), createHome(), createForm(authUID), footer());
            $root.append(sideBar(), $page);

            $('#header').append(`<p id="greeting">Please sign in</p>`);
            authg.onAuthStateChanged(function (user) {
                if (user) {
                    console.log("Display Name = " + firebase.auth().currentUser.email);
                    $('#greeting').text(`Hello, ${firebase.auth().currentUser.email}`);
                }
                else {
                    console.log("No one logged in");
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

            $('#upload').on('change', function(event) {
                $('#profilePic').attr('src', $('#upload').val());
                console.log($('#upload').val());
            });

            $(document).on('click', '#deleteUser', function(event) {
                console.log("User deleted");
                event.preventDefault();
                deleteUser();  
            })

        }
        else {
            alert("No Active User");
            window.location.href = 'profile.html'; 
        }
    });
})