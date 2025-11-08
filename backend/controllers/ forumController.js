const Question = require('../models/Question');

exports.getQuestions = async (req, res) => {
  const qs = await Question.find().sort({ createdAt: -1 });
  res.json(qs);
};

exports.postQuestion = async (req, res) => {
  const userId = req.user.id;
  const { title, body } = req.body;
  const q = new Question({ userId, title, body });
  await q.save();
  res.json(q);
};

exports.postAnswer = async (req, res) => {
  const userId = req.user.id;
  const { text } = req.body;
  const qId = req.params.id;
  const q = await Question.findById(qId);
  if (!q) return res.status(404).json({ msg: 'Question not found' });
  q.answers.push({ userId, text });
  await q.save();
  res.json(q);
};
