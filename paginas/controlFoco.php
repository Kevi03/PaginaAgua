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
    <title>Control de Foco</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body class="container d-flex align-items-center min-vh-100">
    <div class="card mx-auto text-center">
        <div class="card-header">
            <h1 class="titulo">Control de Foco</h1>
        </div>
        <div class="card-body">
            <button id="focoBtn" type="button" class="btn btn-link p-0 border-0 bg-transparent">
                <img id="focoImg" class="imagen-foco" src="../img/focoApagado.png" alt="Foco">
            </button>
            
            <div id="label" class="mt-3 fw-bold h5">FOCO1</div>
            <div id="loading" class="loading-indicator mt-2" style="display: none;">
                <div class="spinner-border spinner-border-sm" role="status"></div>
                Cargando...
            </div>
            <div id="error" class="error mt-2"></div>
        </div>
    </div>

    <script>
        const esp32Ip = "<?php echo $esp32Ip; ?>";
    </script>
    <script src="../js/controlFoco.js"></script>
</body>
</html>