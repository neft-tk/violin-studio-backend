// Required Packages
const express = require('express');
const session = require('express-session');
const http = require('http');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');

// Initialize some stuff
const app = express();
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Declare a port.
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge:1000*60*60*2
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// MIDDLEWARE
app.use(express.static("public"))
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
});
