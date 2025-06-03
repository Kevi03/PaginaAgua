const client = new Paho.MQTT.Client(esp32Ip, 8083, "webClient_" + parseInt(Math.random() * 100, 10));

const errorElem   = document.getElementById('error');
const alturaElem  = document.getElementById('altura');
const radioElem   = document.getElementById('radio');
const nivelElem   = document.getElementById('nivelAgua');
const volumenElem = document.getElementById('volumen');
const tempElem    = document.getElementById('temperatura');
const humElem     = document.getElementById('humedad');
const tanqueImg   = document.getElementById('tanqueImg');
const configBtn   = document.getElementById('configBtn');
const modal       = document.getElementById('modal');
const inputAlt    = document.getElementById('inputAltura');
const inputRad    = document.getElementById('inputRadio');
const saveBtn     = document.getElementById('saveBtn');
const cancelBtn   = document.getElementById('cancelBtn');
const loadingElem = document.getElementById('loading');

let altura = 50;
let radio = 30;
let nivelAgua = 0;

if(localStorage.getItem('altura')) altura = parseFloat(localStorage.getItem('altura'));
if(localStorage.getItem('radio')) radio = parseFloat(localStorage.getItem('radio'));

inputAlt.value = altura;
inputRad.value = radio;
alturaElem.textContent = altura;
radioElem.textContent = radio;

function showLoading(show) {
  loadingElem.style.display = show ? 'block' : 'none';
}

function actualizarImagen() {
  const porcentaje = nivelAgua / altura * 100;
  let idx = 0;
  if (porcentaje > 80) idx = 4;
  else if (porcentaje > 60) idx = 3;
  else if (porcentaje > 40) idx = 2;
  else if (porcentaje > 20) idx = 1;
  tanqueImg.src = `../img/c${idx + 1}.jpg`;
}

client.onConnectionLost = (responseObject) => {
  if (responseObject.errorCode !== 0) {
    console.log("Conexión perdida: " + responseObject.errorMessage);
    errorElem.textContent = "Conexión perdida con el broker MQTT.";
  }
};

client.onMessageArrived = (message) => {
  console.log("Mensaje recibido:", message.destinationName, message.payloadString);
  errorElem.textContent = "";

  switch(message.destinationName) {
    case "casa/sensores/temperatura":
      tempElem.textContent = message.payloadString;
      break;
    case "casa/sensores/humedad":
      humElem.textContent = message.payloadString;
      break;
    case "casa/sensores/distancia":
      const distancia = parseFloat(message.payloadString);
      if (!isNaN(distancia)) {
        nivelAgua = Math.max(0, altura - distancia);
        nivelElem.textContent = nivelAgua.toFixed(2);
        const volumen = Math.PI * Math.pow(radio, 2) * nivelAgua / 1000;
        volumenElem.textContent = volumen.toFixed(2);
        actualizarImagen();
      }
      break;
  }
};

client.connect({
  onSuccess: () => {
    console.log("Conectado al broker MQTT");
    errorElem.textContent = "";
    showLoading(false);
    client.subscribe("casa/sensores/temperatura");
    client.subscribe("casa/sensores/humedad");
    client.subscribe("casa/sensores/distancia");
  },
  onFailure: (err) => {
    console.error("Error al conectar MQTT:", err.errorMessage);
    errorElem.textContent = "No se pudo conectar al broker MQTT.";
    showLoading(false);
  },
  useSSL: true,
  userName: "user1",
  password: "User1"
});

configBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

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
  alturaElem.textContent = altura;
  radioElem.textContent = radio;
  modal.style.display = 'none';
});

cancelBtn.addEventListener('click', () => {
  inputAlt.value = altura;
  inputRad.value = radio;
  modal.style.display = 'none';
});
