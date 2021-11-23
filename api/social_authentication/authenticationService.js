const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const userService = require('../users/userService');
const accountService = require('../accounts/accountService');
const jwt = require('jsonwebtoken');

exports.googleAuthentication = async (tokenID) => {
    // no need for this fow now
}