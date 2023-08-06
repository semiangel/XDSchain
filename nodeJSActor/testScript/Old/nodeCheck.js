const http = require('http');

const data = JSON.stringify({
  jsonrpc: '2.0',
  method: 'web3_clientVersion',
  params: [],
  id: 1
});

const options = {
  hostname: '192.168.1.100',
  port: 8545,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  let response = '';
  res.on('data', (d) => {
    response += d;
  });
  res.on('end', () => {
    console.log(response);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
