//HTTP Module Nodejs
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, {
      //200 is OK status for the server
      'Content-Type': 'text/html',
    });
    res.end(`
        <h1>Form</h1>
        <form method='post' action='/'>
        <input name='title' type='text' />
        <button type='Submit'>Send</button>
        </form>`);
  } else if (req.method === 'POST') {
    let body = [];

    req.on('data', (data) => {
      body.push(Buffer.from(data));
    });

    req.on('end', () => {
      const message = body.toString().split('=')[1];

      res.end(`
      <h1>Your Message: ${message}</h1>
      `);
    });
  }
});

server.listen(3000, () => {
  console.log('Server is running');
});
