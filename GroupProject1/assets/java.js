


var ingredientList = [];
var ingredient = ""
var counter = 0;
var apiKey = "e4f41a4d236fd86d5b61969636021b08"; 
localStorage.setItem("counter", counter);

$("#submit-recipe").on("click", function(event) {

    event.preventDefault();

    var ingredient = $("#ingredient-name").val().trim();
    ingredientList.push(" " + ingredient);
    console.log(ingredientList);

    var queryURL = "http://www.food2fork.com/api/search?key=" + apiKey + "&q=" + ingredientList;

    $("#ingredient-name").val("");
    $("#ingredientDisplay").text("");
    $("#ingredientDisplay").append("<p>" + ingredientList + "</p>");

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        var results = JSON.parse(response);
        console.log(results);

    $("#recipeDisplay").empty();
        
        for (var i=0; i < 10; i++) {

    var newRecipeDiv = $("<div class='recipeDisplay'>").attr("id", "recipeList" + i);

    var recipeTitle = results.recipes[i].title;

    var titleDisplay = $("<h4>").text(recipeTitle);

    titleDisplay.attr("id", 'recipeTitle' + i);

    newRecipeDiv.append(titleDisplay);

    var imgURL = results.recipes[i].image_url;

    var recipeImage = $("<img class='img-responsive'>").attr("src", imgURL);

    newRecipeDiv.append(recipeImage);

    var recipeURL = results.recipes[i].f2f_url;

    var recipeURLDisplay = $("<a>").attr("href", recipeURL).text(recipeURL);

    newRecipeDiv.append(recipeURLDisplay);

    newRecipeDiv.append("<br>");

    var saveRecipe = $("<button class='saveButton' type='submit'>").text("Save Recipe");

    saveRecipe.attr("data-id", i);

    var removeRecipe = $("<button class='removeButton' type='submit'>").text("Remove Recipe");

    removeRecipe.attr("data-id", i);

    newRecipeDiv.append(saveRecipe);

    newRecipeDiv.append(removeRecipe);

    removeRecipe.hide();

    $("#recipeDisplay").append(newRecipeDiv);
        }

        $(".saveButton").on("click", function () {
            alert("Recipe Saved!");
            for (var j = 0; j < 10; j++) {
                if ($(this).attr("data-id") == j) {
                    var recipeSavedLocal = "#recipeList" + j;
                    var recipeTitle = results.recipes[j].title;
                    var imgURL = results.recipes[j].image_url;
                    var recipeURL = results.recipes[j].f2f_url;
                    var savedRecipeObject = {'title': recipeTitle, 'image': imgURL, 'URL': recipeURL};
                   $("#savedRecipeDisplay").append($(recipeSavedLocal)); 
                   localStorage.setItem("savedRecipe" + counter, JSON.stringify(savedRecipeObject));
                   counter++;
                   console.log(counter);
                   localStorage.setItem("counter", counter);
                }   
            }
        })
    });

    
});

$("#start-over").on("click", function(event) {
    ingredientList = [];
    $("#ingredientDisplay").text("");
    $("#recipeDisplay").empty();

});




