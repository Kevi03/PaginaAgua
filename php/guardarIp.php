<?php
session_start();

$response = [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $ip = trim($_POST['ip'] ?? '');

    if (filter_var($ip, FILTER_VALIDATE_IP)) {
        $_SESSION['esp32Ip'] = $ip;
        $response = [
            'clave' => 'ok',
            'mensaje' => 'Dirección IP guardada con éxito'
        ];
    } else {
        $response = [
            'clave' => 'error',
            'mensaje' => 'La dirección IP no es válida'
        ];
    }

    echo json_encode($response);
    exit;
}

$response = [
    'clave' => 'error',
    'mensaje' => 'Método no permitido'
];
echo json_encode($response);
exit;
