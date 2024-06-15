// config/db.js
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "solopro";

let dbClient;

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully");
        dbClient = client;
        return client.db(dbName);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

const getDB = () => {
    if (dbClient) {
        return dbClient.db(dbName);
    } else {
        throw new Error('Database connection not established');
    }
};

module.exports = { connectDB, getDB };
