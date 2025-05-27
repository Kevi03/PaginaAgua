<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: ./iniciarSesion.php");
    exit;
}
if (!isset($_SESSION['esp32Ip'])) {
    header("Location: ./configuracionIp.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acerca De</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>

    <?php require("../componentes/navegacion.php") ?>

    <div class="container py-5">
        <div class="card mx-auto shadow" style="max-width: 800px;">
            <div class="card-body">
                <h1 class="card-title text-center mb-4">Acerca de esta aplicación</h1>
                <p class="card-text">
                </p>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/cerrarSesion.js"></script>
</body>
</html>
