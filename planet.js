/* const sp = new URLSearchParams(window.location.search);
const id = sp.get('id');
let planet = [];

async function getPlanet() { 
	const film = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}`).then(res => res.json());
	const characters = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}/characters`).then(res => res.json());
    const planets = await fetch(`https://swapi2.azurewebsites.net/api/films/${id}/planets`).then(res => res.json());
    updateHTML(film, characters, planets);  // Update HTML after data is fetched
}

function updateHTML(film, characters, planets) {
    console.log(film);
    console.log(characters);
    console.log(planets);
    planet = planets[0];
 }
*/

let planetnameH1;
let climate;
let terrain;
let characterList = [];
let filmList = [];
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  planetnameH1 = document.querySelector('h1#name');
  climate = document.querySelector('span#climate');
  terrain = document.querySelector('span#terrain');
  charactersUL = document.querySelector('#characters>ul');
  filmsUL = document.querySelector('#films>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    planet.characters = await fetchCharacters(id)
    planet.films = await fetchFilms(id)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}

// replace all instances of character with planet
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchCharacters(id) {
  const url = `${baseUrl}/planets/${id}/characters`;
  const charactersFetchedFromFilm = await fetch(url)
    .then(res => res.json())
    characterList.push(...charactersFetchedFromFilm)
  return characterList;
}

async function fetchFilms(id) {
  const url = `${baseUrl}/planets/${id}/films`;
  const filmsFetchedFromPlanet = await fetch(url)
    .then(res => res.json())
    filmList.push(...filmsFetchedFromPlanet)
  return filmList;
}

const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  planetnameH1.textContent = planet?.name;
  climate.textContent = planet?.climate;
  terrain.textContent = planet?.terrain;
  //birthYearSpan.textContent = character?.birth_year;
  //homeworldSpan.innerHTML = `<a href="/planet.html?id=${character?.homeworld.id}">${character?.homeworld.name}</a>`;
  const characterLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  charactersUL.innerHTML = characterLis.join("");
  const filmsLis = planet?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  filmsUL.innerHTML = filmsLis.join("");
}
