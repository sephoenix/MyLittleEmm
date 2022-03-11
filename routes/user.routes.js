const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const User = require('../models/User.model');

router.get('/', async (req, res, next) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.put('/edit', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:userId/delete', isAuthenticated, async (req, res, next) => {
  const userId = req.payload._id;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: 'This user doesnt exists' });
    return;
  }
  try {
    await User.findByIdAndDelete(userId).then(() => res.json({ message: `User with ${userId} is removed successfully` }));
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
