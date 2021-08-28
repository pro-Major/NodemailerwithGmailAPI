const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
require('dotenv').config({path:'./.env'})

const authClient = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URL)
authClient.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
 


async function sendMail() {
    try {
        const ACCESS_TOKEN = await authClient.getAccessToken()
        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{ 
            type : 'Oauth2',
            user:'navikbipin@gmail.com',
            clientId: process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            refreshToken:process.env.REFRESH_TOKEN,
            accessToken:ACCESS_TOKEN}
        })
        const mailData = {
            from:'Bipin Navik <navikbipin@gmail.com>',
            to:'bipin@nimapinfotech.com',
            subject:'Test Mail from Gmail API',
            text:'Hello, Gmail API is working Now.'

        }

        const data = await transport.sendMail(mailData)
        return data;
    } catch (error) {
        return error
    }
}

sendMail().then(result=> { console.log('Email Sent Successfully ',result)})
.catch(err=> {console.log(err.message)})