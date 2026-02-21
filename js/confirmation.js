function getLastOrder() {
    return JSON.parse(localStorage.getItem("lastOrder"));
}

const orderNumberElement = document.getElementById("order-number");
const lastOrder = getLastOrder();

if (orderNumberElement) {
    orderNumberElement.textContent = lastOrder?.orderNumber || "-";
}