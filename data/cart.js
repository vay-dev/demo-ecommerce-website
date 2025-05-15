export const cart = [];

// Update cart quantity
export function updateCartQuatity(productId, selectedQuantity) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    });
  }
}

// Calculate total quantity in cart and update display
export function calculateCartQuantity() {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerText = totalQuantity;
  return totalQuantity;
}

// Save cart to localStorage
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage on startup
const savedCart = JSON.parse(localStorage.getItem('cart'));
if (savedCart) {
  cart.push(...savedCart);
}
