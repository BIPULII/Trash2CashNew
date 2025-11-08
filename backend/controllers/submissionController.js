const Submission = require('../models/Submission');

// Create new submission
const createSubmission = async (req, res) => {
  try {
    const { type, quantity, unit, notes } = req.body;
    
    const submission = await Submission.create({
      user: req.user.id,
      type,
      quantity,
      unit,
      notes
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user submissions
const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user.id });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSubmission,
  getUserSubmissions
};