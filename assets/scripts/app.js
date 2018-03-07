var topics = ["BioShock", "Minecraft", "Little Big Planet", "Metal Gear Solid", "Dark Souls", "Angry Birds", "Overwatch", "Pac-Man", "Monster Hunter: World", "The Sims"];
var query = {
    base: 'https://api.giphy.com/v1/gifs/search?q=',
    apikey: 'gmkN6kBnR0O0FLDuqS5XTwDHZdT0qycx',
    limit: 10,
    searchGiphy: function(topic){
        return this.base + topic + '&api_key=' + this.apikey + '&limit=' + this.limit;
    }
};

function displayGifs() {
    $("#gifs").empty();
    var btnName = $(this).attr('data-name');
    $("#game h2").text(btnName);
    $.ajax({
        url: query.searchGiphy(btnName),
        method: "GET"
    }).then(function (response) {
        $("#gifs").empty();
        console.log(response);
        $.each(response.data, function(prop, value) {

                var gamediv = $("<div>");
                var rating = $("<p>").text("Rating: " + value.rating.toUpperCase());
                var img = $("<img>");
                img.attr("src", value.images.fixed_height_small_still.url);
                gamediv.append(rating);
                gamediv.append(img);
                $("#gifs").append(gamediv);

        });


    });

}

function renderButtons() {

    $("#buttons").empty();
    for(var i = 0; i < topics.length; i++) {
        var btn = $("<button>");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        $("#buttons").append(btn);
    }
}

$(document).ready(function() {
    renderButtons();
    $("#custom_form button").on("click", function(e) {
        e.preventDefault();
        var btnName = $("#userbtn").val().trim();
        if(!btnName)  return;
        topics.push(btnName);
        renderButtons();
    });
    $('#buttons').on("click", "button", displayGifs);
});


