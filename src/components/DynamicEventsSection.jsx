import React from 'react'
import { Link } from 'react-router-dom'
import { useUpcomingEvents } from '../hooks/useUpcomingEvents'

const DynamicEventsSection = ({ openModal, isMobile, isTablet }) => {
  const { events: upcomingEvents, loading: eventsLoading, error: eventsError } = useUpcomingEvents(3)

  // Helper function to create event modal data
  const createEventModalData = (event) => {
    if (event.isDefault) {
      // Return default modal data for hardcoded events
      const defaultModalData = {
        'Sabbath Service': {
          name: 'Sabbath',
          time: '9:00 AM - 1:00 PM',
          duration: '4 hours',
          description: 'Join us for our weekly Sabbath worship service, a time of spiritual renewal, fellowship, and community. Our service includes inspiring music, meaningful prayer, and biblical teaching that will strengthen your faith and connect you with God and fellow believers.',
          activities: [
            'Opening hymns and praise music',
            'Community prayer time',
            'Scripture reading and sermon',
            'Special music presentations',
            'Fellowship and refreshments',
            'Children\'s programs available'
          ]
        },
        'Prayer Meeting': {
          name: 'Prayer',
          time: '6:00 PM - 8:00 PM',
          duration: '2 hours',
          description: 'Join us for our midweek prayer meeting, a time of spiritual connection, Bible study, and community prayer. This intimate gathering strengthens our faith and builds deeper relationships with God and each other.',
          activities: [
            'Opening devotional and prayer',
            'Interactive Bible study',
            'Group prayer and testimonies',
            'Prayer requests and intercession',
            'Fellowship and light refreshments',
            'Special prayer focus topics'
          ]
        },
        'Youth Meeting': {
          name: 'Youth',
          time: '6:00 PM - 8:00 PM',
          duration: '2 hours',
          description: 'Join our vibrant youth community for an evening of worship, fun activities, and meaningful connections. Our youth meetings are designed to help young people grow in faith while building lasting friendships in a supportive environment.',
          activities: [
            'Contemporary worship and music',
            'Interactive Bible study for youth',
            'Fun games and team activities',
            'Youth-led discussions and testimonies',
            'Snacks and fellowship time',
            'Special events and outings planning'
          ]
        }
      }
      return defaultModalData[event.title] || {}
    }

    // Return dynamic event modal data
    return {
      name: event.title,
      time: event.time,
      date: event.relativeDate,
      location: event.location,
      description: event.description,
      eventType: event.eventType,
      activities: [
        'Join us for this special event',
        'Fellowship and community building',
        'Spiritual growth and learning',
        'Refreshments and socializing'
      ]
    }
  }

  if (eventsLoading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        alignItems: 'stretch'
      }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{
            background: 'white',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(45, 90, 39, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '300px'
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
        ))}
      </div>
    )
  }

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        alignItems: 'stretch'
      }}>
        {upcomingEvents.map((event, index) => (
          <div
            key={event.id}
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: `1px solid ${event.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : event.color === '#f59e0b' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(107, 114, 128, 0.1)'}`,
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 20px 60px ${event.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : event.color === '#f59e0b' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(107, 114, 128, 0.15)'}`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                backgroundColor: `${event.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : event.color === '#f59e0b' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(107, 114, 128, 0.1)'}`,
                color: event.color,
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {event.relativeDate}
              </div>
              <div style={{
                width: '3rem',
                height: '3rem',
                background: `linear-gradient(135deg, ${event.color}, ${event.color === '#2d5a27' ? '#1c3a1c' : event.color === '#f59e0b' ? '#d97706' : '#4b5563'})`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{event.icon}</span>
              </div>
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: event.color
            }}>
              {event.title}
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              {event.description}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '0.9rem',
              color: '#6b7280',
              marginBottom: '2rem'
            }}>
              <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.time}
            </div>
            <button
              onClick={() => openModal('service', createEventModalData(event))}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: event.color,
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '10px',
                border: `2px solid ${event.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = event.color
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = event.color
              }}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>

      {/* View All Events Button */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        <Link
          to="/events"
          style={{
            backgroundColor: '#2d5a27',
            color: 'white',
            padding: '16px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            display: 'inline-block',
            boxShadow: '0 8px 25px rgba(45, 90, 39, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)'
            e.target.style.boxShadow = '0 12px 35px rgba(45, 90, 39, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 8px 25px rgba(45, 90, 39, 0.3)'
          }}
        >
          View All Events
        </Link>
      </div>
    </>
  )
}

export default DynamicEventsSection