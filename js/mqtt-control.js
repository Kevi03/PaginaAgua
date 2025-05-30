// --- Variables globales y elementos ---
const API_BASE_URL = `http://${esp32Ip}:8080`;

// Elementos del DOM
const errorElem = document.getElementById('error');
const alturaElem = document.getElementById('altura');
const radioElem = document.getElementById('radio');
const nivelElem = document.getElementById('nivelAgua');
const volumenElem = document.getElementById('volumen');
const tempElem = document.getElementById('temperatura');
const humElem = document.getElementById('humedad');
const tanqueImg = document.getElementById('tanqueImg');
const focoImg = document.getElementById('focoImg');
const focoBtn = document.getElementById('focoBtn');
const loadingElem = document.getElementById('loading');
const configBtn = document.getElementById('configBtn');
const modal = document.getElementById('modal');
const inputAlt = document.getElementById('inputAltura');
const inputRad = document.getElementById('inputRadio');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Variables de estado
let altura = 50;
let radio = 30;
let nivelAgua = 0;
let foco1 = false;
let polling = null;

// --- Funciones de utilidad ---
function showLoading(show) {
    if (loadingElem) loadingElem.style.display = show ? 'block' : 'none';
}

function actualizarImagen() {
    if (!tanqueImg) return;
    const porcentaje = nivelAgua / altura * 100;
    let idx = 0;
    if (porcentaje > 80) idx = 4;
    else if (porcentaje > 60) idx = 3;
    else if (porcentaje > 40) idx = 2;
    else if (porcentaje > 20) idx = 1;
    tanqueImg.src = `../img/c${idx + 1}.jpg`;
}

function actualizarFocoImg() {
    if (focoImg) {
        focoImg.src = foco1 ? '../img/focoPrendido.png' : '../img/focoApagado.png';
    }
}

// --- Funciones REST ---
function fetchStatusREST() {
    showLoading(true);
    fetch(`${API_BASE_URL}/status`)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener datos del sensor');
            return res.json();
        })
        .then(data => {
            if (tempElem) tempElem.textContent = data.temperatura;
            if (humElem) humElem.textContent = data.humedad;
            foco1 = data.focos?.foco1 || false;
            actualizarFocoImg();
            if (errorElem) errorElem.textContent = '';
        })
        .catch(err => {
            if (errorElem) errorElem.textContent = err.message || 'Error de conexión';
        })
        .finally(() => {
            showLoading(false);
        });
}

function fetchNivelAguaREST() {
    showLoading(true);
    fetch(`${API_BASE_URL}/nivelAgua`)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener nivel de agua');
            return res.json();
        })
        .then(data => {
            const distancia = data.nivelAgua;
            nivelAgua = Math.max(0, altura - distancia);
            if (nivelElem) nivelElem.textContent = nivelAgua.toFixed(2);
            const volumen = Math.PI * Math.pow(radio, 2) * nivelAgua / 1000;
            if (volumenElem) volumenElem.textContent = volumen.toFixed(2);
            if (alturaElem) alturaElem.textContent = altura;
            if (radioElem) radioElem.textContent = radio;
            actualizarImagen();
            if (errorElem) errorElem.textContent = '';
        })
        .catch(err => {
            if (errorElem) errorElem.textContent = err.message || 'Error de conexión';
            if (nivelElem) nivelElem.textContent = 0;
        })
        .finally(() => {
            showLoading(false);
        });
}

function toggleLightREST() {
    const newState = !foco1;
    showLoading(true);

    fetch(`${API_BASE_URL}/control/foco1/${newState ? 'on' : 'off'}`)
        .then(response => {
            if (!response.ok) throw new Error('Error al cambiar el estado del foco');
            foco1 = newState;
            actualizarFocoImg();
            if (errorElem) errorElem.textContent = '';
        })
        .catch(err => {
            if (errorElem) errorElem.textContent = err.message || 'Error de control';
        })
        .finally(() => {
            showLoading(false);
        });
}

const client = new Paho.MQTT.Client("broker.emqx.io", 8083, "web_" + Math.random().toString(16));

client.onMessageArrived = (message) => {
    const data = {
        topic: message.destinationName,
        value: message.payloadString
    };
    
    fetch('/api/sensores.php', {
        method: 'POST',
        body: JSON.stringify(data)
    });
};

client.connect({
    onSuccess: () => client.subscribe("casa/sensores/#")
});

client.onConnectionLost = function(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("Conexión perdida: " + responseObject.errorMessage);
        if (errorElem) errorElem.textContent = "Conexión MQTT perdida";
    }
};

client.onMessageArrived = function(message) {
    console.log("Mensaje recibido: " + message.destinationName + " - " + message.payloadString);

    switch(message.destinationName) {
        case "casa/sensores/temperatura":
            if (tempElem) tempElem.textContent = message.payloadString;
            break;
        case "casa/sensores/humedad":
            if (humElem) humElem.textContent = message.payloadString;
            break;
        case "casa/sensores/distancia":
            const distancia = parseFloat(message.payloadString);
            nivelAgua = Math.max(0, altura - distancia);
            if (nivelElem) nivelElem.textContent = nivelAgua.toFixed(2);
            const volumen = Math.PI * Math.pow(radio, 2) * nivelAgua / 1000;
            if (volumenElem) volumenElem.textContent = volumen.toFixed(2);
            actualizarImagen();
            break;
        case "casa/focos/foco1/estado":
            foco1 = (message.payloadString === "ON");
            actualizarFocoImg();
            break;
    }
};

function connectMQTT() {
    client.connect({
        onSuccess: function() {
            console.log("Conectado al broker MQTT");
            client.subscribe("casa/sensores/temperatura");
            client.subscribe("casa/sensores/humedad");
            client.subscribe("casa/sensores/distancia");
            client.subscribe("casa/focos/foco1/estado");
        },
        onFailure: function(error) {
            console.error("Error de conexión MQTT:", error.errorMessage);
            if (errorElem) errorElem.textContent = "Error al conectar con MQTT";
        },
        useSSL: true,
        userName: "usuario",    // Cambiar por credenciales reales
        password: "contraseña"  // Cambiar por credenciales reales
    });
}

// --- Inicialización ---
function init() {
    // Cargar valores guardados
    if (localStorage.getItem('altura')) altura = parseFloat(localStorage.getItem('altura'));
    if (localStorage.getItem('radio')) radio = parseFloat(localStorage.getItem('radio'));

    // Configurar elementos del DOM
    if (inputAlt) inputAlt.value = altura;
    if (inputRad) inputRad.value = radio;
    if (alturaElem) alturaElem.textContent = altura;
    if (radioElem) radioElem.textContent = radio;

    // Event listeners
    if (configBtn) {
        configBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'block';
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const na = parseFloat(inputAlt.value),
                  nr = parseFloat(inputRad.value);
            if (isNaN(na) || na <= 0 || isNaN(nr) || nr <= 0) {
                alert('Por favor ingresa valores válidos mayores a 0.');
                return;
            }
            altura = na;
            radio = nr;
            localStorage.setItem('altura', altura);
            localStorage.setItem('radio', radio);
            if (alturaElem) alturaElem.textContent = altura;
            if (radioElem) radioElem.textContent = radio;
            if (modal) modal.style.display = 'none';
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (inputAlt) inputAlt.value = altura;
            if (inputRad) inputRad.value = radio;
            if (modal) modal.style.display = 'none';
        });
    }

    if (focoBtn) {
        focoBtn.addEventListener('click', toggleLightREST);
    }

    // Iniciar conexiones
    connectMQTT();
    fetchStatusREST();
    fetchNivelAguaREST();

    // Polling de respaldo
    polling = setInterval(() => {
        fetchStatusREST();
        fetchNivelAguaREST();
    }, 7000);
}

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// Limpieza al salir
window.addEventListener('beforeunload', () => {
    clearInterval(polling);
    if (client.isConnected()) {
        client.disconnect();
    }
});