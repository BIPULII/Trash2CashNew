import { useState, useEffect } from 'react'

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [reward, setReward] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [filter, setFilter] = useState('all')
  const token = localStorage.getItem('token')
  const apiUrl = import.meta.env.VITE_API_URL || 'http://13.232.143.45:5000'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const headers = { Authorization: `Bearer ${token}` }

      // Fetch submissions and stats in parallel
      const [submRes, statsRes] = await Promise.all([
        fetch(`${apiUrl}/api/admin/submissions`, { headers }),
        fetch(`${apiUrl}/api/admin/stats`, { headers })
      ])

      if (submRes.ok) {
        const data = await submRes.json()
        setSubmissions(data.data)
      }

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (submissionId) => {
    if (!reward) {
      alert('Please enter a reward amount')
      return
    }

    try {
      const response = await fetch(`${apiUrl}/api/admin/submissions/${submissionId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reward: parseFloat(reward) })
      })

      if (response.ok) {
        alert('Submission approved!')
        setSelectedSubmission(null)
        setReward('')
        fetchData()
      }
    } catch (error) {
      console.error('Error approving submission:', error)
      alert('Failed to approve submission')
    }
  }

  const handleReject = async (submissionId) => {
    if (!rejectReason) {
      alert('Please enter a rejection reason')
      return
    }

    try {
      const response = await fetch(`${apiUrl}/api/admin/submissions/${submissionId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: rejectReason })
      })

      if (response.ok) {
        alert('Submission rejected!')
        setSelectedSubmission(null)
        setRejectReason('')
        fetchData()
      }
    } catch (error) {
      console.error('Error rejecting submission:', error)
      alert('Failed to reject submission')
    }
  }

  const filteredSubmissions = submissions.filter(sub => {
    if (filter === 'all') return true
    return sub.status.toLowerCase() === filter
  })

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-blue-500 text-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-semibold">Total Submissions</h3>
              <p className="text-3xl font-bold">{stats.totalSubmissions}</p>
            </div>
            <div className="bg-yellow-500 text-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-semibold">Pending</h3>
              <p className="text-3xl font-bold">{stats.pendingSubmissions}</p>
            </div>
            <div className="bg-green-500 text-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-semibold">Approved</h3>
              <p className="text-3xl font-bold">{stats.approvedSubmissions}</p>
            </div>
            <div className="bg-red-500 text-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-semibold">Rejected</h3>
              <p className="text-3xl font-bold">{stats.rejectedSubmissions}</p>
            </div>
            <div className="bg-purple-500 text-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="mb-6 flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md font-semibold transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredSubmissions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No submissions found</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Reward</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map(submission => (
                  <tr key={submission._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{submission.user.name}</p>
                        <p className="text-sm text-gray-500">{submission.user.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">{submission.type}</td>
                    <td className="px-6 py-4">
                      {submission.quantity} {submission.unit}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          submission.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : submission.status === 'Approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">LKR {submission.reward}</td>
                    <td className="px-6 py-4 text-sm">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {submission.status === 'Pending' && (
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Review
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal for Approval/Rejection */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Review Submission</h2>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>User:</strong> {selectedSubmission.user.name}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {selectedSubmission.type}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Quantity:</strong> {selectedSubmission.quantity} {selectedSubmission.unit}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Reward Amount (LKR)</label>
                <input
                  type="number"
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  placeholder="Enter reward"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(selectedSubmission._id)}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    setReward('')
                    setSelectedSubmission(null)
                  }}
                  className="flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 font-semibold"
                >
                  Cancel
                </button>
              </div>

              <div className="border-t pt-4 mt-4">
                <label className="block text-sm font-semibold mb-2">Rejection Reason</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Enter reason for rejection"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={() => handleReject(selectedSubmission._id)}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 font-semibold mt-2"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
