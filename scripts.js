$(document).ready(() => {

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

    $('#root').append(`<div id="options"></div>`);
    $('#options').append(`<p>Type of meal</p>`);
    $('#options').append(`<input type="checkbox" id="option1" name="meal_type" value="snack">`);
    $('#options').append(`<label for="option1">Snack</label><br>`);
    $('#options').append(`<input type="checkbox" id="option2" name="meal_type" value="breakfast">`);
    $('#options').append(`<label for="option2">Breakfast</label><br>`);
    $('#options').append(`<input type="checkbox" id="option3" name="meal_type" value="lunch">`);
    $('#options').append(`<label for="option3">Lunch</label><br>`);
    $('#options').append(`<input type="checkbox" id="option4" name="meal_type" value="dinner">`);
    $('#options').append(`<label for="option4">Dinner</label><br>`);
    $('#name_button').on('click', (e) => {
        let query = "https://api.edamam.com/search?q=" + randomLetter() + "&app_id=f4712c78&app_key=dbc1658d4964a9a2a6ac12abd88d4b81";
        query = query + "&health=alcohol-free"
        $.get({
            url: query,
            // &app_id=f4712c78&app_key=dbc1658d4964a9a2a6ac12abd88d4b81&calories=500-600&health=alcohol-free
            success: (result) => {
                let allRecipes = result.hits;
                if (allRecipes.length == 0) {
                    $('#recipe_list').append(`<li>No results</li>`);
                }
                else {
                    let randomNum = randomNumber(allRecipes.length);
                    let recipe = allRecipes[randomNum];
                    let generalInfo = recipe["recipe"];
                    let calories = generalInfo["calories"];
                    let name = generalInfo["label"];
                    let imageLink = generalInfo["image"];
                    console.log("Name = " + name + "  Calories = " + calories + "  Image_Link = " + imageLink);
                    $('#recipe_div').empty().append(`<p>Name: ${name}  Calories: ${calories}<p>`);
                    $('#recipe_div').append(`<p><img src=${imageLink} style="width: 400px; height: 400px;"><p>`);
                    /*
                    allRecipes.forEach(recipe => {
                        let generalInfo = recipe["recipe"];
                        let calories = generalInfo["calories"];
                        let name = generalInfo["label"];
                        let imageLink = generalInfo["image"];
                        console.log("Name = " + name + "  Calories = " + calories + "  Image_Link = " + imageLink);
                        $('#recipe_list').append(`<li>Name: ${name}  Calories: ${calories}</li>`);
                        $('#recipe_list').append(`<li><img src=${imageLink} style="width: 400px; height: 400px;"><li>`);
                    })
                    */
                }
            },
            error: () => {
                console.log("Failed!");
            },
            dataType: "json"
        });
    });
});