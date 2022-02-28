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

module.exports = router;
