const question = document.querySelector("#question");
const gameBoard = document.querySelector("#game-board");
const h2 = document.querySelector("h2");

function fillQuestionElements(data) {
  if (data.winner === true) {
    gameBoard.style.display = "none";
    h2.innerText = "WYGRANA!";
    return;
  }
  if (data.looser === true) {
    gameBoard.style.display = "none";
    h2.innerText = "NIESTETY PRZEGRAŁEŚ";
    return;
  }

  question.innerText = data.question;

  for (const i in data.answers) {
    const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
    answerEl.innerText = data.answers[i];
  }
}

function showNextQuestion() {
  fetch("/question", {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => fillQuestionElements(data));
}

showNextQuestion();

const goodAnswersSpan = document.querySelector("#good-answers");
function handleAnswerFeedback(data) {
  goodAnswersSpan.innerText = data.goodAnswers;
  showNextQuestion();
}

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((r) => r.json())
    .then((data) => handleAnswerFeedback(data));
}

const buttons = document.querySelectorAll(".answer-button");

for (const button of buttons) {
  button.addEventListener("click", (event) => {
    const answerIndex = event.target.dataset.answer;
    console.log(answerIndex);
    sendAnswer(answerIndex);
  });
}

const tipDiv = document.querySelector("#tip");
function handleFriendsAnswer(data) {
  tipDiv.innerText = data.text;
}

function callToAFriend() {
  fetch(`/help/friend`, {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => handleFriendsAnswer(data));
}

document
  .querySelector("#callToAFriend")
  .addEventListener("click", callToAFriend);

function handleHalfOnHalfAnswer(data) {
  tipDiv.innerText = data.text;
}

function halfOnHalf() {
  fetch(`/help/friend`, {
    method: "GET",
  })
    .then((r) => r.json())
    .then((data) => handleHalfOnHalfAnswer(data));
}
document.querySelector("#halfOnHalf").addEventListener("click", halfOnHalf);
