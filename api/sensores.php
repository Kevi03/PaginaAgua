<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$db = new PDO('mysql:host=localhost;dbname=iot_db', 'usuario_db', 'password_db');
$stmt = $db->prepare("INSERT INTO sensores (topic, valor) VALUES (?, ?)");
$stmt->execute([$data['topic'], $data['value']]);

echo json_encode(['status' => 'success']);
?>