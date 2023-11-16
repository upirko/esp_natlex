var wifi = require('Wifi');

wifi.startAP('ESP_WIFI', { password: '12345678', authMode: 'wpa2' }, function(err) {
  if (err) throw err;
  console.log("Connected!");
});