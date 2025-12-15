const add = document.getElementById("btn");
const list = document.getElementById("list");
const input = document.getElementById("task");
const total = document.getElementById("total");
const alertBox = document.querySelector(".alert");
const closeBtn = document.querySelector(".close-btn");
const alertMsg = document.querySelector(".msg");

const maxTasks = 10;

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
  if (event.code === "Enter" || event.key === "Enter") add.click();
});

add.addEventListener("click", () => {
  // Check for max task limit
  if (taskArray.length >= maxTasks) {
  //  alert(`Task limit reached (${maxTasks}).<br> Delete some tasks first.`);
      showAlert();
         alertMsg.innerHTML = `Max task limit is reached (${maxTasks}).<br> &nbsp;  &nbsp; Delete some tasks first.`;
      // hiding the alert after 5 seconds
        setTimeout(() => {
           closeAlert();
        }, 5000);   

    return;
  }

  const taskText = input.value.trim();
  if (taskText === "") {
   // showing the alert for empty input
    showAlert();
      alertMsg.innerHTML = "Please enter the task!";
    
    // hiding the alert after 4 seconds
        setTimeout(() => {
           closeAlert();
        }, 4000);

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


 // Show alert box
 function showAlert() {
    alertBox.classList.remove("hide");
    alertBox.classList.add("show");
    } 


// Handle alert close button

closeBtn.addEventListener("click", () => {
    closeAlert();
    });

function closeAlert() {
    alertBox.classList.remove("show");
      alertBox.classList.add("hide");
    }
    
    // Update total counter
function updateTotal() {
  total.innerText = `Total Tasks: ${taskArray.length}`;
}