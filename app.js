const nodemailer = require('nodemailer');
const {google} = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');


const CLIENT_ID = '997264818039-j4795lhfppnqmk80mfgqlssd4b24ftpq.apps.googleusercontent.com'
const CLIENT_SECRET = 'zI9F_qjjKV8Ea6Ah1787Gdum'
const REDIRECT_URL= 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04pXASofbcBg8CgYIARAAGAQSNwF-L9IrNs7K5QJNYzT0KsbDxbHV0kZ5hR22TZXLewuig8U70L-fGG9Huee0vGfJ_wHeliFx5NU'


const authClient = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URL)
authClient.setCredentials({refresh_token:REFRESH_TOKEN})


async function sendMail() {
    try {
        const ACCESS_TOKEN = await authClient.getAccessToken()
        const transport = nodemailer.createTransport({
            service:'gmail',
            auth:{ 
            type : 'Oauth2',
            user:'navikbipin@gmail.com',
            clientId: CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
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