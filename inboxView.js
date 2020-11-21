export const logInHead = function() {
    var $container = $('<div></div>').addClass('account-head'); 
    var $logIn = $('<a href="profile.html" class="button" style="position: absolute; right: 80px; top: 2px;">Log In</a>');
    var $logOut = $('<button id="logout">Log Out</button>').addClass('out-btn'); 

    $container.append($logIn, $logOut); 
    return $container;
}

export const header = function() {
    var $container = $('<div></div>').addClass('header');
    var $photo = $('<img src="food2.jpg" alt="Food">').addClass('ibx-img');
    var $insideHeader = $('<p>Recipe Inbox</p>').addClass('inside-header');
    $container.append($photo, $insideHeader);
    return $container; 
}

export const body = function(id) {

    var $body = $('<div></div>');
    //var $head = $(`<h1>Hello, ${id}<h1>`);
    //$body.append($head);

    let usersRef = db.collection('users').doc(firebase.auth().currentUser.uid);

    usersRef.get().then(function(doc) {
        console.log("checkpoint");
        // console.log("Document data = " + doc.data().first_name);
        console.log(doc.data());
        if (doc.exists) {
            console.log(doc.data().first_name);
            var $head = $(`<h1>Hello, ${doc.data().first_name}<h1>`);
            $body.append($head);
            console.log("Document data:", doc.data().recipe);
            let recipe_list = doc.data().recipe;
            let recipeCounter = 0;
            recipe_list.forEach(recipe => {
                let name = recipe.name;
                let calories = recipe.calories;
                let image = recipe.image;
                let url = recipe.url;
                let recipe_card = `<div class="recipe_card" id="recipeCard_${recipeCounter}">
                                        <p>Recipe name: ${name}</p>
                                        <p>Recipe name: ${calories}</p>
                                        <p>Recipe name: ${image}</p>
                                        <p>Recipe name: ${url}</p>
                                        <button id="deleteRecipe">Delete</button>
                                    </div>`
                $body.append(recipe_card);
                recipeCounter++;
            })
        } else {
            // doc.data() will be undefined in this case
            console.log("Inbox is empty!");
            alert("Your inbox is empty!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    console.log("checkpoint 2");

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
    $('<a href="profile.html"><span><i class="material-icons">person</i><span class="icon-text">Profile</span></a><br>').appendTo($sideBar);
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


$(document).on('click', '#deleteRecipe', function(event) {
    console.log("Clicked on Delete Recipe");
    let id = $(this).parent().attr('id');
    let id_number = id.split("_")[1];
    console.log("id number = " + id_number);
    let usersRef = db.collection('users').doc(firebase.auth().currentUser.uid);
    console.log(usersRef);

    // ENDED WORK HERE: YOU NEED TO FIGURE OUT HOW TO DELETE RECIPE FROM USER'S BACKEND GIVEN THE ID NUMBER
    // the idea is to use the ID number here, which cooresponds to the backend data, to delete the right element
    // however, if you query using a search, the results won't be the same index as the backend so... think of a solution
    usersRef.get().then(function(doc) {
        console.log("checkpoint");
        // console.log("Document data = " + doc.data().first_name);
        console.log(doc.data());
        if (doc.exists) {
            console.log(doc.data().first_name);

        } else {
            // doc.data() will be undefined in this case
            console.log("Inbox is empty!");
            alert("Your inbox is empty!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    event.preventDefault();
})

// $(function() {
$(document).ready(() => {
    $('#root').append(`<div id="header"></div>`);
    $('#header').append(`<p id="greeting" style="text-align:right">Please sign in</p>`);
    authg.onAuthStateChanged(function (user) {
        if (user) {
            console.log("Display Name = " + firebase.auth().currentUser.email);
            window.authUID = firebase.auth().currentUser.uid;
            $('#greeting').text(`Hello, ${firebase.auth().currentUser.email}`);
        }
        else {
            console.log("No one logged in");
            $('#greeting').text(`Hello, Not signed in`);
        }
    });
    
    auth.onAuthStateChanged(function(user) {
        if(user) {
            window.authUID = firebase.auth().currentUser.uid;
            console.log(authUID);

            const $root = $('#root');
            const $page = $('<div id="page"><div>').addClass('main');
            $page.append(logInHead(), header(), body(authUID), footer());
            $root.append(sideBar(), $page);

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

        }
        else {
            alert("No Active User");
            window.location.href = 'profile.html'; 
        }
    });
    
    if ($('#root').is('empty')) {
        alert("empty page");
    }
    // need to redirect users to login page if they haven't signed in yet. Should go down here.
})