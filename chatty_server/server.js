// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};


    ws.on('message', function incoming(message) {
      const objMess = JSON.parse(message);
      console.log('received: %s', message);
      const mess = {id: uuidv1(), username: objMess.username, content: objMess.content };
      wss.broadcast(JSON.stringify(mess));


      //ws.send(JSON.stringify(mess));
      // Broadcast to everyone else.
    //   wss.clients.forEach(function each(client) {
    //     //console.log(client.readyState === ws.OPEN);
    //     //console.log(ws.OPEN);
    //     if (client.readyState === ws.OPEN) {
    //       console.log(JSON.stringify(mess));
    //       client.send(JSON.stringify(mess));
    //     }
    // });
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  wss.on('close', () => console.log('Client disconnected'));
});
