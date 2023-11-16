var sensor = require('HC-SR04').connect(NodeMCU.D1, NodeMCU.D2, function(dist) {
  console.log(dist + ' cm');
});

setInterval(function() {
  sensor.trigger();
}, 500);