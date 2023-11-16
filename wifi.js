const WIFI_NAME = 'Natlex';
const WIFI_OPTIONS = {
  password: 'GoNatlex!!!'
};

const wifi = require('Wifi');

function init() {
  console.log('Connecting...');
  wifi.connect(WIFI_NAME, WIFI_OPTIONS, err => {
    if (err !== null) {
      throw err;
    }
    const ip = wifi.getIP().ip;
    console.log(ip);
  });
}

init();