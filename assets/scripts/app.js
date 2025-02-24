const startAddMovieBtn = document.querySelector("header button");

const backDropElement = document.getElementById("backdrop");
const addMovieModalElement = document.getElementById("add-modal");

const cancelModalActionsBtnElement = document.querySelector(
	".modal__actions .btn--passive"
);

console.log(cancelModalActionsBtnElement);

const toggleBackDrop = () => {
	backDropElement.classList.toggle("visible");
};

const toggleMovieModal = () => {
	addMovieModalElement.classList.toggle("visible");
	toggleBackDrop();
};

startAddMovieBtn.addEventListener("click", toggleMovieModal);
cancelModalActionsBtnElement.addEventListener("click", toggleMovieModal);
backDropElement.addEventListener("click", toggleMovieModal);
