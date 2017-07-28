// ===================================================================//
// ==========================TRIVIA GAME!!!===========================// 
// ===================================================================//


// ON CLICK EVENTS
// ==============================

$(document).on('click', '#start-over', function(e) {
  game.reset();
  
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#gameplay').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
  var sound = document.getElementById("audio");
    sound.play();;
});



// QUESTIONS
// ================================
var questions = [{
	
	question: "What was the first planet to be discovered using the telescope, in 1781?",
	answers: ["Earth", "Mars", "Jupiter", "Uranus", "Myanus"],
	correctAnswer: "Uranus",
	image: "assets/images/uranus.png"
}, {
	question: "What do the 'M's' in M&M's stand for?",
	answers: ["Marshal & Mathers", "Mars & Murrie", "Make & Mark", "Monsters & Men", "Mister & Miss"],
	correctAnswer: "Mars & Murrie", 
	image: "assets/images/mm.jpg"
}, {
	question: "Which animal cannot stick its tongue out?",
	answers:["Dog", "Cat", "Turtle", "Crocodile", "Elephant"],
	correctAnswer: "Crocodile",
	image: "assets/images/croc.jpg"
}, {
	question: "What is more efficient than caffeine to get you up in the mornings?",
	answers:["StarBucks Slap", "Sizzurp", "Apples", "Chewing gum", "Warm milk"],
	correctAnswer: "Apples",
	image: "assets/images/apple.jpg"
}, {
	question: "How many pieces of wood make a violin?",
	answers:[10, 30, 50, 70, 90],
	correctAnswer: 70,
	image: "assets/images/violin.jpg"
}, {
	question: "What is the world's most popular first name?",
	answers:["McLovin", "Muhammad", "Benjamin", "Jose", "James"],
	correctAnswer: "Muhammad",
	image: "assets/images/mclovin.gif"

}];

console.log(questions);

// VARIABLES
// ==============================
var gameScreen = $('#quiz');

var counterStartTime = 30;



// MAIN PROCESS
// ==============================
// Here we create an object, set to a var name of "game". Within this variable we will write out all of the functions
// which will be within the scope of "game". 

var game = {
  questions:questions,
  currentQuestion:0,
  counter:counterStartTime,
  correct:0,
  incorrect:0,

  // countdown function will start decrimenting the counter by one.. everysecond which is shown in the function below//
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

// if counter reaches 0, we will run timeUp function.
    if (game.counter === 0){
      // console.log("time's up!");
      game.timeUp();
    }
  },

// when a question is loaded on screen, start countdown..
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
// on gamescreen we will load first index of questions array..
    gameScreen.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      gameScreen.append('<button class="answer-button" id="button"' + 'data-name="' + 
      questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  
// 
  nextQuestion: function(){
    game.counter = counterStartTime;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    gameScreen.html('<h2>Out of Time!</h2>');
    gameScreen.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    gameScreen.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1500);
    } else {
      setTimeout(game.nextQuestion, 3 * 1500);
    }
  },
  
  results: function() {
    clearInterval(timer);

    gameScreen.html('<h2>Nice Job! Here are your results:</h2>');
    $('#counter-number').html(game.counter);
    gameScreen.append('<h3>Answered Right: ' + game.correct + '</h3>');
    gameScreen.append('<h3>Answered Wrong: ' + game.incorrect + '</h3>');
    gameScreen.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    gameScreen.append('<br><button id="start-over">Start Over</button>');
  },
  
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredRight();
    } else {
      this.answeredWrong();
    }
  },
  
  answeredWrong: function() {
    game.incorrect++;
    clearInterval(timer);
    gameScreen.html('<h2>WRONG!</h2>');
    gameScreen.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    gameScreen.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1500);
    } else {
      setTimeout(game.nextQuestion, 3 * 1500);
    }
  },
  
  answeredRight: function(){
    clearInterval(timer);
    game.correct++;
    gameScreen.html('<h2>Correct!</h2>');
    gameScreen.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1500);
    } else {
      setTimeout(game.nextQuestion, 3 * 1500);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = counterStartTime;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};