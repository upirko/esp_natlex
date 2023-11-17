const WIFI_NAME = 'Natlex';
const WIFI_OPTIONS = {
  password: 'GoNatlex!!!'
};
const PORT = 80;

const wifi = require('Wifi');
const http = require('http');
let btn = false;

function error404(req, res) {
  res.writeHead(404);
  res.end('Not found');
}
function index(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end('<html><body>Button status: ' + (btn ? 'Pressed' : 'Not pressed') + '</body></html>');
}

const router = [
  {
    path: '/',
    handler: index
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

setWatch(function(e) {
  btn = true;
  console.log('Pressed');
}, NodeMCU.D2, { repeat: true, edge: 'rising' });

setWatch(function(e) {
  btn = false;
  console.log('Not pressed');
}, NodeMCU.D2, { repeat: true, edge: 'falling' });
