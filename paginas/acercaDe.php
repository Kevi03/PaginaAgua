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

    <div class="container d-flex justify-content-center mt-5">
        <div class="card mx-auto">
            <div class="card-header text-center">
                <h1 class="card-title">Acerca de esta aplicación</h1>
            </div>
            <div class="card-body">
                <p class="card-text">
                    El reciclaje de aguas grises es una práctica fundamental para la conservación del agua, donde se reutilizan las aguas provenientes de actividades cotidianas como duchas, lavamanos y lavadoras. Este proceso no solo ayuda a reducir el consumo de agua potable, sino que también disminuye el impacto ambiental y promueve el uso responsable de nuestros recursos hídricos. A través de tecnologías adecuadas, las aguas grises pueden ser tratadas y reutilizadas para riego, limpieza o incluso para uso industrial, contribuyendo a la sostenibilidad del medio ambiente.
                </p>
                <div class="text-center mt-4">
                    <p><strong>Creadores:</strong></p>
                    <p>Fuentes Osorio Cristian</p>
                    <p>Ramirez Flores Kevin</p>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/cerrarSesion.js"></script>
</body>
</html>
