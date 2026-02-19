// functions
const CART_KEY = "cart";

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

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

function removeFromCart(id, size) {
    const cart = getCart().filter((item) => !(item.id === id && item.size === size)
    );
    saveCart(cart);
}

function setQuantity(id, size, quantity) {
    const cart = getCart();
    const item = cart.find((item) => item.id === id && item.size === size);
    if (!item) return;
    
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
}

function getTotal(cart) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { subtotal, total: subtotal };
}


// Render cart items on cart page

function renderCartItems() {
    const tableBody = document.getElementById("cart-items-body");
    const cart = getCart();

    if (!tableBody) return;

    tableBody.innerHTML = "";

    cart.forEach((item) => {
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
                    <button id="decrease">-</button>
                    <p>${item.quantity}</p>
                    <button id="increase">+</button>
                    <img 
                        src="images/icons/8664938_trash_can_delete_remove_icon.png"
                        alt="trashcan icon"
                        id="remove-product"
                    />
                </td>
                <td class="item-price">
                    <h4>${item.price * item.quantity},-</h4>
                </td>
            </tr>
        `;
    });
}

renderCartItems();