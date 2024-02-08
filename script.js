const inputElement = document.querySelector(".new-task-input");
const addTaskBtn = document.querySelector(".new-task-btn");
const taskContainer = document.querySelector(".task-container");

const validadeInput = () => {
    return inputElement.value.trim().length > 0;
};

const handleAddTask = () => {
    const inputIsValid = validadeInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskItemContent = document.createElement("p");
    taskItemContent.innerText = inputElement.value;

    taskItemContent.addEventListener("click", () => handleClick(taskItemContent));

    const taskItemDelete = document.createElement("i");
    taskItemDelete.classList.add("fa-solid");
    taskItemDelete.classList.add("fa-trash");

    taskItemDelete.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskItemContent));

    taskItemContainer.appendChild(taskItemContent);
    taskItemContainer.appendChild(taskItemDelete);
    
    taskContainer.appendChild(taskItemContainer);

    inputElement.value = '';

    updateLocalStorage();
};

const handleClick = (taskItemContent) => {
    const tasks = taskContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskItemContent);

        if (currentTaskIsBeingClicked) {
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskItemContent) => {
    const tasks = taskContainer.childNodes;

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskItemContent);

        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
};

const handleInputChange = () => {
    const inputIsValid = validadeInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
    const tasks = taskContainer.childNodes;

    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed");

        return { description: content.innerText, isCompleted };
    });

    localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

    if (!tasksFromLocalStorage) return

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");

        const taskItemContent = document.createElement("p");
        taskItemContent.innerText = task.description;

        if (task.isCompleted) {
            taskItemContent.classList.add("completed");
        }
        taskItemContent.addEventListener("click", () => handleClick(taskItemContent));

        const taskItemDelete = document.createElement("i");
        taskItemDelete.classList.add("fa-solid");
        taskItemDelete.classList.add("fa-trash");

        taskItemDelete.addEventListener("click", () => handleDeleteClick(taskItemContainer, taskItemContent));

        taskItemContainer.appendChild(taskItemContent);
        taskItemContainer.appendChild(taskItemDelete);

        taskContainer.appendChild(taskItemContainer);

        inputElement.value = '';
    }
};

refreshTasksUsingLocalStorage();

addTaskBtn.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());