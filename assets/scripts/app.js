const startAddMovieBtnElement = document.querySelector("header button");

const backdropElement = document.getElementById("backdrop");
const addMovieModalElement = document.getElementById("add-modal");

const cancelAddMovieBtnElement =
	addMovieModalElement.querySelector(".btn--passive");

const confirmAddMovieBtnElement =
	addMovieModalElement.querySelector(".btn--success");

const inputElements = addMovieModalElement.querySelectorAll("input");

const mainBodyElement = document.querySelector("main");
const sectionElement = document.getElementById("entry-text");
const clearMovieInput = () => {
	for (const element of inputElements) {
		element.value = "";
	}
};

const movies = [];

const updateUI = () => {
	if (movies.length === 0) {
		sectionElement.style.display = "block";
	} else {
		sectionElement.style.display = "none";
	}
};

const toggleBackDrop = () => {
	backdropElement.classList.toggle("visible");
};

const toggleMovieModal = () => {
	addMovieModalElement.classList.toggle("visible");
	toggleBackDrop();
};

const cancelAddMovieHandler = () => {
	toggleMovieModal();
	clearMovieInput();
};

// gets the input data
// validate the input data
// add the movie obj into an array
const addMovieHandler = () => {
	const titleValue = inputElements[0].value;
	const imgUrlValue = inputElements[1].value;
	const ratingValue = inputElements[2].value;

	if (
		titleValue.trim() === "" ||
		imgUrlValue.trim() === "" ||
		ratingValue.trim() === "" ||
		isNaN(parseInt(ratingValue)) ||
		parseInt(ratingValue) < 1 ||
		parseInt(ratingValue) > 5
	) {
		alert("Please enter valid values. (Rating is between 1 and 5.)");
		return;
	}

	const newMovie = {
		title: titleValue,
		img: imgUrlValue,
		rating: ratingValue,
	};
	movies.push(newMovie);
	console.log(movies);

	toggleMovieModal();

	clearMovieInput();

	updateUI();
};

const backdropClickHandler = () => {
	toggleMovieModal();
};

startAddMovieBtnElement.addEventListener("click", toggleMovieModal);
cancelAddMovieBtnElement.addEventListener("click", cancelAddMovieHandler);
backdropElement.addEventListener("click", backdropClickHandler);
confirmAddMovieBtnElement.addEventListener("click", addMovieHandler);
