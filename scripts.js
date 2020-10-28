$(document).ready(() => {
    $('#name_button').on('click', (e) => {
        $.get({
            url: "https://api.edamam.com/search?q=chicken&app_id=f4712c78&app_key=dbc1658d4964a9a2a6ac12abd88d4b81&from=0&to=3&calories=591-722&health=alcohol-free",
            success: (result) => {
                let allRecipes = result.hits;
                allRecipes.forEach(recipe => {
                    let generalInfo = recipe["recipe"];
                    let calories = generalInfo["calories"];
                    let name = generalInfo["label"];
                    let imageLink = generalInfo["image"];
                    console.log("Name = " + name + "  Calories = " + calories + "  Image_Link = " + imageLink);
                    $('#recipe_list').append(`<li>Name: ${name}  Calories: ${calories}</li>`);
                    $('#recipe_list').append(`<li><img src=${imageLink} style="width: 400px; height: 400px;"><li>`);
                })
                console.log(console.log(result.hits[0]["recipe"]));
            },
            error: () => {
                console.log("Failed!");
            },
            dataType: "json"
        });
    });
});