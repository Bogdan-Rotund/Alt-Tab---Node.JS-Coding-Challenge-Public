'use strict';

let morgan = require('morgan');
let dotenv = require('dotenv');
let express = require('express');
let bodyParser = require('body-parser');
let async = require('async');
let _ = require('lodash');

let errorHandling = require('./app_server/infrastructure/middleware/errorHandling');
let buildResources = require('./app_server/infrastructure/resources/buildResources');

let app = express();
dotenv.config();

let routers = [
    require('./app_server/components/identity/routes'),
    require('./app_server/components/profile/routes')
];

let port = process.env.SERVER_PORT || 3000;

function createRouters (context) {
    var mainRouter = express.Router();

    mainRouter.use(bodyParser.urlencoded({extended: true}));
    mainRouter.use(bodyParser.json());

    _.each(routers, router => mainRouter.use(router.init(context)));

    app.use('/api', mainRouter);
}

async.waterfall([
    (next) => buildResources.build(next),    
], (err, resources) => {
    let context = { resources };

    app.use(morgan('short'));

    createRouters(context);

    app.use('/', express.static('./public'));
    app.use('/', express.static('./app_client'));

    app.use(errorHandling.errorLogger);
    app.use(errorHandling.errorHandler);

    app.listen(port, () => console.log(`Listening on ${port}`));
});

module.exports = app;
