const apiURL = "https://v2.api.noroff.dev/rainy-days";

async function getProduct(id) {
    const productSection = document.getElementById("product-section");

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const products = result.data; 

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img
                    src="${product.image.url}"
                    alt="${product.title}"
                /> 
                <a href="product-page.html?id=${product.id}">
                  <p class="overlay">View details</p>
                </a>
                <div class="product-card-footer">
                    <div class="product-footer-text">
                        <h3>${product.title}</h3>
                        <p>${product.price}</p>
                    </div>
                    <div class="product-footer-icons">
                        <img src="images/icons/9024571_heart_straight_light_icon.png" alt="like icon"/>
                        <img src="images/icons/9025031_tote_light_icon.png" alt="add to cart icon"/>'
                    </div>
                </div>
            `;
            productSection.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching product data:", error);
        productSection.innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
}

getProduct();