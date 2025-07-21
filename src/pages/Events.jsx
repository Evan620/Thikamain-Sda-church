import React, { useState } from 'react'

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [viewMode, setViewMode] = useState('list') // 'list' or 'calendar'
  const [searchTerm, setSearchTerm] = useState('')

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  return (
    <div className="min-h-screen">
      {/* Modern Events Header */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
        padding: isMobile ? '2rem 0 1.5rem' : isTablet ? '2.5rem 0 1.75rem' : '3rem 0 2rem',
        borderBottom: '1px solid rgba(45, 90, 39, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
              marginBottom: '1rem'
            }}>
              Community Life
            </div>
            <h1 style={{
              fontSize: isMobile ? 'clamp(1.75rem, 6vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Events & Activities
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Join us for worship, fellowship, and community events that strengthen our faith and bonds
            </p>
          </div>

          {/* Control Panel */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(45, 90, 39, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Search and View Toggle */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              {/* Search Bar */}
              <div style={{
                position: 'relative',
                flex: '1',
                minWidth: '300px'
              }}>
                <svg
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1.25rem',
                    height: '1.25rem',
                    color: '#6b7280'
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search events by name, date, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 3rem',
                    borderRadius: '10px',
                    border: '2px solid rgba(45, 90, 39, 0.1)',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2d5a27'
                    e.target.style.boxShadow = '0 0 0 3px rgba(45, 90, 39, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(45, 90, 39, 0.1)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
              </div>

              {/* View Toggle */}
              <div style={{
                display: 'flex',
                backgroundColor: 'rgba(45, 90, 39, 0.1)',
                borderRadius: '10px',
                padding: '4px'
              }}>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: viewMode === 'list' ? '#2d5a27' : 'transparent',
                    color: viewMode === 'list' ? 'white' : '#2d5a27',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  List
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: viewMode === 'calendar' ? '#2d5a27' : 'transparent',
                    color: viewMode === 'calendar' ? 'white' : '#2d5a27',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Calendar
                </button>
              </div>
            </div>

            {/* Filter Buttons */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {[
                { id: 'all', label: 'All Events', icon: '📅' },
                { id: 'worship', label: 'Worship Services', icon: '⛪' },
                { id: 'special', label: 'Special Events', icon: '🎉' },
                { id: 'community', label: 'Community', icon: '🤝' },
                { id: 'youth', label: 'Youth', icon: '👥' },
                { id: 'ministry', label: 'Ministry', icon: '🙏' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: selectedFilter === filter.id ? '#2d5a27' : 'rgba(45, 90, 39, 0.1)',
                    color: selectedFilter === filter.id ? 'white' : '#2d5a27',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedFilter !== filter.id) {
                      e.target.style.backgroundColor = 'rgba(45, 90, 39, 0.2)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedFilter !== filter.id) {
                      e.target.style.backgroundColor = 'rgba(45, 90, 39, 0.1)'
                    }
                  }}
                >
                  <span>{filter.icon}</span>
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event Section */}
      <section style={{
        padding: '4rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              padding: '8px 20px',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              Don't Miss
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Featured Event
            </h2>
          </div>

          {/* Featured Event Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.02) 0%, rgba(245, 158, 11, 0.02) 100%)',
            borderRadius: '24px',
            padding: '0',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(45, 90, 39, 0.1)',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            alignItems: 'center',
            gap: '0'
          }}>
            {/* Image/Visual Section */}
            <div style={{
              position: 'relative',
              minHeight: '350px',
              background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              {/* Event Icon */}
              <div style={{
                width: '100px',
                height: '100px',
                background: 'rgba(245, 158, 11, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '3px solid rgba(245, 158, 11, 0.3)'
              }}>
                <span style={{ fontSize: '3rem' }}>🎉</span>
              </div>

              {/* Event Badge */}
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.9)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Special Event
              </div>

              {/* Countdown or Date Badge */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                This Saturday
              </div>
            </div>

            {/* Content Section */}
            <div style={{
              padding: '3rem',
              position: 'relative'
            }}>
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                {/* Date and Time */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(45, 90, 39, 0.1)',
                    color: '#2d5a27',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    January 25, 2025
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    color: '#f59e0b',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2:00 PM - 6:00 PM
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  Annual Church Family Day
                </h3>

                {/* Location */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.5rem',
                  color: '#6b7280'
                }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span style={{ fontWeight: '600', fontSize: '1rem' }}>
                    Church Grounds & Community Hall
                  </span>
                </div>

                {/* Description */}
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  fontSize: '1rem'
                }}>
                  Join us for our annual Church Family Day celebration! A wonderful opportunity for fellowship,
                  fun activities for all ages, delicious food, and strengthening our church community bonds.
                  Bring your family and friends for an unforgettable day of joy and togetherness.
                </p>

                {/* Event Highlights */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  {[
                    { icon: '🍽️', text: 'Community Feast' },
                    { icon: '🎮', text: 'Games & Activities' },
                    { icon: '🎵', text: 'Live Music' },
                    { icon: '👨‍👩‍👧‍👦', text: 'Family Fun' }
                  ].map((highlight, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '8px 12px',
                        backgroundColor: 'rgba(45, 90, 39, 0.05)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}
                    >
                      <span>{highlight.icon}</span>
                      <span>{highlight.text}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <button style={{
                    backgroundColor: '#2d5a27',
                    color: 'white',
                    fontWeight: '600',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(45, 90, 39, 0.3)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 6px 20px rgba(45, 90, 39, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 4px 12px rgba(45, 90, 39, 0.3)'
                  }}
                  >
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Register Now
                  </button>
                  <button style={{
                    backgroundColor: 'transparent',
                    color: '#2d5a27',
                    fontWeight: '600',
                    padding: '14px 28px',
                    borderRadius: '10px',
                    border: '2px solid #2d5a27',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2d5a27'
                    e.target.style.color = 'white'
                    e.target.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = '#2d5a27'
                    e.target.style.transform = 'translateY(0)'
                  }}
                  >
                    <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              {viewMode === 'calendar' ? 'Event Calendar' : 'Upcoming Events'}
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              {viewMode === 'calendar' ? 'View events in calendar format' : 'Stay connected with our community activities'}
            </p>
          </div>

        <div style={{
          display: viewMode === 'calendar' ? 'grid' : 'flex',
          gridTemplateColumns: viewMode === 'calendar' ? 'repeat(7, 1fr)' : 'none',
          flexDirection: viewMode === 'calendar' ? 'none' : 'column',
          gap: '1.5rem'
        }}>
          {viewMode === 'calendar' ? (
            // Calendar View
            <>
              {/* Calendar Header */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div
                  key={day}
                  style={{
                    padding: '1rem',
                    textAlign: 'center',
                    fontWeight: '700',
                    color: '#2d5a27',
                    backgroundColor: 'rgba(45, 90, 39, 0.1)',
                    borderRadius: '8px'
                  }}
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days with Events */}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNumber = i - 5; // Adjust for month start
                const hasEvent = [6, 11, 18, 25, 29].includes(dayNumber);

                return (
                  <div
                    key={i}
                    style={{
                      minHeight: '100px',
                      padding: '0.5rem',
                      border: '1px solid rgba(45, 90, 39, 0.1)',
                      borderRadius: '8px',
                      backgroundColor: dayNumber > 0 && dayNumber <= 31 ? 'white' : 'rgba(107, 114, 128, 0.05)',
                      position: 'relative'
                    }}
                  >
                    {dayNumber > 0 && dayNumber <= 31 && (
                      <>
                        <div style={{
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: '#374151',
                          marginBottom: '0.5rem'
                        }}>
                          {dayNumber}
                        </div>
                        {hasEvent && (
                          <div style={{
                            backgroundColor: '#2d5a27',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            marginBottom: '2px'
                          }}>
                            Event
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </>
          ) : (
            // List View - Enhanced Event Cards
            [
              {
                id: 1,
                title: "Sabbath Worship Service",
                date: "January 25, 2025",
                time: "11:00 AM - 1:00 PM",
                location: "Main Sanctuary",
                category: "worship",
                type: "Regular Service",
                description: "Join us for our weekly Sabbath worship service with inspiring music, prayer, and biblical teaching.",
                attendees: "200+ expected",
                color: '#2d5a27',
                icon: '⛪',
                recurring: true
              },
              {
                id: 2,
                title: "Youth Bible Study",
                date: "January 26, 2025",
                time: "6:00 PM - 8:00 PM",
                location: "Youth Hall",
                category: "youth",
                type: "Bible Study",
                description: "Interactive Bible study session for young people aged 13-25. Come explore God's word together!",
                attendees: "30+ expected",
                color: '#f59e0b',
                icon: '👥',
                recurring: true
              },
              {
                id: 3,
                title: "Community Health Fair",
                date: "January 28, 2025",
                time: "9:00 AM - 3:00 PM",
                location: "Church Grounds",
                category: "community",
                type: "Outreach Event",
                description: "Free health screenings, wellness education, and healthy lifestyle demonstrations for the community.",
                attendees: "500+ expected",
                color: '#2d5a27',
                icon: '🏥',
                recurring: false
              },
              {
                id: 4,
                title: "Prayer Meeting",
                date: "January 29, 2025",
                time: "6:00 PM - 7:30 PM",
                location: "Prayer Room",
                category: "ministry",
                type: "Prayer Service",
                description: "Midweek prayer meeting for spiritual renewal and community intercession.",
                attendees: "50+ expected",
                color: '#f59e0b',
                icon: '🙏',
                recurring: true
              }
            ].map((event) => (
              <div
                key={event.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '2rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${event.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Header Section */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    <div style={{ flex: 1 }}>
                      {/* Event Type and Recurring Badge */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.75rem',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{
                          backgroundColor: `${event.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                          color: event.color,
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {event.type}
                        </span>
                        {event.recurring && (
                          <span style={{
                            backgroundColor: 'rgba(107, 114, 128, 0.1)',
                            color: '#6b7280',
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            <svg style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            RECURRING
                          </span>
                        )}
                      </div>

                      {/* Title with Icon */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.5rem'
                      }}>
                        <div style={{
                          width: '3rem',
                          height: '3rem',
                          background: `linear-gradient(135deg, ${event.color}, ${event.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.25rem'
                        }}>
                          {event.icon}
                        </div>
                        <h3 style={{
                          fontSize: '1.4rem',
                          fontWeight: '700',
                          color: '#2d5a27',
                          lineHeight: '1.3',
                          margin: 0
                        }}>
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Date and Time Section */}
                    <div style={{
                      textAlign: 'right',
                      minWidth: '150px'
                    }}>
                      <div style={{
                        backgroundColor: event.color,
                        color: 'white',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {event.date}
                      </div>
                      <div style={{
                        color: '#6b7280',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}>
                        {event.time}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '1rem'
                  }}>
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    {/* Location */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(45, 90, 39, 0.05)',
                      borderRadius: '8px'
                    }}>
                      <svg style={{ width: '1rem', height: '1rem', color: '#2d5a27' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                        {event.location}
                      </span>
                    </div>

                    {/* Expected Attendees */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(245, 158, 11, 0.05)',
                      borderRadius: '8px'
                    }}>
                      <svg style={{ width: '1rem', height: '1rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151' }}>
                        {event.attendees}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <button style={{
                      backgroundColor: event.color,
                      color: 'white',
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)'
                      e.target.style.boxShadow = `0 8px 25px ${event.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)'
                      e.target.style.boxShadow = 'none'
                    }}
                    >
                      <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Learn More
                    </button>
                    <button style={{
                      backgroundColor: 'transparent',
                      color: event.color,
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: `2px solid ${event.color}`,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = event.color
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = event.color
                      e.target.style.transform = 'translateY(0)'
                    }}
                    >
                      <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Add to Calendar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        </div>
      </section>

      {/* Recurring Events Section */}
      <section style={{
        padding: '4rem 0',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(45, 90, 39, 0.1)',
              color: '#2d5a27',
              padding: '8px 20px',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              Regular Schedule
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Weekly Activities
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Join us for our regular weekly programs and services
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                day: 'Saturday',
                events: [
                  { time: '9:00 AM', name: 'Sabbath School', icon: '📚' },
                  { time: '11:00 AM', name: 'Divine Service', icon: '⛪' },
                  { time: '3:00 PM', name: 'Afternoon Program', icon: '🎵' }
                ],
                color: '#2d5a27'
              },
              {
                day: 'Wednesday',
                events: [
                  { time: '6:00 PM', name: 'Prayer Meeting', icon: '🙏' },
                  { time: '7:00 PM', name: 'Bible Study', icon: '📖' }
                ],
                color: '#f59e0b'
              },
              {
                day: 'Friday',
                events: [
                  { time: '6:00 PM', name: 'Youth Meeting', icon: '👥' },
                  { time: '7:30 PM', name: 'Vespers', icon: '🕯️' }
                ],
                color: '#2d5a27'
              },
              {
                day: 'Sunday',
                events: [
                  { time: '10:00 AM', name: 'Community Service', icon: '🤝' },
                  { time: '2:00 PM', name: 'Health Ministry', icon: '🏥' }
                ],
                color: '#f59e0b'
              }
            ].map((schedule, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                  border: `1px solid ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 15px 40px ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${schedule.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Day Header */}
                  <div style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: schedule.color,
                      marginBottom: '0.5rem'
                    }}>
                      {schedule.day}
                    </h3>
                    <div style={{
                      width: '50px',
                      height: '3px',
                      backgroundColor: schedule.color,
                      borderRadius: '2px',
                      margin: '0 auto'
                    }}></div>
                  </div>

                  {/* Events List */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    {schedule.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          padding: '1rem',
                          backgroundColor: 'white',
                          borderRadius: '12px',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div style={{
                          width: '2.5rem',
                          height: '2.5rem',
                          backgroundColor: schedule.color,
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.2rem'
                        }}>
                          {event.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.25rem'
                          }}>
                            {event.name}
                          </div>
                          <div style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            fontWeight: '500'
                          }}>
                            {event.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #f0f9f0 0%, #e8f5e8 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '3rem',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(45, 90, 39, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '700',
                color: '#2d5a27',
                marginBottom: '1rem'
              }}>
                Stay Connected
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '1.1rem',
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Never miss an event! Subscribe to our newsletter or follow us on social media to stay updated with all our activities and special events.
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <button style={{
                  backgroundColor: '#2d5a27',
                  color: 'white',
                  fontWeight: '600',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  boxShadow: '0 8px 25px rgba(45, 90, 39, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)'
                  e.target.style.boxShadow = '0 12px 40px rgba(45, 90, 39, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 8px 25px rgba(45, 90, 39, 0.3)'
                }}
                >
                  Subscribe to Newsletter
                </button>
                <button style={{
                  backgroundColor: 'transparent',
                  color: '#2d5a27',
                  fontWeight: '600',
                  padding: '16px 32px',
                  borderRadius: '12px',
                  border: '2px solid #2d5a27',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#2d5a27'
                  e.target.style.color = 'white'
                  e.target.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#2d5a27'
                  e.target.style.transform = 'translateY(0)'
                }}
                >
                  Follow Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
