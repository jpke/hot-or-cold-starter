
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

    //generate random number between 1-100
    var min = 1;
    var max = 100;
    function getRandomInt() {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    //pick secret random number upon page load
    var secretNumber = getRandomInt();


    // reset page for new game
    var newGame = function() {
      //$('#userGuess').val() = null;
      $('#count').text(0);
      $('#guessList').children().remove();
      secretNumber = getRandomInt();
    };

    //call newGame when button clicked
    $('.new').click(newGame());

    //evaluate user guess
    $('form').submit(function(event) {
      event.preventDefault();
      evaluateGuess();
    };

    function evaluateGuess() {
      var userGuess = $('#userGuess').val();
        // reset input value
      $('#userGuess').val("");
      console.log(userGuess)

      var count = +$('#count').text();

      if(userGuess < 1 || userGuess > 100) {
        return $('#feedback').text("Guess between 1 and 100!");
      } else if(count == 0) {
        console.log("Guess is between 1 and 100");
        console.log("Secret number is " + secretNumber);
        if(userGuess == secretNumber) {
          return $('#feedback').text("You Won! Click NEWGAME to play again.");
        } else if(Math.abs(userGuess - secretNumber) >= 50) {
          return $('#feedback').text("Ice cold");
        } else if (Math.abs(userGuess - secretNumber) >= 30) {
          return $('#feedback').text("Cold");
        } else if (Math.abs(userGuess - secretNumber) >= 20) {
          return $('#feedback').text("Warm")
        } else if (Math.abs(userGuess - secretNumber) >= 10) {
          return $('#feedback').text("Hot")
        } else if (Math.abs(userGuess - secretNumber) >= 1) {
          return $('#feedback').text("Very hot")
        }
      }
    });

});


