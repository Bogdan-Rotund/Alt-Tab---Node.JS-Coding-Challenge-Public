let ObjectId = require('mongodb').ObjectId;

let collectionName = 'USERS';

function create (db, user, cb) {
    db.collection(collectionName).insertOne(user, cb);
}

function findByEmail (db, email, cb) {
    let query = { email };
    db.collection(collectionName).find(query).limit(1).next(cb);
}

function findById (db, id, cb) {
    let query = { _id: ObjectId(id) };
    db.collection(collectionName).find(query).limit(1).next(cb);
}

module.exports = {
    create,
    findByEmail,
    findById
};