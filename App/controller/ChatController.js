const messageDatabase = require('../database/chat.json')
const db = require("../database/config")
const outOfTime = "Tempo resposta com atraso mais de 1 min encerramos a conversa automaticamente."

class HomeController{
    constructor(){

    }
    async chat(message){
        let customMessage = [];
        // customMessage.push(messageDatabase.initial.msg)
        
        // Reconhcer palavras
        // const recognize = this.recognize(message);
        if(false){
            // console.log("------------------------")
            // console.log("Entrou no send message com reconhecimento")
            // Array.from(messageDatabase.chatting).forEach(chat => {
                    
            //     // console.log(`Hora da Verdade, Historic: ${value} é igual a foreach: ${chat.chat_id}`)
            //     if(chat.chat_id == recognize){
            //         customMessage.push(messageDatabase.chatting[0].body.msg)
            //         this.historicValidate(messageDatabase.chatting[0].chat_id)
            //         Array.from(messageDatabase.chatting[0].body.options).map(item => {
            //             console.log(item)
            //             item.msg != "" && customMessage.push(item)
            //         });

            //     }
            // })
            
        }else{
            var validateMessage = false    
            // a mesagem atual corresponse a linha de mensagem do historico
            const value = await this.historicValidate(message)
            console.log("PAssou na validção?");
            console.log(value);

            value.outOfTime && customMessage.push({msg: outOfTime})
            if(!value.outOfTime && value.validate){
                console.log("passou na validacao de tempo");
                console.log(value.validate);
                //  todos os chats ids
                Array.from(messageDatabase.chatting).forEach(chat => {
                    
                    // console.log(`Hora da Verdade, Historic: ${value} é igual a foreach: ${chat.chat_id}`)
                    if(chat.chat_id == value.validate){
                        validateMessage = true;
                        // mensagem correspondente o que ele respondeu
                        customMessage.push(chat.body)
                        console.log(chat.body)
                        
                        Array.from(chat.body.options).map(item => {
                            console.log("///////////////////************************")

                            console.log(item)
                            item.msg != "" && customMessage.push(item)
                        });
                    }
                })
                // validateMessage
            }
            
            
            if(value.outOfTime || !validateMessage){
                console.log("Valição de tempo: Atrasou a a msg estamos atualizando o tempo");
                customMessage.push(messageDatabase.chatting[0].body)
                await this.database(messageDatabase.chatting[0].chat_id)
                console.log(messageDatabase.chatting[0].body)

                Array.from(messageDatabase.chatting[0].body.options).map(item => {
                    console.log("///////////////////************************")
                    console.log(item)
                    item.msg != "" && customMessage.push(item)
                });
            }
        }
        console.log("Finalizou não mais nada a mostrar")
        console.log("Quais são as mensagens a mostrar");
        console.log(customMessage);
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
    async getHistoric(){
        const historic = await db.HistoricModel.find({_id:"614f305ee4e539a3027bbe4d"}).catch(e =>{
            console.log("DEU MERDA NO MONGO")
            console.log(e)
        });

        return historic[0];
    }
    async database(message){
        const data = await db.HistoricModel.findOneAndUpdate({_id:"614f305ee4e539a3027bbe4d"}, {created_at: new Date(),lastMsgID: message }).catch(e =>{
            console.log("DEU MERDA NO MONGO")
            console.log(e)
        });
    }

    async historicValidate(message){
        console.log()
        console.log("Inciou a validação")
        const historic = await this.getHistoric();
        console.log("historic")
        console.log(historic);
        var validate = false
        if(this.verifyDate(historic.created_at)){
            console.log("Finalizou a validação no fora de prajo")
            return {
                validate: validate,
                outOfTime: true
            }
        }
        // console.log("Validar Validar Validar Val:idar Validar Validar:")
        // console.log(await this.getHistoric())
        Array.from(messageDatabase.chatting).forEach(chat =>  {
        console.log(`Estamos comparado his: ${historic.lastMsgID} com == chatid: ${chat.chat_id}`);
            
            if(historic.lastMsgID == chat.chat_id){
                // console.log(`Entrou, Historic: ${historic.lastMsgID} é igual a foreach: ${chat.chat_id}`)
                // console.log(`Entrou, Historic: ${historic.lastMsgID} é igual a foreach: ${chat.chat_id}`)
                Array.from(chat.body.options).map(async item => {
                    if(item.opt == "all"){
                        validate = item.chave;
                        await this.database(item.chave);
                        console.log("Finalizou a validação no item encotrado -- all")

                        return {
                            validate: validate,
                            outOfTime: false
                        }
                    }else {
                        if (item.opt == message) {
                            validate = item.chave;
                            console.log("Finalizou a validação no item encotrado -- item")

                            await this.database(item.chave);
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
        console.log("Finalizou a validação")
        console.log();
        return {
            validate: validate,
            outOfTime: false
        }
    }
    verifyDate(data){
        const dataOld = new Date(data)
        const dateNow = new Date()
        console.log("verifica se a conversa está parado mais de 1 minuto, se tiver inicia uma nova conversa");
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