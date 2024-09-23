const baseUrl = 'https://api.themoviedb.org/3/movie/'
const movieSection = document.getElementById('movie-list');

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ODliYzFlM2U0M2ZmNzBmYmE3ZDBlZTBmZTFmOTE2ZCIsIm5iZiI6MTcyNjc0NDc4MC4zNjg2NzUsInN1YiI6IjY2ZWJmMDgzOWJkNDI1MDQzMDc0ODlkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IQrFD99oC24gusjwDOW8oRHUTlhjdA-ns7ZIk-x9K4w`,
    },
};


const showMovies = (endPoint) => {
    fetch(`${baseUrl}${endPoint}?language=en-US&page=1`, options)
        .then((response) => response.json())
        .then((data) => {
        console.log(data.results);

        movieSection.innerHTML = "";

        data.results.forEach((movie) => {
            const movieArticle = document.createElement("article");
            movieArticle.classList.add("movie");
            movieArticle.innerHTML = `
                <h2>${movie.title}</h2>
                <div class="movie-content">
                    <img class="movie-poster" src="https://image.tmdb.org/t/p/w200${movie.poster_path} alt="Movie poster grid-area="poster">
                    <div class="movie-text" grid-area="text">
                        <p>${movie.overview}</p>
                        <p><b>Original title: </b>${movie.original_title}</p>
                        <p><b>Release date: </b>${movie.release_date}</p>
                    </div>
                </div>
            `;
            movieSection.appendChild(movieArticle);
        });
    })
    .catch((err) => console.error(err));
};


const navLinks = document.querySelectorAll(
    "#now-playing, #popular, #top-rated, #upcoming"
);

navLinks.forEach((element) => {
    element.addEventListener("click", function () {
        navLinks.forEach((el) => el.classList.remove("active"));

        this.classList.add("active");

        if (this.id === "now-playing") {
            showMovies("now_playing");
        } else if (this.id === "popular") {
            showMovies("popular");
        } else if (this.id === "top-rated") {
            showMovies("top_rated");
        } else if (this.id === "upcoming") {
            showMovies("upcoming");
        }
    });
});

showMovies("now_playing");



