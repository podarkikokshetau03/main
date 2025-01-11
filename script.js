document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('login-btn');
  const loginForm = document.getElementById('login-form');
  const adminPanel = document.getElementById('admin-panel');
  const addGiftForm = document.getElementById('add-gift-form');
  const giftGrid = document.getElementById('gift-grid');

  // Данные для входа администратора
  const adminCredentials = {
    email: 'zhanar88033@gmail.com',
    password: 'rootadmin',
  };

  let isAdmin = false; // Флаг для проверки роли администратора

  // Вход в аккаунт
  loginBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === adminCredentials.email && password === adminCredentials.password) {
      alert('Добро пожаловать, администратор!');
      isAdmin = true; // Устанавливаем флаг администратора
      adminPanel.classList.remove('hidden'); // Показываем панель администратора
      loginForm.classList.add('hidden'); // Скрываем форму входа
      updateDeleteButtons(); // Обновляем кнопки удаления
    } else {
      alert('Неверные данные');
    }
  });

  // Обработка добавления товара
  addGiftForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('gift-name').value.trim();
    const description = document.getElementById('gift-description').value.trim();
    const price = document.getElementById('gift-price').value.trim();
    const file = document.getElementById('gift-image').files[0];

    if (!file) {
      alert('Пожалуйста, выберите изображение.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageSrc = reader.result; // Изображение в base64
      addGiftToHTML(name, description, price, imageSrc);
      addGiftForm.reset(); // Сбрасываем форму
    };
    reader.readAsDataURL(file);
  });

  // Добавление товара в HTML
  const addGiftToHTML = (name, description, price, imageSrc) => {
    const giftItem = document.createElement('div');
    giftItem.classList.add('gift-item');
    giftItem.innerHTML = `
      <img src="${imageSrc}" alt="${name}">
      <h3>${name}</h3>
      <p>${description}</p>
      <p>Цена: ${price} руб.</p>
      ${isAdmin ? '<button class="delete-btn">Удалить</button>' : ''}
    `;

    // Добавляем обработчик для кнопки удаления
    if (isAdmin) {
      const deleteBtn = giftItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        giftItem.remove();
      });
    }

    giftGrid.appendChild(giftItem);
  };

  // Обновление кнопок удаления (для текущих товаров)
  const updateDeleteButtons = () => {
    if (!isAdmin) return;

    document.querySelectorAll('.gift-item').forEach(giftItem => {
      if (!giftItem.querySelector('.delete-btn')) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.classList.add('delete-btn');

        // Добавляем обработчик кнопки удаления
        deleteBtn.addEventListener('click', () => {
          giftItem.remove();
        });

        giftItem.appendChild(deleteBtn);
      }
    });
  };
});
