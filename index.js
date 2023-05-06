const movieListEl = document.querySelector(".movies");

async function main(filter) {
  const movieName = document.getElementById("searchbar").value;
  const api = await fetch(
    `https://www.omdbapi.com/?apikey=c510394&s=${movieName}`
  );
  const moviesData = await api.json();

  if (filter === "year__old-to-new") {
    moviesData.Search.sort((a, b) => a.Year.slice(0, 4) - b.Year.slice(0, 4));
  } else if (filter === "year__new-to-old") {
    moviesData.Search.sort((a, b) => b.Year.slice(0, 4) - a.Year.slice(0, 4));
  }

  movieListEl.innerHTML = moviesData.Search.slice(0, 6)
    .map((movie) => moviesHTML(movie))
    .join("");
}

function moviesHTML(movie) {
  return `<div class="search__results">
  <img class="result__img" src="${movie.Poster}" />
  <div class="results__para--description">
    <p class="results__para"><span class="color__red">Title:</span><br><span class="color__white">${
      movie.Title
    }</span></p>
    <p class="results__para"><span class="color__red">Year:</span><br><span class="color__white">${movie.Year.slice(
      0,
      4
    )}</span></p>
    <p class="results__para"><span class="color__red">Type:</span><br><span class="color__white">${
      movie.Type
    }</span></p>
  </div>
</div>`;
}

function filterMovies(event) {
  main(event.target.value);
}

function searchMovies(event) {
  event.preventDefault();
  const movieName = document.getElementById("searchbar").value;
  const header = document.getElementById("search__result--header");
  const headerResult = `Search results for: "<span class="color__orange">${movieName}</span>"`;
  document.getElementById("filter").style.display = "flex";
  header.innerHTML = headerResult;
  main(movieName);
}
