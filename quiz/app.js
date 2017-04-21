var state = { "QuestionList":[
				 {"question":"The amount of light or darkness on a photograph is known as the? ", "answers":["Exposure", "Shutter Speed","Contrast", "Sharpness", "a", "Exposure"]},
				 {"question":"In a gig setting (ie low light), the ISO should be set to? ", "answers":["The highest setting",
				  "The lowest setting","Between 400 and 1600", "About f/2.8", "c", "Between 400 and 1600"]},
				 {"question":"The amount of light passing through a lens is defined by the? ", "answers":["Shutter Speed", "Aperture","Film Speed", "Exposure", "b", "Aperture"]},
				 {"question":"What is the unit of measurement for light in photography? ", "answers":["Apertures", "Shutter speeds","Candlabras", "Stops", "d","Stops"]},
				 {"question":"If a shutter speed is 1/100, what is twice as quick?", "answers":["2/50", "1/200","1/50", "2/100", "b", "1/200"]}
				 ],
				"currentQuestion":1,
				"currentQuestionArrayPosition": 0,
				"numberCorrect": 0,
				"numberIncorrect": 0,
				"totalQuestions": 5,//questionLength,
				"userAnswersList": [],
				"currentQuestionDefault":1,
				"currentQuestionArrayPositionDefault": 0,
				"numberCorrectDefault": 0,
				"numberIncorrectDefault": 0
				
				};
//var questionLength = state.QuestionList.length;
//Functions

//changes the hidden class on items in HTML which displays the first question. Then passes the 
//variable to the next question
function showQuestion(argument) {
	var q = (state.currentQuestionArrayPosition);
	$('.qText').text(state.QuestionList[q].question);
	$('#a').text(state.QuestionList[q].answers[0]);
	$('#b').text(state.QuestionList[q].answers[1]);
	$('#c').text(state.QuestionList[q].answers[2]);
	$('#d').text(state.QuestionList[q].answers[3]);
	$('.center, .left, .right, .startQuiz, .qAForm').toggleClass('hidden');
	setScoreBoard();

};

function setScoreBoard(argument) {
	$('.correct-Num').text(state.numberCorrect);
	$('.incorrect-Num').text(state.numberIncorrect);
	$('.q-Num').text(state.currentQuestion + " ");
	$('.total-Q').text(" " + state.totalQuestions);
};

//
function nextQuestion(arg) {
	var q = (state.currentQuestionArrayPosition);
	$('.qText').text(state.QuestionList[q].question);
	$('#a').text(state.QuestionList[q].answers[0]);
	$('#b').text(state.QuestionList[q].answers[1]);
	$('#c').text(state.QuestionList[q].answers[2]);
	$('#d').text(state.QuestionList[q].answers[3]);
	$('.correct-answer, .qAForm, .center').toggleClass('hidden');
	

	};  

// Checks the aswer of the user to the question answer value in the array.
function checkAnswer(userAnswerText, userAnswerLetter) {
	var questionNumber = (state.currentQuestionArrayPosition);
	if (userAnswerLetter == state.QuestionList[questionNumber].answers[4]) {
			state.numberCorrect = (state.numberCorrect + 1);
			correctAnswerScreen();

		} else { state.numberIncorrect = (state.numberIncorrect + 1);
			correctAnswerScreen();
			}

	
};


//displays correct answer to the last question.
function correctAnswerScreen(arg) {
	var questionNumber = state.currentQuestionArrayPosition
	$('.correct-answer , .qAForm').toggleClass('hidden');
	$('.correct-answer-text').text(state.QuestionList[questionNumber].answers[5]);
	$('.user-answer-text').text(state.userAnswersList[questionNumber].answerText)
	if (state.QuestionList[questionNumber].answers[5] == state.userAnswersList[questionNumber].answerText ){ 
		$('.correct-answer').addClass('green');
		$('.titleText').text("Correct").addClass('green');
		$('.center').toggleClass('hidden')
		} else {$('.correct-answer').addClass('red');
				$('.titleText').text("Incorrect").addClass('red');
				$('.center').toggleClass('hidden')
			}
	setScoreBoard();
};

//shows final result
function resultScreen(argument) {
	setScoreBoard();
	var scoreNumber = (state.numberCorrect / state.totalQuestions)*100
	$('.correct-answer, .score-box, .center').toggleClass('hidden');
	$('.score').text(scoreNumber);
	if (scoreNumber >= 80){ $('.score').addClass('green')
		} else if (scoreNumber <= 40) {
			$('.score').addClass('red')
		} else {$('.score').addClass('yellow')}
};


//bring back home screen
function startQuizScreen(argument) {
	$('.center, .left, .right, .startQuiz').toggleClass('hidden');
	$('.titleText').text("This Again?");
	state.currentQuestion = state.currentQuestionDefault;
	state.currentQuestionArrayPosition = state.currentQuestionArrayPositionDefault;
	state.numberCorrect = state.numberCorrectDefault;
	state.numberIncorrect = state.numberIncorrectDefault;
	//state.userAnswersList = state.userAnswersListDefault;

}

//listeners
//starts quiz 
$('.startButton').click(function(event){
	event.preventDefault();
	showQuestion();
	
});
//submit button for each question
$('body').on('click', '.submitButton', function(event){
	event.preventDefault();
	var arrayPosition = state.currentQuestionArrayPosition
	var userAnswerLetter = ($('input[name="radio-button"]:checked').val());
	var userAnswerText = ($('input[name="radio-button"]:checked').next('span').text());
	var userDataJSON = {"letterAnswer": userAnswerLetter, "answerText": userAnswerText}
	if (userAnswerLetter == null) {
		alert("Nice try, You must select an answer. Click OK and try again!");
	} else {
		state.userAnswersList.push(userDataJSON);
		checkAnswer(userAnswerText, userAnswerLetter);
	};
	
	
})
//next question button on corret answer screen
$('.next-button').click(function(event) {
	event.preventDefault();	
	state.currentQuestion = (state.currentQuestion + 1);
	state.currentQuestionArrayPosition = (state.currentQuestionArrayPosition + 1);
	if (state.currentQuestion <= state.totalQuestions){
		nextQuestion();
	} else {
		state.currentQuestion = (state.currentQuestion - 1);
	state.currentQuestionArrayPosition = (state.currentQuestionArrayPosition - 1);
		resultScreen();
	}
	$('.correct-answer, .titleText').removeClass('red yellow green');
	//$('.center').toggleClass('hidden')
})

//new Quiz button
$('body').on('click', '.new-quiz', function(event) {
	event.preventDefault();
	$('.score-box').toggleClass('hidden')
	state.userAnswersList = [];
	$('.score').removeClass('red yellow green');
	startQuizScreen();
})