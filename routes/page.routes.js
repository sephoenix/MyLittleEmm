const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const Diary = require('../models/Diary.model');
const Page = require('../models/Page.model');

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, content, diary } = req.body;
  const diaryId = mongoose.Types.ObjectId(diary);
  try {
    const newPage = await Page.create({ date, type, whoWrites, babyWeight, babyHeight, photo, isPublic, diary: diaryId, content });
    console.log('New page backend', newPage);
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.find().populate('diary');
    res.json(pages);
  } catch (e) {
    res.json(e);
  }
});

router.get('/:pageId', async (req, res, next) => {
  const { pageId } = req.params;
  // const { diaryId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  try {
    const page = await Page.findById(pageId).populate('diary');
    console.log(page);
    res.status(200).json(page);
  } catch (error) {
    res.json(error);
  }
});

router.put('/:pageId/edit', isAuthenticated, async (req, res, next) => {
  const { pageId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  try {
    const page = await Page.findByIdAndUpdate(pageId, req.body, { new: true });
    res.json(page);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:pageId/delete', isAuthenticated, async (req, res, next) => {
  const { pageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(pageId)) {
    res.status(400).json({ message: 'This page doesnt exists' });
    return;
  }
  try {
    await Page.findByIdAndDelete(pageId);
    res.json({ message: 'Page eliminated' });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
