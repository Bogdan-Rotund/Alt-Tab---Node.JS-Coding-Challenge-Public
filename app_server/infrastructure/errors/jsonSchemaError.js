let util = require('util');

function JsonSchemaError (errors) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = "Failed to validate JSON payload againts the schema";
    this.status = 400;
    this.errors = errors;    
}

util.inherits(JsonSchemaError, Error);

module.exports = JsonSchemaError;