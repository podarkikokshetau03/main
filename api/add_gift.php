<?php
require '../db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $description = $_POST['description'];
    $price = $_POST['price'];

    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['image'];
        $imagePath = '../gifts/' . basename($image['name']);

        if (move_uploaded_file($image['tmp_name'], $imagePath)) {
            $relativePath = 'gifts/' . basename($image['name']);

            $stmt = $pdo->prepare("INSERT INTO gifts (name, description, image_path, price) VALUES (?, ?, ?, ?)");
            $stmt->execute([$name, $description, $relativePath, $price]);

            echo json_encode(['success' => true, 'message' => 'Подарок добавлен.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Ошибка сохранения изображения.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Изображение не загружено.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса.']);
}
?>
