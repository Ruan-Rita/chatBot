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

    const send = async (msg, img = false) => {
        await instancia.sendMessage(msg, senderID, img ?? false)
    }
    

    const chats = await chatBot.chat(message)
    console.log("ANTES da Conversa --------------------------------------------")

    Array.from(chats).forEach(async function(conversa) {
        if(conversa != "" & conversa != undefined){
            await send(conversa, conversa.img ?? false)
        }
    })
   
});
routes.post('/facebook', async function(req, res){
    console.log("Recebendo Request do Twilio")
    console.log(req.body)

    const message = req.body.Body
    const senderID = req.body.From
});

routes.post('/ambiente', async function(req, res){
    console.log("Recebendo Request do Twilio")
    console.log(req.body)

    const chatC = new ChatController();
    
    res.json(await chatC.chat(req.body.msg))
});

module.exports = routes