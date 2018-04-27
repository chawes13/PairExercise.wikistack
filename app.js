const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const layout = require('./views/layout');

const app = express();

// Middleware (application wide)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));

// Routes (before refactor)
app.get('/', (req, res) => {
  res.send(layout(''));
});






const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Keep calm and deploy on: ${PORT}`);
});
