const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  type: {
    type: String,
    required: [true, 'Please add a trash type']
  },
  quantity: {
    type: Number,
    required: [true, 'Please add quantity']
  },
  unit: {
    type: String,
    required: [true, 'Please specify unit (kg or pcs)']
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  reward: {
    type: Number,
    default: 0
  },
  notes: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Submission', submissionSchema);