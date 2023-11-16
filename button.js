setWatch(function(e) {
  console.log("Button pressed");
}, NodeMCU.D2, { repeat: true, edge: 'rising' });