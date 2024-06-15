const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "solopro";

let dbClient;

const connectDB = async () => {
    try {
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Example: Timeout after 5 seconds for server selection
            socketTimeoutMS: 4500, // Example: Timeout after 4.5 seconds for socket operations
            maxPoolSize:10
        });

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
