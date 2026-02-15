// fetch product details based on the id from the URL query parameters
// breaking down the url parameters to get the id of the product we want to display details for
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// API endpoint for product details, using the extracted id
const productURL = `https://v2.api.noroff.dev/rainy-days/${id}`;

// function to fetch and display product details
async function getProductDetails(id) {
    const productImage = document.getElementById("product-images");
    const productPrice = document.getElementById("product-price");
    const productDetails = document.getElementById("product-description");
    const sizeBtnContainer = document.getElementById("size-btn-container");
    const productOptions = document.getElementById("options-section");

    try {
        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const product = result.data;

        // Update product details
        productImage.innerHTML = `
            <img src="${product.image.url}" alt="${product.image.alt}" />`;
        productOptions.querySelector("h2").textContent = product.title;
        sizeBtnContainer.innerHTML = product.sizes.map(size => `
            <button class="size-button">${size}</button>
        `).join("");
        productPrice.textContent = `${product.price},-`;
        productDetails.textContent = product.description;

    } catch (error) {
        console.error("Error fetching product details:", error);
        productImage.innerHTML = "<p>Failed to load product details. Please try again later.</p>";
        productPrice.textContent = "";
        productDetails.textContent = "";
        sizeBtnContainer.innerHTML = "";
        productOptions.querySelector("h2").textContent = "Product not found";
    }
}

// Calling the function to fetch and display product details
getProductDetails();