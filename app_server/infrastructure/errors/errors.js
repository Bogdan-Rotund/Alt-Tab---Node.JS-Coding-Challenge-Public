module.exports.entityAlreadyExists = function entityAlreadyExists (message) {
    let error = new Error(message || 'Entity already exists');
    error.status = 400;
    return error;
}

module.exports.internalError = function internalError (message) {
    let error = new Error(message || 'Internal Server Error');
    error.status = 500;
    return error;
}

module.exports.authenticationError = function authenticationError (message) {
    let error = new Error(message || 'Username or password are incorrect');
    error.status = 401;
    return error;
}

module.exports.notFoundError = function notFoundError (message) {
    let error = new Error(message || 'Not found');
    error.status = 404;
    return error;
}