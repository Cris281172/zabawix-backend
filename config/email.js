const nodemailer = require('nodemailer');
const Email = require('email-templates');
const path = require('path');
require('dotenv').config()

const transportConfig = {
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
}

const sendMail = (options) => {
    const transporter = nodemailer.createTransport(transportConfig);

    transporter.sendMail(options, (err, info) => {
        if(err) return console.log(err);
    })
}

const sendTextEmail = (options) => {
    sendMail(options)
}

const sendHTMLEmail = async  (options, locals, templateName = 'main') => {
    const template = path.join(path.resolve('./'), `email-templates/${templateName}.pug`);

    const email = new Email({
        views: {
            root: template
        }
    })

    options.html = await email.render(template, locals)

    sendMail(options)
}

module.exports = {
    sendTextEmail,
    sendHTMLEmail
};