var on = false;
setInterval(function() {
  on = !on;
  digitalWrite(NodeMCU.D2, on);
}, 1000);