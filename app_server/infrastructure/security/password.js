let async = require('async');
let bcrypt = require('bcrypt');

let saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;

function hashPassword (password, cb) {

    function generateSalt (next) {
        bcrypt.genSalt(saltRounds, next);
    }

    function hash (salt, next) {
        bcrypt.hash(password, salt, next);
    }

    async.waterfall([
        generateSalt,
        hash 
    ], cb);
}

function checkPassword (password, passwordHash, cb) {
    bcrypt.compare(password, passwordHash, cb);
}

module.exports = {
    hashPassword: hashPassword,
    checkPassword: checkPassword
};