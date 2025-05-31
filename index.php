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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/estilos.css">

</head>

<body>
    <?php require("componentes/navegacion.php") ?>

    <div class="container d-flex align-items-center min-vh-100 position-relative">

        <div class="card mx-auto">
            <div class="card-header text-center">
                <h1 class="titulo">Hola, <?php echo htmlspecialchars($nombreUsuario); ?></h1>
                <p class="texto">Bienvenido de nuevo.</p>
            </div>
            <div class="card-body">
                <div class="d-grid gap-3">
                    <button onclick="window.location.href='paginas/configuracionIp.php'" 
                            class="btn btn-custom">
                        Conectarse manualmente
                    </button>
                    
                    <button onclick="window.location.href='paginas/controlFoco.php'" 
                            class="btn btn-custom">
                        Controlar foco
                    </button>
                    
                    <button onclick="window.location.href='paginas/tanque.php'" 
                            class="btn btn-custom">
                        Tanque de agua
                    </button>
                </div>
            </div>
        </div>
    </div>
    <script src="js/paho-mqtt.js"></script>
    <script src="js/cerrarSesion.js"></script>
    <script src="js/mqtt-control.js"></script>
</body>
</html>
