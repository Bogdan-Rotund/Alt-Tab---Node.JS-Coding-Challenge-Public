let express = require('express');
let jsonSchemaValidator = require('../../infrastructure/middleware/jsonSchemaValidator');
let authenticate = require('../../infrastructure/middleware/security/authenticate');

// Controllers
let userController = require('./controllers/profile.controller');

// Validation Schemas
let getProfileValidationSchema = require('./validation/profile/getProfile.validation.json');

function init (context) {
    let router = express.Router();

    router.get('/profile', 
        authenticate,
        jsonSchemaValidator.validate(getProfileValidationSchema),
        (req, res, next) => userController.getProfile(context, req, res, next));

    return router;
}

module.exports = {
    init
};