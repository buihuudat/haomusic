const mongoose = require('mongoose');
require('dotenv').config();

exports.init = function () {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    const conn = mongoose.connection;
    mongoose.connect('mongodb+srv://haohanmusic:haohanmusic123@cluster0.8wkov.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    conn.on('error', (err) => reject(err));
    conn.once('open', () => resolve());
  });
};
