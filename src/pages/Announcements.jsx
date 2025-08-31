import React, { useState, useEffect } from 'react'
import { supabase } from '../services/supabaseClient'

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true)
        
        // Get all published announcements
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('is_published', true)
          .gte('end_date', new Date().toISOString().split('T')[0]) // Not expired
          .order('priority', { ascending: false }) // Highest priority first
          .order('created_at', { ascending: false }) // Most recent first

        if (error) {
          console.error('Error fetching announcements:', error)
          setError(error)
          return
        }

        setAnnouncements(data || [])
      } catch (err) {
        console.error('Error:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'TBA'
    
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
    
    // For dates further out, show the actual date
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    })
  }

  // Format time for display
  const formatTime = (timeString, endTimeString) => {
    if (!timeString) return '8:30 AM - 5:00 PM'
    
    try {
      const formatSingleTime = (time) => {
        if (!time) return null
        const [hours, minutes] = time.split(':').map(Number)
        const date = new Date()
        date.setHours(hours, minutes, 0, 0)
        return date.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      }

      const startTime = formatSingleTime(timeString)
      const endTime = formatSingleTime(endTimeString)
      
      if (startTime && endTime) {
        return `${startTime} - ${endTime}`
      } else if (startTime) {
        return startTime
      }
      
      return '8:30 AM - 5:00 PM'
    } catch (error) {
      return '8:30 AM - 5:00 PM'
    }
  }

  // Format target audience
  const formatAudience = (audience) => {
    if (!audience || audience === 'all') return 'All Welcome'
    
    const audienceMap = {
      'members': 'Members Only',
      'visitors': 'Visitors Welcome',
      'ministry_leaders': 'Ministry Leaders',
      'elders': 'Church Elders'
    }
    
    return audienceMap[audience] || audience.replace('_', ' ')
  }

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#ef4444'
      case 'high': return '#f59e0b'
      case 'normal': return '#3b82f6'
      case 'low': return '#6b7280'
      default: return '#3b82f6'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen" style={{ paddingTop: '2rem' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(45, 90, 39, 0.3)',
            borderTop: '3px solid #2d5a27',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
        padding: isMobile ? '2rem 0 1.5rem' : isTablet ? '2.5rem 0 1.75rem' : '3rem 0 2rem',
        borderBottom: '1px solid rgba(45, 90, 39, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              padding: isMobile ? '6px 16px' : '8px 20px',
              borderRadius: '25px',
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1rem',
              display: 'inline-block'
            }}>
              Church Updates
            </div>
            <h1 style={{
              fontSize: isMobile ? 'clamp(1.75rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Announcements
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Stay updated with the latest news, events, and important information from our church family.
            </p>
          </div>
        </div>
      </section>

      {/* Announcements List */}
      <section style={{
        padding: '4rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          {announcements.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              color: '#6b7280'
            }}>
              <svg style={{ width: '4rem', height: '4rem', margin: '0 auto 1rem', opacity: 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No announcements at this time</h3>
              <p>Check back later for updates from our church family.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem'
            }}>
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                    border: `2px solid ${getPriorityColor(announcement.priority)}20`,
                    borderLeft: `4px solid ${getPriorityColor(announcement.priority)}`,
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)'
                    e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.12)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {/* Priority Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: getPriorityColor(announcement.priority),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>
                    {announcement.priority}
                  </div>

                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#2d5a27',
                    marginBottom: '1rem',
                    paddingRight: '4rem'
                  }}>
                    {announcement.title}
                  </h2>

                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '1rem'
                  }}>
                    {announcement.content}
                  </p>

                  {/* Event Details */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#2d5a27'
                    }}>
                      <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span style={{ fontWeight: '600' }}>
                        {formatDate(announcement.start_date)}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#2d5a27'
                    }}>
                      <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span style={{ fontWeight: '600' }}>
                        {formatTime(announcement.start_time, announcement.end_time)}
                      </span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#2d5a27'
                    }}>
                      <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span style={{ fontWeight: '600' }}>
                        {formatAudience(announcement.target_audience)}
                      </span>
                    </div>
                  </div>

                  {/* Date Range */}
                  {announcement.end_date && announcement.end_date !== announcement.start_date && (
                    <div style={{
                      backgroundColor: 'rgba(45, 90, 39, 0.05)',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      color: '#6b7280',
                      textAlign: 'center'
                    }}>
                      Valid until {new Date(announcement.end_date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric'
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Announcements