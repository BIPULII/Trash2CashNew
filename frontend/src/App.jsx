import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import SubmitTrash from './components/SubmitTrash'
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<Dashboard />} /> */}
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/submit" element={<SubmitTrash />} />
  <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
// <Route path="/submit" element={<SubmitTrash />} />