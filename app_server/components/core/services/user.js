let async = require('async');

let userStore = require('../../../infrastructure/stores/mongo/user');
let passwordService = require('../../../infrastructure/security/password');
let errors = require('../../../infrastructure/errors/errors');

function findByEmail (db, email, callback) {
    userStore.findByEmail(db, email, callback);
}

function findById (db, id, callback) {
    userStore.findById(db, id, function findResult (err, user) {
        if (err) {
            return callback(errors.internalError(err));
        }

        if (!user) {
            return callback(errors.notFoundError(`User was not found`));
        }

        user.id = user._id;
        delete user._id;

        callback(null, user);
    });
}

function create (db, user, callback) {
    function findUser (next) {
        findByEmail(db, user.email, next);
    }
    
    function checkIfUserExists (exists, next) {
        if (exists) {
            return next(errors.entityAlreadyExists('User already exists'));
        }

        next();
    }

    function hashPassword (next) {
        passwordService.hashPassword(user.password, function hashResult (err, hash) {
            if (err) {
                return next(errors.internalError(err));
            }

            user.password = hash;

            next();
        });
    }

    function insertUser (next) {
        userStore.create(db, user, err => next(err, user));
    }

    async.waterfall([
        findUser,
        checkIfUserExists,
        hashPassword,
        insertUser
    ], 
    callback);
}

function checkPassword (db, params, callback) {
    function findUser (next) {
        findByEmail(db, params.email, next);
    }
    
    function validatePassword (user, next) {
        if (!user) {
            return next(errors.authenticationError());
        }

        passwordService.checkPassword(params.password, user.password, function checkResult (err, match) {
            if (err) {
                return next(errors.internalError(err));
            }

            if (!match) {
                return next(errors.authenticationError());
            }

            next(null, user);
        });
    }

    async.waterfall([
        findUser,
        validatePassword
    ], callback);
}

module.exports = {
    create,
    checkPassword,
    findByEmail,
    findById
};