const toggleBtn = document.getElementById("toggleBtn");
const body = document.body;
const savedTheme = localStorage.getItem("theme") || "light";

// Apply saved theme on page load
if (savedTheme === "dark") {
    body.classList.add("dark");
}

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
