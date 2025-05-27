<?php
session_start();
if (isset($_SESSION['usuario'])) {
    header("Location: paginas/principal.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../css/estilos.css">
</head>
<body class="container d-flex align-items-center min-vh-100">
    <div class="card mx-auto">
        <div class="card-header text-center">
            <h1 class="titulo">Iniciar Sesión</h1>
        </div>
        <div class="card-body">
            <form id="loginForm">
                <div class="mb-3">
                    <label for="usuario" class="form-label">Usuario:</label>
                    <input type="text" id="usuario" name="usuario" class="form-control input" maxlength="25" required>
                </div>

                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña:</label>
                    <input type="password" id="password" name="password" class="form-control input" maxlength="20" required>
                </div>

                <button type="submit" class="btn btn-custom btn-block">Iniciar Sesión</button>
            </form>
        </div>
    </div>

    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/sesion.js"></script>
</body>
</html>