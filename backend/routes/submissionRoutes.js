const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createSubmission, getUserSubmissions } = require('../controllers/submissionController');

router.post('/', protect, createSubmission);
router.get('/', protect, getUserSubmissions);
//router.get('/summary', protect, getUserSummary);

module.exports = router;
