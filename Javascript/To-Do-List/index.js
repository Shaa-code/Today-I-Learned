const todoInput = document.getElementById("todo-input");

const checkInput = function () {
  if (window.event.keyCode === 13 && todoInput.value !== "") {
    const todoList = document.getElementById("todo-list");

    const newLi = document.createElement("li");
    const newSpan = document.createElement("span");

    newSpan.textContent = todoInput.value;
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
  }
};
