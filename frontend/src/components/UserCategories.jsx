const UserCategories = ({ onAuthClick }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Start Your Recycling Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turn your household waste into income and contribute to a sustainable future.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          {/* User Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Trash2Cash</h3>
              <p className="text-gray-700 mb-6">
                Turn your household waste into income. Connect with recyclers and contribute to a sustainable future.
              </p>
              
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Sell recyclable materials
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Track your environmental impact
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Easy pickup scheduling
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Instant payments
                </li>
              </ul>

              <div className="space-y-3">
                <button
                  onClick={() => onAuthClick('signup', 'user')}
                  className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => onAuthClick('signin', 'user')}
                  className="w-full bg-white text-green-600 py-3 px-6 rounded-lg font-semibold border-2 border-green-500 hover:bg-green-50 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserCategories
