<?php
session_start();
$json = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_destroy();
    
    
    $json[] = array(
        'clave' => 'ok',
        'nombre' => 'Se cerró sesión'
    );
} else {
    $json[] = array(
        'clave' => 'error',
        'nombre' => 'No se recibio un metodo post'
    );
}

echo json_encode($json);
?>