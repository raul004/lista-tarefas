const inputElement = document.querySelector(".new-task-input");
const addTaskBtn = document.querySelector(".new-task-btn");

const validadeInput = () => {
    return inputElement.value.trim().length > 0;
}

const handleAddTask = () => {
    const inputIsValid = validadeInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }
}

const handleInputChange = () => {
    const inputIsValid = validadeInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
}

addTaskBtn.addEventListener("click", () => handleAddTask());
inputElement.addEventListener("change", () => handleInputChange());