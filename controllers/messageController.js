const accountSid = 'ACc01ea25978043f1af679516a879d4f34' // El id de tu cuenta; 
const authToken = '9ba895ea56cc652f0e3102f60788a13c' // El TOKEN de tu cuenta; 
const client = require('twilio')(accountSid, authToken); 
 

async function sendMessage(number, message){
    try {
        
        const response = await client.messages.create({
           body: message, 
           from: 'whatsapp:+14155238886', // El número que te proporcionen       
           to: `whatsapp:+549${number}`
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMessage;