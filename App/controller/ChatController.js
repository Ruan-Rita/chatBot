const messageDatabase = require('../database/chat.json')
const historic = require('../database/historic.json')
const fs = require('fs');
const path = require('path')

class HomeController{
    chat(message){
        let customMessage = [];
        customMessage.push(messageDatabase.initial.msg)

        Array.from(messageDatabase.initial.options).map(item => {
            console.log(item)
            customMessage.push(item.msg)
        });

        console.log()
        console.log("Dados armazenados")
        console.log(historic)

        this.database(message)
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