const movieFormNode = document.querySelector('.js-movie-form');
const movieInputNode = document.querySelector('.js-movie-input');
const movieListNode = document.querySelector('.js-movie-list');
const addMovieButtonNode = document.querySelector('.js-add-movie-btn');


let movies = [];


const renderMovie = (newMovie) => {
  movieListNode.insertAdjacentHTML('afterbegin', setMovieItem(newMovie));
};

function setMovieItem(movie) {
  const cssClass = movie.done ? 'movie__list-container movie__list-container-done' : 'movie__list-container';
  const setItemMarkup = `<div id="${movie.id}" class="${cssClass}">
  <div class="checked__button-wrapper">
     <button class="checked__button" data-action="done">
        <img class="checked__button-img" src="images/unchecked.png" alt="checked button">
     </button>
      <p class="movie__name">${movie.text}</p>
  </div>
  <div class="delete__button-wrapper">
      <button class="delete__button" data-action="delete">
          <img class="delete__btn-img" src="images/delete-btn.png" alt="Delete button image">
      </button>
  </div>`
  return setItemMarkup;
};

const saveToLocalStorage = () => {
  localStorage.setItem('movies', JSON.stringify(movies));
};

const getFromLocalStorage = () => {
  if(localStorage.getItem('movies')) {
    movies = JSON.parse(localStorage.getItem('movies'));
  };
  return movies;
};
getFromLocalStorage();
  
const loadMovieStorage = () => {
  movies.forEach((movie) => {
    renderMovie(movie);
  });
}
loadMovieStorage();

const addMovies = (e) => {

  e.preventDefault();

  const getMovieName = movieInputNode.value.trim();
  if(!getMovieName) {
    alert('Please, write the movies name')
    return resetInput();
  };

  const newMovie = {
    id: Date.now(),
    text: getMovieName,
    done: false,
  };

  movies.push(newMovie)

  saveToLocalStorage();

  renderMovie(newMovie);
    
  resetInput();
};


const resetInput = () => {
    movieInputNode.value = "";
    movieInputNode.focus();
    isButtonDisabled();
};

const doneMovieHandler = (e) => {
  if(e.target.dataset.action !== 'done'){
    return;
  };
    
  const parentNode = e.target.closest('.movie__list-container');
 
  const id = Number(parentNode.id);

  const movie = movies.find((movie) => movie.id === id);

  movie.done = !movie.done;

  parentNode.classList.toggle('movie__list-container-done');

  saveToLocalStorage();
};


const deleteMovieHandler = (e) => {
  if(e.target.dataset.action !== 'delete'){
    return;
  };

  const parentNode = e.target.closest('.movie__list-container');

  const id = Number(parentNode.id);

  const index = movies.findIndex((movie) => movie.id === id);

  movies.splice(index, 1);

  saveToLocalStorage();

  parentNode.remove();
};

const isButtonDisabled = () => {
  addMovieButtonNode.disabled = !movieInputNode.value.length
};


movieFormNode.addEventListener('submit', addMovies);
movieInputNode.addEventListener('input', isButtonDisabled);
movieListNode.addEventListener('click', doneMovieHandler);
movieListNode.addEventListener('click', deleteMovieHandler);

