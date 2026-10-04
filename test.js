// =================================
// START TEST
// =================================

startButton.addEventListener("click", () => {

    // Запускаем исчезновение приветствия
    welcome.classList.add("fade-out");

    setTimeout(() => {

        // Скрываем приветствие
        welcome.style.display = "none";

        // Показываем тест
        testContent.style.display = "block";

        // Анимация появления
        testContent.classList.remove("fade-in");

        // Небольшой reflow, чтобы браузер заново запустил animation
        void testContent.offsetWidth;

        testContent.classList.add("fade-in");

        // Показываем первый вопрос
        currentQuestion = 0;
        showQuestion();

    }, 350);

});

// =================================
// QUESTIONS
// =================================

const questions = [

    {
        question: "Как ты обычно реагируешь, когда человек тебе нравится?",

        answers: [
            "Делаю вид, что мне всё равно",
            "Начинаю слишком много думать",
            "Жду, пока он сам что-нибудь сделает",
            "Зависит от человека 👀"
        ],

        correct: 4
    },


    {
        question: "Что ты делаешь, если тебе долго не отвечают?",

        answers: [
            "Ничего, я спокойный человек",
            "Проверяю, когда был онлайн",
            "Пишу ещё раз через 5 минут",
            "Уже придумала 7 причин, почему меня игнорируют"
        ],

        correct: 1
    },


    {
        question: "Какой у тебя уровень доверия к людям?",

        answers: [
            "100%. Я верю в людей",
            "50/50",
            "Сначала докажи, потом поговорим",
            "Доверяю только котам"
        ],

        correct: 3
    },


    {
        question: "Если человек делает тебе комплимент, ты:",

        answers: [
            "Спасибо 😊",
            "Смущаюсь",
            "Делаю вид, что не заметила",
            "Запоминаю это на ближайшие 5 лет"
        ],

        correct: 2
    },


    {
        question: "Что важнее всего при знакомстве?",

        answers: [
            "Внешность",
            "Чувство юмора",
            "Характер",
            "Чтобы не был странным"
        ],

        correct: 4
    },


    {
        question: "И последний вопрос. Ты готова узнать результаты?",

        answers: [
            "Да",
            "Конечно",
            "Мне уже страшно",
            "После такого теста — обязана"
        ],

        correct: 1
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
const answersContainer = document.getElementById("answers");
const progressBar = document.getElementById("progressBar");


// =================================
// SOUNDS
// =================================

const noSound = new Audio("sound/no.mp3");
const yesSound = new Audio("sound/yes.mp3");


// =================================
// STATE
// =================================

let currentQuestion = 0;


// =================================
// START TEST
// =================================

startButton.addEventListener("click", () => {

    welcome.classList.add("fade-out");

    setTimeout(() => {

        welcome.style.display = "none";

        testContent.style.display = "block";
        testContent.classList.add("fade-in");

        showQuestion();

    }, 350);

});


// =================================
// SHOW QUESTION
// =================================

function showQuestion() {

    const question = questions[currentQuestion];


    // Номер вопроса

    questionNumber.textContent =
        `${String(currentQuestion + 1).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;


    // Текст вопроса

    questionText.textContent = question.question;


    // Очищаем старые ответы

    answersContainer.innerHTML = "";


    // Создаём ответы

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

            selectAnswer(index + 1);

        });


        answersContainer.appendChild(button);

    });


    // Progress

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = `${progress}%`;

}


// =================================
// SELECT ANSWER
// =================================

function selectAnswer(answerNumber) {

    const question = questions[currentQuestion];


    // Проверяем ответ

    const isCorrect =
        answerNumber === question.correct;


    // Проигрываем звук

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


    // Если последний вопрос

    if (currentQuestion >= questions.length - 1) {

        finishTest();

        return;
    }


    // Следующий вопрос

    currentQuestion++;

    showQuestion();

}


// =================================
// FINISH TEST
// =================================

function finishTest() {

    console.log("Тест завершён");

}

