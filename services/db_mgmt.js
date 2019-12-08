const MongoClient = require('mongodb').MongoClient;
const dbName = 'photos';
// you can put as much connection as you desire
const Config = require('../config');

const url = Config.dbUrl;

const COLLECTION_NAME = 'photoinfo';
let db;


async function connect() {
    try {
        const client = await MongoClient.connect(url)
        if (!db) {
            db = client.db(dbName);
        }
        return Promise.resolve(db);
    }catch(err) {
        return Promise.reject(err);
    } 
}


function insert(data) {
    return new Promise((resolve, reject) => {
        connect().then(db => {
            const collection = db.collection(COLLECTION_NAME);
            collection.insertOne(data, function inserting(err, count, status) {
                if (err) return reject(err)
                resolve(status);
            })
        }).catch(err => reject(err));
    })
}

function get() {
    return new Promise((resolve, reject) => {
        connect().then(db => {
            const collection = db.collection(COLLECTION_NAME);
            const filter = {
            }
            const sort = {
                date: 1
            }
            console.log('collection', collection)
            collection.find().sort(sort).toArray().then(function(items) {
                console.log('items', items)
                resolve(items)
            }).catch(err => reject(err));
        }).catch(err => reject(err));
    })
}

module.exports = {
    connect,
    insert,
    get
};