const startAddMovieBtnElement = document.querySelector("header button");
const backdropElement = document.getElementById("backdrop");
const addMovieModalElement = document.getElementById("add-modal");
const cancelAddMovieBtnElement =
	addMovieModalElement.querySelector(".btn--passive");
const confirmAddMovieBtnElement =
	addMovieModalElement.querySelector(".btn--success");
const inputElements = addMovieModalElement.querySelectorAll("input");
const sectionElement = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const clearMovieInput = () => {
	for (const element of inputElements) {
		element.value = "";
	}
};

const movies = [];

//! addBackdrop
// const toggleBackDrop = () => {
// 	backdropElement.classList.toggle("visible");
// };

const showBackdrop = () => {
	backdropElement.classList.add("visible");
};

const closeBackdrop = () => {
	backdropElement.classList.remove("visible");
};

const closeMovieModal = () => {
	addMovieModalElement.classList.remove("visible");
};
const showMovieModalHandler = () => {
	addMovieModalElement.classList.add("visible");
	showBackdrop();
};

const closeMovieDeletionModal = () => {
	closeBackdrop();
	deleteMovieModal.classList.remove("visible");
};

const updateUI = () => {
	if (movies.length === 0) {
		sectionElement.style.display = "block";
	} else {
		sectionElement.style.display = "none";
	}
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

	newMovieElement.addEventListener(
		"click",
		startsDeleteMovieHandler.bind(null, id)
	);

	const movieListElement = document.getElementById("movie-list");
	movieListElement.appendChild(newMovieElement);
};

const deleteMovieHandler = (movieId) => {
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

	if (movieIndex !== -1) {
		movies.splice(movieIndex, 1); // Modifies array by removing the item based on it's index
	}

	// const movieListElement = document.getElementById("movie-list");

	// // if (movieListElement && movieListElement.children[movieIndex]) {
	// //! Two ways of removing an Element (Child)
	// movieListElement.children[movieIndex].remove(); // Newer method
	// // movieListElement.removeChild(movieListElement.children[movieIndex]); // Old way
	// // }

	// Re-render the entire movie list
	const movieListElement = document.getElementById("movie-list");
	movieListElement.innerHTML = ""; // Clear the current movie list
	movies.forEach((movie) => {
		renderNewMovieElement(movie.id, movie.title, movie.img, movie.rating); // Re-render all movies
	});

	closeMovieDeletionModal();
	updateUI();
};

const startsDeleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add("visible"); // toggle doesn't make sense
	showBackdrop();

	const cancelDeletionBtn = deleteMovieModal.querySelector(".btn--passive");
	let confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

	// Way around removing eventListiner were .bind() is being used
	const newConfirmDeletionBtn = confirmDeletionBtn.cloneNode(true);
	confirmDeletionBtn.replaceWith(newConfirmDeletionBtn);
	// swap
	confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

	// Remove previous event listeners to prevent multiple deletions
	//! cannot be done for functions.bind => new object
	cancelDeletionBtn.removeEventListener("click", closeMovieDeletionModal);
	cancelDeletionBtn.addEventListener("click", closeMovieDeletionModal);

	confirmDeletionBtn.addEventListener(
		"click",
		deleteMovieHandler.bind(null, movieId)
	);
};

const cancelAddMovieHandler = () => {
	closeMovieModal();
	closeBackdrop();
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

	closeMovieModal();

	clearMovieInput();
	renderNewMovieElement(
		newMovie.id,
		newMovie.title,
		newMovie.img,
		newMovie.rating
	);
	closeBackdrop();

	updateUI();
};

const backdropClickHandler = () => {
	closeMovieModal();
	closeMovieDeletionModal();
	clearMovieInput();
};

startAddMovieBtnElement.addEventListener("click", showMovieModalHandler);
cancelAddMovieBtnElement.addEventListener("click", cancelAddMovieHandler);
backdropElement.addEventListener("click", backdropClickHandler);
confirmAddMovieBtnElement.addEventListener("click", addMovieHandler);
