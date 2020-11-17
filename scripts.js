$(document).ready(() => {



    authg.onAuthStateChanged(function (user) {
        if (user) {
            // gets the user UID - VERY IMPORTANT !!!
            console.log("Display Name = " + firebase.auth().currentUser.uid);
            window.authUID = firebase.auth().currentUser.uid;
            // $page.append(`<p id="greeting">Hello, ${firebase.auth().currentUser.displayName}</p>`);
            //is signed in
        }
        else {
            console.log("No one logged in");
        }
    });



    const $page = $('<div id="page"><div>').addClass('main');
    $page.append(body(), footer());
    $('#root').append(sideBar(), $page);

    $('#sidebar').on('mouseover', function (event) {
        event.preventDefault();
        document.getElementById('sidebar').style.width = '250px';
        document.getElementById('page').style.marginLeft = '250px';
    });

    $('#sidebar').on('mouseout', function (event) {
        event.preventDefault();
        document.getElementById('sidebar').style.width = '85px';
        document.getElementById('page').style.marginLeft = '85px';
    });


    $('#name_button').on('click', (e) => {
        let query = "https://api.edamam.com/search?q=" + randomLetter() + "&app_id=adbcf639&app_key=0cd1cb104aac62dfc529549fb2f16bf2";
        if (snack.checked) {
            query = query + "&mealtype=snack";
        }
        if (breakfast.checked) {
            query = query + "&mealtype=breakfast";
        }
        if (lunch.checked) {
            query = query + "&mealtype=lunch";
        }
        if (dinner.checked) {
            query = query + "&mealtype=dinner";
        }
        if (dairy.checked) {
            query = query + "&health=dairy-free";
        }
        if (gluten.checked) {
            query = query + "&health=gluten-free";
        }
        if (vegan.checked) {
            query = query + "&health=vegan";
        }
        if (peanut.checked) {
            query = query + "&health=peanut";
        }
        $.get({
            url: query,
            success: (result) => {
                let allRecipes = result.hits;
                if (allRecipes.length == 0) {
                    $('#recipe_list').append(`<li>No results</li>`);
                }
                else {
                    let randomNum = randomNumber(allRecipes.length);
                    let recipe = allRecipes[randomNum];
                    console.log(recipe);
                    let generalInfo = recipe["recipe"];
                    let calories = generalInfo["calories"];
                    let name = generalInfo["label"];
                    let theUrl = generalInfo["url"];
                    let imageLink = generalInfo["image"];
                    console.log("Name = " + name + "  Calories = " + calories + "  Image_Link = " + imageLink);
                    console.log("Current user = " + authg.currentUser.uid);
                    $('#recipe_div').empty().append(`<p>Name: ${name}<p>`);
                    $('#recipe_div').append(`<p>Calories: ${calories}<p>`);
                    $('#recipe_div').append(`<a href="${theUrl}">Click here to go to the recipe!</a>`);
                    $('#recipe_div').append(`<p><img src=${imageLink} style="width: 400px; height: 400px;"><p>`);
                    $('#recipe_div').append(`<button id="likeButton">LIKE</button>`);
                    $('#likeButton').click(function () {
                        console.log('likeButton clicked');
                        console.log(db.collection('users').doc(firebase.auth().currentUser.uid));
                        // window.authUID = firebase.auth().currentUser.uid;
                        let usersRef = db.collection('users').doc(firebase.auth().currentUser.uid);
                        usersRef.get().then((docSnapshot) => {
                            if (docSnapshot.exists) {
                                usersRef.onSnapshot((doc) => {
                                    console.log(doc);

                                    let recipe_object = {
                                        name: name,
                                        calories: calories,
                                        url: theUrl,
                                        image: imageLink
                                    }
                                    usersRef.update({
                                        recipe: firebase.firestore.FieldValue.arrayUnion(recipe_object)
                                    })

                                    console.log("ID already exists in database");
                                });
                            }
                            else {
                                usersRef.set({
                                    first_name: firstName,
                                    last_name: lastName,
                                    email: email,
                                    password: password
                                })
                            }
                        })
                    });
                }
            },
            error: () => {
                console.log("Failed!");
            },
            dataType: "json"
        });
    });
});



export const createHome = function () {
    var $container = $('<div></div>').addClass('container');
    var $photo = $('<img src="food.jpg" alt="Food">');
    var $siteName = $('<div>Foodie</div>').addClass('centered');
    $container.append($photo, $siteName);

    return $container;
}
export const body = function () {

    var $body = $('<div id=newdiv></div>');
    var $head = $('<h1>Try our Application<h1>');
    let $button = $(`<button id="name_button">Press Me to Test API</button>`);
    let $signOutButton = $(`<button onClick="signOut()" id="signOut">Sign Out Here</button>`);
    var $info = $('<div id=recipe_div></div>');

    var $meal = $(`<p>Select mealtypes for filtered search<p>`);
    let $option1 = $(`<br><input type="checkbox" id="breakfast">`);
    let $label1 = $(`<label for="breakfast">Breakfast</label><br>`)
    let $option2 = $(`<input type="checkbox" id="lunch">`);
    let $label2 = $(`<label for="lunch">Lunch</label><br>`)
    let $option3 = $(`<input type="checkbox" id="snack">`);
    let $label3 = $(`<label for="snack">Snack</label><br>`)
    let $option4 = $(`<input type="checkbox" id="dinner">`);
    let $label4 = $(`<label for=dinner">Dinner</label><br>`)

    var $health=$(`<p>Select health avoidances for filtered search<p>`);
    var $meal=$(`<p>Select mealtypes for filtered search<p>`);
    let $option5= $(`<br><input type="checkbox" id="dairy">`);
    let $label5=$(`<label for="dairy">Dairy-Free</label><br>`)
    let $option6= $(`<input type="checkbox" id="gluten">`);
    let $label6=$(`<label for="gluten">Gluten-Free</label><br>`)
    let $option7= $(`<input type="checkbox" id="vegan">`);
    let $label7=$(`<label for="vegan">Vegan</label><br>`)
    let $option8= $(`<input type="checkbox" id="peanut">`);
    let $label8=$(`<label for=peanut">Peanut-Free</label><br>`)

    $body.append($head, $button, $signOutButton, $info);
    $body.append($meal, $option1, $label1, $option2, $label2, $option3, $label3, $option4, $label4);
    $body.append($health,$option5, $label5, $option6, $label6, $option7, $label7, $option8, $label8);
    return $body;
}


export const footer = function () {
    var $footer = $('<div></div>').addClass('footer');
    var $footnote = $('<p>Property of CyberChase Inc.</p>').addClass('footnote');
    $footer.append($footnote);
    return $footer;
}

export const sideBar = function () {
    var $sideBar = $('<div id="sidebar"></div>').addClass('sidebar');
    $('<a href="index.html"><span><i class="material-icons">home</i><span class="icon-text">Home</span></a><br>').appendTo($sideBar);
    $('<a href="app.html"><span><i class="material-icons">local_dining</i><span class="icon-text">App</span></a><br>').appendTo($sideBar);
    $('<a href="inbox.html"><span><i class="material-icons">all_inbox</i><span class="icon-text">Recipe Inbox</span></a><br>').appendTo($sideBar);
    $('<a href="profile.html"><span><i class="material-icons">person</i><span class="icon-text">Profile</span></a><br>').appendTo($sideBar);
    $('<a href="contact.html"><span><i class="material-icons">contact_support</i><span class="icon-text">Contact</span></a><br>').appendTo($sideBar);
    $('<img src="foodie_logo.jpg" alt="Logo">').addClass('logo').appendTo($sideBar);
    return $sideBar;
}

function randomLetter() {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < 1; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}