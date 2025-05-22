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
  <title>Control de Foco</title>
</head>
<body>

  <h1>Control de Foco</h1>

  <button id="focoBtn" type="button">
    <img id="focoImg" src="../img/focoApagado.png" alt="Foco" />
  </button>


  <div id="label">FOCO1</div>

  <div id="loading" style="display: none;">Cargando...</div>

  <div id="error"></div>

  <script>
    const esp32Ip = "<?php echo $esp32Ip; ?>";
  </script>
  <script src="../js/controlFoco.js"></script>

</body>
</html>
