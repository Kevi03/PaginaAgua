const API_BASE_URL = `http://${esp32Ip}:8080`;

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
let polling = null;

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

function fetchStatus() {
  showLoading(true);
  fetch(`${API_BASE_URL}/status`)
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener datos del sensor');
      return res.json();
    })
    .then(data => {
      tempElem.textContent = data.temperatura;
      humElem.textContent = data.humedad;
      errorElem.textContent = '';
    })
    .catch(err => {
      errorElem.textContent = err.message || 'Error de conexión';
    })
    .finally(() => {
      showLoading(false);
    });
}

function fetchNivelAgua() {
  showLoading(true);
  fetch(`${API_BASE_URL}/nivelAgua`)
    .then(res => {
      if (!res.ok) throw new Error('Error al obtener nivel de agua');
      return res.json();
    })
    .then(data => {
      const distancia = data.nivelAgua;
      nivelAgua = Math.max(0, altura - distancia);
      nivelElem.textContent = nivelAgua.toFixed(2);
      const volumen = Math.PI * Math.pow(radio, 2) * nivelAgua / 1000;
      volumenElem.textContent = volumen.toFixed(2);
      alturaElem.textContent = altura;
      radioElem.textContent = radio;
      actualizarImagen();
      errorElem.textContent = '';
    })
    .catch(err => {
      errorElem.textContent = err.message || 'Error de conexión';
      nivelElem.textContent = 0;
    })
    .finally(() => {
      showLoading(false);
    });
}

if (localStorage.getItem('altura')) altura = parseFloat(localStorage.getItem('altura'));
if (localStorage.getItem('radio')) radio = parseFloat(localStorage.getItem('radio'));

inputAlt.value = altura;
inputRad.value = radio;
alturaElem.textContent = altura;
radioElem.textContent = radio;
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
fetchStatus();
fetchNivelAgua();
polling = setInterval(() => {
    fetchStatus();fetchNivelAgua();
}, 7000);
window.addEventListener('beforeunload', () => {


  clearInterval(polling);


});