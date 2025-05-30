<?php
require __DIR__.'/phpMQTT.php';

$server = 'broker.emqx.io';  // Broker público para pruebas
$port = 1883;
$client_id = 'phpMQTT-subscriber';

$mqtt = new Bluerhinos\phpMQTT($server, $port, $client_id);

if ($mqtt->connect(true, null, 'usuario', 'password')) {
    $topics = [
        'casa/sensores/temperatura' => ['qos' => 0, 'function' => 'procesarMensaje'],
        'casa/sensores/humedad' => ['qos' => 0, 'function' => 'procesarMensaje']
    ];
    
    $mqtt->subscribe($topics, 0);
    
    while ($mqtt->proc()) {
        // Mantiene la conexión activa
    }
    
    $mqtt->close();
} else {
    file_put_contents('mqtt_error.log', "Falló la conexión MQTT\n", FILE_APPEND);
}

function procesarMensaje($topic, $msg) {
    // Ejemplo: Guardar en MySQL
    $db = new PDO('mysql:host=localhost;dbname=iot_db', 'usuario_db', 'password_db');
    $stmt = $db->prepare("INSERT INTO sensores (topic, valor, fecha) VALUES (?, ?, NOW())");
    $stmt->execute([$topic, $msg]);
    
    error_log("Dato guardado: $topic = $msg");
}
//wget https://raw.githubusercontent.com/bluerhinos/phpMQTT/master/phpMQTT.php -O phpMQTT.php instalar
?> 