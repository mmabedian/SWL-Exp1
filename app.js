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
        item.className = "task-item";
        item.dataset.id = task.id;

        if (task.completed) {
            item.classList.add("completed");
        }

        const label = document.createElement("label");
        label.className = "task-content";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.className = "task-checkbox";

        const title = document.createElement("span");
        title.textContent = task.title;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "حذف";
        deleteButton.dataset.action = "delete";

        label.append(checkbox, title);
        item.append(label, deleteButton);

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

taskList.addEventListener("click", (event) => {
    const deleteButton = event.target.closest('[data-action="delete"]');

    if (!deleteButton) {
        return;
    }

    const taskItem = deleteButton.closest(".task-item");
    const taskId = taskItem.dataset.id;

    tasks = tasks.filter((task) => task.id !== taskId);

    renderTasks();
});
