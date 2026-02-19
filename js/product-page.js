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


    const filteredProducts = allProducts.filter((product) =>
        (product.title).toLowerCase().includes(searchTerm) ||
        (product.description).toLowerCase().includes(searchTerm)
    );

    renderProducts(filteredProducts);
});

// Filter functionality
const filterBtn = document.getElementById("filter-btn");
const filters = document.getElementById("filters");
const breadcrump = document.getElementById("breadcrump");
const filterBreadcrum = document.createElement("p");

filterBtn.addEventListener("click", () => {
    filters.classList.toggle("visually-hidden");
    filterBtn.classList.toggle("active");
});

const filterMens = document.getElementById("filter-mens");
const filterWomens = document.getElementById("filter-womens");
const filterBlack = document.getElementById("filter-black");
const filterGreen = document.getElementById("filter-green");
const filterGray = document.getElementById("filter-gray");
const filterBlue = document.getElementById("filter-blue");
const filterRed = document.getElementById("filter-red");
const filterYellow = document.getElementById("filter-yellow");

filterMens.addEventListener("click", () => {
    const filteredProducts = allProducts.filter((product) => (product.gender).toLowerCase() === "male");
    renderProducts(filteredProducts);

    filterBreadcrum.textContent = "";
    filterBreadcrum.textContent = ">Mens"; 
    breadcrump.appendChild(filterBreadcrum);
});

filterWomens.addEventListener("click", () => {
    const filteredProducts = allProducts.filter((product) => (product.gender).toLowerCase() === "female");    
    renderProducts(filteredProducts);

    filterBreadcrum.textContent = "";
    filterBreadcrum.textContent = ">Womens"; 
    breadcrump.appendChild(filterBreadcrum);
});

filterBlack.addEventListener("click", () => {
    const filteredProducts = allProducts.filter((product) => (product.baseColor).toLowerCase() === "black");
    renderProducts(filteredProducts);

    filterBreadcrum.textContent = "";
    filterBreadcrum.textContent = ">Filter: Black"; 
    breadcrump.appendChild(filterBreadcrum);
});

filterGray.addEventListener("click", () => {
    const filteredProducts = allProducts.filter((product) => (product.baseColor).toLowerCase() === "gray");
    renderProducts(filteredProducts);

    filterBreadcrum.textContent = "";
    filterBreadcrum.textContent = ">Filter: Gray"; 
    breadcrump.appendChild(filterBreadcrum);
});

filterBlue.addEventListener("click", () => {
    const filteredProducts = allProducts.filter((product) => (product.baseColor).toLowerCase() === "blue");
    renderProducts(filteredProducts);

    filterBreadcrum.textContent = "";
    filterBreadcrum.textContent = ">Filter: Blue"; 
    breadcrump.appendChild(filterBreadcrum);
});

filterRed.addEventListener("click", () => {
    const filteredProducts = allProducts.filter((product) => (product.baseColor).toLowerCase() === "red");
    renderProducts(filteredProducts);

    filterBreadcrum.textContent = "";
    filterBreadcrum.textContent = ">Filter: Red"; 
    breadcrump.appendChild(filterBreadcrum);
});

filterYellow.addEventListener("click", () => {
    const filteredProducts = allProducts.filter((product) => (product.baseColor).toLowerCase() === "yellow");
    renderProducts(filteredProducts);

    filterBreadcrum.textContent = "";
    filterBreadcrum.textContent = ">Filter: Yellow";
    breadcrump.appendChild(filterBreadcrum);
});

filterGreen.addEventListener("click", () => {
    const filteredProducts = allProducts.filter((product) => (product.baseColor).toLowerCase() === "green");
    renderProducts(filteredProducts);

    filterBreadcrum.textContent = "";
    filterBreadcrum.textContent = ">Filter: Green";
    breadcrump.appendChild(filterBreadcrum);
});

fetchProducts();