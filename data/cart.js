export const cart = [];

export function updateCartQuatity(productId, selectedQuantity) {
  let matchingItem = cart.find(cartItem => cartItem.productId === productId)

  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
      deliveryOptionId: '1'
    })
  }

}

export function calculateCartQuantity() {
  let totalQuantity = 0 
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;

    return totalQuantity;
  })

  document.querySelector('.js-cart-quantity').innerText = totalQuantity;

  return totalQuantity;
}

function saveToStorage() {

}

const savedCart = JSON.parse(localStorage.getItem('cart'));
  if (savedCart) {
    cart.push(savedCart);
  }