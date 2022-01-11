const inviteLinkLength = 8;
const sendEmail = require('../emailsender/index');

exports.makeInviteLink = (length) =>{
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.handleSendVerificationEmail = (submited_email, verification_code, verification_link, purpose_type_string) => {
    console.log('Submitted email: ' + submited_email)
    let templatedEmail = {
        to_email: submited_email,
        verify_code: verification_code,
        purpose_type: purpose_type_string, //"Change Password"
        verify_link: verification_link,
    }
    sendEmail.verification(templatedEmail);
}
