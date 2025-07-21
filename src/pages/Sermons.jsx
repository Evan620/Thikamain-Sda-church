import React, { useState } from 'react'

const Sermons = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen">
      {/* Compact Header Section */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
        padding: '3rem 0 2rem',
        borderBottom: '1px solid rgba(45, 90, 39, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '2rem'
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
              marginBottom: '1rem'
            }}>
              Spiritual Growth
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Sermons & Messages
            </h1>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              Listen to inspiring messages and grow in your faith journey with biblical teachings and practical wisdom
            </p>
          </div>

          {/* Search and Filter Bar */}
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
            {/* Search Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
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
                  placeholder="Search sermons by title, speaker, or topic..."
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
            </div>

            {/* Filter Buttons */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              {[
                { id: 'all', label: 'All Sermons' },
                { id: 'recent', label: 'Recent' },
                { id: 'series', label: 'Series' },
                { id: 'sabbath', label: 'Sabbath School' },
                { id: 'evangelistic', label: 'Evangelistic' },
                { id: 'youth', label: 'Youth' }
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
                    color: selectedFilter === filter.id ? 'white' : '#2d5a27'
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
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sermon Section */}
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
              Latest Message
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Featured Sermon
            </h2>
          </div>

          {/* Featured Sermon Card */}
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
            {/* Video/Image Section */}
            <div style={{
              position: 'relative',
              minHeight: '300px',
              background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Play Button */}
              <div style={{
                width: '80px',
                height: '80px',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)'
                e.currentTarget.style.background = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
              }}
              >
                <svg style={{ width: '2rem', height: '2rem', color: '#2d5a27', marginLeft: '4px' }} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>

              {/* Duration Badge */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                45:32
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
                {/* Date and Category */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    backgroundColor: 'rgba(45, 90, 39, 0.1)',
                    color: '#2d5a27',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    January 20, 2025
                  </span>
                  <span style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    color: '#f59e0b',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    Sabbath Service
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.8rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '1rem',
                  lineHeight: '1.3'
                }}>
                  Walking by Faith: Trusting God's Plan in Uncertain Times
                </h3>

                {/* Speaker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    background: 'linear-gradient(135deg, #2d5a27, #f59e0b)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    PM
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '1rem'
                    }}>
                      Pastor Samuel Mwangi
                    </div>
                    <div style={{
                      fontSize: '0.85rem',
                      color: '#6b7280'
                    }}>
                      Senior Pastor
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  fontSize: '1rem'
                }}>
                  In this powerful message, Pastor Mwangi explores how we can maintain unwavering faith
                  even when life's circumstances seem uncertain. Drawing from biblical examples and
                  practical wisdom, discover how to trust God's perfect timing and plan.
                </p>

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
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(45, 90, 39, 0.3)'
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
                    <svg style={{ width: '1rem', height: '1rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Watch Now
                  </button>
                  <button style={{
                    backgroundColor: 'transparent',
                    color: '#2d5a27',
                    fontWeight: '600',
                    padding: '12px 24px',
                    borderRadius: '10px',
                    border: '2px solid #2d5a27',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Audio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Grid Section */}
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
              Recent Sermons
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Explore our collection of inspiring messages
            </p>
          </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {[
            {
              id: 1,
              title: "The Power of Prayer in Daily Life",
              speaker: "Pastor Samuel Mwangi",
              date: "January 18, 2025",
              duration: "38:45",
              category: "Sabbath Service",
              series: "Living Faith",
              description: "Discover how prayer can transform your daily walk with God and strengthen your relationship with Him.",
              color: '#2d5a27'
            },
            {
              id: 2,
              title: "Hope in Times of Trial",
              speaker: "Elder Grace Wanjiku",
              date: "January 15, 2025",
              duration: "42:12",
              category: "Midweek Service",
              series: "Overcoming Challenges",
              description: "Learn how to maintain hope and trust in God's goodness even during life's most difficult seasons.",
              color: '#f59e0b'
            },
            {
              id: 3,
              title: "Youth and Purpose",
              speaker: "Deacon James Kiprotich",
              date: "January 12, 2025",
              duration: "35:20",
              category: "Youth Service",
              series: "Finding Your Calling",
              description: "A powerful message for young people about discovering God's unique purpose for their lives.",
              color: '#2d5a27'
            },
            {
              id: 4,
              title: "The Sabbath: A Gift of Rest",
              speaker: "Pastor Samuel Mwangi",
              date: "January 11, 2025",
              duration: "44:18",
              category: "Sabbath School",
              series: "Understanding the Sabbath",
              description: "Explore the beautiful gift of Sabbath rest and its significance in our modern world.",
              color: '#f59e0b'
            },
            {
              id: 5,
              title: "Community and Fellowship",
              speaker: "Elder Mary Njeri",
              date: "January 8, 2025",
              duration: "36:55",
              category: "Community Service",
              series: "Building Relationships",
              description: "Understanding the importance of Christian community and how we can support one another.",
              color: '#2d5a27'
            },
            {
              id: 6,
              title: "Health and Wholeness",
              speaker: "Elder Ruth Achieng",
              date: "January 5, 2025",
              duration: "40:30",
              category: "Health Ministry",
              series: "Wholistic Living",
              description: "Discover God's plan for our physical, mental, and spiritual well-being.",
              color: '#f59e0b'
            }
          ].map((sermon) => (
            <div
              key={sermon.id}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(45, 90, 39, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Thumbnail Section */}
              <div style={{
                position: 'relative',
                height: '200px',
                background: `linear-gradient(135deg, ${sermon.color} 0%, ${sermon.color === '#2d5a27' ? '#1c3a1c' : '#d97706'} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Play Button */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)'
                  e.currentTarget.style.background = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                }}
                >
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: sermon.color, marginLeft: '2px' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>

                {/* Duration Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  right: '0.75rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {sermon.duration}
                </div>

                {/* Series Badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  left: '0.75rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: sermon.color,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '0.7rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {sermon.series}
                </div>
              </div>

              {/* Content Section */}
              <div style={{
                padding: '1.5rem',
                position: 'relative'
              }}>
                {/* Date and Category */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <span style={{
                    backgroundColor: `${sermon.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                    color: sermon.color,
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {sermon.date}
                  </span>
                  <span style={{
                    backgroundColor: `${sermon.color === '#2d5a27' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(45, 90, 39, 0.1)'}`,
                    color: sermon.color === '#2d5a27' ? '#f59e0b' : '#2d5a27',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {sermon.category}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '0.75rem',
                  lineHeight: '1.3',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {sermon.title}
                </h3>

                {/* Speaker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: `linear-gradient(135deg, ${sermon.color}, ${sermon.color === '#2d5a27' ? '#f59e0b' : '#2d5a27'})`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.8rem'
                  }}>
                    {sermon.speaker.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      color: '#374151',
                      fontSize: '0.9rem'
                    }}>
                      {sermon.speaker}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p style={{
                  color: '#6b7280',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  marginBottom: '1.5rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {sermon.description}
                </p>

                {/* Action Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <button style={{
                    flex: 1,
                    backgroundColor: sermon.color,
                    color: 'white',
                    fontWeight: '600',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)'
                    e.target.style.boxShadow = `0 4px 12px ${sermon.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                  >
                    <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Watch
                  </button>
                  <button style={{
                    backgroundColor: 'transparent',
                    color: sermon.color,
                    fontWeight: '600',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `2px solid ${sermon.color}`,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = sermon.color
                    e.target.style.color = 'white'
                    e.target.style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.color = sermon.color
                    e.target.style.transform = 'translateY(0)'
                  }}
                  >
                    <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Sermon Series Section */}
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
              Sermon Collections
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              Current Series
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Follow along with our ongoing sermon series
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                id: 1,
                title: "Living Faith",
                subtitle: "Practical Christianity in Daily Life",
                description: "Explore how to live out your faith in practical, meaningful ways that impact your daily decisions and relationships.",
                sermonCount: 8,
                currentSermon: 6,
                color: '#2d5a27',
                startDate: "December 2024",
                topics: ["Prayer", "Faith", "Trust", "Daily Walk"]
              },
              {
                id: 2,
                title: "Overcoming Challenges",
                subtitle: "Finding Hope in Difficult Times",
                description: "Discover biblical principles for navigating life's challenges with faith, hope, and resilience.",
                sermonCount: 6,
                currentSermon: 4,
                color: '#f59e0b',
                startDate: "January 2025",
                topics: ["Hope", "Perseverance", "Trust", "Victory"]
              },
              {
                id: 3,
                title: "Understanding the Sabbath",
                subtitle: "God's Gift of Rest and Renewal",
                description: "A comprehensive study of the Sabbath and its significance for modern believers.",
                sermonCount: 5,
                currentSermon: 2,
                color: '#2d5a27',
                startDate: "January 2025",
                topics: ["Sabbath", "Rest", "Worship", "Creation"]
              }
            ].map((series) => (
              <div
                key={series.id}
                style={{
                  background: `linear-gradient(135deg, ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                  border: `1px solid ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 15px 40px ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
                  e.currentTarget.style.borderColor = `${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.borderColor = `${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: series.color,
                        marginBottom: '0.5rem'
                      }}>
                        {series.title}
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        {series.subtitle}
                      </p>
                    </div>
                    <div style={{
                      backgroundColor: series.color,
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      textAlign: 'center',
                      minWidth: '60px'
                    }}>
                      {series.currentSermon}/{series.sermonCount}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div style={{
                    backgroundColor: 'rgba(107, 114, 128, 0.2)',
                    borderRadius: '10px',
                    height: '8px',
                    marginBottom: '1.5rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      backgroundColor: series.color,
                      height: '100%',
                      width: `${(series.currentSermon / series.sermonCount) * 100}%`,
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>

                  {/* Description */}
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem'
                  }}>
                    {series.description}
                  </p>

                  {/* Topics */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {series.topics.map((topic, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: `${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                          color: series.color,
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    fontSize: '0.85rem',
                    color: '#6b7280'
                  }}>
                    <span>Started: {series.startDate}</span>
                    <span>{series.sermonCount} Messages</span>
                  </div>

                  {/* Action Button */}
                  <button style={{
                    width: '100%',
                    backgroundColor: series.color,
                    color: 'white',
                    fontWeight: '600',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    border: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = `0 8px 25px ${series.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}
                  >
                    View Series
                  </button>
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
                Never Miss a Message
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '1.1rem',
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                lineHeight: '1.6'
              }}>
                Subscribe to our sermon podcast or follow us on social media to stay updated with the latest messages and series.
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
                  Subscribe to Podcast
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

export default Sermons
