

const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getConnection = async (dbName, collectionName) => {
    await client.connect()
    console.log(client)
    return client.db(dbName).collection(collectionName)
}



module.exports = { getConnection, ObjectId}
