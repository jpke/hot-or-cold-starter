
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

    //set count and last guess upon page load
    var countNum = +$('#count').text();


    //reset game when NEWGAME button clicked
    $('.new').click(function() {
      newGame();
    });

    function newGame() {
      $('#count').text(0);
      $('#guessList').children().remove();
      secretNumber = getRandomInt();
      $('#feedback').text("Make your Guess!");
      countNum = 0;
    };


    //evaluate user guess
    $('form').submit(function(event) {
      event.preventDefault();
      var valid = validateResponse();
      if(valid) {
        evaluateGuess();
        //$('#count').text(countNum);
        recordGuessAndCount();
      }
      // reset input value
      $('#userGuess').val("");
    });

    function validateResponse() {
      userGuess = $('#userGuess').val();

      //need to fix
      var history = $('#guessList').children().map(function() {
                      return +$(this).text();
                    }).get();

      if(userGuess < 1 || userGuess > 100) {
        $('#feedback').text("Guess between 1 and 100!");
        return false;

      } else if(!(parseInt(userGuess))) {
        $('#feedback').text("Enter a number");
        return false;

      //invalidate guess if it has already been guessed
      } else if(userGuess ) {
        $('#feedback').text("Number already guessed");
        return false;

      } else {
        console.log("Guess is between 1 and 100");
        console.log("Secret number is " + secretNumber)
        return true;
      }
    };


    function evaluateGuess() {
      console.log("Count: " + (countNum + 1));

      // if(userGuess < 1 || userGuess > 100) {
      //   return $('#feedback').text("Guess between 1 and 100!");

      // } else if(!(parseInt(userGuess))) {
      //   return $('#feedback').text("Enter a number");

      // } else {
      //   console.log("Guess is between 1 and 100");
      //   console.log("Secret number is " + secretNumber);

        if(userGuess == secretNumber) {
          $('#feedback').text("You Won! Click NEWGAME to play again.");
        } else {
            
          if(countNum == 0) {
            countNum += 1;

             if(Math.abs(userGuess - secretNumber) >= 50) {
                $('#feedback').text("Ice cold");
            } else if (Math.abs(userGuess - secretNumber) >= 30) {
                $('#feedback').text("Cold");
            } else if (Math.abs(userGuess - secretNumber) >= 20) {
                 $('#feedback').text("Warm");
            } else if (Math.abs(userGuess - secretNumber) >= 10) {
                $('#feedback').text("Hot");
            } else if (Math.abs(userGuess - secretNumber) >= 1) {
                $('#feedback').text("Very hot");
            }
          } else {
               // countNum != 1
              countNum += 1;
              console.log("Recent guess: " + userGuess + ". Old guess: " + oldUserGuess);
                
            if(Math.abs(userGuess - secretNumber) < Math.abs(oldUserGuess - secretNumber)) {
               $('#feedback').text("Hotter!");
            } else if(Math.abs(userGuess - secretNumber) > Math.abs(oldUserGuess - secretNumber)) {
               $('#feedback').text("Colder!");
            } else $('#feedback').text("Neither hotter or colder");
          }
          // remember valid guess
          oldUserGuess = userGuess;
        }
      
    };


    function recordGuessAndCount() {
      if(parseInt(userGuess)) {
        $('#guessList').append("<li>" + userGuess + "</li>");
        $('#count').text(countNum);
      }
    };

});


