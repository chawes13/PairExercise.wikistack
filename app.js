const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const layout = require('./views/layout');
const { db, Page, User } = require('./models/index');
const userRouter = require('./routes/user');
const wikiRouter = require('./routes/wiki');

const app = express();

// Middleware (application wide)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('combined'));

// Modular Routers
app.use('/wiki', wikiRouter);
app.use('/users', userRouter);

// Main Routes
app.get('/', (req, res) => {
  res.redirect('/wiki');
});

// App Initialization
async function init() {
  try{
    const PORT = process.env.PORT || 3000;
    await db.authenticate();
    await db.sync();

    app.listen(PORT, () => {
      console.log(`Keep calm and deploy on: ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start application', error);
  }

}

init();
