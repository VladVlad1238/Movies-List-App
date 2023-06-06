
const tasksFormNode = document.querySelector('.js-tasks-form');
const tasksInputNode = document.querySelector('.js-tasks-input');
const tasksListNode = document.querySelector('.js-tasks-list');
const addTaskButtonNode = document.querySelector('.js-add-tasks-btn');


const addTasks = (event) => {

  event.preventDefault();

  const getTaskText = () => {
    const taskText = tasksInputNode.value;
    return taskText;
  };
  
  const setTaskHTML = () => {
    const setTask = getTaskText();
    const setHTML = ` <div class="box__container">
    <div class="first-col">
        <label class="box__lable">
            <input class="box__input" type="checkbox" data-action="done">
        </label>
        <p class="task__name">${setTask}</p>
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

const disabledButton = () => {
  if(tasksInputNode.value.length > 0) {
    addTaskButtonNode.removeAttribute('disabled');
  } else {
    addTaskButtonNode.setAttribute('disabled', 'disabled');
  }

  if(tasksInputNode.value.length > 150) {
    addTaskButtonNode.setAttribute('disabled', 'disabled');
  }
};




const doneTask = (event) => {
  if(event.target.dataset.action === 'done') {
    const parentNode = event.target.closest('.box__container');
    parentNode.classList.toggle('box__container-done');
  } ;
};



const deleteTask = (event) => {
  
  if(event.target.dataset.action === 'delete') {
    const parentNode = event.target.closest('.box__container');
    parentNode.remove();
  };
};


tasksFormNode.addEventListener('submit', addTasks);
tasksFormNode.addEventListener('input', disabledButton);
tasksListNode.addEventListener('click', doneTask);
tasksListNode.addEventListener('click', deleteTask);

