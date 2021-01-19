const form = document.querySelector(".js-form");
const numberRange = form.querySelector(".js-range");
const numberInput = form.querySelector(".js-input");
const btn = form.querySelector("button");

console.dir(form.childNodes);

function clickHandler(event) {
  event.preventDefault();
  const currentValue = numberInput.value;
  console.log(currentValue);
  console.log(numberRange.value);
  numberInput.value = "";
}

function init() {
  btn.addEventListener("click", clickHandler);
  numberRange.addEventListener()
}

init();
