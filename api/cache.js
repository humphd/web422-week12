// Least-Recently-Used Cache, see: https://www.npmjs.com/package/lru-cache
const LRU = require('lru-cache');

// Remember the last 50 messages, or anything 1 hour old
const cache = new LRU({ max: 50, maxAge: 1000 * 60 * 60});

// Use a sequential id for our messages in the cache
let id = 1;

// Add an item to the cache, generating a simple, unique id
module.exports.addMessage = function(name, emojis) {
  cache.set(id++, {name, emojis});
};

// Return just the values (messages) from the cache
module.exports.messages = function() {
  return cache.values(); 
};

