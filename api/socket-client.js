const randomName = require('./random-name');
const { addMessage, messages } = require('./cache');

// Keep track of how many clients we have connected
let clients = 0;

module.exports.addClient = function(socket) {
  // Generate a unique name for this user
  const name = randomName();

  clients++;
  console.log('socket connected', clients, name);

  // Listen for 'message' events from this client
  socket.on('message', ({name, emojis}) => {
    console.log('message event', name, emojis);

    // Add this to our cache, so later clients can get it too
    addMessage(name, emojis);

    // Send this message to everyone connected
    socket.broadcast.emit('message', { name, emojis });    
  })

  // Listen for this client to disconnect
  socket.on('disconnect', () => {
    clients--;
    console.log('socket disconnected', clients, name);

    // Send a message to everyone about the number of clients changing
    socket.broadcast.emit('count', clients);

    // Clean-up listeners
    socket.offAny();
  });

  // Send the name we assigned to this user, recent messages, and the number of clients
  socket.emit('init', { name, messages: messages(), clients });

  // Send a message to everyone about the number of clients changing
  socket.broadcast.emit('count', clients);
};

module.exports.count = function() {
  return { connected: clientCount };
};
