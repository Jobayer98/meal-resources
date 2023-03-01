const loadData = async (arg) => {
  searchText = arg || " ";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

const loadDataUsingCat = async () => {
  const data = await loadData();
  displayMeals(data.meals.slice(0, 6));
};

const displayMeals = (meals) => {
  document.getElementById("search_meal").value = "";

  const card_container = document.getElementById("card_container");
  card_container.innerHTML = "";
  meals.forEach((meal) => {
    // console.log(meal);
    const { idMeal, strMeal, strMealThumb, strInstructions } = meal;
    const card = document.createElement("div");
    card.classList.add(
      "card",
      "card-side",
      "bg-base-100",
      "shadow-inner",
      "border-[1px]",
      "border-slate-200",
      "h-[260px]",
      "rounded-md"
    );
    card.innerHTML = `
            <figure class="w-[150%] lg:w-[120%]">
              <img
                class="h-full rounded-md"
                src="${strMealThumb}"
                alt="Movie"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-[#403F3F] text-xl font-bold">
               ${strMeal}
              </h2>
              <p class="text-[#706F6F] text-sm lg:text-md">
                ${strInstructions.slice(0, 100) + "..."}
              </p>
              <div class="card-actions justify-start">
                <label onclick="showModal(${idMeal})" for="my-modal" class="btn btn-warning font-bold normal-case">View Details</label>
              </div>
            </div>
    `;
    card_container.appendChild(card);
  });
};

const loadDataUsingId = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

const showModal = async (mealId) => {
  const data = await loadDataUsingId(mealId);
  const {
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    strInstructions,
    strYoutube,
  } = data.meals[0];
  const modalContainer = document.querySelector(".modal");
  modalContainer.innerHTML = "";

  const modalBox = document.createElement("div");
  modalBox.classList.add("modal-box");

  modalBox.innerHTML = `
          <h3 class="font-bold text-xl">
            ${strMeal}
          </h3>
          <hr>
          <figure class="">
              <img
                class="h-full rounded-md"
                src="${strMealThumb}"
                alt="Movie"
              />

          <p class="py-4">
            <span class="text-lg font-semibold">Category: </span>${strCategory}
          </p>
          <p class="py-4">
            <span class="text-lg font-semibold">Area: </span>${strArea}
          </p>
          <p class="py-4">
            <span class="text-lg font-semibold">Instructions: </span>${strInstructions}
          </p>
          <p class="py-4">
            <span class="text-lg font-semibold">Youtube: </span>${strYoutube}
          </p>

          <div class="modal-action">
            <label for="my-modal" class="btn normal-case bg-[#DC3545] text-slate-100 border-none">Close</label>
          </div>
  `;
  modalContainer.appendChild(modalBox);
};

const searchMeal = async () => {
  const searchKey = document.getElementById("search_meal");
  const searchValue = searchKey.value;

  try {
    const data = await loadData(searchValue);
    displayMeals(data.meals.slice(0, 6));
  } catch (e) {
    console.log(e);
  }
};

const seeAllMeal = async () => {
  document.getElementById("seeAll").style.display = "none";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    displayMeals(data.meals);
  } catch (e) {
    console.log(e);
  }
};

loadDataUsingCat();
