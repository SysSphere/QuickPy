const streakEl = document.getElementById("streak");

let streak = parseInt(localStorage.getItem("streak")) || 0;

const today = new Date().getDate();
const lastDay = parseInt(localStorage.getItem("lastDay"));

if (lastDay == null) {
    streak = 0;
} else if (today === lastDay + 1) {
    streak++;
} else if (today !== lastDay) {
    streak = 0;
}

localStorage.setItem("streak", streak);
localStorage.setItem("lastDay", today);

streakEl.innerHTML = `<i class="fas fa-fire"></i> ${streak}`;