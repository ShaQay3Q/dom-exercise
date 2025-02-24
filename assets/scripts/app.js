const startAddMovieBtn = document.querySelector("header button");

const backDropElement = document.getElementById("backdrop");
const addMovieModalElement = document.getElementById("add-modal");

const toggleBackDrop = () => {
	backDropElement.classList.toggle("visible");
};

const toggleMovieModal = () => {
	addMovieModalElement.classList.toggle("visible");
    toggleBackDrop();
};

startAddMovieBtn.addEventListener("click", toggleMovieModal);