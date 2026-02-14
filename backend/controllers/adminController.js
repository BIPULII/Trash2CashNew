const Submission = require('../models/Submission');
const User = require('../models/User');

// Get all submissions for admin dashboard
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: submissions,
      message: 'All submissions retrieved'
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Approve a submission
const approveSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { reward } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      id,
      {
        status: 'Approved',
        reward: reward || submission.reward
      },
      { new: true }
    ).populate('user', 'name email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: submission,
      message: 'Submission approved'
    });
  } catch (error) {
    console.error('Error approving submission:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Reject a submission
const rejectSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const submission = await Submission.findByIdAndUpdate(
      id,
      {
        status: 'Rejected',
        notes: reason || submission.notes
      },
      { new: true }
    ).populate('user', 'name email');

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: submission,
      message: 'Submission rejected'
    });
  } catch (error) {
    console.error('Error rejecting submission:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get summary stats for admin
const getAdminStats = async (req, res) => {
  try {
    const totalSubmissions = await Submission.countDocuments();
    const pendingSubmissions = await Submission.countDocuments({ status: 'Pending' });
    const approvedSubmissions = await Submission.countDocuments({ status: 'Approved' });
    const rejectedSubmissions = await Submission.countDocuments({ status: 'Rejected' });
    const totalUsers = await User.countDocuments({ role: 'user' });

    res.status(200).json({
      success: true,
      data: {
        totalSubmissions,
        pendingSubmissions,
        approvedSubmissions,
        rejectedSubmissions,
        totalUsers
      },
      message: 'Admin stats retrieved'
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllSubmissions,
  approveSubmission,
  rejectSubmission,
  getAdminStats
};
