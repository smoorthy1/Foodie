

$(document).ready(() => {

    /*
    $('#root').append(`<div id="options"></div>`);
    $('#options').append(`<p>Type of meal</p>`);
    $('#options').append(`<input type="checkbox" id="option1" name="meal_type" value="snack">`);
    $('#options').append(`<label for="option1">Snack</label><br>`);
    $('#options').append(`<input type="checkbox" id="option2" name="meal_type" value="breakfast" checked>`);
    $('#options').append(`<label for="option2">Breakfast</label><br>`);
    $('#options').append(`<input type="checkbox" id="option3" name="meal_type" value="lunch" checked>`);
    $('#options').append(`<label for="option3">Lunch</label><br>`);
    $('#options').append(`<input type="checkbox" id="option4" name="meal_type" value="dinner" checked>`);
    $('#options').append(`<label for="option4">Dinner</label><br>`);
    $('#options').append(`<button type="submit">Submit</button>`);
    */
    const $page = $('<div id="page"><div>').addClass('main');
    $page.append(body(), footer());
    $('#root').append(sideBar(), $page);

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

    $('#name_button').on('click', (e) => {
        let query = "https://api.edamam.com/search?q=" + randomLetter() + "&app_id=f4712c78&app_key=dbc1658d4964a9a2a6ac12abd88d4b81";
        query = query + "&mealtype=snack&cuisinetype=chinese";
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
                    $('#recipe_div').empty().append(`<p>Name: ${name}<p>`);
                    $('#recipe_div').append(`<p>Calories: ${calories}<p>`);
                    $('#recipe_div').append(`<a href="${theUrl}">Click here to go to the recipe!</a>`);
                    $('#recipe_div').append(`<p><img src=${imageLink} style="width: 400px; height: 400px;"><p>`);
                }
            },
            error: () => {
                console.log("Failed!");
            },
            dataType: "json"
        });
    });
});



export const createHome = function() {
    var $container = $('<div></div>').addClass('container');
    var $photo = $('<img src="food.jpg" alt="Food">');
    var $siteName = $('<div>Foodie</div>').addClass('centered');
    $container.append($photo, $siteName);
    
    return $container;
}

export const body = function() {
    var $body = $('<div id=newdiv></div>');
    var $head = $('<h1>Try our Application<h1>');
    let $button = $(`<button id="name_button">Press Me to Test API</button>`);
    let $signOutButton = $(`<button onClick="signOut()" id="signOut">Sign Out Here</button>`);
    var $info = $('<div id=recipe_div></div>');
    $body.append($head, $button, $signOutButton, $info);
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