// script.js

// Produktdata
const sheckles = [
  { id: 1, amount: "500B", price: 4, image: "coin-icon.png" },
  { id: 2, amount: "870B", price: 7, image: "coin-icon.png" },
  { id: 3, amount: "1.9T", price: 13, image: "coin-icon.png" },
  { id: 4, amount: "2.4T", price: 18, image: "coin-icon.png" },
  { id: 5, amount: "4T", price: 30, image: "coin-icon.png" },
  { id: 6, amount: "744T", price: 40, image: "coin-icon.png" }
  ,
];

const pets = [
  { id: 101, name: "Raccoon", price: 80, image: "raccoon.png" },
  { id: 102, name: "Dragon Fly", price: 95, image: "dragonfly.png" },
  { id: 103, name: "Mimic Octopus", price: 115, image: "mimic-octopus.png" },
  { id: 104, name: "Praying Mantis", price: 55, image: "praying-mantis.png" },
  { id: 105, name: "Blood Owl", price: 40, image: "blood-owl.png" },
  { id: 106, name: "Queen Bee", price: 75, image: "queen-bee.png" }
];

// Varukorg
let cart = [];

// Funktion: Skapa produktkort
function createProductCard(item, type) {
  const card = document.createElement('div');
  card.className = 'product';
  const title = type === 'sheckle' ? `${item.amount} sheckles` : item.name;
  card.innerHTML = `
    <img src="${item.image}" alt="${title}">
    <h3>${title}</h3>
    <p>Pris: <strong>${item.price} kr</strong></p>
    <button data-id="${item.id}" data-type="${type}">Lägg i varukorgen</button>
  `;
  return card;
}

// Rendera produkter på sidan
function renderProducts() {
  const shecklesList = document.getElementById('sheckles-list');
  const petsList = document.getElementById('pets-list');

  sheckles.forEach(item => shecklesList.appendChild(createProductCard(item, 'sheckle')));
  pets.forEach(item => petsList.appendChild(createProductCard(item, 'pet')));
}

// Uppdatera visning av varukorgen
function renderCart() {
  const list = document.getElementById('cart-list');
  list.innerHTML = '';
  cart.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `${entry.title} – ${entry.price} kr`;
    list.appendChild(li);
  });
  document.getElementById('checkout-btn').disabled = cart.length === 0;
}

// Lägg till vara i varukorgen
function addToCart(id, type) {
  let product, title;
  if (type === 'sheckle') {
    product = sheckles.find(p => p.id === +id);
    title = `${product.amount} sheckles`;
  } else {
    product = pets.find(p => p.id === +id);
    title = product.name;
  }
  cart.push({ title, price: product.price, type });
  renderCart();
}

// Gå till checkout-sidan
function checkout() {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'checkout.html';
}

// Event-lyssnare
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  document.body.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.id) {
      addToCart(e.target.dataset.id, e.target.dataset.type);
    }
    if (e.target.id === 'checkout-btn') {
      checkout();
    }
  });
});
