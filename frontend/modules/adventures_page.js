
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  
  //params is an obj
  // let obj = new URLSearchParams(search)
    const params = new URLSearchParams(search);
    let city = params.get('city');
  //const url = new URL(window.location.search);
  //const params = new URLSearchParams(url.search);

  //const urlParams = new URLSearchParams(window.location.search);
  //var cityName = urlParams.get('city');
  //return cityName;

  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint+"/adventures?city="+city);
    let adventures = await res.json();
    return adventures;
  } catch (error) {
      return null;
  }

  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  let cardData = document.getElementById("data");

  adventures.forEach(ele => {
    cardData.innerHTML += 
    `<div class="col-6 col-md-3 mb-4">
      <a id="${ele.id}" href="detail/?adventure=${ele.id}" target="_blank">
        
        <div class="activity-card">
          <h5 class="category-banner">${ele.category}</h5>
          <img src="${ele.image}" alt="${ele.name}"/>
           
            <div class="d-flex justify-content-between w-100">
              <h5 class="p-1">${ele.name}</h5>
              <p class="p-1">₹ ${ele.costPerHead}</p>
            </div>
            <div class="d-flex justify-content-between align-items-center w-100">
              <h5 class="p-1">Duration</h5>
              <p class="p-1">${ele.duration} hours</p>
            </div>
        </div>
      </a>
    </div>
    `
  });

 // return null;
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let newArray = list.filter(ele => {
    if((ele.duration >=low) && (ele.duration<=high)){
      return ele;
    }
  });
  return newArray;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let arrayNew = [];
  categoryList.forEach(eleCat => {
    let arr1 = list.filter(eleList => {
      if(eleList.category === eleCat){
        return eleList;
      }
    })
    arr1.forEach(val => {
      arrayNew.push(val);
    })
  })

  return arrayNew;
  
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if((filters.duration === "")  && (filters.category.length !== 0)){
    let arr1 = [];
    filters.category.forEach(ele1 => {
      arr1.push(ele1);
    })
    let listCategory = filterByCategory(list, arr1);
    return listCategory;
    
  }
  else if((filters.duration !== "")  && (filters.category.length === 0)){
    const arr2 = (filters.duration).split("-");
    let listDuration = filterByDuration(list, arr2[0], arr2[1]);
    return listDuration;
  }
  else if((filters.duration !== "")  && (filters.category.length !== 0)){
    let filteredList = filterByCategory(list, filters.category)
    const arr2 = (filters.duration).split("-");
    let filteredList2 = filterByDuration(filteredList, arr2[0], arr2[1]);

    return filteredList2;
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filterSelected = JSON.parse(localStorage.getItem("filters"));

  // Place holder for functionality to work in the Stubs
  return filterSelected;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let selectedCategoryFilter = document.getElementById("category-list");
  let {category : CategoryList} = filters;
  CategoryList.forEach( category => {
    selectedCategoryFilter.innerHTML += 
    `<div class="category-filter">${category}</div>`;
  });
 
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
