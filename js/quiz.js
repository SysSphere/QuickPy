const quizPage = document.getElementById("quizPage");
const lvlSelect = document.getElementById("lvlSelect");
let answers = null;
let level = "easy";

lvlSelect.addEventListener("change", function () {
   level = lvlSelect.value;
});

function startQuiz() {
    fetch("./data/quiz.json")
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(quizData => {
            quizPage.innerHTML = `<h1 class="line-text">Take a quiz:</h1>`;

            quizData[level].forEach((question, index) => {
                quizPage.innerHTML += `
                    <div class="quiz-question">
                        <h2>${index + 1}. ${question.question}</h2>
                        ${question.options ? question.options.map((option, i) => `
                            <label>
                                <input type="radio" name="question${index}" value="${option}">
                                ${option}
                            </label>
                        `).join('') : ''}
                    </div>
                    <button onclick="checkAnswer(${index})" style="background-color: red; color: white; margin-top: 20px;">Check Answer</button>   
                `;
                answers = quizData;
                console.log("Quiz data loaded:", quizData);
            });
        })
        .catch(error => {
            console.error("Error loading quiz data:", error);
            quizPage.innerHTML = `<p>Failed to load quiz data.</p>`;
        });
}

function checkAnswer(questionIndex) {
    const selectedOption = document.querySelector(`input[name="question${questionIndex}"]:checked`);
    if (!selectedOption) {
        alert("Please select an answer.");
        return;
    }
    const answer = selectedOption.value;
    if (answer === answers[level][questionIndex].answer) {
        alert("Correct!");
    } else {
        alert("Incorrect. Try again!");
    }
}
