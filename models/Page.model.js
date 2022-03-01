const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const pageSchema = new Schema({
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['Info', 'Special Date', 'Anecdote'] },
  diary: { type: Schema.Types.ObjectId, ref: 'Diary' },
  whoWrites: { type: String, enum: ['Dad', 'Mom'] },
  babyWeight: Number,
  babyHeight: Number,
  photo: String,
  isPublic: Boolean,
  content: { type: String },
});

module.exports = model('Page', pageSchema);
