var arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var led = require('neopixel');
var n = 0;
var r = 0;
var g = 0;
var b = 0;

function setColor() {
  r = Math.random() * 255;
  g = Math.random() * 255;
  b = Math.random() * 255;
}

function tik() {
  arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  arr[n * 3] = r;
  arr[n * 3 + 1] = g;
  arr[n * 3 + 2] = b;

  led.write(NodeMCU.D2, arr);
  n++;
  if (n >= arr.length / 3) {
    n = 0;
    setColor();
  }
}

setColor();

setInterval(tik, 500);