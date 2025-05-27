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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body>

    <?php require("../componentes/navegacion.php") ?>

    <div class="container d-flex align-items-center min-vh-100">
        <div class="card mx-auto">
            <div class="card-header text-center">
                <h1 class="titulo">Configuración del ESP32</h1>
            </div>
            <div class="card-body">
                <form id="FormularioIP">
                    <div class="mb-3">
                        <label for="ip" class="form-label">Dirección IP del ESP32:</label>
                        <input type="text" name="ip" id="ip" class="form-control input" placeholder="Ejemplo: 192.168.1.100">
                    </div>
                    <button type="submit" class="btn btn-custom btn-block">Guardar IP</button>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/guardarIp.js"></script>
    <script src="../js/cerrarSesion.js"></script>

</body>
</html>
