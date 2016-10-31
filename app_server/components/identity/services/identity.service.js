let async = require('async');
let jwt = require('jsonwebtoken');
let moment = require('moment');
let errors = require('../../../infrastructure/errors/errors');
let userService = require('../../core/services/user');

function generateToken (user, next) {
    let expirationInMinutes = parseInt(process.env.TOKEN_EXPIRATION_IN_MINUTES) || 15;
    let exp = moment(Date.now()).add(expirationInMinutes, 'minutes').valueOf();
    let jwtPayload = {
        exp,
        email: user.email,
        id: user._id.toString()
    };

    jwt.sign(jwtPayload, process.env.SECRET, {}, next);
}

function register (context, user, callback) {
    let db = context.resources.mongo.alttab;

    function createNewUser (next) {
        userService.create(db, user, next);
    }

    async.waterfall([
        createNewUser,
        generateToken    
    ], callback);
}

function login (context, params, callback) {
    let db = context.resources.mongo.alttab;

    function checkPassword (next) {
        userService.checkPassword(db, params, next);
    }

    async.waterfall([
        checkPassword,
        generateToken
    ], callback);
}

module.exports = {
    register,
    login
};