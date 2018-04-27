
var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [{
  question: "Cuanto ama Jelfsyn a Alejandra?",
  answers: ["Infinitamente, la ama demasiado", "Mucho", "Bastante", "Poco"],
  correctAnswer: "Infinitamente, la ama demasiado",
  image: "assets/images/Babe2.jpg"
}, {
  question: "Quiere Jelfsyn pasar el resto de su vida con Alejandra?",
  answers: ["No", "Por supuesto", "Claro, es lo que mas anhela!", "Quizas"],
  correctAnswer: "Claro, es lo que mas anhela!",
  image: "assets/images/Babe8.jpg"
}, {
  question: "Es alejandra el amor de la vida de Jelfsyn?",
  answers: ["No", "Si lo es, sin duda alguna!", "Puede serlo", "En un futuro"],
  correctAnswer: "Si lo es, sin duda alguna!",
  image: "assets/images/Babe10.jpg"
}, {
  question: "Que seria capaz Jelfsyn de hacer por Alejandra?",
  answers: ["Lo que ella pida", "Haria y daria todo por ella sin pensarlo!", "Nada", "Lo necesario"],
  correctAnswer: "Haria y daria todo por ella sin pensarlo!",
  image: "assets/images/Babe9.jpeg"
}, {
  question: "Que es lo que mas le gusta a Jelfsyn de Alejandra?",
  answers: ["Su cuerpo", "Su cara", "Definitivamete todo, le encanta por dentro y fuera tal y como es", "Su nariz"],
  correctAnswer: "Definitivamete todo, le encanta por dentro y fuera tal y como es",
  image: "assets/images/Babe7.jpeg"
}, {
  question: "Como se siente Jelfsyn al tener a Alejandra?",
  answers: ["Bien", "Excelente", "Agradecido con ella, la vida y dios por haberle dado la oportunidad de estar con ella", "No muy bien"],
  correctAnswer: "Agradecido con ella, la vida y dios por haberle dado la oportunidad de estar con ella",
  image: "assets/images/Babe6.jpg"
}, {
  question: "Es Alejandra la persona mas especial e importante para Jelfsyn?",
  answers: ["No", "Es sin duda lo mas especial e importante, como ella nunca existira nadie", "Si", "Talvez..."],
  correctAnswer: "Es sin duda lo mas especial e importante, como ella nunca existira nadie",
  image: "assets/images/Babe3.jpg"
}, {
  question: "Mantiene Jelfsyn en su mente y corazon a Alejandra siempre?",
  answers: ["Sin duda alguna", "Nunca deja de pensar en ella, es su primer y ultimo pensamiento", "No", "Casi siempre"],
  correctAnswer: "Nunca deja de pensar en ella, es su primer y ultimo pensamiento",
  image: "assets/images/Babe5.jpg"
}];

// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>Sin duda alguna sabes lo que siente Jelfsyn por Aljandra y cuanto la ama!</h2>");

    $("#counter-number").html(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Nope!</h2>");
    panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});
