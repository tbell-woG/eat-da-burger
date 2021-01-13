// This is the function that has both of the on click functions & waits for the DOM to be loaded
$(function() {

    // This adds a new burger
    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: 0
        };

        // This sends the POST request
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("Added new burger");
            // This reloads the page to display the updated burger list
            location.reload();
        });
    });

    $(".eatburger").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");
        var devouredState = {
            devoured: 1
        };

        // This sends the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        })
        .then(function() {
            console.log("The burger is devoured");
            location.reload();
        });
    });

    $(".trashburger").on("click", function(event) {
        event.preventDefault();

        var id = $(this).data("id");

        // This sends the DELETE request
        $.ajax({
            type: "DELETE",
            url: "/api/burgers/" + id
        }).then(location.reload());
    });

})