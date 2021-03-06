const mongoose = require('mongoose');

const { Schema } = mongoose;
const db = mongoose.connection;

mongoose.connect('mongodb://database/songLibrary');

db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
  console.log('Connected to database');
});

const trackSchema = new Schema({
  id: Number,
  title: String,
  artist: String,
  playlist: {
    name: String,
    artUrl: String,
  },
  album: {
    artUrl: String,
    text: String,
  },
  submittedDate: String,
  length: Number,
  waveform: [Number],
  tags: [String],
  comments: [{
    user: {
      name: String,
      avatarUrl: String,
    },
    body: String,
    timestamp: String,
  }],
});

const Track = mongoose.model('Track', trackSchema);

const readOne = (options = { id: 0 }) => new Promise((resolve, reject) => {
  Track.find(options, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data[0]);
    }
  });
});

module.exports = {
  readOne,
};
