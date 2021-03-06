//HTTP Module Nodejs
const http = require('http');
//File System Module
const fs = require('fs');
//Path Module
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, {
      //200 is OK status for the server
      'Content-Type': 'text/html; charset=utf-8',
    });

    if (req.url === '/') {
      //if on root url click, redirect user to the index file path
      fs.readFile(
        path.join(__dirname, 'views', 'index.html'),
        'utf-8',
        (err, content) => {
          if (err) {
            //always indicate errors
            throw err;
          }

          res.end(content);
        }
      );
    } else if (req.url === '/about') {
      //if on 'about' url click, redirect user to the about file path
      fs.readFile(
        path.join(__dirname, 'views', 'about.html'),
        'utf-8',
        (err, content) => {
          if (err) {
            //always indicate errors
            throw err;
          }

          res.end(content);
        }
      );
    } else if (req.url === '/api/users') {
      res.writeHead(200, {
        'Content-Type': 'text/json',
      });

      const users = [
        { name: 'Vadym', age: 25 },
        { name: 'Elena', age: 23 },
      ];

      res.end(JSON.stringify(users));
    }
  } else if (req.method === 'POST') {
    let body = [];
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
    });

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
