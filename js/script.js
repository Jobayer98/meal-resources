const loadData = (st) => {
  searchText = st || " ";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals.slice(0, 6)));
};

const displayMeals = (meals) => {
  document.getElementById("search_meal").value = "";

  const card_container = document.getElementById("card_container");
  card_container.innerHTML = "";
  meals.forEach((meal) => {
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
                src="${meal.strMealThumb}"
                alt="Movie"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-[#403F3F] text-2xl font-bold">
               ${meal.strMeal}
              </h2>
              <p class="text-[#706F6F] text-sm lg:text-md">
                ${meal.strInstructions.slice(0, 100) + "..."}
              </p>
              <div class="card-actions justify-start">
                <a class="text-[#FFC107] text-[18px] underline font-bold" href="#"
                  >View Details</a
                >
              </div>
            </div>
    `;
    card_container.appendChild(card);
  });
};

const searchMeal = () => {
  const searchKey = document.getElementById("search_meal");
  const searchValue = searchKey.value;

  loadData(searchValue);
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

loadData();
