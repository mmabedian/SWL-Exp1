const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");

let tasks = [];

function createTask(title) {
    return {
        id: `${Date.now()}-${Math.random()}`,
        title,
        completed: false
    };
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const item = document.createElement("li");
        item.textContent = task.title;
        taskList.appendChild(item);
    });

    emptyState.hidden = tasks.length > 0;
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) {
        return;
    }

    tasks.push(createTask(title));

    taskInput.value = "";
    taskInput.focus();

    renderTasks();
});
