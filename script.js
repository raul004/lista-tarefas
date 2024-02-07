const inputElement = document.querySelector(".new-task-input");
const addTaskBtn = document.querySelector(".new-task-btn");
const taskContainer = document.querySelector(".task-container");

const validadeInput = () => {
    return inputElement.value.trim().length > 0;
}

const handleAddTask = () => {
    const inputIsValid = validadeInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    createTaskContents();
}

const handleInputChange = () => {
    const inputIsValid = validadeInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }

}

const createTaskContents = () => {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskItemContent = document.createElement("p");
    taskItemContent.innerText = inputElement.value;

    taskItemContent.addEventListener("click", () => handleClick(taskItemContent));

    const taskItemDelete = document.createElement("i");
    taskItemDelete.classList.add("fa-solid");
    taskItemDelete.classList.add("fa-trash");

    taskItemDelete.addEventListener("click", () => handleDeleteClick());

    taskItemContainer.appendChild(taskItemContent);
    taskItemContainer.appendChild(taskItemDelete);

    taskContainer.classList.remove("hidden-task-container");
    taskContainer.classList.add("show-task-container");

    taskContainer.appendChild(taskItemContainer);

    inputElement.value = '';
}

const handleClick = (taskItemContent) => {
    const tasks = taskContainer.childNodes;

    for (const task of tasks) {
        if (task.firstChild.isSameNode(taskItemContent)) {
            task.firstChild.classList.toggle("completed");
        }
    }
}

addTaskBtn.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());