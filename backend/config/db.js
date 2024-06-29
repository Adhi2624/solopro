// config/db.js
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'solopro';

let db;
let dbClient;

const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(`${url}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;

    // Get the default connection
    db = mongoose.connection;

    // Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // Connection successful message
    db.once('open', () => {
      console.log('MongoDB connected successfully via Mongoose');
    });

  } catch (error) {
    console.error('Error connecting to MongoDB via Mongoose:', error);
    throw error;
  }
};

const connectDB1 = async () => {
  try {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 4500,
      maxPoolSize: 10
    });

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