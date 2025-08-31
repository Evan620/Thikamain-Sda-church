import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

const DynamicFeaturedAnnouncement = ({ isMobile, isTablet }) => {
  const [announcement, setAnnouncement] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch the latest featured announcement
  useEffect(() => {
    const fetchFeaturedAnnouncement = async () => {
      try {
        setLoading(true)
        
        // Get the latest published announcement with highest priority
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('is_published', true)
          .gte('end_date', new Date().toISOString().split('T')[0]) // Not expired
          .order('priority', { ascending: false }) // Highest priority first
          .order('created_at', { ascending: false }) // Most recent first
          .limit(1)

        if (error) {
          console.error('Error fetching announcement:', error)
          setError(error)
          return
        }

        if (data && data.length > 0) {
          setAnnouncement(data[0])
        }
      } catch (err) {
        console.error('Error:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedAnnouncement()

    // Refresh every 30 minutes
    const interval = setInterval(fetchFeaturedAnnouncement, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Format date for display
  const formatAnnouncementDate = (dateString) => {
    if (!dateString) return 'This Saturday'
    
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    }
    
    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    }
    
    // Check if it's this week
    const daysDiff = Math.ceil((date - today) / (1000 * 60 * 60 * 24))
    if (daysDiff >= 0 && daysDiff <= 7) {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
      return `This ${dayName}`
    }
    
    // Check if it's next week
    if (daysDiff > 7 && daysDiff <= 14) {
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
      return `Next ${dayName}`
    }
    
    // For dates further out, show the actual date
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric'
    })
  }

  // Format time for display
  const formatAnnouncementTime = (timeString) => {
    if (!timeString) return '11:00 AM'
    
    try {
      // Handle both time-only strings and full datetime strings
      let timeToFormat = timeString
      if (!timeString.includes('T')) {
        // If it's just a time string, add a dummy date
        timeToFormat = `2000-01-01T${timeString}`
      }
      
      const time = new Date(timeToFormat)
      return time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    } catch (error) {
      console.error('Error formatting time:', error)
      return timeString || '11:00 AM'
    }
  }

  // Default content when no announcement is available
  const defaultContent = {
    title: 'Special Sabbath Service',
    content: 'Join us for a special communion service this Sabbath. Experience the blessing of fellowship and spiritual renewal as we come together in worship.',
    start_date: null,
    start_time: null,
    badge: 'This Week'
  }

  // Use announcement data or fallback to default
  const displayContent = announcement || defaultContent

  if (loading) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
        borderRadius: '20px',
        padding: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(45, 90, 39, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '300px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(245, 158, 11, 0.3)',
          borderTop: '3px solid #fbbf24',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
      borderRadius: '20px',
      padding: isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(45, 90, 39, 0.3)',
      transform: 'translateY(0)',
      transition: 'all 0.3s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)'
      e.currentTarget.style.boxShadow = '0 25px 80px rgba(45, 90, 39, 0.4)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 20px 60px rgba(45, 90, 39, 0.3)'
    }}
    >
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        transform: 'translate(50%, -50%)'
      }}></div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          color: '#fbbf24',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          display: 'inline-block',
          marginBottom: '1.5rem'
        }}>
          {displayContent.badge || 'This Week'}
        </div>

        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          {displayContent.title}
        </h2>

        <p style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          marginBottom: '2rem',
          opacity: '0.9'
        }}>
          {displayContent.content}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#fbbf24' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span style={{ fontWeight: '600' }}>
              {formatAnnouncementDate(displayContent.start_date)}
            </span>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg style={{ width: '1.25rem', height: '1.25rem', color: '#fbbf24' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span style={{ fontWeight: '600' }}>
              {formatAnnouncementTime(displayContent.start_time)}
            </span>
          </div>
        </div>

        <Link
          to="/announcements"
          style={{
            backgroundColor: '#fbbf24',
            color: '#1c3a1c',
            padding: '12px 24px',
            borderRadius: '10px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            display: 'inline-block'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f59e0b'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#fbbf24'
            e.target.style.transform = 'translateY(0)'
          }}
        >
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default DynamicFeaturedAnnouncement