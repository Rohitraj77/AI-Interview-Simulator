let interview =
    JSON.parse(localStorage.getItem("currentInterview"));

if (!interview) {

    alert("No interview found.");

    window.location.href = "createInterview.html";

}

let currentQuestion = 0;

let answers = new Array(interview.questions.length).fill("");

const questionText =
    document.getElementById("questionText");

const questionNumber =
    document.getElementById("questionNumber");

const totalQuestions =
    document.getElementById("totalQuestions");

const answer =
    document.getElementById("answer");

const progressBar =
    document.getElementById("progressBar");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const charCount =
    document.getElementById("charCount");

function loadQuestion() {

    questionText.textContent =
        interview.questions[currentQuestion];

    questionNumber.textContent =
        currentQuestion + 1;

    totalQuestions.textContent =
        interview.questions.length;

    answer.value =
        answers[currentQuestion];

    progressBar.style.width =
        `${((currentQuestion + 1) / interview.questions.length) * 100}%`;

    progressBar.innerHTML =
        `${Math.round(((currentQuestion + 1) / interview.questions.length) * 100)}%`;

    charCount.textContent =
        answer.value.length;

    prevBtn.disabled =
        currentQuestion === 0;

    if (currentQuestion === interview.questions.length - 1) {

        nextBtn.innerHTML =
            "Finish Interview";

    } else {

        nextBtn.innerHTML =
            `Next <i class="bi bi-arrow-right"></i>`;

    }

}

answer.addEventListener("input", () => {

    answers[currentQuestion] =
        answer.value;

    charCount.textContent =
        answer.value.length;

});

prevBtn.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});

nextBtn.addEventListener("click", () => {

    answers[currentQuestion] =
        answer.value;

    if (currentQuestion < interview.questions.length - 1) {

        currentQuestion++;

        loadQuestion();

    } else {

        localStorage.setItem(
            "answers",
            JSON.stringify(answers)
        );

        alert("Interview Completed!");

        window.location.href =
            "report.html";

    }

});

let time = 15 * 60;

const timer =
    document.getElementById("timer");

setInterval(() => {

    let min =
        Math.floor(time / 60);

    let sec =
        time % 60;

    timer.innerHTML =
        `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

    if (time > 0) {

        time--;

    }

}, 1000);

loadQuestion();