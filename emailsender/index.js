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
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
    
    var mailOptions = {
      from: testAccount.user,
      to: receiver,
      subject: 'Sending Email using Node.js',
      text: verification_link
    };
    
    await transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        console.log("Info", info);
      }
    });
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