 // Initial array of movies
 var giphys = ["dog", "cat", "duck", "bird"];

 // displayGiphyInfo function re-renders the HTML to display the appropriate content
 function displayGiphyInfo() {

   var search = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=xl2g2fBoLlaf4I46IWkUA9yZES0KiLUt&limit=5";


   // make a for loop to display 5 result searches each time the button is clicked.
   for (var j = 0; j < 5; j++) {



   // Creating an AJAX call for the specific search button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
       console.log("this is the search response: " + response);

     // Creating a div to hold the results
    var giphyDiv = $("<div class='giphy'>");
       // generate a random number to apply to the array index
   var randomIndex = Math.floor((Math.random() * 5));
     // Retrieving the URL for the video
     var gipURL = response.data[randomIndex].embed_url;
     console.log("this is the giphy video link: " + gipURL);

     // Creating an element to hold the video
     var gip = $("<iframe>").attr("src", gipURL).attr("frameBorder", 0);

     // Appending the video
     giphyDiv.append(gip);

     // Putting the entire search above the previous searches
     $("#giphy-view").prepend(giphyDiv);


     // Storing the rating data
     var rating = response.data[randomIndex].rating;

     // Creating an element to have the rating displayed
     var pRating = $("<p>").text("This " + search + " has a (" + rating + ") rating");

     // Displaying the rating
     giphyDiv.append(pRating);

   // end of ajax function
   });
   // end of for loop
   }
   // end of displayGiphyInfo function
 }

 // Function for displaying giphy search
 function renderButtons() {

   // Deleting anything in the buttons-view div
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of predefined search results
   for (var i = 0; i < giphys.length; i++) {

     // Then dynamicaly generating buttons for each search in the array
     // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
     var button = $("<button>");
     // Adding a class of giphy-btn to our button
     button.addClass("giphy-btn");
     // Adding a data-name
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

   // Adding a search from the textbox to our array
   giphys.push(giphy);
   console.log("this is the search array " + giphys);
   // Calling renderButtons which handles the processing of our search array
   renderButtons();
 });

 // Adding a click event listener to all elements with a class of "giphy-btn"
 $(document).on("click", ".giphy-btn", displayGiphyInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();