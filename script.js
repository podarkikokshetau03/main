document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  const loginForm = document.getElementById('login-form');
  const adminPanel = document.getElementById('admin-panel');
  const addGiftForm = document.getElementById('add-gift-form');
  const giftGrid = document.getElementById('gift-grid');

  const adminCredentials = {
    email: 'zhanar88033@gmail.com',
    password: 'rootadmin',
  };

  // Обработка входа
  loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === adminCredentials.email && password === adminCredentials.password) {
      alert('Добро пожаловать, администратор!');
      adminPanel.classList.remove('hidden'); // Показываем панель администратора
      loginForm.classList.add('hidden'); // Скрываем форму входа
    } else {
      alert('Неверные данные');
    }
  });

  // Загрузка товаров с сервера
  const loadGifts = async () => {
    try {
      const response = await fetch('api/get_gifts.php');
      const gifts = await response.json();

      giftGrid.innerHTML = '';
      gifts.forEach(gift => {
        const giftItem = document.createElement('div');
        giftItem.classList.add('gift-item');
        giftItem.innerHTML = `
          <img src="${gift.image_path}" alt="${gift.name}">
          <h3>${gift.name}</h3>
          <p>${gift.description}</p>
          <p>Цена: ${gift.price} руб.</p>
        `;
        giftGrid.appendChild(giftItem);
      });
    } catch (error) {
      console.error('Ошибка загрузки подарков:', error);
    }
  };

  // Добавление нового подарка
  addGiftForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('gift-name').value.trim();
    const description = document.getElementById('gift-description').value.trim();
    const price = document.getElementById('gift-price').value.trim();
    const file = document.getElementById('gift-image').files[0];

    if (!file) {
      alert('Пожалуйста, выберите изображение.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', file);

    try {
      const response = await fetch('api/add_gift.php', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        alert('Подарок добавлен!');
        addGiftForm.reset();
        loadGifts(); // Обновляем список товаров
      } else {
        alert(`Ошибка: ${result.message}`);
      }
    } catch (error) {
      console.error('Ошибка добавления подарка:', error);
    }
  });

  // Инициализация
  loadGifts();
});
