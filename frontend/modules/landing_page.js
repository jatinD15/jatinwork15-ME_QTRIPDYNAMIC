import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  console.log("From init()");
  console.log(config.backendEndpoint);

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint +"/cities");
    let cities = await res.json();
    return cities;
  } catch (error) {
    return null;
  }
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let renderData = document.getElementById("data");
  renderData.innerHTML += 
  `<div class="col-sm-6 col-lg-3 mb-4">
  <a id="${id}" href="pages/adventures/?city=${id}" target="_blank">
    <div class="tile">
      <img src="${image}" alt="bengaluru"/>
      <div class="tile-text">
        <h4>${city}</h4>
        <p>${description}</p>
      </div>
    </div>
  </a>
  </div>`

}

export { init, fetchCities, addCityToDOM };
