const load = document.getElementById("loading");
load.textContent = "Loading.....";

const loadData = (st) => {
  searchText = st || " ";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals.slice(0, 6)));
};

const displayMeals = (meals) => {
  // document.getElementById("search_meal").value = "";
  load.textContent = "";
  const container = document.getElementById("card-container");
  container.innerText = "";

  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card bg-base-100 shadow-xl rounded-md">
      <figure>
        <img id="card_img" src=${meal.strMealThumb} alt=${meal.strMeal} />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Name: ${meal.strMeal}</h2>
        <p>Category: ${meal.strCategory}</p>
        <p>Area: ${meal.strArea}</p>
        <label for="my-modal" class="btn btn-primary mt-2">Details</label>
        <input type="checkbox" id="my-modal" class="modal-toggle" />
        <div id="modal" class="modal">
            <div id="box" class="modal-box">
              <figure>
                <img id="modal_img" src=${meal.strMealThumb} alt=${
      meal.strMeal
    } />
              </figure>
              <h3 class="font-bold text-lg mt-2">Name: ${meal.strMeal}</h3>
              <p class="py-1">
                Category: ${meal.strCategory}
              </p>
              <p class="py-1">Area: ${meal.strArea}</p>
              <p class="py-1">Instructions: ${
                meal.strInstructions.slice(0, 200) + "..."
              }</p>
              <div class="modal-action">
                <label for="my-modal" class="btn">Close</label>
              </div>
            </div>
        </div>
      </div>
    </div>`;
    container.appendChild(card);
  });
};

// const search_value = document.getElementById("search_meal");
// search_value.addEventListener("keyup", (e) => {
//   loadData(e.target.value);
// });

const searchMeal = () => {
  const s_value = document.getElementById("search_meal").value;
  loadData(s_value);

  return s_value;
};

const seeAllMeal = (searchText = " ") => {
  searchText = searchMeal();

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));

  document.getElementById("showAll").style.display = "none";
};

loadData();
