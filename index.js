let api
let moviesData

async function main(filter) {
   api = await fetch("https://www.omdbapi.com/?apikey=c510394&s=game");
   moviesData = await api.json();
   const movieListEl = document.querySelector(".movies");
   
   if(!api) {
    api = moviesData 
  }

  if (filter === "year__low-to-high") {
    moviesData.Search.sort((a, b) => a.Year.slice(0, 4) - b.Year.slice(0, 4));
  } else if (filter === "year__high-to-low") {
    moviesData.Search.sort((a, b) => b.Year.slice(0, 4) - a.Year.slice(0, 4));
  }

  moviesHTML = moviesData.Search.slice(0, 6)
    .map(
      (movie) => `<div class="search__results">
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
        </div>`
    )
    .join("");
  movieListEl.innerHTML = moviesHTML;
}

function filterMovies(event) {
  main(event.target.value);
}

setTimeout(() => {
  main();
}, 1000);
