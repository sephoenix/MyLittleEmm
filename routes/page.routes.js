const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Diary = require('../models/Diary.model');
const Page = require('../models/Page.model');

router.post('/pages', (req, res, next) => {
  const { date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, diaryId, content } = req.body;
  Page.create({ date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, diary: diaryId, content })
    .then(response => res.status(201).json(response))
    .catch(err => res.json(err));
});

router.get('/:diaryId/pages', async (req, res, next) => {
  req.params // get pages where diary is this diaryId
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
