console.log("This page is linked");

//array of strings
var foodList = [];


function renderButtons() {

    $("#food-view").empty();

    //loop through an array 
    for (var i = 0; i < foodList.length; i++) {

        var a = $("<button>");

        a.addClass("food");

        a.attr("data-name", foodList[i]);
        // Providing the button's text with a value of the topic at index i
        a.text(foodList[i]);
        // Adding the button to the HTML
        $("#foodHolder").append(a);
    }
}

$("#add-food").on("click", function (event) {

    event.preventDefault();

    var food = $("#food-input").val().trim();

    console.log(food);

    foodList.push(food);
    console.log(foodList)

    //$("#food-input").val("");

    renderButtons();

});

renderButtons();