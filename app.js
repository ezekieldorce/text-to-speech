const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app= express();
const apiKey= process.env.APIKEY

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
app.set('port', PORT);
app.set('env', NODE_ENV);
app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.render('home.ejs');
});
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});
app.listen(PORT, () => {
  console.log(
    `Express Server started on Port ${app.get(
      'port'
    )} | Environment : ${app.get('env')}`
  );
});
