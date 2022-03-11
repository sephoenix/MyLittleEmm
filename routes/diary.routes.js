const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const Diary = require('../models/Diary.model');

router.post('/', isAuthenticated, async (req, res, next) => {
  const { name } = req.body;
  const userId = req.payload._id;
  try {
    const diary = await Diary.create({ name, owner: userId });
    res.json(diary);
  } catch (error) {
    res.json(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const diaries = await Diary.find();
    res.json(diaries);
  } catch (error) {
    res.json(error);
  }
});

router.get('/:diaryId', async (req, res, next) => {
  const { diaryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(diaryId)) {
    res.status(400).json({ message: 'This diary doesnt exists' });
    return;
  }
  try {
    const diary = await Diary.findById(diaryId);
    res.status(200).json(diary);
  } catch (error) {
    res.json(error);
  }
});

router.put('/:diaryId/edit', isAuthenticated, async (req, res, next) => {
  const { diaryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(diaryId)) {
    res.status(400).json({ message: 'This diary doesnt exists' });
    return;
  }
  try {
    const diary = await Diary.findByIdAndUpdate(diaryId, req.body, { new: true });
    res.json(diary);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:diaryId/delete', isAuthenticated, async (req, res, next) => {
  const { diaryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(diaryId)) {
    res.status(400).json({ message: 'This diary doesnt exists' });
    return;
  }
  try {
    await Diary.findByIdAndDelete(diaryId);
    res.json({ message: `Diary with ${diaryId} is removed successfully` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
