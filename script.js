document.addEventListener('DOMContentLoaded', () => {
  const giftGrid = document.getElementById('gift-grid');

  const loadGifts = async () => {
    const response = await fetch('/gifts');
    const gifts = await response.json();
    giftGrid.innerHTML = '';
    gifts.forEach((gift, index) => {
      const giftItem = document.createElement('div');
      giftItem.classList.add('gift-item');
      giftItem.innerHTML = `
        <img src="${gift.image}" alt="${gift.name}">
        <h3>${gift.name}</h3>
        <p>${gift.description}</p>
        <p>Цена: ${gift.price} руб.</p>
      `;
      giftGrid.appendChild(giftItem);
    });
  };

  loadGifts();
});
