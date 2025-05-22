const form = document.getElementById('loginForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value.trim();

    const datos = new FormData();
    datos.append('usuario', usuario);
    datos.append('password', password);

    fetch('../php/sesion.php', {
        method: 'POST',
        body: datos
    })
    .then(response => response.json())
    .then(data => {
        if (data.clave === 'ok') {
            alert(data.mensaje);
            window.location.href = '../index.php';
        } else {
            alert(data.mensaje);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('Error al conectar con el servidor');
    });
});
