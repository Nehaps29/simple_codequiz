var startButton = document.querySelector("#start_button");
var firstPage = document.querySelector(".first_page");

startButton.addEventListener("click", startQuiz);


function startQuiz() {
    firstPage.display = "none";
    console.log("it is working");
}