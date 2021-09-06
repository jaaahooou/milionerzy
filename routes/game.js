const fs = require("fs");

function gameRoutes(app) {
  let goodAnswers = 0;
  let isGameOver = false;
  let callToAFriend = false;
  let questionToTheCrowd = false;
  let halfOnHalf = false;

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
}

module.exports = gameRoutes;
