const messageDatabase = require('../database/chat.json')
const historic = require('../database/historic.json')
const fs = require('fs');
const outOfTime = "Tempo resposta com atraso mais de 1 min encerramos a conversa automaticamente."
const path = require('path')

class HomeController{
    chat(message){
        let customMessage = [];
        // customMessage.push(messageDatabase.initial.msg)
        
        // Reconhcer palavras
        const recognize = this.recognize(message);
        if(false){
            console.log("------------------------")
            console.log("Entrou no send message com reconhecimento")
            Array.from(messageDatabase.chatting).forEach(chat => {
                    
                // console.log(`Hora da Verdade, Historic: ${value} é igual a foreach: ${chat.chat_id}`)
                if(chat.chat_id == recognize){
                    customMessage.push(messageDatabase.chatting[0].body.msg)
                    this.database(messageDatabase.chatting[0].chat_id)
                    Array.from(messageDatabase.chatting[0].body.options).map(item => {
                        console.log(item)
                        item.msg != "" && customMessage.push(item)
                    });

                }
            })
            
        }else{
            var validateMessage = false    
            // a mesagem atual corresponse a linha de mensagem do historico
            const value = this.historicValidate(message)
            value.outOfTime && customMessage.push({msg: outOfTime})
            if(value.validate){
                //  todos os chats ids
                Array.from(messageDatabase.chatting).forEach(chat => {
                    
                    // console.log(`Hora da Verdade, Historic: ${value} é igual a foreach: ${chat.chat_id}`)
                    if(chat.chat_id == value.validate){
                        validateMessage = true;
                        // mensagem correspondente o que ele respondeu
                        customMessage.push(chat.body)
                        
                        Array.from(chat.body.options).map(item => {
                            console.log(item)
                            item.msg != "" && customMessage.push(item)
                        });
                    }
                })
                validateMessage
            }
            
            
            if(!validateMessage){
                customMessage.push(messageDatabase.chatting[0].body)
                this.database(messageDatabase.chatting[0].chat_id)
                Array.from(messageDatabase.chatting[0].body.options).map(item => {
                    console.log(item)
                    item.msg != "" && customMessage.push(item)
                });
            }

        }

        // console.log()
        // console.log("Dados armazenados")
        // console.log(historic)

        return customMessage;
    }

    // reconhecer
    recognize(message){
        var find = false

        const chaveValues = []
        Array.from(messageDatabase.chatting).forEach(botConversa => {
                
        // if(chat.chat_id == value.validate){
        // arr.forEach((botConversa, index) => {
            var contador = 0
            const wordRepetition = []

            botConversa.body.msg.split(" ").forEach( palavraBot => {
                // console.log("entrou aqui -----*******------ //// **** *//*/***---")

                // wordRepetition.push(palavraBot)
                // var validateWord = false

                // wordRepetition.forEach(valWord => {
                //     if(valWord.toLowerCase() == palavraBot.toLowerCase()) validateWord = true
                // })                
                // if (validateWord) return;
                message.split(" ").forEach(palavraCliente => {
                    console.log(`Client: ${palavraCliente.toLowerCase()}`)
                    console.log(`Bot: ${palavraBot.toLowerCase()}` )

                    if(palavraCliente.toLowerCase() > (palavraBot.toLowerCase()) || palavraCliente.toLowerCase() < (palavraBot.toLowerCase()) ){
                      
                    } else{
                        contador ++; 
                        console.log(`ENCOTROU POHA --------------- Bot: ${palavraBot.toLowerCase()} e Client: ${palavraCliente.toLowerCase()}` )

                    }
                })
            })

            chaveValues.push({chave: botConversa.chat_id, cont: contador})
        // })
        })
        
        function maiorGet(arra){
            var maior = {chave: 0, cont: 0};
            arra.forEach(item => {
                if(maior.chave < item.value){
                    maior = {chave:item.key, cont: item.cont}
                }
            })
            return maior
        }
        const maior = maiorGet(chaveValues)
        console.log("****************************************************")
        console.log("RECONHECER")
        console.log("****************************************************")
        console.log(chaveValues)
        console.log("O maior deles:")
        console.log(maior)

        return maior.chave ?? find
    }
    async createResourceEmpty(){
        if(!historic.created_at){
            const mesDatabase = {
                "lastMsgID": "",
                "created_at": "",
            }
            fs.writeFile(pathDatabase, JSON.stringify(mesDatabase), err => {
                console.log(err || 'Arquivo salvo');
            });
        }
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

    historicValidate(message){
        async () => {
            await this.createResourceEmpty()
        }
        var validate = false
        if(this.verifyDate(historic.created_at)){
            console.log("Deu Deu Fora Fora do prajo estabelecido")
            console.log("Reiniciando conversa .. . .. . .. ...")
            return {
                validate: validate,
                outOfTime: true
            }
        }
        Array.from(messageDatabase.chatting).forEach(chat =>  {
            if(historic.lastMsgID == chat.chat_id){
                // console.log(`Entrou, Historic: ${historic.lastMsgID} é igual a foreach: ${chat.chat_id}`)
                // console.log(`Entrou, Historic: ${historic.lastMsgID} é igual a foreach: ${chat.chat_id}`)
                Array.from(chat.body.options).map(item => {
                    if(item.opt == "all"){
                        validate = item.chave;
                        this.database(item.chave);
                        return {
                            validate: validate,
                            outOfTime: false
                        }
                    }else {
                        if (item.opt == message) {
                            validate = item.chave;
                            this.database(item.chave);
                            return {
                                validate: validate,
                                outOfTime: false
                            }

                        }
                    }
                });
            }
        })
        // if (validate) console.log("Bom, menssagem está no corpo de resposta atual do historico")
        // else console.log("Bom, mensagem não encotrada do historico")
        return {
            validate: validate,
            outOfTime: false
        }
    }
    verifyDate(data){
        const dataOld = new Date(data)
        const dateNow = new Date()

        // verifica se a conversa está parado mais de 1 minuto, se tiver inicia uma nova conversa
        if((dateNow.getMinutes() - 1) > dataOld.getMinutes()){
            console.log("Fora do Prajo !")
            return true
        }else {
            console.log("Dentro do Prajo !")
            return false;
        }
    }
}

module.exports = HomeController