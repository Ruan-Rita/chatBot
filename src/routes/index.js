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
    const chatBot = new ChatController();
    const chats = chatBot.chat(message)
    instancia.sendMessage("teste", senderID, false)
    console.log("/////////////////********************************************************")
    console.log("/////////////////********************************************************")
    console.log("/////////////////********************************************************")
    console.log("/////////////////********************************************************")
    // console.log(chats)

    Array.from(chats).forEach(conversa =>  {
        console.log("Conversa --------------------------------------------")
        console.log(conversa)

        instancia.sendMessage(conversa.msg, senderID, false)
    })
});

routes.post('/ambiente', async function(req, res){
    console.log("Recebendo Request do Twilio")
    console.log(req.body)

    const chatC = new ChatController();
    
    res.json(chatC.chat(req.body.msg))
});

module.exports = routes