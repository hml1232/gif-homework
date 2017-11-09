$(document).ready(function(){
	//All variables
		var apiKey = "iD2isJweAMLIM3EWgYMZnMCI7vYA0a40";
		var things = ["Burger", "Fries", "Sushi", "Pizza", "Pancakes", "Soup", "Taco", "Burrito","Pasta"];
		var bttn;
		var text;
		var thing;
		var gifs;

	
	var makeButtons = function(things){
		things.forEach(function(name){
			bttn = $("<button />");
			bttn.text(name);
			bttn.addClass("btn btn-block btn-warning");
			bttn.appendTo($("#buttons"));
		});
	}
		
	makeButtons(things);

	$("#buttons").on("click", ".btn", function(){
		$("#content").empty();
		thing = $(this).text();
		if(thing.includes(" ")){
			thing.split(" ").join("+");
		}
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/search?q="+thing+"+food&api_key="+apiKey+"&limit=8&rating=pg-13",
			method: "GET"}).done(function(response){
				for(var i = 0; i < 10; i+=2){
					gifs = $("<div />");
					gifs.addClass("row gif-row");
					gifs.html("<div class='col-lg-6'><img id='"+response.data[i].id+"' class='food-gif' src='"+response.data[i].images.original_still.url+"' alt='Gif of food'><p>Rating: "+response.data[i].rating.toUpperCase()+"</p></div><div class='col-lg-6'><img id='"+response.data[i+1].id+"' class='food-gif' src='"+response.data[i+1].images.original_still.url+"' alt='Gif of food'><p>Rating: "+response.data[i+1].rating.toUpperCase()+"</p></div>");
					gifs.appendTo($("#content"));
				}
			});

	});

	
	$("#content").on("click", ".food-gif", function(){
		var gifSrc = this.src;
		var thisGif = this.id;
		$.ajax({
			url: "https://api.giphy.com/v1/gifs/"+thisGif+"?api_key="+apiKey,
			method: "GET"}).done(function(response){
				if(gifSrc === response.data.images.original_still.url){
					$("#"+thisGif).attr("src", response.data.images.original.url);
				}
				else{
					$("#"+thisGif).attr("src", response.data.images.original_still.url);
				}
			});
	});


	$("#addFood").on("click", function(event){
		event.preventDefault();
		text = $("#entrFood").val();
		if(text === ""){}
		else {
			things.push(text);
			$("#buttons").empty();
			makeButtons(things);
		}
	});

});