import { useState } from 'react'

const AuthModal = ({ isOpen, onClose, mode, userType, onModeChange, onAuthSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // const endpoint = mode === 'signin' ? '/api/auth/login' : '/api/auth/register'
      const endpoint = mode === 'signin' ? '/api/users/login' : '/api/users/register'

      const url = `http://localhost:5000${endpoint}`
      
      // Validate required fields for signup
      if (mode === 'signup') {
        if (!formData.name || !formData.email || !formData.password || !formData.phone) {
          alert('Please fill in all required fields')
          return
        }
        
        if (formData.password.length < 6) {
          alert('Password must be at least 6 characters long')
          return
        }
        
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match!')
          return
        }

        // Validate email format
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        if (!emailRegex.test(formData.email)) {
          alert('Please enter a valid email address')
          return
        }

        // Validate phone number (basic validation)
        if (formData.phone.length < 10) {
          alert('Please enter a valid phone number')
          return
        }
      }
      
      // Validate required fields for signin
      if (mode === 'signin') {
        if (!formData.email || !formData.password) {
          alert('Please fill in email and password')
          return
        }
      }
      
      // Prepare data based on mode
      const requestData = mode === 'signin' 
        ? { email: formData.email.trim(), password: formData.password }
        : { 
            name: formData.name.trim(),
            email: formData.email.trim(), 
            password: formData.password,
            phone: formData.phone.trim()
          }

      console.log('Sending request to:', url)
      console.log('Request data:', requestData)

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (data.success) {
        console.log('Success:', data)
        
        // Store token if available (both signin and signup return tokens)
        if (data.data && data.data.token) {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('user', JSON.stringify(data.data))
        }
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          phone: ''
        })
        
        // Show success message
        alert(data.message || (mode === 'signin' ? 'Login successful!' : 'Registration successful!'))
        
        // Notify parent that auth succeeded (so it can redirect to dashboard)
        if (onAuthSuccess) onAuthSuccess(data)
        onClose()
      } else {
        console.error('Error:', data)
        alert(data.message || 'An error occurred')
      }
    } catch (error) {
      console.error('Network error:', error)
      alert('Network error. Please check if the backend server is running.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-2 px-4 rounded-md hover:from-green-600 hover:to-blue-700 transition-all duration-300"
          >
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              {mode === 'signin' ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
