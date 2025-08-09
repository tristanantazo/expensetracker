const { MongoClient } = require("mongodb");

const db_uri = "mongodb://admin:password@mongo:27017";
const db_name = "tracker";

const client = new MongoClient(db_uri);
let db;

function dbInit() {
    try {
        // console.log(db);
        db = client.db(db_name);
        return db;
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbInit;