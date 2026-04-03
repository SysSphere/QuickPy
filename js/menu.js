const menuBtn = document.getElementById("menu");
const sideMenu = document.getElementById("sideMenu");
const closeMenuBtn = document.getElementById("closeMenuBtn");

menuBtn.addEventListener("click", function () {
  sideMenu.style.display = "flex";
  sideMenu.style.animation = "slideIn 1s forwards";
});
closeMenuBtn.addEventListener("click", function () {
  sideMenu.style.animation = "slideOut 1s forwards";
  sideMenu.addEventListener("animationend", function handler() {
    sideMenu.style.display = "none";
    sideMenu.style.animation = "";
    sideMenu.removeEventListener("animationend", handler);
  });
});