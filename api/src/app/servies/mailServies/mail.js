const nodemailer = require('nodemailer');
const config = require('../../config');
const {email, password} = config.get('mailSender');

const mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        //type: 'OAuth2',
        user: email, //
        pass: password//
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
});
// verify connection configuration
mail.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('mail Server is ready to take our messages');
    }
});

const sender = config.email;

module.exports = {
    mail,
    sender
};
