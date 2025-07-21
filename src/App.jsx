import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Sermons from './pages/Sermons'
import Events from './pages/Events'
import Ministries from './pages/Ministries'
import Contact from './pages/Contact'
import Giving from './pages/Giving'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/events" element={<Events />} />
            <Route path="/ministries" element={<Ministries />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/giving" element={<Giving />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
