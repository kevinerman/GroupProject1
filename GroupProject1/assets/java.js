
var ingredientList = [];
var ingredient = "";
var counter = localStorage.getItem("counter");
console.log(counter);


if (counter === "null") {
    var counter = 0;
    console.log(counter);
}
var apiKey = "e4f41a4d236fd86d5b61969636021b08";
localStorage.setItem("counter", counter);

function updateSaved() {
    if (counter > 0); {
for (var m = 1; m <= counter; m++) {
  var savedRecipeLocal = localStorage.getItem("savedRecipe" + m);

  var parsedSavedRecipe = JSON.parse(savedRecipeLocal);

  var savedRecipeTitle = parsedSavedRecipe.title;
  var savedRecipeImage = parsedSavedRecipe.image;
  var savedRecipeURL = parsedSavedRecipe.URL;

  var savedRecipeDiv = $("<div class='recipeDisplay'>").attr("id", "recipeList");

  var savedTitleDisplay = $("<h4>").text(savedRecipeTitle);

  var savedRecipeImageDisplay = $("<img class='img-responsive'>").attr("src", savedRecipeImage);

  var savedURLDisplay = $("<a>").attr("href", savedRecipeURL).text(savedRecipeURL);

savedRecipeDiv.append(savedTitleDisplay);
savedRecipeDiv.append(savedRecipeImageDisplay);
savedRecipeDiv.append(savedURLDisplay);

$("#savedRecipeDisplay").append(savedRecipeDiv);
    }
}
}

if (counter > 0) {
    updateSaved();
}

$("#submit-recipe").on("click", function (event) {

    event.preventDefault();

    var ingredient = $("#ingredient-name").val().trim();
    ingredientList.push(" " + ingredient);
    console.log(ingredientList);

    var queryURL = "https://www.food2fork.com/api/search?key=" + apiKey + "&q=" + ingredientList;

    $("#ingredient-name").val("");
    $("#ingredientDisplay").text("");
    $("#ingredientDisplay").append("<p>" + ingredientList + "</p>");

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        var results = JSON.parse(response);
        console.log(results);

        $("#recipeDisplay").empty();
        $("#videoDisplay").empty();

        for (var i = 0; i < 10; i++) {

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

        var query2URL = "https://api.dailymotion.com/videos?languages=en&tags=" + ingredient + "+recipe"

        $.ajax({
            url: query2URL,
            method: "GET",
        }).then(function (response2) {
            console.log(response2.list);

            function updateVideoDisplay() {

                for (var k = 0; k < 8; k++) {

                    var videoDiv = $("<div class=videoDisplay>").attr("id", "videoList" + k);

                    var videoTitle = response2.list[k].title

                    var videoTitleDisplay = $("<h4>").text(videoTitle);

                    videoURL = response2.list[k].id;

                    var videoIframe = $("<iframe frameborder='0' width='480' height='270' allowfullscreen>")

                    videoIframe.attr("src", "https://www.dailymotion.com/embed/video/" + videoURL);

                    videoDiv.append(videoTitleDisplay);

                    videoDiv.append(videoIframe);

                    $("#videoDisplay").append(videoDiv);

                }
            }
            updateVideoDisplay();

        })

        $(".saveButton").on("click", function () {
            for (var j = 0; j < 10; j++) {
                if ($(this).attr("data-id") == j) {
                    var recipeSavedLocal = "#recipeList" + j;
                    var recipeTitle = results.recipes[j].title;
                    var imgURL = results.recipes[j].image_url;
                    var recipeURL = results.recipes[j].f2f_url;
                    var savedRecipeObject = { 'title': recipeTitle, 'image': imgURL, 'URL': recipeURL };
                    $("#savedRecipeDisplay").append($(recipeSavedLocal));
                    counter++;
                    localStorage.setItem("savedRecipe" + counter, JSON.stringify(savedRecipeObject));
                    console.log(counter);
                    localStorage.setItem("counter", counter);
                    
                }
            }
        })
    });


});

$("#start-over").on("click", function (event) {
    ingredientList = [];
    $("#ingredientDisplay").text("");
    $("#recipeDisplay").empty();
    $("#videoDisplay").empty();

});

$("#clear-saved").on("click", function (event) {
    var counter = 0;
    $("#savedRecipeDisplay").empty();
    localStorage.clear();
    localStorage.setItem("counter", 0);
    console.log(counter);
})
