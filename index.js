async function main() {
  const movies = await fetch("https://www.omdbapi.com/?apikey=c510394&s=game");
  const moviesData = await movies.json();
  const movieListEl = document.querySelector(".movies");
  console.log(moviesData);
  movieListEl.innerHTML = moviesData.Search.slice(0,6).map(
    (movie) => `<div class="search__results">
          <img class="result__img" src="${movie.Poster}" />
          <div class="results__para--description">
            <p class="results__para"><span class="color__red">Title</span><br>${movie.Title}</p>
            <p class="results__para"><span class="color__red">Year</span><br>${movie.Year}</p>
            <p class="results__para"><span class="color__red">Type</span><br>${movie.Type}</p>
          </div>
        </div>`
  ).join("");
}

main();
