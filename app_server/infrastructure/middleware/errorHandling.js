
function errorLogger (err, req, res, next) {
    // TODO: log this with a proper logger like bunyan or pino
    // if (err.inner) {
    //     console.error(err.inner.stack);
    // } else {
    //     console.error(err.stack);
    // }
    next(err);
}

function errorHandler (err, req, res, next) {
    res.status(err.status || 200).send({
        error: err.errors || err.message || 'Internal Server Error'
    });
    next(err);
}

module.exports = {
    errorLogger,
    errorHandler
};