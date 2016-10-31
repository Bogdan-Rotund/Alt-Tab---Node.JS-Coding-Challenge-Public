let userService = require('../../core/services/user');

function getProfile (context, user, callback) {
    let db = context.resources.mongo.alttab;
    userService.findById(db, user.id, callback);
}

module.exports = {
    getProfile
};