const WIFI_NAME = 'Natlex';
const WIFI_OPTIONS = {
  password: 'GoNatlex!!!'
};
const PORT = 80;

const wifi = require('Wifi');
const http = require('http');
let on = false;
const PIN = NodeMCU.D4;
digitalWrite(PIN, on);

function error404(req, res) {
  res.writeHead(404);
  res.end('Not found');
}
function index(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end('<html><head><script>window.onload = () => {const btn = document.getElementById("btn"); btn.onclick = () => {fetch("/toggle").then(res => res.json()).then(data => btn.innerText=data.on ? "OFF" : "ON");};}</script></head><body><button id="btn">' + (!on ? 'OFF' : 'ON') + '</button></body></html>');
}
function toggle(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  on = !on;
  digitalWrite(PIN, on);
  res.end('{"status": "ok", "on": ' + !on + '}');
}

const router = [
  {
    path: '/',
    handler: index
  },
  {
    path: '/toggle',
    handler: toggle
  }
];

function pageHandler(req, res) {
  const route = router.find((r) => r.path === req.url);

  if (route) {
    route.handler(req, res);
  } else {
    error404(req, res);
  }
}

function startServer(ip) {
  http.createServer(pageHandler).listen(PORT);
  console.log('Server created at http://' + ip + ':' + PORT + '/');
}

function init() {
  console.log('Connecting...');
  wifi.connect(WIFI_NAME, WIFI_OPTIONS, err => {
    if (err !== null) {
      throw err;
    }
    const ip = wifi.getIP().ip;
    startServer(ip);
  });
}

init();
