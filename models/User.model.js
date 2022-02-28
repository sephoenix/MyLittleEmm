const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  dadName: { type: String },
  momName: { type: String },
  babyName: { type: String },
  babyBirthday: { type: Date },
});

module.exports = model('User', userSchema);
