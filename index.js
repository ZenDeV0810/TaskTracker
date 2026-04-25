console.log("JS loaded");

const timeInput = document.querySelector(".time");
const taskInput = document.getElementById("taskInput");
const dateInput = document.querySelector(".date");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = [];


addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  const taskDate = dateInput.value;
  const taskTime = timeInput.value;

  if (taskText === "" || taskDate === "" || taskTime === "") {
    alert("Please fill all fields");
    return;
  }

  const task = {
    text: taskText,
    date: new Date(`${taskDate}T${taskTime}`)
  };

  tasks.push(task);

  renderTasks();

  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
});

function renderTasks() {
  tasks.sort((a, b) => a.date - b.date);

  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-card");

    li.innerHTML = `
      <div class="task-content">
        <p>${task.text}</p>
        <span>${formatDate(task.date)} • ${formatTime(task.date)}</span>
      </div>
      <button class="delete-btn" data-index="${index}">✕</button>
    `;

    taskList.appendChild(li);
  });
}

taskList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");

    tasks.splice(index, 1);
    renderTasks();
  }
});


function formatDate(date) {
  return date.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}