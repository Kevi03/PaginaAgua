<?php
session_start();

if (!isset($_SESSION['usuario'])) {
    header("Location: paginas/iniciarSesion.php");
    exit;
}

if (!isset($_SESSION['esp32Ip'])) {
    header("Location: paginas/configuracionIp.php");
    exit;
}

$nombreUsuario = $_SESSION['usuario'];

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Página Principal</title>
</head>
<body>
    <h1>Hola, <?php echo $nombreUsuario; ?> </h1>
    <p>Bienvenido de nuevo.</p>

    <p>Selecciona una opción:</p>

    <ul>
        <li><a href="paginas/configuracionIp.php">Conectarse manualmente</a></li>
        <li><a href="paginas/controlFoco.php">Controlar foco</a></li>
        <li><a href="paginas/tanque.php">Tanque de agua</a></li>
    </ul>
</body>
</html>
