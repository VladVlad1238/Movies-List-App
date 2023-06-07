

const ZERO = 0;
const TITLE_INPUT_LIMIT = 100;

const tasksFormNode = document.querySelector('.js-tasks-form');
const tasksInputNode = document.querySelector('.js-tasks-input');
const tasksListNode = document.querySelector('.js-tasks-list');
const addTasksButtonNode = document.querySelector('.js-add-tasks-btn');


const addTasks = (event) => {

  event.preventDefault();

  const getTasksText = () => {
    const tasksText = tasksInputNode.value;
    return tasksText;
  };
  
  const setTasksHTML = () => {
    const setTasks = getTasksText();
    const setHTML = ` <div class="box__container">
    <div class="first-col">
        <label class="box__lable">
            <input class="box__input" type="checkbox" data-action="done">
        </label>
        <p class="task__name">${setTasks}</p>
    </div>
    <div class="second-col">
        <button class="delete__button" data-action="delete">
            <img class="delete__btn-img" src="images/delete-btn.png" alt="Delete button image">
        </button>
    </div>`
    return setHTML;
  };
  
  const getTasksList = () => {
    const getTasks = setTasksHTML();
    tasksListNode.insertAdjacentHTML('beforeend', getTasks);
  };

  const inputManipulation = () => {
    const clearInput = () => {
      tasksInputNode.value = "";
      disabledButton();
    };
    const focusInput = () => {
      tasksInputNode.focus();
    };
    clearInput();
    focusInput();
  };

  getTasksList();
  inputManipulation();
};

const doneTask = (event) => {
  if(event.target.dataset.action === 'done') {
    const parentNode = event.target.closest('.box__container');
    parentNode.classList.toggle('box__container-done');
  };
};

const deleteTask = (event) => {
  if(event.target.dataset.action === 'delete') {
    const parentNode = event.target.closest('.box__container');
    parentNode.remove();
  };
};

const disabledButton = () => {
  if(tasksInputNode.value.length > ZERO) {
    addTasksButtonNode.removeAttribute('disabled');
  } else {
    addTasksButtonNode.setAttribute('disabled', 'disabled');
  };

  if(tasksInputNode.value.length > TITLE_INPUT_LIMIT) {
    addTasksButtonNode.setAttribute('disabled', 'disabled');
  };
};


tasksFormNode.addEventListener('submit', addTasks);
tasksFormNode.addEventListener('input', disabledButton);
tasksListNode.addEventListener('click', doneTask);
tasksListNode.addEventListener('click', deleteTask);

