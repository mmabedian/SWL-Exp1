const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const filterButtons = document.querySelectorAll(".filter-button");
const totalCount = document.querySelector("#total-count");
const activeCount = document.querySelector("#active-count");
const completedCount = document.querySelector("#completed-count");
const formError = document.querySelector("#form-error");
const themeToggle = document.querySelector("#theme-toggle");

let currentFilter = "all";
let tasks = loadTasks();

function createTask(title) {
    return {
        id: `${Date.now()}-${Math.random()}`,
        title,
        completed: false
    };
}

function updateStats() {
    const completedTasks = tasks.filter((task) => task.completed).length;

    totalCount.textContent = tasks.length;
    completedCount.textContent = completedTasks;
    activeCount.textContent = tasks.length - completedTasks;
}

function getVisibleTasks() {
    if (currentFilter === "active") {
        return tasks.filter((task) => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter((task) => task.completed);
    }

    return tasks;
}

function renderTasks() {
    taskList.innerHTML = "";

    getVisibleTasks().forEach((task) => {
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
    updateStats();
}

function saveTasks() {
    localStorage.setItem("taskflow.tasks", JSON.stringify(tasks));
}

function loadTasks() {
    try {
        const storedTasks = localStorage.getItem("taskflow.tasks");

        if (!storedTasks) {
            return [];
        }

        return JSON.parse(storedTasks);
    } catch (error) {
        console.error("Could not load saved tasks.", error);
        return [];
    }
}

function showFormError(message) {
    formError.textContent = message;
    formError.hidden = false;
}

function clearFormError() {
    formError.textContent = "";
    formError.hidden = true;
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem("taskflow.theme") || "light";

    document.body.dataset.theme = savedTheme;
    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskInput.value.trim();

    clearFormError();

    if (title.length < 2) {
        showFormError("عنوان کار باید حداقل دو حرف داشته باشد.");
        return;
    }

    const duplicateTask = tasks.some(
        (task) => task.title.toLowerCase() === title.toLowerCase()
    );

    if (duplicateTask) {
        showFormError("این کار قبلاً ثبت شده است.");
        return;
    }
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

taskList.addEventListener("change", (event) => {
    if (!event.target.classList.contains("task-checkbox")) {
        return;
    }

    const taskItem = event.target.closest(".task-item");
    const taskId = taskItem.dataset.id;

    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
        return;
    }

    task.completed = event.target.checked;
    saveTasks();

    renderTasks();
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach((item) => {
            item.classList.toggle("active", item === button);
        });

        renderTasks();
    });
});

themeToggle.addEventListener("click", () => {
    const newTheme = isDark ? "light" : "dark";

    document.body.dataset.theme = newTheme;
    localStorage.setItem("taskflow.theme", newTheme);

    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
});

applySavedTheme();
renderTasks();
