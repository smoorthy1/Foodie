$(document).ready(() => {

    auth.onAuthStateChanged(function(user) {
        if(user) {
            window.authUID = firebase.auth().currentUser.uid;
            const $page = $('<div id="page"><div>').addClass('main');
            $page.append(logInHead(), createHome(), body(), footer());
            $('#root').append(sideBar(), $page);
        
            $('#header').append(`<p id="greeting" style="text-align:right">Please sign in</p>`);
            authg.onAuthStateChanged(function (user) {
                if (user) {
                    window.authUID = firebase.auth().currentUser.uid;
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
        
            $(document).on('click', '#thumbsDownBtn', function(event) {
                event.preventDefault();
                nextRecipe();
            });
        
            $('#name_button').on('click', (e) => {
                let query = "https://api.edamam.com/search?q=" + randomLetter() + "&app_id=adbcf639&app_key=0cd1cb104aac62dfc529549fb2f16bf2";
                if (dairy.checked) {
                    query = query + "&health=alcohol-free";
                }
                if (gluten.checked) {
                    query = query + "&health=immuno-supportive";
                }
                if (vegan.checked) {
                    query = query + "&health=vegan";
                }
                if (peanut.checked) {
                    query = query + "&health=peanut-free";
                }
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
              
                
                $.get({
                    url: query,
                    success: (result) => {
                        let allRecipes = result.hits;
                        if (allRecipes.length == 0) {
                            alert("No results");
                        }
                        else {
                            let randomNum = randomNumber(allRecipes.length);
                            let recipe = allRecipes[randomNum];
                            let generalInfo = recipe["recipe"];
                            let calories = generalInfo["calories"];
                            let name = generalInfo["label"];
                            let theUrl = generalInfo["url"];
                            let imageLink = generalInfo["image"];
                            let $food_img = $(`<p><img src=${imageLink} style= "height: 400px; width: 400px; border: 3px solid;
                            padding: 5px; border-color: #818181; border-radius: 8px;"></p>`).addClass('food-img');
                            $('#recipe_div').empty().append($food_img);
                            let $food_name = $(`<p>${name}<p>`).addClass('food-name');
                            $('#recipe_div').append($food_name);
                           
                            $('#recipe_div').append(`<a href="${theUrl}" target="_blank">Click here to go to the recipe!</a>`);
                            let $btn_div = $('<div></div>');
                            let $yes_btn = $(`<button type="button" id="thumbsUpBtn"><i class="material-icons">thumb_up_alt</i></button>`).addClass('thumb-btn');
                            let $no_btn = $(`<button type="submit" id="thumbsDownBtn"><i class="material-icons">thumb_down_alt</i></button>`).addClass('thumb-btn');
                            $btn_div.append($no_btn,$yes_btn);
                            $('#recipe_div').append($btn_div);
                          
                 
                            $(document).on('click', '#thumbsUpBtn', function(event) {
                                event.preventDefault();
                                let usersRef = db.collection('users').doc(firebase.auth().currentUser.uid);
                                usersRef.get().then((docSnapshot) => {
                                    if (docSnapshot.exists) {
                                        usersRef.onSnapshot((doc) => {
                                           
                        
                                            let recipe_object = {
                                                name: name,
                                                calories: calories,
                                                url: theUrl,
                                                image: imageLink
                                            }
                                            usersRef.update({
                                                recipe: firebase.firestore.FieldValue.arrayUnion(recipe_object)
                                            })
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
                                    nextRecipe();
                                })
                            });
                          
                        }
                    },
                    error: () => {
                        // alert("API limit (5 calls/minute) reached");
                        $('#recipe_div').append(    `<div id="myModal" class="modal">
                                                        <div class="modal-content">
                                                            <span class="close">&times;</span>
                                                            <p style="text-align:center">API limit (5 calls/minute) reached! Please wait a few seconds and try again.</p>
                                                        </div>
                                                    </div>`
                        )
                        var modal = document.getElementById("myModal");
                        var span = document.getElementsByClassName("close")[0];
                        modal.style.display = "block";
                        span.onclick = function() {
                            modal.style.display = "none";
                        }
                        window.onclick = function(event) {
                            if (event.target == modal) {
                                modal.style.display = "none";
                            }
                        }                    },
                    dataType: "json"
                });
            });
        } else {
            window.location.href = 'profile.html'; 
        }
    });

   
});

export function nextRecipe() {
    let query = "https://api.edamam.com/search?q=" + randomLetter() + "&app_id=adbcf639&app_key=0cd1cb104aac62dfc529549fb2f16bf2";
    if (dairy.checked) {
        query = query + "&health=alcohol-free";
    }
    if (gluten.checked) {
        query = query + "&health=immuno-supportive";
    }
    if (vegan.checked) {
        query = query + "&health=vegan";
    }
    if (peanut.checked) {
        query = query + "&health=peanut-free";
    }
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

    $.ajax({
        url: query,
        type: 'get',
        dataType: 'json',
        success: (result) => {
            let allRecipes = result.hits;
            if (allRecipes.length == 0) {
            }
            else {
                let randomNum = randomNumber(allRecipes.length);
                let recipe = allRecipes[randomNum];
                let generalInfo = recipe["recipe"];
                let calories = generalInfo["calories"];
                let name = generalInfo["label"];
                let theUrl = generalInfo["url"];
                let imageLink = generalInfo["image"];
                let $food_img = $(`<p><img src=${imageLink} style= "height: 400px; width: 400px; border: 3px solid;
                padding: 5px; border-color: #818181; border-radius: 8px;"></p>`).addClass('food-img');
                $('#recipe_div').empty().append($food_img);
                let $food_name = $(`<p>${name}<p>`).addClass('food-name');
                $('#recipe_div').append($food_name);
               
                $('#recipe_div').append(`<a href="${theUrl}" target="_blank">Click here to go to the recipe!</a>`);
                let $btn_div = $('<div></div>');
                let $yes_btn = $(`<button type="button" id="thumbsUpBtn"><i class="material-icons">thumb_up_alt</i></button>`).addClass('thumb-btn');
                let $no_btn = $(`<button type="submit" id="thumbsDownBtn"><i class="material-icons">thumb_down_alt</i></button>`).addClass('thumb-btn');
                $btn_div.append($no_btn,$yes_btn);
                $('#recipe_div').append($btn_div);
              
             
                $(document).on('click', '#thumbsUpBtn', function(event) {
                    event.preventDefault();
                   
                    let usersRef = db.collection('users').doc(firebase.auth().currentUser.uid);
                    usersRef.get().then((docSnapshot) => {
                        if (docSnapshot.exists) {
                            usersRef.onSnapshot((doc) => {
            
                                let recipe_object = {
                                    name: name,
                                    url: theUrl,
                                    image: imageLink
                                }
                                usersRef.update({
                                    recipe: firebase.firestore.FieldValue.arrayUnion(recipe_object)
                                })

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
                        nextRecipe();
                    })
                });
              
            }
        },
        error: () => {
            // alert("API limit (5 calls/minute) reached");
            // $('#recipe_div').empty();
            $('#recipe_div').append(    `<div id="myModal" class="modal">
                                            <div class="modal-content">
                                                <span class="close">&times;</span>
                                                <p style="text-align:center">API limit (5 calls/minute) reached! Please wait a few seconds and try again.</p>
                                            </div>
                                        </div>`
            )
            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        },
    });

}

 let recipeDat = {}
 let recipe_name = "";

export function getRecipe() {
    let query = "https://api.edamam.com/search?q=" + randomLetter() + "&app_id=adbcf639&app_key=0cd1cb104aac62dfc529549fb2f16bf2";
        
        $.ajax({
            url: query,
            type: 'get',
            dataType: 'json',
            success: (result) => {
                let allRecipes = result.hits;
                if (allRecipes.length == 0) {
                }
                else {
                    let randomNum = randomNumber(allRecipes.length);
                    let recipe = allRecipes[randomNum];
                    let generalInfo = recipe["recipe"];
                    let calories = generalInfo["calories"];
                    let name = generalInfo["label"];
                    let theUrl = generalInfo["url"];
                    let imageLink = generalInfo["image"];

                    recipeDat['name'] = name;
                    recipeDat['url'] = theUrl;
                    recipeDat['image'] = imageLink;

                    recipe_name = name;

                    let $food_img = $(`<p><img src=${imageLink} style= "height: 400px; width: 400px; border: 3px solid;
                    padding: 5px; border-color: #818181; border-radius: 8px;"></p>`).addClass('food-img');
                    $('#recipe_div').empty().append($food_img);
                    let $food_name = $(`<p>${name}<p>`).addClass('food-name');
                    $('#recipe_div').append($food_name);
                   
                    $('#recipe_div').append(`<a href="${theUrl}" target="_blank">Click here to go to the recipe!</a>`);
                    let $btn_div = $('<div></div>');
                    let $yes_btn = $(`<button type="button" id="thumbsUpBtn"><i class="material-icons">thumb_up_alt</i></button>`).addClass('thumb-btn');
                    let $no_btn = $(`<button type="submit" id="thumbsDownBtn"><i class="material-icons">thumb_down_alt</i></button>`).addClass('thumb-btn');
                    $btn_div.append($no_btn,$yes_btn);
                    $('#recipe_div').append($btn_div);
                  
                    $('#thumbsUpBtn').click(function() {
                        let usersRef = db.collection('users').doc(firebase.auth().currentUser.uid);
                        usersRef.get().then((docSnapshot) => {
                            if (docSnapshot.exists) {
                                usersRef.onSnapshot((doc) => {
                
                                    let recipe_object = {
                                        name: name,
                                        calories: calories,
                                        url: theUrl,
                                        image: imageLink
                                    }
                                    usersRef.update({
                                        recipe: firebase.firestore.FieldValue.arrayUnion(recipe_object)
                                    })
                
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
                            nextRecipe();
                        })
                    });
                }
            },
            error: () => {
                // alert("API limit (5 calls/minute) reached");
                $('#recipe_div').append(    `<div id="myModal" class="modal">
                                                <div class="modal-content">
                                                    <span class="close">&times;</span>
                                                    <p style="text-align:center">API limit (5 calls/minute) reached! Please wait a few seconds and try again.</p>
                                                </div>
                                            </div>`
                )
                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onclick = function() {
                    modal.style.display = "none";
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }            
            },
        });
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


export const logInHead = function() {
    var $container = $('<div id="header"></div>').addClass('account-head'); 
    var $logIn = $('<a href="profile.html" class="button" style="position: absolute; right: 80px; top: 2px;">Log In</a>');
    var $logOut = $('<button id="logout">Log Out</button>').addClass('out-btn'); 

    $container.append($logIn, $logOut); 
    return $container;
}

export const createHome = function () {
    var $container = $('<div></div>').addClass('container');
    var $photo = $('<img src="foodie_head.jpg" style="max-height:350px;" alt="Foodie">').addClass('.ibx-img');
    var $siteName = $('<div>Foodie</div>').addClass('left');
    $container.append($photo, $siteName);

    return $container;
}
export const body = function () {

    var $body = $('<div id=newdiv></div>').addClass('body-container');
    let $button = $(`<button id="name_button">Apply</button>`).addClass('filter-btn');
    let $signOutButton = $(`<button onClick="signOut()" id="signOut">Sign Out Here</button>`);
    var $info = $('<div id=recipe_div></div>').addClass('recipe-div');

    var $filterSec = $('<div>Refine By</div>').addClass('filter-sec');

    var $mealFilter = $('<div></div>').addClass('filter-div');
    var $meal = $(`<p>Select Mealtypes<p>`).addClass('filter-head');
    let $option1 = $(`<input type="checkbox" id="breakfast">`);
    let $span1 = $('<span class="checkmark"></span>');
    let $label1 = $(`<label class="check" for="breakfast">Breakfast</label>`).append($option1, $span1);

    let $option2 = $(`<input type="checkbox" id="lunch">`);
    let $span2 = $('<span class="checkmark"></span>');
    let $label2 = $(`<label class="check" for="lunch">Lunch</label>`).append($option2, $span2);

    let $option3 = $(`<input type="checkbox" id="snack">`);
    let $span3 = $('<span class="checkmark"></span>');
    let $label3 = $(`<label class="check" for="snack">Snack</label>`).append($option3, $span3);

    let $option4 = $(`<input type="checkbox" id="dinner">`);
    let $span4 = $('<span class="checkmark"></span>');
    let $label4 = $(`<label class="check" for="dinner">Dinner</label>`).append($option4, $span4);
   

    var $healthFilter = $('<div></div>').addClass('filter-div');
    var $health=$(`<p>Select Health Avoidances<p>`).addClass('filter-head');
    let $option5= $(`<input type="checkbox" id="dairy">`);
    let $span5 = $('<span class="checkmark"></span>');
    let $label5=$(`<label class="check" for="dairy">Alcohol-Free</label>`).append($option5, $span5);
    
    let $option6= $(`<input type="checkbox" id="gluten">`);
    let $span6 = $('<span class="checkmark"></span>');
    let $label6=$(`<label class="check" for="gluten">Immuno-supportive</label>`).append($option6, $span6);
    
    let $option7= $(`<input type="checkbox" id="vegan">`);
    let $span7 = $('<span class="checkmark"></span>');
    let $label7=$(`<label class="check" for="vegan">Vegan</label>`).append($option7, $span7);
    
    let $option8= $(`<input type="checkbox" id="peanut">`);
    let $span8 = $('<span class="checkmark"></span>');
    let $label8=$(`<label class="check" for="peanut">Peanut-Free</label>`).append($option8, $span8);

    $mealFilter.append($meal, $label1, $label2, $label3, $label4);
    $healthFilter.append($health, $label5,  $label6,  $label7,  $label8);
    $filterSec.append($mealFilter, $healthFilter, $button);
    $body.append($filterSec, $info);
    getRecipe();
   
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
    $('<a href="profilepage.html"><span><i class="material-icons">person</i><span class="icon-text">Profile</span></a><br>').appendTo($sideBar);
    $('<a href="contact.html"><span><i class="material-icons">contact_support</i><span class="icon-text">Contact</span></a><br>').appendTo($sideBar);
    // $('<img src="foodie_logo.jpg" alt="Logo">').addClass('logo').appendTo($sideBar);
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