let titleH1;
let episode;
let releaseDate;
let director;
let characterList = [];
let planetList = []
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  titleH1 = document.querySelector('h1#title');
  episode = document.querySelector('span#episode');
  releaseDate = document.querySelector('span#relDate');
  director = document.querySelector('span#director');
  charactersUL = document.querySelector('#characters>ul');
  planetsUL = document.querySelector('#planets>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
  let film;
  try {
    film = await fetchFilm(id)
    film.characters = await fetchCharacters(film)
    film.planets = await fetchPlanets(film)
  }
  catch (ex) {
    console.error(`Error reading film ${id} data.`, ex.message);
  }
  renderFilm(film);

}
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(film) {
  const url = `${baseUrl}/films/${id}/characters`;
  const charactersFetchedFromFilm = await fetch(url)
    .then(res => res.json())
    charactersList.push(...charactersFetchedFromFilm)
  return characterList;
}

async function fetchPlanets(character) {
  const url = `${baseUrl}/films/${id}/planets`;
  const planetsFetchedFromFilm = await fetch(url)
    .then(res => res.json())
    planetList.push(...planetsFetchedFromFilm)
  return planetList;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.name}`;  // Just to make the browser tab say their name
  titleH1.textContent = film?.title;
  episode.textContent = film?.episode_id;
  releaseDate.textContent = film?.release_date;
  director.textContent = film?.director;
  const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.title}</li>`)
  charactersUL.innerHTML = charactersLis.join("");
  const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.title}</li>`)
 planetsUL.innerHTML = planetsLis.join("");
}
