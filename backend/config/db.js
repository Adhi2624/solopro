const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017"; // Explicitly use IPv4 address
const dbName = 'solopro';

let db;
let dbClient;

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(`${uri}/${dbName}`);

    mongoose.Promise = global.Promise;
    db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
      console.log('MongoDB connected successfully via Mongoose');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB via Mongoose:', error);
    throw error;
  }
};

// Connect to MongoDB using MongoDB native driver
const connectDB1 = async () => {
  try {
    const client = await MongoClient.connect(uri);

    console.log("MongoDB connected successfully via MongoDB driver");
    dbClient = client;
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB via MongoDB driver:", error);
    throw error;
  }
};

const getDB = () => {
  if (db) {
    return db;
  } else {
    throw new Error('Mongoose connection not established');
  }
};

const getMongoClient = () => {
  if (dbClient) {
    return dbClient.db(dbName);
  } else {
    throw new Error('MongoDB driver connection not established');
  }
};

module.exports = { connectDB, getDB, connectDB1, getMongoClient };
