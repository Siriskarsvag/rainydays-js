// fetch product details based on the id from the URL query parameters
// breaking down the url parameters to get the id of the product we want to display details for
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const productURL = `https://v2.api.noroff.dev/rainy-days/${id}`;

let currentProduct = null; 

// function to fetch and display product details
async function getProductDetails() {
    const productImage = document.getElementById("product-images");
    const productPrice = document.getElementById("product-price");
    const productDetails = document.getElementById("product-description");
    const sizeBtnContainer = document.getElementById("size-btn-container");
    const productOptions = document.getElementById("options-section");
    const breadcrumpDetail = document.getElementById("breadcrump-detail");

    try {
        const response = await fetch(productURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const product = result.data;

        currentProduct = product;

        // Update product details
        productImage.innerHTML = `
            <img src="${product.image.url}" alt="${product.image.alt}" />`;
        productOptions.querySelector("h2").textContent = product.title;
        sizeBtnContainer.innerHTML = product.sizes.map(size => `
            <button class="size-button" data-size="${size}">${size}</button>
        `).join("");
        productPrice.textContent = `${product.price},-`;
        productDetails.textContent = product.description;
        breadcrumpDetail.textContent = `Product details: ${product.title}`.toUpperCase();

    } catch (error) {
        console.error("Error fetching product details:", error);
        productImage.innerHTML = "<p>Failed to load product details. Please try again later.</p>";
        productPrice.textContent = "";
        productDetails.textContent = "";
        sizeBtnContainer.innerHTML = "";
        productOptions.querySelector("h2").textContent = "Product not found";
        breadcrumpDetail.textContent = "Product not found";
    }
}

getProductDetails();

let selectedSize = null;

// Event delegation for size buttons
document.getElementById("size-btn-container").addEventListener("click", function(event) {
    if (event.target.classList.contains("size-button")) {
        document.querySelectorAll(".size-button").forEach(button => {
            button.classList.remove("is-selected");
        });

        event.target.classList.add("is-selected");

        selectedSize = event.target.getAttribute("data-size");
    }
});

const addToCartBtn = document.getElementById("add-to-cart-btn");

addToCartBtn.addEventListener("click", async () => {
    if (!selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
    }

    addToCart({
        id: currentProduct.id,
        title: currentProduct.title,
        price: currentProduct.price,
        image: {
            url: currentProduct.image.url,
            alt: currentProduct.image.alt
        },
        size: selectedSize,
        quantity: 1,
    });
    
    alert(`${currentProduct.title} (Size: ${selectedSize}) has been added to your cart.`);
});