const { createServer } = require('http');
const { Server } = require('socket.io');
const { addClient } = require('./socket-client');

const app = require('./app');
const httpServer = createServer(app);

// Create a Web Socket Server on top of this http server
const wsServerOptions = {
  // We want to let connections come from other origins
  cors: {
    origin: '*',
    methods: ['GET'],
  }
};
const wsServer = new Server(httpServer, wsServerOptions);

// When a new socket connects, hand it off to our addClient function
wsServer.on('connection', (socket) => addClient(socket));

// Start the server on port 5000
httpServer.listen(5000);
