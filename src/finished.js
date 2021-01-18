const ul2 = document.querySelector(".js-finished");

const FINISHED_LS = "FINISHED";

let finishedToDos = [];

function fillToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  ul.removeChild(li);
  ul2.appendChild(li);
  
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
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
  ul.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  finishedToDos.push(toDos);
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
  const loadedToDos = localStorage.getItem(PENDING_LS, FINISHED_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDos) {
      paintToDo(toDos.text, finishedToDos.text);
    });
  }
}

function init() {
  loadToDos();
  document.addEventListener("submit", submitHandler);
}

init();
