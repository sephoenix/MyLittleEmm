const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const Diary = require('../models/Diary.model');
const Page = require('../models/Page.model');

router.post('/diaries/:diaryId/pages', (req, res, next) => {
  const { diaryId } = req.params;
  const { date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, content } = req.body;
  Page.create({ date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, diary: diaryId, content })
    .then(response => res.status(201).json(response))
    .catch(err => res.json(err));
});

router.get('/diaries/:diaryId/pages', async (req, res, next) => {
  const { diaryId } = req.params;

  try {
    const pages = await Page.find({ diary: diaryId });
    res.status(201).json({ pages });
  } catch (e) {
    res.json(e);
  }
});

router.get('/diaries/:diaryId/pages/:pageId', (req, res, next) => {
  const { pageId } = req.params;
  const { diaryId } = req.params;
  console.log(req.params);

  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  Page.find({ diary: diaryId, _id: pageId })
    .then(page => res.status(200).json(page))
    .catch(err => res.json(err));
});

router.put('/diaries/:diaryId/pages/:pageId/edit', (req, res, next) => {
  const { pageId } = req.params;
  const { diaryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  Page.findOneAndUpdate({ diary: diaryId, _id: pageId }, req.body, { new: true })
    .then(updatedPage => res.json(updatedPage))
    .catch(err => res.json(err));
});

router.delete('/diaries/:diaryId/pages/:pageId/delete', (req, res, next) => {
  const { pageId } = req.params;
  const { diaryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  Page.findOneAndDelete({ diary: diaryId, _id: pageId })
    .then(() => res.json({ message: `Page with ${pageId} is removed successfully` }))
    .catch(err => res.json(err));
});

module.exports = router;
