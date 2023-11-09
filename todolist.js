
    window.onload = loadTasks;
    // localStorage.clear()

    document.querySelector("form").addEventListener
    ("submit" , e => { 
      e.preventDefault(); 
      addTask();
    });
    
    function loadTasks() {
      if (localStorage.getItem("tasks") == null) return;
      else 
        {
          let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
          tasks.forEach(task => {
            const list = document.querySelector("ul"); 
            const li = document.createElement("li");
            li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
              <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
              <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
            list.insertBefore(li, list.children[0]); 
           //list.insertBefore(li, null); 
          });
      }
    }

    function addTask() {
      const task = document.querySelector("form input");
      const list = document.querySelector("ul");
      
      if (task.value === "") {
        alert("The task should not be empty");
        return false; 
      }
      if (document.querySelector(`input[value="${task.value}"]`)) {
        alert("Task already exist!");
        return false;
      }
      
      localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]));
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
      list.insertBefore(li, list.children[0]);
      task.value = "";
    }

    function taskComplete(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
        if (task.task === event.nextElementSibling.value) { 
          task.completed = !task.completed;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      event.nextElementSibling.classList.toggle("completed");
    }
    function removeTask(event) {
      
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
        if (task.task === event.parentNode.children[1].value) {
          // delete task
          tasks.splice(tasks.indexOf(task), 1);
          //tasks.splice(tasks.indexOf(task));
          //localStorage.removeItem(task); 
        }
      });
       localStorage.setItem("tasks", JSON.stringify(tasks));
       event.parentElement.remove();
      
    }

  
    var currentTask = null;
    function getCurrentTask(event) {
      currentTask = event.value;
    }

    function editTask(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      
      if (event.value === "") {
        alert("Task is empty!");
        event.value = currentTask;
        return;
      }
      // task already exist
      // tasks.forEach(task => {
      //   if (task.task === event.value) {
      //     alert("Task already exist!");
      //     event.value = currentTask;
      //     return;
      //   }
      // });
      // update task
      tasks.forEach(task => {
        if (task.task === currentTask) {
          task.task = event.value;
        }
      });
      // обновление local storage
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
