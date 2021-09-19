const Twilio = require('../../App/controller/TwilioController');
const ChatController = require('../../App/controller/ChatController');

const routes = require('express').Router();
const path = require('path')

routes.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../', 'pages', 'Home', 'index.html'))
    
});

routes.post('/whatsapp', async function(req, res){
    console.log("Recebendo Request do Twilio")
    console.log(req.body)

    const message = req.body.Body
    const senderID = req.body.From
    
    var instancia = new Twilio();
    instancia.sendMessage("Você está conversando com chatbot do Ruan!", senderID)
});

routes.post('/ambiente', async function(req, res){
    console.log("Recebendo Request do Twilio")
    console.log(req.body)

    const chatC = new ChatController();
    res.json(chatC.chat(req.body.msg))
});

module.exports = routes