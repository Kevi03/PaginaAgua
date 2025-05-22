const API_BASE_URL = `http://${esp32Ip}:8080`;

const focoImg     = document.getElementById('focoImg');
const loadingElem = document.getElementById('loading');
const errorElem   = document.getElementById('error');

let foco1 = false;
let polling = null;

function showLoading(show) {
  loadingElem.style.display = show ? 'block' : 'none';
}

function fetchStatus() {
  fetch(`${API_BASE_URL}/status`)
    .then(response => {
      if (!response.ok) throw new Error('Error al obtener estado del foco');
      return response.json();
    })
    .then(data => {
      foco1 = data.focos?.foco1 || false;
      focoImg.src = foco1 ? '../img/focoPrendido.png' : '../img/focoApagado.png';
      errorElem.textContent = '';
    })
    .catch(err => {
      errorElem.textContent = err.message || 'Error de conexión';
      focoImg.src = '../img/focoApagado.png';
    });
}

function toggleLight() {
  const newState = !foco1;
  showLoading(true);

  fetch(`${API_BASE_URL}/control/foco1/${ newState ? 'on' : 'off' }`)
    .then(response => {
      if (!response.ok) throw new Error('Error al cambiar el estado del foco');
      return fetch(`${API_BASE_URL}/status`);
    })
    .then(res => res.json())
    .then(data => {
      foco1 = data.focos?.foco1 || false;
      focoImg.src = foco1 ? 'assets/focoPrendido.png' : 'assets/focoApagado.png';
      errorElem.textContent = '';
    })
    .catch(err => {
      errorElem.textContent = err.message || 'Error de control';
    })
    .finally(() => {
      showLoading(false);
    });
}

fetchStatus();
polling = setInterval(fetchStatus, 7000);

document.getElementById('focoBtn').addEventListener('click', toggleLight);

window.addEventListener('beforeunload', () => {
  if (polling) clearInterval(polling);
});
