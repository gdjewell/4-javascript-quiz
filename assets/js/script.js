let timerSelect = document.querySelector('.timeleft');
let timer = document.querySelector('.timer');
let startGameButton = document.querySelector('.startbutton');
let questionContainer = document.querySelector('.questions-container');
let initialContainer = document.querySelector('.initial-container');
let askQuestion = document.querySelector('.askquestion');
let choices = document.querySelectorAll('.choices');
let answer1 = document.querySelector(".answer1");
      answer1.addEventListener('click', checkAnswer);
let answer2 = document.querySelector(".answer2");
      answer2.addEventListener('click', checkAnswer);
let answer3 = document.querySelector(".answer3");
      answer3.addEventListener('click', checkAnswer);
let answer4 = document.querySelector(".answer4");
      answer4.addEventListener('click', checkAnswer);
let highScoresContainer = document.querySelector('.highscores-container');
var questions;
let c = 0;
let quizStarted = false;
let secondsLeft = 75;
let currentScore = 0;
let highScores = [];
let count = localStorage.getItem("currentScore");
let highScoresHeader = document.querySelector('.highscores-header');
let showScores = document.querySelector('.showScores')

function startGame() {
  initialContainer.setAttribute("style", "display:none;");
  timerSelect.setAttribute("style", "display:inline");
  timer.setAttribute("style", "display:block")
  questionContainer.setAttribute("style", "display:block");
  showScores.setAttribute("style", "display:block")
  setTime();
  questions();
  loadQuizQuestions();
}

function loadQuizQuestions() {
 

 if (c < questions.length) {
  askQuestion.textContent = questions[c].question;
  answer1.textContent = questions[c].answers[0];
  answer2.textContent = questions[c].answers[1];
  answer3.textContent = questions[c].answers[2];
  answer4.textContent = questions[c].answers[3];
 } 
 else {
  endQuiz()
 }


}

function checkAnswer(event) {
  //Selects the button you clicked //
var answer = event.target.textContent;
if (answer === questions[c].correctAnswer) {
  currentScore++;
  console.log(currentScore);
  localStorage.setItem("count", currentScore);
} else {
  secondsLeft = secondsLeft - 5;
  localStorage.setItem("count", currentScore);
  console.log(count);
}
//move to next question
c++
loadQuizQuestions();
}

function setTime () {
 var countDown = setInterval(function() {
  secondsLeft--;
  timerSelect.textContent = secondsLeft;

  if (secondsLeft === 0) {
    clearInterval(countDown);
    endQuiz();
  }
 }, 1000)
}

function questions() {
  questions = [ 
    {
      question: "How do you select all div elements on the page?",
      answers:["A) document.querySelector('div')", "B) document.querySelectorAll('div')", "C) document.getElementById('#div')", "D) document.appendChild('div')" ], 
      correctAnswer:"B) document.querySelectorAll('div')",
    },
  
    {
      question: "How do you write a message to the console with JavaScript?",
      answers:["A) console.log('Your Message')", "B) document.innerText('Your Message')", "C) alert('Your Message')", "D) document.write('Your Message')" ], 
      correctAnswer: "A) console.log('Your Message')",
    },

    {
      question: "What is a variable that cannot be changed?",
      answers:["A) const", "B) var", "C) let", "D) give" ], 
      correctAnswer: "A) const",
    },

    {
      question: "How many JavaScript datatypes are there?",
      answers:["A) 6", "B) 4", "C) 8", "D) 9" ], 
      correctAnswer: "A) 6",
    },
  
  ]
}

function endQuiz() {
  timerSelect.setAttribute("style", "display:none");
  timer.setAttribute("style", "display:none")
  questionContainer.setAttribute("style", "display:none");
  localStorage.setItem("yourScore", currentScore);
  highScoresContainer.setAttribute("style", "display:block");
  highScoresHeader.textContent = `Your score is ${currentScore}. Enter your initials to add your high score.`
}

function viewScore() {
  highScoresHeader.textContent = `Your score is ${currentScore}. Here are the high scores:`
  timerSelect.setAttribute("style", "display:none");
  timer.setAttribute("style", "display:none")
  questionContainer.setAttribute("style", "display:none");
}

showScores.addEventListener("click", function(e) {
  console.log(showScores)
  viewScore();
})
