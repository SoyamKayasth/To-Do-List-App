const add = document.getElementById("btn");
const list = document.getElementById("list");
const input = document.getElementById("task");
const total = document.getElementById("total");
const maxTasks = 20;

let taskArray = []; // main array to store tasks

// Load tasks when the page loads
window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskArray = savedTasks;
  taskArray.forEach((taskText) => createTaskElement(taskText));
  updateTotal();
});

// Add task on Enter key
input.addEventListener("keydown", (event) => {
  if (event.code === "Enter") add.click();
});

add.addEventListener("click", () => {
  if (taskArray.length >= maxTasks) {
    alert(`Task limit reached (${maxTasks}). Delete some tasks first.`);
    return;
  }

  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  createTaskElement(taskText);
  taskArray.push(taskText);
  saveTasks();
  input.value = "";
  updateTotal();
});

// Event delegation for edit and delete
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const textSpan = li.querySelector(".task-text");
  const oldTask = textSpan.textContent;

  // Edit
  if (e.target.classList.contains("fa-edit")) {
    const newTask = prompt("Edit your task", oldTask);
    if (newTask && newTask.trim()) {
      textSpan.textContent = newTask.trim();

      const index = taskArray.indexOf(oldTask);
      if (index !== -1) {
        taskArray[index] = newTask.trim();
      }

      saveTasks();
    }
  }

  // Delete
  else if (e.target.classList.contains("delete-btn")) {
    li.remove();
    taskArray = taskArray.filter((task) => task !== oldTask);
    saveTasks();
    updateTotal();
  }
});

// Create <li> task element
function createTaskElement(taskText) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = taskText;

  const btns = document.createElement("div");
  btns.classList.add("btns");

  const editBtn = document.createElement("i");
  editBtn.classList.add("fas", "fa-edit");

  const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fas", "fa-trash", "delete-btn");

  btns.append(editBtn, deleteBtn);
  li.append(span, btns);
  list.appendChild(li);
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}

// Update total counter
function updateTotal() {
  total.innerText = `Total Tasks: ${taskArray.length}`;
}
