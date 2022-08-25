'use strict';
const nodemailer = require('nodemailer');
const booking_html = require('./templates/booking_confirmation');

const main = async (mailid, details, ticketId) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'teamreservet@gmail.com',
      clientId:
        '514186109093-1r5pebukn3tp0btq7t2lqigrfjookosn.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken:
        '1//04YtRugAwDeZFCgYIARAAGAQSNwF-L9IriRymX3JFmyzUruVw4jbCWpXfskuazu3Z-ne9FwYdze_oRwmd1q-U8bBk90CEjhpkPGU',
      accessToken:
        'ya29.a0AVA9y1v-JeNGYHnTVWVWjwSRGY4HhlDx6Q6AnkPUa-8FuPZgPbbdcx_UdbB7KuUmPL_h0h2fe1CSBzdUSd4tONxxlhfgOBzdGfZ9Z8yxkzvVxDK29C9x3HtDYwkIbZjR0ueFrxawg4V5y-C82yeWW5uqXcJpaCgYKATASATASFQE65dr86DWtLo7rCDKdQTL3Xo5_YA0163',
      expires: 1484314697598
    }
  });

  let info = await transporter.sendMail({
    from: 'teamreservet@gmail.com', // sender address
    to: mailid, // list of receivers
    subject: 'Reservet Ticket', // Subject line
    html: booking_html(
      details,
      `http://api.qrserver.com/v1/create-qr-code/?data=https://reservet.netlify.app/verify-ticket/${ticketId}`,
      ticketId
    ) // html body
  });

  console.log('Message sent: %s', info.messageId);
};

module.exports = main;

// ------------------------------------------------------------------------------------

// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
// const OAuth2 = google.auth.OAuth2;

// const oauth2Client = new OAuth2(
//   '514186109093-1r5pebukn3tp0btq7t2lqigrfjookosn.apps.googleusercontent.com', // Client Id
//   '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', // Client Secret
//   'https://teamreservet.herokuapp.com/' // Redirect URL
// );

// oauth2Client.setCredentials({
//   refresh_token:
//     '1//04YtRugAwDeZFCgYIARAAGAQSNwF-L9IriRymX3JFmyzUruVw4jbCWpXfskuazu3Z-ne9FwYdze_oRwmd1q-U8bBk90CEjhpkPGU'
// });
// const accessToken = oauth2Client.getAccessToken();

// const smtpTransport = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     type: 'OAuth2',
//     user: 'teamreservet@gmail.com',
//     clientId:
//       '514186109093-1r5pebukn3tp0btq7t2lqigrfjookosn.apps.googleusercontent.com',
//     clientSecret: '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',
//     refreshToken:
//       '1//04YtRugAwDeZFCgYIARAAGAQSNwF-L9IriRymX3JFmyzUruVw4jbCWpXfskuazu3Z-ne9FwYdze_oRwmd1q-U8bBk90CEjhpkPGU',
//     accessToken: accessToken
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// const mailOptions = {
//   from: 'teamreservet@gmail.com',
//   to: 'prateekgoyal79@gmail.com',
//   subject: 'Node.js Email with Secure OAuth',
//   generateTextFromHTML: true,
//   html: '<b>test</b>'
// };

// smtpTransport.sendMail(mailOptions, (error, response) => {
//   error ? console.log(error) : console.log(response);
//   smtpTransport.close();
// });
