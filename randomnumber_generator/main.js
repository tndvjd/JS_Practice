const form = document.querySelector(".js-form");
const numberRange = form.querySelector(".js-range");
const numberInput = form.querySelector(".js-input");
const btn = form.querySelector("button");
const result = document.querySelector(".js-result");
const p = document.querySelector(".choose");
const span = document.querySelector(".winORlose");

function showSliderValue(sVal) {
  var obValueView = form.querySelector("#js-sliderValue");
  obValueView.innerHTML = `Generate a number between 0 and ${sVal}`;
}

function paintResult() {
  const inputValue = numberInput.value;
  const sliderValue = numberRange.value;
  const randomNum = JSON.stringify(Math.ceil(Math.random() * sliderValue));
  p.innerHTML = `You chose: ${inputValue}, the machine chose: ${randomNum}`;
  function VictoryLose() {
    if (randomNum !== inputValue) {
      span.innerHTML = "You LOSE";
    } else {
      span.innerHTML = "You WIN!";
    }
  }
  console.log(inputValue);
  console.log(randomNum);
  VictoryLose();
}

function clickHandler(event) {
  event.preventDefault();
  paintResult();
}

function init() {
  btn.addEventListener("click", clickHandler);
}

init();
