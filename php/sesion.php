<?php
session_start();

$usuarios = [
    ['user' => 'Kevin', 'pass' => '123'],
    ['user' => 'Cristian', 'pass' => '456']
];

$response = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'] ?? '';
    $password = $_POST['password'] ?? '';

    $encontrado = false;
    foreach ($usuarios as $u) {
        if ($u['user'] === $usuario && $u['pass'] === $password) {
            $encontrado = true;
            $_SESSION['usuario'] = $usuario;
            break;
        }
    }

    if ($encontrado) {
        $response = ['clave' => 'ok', 'mensaje' => 'Inicio de sesión exitoso'];
    } else {
        $response = ['clave' => 'error', 'mensaje' => 'Usuario o contraseña incorrectos'];
    }
} else {
    $response = ['clave' => 'error', 'mensaje' => 'Método no permitido'];
}

echo json_encode($response);
