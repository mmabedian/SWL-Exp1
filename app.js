const taskForm =
    document.querySelector("#task-form");

const taskInput =
    document.querySelector("#task-input");

const taskList =
    document.querySelector("#task-list");

const emptyState =
    document.querySelector("#empty-state");

const formError =
    document.querySelector("#form-error");

const totalCount =
    document.querySelector("#total-count");

const activeCount =
    document.querySelector("#active-count");

const completedCount =
    document.querySelector("#completed-count");

const filterButtons =
    document.querySelectorAll(".filter-button");

const clearCompletedButton =
    document.querySelector("#clear-completed");

const themeToggle =
    document.querySelector("#theme-toggle");


let currentFilter = "all";

let tasks = loadTasks();


/* -------------------------
   Task creation
-------------------------- */

function createTask(title) {

    return {
        id:
            `${Date.now()}-${Math.random()}`,

        title: title,

        completed: false
    };
}


/* -------------------------
   LocalStorage
-------------------------- */

function saveTasks() {

    localStorage.setItem(
        "taskflow.tasks",
        JSON.stringify(tasks)
    );
}


function loadTasks() {

    try {

        const storedTasks =
            localStorage.getItem(
                "taskflow.tasks"
            );

        if (!storedTasks) {
            return [];
        }

        return JSON.parse(
            storedTasks
        );

    } catch (error) {

        console.error(
            "Could not load saved tasks.",
            error
        );

        return [];
    }
}


/* -------------------------
   Validation
-------------------------- */

function showFormError(message) {

    formError.textContent =
        message;

    formError.hidden =
        false;
}


function clearFormError() {

    formError.textContent =
        "";

    formError.hidden =
        true;
}


/* -------------------------
   Filtering
-------------------------- */

function getVisibleTasks() {

    if (currentFilter === "active") {

        return tasks.filter(
            (task) =>
                !task.completed
        );
    }


    if (
        currentFilter ===
        "completed"
    ) {

        return tasks.filter(
            (task) =>
                task.completed
        );
    }


    return tasks;
}


/* -------------------------
   Statistics
-------------------------- */

function updateStats() {

    const completedTasks =
        tasks.filter(
            (task) =>
                task.completed
        ).length;


    totalCount.textContent =
        tasks.length;


    completedCount.textContent =
        completedTasks;


    activeCount.textContent =
        tasks.length -
        completedTasks;
}


/* -------------------------
   Render
-------------------------- */

function renderTasks() {

    taskList.innerHTML = "";


    const visibleTasks =
        getVisibleTasks();


    visibleTasks.forEach(
        (task) => {

            const item =
                document.createElement(
                    "li"
                );

            item.className =
                "task-item";

            item.dataset.id =
                task.id;


            if (task.completed) {

                item.classList.add(
                    "completed"
                );
            }


            const label =
                document.createElement(
                    "label"
                );

            label.className =
                "task-content";


            const checkbox =
                document.createElement(
                    "input"
                );

            checkbox.type =
                "checkbox";

            checkbox.checked =
                task.completed;

            checkbox.className =
                "task-checkbox";


            const title =
                document.createElement(
                    "span"
                );

            title.textContent =
                task.title;


            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.type =
                "button";

            deleteButton.className =
                "delete-button";

            deleteButton.textContent =
                "حذف";

            deleteButton.dataset.action =
                "delete";


            label.append(
                checkbox,
                title
            );


            item.append(
                label,
                deleteButton
            );


            taskList.appendChild(
                item
            );
        }
    );


    emptyState.hidden =
        visibleTasks.length > 0;


    updateStats();
}


/* -------------------------
   Add task
-------------------------- */

taskForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const title =
            taskInput.value.trim();


        clearFormError();


        if (title.length < 2) {

            showFormError(
                "عنوان کار باید حداقل دو حرف داشته باشد."
            );

            return;
        }


        const duplicateTask =
            tasks.some(
                (task) =>
                    task.title
                        .toLowerCase() ===
                    title
                        .toLowerCase()
            );


        if (duplicateTask) {

            showFormError(
                "این کار قبلاً ثبت شده است."
            );

            return;
        }


        tasks.push(
            createTask(title)
        );


        saveTasks();

        renderTasks();


        taskInput.value = "";

        taskInput.focus();
    }
);


/* -------------------------
   Delete task
-------------------------- */

taskList.addEventListener(
    "click",
    (event) => {

        const deleteButton =
            event.target.closest(
                '[data-action="delete"]'
            );


        if (!deleteButton) {
            return;
        }


        const taskItem =
            deleteButton.closest(
                ".task-item"
            );


        const taskId =
            taskItem.dataset.id;


        tasks =
            tasks.filter(
                (task) =>
                    task.id !== taskId
            );


        saveTasks();

        renderTasks();
    }
);


/* -------------------------
   Complete task
-------------------------- */

taskList.addEventListener(
    "change",
    (event) => {

        if (
            !event.target
                .classList
                .contains(
                    "task-checkbox"
                )
        ) {

            return;
        }


        const taskItem =
            event.target.closest(
                ".task-item"
            );


        const taskId =
            taskItem.dataset.id;


        const task =
            tasks.find(
                (item) =>
                    item.id === taskId
            );


        if (!task) {
            return;
        }


        task.completed =
            event.target.checked;


        saveTasks();

        renderTasks();
    }
);


/* -------------------------
   Filters
-------------------------- */

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                currentFilter =
                    button.dataset.filter;


                filterButtons.forEach(
                    (item) => {

                        item.classList.toggle(
                            "active",
                            item === button
                        );
                    }
                );


                renderTasks();
            }
        );
    }
);


/* -------------------------
   Clear completed
-------------------------- */

clearCompletedButton
    .addEventListener(
        "click",
        () => {

            tasks =
                tasks.filter(
                    (task) =>
                        !task.completed
                );


            saveTasks();

            renderTasks();
        }
    );


/* -------------------------
   Theme
-------------------------- */

function applySavedTheme() {

    const savedTheme =
        localStorage.getItem(
            "taskflow.theme"
        ) || "light";


    document.body.dataset.theme =
        savedTheme;


    themeToggle.textContent =
        savedTheme === "dark"
            ? "☀️"
            : "🌙";
}


themeToggle.addEventListener(
    "click",
    () => {

        const isDark =
            document.body.dataset.theme
            === "dark";


        const newTheme =
            isDark
                ? "light"
                : "dark";


        document.body.dataset.theme =
            newTheme;


        localStorage.setItem(
            "taskflow.theme",
            newTheme
        );


        themeToggle.textContent =
            newTheme === "dark"
                ? "☀️"
                : "🌙";
    }
);


/* -------------------------
   Initial render
-------------------------- */

applySavedTheme();

renderTasks();
