const accountSid = 'ACc01ea25978043f1af679516a879d4f34' // El id de tu cuenta; 
const authToken = 'c26e0e42a8de63902b1f1ac5e0dab7d9' // El TOKEN de tu cuenta; 
const client = require('twilio')(accountSid, authToken); 
const Notification = require('../models/Notification')
 

async function sendMessage(number, message, idService){
    try {
        
        const response = await client.messages.create({
           body: message, 
           from: 'whatsapp:+14155238886', // El número que te proporcionen       
           to: `whatsapp:+549${number}`
        });
        const hoy = Date.now();
        const fecha = new Date(hoy);
        const fechayhora = fecha.toLocaleString()

        const data = {
            idService: idService,
            message: message,
            datetime: fecha
        }
        const newNotification = new Notification(data)
        const result = await newNotification.save()


    } catch (error) {
        console.log(error);
    }
}

module.exports = sendMessage;