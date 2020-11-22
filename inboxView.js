export const logInHead = function() {
    var $container = $('<div id="header"></div>').addClass('account-head'); 
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
        let allRecipeNames = [];
        if (doc.exists) {
            console.log(doc.data().first_name);
            var $head = $(`<h1>Hello, ${doc.data().first_name}<h1>`);
            $body.append($head);
            $body.append(`<form>
                            <input type="search" id="text-search" placeholder="Search your recipes here" />
                          </form>`);
            console.log("Document data:", doc.data().recipe);
            let recipe_list = doc.data().recipe;
            let recipeCounter = 0;
            recipe_list.forEach(recipe => {
                let name = recipe.name;
                allRecipeNames.push(name);
                let calories = recipe.calories;
                let image = recipe.image;
                let url = recipe.url;
                let recipe_card = `<div class="recipe_card" id="recipeCard_${recipeCounter}">
                                        <p>Recipe name: ${name}</p>
                                        <p>Calories: ${calories}</p>
                                        <p>Image URL: ${image}</p>
                                        <p>Recipe URL: ${url}</p>
                                        <button id="deleteRecipe">Delete</button>
                                    </div>`
                $body.append(recipe_card);
                recipeCounter++;
            })

            // code that deals with setting up searches
            /*
            console.log("All recipe names = ");
            console.log(allRecipeNames);
            $body.append(`<ul id="matches"></ul>`);

            const KEY = 'debounce-terms';
            let init = function() {
                $(`#text-search`).addEventListener('input', efficientSearch);
                let testArray = ['apple', 'acorn', 'bee', 'beet', 'beef', 'bunny', 'cookie', 
                'corn', 'corndog', 'dog', 'dogma', 'echo', 'elephant'];
                localStorage.setItem(KEY, JSON.stringify(testArray));
            }

            let search = function(ev) {
                let text = ev.target.value;
                $(`#output`).textContent = `List Matching ${text}`;
                let ul = $(`#matches`);

                getList(text).then((list) => {
                    ul.innerHTML = '';
                    if (list.length === 0) {
                        let li = document.createElement('li');
                        li.textContent = "No matches";
                        ul.appendChild(li);
                    }
                    else {
                        list.forEach(item => {
                            let li = document.createElement('li');
                            li.textContent = item;
                            ul.appendChild(li);
                        })
                    }
                }).catch(error => console.warn(error))
            }

            let getList = function(text) {
                return new Promise((resolve, reject) => {
                    let r = Math.floor(Math.random()*1000);
                    setTimeout((function() {
                        let t = '^' + this.toString();
                        let pattern = new RegExp(t, 'i'); //starts with t
                        let terms = JSON.parse(localStorage.getItem(KEY));
                        let matches = terms.filter(term => pattern.test(term));
                        console.log('matches', matches);
                        resolve(matches);
                    }).bind(text), r);
                })
            }

            let debounce = function(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this, args = arguments;
                    var later = function() {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) func.apply(context, args);
                };
            };

            let efficientSearch = debounce(function(ev){
                let text = ev.target.value;
                document.getElementById('output').textContent = `List Matching ${text}`;
                let ul = document.getElementById('matches');
                
                //call an asynchronous search to match what has been typed
                getList(text)
                .then((list)=>{
                    ul.innerHTML = '';
                    if( list.length == 0){
                        let li = document.createElement('li');
                        li.textContent = "NO MATCHES";
                        ul.appendChild(li);
                    }else{
                        list.forEach(item=>{
                            let li = document.createElement('li');
                            li.textContent = item;
                            ul.appendChild(li);
                        })
                    }
                })
                .catch(err=>console.warn(err));
            }, 300);

            document.addEventListener('DOMContentLoaded', init);
            */

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
        console.log(doc.data());
        if (doc.exists) {
            console.log(doc.data().first_name);
            console.log("This is the recipe for this id:");
            console.log(doc.data().recipe[id_number]);
            let recipeToDelete = doc.data().recipe[id_number];
            usersRef.update({
                recipe: firebase.firestore.FieldValue.arrayRemove(recipeToDelete)
            })
            $(`#${id}`).remove();
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
    $('#header').append(`<p id="greeting">Please sign in</p>`);
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