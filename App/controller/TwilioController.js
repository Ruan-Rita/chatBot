// token de login no twilio
// hwRRjYKfaRQAfF0g890pIevPSYJqQwr0veSYgh_1 
const env = require('../../env');
const twilio = require('twilio');

class Twillio {
  
  constructor() {
    this.accountSid =  env.twilio.account_sid  
    this.authToken = env.twilio.auth_token;     
    this.client = new twilio(this.accountSid, this.authToken, {lazyLoading: true});
    console.log("instancei o twilio -> com os dados da conta")
  }

  sendMessage(message, senderID){
    console.log("enviando mensagem")
    try {
      this.client.messages.create({
        body: message,
        to: senderID, // Esse numero está configurado para send email in production tirando 1 dollar por mes
        from: 'whatsapp:+14155238886', // From a valid Twilio number
      }).then((message) => console.log(message.sid));
    }
    catch (e) {
      console.log(`Error no controller de send email: ${e}`); // passa o objeto de exceção para o manipulador de erro
    }
  }
}

module.exports = Twillio