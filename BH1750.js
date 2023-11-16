I2C1.setup({ sda: NodeMCU.D2, scl: NodeMCU.D1 });
var bh = require("BH1750").connect(I2C1, false);

function getData() {
  setTimeout(function() {
    bh.start(1, true);
    var level = bh.read();
    console.log(level);
    getData();
  }, 2000);
}

getData();