const express = require('express');
const cors = require('cors');
const app = express();

// Allow cross-origin requests (from React front-end to this back-end server)
app.use(cors());

// You can add any normal Express routes like you always do
app.get('/', (req, res) => {
  res.json('ok');
});

module.exports = app;
