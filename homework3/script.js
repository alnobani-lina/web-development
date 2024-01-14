const quizData = [
    {
        question: 'What programing language is used for web?',
        answers: [
            { text: 'Java', correct: false },
            { text: 'Python', correct: false },
            { text: 'JavaScript', correct: true },
            { text: 'C++', correct: false }
        ]
    },
    {
        question: 'What is the capital of france?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Madrid', correct: false },
            { text: 'Roma', correct: false }
        ]
    },
    {
        question: 'What is the capital of italy?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Paris', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Roma', correct: true }
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion(quizData[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    resetAnswerButtons();
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function resetAnswerButtons() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer) {
    if (answer.correct) {
        score++;
    }
    nextButton.classList.remove('hide');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion(quizData[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        endGame();
    }
}

function endGame() {
    questionContainer.innerText = `Scor final: ${score} din ${quizData.length}`;
    resetAnswerButtons();
    nextButton.classList.add('hide');
    restartButton.classList.remove('hide');
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    restartButton.classList.add('hide');
    startGame();
}

startGame();
