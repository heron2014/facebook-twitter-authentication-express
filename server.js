'use strict';

const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000); //you can simply defined const
app.use(express.static('public')); // /public/css
app.set('view engine', 'ejs');


app.get('/', (req, res, next) => {
  res.render('login');
});

app.listen(app.get('port'), () => console.log('Server is listenning on ',app.get('port')));
