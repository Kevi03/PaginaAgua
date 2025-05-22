<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: ./iniciarSesion.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Configuración IP ESP32</title>
</head>
<body>
    <h1>Configuración del ESP32</h1>

    <form id="FormularioIP">
        <label for="ip">Dirección IP del ESP32:</label><br>
        <input type="text" name="ip" id="ip"><br><br>
        <button type="submit">Guardar IP</button>
    </form>

    <script src="../js/guardarIp.js"></script>
</body>
</html>
