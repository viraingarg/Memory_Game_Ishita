//global variables used 
var ques_image='<img src="img/question2.ico" alt="???" height="100px" width="100px">';
var moves_in_total;
var time_elapsed;
var allsecs;
var seconds_count;
var minutes_count;
var time_format_string;
var stars_given;
var star_string='<img src="img/star.ico" height="25px" width="25px">';
var cards_check_array = [];
var id_of_cards = [];
var flip_count = 0;
var start = 0;
var cards_storage = ['img/apple.jpg',
					 'img/apple2.jpg',
					 'img/apple3.jpg',
					 'img/apple4.jpg',
					 'img/orange1.png',
					 'img/burger.png',
					 'img/domino.jpg',
					 'img/kfc.jpg',
					 'img/apple.jpg',
					 'img/apple2.jpg',
					 'img/apple3.jpg',
					 'img/apple4.jpg',
					 'img/orange1.png',
					 'img/burger.png',
					 'img/domino.jpg',
					 'img/kfc.jpg'];

//to call main function on window load
window.onload= main_function;

// main function which calls all the other required functions
function main_function(){
	counstruct_func();
}

//function to shuffle array data so that every time cards will be place randomly
Array.prototype.cards_ko_shuffle = function(){
    var y = this.length, x, h;
    while(--y > 0){
        x = Math.floor(Math.random() * (y+1));
        h = this[x];
        this[x] = this[y];
        this[y] = h;
    }
};

//sets time and rating and checks again after every 1 sec
function check_TimeandRating_fun()
{
	++allsecs;
			
	//calculating seconds and minutes
    seconds_count = adjust_time(allsecs%60);
    minutes_count = adjust_time(parseInt(allsecs/60));
	time_elapsed.innerHTML= minutes_count+":"+seconds_count;
	
	//logic to check star rating 
	if(moves_in_total < 16){
		stars_given = 3;
	}
	else if(moves_in_total > 15 && moves_in_total < 26){
		stars_given = 2;
	}
	else if(moves_in_total > 25){
		stars_given = 1;
	}
	s = document.getElementById("stars");
	s.innerHTML="";
	
	//for loop to add stars on the html element
	for (var j = 0; j < this.stars_given; j++){
		var t = document.createElement('span');
		t.innerHTML=star_string;
		s.appendChild(t);
	}
}

function adjust_time(val)
{
    time_format_string = val + "";
    if(time_format_string.length == 2)
    {
		return time_format_string;       
    }
    else if(time_format_string.length < 2)
    {
        return "0" + time_format_string;
    }
}


//A utility function to display timer and star rating
function util_fun(){
        time_elapsed = document.getElementById("timer");
		time_elapsed.innerHTML="0";
		seconds_count=0;
		minutes_count=0;
        allsecs = 0;
        setInterval(check_TimeandRating_fun, 1000);
}
		
function callToModal()
{
	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];
	
	var message = document.getElementById('message');
	
	message.innerHTML = "Cogratulations, Game completed successfuly.<br><br> Time elapsed : " +minutes_count+" min "+ seconds_count+" sec"+
					        "<br><br> Rating given by the game : "+stars_given+" star. <br><br>Do you want to play it again ?"

	modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}
}

//function used to create game canvas and tiles to be flipped
function counstruct_func(){
	document.getElementById('board').innerHTML = "";
	flip_count = 0;
	moves_in_total=0;
	var output = '';
	start = 0;
	//shuffling array
    cards_storage.cards_ko_shuffle();
	
	//for loop to create tiles and append them into the canvas
	for(var k = 0; k < cards_storage.length; k++){
		output += '<div id="id_'+k+'" onclick="flipCardCheck(this,\''+cards_storage[k]+'\')">'+ques_image+'</div>';
	}
	document.getElementById('board').innerHTML = output;
	document.getElementById('points').innerHTML = '0';
	document.getElementById('stars').innerHTML = '0';
	document.getElementById('timer').innerHTML = '0';
}

//function is called whenever a tile is flipped to do the various functioning
function flipCardCheck(cardr,value){
	
	start++;
	if(start == 1){
		util_fun()
	}
	
	//logic to check whether the tile is already flipped or not
	if(cardr.innerHTML == ques_image && cards_check_array.length < 2)
	{
		//putting data onto the other side of tile on flpping
		cardr.innerHTML = '<img src="'+value+'" alt="???" height="100px" width="100px">';
		
		//check whether it is the first card or the second card to be paired
		if(cards_check_array.length == 0){
			cards_check_array.push(value);
			id_of_cards.push(cardr.id);
		} 
		//if the card is the second card which is to be paired
		else if(cards_check_array.length == 1){
			
			//incrementing move value by 1
			++moves_in_total;
		
			//displaying moves in the information board of html
			document.getElementById('moves').innerHTML = moves_in_total;
			
			cards_check_array.push(value);
			id_of_cards.push(cardr.id);
			
			//checks if both the card are same or not
			if(cards_check_array[0] == cards_check_array[1]){
				flip_count += 2;
				document.getElementById('points').innerHTML = flip_count;
				// Clear both arrays
				cards_check_array = [];
            	id_of_cards = [];
				
				// Check to see if the whole board is cleared
				if(flip_count == cards_storage.length){
					setTimeout(callToModal, 900);
				}
				//if both the cards are different
			} 
			else{
				//unflip the cards again
				function cardflip(){
				    var card1 = document.getElementById(id_of_cards[0]);
				    var card2 = document.getElementById(id_of_cards[1]);
            	    card1.innerHTML = ques_image;
            	    card2.innerHTML = ques_image;
				    // Clear both arrays
				    cards_check_array = [];
            	    id_of_cards = [];
				}
				setTimeout(cardflip, 561);
			}
		}
	}
}