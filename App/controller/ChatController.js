const messageDatabase = require('../database/chat.json')
const historic = require('../database/historic.json')
const fs = require('fs');
const path = require('path')

class HomeController{
    chat(message){
        let customMessage = [];
        // customMessage.push(messageDatabase.initial.msg)
        
        var validateMessage = false
        //  todos os chats ids
        Array.from(messageDatabase.chatting).forEach(chat => {
            if(chat.chat_id == message){
                validateMessage = true;
                // mensagem correspondente o que ele respondeu
                customMessage.push(chat.body.msg)
                this.database(messageDatabase.chatting[0].chat_id)
                
                Array.from(chat.body.options).map(item => {
                    console.log(item)
                    customMessage.push(item.msg)
                });
            }
        })
        
        if(!validateMessage){
            customMessage.push(messageDatabase.chatting[0].body.msg)
            this.database(messageDatabase.chatting[0].chat_id)
            Array.from(messageDatabase.chatting[0].body.options).map(item => {
                console.log(item)
                customMessage.push(item.msg)
            });
        }

        

        console.log()
        console.log("Dados armazenados")
        console.log(historic)

        return customMessage;
    }

    database(message){
        const pathDatabase = path.join(__dirname, '../', 'database', 'historic.json') 
        const mesDatabase = {
            "lastMsgID": message,
            "created_at": new Date(),
        }
        fs.writeFile(pathDatabase, JSON.stringify(mesDatabase), err => {
            console.log(err || 'Arquivo salvo');
        });
    }
}

module.exports = HomeController