const express = require('express')
const app = express()
const routes = require('./src/routes');
const bodyparse = require('body-parser')
app.use(bodyparse.urlencoded({extended:true}))
app.use(bodyparse.json())

app.use(routes);
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000...')
});

module.exports = app

