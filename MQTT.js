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

function mqttConnect() {
  console.log('MQTT connecting');
  mqtt.connect();
  setTimeout(function() {
    mqtt.publish('message', DEVICE_NAME + ':ready');
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
