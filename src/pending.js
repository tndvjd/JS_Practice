const form = document.querySelector("form"),
  input = form.querySelector("input"),
  todoPending = document.querySelector(".js-pending"),
  todoFinished = document.querySelector(".js-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let toDos = [];
let finishedToDos = [];

const cleanToDos = toDos.filter(function (toDo) {
  return toDo.id !== parseInt(li.id);
});



function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  if (li.parentNode === todoPending) {
    todoPending.removeChild(li);
  } else {
    todoFinished.removeChild(li);
  }
  toDos = cleanToDos;
  saveToDos();
}

function fillToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  todoFinished.appendChild(li);
  finishedToDos.push(btn.parentNode);
  console.log(li);
  toDos = cleanToDos;
  saveToDos();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  const cplbtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delbtn.innerHTML = "X";
  delbtn.addEventListener("click", deleteToDo);
  cplbtn.innerHTML = "✔";
  cplbtn.addEventListener("click", fillToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delbtn);
  li.appendChild(cplbtn);
  li.id = newId;
  todoPending.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(PENDING_LS, JSON.stringify(toDos));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedToDos));
}
function submitHandler(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintToDo(currentValue);
  input.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(PENDING_LS);
  const loadedFinishes = localStorage.getItem(FINISHED_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDos) {
      paintToDo(toDos.text);
    });
  }
}

function init() {
  loadToDos();
  document.addEventListener("submit", submitHandler);
}

init();
