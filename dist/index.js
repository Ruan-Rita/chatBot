"use strict";

var express = require('express');

var app = express();

var routes = require('./src/routes');

app.use(routes);
app.use(express["static"](__dirname + '/public'));
app.listen(3000, function () {
  console.log('Servidor rodando na porta 3000...');
});
module.exports = app;