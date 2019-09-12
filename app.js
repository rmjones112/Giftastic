
//
//setting list of animal buttons 
var animalOptions = [
	"cat",
	"dog",
	"owl",
	"tiger",
    "goose",
    "moose",
    "zebra",
    "kangaroo"

];

for(var i = 0; i < animalOptions.length; i++) {
	var button = $("<button>").text(animalOptions[i]);
	button.attr("data-animal", animalOptions[i]);
	button.addClass("animal-button");
	$("#button-group").append(button);
}

$("#add-animal-button").on("click", function(e) {
	e.preventDefault();
	var alreadyExist = false;
	if(animalOptions.indexOf($("#new-animal-input").val()) !== -1) {
		alreadyExist = true;
	}
	if($("#new-animal-input").val() !== "" && alreadyExist === false) {
		var newAnimal = $("#new-animal-input").val().toLowerCase();
		animalOptions.push(newAnimal);
		var button = $("<button>").text(newAnimal);
		button.attr("data-animal", newAnimal);
		button.addClass("animal-button");
		$("#button-group").append(button);
	}
	$("#new-animal-input").val("");
});

$(document).on("click", ".animal-button", function() {
	var animal = $(this).attr("data-animal");
    
    
    //adding API key Hl4YFSRK10teMezFDJBqKVTTVRceAVCB 
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=Hl4YFSRK10teMezFDJBqKVTTVRceAVCB&limit=10";

        //pulled from in-class activity 

//performing AJAX request with query URL
    $.ajax({
    	url: queryURL,
        method: "GET"
        //data comes back from request 
    }).then(function(response) {
        //data stored as results varible 
    	var results = response.data;
    	// console.log(results);

		var resultsContainerSection = $("<section class='results-container'>");

    	for(var i = 0; i < results.length; i++) {
    		var singleResultDiv = $("<div class='result-container'>");
    		
    		var rating = results[i].rating;
//setting rating for gifs used inclass activity 
    		var p = $("<p>").text("Rating: " + rating);

    		var animalImg = $("<img class='result'>");
    		animalImg.attr("src", results[i].images.fixed_height_still.url);
    		animalImg.attr("data-state", "still");
    		animalImg.attr("data-still", results[i].images.fixed_height_still.url);
    		animalImg.attr("data-animate", results[i].images.fixed_height.url);

    		singleResultDiv.prepend(animalImg);
    		singleResultDiv.prepend(p);

    		resultsContainerSection.prepend(singleResultDiv);
    	}

    	$("#animal-group").prepend(resultsContainerSection);
    });
});
//pause/start ability on gifs from in-class activity 
$(document).on("click", ".result", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});