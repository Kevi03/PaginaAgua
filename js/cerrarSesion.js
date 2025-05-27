const cerrarSesion = document.getElementById('BotonCerrar');
cerrarSesion.addEventListener('click', () =>{

    let ventana = window.location.pathname;
    let basePath = ventana.split('/').slice(0, -1).join('/');

    console.log(ventana);

    if (ventana.endsWith('acercaDe.php') || ventana.endsWith('configuracionIp.php') || ventana.endsWith('controlFoco.php') || ventana.endsWith('tanque.php')) {
        url = `${basePath}/../php/cerrarSesion.php`;
        iniciar = `${basePath}/../paginas/iniciarSesion.php`;
    } else if (ventana.endsWith('index.php')) {
        url = `${basePath}/php/cerrarSesion.php`;
        iniciar = `${basePath}/paginas/iniciarSesion.php`;
    }

    fetch(url, {
        method: 'POST'
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    
        if (data[0].clave === 'error') {
            alert(data[0].nombre);
            
        } else if(data[0].clave === 'ok') {
            alert('Se Cerró Sesión');
            location.href=iniciar;
        }
    })
    .catch(error => {
        console.log('Error:', error);
    });
});