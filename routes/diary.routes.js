const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const Diary = require('../models/Diary.model');
const Page = require('../models/Page.model');

router.post('/diaries', isAuthenticated, (req, res, next) => {
  const { name } = req.body;
  const userId = req.payload._id;
  Diary.create({ name, owner: userId /* Page: [] */ })
    .then(response => res.status(201).json(response))
    .catch(err => res.json(err));
});

router.get('/diaries', async (req, res, next) => {
  try {
    const diaries = await Diary.find();
    res.json(diaries);
  } catch (e) {
    res.json(e);
  }
});

router.get('/diaries/:diaryId', (req, res, next) => {
  const { diaryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(diaryId)) {
    res.status(400).json({ message: 'This diary doesnt exists' });
    return;
  }
  Diary.findById(diaryId)
    .then(diary => res.status(200).json(diary))
    .catch(err => res.json(err));
});

router.put('/diaries/:diaryId/edit', isAuthenticated, (req, res, next) => {
  const { diaryId } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(diaryId)) {
    res.status(400).json({ message: 'This diary doesnt exists' });
    return;
  }
  Diary.findByIdAndUpdate(diaryId, { name }, { new: true })
    .then(updatedDiary => res.json(updatedDiary))
    .catch(err => res.json(err));
});

router.delete('/diaries/:diaryId/delete', (req, res, next) => {
  const { diaryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(diaryId)) {
    res.status(400).json({ message: 'This diary doesnt exists' });
    return;
  }
  Diary.findByIdAndDelete(diaryId)
    .then(() => res.json({ message: `Diary with ${diaryId} is removed successfully` }))
    .catch(err => res.json(err));
});

module.exports = router;
