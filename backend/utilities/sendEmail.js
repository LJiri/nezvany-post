import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(email, subject, message) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.seznam.cz",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "nezvanypost@email.cz", // generated ethereal user
      pass: process.env.EMAIL_PWD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "nezvanypost@email.cz", // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: message, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
