const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const Diary = require('../models/Diary.model');
const Page = require('../models/Page.model');

router.post('/diaries/:diaryId/pages/add', async (req, res, next) => {
  const { diaryId } = req.params;
  const { date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, content } = req.body;
  console.log('Recieving:', req.params, req.body);
  try {
    const newPage = await Page.create({ date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, diary: diaryId, content });
    console.log('New page backend', newPage);
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/diaries/:diaryId/pages', async (req, res, next) => {
  const { diaryId } = req.params;
  try {
    const pages = await Page.find({ diary: diaryId }).populate('diary');
    res.json(pages);
  } catch (e) {
    res.json(e);
  }
});

router.get('/pages/:pageId', async (req, res, next) => {
  const { pageId } = req.params;
  // const { diaryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  try {
    const page = await Page.findById(pageId).populate('diary');
    console.log(page);
    res.status(200).json(page)
  } catch(error){
    res.json(error)
  }
});

router.put('/diaries/:diaryId/:pageId/edit', (req, res, next) => {
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

router.delete('/diaries/:diaryId/:pageId/delete', (req, res, next) => {
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
