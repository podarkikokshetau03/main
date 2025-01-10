const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Настройка соединения с MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Создание таблицы для хранения товаров (выполните это один раз для инициализации базы данных)
db.query(`
  CREATE TABLE IF NOT EXISTS gifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image TEXT,
    price DECIMAL(10, 2)
  )
`, (err, result) => {
  if (err) {
    throw err;
  }
  console.log('Table created or exists already');
});

// Получение всех товаров
app.get('/gifts', (req, res) => {
  db.query('SELECT * FROM gifts', (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// Добавление нового товара
app.post('/gifts', (req, res) => {
  const { name, description, image, price } = req.body;
  const query = 'INSERT INTO gifts (name, description, image, price) VALUES (?, ?, ?, ?)';
  db.query(query, [name, description, image, price], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ id: result.insertId, name, description, image, price });
  });
});

// Удаление товара
app.delete('/gifts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM gifts WHERE id = ?', [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Подарок удален' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
