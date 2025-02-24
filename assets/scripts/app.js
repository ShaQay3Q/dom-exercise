const addMovieBtn = document.querySelector("header button");

const backDrop = document.getElementById("backdrop");
const modal = document.querySelector(".modal");

addMovieBtn.addEventListener("click", () => {
	backDrop.classList.toggle("visible");
	modal.classList.toggle("visible");
});
