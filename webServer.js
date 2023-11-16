const WIFI_NAME = 'Natlex';
const WIFI_OPTIONS = {
  password: 'GoNatlex!!!'
};
const PORT = 80;

const wifi = require('Wifi');
const http = require('http');
const storage = require('Storage');

function error404(req, res) {
  res.writeHead(404);
  res.end('Not found');
}
function index(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
  res.end('<html><body><h1>Hello world!</h1></body></html>');
}

var fileHandler = function(req, res) {
  const url = req.url;
  var filesize;
  try {
    filesize = storage.read(url).length;
  } catch (e) {
    return false;
  }
  if (typeof(filesize) == 'undefined') {
    return false;
  }

  var header = { 'Content-Length': filesize };
  var fileExtension = url.split('.').pop();
  switch (fileExtension) {
    case 'html':
      header['Content-Type'] = 'text/html';
      header['Content-Encoding'] = 'gzip';
      break;
    case 'js':
      header['Content-Type'] = 'application/javascript';
      header['Content-Encoding'] = 'gzip';
      break;
    case 'css':
      header['Content-Type'] = 'text/css';
      header['Content-Encoding'] = 'gzip';
      break;
    case 'png':
      header['Content-Type'] = 'image/png';
      break;
    case 'jpeg':
    case 'jpg':
      header['Content-Type'] = 'image/jpeg';
      break;
    case 'gif':
      header['Content-Type'] = 'image/gif';
      break;
  }

  res.writeHead(200, header);
  const f = E.openFile(url);
  E.pipe(f, res, {chunkSize: 100} );
};

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
  } else if(!fileHandler(req, res)) {
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
