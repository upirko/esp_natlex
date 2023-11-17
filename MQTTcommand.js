var wifi = require('Wifi');
var WIFI_NAME = 'Natlex';
var WIFI_OPTIONS = {
  password: 'GoNatlex!!!'
};
var DEVICE_NAME = 'ESP_1';

var mqtt = require('MQTT').create('upirko.tech', {
  port: 1883,
  client_id: DEVICE_NAME
});

var led = false;
digitalWrite(NodeMCU.D4, led);
function toggle_led() {
  led = !led;
  digitalWrite(NodeMCU.D4, led);
}

mqtt.on('publish', function (pub) {
  console.log(pub.topic + ': ' + pub.message);
  if (pub.topic == 'command') {
    var data = pub.message.split(':');
    if (data.length == 2 && data[0] != DEVICE_NAME) {
      return;
    }
    var command = data.length == 2 ? data[1] : data[0];
    switch (command) {
      case 'toggle_led':
        toggle_led();
        break;
    }
  }
});

function mqttConnect() {
  console.log('MQTT connecting');
  mqtt.connect();
  setTimeout(function() {
    mqtt.publish('message', DEVICE_NAME + ':ready');
    mqtt.subscribe('command');
  }, 1000);
}

wifi.connect(WIFI_NAME, WIFI_OPTIONS, err => {
  if (err !== null) {
    throw err;
  }
  const ip = wifi.getIP().ip;
  console.log(ip);

  mqttConnect();
});
