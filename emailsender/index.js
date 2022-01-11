const nodemailer = require('nodemailer');

const sendEmail = {
  invitation_email: async (param) => {
    try {
      const response = await emailjs.send(
        serviceId,
        templateId_invitation,
        param,
        userId
      );
      if (response.status === 200) {
        console.log("Successfully sent message.");
      }
    } catch (error) {
      console.error("Failed to send email. Error: ", error);
    }
  },
  verification: async (receiver, verification_link) => {
    try {
      /*let testAccount = await nodemailer.createTestAccount();
      console.log('testAccount', testAccount);*/
      console.log("Test transporter host");
      let transporter = nodemailer.createTransport({
        //host: "smtp.ethereal.email",
        //host: process.env.TEMP_HOST,
        service: 'hotmail',
        port: 587,
        auth: {
          user: process.env.TEMP_USERNAME,
          pass: process.env.TEMP_PASSWORD,
        }
      });
      
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: process.env.TEMP_USERNAME, // sender address
        to: receiver, // list of receivers
        subject: "Test send verification link", // Subject line
        text: verification_link, // plain text body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      console.log("Info", info);
      return info;
    }
    catch (err) {
      console.log(err)
    }
  }
}

module.exports = sendEmail;

//--------------------------How to use--------------------------
// const handleSendVerificationEmail = (submited_email, verification_code, purpose_type_string) => {

//     console.log('Submitted email: ' + submited_email)
//     let templatedEmail = {
//         to_email: submited_email,
//         verify_code: verification_code,
//         purpose_type: purpose_type_string, //"Change Password"
//     }
//     sendEmail.verification(templatedEmail);
// }