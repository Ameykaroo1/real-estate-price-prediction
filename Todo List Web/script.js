const addbtn = document.querySelector(".add-task-btn")
const inputTask = document.querySelector(".add-task")
const levelDropdown = document.querySelector("#level")
const date = document.querySelector(".date")
const taskBar = document.querySelector(".task-bar")
const sort = document.querySelector("#sort")
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const completedBtn = document.querySelector(".completed");
const slider = document.querySelector(".slider");


addbtn.addEventListener("click",()=>{
  const taskText = inputTask.value
  const levelText =
  levelDropdown.options[levelDropdown.selectedIndex].text
  const taskdate = date.value;

  if (taskText.trim() === ""){
    alert("Please Enter a task")
    return;
  } 

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task1");
  taskDiv.dataset.text = taskText.toLowerCase();
  taskDiv.dataset.priority = levelText;
  taskDiv.dataset.date = taskdate || "";
  taskDiv.dataset.created = Date.now();

  // step 2: create task text
  const taskPara = document.createElement("p");
  taskPara.classList.add("task");
  taskPara.innerText = taskText;

  // step 3: create level text
  const taskLevel = document.createElement("h5");
  taskLevel.classList.add("tasklevel");
  taskLevel.innerText = levelText;

  //step 4: add checkbox and edit and del button
  const checkbox = document.createElement("input")
  checkbox.type="checkbox"
  
  const edit = document.createElement("button");
  edit.classList.add("edit")
  edit.innerText = "Edit";

  const del = document.createElement("button")
  del.classList.add("delete")
  del.innerText="Delete"

  // step 4: add into task div
  
  taskDiv.appendChild(checkbox)
  taskDiv.appendChild(taskPara);
  taskDiv.appendChild(taskLevel);
  taskDiv.appendChild(edit)
  taskDiv.appendChild(del)

  // step 5: add task to task bar
  taskBar.appendChild(taskDiv);

  // clear input
  inputTask.value = "";
  date.value = "";


  //delete button 
  del.addEventListener("click",()=>{
  taskDiv.remove()
})

  //checkbox 
  checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    taskPara.style.textDecoration = "line-through";
    taskPara.style.opacity = "0.6";
  } else {
    taskPara.style.textDecoration = "none";
    taskPara.style.opacity = "1";
  }
  });

  //Edit
  let editInput= null
  edit.addEventListener("click",()=>{
    if(edit.innerText === "Save"){
      taskPara.innerText=editInput.value
      taskDiv.replaceChild(taskPara,editInput)
      edit.innerText = "Edit"
      editInput=null
      return
    }
    
    editInput = document.createElement("input")
    editInput.type = "text"
    editInput.value = taskPara.innerText

    taskDiv.replaceChild(editInput, taskPara);
    edit.innerText = "Save";
  })
  
})

// searching task
const searchInput = document.querySelector(".search-bar")
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();

  // get tasks EVERY time user types
  const tasks = document.querySelectorAll(".task");

  tasks.forEach(task => {
    const taskText = task.innerText.toLowerCase();
    const taskDiv = task.closest(".task1");

    if (taskText.includes(searchValue)) {
      taskDiv.style.display = "";
    } else {
      taskDiv.style.display = "none";
    }
  });
});

sort.addEventListener("change", () => {
  const tasks = Array.from(document.querySelectorAll(".task1"));

  if (sort.value === "A-Z") {
    tasks.sort((a, b) =>
      a.dataset.text.localeCompare(b.dataset.text)
    );
  }

  if (sort.value === "Priority") {
    const order = { High: 1, Medium: 2, Low: 3 };
    tasks.sort(
      (a, b) => order[a.dataset.priority] - order[b.dataset.priority]
    );
  }

  if (sort.value === "Due Date") {
    tasks.sort(
      (a, b) => new Date(a.dataset.date) - new Date(b.dataset.date)
    );
  }

  if (sort.value === "Date Created") {
    tasks.sort(
      (a, b) => a.dataset.created - b.dataset.created
    );
  }

  // put tasks back in DOM in sorted order
  tasks.forEach(task => taskBar.appendChild(task));
});

function getAllTasks() {
  return document.querySelectorAll(".task1");
}
allBtn.addEventListener("click", () => {
  getAllTasks().forEach(task => {
    task.style.display = "";
  });
});
activeBtn.addEventListener("click", () => {
  getAllTasks().forEach(task => {
    const checkbox = task.querySelector("input[type='checkbox']");
    task.style.display = checkbox.checked ? "none" : "";
  });
});
completedBtn.addEventListener("click", () => {
  getAllTasks().forEach(task => {
    const checkbox = task.querySelector("input[type='checkbox']");
    task.style.display = checkbox.checked ? "" : "none";
  });
});

function setActive(btn, index) {
  [allBtn, activeBtn, completedBtn].forEach(b =>
    b.classList.remove("selected")
  );

  btn.classList.add("selected");
  slider.style.transform = `translateX(${index * 100}%)`;
}

allBtn.addEventListener("click", () => setActive(allBtn, 0));
activeBtn.addEventListener("click", () => setActive(activeBtn, 1));
completedBtn.addEventListener("click", () => setActive(completedBtn, 2));