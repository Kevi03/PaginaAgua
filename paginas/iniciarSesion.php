<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <title>Iniciar Sesión</title>
</head>
<body>
    <h1>Iniciar Sesión</h1>
    <form id="loginForm">
        <label for="usuario">Usuario:</label><br />
        <input type="text" id="usuario" name="usuario" maxlength="25" required /><br /><br />

        <label for="password">Contraseña:</label><br />
        <input type="password" id="password" name="password" maxlength="20" required /><br /><br />

        <button type="submit">Iniciar Sesión</button>
    </form>

    <script src="../js/sesion.js"></script>
</body>
</html>
