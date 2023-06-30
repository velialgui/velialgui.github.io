const navIcon = document.querySelector(".nav-icon");
const overlay = document.querySelector(".overlay");

navIcon.addEventListener("click", () => {
  navIcon.classList.toggle("open");
  if (overlay.style.height === "100%") {
    overlay.style.height = "0%";
  } else {
    overlay.style.height = "100%";
  }
});
