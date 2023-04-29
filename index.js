const movieListEl = document.querySelector(".movies");
let moviesdata = [];

async function main(filter) {
  const api = await fetch("https://www.omdbapi.com/?apikey=c510394&s=game");
  moviesData = await api.json();

  if (filter === "year__old-to-new") {
    moviesData.Search.sort((a, b) => a.Year.slice(0, 4) - b.Year.slice(0, 4));
  } else if (filter === "year__new-to-old") {
    moviesData.Search.sort((a, b) => b.Year.slice(0, 4) - a.Year.slice(0, 4));
  }

  movieListEl.innerHTML = moviesData.Search.map((movie) =>
    moviesHTML(movie)
  ).join("");
}

function moviesHTML(movie) {
  return `<div class="search__results">
  <img class="result__img" src="${movie.Poster}" />
  <div class="results__para--description">
    <p class="results__para"><span class="color__red">Title</span><br>${
      movie.Title
    }</p>
    <p class="results__para"><span class="color__red">Year</span><br>${movie.Year.slice(
      0,
      4
    )}</p>
    <p class="results__para"><span class="color__red">Type</span><br>${
      movie.Type
    }</p>
  </div>
</div>`;
}

function filterMovies(event) {
  main(event.target.value);
}

function searchMovies(event) {
  event.preventDefault();
  const searchBar = document.getElementById("searchbar").value
  const filteredMovies = moviesData.Search.filter((movie) => {
    return movie.Title.includes(searchBar)
  })
  main(filteredMovies)
  console.log(filteredMovies)
}

setTimeout(() => {
  main();
}, 1000);
