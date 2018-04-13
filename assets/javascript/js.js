// Initial array of movies
var giphys = ["dog", "cat", "duck", "bird"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayGiphyInfo() {

  var search = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=xl2g2fBoLlaf4I46IWkUA9yZES0KiLUt&limit=5";

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log("this is the search response: " + response);

    // Creating a div to hold the movie
   var giphyDiv = $("<div class='giphy'>");

    
    // Retrieving the URL for the video
    var gipURL = response.data[0].embed_url;
    console.log("this is the giphy video link: " + gipURL);

    // Creating an element to hold the video
    var gip = $("<iframe>").attr("src", gipURL);

    // Appending the video
    giphyDiv.append(gip);

    // Putting the entire search above the previous searches
    $("#giphy-view").prepend(giphyDiv);


    // Storing the rating data
    var rating = response.data[0].rating;

    // Creating an element to have the rating displayed
    var pRating = $("<p>").text("Rating: " + rating);

    // Displaying the rating
    giphyDiv.append(pRating);

  });

}

// Function for displaying movie data
function renderButtons() {

  // Deleting the movies prior to adding new movies
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of movies
  for (var i = 0; i < giphys.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var button = $("<button>");
    // Adding a class of movie-btn to our button
    button.addClass("giphy-btn");
    // Adding a data-attribute
    button.attr("data-name", giphys[i]);
    // Providing the initial button text
    button.text(giphys[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(button);
  }
}

// This function handles events where a movie button is clicked
$("#add-giphy").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var giphy = $("#giphy-input").val().trim();

  // Adding movie from the textbox to our array
  giphys.push(giphy);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".giphy-btn", displayGiphyInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();