const loadData = (st) => {
  searchText = st || " ";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals.slice(0, 6)));
};

const displayMeals = (meals) => {
  const card_container = document.getElementById("card_container");
  meals.forEach((meal) => {
    console.log(meal);
    const card = document.createElement("div");
    card.classList.add(
      "card",
      "card-side",
      "bg-base-100",
      "shadow-inner",
      "border-[1px]",
      "border-slate-200",
      "h-[260px]"
    );
    card.innerHTML = `
            <figure>
              <img
                class="h-full rounded-lg"
                src="${meal.strMealThumb}"
                alt="Movie"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-[#403F3F] text-2xl font-bold">
               ${meal.strMeal}
              </h2>
              <p class="text-[#706F6F]">
                Click the button to watch on Jetflix app.
                Click the button to watch on Jetflix app.
              </p>
              <div class="card-actions justify-end">
                <a class="text-[#FFC107] text-[18px] underline" href="#"
                  >View Details</a
                >
              </div>
            </div>
    `;
    card_container.appendChild(card);
  });
};

loadData();
