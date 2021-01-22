const popCat = document.querySelector("img");
const score = document.querySelector("span");

let popCount = 0;

function saveScore(popCount) {
  localStorage.setItem("count", popCount);
}

function loadScore() {
  popCount = localStorage.getItem("count");
  score.innerText = `Your POP Count : ${localStorage.getItem("count")}`;
}

function keyDown(event) {
  if (event.code === "KeyP") {
    popCat.src = "images/pop.png";
  }
}

function keyUp(event) {
  if (event.code === "KeyP") {
    popCat.src = "images/normal.png";
    popCount++;
    score.innerText = `Your POP Count : ${popCount}`;
    saveScore(popCount);
  }
}

function init() {
  window.onkeydown = (e) => keyDown(e);
  window.onkeyup = (e) => keyUp(e);
  loadScore();
}

init();
