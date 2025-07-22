import React from 'react'
import { Link } from 'react-router-dom'

// Church images for hero background (from public folder)
const image1 = '/assets/image1.png'
const image2 = '/assets/image2.png'
const image3 = '/assets/image3.png'
const image4 = '/assets/image4.png'
const image5 = '/assets/image5.png'

const Home = () => {
  // Enhanced mobile detection with state management
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)
  const [isTablet, setIsTablet] = React.useState(window.innerWidth >= 768 && window.innerWidth < 1024)
  const [isLoading, setIsLoading] = React.useState(true)

  // Hero background image carousel state
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  const [imagesLoaded, setImagesLoaded] = React.useState(false)
  const heroImages = [image1, image2, image3, image4, image5]

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    const handleLoad = () => {
      setIsLoading(false)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleLoad)

    // Set loading to false after a short delay if load event doesn't fire
    const timer = setTimeout(() => setIsLoading(false), 1000)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleLoad)
      clearTimeout(timer)
    }
  }, [])

  // Preload hero images for smooth transitions
  React.useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = heroImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = reject
          img.src = src
        })
      })

      try {
        await Promise.all(imagePromises)
        console.log('All church images loaded successfully!')
        setImagesLoaded(true)
      } catch (error) {
        console.log('Some images failed to load, but continuing...', error)
        setImagesLoaded(true)
      }
    }

    preloadImages()
  }, [heroImages])

  // Hero background image carousel effect
  React.useEffect(() => {
    if (!imagesLoaded) return

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      )
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(imageInterval)
  }, [heroImages.length, imagesLoaded])

  const heroStyle = {
    background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
    color: 'white',
    padding: isMobile ? '100px 0 60px' : isTablet ? '120px 0 80px' : '140px 0 100px',
    textAlign: 'center',
    minHeight: isMobile ? '70vh' : '85vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  }

  const containerStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem',
    position: 'relative',
    zIndex: 2
  }

  const titleStyle = {
    fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.5rem, 6vw, 5.5rem)',
    fontWeight: '800',
    marginBottom: isMobile ? '1.5rem' : '2rem',
    lineHeight: '1.1',
    letterSpacing: '-1px'
  }

  const verseStyle = {
    fontFamily: 'Georgia, serif',
    fontSize: isMobile ? '1.1rem' : isTablet ? '1.2rem' : '1.4rem',
    fontStyle: 'italic',
    marginBottom: '1rem',
    opacity: '0.95',
    maxWidth: isMobile ? '100%' : '900px',
    margin: '0 auto 1rem auto',
    lineHeight: '1.7',
    padding: isMobile ? '0 0.5rem' : '0'
  }

  const buttonContainerStyle = {
    display: 'flex',
    gap: isMobile ? '1rem' : '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: isMobile ? '2rem' : '3rem',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: 'center'
  }

  const primaryButtonStyle = {
    backgroundColor: 'white',
    color: '#2d5a27',
    padding: isMobile ? '16px 28px' : '18px 36px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: isMobile ? '1rem' : '1.1rem',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
    position: 'relative',
    overflow: 'hidden',
    width: isMobile ? '280px' : 'auto',
    textAlign: 'center'
  }

  const outlineButtonStyle = {
    backgroundColor: 'transparent',
    color: 'white',
    padding: isMobile ? '16px 28px' : '18px 36px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: isMobile ? '1rem' : '1.1rem',
    transition: 'all 0.3s ease',
    border: '2px solid white',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    width: isMobile ? '280px' : 'auto',
    textAlign: 'center'
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyle}>
        {/* Church Images Background Carousel */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden'
        }}>
          {/* Loading state */}
          {!imagesLoaded && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '3px solid rgba(245, 158, 11, 0.3)',
                borderTop: '3px solid #f59e0b',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
            </div>
          )}

          {/* Image carousel */}
          {imagesLoaded && heroImages.map((image, index) => (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#2d5a27', // Fallback color if image fails to load
                opacity: index === currentImageIndex ? 1 : 0,
                transition: 'all 2.5s ease-in-out',
                transform: index === currentImageIndex ? 'scale(1.05)' : 'scale(1)',
                filter: 'brightness(0.8) contrast(1.1) saturate(1.1)',
                zIndex: 1
              }}
            />
          ))}
        </div>



        {/* Subtle Pattern Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          zIndex: 3
        }}></div>

        {/* Image Carousel Indicators */}
        {imagesLoaded && (
          <div style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.75rem',
            zIndex: 5,
            opacity: imagesLoaded ? 1 : 0,
            transition: 'opacity 1s ease-in-out'
          }}>
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                  backgroundColor: index === currentImageIndex ? 'rgba(245, 158, 11, 0.9)' : 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxShadow: index === currentImageIndex ? '0 0 10px rgba(245, 158, 11, 0.5)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentImageIndex) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.6)'
                    e.target.style.transform = 'scale(1.2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentImageIndex) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'
                    e.target.style.transform = 'scale(1)'
                  }
                }}
              />
            ))}
          </div>
        )}

        <div style={{
          ...containerStyle,
          position: 'relative',
          zIndex: 4
        }}>
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {/* Welcome Badge */}
            <div style={{ marginBottom: '2rem' }}>
              <span style={{
                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                padding: '16px 32px',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: '700',
                border: '2px solid rgba(245, 158, 11, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.2)'
              }}>
                Welcome to God's House
              </span>
            </div>

            {/* Main Title */}
            <h1 style={{
              ...titleStyle,
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              THIKA MAIN <span style={{
                color: '#fbbf24',
                textShadow: '0 0 30px rgba(251, 191, 36, 0.5), 0 4px 8px rgba(0, 0, 0, 0.5)'
              }}>SDA</span> CHURCH
            </h1>

            {/* Scripture Verse */}
            <div style={{ maxWidth: '950px', margin: '0 auto 4rem auto' }}>
              <blockquote style={{
                ...verseStyle,
                fontSize: '1.5rem',
                fontWeight: '300',
                marginBottom: '1.5rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)'
              }}>
                "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, to give you hope and a future."
              </blockquote>
              <cite style={{
                color: '#fbbf24',
                fontWeight: '700',
                fontSize: '1.3rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '0 0 20px rgba(251, 191, 36, 0.5), 0 2px 4px rgba(0, 0, 0, 0.5)'
              }}>
                — Jeremiah 29:11
              </cite>
            </div>

            {/* Call to Action Buttons */}
            <div style={buttonContainerStyle}>
              <Link
                to="/about"
                style={primaryButtonStyle}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.transform = 'translateY(-3px)'
                    e.target.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'
                  }
                }}
                onTouchStart={(e) => {
                  e.target.style.transform = 'scale(0.98)'
                  e.target.style.opacity = '0.9'
                }}
                onTouchEnd={(e) => {
                  setTimeout(() => {
                    e.target.style.transform = 'scale(1)'
                    e.target.style.opacity = '1'
                  }, 150)
                }}
              >
                {isMobile ? 'Plan Visit' : 'Plan Your Visit'}
              </Link>
              <Link
                to="/sermons"
                style={outlineButtonStyle}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                    e.target.style.transform = 'translateY(-3px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
                onTouchStart={(e) => {
                  e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'
                  e.target.style.transform = 'scale(0.98)'
                }}
                onTouchEnd={(e) => {
                  setTimeout(() => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.transform = 'scale(1)'
                  }, 150)
                }}
              >
                {isMobile ? 'Sermons' : 'Watch Sermons'}
              </Link>
              <Link
                to="/giving"
                style={{
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  padding: '18px 36px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 30px rgba(245, 158, 11, 0.4)',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)'
                  e.target.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 8px 30px rgba(245, 158, 11, 0.4)'
                }}
              >
                Give Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Announcements Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f0f9f0 0%, #e8f5e8 100%)',
        padding: isMobile ? '3rem 0' : isTablet ? '4rem 0' : '5rem 0',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0 1rem' : isTablet ? '0 1.5rem' : '0 2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem',
            alignItems: 'stretch'
          }}>
            {/* Main Featured Card */}
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
                  This Week
                </div>

                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  lineHeight: '1.2'
                }}>
                  Special Sabbath Service
                </h2>

                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  opacity: '0.9'
                }}>
                  Join us for a special communion service this Sabbath. Experience the blessing of fellowship and spiritual renewal as we come together in worship.
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <svg style={{ width: '1.25rem', height: '1.25rem', color: '#fbbf24' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span style={{ fontWeight: '600' }}>This Saturday</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <svg style={{ width: '1.25rem', height: '1.25rem', color: '#fbbf24' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span style={{ fontWeight: '600' }}>11:00 AM</span>
                  </div>
                </div>

                <Link
                  to="/events"
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

            {/* Secondary Cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Church Story Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(45, 90, 39, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
              }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: 'linear-gradient(135deg, #2d5a27, #f59e0b)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#2d5a27',
                    margin: 0
                  }}>
                    Our Story
                  </h3>
                </div>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  Discover the rich history and mission of Thika Main SDA Church in our community.
                </p>
                <Link
                  to="/about"
                  style={{
                    color: '#2d5a27',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Learn More
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Community Impact Card */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(45, 90, 39, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)'
              }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    background: 'linear-gradient(135deg, #f59e0b, #2d5a27)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#2d5a27',
                    margin: 0
                  }}>
                    Community Impact
                  </h3>
                </div>
                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  See how we're making a difference in Thika through our outreach programs.
                </p>
                <Link
                  to="/ministries"
                  style={{
                    color: '#2d5a27',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  Explore Ministries
                  <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section style={{
        padding: '6rem 0',
        background: 'white',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(45, 90, 39, 0.1)',
              color: '#2d5a27',
              padding: '12px 24px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}>
              Connect With Us
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Join Our Church Family
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Experience the warmth of our community and grow in your faith journey with us
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: isMobile ? '1.5rem' : '2rem',
            alignItems: 'stretch'
          }}>
            {/* Service Times Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.02) 0%, rgba(45, 90, 39, 0.05) 100%)',
              border: '1px solid rgba(45, 90, 39, 0.1)',
              borderRadius: '20px',
              padding: isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(45, 90, 39, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.1)'
            }}
            >
              <div style={{
                width: isMobile ? '70px' : '80px',
                height: isMobile ? '70px' : '80px',
                background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: isMobile ? '0 auto 1.5rem auto' : '0 auto 2rem auto',
                boxShadow: '0 8px 25px rgba(45, 90, 39, 0.3)'
              }}>
                <svg style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#2d5a27'
              }}>
                Service Times
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                color: '#6b7280'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(45, 90, 39, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#2d5a27' }}>Sabbath School:</span>
                  <span style={{ fontWeight: '600' }}>Saturday 9:00 AM</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(45, 90, 39, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#2d5a27' }}>Divine Service:</span>
                  <span style={{ fontWeight: '600' }}>Saturday 11:00 AM</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(45, 90, 39, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#2d5a27' }}>Prayer Meeting:</span>
                  <span style={{ fontWeight: '600' }}>Wednesday 6:00 PM</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(45, 90, 39, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#2d5a27' }}>Youth Meeting:</span>
                  <span style={{ fontWeight: '600' }}>Friday 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.02) 0%, rgba(245, 158, 11, 0.05) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.1)',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(245, 158, 11, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.1)'
            }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
              }}>
                <svg style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#f59e0b'
              }}>
                Our Location
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                color: '#6b7280'
              }}>
                <div style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  borderRadius: '10px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.25rem'
                  }}>
                    <span style={{ fontWeight: '600', color: '#f59e0b' }}>Address:</span>
                    <span style={{ fontWeight: '600' }}>Makongeni, Thika</span>
                  </div>
                  <div style={{
                    textAlign: 'right',
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    P.O BOX 3478-01002 Madaraka Thika
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#f59e0b' }}>Access:</span>
                  <span style={{ fontWeight: '600' }}>Easy to find</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#f59e0b' }}>Parking:</span>
                  <span style={{ fontWeight: '600' }}>Available on-site</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#f59e0b' }}>Transport:</span>
                  <span style={{ fontWeight: '600' }}>Public nearby</span>
                </div>
              </div>

              {/* Map Action Buttons */}
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                marginTop: '1.5rem',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <a
                  href="https://www.google.com/maps/place/SDA+Thika+Main+Church+Kenya/@-1.053758,37.1108582,17z/data=!3m1!4b1!4m6!3m5!1s0x182f4fbb681042a9:0x39773ad0d5f57cee!8m2!3d-1.053758!4d37.1108582!16s%2Fg%2F11txs_8b0p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-btn"
                  style={{
                    backgroundColor: '#f59e0b',
                    color: 'white',
                    padding: isMobile ? '14px 16px' : '10px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    flex: 1,
                    justifyContent: 'center',
                    minHeight: isMobile ? '44px' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.target.style.backgroundColor = '#d97706'
                      e.target.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.target.style.backgroundColor = '#f59e0b'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                  onTouchStart={(e) => {
                    e.target.style.backgroundColor = '#d97706'
                    e.target.style.transform = 'scale(0.98)'
                  }}
                  onTouchEnd={(e) => {
                    setTimeout(() => {
                      e.target.style.backgroundColor = '#f59e0b'
                      e.target.style.transform = 'scale(1)'
                    }, 150)
                  }}
                >
                  <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {isMobile ? 'View Map' : 'View on Maps'}
                </a>
                <a
                  href="https://www.google.com/maps/dir//SDA+Thika+Main+Church+Kenya/@-1.053758,37.1108582,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-btn"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#f59e0b',
                    border: '2px solid #f59e0b',
                    padding: isMobile ? '12px 16px' : '8px 16px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease',
                    flex: 1,
                    justifyContent: 'center',
                    minHeight: isMobile ? '44px' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.target.style.backgroundColor = '#f59e0b'
                      e.target.style.color = 'white'
                      e.target.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#f59e0b'
                      e.target.style.transform = 'translateY(0)'
                    }
                  }}
                  onTouchStart={(e) => {
                    e.target.style.backgroundColor = '#f59e0b'
                    e.target.style.color = 'white'
                    e.target.style.transform = 'scale(0.98)'
                  }}
                  onTouchEnd={(e) => {
                    setTimeout(() => {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#f59e0b'
                      e.target.style.transform = 'scale(1)'
                    }, 150)
                  }}
                >
                  <svg style={{ width: '0.9rem', height: '0.9rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Directions
                </a>
              </div>
            </div>

            {/* Community Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(107, 114, 128, 0.02) 0%, rgba(107, 114, 128, 0.05) 100%)',
              border: '1px solid rgba(107, 114, 128, 0.1)',
              borderRadius: '20px',
              padding: '2.5rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(107, 114, 128, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
              e.currentTarget.style.borderColor = 'rgba(107, 114, 128, 0.1)'
            }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem auto',
                boxShadow: '0 8px 25px rgba(107, 114, 128, 0.3)'
              }}>
                <svg style={{ width: '2.5rem', height: '2.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#6b7280'
              }}>
                Our Community
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                color: '#6b7280'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(107, 114, 128, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#6b7280' }}>Welcome:</span>
                  <span style={{ fontWeight: '600' }}>All backgrounds</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(107, 114, 128, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#6b7280' }}>Growth:</span>
                  <span style={{ fontWeight: '600' }}>Spiritual focus</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(107, 114, 128, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#6b7280' }}>Fellowship:</span>
                  <span style={{ fontWeight: '600' }}>Strong bonds</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'rgba(107, 114, 128, 0.05)',
                  borderRadius: '10px'
                }}>
                  <span style={{ fontWeight: '600', color: '#6b7280' }}>Service:</span>
                  <span style={{ fontWeight: '600' }}>Active outreach</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Verse Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, rgba(45, 90, 39, 0.03) 0%, transparent 70%)',
          opacity: 0.6
        }}></div>

        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ marginBottom: '3rem' }}>
            <div style={{
              backgroundColor: 'rgba(45, 90, 39, 0.1)',
              color: '#2d5a27',
              padding: '12px 24px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}>
              Daily Inspiration
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '2rem',
              lineHeight: '1.2'
            }}>
              Today's Verse
            </h2>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            padding: '3rem 2rem',
            maxWidth: '900px',
            margin: '0 auto',
            border: '1px solid rgba(45, 90, 39, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>

            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '60px',
              height: '60px',
              background: 'radial-gradient(circle, rgba(45, 90, 39, 0.1) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <blockquote style={{
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontStyle: 'italic',
                lineHeight: '1.8',
                color: '#374151',
                fontWeight: '300',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                "Trust in the Lord with all your heart and lean not on your own understanding;
                in all your ways submit to him, and he will make your paths straight."
              </blockquote>

              <cite style={{
                fontSize: '1.3rem',
                color: '#2d5a27',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'block',
                marginBottom: '2rem'
              }}>
                — Proverbs 3:5-6
              </cite>

              <div style={{
                borderTop: '2px solid rgba(45, 90, 39, 0.1)',
                paddingTop: '2rem',
                marginTop: '2rem'
              }}>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  fontStyle: 'italic'
                }}>
                  Let this verse guide your day. Trust in God's wisdom and direction as you walk in faith.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #f0f9f0 0%, #e8f5e8 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              padding: '12px 24px',
              borderRadius: '30px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              display: 'inline-block',
              marginBottom: '1.5rem'
            }}>
              What's Happening
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Upcoming Events
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Join us for these special gatherings and grow together in faith and fellowship
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            alignItems: 'stretch'
          }}>
            {/* Sabbath Service Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(45, 90, 39, 0.1)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(45, 90, 39, 0.15)'
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
                  backgroundColor: 'rgba(45, 90, 39, 0.1)',
                  color: '#2d5a27',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  This Saturday
                </div>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  background: 'linear-gradient(135deg, #2d5a27, #1c3a1c)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#2d5a27'
              }}>
                Sabbath Service
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Join us for worship, fellowship, and spiritual growth in our weekly Sabbath celebration.
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
                9:00 AM - 1:00 PM
              </div>
              <button style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: '#2d5a27',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid #2d5a27',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2d5a27'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#2d5a27'
              }}
              >
                Learn More
              </button>
            </div>

            {/* Prayer Meeting Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.1)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(245, 158, 11, 0.15)'
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
                  backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  color: '#f59e0b',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Next Wednesday
                </div>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#f59e0b'
              }}>
                Prayer Meeting
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Come together for prayer, Bible study, and fellowship in our midweek gathering.
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
                6:00 PM - 8:00 PM
              </div>
              <button style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: '#f59e0b',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid #f59e0b',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f59e0b'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#f59e0b'
              }}
              >
                Learn More
              </button>
            </div>

            {/* Youth Meeting Card */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2.5rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(107, 114, 128, 0.1)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(107, 114, 128, 0.15)'
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
                  backgroundColor: 'rgba(107, 114, 128, 0.1)',
                  color: '#6b7280',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Next Friday
                </div>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#6b7280'
              }}>
                Youth Meeting
              </h3>
              <p style={{
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                Young people gathering for worship, activities, and building lasting friendships.
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
                6:00 PM - 8:00 PM
              </div>
              <button style={{
                width: '100%',
                backgroundColor: 'transparent',
                color: '#6b7280',
                fontWeight: '600',
                padding: '12px 24px',
                borderRadius: '10px',
                border: '2px solid #6b7280',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#6b7280'
                e.target.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#6b7280'
              }}
              >
                Learn More
              </button>
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '3rem'
          }}>
            <Link
              to="/events"
              style={{
                backgroundColor: '#2d5a27',
                color: 'white',
                fontWeight: '600',
                padding: '16px 32px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                display: 'inline-block',
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
              View All Events
            </Link>
          </div>
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

export default Home
