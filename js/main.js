// =================================
// QUESTIONS
// =================================

const questions = [
    {
        question: "Лучший универ на земле это - ...",

        media: {
    type: "gif",
    src: "images/gif1.gif"
},

        answers: [
            "Оксфорд",
            "БГУИР",
            "БГУИР",
            "БГУИР"
        ],

        correct: 4
    },

    {
        question: "Лучший график работы?",

        media: {
            type: "gif",
            src: "images/gif2.gif"
        },

        answers: [
            "Ебашу 7/7",
            "2/2",
            "Скажем дружно, нахуй нужно",
            "Я безработный миллиардер"
        ],

        correct: 3
    },

    {
        question: "День прошёл ужасно если я -...",

        media: {
            type: "image",
            src: "images/sticker3.webp"
        },

        answers: [
            "Не выпила кофе",
            "Сижу дома",
            "Работала"
        ],

        correct: 1
    },

    {
        question: "Легчайший вопрос: Масса черной дыры TON-618?",

        media: {
            type: "gif",
            src: "images/gif4.gif"
        },

        answers: [
            "Пару киллограмм",
            "Чуть больше арбуза с рынка",
            "66 млрд солнечных масс",
            "А чё там есть масса?"
        ],

        correct: 4
    },

    {
        question: "График работы заведения cart0on?",

        media: {
            type: "gif",
            src: "images/gif5.gif"
        },

        answers: [
            "Как пойдёт",
            "07:00-22:00",
            "24/7",
            "В отпуске"
        ],

        correct: 4
    },

{
    question: "И последний вопрос. Ты готова узнать результаты?",

    media: {
        type: "image",
        src: "images/sticker6.webp"
    },

    answers: [
        "Да",
        "Конечно",
        "Мне уже страшно",
        "После такого теста — обязана"
    ]
}
];


// =================================
// ELEMENTS
// =================================

const welcome = document.getElementById("welcome");
const testContent = document.getElementById("testContent");
const startButton = document.getElementById("startButton");

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const questionMedia = document.getElementById("questionMedia");
const answersContainer = document.getElementById("answers");

const result = document.getElementById("result");
const resultTitle = document.getElementById("resultTitle");
const resultText = document.getElementById("resultText");
const resultButton = document.getElementById("resultButton");
const rizz = document.getElementById("rizz");

// =================================
// SOUNDS
// =================================

const noSound = new Audio("sounds/no.mp3");
const yesSound = new Audio("sounds/yes.mp3");
const roundStartSound = new Audio("sounds/roundstart.mp3");
roundStartSound.volume = 0.4;
const rizzSound = new Audio("sounds/rizz.mp3");
rizzSound.volume = 0.5;

// =================================
// STATE
// =================================

let currentQuestion = 0;


// =================================
// START TEST
// =================================

startButton.addEventListener("click", () => {

    // Звук начала теста
    roundStartSound.currentTime = 0;
    roundStartSound.play();

    // Запускаем исчезновение приветствия
    welcome.classList.add("fade-out");

    setTimeout(() => {

        welcome.style.display = "none";

        testContent.style.display = "block";

        testContent.classList.remove("fade-in");

        // Перезапускаем CSS-анимацию
        void testContent.offsetWidth;

        testContent.classList.add("fade-in");

        currentQuestion = 0;

        showQuestion();

    }, 350);
});

resultButton.addEventListener("click", () => {

    // RIZZ SOUND
    rizzSound.currentTime = 0;
    rizzSound.play();

    result.classList.add("fade-out");

    setTimeout(() => {

        result.style.display = "none";

        rizz.style.display = "block";

        rizz.classList.remove("fade-in");

        void rizz.offsetWidth;

        rizz.classList.add("fade-in");

    }, 350);
});

function showQuestion() {

    const question = questions[currentQuestion];

    // =================================
    // QUESTION NUMBER
    // =================================

    questionNumber.textContent =
        `${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;


    // =================================
    // QUESTION TEXT
    // =================================

    questionText.textContent = question.question;


    // =================================
    // MEDIA
    // =================================

    questionMedia.innerHTML = "";

    if (question.media) {

        if (question.media.type === "video") {

            const video = document.createElement("video");

            video.src = question.media.src;

            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;

            questionMedia.appendChild(video);

        } else {

            const image = document.createElement("img");

            image.src = question.media.src;
            image.alt = "";

            questionMedia.appendChild(image);
        }
    }


    // =================================
    // ANSWERS
    // =================================

    answersContainer.innerHTML = "";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer");

        button.innerHTML = `
            <span class="answer-number">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <span>
                ${answer}
            </span>
        `;

        button.addEventListener("click", () => {
            selectAnswer(index + 1, button);
        });

        answersContainer.appendChild(button);
    });

}


// =================================
// SELECT ANSWER
// =================================

function selectAnswer(answerNumber, button) {

    const question = questions[currentQuestion];

    // =================================
    // LAST QUESTION
    // =================================

    if (currentQuestion === questions.length - 1) {

        // Никаких yes / no

        button.classList.add("answer--selected");

        setTimeout(() => {
            finishTest();
        }, 300);

        return;
    }

    // =================================
    // NORMAL QUESTIONS
    // =================================

    const isCorrect =
        answerNumber === question.correct;

    if (isCorrect) {
        yesSound.currentTime = 0;
        yesSound.play();
    } else {
        noSound.currentTime = 0;
        noSound.play();
    }

    console.log(
        `Вопрос ${currentQuestion + 1}:`,
        isCorrect ? "Правильно" : "Неправильно"
    );

    currentQuestion++;

    showQuestion();
}


// =================================
// FINISH TEST
// =================================

function finishTest() {

    testContent.classList.add("fade-out");

    setTimeout(() => {

        testContent.style.display = "none";

        result.style.display = "block";

        result.classList.remove("fade-in");

        void result.offsetWidth;

        result.classList.add("fade-in");

    }, 350);
}