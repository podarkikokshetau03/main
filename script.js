document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('login-btn');
  const adminPanel = document.getElementById('admin-panel');
  const giftGrid = document.getElementById('gift-grid');

  // Учетные данные администратора
  const adminCredentials = {
    email: 'zhanar88033@gmail.com',
    password: 'rootadmin',
  };

  // Загрузка товаров
  const loadGifts = async () => {
    const response = await fetch('/gifts'); // Предполагается, что на сервере есть маршрут для получения товаров
    const gifts = await response.json();
    giftGrid.innerHTML = '';
    gifts.forEach((gift, index) => {
      const giftItem = document.createElement('div');
      giftItem.classList.add('gift-item');
      giftItem.innerHTML = `
        <img src="${gift.image}" alt="${gift.name}">
        <h3>${gift.name}</h3>
        <p>${gift.description}</p>
        <p>Цена: ${gift.price} тг</p>
      `;
      giftGrid.appendChild(giftItem);
    });
  };

  // Проверка входа
  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email === adminCredentials.email && password === adminCredentials.password) {
      alert('Вы вошли как администратор');
      adminPanel.classList.remove('hidden');
      loginForm.classList.add('hidden');
      loadGifts(); // Загрузка товаров для админа
    } else {
      alert('Неверные данные');
    }
  });

  // Инициализация
  loadGifts(); // Загрузка товаров для всех пользователей
});
