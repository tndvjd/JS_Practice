const form = document.querySelector("#js-form");
const btn = form.querySelectorAll("button");
const number = form.querySelector("span");

function checkWhatOperator(operator) {
  switch (operator) {
    case "+":
      console.log("surplus");
      break;
    case "-":
      console.log("minus");
      break;
    case "*":
      console.log("multiply");
      break;
    case "/":
      console.log("divide");
      break;
    case "=":
      console.log("result");
      break;
    case "C":
      console.log("cleared");
      break;
  }
}

form.onclick = function (event) {
  event.preventDefault();
  let target = event.target;
  const parsed = parseInt(target.innerHTML);
  const judgeNaN = isNaN(parsed);

  if (target.tagName != "BUTTON") {
    return;
  }
  if (judgeNaN === true) {
    checkWhatOperator(target.innerHTML);
  } else {
    number.innerHTML = target.innerHTML;
  }
};
