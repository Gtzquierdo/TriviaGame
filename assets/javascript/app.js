$(document).ready(function() {
    //console.log("ready!");

    //Game variables:
    //keep track of quesitons
    var questionCounter = 0;
    //timer starts at 15 seconds for each question
    var time = 15;
    //score for correct guesses
    var correctGuesses = 0;
    //score for incorrect guesses
    var incorrectGuesses = 0;

    //Questions and answers:
    var questions = [
        {
            question: "Starting Center?",
            choices: ["Nikola Jokic", "Mason Plumlee", "Scott Hastings", "Michael Jordan", "Monstars"],
            correctAnswer: "Nikola Jokic",
			image: "<img src='assets/images/jokic.jpg' class='picture'>"
	
            },
            {
            question: "Starting Point Guard?",
            choices: ["Monte Morris", "Will Barton", "Jamal Murray", "Paul Millsap", "Isaiah Thomas"],
            correctAnswer: "Jamal Murray",
            image: "<img src='assets/images/murray.jpg' class='picture'>"

            },
            {
            question: "Starting Shooting Guard ?",
            choices: ["Will Barton", "Jamal Murray", "Gary Harris", "Drake", "Rocky"],
            correctAnswer: "Gary Harris",
            image: "<img src='assets/images/harris.jpg' class='picture'>"
            },
            {
            question: "Head Coach?",
            choices: ["Michael Malone", "Rocky", "Vance Joseph", "Jared Bednar", "Hulk Hogan"],
            correctAnswer: "Michael Malone",
            image: "<img src='assets/images/malone.jpg' class='picture'>"
            },
            ];

            //fill in questions based on the question count
    function questionContent() {
            
        $("#gameScreen").append("<p><strong>" +
            questions[questionCounter].question + "</p><p class= 'choices'>" +
            questions[questionCounter].choices[0] + "</p><p class='choices'>" + 
            questions[questionCounter].choices[1] + "</p><p class='choices'>" + 
            questions[questionCounter].choices[2] + "</p><p class='choices'>" + 
            questions[questionCounter].choices[3] + "</strong></p>");
            
        };
            // user guessed correctl
    function userWin() {
        $("#gameScreen").html("<p>You're correct!</p>");
        correctGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer is <span class='answer'>" + correctAnswer + "</span></p>" + 
        questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
        };

    // user guessed incorrectly
    function userLoss() {
        $("#gameScreen").html("<p>Incorrect!</p>");
        incorrectGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The correct answer is <span class='answer'>" + correctAnswer + "</span></p>" + 
        questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
    };

    // user ran out of time
    function userTimeout() {
        if (time === 0) {
        $("#gameScreen").html("<p>You ran out of time!</p>");
        incorrectGuesses++;
        var correctAnswer = questions[questionCounter].correctAnswer;
        $("#gameScreen").append("<p>The answer was <span class='answer'>" + correctAnswer + "</span></p>" + 
        questions[questionCounter].image);
        setTimeout(nextQuestion, 4000);
        questionCounter++;
        }   
    };

    // screen that shows final score and message
	function resultsScreen() {
		if (correctGuesses === questions.length) {
			var endMessage = "You like Basketball as much as I do!";
			
		}
		else if (correctGuesses > incorrectGuesses) {
			var endMessage = "Good job!";
			
		}
		else {
			var endMessage = "C'mon Man";
			
		}
		$("#gameScreen").html("<p>" + endMessage + "</p>" + "<p>You got <strong>" + correctGuesses + "</strong> right.</p>" + "<p>You got <strong>" + incorrectGuesses + "</strong> wrong.</p>");
		$("#gameScreen").append("<h1 id='start'>Start Over?</h1>");
		$("#bottomText").html(bottomText);
		gameReset();
		$("#start").click(nextQuestion);
	};

	// game clock currently set to 15 seconds
	function timer() {
		clock = setInterval(countDown, 1000);
		function countDown() {
			if (time < 1) {
				clearInterval(clock);
				userTimeout();
			}
			if (time > 0) {
				time--;
			}
			$("#timer").html("<strong>" + time + "</strong>");
		}
	};

	// moves question counter forward to show next question
	function nextQuestion() {
		if (questionCounter < questions.length) {
			time = 15;
			$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
			questionContent();
			timer();
			userTimeout();
		}
		else {
			resultsScreen();
		}
	// console.log(questionCounter);
	// console.log(questions[questionCounter].correctAnswer);
	};

	// reset score and counter on restart
	function gameReset() {
		questionCounter = 0;
		correctGuesses = 0;
		incorrectGuesses = 0;
	};

    function startGame() {
    	$("#gameScreen").html("<p>You have <span id='timer'>" + time + "</span> seconds left!</p>");
    	$("#start").hide();
    	$("#gameScreen").append("<div id='question'>");  
    	var nextQuestion = questionContent(questionCounter); 
    	$("#gameScreen").append(nextQuestion); 

		$("#gameScreen").append("<p>" + questions[questionCounter].question + "</p><p>" + questions[questionCounter].choices[0] + "</p><p>" + questions[questionCounter].choices[1] + "</p><p>" + questions[questionCounter].choices[2] + "</p><p>" + questions[questionCounter].choices[3] + "</p>");
		questionCounter++;
		questionContent();
    	timer();
    	userTimeout();
    };

    // this starts the game
    $("#start").click(nextQuestion);

    // click function to trigger right or wrong screen
	$("#gameScreen").on("click", ".choices", (function() {
		var userGuess = $(this).text();
		if (userGuess === questions[questionCounter].correctAnswer) {
			clearInterval(clock);
			userWin();
		}
		else {
			clearInterval(clock);
			userLoss();
		}
	}));
});