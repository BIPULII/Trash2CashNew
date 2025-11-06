import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({ onAuthClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T2C</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Trash2Cash</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">Home</a>
            <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
            <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
          </nav>

          {/* Desktop Auth Buttons or User Links */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-green-600">Dashboard</button>
                <button onClick={() => navigate('/submit')} className="text-gray-700 hover:text-green-600">Submit Trash</button>
                <button
                  onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/') }}
                  className="text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onAuthClick('signin')}
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onAuthClick('signup')}
                  className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <a href="#home" className="text-gray-700 hover:text-green-600 transition-colors">Home</a>
              <a href="#features" className="text-gray-700 hover:text-green-600 transition-colors">Features</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
              {token ? (
                <>
                  <button onClick={() => navigate('/dashboard')} className="text-left text-gray-700 hover:text-green-600 transition-colors">Dashboard</button>
                  <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/') }} className="text-left text-red-600">Logout</button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onAuthClick('signin')}
                    className="text-left text-gray-700 hover:text-green-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => onAuthClick('signup')}
                    className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-300 w-fit"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
