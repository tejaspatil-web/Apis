const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: "mail.gmx.com",
    port:587,
    auth: {
      user: 'open_store@gmx.com',
      pass: 'Tejas@5727'
    }
  });

  module.exports = transporter