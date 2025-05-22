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
</head>
<body>

  <h1>Estado del Tanque</h1>

  <div id="error" style="color: red;"></div>
  <div id="loading" style="display: none; color: blue;">Cargando...</div>

  <div id="info">
    <p>Altura total: <span id="altura"></span> cm</p>
    <p>Radio: <span id="radio"></span> cm</p>
    <p>Nivel de agua: <span id="nivelAgua"></span> cm</p>
    <p>Volumen: <span id="volumen"></span> litros</p>
    <p>Temperatura: <span id="temperatura"></span>°C</p>
    <p>Humedad: <span id="humedad"></span>%</p>
  </div>

  <img id="tanqueImg" src="../img/c1.jpg" alt="Tanque" style="width:200px;" />

  <button id="configBtn">Configurar Tanque</button>

  <div id="modal" style="display: none; padding: 20px; border: 1px solid #000; margin-top: 20px;">
    <label>Altura (cm): <input type="number" id="inputAltura" /></label><br/><br/>
    <label>Radio (cm): <input type="number" id="inputRadio" /></label><br/><br/>
    <button id="saveBtn">Guardar</button>
    <button id="cancelBtn">Cancelar</button>
  </div>

  <script>
    const esp32Ip = "<?php echo $esp32Ip; ?>";
  </script>
  <script src="../js/tanque.js"></script>
</body>
</html>
