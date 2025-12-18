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
      showAlert();
         alertMsg.innerHTML = `Max task limit is reached (${maxTasks}).<br> &nbsp;  &nbsp; Delete some tasks first.`;
          speak("Maximum task limit reached. Please delete some tasks first."); // Text-to-Speech feedback
      // hiding the alert after 5 seconds
        setTimeout(() => {
           closeAlert();
        }, 5000);   

    return;
  }

  const taskText = input.value.trim();  // get the input value and trim spaces

  if (taskText === "") {
   // showing the alert for empty input
    showAlert();
      alertMsg.innerHTML = "Please enter the task!";
       speak("Please enter the task"); // Text-to-Speech feedback

    // hiding the alert after 4 seconds
        setTimeout(() => {
           closeAlert();
        }, 4000);

    return;
  }
// Create list item and add task
  createTaskElement(taskText);
  taskArray.push(taskText);  // Add to main array

  speak("Task is added"); // Text-to-Speech feedback
  saveTasks(); // Save to localStorage
  input.value = "";
  updateTotal(); // Update total counter
});

// Event delegation for edit and delete
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const textSpan = li.querySelector(".task-text");  // Get the task text span
  const oldTask = textSpan.textContent;

  // Edit
  if (e.target.classList.contains("fa-edit")) {
    const newTask = prompt("Edit your task", oldTask);
    if (newTask && newTask.trim()) {
      textSpan.textContent = newTask.trim();

      // Update main array
      const index = taskArray.indexOf(oldTask);
      if (index !== -1) { 
        taskArray[index] = newTask.trim();
      }
      speak("Task is edited successfully"); // Text-to-Speech feedback
      saveTasks();
    }
  }

  // Delete
  else if (e.target.classList.contains("delete-btn")) {
    li.remove();
    taskArray = taskArray.filter((task) => task !== oldTask);
    saveTasks();
    speak("Task is deleted"); // Text-to-Speech feedback
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
  localStorage.setItem("tasks", JSON.stringify(taskArray));  // Save main array to localStorage
  
  /* We use JSON.stringify to convert the array into a string format for storage 
    because localStorage can only store strings. 
    When retrieving, we use JSON.parse to convert it back to an array. */ 

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
  // Text-to-Speech function
function speak(text) {
 if (!window.speechSynthesis) return;

  // Stop any ongoing or queued speech (speech reset)
  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US"; // language

  speech.rate = 1;      // speed (0.5 slow – 2 fast)
  speech.pitch = 1;    // voice pitch
  window.speechSynthesis.speak(speech);
}
