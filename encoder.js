function Encoder(pina, pinb, callback) {
  this.PINA = pina;
  this.PINB = pinb;
  this.callback = callback;
  var encoder = this;
  var onChange = function() {
    var a = digitalRead(encoder.PINA);
    var b = digitalRead(encoder.PINB);
    var s = 0;
    switch (this.last) {
      case 0b00 : if (a) s++; if (b) s--; break;
      case 0b01 : if (!a) s--; if (b) s++; break;
      case 0b10 : if (a) s--; if (!b) s++; break;
      case 0b11 : if (!a) s++; if (!b) s--; break;
    }
    this.last = a | (b<<1);
    if (s!==0) callback(s);
  };
  onChange();
  setWatch(onChange, this.PINA, { repeat: true });
  setWatch(onChange, this.PINB, { repeat: true });
}

var value = 0;
var maxValue = 10;
var minValue = 0;
Encoder(NodeMCU.D1, NodeMCU.D2, function (direction) {
  value = Math.max(Math.min(value + direction, maxValue), minValue);
  console.log(value);
});