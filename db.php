<?php
$host = 'localhost';
$dbname = 'gift_store';
$username = 'root'; // Ваш логин к базе
$password = ''; // Ваш пароль

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Ошибка подключения: " . $e->getMessage());
}
?>
