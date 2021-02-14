const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
  const dbname = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_DBNAME_TEST
    : process.env.MONGODB_DBNAME;
  const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-es8sw.mongodb.net/${dbname}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(mongodbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB Connected');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = connectDB;