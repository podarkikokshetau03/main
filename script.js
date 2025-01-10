document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginForm = document.getElementById('login-form');
  const adminPanel = document.getElementById('admin-panel');
  const addGiftForm = document.getElementById('add-gift-form');
  const giftGrid = document.getElementById('gift-grid');
  const giftImageInput = document.getElementById('gift-image');
  const giftPriceInput = document.getElementById('gift-price');

  const adminCredentials = {
    email: 'zhanar88033@gmail.com',
    password: 'rootadmin',
  };

  let isAdmin = false;  // Флаг для отслеживания, авторизован ли админ

  // Загрузка товаров из LocalStorage
  const loadGifts = () => {
    const gifts = JSON.parse(localStorage.getItem('gifts')) || [];
    giftGrid.innerHTML = ''; // Очистка текущего списка товаров
    gifts.forEach((gift, index) => {
      const giftItem = document.createElement('div');
      giftItem.classList.add('gift-item');
      giftItem.style.animationDelay = `${index * 0.1}s`; // Плавное появление по очереди
      giftItem.innerHTML = `
        <img src="${gift.image}" alt="${gift.name}">
        <h3>${gift.name}</h3>
        <p>${gift.description}</p>
        <p>Цена: ${gift.price} ₸</p>
      `;
      
      // Показываем кнопку удаления только для администратора
      if (isAdmin) {
        giftItem.innerHTML += `<button class="delete-btn" data-index="${index}">Удалить</button>`;
      }

      giftGrid.appendChild(giftItem);
    });

    // Добавление событий для кнопок удаления (если админ)
    if (isAdmin) {
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDelete);
      });
    }
  };

  // Сохранение нового подарка
  const saveGift = (name, description, image, price) => {
    const gifts = JSON.parse(localStorage.getItem('gifts')) || [];
    gifts.push({ name, description, image, price });
    localStorage.setItem('gifts', JSON.stringify(gifts));
    loadGifts();
  };

  // Обработка входа
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email === adminCredentials.email && password === adminCredentials.password) {
      alert('Вы вошли как администратор');
      isAdmin = true; // Устанавливаем флаг, что пользователь администратор
      adminPanel.classList.remove('hidden');
      loginForm.classList.add('hidden');
      loadGifts(); // Перезагружаем товары после авторизации
    } else {
      alert('Неверные данные');
    }
  });

  // Обработка добавления подарков
  addGiftForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('gift-name').value;
    const description = document.getElementById('gift-description').value;
    const price = giftPriceInput.value;
    const file = giftImageInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = reader.result; // Содержимое файла в формате base64
        saveGift(name, description, image, price);
        addGiftForm.reset();
        alert('Подарок добавлен!');
      };
      reader.readAsDataURL(file);
    } else {
      alert('Пожалуйста, выберите изображение.');
    }
  });

  // Удаление подарка
  const handleDelete = (e) => {
    const index = e.target.getAttribute('data-index');
    const gifts = JSON.parse(localStorage.getItem('gifts')) || [];
    gifts.splice(index, 1); // Удаление подарка
    localStorage.setItem('gifts', JSON.stringify(gifts));
    loadGifts(); // Перезагружаем товары
  };

  // Инициализация
  loadGifts();
});
