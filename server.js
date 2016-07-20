'use strict';

const express = require('express');
const app = express();
const passport = require('passport');
const mySession = require('./app/session');

//Social authentication logic
require('./app/auth')();

app.set('port', process.env.PORT || 3000); //you can simply defined const
app.use(express.static('public')); // /public/css
app.set('view engine', 'ejs');

app.use(mySession);
// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res, next) => {
  res.render('login');
});

app.get('/private', (req, res, next) => {
  res.render('private');
});

app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),(req, res, next) => {
  res.redirect('/private');
});


app.listen(app.get('port'), () => console.log('Server is listenning on ',app.get('port')));
