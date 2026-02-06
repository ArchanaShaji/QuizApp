const questions = [
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Mumbai", correct: false },
            { text: "New Delhi", correct: true },
            { text: "Kolkata", correct: false },
            { text: "Chennai", correct: false }
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answers: [
            { text: "Amazon", correct: false },
            { text: "Nile", correct: true },
            { text: "Yangtze", correct: false },
            { text: "Mississippi", correct: false }
        ]
    },
    {
        question: "Who is known as the Father of the Nation in India?",
        answers: [
            { text: "Jawaharlal Nehru", correct: false },
            { text: "Subhash Chandra Bose", correct: false },
            { text: "Mahatma Gandhi", correct: true },
            { text: "Bhagat Singh", correct: false }
        ]
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        answers: [
            { text: "Oxygen", correct: false },
            { text: "Nitrogen", correct: false },
            { text: "Carbon Dioxide", correct: true },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Indian Ocean", correct: false },
            { text: "Atlantic Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Europe", correct: false },
            { text: "Australia", correct: true },
            { text: "Antarctica", correct: false },
            { text: "South America", correct: false }
        ]
    },
    {
        question: "Who invented the telephone?",
        answers: [
            { text: "Thomas Edison", correct: false },
            { text: "Alexander Graham Bell", correct: true },
            { text: "Nikola Tesla", correct: false },
            { text: "Isaac Newton", correct: false }
        ]
    },
    {
        question: "Which planet is closest to the Sun?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Earth", correct: false },
            { text: "Mercury", correct: true },
            { text: "Mars", correct: false }
        ]
    },
    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Lion", correct: false },
            { text: "Tiger", correct: true },
            { text: "Leopard", correct: false }
        ]
    },
    {
        question: "Which instrument is used to measure temperature?",
        answers: [
            { text: "Barometer", correct: false },
            { text: "Thermometer", correct: true },
            { text: "Hygrometer", correct: false },
            { text: "Anemometer", correct: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtonsElement.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    if (isCorrect) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    let scoreMessage = "You scored " + score + " out of " + questions.length;
    resetState();
    questionElement.innerHTML = scoreMessage;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {   
        showQuestion();
    } else {
        showScore();
    }
};
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();