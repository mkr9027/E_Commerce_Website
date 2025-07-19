// Load cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setupAddToCartButtons();
  });
  
  // Add event listeners to all "Add to Cart" buttons
  function setupAddToCartButtons() {
    const buttons = document.querySelectorAll(".btn.btn-primary.btn-sm");
  
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const card = button.closest('.card-body');
        const name = card.querySelector(".card-title").textContent.trim();
        const priceText = card.querySelector(".card-text").textContent.trim();
        const price = parseFloat(priceText.replace('$', ''));
  
        addToCart(name, price);
      });
    });
  }
  
  // Add product to cart in localStorage
  function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Optional: check if item already exists in cart and increase quantity
    const existing = cart.find(item => item.name === productName);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name: productName, price: price, quantity: 1 });
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  
    alert(`${productName} added to cart!`);
  }
  
  // Update cart icon count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  
    const countElement = document.getElementById("cart-count");
    if (countElement) {
      countElement.textContent = count;
    }
  }
  