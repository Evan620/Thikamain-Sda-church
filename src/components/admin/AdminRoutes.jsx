import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthGuard from './AuthGuard'
import Dashboard from '../../pages/admin/Dashboard'
import SermonsManagement from '../../pages/admin/SermonsManagement'
import EventsManagement from '../../pages/admin/EventsManagement'
import AnnouncementsManagement from '../../pages/admin/AnnouncementsManagement'
import PrayerRequestsManagement from '../../pages/admin/PrayerRequestsManagement'
import MembersManagement from '../../pages/admin/MembersManagement'
import DonationsManagement from '../../pages/admin/DonationsManagement'
import FinancialDashboard from '../../pages/admin/FinancialDashboard'
import BudgetManagement from '../../pages/admin/BudgetManagement'
import AdminUsersManagement from '../../pages/admin/AdminUsersManagement'
import ActivityLogs from '../../pages/admin/ActivityLogs'
import SystemSettings from '../../pages/admin/SystemSettings'

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
        path="/members"
        element={
          <AuthGuard requiredRole="ADMIN">
            <MembersManagement />
          </AuthGuard>
        }
      />

      {/* Content Management Routes - Admin and above */}
      <Route
        path="/sermons"
        element={
          <AuthGuard requiredRole="ADMIN">
            <SermonsManagement />
          </AuthGuard>
        }
      />

      <Route
        path="/events"
        element={
          <AuthGuard requiredRole="ADMIN">
            <EventsManagement />
          </AuthGuard>
        }
      />

      <Route
        path="/announcements"
        element={
          <AuthGuard requiredRole="ADMIN">
            <AnnouncementsManagement />
          </AuthGuard>
        }
      />

      <Route
        path="/prayer-requests"
        element={
          <AuthGuard requiredRole="ELDER">
            <PrayerRequestsManagement />
          </AuthGuard>
        }
      />
      
      {/* Financial Management Routes - Admin and above */}
      <Route
        path="/financial"
        element={
          <AuthGuard requiredRole="ADMIN">
            <FinancialDashboard />
          </AuthGuard>
        }
      />

      <Route
        path="/donations"
        element={
          <AuthGuard requiredRole="ADMIN">
            <DonationsManagement />
          </AuthGuard>
        }
      />

      <Route
        path="/budget"
        element={
          <AuthGuard requiredRole="ADMIN">
            <BudgetManagement />
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
      
      {/* Super Admin Routes - Super Admin only */}
      <Route
        path="/admin-users"
        element={
          <AuthGuard requiredRole="SUPER_ADMIN">
            <AdminUsersManagement />
          </AuthGuard>
        }
      />

      <Route
        path="/activity-logs"
        element={
          <AuthGuard requiredRole="SUPER_ADMIN">
            <ActivityLogs />
          </AuthGuard>
        }
      />

      <Route
        path="/settings"
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
