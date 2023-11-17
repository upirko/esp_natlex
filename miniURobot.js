const WIFI_NAME = 'Natlex';
const WIFI_OPTIONS = {
  password: 'GoNatlex!!!'
};
const PORT = 80;

const wifi = require('Wifi');
const http = require('http');

const M1_1 = NodeMCU.D1;
const M1_2 = NodeMCU.D2;
const M2_1 = NodeMCU.D5;
const M2_2 = NodeMCU.D6;

function error404(req, res) {
  res.writeHead(404);
  res.end('Not found');
}
function index(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end(`
<html>
  <head>
    <style>
      button {width: 100px;text-align: center;font-size: 48px;}
    </style>
    <script>
      window.onload = () => {
        let s = (d) => {
          fetch('/go?d=' + d);
        };
        let btns = document.querySelectorAll('button');
        btns.forEach(b => {
          b.addEventListener('mousedown', e => s(e.target.getAttribute('d')));
          b.addEventListener('mouseup', (e) => s('stop'));
        });
      }
    </script>
  </head>
  <body>
    <table>
      <tr>
        <td></td>
        <td>
          <button d="up">&uarr;</button>
        </td>
        <td></td>
      </tr>
      <tr>
        <td><button d="left">&larr;</button></td>
        <td><button d="down">&darr;</button></td>
        <td><button d="right">&rarr;</button></td>
      </tr>
    </table>
  </body>
</html>
  `);
}

function go(req, res) {
  switch (req.query.d) {
    case 'up':
      digitalWrite(M1_1, 1);
      digitalWrite(M1_2, 0);
      digitalWrite(M2_1, 1);
      digitalWrite(M2_2, 0);
      break;
    case 'down':
      digitalWrite(M1_1, 0);
      digitalWrite(M1_2, 1);
      digitalWrite(M2_1, 0);
      digitalWrite(M2_2, 1);
      break;
    case 'left':
      digitalWrite(M1_1, 0);
      digitalWrite(M1_2, 1);
      digitalWrite(M2_1, 1);
      digitalWrite(M2_2, 0);
      break;
    case 'right':
      digitalWrite(M1_1, 1);
      digitalWrite(M1_2, 0);
      digitalWrite(M2_1, 0);
      digitalWrite(M2_2, 1);
      break;
    case 'stop':
      digitalWrite(M1_1, 0);
      digitalWrite(M1_2, 0);
      digitalWrite(M2_1, 0);
      digitalWrite(M2_2, 0);
      break;
  }
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.end('{"status": "ok"}');
}

const router = [
  {
    path: '/',
    handler: index
  },
  {
    path: '/go',
    handler: go
  }
];

function pageHandler(req, res) {
  var reqUrl = url.parse(req.url, true);
  const route = router.find((r) => r.path === reqUrl.pathname);

  if (route) {
    route.handler(reqUrl, res);
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
    digitalWrite(NodeMCU.D4, 0);
  });
}

init();
