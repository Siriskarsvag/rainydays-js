function clearCart() {
    localStorage.removeItem("cart");
}

function getProductSummary() {
    const cart = getCart();

    return cart.reduce((sum, item) => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 0;
        return sum + price * quantity;
    }, 0);
}

function generateOrderNumber() {
    const datePart = new Date().toISOString().slice(0, 10).replaceAll("-", "");
    const randomPart = Math.floor(100000 + Math.random() * 900000);
    return `ORD-${datePart}-${randomPart}`;
}

function saveLastOrder(order) {
    localStorage.setItem("lastOrder", JSON.stringify(order));
}



// DOM elements
const orderItemsElement = document.getElementById("order-items");
const productSummaryElement = document.getElementById("product-summary");
const shippingSummaryElement = document.getElementById("shipping-summary");
const totalElement = document.getElementById("total");
const orderNowButton = document.getElementById("order-btn");

const emailInput = document.getElementById("email");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const postalCodeInput = document.getElementById("postalCode");
const countryInput = document.getElementById("country");
const phoneInput = document.getElementById("phone");
const cardNumberInput = document.getElementById("cardnumber");
const cardHolderInput = document.getElementById("cardholder");
const expirationDateInput = document.getElementById("experationDate");
const cvcInput = document.getElementById("cvc");

// Render order overview
function renderOrderItems(cart) {
    if (cart.length === 0) {
        orderItemsElement.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    orderItemsElement.innerHTML = cart.map((item) => {
        const imgSrc = item?.image?.url || "";
        const imgAlt = item?.image?.alt || "Product image";
        const size = item.size ? 'Size: ' + item.size : "";
        const quantity = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;

        return `
            <div class="product-chosen">
                <img src="${imgSrc}" alt="${imgAlt}"/>
                <h4>${item.title}</h4>
                <p>${item.quantity}</p>
                <h6>${(price * quantity).toFixed(2)},-</h6>
            </div>
        `; 
    }).join("");
}

// shipping and total summary
let productTotal = getProductSummary();

productSummaryElement.textContent = `${productTotal.toFixed(2)},-`;

function getShippingCost() {
    const selectedShippingOption = document.querySelector('input[name="shipping-option"]:checked');
    return selectedShippingOption ? Number(selectedShippingOption.value) : 0;
}

function renderTotals() {
    const shippingCost = getShippingCost();

    if (shippingCost === 0) {
        shippingSummaryElement.textContent = "FREE";
    } else {
        shippingSummaryElement.textContent = `${shippingCost.toFixed(2)},-`;
    }

    const finalTotal = productTotal + shippingCost;
    totalElement.textContent = `${finalTotal.toFixed(2)},-`;
}

renderTotals();

const shippingButtons = document.querySelectorAll('input[name="shipping-option"]');

shippingButtons.forEach((radio) => {
    radio.addEventListener("change", renderTotals);
});

// Form validation and order processing
function markInvalid(inputElement, message) {
    if (!inputElement) return;
    inputElement.classList.add("is-invalid");

    inputElement.placeholder = message;
}

function clearValidation(inputElement) {
    if (!inputElement) return;
    inputElement.classList.remove("is-invalid");
    inputElement.placeholder = "";
}

function validateEmail() {
    if (!emailInput.value.includes("@")) {
        emailInput.value = "";
        markInvalid(emailInput, "Please enter a valid email address.");
        return false;
    } else {
        clearValidation(emailInput);
        return true;
    }
}

function validateRequired(inputElement, label) {
    const value = inputElement?.value?.trim() || "";
    if (!value) {
        markInvalid(inputElement, `${label} is required.`);
        return false;
    } else {
        clearValidation(inputElement);
        return true;
    }
}

function validateAll() {
    let isValid = true;

    [emailInput, firstNameInput, lastNameInput, addressInput, cityInput, postalCodeInput, countryInput, phoneInput, cardNumberInput, cardHolderInput, expirationDateInput, cvcInput].forEach(clearValidation);

    const cart = getCart();
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before placing an order.");
        isValid = false;
    }

    const selectedShippingOption = document.querySelector('input[name="shipping-option"]:checked');
    if (!selectedShippingOption) {
        alert("Please select a shipping option.");
        isValid = false;
    }

    isValid = validateRequired(firstNameInput, "First name") && isValid;
    isValid = validateRequired(lastNameInput, "Last name") && isValid;
    isValid = validateRequired(addressInput, "Address") && isValid;
    isValid = validateRequired(cityInput, "City") && isValid;
    isValid = validateRequired(postalCodeInput, "Postal code") && isValid;
    isValid = validateRequired(countryInput, "Country") && isValid;
    isValid = validateRequired(phoneInput, "Phone number") && isValid;
    isValid = validateRequired(cardNumberInput, "Card number") && isValid;
    isValid = validateRequired(cardHolderInput, "Cardholder name") && isValid;
    isValid = validateRequired(expirationDateInput, "Expiration date") && isValid;
    isValid = validateRequired(cvcInput, "CVC") && isValid;
    isValid = validateEmail() && isValid;

    return isValid;
}

// Initial render

function init() {
    const cart = getCart();
    renderOrderItems(cart);
    renderTotals(cart);

    document.querySelectorAll('input[name="shipping-option"]').forEach((radio) => {
        radio.addEventListener("change", () => renderTotals(cart));
    });


    if (orderNowButton) {
        orderNowButton.addEventListener("click", (e) => {
            e.preventDefault();
            if (!validateAll()) return;

            const cart = getCart();
            const orderNumber = generateOrderNumber();
            saveLastOrder({
                orderNumber,
                items: cart,
            });

            clearCart();

            window.location.href = "confirmation.html";
        });
    }
}

init();