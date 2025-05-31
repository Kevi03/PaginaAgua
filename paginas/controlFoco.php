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
$esp32Ip = $_SESSION['esp32Ip'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Control de Focos</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/estilos.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.1.0/paho-mqtt.min.js"></script>
    <style>
      .imagen-foco {
        width: 80px;
        cursor: pointer;
      }
      .foco-container {
        margin: 0 15px;
      }
    </style>
</head>
<body>
    <?php require("../componentes/navegacion.php") ?>

    <div class="container d-flex align-items-center min-vh-100">
        <div class="card mx-auto text-center p-4">
            <div class="card-header">
                <h1 class="titulo">Control de Focos</h1>
            </div>
            <div class="card-body d-flex justify-content-center">
                
                <!-- Foco 1 -->
                <div class="foco-container text-center">
                    <button id="foco1Btn" type="button" class="btn btn-link p-0 border-0 bg-transparent">
                        <img id="foco1Img" class="imagen-foco" src="../img/focoApagado.png" alt="Foco 1">
                    </button>
                    <div class="mt-2 fw-bold h5">FOCO 1</div>
                </div>

                <!-- Foco 2 -->
                <div class="foco-container text-center">
                    <button id="foco2Btn" type="button" class="btn btn-link p-0 border-0 bg-transparent">
                        <img id="foco2Img" class="imagen-foco" src="../img/focoApagado.png" alt="Foco 2">
                    </button>
                    <div class="mt-2 fw-bold h5">FOCO 2</div>
                </div>
                
                <!-- Foco 3 -->
                <div class="foco-container text-center">
                    <button id="foco3Btn" type="button" class="btn btn-link p-0 border-0 bg-transparent">
                        <img id="foco3Img" class="imagen-foco" src="../img/focoApagado.png" alt="Foco 3">
                    </button>
                    <div class="mt-2 fw-bold h5">FOCO 3</div>
                </div>
            </div>

            <div id="loading" class="loading-indicator mt-3" style="display: none;">
                <div class="spinner-border spinner-border-sm" role="status"></div>
                Cargando...
            </div>
            <div id="error" class="error mt-2"></div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        const esp32Ip = "<?php echo $esp32Ip; ?>";
    </script>
    <script src="../js/paho-mqtt.js"></script>
    <script src="https://unpkg.com/paho-mqtt@1.1.0/mqttws31.min.js"></script>
    <script src="../js/cerrarSesion.js"></script>
    <script src="../js/controlFoco.js"></script>
</body>
</html>