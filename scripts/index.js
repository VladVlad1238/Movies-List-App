const ZERO = 0;
const TITLE_INPUT_LIMIT = 100;

const taskFormNode = document.querySelector('.js-tasks-form');
const taskInputNode = document.querySelector('.js-tasks-input');
const tasksListNode = document.querySelector('.js-tasks-list');
const addTasksButtonNode = document.querySelector('.js-add-tasks-btn');


let tasks = [];

const renderTask = (task) => {
  const cssClass = task.done ? 'box__container box__container-done' : 'box__container';
  
  const setTaskHTML = () => {
    const setHTML = `<div id="${task.id}" class="${cssClass}">
    <div class="first-col">
       <button class="checked__button" data-action="done">
          <img class="checked__button-img" src="images/unchecked.png" alt="checked button">
       </button>
        <p class="task__name">${task.text}</p>
    </div>
    <div class="second-col">
        <button class="delete__button" data-action="delete">
            <img class="delete__btn-img" src="images/delete-btn.png" alt="Delete button image">
        </button>
    </div>`
    return setHTML;
  };
  
const getTasksList = () => {
  const getTasks = setTaskHTML();
  tasksListNode.insertAdjacentHTML('beforeend', getTasks);
  };
  getTasksList();
  setTaskHTML();
};

if(localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
};

tasks.forEach((task) => {
  renderTask(task);
});

const addTasks = (event) => {

  event.preventDefault();

  getTaskText();

const newTask = {
  id: Date.now(),
  text: getTaskText(),
  done: false,
};

tasks.push(newTask)

saveLocalStorage();

const cssClass = newTask.done ? 'box__container box__container-done' : 'box__container';
  
const setTaskHTML = () => {
  const setHTML = `<div id="${newTask.id}" class="${cssClass}">
  <div class="first-col">
      <button class="checked__button" data-action="done">
          <img class="checked__button-img" src="images/unchecked.png" alt="checked button">
      </button>
      <p class="task__name">${newTask.text}</p>
  </div>
  <div class="second-col">
      <button class="delete__button" data-action="delete">
          <img class="delete__btn-img" src="images/delete-btn.png" alt="Delete button image">
      </button>
  </div>`
  return setHTML;
};
  
const getTasksList = () => {
  const getTasks = setTaskHTML();
  tasksListNode.insertAdjacentHTML('beforeend', getTasks);
};

const inputManipulation = () => {
  const clearInput = () => {
    taskInputNode.value = "";
    disabledButton();
  };
  const focusInput = () => {
    taskInputNode.focus();
  };
  clearInput();
  focusInput();
};

getTasksList();
inputManipulation();
};


const getTaskText = () => {
  const taskText = taskInputNode.value;
  return taskText;
};

const doneTask = (event) => {
  if(event.target.dataset.action !== 'done') return;
    
  const parentNode = event.target.closest('.box__container');
 

  const id = Number(parentNode.id);

  const task = tasks.find((task) => {
    if(task.id === id) {
      return true;
    };
  });

  task.done = !task.done;

  
  parentNode.classList.toggle('box__container-done');
  saveLocalStorage();
};

const deleteTask = (event) => {
  if(event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('.box__container');

  const id = Number(parentNode.id);

  const index = tasks.findIndex((task) => {
    if(task.id === id) {
      return true;
    };
  });

    tasks.splice(index, 1);

    saveLocalStorage();

    parentNode.remove();
};

const disabledButton = () => {
  if(taskInputNode.value.length > ZERO) {
    addTasksButtonNode.removeAttribute('disabled');
  } else {
    addTasksButtonNode.setAttribute('disabled', 'disabled');
  };

  if(taskInputNode.value.length > TITLE_INPUT_LIMIT) {
    addTasksButtonNode.setAttribute('disabled', 'disabled');
  };
};

const saveLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

taskFormNode.addEventListener('submit', addTasks);
taskFormNode.addEventListener('input', disabledButton);
tasksListNode.addEventListener('click', doneTask);
tasksListNode.addEventListener('click', deleteTask);

