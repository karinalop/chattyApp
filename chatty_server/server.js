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
  console.log("Clients conected" + wss.clients.size);

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        client.send(data);
      }
    });
  };

  wss.broadcast(JSON.stringify({type: "usersConected", id: uuidv1(), content: wss.clients.size}));


    ws.on('message', function incoming(message) {
      const objMess = JSON.parse(message);
      switch(objMess.type) {
        case "postMessage":
        const mess = {type: "incomingMessage", id: uuidv1(), username: objMess.username, content: objMess.content };
        wss.broadcast(JSON.stringify(mess));
        break;

        case "postNotification":
        wss.broadcast(JSON.stringify({type: "incomingNotification", id: uuidv1(), content: objMess.content }));
        break;

        default:
        throw new Error("Unknown event type " + objMess.type);
      }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    console.log(wss.clients.size);
    wss.broadcast(JSON.stringify({type: "usersConected", id: uuidv1(), content: wss.clients.size }));
  });

});
