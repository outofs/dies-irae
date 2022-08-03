const startGameNav = document.querySelector(".nav__menu");
const btnShowMenu = document.querySelector(".btn__start--game");
const btnCloseMenu = document.querySelector(".btn__close--menu");
const modalMenu = document.querySelector(".modal__menu");
const overlay = document.querySelector(".overlay");

const gameMenu = document.querySelector(".game__menu");
const message = document.createElement("div");
message.innerHTML = "<p class ='message__text'>Press ENTER to continue</p>";
gameMenu.append(message);
message.classList.add("message");
const closeMessage = function () {
  message.classList.add("message");
};

const showMenu = function () {
  modalMenu.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeMenu = function () {
  modalMenu.classList.add("hidden");
  overlay.classList.add("hidden");
};

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "Enter") {
    message.remove();
    startGameNav.classList.remove("hidden");
  }
});

btnShowMenu.addEventListener("click", function (e) {
  e.preventDefault();
  showMenu();
});

btnCloseMenu.addEventListener("click", function (e) {
  e.preventDefault();
  closeMenu();
});
