const sideBar = function() {
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

$(document).ready(() => {

    const $root = $('#header');
    const $page = $('<div id="page"><div>').addClass('main');
    $page.append(`<p id="greeting"></p>`);

    authg.onAuthStateChanged(function(user) {
        if (firebase.auth().currentUser) {
            let usersRef = db.collection('users').doc(firebase.auth().currentUser.uid);
            console.log("checkpoint 1");
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
        }
        else {
            console.log("No current user found");
            document.getElementById("greeting").innerHTML = `Hello, please sign in to continue!`;
        }
    });

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
