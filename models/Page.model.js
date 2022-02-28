const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const pageSchema = new Schema({
  date: String, //TODO Date
  type: String,
  enum: ['Info', 'Special Date', 'Anecdote'],
  diary: { type: Schema.Types.ObjectId, ref: 'Diary' },
  whoWrites: String,
  enum: ['Dad', 'Mom'],
  babyWeight: Number,
  babyHeight: Number,
  photo: String,
  isPublic: String,
  enum: ['Yes', 'No'],
});

module.exports = model('Page', pageSchema);
