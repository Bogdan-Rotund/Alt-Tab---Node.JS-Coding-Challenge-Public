let jwt = require('express-jwt');

let secret = process.env.SECRET;

module.exports = jwt({ secret });