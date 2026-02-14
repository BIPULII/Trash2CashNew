const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const {
  getAllSubmissions,
  approveSubmission,
  rejectSubmission,
  getAdminStats
} = require('../controllers/adminController');

// All admin routes require admin authentication
router.use(adminMiddleware);

// Get all submissions
router.get('/submissions', getAllSubmissions);

// Approve a submission
router.put('/submissions/:id/approve', approveSubmission);

// Reject a submission
router.put('/submissions/:id/reject', rejectSubmission);

// Get admin stats
router.get('/stats', getAdminStats);

module.exports = router;
