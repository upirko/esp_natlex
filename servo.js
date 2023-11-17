var s = require("servo").connect(NodeMCU.D5);
var f = false;

setInterval(function() {
  f = !f;
  s.move(f ? 1 : 0);
}, 2000);