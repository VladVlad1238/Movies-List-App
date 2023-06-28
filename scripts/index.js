const movieFormNode = document.querySelector('.js-movie-form');
const movieInputNode = document.querySelector('.js-movie-input');
const movieListNode = document.querySelector('.js-movie-list');
const addMovieButtonNode = document.querySelector('.js-add-movie-btn');


let movies = [];


const renderMovie = (movie) => {
  function setMovieList() {
    const cssClass = movie.done ? 'box__container box__container-done' : 'box__container';
    const setMovieListMarkup = `<div id="${movie.id}" class="${cssClass}">
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
    return setMovieListMarkup ;
  };
  movieListNode.insertAdjacentHTML('afterbegin', setMovieList());
};


const saveToLocalStorage = () => {
  localStorage.setItem('movies', JSON.stringify(movies));
};

if(localStorage.getItem('movies')) {
  movies = JSON.parse(localStorage.getItem('movies'));
};

movies.forEach((movie) => {
  renderMovie(movie);
});

const addMovies = (e) => {

  e.preventDefault();

  const getMovieText = movieInputNode.value.trim();
  if(!getMovieText) {
    alert('Please, write the movies name')
    return inputDefaultProperties();
  };

  const newMovie = {
    id: Date.now(),
    text: getMovieText,
    done: false,
  };

  movies.push(newMovie)

  saveToLocalStorage();

  renderMovie(newMovie);
    
  inputDefaultProperties();
};


const inputDefaultProperties = () => {
    movieInputNode.value = "";
    movieInputNode.focus();
    isDisabledButton();
};

const doneMovie = (e) => {
  if(e.target.dataset.action !== 'done'){
    return;
  };
    
  const parentNode = e.target.closest('.box__container');
 
  const id = Number(parentNode.id);

  const movie = movies.find((movie) => {
    if(movie.id === id) {
      return true;
    }
  });
  movie.done = !movie.done;

  parentNode.classList.toggle('box__container-done');

  saveToLocalStorage();
};


const deleteMovie = (e) => {
  if(e.target.dataset.action !== 'delete'){
    return;
  };

  const parentNode = e.target.closest('.box__container');

  const id = Number(parentNode.id);

  const index = movies.findIndex((movie) => movie.id === id);

  movies.splice(index, 1);

  saveToLocalStorage();

  parentNode.remove();
};

const isDisabledButton = () => {
  addMovieButtonNode.disabled = !movieInputNode.value.length
};

movieFormNode.addEventListener('submit', addMovies);
movieFormNode.addEventListener('input', isDisabledButton);
movieListNode.addEventListener('click', doneMovie);
movieListNode.addEventListener('click', deleteMovie);

