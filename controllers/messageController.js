// accountSid  -> El id de tu cuenta; 
// authToken  -> El TOKEN de tu cuenta; 
const { accountSid, authToken } = require("../config")
const client = require('twilio')(accountSid, authToken); 
const Notification = require('../models/Notification')
 

async function sendMessage(number, message, idService){
    try {
        
        const response = await client.messages.create({
           body: message, 
           from: 'whatsapp:+14155238886', // El número que te proporcionen       
           to: `whatsapp:+549${number}`
        });
        //console.log(response)
        const hoy = Date.now();
        const fecha = new Date(hoy);

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