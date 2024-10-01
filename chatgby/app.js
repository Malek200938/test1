// Get DOM elements
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const totalPriceElement = document.querySelector('.total-price');
const checkoutButton = document.querySelector('.checkout');

let cart = []; // Initialize an empty cart

// Function to add product to cart
function addToCart(event) {
    const productElement = event.target.closest('.product');
    const productId = productElement.dataset.id;
    const productName = productElement.dataset.name;
    const productPrice = parseFloat(productElement.dataset.price);

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    updateCart();
}

// Function to update cart UI
function updateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity} 
                              <button class="remove-item" data-id="${item.id}">Remove</button>`;
        cartItemsContainer.appendChild(listItem);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(event) {
    const productId = event.target.dataset.id;
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Add event listeners
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-item')) {
        removeFromCart(event);
    }
});

// Checkout functionality
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = [];
        updateCart();
    }
});
