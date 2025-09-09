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
