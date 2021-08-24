const routes = require('express').Router();
const path = require('path')


routes.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../', 'pages', 'Home', 'index.html'))
});

module.exports = routes