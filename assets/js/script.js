let timerSelect = document.querySelector('.timeleft');
let timer = document.querySelector('.timer');
let startGameButton = document.querySelector('.startbutton');
let questionContainer = document.querySelector('.questions-container');
let initialContainer = document.querySelector('.initial-container');
let askQuestion = document.querySelector('.askquestion');
let choices = document.querySelectorAll('.choices');
let answer1 = document.querySelector(".answer1");     
let answer2 = document.querySelector(".answer2");     
let answer3 = document.querySelector(".answer3");      
let answer4 = document.querySelector(".answer4");
let highScoresContainer = document.querySelector('.highscores-container');
let highScoreSubmit = document.querySelector('.submit-button')
var questions;
let c = 0;
let quizStarted = false;
let secondsLeft = 75;
let currentScore = 0;
let highScores = [];
  if (localStorage.getItem("highScores")) {
  highScores = JSON.parse(localStorage.getItem("highScores"));
}

let count = localStorage.getItem("currentScore");
let highScoresHeader = document.querySelector('.highscores-header');
let showScores = document.querySelector('.showScores');
let inputInitials = document.querySelector('#name');
let highScoreList = document.querySelector(".highscore-list");
let highScoresForm = document.querySelector(".highscoresform")


function startGame() {

  // First part of quiz start hides the initial section, shows the timer section, and hides high score section.
  initialContainer.setAttribute("style", "display:none;");
  timerSelect.setAttribute("style", "display:inline");
  timer.setAttribute("style", "display:block")
  questionContainer.setAttribute("style", "display:block");
  showScores.setAttribute("style", "display:block")
  highScoresContainer.setAttribute("style", "display:none");
  highScoresForm.setAttribute("style", "display:none")

  // calls functions to set the time, loads in the question list, and load the questions on the screen.

  setTime();
  questions();
  loadQuizQuestions();
}

function loadQuizQuestions() {
 
// Shows the first question. C will be incremented within the checkAnswer function to move to the next question. If there are no more questions, sends you to endQuiz function.

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
  
var answer = event.target.textContent; //Selects the button you clicked //
if (answer === questions[c].correctAnswer) {  // Verifies if correct answer was selected
  currentScore++; // adds to your score
  localStorage.setItem("count", currentScore); //updates local storage with current score
} else {
  secondsLeft = secondsLeft - 5;  //Removecs 5 seconds for wrong answer.
  localStorage.setItem("count", currentScore);
  console.log(count);
}

c++    //move to next question
loadQuizQuestions();
}

// This function shows a timer on the page when the questions load.

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
// This function shows the input score screen, and saves score to local storage.

function endQuiz() {
  timerSelect.setAttribute("style", "display:none");
  timer.setAttribute("style", "display:none")
  questionContainer.setAttribute("style", "display:none");
  localStorage.setItem("yourScore", currentScore);
  highScoresForm.setAttribute("style", "display:block");
  highScoresHeader.textContent = `Your score is ${currentScore}. Enter your initials to add your high score.`
}

function viewScore() {
  
  initialContainer.setAttribute("style", "display:none;");
  highScoresForm.setAttribute("style", "display:none");
  highScoresContainer.setAttribute("style", "display:block");
  highScoresHeader.textContent = `Your score is ${currentScore}. Here are the high scores:`
  highScoreSubmit.setAttribute("style", "display:none");
  timer.setAttribute("style", "display:none");
  questionContainer.setAttribute("style", "display:none");
  highScoreList.innerHTML = ""; // clears high score list
  let listContainer = document.createElement("ul");
  //Each number of high scores it creates a list item within the listContainer and adds the high score to page. //
  for (i=0; i < highScores.length; i++) { 
    let listItem = document.createElement("li");
    listItem.textContent = `${highScores[i].name}: Score | ${highScores[i].score}`;
    listContainer.appendChild(listItem);
  }
  highScoreList.appendChild(listContainer);

}

//Function submits your high score to local storage, and stores data entered by user into a variable. Prevents the page from reloading when submit button is clicked.

function submitHighScore(e) {
  e.preventDefault();
  let userName = inputInitials.value;
  const userData = {name: userName, score: currentScore};
  console.log(userData);
  highScores.push(userData);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  viewScore();
}

// Event Listeners


// Listens when an answer is clicked

answer1.addEventListener('click', checkAnswer);

answer2.addEventListener('click', checkAnswer);

answer3.addEventListener('click', checkAnswer);

answer4.addEventListener('click', checkAnswer);

highScoreSubmit.addEventListener("click", submitHighScore);

showScores.addEventListener("click", viewScore)
