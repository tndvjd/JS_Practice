const form = document.querySelector("form"),
  input = form.querySelector("input"),
  todoPending = document.querySelector(".js-pending"),
  todoFinished = document.querySelector(".js-finished");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let toDos = [];
let finishedToDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  console.log(li.parentNode);
  if (li.parentNode === todoPending) {
    todoPending.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
  } else {
    todoFinished.removeChild(li);
    const cleanToDos = finishedToDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    finishedToDos = cleanToDos;
    saveFinishes();
  }
}

function cancelFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const bckbtn = li.childNodes[2];
  const cplbtn = document.createElement("button");
  const span = li.firstChild.childNodes[0].data;
  cplbtn.innerHTML = "✔";
  cplbtn.addEventListener("click", fillToDo);
  todoPending.appendChild(li);
  li.appendChild(cplbtn);
  li.removeChild(bckbtn);
  const newObj = {
    text: span,
    id: JSON.parse(li.id),
  };
  toDos.push(newObj);
  const cleanToDos = finishedToDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedToDos = cleanToDos;
  saveFinishes();
  saveToDos();
}

function fillToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const cplbtn = li.childNodes[2];
  const bckbtn = document.createElement("button");
  const span = li.firstChild.childNodes[0].data;
  li.appendChild(bckbtn);
  li.removeChild(cplbtn);
  bckbtn.innerHTML = "⮐";
  bckbtn.addEventListener("click", cancelFinish);
  todoFinished.appendChild(li);
  const newObj = {
    text: span,
    id: JSON.parse(li.id),
  };
  finishedToDos.push(newObj);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveFinishes();
  saveToDos();
}

function paintFinish(text) {
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  const bckbtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delbtn.innerHTML = "X";
  delbtn.addEventListener("click", deleteToDo);
  bckbtn.innerHTML = "⮐";
  bckbtn.addEventListener("click", cancelFinish);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delbtn);
  li.appendChild(bckbtn);
  li.id = newId;
  todoFinished.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  finishedToDos.push(toDoObj);
  saveFinishes();
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
}

function saveFinishes() {
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
    parsedToDos.forEach((pending) => {
      paintToDo(pending.text);
    });
  }
  if (loadedFinishes !== null) {
    const parsedFinishes = JSON.parse(loadedFinishes);
    // console.log(parsedFinishes);
    parsedFinishes.forEach((finish) => {
      paintFinish(finish.text);
    });
  }
}

function init() {
  loadToDos();
  document.addEventListener("submit", submitHandler);
}

init();
