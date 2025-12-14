import { recipes } from "./recipes.js";

const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");

// Display recipes
function displayRecipes(recipeList) {
  recipeContainer.innerHTML = "";

  recipeList.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const stepsList = recipe.steps
      .map(step => `<li>${step}</li>`)
      .join("");

    card.innerHTML = `
      <img
        src="${recipe.image}"
        alt="${recipe.name}"
        width="300"
        height="200"
      >
      <h3>${recipe.name}</h3>
      <ol>${stepsList}</ol>
    `;

    recipeContainer.appendChild(card);
  });
}

// Filter logic
function filterRecipes() {
  const searchText = searchInput.value.toLowerCase();
  const selectedType = typeFilter.value;

  let filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchText);
    const matchesType = selectedType === "all" || recipe.type === selectedType;
    return matchesSearch && matchesType;
  });

  displayRecipes(filteredRecipes);
}

// Event listeners
searchInput.addEventListener("input", filterRecipes);
typeFilter.addEventListener("change", filterRecipes);

// Initial load
displayRecipes(recipes);