const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const userController = require('./controllers/userController');
// const searchController = require('./controllers/searchController');
const path = require('path');
const logger = require('morgan');

const runScraper = require('./scraper.js');

const passport = require('./passport.js');

const PORT = process.env.PORT || 3333;
/* * * * * 
  Express session makes the session object accessible to by putting it on the request object as req.session (json object)
  This object is persisted throughout the application
* * * * */
const session = require('express-session');

mongoose.connect('mongodb://admin:oneClick@pply@dmin321@ds119306.mlab.com:19306/oneclickapply', () => {	
  console.log('Connection to database successful');
});

app.use(logger('url'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'yooo',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./static'));

/* * * * *
  Server routing for authentication
* * * * */

app.post('/login', passport.authenticate('local', { successRedirect: '/success', failureRedirect: '/failure' }));

app.get('/success', (req, res) => res.status(200).send('Login Successful'));

app.get('/failure', (req, res) => res.status(401).send('Login Failed'));

app.post('/searchbar', async (req, res) => {
  const data = await runScraper(req.body.searchterm);
  console.log(data);
  if (data) res.status(200).json(JSON.stringify(data));
  else res.status(404);
});

// ensures that all routes are to be handled by REACT
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './static/index.html')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
