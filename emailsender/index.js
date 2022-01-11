const emailjs = require("emailjs-com");

const serviceId = "service_xryud6j";
const templateId_invitation = "template_j4pd2o3";
const templateId_verification = "template_6chzc6b";
const userId = "user_Fl7wGEZtBmtwoQxwYwb8Y";

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
  verification: async (param) => {
    try {
      const response = await emailjs.send(
        serviceId,
        templateId_verification,
        param,
        userId
      );

      if (response.status === 200) {
        console.log("Successfully sent message.");
      }
    } catch (error) {
      console.error("Failed to send email. Error: ", error);
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