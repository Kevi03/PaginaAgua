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
    <meta charset="UTF-8" />
    <title>Estado del Tanque</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/estilos.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.1.0/mqttws31.min.js"></script>
</head>
<body>
    
    <?php require("../componentes/navegacion.php") ?>

    <div class="container d-flex align-items-center min-vh-100 py-4">
        <div class="w-100">
            <div class="card shadow mx-auto" style="max-width: 600px;">
                <div class="card-header text-center bg-transparent">
                    <h1 class="titulo m-0">Estado del Tanque</h1>
                </div>
                
                <div class="card-body">
                    <div class="text-center mb-4">
                        <img id="tanqueImg" src="../img/c1.jpg" alt="Tanque" class="img-fluid rounded" style="max-height: 180px;">
                    </div>

                    <div id="error" class="error mb-3"></div>
                    <div id="loading" class="loading-indicator mb-3" style="display: none;">
                        <div class="spinner-border spinner-border-sm" role="status"></div>
                        Cargando datos del tanque...
                    </div>

                    <div class="info-tanque bg-light rounded p-3 mb-4">
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <p class="texto m-0">Altura total: <span id="altura" class="fw-bold">--</span> cm</p>
                            </div>
                            <div class="col-md-6 mb-2">
                                <p class="texto m-0">Radio: <span id="radio" class="fw-bold">--</span> cm</p>
                            </div>
                            <div class="col-md-6 mb-2">
                                <p class="texto m-0">Nivel de agua: <span id="nivelAgua" class="fw-bold">--</span> cm</p>
                            </div>
                            <div class="col-md-6 mb-2">
                                <p class="texto m-0">Volumen: <span id="volumen" class="fw-bold">--</span> litros</p>
                            </div>
                            <div class="col-md-6 mb-2">
                                <p class="texto m-0">Temperatura: <span id="temperatura" class="fw-bold">--</span> °C</p>
                            </div>
                            <div class="col-md-6 mb-2">
                                <p class="texto m-0">Humedad: <span id="humedad" class="fw-bold">--</span> %</p>
                            </div>
                        </div>
                    </div>

                    <div class="text-center">
                        <button id="configBtn" class="btn btn-custom px-4">Configurar Tanque</button>
                    </div>
                </div>
            </div>

            <div id="modal" class="modal-fullscreen-custom">
                <div class="card mx-auto my-4" style="max-width: 500px;">
                    <div class="card-header text-center">
                        <h3 class="titulo m-0">Configurar Tanque</h3>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label">Altura (cm):</label>
                            <input type="number" id="inputAltura" class="form-control input">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Radio (cm):</label>
                            <input type="number" id="inputRadio" class="form-control input">
                        </div>
                        <div class="d-flex justify-content-center gap-3 mt-4">
                            <button id="saveBtn" class="btn btn-custom flex-grow-1">Guardar</button>
                            <button id="cancelBtn" class="btn btn-outline-secondary flex-grow-1">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        const esp32Ip = "<?php echo $esp32Ip; ?>";
    </script>
    <script src="../js/paho-mqtt.js"></script>
    <script src="../js/tanque.js"></script>
    <script src="../js/cerrarSesion.js"></script>

</body>
</html>
