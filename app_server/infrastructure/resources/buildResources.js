let async = require('async');
let mongoResources = require('./buildMongoResources');

function handleError (err) {
    console.error(`Failed to build resources: ${err.messages}`);
    console.error(err.stack);
    process.exit(-1);
}

function build (callback) {
    async.waterfall([
        mongoResources.build
    ], (err, resources) => {
        if (err) {
            return handleError(err);
        }

        callback(null, resources);
    });
}

module.exports = {
    build
};