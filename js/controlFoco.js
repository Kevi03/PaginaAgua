const client = new Paho.MQTT.Client(esp32Ip, 8083, "webClient_" + Math.floor(Math.random() * 10000));

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({
  onSuccess: onConnect,
  useSSL: true,
  userName: "user1",
  password: "User1"
});

function onConnect() {
  console.log("Conectado al broker MQTT");
  client.subscribe("casa/focos/foco1");
  client.subscribe("casa/focos/foco2");
  client.subscribe("casa/focos/foco3");
  document.getElementById("error").textContent = "";
  document.getElementById("loading").style.display = "none";
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.error("Conexión perdida: " + responseObject.errorMessage);
    document.getElementById("error").textContent = "Conexión perdida con el broker MQTT.";
  }
  document.getElementById("loading").style.display = "none";
}

function onMessageArrived(message) {
  console.log("Mensaje recibido:", message.destinationName, "-", message.payloadString);

  if (message.destinationName === "casa/focos/foco1") {
    actualizarFoco(1, message.payloadString);
  } else if (message.destinationName === "casa/focos/foco2") {
    actualizarFoco(2, message.payloadString);
  } else if (message.destinationName === "casa/focos/foco3") {
    actualizarFoco(3, message.payloadString);
  }
}

function sendMessage(focoNum, estado) {
  if (client.isConnected()) {
    const topic = `casa/focos/foco${focoNum}`;
    const mqttMessage = new Paho.MQTT.Message(estado);
    mqttMessage.destinationName = topic;
    client.send(mqttMessage);
    document.getElementById("loading").style.display = "inline-block";
    document.getElementById("error").textContent = "";
  } else {
    console.error("No conectado al broker MQTT. No se puede enviar mensaje.");
    document.getElementById("error").textContent = "No conectado al broker MQTT.";
    document.getElementById("loading").style.display = "none";
  }
}

function actualizarFoco(focoNum, estado) {
  const focoImg = document.getElementById(`foco${focoNum}Img`);
  if (estado === "ON") {
    focoImg.src = "../img/focoEncendido.png";
  } else {
    focoImg.src = "../img/focoApagado.png";
  }
  document.getElementById("loading").style.display = "none";
  document.getElementById("error").textContent = "";
}

document.getElementById("foco1Btn").addEventListener("click", () => {
  toggleFoco(1);
});
document.getElementById("foco2Btn").addEventListener("click", () => {
  toggleFoco(2);
});
document.getElementById("foco3Btn").addEventListener("click", () => {
  toggleFoco(3);
});

function toggleFoco(focoNum) {
  const focoImg = document.getElementById(`foco${focoNum}Img`);
  const estadoActual = focoImg.src.includes("focoApagado.png") ? "OFF" : "ON";
  const nuevoEstado = estadoActual === "OFF" ? "ON" : "OFF";
  sendMessage(focoNum, nuevoEstado);
}
