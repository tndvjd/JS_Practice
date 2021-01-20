const form = document.querySelector(".js-form");
const numberRange = form.querySelector(".js-range");
const numberInput = form.querySelector(".js-input");
const btn = form.querySelector("button");
const p = document.querySelector(".choose");
const span = document.querySelector(".winORlose");

function showSliderValue(sVal) {
  var obValueView = form.querySelector("#js-sliderValue");
  obValueView.innerHTML = `Generate a number between 0 and ${sVal}`;
  numberInput.setAttribute("max", sVal);
}

function VictoryLose(you, machine) {
  if (machine !== you) {
    span.innerHTML = "You LOSE";
  } else {
    span.innerHTML = "You WIN!";
  }
}

function paintResult() {
  const inputValue = numberInput.value;
  const parsedValue = parseInt(inputValue);
  const judgeNaN = isNaN(parsedValue);
  const sliderValue = numberRange.value;
  const randomNum = JSON.stringify(Math.round(Math.random() * sliderValue));
  p.innerHTML = `You chose: ${inputValue}, the machine chose: ${randomNum}`;
  if (judgeNaN === true) {
    p.innerHTML = "!! I CAN'T EXECUTE !!";
  }

  VictoryLose(randomNum, inputValue);
}

function clickHandler(event) {
  event.preventDefault();
  paintResult();
}

function init() {
  btn.addEventListener("click", clickHandler);
}

init();
