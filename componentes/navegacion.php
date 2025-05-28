<?php
$inicio = './index.php';
$acercaDe = 'paginas/acercaDe.php';
$uri = $_SERVER['REQUEST_URI'];
if (strpos($uri, 'paginas/acercaDe.php') !== false || strpos($uri, 'paginas/configuracionIp.php') !== false || strpos($uri, 'paginas/controlFoco.php') !== false || strpos($uri, 'paginas/tanque.php') !== false) {
    $inicio = '../index.php';
    $acercaDe = '../paginas/acercaDe.php';
} else if(strpos($uri, '/index.php') !== false){
    $inicio = './index.php';
    $acercaDe = 'paginas/acercaDe.php';
}

?>
<header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="white">
        <div class="container-fluid">
            <a class="navbar-brand" href="<?php echo $inicio ?>">Inicio</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" href="<?php echo $acercaDe ?>">Acerca De</a>
                </div>
            </div>
            <div class="d-flex align-items-center text-white">
                <a class="navbar-brand" id="BotonCerrar" role="button">Cerrar Sesiòn</a>
            </div>
        </div>
    </nav>
</header>
