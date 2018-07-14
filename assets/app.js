console.log("This page is linked");

//array of strings
var ingredients = [];


function renderButtons() {

    $("#ingredients-view").empty();

    //loop through an array 
    for (var i = 0; i < ingredients.length; i++) {

        var a = $("<button>");

        a.addClass("ingredient");

        a.attr("data-name", ingredients[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(ingredients[i]);
        // Adding the button to the HTML
        $("#ingredient-view").append(a);
    }
}

$("#add-ingredient").on("click", function (event) {

    event.preventDefault();

    var ingredient = $("#ingredient-input").val().trim();

    console.log(ingredients);

    ingredients.push(ingredient);

    $("#ingredient-input").val("");

    renderButtons();

});

renderButtons();