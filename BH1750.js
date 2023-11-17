I2C1.setup({ sda: NodeMCU.D2, scl: NodeMCU.D1 });
var bh = require("BH1750").connect(I2C1, false); //pin addr to low

function getData() {
  setTimeout(function() {
    bh.start(1, true);
    var level = bh.read();
    console.log(level + 'lux');
    getData();
  }, 4000);
}

getData();