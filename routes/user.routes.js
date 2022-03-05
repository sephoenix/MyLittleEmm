const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model');
const router = require('./page.routes');

router.get('/users', async (req, res, next) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (e) {
    res.json(e);
  }
});

router.get('/users/:userId', async (req, res, next) => {
  const userId = req.params;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    err => res.json(err);
  }
});

router.put('/users/:userId/edit', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (e) {
    err => res.json(err);
  }
});

router.delete('/users/:userId/delete', isAuthenticated, (req, res, next) => {
  const userId = req.payload._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'This user doesnt exists' });
    return;
  }

  User.findByIdAndDelete(userId)
    .then(() => res.json({ message: `User with ${userId} is removed successfully` }))
    .catch(err => res.json(err));
});

module.exports = router;
