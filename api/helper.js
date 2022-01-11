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

exports.handleSendVerificationEmail = (receiver, verification_link) => {
    console.log('Receiver email: ' + receiver)
    sendEmail.verification(receiver, verification_link);
}
