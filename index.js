const categoryContainer = document.getElementById("catagory-container");

// Load categories from API
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => {
            const categories = data.categories;
            showCategory(categories);
        })
        .catch((err) => {
            console.log(err);
        });
};

// Display categories in navbar
const showCategory = (categories) => {
    categoryContainer.innerHTML = "";
    categories.forEach((cat, index) => {
        categoryContainer.innerHTML += `
      <li id="${cat.id}" class="hover:bg-[#15803D] hover:text-white hover:rounded-[4px] hover:px-2.5 hover:py-2 mb-4 text-center ${index === 0 ? "active" : ""}">
        ${cat.category_name}
      </li>
    `;
    });

    // Load first category by default
    if (categories.length > 0) loadPlantByCategory(categories[0].id);

    // Handle click on categories
    categoryContainer.addEventListener("click", (e) => {
        const clickedLi = e.target.closest("li");
        if (!clickedLi) return;

        const allLi = document.querySelectorAll("#catagory-container li");
        allLi.forEach((li) => li.classList.remove("active"));
        clickedLi.classList.add("active");

        loadPlantByCategory(clickedLi.id);
    });
};

// Dummy function placeholder for loading plants
// Keep your existing loadPlantByCategory function here
const loadPlantByCategory = (id) => {
    console.log("Load plants for category ID:", id);
};

// Initialize navbar categories
loadCategory();
const plantNews = document.getElementById("card");

// Display plant cards
const plantDetails = (plants) => {
    plantNews.innerHTML = ""; // Clear previous cards

    plants.forEach((plant) => {
        plantNews.innerHTML += `
      <div id="${plant.id}" class="bg-white p-4 rounded-3xl">
        <div class="flex justify-center max-h-52">
          <img class="rounded-2xl" src="${plant.image}" alt="${plant.name}" />
        </div>

        <h4 onclick="loadPlantDetails(${plant.id})" class="font-semibold text-[18px] mb-8 mt-5">
          ${plant.name}
        </h4>

        <div class="max-h-24 mb-16">
          <p class="font-normal text-[12px] text-[#1F2937] mb-5">
            ${plant.description}
          </p>
        </div>

        <div class="flex justify-between items-center mb-3">
          <button class="bg-[#F0FDF4] text-[#15803D] py-3 px-5 rounded-4xl text-[14px] font-medium">
            Get Involved
          </button>
          <p class="text-[14px] font-semibold text-[#1F2937]">
            ৳<span>${plant.price}</span>
          </p>
        </div>

        <button onclick="addToCart('${plant.id}','${plant.name}','${plant.price}')"
          class="bg-[#15803D] text-white py-3 px-5 rounded-4xl text-[14px] font-medium w-full">
          Add to Cart
        </button>
      </div>
    `;
    });
};

// Example: load all plants (existing function in your code)
const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((data) => {
            plantDetails(data.data);
        });
};
