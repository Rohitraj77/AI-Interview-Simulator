// =============================
// Load Interview
// =============================

const interview = JSON.parse(localStorage.getItem("currentInterview"));

if (!interview) {

    alert("No interview found.");

    window.location.href = "createInterview.html";

}

// =============================
// Variables
// =============================

let currentQuestion = 0;

let answers = new Array(interview.questions.length).fill("");

const questionText = document.getElementById("questionText");
const questionNumber = document.getElementById("questionNumber");
const totalQuestions = document.getElementById("totalQuestions");

const answer = document.getElementById("answer");

const progressBar = document.getElementById("progressBar");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const charCount = document.getElementById("charCount");

const timer = document.getElementById("timer");

// =============================
// Load Question
// =============================

function loadQuestion() {

    questionText.textContent =
        interview.questions[currentQuestion];

    questionNumber.textContent =
        currentQuestion + 1;

    totalQuestions.textContent =
        interview.questions.length;

    answer.value =
        answers[currentQuestion];

    charCount.textContent =
        answer.value.length;

    const progress =
        ((currentQuestion + 1) /
        interview.questions.length) * 100;

    progressBar.style.width =
        progress + "%";

    progressBar.innerHTML =
        Math.round(progress) + "%";

    prevBtn.disabled =
        currentQuestion === 0;

    if (
        currentQuestion ===
        interview.questions.length - 1
    ) {

        nextBtn.innerHTML =
            "Finish Interview";

    } else {

        nextBtn.innerHTML =
            `Next <i class="bi bi-arrow-right"></i>`;

    }

}

// =============================
// Character Counter
// =============================

answer.addEventListener("input", () => {

    answers[currentQuestion] =
        answer.value;

    charCount.textContent =
        answer.value.length;

});

// =============================
// Previous
// =============================

prevBtn.addEventListener("click", () => {

    answers[currentQuestion] =
        answer.value;

    if (currentQuestion > 0) {

        currentQuestion--;

        loadQuestion();

    }

});

// =============================
// Next / Finish
// =============================

nextBtn.addEventListener("click", async () => {

    answers[currentQuestion] =
        answer.value;

    if (
        currentQuestion <
        interview.questions.length - 1
    ) {

        currentQuestion++;

        loadQuestion();

        return;

    }

    nextBtn.disabled = true;

    nextBtn.innerHTML =
        "Evaluating...";

    try {

        const response = await fetch(

            "http://localhost:5000/api/interview/evaluate",

            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    interviewId:
                    interview._id,

                    answers

                })

            }

        );

        const result =
            await response.json();

        if (!response.ok) {

            throw new Error(
                result.message
            );

        }

        localStorage.setItem(

            "evaluation",

            JSON.stringify(result)

        );

        localStorage.setItem(

            "answers",

            JSON.stringify(answers)

        );

        window.location.href =
            "report.html";

    }

    catch (error) {

        console.log(error);

        alert(
            "Evaluation Failed"
        );

        nextBtn.disabled = false;

        nextBtn.innerHTML =
            "Finish Interview";

    }

});

// =============================
// Timer
// =============================

let seconds = 15 * 60;

const interval = setInterval(() => {

    const min =
        Math.floor(seconds / 60);

    const sec =
        seconds % 60;

    timer.innerHTML =
        `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;

    if (seconds <= 0) {

        clearInterval(interval);

        alert("Time Over");

        nextBtn.click();

    }

    seconds--;

}, 1000);

// =============================

loadQuestion();