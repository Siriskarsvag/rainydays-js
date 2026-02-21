// API endpoint for fetching the list of products
const apiURL = "https://v2.api.noroff.dev/rainy-days";
let allProducts = []; // Store all products for search functionality


const productSection = document.getElementById("product-section");
const searchInput = document.getElementById("search-input");

function renderProducts(products) { 
    productSection.innerHTML = "<p>Loading products...</p>";
    productSection.innerHTML = " ";

    if (products.length === 0) {
        productSection.innerHTML = "<p>No products found.</p>";
    }

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img
                src="${product.image.url}"
                alt="${product.image.alt}"
            /> 
            <a href="product-details.html?id=${product.id}">
              <p class="overlay">View details</p>
            </a>
            <div class="product-card-footer">
                <div class="product-footer-text">
                    <h3>${product.title}</h3>
                    <p>${product.price},-</p>
                </div>
                <div class="product-footer-icons">
                    <img src="images/icons/9024571_heart_straight_light_icon.png" alt="like icon"/>
                </div>
            </div>
        `;

        productSection.appendChild(productCard);
    });
}

async function fetchProducts() {
    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const results = await response.json();
        allProducts = results.data; 
        renderProducts(allProducts);

    } catch (error) {
        console.error("Error fetching products:", error);
        productSection.innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
}

// Search functionality
searchInput.addEventListener("input", (event) => {
    event.preventDefault();

    const searchTerm = event.target.value.toLowerCase().trim();


    const searchedProducts = allProducts.filter((product) =>
        (product.title).toLowerCase().includes(searchTerm) ||
        (product.description).toLowerCase().includes(searchTerm)
    );

    renderProducts(searchedProducts);
});

// Filter functionality
const filterBtn = document.getElementById("filter-btn");
const filtersElement = document.querySelector(".filters");

filterBtn.addEventListener("click", (event) => {
    event.preventDefault();

    filtersElement.classList.toggle("visually-hidden");
    filterBtn.classList.toggle("active");
});

const filters = { gender: null, baseColor: null };

filtersElement.addEventListener("change", (event) => {
    event.preventDefault();

    const btn = event.target.closest("[data-filter]");
    if (!btn) return;

    const key = btn.dataset.filter;
    const value = btn.dataset.value;

    filters[key] = value;

    const filteredProducts = allProducts.filter(product => {
        const genderFilter = !filters.gender || (product.gender || "").toLowerCase() === filters.gender;
        const colorFilter = !filters.baseColor || (product.baseColor || "").toLowerCase() === filters.baseColor;
        return genderFilter && colorFilter;
    });

    renderProducts(filteredProducts);
});

fetchProducts();