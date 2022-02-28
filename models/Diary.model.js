const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const diarySchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Diary', diarySchema);
