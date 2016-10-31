let profileService = require('../services/profile.service');

function getProfile (context, req, res, next) {
    let user = req.user;

    profileService.getProfile(context, user, function (err, profile) {
        if (err) {
            return next(err);
        }

        res.status(200).json(profile);
    });
}

module.exports = {
    getProfile
}