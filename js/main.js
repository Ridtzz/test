// =================================
// QUESTIONS
// =================================

const questions = [
    {
        question: "Где ты работаешь?",

        media: {
    type: "gif",
    src: "images/gif1.gif"
},

        answers: [
            "В дурке",
            "На аутсорсе",
            "На рынке",
            "Я безработный миллиардер"
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
            "Как карта ляжет"
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
        question: "Аутсорсинг бухгалтера — это ",

        media: {
            type: "gif",
            src: "images/gif5.gif"
        },

        answers: [
            "когда зарплату считаешь не ты, а человек, которому ты платишь, чтобы он посчитал, сколько ты ему должен",
            "беда",
            "шо",
            "дайте денег и я буду чилить"
        ],

        correct: 1
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
// RIZZ ELEMENTS
// =================================

const rizzQuestion = document.getElementById("rizzQuestion");
const rizzConfirm = document.getElementById("rizzConfirm");
const rizzInvite = document.getElementById("rizzInvite");
const rizzDecline = document.getElementById("rizzDecline");

const rizzYes = document.getElementById("rizzYes");
const rizzNo = document.getElementById("rizzNo");

const rizzConfirmYes = document.getElementById("rizzConfirmYes");
const rizzConfirmNo = document.getElementById("rizzConfirmNo");


// =================================
// RIZZ NAVIGATION
// =================================

function showRizzState(state) {

    document.querySelectorAll(".rizz-state").forEach(item => {
        item.classList.remove("is-active");
    });

    state.classList.add("is-active");
}


// FIRST QUESTION

rizzYes.addEventListener("click", () => {
    showRizzState(rizzInvite);
});

rizzNo.addEventListener("click", () => {
    showRizzState(rizzConfirm);
});


// SECOND QUESTION

rizzConfirmYes.addEventListener("click", () => {
    showRizzState(rizzDecline);          // "Да" → отказ
});

rizzConfirmNo.addEventListener("click", () => {
    showRizzState(rizzQuestion);         // "передумала" → возврат к первому вопросу
});

// =================================
// RIZZ NO BUTTON — УБЕГАЕТ
// =================================

const rizzContent = document.querySelector(".rizz-content");
const noBtn = document.getElementById("rizzNo");

let noBtnWidth = 0;
let noBtnHeight = 0;

function getBounds() {
    return rizzContent.getBoundingClientRect();
}

function moveAway(e) {
    if (!rizzQuestion.classList.contains("is-active")) return;

    const bounds = getBounds();
    const btnRect = noBtn.getBoundingClientRect();

    // Берём актуальный размер (уже уменьшенный)
    noBtnWidth = btnRect.width;
    noBtnHeight = btnRect.height;

    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const btnCenterX = btnRect.left - bounds.left + noBtnWidth / 2;
    const btnCenterY = btnRect.top - bounds.top + noBtnHeight / 2;

    const dx = mouseX - btnCenterX;
    const dy = mouseY - btnCenterY;
    const distance = Math.hypot(dx, dy);

    if (distance < 130) {
        const angle = Math.atan2(dy, dx);
        const push = 90;

        let newX = btnCenterX - Math.cos(angle) * push - noBtnWidth / 2;
        let newY = btnCenterY - Math.sin(angle) * push - noBtnHeight / 2;

        const maxX = bounds.width - noBtnWidth;
        const maxY = bounds.height - noBtnHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        noBtn.style.position = "absolute";
        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
        noBtn.style.width = noBtnWidth + "px";
        noBtn.style.margin = "0";
        noBtn.style.flex = "none";
    }
}

// Слушаем движение мыши по всему блоку
rizzContent.addEventListener("mousemove", moveAway);

// Звук при нажатии на любую кнопку .rizz-no-button
document.querySelectorAll(".rizz-no-button").forEach(btn => {
    btn.addEventListener("click", () => {
        papoiSound.currentTime = 0;
        papoiSound.play();
    });
});

// Когда возвращаемся на первый экран — сбрасываем позицию кнопки
function resetNoButton() {
    noBtn.style.position = "";
    noBtn.style.left = "";
    noBtn.style.top = "";
    noBtn.style.width = "";
    noBtn.style.margin = "";
    noBtn.style.flex = "";
    noBtnWidth = 0;
    noBtnHeight = 0;
}

// Сбрасываем при показе первого вопроса
const originalShowRizzState = showRizzState;
showRizzState = function(state) {
    originalShowRizzState(state);
    if (state === rizzQuestion) {
        resetNoButton();
    }
};

// =================================
// SOUNDS
// =================================

const noSound = new Audio("sounds/no.mp3");
const yesSound = new Audio("sounds/yes.mp3");
const roundStartSound = new Audio("sounds/roundstart.mp3");
roundStartSound.volume = 0.4;
const rizzSound = new Audio("sounds/rizz.mp3");
rizzSound.volume = 0.5;
const papoiSound = new Audio("sounds/papoi.mp3");

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