let express = require('express');
let jsonSchemaValidator = require('../../infrastructure/middleware/jsonSchemaValidator');

// Controllers
let identityController = require('./controllers/identity.controller');

// Validation Schemas
let loginValidationSchema = require('./validation/identity/login.validation.json');
let registerValidationSchema = require('./validation/identity/register.validation.json');

function init (context) {
    let router = express.Router();

    router.post('/register', 
        jsonSchemaValidator.validate(registerValidationSchema), 
        (req, res, next) => identityController.register(context, req, res, next));

    router.post('/login', 
        jsonSchemaValidator.validate(loginValidationSchema),
        (req, res, next) => identityController.login(context, req, res, next));

    router.post('/logout', 
        (req, res, next) => identityController.logout(context, req, res, next));

    return router;
}

module.exports = {
    init
};