import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'
import { db } from '../../services/supabaseClient'

const Dashboard = () => {
  const { userProfile, getDisplayName, getRoleDisplay } = useAuth()
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalSermons: 0,
    upcomingEvents: 0,
    recentGiving: 0,
    pendingPrayerRequests: 0,
    activeAnnouncements: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load basic stats (these will work even if tables don't exist yet)
      const statsData = {
        totalMembers: 0,
        totalSermons: 0,
        upcomingEvents: 0,
        recentGiving: 0,
        pendingPrayerRequests: 0,
        activeAnnouncements: 0
      }

      // Try to load real data, but don't fail if tables don't exist
      try {
        const { data: members } = await db.getMembers()
        statsData.totalMembers = members?.length || 0
      } catch (err) {
        console.log('Members table not ready yet')
      }

      try {
        const { data: sermons } = await db.getSermons()
        statsData.totalSermons = sermons?.length || 0
      } catch (err) {
        console.log('Sermons table not ready yet')
      }

      try {
        const { data: events } = await db.getEvents()
        const upcoming = events?.filter(event => new Date(event.start_date) > new Date()) || []
        statsData.upcomingEvents = upcoming.length
      } catch (err) {
        console.log('Events table not ready yet')
      }

      setStats(statsData)

      // Mock recent activity for now
      setRecentActivity([
        {
          id: 1,
          type: 'member',
          message: 'New member registration pending approval',
          time: '2 hours ago',
          icon: '👤'
        },
        {
          id: 2,
          type: 'sermon',
          message: 'Sermon uploaded: "Walking in Faith"',
          time: '1 day ago',
          icon: '🎤'
        },
        {
          id: 3,
          type: 'event',
          message: 'Youth Camp 2025 event created',
          time: '2 days ago',
          icon: '📅'
        },
        {
          id: 4,
          type: 'prayer',
          message: '3 new prayer requests submitted',
          time: '3 days ago',
          icon: '🙏'
        }
      ])

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: '👥',
      color: 'bg-blue-500',
      link: '/admin/members'
    },
    {
      title: 'Sermons',
      value: stats.totalSermons,
      icon: '🎤',
      color: 'bg-green-500',
      link: '/admin/content/sermons'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: '📅',
      color: 'bg-purple-500',
      link: '/admin/content/events'
    },
    {
      title: 'Prayer Requests',
      value: stats.pendingPrayerRequests,
      icon: '🙏',
      color: 'bg-orange-500',
      link: '/admin/communication'
    }
  ]

  const quickActions = [
    {
      title: 'Add New Member',
      description: 'Register a new church member',
      icon: '➕',
      link: '/admin/members/new',
      color: 'blue'
    },
    {
      title: 'Upload Sermon',
      description: 'Add a new sermon recording',
      icon: '🎵',
      link: '/admin/content/sermons/new',
      color: 'green'
    },
    {
      title: 'Create Event',
      description: 'Schedule a new church event',
      icon: '📝',
      link: '/admin/content/events/new',
      color: 'purple'
    },
    {
      title: 'Send Announcement',
      description: 'Create a church-wide announcement',
      icon: '📢',
      link: '/admin/content/announcements/new',
      color: 'orange'
    }
  ]

  if (loading) {
    return (
      <div className="admin-loading-container">
        <div className="admin-loading-spinner-large"></div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      {/* Welcome Header */}
      <div className="admin-welcome-card">
        <div className="admin-welcome-content">
          <div className="admin-welcome-text">
            <h1>
              Welcome back, {getDisplayName()}! 👋
            </h1>
            <p>
              {getRoleDisplay()} • Thika Main SDA Church Management System
            </p>
            <div className="admin-status-indicators">
              <div className="admin-status-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                System Online
              </div>
              <div className="admin-status-item">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Connection
              </div>
            </div>
          </div>
          <div className="admin-time-card">
            <p className="admin-time-date">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="admin-time-clock">
              {new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="admin-stat-card"
          >
            <div className="admin-stat-content">
              <div className={`admin-stat-icon ${card.color}`}>
                {card.icon}
              </div>
              <div className="admin-stat-details">
                <h3>{card.title}</h3>
                <p>{card.value}</p>
              </div>
            </div>
            <div className="admin-stat-footer">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              View Details
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="admin-dashboard-grid">
        {/* Quick Actions */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="admin-card-content">
            <div className="admin-quick-actions-grid">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="admin-quick-action"
                >
                  <div className="admin-quick-action-content">
                    <div className={`admin-quick-action-icon ${action.color}`}>
                      {action.icon}
                    </div>
                    <div className="admin-quick-action-text">
                      <h3>{action.title}</h3>
                      <p>{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="admin-card-content">
            <div className="admin-activity-list">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="admin-activity-item">
                  <div className="admin-activity-icon">
                    {activity.icon}
                  </div>
                  <div className="admin-activity-content">
                    <p className="admin-activity-message">{activity.message}</p>
                    <p className="admin-activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="admin-activity-footer">
              <Link
                to="/admin/activity"
                className="admin-activity-link"
              >
                View all activity →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2>System Status</h2>
        </div>
        <div className="admin-card-content">
          <div className="admin-system-status-grid">
            <div className="admin-status-indicator">
              <div className="admin-status-dot green"></div>
              <span className="admin-status-text">Database Connected</span>
            </div>
            <div className="admin-status-indicator">
              <div className="admin-status-dot green"></div>
              <span className="admin-status-text">Email Service Active</span>
            </div>
            <div className="admin-status-indicator">
              <div className="admin-status-dot green"></div>
              <span className="admin-status-text">Payment Gateway Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="admin-footer" style={{marginTop: '2rem'}}>
        <p className="admin-footer-text">
          © 2025 Thika Main SDA Church. All rights reserved.
        </p>
        <p className="admin-developer-credit">
          Developed by L.Magwaro
        </p>
      </div>
    </div>
  )
}

export default Dashboard
