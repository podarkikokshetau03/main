document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginForm = document.getElementById('login-form');
  const adminPanel = document.getElementById('admin-panel');
  const giftGrid = document.getElementById('gift-grid');
  const addGiftForm = document.getElementById('add-gift-form');
  const giftNameInput = document.getElementById('gift-name');
  const giftDescriptionInput = document.getElementById('gift-description');
  const giftPriceInput = document.getElementById('gift-price');
  const giftImageInput = document.getElementById('gift-image');

  const adminCredentials = {
    email: 'zhanar88033@gmail.com',
    password: 'rootadmin',
  };

  // Авторизация
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === adminCredentials.email && password === adminCredentials.password) {
      alert('Добро пожаловать, администратор!');
      adminPanel.classList.remove('hidden');
      loginForm.classList.add('hidden');
    } else {
      alert('Неверный email или пароль.');
    }
  });

  // Добавление подарков
  addGiftForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = giftNameInput.value.trim();
    const description = giftDescriptionInput.value.trim();
    const price = giftPriceInput.value.trim();
    const file = giftImageInput.files[0];

    if (!name || !description || !price || !file) {
      alert('Заполните все поля!');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = reader.result;

      const giftItem = document.createElement('div');
      giftItem.classList.add('gift-item');
      giftItem.innerHTML = `
        <img src="${image}" alt="${name}">
        <h3>${name}</h3>
        <p>${description}</p>
        <p>Цена: ${price} тг.</p>
        <button class="delete-btn">Удалить</button>
      `;

      giftGrid.appendChild(giftItem);

      const deleteButton = giftItem.querySelector('.delete-btn');
      deleteButton.addEventListener('click', () => {
        giftGrid.removeChild(giftItem);
      });

      addGiftForm.reset();
      alert('Подарок добавлен!');
    };

    reader.readAsDataURL(file);
  });
});