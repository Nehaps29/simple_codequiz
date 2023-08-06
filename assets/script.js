var startButton = document.querySelector("#start_button");
var firstPage = document.querySelector(".first_page");
var quiz = document.querySelector(".quiz");
var q1 = document.querySelector("#q1");
var a1 = document.querySelector("#a1");
var a2 = document.querySelector("#a2");
var a3 = document.querySelector("#a3");
var a4 = document.querySelector("#a4");
var display_question = document.querySelector(".questionsDisplayed");
var next = document.querySelector("#next");
var startAgain = document.querySelector("#start_again");
var showHighestScore = document.querySelector("#show_highest_score");
var questionIndex = 0;
var score = 0;
//var count = 0;
//var array_score = [];
var array_score = JSON.parse(localStorage.getItem("array_score")) || [];
var your_score = document.querySelector("#your_score");
var lastPage = document.querySelector("#last_page");
var pMessage = document.querySelector("#message");
var countdownTimer = document.querySelector("#countdown_timer");
var answerStatus = true;
var initials = document.querySelector('#name');
quiz.style.display = "none";
lastPage.style.display= "none";
high_score_page.style.display = "none";
startButton.addEventListener("click", startQuiz);
startButton.addEventListener("click", startQuiz);
next.addEventListener("click", nextF);
var userInput = "";


//fucntion to start the quiz
function startQuiz() {
    firstPage.style.display= "none";
    high_score_page.style.display = "none";
    startButton.disabled = true;    
    quiz.style.display =  "block";
    showQuestion(questionIndex);
    countdown();
}   
// Questions for quiz stored in object
var quizQuestion = [
    {
    question: "What is not Data Type?",
    answers: ["Strings","Integer","Boolean","Alert"],
    correctAnswer: "Alert"
    },

    {
    question: "most useful debugger is?",
    answers: ["Console","for loop","JavaScript","if_else"],
    correctAnswer: "Console"
    },

    {
    question: "Array in the javaScrpit is used to store?",
    answers: ["Number", "String","Boolean","All"],
    correctAnswer: "All"
    }, 

    {
    question: "String values must be enclosed in?",
    answers: ["Parenthesis", "Square Bracket","Round Bracket","double quotes"],
    correctAnswer: "double quotes"
    }, 

    {
    question: "src stands for?",
    answers: ["Source", "Data","Error","All"],
    correctAnswer: "Source"
    }, 

    {
        question: "h in html stands for?",
        answers: ["Hyper", "markup", "text", "language"],
        correctAnswer: "Hyper"
    },

    {
        question: "t in html stands for?",
        answers: ["Hyper", "markup", "text", "language"],
        correctAnswer: "text"
    },

    {
        question: "m in html stands for?",
        answers: ["Hyper", "markup", "text", "language"],
        correctAnswer: "markup"
    }

            
]   

//function after next button is clicked and check various condition to calculate score and move 
function nextF (){
    var ui = userInput;
    a1.style.color="black";
    a2.style.color="black";
    a3.style.color="black";
    a4.style.color="black";
    if (ui == quizQuestion[questionIndex].correctAnswer){
        
        score=score+1;
     } else {
        answerStatus = false;
     }
    
    if (questionIndex==7){
    
       display_score();
       
       return
    }
    
    if (questionIndex<8){
        questionIndex++;
        showQuestion(questionIndex);
    }

}
// function to display question 
function showQuestion (countQ) {
    q1.innerHTML = "<h3>"+quizQuestion[countQ].question+"<h3/>";
    a1.innerHTML= quizQuestion[countQ].answers[0];
    a2.innerHTML= quizQuestion[countQ].answers[1];
    a3.innerHTML= quizQuestion[countQ].answers[2];
    a4.innerHTML= quizQuestion[countQ].answers[3];
}
// function to get user answer and add style to it
function selectedAnswerA(){
    userInput = a1.innerHTML;
    a1.style.color="red";
    a2.style.color="black";
    a3.style.color="black";
    a4.style.color="black";
   
}

function selectedAnswerB(){
    userInput = a2.innerHTML;
    a1.style.color="black";
    a2.style.color="red";
    a3.style.color="black";
    a4.style.color="black";
   
}

function selectedAnswerC(){
    userInput = a3.innerHTML;
    a1.style.color="black";
    a2.style.color="black";
    a3.style.color="red";
    a4.style.color="black";
    
}

function selectedAnswerD(){
    userInput = a4.innerHTML;
    a1.style.color="black";
    a2.style.color="black";
    a3.style.color="black";
    a4.style.color="red";
    
}

a1.addEventListener("click",selectedAnswerA);
a2.addEventListener("click",selectedAnswerB);
a3.addEventListener("click",selectedAnswerC);
a4.addEventListener("click",selectedAnswerD);

//function to get score stored in an array via local storage
function display_score() {
    quiz.style.display = "none";
    firstPage.style.display = "none";
    high_score_page.style.display = "none";
    document.querySelector("#last_page").style.display = "block";
    array_score.push(score);
    localStorage.setItem("array_score", JSON.stringify(array_score));

}
    
// addind event listener
startAgain.addEventListener("click", showFirstPage);
showHighestScore.addEventListener("click",showHigestSCore);

function showFirstPage() {
    firstPage.style.display= "block";
    
}
// function to display highest score
function showHigestSCore(event){
    event.preventDefault();
    high_score_page.style.display = "block";
    var initials = document.forms["username"]["name"].value;
    var highScoreArray = JSON.parse(localStorage.getItem("array_score"));
    console.log(Math.max.apply(Math, highScoreArray))
    pMessage.innerHTML = initials.valueOf()+" your highest Score is " + Math.max.apply(Math, highScoreArray);

}

function countdown() {
    var timeLeft = 25;
  
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 0 && questionIndex<7 && answerStatus==true ) {
        // Set the `textContent` of `timerEl` to show the remaining seconds
        countdownTimer.innerHTML = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
        console.log("inside timer");
      } 
      if (questionIndex==7) {
        clearInterval(timeInterval);
        display_score();
        console.log("inside time interval where question is last");
      } 

      if (answerStatus==false && timeLeft>0){
        timeLeft=timeLeft-5;
        answerStatus = true;
        countdownTimer.innerHTML = timeLeft + ' seconds remaining';
        console.log("inside time interval where answer is wrong");
      }

      if (timeLeft==0){
        clearInterval(timeInterval);
        console.log("inside timer where timeleft is 0");
        display_score();
      }

      if (timeLeft<0){
        clearInterval(timeInterval);
        console.log("inside timer where timeleft is 0");
        display_score();
      }
    }, 1000);
  }

