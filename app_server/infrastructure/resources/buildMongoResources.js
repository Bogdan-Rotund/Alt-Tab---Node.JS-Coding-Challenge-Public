let async = require('async');
let MongoClient = require('mongodb').MongoClient;

function resourcesMongoUsers (resources, next) {
    MongoClient.connect(process.env.MONGO_ALT_TAB_DB, (err, db) => {
        if (err) {
            return next(err);
        }

        resources.mongo = resources.mongo || {};
        resources.mongo.alttab = db;

        next(null, resources);
    });
}

function build (callback) {
    let resources = {};
    
    async.waterfall([
        async.constant(resources),
        resourcesMongoUsers
    ], callback);
}

module.exports = {
    build
};