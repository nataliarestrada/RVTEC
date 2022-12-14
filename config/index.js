require("dotenv").config()

const config = {
    port:process.env.PORT,
    dbName:process.env.DB_NAME,
    dbUser:process.env.DB_USER,
    dbPassword:process.env.DB_PASSWORD,
    dbHost:process.env.DB_HOST,
    dbPort:process.env.DB_PORT,
    secret:process.env.SECRET,
    accountSid:process.env.TWILIO_ACCOUNT_SID,
    authToken:process.env.TWILIO_AUTH_TOKEN
}

module.exports = config