
const TITLE_INPUT_LIMIT = 100;

const movieFormNode = document.querySelector('.js-movie-form');
const movieInputNode = document.querySelector('.js-movie-input');
const movieListNode = document.querySelector('.js-movie-list');
const addMovieButtonNode = document.querySelector('.js-add-movie-btn');


let movies = [];


const renderMovie = (movie) => {

  const setMovieHTML = () => {
    const cssClass = movie.done ? 'box__container box__container-done' : 'box__container';
    const setHTML = `<div id="${movie.id}" class="${cssClass}">
    <div class="first-col">
       <button class="checked__button" data-action="done">
          <img class="checked__button-img" src="images/unchecked.png" alt="checked button">
       </button>
        <p class="movies__name">${movie.text}</p>
    </div>
    <div class="second-col">
        <button class="delete__button" data-action="delete">
            <img class="delete__btn-img" src="images/delete-btn.png" alt="Delete button image">
        </button>
    </div>`
    return setHTML;
  };

  
const getMovieList = () => {
  const getTasks = setMovieHTML();
  movieListNode.insertAdjacentHTML('afterbegin', getTasks);
  };
  getMovieList();
  setMovieHTML();
};


const saveLocalStorage = () => {
  localStorage.setItem('movies', JSON.stringify(movies));
};

if(localStorage.getItem('movies')) {
  movies = JSON.parse(localStorage.getItem('movies'));
};

movies.forEach((movie) => {
  renderMovie(movie);
});


const addMovies = (event) => {

  event.preventDefault();

  getMovieText();

  const newMovie = {
    id: Date.now(),
    text: getMovieText(),
    done: false,
  };

  movies.push(newMovie)

  saveLocalStorage();

  renderMovie(newMovie);
    
  inputManipulation();
};


const inputManipulation = () => {
  const clearInput = () => {
    movieInputNode.value = "";
    disabledButton();
  };
  const focusInput = () => {
    movieInputNode.focus();
  };
  clearInput();
  focusInput();
};



const getMovieText = () => {
  const movieText = movieInputNode.value.trim();
  return movieText;
};


const doneMovie = (event) => {
  if(event.target.dataset.action !== 'done') return;
    
  const parentNode = event.target.closest('.box__container');
 
  const id = Number(parentNode.id);

  const movie = movies.find((movie) => {
    if(movie.id === id) {
      return true;
    };
  });

  movie.done = !movie.done;

  parentNode.classList.toggle('box__container-done');

  saveLocalStorage();
};


const deleteMovie = (event) => {
  if(event.target.dataset.action !== 'delete') return;

  const parentNode = event.target.closest('.box__container');

  const id = Number(parentNode.id);

  const index = movies.findIndex((movie) => {
    if(movie.id === id) {
      return true;
    };
  });

  movies.splice(index, 1);

  saveLocalStorage();

  parentNode.remove();
};


const disabledButton = () => {
  if(movieInputNode.value.length) {
    addMovieButtonNode.removeAttribute('disabled');
  } else {
    addMovieButtonNode.setAttribute('disabled', 'disabled');
  };

  if(movieInputNode.value.length > TITLE_INPUT_LIMIT) {
    addMovieButtonNode.setAttribute('disabled', 'disabled');
  };
};


movieFormNode.addEventListener('submit', addMovies);
movieFormNode.addEventListener('input', disabledButton);
movieListNode.addEventListener('click', doneMovie);
movieListNode.addEventListener('click', deleteMovie);




//убрать пробелы  разобрать код по полкам, посмотреть ревью Игоря 