const startGameNav = document.querySelector(".start--game");
const btnShowMenu = document.querySelector(".btn--start--game");
const btnCloseMenu = document.querySelector(".btn--close-menu");
const gameMenu = document.querySelector(".menu");
const overlay = document.querySelector(".overlay");

const hero = document.querySelector(".hero");
const message = document.createElement("div");
message.innerHTML = "Press ENTER to continue";
hero.append(message);
message.classList.add("message");
// const closeMessage = function () {
//   message.classList.add("message");
// };

const showMenu = function () {
  gameMenu.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeMenu = function () {
  gameMenu.classList.add("hidden");
  overlay.classList.add("hidden");
};

// document.addEventListener("keydown", function (e) {
//   e.preventDefault();
//   if (e.key === "Enter") {
//     message.remove();
startGameNav.classList.remove("hidden");
//   }
// });

btnShowMenu.addEventListener("click", function (e) {
  e.preventDefault();
  showMenu();
  console.log(1);
});

btnCloseMenu.addEventListener("click", function (e) {
  e.preventDefault();
  closeMenu();
});
