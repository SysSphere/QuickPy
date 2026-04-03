const container = document.getElementById("lessonsData");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let index = parseInt(localStorage.getItem("currentLessonIndex")) || 0;
let data = null;

fetch("./data/lessons.json")
    .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
    })
    .then(lessonsData => {
        updateContainerContent(lessonsData);
        data = lessonsData;
        setDisabled();
    })
    .catch(error => {
        console.error("Error loading lessons data:", error);
        quizPage.innerHTML = `<p>Failed to load quiz data.</p>`;
    });

function updateContainerContent(obj) {
    container.innerHTML = `
                    <p style='color: gray'>Lesson ${obj.lessons[index].index} / 35</p>
                    <h2>${obj.lessons[index].name}</h2>
                    <p>${obj.lessons[index].content}</p>
<pre class='codeBlock'>
<code>${obj.lessons[index].code}</code>
</pre>
                `;
}

function setDisabled() {
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === data.lessons.length - 1;
    prevBtn.style.backgroundColor = prevBtn.disabled ? "#ccc" : "red";
    nextBtn.style.backgroundColor = nextBtn.disabled ? "#ccc" : "red";
    nextBtn.style.cursor = nextBtn.disabled ? "not-allowed" : "pointer";
    prevBtn.style.cursor = prevBtn.disabled ? "not-allowed" : "pointer";
}

prevBtn.addEventListener("click", function () {
    if (index > 0) {
        index--;
        updateContainerContent(data);
        localStorage.setItem("currentLessonIndex", index);
        setDisabled();
    }
});

nextBtn.addEventListener("click", function () {
    if (index < data.lessons.length - 1) {
        index++;
        updateContainerContent(data);
        localStorage.setItem("currentLessonIndex", index);
        setDisabled();
    }
});

document.addEventListener("keydown", (e) => {
  if (!data) return;
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
});