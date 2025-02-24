const startAddMovieBtnElement = document.querySelector("header button");

const backdropElement = document.getElementById("backdrop");
const addMovieModalElement = document.getElementById("add-modal");

const cancelAddMovieBtnElement =
	addMovieModalElement.querySelector(".btn--passive");

console.log(cancelAddMovieBtnElement);

const toggleBackDrop = () => {
	backdropElement.classList.toggle("visible");
};

const toggleMovieModal = () => {
	addMovieModalElement.classList.toggle("visible");
	toggleBackDrop();
};

const cancelAddMovie = () => {
	toggleMovieModal();
};

const backdropClickHandler = () => {
	toggleMovieModal();
};

startAddMovieBtnElement.addEventListener("click", toggleMovieModal);
cancelAddMovieBtnElement.addEventListener("click", cancelAddMovie);
backdropElement.addEventListener("click", backdropClickHandler);
