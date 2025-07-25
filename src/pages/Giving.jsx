import React from 'react'

const Giving = () => {

  // Check if we're on mobile
  const isMobile = window.innerWidth < 768
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

  return (
    <div className="min-h-screen">
      {/* Modern Giving Header */}
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
              padding: '8px 20px',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '1rem'
            }}>
              Generous Giving
            </div>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Give with a Joyful Heart
            </h1>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '800px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(45, 90, 39, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '60px',
                height: '60px',
                background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}>
                  💝
                </div>
                <blockquote style={{
                  fontSize: '1.2rem',
                  color: '#374151',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  marginBottom: '1rem',
                  position: 'relative'
                }}>
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
                </blockquote>
                <cite style={{
                  fontSize: '1rem',
                  color: '#2d5a27',
                  fontWeight: '600'
                }}>
                  - 2 Corinthians 9:7
                </cite>
              </div>
            </div>
            <p style={{
              fontSize: '1.1rem',
              color: '#6b7280',
              maxWidth: '700px',
              lineHeight: '1.6',
              marginTop: '1.5rem'
            }}>
              Your generous giving enables us to spread God's love, support our community, and advance His kingdom.
              Every gift, no matter the size, makes a meaningful difference in the lives we touch.
            </p>
          </div>

          {/* Giving Impact Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginTop: '2rem'
          }}>
            {[
              { icon: '🏛️', number: '100%', label: 'Transparent Use', subtitle: 'Every donation tracked' },
              { icon: '❤️', number: '500+', label: 'Lives Impacted', subtitle: 'Monthly through ministries' },
              { icon: '🌍', number: '12', label: 'Outreach Programs', subtitle: 'Active in community' },
              { icon: '🙏', number: '24/7', label: 'Prayer Support', subtitle: 'For all our givers' }
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(45, 90, 39, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.5rem'
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#2d5a27',
                  marginBottom: '0.25rem'
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '0.25rem'
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#6b7280'
                }}>
                  {stat.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Impact Section */}
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
              Your Impact
            </div>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '0.5rem'
            }}>
              See How Your Giving Makes a Difference
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem'
            }}>
              Every donation directly supports our mission to serve God and our community
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                title: "Community Outreach",
                description: "Your donations help us provide food, clothing, and support to families in need throughout Thika and surrounding areas.",
                impact: "150+ families served monthly",
                icon: "🤝",
                color: "#2d5a27",
                stats: [
                  { label: "Food Packages", value: "200+" },
                  { label: "Clothing Items", value: "500+" },
                  { label: "Medical Support", value: "50+" }
                ]
              },
              {
                title: "Youth Development",
                description: "Supporting our youth ministry programs, educational scholarships, and mentorship initiatives for the next generation.",
                impact: "80+ young people empowered",
                icon: "👥",
                color: "#f59e0b",
                stats: [
                  { label: "Scholarships", value: "25" },
                  { label: "Youth Programs", value: "15" },
                  { label: "Mentorship Pairs", value: "40" }
                ]
              },
              {
                title: "Church Operations",
                description: "Maintaining our facilities, supporting pastoral care, and ensuring quality worship experiences for our congregation.",
                impact: "500+ members served weekly",
                icon: "⛪",
                color: "#2d5a27",
                stats: [
                  { label: "Weekly Services", value: "4" },
                  { label: "Pastoral Visits", value: "30+" },
                  { label: "Facility Maintenance", value: "100%" }
                ]
              },
              {
                title: "Global Missions",
                description: "Supporting missionary work and evangelism efforts both locally and internationally to spread God's love worldwide.",
                impact: "12 mission projects supported",
                icon: "🌍",
                color: "#f59e0b",
                stats: [
                  { label: "Mission Fields", value: "8" },
                  { label: "Missionaries", value: "15" },
                  { label: "Evangelism Events", value: "24" }
                ]
              }
            ].map((impact, index) => (
              <div
                key={index}
                style={{
                  background: `linear-gradient(135deg, ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.02)' : 'rgba(245, 158, 11, 0.02)'} 0%, ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.05)' : 'rgba(245, 158, 11, 0.05)'} 100%)`,
                  border: `1px solid ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = `0 15px 40px ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.15)' : 'rgba(245, 158, 11, 0.15)'}`
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
                  background: `radial-gradient(circle, ${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, transparent 70%)`,
                  borderRadius: '50%'
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      width: '3.5rem',
                      height: '3.5rem',
                      background: `linear-gradient(135deg, ${impact.color}, ${impact.color === '#2d5a27' ? '#1c3a1c' : '#d97706'})`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem'
                    }}>
                      {impact.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: impact.color,
                        marginBottom: '0.25rem'
                      }}>
                        {impact.title}
                      </h3>
                      <div style={{
                        backgroundColor: `${impact.color === '#2d5a27' ? 'rgba(45, 90, 39, 0.1)' : 'rgba(245, 158, 11, 0.1)'}`,
                        color: impact.color,
                        padding: '3px 8px',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        display: 'inline-block'
                      }}>
                        {impact.impact}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem',
                    fontSize: '0.95rem'
                  }}>
                    {impact.description}
                  </p>

                  {/* Stats */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem'
                  }}>
                    {impact.stats.map((stat, statIndex) => (
                      <div
                        key={statIndex}
                        style={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          padding: '0.75rem',
                          textAlign: 'center',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                        }}
                      >
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: impact.color,
                          marginBottom: '0.25rem'
                        }}>
                          {stat.value}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          fontWeight: '500'
                        }}>
                          {stat.label}
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

      {/* Payment Information Section */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#2d5a27',
              marginBottom: '1rem'
            }}>
              How to Give
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              You can support our ministry through the following payment methods
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {/* M-PESA Information */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(22, 163, 74, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(22, 163, 74, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#16a34a',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    📱
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#16a34a',
                    margin: 0
                  }}>
                    M-PESA Paybill
                  </h3>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(22, 163, 74, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(22, 163, 74, 0.1)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: '#16a34a',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Business Number
                    </div>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#374151'
                    }}>
                      247247
                    </div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(22, 163, 74, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(22, 163, 74, 0.1)',
                    textAlign: 'center'
                  }}>
                    <div style={{
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: '#16a34a',
                      marginBottom: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Account Number
                    </div>
                    <div style={{
                      fontSize: '1.2rem',
                      fontWeight: '700',
                      color: '#374151'
                    }}>
                      436520#
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(22, 163, 74, 0.1)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#16a34a',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    💚 Go to M-PESA → Lipa na M-PESA → Pay Bill → Enter details above
                  </p>
                </div>
              </div>
            </div>

            {/* Bank Transfer Information */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(124, 58, 237, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Background decoration */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
              }}></div>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#7c3aed',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    🏦
                  </div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#7c3aed',
                    margin: 0
                  }}>
                    Bank Transfer
                  </h3>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {[
                    { label: 'Bank Name', value: 'Equity Bank' },
                    { label: 'Account Name', value: 'Seventh Day Adventist Thika Main' },
                    { label: 'Account Number', value: '1710276436520' },
                    { label: 'Branch', value: 'Makongeni Thika' }
                  ].map((detail, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '1rem',
                        backgroundColor: 'rgba(124, 58, 237, 0.05)',
                        borderRadius: '12px',
                        border: '1px solid rgba(124, 58, 237, 0.1)',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#7c3aed',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {detail.label}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#374151'
                      }}>
                        {detail.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(124, 58, 237, 0.1)',
                  borderRadius: '12px',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#7c3aed',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    💜 Please include your name and "Church Offering" in the reference
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: 'rgba(45, 90, 39, 0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(45, 90, 39, 0.1)'
          }}>
            <p style={{
              color: '#2d5a27',
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '0.5rem'
            }}>
              🙏 Thank you for your generous support and faithful giving!
            </p>
            <p style={{
              color: '#6b7280',
              fontSize: '0.95rem'
            }}>
              Your contributions help us fulfill our mission and serve our community
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Giving
