const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'solopro';

let db;

const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    mongoose.connect(`${url}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    //   serverSelectionTimeoutMS: 5000,
    //   socketTimeoutMS: 4500,
    //   poolSize: 10
    });

    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;

    // Get the default connection
    db = mongoose.connection;

    // Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // Connection successful message
    db.once('open', () => {
      console.log('MongoDB connected successfully');
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};


// __________________________________________________________________________

const connectDB1 = async () => {
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
  if (db) {
    return db;
  } else {
    throw new Error('Database connection not established');
  }
};


module.exports = { connectDB1, getDB,connectDB1 };

