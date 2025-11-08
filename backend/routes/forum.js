const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getQuestions, postQuestion, postAnswer } = require('../controllers/forumController.js');

router.get('/', getQuestions);
router.post('/', auth, postQuestion); // create question
router.post('/:id/answers', auth, postAnswer); // add answer

module.exports = router;
