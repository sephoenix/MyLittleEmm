const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const pageSchema = new Schema({
  date: Date,
  type: String,
  enum: ['Info', 'Special Date', 'Anecdote'],
  diary: { type: Schema.Types.ObjectId, ref: 'Diary' },
  whorWrites: String,
  enum: ['Dad', 'Mom'],
  babyWeight: Number,
  babyHeight: Number,
  photo: String,
  isPublic: String,
  enum: ['Yes', 'No'],
});

module.exports = model('Page', pageSchema);
