const emailConfig = require('../config/default');
const { EMAIL } = require('./constant');
const nodemailer = require('nodemailer');

class EmailProvider {
  constructor() {
    this.credential = emailConfig.SMTP;
    this.transporter = nodemailer.createTransport(this.credential);
  }

  transportEmail(mailOptions){
    this.transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        throw new Error(err);
      else
        console.log(info);
    });
  }

  sendEmail(userType, type, data) {
    switch (type) {
      case EMAIL.FORGOT_PWD.TYPE: this.forgotPassword(data); break;
    }
  }

  forgotPassword(data) {
    const mailOptions = {
      from: 'sender@email.com',
      to: 'madhurendra.singh@mobilyte.com',
      subject: 'Subject of your email',
      html: '<p>Your html here</p>'
    };
    this.transportEmail(mailOptions);
  }

  
}

module.exports = new EmailProvider();