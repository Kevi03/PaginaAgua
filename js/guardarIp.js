const formularioIP = document.getElementById('FormularioIP');

formularioIP.addEventListener('submit', (e) => {
    e.preventDefault();

    const ip = document.getElementById('ip').value.trim();
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (!ip) {
        alert("Por favor, ingresa una dirección IP");
        return;
    }

    if (!regex.test(ip)) {
        alert("La dirección IP no es válida");
        return;
    }

    const datos = new FormData();
    datos.append('ip', ip);

    fetch('../php/guardarIp.php', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        if (data.clave === 'ok') {
            alert('IP guardada correctamente');
            location.href = '../index.php';
        } else {
            alert(data.mensaje || 'Ocurrió un error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al conectar con el servidor');
    });
});
