
    const showButton = document.getElementById("showDialog");
    const favDialog = document.getElementById("taskDialog");
    const confirmBtn = favDialog.querySelector("#confirmBtn");
  
    // Get references to the input fields
    const titleInput = document.querySelector('input[name="title"]');
    const descriptionInput = document.querySelector('textarea[name="description"]');
    const assigneeInput = document.querySelector('input[name="assignee"]');
  
    // "Show the dialog" button opens the <dialog> modally
    showButton.addEventListener("click", () => {
      taskDialog.showModal();
    });
  
    // Enable the Confirm button only if the "title" field is valid
    titleInput.addEventListener("input", () => {
      confirmBtn.disabled = !titleInput.value;
    });
  
    // Enable the Confirm button only if the "description" field is valid
    descriptionInput.addEventListener("input", () => {
      confirmBtn.disabled = !descriptionInput.value;
    });
  
    // Enable the Confirm button only if the "assignee" field is valid
    assigneeInput.addEventListener("input", () => {
      confirmBtn.disabled = !assigneeInput.value;
    });
  
    // "Cancel" button closes the dialog 
     taskDialog.addEventListener("close", (e) => {
        taskDialog.reset(); });
  
    // Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
    confirmBtn.addEventListener("click", (event) => {
      event.preventDefault(); // We don't want to submit this fake form
      // Get form values
    const title = titleInput.value;
    const description = descriptionInput.value;
    const assignee = assigneeInput.value;

    // Create a task object
    const task = {
      title,
      description,
      assignee,
      completed: false,
    };
    // Save the task to localStorage

    addTaskToLocalStorage(task);

    // Close the dialog
    taskDialog.close();

    // Refresh tasks
    titleInput.value = "";
    descriptionInput.value = "";
    assigneeInput.value = "";
  
          });

// Function to save a task to localStorage
function addTaskToLocalStorage(task) {

  try {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];//convert into a JavaScript object.
    if (!Array.isArray(tasks)) {
      tasks = [];
    }
    tasks.push(task);
    // localStorage can only store data in the form of strings
    localStorage.setItem("tasks", JSON.stringify(tasks));//convert it to a JSON string
  } catch (error) {
    console.error("Error while adding task to localStorage:", error);
  }
}


  // Function to mark a task as completed
  function markTaskAsCompleted(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks[index].completed = true;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }

  // Function to delete a task
  function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
  }
  function showTasks() {
    const inProgressTasksList = document.getElementById("inProgressTasks");
    const completedTasksList = document.getElementById("completedTasks");

    inProgressTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (const index in tasks) {
      const task = tasks[index];
      const listItem = document.createElement("li");
      listItem.textContent = `${task.title} - ${task.description} - ${task.assignee} :         `;
      if (task.completed) {
        listItem.classList.add("completed");
        listItem.innerHTML += ` (Completed)  `;
        completedTasksList.appendChild(listItem);
      } else {
        //Mark as Completed button
        const completeButton = document.createElement("button");
        completeButton.textContent = "Mark as Completed";
        completeButton.className="buttons";
        completeButton.addEventListener("click", () => markTaskAsCompleted(index));
        listItem.appendChild(completeButton);
        //Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(index));
        listItem.appendChild(deleteButton);

        inProgressTasksList.appendChild(listItem);
      }
    };
  }

  showTasks();

