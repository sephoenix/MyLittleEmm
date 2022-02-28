const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Diary = require('../models/Diary.model');
const Page = require('../models/Page.model');

router.post('/pages', (req, res, next) => {
  const { date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, diaryId } = req.body;
  Page.create({ date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, diary: diaryId })
    .then(newPage => {
      return Diary.findByIdAndUpdate(diaryId, { $push: { pages: newPage._id } });
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

router.get('/pages', async (req, res, next) => {
  try {
    const pages = await Page.find();
    res.json({ pages });
  } catch (e) {
    res.json(e);
  }
});

router.get('/pages/:pageId', (req, res, next) => {
  const { pageId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  Page.findById(pageId)
    .then(page => res.status(200).json(page))
    .catch(err => res.json(err));
});

router.put('/pages/:pageId', (req, res, next) => {
  const { pageId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  Page.findByIdAndUpdate(pageId, req.body, { new: true })
    .then(updatedPage => res.json(updatedPage))
    .catch(err => res.json(err));
});

router.delete('/pages/:pageId', (req, res, next) => {
  const { pageId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  Page.findByIdAndDelete(pageId)
    .then(() => res.json({ message: `Diary with ${pageId} is removed successfully` }))
    .catch(err => res.json(err));
});

module.exports = router;
