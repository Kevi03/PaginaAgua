<?php
session_start();
session_unset();
session_destroy();
header("Location: ../paginas/iniciarSesion.php");
exit;
