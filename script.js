const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
searchForm.addEventListener("submit", (e) => {
	e.preventDefault();
	searchQuery = e.target.querySelector("input")
		.value;
	fetchAPI();
});

async function fetchAPI() {
	const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=4132aef7&app_key=b298b6b797df45bce7f22d55c2f71c28&from=0&to=20`;
	const response = await fetch(baseURL);
	const data = await response.json();
	generateHTML(data.hits);
	console.log(data);
}

function generateHTML(results) {
	container.classList.remove("initial");
	let generatedHTML = "";
	results.map((result) => {
		generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h3 class="title">${result.recipe.label}</h3>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
      </div>
    `;
	});
	searchResultDiv.innerHTML = generatedHTML;
}