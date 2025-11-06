import { useState } from 'react'
import { categories } from '../data/categories'

const SubmitTrash = ({ onSubmitted }) => {
  const [categoryId, setCategoryId] = useState(categories[0].id)
  const [amount, setAmount] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const category = categories.find(c => c.id === categoryId)

  const parsedAmount = parseFloat(amount) || 0
  const reward = category ? parsedAmount * category.pricePerUnit : 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!category) return
    if (parsedAmount <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid amount.' })
      return
    }

    setLoading(true)
    setMessage(null)

    const token = localStorage.getItem('token')
    const payload = {
      type: category.label,
      categoryId: category.id,
      amount: parsedAmount,
      unit: category.unit,
      reward: reward,
      notes
    }

    try {
      // Try to submit to backend; if backend not available, we still call onSubmitted with local object
      const res = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      })

      let data = null
      try { data = await res.json() } catch (e) { }

      // Build new submission object for UI
      const newSubmission = {
        date: new Date().toISOString().slice(0, 10),
        type: category.label,
        quantity: parsedAmount + ' ' + category.unit,
        status: res && res.ok ? 'Pending' : 'Pending',
        reward: `LKR ${reward}`
      }

      setMessage({ type: 'success', text: 'Submission added' })
      setAmount('')
      setNotes('')

      if (onSubmitted) onSubmitted(newSubmission)
    } catch (err) {
      console.error('Submit error', err)
      setMessage({ type: 'error', text: 'Network error - could not submit. Added locally.' })
      const newSubmission = {
        date: new Date().toISOString().slice(0, 10),
        type: category.label,
        quantity: parsedAmount + ' ' + category.unit,
        status: 'Pending',
        reward: `LKR ${reward}`
      }
      if (onSubmitted) onSubmitted(newSubmission)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Submit Trash</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full border rounded px-3 py-2">
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.label} — {c.unit} • LKR {c.pricePerUnit}/{c.unit}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Amount ({category?.unit})</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" step="0.01" min="0" className="w-full border rounded px-3 py-2" placeholder={category?.unit === 'pcs' ? 'e.g. 2' : 'e.g. 5.5'} />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Notes (optional)</label>
          <input value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Pickup address or extra info" />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Estimated reward: <span className="font-semibold">LKR {reward}</span></div>
          <button disabled={loading} type="submit" className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50">{loading ? 'Submitting...' : 'Submit'}</button>
        </div>

        {message && (
          <div className={`text-sm ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{message.text}</div>
        )}
      </form>
    </div>
  )
}

export default SubmitTrash
