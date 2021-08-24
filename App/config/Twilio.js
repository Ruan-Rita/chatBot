const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.conversations.conversations
    .create({friendlyName: 'SMS-to-WhatsApp Example'})
    .then(conversation => console.log(conversation.sid));

