if (typeof Paho === 'undefined' || typeof Paho.MQTT === 'undefined') {
    console.error("La librería MQTT no se ha cargado correctamente.");
} else {


const client = new Paho.MQTT.Client("broker.example.com", 8083, "webClient_" + parseInt(Math.random() * 100, 10));

    client.onMessageArrived = function(message) {
        console.log("Mensaje recibido: " + message.destinationName + " - " + message.payloadString);


        switch (message.destinationName) {
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

        const data = {
            topic: message.destinationName,
            value: message.payloadString
        };
        fetch('/api/sensores.php', {
            method: 'POST',
            body: JSON.stringify(data)
        });
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
            userName: "user1",
            password: "User1"
        });
    }


    function init() {
        if (localStorage.getItem('altura')) altura = parseFloat(localStorage.getItem('altura'));
        if (localStorage.getItem('radio')) radio = parseFloat(localStorage.getItem('radio'));

        if (inputAlt) inputAlt.value = altura;
        if (inputRad) inputRad.value = radio;
        if (alturaElem) alturaElem.textContent = altura;
        if (radioElem) radioElem.textContent = radio;

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

        connectMQTT();


        fetchStatusREST();
        fetchNivelAguaREST();

        polling = setInterval(() => {
            fetchStatusREST();
            fetchNivelAguaREST();
        }, 7000);
    }

    document.addEventListener('DOMContentLoaded', init);

    window.addEventListener('beforeunload', () => {
        clearInterval(polling);
        if (client.isConnected()) {
            client.disconnect();
        }
    });
}
