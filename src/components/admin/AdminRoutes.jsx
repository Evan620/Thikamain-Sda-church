import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthGuard from './AuthGuard'
import Dashboard from '../../pages/admin/Dashboard'

// Placeholder components for future implementation
const MemberManagement = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Member Management</h1>
    <p className="text-gray-600">Member management system coming soon...</p>
  </div>
)

const ContentManagement = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Content Management</h1>
    <p className="text-gray-600">Content management system coming soon...</p>
  </div>
)

const FinancialManagement = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Financial Management</h1>
    <p className="text-gray-600">Financial management system coming soon...</p>
  </div>
)

const CommunicationHub = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Communication Hub</h1>
    <p className="text-gray-600">Communication hub coming soon...</p>
  </div>
)

const ReportsAnalytics = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Reports & Analytics</h1>
    <p className="text-gray-600">Reports and analytics coming soon...</p>
  </div>
)

const SystemSettings = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">System Settings</h1>
    <p className="text-gray-600">System settings coming soon...</p>
  </div>
)

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Default redirect to dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      
      {/* Dashboard - accessible to all authenticated users */}
      <Route 
        path="/dashboard" 
        element={
          <AuthGuard requiredRole="MEMBER">
            <Dashboard />
          </AuthGuard>
        } 
      />
      
      {/* Member Management - Admin and above */}
      <Route 
        path="/members/*" 
        element={
          <AuthGuard requiredRole="ADMIN">
            <MemberManagement />
          </AuthGuard>
        } 
      />
      
      {/* Content Management - Admin and above */}
      <Route 
        path="/content/*" 
        element={
          <AuthGuard requiredRole="ADMIN">
            <ContentManagement />
          </AuthGuard>
        } 
      />
      
      {/* Financial Management - Admin and above */}
      <Route 
        path="/financial/*" 
        element={
          <AuthGuard requiredRole="ADMIN">
            <FinancialManagement />
          </AuthGuard>
        } 
      />
      
      {/* Communication Hub - Elder and above */}
      <Route 
        path="/communication/*" 
        element={
          <AuthGuard requiredRole="ELDER">
            <CommunicationHub />
          </AuthGuard>
        } 
      />
      
      {/* Reports & Analytics - Admin and above */}
      <Route 
        path="/reports/*" 
        element={
          <AuthGuard requiredRole="ADMIN">
            <ReportsAnalytics />
          </AuthGuard>
        } 
      />
      
      {/* System Settings - Super Admin only */}
      <Route 
        path="/settings/*" 
        element={
          <AuthGuard requiredRole="SUPER_ADMIN">
            <SystemSettings />
          </AuthGuard>
        } 
      />
      
      {/* Catch all - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  )
}

export default AdminRoutes
