const fs = require("fs");

function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriend = false;
  let questionToTheCrowd = false;
  let halfOnHalf = false;
  let callToAFriendUsed = false;
  let halfOnHalfUsed = false;
  let questionToTheCrowdUsed = false;

  const questions = [
    {
      question: " Jaki jest najlepszy język programowania według mnie?",
      answers: ["C++", "Fortran", "JavaScript", "Java"],
      correctAnswer: 2,
    },

    {
      question: " Czy Sylwia ma fajną dupkę?",
      answers: ["Tak", "Nie", "Nie wiem", "Jest super"],
      correctAnswer: 3,
    },

    {
      question: " Czy Bojko zrobi kupę?",
      answers: ["Zrobi", "Nie zrobi", "Już zrobił", "Właśnie robi"],
      correctAnswer: 0,
    },
  ];

  app.get("/question", (req, res) => {
    if (goodAnswers === questions.length) {
      res.json({
        winner: true,
      });
    } else if (isGameOver) {
      res.json({
        looser: true,
      });
    } else {
      const nextQuestion = questions[goodAnswers];
      const { question, answers } = nextQuestion;
      res.json({ question, answers });
    }
  });

  app.post(`/answer/:index`, (req, res) => {
    if (isGameOver) {
      res.json({
        loser: true,
      });
    }
    const { index } = req.params;

    const question = questions[goodAnswers];

    const isGoodAnswer = question.correctAnswer === Number(index);

    if (isGoodAnswer) {
      goodAnswers++;
    } else {
      isGameOver = true;
    }

    res.json({ correct: isGoodAnswer, goodAnswers });
  });

  app.get("/help/friend", (req, res) => {
    if (callToAFriendUsed) {
      return res.json({
        text: "To koło ratunkowe było już wykorzystane",
      });
    }

    callToAFriendUsed = true;

    const doesFriendKnowAnswer = Math.random() < 0.5;
    const question = questions[goodAnswers];

    res.json({
      text: doesFriendKnowAnswer
        ? `Wydaje mi się, że odpowiedź to ${
            question.answers[question.correctAnswer]
          }`
        : "Nie mam kurwa pojęcia",
    });
  });

  app.get("/help/half", (req, res) => {
    if (halfOnHalfUsed) {
      return res.json({
        text: "To koło ratunkowe było już wykorzystane",
      });
    }

    halfOnHalfUsed = true;

    const question = questions[goodAnswers];

    const answersCopy = question.answers.filter(
      (s, index) => index !== question.correctAnswer
    );

    console.log(answersCopy);
    answersCopy.splice(~~(Math.random() * answersCopy.length), 1);

    res.json({
      answersToRemove: answersCopy,
    });
  });

  app.get("/help/crowd", (req, res) => {
    if (questionToTheCrowdUsed) {
      return res.json({
        text: "To koło ratunkowe było już wykorzystane",
      });
    }
    questionToTheCrowdUsed = true;

    const chart = [10, 20, 30, 40];

    for (let i = chart.length - 1; i > 0; i--) {
      const change = Math.floor(Math.random() * 20 - 10);

      chart[i] += change;
      chart[i - 1] -= change;
    }
    const question = questions[goodAnswers];
    const { correctAnswer } = question;
    [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

    res.json({
      chart,
    });
  });
}

module.exports = gameRoutes;
