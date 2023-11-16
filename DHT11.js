var dht = require('DHT11').connect(NodeMCU.D1);

function getData() {
  dht.read(function(a) {
    console.log('Temp is ' + a.temp.toString());
    console.log('RH is ' + a.rh.toString());
    setTimeout(getData, 1000);
  });
}

getData();