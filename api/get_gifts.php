<?php
require '../db.php';

$stmt = $pdo->query("SELECT * FROM gifts ORDER BY id DESC");
$gifts = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($gifts);
?>
