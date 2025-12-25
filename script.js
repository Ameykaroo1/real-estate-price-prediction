const addbtn = document.querySelector(".add-task-btn")
const inputTask = document.querySelector(".add-task")
const levelDropdown = document.querySelector("#level")
const date = document.querySelector(".date")
const taskBar = document.querySelector(".task-bar")

addbtn.addEventListener("click",()=>{
  const taskText = inputTask.value
  const levelText = level.options[level.selectedIndex].text
  const taskdate = date.value


  if (taskText.trim() === ""){
    alert("Please Enter a task")
    return;
  } 

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task1");

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
      edit.innerText === "Edit"
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
