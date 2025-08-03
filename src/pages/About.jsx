import React from 'react'
import { Link } from 'react-router-dom'
import ContactButton from '../components/ContactButton'

const About = () => {
  // Check if we're on mobile
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  return (
    <div className="min-h-screen">


      {/* Mission & Vision Section */}
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
              Our Foundation
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Our Mission & Vision
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Guided by God's Word and empowered by His Spirit, we are committed to making disciples
              and preparing hearts for Christ's soon return.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '3rem',
            alignItems: 'stretch',
            marginBottom: '4rem'
          }}>
            {/* Mission Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.02) 0%, rgba(45, 90, 39, 0.05) 100%)',
              border: '1px solid rgba(45, 90, 39, 0.1)',
              borderRadius: '24px',
              padding: '3rem',
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
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(45, 90, 39, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'linear-gradient(135deg, #2d5a27, #1c3a1c)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1.5rem',
                    boxShadow: '0 8px 25px rgba(45, 90, 39, 0.3)'
                  }}>
                    <svg style={{ width: '2rem', height: '2rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#2d5a27',
                    margin: 0
                  }}>
                    Our Mission
                  </h3>
                </div>

                <p style={{
                  color: '#374151',
                  fontSize: '1.2rem',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  fontWeight: '400'
                }}>
                  To make disciples of Jesus Christ who live as His loving witnesses and proclaim to all people
                  the everlasting gospel of the Three Angels' Messages in preparation for His soon return.
                </p>

                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  We are committed to sharing the love of Jesus Christ and the hope of His soon return with our
                  community and beyond. Through worship, fellowship, service, and evangelism, we strive to be
                  a beacon of faith, hope, and love in Thika.
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.02) 0%, rgba(245, 158, 11, 0.05) 100%)',
              border: '1px solid rgba(245, 158, 11, 0.1)',
              borderRadius: '24px',
              padding: '3rem',
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
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1.5rem',
                    boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
                  }}>
                    <svg style={{ width: '2rem', height: '2rem', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#f59e0b',
                    margin: 0
                  }}>
                    Our Vision
                  </h3>
                </div>

                <p style={{
                  color: '#374151',
                  fontSize: '1.2rem',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem',
                  fontWeight: '400'
                }}>
                  To be a transformative, dynamic, disciple-making church raising Christ-centered servant
                  leaders who impact their communities and the world for God's kingdom.
                </p>

                <p style={{
                  color: '#6b7280',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  In harmony with Bible revelation, we see as the climax of God's plan the restoration of all
                  His creation to full harmony with His perfect will and righteousness, preparing hearts for
                  Christ's glorious return.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Church History Section */}
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
              Our Journey
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Our Heritage
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              From humble beginnings in 1980 to a thriving mother church with 15 daughter congregations,
              discover the remarkable 45-year journey of faith, growth, and community impact.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}>
            {/* Timeline Section */}
            <div>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#2d5a27',
                marginBottom: '2rem'
              }}>
                A Legacy of Faith
              </h3>

              <div style={{ position: 'relative' }}>
                {/* Timeline line */}
                <div style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '0',
                  bottom: '0',
                  width: '4px',
                  background: 'linear-gradient(to bottom, #f59e0b, #2d5a27, #f59e0b, #2d5a27)',
                  borderRadius: '2px'
                }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {/* 1960s */}
                  <div style={{
                    position: 'relative',
                    paddingLeft: '5rem'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '1rem',
                      width: '2rem',
                      height: '2rem',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                      border: '4px solid white'
                    }}>
                      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>1</span>
                    </div>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '2rem',
                      borderRadius: '16px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)'
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                    }}
                    >
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#f59e0b',
                        marginBottom: '0.5rem'
                      }}>
                        1980 - Foundation
                      </h4>
                      <p style={{
                        color: '#6b7280',
                        lineHeight: '1.6'
                      }}>
                        Thika Main SDA Church was established in 1980 by a small group of dedicated believers who
                        felt called to share the Adventist message in the rapidly growing town of Thika. Starting
                        with just 25 members, they met in a simple structure in Makongeni, laying the foundation
                        for what would become a mother church to many congregations across the region.
                      </p>
                    </div>
                  </div>

                  {/* 1980s */}
                  <div style={{
                    position: 'relative',
                    paddingLeft: '5rem'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '1rem',
                      width: '2rem',
                      height: '2rem',
                      background: 'linear-gradient(135deg, #2d5a27, #1c3a1c)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(45, 90, 39, 0.3)',
                      border: '4px solid white'
                    }}>
                      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>2</span>
                    </div>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '2rem',
                      borderRadius: '16px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                      border: '1px solid rgba(45, 90, 39, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)'
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(45, 90, 39, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                    }}
                    >
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#2d5a27',
                        marginBottom: '0.5rem'
                      }}>
                        1990s - Expansion
                      </h4>
                      <p style={{
                        color: '#6b7280',
                        lineHeight: '1.6'
                      }}>
                        As Thika developed into a major commercial and agricultural center, our church experienced
                        remarkable growth. We expanded our facilities, established comprehensive ministries for all
                        age groups, and began our mission of church planting. During this decade, we successfully
                        planted our first 5 daughter churches in surrounding communities.
                      </p>
                    </div>
                  </div>

                  {/* 2000s */}
                  <div style={{
                    position: 'relative',
                    paddingLeft: '5rem'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '1rem',
                      width: '2rem',
                      height: '2rem',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                      border: '4px solid white'
                    }}>
                      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>3</span>
                    </div>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '2rem',
                      borderRadius: '16px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)'
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                    }}
                    >
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#f59e0b',
                        marginBottom: '0.5rem'
                      }}>
                        2000s - Modernization
                      </h4>
                      <p style={{
                        color: '#6b7280',
                        lineHeight: '1.6'
                      }}>
                        The new millennium brought modern facilities, advanced technology for worship,
                        and expanded community outreach programs. We established our health ministry,
                        education programs, and strengthened our youth initiatives.
                      </p>
                    </div>
                  </div>

                  {/* 2010s */}
                  <div style={{
                    position: 'relative',
                    paddingLeft: '5rem'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '1rem',
                      width: '2rem',
                      height: '2rem',
                      background: 'linear-gradient(135deg, #2d5a27, #1c3a1c)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(45, 90, 39, 0.3)',
                      border: '4px solid white'
                    }}>
                      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>4</span>
                    </div>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '2rem',
                      borderRadius: '16px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                      border: '1px solid rgba(45, 90, 39, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)'
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(45, 90, 39, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                    }}
                    >
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#2d5a27',
                        marginBottom: '0.5rem'
                      }}>
                        2010s - Multiplication
                      </h4>
                      <p style={{
                        color: '#6b7280',
                        lineHeight: '1.6'
                      }}>
                        A decade of remarkable church planting success. We established 10 additional daughter
                        churches, bringing our total to 15 thriving congregations across Central Kenya. Our
                        membership grew to over 500 active members, and we became a regional center for
                        Adventist education and community development.
                      </p>
                    </div>
                  </div>

                  {/* Today */}
                  <div style={{
                    position: 'relative',
                    paddingLeft: '5rem'
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '1rem',
                      width: '2rem',
                      height: '2rem',
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                      border: '4px solid white'
                    }}>
                      <span style={{ color: 'white', fontWeight: 'bold', fontSize: '0.8rem' }}>5</span>
                    </div>
                    <div style={{
                      backgroundColor: 'white',
                      padding: '2rem',
                      borderRadius: '16px',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                      border: '1px solid rgba(245, 158, 11, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)'
                      e.currentTarget.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)'
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                    }}
                    >
                      <h4 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#f59e0b',
                        marginBottom: '0.5rem'
                      }}>
                        2025 - 45 Years Strong
                      </h4>
                      <p style={{
                        color: '#6b7280',
                        lineHeight: '1.6'
                      }}>
                        Today, after 45 years of faithful service, we celebrate God's goodness with 299 active
                        members and 15 daughter churches. We continue to embrace digital ministry, community
                        outreach, and holistic development while maintaining our commitment to biblical truth
                        and Adventist values.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Statistics Section */}
            <div style={{
              background: 'white',
              borderRadius: '24px',
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
                background: 'radial-gradient(circle, rgba(45, 90, 39, 0.05) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '2rem',
                  textAlign: 'center'
                }}>
                  Church Statistics
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '2rem',
                  marginBottom: '2rem'
                }}>
                  {/* Active Members */}
                  <div style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(45, 90, 39, 0.02) 100%)',
                    borderRadius: '16px',
                    border: '1px solid rgba(45, 90, 39, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(45, 90, 39, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  >
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: '800',
                      color: '#2d5a27',
                      marginBottom: '0.5rem',
                      lineHeight: '1'
                    }}>299</div>
                    <p style={{
                      color: '#6b7280',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>Active Members</p>
                  </div>

                  {/* Years of Service */}
                  <div style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)',
                    borderRadius: '16px',
                    border: '1px solid rgba(245, 158, 11, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  >
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: '800',
                      color: '#f59e0b',
                      marginBottom: '0.5rem',
                      lineHeight: '1'
                    }}>45</div>
                    <p style={{
                      color: '#6b7280',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>Years of Service</p>
                  </div>

                  {/* Active Ministries */}
                  <div style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(45, 90, 39, 0.02) 100%)',
                    borderRadius: '16px',
                    border: '1px solid rgba(45, 90, 39, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(45, 90, 39, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  >
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: '800',
                      color: '#2d5a27',
                      marginBottom: '0.5rem',
                      lineHeight: '1'
                    }}>12</div>
                    <p style={{
                      color: '#6b7280',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>Active Ministries</p>
                  </div>

                  {/* Daughter Churches */}
                  <div style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%)',
                    borderRadius: '16px',
                    border: '1px solid rgba(245, 158, 11, 0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  >
                    <div style={{
                      fontSize: '3rem',
                      fontWeight: '800',
                      color: '#f59e0b',
                      marginBottom: '0.5rem',
                      lineHeight: '1'
                    }}>15</div>
                    <p style={{
                      color: '#6b7280',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>Daughter Churches</p>
                  </div>
                </div>

                {/* Impact Section */}
                <div style={{
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
                  borderRadius: '16px',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  textAlign: 'center'
                }}>
                  <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#2d5a27',
                    marginBottom: '1rem'
                  }}>
                    Our Impact
                  </h4>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    Over 45 years of faithful service, we've established 15 daughter churches, trained
                    hundreds of church leaders, and touched thousands of lives through community health
                    programs, educational initiatives, and spiritual outreach across Central Kenya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced SDA Beliefs Section */}
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
              Our Foundation
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              What We Believe
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Our faith is anchored in the Bible and the 28 Fundamental Beliefs of the Seventh-day Adventist Church.
              Here are some of our core beliefs that guide our worship and daily living.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              {
                icon: (
                  <svg style={{ width: '3rem', height: '3rem', color: '#2d5a27' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "The Holy Scriptures",
                description: "The Bible is the Word of God, the infallible revelation of His will, and the standard of character, test of experience, authoritative revealer of doctrines.",
                color: '#2d5a27'
              },
              {
                icon: (
                  <svg style={{ width: '3rem', height: '3rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Salvation by Grace",
                description: "Salvation comes through faith in Jesus Christ alone. We are saved by grace through faith, not by works, but good works are the fruit of salvation.",
                color: '#f59e0b'
              },
              {
                icon: (
                  <svg style={{ width: '3rem', height: '3rem', color: '#2d5a27' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "The Trinity",
                description: "There is one God: Father, Son, and Holy Spirit, a unity of three co-eternal Persons who work together for our salvation and sanctification.",
                color: '#2d5a27'
              },
              {
                icon: (
                  <svg style={{ width: '3rem', height: '3rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: "The Sabbath",
                description: "The seventh day of the week is the Sabbath of the Lord our God, a day of rest, worship, and fellowship, commemorating God's creation and redemption.",
                color: '#f59e0b'
              },
              {
                icon: (
                  <svg style={{ width: '3rem', height: '3rem', color: '#2d5a27' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: "Second Coming",
                description: "The second coming of Christ is the blessed hope of the church, the grand climax of the gospel when Jesus will return in glory to take His people home.",
                color: '#2d5a27'
              },
              {
                icon: (
                  <svg style={{ width: '3rem', height: '3rem', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Wholistic Health",
                description: "We believe in caring for our bodies as temples of the Holy Spirit, promoting physical, mental, and spiritual health through balanced living.",
                color: '#f59e0b'
              }
            ].map((belief, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${belief.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${belief.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                  border: `1px solid ${belief.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2.5rem',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = `0 20px 60px ${belief.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
                  e.currentTarget.style.borderColor = `${belief.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.borderColor = `${belief.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${belief.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    width: '5rem',
                    height: '5rem',
                    background: `linear-gradient(135deg, ${belief.color}, ${belief.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    boxShadow: `0 8px 25px ${belief.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
                  }}>
                    <div style={{ color: 'white' }}>
                      {belief.icon}
                    </div>
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: belief.color,
                    marginBottom: '1rem'
                  }}>
                    {belief.title}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    {belief.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(45, 90, 39, 0.05) 0%, rgba(245, 158, 11, 0.05) 100%)',
            borderRadius: '20px',
            border: '1px solid rgba(45, 90, 39, 0.1)'
          }}>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              fontSize: '1.1rem'
            }}>
              Want to learn more about our complete set of beliefs?
            </p>
            <a
              href="https://www.adventist.org/beliefs/"
              target="_blank"
              rel="noopener noreferrer"
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
              View All 28 Fundamental Beliefs
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Leadership Section */}
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
              Meet Our Team
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Our Leadership
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Meet the dedicated servants who guide our church family with wisdom, compassion, and unwavering faith.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              {
                name: "Pst. Charles Muritu",
                position: "Senior Pastor",
                description: "Leading our congregation with wisdom and dedication, Pastor Charles guides our church family in spiritual growth and community service.",
                education: "Phone: +254 729 071 755 | Email: muritunganga77@gmail.com",
                specialties: ["Pastoral Care", "Biblical Teaching", "Church Leadership"],
                color: '#2d5a27'
              },
              {
                name: "Elder Methucellah Mokua",
                position: "First Elder",
                description: "Serving as our First Elder, Elder Methucellah provides spiritual guidance and oversight to our church board and congregation.",
                education: "Phone: +254 726 028 004 | Email: mokuamariera@gmail.com",
                specialties: ["Church Governance", "Spiritual Guidance", "Leadership"],
                color: '#f59e0b'
              },
              {
                name: "Kefa Nyakundi",
                position: "Head Deacon",
                description: "Coordinating our deacon board and ensuring smooth church operations, Deacon Kefa serves with dedication and commitment.",
                education: "Phone: +254 724 357 783",
                specialties: ["Church Administration", "Facilities Management", "Stewardship"],
                color: '#2d5a27'
              },
              {
                name: "Joseph Kimilu",
                position: "Church Treasurer",
                description: "Managing church finances with integrity and transparency, ensuring proper stewardship of God's resources.",
                education: "Phone: +254 720 930 703 | Email: jkimilu963@gmail.com",
                specialties: ["Financial Management", "Stewardship", "Budget Planning"],
                color: '#f59e0b'
              },
              {
                name: "Effie Muthoni",
                position: "Church Clerk",
                description: "Maintaining accurate church records and facilitating effective communication within our church family.",
                education: "Phone: +254 723 379 186 | Email: effiemuthoni3@gmail.com",
                specialties: ["Record Keeping", "Communication", "Administration"],
                color: '#2d5a27'
              },
              {
                name: "Edwina Odongo",
                position: "Head Deaconess",
                description: "Leading our deaconess team in caring for church members and coordinating women's service activities.",
                education: "Phone: +254 723 506 923",
                specialties: ["Member Care", "Women's Leadership", "Service Coordination"],
                color: '#f59e0b'
              },
              {
                name: "Charles Owiti",
                position: "Sabbath School Superintendent",
                description: "Leading our Sabbath School programs and educational ministries, fostering spiritual growth through biblical education.",
                education: "Christian Education",
                specialties: ["Sabbath School", "Christian Education", "Teaching"],
                color: '#f59e0b'
              },
              {
                name: "Charles Kyalo Simon",
                position: "Communication Leader",
                description: "Managing church communications and ensuring effective information flow within our congregation and community outreach.",
                education: "Communication Management",
                specialties: ["Church Communication", "Media Management", "Information Systems"],
                color: '#2d5a27'
              }
            ].map((leader, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.12)'
                  e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)'
                  e.currentTarget.style.borderColor = 'rgba(45, 90, 39, 0.1)'
                }}
              >
                {/* Background decoration */}
                <div style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '-50px',
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Profile Avatar */}
                  <div style={{
                    width: '6rem',
                    height: '6rem',
                    background: `linear-gradient(135deg, ${leader.color}, ${leader.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                    borderRadius: '50%',
                    margin: '0 auto 1.5rem auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    boxShadow: `0 8px 25px ${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                    border: '4px solid white'
                  }}>
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>

                  {/* Name and Position */}
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#2d5a27',
                    marginBottom: '0.5rem'
                  }}>
                    {leader.name}
                  </h3>
                  <p style={{
                    color: leader.color,
                    fontWeight: '600',
                    fontSize: '1rem',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {leader.position}
                  </p>

                  {/* Description */}
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem'
                  }}>
                    {leader.description}
                  </p>

                  {/* Specialties */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}>
                    {leader.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        style={{
                          backgroundColor: leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: leader.color,
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          border: `1px solid ${leader.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
                        }}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Church Elders */}
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem',
            marginTop: '4rem'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem'
            }}>
              Our Church Elders
            </h3>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Additional elders who serve our congregation with dedication and spiritual guidance
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem'
          }}>
            {[
              {
                name: "Elder Reuben Lusasi",
                role: "Church Elder & Family Life Ministry"
              },
              {
                name: "Elder Abraham Sayah",
                role: "Church Elder"
              },
              {
                name: "Elder David Juma",
                role: "Church Elder"
              },
              {
                name: "Elder James Mauti",
                role: "Church Elder"
              }
            ].map((elder, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '2rem',
                  textAlign: 'center',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  transition: 'all 0.3s ease'
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
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #2d5a27, #1c3a1c)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}>
                  {elder.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '0.5rem'
                }}>
                  {elder.name}
                </h4>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginBottom: '1.5rem'
                }}>
                  {elder.role}
                </p>

                {/* Secure Contact Section */}
                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(45, 90, 39, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  marginTop: '1rem'
                }}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    Contact {elder.name.split(' ')[1]} securely about church matters
                  </p>

                  <ContactButton
                    recipientName={elder.name}
                    recipientRole={elder.role}
                    buttonText="Send Message"
                    buttonStyle="primary"
                    size="medium"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Join Leadership CTA */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(45, 90, 39, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Background decoration */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              left: '-100px',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)',
              borderRadius: '50%'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#2d5a27',
                marginBottom: '1rem'
              }}>
                Join Our Leadership Team
              </h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem auto',
                fontSize: '1.1rem',
                lineHeight: '1.6'
              }}>
                Are you passionate about serving God and His people? We're always looking for dedicated
                individuals to join our various ministry teams and leadership roles.
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link
                  to="/ministries"
                  style={{
                    backgroundColor: '#2d5a27',
                    color: 'white',
                    fontWeight: '600',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
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
                  Explore Ministries
                </Link>
                <Link
                  to="/contact"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#2d5a27',
                    fontWeight: '600',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    border: '2px solid #2d5a27'
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
                  Contact Leadership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action Section */}
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
            background: 'linear-gradient(135deg, #2d5a27 0%, #1c3a1c 100%)',
            color: 'white',
            padding: '4rem 3rem',
            borderRadius: '24px',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center'
          }}>
            {/* Enhanced Background Elements */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.4
            }}></div>

            {/* Floating Elements */}
            <div style={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: '150px',
              height: '150px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'float 6s ease-in-out infinite'
            }}></div>

            <div style={{
              position: 'absolute',
              bottom: '20%',
              left: '15%',
              width: '100px',
              height: '100px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              animation: 'float 8s ease-in-out infinite reverse'
            }}></div>

            <div style={{ position: 'relative', zIndex: 2 }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: '800',
                marginBottom: '1.5rem',
                lineHeight: '1.2'
              }}>
                Come and <span style={{ color: '#fbbf24' }}>See</span>
              </h2>

              <blockquote style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.4rem',
                fontStyle: 'italic',
                opacity: 0.95,
                marginBottom: '1rem',
                maxWidth: '700px',
                margin: '0 auto 1rem auto',
                lineHeight: '1.6'
              }}>
                "Come and see what the Lord has done! He has brought peace to the earth."
              </blockquote>

              <cite style={{
                color: '#fbbf24',
                fontWeight: '700',
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                display: 'block',
                marginBottom: '2rem'
              }}>
                — Psalm 46:8
              </cite>

              <p style={{
                fontSize: '1.2rem',
                marginBottom: '3rem',
                maxWidth: '800px',
                margin: '0 auto 3rem auto',
                lineHeight: '1.6',
                opacity: '0.9'
              }}>
                Whether you're seeking spiritual growth, community fellowship, or simply curious about our faith,
                you're always welcome at Thika Main SDA Church. Join us this Sabbath!
              </p>

              <div style={{
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link
                  to="/contact"
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
                  Plan Your Visit
                </Link>
                <Link
                  to="/events"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    padding: '18px 36px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.3s ease',
                    border: '2px solid white'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'
                    e.target.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  View Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
