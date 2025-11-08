import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import SubmitTrash from './components/SubmitTrash'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<Dashboard />} /> */}
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/submit" element={<SubmitTrash />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
