const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://utham:12345@chatappdb1.buvgb.mongodb.net/?retryWrites=true&w=majority&appName=chatappDB1';

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1)
  }
};

module.exports = connectToDB;