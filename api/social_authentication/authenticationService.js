const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require('axios');
const userModel = require('../users/userModel');
const jwt = require('jsonwebtoken');

exports.googleAuthentication = async (tokenID) => {
    const ticket = await client.verifyIdToken({
        idToken: tokenID,
        audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    
    const mail = payload['email'];
    const ggID = payload['googleID'];
    const name = payload['name'];
    const acc = await userModel.getUserWithEmail(mail);
    if (acc) {
        if (acc.googleID == '') {
            await userModel.updateInfoForOneField('googleID', ggID, acc.id)
        }
        if (acc.name == '') {
            await userModel.updateInfoForOneField('name', name, acc.id)
        }
        const result ={
            user: acc.username,
            token: jwt.sign({
                id: acc.id,
                username: acc.username,
            }, 'secret', {
                expiresIn: '1h'
            })
        };
        
        return result
    } else {
        let newAccount = {
            username: '',
            password: '',
            googleToken: ggID,
            email: mail
        }
        await userModel.create(newAccount);
        const acc = await userModel.findAccWithMail(mail);
        const result = {
            user: newAccount.username,
            token: jwt.sign({
                id: acc.id,
                username: acc.username,
            }, 'secret', {
                expiresIn: '1h'
            })
        };
        
        return result;
    }
}