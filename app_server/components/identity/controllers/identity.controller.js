let identityService = require('../services/identity.service');

function register (context, req, res, next) {
    let user = req.body;

    identityService.register(context, user, function (err, token) {
        if (err) {
            return next(err);
        }

        res.status(201).json({ token });
    });
}

function login (context, req, res, next) {
    let params = req.body;

    identityService.login(context, params, function (err, token) {
        if (err) {
            return next(err);
        }

        res.status(200).json({ token });
    });
}

function logout (context, req, res, next) {
    next();
    res.status(200).json();
}

module.exports = {
    register,
    login,
    logout
};