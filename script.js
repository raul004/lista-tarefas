const inputElement = document.querySelector('.new-task-input');
const addTaskBtn = document.querySelector('.new-task-btn');

const validadeInput = () => {
    return inputElement.value.trim().length > 0;
}

