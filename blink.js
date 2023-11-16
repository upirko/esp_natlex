var on = false;

setInterval(function() {
  on = !on;
  digitalWrite(NodeMCU.D4, on);
}, 1000);