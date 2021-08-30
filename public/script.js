const question = document.querySelector("#question");

function fillQuestionElements(data) {
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

function sendAnswer(answerIndex) {
  fetch(`/answer/${answerIndex}`, {
    method: "POST",
  })
    .then((r) => r.json())
    .then((data) => handeAnswerFeedback(data));
}

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
  button.addEventListener("click", (event) => {
    const answerIndex = event.target.dataset.answer;
    console.log(answerIndex);
    sendAnswer(answerIndex);
  });
}
