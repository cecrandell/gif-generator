
let topics = ["The Office", "Grey's Anatomy", "Monk", "Friends", "New Girl"];
let display = $("#tv-buttons");

function initialButton() {
    display.empty();
    for (let i = 0; i < topics.length; i++) {
        let tvButton = $("<button type='button' class='btn btn-secondary btn-sm'>");
        tvButton.addClass("tv");
        tvButton.attr("data-name", topics[i]);
        tvButton.html(topics[i]);
        display.append(tvButton);
    }
};

$("#add-tv").on("click", function (event) {
    event.preventDefault();
    let tvShow = $("#tv-input").val().trim();
    topics.push(tvShow);
    initialButton();
});

initialButton();

$(document).on("click", "button", function () {
    $("#display-gifs").empty();
    let show = $(this).attr("data-name");
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=''&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            let results = response.data;
            for (let i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    let $newGif = $("<div>");
                    let rating = results[i].rating.toUpperCase();
                    let $p = $("<p>").html("Rating: " + rating);
                    let $tvGif = $("<img class='gif'>");
                    $tvGif.attr("src", results[i].images.fixed_height_still.url);
                    $tvGif.attr("data-still", results[i].images.fixed_height_still.url);
                    $tvGif.attr("data-animate", results[i].images.fixed_height.url);
                    $tvGif.attr("data-state", "still");
                    $newGif.append($tvGif);
                    $newGif.append($p);
                    $("#display-gifs").append($newGif);
                }
            }
        });
});

$(document).on("click", ".gif", function () {
    let state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});