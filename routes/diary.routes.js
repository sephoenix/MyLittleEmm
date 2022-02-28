const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Diary = require('../models/Diary.model');
const Page = require('../models/Page.model');

router.post('/diaries', (req, res, next) => {
  const { name } = req.body;
  Diary.create({ name, Page: [] })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

router.get('/diaries', async (req, res, next) => {
  try {
    const diaries = await Diary.find();
    res.json({ diaries });
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

module.exports = router;
