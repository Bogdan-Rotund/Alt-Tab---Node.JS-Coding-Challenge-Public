let tv4 = require('tv4');
let _ = require('lodash');
let JsonSchemaError = require('../errors/jsonSchemaError');

function getErrorField (error) {
    if (error.code === 302) {
        // dataPath will be empty and we need to extract the field from the end of the message
        return error.message.slice(error.message.lastIndexOf(' ') + 1);
    }

    return error.dataPath ? error.dataPath.slice(1) : "";
}

function mapErrors (errors) {
    return _.map(errors, error => {
        let field = getErrorField(error);

        return {
            field,
            message: error.message
        }
    });
}

function validate (schema) {
    return function validateMiddleware (req, res, next) {
        var result = tv4.validateMultiple(req.body || "", schema);
        if (!result.valid) {
            return next(new JsonSchemaError(mapErrors(result.errors)));
        }

        next();
    }
}

module.exports = {
    validate
};

