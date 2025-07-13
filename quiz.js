const questions = [
    {
        question : "Which is largest animal in the world ?",
        answers :[
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },   
            { text: "Giraffe", correct: false },
            { text: "Great White Shark", correct: false }
        ]
    },
    {
        question : "Which planet is known as the Red Planet?",
        answers :[
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question : "What is the capital of France?",
        answers :[
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question : "Who wrote 'To Kill a Mockingbird'?",
        answers :[
            { text: "Harper Lee", correct: true },
            { text: "Mark Twain", correct: false },
            { text: "Ernest Hemingway", correct: false },
            { text: "F. Scott Fitzgerald", correct: false }
        ]
    },
    {
        question : "What is the chemical symbol for water?",
        answers :[
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "O2", correct: false },
            { text: "NaCl", correct: false }
        ]
    },
    {
        question : "Which country is known as the Land of the Rising Sun?",
        answers :[
            { text: "China", correct: false },
            { text: "Japan", correct: true },
            { text: "South Korea", correct: false },
            { text: "Thailand", correct: false }
        ]
    },
    {
        question : "What is the largest desert in the world?",
        answers :[
            { text: "Sahara Desert", correct: true },
            { text: "Arabian Desert", correct: false },
            { text: "Gobi Desert", correct: false },
            { text: "Kalahari Desert", correct: false }
        ]
    },
    {
        question : "Who painted the Mona Lisa?",
        answers :[
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question : "What is the largest planet in our solar system?",
        answers :[
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question : "What is the main ingredient in guacamole?",
        answers :[
            { text: "Tomato", correct: false },
            { text: "Avocado", correct: true },
            { text: "Onion", correct: false },
            { text: "Pepper", correct: false }
        ]
    },
    {
        question : "Which element has the chemical symbol 'O'?",
        answers :[
            { text: "Oxygen", correct: true },
            { text: "Gold", correct: false },
            { text: "Silver", correct: false },
            { text: "Iron", correct: false }
        ]
    }
] 

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-button');
const nextButton = document.getElementById('next-btn');

const timerBlock = document.createElement('div');
timerBlock.id = 'timer-block';
timerBlock.style.position = 'absolute';
timerBlock.style.top = '20px';
timerBlock.style.right = '20px';
timerBlock.style.padding = '10px 20px';
timerBlock.style.background = '#f3f3f3';
timerBlock.style.borderRadius = '8px';
timerBlock.style.fontWeight = 'bold';
timerBlock.style.fontSize = '18px';
timerBlock.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
document.body.appendChild(timerBlock);

let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
let timeLeft = 60;

function startquiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            autoMoveToNext();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerBlock.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function autoMoveToNext() {
    // Disable all buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
    handleNextButton();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });

    startTimer();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
    clearInterval(timerInterval);
    updateTimerDisplay();
}

function selectAnswer(e) {
    clearInterval(timerInterval);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.style.backgroundColor = "green";
            button.style.color = "white";
        } else {
            button.style.backgroundColor = "red";
            button.style.color = "white";
        }
        button.disabled = true;
    });

    if (isCorrect) {
        score++;
    }

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    timerBlock.textContent = '';
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startquiz();
    }
});

startquiz();
