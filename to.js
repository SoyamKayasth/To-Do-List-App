
let add = document.getElementById("btn");
    let list = document.getElementById("list");
     let input = document.getElementById("task");
      let counter = 0;
      let total = document.getElementById("total");
       const maxTasks = 20;
        //  const taskArray = [];

         // Load tasks when the page loads
    
// Add task on Enter key press
      
       input.addEventListener("keydown" , (event) => {
            if(event.code === "Enter"){
               add.click();
            }
        } );      
         
         add.addEventListener("click" , () => {
            input.focus();
           
                if(counter >= maxTasks){
                     alert(`Task limit reached (${maxTasks}). Delete some tasks first.`);
                    return;
                }
                    if(input.value.trim() === ""){
                   alert("Please enter a task");
                   return;
               }
            
               let li =  document.createElement("li");

                const span = document.createElement("span");
                    span.classList.add("task-text");
                     span.textContent = input.value;  

                    let btns = document.createElement("div");
                     btns.classList.add("btns");

                     let editBtn = document.createElement("i");
                   let deleteBtn = document.createElement("button");

                    editBtn.classList.add("fas","fa-edit");
                   deleteBtn.classList.add("delete-btn" , "fa-duotone" , "fa-solid" ,"fa-x");
               
                    btns.append(editBtn , deleteBtn);
                     li.append(span , btns);
                   list.appendChild(li);

                updateTotal();
                //   taskArray.push(input.value);
                   input.value = "";
         });

         // Event delegation for edit and delete buttons

              list.addEventListener("click", (e) => {

                  const li = e.target.closest("li");
                      if (!li) return; // Clicked outside of a list item
                       
                   if (e.target.classList.contains("fa-edit")) {
                            // handle edit
                            const textSpan = li.querySelector(".task-text");
                           const newTask = prompt("Edit your task", textSpan.textContent);
                         if (newTask && newTask.trim() !== "") {
                            textSpan.textContent = newTask.trim();
                        }                      
                        //    let index = taskArray.indexOf(li.firstChild.textContent);
                        //     if(index !== -1){
                        //         taskArray[index] = newTask;             
                        //     }
                        
                       } else if (e.target.classList.contains("delete-btn")) {
                                 // handle delete
                                    li.remove();
                            //   taskArray = taskArray.filter((task) => task !== li.firstChild.textContent); 
                                 updateTotal();
                         }
                });


          function updateTotal() {
             counter = list.children.length;
            total.innerText = `Total Tasks: ${counter}`;
          }