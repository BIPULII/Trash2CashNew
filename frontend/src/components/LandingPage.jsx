import { useState } from 'react'
import Header from './Header'
import Hero from './Hero'
import UserCategories from './UserCategories'
import Features from './Features'
import Footer from './Footer'
import AuthModal from './AuthModal'

const LandingPage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('signin') // 'signin' or 'signup'
  const [userType, setUserType] = useState('user') // 'user' or 'recycler'

  const openAuthModal = (mode, type = 'user') => {
    setAuthMode(mode)
    setUserType(type)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onAuthClick={openAuthModal} />
      <Hero onGetStarted={openAuthModal} />
      <UserCategories onAuthClick={openAuthModal} />
      <Features />
      <Footer />
      
      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={closeAuthModal}
          mode={authMode}
          userType={userType}
          onModeChange={setAuthMode}
        />
      )}
    </div>
  )
}

export default LandingPage
