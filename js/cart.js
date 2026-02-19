// Cart storage

function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Cart actions

function addToCart(product) {
    const cart = getCart();

    const existingProduct = cart.find(
        (item) => item.id === product.id && item.size === product.size
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            size: product.size,
            quantity: 1,
        });
    }

    saveCart(cart);
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
}

function setQuantity(index, quantity) {
    const cart = getCart();

    if (!cart[index]) return;

    const safeQuantity = Math.max(1, Number(quantity) || 1);
    cart[index].quantity = safeQuantity;
    saveCart(cart);
}

// Cart total

function getTotal(cart) {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function renderTotal() {
    const totalElement = document.getElementById("total");
    if (!totalElement) return;

    const cart = getCart();
    const total = getTotal(cart);

    totalElement.textContent = `${total},-`;
}

// Render cart items on cart page
function renderCart() {
    const tableBody = document.getElementById("cart-items-body");
    if (!tableBody) return;

    const cart = getCart();
    tableBody.innerHTML = "";

    if (cart.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='3'>Your cart is empty.</td></tr>";
        renderTotal();
        return;
    }

    cart.forEach((item, index) => {
        tableBody.innerHTML += `
            <tr>
                <td class="product-chosen">
                    <img src="${item.image.url}" alt="${item.image.alt}" class="cart-item-image"/>
                    <div>
                        <h4>${item.title}</h4>
                        <p>Size: ${item.size}</p>
                    </div>
                </td>
                <td class="item-quantity">
                    <button id="decrease" data-index="${index}" class="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button id="increase" data-index="${index}" class="increase">+</button>
                    <img 
                        src="images/icons/8664938_trash_can_delete_remove_icon.png"
                        alt="trashcan icon"
                        id="remove-product"
                        data-index="${index}"
                        class="remove-product"
                    />
                </td>
                <td class="item-price">
                    <h4>${item.price * item.quantity},-</h4>
                </td>
            </tr>
        `;
    });
    
    renderTotal();
}

// Events

document.addEventListener("click", (e) => {
    const tableBody = document.querySelector(".cart-items");
    if (!tableBody) return;

    const index = e.target.dataset.index;

    if (e.target.classList.contains("increase")) {
        const cart = getCart();
        if (!cart[index]) return;
    
        setQuantity(index, cart[index].quantity + 1);
        renderCart();
    }

    if (e.target.classList.contains("decrease")) {
        const cart = getCart();
        if (!cart[index]) return;

        const newQuantity = cart[index].quantity - 1;

        if (newQuantity <= 1) {
            removeFromCart(index);
        } else {
            setQuantity(index, newQuantity);
        }

        renderCart();
    }

    if (e.target.classList.contains("remove-product")) {
        removeFromCart(index);
        renderCart();
    }
});

renderCart();