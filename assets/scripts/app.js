const startAddMovieBtnElement = document.querySelector("header button");

const backdropElement = document.getElementById("backdrop");
const addMovieModalElement = document.getElementById("add-modal");

const cancelAddMovieBtnElement =
	addMovieModalElement.querySelector(".btn--passive");

const confirmAddMovieBtnElement =
	addMovieModalElement.querySelector(".btn--success");

const inputElements = addMovieModalElement.querySelectorAll("input");

const sectionElement = document.getElementById("entry-text");

const clearMovieInput = () => {
	for (const element of inputElements) {
		element.value = "";
	}
};

const movies = [];

const deleteMovie = (movieId) => {
	//! Leave it, because movies is a const not let
	// const selectedMovie = movies.filter((movie) => movie.id === movieId);
	// console.log(selectedMovie);

	// const updatedMovies = movies.filter((movie) => movie.id !== movieId);
	// console.log(updatedMovies);
	// movies = [...updatedMovies];
	// console.log(movies);

	//! ALternative
	// let movieIndex = 0;
	// for (const movie of movies) {
	// 	if (movie.id === movieId) {
	// 		break;
	// 	}
	//	movieIndex++
	// }
	// movies.splice(movieIndex, 1); // number of items we want to remove

	const movieIndex = movies.findIndex((movie) => movie.id === movieId);
	console.log(movies[movieIndex]);

	if (movieIndex !== -1) {
		movies.splice(movieIndex, 1); // Modifies array by removing the item based on it's index
	}
	console.log(movies);

	const movieListElement = document.getElementById("movie-list");

	//! Two ways of removing an Element (Child)
	// movieListElement.children[movieIndex].remove(); // Newer method
	movieListElement.removeChild(movieListElement.children[movieIndex]); // Old way
};

const deleteMovieHandler = (movieId) => {
	const deleteMovieModal = document.getElementById("delete-modal");
	deleteMovieModal.classList.add("visible"); // toggle doesn't make sense
	toggleBackDrop();
	// deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imgUrl, rating) => {
	const newMovieElement = document.createElement("li");
	newMovieElement.className = "movie-element";
	newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imgUrl}" alt="${title}"/>
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;

	newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));

	const movieListElement = document.getElementById("movie-list");
	movieListElement.appendChild(newMovieElement);
};

const updateUI = () => {
	if (movies.length === 0) {
		sectionElement.style.display = "block";
	} else {
		sectionElement.style.display = "none";
	}
};
//! addBackdrop
const toggleBackDrop = () => {
	backdropElement.classList.toggle("visible");
};

const showBackdrop = () => {
	backdropElement.classList.add("visible");
};

const closeBackdrop = () => {
	backdropElement.classList.remove("visible");
};

const closeMovideModal = () => {
	addMovieModalElement.classList.remove("visible");
	closeBackdrop();
};
const showMovieModal = () => {
	addMovieModalElement.classList.add("visible");
	showBackdrop();
};

const cancelAddMovieHandler = () => {
	closeMovideModal();
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
		id: Math.random().toString(),
		title: titleValue,
		img: imgUrlValue,
		rating: ratingValue,
	};
	movies.push(newMovie);
	console.log(movies);

	closeMovideModal();

	clearMovieInput();
	renderNewMovieElement(
		newMovie.id,
		newMovie.title,
		newMovie.img,
		newMovie.rating
	);
	updateUI();
};

const backdropClickHandler = () => {
	closeMovideModal();
};

startAddMovieBtnElement.addEventListener("click", showMovieModal);
cancelAddMovieBtnElement.addEventListener("click", cancelAddMovieHandler);
backdropElement.addEventListener("click", backdropClickHandler);
confirmAddMovieBtnElement.addEventListener("click", addMovieHandler);
