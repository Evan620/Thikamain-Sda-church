import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Sermons from './pages/Sermons'
import Events from './pages/Events'
import Ministries from './pages/Ministries'
import Departments from './pages/Departments'
import Contact from './pages/Contact'
import Giving from './pages/Giving'
import Submissions from './pages/Submissions'

// Admin System Imports
import { AuthProvider } from './hooks/useAuth.jsx'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminRoutes from './components/admin/AdminRoutes'
import AuthGuard from './components/admin/AuthGuard'

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* 🆕 ADMIN SYSTEM ROUTES - COMPLETELY SEPARATE */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={
            <AuthGuard requiredRole="MEMBER">
              <AdminLayout>
                <AdminRoutes />
              </AdminLayout>
            </AuthGuard>
          } />

          {/* ✅ EXISTING PUBLIC WEBSITE ROUTES - UNCHANGED */}
          <Route path="/*" element={
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/sermons" element={<Sermons />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/ministries" element={<Ministries />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/giving" element={<Giving />} />
                  <Route path="/submissions" element={<Submissions />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
